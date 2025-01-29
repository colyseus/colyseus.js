// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var schema = require('@colyseus/schema');

function getStateCallbacks(room) {
    return schema.getDecoderStateCallbacks(room['serializer'].decoder);
}
var SchemaSerializer = /** @class */ (function () {
    function SchemaSerializer() {
    }
    SchemaSerializer.prototype.setState = function (encodedState, it) {
        this.decoder.decode(encodedState, it);
    };
    SchemaSerializer.prototype.getState = function () {
        return this.state;
    };
    SchemaSerializer.prototype.patch = function (patches, it) {
        return this.decoder.decode(patches, it);
    };
    SchemaSerializer.prototype.teardown = function () {
        this.decoder.root.clearRefs();
    };
    SchemaSerializer.prototype.handshake = function (bytes, it) {
        if (this.state) {
            //
            // TODO: validate definitions against concreate this.state instance
            //
            schema.Reflection.decode(bytes, it); // no-op
            this.decoder = new schema.Decoder(this.state);
        }
        else {
            // initialize reflected state from server
            this.decoder = schema.Reflection.decode(bytes, it);
            this.state = this.decoder.state;
        }
    };
    return SchemaSerializer;
}());

exports.SchemaSerializer = SchemaSerializer;
exports.getStateCallbacks = getStateCallbacks;
//# sourceMappingURL=SchemaSerializer.js.map
