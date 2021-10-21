import * as msgpack from './msgpack';

import { Connection } from './Connection';
import { Serializer, getSerializer } from './serializer/Serializer';
import { Protocol, utf8Read, utf8Length } from './Protocol';

// The unused imports here are important for better `.d.ts` file generation
// (Later merged with `dts-bundle-generator`)
import { createNanoEvents, DefaultEvents, Emitter } from 'nanoevents';
import { createSignal, EventEmitter } from './core/signal';

import { SchemaSerializer, SchemaConstructor } from './serializer/SchemaSerializer';
import { Context, Schema, encode, decode } from '@colyseus/schema';

export interface RoomAvailable<Metadata = any> {
    roomId: string;
    clients: number;
    maxClients: number;
    metadata?: Metadata;
}

export class Room<State= any> {
    public roomId: string;
    public sessionId: string;

    public name: string;
    public connection: Connection;

    // Public signals
    public onStateChange = createSignal<(state: State) => void>();
    public onError = createSignal<(code: number, message?: string) => void>();
    public onLeave = createSignal<(code: number) => void>();
    protected onJoin = createSignal();

    public serializerId: string;
    protected serializer: Serializer<State>;

    protected hasJoined: boolean = false;

    // TODO: remove me on 1.0.0
    protected rootSchema: SchemaConstructor<State>;

    protected onMessageHandlers = createNanoEvents();

    constructor(name: string, rootSchema?: SchemaConstructor<State>) {
        this.roomId = null;
        this.name = name;

        if (rootSchema) {
            this.serializer = new (getSerializer("schema"));
            this.rootSchema = rootSchema;
            (this.serializer as SchemaSerializer).state = new rootSchema();
        }

        this.onError((code, message) => console.warn(`colyseus.js - onError => (${code}) ${message}`));
        this.onLeave(() => this.removeAllListeners());
    }

    // TODO: deprecate me on version 1.0
    get id() { return this.roomId; }

    public connect(endpoint: string) {
        this.connection = new Connection();
        this.connection.events.onmessage = this.onMessageCallback.bind(this);
        this.connection.events.onclose = (e: CloseEvent) => {
            if (!this.hasJoined) {
                console.warn(`Room connection was closed unexpectedly (${e.code}): ${e.reason}`);
                this.onError.invoke(e.code, e.reason);
                return;
            }

            this.onLeave.invoke(e.code);
            this.destroy();
        };
        this.connection.events.onerror = (e: CloseEvent) => {
            console.warn(`Room, onError (${e.code}): ${e.reason}`);
            this.onError.invoke(e.code, e.reason);
        };
        this.connection.connect(endpoint);
    }

    public leave(consented: boolean = true): Promise<number> {
        return new Promise((resolve) => {
            this.onLeave((code) => resolve(code));

            if (this.connection) {
                if (consented) {
                    this.connection.send([Protocol.LEAVE_ROOM]);

                } else {
                    this.connection.close();
                }

            } else {
                this.onLeave.invoke(4000); // "consented" code
            }
        });
    }

