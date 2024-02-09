/// <reference path="../typings/cocos-creator.d.ts" />

/**
 * We do not assign 'storage' to window.localStorage immediatelly for React
 * Native compatibility. window.localStorage is not present when this module is
 * loaded.
 */

let storage: any;

function getStorage(): Storage {
    if (!storage)  {
        try {
            storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
                ? cc.sys.localStorage  // compatibility with cocos creator
                : window.localStorage; // RN does have window object at this point, but localStorage is not defined

        } catch (e) {
            // ignore error
        }
    }

    if (!storage) {
        // mock localStorage if not available (Node.js or RN environment)
        storage = {
            cache: {},
            setItem: function (key, value) { this.cache[key] = value; },
            getItem: function (key) { this.cache[key]; },
            removeItem: function (key) { delete this.cache[key]; },
        };
    }

    return storage;
}

export function setItem(key: string, value: string) {
    getStorage().setItem(key, value);
}

export function removeItem(key: string) {
    getStorage().removeItem(key);
}

export function getItem(key: string, callback: Function) {
    const value: any = getStorage().getItem(key);

    if (
        typeof (Promise) === 'undefined' || // old browsers
        !(value instanceof Promise)
    ) {
        // browser has synchronous return
        callback(value);

    } else {
        // react-native is asynchronous
        value.then((id) => callback(id));
    }
}
