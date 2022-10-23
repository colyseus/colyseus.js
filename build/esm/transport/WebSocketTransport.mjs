// colyseus.js@0.14.14
import NodeWebSocket from 'ws';

const WebSocket = globalThis.WebSocket || NodeWebSocket;
class WebSocketTransport {
    events;
    ws;
    protocols;
    constructor(events) {
        this.events = events;
    }
    send(data) {
        if (data instanceof ArrayBuffer) {
            this.ws.send(data);
        }
        else if (Array.isArray(data)) {
            this.ws.send((new Uint8Array(data)).buffer);
        }
    }
    connect(url) {
        this.ws = new WebSocket(url, this.protocols);
        this.ws.binaryType = 'arraybuffer';
        this.ws.onopen = this.events.onopen;
        this.ws.onmessage = this.events.onmessage;
        this.ws.onclose = this.events.onclose;
        this.ws.onerror = this.events.onerror;
    }
    close(code, reason) {
        this.ws.close(code, reason);
    }
}

export { WebSocketTransport };
//# sourceMappingURL=WebSocketTransport.mjs.map
