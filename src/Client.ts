import { Signal } from '@gamestdio/signals';
import * as msgpack from './msgpack';

import { Connection } from './Connection';
import { Protocol } from './Protocol';
import { Room, RoomAvailable } from './Room';
import { getItem, setItem } from './Storage';

export type JoinOptions = { retryTimes: number, requestId: number } & any;

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
    protected roomsAvailableRequests: {[requestId: number]: (value?: RoomAvailable[]) => void} = {};

    constructor(url: string, options: any = {}) {
        this.hostname = url;
        getItem('colyseusid', (colyseusid) => this.connect(colyseusid, options));
    }

    public join<T>(roomName: string, options: JoinOptions = {}): Room<T> {
        return this.createRoomRequest<T>(roomName, options);
    }

    public rejoin<T>(roomName: string, sessionId: string) {
        return this.join(roomName, { sessionId });
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

    protected createRoom<T>(roomName: string, options: any = {}): Room<T> {
        return new Room<T>(roomName, options);
    }

    protected createRoomRequest<T> (roomName: string, options: JoinOptions, reuseRoomInstance?: Room<T>, retryCount?: number) {
        options.requestId = ++this.requestId;

        const room = reuseRoomInstance || this.createRoom<T>(roomName, options);

        // remove references on leaving
        room.onLeave.addOnce(() => {
            delete this.rooms[room.id];
            delete this.connectingRooms[options.requestId];
        });

        //
        // retry joining the room in case the server couldn't matchmake into it
        //
        // TODO: improve match-making routine https://github.com/gamestdio/colyseus/issues/176
        //
        if (options.retryTimes) {
            room.onError.addOnce(() => {
                retryCount = retryCount || 0;
                if (!room.hasJoined && retryCount <= options.retryTimes) {
                    retryCount++;
                    this.createRoomRequest(roomName, options, room, retryCount);
                }
            });
        }

        this.connectingRooms[ options.requestId ] = room;

        this.connection.send([Protocol.JOIN_ROOM, roomName, options]);

        return room;

    }

    protected connect(colyseusid: string, options: any = {}) {
        this.id = colyseusid || '';

        this.connection = new Connection(this.buildEndpoint('', options));
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = (e) => this.onClose.dispatch(e);
        this.connection.onerror = (e) => this.onError.dispatch(e);

        // check for id on cookie
        this.connection.onopen = () => {
            if (this.id) {
                this.onOpen.dispatch();
            }
        };
    }

    protected buildEndpoint(path: string = '', options: any = {}) {
        // append colyseusid to connection string.
        const params = [`colyseusid=${this.id}`];

        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }

        return `${this.hostname}/${path}?${params.join('&')}`;
    }

    /**
     * @override
     */
    protected onMessageCallback(event) {
        const message = msgpack.decode( new Uint8Array(event.data) );
        const code = message[0];

        if (code === Protocol.USER_ID) {
            setItem('colyseusid', message[1]);

            this.id = message[1];
            this.onOpen.dispatch();

        } else if (code === Protocol.JOIN_ROOM) {
            const requestId = message[2];
            const room = this.connectingRooms[ requestId ];

            if (!room) {
                console.warn('colyseus.js: client left room before receiving session id.');
                return;
            }

            room.id = message[1];
            this.rooms[room.id] = room;

            room.connect(this.buildEndpoint(room.id, room.options));
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
