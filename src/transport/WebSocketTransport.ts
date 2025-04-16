import NodeWebSocket from "ws";
import { ITransport, ITransportEventMap } from "./ITransport";

const WebSocket = globalThis.WebSocket || NodeWebSocket;

export class WebSocketTransport implements ITransport {
    ws: WebSocket | NodeWebSocket;
    protocols?: string | string[];

    constructor(public events: ITransportEventMap) { }

    public send(data: Buffer | Uint8Array): void {
        // 微信小程序不支持直接发送Uint8Array
        // WeChat Mini Program does not support sending Uint8Array directly
        if (globalThis?.wx) {
            if (data instanceof Uint8Array) {
                this.ws.send(data.slice().buffer);
            } else if (Array.isArray(data)){
                this.ws.send((new Uint8Array(data)).buffer);
            } else {
                this.ws.send(data);
            }
            return;
        }
        this.ws.send(data);
    }

    public sendUnreliable(data: ArrayBuffer | Array<number>): void {
        console.warn("colyseus.js: The WebSocket transport does not support unreliable messages");
    }

    /**
     * @param url URL to connect to
     * @param headers custom headers to send with the connection (only supported in Node.js. Web Browsers do not allow setting custom headers)
     */
    public connect(url: string, headers?: any): void {
        try {
            if (globalThis?.wx) throw new Error("WeChat Mini Program does not support custom headers");

            // Node or Bun environments (supports custom headers)
            this.ws = new WebSocket(url, { headers, protocols: this.protocols });

        } catch (e) {
            // browser environment (custom headers not supported)
            this.ws = new WebSocket(url, this.protocols);
        }

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
