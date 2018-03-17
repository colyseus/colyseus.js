import { Signal } from "signals.js";
import Clock = require("@gamestdio/clock");

import { DeltaContainer } from "delta-listener";
import * as msgpack from "notepack.io";
import * as fossilDelta from "fossil-delta";

import { Protocol } from "./Protocol";
import { Client } from "./Client";
import { Connection } from "./Connection";

export class Room<T=any> extends DeltaContainer<T & any> {
    public id: string;
    public sessionId: string;

    public name: string;
    public options: any;

    public clock: Clock = new Clock(); // experimental
    public remoteClock: Clock = new Clock(); // experimental

    // Public signals
    public onJoin: Signal = new Signal();
    public onStateChange: Signal = new Signal();
    public onData: Signal = new Signal();
    public onError: Signal = new Signal();
    public onLeave: Signal = new Signal();

    public ping: number; // experimental
    private lastPatchTime: number;

    public connection: Connection;
    private _previousState: any;

    constructor (name: string, options?: any) {
        super({});
        this.id = null;

        this.name = name;
        this.options = options;

        this.onLeave.add( () => this.removeAllListeners() );
    }

    connect (connection: Connection) {
        this.connection = connection;
        this.connection.reconnectEnabled = false;
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = (e) => this.onLeave.dispatch(e);
        this.connection.onerror = (e) => {
            console.warn(`Possible causes: room's onAuth() failed or maxClients has been reached.`);
            this.onError.dispatch(e);
        };
    }

    protected onMessageCallback (event) {
        let message = msgpack.decode( new Uint8Array(event.data) );
        let code = message[0];

        if (code == Protocol.JOIN_ROOM) {
            this.sessionId = message[1];
            this.onJoin.dispatch();

        } else if (code == Protocol.JOIN_ERROR) {
            console.error(`Error: ${message[1]}`);
            this.onError.dispatch(message[1]);

        } else if (code == Protocol.ROOM_STATE) {
            let state = message[1];
            let remoteCurrentTime = message[2];
            let remoteElapsedTime = message[3];

            this.setState( state, remoteCurrentTime, remoteElapsedTime );

        } else if (code == Protocol.ROOM_STATE_PATCH) {
            this.patch( message[1] );

        } else if (code == Protocol.ROOM_DATA) {
            this.onData.dispatch(message[1]);

        } else if (code == Protocol.LEAVE_ROOM) {
            this.leave();
        }
    }

    protected setState ( encodedState: Buffer, remoteCurrentTime?: number, remoteElapsedTime?: number ): void {
        let state = msgpack.decode(encodedState);
        this.set(state);

        this._previousState = new Uint8Array( encodedState );

        // set remote clock properties
        if (remoteCurrentTime && remoteElapsedTime) {
            this.remoteClock.currentTime = remoteCurrentTime
            this.remoteClock.elapsedTime = remoteElapsedTime
        }

        this.clock.start();

        this.onStateChange.dispatch(state);
    }

    protected patch ( binaryPatch ) {
        //
        // calculate client-side ping
        //
        let patchTime = Date.now();

        if ( this.lastPatchTime ) {
            this.ping = patchTime - this.lastPatchTime;
        }

        this.lastPatchTime = patchTime;

        this.clock.tick();

        // apply patch
        this._previousState = Buffer.from(fossilDelta.apply( this._previousState, binaryPatch));

        // trigger state callbacks
        this.set( msgpack.decode( this._previousState ) );

        this.onStateChange.dispatch(this.data);
    }

    public leave (): void {
        if (this.connection) {
            this.connection.close();

        } else {
            this.onLeave.dispatch();
        }
    }

    public send (data): void {
        this.connection.send([ Protocol.ROOM_DATA, this.id, data ]);
    }

    public removeAllListeners () {
        super.removeAllListeners();
        this.onJoin.removeAll();
        this.onStateChange.removeAll();
        this.onData.removeAll();
        this.onError.removeAll();
        this.onLeave.removeAll();
    }

}
