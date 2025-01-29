// colyseus.js@0.16.0-preview.24
import './legacy.mjs';
export { Client } from './Client.mjs';
export { ErrorCode, Protocol } from './Protocol.mjs';
export { Room } from './Room.mjs';
export { Auth } from './Auth.mjs';
import { SchemaSerializer } from './serializer/SchemaSerializer.mjs';
export { SchemaSerializer, getStateCallbacks } from './serializer/SchemaSerializer.mjs';
import { NoneSerializer } from './serializer/NoneSerializer.mjs';
import { registerSerializer } from './serializer/Serializer.mjs';
export { registerSerializer } from './serializer/Serializer.mjs';

registerSerializer('schema', SchemaSerializer);
registerSerializer('none', NoneSerializer);
//# sourceMappingURL=index.mjs.map
