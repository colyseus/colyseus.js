import NodeWebSocket from "ws";
import { ITransport, ITransportEventMap } from "./ITransport";

const WebSocket = globalThis.WebSocket || NodeWebSocket;

export class WebSocketTransport implements ITransport {
    ws: WebSocket | NodeWebSocket;
    protocols?: string | string[];

    constructor(public events: ITransportEventMap) {}

    public send(data: Buffer | Uint8Array): void {
        this.ws.send(data);
    }

    public sendUnreliable(data: ArrayBuffer | Array<number>): void {
        console.warn("colyseus.js: The WebSocket transport does not support unreliable messages");
    }

    public connect(url: string) {
        this.ws = new WebSocket(url, this.protocols);
        this.ws.binaryType = 'arraybuffer';
        this.ws.onopen = this.events.onopen;
        this.ws.onmessage = this.events.onmessage;
        this.ws.onclose = this.events.onclose;
        this.ws.onerror = this.events.onerror;
    }

    public close(code?: number, reason?: string) {
        this.ws.close(code, reason);
    }

    get isOpen() {
        return this.ws.readyState === WebSocket.OPEN;
    }

}
