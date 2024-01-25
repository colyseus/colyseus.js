import { ITransport, ITransportEventMap } from "./ITransport";

export class H3TransportTransport implements ITransport {
    wt: WebTransport;
    isOpen: boolean = false;

    constructor(public events: ITransportEventMap) {}

    public connect(url: string, fingerprint?: number[]) {
        const options = fingerprint && ({
            // requireUnreliable: true,
            // congestionControl: "default", // "low-latency" || "throughput"

            serverCertificateHashes: [{
                algorithm: 'sha-256',
                value: new Uint8Array(fingerprint).buffer
            }]
        }) || undefined;

        this.wt = new WebTransport(url, options);

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

    public send(data: ArrayBuffer | Array<number>): void {
        if (data instanceof ArrayBuffer) {
            // this.ws.send(data);

        } else if (Array.isArray(data)) {
            // this.ws.send((new Uint8Array(data)).buffer);
        }
    }

    public sendUnreliable(data: ArrayBuffer | Array<number>): void {
        if (data instanceof ArrayBuffer) {
            // this.ws.send(data);

        } else if (Array.isArray(data)) {
            // this.ws.send((new Uint8Array(data)).buffer);
        }
    }

    public close(code?: number, reason?: string) {
        this.wt.close({ closeCode: code, reason: reason });
    }

}
