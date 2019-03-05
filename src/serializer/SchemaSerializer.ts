import { Serializer } from "./Serializer";
import { Schema, Reflection } from "@colyseus/schema";

export class SchemaSerializer<T extends Schema> implements Serializer<T> {
    api: T;

    setState(rawState: any): void {
        (this.api as any).decode(rawState);
    }

    getState() {
        return this.api;
    }

    patch(patches) {
        (this.api as any).decode(patches);
    }

    teardown() {
        // this.api.onRemove
    }

    handshake(bytes: number[]) {
        this.api = Reflection.decode(bytes);
    }
}