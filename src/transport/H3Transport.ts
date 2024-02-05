import { ITransport, ITransportEventMap } from "./ITransport";
import { encode } from '@colyseus/schema';

export class H3TransportTransport implements ITransport {
    wt: WebTransport;
    isOpen: boolean = false;

    reader: ReadableStreamDefaultReader;
    writer: WritableStreamDefaultWriter;

    unreliableReader: ReadableStreamDefaultReader;
    unreliableWriter: WritableStreamDefaultWriter;

    constructor(public events: ITransportEventMap) { }

    public connect(url: string, options: any = {}) {
        const wtOpts = options.fingerprint && ({
            // requireUnreliable: true,
            // congestionControl: "default", // "low-latency" || "throughput"

            serverCertificateHashes: [{
                algorithm: 'sha-256',
                value: new Uint8Array(options.fingerprint).buffer
            }]
        }) || undefined;

        this.wt = new WebTransport(url, wtOpts);

        this.wt.ready.then((e) => {
            console.log("WebTransport ready!", e)
            this.isOpen = true;

            this.unreliableReader = this.wt.datagrams.readable.getReader();
            this.unreliableWriter = this.wt.datagrams.writable.getWriter();

            const incomingBidi = this.wt.incomingBidirectionalStreams.getReader();
            incomingBidi.read().then((stream) => {
                this.reader = stream.value.readable.getReader();
                this.writer = stream.value.writable.getWriter();

                // immediately write room/sessionId for establishing the room connection
                this.sendSeatReservation(options.room.roomId, options.sessionId);
            }).catch((e) => {
                console.error("failed to read incoming stream", e);
                console.error("TODO: close the connection");
            });

            // this.events.onopen(e);
        }).catch((e: WebTransportCloseInfo) => {
            // this.events.onerror(e);
            // this.events.onclose({ code: e.closeCode, reason: e.reason });
            console.log("WebTransport not ready!", e)
        });

        this.wt.closed.then((e: WebTransportCloseInfo) => {
            console.log("WebTransport closed w/ success", e)
            this.events.onclose({ code: e.closeCode, reason: e.reason });

        }).catch((e: WebTransportCloseInfo) => {
            console.log("WebTransport closed w/ error", e)
            this.events.onerror(e);
            this.events.onclose({ code: e.closeCode, reason: e.reason });
        });

    }

    public send(data: ArrayBuffer | Array<number>): void {
        this.writer.write(data);
    }

    public sendUnreliable(data: ArrayBuffer | Array<number>): void {
        this.unreliableWriter.write(data);
    }

    public close(code?: number, reason?: string) {
        this.wt.close({ closeCode: code, reason: reason });
    }

    protected sendSeatReservation (roomId: string, sessionId: string) {
        const bytes: number[] = [];

        encode.string(bytes, roomId);
        encode.string(bytes, sessionId);

        this.writer.write(new Uint8Array(bytes).buffer);
    }

}
