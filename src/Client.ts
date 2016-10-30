import WebSocketClient from "websocket.js";
import * as msgpack from "msgpack-lite";

import { Protocol } from "./Protocol";
import { Room } from "./Room";

export class Client extends WebSocketClient {

    id?: string;
    rooms: { [id: string]: Room<any> } = {};

    private _enqueuedCalls: any[] = [];

    constructor ( url: string, protocols: string[] = null, options: any = {} ) {
        super(url, protocols, options);
        this.binaryType = "arraybuffer";
    }

    onOpenCallback (event) {
        if (this._enqueuedCalls.length > 0) {
            for (var i=0; i<this._enqueuedCalls.length; i++) {
                let [ method, args ] = this._enqueuedCalls[i];
                this[ method ].apply(this, args);
            }
        }
    }

    send (data: any): void {
        if (this.ws.readyState == WebSocket.OPEN) {
            return super.send( msgpack.encode(data) )

        } else {

            // WebSocket not connected.
            // Enqueue data to be sent when readyState == OPEN
            this._enqueuedCalls.push(['send', [data]])
        }
    }

    join<T> (roomName: string, options: any = {}): Room<T> {
        if (!this.rooms[ roomName ]) {
            this.rooms[ roomName ] = new Room<T>(this, roomName);
        }

        this.send([Protocol.JOIN_ROOM, roomName, options]);

        return this.rooms[ roomName ];
    }

    /**
     * @override
     */
    onMessageCallback (event) {
        var message = msgpack.decode( new Uint8Array(event.data) );

        if (typeof(message[0]) === "number") {
            let roomId = message[1];

            if (message[0] == Protocol.USER_ID) {
                this.id = roomId

                if (this.listeners['onopen']) {
                    this.listeners['onopen'].apply(null);
                }

                return true

            } else if (message[0] == Protocol.JOIN_ROOM) {
                // joining room from room name:
                // when first room message is received, keep only roomId association on `rooms` object
                if (this.rooms[ message[2] ]) {
                    this.rooms[ roomId ] = this.rooms[ message[2] ];
                    delete this.rooms[ message[2] ];
                }

                this.rooms[ roomId ].id = roomId;
                this.rooms[ roomId ].emit('join');

                return true;

            } else if (message[0] == Protocol.JOIN_ERROR) {
                let room = this.rooms[ roomId ];
                delete this.rooms[ roomId ];

                room.emit('error', message[2]);

                return true;

            } else if (message[0] == Protocol.LEAVE_ROOM) {

                this.rooms[ roomId ].emit('leave');

                return true;

            } else if (message[0] == Protocol.ROOM_STATE) {

                let state = message[2];
                let remoteCurrentTime = message[3];
                let remoteElapsedTime = message[4];

                this.rooms[ roomId ].setState( state, remoteCurrentTime, remoteElapsedTime );

                return true;

            } else if (message[0] == Protocol.ROOM_STATE_PATCH) {
                let patches = message[2];

                this.rooms[ roomId ].patch( patches );

                return true;

            } else if (message[0] == Protocol.ROOM_DATA) {

                this.rooms[ roomId ].emit('data', message[2]);
                message = [ message[2] ];

            }

        }

        if (this.listeners['onmessage']) {
            this.listeners['onmessage'].apply(null, message);
        }

    }

}
