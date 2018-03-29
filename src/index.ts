export { Client } from './Client';
export { Protocol } from './Protocol';
export { Room } from './Room';
export { DataChange } from '@gamestdio/state-listener';

export interface EntityMap<T> {
    [entityId: string]: T;
}

// Sync tools
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
