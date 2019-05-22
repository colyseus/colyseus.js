import * as msgpack from './msgpack';
import { Signal } from '@gamestdio/signals';

import { Connection } from './Connection';
import { Protocol, utf8Read } from './Protocol';
import { Room, RoomAvailable } from './Room';
import { getItem, setItem } from './Storage';
import { Auth } from './Auth';
import { RootSchemaConstructor } from './serializer/SchemaSerializer';

export type JoinOptions = { retryTimes: number, requestId: number } & any;

export class Client {
    public id?: string;
    public auth: Auth;

    // signals
    public onOpen: Signal = new Signal();
    public onClose: Signal = new Signal();
    public onError: Signal = new Signal();

    protected connection: Connection;

    protected rooms: {[id: string]: Room} = {};
    protected connectingRooms: {[id: string]: Room} = {};
    protected requestId = 0;

    protected hostname: string;
    protected roomsAvailableRequests: {[requestId: number]: (value?: RoomAvailable[]) => void} = {};

    protected previousCode: number;

    constructor(url: string, options: any = {}) {
        this.hostname = url;
        this.auth = new Auth(this.hostname);
        getItem('colyseusid', (colyseusid) => this.connect(colyseusid, options));
    }

    public join<T>(roomName: string, options: JoinOptions = {}, rootSchema?: RootSchemaConstructor) {
        return this.createRoomRequest<T>(roomName, options, rootSchema);
    }

    public rejoin<T>(roomName: string, options: JoinOptions, rootSchema?: RootSchemaConstructor) {
        if (!options.sessionId) {
            throw new Error("'sessionId' options is required for 'rejoin'.");
        }
        return this.join<T>(roomName, options, rootSchema);
    }

    public getAvailableRooms(roomName: string, callback: (rooms: RoomAvailable[], err?: string) => void) {
        // reject this promise after 15 seconds.
        const requestId = this.getNextRequestId();
        const removeRequest = () => delete this.roomsAvailableRequests[requestId];
        const rejectionTimeout = setTimeout(() => {
            removeRequest();
            callback([], 'timeout');
        }, 15000);

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

    protected createRoom<T>(roomName: string, options: any = {}, rootSchema?: RootSchemaConstructor) {
        return new Room<T>(roomName, options, rootSchema);
    }

    protected createRoomRequest<T>(
        roomName: string,
        options: JoinOptions,
        rootSchema?: RootSchemaConstructor,
        reuseRoomInstance?: Room<T>,
        retryCount?: number,
    ) {
        options.requestId = this.getNextRequestId();

        // automatically forward auth token, if present
        if (this.auth.hasToken) {
            options.token = this.auth.token;
        }

        const room = reuseRoomInstance || this.createRoom<T>(roomName, options, rootSchema);

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
                    this.createRoomRequest(roomName, options, rootSchema, room, retryCount);
                }
            });
        }

        this.connectingRooms[ options.requestId ] = room as any;

        this.connection.send([Protocol.JOIN_REQUEST, roomName, options]);

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
    protected onMessageCallback(event: MessageEvent) {
        if (!this.previousCode) {
            const view = new DataView(event.data)
            const code = view.getUint8(0);

            if (code === Protocol.USER_ID) {
                this.id = utf8Read(view, 1);
                setItem('colyseusid', this.id);

                this.onOpen.dispatch();

            } else if (code === Protocol.JOIN_REQUEST) {
                const requestId = view.getUint8(1);
                const room = this.connectingRooms[requestId];
                let processPath: string = '';

                if (!room) {
                    console.warn('colyseus.js: client left room before receiving session id.');
                    return;
                }

                room.id = utf8Read(view, 2);
                this.rooms[room.id] = room;

                const nextIndex = 3 + room.id.length;
                if (view.byteLength > nextIndex) {
                    processPath = utf8Read(view, nextIndex) +  "/";
                }

                room.connect(this.buildEndpoint(processPath + room.id, room.options));
                delete this.connectingRooms[requestId];

            } else if (code === Protocol.JOIN_ERROR) {
                const err = utf8Read(view, 1);
                console.error('colyseus.js: server error:', err);

                // general error
                this.onError.dispatch(err);

            } else if (code === Protocol.ROOM_LIST) {
                this.previousCode = code;
            }

        } else {
            if (this.previousCode === Protocol.ROOM_LIST) {
                const [requestId, rooms] = msgpack.decode(new Uint8Array(event.data));

                if (this.roomsAvailableRequests[requestId]) {
                    this.roomsAvailableRequests[requestId](rooms);

                } else {
                    console.warn('receiving ROOM_LIST after timeout:', rooms);
                }
            }

            this.previousCode = undefined;
        }

    }

    protected getNextRequestId() {
        return (++this.requestId % 255);
    }

}
