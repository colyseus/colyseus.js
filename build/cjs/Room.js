// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./msgpack/index.js');
var Connection = require('./Connection.js');
var Serializer = require('./serializer/Serializer.js');
var Protocol = require('./Protocol.js');
var nanoevents = require('nanoevents');
var signal = require('./core/signal.js');
var schema = require('@colyseus/schema');

var Room = /** @class */ (function () {
    function Room(name, rootSchema, transport) {
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
        this.transport = transport;
        if (rootSchema) {
            this.serializer = new (Serializer.getSerializer("schema"));
            this.rootSchema = rootSchema;
            this.serializer.state = new rootSchema();
        }
        this.onError(function (code, message) { return console.warn("colyseus.js - onError => (" + code + ") " + message); });
        this.onLeave(function () { return _this.removeAllListeners(); });
    }
    Object.defineProperty(Room.prototype, "id", {
        // TODO: deprecate me on version 1.0
        get: function () { return this.roomId; },
        enumerable: false,
        configurable: true
    });
    Room.prototype.connect = function (endpoint) {
        var _this = this;
        this.connection = new Connection.Connection(this.transport);
        this.connection.events.onmessage = this.onMessageCallback.bind(this);
        this.connection.events.onclose = function (e) {
            if (!_this.hasJoined) {
                console.warn("Room connection was closed unexpectedly (" + e.code + "): " + e.reason);
                _this.onError.invoke(e.code, e.reason);
                return;
            }
            _this.onLeave.invoke(e.code);
            _this.destroy();
        };
        this.connection.events.onerror = function (e) {
            console.warn("Room, onError (" + e.code + "): " + e.reason);
            _this.onError.invoke(e.code, e.reason);
        };
        this.connection.connect(endpoint);
    };
    Room.prototype.leave = function (consented) {
        var _this = this;
        if (consented === void 0) { consented = true; }
        return new Promise(function (resolve) {
            _this.onLeave(function (code) { return resolve(code); });
            if (_this.connection) {
                if (consented) {
                    _this.connection.send([Protocol.Protocol.LEAVE_ROOM]);
                }
                else {
                    _this.connection.close();
                }
            }
            else {
                _this.onLeave.invoke(4000); // "consented" code
            }
        });
    };
    Room.prototype.onMessage = function (type, callback) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    };
    Room.prototype.send = function (type, message) {
        var initialBytes = [Protocol.Protocol.ROOM_DATA];
        if (typeof (type) === "string") {
            schema.encode.string(initialBytes, type);
        }
        else {
            schema.encode.number(initialBytes, type);
        }
        var arr;
        if (message !== undefined) {
            var encoded = index.encode(message);
            arr = new Uint8Array(initialBytes.length + encoded.byteLength);
            arr.set(new Uint8Array(initialBytes), 0);
            arr.set(new Uint8Array(encoded), initialBytes.length);
        }
        else {
            arr = new Uint8Array(initialBytes);
        }
        this.connection.send(arr.buffer);
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
    };
    Room.prototype.onMessageCallback = function (event) {
        var bytes = Array.from(new Uint8Array(event.data));
        var code = bytes[0];
        if (code === Protocol.Protocol.JOIN_ROOM) {
            var offset = 1;
            this.serializerId = Protocol.utf8Read(bytes, offset);
            offset += Protocol.utf8Length(this.serializerId);
            // Instantiate serializer if not locally available.
            if (!this.serializer) {
                var serializer = Serializer.getSerializer(this.serializerId);
                this.serializer = new serializer();
            }
            if (bytes.length > offset && this.serializer.handshake) {
                this.serializer.handshake(bytes, { offset: offset });
            }
            this.hasJoined = true;
            this.onJoin.invoke();
            // acknowledge successfull JOIN_ROOM
            this.connection.send([Protocol.Protocol.JOIN_ROOM]);
        }
        else if (code === Protocol.Protocol.ERROR) {
            var it_1 = { offset: 1 };
            var code_1 = schema.decode.number(bytes, it_1);
            var message = schema.decode.string(bytes, it_1);
            this.onError.invoke(code_1, message);
        }
        else if (code === Protocol.Protocol.LEAVE_ROOM) {
            this.leave();
        }
        else if (code === Protocol.Protocol.ROOM_DATA_SCHEMA) {
            var it_2 = { offset: 1 };
            var context_1 = this.serializer.getState().constructor._context;
            var type = context_1.get(schema.decode.number(bytes, it_2));
            var message = new type();
            message.decode(bytes, it_2);
            this.dispatchMessage(type, message);
        }
        else if (code === Protocol.Protocol.ROOM_STATE) {
            bytes.shift(); // drop `code` byte
            this.setState(bytes);
        }
        else if (code === Protocol.Protocol.ROOM_STATE_PATCH) {
            bytes.shift(); // drop `code` byte
            this.patch(bytes);
        }
        else if (code === Protocol.Protocol.ROOM_DATA) {
            var it_3 = { offset: 1 };
            var type = (schema.decode.stringCheck(bytes, it_3))
                ? schema.decode.string(bytes, it_3)
                : schema.decode.number(bytes, it_3);
            var message = (bytes.length > it_3.offset)
                ? index.decode(event.data, it_3.offset)
                : undefined;
            this.dispatchMessage(type, message);
        }
    };
    Room.prototype.setState = function (encodedState) {
        this.serializer.setState(encodedState);
        this.onStateChange.invoke(this.serializer.getState());
    };
    Room.prototype.patch = function (binaryPatch) {
        this.serializer.patch(binaryPatch);
        this.onStateChange.invoke(this.serializer.getState());
    };
    Room.prototype.dispatchMessage = function (type, message) {
        var messageType = this.getMessageHandlerKey(type);
        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);
        }
        else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);
        }
        else {
            console.warn("colyseus.js: onMessage() not registered for type '" + type + "'.");
        }
    };
    Room.prototype.destroy = function () {
        if (this.serializer) {
            this.serializer.teardown();
        }
    };
    Room.prototype.getMessageHandlerKey = function (type) {
        switch (typeof (type)) {
            // typeof Schema
            case "function": return "$" + type._typeid;
            // string
            case "string": return type;
            // number
            case "number": return "i" + type;
            default: throw new Error("invalid message type.");
        }
    };
    return Room;
}());

exports.Room = Room;
//# sourceMappingURL=Room.js.map
