// colyseus.js@0.14.14
import { WebSocketTransport } from './transport/WebSocketTransport.mjs';

class Connection {
    transport;
    events = {};
    constructor(transport) {
        this.transport = new transport(this.events) || new WebSocketTransport(this.events);
    }
    send(data) {
        this.transport.send(data);
    }
    connect(url) {
        this.transport.connect(url);
    }
    close(code, reason) {
        this.transport.close(code, reason);
    }
}

export { Connection };
//# sourceMappingURL=Connection.mjs.map
