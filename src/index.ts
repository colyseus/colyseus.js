export { Client } from "./Client";
export { Protocol } from "./Protocol";
export { Room } from "./Room";
export { DataChange } from "delta-listener";

export type EntityMap<T> = {[ entityId:string ]: T};

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
    listen
} from "./sync/helpers";
