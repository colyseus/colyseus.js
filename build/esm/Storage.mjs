// colyseus.js@0.16.0-preview.24
/// <reference path="../typings/cocos-creator.d.ts" />
/**
 * We do not assign 'storage' to window.localStorage immediatelly for React
 * Native compatibility. window.localStorage is not present when this module is
 * loaded.
 */
let storage;
function getStorage() {
    if (!storage) {
        try {
            storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
                ? cc.sys.localStorage // compatibility with cocos creator
                : window.localStorage; // RN does have window object at this point, but localStorage is not defined
        }
        catch (e) {
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
function setItem(key, value) {
    getStorage().setItem(key, value);
}
function removeItem(key) {
    getStorage().removeItem(key);
}
function getItem(key, callback) {
    const value = getStorage().getItem(key);
    if (typeof (Promise) === 'undefined' || // old browsers
        !(value instanceof Promise)) {
        // browser has synchronous return
        callback(value);
    }
    else {
        // react-native is asynchronous
        value.then((id) => callback(id));
    }
}

export { getItem, removeItem, setItem };
//# sourceMappingURL=Storage.mjs.map
