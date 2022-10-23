// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var WebSocketTransport = require('./transport/WebSocketTransport.js');

var Connection = /** @class */ (function () {
    function Connection(transport) {
        this.events = {};
        this.transport = new transport(this.events) || new WebSocketTransport.WebSocketTransport(this.events);
    }
    Connection.prototype.send = function (data) {
        this.transport.send(data);
    };
    Connection.prototype.connect = function (url) {
        this.transport.connect(url);
    };
    Connection.prototype.close = function (code, reason) {
        this.transport.close(code, reason);
    };
    return Connection;
}());

exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map
