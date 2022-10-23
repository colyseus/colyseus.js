// colyseus.js@0.14.14
const serializers = {};
function registerSerializer(id, serializer) {
    serializers[id] = serializer;
}
function getSerializer(id) {
    const serializer = serializers[id];
    if (!serializer) {
        throw new Error("missing serializer: " + id);
    }
    return serializer;
}

export { getSerializer, registerSerializer };
//# sourceMappingURL=Serializer.mjs.map
