import { Serializer } from "./Serializer";
import { Schema } from "@colyseus/schema"

export class SchemaSerializer<T> implements Serializer<T> {
    api: T;

    constructor (t: T) {
        this.api = t;
    }

    setState(rawState: any): void {
        (this.api as any).decode(rawState);
    }

    getState() {
        return this.api;
    }

    patch(patches) {
        (this.api as any).decode(patches);
    }

    removeAllListeners() {
        // this.api.onRemove
    }
}