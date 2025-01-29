// colyseus.js@0.16.0-preview.24
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
        this.ws.send(data);
    }
    sendUnreliable(data) {
        console.warn("colyseus.js: The WebSocket transport does not support unreliable messages");
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
    get isOpen() {
        return this.ws.readyState === WebSocket.OPEN;
    }
}

export { WebSocketTransport };
//# sourceMappingURL=WebSocketTransport.mjs.map
