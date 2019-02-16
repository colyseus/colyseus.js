import './legacy';

export { Client, JoinOptions } from './Client';
export { Protocol } from './Protocol';
export { Room } from './Room';
export { DataChange } from '@gamestdio/state-listener';

/*
 * Serializers
 */
export { SchemaSerializer } from "./serializer/SchemaSerializer";
export { Schema, type } from "@colyseus/schema";

export interface EntityMap<T> {
    [entityId: string]: T;
}

/**
 * Experimental sync helpers
 */
export {
    initializeSync,
    sync,
    syncMap,
    syncObject,
    syncVar,
    syncList,
    key,
    room,
    listen,
} from './sync/helpers';
