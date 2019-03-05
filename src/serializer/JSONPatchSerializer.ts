import { Serializer } from "./Serializer";

import { StateContainer } from '@gamestdio/state-listener';
import * as jsonPatch from "fast-json-patch";

/**
 * This serializer is not meant to be used.
 * It just ilustrates how you can implement your own data serializer.
 */
export class JSONPatchSerializer<T> implements Serializer<T> {
    api: StateContainer<T> = new StateContainer<T>({} as any);
    protected rawState: any;

    setState(rawState: any): void {
        this.rawState = this.getObjectFromString(rawState);
        this.api.set(this.rawState);
    }

    getState() {
        return this.api.state;
    }

    patch(patches) {
        this.rawState = jsonPatch.applyPatch(this.rawState, this.getObjectFromString(patches)).newDocument;
        this.api.set(this.rawState);
    }

    protected getObjectFromString(bytes: number[]) {
        let result = "";

        for (var i = 0; i < bytes.length; i++) {
            result += String.fromCharCode(bytes[i]);
        }

        return JSON.parse(result);
    }


    teardown() {
        this.api.removeAllListeners();
    }
}