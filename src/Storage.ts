const storage: Storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
    ? cc.sys.localStorage  // compatibility with cocos creator
    : window.localStorage; // regular browser environment

export function setItem(key: string, value: string) {
    storage.setItem(key, value);
}

export function getItem(key: string, callback: Function) {
    const value: any = storage.getItem(key);

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
