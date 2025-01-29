// colyseus.js@0.16.0-preview.24
//
// Polyfills for legacy environments
//
/*
 * Support Android 4.4.x
 */
if (!ArrayBuffer.isView) {
    ArrayBuffer.isView = (a) => {
        return a !== null && typeof (a) === 'object' && a.buffer instanceof ArrayBuffer;
    };
}
// Cocos Creator does not provide "FormData"
// Define a dummy implementation so it doesn't crash
if (typeof (FormData) === "undefined") {
    // @ts-ignore
    global['FormData'] = class {
    };
}
// Define globalThis if not available.
// https://github.com/colyseus/colyseus.js/issues/86
if (typeof (globalThis) === "undefined" &&
    typeof (window) !== "undefined") {
    // @ts-ignore
    window['globalThis'] = window;
}
//# sourceMappingURL=legacy.mjs.map