    public onMessage<T = any>(
        type: "*",
        callback: (type: string | number | Schema, message: T) => void
    )
    public onMessage<T extends (typeof Schema & (new (...args: any[]) => any))>(
        type: T,
        callback: (message: InstanceType<T>) => void
    )
    public onMessage<T = any>(
        type: string | number,
        callback: (message: T) => void
    )
    public onMessage(
        type: '*' | string | number | typeof Schema,
        callback: (...args: any[]) => void
    ) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    }

    public send<T extends Schema>(type: T);
    public send<T = string | number>(type: T, message?: any);
    public send<T = any>(type: string | number | Schema, message?: any): void {
        const initialBytes: number[] = type instanceof Schema ? [Protocol.ROOM_DATA_SCHEMA] : [Protocol.ROOM_DATA];

        if (type instanceof Schema) {
            encode.string(initialBytes, type.constructor.name);

        } else if (typeof(type) === "string") {
            encode.string(initialBytes, type);
        } else {
            encode.number(initialBytes, type);
        }

        let arr: Uint8Array;

        if (type instanceof Schema) {
            const encoded = new Uint8Array(type.encode(true))
            arr = new Uint8Array(initialBytes.length + encoded.byteLength);
            arr.set(new Uint8Array(initialBytes), 0);
            arr.set(new Uint8Array(encoded), initialBytes.length);
        } else if (message !== undefined) {
            const encoded = msgpack.encode(message);
            arr = new Uint8Array(initialBytes.length + encoded.byteLength);
            arr.set(new Uint8Array(initialBytes), 0);
            arr.set(new Uint8Array(encoded), initialBytes.length);

        } else {
            arr = new Uint8Array(initialBytes);
        }

        this.connection.send(arr.buffer);
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
        const bytes = Array.from(new Uint8Array(event.data))
        const code = bytes[0];

        if (code === Protocol.JOIN_ROOM) {
            let offset = 1;

            this.serializerId = utf8Read(bytes, offset);
            offset += utf8Length(this.serializerId);

            // Instantiate serializer if not locally available.
            if (!this.serializer) {
                const serializer = getSerializer(this.serializerId)
                this.serializer = new serializer();
            }

            if (bytes.length > offset && this.serializer.handshake) {
                this.serializer.handshake(bytes, { offset });
            }

            this.hasJoined = true;
            this.onJoin.invoke();

            // acknowledge successfull JOIN_ROOM
            this.connection.send([Protocol.JOIN_ROOM]);

        } else if (code === Protocol.ERROR) {
            const it: decode.Iterator = { offset: 1 };

            const code = decode.number(bytes, it);
            const message = decode.string(bytes, it);

            this.onError.invoke(code, message);

        } else if (code === Protocol.LEAVE_ROOM) {
            this.leave();

        } else if (code === Protocol.ROOM_DATA_SCHEMA) {
            const it = { offset: 1 };

            const context: Context = (this.serializer.getState() as any).constructor._context;
            const type = context.get(decode.number(bytes, it));

            const message: Schema = new (type as any)();
            message.decode(bytes, it);

            this.dispatchMessage(type, message);

        } else if (code === Protocol.ROOM_STATE) {
            bytes.shift(); // drop `code` byte
            this.setState(bytes);

        } else if (code === Protocol.ROOM_STATE_PATCH) {
            bytes.shift(); // drop `code` byte
            this.patch(bytes);

        } else if (code === Protocol.ROOM_DATA) {
            const it: decode.Iterator = { offset: 1 };

            const type = (decode.stringCheck(bytes, it))
                ? decode.string(bytes, it)
                : decode.number(bytes, it);

            const message = (bytes.length > it.offset)
                ? msgpack.decode(event.data, it.offset)
                : undefined;

            this.dispatchMessage(type, message);
        }
    }

    protected setState(encodedState: number[]): void {
        this.serializer.setState(encodedState);
        this.onStateChange.invoke(this.serializer.getState());
    }

    protected patch(binaryPatch: number[]) {
        this.serializer.patch(binaryPatch);
        this.onStateChange.invoke(this.serializer.getState());
    }

    private dispatchMessage(type: string | number | typeof Schema, message: any) {
        const messageType = this.getMessageHandlerKey(type);

        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);

        } else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);

        } else {
            console.warn(`colyseus.js: onMessage() not registered for type '${type}'.`);
        }
    }

    private destroy () {
        if (this.serializer) {
            this.serializer.teardown();
        }
    }

    private getMessageHandlerKey(type: string | number | typeof Schema): string {
        switch (typeof(type)) {
            // typeof Schema
            case "function": return `$${(type as typeof Schema)._typeid}`;

            // string
            case "string": return type;

            // number
            case "number": return `i${type}`;

            default: throw new Error("invalid message type.");
        }
    }

}
