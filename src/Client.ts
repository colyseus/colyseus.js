import * as msgpack from 'notepack.io';
import { Signal } from 'signals.js';

import { Connection } from './Connection';
import { Protocol } from './Protocol';
import { Room, RoomAvailable } from './Room';

export class Client {
    public id?: string;

    // signals
    public onOpen: Signal = new Signal();
    public onMessage: Signal = new Signal();
    public onClose: Signal = new Signal();
    public onError: Signal = new Signal();

    protected connection: Connection;

    protected rooms: {[id: string]: Room} = {};
    protected connectingRooms: {[id: string]: Room} = {};
    protected requestId = 0;

    protected hostname: string;
    protected storage: Storage = (typeof(cc) !== "undefined" && cc.sys && cc.sys.localStorage)
        ? cc.sys.localStorage  // compatibility with cocos creator
        : window.localStorage; // regular browser environment

    protected roomsAvailableRequests: {[requestId: number]: (value?: RoomAvailable[]) => void} = {};

    constructor(url: string) {
        this.hostname = url;
        const colyseusid: any = this.storage.getItem('colyseusid');

        if (
            typeof(Promise) === 'undefined' || // old browsers
            !(colyseusid instanceof Promise)
        ) {
            // browser has synchronous return
            this.connect(colyseusid);

        } else {
            // react-native is asynchronous
            colyseusid.then((id) => this.connect(id));
        }
    }

    public join<T>(roomName: string, options: any = {}): Room<T> {
        options.requestId = ++this.requestId;

        const room = new Room<T>(roomName, options);

        // remove references on leaving
        room.onLeave.addOnce(() => {
            delete this.rooms[room.id];
            delete this.connectingRooms[options.requestId];
        });

        this.connectingRooms[ options.requestId ] = room;

        this.connection.send([Protocol.JOIN_ROOM, roomName, options]);

        return room;
    }

    public getAvailableRooms(roomName: string, callback: (rooms: RoomAvailable[], err?: string) => void) {
        // reject this promise after 10 seconds.
        const requestId = ++this.requestId;
        const removeRequest = () => delete this.roomsAvailableRequests[requestId];
        const rejectionTimeout = setTimeout(() => {
            removeRequest();
            callback([], 'timeout');
        }, 10000);

        // send the request to the server.
        this.connection.send([Protocol.ROOM_LIST, requestId, roomName]);

        this.roomsAvailableRequests[requestId] = (roomsAvailable) => {
            removeRequest();
            clearTimeout(rejectionTimeout);
            callback(roomsAvailable);
        };
    }

    public close() {
        this.connection.close();
    }

    protected connect(colyseusid: string) {
        this.id = colyseusid || '';

        this.connection = this.createConnection();
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = (e) => this.onClose.dispatch();
        this.connection.onerror = (e) => this.onError.dispatch();

        // check for id on cookie
        this.connection.onopen = () => {
            if (this.id) {
                this.onOpen.dispatch();
            }
        };
    }

    protected createConnection(path: string = '', options: any = {}) {
        // append colyseusid to connection string.
        const params = [`colyseusid=${this.id}`];

        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }

        return new Connection(`${this.hostname}/${path}?${params.join('&')}`);
    }

    /**
     * @override
     */
    protected onMessageCallback(event) {
        const message = msgpack.decode( new Uint8Array(event.data) );
        const code = message[0];

        if (code === Protocol.USER_ID) {
            this.storage.setItem('colyseusid', message[1]);

            this.id = message[1];
            this.onOpen.dispatch();

        } else if (code === Protocol.JOIN_ROOM) {
            const requestId = message[2];
            const room = this.connectingRooms[ requestId ];

            if (!room) {
                console.warn('colyseus.js: client left room before receiving session id.');
                return;
            }

            this.rooms[room.id] = room;

            room.id = message[1];
            room.connect(this.createConnection(room.id, room.options));

            delete this.connectingRooms[ requestId ];

        } else if (code === Protocol.JOIN_ERROR) {
            console.error('colyseus.js: server error:', message[2]);

            // general error
            this.onError.dispatch(message[2]);

        } else if (code === Protocol.ROOM_LIST) {
            if (this.roomsAvailableRequests[message[1]]) {
                this.roomsAvailableRequests[message[1]](message[2]);

            } else {
                console.warn('receiving ROOM_LIST after timeout:', message[2]);
            }

        } else {
            this.onMessage.dispatch(message);
        }

    }

}
