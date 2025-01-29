// colyseus.js@0.16.0-preview.24
'use strict';

//
// Polyfills for legacy environments
//
/*
 * Support Android 4.4.x
 */
if (!ArrayBuffer.isView) {
    ArrayBuffer.isView = function (a) {
        return a !== null && typeof (a) === 'object' && a.buffer instanceof ArrayBuffer;
    };
}
// Cocos Creator does not provide "FormData"
// Define a dummy implementation so it doesn't crash
if (typeof (FormData) === "undefined") {
    // @ts-ignore
    global['FormData'] = /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }());
}
// Define globalThis if not available.
// https://github.com/colyseus/colyseus.js/issues/86
if (typeof (globalThis) === "undefined" &&
    typeof (window) !== "undefined") {
    // @ts-ignore
    window['globalThis'] = window;
}
//# sourceMappingURL=legacy.js.map
