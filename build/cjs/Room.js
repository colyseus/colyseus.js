// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Connection = require('./Connection.js');
var Protocol = require('./Protocol.js');
var Serializer = require('./serializer/Serializer.js');
var nanoevents = require('./core/nanoevents.js');
var signal = require('./core/signal.js');
var schema = require('@colyseus/schema');
var SchemaSerializer = require('./serializer/SchemaSerializer.js');
var ServerError = require('./errors/ServerError.js');
var msgpackr = require('@colyseus/msgpackr');

var Room = /** @class */ (function () {
    function Room(name, rootSchema) {
        var _this = this;
        // Public signals
        this.onStateChange = signal.createSignal();
        this.onError = signal.createSignal();
        this.onLeave = signal.createSignal();
        this.onJoin = signal.createSignal();
        this.hasJoined = false;
        this.onMessageHandlers = nanoevents.createNanoEvents();
        this.roomId = null;
        this.name = name;
        this.packr = new msgpackr.Packr();
        // msgpackr workaround: force buffer to be created.
        this.packr.encode(undefined);
        if (rootSchema) {
            this.serializer = new (Serializer.getSerializer("schema"));
            this.rootSchema = rootSchema;
            this.serializer.state = new rootSchema();
        }
        this.onError(function (code, message) { var _a; return (_a = console.warn) === null || _a === void 0 ? void 0 : _a.call(console, "colyseus.js - onError => (".concat(code, ") ").concat(message)); });
        this.onLeave(function () { return _this.removeAllListeners(); });
    }
    Room.prototype.connect = function (endpoint, devModeCloseCallback, room, // when reconnecting on devMode, re-use previous room intance for handling events.
    options) {
        if (room === void 0) { room = this; }
        var connection = new Connection.Connection(options.protocol);
        room.connection = connection;
        connection.events.onmessage = Room.prototype.onMessageCallback.bind(room);
        connection.events.onclose = function (e) {
            var _a;
            if (!room.hasJoined) {
                (_a = console.warn) === null || _a === void 0 ? void 0 : _a.call(console, "Room connection was closed unexpectedly (".concat(e.code, "): ").concat(e.reason));
                room.onError.invoke(e.code, e.reason);
                return;
            }
            if (e.code === ServerError.CloseCode.DEVMODE_RESTART && devModeCloseCallback) {
                devModeCloseCallback();
            }
            else {
                room.onLeave.invoke(e.code);
                room.destroy();
            }
        };
        connection.events.onerror = function (e) {
            var _a;
            (_a = console.warn) === null || _a === void 0 ? void 0 : _a.call(console, "Room, onError (".concat(e.code, "): ").concat(e.reason));
            room.onError.invoke(e.code, e.reason);
        };
        // FIXME: refactor this.
        if (options.protocol === "h3") {
            var url = new URL(endpoint);
            connection.connect(url.origin, options);
        }
        else {
            connection.connect(endpoint);
        }
    };
    Room.prototype.leave = function (consented) {
        var _this = this;
        if (consented === void 0) { consented = true; }
        return new Promise(function (resolve) {
            _this.onLeave(function (code) { return resolve(code); });
            if (_this.connection) {
                if (consented) {
                    _this.packr.buffer[0] = Protocol.Protocol.LEAVE_ROOM;
                    _this.connection.send(_this.packr.buffer.subarray(0, 1));
                }
                else {
                    _this.connection.close();
                }
            }
            else {
                _this.onLeave.invoke(ServerError.CloseCode.CONSENTED);
            }
        });
    };
    Room.prototype.onMessage = function (type, callback) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    };
    Room.prototype.send = function (type, message) {
        var it = { offset: 1 };
        this.packr.buffer[0] = Protocol.Protocol.ROOM_DATA;
        if (typeof (type) === "string") {
            schema.encode.string(this.packr.buffer, type, it);
        }
        else {
            schema.encode.number(this.packr.buffer, type, it);
        }
        // force packr to use beginning of the buffer
        this.packr.position = 0;
        var data = (message !== undefined)
            ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
            : this.packr.buffer.subarray(0, it.offset);
        this.connection.send(data);
    };
    Room.prototype.sendUnreliable = function (type, message) {
        var it = { offset: 1 };
        this.packr.buffer[0] = Protocol.Protocol.ROOM_DATA;
        if (typeof (type) === "string") {
            schema.encode.string(this.packr.buffer, type, it);
        }
        else {
            schema.encode.number(this.packr.buffer, type, it);
        }
        // force packr to use beginning of the buffer
        this.packr.position = 0;
        var data = (message !== undefined)
            ? this.packr.pack(message, 2048 + it.offset) // 2048 = RESERVE_START_SPACE
            : this.packr.buffer.subarray(0, it.offset);
        this.connection.sendUnreliable(data);
    };
    Room.prototype.sendBytes = function (type, bytes) {
        var it = { offset: 1 };
        this.packr.buffer[0] = Protocol.Protocol.ROOM_DATA_BYTES;
        if (typeof (type) === "string") {
            schema.encode.string(this.packr.buffer, type, it);
        }
        else {
            schema.encode.number(this.packr.buffer, type, it);
        }
        this.packr.buffer.set(bytes, it.offset);
        this.connection.send(this.packr.buffer.subarray(0, it.offset + bytes.byteLength));
    };
    Object.defineProperty(Room.prototype, "state", {
        get: function () {
            return this.serializer.getState();
        },
        enumerable: false,
        configurable: true
    });
    Room.prototype.removeAllListeners = function () {
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
        this.onMessageHandlers.events = {};
        if (this.serializer instanceof SchemaSerializer.SchemaSerializer) {
            // Remove callback references
            this.serializer.decoder.root.callbacks = {};
        }
    };
    Room.prototype.onMessageCallback = function (event) {
        var buffer = new Uint8Array(event.data);
        var it = { offset: 1 };
        var code = buffer[0];
        if (code === Protocol.Protocol.JOIN_ROOM) {
            var reconnectionToken = schema.decode.utf8Read(buffer, it, buffer[it.offset++]);
            this.serializerId = schema.decode.utf8Read(buffer, it, buffer[it.offset++]);
            // Instantiate serializer if not locally available.
            if (!this.serializer) {
                var serializer = Serializer.getSerializer(this.serializerId);
                this.serializer = new serializer();
            }
            if (buffer.byteLength > it.offset && this.serializer.handshake) {
                this.serializer.handshake(buffer, it);
            }
            this.reconnectionToken = "".concat(this.roomId, ":").concat(reconnectionToken);
            this.hasJoined = true;
            this.onJoin.invoke();
            // acknowledge successfull JOIN_ROOM
            this.packr.buffer[0] = Protocol.Protocol.JOIN_ROOM;
            this.connection.send(this.packr.buffer.subarray(0, 1));
        }
        else if (code === Protocol.Protocol.ERROR) {
            var code_1 = schema.decode.number(buffer, it);
            var message = schema.decode.string(buffer, it);
            this.onError.invoke(code_1, message);
        }
        else if (code === Protocol.Protocol.LEAVE_ROOM) {
            this.leave();
        }
        else if (code === Protocol.Protocol.ROOM_STATE) {
            this.serializer.setState(buffer, it);
            this.onStateChange.invoke(this.serializer.getState());
        }
        else if (code === Protocol.Protocol.ROOM_STATE_PATCH) {
            this.serializer.patch(buffer, it);
            this.onStateChange.invoke(this.serializer.getState());
        }
        else if (code === Protocol.Protocol.ROOM_DATA) {
            var type = (schema.decode.stringCheck(buffer, it))
                ? schema.decode.string(buffer, it)
                : schema.decode.number(buffer, it);
            var message = (buffer.byteLength > it.offset)
                ? msgpackr.unpack(buffer, { start: it.offset })
                : undefined;
            this.dispatchMessage(type, message);
        }
        else if (code === Protocol.Protocol.ROOM_DATA_BYTES) {
            var type = (schema.decode.stringCheck(buffer, it))
                ? schema.decode.string(buffer, it)
                : schema.decode.number(buffer, it);
            this.dispatchMessage(type, buffer.subarray(it.offset));
        }
    };
    Room.prototype.dispatchMessage = function (type, message) {
        var _a;
        var messageType = this.getMessageHandlerKey(type);
        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);
        }
        else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);
        }
        else {
            (_a = console.warn) === null || _a === void 0 ? void 0 : _a.call(console, "colyseus.js: onMessage() not registered for type '".concat(type, "'."));
        }
    };
    Room.prototype.destroy = function () {
        if (this.serializer) {
            this.serializer.teardown();
        }
    };
    Room.prototype.getMessageHandlerKey = function (type) {
        switch (typeof (type)) {
            // string
            case "string": return type;
            // number
            case "number": return "i".concat(type);
            default: throw new Error("invalid message type.");
        }
    };
    return Room;
}());

exports.Room = Room;
//# sourceMappingURL=Room.js.map
