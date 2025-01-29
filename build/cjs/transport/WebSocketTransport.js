// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NodeWebSocket = require('ws');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var NodeWebSocket__default = /*#__PURE__*/_interopDefaultLegacy(NodeWebSocket);

var WebSocket = globalThis.WebSocket || NodeWebSocket__default["default"];
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(events) {
        this.events = events;
    }
    WebSocketTransport.prototype.send = function (data) {
        this.ws.send(data);
    };
    WebSocketTransport.prototype.sendUnreliable = function (data) {
        console.warn("colyseus.js: The WebSocket transport does not support unreliable messages");
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
    Object.defineProperty(WebSocketTransport.prototype, "isOpen", {
        get: function () {
            return this.ws.readyState === WebSocket.OPEN;
        },
        enumerable: false,
        configurable: true
    });
    return WebSocketTransport;
}());

exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map
