// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var serializers = {};
function registerSerializer(id, serializer) {
    serializers[id] = serializer;
}
function getSerializer(id) {
    var serializer = serializers[id];
    if (!serializer) {
        throw new Error("missing serializer: " + id);
    }
    return serializer;
}

exports.getSerializer = getSerializer;
exports.registerSerializer = registerSerializer;
//# sourceMappingURL=Serializer.js.map
