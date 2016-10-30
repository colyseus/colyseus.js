import { Signal } from "signals.js";
import Clock = require("clock.js");

import * as jsonpatch from "fast-json-patch";
import * as msgpack from "msgpack-lite";
import * as fossilDelta from "fossil-delta";

import { Protocol } from "./Protocol";
import { Client } from "./Client";

export class Room<T> {
    id: string;
    name: string;

    client: Client;
    state: T & any;

    lastPatchTime: number;
    ping: number;

    clock: Clock;
    remoteClock: Clock;

    // Public signals
    onJoin: Signal = new Signal();
    onPatch: Signal = new Signal();
    onUpdate: Signal = new Signal();
    onData: Signal = new Signal();
    onError: Signal = new Signal();
    onLeave: Signal = new Signal();

    constructor (client: Client, name: string) {
        super()

        this.id = null;
        this.client = client;

        this.name = name;
        this.state = {};

        this.clock = new Clock();
        this.remoteClock = new Clock();

        this.lastPatchTime = null;
        this.ping = null;

        this.on('leave', () => this.removeAllListeners())
    }

    setState ( state: T, remoteCurrentTime?: number, remoteElapsedTime?: number ) {
        this.state = state
        this._previousState = msgpack.encode( this.state )

        // set remote clock properties
        if (remoteCurrentTime && remoteElapsedTime) {
            this.remoteClock.currentTime = remoteCurrentTime
            this.remoteClock.elapsedTime = remoteElapsedTime
        }

        this.clock.start();

        this.emit('update', state);
    }

    patch ( binaryPatch ) {
        //
        // calculate client-side ping
        //
        let patchTime = Date.now();

        if ( this.lastPatchTime ) {
            this.ping = patchTime - this.lastPatchTime;
        }

        this.lastPatchTime = patchTime;

        this.clock.tick();

        //
        // apply patch
        //
        this._previousState = fossilDelta.apply( this._previousState, binaryPatch );
        let newState = msgpack.decode( this._previousState );

        let patches = jsonpatch.compare( this.state, newState );
        this.emit('patch', patches);

        this.state = newState;
        this.emit('update', this.state, patches);
    }

    leave () {
        if (this.id >= 0) {
            this.client.send([ Protocol.LEAVE_ROOM, this.id ]);
        }
    }

    send (data) {
        this.client.send([ Protocol.ROOM_DATA, this.id, data ]);
    }

}
