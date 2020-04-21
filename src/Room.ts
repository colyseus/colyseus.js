import * as msgpack from './msgpack';
import { createSignal } from 'strong-events';

import { Connection } from './Connection';
import { Serializer, getSerializer } from './serializer/Serializer';
import { Protocol, utf8Read, utf8Length } from './Protocol';

import { FossilDeltaSerializer } from './serializer/FossilDeltaSerializer';
import { Listener } from '@gamestdio/state-listener';
import { SchemaSerializer } from '.';
import { SchemaConstructor } from './serializer/SchemaSerializer';
import { Context, Schema } from '@colyseus/schema';

import * as encode from '@colyseus/schema/lib/encoding/encode';
import * as decode from '@colyseus/schema/lib/encoding/decode';

export interface RoomAvailable<Metadata> {
    roomId: string;
    clients: number;
    maxClients: number;
    metadata?: Metadata;
}

export class Room<State= any> {
    public id: string;
    public sessionId: string;

    public name: string;

    // Public signals
    public onJoin = createSignal();
    public onStateChange = createSignal<(state: State) => void>();
    public onError = createSignal<(code: number, message?: string) => void>();
    public onLeave = createSignal<(code: number) => void>();

    public connection: Connection;

    public serializerId: string;
    protected serializer: Serializer<State>;

    protected hasJoined: boolean = false;

    // TODO: remove me on 1.0.0
    protected rootSchema: SchemaConstructor<State>;

    protected onMessageHandlers: { [messageType: string]: (message: any) => void } = {};

    constructor(name: string, rootSchema?: SchemaConstructor<State>) {
        this.id = null;
        this.name = name;

        if (rootSchema) {
            this.serializer = new (getSerializer("schema"));
            this.rootSchema = rootSchema;
            (this.serializer as SchemaSerializer).state = new rootSchema();

        } else {
            // TODO: remove default serializer. it should arrive only after JOIN_ROOM.
            this.serializer = new (getSerializer("fossil-delta"));
        }

        this.onError((code, message) => console.error(`colyseus.js - onError => (${code}) ${message}`));
        this.onLeave(() => this.removeAllListeners());
    }

    public connect(endpoint: string) {
        this.connection = new Connection(endpoint, false);
        this.connection.reconnectEnabled = false;
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = (e: CloseEvent) => {
            if (!this.hasJoined) {
                console.error(`Room connection was closed unexpectedly (${e.code}): ${e.reason}`);
                this.onError.invoke(e.code, e.reason);
                return;
            }

            this.onLeave.invoke(e.code)
        };
        this.connection.onerror = (e: CloseEvent) => {
            console.warn(`Room, onError (${e.code}): ${e.reason}`);
            this.onError.invoke(e.code, e.reason);
        };
        this.connection.open();
    }

    public leave(consented: boolean = true): void {
        if (this.connection) {
            if (consented) {
                this.connection.send([Protocol.LEAVE_ROOM]);

            } else {
                this.connection.close();
            }
        } else {
            this.onLeave.invoke(4000); // "consented" code
        }
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
    public onMessage<T = any>(
        type: '*' | string | number | typeof Schema,
        callback: (...args: any[]) => void
    ) {
        this.onMessageHandlers[this.getMessageHandlerKey(type)] = callback;
        return this;
    }

    public send(type: string | number, message?: any): void {
        const initialBytes: number[] = [Protocol.ROOM_DATA];

        if (typeof(type) === "string") {
            encode.string(initialBytes, type);

        } else {
            encode.number(initialBytes, type);
        }

        let arr: Uint8Array;

        if (message !== undefined) {
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

    // TODO: deprecate / move somewhere else
    // this method is useful only for FossilDeltaSerializer
    public listen(segments: string, callback: Function, immediate?: boolean) {
        if (this.serializerId === "schema") {
            console.error(`'${this.serializerId}' serializer doesn't support .listen() method here.`);
            return;

        } else if (!this.serializerId) {
            console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)");
        }

        return (this.serializer as FossilDeltaSerializer<State>).api.listen(segments, callback, immediate);
    }

    // TODO: deprecate / move somewhere else
    // this method is useful only for FossilDeltaSerializer
    public removeListener(listener: Listener) {
        return (this.serializer as FossilDeltaSerializer<State>).api.removeListener(listener)
    }

    public removeAllListeners() {
        if (this.serializer) {
            this.serializer.teardown();
        }
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
    }

    protected onMessageCallback(event: MessageEvent) {
        const bytes = Array.from(new Uint8Array(event.data))
        const code = bytes[0];

        if (code === Protocol.JOIN_ROOM) {
            let offset = 1;

            this.serializerId = utf8Read(bytes, offset);
            offset += utf8Length(this.serializerId);

            // get serializer implementation
            const serializer = getSerializer(this.serializerId);
            if (!serializer) {
                throw new Error("missing serializer: " + this.serializerId);
            }

            // TODO: remove this check
            if (this.serializerId !== "fossil-delta" && !this.rootSchema) {
                this.serializer = new serializer();
            }

            if (bytes.length > offset && this.serializer.handshake) {
                this.serializer.handshake(bytes, { offset: 1 });
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
            const context: Context = (this.serializer.getState() as any).constructor._context;
            const type = context.get(bytes[1]);

            const message: Schema = new (type as any)();
            message.decode(bytes, { offset: 2 });

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

        if (this.onMessageHandlers[messageType]) {
            this.onMessageHandlers[messageType](message);

        } else if (this.onMessageHandlers['*']) {
            (this.onMessageHandlers['*'] as any)(type, message);

        } else {
            console.warn(`onMessage not registered for type '${type}'.`);
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
