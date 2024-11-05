import { ServerError } from './errors/ServerError';
import { Room, RoomAvailable } from './Room';
import { SchemaConstructor } from './serializer/SchemaSerializer';
import { HTTP } from "./HTTP";
import { Auth } from './Auth';
import { discordURLBuilder } from './3rd_party/discord';

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

export interface EndpointSettings {
    hostname: string,
    secure: boolean,
    port?: number,
    pathname?: string,
}

export class Client {
    public http: HTTP;
    public auth: Auth;

    protected settings: EndpointSettings;
    protected urlBuilder: (url: URL) => string;

    constructor(
        settings: string | EndpointSettings = DEFAULT_ENDPOINT,
        customURLBuilder?: (url: URL) => string
    ) {
        if (typeof (settings) === "string") {

            //
            // endpoint by url
            //
            const url = (settings.startsWith("/"))
                ? new URL(settings, DEFAULT_ENDPOINT)
                : new URL(settings);

            const secure = (url.protocol === "https:" || url.protocol === "wss:");
            const port = Number(url.port || (secure ? 443 : 80));

            this.settings = {
                hostname: url.hostname,
                pathname: url.pathname,
                port,
                secure
            };

        } else {
            //
            // endpoint by settings
            //
            if (settings.port === undefined) {
                settings.port = (settings.secure) ? 443 : 80;
            }
            if (settings.pathname === undefined) {
                settings.pathname = "";
            }
            this.settings = settings;
        }

        // make sure pathname does not end with "/"
        if (this.settings.pathname.endsWith("/")) {
            this.settings.pathname = this.settings.pathname.slice(0, -1);
        }

        this.http = new HTTP(this);
        this.auth = new Auth(this.http);

        this.urlBuilder = customURLBuilder;

        //
        // Discord Embedded SDK requires a custom URL builder
        //
        if (
            !this.urlBuilder &&
            typeof (window) !== "undefined" &&
            window?.location?.hostname?.includes("discordsays.com")
        ) {
            this.urlBuilder = discordURLBuilder;
            console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder.");
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
    public async reconnect<T>(reconnectionToken: string, rootSchema?: SchemaConstructor<T>) : Promise<Room<T>>;
    /**
     * Re-establish connection with a room this client was previously connected to.
     *
     * @param room The previously connected room.
     * @returns Promise<Room> - The room that was passed in.
     */
    public async reconnect<T>(room: Room<T>) : Promise<Room<T>>;
    public async reconnect<T>(value: string | Room<T>, rootSchema?: SchemaConstructor<T>) {
        const { reconnectionToken, room } = typeof (value) === "object" ? { reconnectionToken: value.reconnectionToken, room: value } : { reconnectionToken: value, room: undefined };
        if (typeof (reconnectionToken) === "string" && typeof (rootSchema) === "string") {
            throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");
        }
        const [roomId, token] = reconnectionToken.split(":");
		if (!roomId || !token) {
			throw new Error("Invalid reconnection token format.\nThe format should be roomId:reconnectionToken");
		}
        return await this.createMatchMakeRequest<T>('reconnect', roomId, { reconnectionToken: token }, rootSchema, room);
    }

    public async getAvailableRooms<Metadata = any>(roomName: string = ""): Promise<RoomAvailable<Metadata>[]> {
        return (
            await this.http.get(`matchmake/${roomName}`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
        ).data;
    }

    public async consumeSeatReservation<T>(
        response: any,
        rootSchema?: SchemaConstructor<T>,
        reuseRoomInstance?: Room, // used in devMode and when reconnecting in place
        simpleConnect: boolean = false
    ): Promise<Room<T>> {
        
        const room = reuseRoomInstance ?? this.createRoom<T>(response.room.name, rootSchema);
        room.roomId = response.room.roomId;
        room.sessionId = response.sessionId;

        const options: any = { sessionId: room.sessionId };

        // forward "reconnection token" in case of reconnection.
        if (response.reconnectionToken) {
            options.reconnectionToken = response.reconnectionToken;
        }

        const targetRoom = reuseRoomInstance || room;

        // true if reconnecting in place
        if (simpleConnect) {
            room.connection.connect(this.buildEndpoint(response.room, options));
        } else {
            room.connect(this.buildEndpoint(response.room, options), response.devMode && (async () => {
                console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x1F504)} Re-establishing connection with room id '${room.roomId}'...`); // 🔄

                let retryCount = 0;
                let retryMaxRetries = 8;

                const retryReconnection = async () => {
                    retryCount++;

                    try {
                        await this.consumeSeatReservation(response, rootSchema, targetRoom);
                        console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x2705)} Successfully re-established connection with room '${room.roomId}'`); // ✅

                    } catch (e) {
                        if (retryCount < retryMaxRetries) {
                            console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x1F504)} retrying... (${retryCount} out of ${retryMaxRetries})`); // 🔄
                            setTimeout(retryReconnection, 2000);

                        } else {
                            console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x274C)} Failed to reconnect. Is your server running? Please check server logs.`); // ❌
                        }
                    }
                };

                setTimeout(retryReconnection, 2000);
            }), targetRoom);
        }

        return new Promise((resolve, reject) => {
            const onError = (code, message) => reject(new ServerError(code, message));
            targetRoom.onError.once(onError);

            targetRoom['onJoin'].once(() => {
                targetRoom.onError.remove(onError);
                resolve(targetRoom);
            });
        });
    }

    protected async createMatchMakeRequest<T>(
        method: string,
        roomName: string,
        options: JoinOptions = {},
        rootSchema?: SchemaConstructor<T>,
        reuseRoomInstance?: Room,
    ) {
        const response = (
            await this.http.post(`matchmake/${method}/${roomName}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options)
            })
        ).data;

        // FIXME: HTTP class is already handling this as ServerError.
        if (response.error) {
            throw new MatchMakeError(response.error, response.code);
        }

        // forward reconnection token during "reconnect" methods.
        if (method === "reconnect") {
            response.reconnectionToken = options.reconnectionToken;
        }

        return await this.consumeSeatReservation<T>(response, rootSchema, reuseRoomInstance, !!reuseRoomInstance);
    }

    protected createRoom<T>(roomName: string, rootSchema?: SchemaConstructor<T>) {
        return new Room<T>(roomName, rootSchema);
    }

    protected buildEndpoint(room: any, options: any = {}) {
        const params = [];

        // append provided options
        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }

        let endpoint = (this.settings.secure)
            ? "wss://"
            : "ws://"

        if (room.publicAddress) {
            endpoint += `${room.publicAddress}`;

        } else {
            endpoint += `${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;
        }

        const endpointURL = `${endpoint}/${room.processId}/${room.roomId}?${params.join('&')}`;
        return (this.urlBuilder)
            ? this.urlBuilder(new URL(endpointURL))
            : endpointURL;
    }

    protected getHttpEndpoint(segments: string = '') {
        const path = segments.startsWith("/") ? segments : `/${segments}`;
        const endpointURL = `${(this.settings.secure) ? "https" : "http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${path}`;
        return (this.urlBuilder)
            ? this.urlBuilder(new URL(endpointURL))
            : endpointURL;
    }

    protected getEndpointPort() {
        return (this.settings.port !== 80 && this.settings.port !== 443)
            ? `:${this.settings.port}`
            : "";
    }
}
