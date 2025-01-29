// colyseus.js@0.16.0-preview.24
import { H3TransportTransport } from './transport/H3Transport.mjs';
import { WebSocketTransport } from './transport/WebSocketTransport.mjs';

class Connection {
    transport;
    events = {};
    constructor(protocol) {
        switch (protocol) {
            case "h3":
                this.transport = new H3TransportTransport(this.events);
                break;
            default:
                this.transport = new WebSocketTransport(this.events);
                break;
        }
    }
    connect(url, options) {
        this.transport.connect.call(this.transport, url, options);
    }
    send(data) {
        this.transport.send(data);
    }
    sendUnreliable(data) {
        this.transport.sendUnreliable(data);
    }
    close(code, reason) {
        this.transport.close(code, reason);
    }
    get isOpen() {
        return this.transport.isOpen;
    }
}

export { Connection };
//# sourceMappingURL=Connection.mjs.map
