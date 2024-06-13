import { Serializer } from "./Serializer";
import { Schema, Decoder, Reflection, Iterator } from "@colyseus/schema";

export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;

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
        return this.decoder.decode(patches);
    }

    teardown() {
        this.decoder.$root.clearRefs();
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
