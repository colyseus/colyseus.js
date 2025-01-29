// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var schema = require('@colyseus/schema');

var H3TransportTransport = /** @class */ (function () {
    function H3TransportTransport(events) {
        this.events = events;
        this.isOpen = false;
        this.lengthPrefixBuffer = new Uint8Array(9); // 9 bytes is the maximum length of a length prefix
    }
    H3TransportTransport.prototype.connect = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var wtOpts = options.fingerprint && ({
            // requireUnreliable: true,
            // congestionControl: "default", // "low-latency" || "throughput"
            serverCertificateHashes: [{
                    algorithm: 'sha-256',
                    value: new Uint8Array(options.fingerprint).buffer
                }]
        }) || undefined;
        this.wt = new WebTransport(url, wtOpts);
        this.wt.ready.then(function (e) {
            console.log("WebTransport ready!", e);
            _this.isOpen = true;
            _this.unreliableReader = _this.wt.datagrams.readable.getReader();
            _this.unreliableWriter = _this.wt.datagrams.writable.getWriter();
            var incomingBidi = _this.wt.incomingBidirectionalStreams.getReader();
            incomingBidi.read().then(function (stream) {
                _this.reader = stream.value.readable.getReader();
                _this.writer = stream.value.writable.getWriter();
                // immediately write room/sessionId for establishing the room connection
                _this.sendSeatReservation(options.room.roomId, options.sessionId, options.reconnectionToken);
                // start reading incoming data
                _this.readIncomingData();
                _this.readIncomingUnreliableData();
            }).catch(function (e) {
                console.error("failed to read incoming stream", e);
                console.error("TODO: close the connection");
            });
            // this.events.onopen(e);
        }).catch(function (e) {
            // this.events.onerror(e);
            // this.events.onclose({ code: e.closeCode, reason: e.reason });
            console.log("WebTransport not ready!", e);
            _this._close();
        });
        this.wt.closed.then(function (e) {
            console.log("WebTransport closed w/ success", e);
            _this.events.onclose({ code: e.closeCode, reason: e.reason });
        }).catch(function (e) {
            console.log("WebTransport closed w/ error", e);
            _this.events.onerror(e);
            _this.events.onclose({ code: e.closeCode, reason: e.reason });
        }).finally(function () {
            _this._close();
        });
    };
    H3TransportTransport.prototype.send = function (data) {
        var prefixLength = schema.encode.number(this.lengthPrefixBuffer, data.length, { offset: 0 });
        var dataWithPrefixedLength = new Uint8Array(prefixLength + data.length);
        dataWithPrefixedLength.set(this.lengthPrefixBuffer.subarray(0, prefixLength), 0);
        dataWithPrefixedLength.set(data, prefixLength);
        this.writer.write(dataWithPrefixedLength);
    };
    H3TransportTransport.prototype.sendUnreliable = function (data) {
        var prefixLength = schema.encode.number(this.lengthPrefixBuffer, data.length, { offset: 0 });
        var dataWithPrefixedLength = new Uint8Array(prefixLength + data.length);
        dataWithPrefixedLength.set(this.lengthPrefixBuffer.subarray(0, prefixLength), 0);
        dataWithPrefixedLength.set(data, prefixLength);
        this.unreliableWriter.write(dataWithPrefixedLength);
    };
    H3TransportTransport.prototype.close = function (code, reason) {
        try {
            this.wt.close({ closeCode: code, reason: reason });
        }
        catch (e) {
            console.error(e);
        }
    };
    H3TransportTransport.prototype.readIncomingData = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var result, messages, it_1, length_1, e_1;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isOpen) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reader.read()];
                    case 2:
                        result = _a.sent();
                        messages = result.value;
                        it_1 = { offset: 0 };
                        do {
                            length_1 = schema.decode.number(messages, it_1);
                            this.events.onmessage({ data: messages.subarray(it_1.offset, it_1.offset + length_1) });
                            it_1.offset += length_1;
                        } while (it_1.offset < messages.length);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.message.indexOf("session is closed") === -1) {
                            console.error("H3Transport: failed to read incoming data", e_1);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (result.done) {
                            return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 0];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    H3TransportTransport.prototype.readIncomingUnreliableData = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var result, messages, it_2, length_2, e_2;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isOpen) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.unreliableReader.read()];
                    case 2:
                        result = _a.sent();
                        messages = result.value;
                        it_2 = { offset: 0 };
                        do {
                            length_2 = schema.decode.number(messages, it_2);
                            this.events.onmessage({ data: messages.subarray(it_2.offset, it_2.offset + length_2) });
                            it_2.offset += length_2;
                        } while (it_2.offset < messages.length);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        if (e_2.message.indexOf("session is closed") === -1) {
                            console.error("H3Transport: failed to read incoming data", e_2);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (result.done) {
                            return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 0];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    H3TransportTransport.prototype.sendSeatReservation = function (roomId, sessionId, reconnectionToken) {
        var it = { offset: 0 };
        var bytes = [];
        schema.encode.string(bytes, roomId, it);
        schema.encode.string(bytes, sessionId, it);
        if (reconnectionToken) {
            schema.encode.string(bytes, reconnectionToken, it);
        }
        this.writer.write(new Uint8Array(bytes).buffer);
    };
    H3TransportTransport.prototype._close = function () {
        this.isOpen = false;
    };
    return H3TransportTransport;
}());

exports.H3TransportTransport = H3TransportTransport;
//# sourceMappingURL=H3Transport.js.map
