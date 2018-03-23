import { DataChange } from 'delta-listener';

import { Room } from '../Room';
import { Property, Synchable } from './types';

import * as listeners from './listeners';

export function initializeSync(roomInstance: Room, synchable: any & Synchable) {
    createBindings(roomInstance, synchable, synchable);
}

export function syncMap(type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, 'map', addCallback, removeCallback);
}

export function syncObject(type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, 'object', addCallback, removeCallback);
}

export function syncVar(type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, 'var');
}

export function syncList(type?: any, addCallback?: Function, removeCallback?: Function): PropertyDecorator {
    return sync(type, 'list', addCallback, removeCallback);
}

export function key() {
    return sync(undefined, 'key');
}

export function room() {
    return (proto: any, attr: string) => {
        Object.defineProperty(proto, attr, {
            configurable: true,
            enumerable: true,
            get: () => proto.constructor.$room,
        });
    };
}

export function sync(
    type?: any,
    holderType: string = 'var',
    addCallback?: Function,
    removeCallback?: Function,
): PropertyDecorator {
    return (target: any & Synchable, propertyKey: string | symbol) => {
        if (!target.constructor.properties) {
            target.constructor.properties = {};
        }

        let variable: string | symbol = propertyKey;

        if (typeof(type) === 'string') {
            variable = propertyKey;
            propertyKey = type;
            type = undefined;
        }

        target.constructor.properties[propertyKey] = {
            addCallback,
            holderType,
            removeCallback,
            type,
            variable,
        };
    };
}

export function listen(path: string, op?: string): MethodDecorator {
    return (target: any, methodName: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        if (!target.constructor.listeners) {
            target.constructor.listeners = {};
        }
        target.constructor.listeners[ path ] = { methodName, op };
    };
}

const listenersMap: any = {};

export function createBindings(
    roomInstance: Room,
    synchable: any & Synchable,
    synchableRoot?: any & Synchable,
    parentSegment?: string,
) {
    bindProperties(
        synchable.constructor.properties || synchable.properties,
        roomInstance,
        synchable,
        synchableRoot,
        parentSegment,
    );
    bindListeners(synchable.constructor.listeners, roomInstance, synchable);
}

function bindProperties(
    properties: { [id: string]: Property },
    roomInstance: Room,
    synchable: any & Synchable,
    synchableRoot?: any & Synchable,
    parentSegment?: string,
) {
    // no properties to sync
    if (!properties) { return; }

    // room reference
    Object.defineProperty(synchable, '$room', {
        configurable: true,
        enumerable: false,
        value: roomInstance,
        writable: true,
    });
    (synchable as any).$room = roomInstance;

    // create bindings for properties
    for (const segment in properties) {
        if (!properties.hasOwnProperty(segment)) {
            continue;
        }

        const property: Property = properties[ segment ];

        let path = (parentSegment)
            ? `${ parentSegment }/${ segment }`
            : segment;

        if (property.holderType === 'map') {
            path += '/:id';
        }

        // skip if duplicate listenersMap
        if (listenersMap[path]) {
            return;

        } else {
            listenersMap[path] = true;
        }

        const listener = listeners[ `${ property.holderType }Listener` ];
        if (listener) {
            roomInstance.listen(path, listener(roomInstance, property, synchable, synchableRoot, path));

            if (property.type) {
                createBindings(roomInstance, property.type, synchable, path);
            }
        }
    }
}

export function bindListeners(
    listenersToBind: { [path: string]: any },
    roomInstance: Room,
    synchable: any & Synchable,
) {
    if (!listenersToBind) {
        return;
    }

    for (const path in listenersToBind) {
        if (!listenersToBind.hasOwnProperty(path)) {
            continue;
        }

        const listener = listenersToBind[ path ];
        const callback = (listener.op)
            ? ((change: DataChange) => {
                if (change.operation === listener.op) {
                    synchable[listener.methodName](change);
                }
             })
            : synchable[ listener.methodName ].bind(synchable);

        roomInstance.listen(path, callback);
    }
}
