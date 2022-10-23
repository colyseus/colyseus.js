// colyseus.js@0.14.14
import * as http from 'httpie';
import { getItem, setItem, removeItem } from './Storage.mjs';

const TOKEN_STORAGE = "colyseus-auth-token";
var Platform;
(function (Platform) {
    Platform["ios"] = "ios";
    Platform["android"] = "android";
})(Platform || (Platform = {}));
class Auth {
    _id = undefined;
    username = undefined;
    displayName = undefined;
    avatarUrl = undefined;
    isAnonymous = undefined;
    email = undefined;
    lang = undefined;
    location = undefined;
    timezone = undefined;
    metadata = undefined;
    devices = undefined;
    facebookId = undefined;
    twitterId = undefined;
    googleId = undefined;
    gameCenterId = undefined;
    steamId = undefined;
    friendIds = undefined;
    blockedUserIds = undefined;
    createdAt = undefined;
    updatedAt = undefined;
    // auth token
    token = undefined;
    endpoint;
    keepOnlineInterval;
    constructor(endpoint) {
        this.endpoint = endpoint.replace("ws", "http");
        getItem(TOKEN_STORAGE, (token) => this.token = token);
    }
    get hasToken() {
        return !!this.token;
    }
    async login(options = {}) {
        const queryParams = Object.assign({}, options);
        if (this.hasToken) {
            queryParams.token = this.token;
        }
        const data = await this.request('post', '/auth', queryParams);
        // set & cache token
        this.token = data.token;
        setItem(TOKEN_STORAGE, this.token);
        for (let attr in data) {
            if (this.hasOwnProperty(attr)) {
                this[attr] = data[attr];
            }
        }
        this.registerPingService();
        return this;
    }
    async save() {
        await this.request('put', '/auth', {}, {
            username: this.username,
            displayName: this.displayName,
            avatarUrl: this.avatarUrl,
            lang: this.lang,
            location: this.location,
            timezone: this.timezone,
        });
        return this;
    }
    async getFriends() {
        return (await this.request('get', '/friends/all'));
    }
    async getOnlineFriends() {
        return (await this.request('get', '/friends/online'));
    }
    async getFriendRequests() {
        return (await this.request('get', '/friends/requests'));
    }
    async sendFriendRequest(friendId) {
        return (await this.request('post', '/friends/requests', { userId: friendId }));
    }
    async acceptFriendRequest(friendId) {
        return (await this.request('put', '/friends/requests', { userId: friendId }));
    }
    async declineFriendRequest(friendId) {
        return (await this.request('del', '/friends/requests', { userId: friendId }));
    }
    async blockUser(friendId) {
        return (await this.request('post', '/friends/block', { userId: friendId }));
    }
    async unblockUser(friendId) {
        return (await this.request('put', '/friends/block', { userId: friendId }));
    }
    async request(method, segments, query = {}, body, headers = {}) {
        headers['Accept'] = 'application/json';
        if (this.hasToken) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }
        const queryParams = [];
        for (const name in query) {
            queryParams.push(`${name}=${query[name]}`);
        }
        const queryString = (queryParams.length > 0)
            ? `?${queryParams.join("&")}`
            : '';
        const opts = { headers };
        if (body) {
            opts.body = body;
        }
        return (await http[method](`${this.endpoint}${segments}${queryString}`, opts)).data;
    }
    logout() {
        this.token = undefined;
        removeItem(TOKEN_STORAGE);
        this.unregisterPingService();
    }
    registerPingService(timeout = 15000) {
        this.unregisterPingService();
        this.keepOnlineInterval = setInterval(() => this.request('get', '/auth'), timeout);
    }
    unregisterPingService() {
        clearInterval(this.keepOnlineInterval);
    }
}

export { Auth, Platform };
//# sourceMappingURL=Auth.mjs.map
