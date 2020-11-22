export class Push {
    endpoint: string;

    constructor (endpoint: string) {
        this.endpoint = endpoint;
    }

    public async register() {
        this.check();
        await this.registerServiceWorker();
        await this.requestNotificationPermission();
    };

    protected async registerServiceWorker() {
        return await navigator.serviceWorker.register(`${this.endpoint}/push`);
    }

    protected async requestNotificationPermission() {
        const permission = await window["Notification"].requestPermission();
        // value of permission can be 'granted', 'default', 'denied'
        // granted: user has accepted the request
        // default: user has dismissed the notification permission popup by clicking on x
        // denied: user has denied the request.
        if (permission !== "granted") {
            throw new Error("Permission not granted for Notification");
        }
    }

    protected check() {
        if (!("serviceWorker" in navigator)) { throw new Error("No Service Worker support!"); }
        if (!("PushManager" in window)) { throw new Error("No Push API Support!"); }
    }

}
