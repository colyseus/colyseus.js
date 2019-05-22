export class Push {
    public async register() {
        this.check();
        const swRegistration = await this.registerServiceWorker();
        const permission = await this.requestNotificationPermission();
    };

    protected async registerServiceWorker() {
        const swRegistration = await navigator.serviceWorker.register("webpush_service.js");
        return swRegistration;
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