import { Serializer } from "./Serializer";

import { StateContainer } from '@gamestdio/state-listener';
import * as fossilDelta from 'fossil-delta';
import * as msgpack from '../msgpack';

export class FossilDeltaSerializer<State= any> implements Serializer<State> {
    api: StateContainer<State> = new StateContainer<State>({} as State);
    protected previousState: any;

    getStateAPI() {
        return this.api;
    }

    getState(): State {
        return this.api.state;
    }

    setState(encodedState: any): void {
        this.previousState = new Uint8Array(encodedState);
        this.api.set(msgpack.decode(this.previousState));
    }

    patch(binaryPatch) {
        // apply patch
        this.previousState = new Uint8Array(fossilDelta.apply(this.previousState, binaryPatch));

        // trigger update callbacks
        this.api.set(msgpack.decode(this.previousState));
    }

    removeAllListeners() {
        this.api.removeAllListeners();
    }
}