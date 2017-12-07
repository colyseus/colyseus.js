import { DataChange } from "delta-listener";

import { Room } from "../Room";
import { Synchable, Property } from "./types";
import * as listeners from "./listeners";


export function initializeSync (room: Room, synchable: any & Synchable) {
    createBindings(room, synchable, synchable);
}

export function syncMap (type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, "map", addCallback, removeCallback);
}

export function syncObject (type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, "object", addCallback, removeCallback);
}

export function syncVar (type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, "var");
}

export function syncList (type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, "list", addCallback, removeCallback);
}

export function key () {
    return sync(undefined, "key");
}

export function room () {
    return (proto: any, key: string) => {
        Object.defineProperty(proto, key, {
            configurable: true,
            enumerable: true,
            get: () => proto.constructor.$room
        });
    };
}

export function sync (type?: any, holderType: string = 'var', addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return function (target: any & Synchable, propertyKey: string | symbol) {
        if (!target.constructor.properties) {
            target.constructor.properties = {};
        }

        let variable: string | symbol = propertyKey;

        if (typeof(type) === "string") {
            variable = propertyKey;
            propertyKey = type;
            type = undefined;
        }

        target.constructor.properties[propertyKey] = {
            type,
            holderType,
            addCallback,
            removeCallback,
            variable: variable
        };
    }
}

export function listen (path: string, op?: string): MethodDecorator {
    return function (target: any, methodName: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        if (!target.constructor.listeners) {
            target.constructor.listeners = {};
        }
        target.constructor.listeners[ path ] = { methodName, op };
    }
}

let listenersMap: any = {};

export function createBindings (
    room: Room,
    synchable: any & Synchable,
    synchableRoot?: any & Synchable,
    parentSegment?: string
) {
    bindProperties(synchable.constructor.properties || synchable.properties, room, synchable, synchableRoot, parentSegment);
    bindListeners(synchable.constructor.listeners, room, synchable);
}

function bindProperties (
    properties: { [id: string]: Property },
    room: Room,
    synchable: any & Synchable,
    synchableRoot?: any & Synchable,
    parentSegment?: string
) {
    // no properties to sync
    if (!properties) return;

    // room reference
    Object.defineProperty(synchable, "$room", {
        value: room,
        enumerable: false,
        configurable: true,
        writable: true
    });
    (<any>synchable).$room = room;

    // create bindings for properties
    for (let segment in properties) {
        let property: Property = properties[ segment ];

        let path = (parentSegment)
            ? `${ parentSegment }/${ segment }`
            : segment;

        if (property.holderType === "map") {
            path += "/:id";
        }

        // skip if duplicate listenersMap
        if (listenersMap[path]) {
            return;

        } else {
            listenersMap[path] = true;
        }


        let listener = listeners[ `${ property.holderType }Listener` ];
        if (listener) {
            room.listen(path, listener(room, property, synchable, synchableRoot, path));

            if (property.type) {
                createBindings(room, property.type, synchable, path);
            }
        }
    }
}

export function bindListeners (
    listeners: { [path: string]: any },
    room: Room,
    synchable: any & Synchable
) {
    if (!listeners) {
        return;
    }

    for (let path in listeners) {
        let listener = listeners[ path ];
        let callback = (listener.op)
            ? (function(change: DataChange) {
                if (change.operation === listener.op) {
                    synchable[listener.methodName](change);
                }
             })
            : synchable[ listener.methodName ].bind(synchable)

        room.listen(path, callback);
    }
}
