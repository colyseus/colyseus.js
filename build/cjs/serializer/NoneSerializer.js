// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NoneSerializer = /** @class */ (function () {
    function NoneSerializer() {
    }
    NoneSerializer.prototype.setState = function (rawState) { };
    NoneSerializer.prototype.getState = function () { return null; };
    NoneSerializer.prototype.patch = function (patches) { };
    NoneSerializer.prototype.teardown = function () { };
    NoneSerializer.prototype.handshake = function (bytes) { };
    return NoneSerializer;
}());

exports.NoneSerializer = NoneSerializer;
//# sourceMappingURL=NoneSerializer.js.map
