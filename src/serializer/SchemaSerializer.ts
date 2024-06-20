import { Serializer } from "./Serializer";
import { Schema, Decoder, Reflection, Iterator, getStateCallbacks as originalGetStateCallbacks } from "@colyseus/schema";
import type { Room } from "../Room";

export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;

export function getStateCallbacks<T extends Schema>(room: Room) {
    return originalGetStateCallbacks((room['serializer'] as unknown as SchemaSerializer<T>).decoder);
}

export class SchemaSerializer<T extends Schema = any> implements Serializer<T> {
    state: T;
    decoder: Decoder<T>;

    setState(encodedState: Buffer, it?: Iterator) {
        this.decoder.decode(encodedState, it);
    }

    getState() {
        return this.state;
    }

    patch(patches: Buffer, it?: Iterator) {
        return this.decoder.decode(patches, it);
    }

    teardown() {
        this.decoder.root.clearRefs();
    }

    handshake(bytes: Buffer, it?: Iterator) {
        if (this.state) {
            //
            // TODO:
            // validate definitions against concreate this.state instance
            //
            Reflection.decode(bytes, it);

        } else {
            // initialize reflected state from server
            this.state = Reflection.decode(bytes, it) as any;
        }

        this.decoder = new Decoder(this.state);
    }
}
