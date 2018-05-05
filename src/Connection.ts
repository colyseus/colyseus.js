import WebSocketClient from '@gamestdio/websocket';
import * as msgpack from 'notepack.io';

import { Protocol } from './Protocol';

const PING_INTERVAL = 15 * 1000; // send ping each 15 seconds.

export class Connection extends WebSocketClient {

    private _enqueuedCalls: any[] = [];
    private _pingInterval: number;

    constructor(url, query: any = {}) {
        super(url);

        this.binaryType = 'arraybuffer';
    }

    public onOpenCallback(event) {
        super.onOpenCallback();

        this._pingInterval = setInterval(() => this.ping(), PING_INTERVAL) as any;

        if (this._enqueuedCalls.length > 0) {
            for (const [method, args] of this._enqueuedCalls) {
                this[method].apply(this, args);
            }
        }
    }

    public onCloseCallback(event) {
        super.onCloseCallback();
        clearInterval(this._pingInterval);
    }

    public send(data: any): void {
        if (this.ws.readyState === WebSocket.OPEN) {
            return super.send( msgpack.encode(data) );

        } else {
            console.warn(`colyseus.js: trying to send data while in ${ this.ws.readyState } state`);

            // WebSocket not connected.
            // Enqueue data to be sent when readyState == OPEN
            this._enqueuedCalls.push(['send', [data]]);
        }
    }

    protected ping() {
        this.send([Protocol.PING]);
    }

}
