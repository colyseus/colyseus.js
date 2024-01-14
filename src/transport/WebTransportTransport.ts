import { ITransport, ITransportEventMap } from "./ITransport";

export class WebTransportTransport implements ITransport {
    wt: WebTransport;
    isOpen: boolean = false;

    constructor(public events: ITransportEventMap) {}

    public send(data: ArrayBuffer | Array<number>): void {
        if (data instanceof ArrayBuffer) {
            // this.ws.send(data);

        } else if (Array.isArray(data)) {
            // this.ws.send((new Uint8Array(data)).buffer);
        }
    }

    public connect(url: string) {
        this.wt = new WebTransport(url);

        this.wt.ready.then((e) => {
            this.isOpen = true;
            this.events.onopen(e);
        }).catch((e: WebTransportCloseInfo) => {
            this.events.onerror(e);
            this.events.onclose({ code: e.closeCode, reason: e.reason });
        });

        this.wt.closed.then((e: WebTransportCloseInfo) => {
            this.events.onclose({ code: e.closeCode, reason: e.reason });
        }).catch((e: WebTransportCloseInfo) => {
            this.events.onerror(e);
            this.events.onclose({ code: e.closeCode, reason: e.reason });
        });

        // this.wt.onmessage = this.events.onmessage;
    }

    public close(code?: number, reason?: string) {
        this.wt.close({ closeCode: code, reason: reason });
    }

}
