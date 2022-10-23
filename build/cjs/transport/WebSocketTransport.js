// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NodeWebSocket = require('ws');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var NodeWebSocket__default = /*#__PURE__*/_interopDefaultLegacy(NodeWebSocket);

var WebSocket = globalThis.WebSocket || NodeWebSocket__default['default'];
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(events) {
        this.events = events;
    }
    WebSocketTransport.prototype.send = function (data) {
        if (data instanceof ArrayBuffer) {
            this.ws.send(data);
        }
        else if (Array.isArray(data)) {
            this.ws.send((new Uint8Array(data)).buffer);
        }
    };
    WebSocketTransport.prototype.connect = function (url) {
        this.ws = new WebSocket(url, this.protocols);
        this.ws.binaryType = 'arraybuffer';
        this.ws.onopen = this.events.onopen;
        this.ws.onmessage = this.events.onmessage;
        this.ws.onclose = this.events.onclose;
        this.ws.onerror = this.events.onerror;
    };
    WebSocketTransport.prototype.close = function (code, reason) {
        this.ws.close(code, reason);
    };
    return WebSocketTransport;
}());

exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map
