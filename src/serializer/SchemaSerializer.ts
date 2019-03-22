import { Serializer } from "./Serializer";
import { Schema, Reflection } from "@colyseus/schema";

export class SchemaSerializer<T extends Schema> implements Serializer<T> {
    state: T;

    setState(rawState: any): void {
        (this.state as any).decode(rawState);
    }

    getState() {
        return this.state;
    }

    patch(patches) {
        (this.state as any).decode(patches);
    }

    teardown() {
        // this.state.onRemove
    }

    handshake(bytes: number[]) {
        this.state = Reflection.decode(bytes) as any;
    }
}
