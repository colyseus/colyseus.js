// colyseus.js@0.16.0-preview.24
import { getItem, removeItem, setItem } from './Storage.mjs';
import { createNanoEvents } from './core/nanoevents.mjs';

class Auth {
    http;
    settings = {
        path: "/auth",
        key: "colyseus-auth-token",
    };
    #_initialized = false;
    #_initializationPromise;
    #_signInWindow = undefined;
    #_events = createNanoEvents();
    constructor(http) {
        this.http = http;
        getItem(this.settings.key, (token) => this.token = token);
    }
    set token(token) {
        this.http.authToken = token;
    }
    get token() {
        return this.http.authToken;
    }
    onChange(callback) {
        const unbindChange = this.#_events.on("change", callback);
        if (!this.#_initialized) {
            this.#_initializationPromise = new Promise((resolve, reject) => {
                this.getUserData().then((userData) => {
                    this.emitChange({ ...userData, token: this.token });
                }).catch((e) => {
                    // user is not logged in, or service is down
                    this.emitChange({ user: null, token: undefined });
                }).finally(() => {
                    resolve();
                });
            });
        }
        this.#_initialized = true;
        return unbindChange;
    }
    async getUserData() {
        if (this.token) {
            return (await this.http.get(`${this.settings.path}/userdata`)).data;
        }
        else {
            throw new Error("missing auth.token");
        }
    }
    async registerWithEmailAndPassword(email, password, options) {
        const data = (await this.http.post(`${this.settings.path}/register`, {
            body: { email, password, options, },
        })).data;
        this.emitChange(data);
        return data;
    }
    async signInWithEmailAndPassword(email, password) {
        const data = (await this.http.post(`${this.settings.path}/login`, {
            body: { email, password, },
        })).data;
        this.emitChange(data);
        return data;
    }
    async signInAnonymously(options) {
        const data = (await this.http.post(`${this.settings.path}/anonymous`, {
            body: { options, }
        })).data;
        this.emitChange(data);
        return data;
    }
    async sendPasswordResetEmail(email) {
        return (await this.http.post(`${this.settings.path}/forgot-password`, {
            body: { email, }
        })).data;
    }
    async signInWithProvider(providerName, settings = {}) {
        return new Promise((resolve, reject) => {
            const w = settings.width || 480;
            const h = settings.height || 768;
            // forward existing token for upgrading
            const upgradingToken = this.token ? `?token=${this.token}` : "";
            // Capitalize first letter of providerName
            const title = `Login with ${(providerName[0].toUpperCase() + providerName.substring(1))}`;
            const url = this.http['client']['getHttpEndpoint'](`${(settings.prefix || `${this.settings.path}/provider`)}/${providerName}${upgradingToken}`);
            const left = (screen.width / 2) - (w / 2);
            const top = (screen.height / 2) - (h / 2);
            this.#_signInWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            const onMessage = (event) => {
                // TODO: it is a good idea to check if event.origin can be trusted!
                // if (event.origin.indexOf(window.location.hostname) === -1) { return; }
                // require 'user' and 'token' inside received data.
                if (event.data.user === undefined && event.data.token === undefined) {
                    return;
                }
                clearInterval(rejectionChecker);
                this.#_signInWindow.close();
                this.#_signInWindow = undefined;
                window.removeEventListener("message", onMessage);
                if (event.data.error !== undefined) {
                    reject(event.data.error);
                }
                else {
                    resolve(event.data);
                    this.emitChange(event.data);
                }
            };
            const rejectionChecker = setInterval(() => {
                if (!this.#_signInWindow || this.#_signInWindow.closed) {
                    this.#_signInWindow = undefined;
                    reject("cancelled");
                    window.removeEventListener("message", onMessage);
                }
            }, 200);
            window.addEventListener("message", onMessage);
        });
    }
    async signOut() {
        this.emitChange({ user: null, token: null });
    }
    emitChange(authData) {
        if (authData.token !== undefined) {
            this.token = authData.token;
            if (authData.token === null) {
                removeItem(this.settings.key);
            }
            else {
                // store key in localStorage
                setItem(this.settings.key, authData.token);
            }
        }
        this.#_events.emit("change", authData);
    }
}

export { Auth };
//# sourceMappingURL=Auth.mjs.map
