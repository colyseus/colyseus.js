import { Connection } from './Connection';
import { Protocol } from './Protocol';
import { getSerializer, Serializer } from './serializer/Serializer';

// The unused imports here are important for better `.d.ts` file generation
// (Later merged with `dts-bundle-generator`)
import { createNanoEvents } from './core/nanoevents';
import { createSignal } from './core/signal';

import { decode, encode, Iterator, getStateCallbacks, CallbackProxy, Schema } from '@colyseus/schema';
import { SchemaConstructor, SchemaSerializer } from './serializer/SchemaSerializer';
import { CloseCode } from './errors/ServerError';

import { Packr, unpack } from '@colyseus/msgpackr';

type ByteArrayAllocator = new (length: number) => Uint8Array | Buffer;
const ByteArrayAllocate: ByteArrayAllocator = (typeof Buffer !== 'undefined')
    ? function (length: number) { return Buffer.allocUnsafeSlow(length) as any } as any
    : Uint8Array;

export interface RoomAvailable<Metadata = any> {
    name: string;
    roomId: string;
    clients: number;
    maxClients: number;
    metadata?: Metadata;
}

export class Room<State= any> {
    public roomId: string;
    public sessionId: string;
    public reconnectionToken: string;

    public name: string;
    public connection: Connection;

    // Public signals
    public onStateChange = createSignal<(state: State) => void>();
    public onError = createSignal<(code: number, message?: string) => void>();
    public onLeave = createSignal<(code: number) => void>();
    protected onJoin = createSignal();

    public serializerId: string;
    public serializer: Serializer<State>;

    protected hasJoined: boolean = false;

    // TODO: remove me on 1.0.0
    protected rootSchema: SchemaConstructor<State>;

    protected onMessageHandlers = createNanoEvents();

    protected packr: Packr;
    protected sendBuffer: Buffer | Uint8Array = new ByteArrayAllocate(8192);

    constructor(name: string, rootSchema?: SchemaConstructor<State>) {
        this.roomId = null;
        this.name = name;

        this.packr = new Packr();
        this.packr.useBuffer(this.sendBuffer);

        if (rootSchema) {
            this.serializer = new (getSerializer("schema"));
            this.rootSchema = rootSchema;
            (this.serializer as SchemaSerializer).state = new rootSchema();
        }

        this.onError((code, message) => console.warn?.(`colyseus.js - onError => (${code}) ${message}`));
        this.onLeave(() => this.removeAllListeners());
    }

    // TODO: deprecate me on version 1.0
    get id() { return this.roomId; }

    public connect(
        endpoint: string,
        devModeCloseCallback?: () => void,
        room: Room = this // when reconnecting on devMode, re-use previous room intance for handling events.
    ) {
        const connection = new Connection();
        room.connection = connection;

        connection.events.onmessage = Room.prototype.onMessageCallback.bind(room);
        connection.events.onclose = function (e: CloseEvent) {
            if (!room.hasJoined) {
                console.warn?.(`Room connection was closed unexpectedly (${e.code}): ${e.reason}`);
                room.onError.invoke(e.code, e.reason);
                return;
            }
            if (e.code === CloseCode.DEVMODE_RESTART && devModeCloseCallback) {
                devModeCloseCallback();
            } else {
                room.onLeave.invoke(e.code);
                room.destroy();
            }
        };
        connection.events.onerror = function (e: CloseEvent) {
            console.warn?.(`Room, onError (${e.code}): ${e.reason}`);
            room.onError.invoke(e.code, e.reason);
        };
        connection.connect(endpoint);
    }

    public leave(consented: boolean = true): Promise<number> {
        return new Promise((resolve) => {
            this.onLeave((code) => resolve(code));

            if (this.connection) {
                if (consented) {
                    this.sendBuffer[0] = Protocol.LEAVE_ROOM;
                    this.connection.send(this.sendBuffer.subarray(0, 1));

                } else {
                    this.connection.close();
                }

            } else {
                this.onLeave.invoke(CloseCode.CONSENTED);
            }
        });
    }

    public onMessage<T = any>(type: "*", callback: (type: string | number, message: T) => void)
    public onMessage<T = any>(type: string | number, callback: (message: T) => void)
    public onMessage(type: '*' | string | number, callback: (...args: any[]) => void) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    }

    public send<T = any>(type: string | number, message?: T): void {
        const it: Iterator = { offset: 1 };
        this.sendBuffer[0] = Protocol.ROOM_DATA;

        if (typeof(type) === "string") {
            encode.string(this.sendBuffer, type, it);

        } else {
            encode.number(this.sendBuffer, type, it);
        }

        // force packr to use beginning of the buffer
        this.packr.position = 0;

        const data = (message !== undefined)
            ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
            : this.sendBuffer.subarray(0, it.offset);

        this.connection.send(data);
    }

    public sendBytes(type: string | number, bytes: Uint8Array) {
        const it: Iterator = { offset: 1 };
        this.sendBuffer[0] = Protocol.ROOM_DATA_BYTES;

        if (typeof(type) === "string") {
            encode.string(this.sendBuffer, type, it);

        } else {
            encode.number(this.sendBuffer, type, it);
        }

        this.sendBuffer.set(bytes, it.offset);
        this.connection.send(this.sendBuffer.subarray(0, it.offset + bytes.byteLength));
    }

    public get state (): State {
        return this.serializer.getState();
    }

    public removeAllListeners() {
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
        this.onMessageHandlers.events = {};
    }

    protected onMessageCallback(event: MessageEvent) {
        const buffer = new Uint8Array(event.data);

        const it: Iterator = { offset: 1 };
        const code = buffer[0];

        console.log("onMessage ->", code, Protocol[code], `(len: ${buffer.byteLength})`)

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
            this.sendBuffer[0] = Protocol.JOIN_ROOM;
            this.connection.send(this.sendBuffer.subarray(0, 1));

        } else if (code === Protocol.ERROR) {
            const code = decode.number(buffer, it);
            const message = decode.string(buffer, it);

            this.onError.invoke(code, message);

        } else if (code === Protocol.LEAVE_ROOM) {
            this.leave();

        } else if (code === Protocol.ROOM_STATE) {
            this.serializer.setState(buffer, it);
            this.onStateChange.invoke(this.serializer.getState());

        } else if (code === Protocol.ROOM_STATE_PATCH) {
            this.serializer.patch(buffer, it);
            this.onStateChange.invoke(this.serializer.getState());

        } else if (code === Protocol.ROOM_DATA) {
            const type = (decode.stringCheck(buffer, it))
                ? decode.string(buffer, it)
                : decode.number(buffer, it);

            const message = (buffer.byteLength > it.offset)
                ? unpack(buffer, { start: it.offset })
                : undefined;

            this.dispatchMessage(type, message);

        } else if (code === Protocol.ROOM_DATA_BYTES) {
            const type = (decode.stringCheck(buffer, it))
                ? decode.string(buffer, it)
                : decode.number(buffer, it);

            this.dispatchMessage(type, buffer.subarray(it.offset));
        }
    }

    private dispatchMessage(type: string | number, message: any) {
        const messageType = this.getMessageHandlerKey(type);

        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);

        } else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);

        } else {
            console.warn?.(`colyseus.js: onMessage() not registered for type '${type}'.`);
        }
    }

    private destroy () {
        if (this.serializer) {
            this.serializer.teardown();
        }
    }

    private getMessageHandlerKey(type: string | number): string {
        switch (typeof(type)) {
            // string
            case "string": return type;

            // number
            case "number": return `i${type}`;

            default: throw new Error("invalid message type.");
        }
    }

}
