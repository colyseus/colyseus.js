// colyseus.js@0.16.0-preview.24
import { ServerError } from './errors/ServerError.mjs';
import { Room } from './Room.mjs';
import { HTTP } from './HTTP.mjs';
import { Auth } from './Auth.mjs';
import { discordURLBuilder } from './3rd_party/discord.mjs';

class MatchMakeError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, MatchMakeError.prototype);
    }
}
// - React Native does not provide `window.location`
// - Cocos Creator (Native) does not provide `window.location.hostname`
const DEFAULT_ENDPOINT = (typeof (window) !== "undefined" && typeof (window?.location?.hostname) !== "undefined")
    ? `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}${(window.location.port && `:${window.location.port}`)}`
    : "ws://127.0.0.1:2567";
class Client {
    static VERSION = "0.16.0-preview.24";
    http;
    auth;
    settings;
    urlBuilder;
    externalMatchMaker;
    constructor(settings = DEFAULT_ENDPOINT, customURLBuilder, externalMatchMaker) {
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
        }
        else {
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
        if (!this.urlBuilder &&
            typeof (window) !== "undefined" &&
            window?.location?.hostname?.includes("discordsays.com")) {
            this.urlBuilder = discordURLBuilder;
            console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder.");
        }
        if (externalMatchMaker) {
            this.externalMatchMaker = new HTTP(this);
        }
    }
    async joinOrCreate(roomName, options = {}, rootSchema) {
        return await this.createMatchMakeRequest('joinOrCreate', roomName, options, rootSchema);
    }
    async create(roomName, options = {}, rootSchema) {
        return await this.createMatchMakeRequest('create', roomName, options, rootSchema);
    }
    async join(roomName, options = {}, rootSchema) {
        return await this.createMatchMakeRequest('join', roomName, options, rootSchema);
    }
    async joinById(roomId, options = {}, rootSchema) {
        return await this.createMatchMakeRequest('joinById', roomId, options, rootSchema);
    }
    /**
     * Re-establish connection with a room this client was previously connected to.
     *
     * @param reconnectionToken The `room.reconnectionToken` from previously connected room.
     * @param rootSchema (optional) Concrete root schema definition
     * @returns Promise<Room>
     */
    async reconnect(reconnectionToken, rootSchema) {
        if (typeof (reconnectionToken) === "string" && typeof (rootSchema) === "string") {
            throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");
        }
        const [roomId, token] = reconnectionToken.split(":");
        if (!roomId || !token) {
            throw new Error("Invalid reconnection token format.\nThe format should be roomId:reconnectionToken");
        }
        return await this.createMatchMakeRequest('reconnect', roomId, { reconnectionToken: token }, rootSchema);
    }
    async getAvailableRooms(roomName = "") {
        return (await this.http.get(`matchmake/${roomName}`, {
            headers: {
                'Accept': 'application/json'
            }
        })).data;
    }
    async consumeSeatReservation(response, rootSchema, reuseRoomInstance // used in devMode
    ) {
        const room = this.createRoom(response.room.name, rootSchema);
        room.roomId = response.room.roomId;
        room.sessionId = response.sessionId;
        const options = { sessionId: room.sessionId };
        // forward "reconnection token" in case of reconnection.
        if (response.reconnectionToken) {
            options.reconnectionToken = response.reconnectionToken;
        }
        const targetRoom = reuseRoomInstance || room;
        room.connect(this.buildEndpoint(response.room, options, response.protocol), response.devMode && (async () => {
            console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x1F504)} Re-establishing connection with room id '${room.roomId}'...`); // 🔄
            let retryCount = 0;
            let retryMaxRetries = 8;
            const retryReconnection = async () => {
                retryCount++;
                try {
                    await this.consumeSeatReservation(response, rootSchema, targetRoom);
                    console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x2705)} Successfully re-established connection with room '${room.roomId}'`); // ✅
                }
                catch (e) {
                    if (retryCount < retryMaxRetries) {
                        console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x1F504)} retrying... (${retryCount} out of ${retryMaxRetries})`); // 🔄
                        setTimeout(retryReconnection, 2000);
                    }
                    else {
                        console.info(`[Colyseus devMode]: ${String.fromCodePoint(0x274C)} Failed to reconnect. Is your server running? Please check server logs.`); // ❌
                    }
                }
            };
            setTimeout(retryReconnection, 2000);
        }), targetRoom, response);
        return new Promise((resolve, reject) => {
            const onError = (code, message) => reject(new ServerError(code, message));
            targetRoom.onError.once(onError);
            targetRoom['onJoin'].once(() => {
                targetRoom.onError.remove(onError);
                resolve(targetRoom);
            });
        });
    }
    async createMatchMakeRequest(method, roomName, options = {}, rootSchema, reuseRoomInstance) {
        if (!this.externalMatchMaker) { // if we aren't using an external matchmaker then we can use the default matchmaker nbd
            return await this.createDirectMatchMakeRequest(method, roomName, options, rootSchema, reuseRoomInstance);
        }
        const response = (await this.externalMatchMaker.post(`matchmake/${method}/${roomName}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })).data;
        // FIXME: HTTP class is already handling this as ServerError.
        // @ts-ignore
        if (response.error) {
            throw new MatchMakeError(response.error, response.code);
        }
        // the response from the external matchmaker should contain the settings for the server we need to connect to
        this.settings = response.settings;
        this.http = new HTTP(this); // we have to rebuild the http client with the new settings
        return await this.createDirectMatchMakeRequest(response.method, response.roomName, response.options, rootSchema, reuseRoomInstance);
    }
    async createDirectMatchMakeRequest(method, roomName, options = {}, rootSchema, reuseRoomInstance) {
        const response = (await this.http.post(`matchmake/${method}/${roomName}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })).data;
        // FIXME: HTTP class is already handling this as ServerError.
        // @ts-ignore
        if (response.error) {
            throw new MatchMakeError(response.error, response.code);
        }
        // forward reconnection token during "reconnect" methods.
        if (method === "reconnect") {
            response.reconnectionToken = options.reconnectionToken;
        }
        return await this.consumeSeatReservation(response, rootSchema, reuseRoomInstance);
    }
    createRoom(roomName, rootSchema) {
        return new Room(roomName, rootSchema);
    }
    buildEndpoint(room, options = {}, protocol = "ws") {
        const params = [];
        // append provided options
        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }
        if (protocol === "h3") {
            protocol = "http";
        }
        let endpoint = (this.settings.secure)
            ? `${protocol}s://`
            : `${protocol}://`;
        if (room.publicAddress) {
            endpoint += `${room.publicAddress}`;
        }
        else {
            endpoint += `${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;
        }
        const endpointURL = `${endpoint}/${room.processId}/${room.roomId}?${params.join('&')}`;
        return (this.urlBuilder)
            ? this.urlBuilder(new URL(endpointURL))
            : endpointURL;
    }
    getHttpEndpoint(segments = '') {
        const path = segments.startsWith("/") ? segments : `/${segments}`;
        const endpointURL = `${(this.settings.secure) ? "https" : "http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${path}`;
        return (this.urlBuilder)
            ? this.urlBuilder(new URL(endpointURL))
            : endpointURL;
    }
    getEndpointPort() {
        return (this.settings.port !== 80 && this.settings.port !== 443)
            ? `:${this.settings.port}`
            : "";
    }
}

export { Client, MatchMakeError };
//# sourceMappingURL=Client.mjs.map
