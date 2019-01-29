import { Serializer } from "./Serializer";
import { Sync } from "@colyseus/schema"

export class SchemaSerializer<T> implements Serializer<T> {
    klass: any;
    api: T & Sync;

    constructor (t: T & Sync) {
        this.klass = t;
    }

    setState(rawState: any): void {
        this.api = new (this.klass)();
        this.api.decode(rawState);
    }

    getState() {
        return this.api;
    }

    patch(patches) {
        this.api.decode(patches);
    }

    removeAllListeners() {
        // this.api.onRemove
    }
}