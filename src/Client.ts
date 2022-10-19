import { post, get } from "httpie";

import { ServerError } from './errors/ServerError';
import { Room, RoomAvailable } from './Room';
import { Auth } from './Auth';
import { SchemaConstructor } from './serializer/SchemaSerializer';
import { ITransport, ITransportEventMap } from "./transport/ITransport";

export type JoinOptions = any;

export class MatchMakeError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, MatchMakeError.prototype);
    }
}

// - React Native does not provide `window.location`
// - Cocos Creator (Native) does not provide `window.location.hostname`
const DEFAULT_ENDPOINT = (typeof (window) !== "undefined" &&  typeof (window?.location?.hostname) !== "undefined")
    ? `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}${(window.location.port && `:${window.location.port}`)}`
    : "ws://127.0.0.1:2567";

export class Client {
    protected endpoint: string;
    protected _auth: Auth;
    protected transport: ITransport;

    
   constructor(endpoint: string = DEFAULT_ENDPOINT, options: any) {
    this.endpoint = endpoint;
    this.transport = options.transport;
  }

    public get auth(): Auth {
        if (!this._auth) { this._auth = new Auth(this.endpoint); }
        return this._auth;
    }

    public async joinOrCreate<T>(roomName: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        return await this.createMatchMakeRequest<T>('joinOrCreate', roomName, options, rootSchema);
    }

    public async create<T>(roomName: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        return await this.createMatchMakeRequest<T>('create', roomName, options, rootSchema);
    }

    public async join<T>(roomName: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        return await this.createMatchMakeRequest<T>('join', roomName, options, rootSchema);
    }

    public async joinById<T>(roomId: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        return await this.createMatchMakeRequest<T>('joinById', roomId, options, rootSchema);
    }

    public async reconnect<T>(roomId: string, sessionId: string, rootSchema?: SchemaConstructor<T>) {
        return await this.createMatchMakeRequest<T>('joinById', roomId, { sessionId }, rootSchema);
    }

    public async getAvailableRooms<Metadata= any>(roomName: string = ""): Promise<RoomAvailable<Metadata>[]> {
        const url = `${this.endpoint.replace("ws", "http")}/matchmake/${roomName}`;
        return (await get(url, { headers: { 'Accept': 'application/json' } })).data;
    }

    public async consumeSeatReservation<T>(response: any, rootSchema?: SchemaConstructor<T>): Promise<Room<T>> {
        const room = this.createRoom<T>(response.room.name, rootSchema);
        room.roomId = response.room.roomId;
        room.sessionId = response.sessionId;

        room.connect(this.buildEndpoint(response.room, { sessionId: room.sessionId }));

        return new Promise((resolve, reject) => {
            const onError = (code, message) => reject(new ServerError(code, message));
            room.onError.once(onError);

            room['onJoin'].once(() => {
                room.onError.remove(onError);
                resolve(room);
            });
        });
    }

    protected async createMatchMakeRequest<T>(
        method: string,
        roomName: string,
        options: JoinOptions = {},
        rootSchema?: SchemaConstructor<T>
    ) {
        const url = `${this.endpoint.replace("ws", "http")}/matchmake/${method}/${roomName}`;

        // automatically forward auth token, if present
        if (this._auth && this._auth.hasToken) {
            options.token = this._auth.token;
        }

        const response = (
            await post(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options)
            })
        ).data;

        if (response.error) {
            throw new MatchMakeError(response.error, response.code);
        }

        return this.consumeSeatReservation<T>(response, rootSchema);
    }

    protected createRoom<T>(roomName: string, rootSchema?: SchemaConstructor<T>) {
        return new Room<T>(roomName, rootSchema);
    }

    protected buildEndpoint(room: any, options: any = {}) {
        const params = [];

        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }

        return `${this.endpoint}/${room.processId}/${room.roomId}?${params.join('&')}`;
    }

}
