// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var H3Transport = require('./transport/H3Transport.js');
var WebSocketTransport = require('./transport/WebSocketTransport.js');

var Connection = /** @class */ (function () {
    function Connection(protocol) {
        this.events = {};
        switch (protocol) {
            case "h3":
                this.transport = new H3Transport.H3TransportTransport(this.events);
                break;
            default:
                this.transport = new WebSocketTransport.WebSocketTransport(this.events);
                break;
        }
    }
    Connection.prototype.connect = function (url, options) {
        this.transport.connect.call(this.transport, url, options);
    };
    Connection.prototype.send = function (data) {
        this.transport.send(data);
    };
    Connection.prototype.sendUnreliable = function (data) {
        this.transport.sendUnreliable(data);
    };
    Connection.prototype.close = function (code, reason) {
        this.transport.close(code, reason);
    };
    Object.defineProperty(Connection.prototype, "isOpen", {
        get: function () {
            return this.transport.isOpen;
        },
        enumerable: false,
        configurable: true
    });
    return Connection;
}());

exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map
