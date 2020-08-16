import { Serializer } from "./Serializer";
import { Schema, Reflection } from "@colyseus/schema";
import { Iterator } from "@colyseus/schema/lib/encoding/decode";

export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;

export class SchemaSerializer<T extends Schema = any> implements Serializer<T> {
    state: T;

    setState(rawState: any): void {
        this.state.decode(rawState);
    }

    getState() {
        return this.state;
    }

    patch(patches) {
        this.state.decode(patches);
    }

    teardown() {
        this.state?.['$changes']?.root.clearRefs();
    }

    handshake(bytes: number[], it?: Iterator) {
        if (this.state) {
            // validate client/server definitinos
            const reflection = new Reflection();
            reflection.decode(bytes, it);

        } else {
            // initialize reflected state from server
            this.state = Reflection.decode(bytes, it) as any;
        }
    }
}
