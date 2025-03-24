import './legacy';

export { Client, JoinOptions, MatchMakeError, type EndpointSettings, type ClientOptions } from './Client';
export { Protocol, ErrorCode } from './Protocol';
export { Room, RoomAvailable } from './Room';
export { Auth, type AuthSettings, type PopupSettings } from "./Auth";

/*
 * Serializers
 */

import { SchemaSerializer } from "./serializer/SchemaSerializer";
import { NoneSerializer } from "./serializer/NoneSerializer";
import { registerSerializer } from './serializer/Serializer';

export { registerSerializer, SchemaSerializer };
registerSerializer('schema', SchemaSerializer);
registerSerializer('none', NoneSerializer);
