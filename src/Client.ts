import * as msgpack from "msgpack-lite";
import { Signal } from "signals.js";

import * as cookie from "./Cookie";
import { Protocol } from "./Protocol";
import { Room } from "./Room";
import { Connection } from "./Connection";

export class Client {
    id?: string;

    connection: Connection;
    room: Room;

    // signals
    onOpen: Signal = new Signal();
    onMessage: Signal = new Signal();
    onClose: Signal = new Signal();
    onError: Signal = new Signal();

    constructor (url: string) {
        let colyseusid = cookie.getItem('colyseusid');
        if (colyseusid) {
            this.id = colyseusid;
        }

        this.connection = new Connection(url);
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = (e) => this.onClose.dispatch();
        this.connection.onerror = (e) => this.onError.dispatch();
    }

    join<T> (roomName: string, options: any = {}): Room<T> {
        this.room = new Room<T>(roomName);

        this.connection.send([Protocol.JOIN_ROOM, roomName, options]);

        return this.room;
    }

    /**
     * @override
     */
    protected onMessageCallback (event) {
        let message = msgpack.decode( new Uint8Array(event.data) );
        let code = message[0];

        if (code == Protocol.USER_ID) {
            cookie.setItem('colyseusid', message[1]);
            this.id = message[1];
            this.onOpen.dispatch();

        } else if (code == Protocol.JOIN_ROOM) {
            this.room.id = message[1];
            this.room.connect(new Connection(`${ this.connection.url }/${ this.room.id }`));
            // this.connection.close();

        } else if (code == Protocol.JOIN_ERROR) {
            console.error("server error:", message[2]);

            // general error
            this.onError.dispatch(message[2]);

        } else {
            this.onMessage.dispatch(message);
        }

    }

}
