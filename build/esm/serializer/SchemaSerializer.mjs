// colyseus.js@0.14.14
import { Reflection } from '@colyseus/schema';

class SchemaSerializer {
    state;
    setState(rawState) {
        this.state.decode(rawState);
    }
    getState() {
        return this.state;
    }
    patch(patches) {
        this.state.decode(patches);
    }
    teardown() {
        this.state?.['$changes']?.root.clearRefs();
    }
    handshake(bytes, it) {
        if (this.state) {
            // validate client/server definitinos
            const reflection = new Reflection();
            reflection.decode(bytes, it);
        }
        else {
            // initialize reflected state from server
            this.state = Reflection.decode(bytes, it);
        }
    }
}

export { SchemaSerializer };
//# sourceMappingURL=SchemaSerializer.mjs.map
