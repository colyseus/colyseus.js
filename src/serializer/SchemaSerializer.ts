import { Serializer } from "./Serializer";
import { Schema, Reflection, Iterator } from "@colyseus/schema";

export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;

export class SchemaSerializer<T extends Schema = any> implements Serializer<T> {
    state: T;

    setState(rawState: any) {
        return this.state.decode(rawState);
    }

    getState() {
        return this.state;
    }

    patch(patches) {
        return this.state.decode(patches);
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
