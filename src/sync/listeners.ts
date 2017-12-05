import { Room } from "../Room";
import { DataChange } from "delta-listener";
import { Property, Synchable } from "./types";
import { bindListeners } from "./helpers";

function assign (instance: any, property: Property, propName: string, value: any, key?: any) {
    if (property.holderType === "var") {
        instance[ propName ] = value;

    } else if (property.holderType === "key") {
        // mapListener only
        instance[ propName ] = key;
    }
}

function assignMultiple (instance: any, properties: Property[], value: any, key?: any) {
    for (let prop in properties) {
        assign(instance, properties[ prop ], prop, value[ prop ], key);
    }
}

function getInstanceContainer (root: any, path: string[], offset = 0) {
    let instance = root;

    for (var i = 0, len = path.length; i < len + offset; i++) {
        if (typeof(instance[ path[i] ]) !== "object") {
            break;
        }
        instance = instance[ path[i] ];
    }

    return instance;
}

export function objectListener (room: Room, property: Property, synchable: Synchable, synchableRoot?: Synchable, parentSegment?: string) {
    return function (change: DataChange) {
        if (change.operation === "add") {
            let newType = new property.type();

            // assign all variables to new instance type
            for (let prop in change.value) {
                newType[ prop ] = change.value[ prop ];
            }

            // bind @listen annotations
            bindListeners(property.type.listeners, room, newType);

            synchable[ property.variable ] = newType;

            if (property.addCallback) {
                property.addCallback.call(synchableRoot, synchableRoot, newType, change);
            }

        } else if (change.operation === "replace") {
            synchableRoot[ this.rawRules[0] ][ property.variable ] = change.value;

        } else if (change.operation === "remove") {
            if (property.removeCallback) {
                property.removeCallback.call(synchableRoot, synchableRoot, synchable[ property.variable ][ change.path.id ], change);
            }

            delete synchable[ property.variable ];
        }
    }
}

export function mapListener (room: Room, property: Property, synchable: Synchable, synchableRoot?: Synchable, parentSegment?: string) {
    return function (change: DataChange) {
        let instance = getInstanceContainer(synchableRoot, change.rawPath);

        if (change.operation === "add") {
            let newType = new property.type();

            // define __mapParent as non-enumerable.
            Object.defineProperty(newType, "__mapParent", {
                value: getInstanceContainer(synchableRoot, change.rawPath, -2),
                enumerable: false,
                configurable: true,
                writable: true
            });

            // bind @listen annotations
            bindListeners(property.type.listeners, room, newType);

            instance[ change.path.id ] = newType;

            // assign all variables to new instance type
            assignMultiple(newType, property.type.properties, change.value, change.path.id);

            if (property.addCallback) {
                property.addCallback.call(newType.__mapParent, newType.__mapParent, newType, change);
            }

        } else if (change.operation === "replace") {
            assign(instance, property, property.variable, change.value);

        } else if (change.operation === "remove") {
            if (property.removeCallback) {
                property.removeCallback.call(instance.__mapParent, instance.__mapParent, instance, change);
            }

            delete synchable[ property.variable ][ change.path.id ];
        }
    }
}

export function varListener (room: Room, property: Property, synchable: Synchable, synchableRoot?: Synchable, parentSegment?: string) {
    return function (change: DataChange) {
        let target = getInstanceContainer(synchableRoot, change.rawPath);

        if (change.operation !== "remove") {
            assign(target, property, property.variable, change.value);

        } else if (change.operation === "remove") {
            delete target[ property.variable ];
        }
    }
}
