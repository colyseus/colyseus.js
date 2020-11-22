import * as http from "@colyseus/http";
import { getItem, setItem, removeItem } from "./Storage";

const TOKEN_STORAGE = "colyseus-auth-token";

export enum Platform {
    ios = "ios",
    android = "android",
}

export interface Device {
    id: string,
    platform: Platform
}

export interface IStatus {
    status: boolean;
}

export interface IUser {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl: string;

    isAnonymous: boolean;
    email: string;

    lang: string;
    location: string;
    timezone: string;
    metadata: any;

    devices: Device[];

    facebookId: string;
    twitterId: string;
    googleId: string;
    gameCenterId: string;
    steamId: string;

    friendIds: string[];
    blockedUserIds: string[];

    createdAt: Date;
    updatedAt: Date;
}

export class Auth implements IUser {
    _id: string = undefined;
    username: string = undefined;
    displayName: string = undefined;
    avatarUrl: string = undefined;

    isAnonymous: boolean = undefined;
    email: string = undefined;

    lang: string = undefined;
    location: string = undefined;
    timezone: string = undefined;
    metadata: any = undefined;

    devices: Device[] = undefined;

    facebookId: string = undefined;
    twitterId: string = undefined;
    googleId: string = undefined;
    gameCenterId: string = undefined;
    steamId: string = undefined;

    friendIds: string[] = undefined;
    blockedUserIds: string[] = undefined;

    createdAt: Date = undefined;
    updatedAt: Date = undefined;

    // auth token
    token: string = undefined;

    protected endpoint: string;
    protected keepOnlineInterval: any;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        getItem(TOKEN_STORAGE, (token) => this.token = token);
    }

    get hasToken() {
        return !!this.token;
    }

    async login (options: {
        accessToken?: string,
        deviceId?: string,
        platform?: string,
        email?: string,
        password?: string,
    } = {}) {
        const queryParams: any = Object.assign({}, options);

        if (this.hasToken) {
            queryParams.token = this.token;
        }

        const data = await this.request('post', '/auth', queryParams);

        // set & cache token
        this.token = data.token;
        setItem(TOKEN_STORAGE, this.token);

        for (let attr in data) {
            if (this.hasOwnProperty(attr)) { this[attr] = data[attr]; }
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
        return (await this.request('get', '/friends/all')) as IUser[];
    }

    async getOnlineFriends() {
        return (await this.request('get', '/friends/online')) as IUser[];
    }

    async getFriendRequests() {
        return (await this.request('get', '/friends/requests')) as IUser[];
    }

    async sendFriendRequest(friendId: string) {
        return (await this.request('post', '/friends/requests', { userId: friendId })) as IStatus;
    }

    async acceptFriendRequest(friendId: string) {
        return (await this.request('put', '/friends/requests', { userId: friendId })) as IStatus;
    }

    async declineFriendRequest(friendId: string) {
        return (await this.request('del', '/friends/requests', { userId: friendId })) as IStatus;
    }

    async blockUser(friendId: string) {
        return (await this.request('post', '/friends/block', { userId: friendId })) as IStatus;
    }

    async unblockUser(friendId: string) {
        return (await this.request('put', '/friends/block', { userId: friendId })) as IStatus;
    }

    async request(
        method: 'get' | 'post' | 'put' | 'del',
        segments: string,
        query: {[key: string]: number | string} = {},
        body?: any,
        headers: {[key: string]: string} = {}
    ) {
        headers['Accept'] = 'application/json';
        if (this.hasToken) { headers['Authorization'] = 'Bearer ' + this.token; }

        const queryParams: string[] = [];
        for (const name in query) {
            queryParams.push(`${name}=${query[name]}`);
        }

        const queryString = (queryParams.length > 0)
            ? `?${queryParams.join("&")}`
            : '';

        const opts: Partial<http.HttpieOptions> = { headers };
        if (body) { opts.body = body; }

        return (await http[method](`${this.endpoint}${segments}${queryString}`, opts)).data;
    }

    logout() {
        this.token = undefined;
        removeItem(TOKEN_STORAGE);
        this.unregisterPingService();
    }

    registerPingService(timeout: number = 15000) {
        this.unregisterPingService();

        this.keepOnlineInterval = setInterval(() => this.request('get', '/auth'), timeout);
    }

    unregisterPingService() {
        clearInterval(this.keepOnlineInterval);
    }

}
