/**
 * We do not assign 'storage' to window.localStorage immediatelly for React
 * Native compatibility. window.localStorage is not present when this module is
 * loaded.
 */

let storage: any;

function getStorage() {
    if (!storage)  {
        storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
            ? cc.sys.localStorage  // compatibility with cocos creator
            : typeof (window) !== "undefined" && window.localStorage //RN does have window object at this point, but localStorage is not defined
                ? window.localStorage // regular browser environment
                : { // mock localStorage for Node.js or RN environment
                    cache: {},
                    setItem: function(key, value) { this.cache[key] = value; },
                    getItem: function(key) { this.cache[key]; },
                };

    }
    return storage;
}

export function setItem(key: string, value: string) {
    getStorage().setItem(key, value);
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
