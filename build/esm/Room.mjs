// colyseus.js@0.16.0-preview.24
import { Connection } from './Connection.mjs';
import { Protocol } from './Protocol.mjs';
import { getSerializer } from './serializer/Serializer.mjs';
import { createNanoEvents } from './core/nanoevents.mjs';
import { createSignal } from './core/signal.mjs';
import { encode, decode } from '@colyseus/schema';
import { SchemaSerializer } from './serializer/SchemaSerializer.mjs';
import { CloseCode } from './errors/ServerError.mjs';
import { Packr, unpack } from '@colyseus/msgpackr';

class Room {
    roomId;
    sessionId;
    reconnectionToken;
    name;
    connection;
    // Public signals
    onStateChange = createSignal();
    onError = createSignal();
    onLeave = createSignal();
    onJoin = createSignal();
    serializerId;
    serializer;
    hasJoined = false;
    // TODO: remove me on 1.0.0
    rootSchema;
    onMessageHandlers = createNanoEvents();
    packr;
    constructor(name, rootSchema) {
        this.roomId = null;
        this.name = name;
        this.packr = new Packr();
        // msgpackr workaround: force buffer to be created.
        this.packr.encode(undefined);
        if (rootSchema) {
            this.serializer = new (getSerializer("schema"));
            this.rootSchema = rootSchema;
            this.serializer.state = new rootSchema();
        }
        this.onError((code, message) => console.warn?.(`colyseus.js - onError => (${code}) ${message}`));
        this.onLeave(() => this.removeAllListeners());
    }
    connect(endpoint, devModeCloseCallback, room = this, // when reconnecting on devMode, re-use previous room intance for handling events.
    options) {
        const connection = new Connection(options.protocol);
        room.connection = connection;
        connection.events.onmessage = Room.prototype.onMessageCallback.bind(room);
        connection.events.onclose = function (e) {
            if (!room.hasJoined) {
                console.warn?.(`Room connection was closed unexpectedly (${e.code}): ${e.reason}`);
                room.onError.invoke(e.code, e.reason);
                return;
            }
            if (e.code === CloseCode.DEVMODE_RESTART && devModeCloseCallback) {
                devModeCloseCallback();
            }
            else {
                room.onLeave.invoke(e.code);
                room.destroy();
            }
        };
        connection.events.onerror = function (e) {
            console.warn?.(`Room, onError (${e.code}): ${e.reason}`);
            room.onError.invoke(e.code, e.reason);
        };
        // FIXME: refactor this.
        if (options.protocol === "h3") {
            const url = new URL(endpoint);
            connection.connect(url.origin, options);
        }
        else {
            connection.connect(endpoint);
        }
    }
    leave(consented = true) {
        return new Promise((resolve) => {
            this.onLeave((code) => resolve(code));
            if (this.connection) {
                if (consented) {
                    this.packr.buffer[0] = Protocol.LEAVE_ROOM;
                    this.connection.send(this.packr.buffer.subarray(0, 1));
                }
                else {
                    this.connection.close();
                }
            }
            else {
                this.onLeave.invoke(CloseCode.CONSENTED);
            }
        });
    }
    onMessage(type, callback) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    }
    send(type, message) {
        const it = { offset: 1 };
        this.packr.buffer[0] = Protocol.ROOM_DATA;
        if (typeof (type) === "string") {
            encode.string(this.packr.buffer, type, it);
        }
        else {
            encode.number(this.packr.buffer, type, it);
        }
        // force packr to use beginning of the buffer
        this.packr.position = 0;
        const data = (message !== undefined)
            ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
            : this.packr.buffer.subarray(0, it.offset);
        this.connection.send(data);
    }
    sendUnreliable(type, message) {
        const it = { offset: 1 };
        this.packr.buffer[0] = Protocol.ROOM_DATA;
        if (typeof (type) === "string") {
            encode.string(this.packr.buffer, type, it);
        }
        else {
            encode.number(this.packr.buffer, type, it);
        }
        // force packr to use beginning of the buffer
        this.packr.position = 0;
        const data = (message !== undefined)
            ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
            : this.packr.buffer.subarray(0, it.offset);
        this.connection.sendUnreliable(data);
    }
    sendBytes(type, bytes) {
        const it = { offset: 1 };
        this.packr.buffer[0] = Protocol.ROOM_DATA_BYTES;
        if (typeof (type) === "string") {
            encode.string(this.packr.buffer, type, it);
        }
        else {
            encode.number(this.packr.buffer, type, it);
        }
        this.packr.buffer.set(bytes, it.offset);
        this.connection.send(this.packr.buffer.subarray(0, it.offset + bytes.byteLength));
    }
    get state() {
        return this.serializer.getState();
    }
    removeAllListeners() {
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
        this.onMessageHandlers.events = {};
        if (this.serializer instanceof SchemaSerializer) {
            // Remove callback references
            this.serializer.decoder.root.callbacks = {};
        }
    }
    onMessageCallback(event) {
        const buffer = new Uint8Array(event.data);
        const it = { offset: 1 };
        const code = buffer[0];
        if (code === Protocol.JOIN_ROOM) {
            const reconnectionToken = decode.utf8Read(buffer, it, buffer[it.offset++]);
            this.serializerId = decode.utf8Read(buffer, it, buffer[it.offset++]);
            // Instantiate serializer if not locally available.
            if (!this.serializer) {
                const serializer = getSerializer(this.serializerId);
                this.serializer = new serializer();
            }
            if (buffer.byteLength > it.offset && this.serializer.handshake) {
                this.serializer.handshake(buffer, it);
            }
            this.reconnectionToken = `${this.roomId}:${reconnectionToken}`;
            this.hasJoined = true;
            this.onJoin.invoke();
            // acknowledge successfull JOIN_ROOM
            this.packr.buffer[0] = Protocol.JOIN_ROOM;
            this.connection.send(this.packr.buffer.subarray(0, 1));
        }
        else if (code === Protocol.ERROR) {
            const code = decode.number(buffer, it);
            const message = decode.string(buffer, it);
            this.onError.invoke(code, message);
        }
        else if (code === Protocol.LEAVE_ROOM) {
            this.leave();
        }
        else if (code === Protocol.ROOM_STATE) {
            this.serializer.setState(buffer, it);
            this.onStateChange.invoke(this.serializer.getState());
        }
        else if (code === Protocol.ROOM_STATE_PATCH) {
            this.serializer.patch(buffer, it);
            this.onStateChange.invoke(this.serializer.getState());
        }
        else if (code === Protocol.ROOM_DATA) {
            const type = (decode.stringCheck(buffer, it))
                ? decode.string(buffer, it)
                : decode.number(buffer, it);
            const message = (buffer.byteLength > it.offset)
                ? unpack(buffer, { start: it.offset })
                : undefined;
            this.dispatchMessage(type, message);
        }
        else if (code === Protocol.ROOM_DATA_BYTES) {
            const type = (decode.stringCheck(buffer, it))
                ? decode.string(buffer, it)
                : decode.number(buffer, it);
            this.dispatchMessage(type, buffer.subarray(it.offset));
        }
    }
    dispatchMessage(type, message) {
        const messageType = this.getMessageHandlerKey(type);
        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);
        }
        else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);
        }
        else {
            console.warn?.(`colyseus.js: onMessage() not registered for type '${type}'.`);
        }
    }
    destroy() {
        if (this.serializer) {
            this.serializer.teardown();
        }
    }
    getMessageHandlerKey(type) {
        switch (typeof (type)) {
            // string
            case "string": return type;
            // number
            case "number": return `i${type}`;
            default: throw new Error("invalid message type.");
        }
    }
}

export { Room };
//# sourceMappingURL=Room.mjs.map
