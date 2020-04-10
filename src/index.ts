import './legacy';

export { Client, JoinOptions } from './Client';
export { Protocol } from './Protocol';
export { Room, RoomAvailable } from './Room';
export { DataChange } from '@gamestdio/state-listener';
export { Auth, Platform, Device } from "./Auth";

/*
 * Serializers
 */

import { FossilDeltaSerializer } from './serializer/FossilDeltaSerializer';
import { SchemaSerializer } from "./serializer/SchemaSerializer";
import { registerSerializer } from './serializer/Serializer';

export { registerSerializer, FossilDeltaSerializer, SchemaSerializer };
registerSerializer('fossil-delta', FossilDeltaSerializer);
registerSerializer('schema', SchemaSerializer);
