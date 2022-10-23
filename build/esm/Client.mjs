// colyseus.js@0.14.14
import { get, post } from 'httpie';
import { ServerError } from './errors/ServerError.mjs';
import { Room } from './Room.mjs';
import { Auth } from './Auth.mjs';

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
    endpoint;
    _auth;
    transport;
    constructor(endpoint = DEFAULT_ENDPOINT, options) {
        this.endpoint = endpoint;
        this.transport = options?.transport;
    }
    get auth() {
        if (!this._auth) {
            this._auth = new Auth(this.endpoint);
        }
        return this._auth;
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
    async reconnect(roomId, sessionId, rootSchema) {
        return await this.createMatchMakeRequest('joinById', roomId, { sessionId }, rootSchema);
    }
    async getAvailableRooms(roomName = "") {
        const url = `${this.endpoint.replace("ws", "http")}/matchmake/${roomName}`;
        return (await get(url, { headers: { 'Accept': 'application/json' } })).data;
    }
    async consumeSeatReservation(response, rootSchema) {
        const room = this.createRoom(response.room.name, rootSchema);
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
    async createMatchMakeRequest(method, roomName, options = {}, rootSchema) {
        const url = `${this.endpoint.replace("ws", "http")}/matchmake/${method}/${roomName}`;
        // automatically forward auth token, if present
        if (this._auth && this._auth.hasToken) {
            options.token = this._auth.token;
        }
        const response = (await post(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })).data;
        if (response.error) {
            throw new MatchMakeError(response.error, response.code);
        }
        return this.consumeSeatReservation(response, rootSchema);
    }
    createRoom(roomName, rootSchema) {
        return new Room(roomName, rootSchema, this.transport);
    }
    buildEndpoint(room, options = {}) {
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

export { Client, MatchMakeError };
//# sourceMappingURL=Client.mjs.map
