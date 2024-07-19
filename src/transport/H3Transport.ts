import { ITransport, ITransportEventMap } from "./ITransport";
import { encode, Iterator } from '@colyseus/schema';

export class H3TransportTransport implements ITransport {
    wt: WebTransport;
    isOpen: boolean = false;

    reader: ReadableStreamDefaultReader;
    writer: WritableStreamDefaultWriter;

    unreliableReader: ReadableStreamDefaultReader<Uint8Array>;
    unreliableWriter: WritableStreamDefaultWriter<Uint8Array>;

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
                this.sendSeatReservation(options.room.roomId, options.sessionId, options.reconnectionToken);

                // start reading incoming data
                this.readIncomingData();
                this.readIncomingUnreliableData();

            }).catch((e) => {
                console.error("failed to read incoming stream", e);
                console.error("TODO: close the connection");
            });

            // this.events.onopen(e);
        }).catch((e: WebTransportCloseInfo) => {
            // this.events.onerror(e);
            // this.events.onclose({ code: e.closeCode, reason: e.reason });
            console.log("WebTransport not ready!", e)
            this._close();
        });

        this.wt.closed.then((e: WebTransportCloseInfo) => {
            console.log("WebTransport closed w/ success", e)
            this.events.onclose({ code: e.closeCode, reason: e.reason });

        }).catch((e: WebTransportCloseInfo) => {
            console.log("WebTransport closed w/ error", e)
            this.events.onerror(e);
            this.events.onclose({ code: e.closeCode, reason: e.reason });
        }).finally(() => {
            this._close();
        });
    }

    public send(data: Buffer | Uint8Array): void {
        const lengthPrefixed = new Uint8Array(data.byteLength + 1);
        lengthPrefixed[0] = data.byteLength;
        lengthPrefixed.set(new Uint8Array(data), 1);
        this.writer.write(lengthPrefixed);
    }

    public sendUnreliable(data: Buffer | Uint8Array): void {
        const lengthPrefixed = new Uint8Array(data.byteLength + 1);
        lengthPrefixed[0] = data.byteLength;
        lengthPrefixed.set(new Uint8Array(data), 1);
        this.unreliableWriter.write(lengthPrefixed);
    }

    public close(code?: number, reason?: string) {
        try {
            this.wt.close({ closeCode: code, reason: reason });
        } catch (e) {
            console.error(e);
        }
    }

    protected async readIncomingData() {
        let result: ReadableStreamReadResult<Uint8Array>;

        while (this.isOpen) {
            try {
                result = await this.reader.read();

                //
                // a single read may contain multiple messages
                // each message is prefixed with its length
                //

                const messages = result.value;
                const it: Iterator = { offset: 0 };
                do {
                    //
                    // QUESTION: should we buffer the message in case it's not fully read?
                    //

                    const length = messages[it.offset++];
                    this.events.onmessage({ data: messages.subarray(it.offset, it.offset + length) });
                    it.offset += length;
                } while (it.offset < messages.length);

            } catch (e) {
                console.error("failed to read incoming data", e);
                break;
            }

            if (result.done) { break; }
        }
    }

    protected async readIncomingUnreliableData() {
        let result: ReadableStreamReadResult<Uint8Array>;

        while (this.isOpen) {
            try {
                result = await this.unreliableReader.read();

                //
                // a single read may contain multiple messages
                // each message is prefixed with its length
                //

                const messages = result.value;
                const it: Iterator = { offset: 0 };
                do {
                    //
                    // QUESTION: should we buffer the message in case it's not fully read?
                    //

                    const length = messages[it.offset++];
                    this.events.onmessage({ data: messages.subarray(it.offset, it.offset + length) });
                    it.offset += length;
                } while (it.offset < messages.length);

            } catch (e) {
                console.error("failed to read incoming data", e);
                break;
            }

            if (result.done) { break; }

            // value is a Uint8Array.
            this.events.onmessage({ data: result.value.buffer });
        }
    }

    protected sendSeatReservation (roomId: string, sessionId: string, reconnectionToken?: string) {
        const it: Iterator = { offset: 0 };
        const bytes: number[] = [];

        encode.string(bytes, roomId, it);
        encode.string(bytes, sessionId, it);

        if (reconnectionToken) {
            encode.string(bytes, reconnectionToken, it);
        }

        this.writer.write(new Uint8Array(bytes).buffer);
    }

    protected _close() {
        this.isOpen = false;
    }

}
