import { Serializer } from "./Serializer";

import { StateContainer } from '@gamestdio/state-listener';
import * as jsonPatch from "fast-json-patch";

export class JSONPatchSerializer<T> implements Serializer<T, StateContainer> {
    api: StateContainer<T> = new StateContainer<T>({} as any);
    protected rawState: any;

    setState(rawState: any): void {
        this.rawState = rawState;
        this.api.set(this.rawState);
    }

    getState() {
        return this.api.state;
    }

    patch(patches) {
        this.setState(jsonPatch.applyPatch(this.rawState, patches).newDocument);
    }

    removeAllListeners() {
        this.api.removeAllListeners();
    }
}