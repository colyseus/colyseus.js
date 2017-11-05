import WebSocketClient from "@gamestdio/websocket";
import * as msgpack from "notepack.io";

export class Connection extends WebSocketClient {

    private _enqueuedCalls: any[] = [];

    constructor (url, query: any = {}) {
        super(url);

        this.binaryType = "arraybuffer";
    }

    onOpenCallback (event) {
        super.onOpenCallback();

        if (this._enqueuedCalls.length > 0) {
            for (let i=0; i<this._enqueuedCalls.length; i++) {
                let [ method, args ] = this._enqueuedCalls[i];
                this[ method ].apply(this, args);
            }
        }
    }

    send (data: any): void {
        if (this.ws.readyState == WebSocket.OPEN) {
            return super.send( msgpack.encode(data) )

        } else {
            console.warn(`colyseus.js: trying to send data while in ${ this.ws.readyState } state`);

            // WebSocket not connected.
            // Enqueue data to be sent when readyState == OPEN
            this._enqueuedCalls.push(['send', [data]])
        }
    }

}
