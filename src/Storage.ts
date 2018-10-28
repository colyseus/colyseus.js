/**
 * We do not assign 'storage' to window.localStorage immediatelly for React
 * Native compatibility. window.localStorage is not present when this module is
 * loaded.
 */

function getStorage() {
    return (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
        ? cc.sys.localStorage  // compatibility with cocos creator
        : window.localStorage; // regular browser environment
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
