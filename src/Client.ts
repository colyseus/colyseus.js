import { post, get } from "@colyseus/http";

import { ServerError } from './errors/ServerError';
import { Room, RoomAvailable } from './Room';
import { Auth } from './Auth';
import { Push } from './Push';
import { SchemaConstructor } from './serializer/SchemaSerializer';

export type JoinOptions = any;

export class MatchMakeError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, MatchMakeError.prototype);
    }
}

export class Client {
    // static VERSION = process.env.VERSION;

    private static buildHttpEndpoint(endpoint: string): string {
        if (endpoint.startsWith('ws://')) {
            return `http://${endpoint.substring(5)}`;
        } else if (endpoint.startsWith('wss://')) {
            return `https://${endpoint.substring(6)}`;
        } else {
            return endpoint;
        }
    }

    public auth: Auth;
    public push: Push;

    protected httpEndpoint: string;
    protected wsEndpoint: string;

    constructor(endpoint: string = `${location.protocol.replace("http", "ws").replace("https", "wss")}//${location.hostname}${(location.port && `:${location.port}`)}`) {
        this.wsEndpoint =  endpoint;
        this.httpEndpoint = Client.buildHttpEndpoint(endpoint);
        this.auth = new Auth(this.httpEndpoint);
        this.push = new Push(this.httpEndpoint);
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
        const url = `${this.httpEndpoint}/matchmake/${roomName}`;
        return (await get(url, { headers: { 'Accept': 'application/json' } })).data;
    }

    public async consumeSeatReservation<T>(response: any, rootSchema?: SchemaConstructor<T>): Promise<Room<T>> {
        const room = this.createRoom<T>(response.room.name, rootSchema);
        room.id = response.room.roomId;
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
        const url = `${this.httpEndpoint}/matchmake/${method}/${roomName}`;

        // automatically forward auth token, if present
        if (this.auth.hasToken) {
            options.token = this.auth.token;
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

        return `${this.wsEndpoint}/${room.processId}/${room.roomId}?${params.join('&')}`;
    }
}
