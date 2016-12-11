import { Signal } from "signals.js";
import Clock = require("clock.js");

import { DeltaContainer } from "delta-listener";
import * as msgpack from "msgpack-lite";
import * as fossilDelta from "fossil-delta";

import { Protocol } from "./Protocol";
import { Client } from "./Client";

export class Room<T> {
    public id: number;
    public name: string;

    public state: DeltaContainer<T & any> = new DeltaContainer<T & any>({});

    public clock: Clock = new Clock();
    public remoteClock: Clock = new Clock();

    // Public signals
    public onJoin: Signal = new Signal();
    public onUpdate: Signal = new Signal();
    public onData: Signal = new Signal();
    public onError: Signal = new Signal();
    public onLeave: Signal = new Signal();

    public ping: number;
    private lastPatchTime: number;

    private client: Client;
    private _previousState: any;

    constructor (client: Client, name: string) {
        this.id = null;
        this.client = client;
        this.name = name;

        this.onLeave.add( this.removeAllListeners );
    }

    setState ( state: T, remoteCurrentTime?: number, remoteElapsedTime?: number ): void {
        this.state.set(state);
        this._previousState = msgpack.encode( state )

        // set remote clock properties
        if (remoteCurrentTime && remoteElapsedTime) {
            this.remoteClock.currentTime = remoteCurrentTime
            this.remoteClock.elapsedTime = remoteElapsedTime
        }

        this.clock.start();

        this.onUpdate.dispatch(state);
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

        // Set new state & trigger patch callbacks
        this.state.set( msgpack.decode( this._previousState ) );

        this.onUpdate.dispatch(this.state.data);
    }

    public leave (): void {
        if (this.id >= 0) {
            this.client.send([ Protocol.LEAVE_ROOM, this.id ]);
        }
    }

    public send (data): void {
        this.client.send([ Protocol.ROOM_DATA, this.id, data ]);
    }

    public removeAllListeners = (): void => {
        this.onJoin.removeAll();
        this.onUpdate.removeAll();
        this.onData.removeAll();
        this.onError.removeAll();
        this.onLeave.removeAll();
    }

}
