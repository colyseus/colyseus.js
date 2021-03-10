import './legacy';

export { Client, JoinOptions } from './Client';
export { Protocol, ErrorCode } from './Protocol';
export { Room, RoomAvailable } from './Room';
export { Auth, Platform, Device } from "./Auth";

/*
 * Serializers
 */

import { SchemaSerializer } from "./serializer/SchemaSerializer";
import { NoneSerializer } from "./serializer/NoneSerializer";
import { registerSerializer } from './serializer/Serializer';

export { registerSerializer, SchemaSerializer };
registerSerializer('schema', SchemaSerializer);
registerSerializer('none', NoneSerializer);
