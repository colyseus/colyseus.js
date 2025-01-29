// colyseus.js@0.16.0-preview.24
import { getDecoderStateCallbacks, Reflection, Decoder } from '@colyseus/schema';

function getStateCallbacks(room) {
    return getDecoderStateCallbacks(room['serializer'].decoder);
}
class SchemaSerializer {
    state;
    decoder;
    setState(encodedState, it) {
        this.decoder.decode(encodedState, it);
    }
    getState() {
        return this.state;
    }
    patch(patches, it) {
        return this.decoder.decode(patches, it);
    }
    teardown() {
        this.decoder.root.clearRefs();
    }
    handshake(bytes, it) {
        if (this.state) {
            //
            // TODO: validate definitions against concreate this.state instance
            //
            Reflection.decode(bytes, it); // no-op
            this.decoder = new Decoder(this.state);
        }
        else {
            // initialize reflected state from server
            this.decoder = Reflection.decode(bytes, it);
            this.state = this.decoder.state;
        }
    }
}

export { SchemaSerializer, getStateCallbacks };
//# sourceMappingURL=SchemaSerializer.mjs.map
