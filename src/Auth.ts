import { HTTP } from "./HTTP";
import { createNanoEvents } from './core/nanoevents';

export interface AuthSettings {
    path: string;
}

export interface PopupSettings {
    prefix: string;
    width: number;
    height: number;
}

export interface AuthData {
    user: any;
    token: string;
}

export class Auth {
    settings: AuthSettings = { path: "/auth" };
    #_signInWindow = undefined;
    #_events = createNanoEvents();

    constructor(protected http: HTTP) {}

    public set token(token: string) {
        this.http.authToken = token;
    }

    public get token(): string {
        return this.http.authToken;
    }

    public onChange(callback: (response: AuthData) => void) {
        return this.#_events.on("change", callback);
    }

    public async registerWithEmailAndPassword(email: string, password: string) {
        const data = (await this.http.post(`${this.settings.path}/register`, {
            headers: { 'Content-Type': 'application/json' },
            body: { email, password, },
        })).data;

        // emit change event
        this.#_events.emit("change", data);

        return data;
    }

    public async signInWithEmailAndPassword(email: string, password: string) {
        const data = (await this.http.post(`${this.settings.path}/login`, {
            headers: { 'Content-Type': 'application/json' },
            body: { email, password, },
        })).data;

        // emit change event
        this.#_events.emit("change", data);

        return data;
    }

    public async signInAnonymously() {
        const data = (await this.http.post(`${this.settings.path}/anonymous`, {
            headers: { 'Content-Type': 'application/json' }
        })).data;

        this.#_events.emit("change", data);

        return data;
    }

    public async oauth(providerName: string, settings: Partial<PopupSettings> = {}) {
        return new Promise((resolve, reject) => {
            const w = settings.width || 480;
            const h = settings.height || 768;

            // Capitalize first letter of providerName
            const title = `Login with ${(providerName[0].toUpperCase() + providerName.substring(1))}`;
            const url = this.http['client']['getHttpEndpoint'](`${(settings.prefix || "oauth")}/${providerName}`);

            const left = (screen.width / 2) - (w / 2);
            const top = (screen.height / 2) - (h / 2);

            this.#_signInWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            const onMessage = (event: MessageEvent) => {
                // TODO: it is a good idea to check if event.origin can be trusted!
                debugger;
                // if (event.origin.indexOf(window.location.hostname) === -1) { return; }

                console.log("popup, event =>", event);
                console.log("popup, event.data =>", event.data);

                // require 'user' and 'token' inside received data.
                if (!event.data.user && !event.data.token) { return; }

                clearInterval(rejectionChecker);
                this.#_signInWindow.close();
                this.#_signInWindow = undefined;

                window.removeEventListener("message", onMessage);
                resolve(event.data);

                // emit change event
                this.#_events.emit("change", event.data);
            }

            const rejectionChecker = setInterval(() => {
                if (!this.#_signInWindow || this.#_signInWindow.closed) {
                    this.#_signInWindow = undefined;
                    reject();
                    window.removeEventListener("message", onMessage);
                }
            }, 200);

            window.addEventListener("message", onMessage);
        });
    }

    public async signOut() {
        this.http.authToken = undefined;
        this.#_events.emit("change", { user: null, token: null });
    }

}
