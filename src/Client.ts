import { post, get } from "httpie";

import { ServerError } from './errors/ServerError';
import { Room, RoomAvailable } from './Room';
import { Auth } from './Auth';
import { SchemaConstructor } from './serializer/SchemaSerializer';

export type JoinOptions = any;

export let devMode: boolean = false;

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

export interface EndpointSettings {
    hostname: string,
    port: number,
    useSSL: boolean,
}

export class Client {
    protected settings: EndpointSettings;

    constructor(settings: string | EndpointSettings = DEFAULT_ENDPOINT) {
        if (typeof (settings) === "string") {
            const url = new URL(settings);
            const useSSL = (url.protocol === "https:" || url.protocol === "wss:");
            const port = Number(url.port || (useSSL ? 443 : 80));

            this.settings = {
                hostname: url.hostname,
                port,
                useSSL
            };

        } else {
            this.settings = settings;
        }
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

    /**
     * Re-establish connection with a room this client was previously connected to.
     *
     * @param reconnectionToken The `room.reconnectionToken` from previously connected room.
     * @param rootSchema (optional) Concrete root schema definition
     * @returns Promise<Room>
     */
    public async reconnect<T>(reconnectionToken: string, rootSchema?: SchemaConstructor<T>) {
        if (typeof (reconnectionToken) === "string" && typeof (rootSchema) === "string") {
            throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");
        }
        const [roomId, token] = reconnectionToken.split(":");
        return await this.createMatchMakeRequest<T>('reconnect', roomId, { reconnectionToken: token }, rootSchema);
    }

    public async getAvailableRooms<Metadata = any>(roomName: string = ""): Promise<RoomAvailable<Metadata>[]> {
        return (
            await get(this.getHttpEndpoint(`${roomName}`), {
                headers: {
                    'Accept': 'application/json'
                }
            })
        ).data;
    }

    public async consumeSeatReservation<T>(response: any, rootSchema?: SchemaConstructor<T>): Promise<Room<T>> {
        const room = this.createRoom<T>(response.room.name, rootSchema);
        room.roomId = response.room.roomId;
        room.sessionId = response.sessionId;

        const options: any = { sessionId: room.sessionId };

        // forward "reconnection token" in case of reconnection.
        if (response.reconnectionToken) {
            options.reconnectionToken = response.reconnectionToken;
        }

        room.connect(this.buildEndpoint(response.room, options));

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
        const response = (
            await post(this.getHttpEndpoint(`${method}/${roomName}`), {
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

        // forward reconnection token during "reconnect" methods.
        if (method === "reconnect") {
            response.reconnectionToken = options.reconnectionToken;
        }

        // Set dev mode properties
        if (response.hasOwnProperty('devMode')) {
            devMode = response.devMode;
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

        let endpoint = (this.settings.useSSL)
            ? "wss://"
            : "ws://"

        if (room.publicAddress) {
            endpoint += `${room.publicAddress}`;

        } else {
            endpoint += `${this.settings.hostname}${this.getEndpointPort()}`;
        }

        return `${endpoint}/${room.processId}/${room.roomId}?${params.join('&')}`;
    }

    protected getHttpEndpoint(segments: string) {
        return `${(this.settings.useSSL) ? "https" : "http"}://${this.settings.hostname}${this.getEndpointPort()}/matchmake/${segments}`;
    }

    protected getEndpointPort() {
        return (this.settings.port !== 80 && this.settings.port !== 443)
            ? `:${this.settings.port}`
            : "";
    }

}
