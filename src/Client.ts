import { post, get } from "httpie";

import { Room, RoomAvailable } from './Room';
import { Auth } from './Auth';
import { Push } from './Push';
import { RootSchemaConstructor } from './serializer/SchemaSerializer';

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
    public auth: Auth;
    public push: Push;

    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.auth = new Auth(this.endpoint);
        this.push = new Push(this.endpoint);
    }

    public async joinOrCreate<T = any>(roomName: string, options: JoinOptions = {}, rootSchema?: RootSchemaConstructor) {
        return await this.createMatchMakeRequest<T>('joinOrCreate', roomName, options, rootSchema);
    }

    public async create<T = any>(roomName: string, options: JoinOptions = {}, rootSchema?: RootSchemaConstructor) {
        return await this.createMatchMakeRequest<T>('create', roomName, options, rootSchema);
    }

    public async join<T = any>(roomName: string, options: JoinOptions = {}, rootSchema?: RootSchemaConstructor) {
        return await this.createMatchMakeRequest<T>('join', roomName, options, rootSchema);
    }

    public async joinById<T = any>(roomId: string, options: JoinOptions = {}, rootSchema?: RootSchemaConstructor) {
        return await this.createMatchMakeRequest<T>('joinById', roomId, options, rootSchema);
    }

    public async reconnect<T = any>(roomId: string, sessionId: string, rootSchema?: RootSchemaConstructor) {
        return await this.createMatchMakeRequest<T>('joinById', roomId, { sessionId }, rootSchema);
    }

    public async getAvailableRooms(roomName?: string): Promise<RoomAvailable[]> {
        const url = `${this.endpoint.replace("ws", "http")}/matchmake/${roomName}`;
        return (await get(url, { headers: { 'Accept': 'application/json' } })).data;
    }

    protected async createMatchMakeRequest<T>(
        method: string,
        roomName: string,
        options: JoinOptions = {},
        rootSchema?: RootSchemaConstructor
    ): Promise<Room<T>> {
        const url = `${this.endpoint.replace("ws", "http")}/matchmake/${method}/${roomName}`;

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

        const room = this.createRoom<T>(roomName, rootSchema);
        room.id = response.room.roomId;
        room.sessionId = response.sessionId;

        room.connect(this.buildEndpoint(response.room, { sessionId: room.sessionId }));

        return new Promise((resolve, reject) => {
            const onError = (message) => reject(message);
            room.onError.once(onError);

            room.onJoin.once(() => {
                room.onError.remove(onError);
                resolve(room);
            });
        });
    }

    protected createRoom<T>(roomName: string, rootSchema?: RootSchemaConstructor) {
        return new Room<T>(roomName, rootSchema);
    }

    protected buildEndpoint(room: any, options: any = {}) {
        const params = [];

        // automatically forward auth token, if present
        if (this.auth.hasToken) {
            options.token = this.auth.token;
        }

        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }

        return `${this.endpoint}/${room.processId}/${room.roomId}?${params.join('&')}`;
    }

}
