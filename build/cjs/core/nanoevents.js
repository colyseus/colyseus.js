// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * The MIT License (MIT)
 *
 * Copyright 2016 Andrey Sitnik <andrey@sitnik.ru>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var createNanoEvents = function () { return ({
    emit: function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbacks = this.events[event] || [];
        for (var i = 0, length_1 = callbacks.length; i < length_1; i++) {
            callbacks[i].apply(callbacks, args);
        }
    },
    events: {},
    on: function (event, cb) {
        var _this = this;
        var _a;
        ((_a = this.events[event]) === null || _a === void 0 ? void 0 : _a.push(cb)) || (this.events[event] = [cb]);
        return function () {
            var _a;
            _this.events[event] = (_a = _this.events[event]) === null || _a === void 0 ? void 0 : _a.filter(function (i) { return cb !== i; });
        };
    }
}); };

exports.createNanoEvents = createNanoEvents;
//# sourceMappingURL=nanoevents.js.map
