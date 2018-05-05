//
// Polyfills for legacy environments
//

/*
 * Support Android 4.4.x
 */
if (!ArrayBuffer['isView']) {
    ArrayBuffer.isView = function (a: any): a is ArrayBufferView {
        return a !== null && typeof (a) === "object" && a['buffer'] instanceof ArrayBuffer;
    };
}