import './legacy';

export { Client, JoinOptions } from './Client';
export { Protocol } from './Protocol';
export { Room } from './Room';
export { DataChange } from '@gamestdio/state-listener';

/*
 * Serializers
 */

import { FossilDeltaSerializer } from './serializer/FossilDeltaSerializer';
import { SchemaSerializer } from "./serializer/SchemaSerializer";
import { registerSerializer } from './serializer/Serializer';

export { Schema, type } from "@colyseus/schema";
export { registerSerializer, FossilDeltaSerializer, SchemaSerializer };
registerSerializer('fossil-delta', FossilDeltaSerializer);
registerSerializer('schema', SchemaSerializer);
