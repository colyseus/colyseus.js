var Colyseus =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

// bufferish.js

var Buffer = exports.global = __webpack_require__(44);
var hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer;
var hasArrayBuffer = exports.hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

var isArray = exports.isArray = __webpack_require__(2);
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
var isView = exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

exports.alloc = alloc;
exports.concat = concat;
exports.from = from;

var BufferArray = exports.Array = __webpack_require__(46);
var BufferBuffer = exports.Buffer = __webpack_require__(47);
var BufferUint8Array = exports.Uint8Array = __webpack_require__(48);
var BufferProto = exports.prototype = __webpack_require__(11);

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer|Uint8Array|Array}
 */

function from(value) {
  if (typeof value === "string") {
    return fromString.call(this, value);
  } else {
    return auto(this).from(value);
  }
}

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return auto(this).alloc(size);
}

/**
 * @param list {Array} array of (Buffer|Uint8Array|Array)s
 * @param [length]
 * @returns {Buffer|Uint8Array|Array}
 */

function concat(list, length) {
  if (!length) {
    length = 0;
    Array.prototype.forEach.call(list, dryrun);
  }
  var ref = (this !== exports) && this || list[0];
  var result = alloc.call(ref, length);
  var offset = 0;
  Array.prototype.forEach.call(list, append);
  return result;

  function dryrun(buffer) {
    length += buffer.length;
  }

  function append(buffer) {
    offset += BufferProto.copy.call(buffer, result, offset);
  }
}

var _isArrayBuffer = _is("ArrayBuffer");

function isArrayBuffer(value) {
  return (value instanceof ArrayBuffer) || _isArrayBuffer(value);
}

/**
 * @private
 */

function fromString(value) {
  var expected = value.length * 3;
  var that = alloc.call(this, expected);
  var actual = BufferProto.write.call(that, value);
  if (expected !== actual) {
    that = BufferProto.slice.call(that, 0, actual);
  }
  return that;
}

function auto(that) {
  return isBuffer(that) ? BufferBuffer
    : isView(that) ? BufferUint8Array
    : isArray(that) ? BufferArray
    : hasBuffer ? BufferBuffer
    : hasArrayBuffer ? BufferUint8Array
    : BufferArray;
}

function _false() {
  return false;
}

function _is(name, key) {
  /* jshint eqnull:true */
  name = "[object " + name + "]";
  return function(value) {
    return (value != null) && {}.toString.call(key ? value[key] : value) === name;
  };
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(72);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(71);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33), __webpack_require__(60)))

/***/ },
/* 2 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

// codec-base.js

var IS_ARRAY = __webpack_require__(2);

exports.createCodec = createCodec;
exports.install = install;
exports.filter = filter;

var Bufferish = __webpack_require__(0);

function Codec(options) {
  if (!(this instanceof Codec)) return new Codec(options);
  this.options = options;
  this.init();
}

Codec.prototype.init = function() {
  var options = this.options;

  if (options && options.uint8array) {
    this.bufferish = Bufferish.Uint8Array;
  }

  return this;
};

function install(props) {
  for (var key in props) {
    Codec.prototype[key] = add(Codec.prototype[key], props[key]);
  }
}

function add(a, b) {
  return (a && b) ? ab : (a || b);

  function ab() {
    a.apply(this, arguments);
    return b.apply(this, arguments);
  }
}

function join(filters) {
  filters = filters.slice();

  return function(value) {
    return filters.reduce(iterator, value);
  };

  function iterator(value, filter) {
    return filter(value);
  }
}

function filter(filter) {
  return IS_ARRAY(filter) ? join(filter) : filter;
}

// @public
// msgpack.createCodec()

function createCodec(options) {
  return new Codec(options);
}

// default shared codec

exports.preset = createCodec({preset: true});


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * The Slot class represents a signal slot.
 *
 * @author Robert Penner
 * @author Joa Ebert
 */
var Slot = (function () {
    /**
     * Creates and returns a new Slot object.
     *
     * @param listener The listener associated with the slot.
     * @param signal The signal associated with the slot.
     * @param once Whether or not the listener should be executed only once.
     * @param priority The priority of the slot.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws Error <code>Error</code>: Internal signal reference has not been set yet.
     */
    function Slot(listener, signal, once, priority) {
        if (once === void 0) { once = false; }
        if (priority === void 0) { priority = 0; }
        this._enabled = true;
        this._once = false;
        this._priority = 0;
        this._listener = listener;
        this._once = once;
        this._signal = signal;
        this._priority = priority;
        this.verifyListener(listener);
    }
    /**
     * @inheritDoc
     */
    Slot.prototype.execute0 = function () {
        if (!this._enabled)
            return;
        if (this._once)
            this.remove();
        if (this._params && this._params.length) {
            this._listener.apply(null, this._params);
            return;
        }
        this._listener();
    };
    /**
     * @inheritDoc
     */
    Slot.prototype.execute1 = function (value) {
        if (!this._enabled)
            return;
        if (this._once)
            this.remove();
        if (this._params && this._params.length) {
            this._listener.apply(null, [value].concat(this._params));
            return;
        }
        this._listener(value);
    };
    /**
     * @inheritDoc
     */
    Slot.prototype.execute = function (valueObjects) {
        if (!this._enabled)
            return;
        if (this._once)
            this.remove();
        // If we have parameters, add them to the valueObject
        // Note: This could be expensive if we're after the fastest dispatch possible.
        if (this._params && this._params.length) {
            valueObjects = valueObjects.concat(this._params);
        }
        // NOTE: simple ifs are faster than switch: http://jacksondunstan.com/articles/1007
        var numValueObjects = valueObjects.length;
        if (numValueObjects == 0) {
            this._listener();
        }
        else if (numValueObjects == 1) {
            this._listener(valueObjects[0]);
        }
        else if (numValueObjects == 2) {
            this._listener(valueObjects[0], valueObjects[1]);
        }
        else if (numValueObjects == 3) {
            this._listener(valueObjects[0], valueObjects[1], valueObjects[2]);
        }
        else {
            this._listener.apply(null, valueObjects);
        }
    };
    Object.defineProperty(Slot.prototype, "listener", {
        /**
         * @inheritDoc
         * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>. Did you want to set enabled to false instead?
         * @throws Error <code>Error</code>: Internal signal reference has not been set yet.
         */
        get: function () {
            return this._listener;
        },
        set: function (value) {
            if (null == value)
                throw new Error('Given listener is null.\nDid you want to set enabled to false instead?');
            this.verifyListener(value);
            this._listener = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slot.prototype, "once", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._once;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slot.prototype, "priority", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._priority;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and returns the string representation of the current object.
     *
     * @return The string representation of the current object.
     */
    Slot.prototype.toString = function () {
        return "[Slot listener: " + this._listener + ", once: " + this._once
            + ", priority: " + this._priority + ", enabled: " + this._enabled + "]";
    };
    Object.defineProperty(Slot.prototype, "enabled", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slot.prototype, "params", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._params;
        },
        set: function (value) {
            this._params = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    Slot.prototype.remove = function () {
        this._signal.remove(this._listener);
    };
    Slot.prototype.verifyListener = function (listener) {
        if (null == listener) {
            throw new Error('Given listener is null.');
        }
        if (null == this._signal) {
            throw new Error('Internal signal reference has not been set yet.');
        }
    };
    return Slot;
}());
exports.Slot = Slot;
//# sourceMappingURL=Slot.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";
// Use codes between 0~127 for lesser throughput (1 byte)
Object.defineProperty(exports, "__esModule", { value: true });
var Protocol;
(function (Protocol) {
    // User-related (0~10)
    Protocol[Protocol["USER_ID"] = 1] = "USER_ID";
    // Room-related (10~20)
    Protocol[Protocol["JOIN_ROOM"] = 10] = "JOIN_ROOM";
    Protocol[Protocol["JOIN_ERROR"] = 11] = "JOIN_ERROR";
    Protocol[Protocol["LEAVE_ROOM"] = 12] = "LEAVE_ROOM";
    Protocol[Protocol["ROOM_DATA"] = 13] = "ROOM_DATA";
    Protocol[Protocol["ROOM_STATE"] = 14] = "ROOM_STATE";
    Protocol[Protocol["ROOM_STATE_PATCH"] = 15] = "ROOM_STATE_PATCH";
    // Generic messages (50~60)
    Protocol[Protocol["BAD_REQUEST"] = 50] = "BAD_REQUEST";
})(Protocol = exports.Protocol || (exports.Protocol = {}));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = __webpack_require__(38)
var ieee754 = __webpack_require__(8)
var isArray = __webpack_require__(2)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer, __webpack_require__(33)))

/***/ },
/* 7 */
/***/ function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ },
/* 8 */
/***/ function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// int64-buffer.js

/*jshint -W018 */ // Confusing use of '!'.
/*jshint -W030 */ // Expected an assignment or function call and instead saw an expression.
/*jshint -W093 */ // Did you mean to return a conditional instead of an assignment?

var Uint64BE, Int64BE, Uint64LE, Int64LE;

!function(exports) {
  // constants

  var UNDEFINED = "undefined";
  var BUFFER = (UNDEFINED !== typeof Buffer) && Buffer;
  var UINT8ARRAY = (UNDEFINED !== typeof Uint8Array) && Uint8Array;
  var ARRAYBUFFER = (UNDEFINED !== typeof ArrayBuffer) && ArrayBuffer;
  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
  var isArray = Array.isArray || _isArray;
  var BIT32 = 4294967296;
  var BIT24 = 16777216;

  // storage class

  var storage; // Array;

  // generate classes

  Uint64BE = factory("Uint64BE", true, true);
  Int64BE = factory("Int64BE", true, false);
  Uint64LE = factory("Uint64LE", false, true);
  Int64LE = factory("Int64LE", false, false);

  // class factory

  function factory(name, bigendian, unsigned) {
    var posH = bigendian ? 0 : 4;
    var posL = bigendian ? 4 : 0;
    var pos0 = bigendian ? 0 : 3;
    var pos1 = bigendian ? 1 : 2;
    var pos2 = bigendian ? 2 : 1;
    var pos3 = bigendian ? 3 : 0;
    var fromPositive = bigendian ? fromPositiveBE : fromPositiveLE;
    var fromNegative = bigendian ? fromNegativeBE : fromNegativeLE;
    var proto = Int64.prototype;
    var isName = "is" + name;
    var _isInt64 = "_" + isName;

    // properties
    proto.buffer = void 0;
    proto.offset = 0;
    proto[_isInt64] = true;

    // methods
    proto.toNumber = toNumber;
    proto.toString = toString;
    proto.toJSON = toNumber;
    proto.toArray = toArray;

    // add .toBuffer() method only when Buffer available
    if (BUFFER) proto.toBuffer = toBuffer;

    // add .toArrayBuffer() method only when Uint8Array available
    if (UINT8ARRAY) proto.toArrayBuffer = toArrayBuffer;

    // isUint64BE, isInt64BE
    Int64[isName] = isInt64;

    // CommonJS
    exports[name] = Int64;

    return Int64;

    // constructor
    function Int64(buffer, offset, value, raddix) {
      if (!(this instanceof Int64)) return new Int64(buffer, offset, value, raddix);
      return init(this, buffer, offset, value, raddix);
    }

    // isUint64BE, isInt64BE
    function isInt64(b) {
      return !!(b && b[_isInt64]);
    }

    // initializer
    function init(that, buffer, offset, value, raddix) {
      if (UINT8ARRAY && ARRAYBUFFER) {
        if (buffer instanceof ARRAYBUFFER) buffer = new UINT8ARRAY(buffer);
        if (value instanceof ARRAYBUFFER) value = new UINT8ARRAY(value);
      }

      // Int64BE() style
      if (!buffer && !offset && !value && !storage) {
        // shortcut to initialize with zero
        that.buffer = newArray(ZERO, 0);
        return;
      }

      // Int64BE(value, raddix) style
      if (!isValidBuffer(buffer, offset)) {
        var _storage = storage || Array;
        raddix = offset;
        value = buffer;
        offset = 0;
        buffer = new _storage(8);
      }

      that.buffer = buffer;
      that.offset = offset |= 0;

      // Int64BE(buffer, offset) style
      if (UNDEFINED === typeof value) return;

      // Int64BE(buffer, offset, value, raddix) style
      if ("string" === typeof value) {
        fromString(buffer, offset, value, raddix || 10);
      } else if (isValidBuffer(value, raddix)) {
        fromArray(buffer, offset, value, raddix);
      } else if ("number" === typeof raddix) {
        writeInt32(buffer, offset + posH, value); // high
        writeInt32(buffer, offset + posL, raddix); // low
      } else if (value > 0) {
        fromPositive(buffer, offset, value); // positive
      } else if (value < 0) {
        fromNegative(buffer, offset, value); // negative
      } else {
        fromArray(buffer, offset, ZERO, 0); // zero, NaN and others
      }
    }

    function fromString(buffer, offset, str, raddix) {
      var pos = 0;
      var len = str.length;
      var high = 0;
      var low = 0;
      if (str[0] === "-") pos++;
      var sign = pos;
      while (pos < len) {
        var chr = parseInt(str[pos++], raddix);
        if (!(chr >= 0)) break; // NaN
        low = low * raddix + chr;
        high = high * raddix + Math.floor(low / BIT32);
        low %= BIT32;
      }
      if (sign) {
        high = ~high;
        if (low) {
          low = BIT32 - low;
        } else {
          high++;
        }
      }
      writeInt32(buffer, offset + posH, high);
      writeInt32(buffer, offset + posL, low);
    }

    function toNumber() {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      if (!unsigned) high |= 0; // a trick to get signed
      return high ? (high * BIT32 + low) : low;
    }

    function toString(radix) {
      var buffer = this.buffer;
      var offset = this.offset;
      var high = readInt32(buffer, offset + posH);
      var low = readInt32(buffer, offset + posL);
      var str = "";
      var sign = !unsigned && (high & 0x80000000);
      if (sign) {
        high = ~high;
        low = BIT32 - low;
      }
      radix = radix || 10;
      while (1) {
        var mod = (high % radix) * BIT32 + low;
        high = Math.floor(high / radix);
        low = Math.floor(mod / radix);
        str = (mod % radix).toString(radix) + str;
        if (!high && !low) break;
      }
      if (sign) {
        str = "-" + str;
      }
      return str;
    }

    function writeInt32(buffer, offset, value) {
      buffer[offset + pos3] = value & 255;
      value = value >> 8;
      buffer[offset + pos2] = value & 255;
      value = value >> 8;
      buffer[offset + pos1] = value & 255;
      value = value >> 8;
      buffer[offset + pos0] = value & 255;
    }

    function readInt32(buffer, offset) {
      return (buffer[offset + pos0] * BIT24) +
        (buffer[offset + pos1] << 16) +
        (buffer[offset + pos2] << 8) +
        buffer[offset + pos3];
    }
  }

  function toArray(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = null; // Array
    if (raw !== false && offset === 0 && buffer.length === 8 && isArray(buffer)) return buffer;
    return newArray(buffer, offset);
  }

  function toBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    storage = BUFFER;
    if (raw !== false && offset === 0 && buffer.length === 8 && Buffer.isBuffer(buffer)) return buffer;
    var dest = new BUFFER(8);
    fromArray(dest, 0, buffer, offset);
    return dest;
  }

  function toArrayBuffer(raw) {
    var buffer = this.buffer;
    var offset = this.offset;
    var arrbuf = buffer.buffer;
    storage = UINT8ARRAY;
    if (raw !== false && offset === 0 && (arrbuf instanceof ARRAYBUFFER) && arrbuf.byteLength === 8) return arrbuf;
    var dest = new UINT8ARRAY(8);
    fromArray(dest, 0, buffer, offset);
    return dest.buffer;
  }

  function isValidBuffer(buffer, offset) {
    var len = buffer && buffer.length;
    offset |= 0;
    return len && (offset + 8 <= len) && ("string" !== typeof buffer[offset]);
  }

  function fromArray(destbuf, destoff, srcbuf, srcoff) {
    destoff |= 0;
    srcoff |= 0;
    for (var i = 0; i < 8; i++) {
      destbuf[destoff++] = srcbuf[srcoff++] & 255;
    }
  }

  function newArray(buffer, offset) {
    return Array.prototype.slice.call(buffer, offset, offset + 8);
  }

  function fromPositiveBE(buffer, offset, value) {
    var pos = offset + 8;
    while (pos > offset) {
      buffer[--pos] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeBE(buffer, offset, value) {
    var pos = offset + 8;
    value++;
    while (pos > offset) {
      buffer[--pos] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  function fromPositiveLE(buffer, offset, value) {
    var end = offset + 8;
    while (offset < end) {
      buffer[offset++] = value & 255;
      value /= 256;
    }
  }

  function fromNegativeLE(buffer, offset, value) {
    var end = offset + 8;
    value++;
    while (offset < end) {
      buffer[offset++] = ((-value) & 255) ^ 255;
      value /= 256;
    }
  }

  // https://github.com/retrofox/is-array
  function _isArray(val) {
    return !!val && "[object Array]" == Object.prototype.toString.call(val);
  }

}(typeof exports === 'object' && typeof exports.nodeName !== 'string' ? exports : (this || {}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

// browser.js

exports.encode = __webpack_require__(25).encode;
exports.decode = __webpack_require__(23).decode;

exports.Encoder = __webpack_require__(51).Encoder;
exports.Decoder = __webpack_require__(50).Decoder;

exports.createCodec = __webpack_require__(54).createCodec;
exports.codec = __webpack_require__(49).codec;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

// bufferish-proto.js

/* jshint eqnull:true */

var BufferLite = __webpack_require__(45);

exports.copy = copy;
exports.slice = slice;
exports.toString = toString;
exports.write = gen("write");

var Bufferish = __webpack_require__(0);
var Buffer = Bufferish.global;

var isBufferShim = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var brokenTypedArray = isBufferShim && !Buffer.TYPED_ARRAY_SUPPORT;

/**
 * @param target {Buffer|Uint8Array|Array}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function copy(target, targetStart, start, end) {
  var thisIsBuffer = Bufferish.isBuffer(this);
  var targetIsBuffer = Bufferish.isBuffer(target);
  if (thisIsBuffer && targetIsBuffer) {
    // Buffer to Buffer
    return this.copy(target, targetStart, start, end);
  } else if (!brokenTypedArray && !thisIsBuffer && !targetIsBuffer &&
    Bufferish.isView(this) && Bufferish.isView(target)) {
    // Uint8Array to Uint8Array (except for minor some browsers)
    var buffer = (start || end != null) ? slice.call(this, start, end) : this;
    target.set(buffer, targetStart);
    return buffer.length;
  } else {
    // other cases
    return BufferLite.copy.call(this, target, targetStart, start, end);
  }
}

/**
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function slice(start, end) {
  // for Buffer, Uint8Array (except for minor some browsers) and Array
  var f = this.slice || (!brokenTypedArray && this.subarray);
  if (f) return f.call(this, start, end);

  // Uint8Array (for minor some browsers)
  var target = Bufferish.alloc.call(this, end - start);
  copy.call(this, target, 0, start, end);
  return target;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var f = (!isBufferShim && Bufferish.isBuffer(this)) ? this.toString : BufferLite.toString;
  return f.apply(this, arguments);
}

/**
 * @private
 */

function gen(method) {
  return wrap;

  function wrap() {
    var f = this[method] || BufferLite[method];
    return f.apply(this, arguments);
  }
}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

// ext-buffer.js

exports.ExtBuffer = ExtBuffer;

var Bufferish = __webpack_require__(0);

function ExtBuffer(buffer, type) {
  if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
  this.buffer = Bufferish.from(buffer);
  this.type = type;
}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

// read-core.js

var ExtBuffer = __webpack_require__(12).ExtBuffer;
var ExtUnpacker = __webpack_require__(53);
var readUint8 = __webpack_require__(27).readUint8;
var ReadToken = __webpack_require__(55);
var CodecBase = __webpack_require__(3);

CodecBase.install({
  addExtUnpacker: addExtUnpacker,
  getExtUnpacker: getExtUnpacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getDecoder(options) {
  var readToken = ReadToken.getReadToken(options);
  return decode;

  function decode(decoder) {
    var type = readUint8(decoder);
    var func = readToken[type];
    if (!func) throw new Error("Invalid type: " + (type ? ("0x" + type.toString(16)) : type));
    return func(decoder);
  }
}

function init() {
  var options = this.options;
  this.decode = getDecoder(options);

  if (options && options.preset) {
    ExtUnpacker.setExtUnpackers(this);
  }

  return this;
}

function addExtUnpacker(etype, unpacker) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  unpackers[etype] = CodecBase.filter(unpacker);
}

function getExtUnpacker(type) {
  var unpackers = this.extUnpackers || (this.extUnpackers = []);
  return unpackers[type] || extUnpacker;

  function extUnpacker(buffer) {
    return new ExtBuffer(buffer, type);
  }
}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

// write-core.js

var ExtBuffer = __webpack_require__(12).ExtBuffer;
var ExtPacker = __webpack_require__(52);
var WriteType = __webpack_require__(57);
var CodecBase = __webpack_require__(3);

CodecBase.install({
  addExtPacker: addExtPacker,
  getExtPacker: getExtPacker,
  init: init
});

exports.preset = init.call(CodecBase.preset);

function getEncoder(options) {
  var writeType = WriteType.getWriteType(options);
  return encode;

  function encode(encoder, value) {
    var func = writeType[typeof value];
    if (!func) throw new Error("Unsupported type \"" + (typeof value) + "\": " + value);
    func(encoder, value);
  }
}

function init() {
  var options = this.options;
  this.encode = getEncoder(options);

  if (options && options.preset) {
    ExtPacker.setExtPackers(this);
  }

  return this;
}

function addExtPacker(etype, Class, packer) {
  packer = CodecBase.filter(packer);
  var name = Class.name;
  if (name && name !== "Object") {
    var packers = this.extPackers || (this.extPackers = {});
    packers[name] = extPacker;
  } else {
    // fallback for IE
    var list = this.extEncoderList || (this.extEncoderList = []);
    list.unshift([Class, extPacker]);
  }

  function extPacker(value) {
    if (packer) value = packer(value);
    return new ExtBuffer(value, etype);
  }
}

function getExtPacker(value) {
  var packers = this.extPackers || (this.extPackers = {});
  var c = value.constructor;
  var e = c && c.name && packers[c.name];
  if (e) return e;

  // fallback for IE
  var list = this.extEncoderList || (this.extEncoderList = []);
  var len = list.length;
  for (var i = 0; i < len; i++) {
    var pair = list[i];
    if (c === pair[0]) return pair[1];
  }
}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

module.exports = __webpack_require__(58);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var SlotList_1 = __webpack_require__(32);
var Slot_1 = __webpack_require__(4);
/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/*[DefaultProperty("valueClasses")]*/
/**
 * Signal dispatches events to multiple listeners.
 * It is inspired by C# events and delegates, and by
 * <a target="_top" href="http://en.wikipedia.org/wiki/Signals_and_slots">signals and slots</a>
 * in Qt.
 * A Signal adds event dispatching functionality through composition and interfaces,
 * rather than inheriting from a dispatcher.
 * <br/><br/>
 * Project home: <a target="_top" href="http://github.com/robertpenner/as3-signals/">http://github.com/robertpenner/as3-signals/</a>
 */
var OnceSignal = (function () {
    /**
     * Creates a Signal instance to dispatch value objects.
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new Signal(String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: In AS3, subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    function OnceSignal() {
        var valueClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueClasses[_i] = arguments[_i];
        }
        this.slots = SlotList_1.SlotList.NIL;
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        this.valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;
    }
    Object.defineProperty(OnceSignal.prototype, "valueClasses", {
        /**
         * @inheritDoc
         * @throws ArgumentError <code>ArgumentError</code>: Invalid valueClasses argument: item at index should be a Class but was not.
         */
        /*[ArrayElementType("Class")]*/
        get: function () {
            return this._valueClasses;
        },
        set: function (value) {
            // Clone so the Array cannot be affected from outside.
            this._valueClasses = value ? value.slice() : [];
            for (var i = this._valueClasses.length; i--;) {
                if (!(this._valueClasses[i] instanceof Object)) {
                    throw new Error('Invalid valueClasses argument: ' +
                        'item at index ' + i + ' should be a Class but was:<' +
                        this._valueClasses[i] + '>.' + this._valueClasses[i]); //@CHANGED - temp replacement for getQualifiedClassByName()
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnceSignal.prototype, "numListeners", {
        /** @inheritDoc */
        get: function () {
            return this.slots.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    OnceSignal.prototype.addOnce = function (listener) {
        return this.registerListener(listener, true);
    };
    /** @inheritDoc */
    OnceSignal.prototype.remove = function (listener) {
        var slot = this.slots.find(listener);
        if (!slot)
            return null;
        this.slots = this.slots.filterNot(listener);
        return slot;
    };
    /** @inheritDoc */
    OnceSignal.prototype.removeAll = function () {
        this.slots = SlotList_1.SlotList.NIL;
    };
    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Incorrect number of arguments.
     * @throws ArgumentError <code>ArgumentError</code>: Value object is not an instance of the appropriate valueClasses Class.
     */
    OnceSignal.prototype.dispatch = function () {
        var valueObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueObjects[_i] = arguments[_i];
        }
        // If valueClasses is empty, value objects are not type-checked.
        var numValueClasses = this._valueClasses.length;
        var numValueObjects = valueObjects.length;
        // Cannot dispatch fewer objects than declared classes.
        if (numValueObjects < numValueClasses) {
            throw new Error('Incorrect number of arguments. ' +
                'Expected at least ' + numValueClasses + ' but received ' +
                numValueObjects + '.');
        }
        // Cannot dispatch differently typed objects than declared classes.
        for (var i = 0; i < numValueClasses; i++) {
            // Optimized for the optimistic case that values are correct.
            if (valueObjects[i] === null ||
                (valueObjects[i] instanceof this._valueClasses[i] || valueObjects[i].constructor === this._valueClasses[i])) {
                continue;
            }
            throw new Error('Value object <' + valueObjects[i]
                + '> is not an instance of <' + this._valueClasses[i] + '>.');
        }
        // Broadcast to listeners.
        var slotsToProcess = this.slots;
        if (slotsToProcess.nonEmpty) {
            while (slotsToProcess.nonEmpty) {
                slotsToProcess.head.execute(valueObjects);
                slotsToProcess = slotsToProcess.tail;
            }
        }
    };
    OnceSignal.prototype.registerListener = function (listener, once) {
        if (once === void 0) { once = false; }
        if (this.registrationPossible(listener, once)) {
            var newSlot = new Slot_1.Slot(listener, this, once);
            this.slots = this.slots.prepend(newSlot);
            return newSlot;
        }
        return this.slots.find(listener);
    };
    OnceSignal.prototype.registrationPossible = function (listener, once) {
        if (!this.slots.nonEmpty)
            return true;
        var existingSlot = this.slots.find(listener);
        if (!existingSlot)
            return true;
        if (existingSlot.once != once) {
            // If the listener was previously added, definitely don't add it again.
            // But throw an exception if their once values differ.
            throw new Error('You cannot addOnce() then add() the same listener without removing the relationship first.');
        }
        return false; // Listener was already registered.
    };
    return OnceSignal;
}());
exports.OnceSignal = OnceSignal;
//# sourceMappingURL=OnceSignal.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var signals_js_1 = __webpack_require__(29);
var Clock = __webpack_require__(39);
var delta_listener_1 = __webpack_require__(42);
var msgpack = __webpack_require__(10);
var fossilDelta = __webpack_require__(43);
var Protocol_1 = __webpack_require__(5);
var Room = (function (_super) {
    __extends(Room, _super);
    function Room(name) {
        var _this = _super.call(this, {}) || this;
        _this.clock = new Clock(); // experimental
        _this.remoteClock = new Clock(); // experimental
        // Public signals
        _this.onJoin = new signals_js_1.Signal();
        _this.onUpdate = new signals_js_1.Signal();
        _this.onData = new signals_js_1.Signal();
        _this.onError = new signals_js_1.Signal();
        _this.onLeave = new signals_js_1.Signal();
        _this.id = null;
        _this.name = name;
        _this.onLeave.add(function () { return _this.removeAllListeners(); });
        return _this;
    }
    Room.prototype.connect = function (connection) {
        var _this = this;
        this.connection = connection;
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = function (e) { return _this.onLeave.dispatch(); };
    };
    Room.prototype.onMessageCallback = function (event) {
        var message = msgpack.decode(new Uint8Array(event.data));
        var code = message[0];
        if (code == Protocol_1.Protocol.JOIN_ROOM) {
            this.sessionId = message[1];
            this.onJoin.dispatch();
        }
        else if (code == Protocol_1.Protocol.JOIN_ERROR) {
            this.onError.dispatch(message[2]);
        }
        else if (code == Protocol_1.Protocol.ROOM_STATE) {
            var state = message[2];
            var remoteCurrentTime = message[3];
            var remoteElapsedTime = message[4];
            this.setState(state, remoteCurrentTime, remoteElapsedTime);
        }
        else if (code == Protocol_1.Protocol.ROOM_STATE_PATCH) {
            this.patch(message[2]);
        }
        else if (code == Protocol_1.Protocol.ROOM_DATA) {
            this.onData.dispatch(message[2]);
        }
        else if (code == Protocol_1.Protocol.LEAVE_ROOM) {
            this.leave();
        }
    };
    Room.prototype.setState = function (state, remoteCurrentTime, remoteElapsedTime) {
        this.set(state);
        this._previousState = msgpack.encode(state);
        // set remote clock properties
        if (remoteCurrentTime && remoteElapsedTime) {
            this.remoteClock.currentTime = remoteCurrentTime;
            this.remoteClock.elapsedTime = remoteElapsedTime;
        }
        this.clock.start();
        this.onUpdate.dispatch(state);
    };
    Room.prototype.patch = function (binaryPatch) {
        //
        // calculate client-side ping
        //
        var patchTime = Date.now();
        if (this.lastPatchTime) {
            this.ping = patchTime - this.lastPatchTime;
        }
        this.lastPatchTime = patchTime;
        this.clock.tick();
        // apply patch
        this._previousState = fossilDelta.apply(this._previousState, binaryPatch);
        // trigger state callbacks
        this.set(msgpack.decode(this._previousState));
        this.onUpdate.dispatch(this.data);
    };
    Room.prototype.leave = function () {
        if (this.id) {
            this.connection.close();
        }
    };
    Room.prototype.send = function (data) {
        this.connection.send([Protocol_1.Protocol.ROOM_DATA, this.id, data]);
    };
    Room.prototype.removeAllListeners = function () {
        _super.prototype.removeAllListeners.call(this);
        this.onJoin.removeAll();
        this.onUpdate.removeAll();
        this.onData.removeAll();
        this.onError.removeAll();
        this.onLeave.removeAll();
    };
    return Room;
}(delta_listener_1.DeltaContainer));
exports.Room = Room;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var events = __webpack_require__(7);
var precond = __webpack_require__(15);
var util = __webpack_require__(1);

// A class to hold the state of a backoff operation. Accepts a backoff strategy
// to generate the backoff delays.
function Backoff(backoffStrategy) {
    events.EventEmitter.call(this);

    this.backoffStrategy_ = backoffStrategy;
    this.maxNumberOfRetry_ = -1;
    this.backoffNumber_ = 0;
    this.backoffDelay_ = 0;
    this.timeoutID_ = -1;

    this.handlers = {
        backoff: this.onBackoff_.bind(this)
    };
}
util.inherits(Backoff, events.EventEmitter);

// Sets a limit, greater than 0, on the maximum number of backoffs. A 'fail'
// event will be emitted when the limit is reached.
Backoff.prototype.failAfter = function(maxNumberOfRetry) {
    precond.checkArgument(maxNumberOfRetry > 0,
        'Expected a maximum number of retry greater than 0 but got %s.',
        maxNumberOfRetry);

    this.maxNumberOfRetry_ = maxNumberOfRetry;
};

// Starts a backoff operation. Accepts an optional parameter to let the
// listeners know why the backoff operation was started.
Backoff.prototype.backoff = function(err) {
    precond.checkState(this.timeoutID_ === -1, 'Backoff in progress.');

    if (this.backoffNumber_ === this.maxNumberOfRetry_) {
        this.emit('fail', err);
        this.reset();
    } else {
        this.backoffDelay_ = this.backoffStrategy_.next();
        this.timeoutID_ = setTimeout(this.handlers.backoff, this.backoffDelay_);
        this.emit('backoff', this.backoffNumber_, this.backoffDelay_, err);
    }
};

// Handles the backoff timeout completion.
Backoff.prototype.onBackoff_ = function() {
    this.timeoutID_ = -1;
    this.emit('ready', this.backoffNumber_, this.backoffDelay_);
    this.backoffNumber_++;
};

// Stops any backoff operation and resets the backoff delay to its inital value.
Backoff.prototype.reset = function() {
    this.backoffNumber_ = 0;
    this.backoffStrategy_.reset();
    clearTimeout(this.timeoutID_);
    this.timeoutID_ = -1;
};

module.exports = Backoff;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var util = __webpack_require__(1);

var BackoffStrategy = __webpack_require__(20);

// Fibonacci backoff strategy.
function FibonacciBackoffStrategy(options) {
    BackoffStrategy.call(this, options);
    this.backoffDelay_ = 0;
    this.nextBackoffDelay_ = this.getInitialDelay();
}
util.inherits(FibonacciBackoffStrategy, BackoffStrategy);

FibonacciBackoffStrategy.prototype.next_ = function() {
    var backoffDelay = Math.min(this.nextBackoffDelay_, this.getMaxDelay());
    this.nextBackoffDelay_ += this.backoffDelay_;
    this.backoffDelay_ = backoffDelay;
    return backoffDelay;
};

FibonacciBackoffStrategy.prototype.reset_ = function() {
    this.nextBackoffDelay_ = this.getInitialDelay();
    this.backoffDelay_ = 0;
};

module.exports = FibonacciBackoffStrategy;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var events = __webpack_require__(7);
var util = __webpack_require__(1);

function isDef(value) {
    return value !== undefined && value !== null;
}

// Abstract class defining the skeleton for the backoff strategies. Accepts an
// object holding the options for the backoff strategy:
//
//  * `randomisationFactor`: The randomisation factor which must be between 0
//     and 1 where 1 equates to a randomization factor of 100% and 0 to no
//     randomization.
//  * `initialDelay`: The backoff initial delay in milliseconds.
//  * `maxDelay`: The backoff maximal delay in milliseconds.
function BackoffStrategy(options) {
    options = options || {};

    if (isDef(options.initialDelay) && options.initialDelay < 1) {
        throw new Error('The initial timeout must be greater than 0.');
    } else if (isDef(options.maxDelay) && options.maxDelay < 1) {
        throw new Error('The maximal timeout must be greater than 0.');
    }

    this.initialDelay_ = options.initialDelay || 100;
    this.maxDelay_ = options.maxDelay || 10000;

    if (this.maxDelay_ <= this.initialDelay_) {
        throw new Error('The maximal backoff delay must be ' +
                        'greater than the initial backoff delay.');
    }

    if (isDef(options.randomisationFactor) &&
        (options.randomisationFactor < 0 || options.randomisationFactor > 1)) {
        throw new Error('The randomisation factor must be between 0 and 1.');
    }

    this.randomisationFactor_ = options.randomisationFactor || 0;
}

// Gets the maximal backoff delay.
BackoffStrategy.prototype.getMaxDelay = function() {
    return this.maxDelay_;
};

// Gets the initial backoff delay.
BackoffStrategy.prototype.getInitialDelay = function() {
    return this.initialDelay_;
};

// Template method that computes and returns the next backoff delay in
// milliseconds.
BackoffStrategy.prototype.next = function() {
    var backoffDelay = this.next_();
    var randomisationMultiple = 1 + Math.random() * this.randomisationFactor_;
    var randomizedDelay = Math.round(backoffDelay * randomisationMultiple);
    return randomizedDelay;
};

// Computes and returns the next backoff delay. Intended to be overridden by
// subclasses.
BackoffStrategy.prototype.next_ = function() {
    throw new Error('BackoffStrategy.next_() unimplemented.');
};

// Template method that resets the backoff delay to its initial value.
BackoffStrategy.prototype.reset = function() {
    this.reset_();
};

// Resets the backoff delay to its initial value. Intended to be overridden by
// subclasses.
BackoffStrategy.prototype.reset_ = function() {
    throw new Error('BackoffStrategy.reset_() unimplemented.');
};

module.exports = BackoffStrategy;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */

function EventLite() {
  if (!(this instanceof EventLite)) return new EventLite();
}

(function(EventLite) {
  // export the class for node.js
  if (true) module.exports = EventLite;

  // property name to hold listeners
  var LISTENERS = "listeners";

  // methods to export
  var methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
  };

  // mixin to self
  mixin(EventLite.prototype);

  // export mixin function
  EventLite.mixin = mixin;

  /**
   * Import on(), once(), off() and emit() methods into target object.
   *
   * @function EventLite.mixin
   * @param target {Prototype}
   */

  function mixin(target) {
    for (var key in methods) {
      target[key] = methods[key];
    }
    return target;
  }

  /**
   * Add an event listener.
   *
   * @function EventLite.prototype.on
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function on(type, func) {
    getListeners(this, type).push(func);
    return this;
  }

  /**
   * Add one-time event listener.
   *
   * @function EventLite.prototype.once
   * @param type {string}
   * @param func {Function}
   * @returns {EventLite} Self for method chaining
   */

  function once(type, func) {
    var that = this;
    wrap.originalListener = func;
    getListeners(that, type).push(wrap);
    return that;

    function wrap() {
      off.call(that, type, wrap);
      func.apply(this, arguments);
    }
  }

  /**
   * Remove an event listener.
   *
   * @function EventLite.prototype.off
   * @param [type] {string}
   * @param [func] {Function}
   * @returns {EventLite} Self for method chaining
   */

  function off(type, func) {
    var that = this;
    var listners;
    if (!arguments.length) {
      delete that[LISTENERS];
    } else if (!func) {
      listners = that[LISTENERS];
      if (listners) {
        delete listners[type];
        if (!Object.keys(listners).length) return off.call(that);
      }
    } else {
      listners = getListeners(that, type, true);
      if (listners) {
        listners = listners.filter(ne);
        if (!listners.length) return off.call(that, type);
        that[LISTENERS][type] = listners;
      }
    }
    return that;

    function ne(test) {
      return test !== func && test.originalListener !== func;
    }
  }

  /**
   * Dispatch (trigger) an event.
   *
   * @function EventLite.prototype.emit
   * @param type {string}
   * @param [value] {*}
   * @returns {boolean} True when a listener received the event
   */

  function emit(type, value) {
    var that = this;
    var listeners = getListeners(that, type, true);
    if (!listeners) return false;
    var arglen = arguments.length;
    if (arglen === 1) {
      listeners.forEach(zeroarg);
    } else if (arglen === 2) {
      listeners.forEach(onearg);
    } else {
      var args = Array.prototype.slice.call(arguments, 1);
      listeners.forEach(moreargs);
    }
    return !!listeners.length;

    function zeroarg(func) {
      func.call(that);
    }

    function onearg(func) {
      func.call(that, value);
    }

    function moreargs(func) {
      func.apply(that, args);
    }
  }

  /**
   * @ignore
   */

  function getListeners(that, type, readonly) {
    if (readonly && !that[LISTENERS]) return;
    var listeners = that[LISTENERS] || (that[LISTENERS] = {});
    return listeners[type] || (listeners[type] = []);
  }

})(EventLite);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

// decode-buffer.js

exports.DecodeBuffer = DecodeBuffer;

var preset = __webpack_require__(13).preset;

var FlexDecoder = __webpack_require__(26).FlexDecoder;

FlexDecoder.mixin(DecodeBuffer.prototype);

function DecodeBuffer(options) {
  if (!(this instanceof DecodeBuffer)) return new DecodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

DecodeBuffer.prototype.codec = preset;

DecodeBuffer.prototype.fetch = function() {
  return this.codec.decode(this);
};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

// decode.js

exports.decode = decode;

var DecodeBuffer = __webpack_require__(22).DecodeBuffer;

function decode(input, options) {
  var decoder = new DecodeBuffer(options);
  decoder.write(input);
  return decoder.read();
}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

// encode-buffer.js

exports.EncodeBuffer = EncodeBuffer;

var preset = __webpack_require__(14).preset;

var FlexEncoder = __webpack_require__(26).FlexEncoder;

FlexEncoder.mixin(EncodeBuffer.prototype);

function EncodeBuffer(options) {
  if (!(this instanceof EncodeBuffer)) return new EncodeBuffer(options);

  if (options) {
    this.options = options;
    if (options.codec) {
      var codec = this.codec = options.codec;
      if (codec.bufferish) this.bufferish = codec.bufferish;
    }
  }
}

EncodeBuffer.prototype.codec = preset;

EncodeBuffer.prototype.write = function(input) {
  this.codec.encode(this, input);
};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

// encode.js

exports.encode = encode;

var EncodeBuffer = __webpack_require__(24).EncodeBuffer;

function encode(input, options) {
  var encoder = new EncodeBuffer(options);
  encoder.write(input);
  return encoder.read();
}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

// flex-buffer.js

exports.FlexDecoder = FlexDecoder;
exports.FlexEncoder = FlexEncoder;

var Bufferish = __webpack_require__(0);

var MIN_BUFFER_SIZE = 2048;
var MAX_BUFFER_SIZE = 65536;
var BUFFER_SHORTAGE = "BUFFER_SHORTAGE";

function FlexDecoder() {
  if (!(this instanceof FlexDecoder)) return new FlexDecoder();
}

function FlexEncoder() {
  if (!(this instanceof FlexEncoder)) return new FlexEncoder();
}

FlexDecoder.mixin = mixinFactory(getDecoderMethods());
FlexDecoder.mixin(FlexDecoder.prototype);

FlexEncoder.mixin = mixinFactory(getEncoderMethods());
FlexEncoder.mixin(FlexEncoder.prototype);

function getDecoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    offset: 0
  };

  function write(chunk) {
    var prev = this.offset ? Bufferish.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = prev ? (chunk ? this.bufferish.concat([prev, chunk]) : prev) : chunk;
    this.offset = 0;
  }

  function flush() {
    while (this.offset < this.buffer.length) {
      var start = this.offset;
      var value;
      try {
        value = this.fetch();
      } catch (e) {
        if (e && e.message != BUFFER_SHORTAGE) throw e;
        // rollback
        this.offset = start;
        break;
      }
      this.push(value);
    }
  }

  function reserve(length) {
    var start = this.offset;
    var end = start + length;
    if (end > this.buffer.length) throw new Error(BUFFER_SHORTAGE);
    this.offset = end;
    return start;
  }
}

function getEncoderMethods() {
  return {
    bufferish: Bufferish,
    write: write,
    fetch: fetch,
    flush: flush,
    push: push,
    pull: pull,
    read: read,
    reserve: reserve,
    send: send,
    maxBufferSize: MAX_BUFFER_SIZE,
    minBufferSize: MIN_BUFFER_SIZE,
    offset: 0,
    start: 0
  };

  function fetch() {
    var start = this.start;
    if (start < this.offset) {
      var end = this.start = this.offset;
      return Bufferish.prototype.slice.call(this.buffer, start, end);
    }
  }

  function flush() {
    while (this.start < this.offset) {
      var value = this.fetch();
      if (value) this.push(value);
    }
  }

  function pull() {
    var buffers = this.buffers || (this.buffers = []);
    var chunk = buffers.length > 1 ? this.bufferish.concat(buffers) : buffers[0];
    buffers.length = 0; // buffer exhausted
    return chunk;
  }

  function reserve(length) {
    var req = length | 0;

    if (this.buffer) {
      var size = this.buffer.length;
      var start = this.offset | 0;
      var end = start + req;

      // is it long enough?
      if (end < size) {
        this.offset = end;
        return start;
      }

      // flush current buffer
      this.flush();

      // resize it to 2x current length
      length = Math.max(length, Math.min(size * 2, this.maxBufferSize));
    }

    // minimum buffer size
    length = Math.max(length, this.minBufferSize);

    // allocate new buffer
    this.buffer = this.bufferish.alloc(length);
    this.start = 0;
    this.offset = req;
    return 0;
  }

  function send(buffer) {
    var length = buffer.length;
    if (length > this.minBufferSize) {
      this.flush();
      this.push(buffer);
    } else {
      var offset = this.reserve(length);
      Bufferish.prototype.copy.call(buffer, this.buffer, offset);
    }
  }
}

// common methods

function write() {
  throw new Error("method not implemented: write()");
}

function fetch() {
  throw new Error("method not implemented: fetch()");
}

function read() {
  var length = this.buffers && this.buffers.length;

  // fetch the first result
  if (!length) return this.fetch();

  // flush current buffer
  this.flush();

  // read from the results
  return this.pull();
}

function push(chunk) {
  var buffers = this.buffers || (this.buffers = []);
  buffers.push(chunk);
}

function pull() {
  var buffers = this.buffers || (this.buffers = []);
  return buffers.shift();
}

function mixinFactory(source) {
  return mixin;

  function mixin(target) {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }
}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

// read-format.js

var ieee754 = __webpack_require__(8);
var Int64Buffer = __webpack_require__(9);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

exports.getReadFormat = getReadFormat;
exports.readUint8 = uint8;

var Bufferish = __webpack_require__(0);
var BufferProto = __webpack_require__(11);

var HAS_MAP = ("undefined" !== typeof Map);
var NO_ASSERT = true;

function getReadFormat(options) {
  var binarraybuffer = Bufferish.hasArrayBuffer && options && options.binarraybuffer;
  var int64 = options && options.int64;
  var usemap = HAS_MAP && options && options.usemap;

  var readFormat = {
    map: (usemap ? map_to_map : map_to_obj),
    array: array,
    str: str,
    bin: (binarraybuffer ? bin_arraybuffer : bin_buffer),
    ext: ext,
    uint8: uint8,
    uint16: uint16,
    uint32: uint32,
    uint64: read(8, int64 ? readUInt64BE_int64 : readUInt64BE),
    int8: int8,
    int16: int16,
    int32: int32,
    int64: read(8, int64 ? readInt64BE_int64 : readInt64BE),
    float32: read(4, readFloatBE),
    float64: read(8, readDoubleBE)
  };

  return readFormat;
}

function map_to_obj(decoder, len) {
  var value = {};
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value[k[i]] = v[i];
  }
  return value;
}

function map_to_map(decoder, len) {
  var value = new Map();
  var i;
  var k = new Array(len);
  var v = new Array(len);

  var decode = decoder.codec.decode;
  for (i = 0; i < len; i++) {
    k[i] = decode(decoder);
    v[i] = decode(decoder);
  }
  for (i = 0; i < len; i++) {
    value.set(k[i], v[i]);
  }
  return value;
}

function array(decoder, len) {
  var value = new Array(len);
  var decode = decoder.codec.decode;
  for (var i = 0; i < len; i++) {
    value[i] = decode(decoder);
  }
  return value;
}

function str(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  return BufferProto.toString.call(decoder.buffer, "utf-8", start, end);
}

function bin_buffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.from(buf);
}

function bin_arraybuffer(decoder, len) {
  var start = decoder.reserve(len);
  var end = start + len;
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return Bufferish.Uint8Array.from(buf).buffer;
}

function ext(decoder, len) {
  var start = decoder.reserve(len+1);
  var type = decoder.buffer[start++];
  var end = start + len;
  var unpack = decoder.codec.getExtUnpacker(type);
  if (!unpack) throw new Error("Invalid ext type: " + (type ? ("0x" + type.toString(16)) : type));
  var buf = BufferProto.slice.call(decoder.buffer, start, end);
  return unpack(buf);
}

function uint8(decoder) {
  var start = decoder.reserve(1);
  return decoder.buffer[start];
}

function int8(decoder) {
  var start = decoder.reserve(1);
  var value = decoder.buffer[start];
  return (value & 0x80) ? value - 0x100 : value;
}

function uint16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  return (buffer[start++] << 8) | buffer[start];
}

function int16(decoder) {
  var start = decoder.reserve(2);
  var buffer = decoder.buffer;
  var value = (buffer[start++] << 8) | buffer[start];
  return (value & 0x8000) ? value - 0x10000 : value;
}

function uint32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] * 16777216) + (buffer[start++] << 16) + (buffer[start++] << 8) + buffer[start];
}

function int32(decoder) {
  var start = decoder.reserve(4);
  var buffer = decoder.buffer;
  return (buffer[start++] << 24) | (buffer[start++] << 16) | (buffer[start++] << 8) | buffer[start];
}

function read(len, method) {
  return function(decoder) {
    var start = decoder.reserve(len);
    return method.call(decoder.buffer, start, NO_ASSERT);
  };
}

function readUInt64BE(start) {
  return new Uint64BE(this, start).toNumber();
}

function readInt64BE(start) {
  return new Int64BE(this, start).toNumber();
}

function readUInt64BE_int64(start) {
  return new Uint64BE(this, start);
}

function readInt64BE_int64(start) {
  return new Int64BE(this, start);
}

function readFloatBE(start) {
  return ieee754.read(this, start, false, 23, 4);
}

function readDoubleBE(start) {
  return ieee754.read(this, start, false, 52, 8);
}

/***/ },
/* 28 */
/***/ function(module, exports) {

// write-unit8.js

var constant = exports.uint8 = new Array(256);

for (var i = 0x00; i <= 0xFF; i++) {
  constant[i] = write0(i);
}

function write0(type) {
  return function(encoder) {
    var offset = encoder.reserve(1);
    encoder.buffer[offset] = type;
  };
}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var DeluxeSignal_1 = __webpack_require__(61);
exports.DeluxeSignal = DeluxeSignal_1.DeluxeSignal;
var GenericEvent_1 = __webpack_require__(68);
exports.GenericEvent = GenericEvent_1.GenericEvent;
var IOnceSignal_1 = __webpack_require__(62);
exports.IOnceSignal = IOnceSignal_1.IOnceSignal;
var IPrioritySignal_1 = __webpack_require__(63);
exports.IPrioritySignal = IPrioritySignal_1.IPrioritySignal;
var ISignal_1 = __webpack_require__(64);
exports.ISignal = ISignal_1.ISignal;
var ISlot_1 = __webpack_require__(65);
exports.ISlot = ISlot_1.ISlot;
var MonoSignal_1 = __webpack_require__(66);
exports.MonoSignal = MonoSignal_1.MonoSignal;
var OnceSignal_1 = __webpack_require__(16);
exports.OnceSignal = OnceSignal_1.OnceSignal;
var PrioritySignal_1 = __webpack_require__(30);
exports.PrioritySignal = PrioritySignal_1.PrioritySignal;
var Promise_1 = __webpack_require__(67);
exports.Promise = Promise_1.Promise;
var Signal_1 = __webpack_require__(31);
exports.Signal = Signal_1.Signal;
var Slot_1 = __webpack_require__(4);
exports.Slot = Slot_1.Slot;
var SlotList_1 = __webpack_require__(32);
exports.SlotList = SlotList_1.SlotList;
//# sourceMappingURL=index.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Signal_1 = __webpack_require__(31);
var Slot_1 = __webpack_require__(4);
var PrioritySignal = (function (_super) {
    __extends(PrioritySignal, _super);
    function PrioritySignal() {
        var valueClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueClasses[_i] = arguments[_i];
        }
        var _this;
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;
        _this = _super.call(this, valueClasses) || this;
        return _this;
    }
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    PrioritySignal.prototype.addWithPriority = function (listener, priority) {
        if (priority === void 0) { priority = 0; }
        return this.registerListenerWithPriority(listener, false, priority);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    PrioritySignal.prototype.addOnceWithPriority = function (listener, priority) {
        if (priority === void 0) { priority = 0; }
        return this.registerListenerWithPriority(listener, true, priority);
    };
    /*override*/
    PrioritySignal.prototype.registerListener = function (listener, once) {
        if (once === void 0) { once = false; }
        return this.registerListenerWithPriority(listener, once);
    };
    PrioritySignal.prototype.registerListenerWithPriority = function (listener, once, priority) {
        if (once === void 0) { once = false; }
        if (priority === void 0) { priority = 0; }
        if (this.registrationPossible(listener, once)) {
            var slot = new Slot_1.Slot(listener, this, once, priority);
            this.slots = this.slots.insertWithPriority(slot);
            return slot;
        }
        return this.slots.find(listener);
    };
    return PrioritySignal;
}(Signal_1.Signal));
exports.PrioritySignal = PrioritySignal;
//# sourceMappingURL=PrioritySignal.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OnceSignal_1 = __webpack_require__(16);
/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/*[DefaultProperty("valueClasses")]*/
/**
 * Signal dispatches events to multiple listeners.
 * It is inspired by C# events and delegates, and by
 * <a target="_top" href="http://en.wikipedia.org/wiki/Signals_and_slots">signals and slots</a>
 * in Qt.
 * A Signal adds event dispatching functionality through composition and interfaces,
 * rather than inheriting from a dispatcher.
 * <br/><br/>
 * Project home: <a target="_top" href="http://github.com/robertpenner/as3-signals/">http://github.com/robertpenner/as3-signals/</a>
 */
var Signal = (function (_super) {
    __extends(Signal, _super);
    /**
     * Creates a Signal instance to dispatch value objects.
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new Signal(String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: In AS3, subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    function Signal() {
        var valueClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueClasses[_i] = arguments[_i];
        }
        var _this;
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;
        _this = _super.call(this, valueClasses) || this;
        return _this;
    }
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    Signal.prototype.add = function (listener) {
        return this.registerListener(listener);
    };
    return Signal;
}(OnceSignal_1.OnceSignal));
exports.Signal = Signal;
//# sourceMappingURL=Signal.js.map

/***/ },
/* 32 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * The SlotList class represents an immutable list of Slot objects.
 *
 * @author Joa Ebert
 * @author Robert Penner
 */
var SlotList = (function () {
    /**
     * Creates and returns a new SlotList object.
     *
     * <p>A user never has to create a SlotList manually.
     * Use the <code>NIL</code> element to represent an empty list.
     * <code>NIL.prepend(value)</code> would create a list containing <code>value</code></p>.
     *
     * @param head The first slot in the list.
     * @param tail A list containing all slots except head.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Parameters head and tail are null. Use the NIL element instead.
     * @throws ArgumentError <code>ArgumentError</code>: Parameter head cannot be null.
     */
    function SlotList(head, tail) {
        if (tail === void 0) { tail = null; }
        this.nonEmpty = false;
        if (!head && !tail) {
            if (SlotList.NIL)
                throw new Error('Parameters head and tail are null. Use the NIL element instead.');
            //this is the NIL element as per definition
            this.nonEmpty = false;
        }
        else if (!head) {
            throw new Error('Parameter head cannot be null.');
        }
        else {
            this.head = head;
            this.tail = tail || SlotList.NIL;
            this.nonEmpty = true;
        }
    }
    Object.defineProperty(SlotList.prototype, "length", {
        /**
         * The number of slots in the list.
         */
        get: function () {
            if (!this.nonEmpty)
                return 0;
            if (this.tail == SlotList.NIL)
                return 1;
            // We could cache the length, but it would make methods like filterNot unnecessarily complicated.
            // Instead we assume that O(n) is okay since the length property is used in rare cases.
            // We could also cache the length lazy, but that is a waste of another 8b per list node (at least).
            var result = 0;
            var p = this;
            while (p.nonEmpty) {
                ++result;
                p = p.tail;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Prepends a slot to this list.
     * @param    slot The item to be prepended.
     * @return    A list consisting of slot followed by all elements of this list.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Parameter head cannot be null.
     */
    SlotList.prototype.prepend = function (slot) {
        return new SlotList(slot, this);
    };
    /**
     * Appends a slot to this list.
     * Note: appending is O(n). Where possible, prepend which is O(1).
     * In some cases, many list items must be cloned to
     * avoid changing existing lists.
     * @param    slot The item to be appended.
     * @return    A list consisting of all elements of this list followed by slot.
     */
    SlotList.prototype.append = function (slot) {
        if (!slot)
            return this;
        if (!this.nonEmpty)
            return new SlotList(slot);
        // Special case: just one slot currently in the list.
        if (this.tail == SlotList.NIL)
            return new SlotList(slot).prepend(this.head);
        // The list already has two or more slots.
        // We have to build a new list with cloned items because they are immutable.
        var wholeClone = new SlotList(this.head);
        var subClone = wholeClone;
        var current = this.tail;
        while (current.nonEmpty) {
            subClone = subClone.tail = new SlotList(current.head);
            current = current.tail;
        }
        // Append the new slot last.
        subClone.tail = new SlotList(slot);
        return wholeClone;
    };
    /**
     * Insert a slot into the list in a position according to its priority.
     * The higher the priority, the closer the item will be inserted to the list head.
     * @params slot The item to be inserted.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Parameters head and tail are null. Use the NIL element instead.
     * @throws ArgumentError <code>ArgumentError</code>: Parameter head cannot be null.
     */
    SlotList.prototype.insertWithPriority = function (slot) {
        if (!this.nonEmpty)
            return new SlotList(slot);
        var priority = slot.priority;
        // Special case: new slot has the highest priority.
        if (priority > this.head.priority)
            return this.prepend(slot);
        var wholeClone = new SlotList(this.head);
        var subClone = wholeClone;
        var current = this.tail;
        // Find a slot with lower priority and go in front of it.
        while (current.nonEmpty) {
            if (priority > current.head.priority) {
                subClone.tail = current.prepend(slot);
                return wholeClone;
            }
            subClone = subClone.tail = new SlotList(current.head);
            current = current.tail;
        }
        // Slot has lowest priority.
        subClone.tail = new SlotList(slot);
        return wholeClone;
    };
    /**
     * Returns the slots in this list that do not contain the supplied listener.
     * Note: assumes the listener is not repeated within the list.
     * @param    listener The function to remove.
     * @return A list consisting of all elements of this list that do not have listener.
     */
    SlotList.prototype.filterNot = function (listener) {
        if (!this.nonEmpty || listener == null)
            return this;
        if (listener == this.head.listener)
            return this.tail;
        // The first item wasn't a match so the filtered list will contain it.
        var wholeClone = new SlotList(this.head);
        var subClone = wholeClone;
        var current = this.tail;
        while (current.nonEmpty) {
            if (current.head.listener == listener) {
                // Splice out the current head.
                subClone.tail = current.tail;
                return wholeClone;
            }
            subClone = subClone.tail = new SlotList(current.head);
            current = current.tail;
        }
        // The listener was not found so this list is unchanged.
        return this;
    };
    /**
     * Determines whether the supplied listener Function is contained within this list
     */
    SlotList.prototype.contains = function (listener) {
        if (!this.nonEmpty)
            return false;
        var p = this;
        while (p.nonEmpty) {
            if (p.head.listener == listener)
                return true;
            p = p.tail;
        }
        return false;
    };
    /**
     * Retrieves the ISlot associated with a supplied listener within the SlotList.
     * @param   listener The Function being searched for
     * @return  The ISlot in this list associated with the listener parameter through the ISlot.listener property.
     *          Returns null if no such ISlot instance exists or the list is empty.
     */
    SlotList.prototype.find = function (listener) {
        if (!this.nonEmpty)
            return null;
        var p = this;
        while (p.nonEmpty) {
            if (p.head.listener == listener)
                return p.head;
            p = p.tail;
        }
        return null;
    };
    SlotList.prototype.toString = function () {
        var buffer = '';
        var p = this;
        while (p.nonEmpty) {
            buffer += p.head + " -> ";
            p = p.tail;
        }
        buffer += "NIL";
        return "[List " + buffer + "]";
    };
    return SlotList;
}());
/**
 * Represents an empty list. Used as the list terminator.
 */
SlotList.NIL = new SlotList(null, null);
exports.SlotList = SlotList;
//# sourceMappingURL=SlotList.js.map

/***/ },
/* 33 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgpack = __webpack_require__(10);
var signals_js_1 = __webpack_require__(29);
var cookie = __webpack_require__(70);
var Protocol_1 = __webpack_require__(5);
var Room_1 = __webpack_require__(17);
var Connection_1 = __webpack_require__(69);
var Client = (function () {
    function Client(url) {
        var _this = this;
        // signals
        this.onOpen = new signals_js_1.Signal();
        this.onMessage = new signals_js_1.Signal();
        this.onClose = new signals_js_1.Signal();
        this.onError = new signals_js_1.Signal();
        this.rooms = {};
        this.connection = new Connection_1.Connection(url);
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = function (e) { return _this.onClose.dispatch(); };
        this.connection.onerror = function (e) { return _this.onError.dispatch(); };
        // check for id on cookie
        this.connection.onopen = function () {
            console.log("onopen!");
            var colyseusid = cookie.getItem('colyseusid');
            if (colyseusid) {
                _this.id = colyseusid;
                _this.onOpen.dispatch();
            }
        };
    }
    Client.prototype.join = function (roomName, options) {
        if (options === void 0) { options = {}; }
        this.room = new Room_1.Room(roomName);
        this.connection.send([Protocol_1.Protocol.JOIN_ROOM, roomName, options]);
        return this.room;
    };
    /**
     * @override
     */
    Client.prototype.onMessageCallback = function (event) {
        var _this = this;
        var message = msgpack.decode(new Uint8Array(event.data));
        var code = message[0];
        if (code == Protocol_1.Protocol.USER_ID) {
            cookie.setItem('colyseusid', message[1]);
            this.id = message[1];
            this.onOpen.dispatch();
        }
        else if (code == Protocol_1.Protocol.JOIN_ROOM) {
            var room_1 = this.room;
            room_1.id = message[1];
            room_1.connect(new Connection_1.Connection(this.connection.url + "/" + this.room.id));
            room_1.onLeave.add(function () { return delete _this.rooms[room_1.id]; });
            this.rooms[room_1.id] = room_1;
        }
        else if (code == Protocol_1.Protocol.JOIN_ERROR) {
            console.error("server error:", message[2]);
            // general error
            this.onError.dispatch(message[2]);
        }
        else {
            this.onMessage.dispatch(message);
        }
    };
    return Client;
}());
exports.Client = Client;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var Backoff = __webpack_require__(18);
var ExponentialBackoffStrategy = __webpack_require__(37);
var FibonacciBackoffStrategy = __webpack_require__(19);
var FunctionCall = __webpack_require__(36);

module.exports.Backoff = Backoff;
module.exports.FunctionCall = FunctionCall;
module.exports.FibonacciStrategy = FibonacciBackoffStrategy;
module.exports.ExponentialStrategy = ExponentialBackoffStrategy;

// Constructs a Fibonacci backoff.
module.exports.fibonacci = function(options) {
    return new Backoff(new FibonacciBackoffStrategy(options));
};

// Constructs an exponential backoff.
module.exports.exponential = function(options) {
    return new Backoff(new ExponentialBackoffStrategy(options));
};

// Constructs a FunctionCall for the given function and arguments.
module.exports.call = function(fn, vargs, callback) {
    var args = Array.prototype.slice.call(arguments);
    fn = args[0];
    vargs = args.slice(1, args.length - 1);
    callback = args[args.length - 1];
    return new FunctionCall(fn, vargs, callback);
};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var events = __webpack_require__(7);
var precond = __webpack_require__(15);
var util = __webpack_require__(1);

var Backoff = __webpack_require__(18);
var FibonacciBackoffStrategy = __webpack_require__(19);

// Wraps a function to be called in a backoff loop.
function FunctionCall(fn, args, callback) {
    events.EventEmitter.call(this);

    precond.checkIsFunction(fn, 'Expected fn to be a function.');
    precond.checkIsArray(args, 'Expected args to be an array.');
    precond.checkIsFunction(callback, 'Expected callback to be a function.');

    this.function_ = fn;
    this.arguments_ = args;
    this.callback_ = callback;
    this.lastResult_ = [];
    this.numRetries_ = 0;

    this.backoff_ = null;
    this.strategy_ = null;
    this.failAfter_ = -1;
    this.retryPredicate_ = FunctionCall.DEFAULT_RETRY_PREDICATE_;

    this.state_ = FunctionCall.State_.PENDING;
}
util.inherits(FunctionCall, events.EventEmitter);

// States in which the call can be.
FunctionCall.State_ = {
    // Call isn't started yet.
    PENDING: 0,
    // Call is in progress.
    RUNNING: 1,
    // Call completed successfully which means that either the wrapped function
    // returned successfully or the maximal number of backoffs was reached.
    COMPLETED: 2,
    // The call was aborted.
    ABORTED: 3
};

// The default retry predicate which considers any error as retriable.
FunctionCall.DEFAULT_RETRY_PREDICATE_ = function(err) {
  return true;
};

// Checks whether the call is pending.
FunctionCall.prototype.isPending = function() {
    return this.state_ == FunctionCall.State_.PENDING;
};

// Checks whether the call is in progress.
FunctionCall.prototype.isRunning = function() {
    return this.state_ == FunctionCall.State_.RUNNING;
};

// Checks whether the call is completed.
FunctionCall.prototype.isCompleted = function() {
    return this.state_ == FunctionCall.State_.COMPLETED;
};

// Checks whether the call is aborted.
FunctionCall.prototype.isAborted = function() {
    return this.state_ == FunctionCall.State_.ABORTED;
};

// Sets the backoff strategy to use. Can only be called before the call is
// started otherwise an exception will be thrown.
FunctionCall.prototype.setStrategy = function(strategy) {
    precond.checkState(this.isPending(), 'FunctionCall in progress.');
    this.strategy_ = strategy;
    return this; // Return this for chaining.
};

// Sets the predicate which will be used to determine whether the errors
// returned from the wrapped function should be retried or not, e.g. a
// network error would be retriable while a type error would stop the
// function call.
FunctionCall.prototype.retryIf = function(retryPredicate) {
    precond.checkState(this.isPending(), 'FunctionCall in progress.');
    this.retryPredicate_ = retryPredicate;
    return this;
};

// Returns all intermediary results returned by the wrapped function since
// the initial call.
FunctionCall.prototype.getLastResult = function() {
    return this.lastResult_.concat();
};

// Returns the number of times the wrapped function call was retried.
FunctionCall.prototype.getNumRetries = function() {
    return this.numRetries_;
};

// Sets the backoff limit.
FunctionCall.prototype.failAfter = function(maxNumberOfRetry) {
    precond.checkState(this.isPending(), 'FunctionCall in progress.');
    this.failAfter_ = maxNumberOfRetry;
    return this; // Return this for chaining.
};

// Aborts the call.
FunctionCall.prototype.abort = function() {
    if (this.isCompleted() || this.isAborted()) {
      return;
    }

    if (this.isRunning()) {
        this.backoff_.reset();
    }

    this.state_ = FunctionCall.State_.ABORTED;
    this.lastResult_ = [new Error('Backoff aborted.')];
    this.emit('abort');
    this.doCallback_();
};

// Initiates the call to the wrapped function. Accepts an optional factory
// function used to create the backoff instance; used when testing.
FunctionCall.prototype.start = function(backoffFactory) {
    precond.checkState(!this.isAborted(), 'FunctionCall is aborted.');
    precond.checkState(this.isPending(), 'FunctionCall already started.');

    var strategy = this.strategy_ || new FibonacciBackoffStrategy();

    this.backoff_ = backoffFactory ?
        backoffFactory(strategy) :
        new Backoff(strategy);

    this.backoff_.on('ready', this.doCall_.bind(this, true /* isRetry */));
    this.backoff_.on('fail', this.doCallback_.bind(this));
    this.backoff_.on('backoff', this.handleBackoff_.bind(this));

    if (this.failAfter_ > 0) {
        this.backoff_.failAfter(this.failAfter_);
    }

    this.state_ = FunctionCall.State_.RUNNING;
    this.doCall_(false /* isRetry */);
};

// Calls the wrapped function.
FunctionCall.prototype.doCall_ = function(isRetry) {
    if (isRetry) {
        this.numRetries_++;
    }
    var eventArgs = ['call'].concat(this.arguments_);
    events.EventEmitter.prototype.emit.apply(this, eventArgs);
    var callback = this.handleFunctionCallback_.bind(this);
    this.function_.apply(null, this.arguments_.concat(callback));
};

// Calls the wrapped function's callback with the last result returned by the
// wrapped function.
FunctionCall.prototype.doCallback_ = function() {
    this.callback_.apply(null, this.lastResult_);
};

// Handles wrapped function's completion. This method acts as a replacement
// for the original callback function.
FunctionCall.prototype.handleFunctionCallback_ = function() {
    if (this.isAborted()) {
        return;
    }

    var args = Array.prototype.slice.call(arguments);
    this.lastResult_ = args; // Save last callback arguments.
    events.EventEmitter.prototype.emit.apply(this, ['callback'].concat(args));

    var err = args[0];
    if (err && this.retryPredicate_(err)) {
        this.backoff_.backoff(err);
    } else {
        this.state_ = FunctionCall.State_.COMPLETED;
        this.doCallback_();
    }
};

// Handles the backoff event by reemitting it.
FunctionCall.prototype.handleBackoff_ = function(number, delay, err) {
    this.emit('backoff', number, delay, err);
};

module.exports = FunctionCall;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var util = __webpack_require__(1);
var precond = __webpack_require__(15);

var BackoffStrategy = __webpack_require__(20);

// Exponential backoff strategy.
function ExponentialBackoffStrategy(options) {
    BackoffStrategy.call(this, options);
    this.backoffDelay_ = 0;
    this.nextBackoffDelay_ = this.getInitialDelay();
    this.factor_ = ExponentialBackoffStrategy.DEFAULT_FACTOR;

    if (options && options.factor !== undefined) {
        precond.checkArgument(options.factor > 1,
            'Exponential factor should be greater than 1 but got %s.',
            options.factor);
        this.factor_ = options.factor;
    }
}
util.inherits(ExponentialBackoffStrategy, BackoffStrategy);

// Default multiplication factor used to compute the next backoff delay from
// the current one. The value can be overridden by passing a custom factor as
// part of the options.
ExponentialBackoffStrategy.DEFAULT_FACTOR = 2;

ExponentialBackoffStrategy.prototype.next_ = function() {
    this.backoffDelay_ = Math.min(this.nextBackoffDelay_, this.getMaxDelay());
    this.nextBackoffDelay_ = this.backoffDelay_ * this.factor_;
    return this.backoffDelay_;
};

ExponentialBackoffStrategy.prototype.reset_ = function() {
    this.backoffDelay_ = 0;
    this.nextBackoffDelay_ = this.getInitialDelay();
};

module.exports = ExponentialBackoffStrategy;


/***/ },
/* 38 */
/***/ function(module, exports) {

"use strict";
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ },
/* 39 */
/***/ function(module, exports) {

"use strict";
"use strict";
var Clock = (function () {
    function Clock(autoStart) {
        if (autoStart === void 0) { autoStart = false; }
        this.running = false;
        this.deltaTime = 0;
        this.currentTime = 0;
        this.elapsedTime = 0;
        this.now = (typeof (window) !== "undefined" && window.performance && (window.performance.now).bind(window.performance)) || Date.now;
        this.start();
        // auto set interval to 60 ticks per second
        if (autoStart) {
            setInterval(this.tick.bind(this), 1000 / 60);
        }
    }
    Clock.prototype.start = function () {
        this.deltaTime = 0;
        this.currentTime = this.now();
        this.elapsedTime = 0;
        this.running = true;
    };
    Clock.prototype.stop = function () {
        this.running = false;
    };
    Clock.prototype.tick = function (newTime) {
        if (newTime === void 0) { newTime = this.now(); }
        this.deltaTime = newTime - this.currentTime;
        this.currentTime = newTime;
        this.elapsedTime += this.deltaTime;
    };
    return Clock;
}());
module.exports = Clock;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var compare_1 = __webpack_require__(41);
var DeltaContainer = (function () {
    function DeltaContainer(data) {
        this.matcherPlaceholders = {
            ":id": /^([a-zA-Z0-9\-_]+)$/,
            ":number": /^([0-9]+)$/,
            ":string": /^(\w+)$/,
            ":axis": /^([xyz])$/,
            "*": /(.*)/,
        };
        this.data = data;
        this.reset();
    }
    DeltaContainer.prototype.set = function (newData) {
        var patches = compare_1.compare(this.data, newData);
        this.checkPatches(patches);
        this.data = newData;
        return patches;
    };
    DeltaContainer.prototype.registerPlaceholder = function (placeholder, matcher) {
        this.matcherPlaceholders[placeholder] = matcher;
    };
    DeltaContainer.prototype.listen = function (segments, operation, callback) {
        var _this = this;
        var rules;
        if (typeof (segments) === "function") {
            rules = [];
            callback = segments;
        }
        else {
            rules = segments.split("/");
        }
        var listener = {
            callback: callback,
            operation: operation,
            rules: rules.map(function (segment) {
                if (typeof (segment) === "string") {
                    // replace placeholder matchers
                    return (segment.indexOf(":") === 0)
                        ? _this.matcherPlaceholders[segment] || _this.matcherPlaceholders["*"]
                        : new RegExp(segment);
                }
                else {
                    return segment;
                }
            })
        };
        this.listeners[operation || ""].push(listener);
        return listener;
    };
    DeltaContainer.prototype.removeListener = function (listener) {
        for (var i = this.listeners[listener.operation].length - 1; i >= 0; i--) {
            if (this.listeners[listener.operation][i] === listener) {
                this.listeners[listener.operation].splice(i, 1);
            }
        }
    };
    DeltaContainer.prototype.removeAllListeners = function () {
        this.reset();
    };
    DeltaContainer.prototype.checkPatches = function (patches) {
        for (var i = patches.length - 1; i >= 0; i--) {
            var matched = false;
            var op = patches[i].op;
            for (var j_1 = 0, len_1 = this.listeners[op].length; j_1 < len_1; j_1++) {
                var listener = this.listeners[op][j_1];
                var matches = this.checkPatch(patches[i], listener);
                if (matches) {
                    listener.callback.apply(listener, matches.concat([patches[i].value]));
                    matched = true;
                }
            }
            // check for fallback listener
            if (!matched && this.listeners[""]) {
                for (var j = 0, len = this.listeners[""].length; j < len; j++) {
                    this.listeners[""][j].callback(patches[i].path, patches[i].op, patches[i].value);
                }
            }
        }
    };
    DeltaContainer.prototype.checkPatch = function (patch, listener) {
        // skip if rules count differ from patch
        if (patch.path.length !== listener.rules.length) {
            return false;
        }
        var pathVars = [];
        for (var i = 0, len = listener.rules.length; i < len; i++) {
            var matches = patch.path[i].match(listener.rules[i]);
            if (!matches || matches.length === 0 || matches.length > 2) {
                return false;
            }
            else {
                pathVars = pathVars.concat(matches.slice(1));
            }
        }
        return pathVars;
    };
    DeltaContainer.prototype.reset = function () {
        this.listeners = {
            "": [],
            "add": [],
            "remove": [],
            "replace": []
        };
    };
    return DeltaContainer;
}());
exports.DeltaContainer = DeltaContainer;


/***/ },
/* 41 */
/***/ function(module, exports) {

"use strict";
"use strict";
function compare(tree1, tree2) {
    var patches = [];
    generate(tree1, tree2, patches, []);
    return patches;
}
exports.compare = compare;
function deepClone(obj) {
    switch (typeof obj) {
        case "object":
            return JSON.parse(JSON.stringify(obj)); //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
        case "undefined":
            return null; //this is how JSON.stringify behaves for array items
        default:
            return obj; //no need to clone primitives
    }
}
function objectKeys(obj) {
    if (Array.isArray(obj)) {
        var keys = new Array(obj.length);
        for (var k = 0; k < keys.length; k++) {
            keys[k] = "" + k;
        }
        return keys;
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            keys.push(i);
        }
    }
    return keys;
}
;
// Dirty check if obj is different from mirror, generate patches and update mirror
function generate(mirror, obj, patches, path) {
    var newKeys = objectKeys(obj);
    var oldKeys = objectKeys(mirror);
    var changed = false;
    var deleted = false;
    for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];
        if (obj.hasOwnProperty(key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
            var newVal = obj[key];
            if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null) {
                generate(oldVal, newVal, patches, path.concat(key));
            }
            else {
                if (oldVal !== newVal) {
                    changed = true;
                    patches.push({ op: "replace", path: path.concat(key), value: deepClone(newVal) });
                }
            }
        }
        else {
            patches.push({ op: "remove", path: path.concat(key) });
            deleted = true; // property has been deleted
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!mirror.hasOwnProperty(key) && obj[key] !== undefined) {
            patches.push({ op: "add", path: path.concat(key), value: deepClone(obj[key]) });
        }
    }
}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var DeltaContainer_1 = __webpack_require__(40);
exports.DeltaContainer = DeltaContainer_1.DeltaContainer;


/***/ },
/* 43 */
/***/ function(module, exports) {

// Fossil SCM delta compression algorithm
// ======================================
//
// Format:
// http://www.fossil-scm.org/index.html/doc/tip/www/delta_format.wiki
//
// Algorithm:
// http://www.fossil-scm.org/index.html/doc/tip/www/delta_encoder_algorithm.wiki
//
// Original implementation:
// http://www.fossil-scm.org/index.html/artifact/d1b0598adcd650b3551f63b17dfc864e73775c3d
//
// LICENSE
// -------
//
// Copyright 2014 Dmitry Chestnykh (JavaScript port)
// Copyright 2007 D. Richard Hipp  (original C version)
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or
// without modification, are permitted provided that the
// following conditions are met:
//
//   1. Redistributions of source code must retain the above
//      copyright notice, this list of conditions and the
//      following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above
//      copyright notice, this list of conditions and the
//      following disclaimer in the documentation and/or other
//      materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHORS ``AS IS'' AND ANY EXPRESS
// OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
// BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
// OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation
// are those of the authors and contributors and should not be interpreted
// as representing official policies, either expressed or implied, of anybody
// else.
//
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.fossilDelta = factory();
})(this, function() {
'use strict';

var fossilDelta = {};

// Hash window width in bytes. Must be a power of two.
var NHASH = 16;

function RollingHash() {
  this.a = 0; // hash     (16-bit unsigned)
  this.b = 0; // values   (16-bit unsigned)
  this.i = 0; // start of the hash window (16-bit unsigned)
  this.z = new Array(NHASH); // the values that have been hashed.
}

// Initialize the rolling hash using the first NHASH bytes of
// z at the given position.
RollingHash.prototype.init = function(z, pos) {
  var a = 0, b = 0, i, x;
  for(i = 0; i < NHASH; i++){
    x = z[pos+i];
    a = (a + x) & 0xffff;
    b = (b + (NHASH-i)*x) & 0xffff;
    this.z[i] = x;
  }
  this.a = a & 0xffff;
  this.b = b & 0xffff;
  this.i = 0;
};

// Advance the rolling hash by a single byte "c".
RollingHash.prototype.next = function(c) {
  var old = this.z[this.i];
  this.z[this.i] = c;
  this.i = (this.i+1)&(NHASH-1);
  this.a = (this.a - old + c) & 0xffff;
  this.b = (this.b - NHASH*old + this.a) & 0xffff;
};

// Return a 32-bit hash value.
RollingHash.prototype.value = function() {
  return ((this.a & 0xffff) | (this.b & 0xffff)<<16)>>>0;
};

var zDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".
                split('').map(function (x) { return x.charCodeAt(0); });

var zValue = [
  -1, -1, -1, -1, -1, -1, -1, -1,   -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,   -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,   -1, -1, -1, -1, -1, -1, -1, -1,
   0,  1,  2,  3,  4,  5,  6,  7,    8,  9, -1, -1, -1, -1, -1, -1,
  -1, 10, 11, 12, 13, 14, 15, 16,   17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31, 32,   33, 34, 35, -1, -1, -1, -1, 36,
  -1, 37, 38, 39, 40, 41, 42, 43,   44, 45, 46, 47, 48, 49, 50, 51,
  52, 53, 54, 55, 56, 57, 58, 59,   60, 61, 62, -1, -1, -1, 63, -1
];

// Reader reads bytes, chars, ints from array.
function Reader(array) {
  this.a = array; // source array
  this.pos = 0;   // current position in array
}

Reader.prototype.haveBytes = function() {
  return this.pos < this.a.length;
};

Reader.prototype.getByte = function() {
  var b = this.a[this.pos];
  this.pos++;
  if (this.pos > this.a.length) throw new RangeError('out of bounds');
  return b;
};

Reader.prototype.getChar = function() {
  return String.fromCharCode(this.getByte());
};

  // Read base64-encoded unsigned integer.
Reader.prototype.getInt = function(){
  var v = 0, c;
  while(this.haveBytes() && (c = zValue[0x7f & this.getByte()]) >= 0) {
     v = (v<<6) + c;
  }
  this.pos--;
  return v >>> 0;
};


// Write writes an array.
function Writer() {
  this.a = [];
}

Writer.prototype.toArray = function() {
  return this.a;
};

Writer.prototype.putByte = function(b) {
  this.a.push(b & 0xff);
};

// Write an ASCII character (s is a one-char string).
Writer.prototype.putChar = function(s) {
  this.putByte(s.charCodeAt(0));
};

// Write a base64 unsigned integer.
Writer.prototype.putInt = function(v){
  var i, j, zBuf = [];
  if (v === 0) {
    this.putChar('0');
    return;
  }
  for (i = 0; v > 0; i++, v >>>= 6)
    zBuf.push(zDigits[v&0x3f]);
  for (j = i-1; j >= 0; j--)
    this.putByte(zBuf[j]);
};

// Copy from array at start to end.
Writer.prototype.putArray = function(a, start, end) {
  for (var i = start; i < end; i++) this.a.push(a[i]);
};

// Return the number digits in the base64 representation of a positive integer.
function digitCount(v){
  var i, x;
  for (i = 1, x = 64; v >= x; i++, x <<= 6){ /* nothing */ }
  return i;
}

// Return a 32-bit checksum of the array.
function checksum(arr) {
  var sum0 = 0, sum1 = 0, sum2 = 0, sum3 = 0,
      z = 0, N = arr.length;
  //TODO measure if this unrolling is helpful.
  while (N >= 16) {
    sum0 = sum0 + arr[z+0] | 0;
    sum1 = sum1 + arr[z+1] | 0;
    sum2 = sum2 + arr[z+2] | 0;
    sum3 = sum3 + arr[z+3] | 0;

    sum0 = sum0 + arr[z+4] | 0;
    sum1 = sum1 + arr[z+5] | 0;
    sum2 = sum2 + arr[z+6] | 0;
    sum3 = sum3 + arr[z+7] | 0;

    sum0 = sum0 + arr[z+8] | 0;
    sum1 = sum1 + arr[z+9] | 0;
    sum2 = sum2 + arr[z+10] | 0;
    sum3 = sum3 + arr[z+11] | 0;

    sum0 = sum0 + arr[z+12] | 0;
    sum1 = sum1 + arr[z+13] | 0;
    sum2 = sum2 + arr[z+14] | 0;
    sum3 = sum3 + arr[z+15] | 0;

    z += 16;
    N -= 16;
  }
  while (N >= 4) {
    sum0 = sum0 + arr[z+0] | 0;
    sum1 = sum1 + arr[z+1] | 0;
    sum2 = sum2 + arr[z+2] | 0;
    sum3 = sum3 + arr[z+3] | 0;
    z += 4;
    N -= 4;
  }
  sum3 = (((sum3 + (sum2 << 8) | 0) + (sum1 << 16) | 0) + (sum0 << 24) | 0);
  /* jshint -W086 */
  switch (N) {
    case 3: sum3 = sum3 + (arr[z+2] <<  8) | 0; /* falls through */
    case 2: sum3 = sum3 + (arr[z+1] << 16) | 0; /* falls through */
    case 1: sum3 = sum3 + (arr[z+0] << 24) | 0; /* falls through */
  }
  return sum3 >>> 0;
}

// Create a new delta from src to out.
fossilDelta.create = function(src, out) {
  var zDelta = new Writer();
  var lenOut = out.length;
  var lenSrc = src.length;
  var i, lastRead = -1;

  zDelta.putInt(lenOut);
  zDelta.putChar('\n');

  // If the source is very small, it means that we have no
  // chance of ever doing a copy command.  Just output a single
  // literal segment for the entire target and exit.
  if (lenSrc <= NHASH) {
    zDelta.putInt(lenOut);
    zDelta.putChar(':');
    zDelta.putArray(out, 0, lenOut);
    zDelta.putInt(checksum(out));
    zDelta.putChar(';');
    return zDelta.toArray();
  }

  // Compute the hash table used to locate matching sections in the source.
  var nHash = Math.ceil(lenSrc / NHASH);
  var collide =  new Array(nHash);
  var landmark = new Array(nHash);
  for (i = 0; i < collide.length; i++) collide[i] = -1;
  for (i = 0; i < landmark.length; i++) landmark[i] = -1;
  var hv, h = new RollingHash();
  for (i = 0; i < lenSrc-NHASH; i += NHASH) {
    h.init(src, i);
    hv = h.value() % nHash;
    collide[i/NHASH] = landmark[hv];
    landmark[hv] = i/NHASH;
  }

  var base = 0;
  var iSrc, iBlock, bestCnt, bestOfst, bestLitsz;
  while (base+NHASH<lenOut) {
    bestOfst=0;
    bestLitsz=0;
    h.init(out, base);
    i = 0; // Trying to match a landmark against zOut[base+i]
    bestCnt = 0;
    while(1) {
      var limit = 250;
      hv = h.value() % nHash;
      iBlock = landmark[hv];
      while (iBlock >= 0 && (limit--)>0 ) {
        //
        // The hash window has identified a potential match against
        // landmark block iBlock.  But we need to investigate further.
        //
        // Look for a region in zOut that matches zSrc. Anchor the search
        // at zSrc[iSrc] and zOut[base+i].  Do not include anything prior to
        // zOut[base] or after zOut[outLen] nor anything after zSrc[srcLen].
        //
        // Set cnt equal to the length of the match and set ofst so that
        // zSrc[ofst] is the first element of the match.  litsz is the number
        // of characters between zOut[base] and the beginning of the match.
        // sz will be the overhead (in bytes) needed to encode the copy
        // command.  Only generate copy command if the overhead of the
        // copy command is less than the amount of literal text to be copied.
        //
        var cnt, ofst, litsz;
        var j, k, x, y;
        var sz;

        // Beginning at iSrc, match forwards as far as we can.
        // j counts the number of characters that match.
        iSrc = iBlock*NHASH;
        for (j = 0, x = iSrc, y = base+i; x < lenSrc && y < lenOut; j++, x++, y++) {
          if (src[x] !== out[y]) break;
        }
        j--;

        // Beginning at iSrc-1, match backwards as far as we can.
        // k counts the number of characters that match.
        for (k = 1; k < iSrc && k <= i; k++) {
          if (src[iSrc-k] !== out[base+i-k]) break;
        }
        k--;

        // Compute the offset and size of the matching region.
        ofst = iSrc-k;
        cnt = j+k+1;
        litsz = i-k;  // Number of bytes of literal text before the copy
        // sz will hold the number of bytes needed to encode the "insert"
        // command and the copy command, not counting the "insert" text.
        sz = digitCount(i-k)+digitCount(cnt)+digitCount(ofst)+3;
        if (cnt >= sz && cnt > bestCnt) {
          // Remember this match only if it is the best so far and it
          // does not increase the file size.
          bestCnt = cnt;
          bestOfst = iSrc-k;
          bestLitsz = litsz;
        }

        // Check the next matching block
        iBlock = collide[iBlock];
      }

      // We have a copy command that does not cause the delta to be larger
      // than a literal insert.  So add the copy command to the delta.
      if (bestCnt > 0) {
        if (bestLitsz > 0) {
          // Add an insert command before the copy.
          zDelta.putInt(bestLitsz);
          zDelta.putChar(':');
          zDelta.putArray(out, base, base+bestLitsz);
          base += bestLitsz;
        }
        base += bestCnt;
        zDelta.putInt(bestCnt);
        zDelta.putChar('@');
        zDelta.putInt(bestOfst);
        zDelta.putChar(',');
        if (bestOfst + bestCnt -1 > lastRead) {
          lastRead = bestOfst + bestCnt - 1;
        }
        bestCnt = 0;
        break;
      }

      // If we reach this point, it means no match is found so far
      if (base+i+NHASH >= lenOut){
        // We have reached the end and have not found any
        // matches.  Do an "insert" for everything that does not match
        zDelta.putInt(lenOut-base);
        zDelta.putChar(':');
        zDelta.putArray(out, base, base+lenOut-base);
        base = lenOut;
        break;
      }

      // Advance the hash by one character. Keep looking for a match.
      h.next(out[base+i+NHASH]);
      i++;
    }
  }
  // Output a final "insert" record to get all the text at the end of
  // the file that does not match anything in the source.
  if(base < lenOut) {
    zDelta.putInt(lenOut-base);
    zDelta.putChar(':');
    zDelta.putArray(out, base, base+lenOut-base);
  }
  // Output the final checksum record.
  zDelta.putInt(checksum(out));
  zDelta.putChar(';');
  return zDelta.toArray();
};

// Return the size (in bytes) of the output from applying a delta.
fossilDelta.outputSize = function(delta){
  var zDelta = new Reader(delta);
  var size = zDelta.getInt();
  if (zDelta.getChar() !== '\n')
    throw new Error('size integer not terminated by \'\\n\'');
  return size;
};

// Apply a delta.
fossilDelta.apply = function(src, delta) {
  var limit, total = 0;
  var zDelta = new Reader(delta);
  var lenSrc = src.length;
  var lenDelta = delta.length;

  limit = zDelta.getInt();
  if (zDelta.getChar() !== '\n')
    throw new Error('size integer not terminated by \'\\n\'');
  var zOut = new Writer();
  while(zDelta.haveBytes()) {
    var cnt, ofst;
    cnt = zDelta.getInt();

    switch (zDelta.getChar()) {
      case '@':
        ofst = zDelta.getInt();
        if (zDelta.haveBytes() && zDelta.getChar() !== ',')
          throw new Error('copy command not terminated by \',\'');
        total += cnt;
        if (total > limit)
          throw new Error('copy exceeds output file size');
        if (ofst+cnt > lenSrc)
          throw new Error('copy extends past end of input');
        zOut.putArray(src, ofst, ofst+cnt);
        break;

      case ':':
        total += cnt;
        if (total > limit)
          throw new Error('insert command gives an output larger than predicted');
        if (cnt > lenDelta)
          throw new Error('insert count exceeds size of delta');
        zOut.putArray(zDelta.a, zDelta.pos, zDelta.pos+cnt);
        zDelta.pos += cnt;
        break;

      case ';':
        var out = zOut.toArray();
        if (cnt !== checksum(out))
          throw new Error('bad checksum');
        if (total !== limit)
          throw new Error('generated size does not match predicted size');
        return out;

      default:
        throw new Error('unknown delta operator');
    }
  }
  throw new Error('unterminated delta');
};

return fossilDelta;

});


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* globals Buffer */

module.exports =
  c(("undefined" !== typeof Buffer) && Buffer) ||
  c(this.Buffer) ||
  c(("undefined" !== typeof window) && window.Buffer) ||
  this.Buffer;

function c(B) {
  return B && B.isBuffer && B;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ },
/* 45 */
/***/ function(module, exports) {

// buffer-lite.js

var MAXBUFLEN = 8192;

exports.copy = copy;
exports.toString = toString;
exports.write = write;

/**
 * Buffer.prototype.write()
 *
 * @param string {String}
 * @param [offset] {Number}
 * @returns {Number}
 */

function write(string, offset) {
  var buffer = this;
  var index = offset || (offset |= 0);
  var length = string.length;
  var chr = 0;
  var i = 0;
  while (i < length) {
    chr = string.charCodeAt(i++);

    if (chr < 128) {
      buffer[index++] = chr;
    } else if (chr < 0x800) {
      // 2 bytes
      buffer[index++] = 0xC0 | (chr >>> 6);
      buffer[index++] = 0x80 | (chr & 0x3F);
    } else if (chr < 0xD800 || chr > 0xDFFF) {
      // 3 bytes
      buffer[index++] = 0xE0 | (chr  >>> 12);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    } else {
      // 4 bytes - surrogate pair
      chr = (((chr - 0xD800) << 10) | (string.charCodeAt(i++) - 0xDC00)) + 0x10000;
      buffer[index++] = 0xF0 | (chr >>> 18);
      buffer[index++] = 0x80 | ((chr >>> 12) & 0x3F);
      buffer[index++] = 0x80 | ((chr >>> 6)  & 0x3F);
      buffer[index++] = 0x80 | (chr          & 0x3F);
    }
  }
  return index - offset;
}

/**
 * Buffer.prototype.toString()
 *
 * @param [encoding] {String} ignored
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {String}
 */

function toString(encoding, start, end) {
  var buffer = this;
  var index = start|0;
  if (!end) end = buffer.length;
  var string = '';
  var chr = 0;

  while (index < end) {
    chr = buffer[index++];
    if (chr < 128) {
      string += String.fromCharCode(chr);
      continue;
    }

    if ((chr & 0xE0) === 0xC0) {
      // 2 bytes
      chr = (chr & 0x1F) << 6 |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF0) === 0xE0) {
      // 3 bytes
      chr = (chr & 0x0F)             << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);

    } else if ((chr & 0xF8) === 0xF0) {
      // 4 bytes
      chr = (chr & 0x07)             << 18 |
            (buffer[index++] & 0x3F) << 12 |
            (buffer[index++] & 0x3F) << 6  |
            (buffer[index++] & 0x3F);
    }

    if (chr >= 0x010000) {
      // A surrogate pair
      chr -= 0x010000;

      string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
    } else {
      string += String.fromCharCode(chr);
    }
  }

  return string;
}

/**
 * Buffer.prototype.copy()
 *
 * @param target {Buffer}
 * @param [targetStart] {Number}
 * @param [start] {Number}
 * @param [end] {Number}
 * @returns {number}
 */

function copy(target, targetStart, start, end) {
  var i;
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (!targetStart) targetStart = 0;
  var len = end - start;

  if (target === this && start < targetStart && targetStart < end) {
    // descending
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    // ascending
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start];
    }
  }

  return len;
}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

// bufferish-array.js

var Bufferish = __webpack_require__(0);

var exports = module.exports = alloc(0);

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Array}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Array
  return Array.prototype.slice.call(value);
}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

// bufferish-buffer.js

var Bufferish = __webpack_require__(0);
var Buffer = Bufferish.global;

var exports = module.exports = Bufferish.hasBuffer ? alloc(0) : [];

exports.alloc = Bufferish.hasBuffer && Buffer.alloc || alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Buffer(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Buffer}
 */

function from(value) {
  if (!Bufferish.isBuffer(value) && Bufferish.isView(value)) {
    // TypedArray to Uint8Array
    value = Bufferish.Uint8Array.from(value);
  } else if (Bufferish.isArrayBuffer(value)) {
    // ArrayBuffer to Uint8Array
    value = new Uint8Array(value);
  } else if (typeof value === "string") {
    // String to Buffer
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  // Array-like to Buffer
  if (Buffer.from && Buffer.from.length !== 1) {
    return Buffer.from(value); // node v6+
  } else {
    return new Buffer(value); // node v4
  }
}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

// bufferish-uint8array.js

var Bufferish = __webpack_require__(0);

var exports = module.exports = Bufferish.hasArrayBuffer ? alloc(0) : [];

exports.alloc = alloc;
exports.concat = Bufferish.concat;
exports.from = from;

/**
 * @param size {Number}
 * @returns {Buffer|Uint8Array|Array}
 */

function alloc(size) {
  return new Uint8Array(size);
}

/**
 * @param value {Array|ArrayBuffer|Buffer|String}
 * @returns {Uint8Array}
 */

function from(value) {
  if (Bufferish.isView(value)) {
    // TypedArray to ArrayBuffer
    var byteOffset = value.byteOffset;
    var byteLength = value.byteLength;
    value = value.buffer;
    if (value.byteLength !== byteLength) {
      if (value.slice) {
        value = value.slice(byteOffset, byteOffset + byteLength);
      } else {
        // Android 4.1 does not have ArrayBuffer.prototype.slice
        value = new Uint8Array(value);
        if (value.byteLength !== byteLength) {
          // TypedArray to ArrayBuffer to Uint8Array to Array
          value = Array.prototype.slice.call(value, byteOffset, byteOffset + byteLength);
        }
      }
    }
  } else if (typeof value === "string") {
    // String to Uint8Array
    return Bufferish.from.call(exports, value);
  } else if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }

  return new Uint8Array(value);
}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

// codec.js

// load both interfaces
__webpack_require__(13);
__webpack_require__(14);

// @public
// msgpack.codec.preset

exports.codec = {
  preset: __webpack_require__(3).preset
};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

// decoder.js

exports.Decoder = Decoder;

var EventLite = __webpack_require__(21);
var DecodeBuffer = __webpack_require__(22).DecodeBuffer;

function Decoder(options) {
  if (!(this instanceof Decoder)) return new Decoder(options);
  DecodeBuffer.call(this, options);
}

Decoder.prototype = new DecodeBuffer();

EventLite.mixin(Decoder.prototype);

Decoder.prototype.decode = function(chunk) {
  if (arguments.length) this.write(chunk);
  this.flush();
};

Decoder.prototype.push = function(chunk) {
  this.emit("data", chunk);
};

Decoder.prototype.end = function(chunk) {
  this.decode(chunk);
  this.emit("end");
};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

// encoder.js

exports.Encoder = Encoder;

var EventLite = __webpack_require__(21);
var EncodeBuffer = __webpack_require__(24).EncodeBuffer;

function Encoder(options) {
  if (!(this instanceof Encoder)) return new Encoder(options);
  EncodeBuffer.call(this, options);
}

Encoder.prototype = new EncodeBuffer();

EventLite.mixin(Encoder.prototype);

Encoder.prototype.encode = function(chunk) {
  this.write(chunk);
  this.emit("data", this.read());
};

Encoder.prototype.end = function(chunk) {
  if (arguments.length) this.encode(chunk);
  this.flush();
  this.emit("end");
};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

// ext-packer.js

exports.setExtPackers = setExtPackers;

var Bufferish = __webpack_require__(0);
var Buffer = Bufferish.global;
var packTypedArray = Bufferish.Uint8Array.from;
var _encode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtPackers(codec) {
  codec.addExtPacker(0x0E, Error, [packError, encode]);
  codec.addExtPacker(0x01, EvalError, [packError, encode]);
  codec.addExtPacker(0x02, RangeError, [packError, encode]);
  codec.addExtPacker(0x03, ReferenceError, [packError, encode]);
  codec.addExtPacker(0x04, SyntaxError, [packError, encode]);
  codec.addExtPacker(0x05, TypeError, [packError, encode]);
  codec.addExtPacker(0x06, URIError, [packError, encode]);

  codec.addExtPacker(0x0A, RegExp, [packRegExp, encode]);
  codec.addExtPacker(0x0B, Boolean, [packValueOf, encode]);
  codec.addExtPacker(0x0C, String, [packValueOf, encode]);
  codec.addExtPacker(0x0D, Date, [Number, encode]);
  codec.addExtPacker(0x0F, Number, [packValueOf, encode]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtPacker(0x11, Int8Array, packTypedArray);
    codec.addExtPacker(0x12, Uint8Array, packTypedArray);
    codec.addExtPacker(0x13, Int16Array, packTypedArray);
    codec.addExtPacker(0x14, Uint16Array, packTypedArray);
    codec.addExtPacker(0x15, Int32Array, packTypedArray);
    codec.addExtPacker(0x16, Uint32Array, packTypedArray);
    codec.addExtPacker(0x17, Float32Array, packTypedArray);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtPacker(0x18, Float64Array, packTypedArray);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtPacker(0x19, Uint8ClampedArray, packTypedArray);
    }

    codec.addExtPacker(0x1A, ArrayBuffer, packTypedArray);
    codec.addExtPacker(0x1D, DataView, packTypedArray);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtPacker(0x1B, Buffer, Bufferish.from);
  }
}

function encode(input) {
  if (!_encode) _encode = __webpack_require__(25).encode; // lazy load
  return _encode(input);
}

function packValueOf(value) {
  return (value).valueOf();
}

function packRegExp(value) {
  value = RegExp.prototype.toString.call(value).split("/");
  value.shift();
  var out = [value.pop()];
  out.unshift(value.join("/"));
  return out;
}

function packError(value) {
  var out = {};
  for (var key in ERROR_COLUMNS) {
    out[key] = value[key];
  }
  return out;
}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

// ext-unpacker.js

exports.setExtUnpackers = setExtUnpackers;

var Bufferish = __webpack_require__(0);
var Buffer = Bufferish.global;
var _decode;

var ERROR_COLUMNS = {name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1};

function setExtUnpackers(codec) {
  codec.addExtUnpacker(0x0E, [decode, unpackError(Error)]);
  codec.addExtUnpacker(0x01, [decode, unpackError(EvalError)]);
  codec.addExtUnpacker(0x02, [decode, unpackError(RangeError)]);
  codec.addExtUnpacker(0x03, [decode, unpackError(ReferenceError)]);
  codec.addExtUnpacker(0x04, [decode, unpackError(SyntaxError)]);
  codec.addExtUnpacker(0x05, [decode, unpackError(TypeError)]);
  codec.addExtUnpacker(0x06, [decode, unpackError(URIError)]);

  codec.addExtUnpacker(0x0A, [decode, unpackRegExp]);
  codec.addExtUnpacker(0x0B, [decode, unpackClass(Boolean)]);
  codec.addExtUnpacker(0x0C, [decode, unpackClass(String)]);
  codec.addExtUnpacker(0x0D, [decode, unpackClass(Date)]);
  codec.addExtUnpacker(0x0F, [decode, unpackClass(Number)]);

  if ("undefined" !== typeof Uint8Array) {
    codec.addExtUnpacker(0x11, unpackClass(Int8Array));
    codec.addExtUnpacker(0x12, unpackClass(Uint8Array));
    codec.addExtUnpacker(0x13, [unpackArrayBuffer, unpackClass(Int16Array)]);
    codec.addExtUnpacker(0x14, [unpackArrayBuffer, unpackClass(Uint16Array)]);
    codec.addExtUnpacker(0x15, [unpackArrayBuffer, unpackClass(Int32Array)]);
    codec.addExtUnpacker(0x16, [unpackArrayBuffer, unpackClass(Uint32Array)]);
    codec.addExtUnpacker(0x17, [unpackArrayBuffer, unpackClass(Float32Array)]);

    // PhantomJS/1.9.7 doesn't have Float64Array
    if ("undefined" !== typeof Float64Array) {
      codec.addExtUnpacker(0x18, [unpackArrayBuffer, unpackClass(Float64Array)]);
    }

    // IE10 doesn't have Uint8ClampedArray
    if ("undefined" !== typeof Uint8ClampedArray) {
      codec.addExtUnpacker(0x19, unpackClass(Uint8ClampedArray));
    }

    codec.addExtUnpacker(0x1A, unpackArrayBuffer);
    codec.addExtUnpacker(0x1D, [unpackArrayBuffer, unpackClass(DataView)]);
  }

  if (Bufferish.hasBuffer) {
    codec.addExtUnpacker(0x1B, unpackClass(Buffer));
  }
}

function decode(input) {
  if (!_decode) _decode = __webpack_require__(23).decode; // lazy load
  return _decode(input);
}

function unpackRegExp(value) {
  return RegExp.apply(null, value);
}

function unpackError(Class) {
  return function(value) {
    var out = new Class();
    for (var key in ERROR_COLUMNS) {
      out[key] = value[key];
    }
    return out;
  };
}

function unpackClass(Class) {
  return function(value) {
    return new Class(value);
  };
}

function unpackArrayBuffer(value) {
  return (new Uint8Array(value)).buffer;
}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

// ext.js

// load both interfaces
__webpack_require__(13);
__webpack_require__(14);

exports.createCodec = __webpack_require__(3).createCodec;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

// read-token.js

var ReadFormat = __webpack_require__(27);

exports.getReadToken = getReadToken;

function getReadToken(options) {
  var format = ReadFormat.getReadFormat(options);

  if (options && options.useraw) {
    return init_useraw(format);
  } else {
    return init_token(format);
  }
}

function init_token(format) {
  var i;
  var token = new Array(256);

  // positive fixint -- 0x00 - 0x7f
  for (i = 0x00; i <= 0x7f; i++) {
    token[i] = constant(i);
  }

  // fixmap -- 0x80 - 0x8f
  for (i = 0x80; i <= 0x8f; i++) {
    token[i] = fix(i - 0x80, format.map);
  }

  // fixarray -- 0x90 - 0x9f
  for (i = 0x90; i <= 0x9f; i++) {
    token[i] = fix(i - 0x90, format.array);
  }

  // fixstr -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.str);
  }

  // nil -- 0xc0
  token[0xc0] = constant(null);

  // (never used) -- 0xc1
  token[0xc1] = null;

  // false -- 0xc2
  // true -- 0xc3
  token[0xc2] = constant(false);
  token[0xc3] = constant(true);

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = flex(format.uint8, format.bin);
  token[0xc5] = flex(format.uint16, format.bin);
  token[0xc6] = flex(format.uint32, format.bin);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = flex(format.uint8, format.ext);
  token[0xc8] = flex(format.uint16, format.ext);
  token[0xc9] = flex(format.uint32, format.ext);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = format.float32;
  token[0xcb] = format.float64;

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = format.uint8;
  token[0xcd] = format.uint16;
  token[0xce] = format.uint32;
  token[0xcf] = format.uint64;

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = format.int8;
  token[0xd1] = format.int16;
  token[0xd2] = format.int32;
  token[0xd3] = format.int64;

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  token[0xd4] = fix(1, format.ext);
  token[0xd5] = fix(2, format.ext);
  token[0xd6] = fix(4, format.ext);
  token[0xd7] = fix(8, format.ext);
  token[0xd8] = fix(16, format.ext);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = flex(format.uint8, format.str);
  token[0xda] = flex(format.uint16, format.str);
  token[0xdb] = flex(format.uint32, format.str);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = flex(format.uint16, format.array);
  token[0xdd] = flex(format.uint32, format.array);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = flex(format.uint16, format.map);
  token[0xdf] = flex(format.uint32, format.map);

  // negative fixint -- 0xe0 - 0xff
  for (i = 0xe0; i <= 0xff; i++) {
    token[i] = constant(i - 0x100);
  }

  return token;
}

function init_useraw(format) {
  var i;
  var token = init_token(format).slice();

  // raw 8 -- 0xd9
  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  token[0xd9] = token[0xc4];
  token[0xda] = token[0xc5];
  token[0xdb] = token[0xc6];

  // fixraw -- 0xa0 - 0xbf
  for (i = 0xa0; i <= 0xbf; i++) {
    token[i] = fix(i - 0xa0, format.bin);
  }

  return token;
}

function constant(value) {
  return function() {
    return value;
  };
}

function flex(lenFunc, decodeFunc) {
  return function(decoder) {
    var len = lenFunc(decoder);
    return decodeFunc(decoder, len);
  };
}

function fix(len, method) {
  return function(decoder) {
    return method(decoder, len);
  };
}


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

// write-token.js

var ieee754 = __webpack_require__(8);
var Int64Buffer = __webpack_require__(9);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var uint8 = __webpack_require__(28).uint8;
var Bufferish = __webpack_require__(0);
var Buffer = Bufferish.global;
var IS_BUFFER_SHIM = Bufferish.hasBuffer && ("TYPED_ARRAY_SUPPORT" in Buffer);
var NO_TYPED_ARRAY = IS_BUFFER_SHIM && !Buffer.TYPED_ARRAY_SUPPORT;
var Buffer_prototype = Bufferish.hasBuffer && Buffer.prototype || {};

exports.getWriteToken = getWriteToken;

function getWriteToken(options) {
  if (options && options.uint8array) {
    return init_uint8array();
  } else if (NO_TYPED_ARRAY || (Bufferish.hasBuffer && options && options.safe)) {
    return init_safe();
  } else {
    return init_token();
  }
}

function init_uint8array() {
  var token = init_token();

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, writeDoubleBE);

  return token;
}

// Node.js and browsers with TypedArray

function init_token() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = write1(0xc4);
  token[0xc5] = write2(0xc5);
  token[0xc6] = write4(0xc6);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = write1(0xc7);
  token[0xc8] = write2(0xc8);
  token[0xc9] = write4(0xc9);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, (Buffer_prototype.writeFloatBE || writeFloatBE), true);
  token[0xcb] = writeN(0xcb, 8, (Buffer_prototype.writeDoubleBE || writeDoubleBE), true);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = write1(0xcc);
  token[0xcd] = write2(0xcd);
  token[0xce] = write4(0xce);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = write1(0xd0);
  token[0xd1] = write2(0xd1);
  token[0xd2] = write4(0xd2);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = write1(0xd9);
  token[0xda] = write2(0xda);
  token[0xdb] = write4(0xdb);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = write2(0xdc);
  token[0xdd] = write4(0xdd);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = write2(0xde);
  token[0xdf] = write4(0xdf);

  return token;
}

// safe mode: for old browsers and who needs asserts

function init_safe() {
  // (immediate values)
  // positive fixint -- 0x00 - 0x7f
  // nil -- 0xc0
  // false -- 0xc2
  // true -- 0xc3
  // negative fixint -- 0xe0 - 0xff
  var token = uint8.slice();

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  token[0xc4] = writeN(0xc4, 1, Buffer.prototype.writeUInt8);
  token[0xc5] = writeN(0xc5, 2, Buffer.prototype.writeUInt16BE);
  token[0xc6] = writeN(0xc6, 4, Buffer.prototype.writeUInt32BE);

  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  token[0xc7] = writeN(0xc7, 1, Buffer.prototype.writeUInt8);
  token[0xc8] = writeN(0xc8, 2, Buffer.prototype.writeUInt16BE);
  token[0xc9] = writeN(0xc9, 4, Buffer.prototype.writeUInt32BE);

  // float 32 -- 0xca
  // float 64 -- 0xcb
  token[0xca] = writeN(0xca, 4, Buffer.prototype.writeFloatBE);
  token[0xcb] = writeN(0xcb, 8, Buffer.prototype.writeDoubleBE);

  // uint 8 -- 0xcc
  // uint 16 -- 0xcd
  // uint 32 -- 0xce
  // uint 64 -- 0xcf
  token[0xcc] = writeN(0xcc, 1, Buffer.prototype.writeUInt8);
  token[0xcd] = writeN(0xcd, 2, Buffer.prototype.writeUInt16BE);
  token[0xce] = writeN(0xce, 4, Buffer.prototype.writeUInt32BE);
  token[0xcf] = writeN(0xcf, 8, writeUInt64BE);

  // int 8 -- 0xd0
  // int 16 -- 0xd1
  // int 32 -- 0xd2
  // int 64 -- 0xd3
  token[0xd0] = writeN(0xd0, 1, Buffer.prototype.writeInt8);
  token[0xd1] = writeN(0xd1, 2, Buffer.prototype.writeInt16BE);
  token[0xd2] = writeN(0xd2, 4, Buffer.prototype.writeInt32BE);
  token[0xd3] = writeN(0xd3, 8, writeInt64BE);

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  token[0xd9] = writeN(0xd9, 1, Buffer.prototype.writeUInt8);
  token[0xda] = writeN(0xda, 2, Buffer.prototype.writeUInt16BE);
  token[0xdb] = writeN(0xdb, 4, Buffer.prototype.writeUInt32BE);

  // array 16 -- 0xdc
  // array 32 -- 0xdd
  token[0xdc] = writeN(0xdc, 2, Buffer.prototype.writeUInt16BE);
  token[0xdd] = writeN(0xdd, 4, Buffer.prototype.writeUInt32BE);

  // map 16 -- 0xde
  // map 32 -- 0xdf
  token[0xde] = writeN(0xde, 2, Buffer.prototype.writeUInt16BE);
  token[0xdf] = writeN(0xdf, 4, Buffer.prototype.writeUInt32BE);

  return token;
}

function write1(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(2);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset] = value;
  };
}

function write2(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(3);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function write4(type) {
  return function(encoder, value) {
    var offset = encoder.reserve(5);
    var buffer = encoder.buffer;
    buffer[offset++] = type;
    buffer[offset++] = value >>> 24;
    buffer[offset++] = value >>> 16;
    buffer[offset++] = value >>> 8;
    buffer[offset] = value;
  };
}

function writeN(type, len, method, noAssert) {
  return function(encoder, value) {
    var offset = encoder.reserve(len + 1);
    encoder.buffer[offset++] = type;
    method.call(encoder.buffer, value, offset, noAssert);
  };
}

function writeUInt64BE(value, offset) {
  new Uint64BE(this, offset, value);
}

function writeInt64BE(value, offset) {
  new Int64BE(this, offset, value);
}

function writeFloatBE(value, offset) {
  ieee754.write(this, value, offset, false, 23, 4);
}

function writeDoubleBE(value, offset) {
  ieee754.write(this, value, offset, false, 52, 8);
}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

// write-type.js

var IS_ARRAY = __webpack_require__(2);
var Int64Buffer = __webpack_require__(9);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var Bufferish = __webpack_require__(0);
var BufferProto = __webpack_require__(11);
var WriteToken = __webpack_require__(56);
var uint8 = __webpack_require__(28).uint8;
var ExtBuffer = __webpack_require__(12).ExtBuffer;

var HAS_UINT8ARRAY = ("undefined" !== typeof Uint8Array);
var HAS_MAP = ("undefined" !== typeof Map);

var extmap = [];
extmap[1] = 0xd4;
extmap[2] = 0xd5;
extmap[4] = 0xd6;
extmap[8] = 0xd7;
extmap[16] = 0xd8;

exports.getWriteType = getWriteType;

function getWriteType(options) {
  var token = WriteToken.getWriteToken(options);
  var useraw = options && options.useraw;
  var binarraybuffer = HAS_UINT8ARRAY && options && options.binarraybuffer;
  var isBuffer = binarraybuffer ? Bufferish.isArrayBuffer : Bufferish.isBuffer;
  var bin = binarraybuffer ? bin_arraybuffer : bin_buffer;
  var usemap = HAS_MAP && options && options.usemap;
  var map = usemap ? map_to_map : obj_to_map;

  var writeType = {
    "boolean": bool,
    "function": nil,
    "number": number,
    "object": (useraw ? object_raw : object),
    "string": _string(useraw ? raw_head_size : str_head_size),
    "symbol": nil,
    "undefined": nil
  };

  return writeType;

  // false -- 0xc2
  // true -- 0xc3
  function bool(encoder, value) {
    var type = value ? 0xc3 : 0xc2;
    token[type](encoder, value);
  }

  function number(encoder, value) {
    var ivalue = value | 0;
    var type;
    if (value !== ivalue) {
      // float 64 -- 0xcb
      type = 0xcb;
      token[type](encoder, value);
      return;
    } else if (-0x20 <= ivalue && ivalue <= 0x7F) {
      // positive fixint -- 0x00 - 0x7f
      // negative fixint -- 0xe0 - 0xff
      type = ivalue & 0xFF;
    } else if (0 <= ivalue) {
      // uint 8 -- 0xcc
      // uint 16 -- 0xcd
      // uint 32 -- 0xce
      type = (ivalue <= 0xFF) ? 0xcc : (ivalue <= 0xFFFF) ? 0xcd : 0xce;
    } else {
      // int 8 -- 0xd0
      // int 16 -- 0xd1
      // int 32 -- 0xd2
      type = (-0x80 <= ivalue) ? 0xd0 : (-0x8000 <= ivalue) ? 0xd1 : 0xd2;
    }
    token[type](encoder, ivalue);
  }

  // uint 64 -- 0xcf
  function uint64(encoder, value) {
    var type = 0xcf;
    token[type](encoder, value.toArray());
  }

  // int 64 -- 0xd3
  function int64(encoder, value) {
    var type = 0xd3;
    token[type](encoder, value.toArray());
  }

  // str 8 -- 0xd9
  // str 16 -- 0xda
  // str 32 -- 0xdb
  // fixstr -- 0xa0 - 0xbf
  function str_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFF) ? 2 : (length <= 0xFFFF) ? 3 : 5;
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw_head_size(length) {
    return (length < 32) ? 1 : (length <= 0xFFFF) ? 3 : 5;
  }

  function _string(head_size) {
    return string;

    function string(encoder, value) {
      // prepare buffer
      var length = value.length;
      var maxsize = 5 + length * 3;
      encoder.offset = encoder.reserve(maxsize);
      var buffer = encoder.buffer;

      // expected header size
      var expected = head_size(length);

      // expected start point
      var start = encoder.offset + expected;

      // write string
      length = BufferProto.write.call(buffer, value, start);

      // actual header size
      var actual = head_size(length);

      // move content when needed
      if (expected !== actual) {
        var targetStart = start + actual - expected;
        var end = start + length;
        BufferProto.copy.call(buffer, buffer, targetStart, start, end);
      }

      // write header
      var type = (actual === 1) ? (0xa0 + length) : (actual <= 3) ? (0xd7 + actual) : 0xdb;
      token[type](encoder, length);

      // move cursor
      encoder.offset += length;
    }
  }

  function object(encoder, value) {
    // null
    if (value === null) return nil(encoder, value);

    // Buffer
    if (isBuffer(value)) return bin(encoder, value);

    // Array
    if (IS_ARRAY(value)) return array(encoder, value);

    // int64-buffer objects
    if (Uint64BE.isUint64BE(value)) return uint64(encoder, value);
    if (Int64BE.isInt64BE(value)) return int64(encoder, value);

    // ext formats
    var packer = encoder.codec.getExtPacker(value);
    if (packer) value = packer(value);
    if (value instanceof ExtBuffer) return ext(encoder, value);

    // plain old Objects or Map
    map(encoder, value);
  }

  function object_raw(encoder, value) {
    // Buffer
    if (isBuffer(value)) return raw(encoder, value);

    // others
    object(encoder, value);
  }

  // nil -- 0xc0
  function nil(encoder, value) {
    var type = 0xc0;
    token[type](encoder, value);
  }

  // fixarray -- 0x90 - 0x9f
  // array 16 -- 0xdc
  // array 32 -- 0xdd
  function array(encoder, value) {
    var length = value.length;
    var type = (length < 16) ? (0x90 + length) : (length <= 0xFFFF) ? 0xdc : 0xdd;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    for (var i = 0; i < length; i++) {
      encode(encoder, value[i]);
    }
  }

  // bin 8 -- 0xc4
  // bin 16 -- 0xc5
  // bin 32 -- 0xc6
  function bin_buffer(encoder, value) {
    var length = value.length;
    var type = (length < 0xFF) ? 0xc4 : (length <= 0xFFFF) ? 0xc5 : 0xc6;
    token[type](encoder, length);
    encoder.send(value);
  }

  function bin_arraybuffer(encoder, value) {
    bin_buffer(encoder, new Uint8Array(value));
  }

  // fixext 1 -- 0xd4
  // fixext 2 -- 0xd5
  // fixext 4 -- 0xd6
  // fixext 8 -- 0xd7
  // fixext 16 -- 0xd8
  // ext 8 -- 0xc7
  // ext 16 -- 0xc8
  // ext 32 -- 0xc9
  function ext(encoder, value) {
    var buffer = value.buffer;
    var length = buffer.length;
    var type = extmap[length] || ((length < 0xFF) ? 0xc7 : (length <= 0xFFFF) ? 0xc8 : 0xc9);
    token[type](encoder, length);
    uint8[value.type](encoder);
    encoder.send(buffer);
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function obj_to_map(encoder, value) {
    var keys = Object.keys(value);
    var length = keys.length;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    keys.forEach(function(key) {
      encode(encoder, key);
      encode(encoder, value[key]);
    });
  }

  // fixmap -- 0x80 - 0x8f
  // map 16 -- 0xde
  // map 32 -- 0xdf
  function map_to_map(encoder, value) {
    if (!(value instanceof Map)) return obj_to_map(encoder, value);

    var length = value.size;
    var type = (length < 16) ? (0x80 + length) : (length <= 0xFFFF) ? 0xde : 0xdf;
    token[type](encoder, length);

    var encode = encoder.codec.encode;
    value.forEach(function(val, key, m) {
      encode(encoder, key);
      encode(encoder, val);
    });
  }

  // raw 16 -- 0xda
  // raw 32 -- 0xdb
  // fixraw -- 0xa0 - 0xbf
  function raw(encoder, value) {
    var length = value.length;
    var type = (length < 32) ? (0xa0 + length) : (length <= 0xFFFF) ? 0xda : 0xdb;
    token[type](encoder, length);
    encoder.send(value);
  }
}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = __webpack_require__(1);

var errors = module.exports = __webpack_require__(59);

function failCheck(ExceptionConstructor, callee, messageFormat, formatArgs) {
    messageFormat = messageFormat || '';
    var message = util.format.apply(this, [messageFormat].concat(formatArgs));
    var error = new ExceptionConstructor(message);
    Error.captureStackTrace(error, callee);
    throw error;
}

function failArgumentCheck(callee, message, formatArgs) {
    failCheck(errors.IllegalArgumentError, callee, message, formatArgs);
}

function failStateCheck(callee, message, formatArgs) {
    failCheck(errors.IllegalStateError, callee, message, formatArgs);
}

module.exports.checkArgument = function(value, message) {
    if (!value) {
        failArgumentCheck(arguments.callee, message,
            Array.prototype.slice.call(arguments, 2));
    }
};

module.exports.checkState = function(value, message) {
    if (!value) {
        failStateCheck(arguments.callee, message,
            Array.prototype.slice.call(arguments, 2));
    }
};

module.exports.checkIsDef = function(value, message) {
    if (value !== undefined) {
        return value;
    }

    failArgumentCheck(arguments.callee, message ||
        'Expected value to be defined but was undefined.',
        Array.prototype.slice.call(arguments, 2));
};

module.exports.checkIsDefAndNotNull = function(value, message) {
    // Note that undefined == null.
    if (value != null) {
        return value;
    }

    failArgumentCheck(arguments.callee, message ||
        'Expected value to be defined and not null but got "' +
        typeOf(value) + '".', Array.prototype.slice.call(arguments, 2));
};

// Fixed version of the typeOf operator which returns 'null' for null values
// and 'array' for arrays.
function typeOf(value) {
    var s = typeof value;
    if (s == 'object') {
        if (!value) {
            return 'null';
        } else if (value instanceof Array) {
            return 'array';
        }
    }
    return s;
}

function typeCheck(expect) {
    return function(value, message) {
        var type = typeOf(value);

        if (type == expect) {
            return value;
        }

        failArgumentCheck(arguments.callee, message ||
            'Expected "' + expect + '" but got "' + type + '".',
            Array.prototype.slice.call(arguments, 2));
    };
}

module.exports.checkIsString = typeCheck('string');
module.exports.checkIsArray = typeCheck('array');
module.exports.checkIsNumber = typeCheck('number');
module.exports.checkIsBoolean = typeCheck('boolean');
module.exports.checkIsFunction = typeCheck('function');
module.exports.checkIsObject = typeCheck('object');


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = __webpack_require__(1);

function IllegalArgumentError(message) {
    Error.call(this, message);
    this.message = message;
}
util.inherits(IllegalArgumentError, Error);

IllegalArgumentError.prototype.name = 'IllegalArgumentError';

function IllegalStateError(message) {
    Error.call(this, message);
    this.message = message;
}
util.inherits(IllegalStateError, Error);

IllegalStateError.prototype.name = 'IllegalStateError';

module.exports.IllegalStateError = IllegalStateError;
module.exports.IllegalArgumentError = IllegalArgumentError;

/***/ },
/* 60 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PrioritySignal_1 = __webpack_require__(30);
/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/*[DefaultProperty("valueClasses")]*/
/**
 * Signal dispatches events to multiple listeners.
 * It is inspired by C# events and delegates, and by
 * <a target="_top" href="http://en.wikipedia.org/wiki/Signals_and_slots">signals and slots</a>
 * in Qt.
 * A Signal adds event dispatching functionality through composition and interfaces,
 * rather than inheriting from a dispatcher.
 * <br/><br/>
 * Project home: <a target="_top" href="http://github.com/robertpenner/as3-signals/">http://github.com/robertpenner/as3-signals/</a>
 */
var DeluxeSignal = (function (_super) {
    __extends(DeluxeSignal, _super);
    /**
     * Creates a DeluxeSignal instance to dispatch events on behalf of a target object.
     * @param    target The object the signal is dispatching events on behalf of.
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new DeluxeSignal(this, String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: Subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    function DeluxeSignal(target) {
        if (target === void 0) { target = null; }
        var valueClasses = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            valueClasses[_i - 1] = arguments[_i];
        }
        var _this;
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;
        _this = _super.call(this, valueClasses) || this;
        //@CHANGED - this was the first call in the constructor
        //Typescript does not allow "this" to be called before super
        _this._target = target;
        return _this;
    }
    Object.defineProperty(DeluxeSignal.prototype, "target", {
        /** @inheritDoc */
        get: function () {
            return this._target;
        },
        set: function (value) {
            if (value == this._target)
                return;
            this.removeAll();
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Incorrect number of arguments.
     * @throws ArgumentError <code>ArgumentError</code>: Value object is not an instance of the appropriate valueClasses Class.
     */
    /*override*/
    DeluxeSignal.prototype.dispatch = function () {
        var valueObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueObjects[_i] = arguments[_i];
        }
        // Validate value objects against pre-defined value classes.
        var numValueClasses = this._valueClasses.length;
        var numValueObjects = valueObjects.length;
        if (numValueObjects < numValueClasses) {
            throw new Error('Incorrect number of arguments. ' +
                'Expected at least ' + numValueClasses + ' but received ' +
                numValueObjects + '.');
        }
        // Cannot dispatch differently typed objects than declared classes.
        for (var i = 0; i < numValueClasses; i++) {
            // Optimized for the optimistic case that values are correct.
            if (valueObjects[i] === null || valueObjects[i].constructor === this._valueClasses[i])
                continue;
            throw new Error('Value object <' + valueObjects[i]
                + '> is not an instance of <' + this._valueClasses[i] + '>.');
        }
        // Extract and clone event object if necessary.
        var event = valueObjects[0];
        if (event) {
            if (event.target) {
                event = event.clone();
                valueObjects[0] = event;
            }
            event.target = this.target;
            event.currentTarget = this.target;
            event.signal = this;
        }
        // Broadcast to listeners.
        var slotsToProcess = this.slots;
        while (slotsToProcess.nonEmpty) {
            slotsToProcess.head.execute(valueObjects);
            slotsToProcess = slotsToProcess.tail;
        }
        // Bubble the event as far as possible.
        if (!event || !event.bubbles)
            return;
        var currentTarget = this.target;
        while (currentTarget && currentTarget.hasOwnProperty("parent")) {
            currentTarget = currentTarget["parent"];
            if (!currentTarget)
                break;
            if (currentTarget.onEventBubbled !== undefined) {
                event.currentTarget = currentTarget;
                // onEventBubbled() can stop the bubbling by returning false.
                if (currentTarget.onEventBubbled(event))
                    break;
            }
        }
    };
    return DeluxeSignal;
}(PrioritySignal_1.PrioritySignal));
exports.DeluxeSignal = DeluxeSignal;
//# sourceMappingURL=DeluxeSignal.js.map

/***/ },
/* 62 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 *
 */
exports.IOnceSignal = Symbol("IOnceSignal");
//# sourceMappingURL=IOnceSignal.js.map

/***/ },
/* 63 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 *
 */
exports.IPrioritySignal = Symbol("IPrioritySignal");
//# sourceMappingURL=IPrioritySignal.js.map

/***/ },
/* 64 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 *
 */
exports.ISignal = Symbol("ISignal");
//# sourceMappingURL=ISignal.js.map

/***/ },
/* 65 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * The ISlot interface defines the basic properties of a
 * listener associated with a Signal.
 *
 * @author Joa Ebert
 * @author Robert Penner
 */
exports.ISlot = Symbol("ISlot");
//# sourceMappingURL=ISlot.js.map

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Slot_1 = __webpack_require__(4);
/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/*[DefaultProperty("valueClasses")]*/
/**
 * A MonoSignal can have only one listener.
 */
var MonoSignal = (function () {
    /**
     * Creates a MonoSignal instance to dispatch value objects.
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new Signal(String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: Subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    function MonoSignal() {
        var valueClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueClasses[_i] = arguments[_i];
        }
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        this.valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;
    }
    Object.defineProperty(MonoSignal.prototype, "valueClasses", {
        /**
         * @inheritDoc
         * @throws ArgumentError <code>ArgumentError</code>: Invalid valueClasses argument: item at index should be a Class but was not.
         */
        /*[ArrayElementType("Class")]*/
        get: function () {
            return this._valueClasses;
        },
        set: function (value) {
            // Clone so the Array cannot be affected from outside.
            this._valueClasses = value ? value.slice() : [];
            for (var i = this._valueClasses.length; i--;) {
                if (!(this._valueClasses[i] instanceof Object)) {
                    throw new Error('Invalid valueClasses argument: ' +
                        'item at index ' + i + ' should be a Class but was:<' +
                        this._valueClasses[i] + '>.' + this._valueClasses[i]); //@CHANGED - temp replacement for getQualifiedClassByName()
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonoSignal.prototype, "numListeners", {
        /** @inheritDoc */
        get: function () {
            return this.slot ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot add or addOnce with a listener already added, remove the current listener first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    MonoSignal.prototype.add = function (listener) {
        return this.registerListener(listener);
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot add or addOnce with a listener already added, remove the current listener first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    MonoSignal.prototype.addOnce = function (listener) {
        return this.registerListener(listener, true);
    };
    /** @inheritDoc */
    MonoSignal.prototype.remove = function (listener) {
        if (this.slot && this.slot.listener == listener) {
            var theSlot = this.slot;
            this.slot = null;
            return theSlot;
        }
        return null;
    };
    /** @inheritDoc */
    MonoSignal.prototype.removeAll = function () {
        if (this.slot)
            this.slot.remove();
    };
    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Incorrect number of arguments.
     * @throws ArgumentError <code>ArgumentError</code>: Value object is not an instance of the appropriate valueClasses Class.
     */
    MonoSignal.prototype.dispatch = function () {
        var valueObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueObjects[_i] = arguments[_i];
        }
        // If valueClasses is empty, value objects are not type-checked.
        var numValueClasses = this._valueClasses.length;
        var numValueObjects = valueObjects.length;
        // Cannot dispatch fewer objects than declared classes.
        if (numValueObjects < numValueClasses) {
            throw new Error('Incorrect number of arguments. ' +
                'Expected at least ' + numValueClasses + ' but received ' +
                numValueObjects + '.');
        }
        // Cannot dispatch differently typed objects than declared classes.
        for (var i = 0; i < numValueClasses; i++) {
            // Optimized for the optimistic case that values are correct.
            if (valueObjects[i] === null ||
                (valueObjects[i] instanceof this._valueClasses[i] || valueObjects[i].constructor === this._valueClasses[i])) {
                continue;
            }
            throw new Error('Value object <' + valueObjects[i]
                + '> is not an instance of <' + this._valueClasses[i] + '>.');
        }
        // Broadcast to the one listener.
        if (this.slot) {
            this.slot.execute(valueObjects);
        }
    };
    MonoSignal.prototype.registerListener = function (listener, once) {
        if (once === void 0) { once = false; }
        if (this.slot) {
            // If the listener exits previously added, definitely don't add it.
            throw new Error('You cannot add or addOnce with a listener already added, remove the current listener first.');
        }
        return (this.slot = new Slot_1.Slot(listener, this, once));
    };
    return MonoSignal;
}());
exports.MonoSignal = MonoSignal;
//# sourceMappingURL=MonoSignal.js.map

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OnceSignal_1 = __webpack_require__(16);
var Promise = (function (_super) {
    __extends(Promise, _super);
    function Promise() {
        return _super.apply(this, arguments) || this;
    }
    /** @inheritDoc */
    /*override*/
    Promise.prototype.addOnce = function (listener) {
        var slot = _super.prototype.addOnce.call(this, listener);
        if (this.isDispatched) {
            slot.execute(this.valueObjects);
            slot.remove();
        }
        return slot;
    };
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot dispatch() a Promise more than once
     */
    /*override*/
    Promise.prototype.dispatch = function () {
        var valueObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueObjects[_i] = arguments[_i];
        }
        if (this.isDispatched) {
            throw new Error("You cannot dispatch() a Promise more than once");
        }
        else {
            this.isDispatched = true;
            this.valueObjects = valueObjects;
            _super.prototype.dispatch.apply(this, valueObjects);
        }
    };
    return Promise;
}(OnceSignal_1.OnceSignal));
exports.Promise = Promise;
//# sourceMappingURL=Promise.js.map

/***/ },
/* 68 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 *
 * @see org.osflash.signals.events.IEvent
 * Documentation for the event interface being maintained in IEvent to avoid duplication for now.
 */
var GenericEvent = (function () {
    function GenericEvent(bubbles) {
        if (bubbles === void 0) { bubbles = false; }
        this._bubbles = bubbles;
    }
    Object.defineProperty(GenericEvent.prototype, "signal", {
        /** @inheritDoc */
        get: function () {
            return this._signal;
        },
        set: function (value) {
            this._signal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenericEvent.prototype, "target", {
        /** @inheritDoc */
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenericEvent.prototype, "currentTarget", {
        /** @inheritDoc */
        get: function () {
            return this._currentTarget;
        },
        set: function (value) {
            this._currentTarget = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenericEvent.prototype, "bubbles", {
        /** @inheritDoc */
        get: function () {
            return this._bubbles;
        },
        set: function (value) {
            this._bubbles = value;
        },
        enumerable: true,
        configurable: true
    });
    /** @inheritDoc */
    GenericEvent.prototype.clone = function () {
        return new GenericEvent(this._bubbles);
    };
    return GenericEvent;
}());
exports.GenericEvent = GenericEvent;
//# sourceMappingURL=GenericEvent.js.map

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var websocket_js_1 = __webpack_require__(73);
var msgpack = __webpack_require__(10);
var Connection = (function (_super) {
    __extends(Connection, _super);
    function Connection(url) {
        var _this = _super.call(this, url) || this;
        _this._enqueuedCalls = [];
        _this.binaryType = "arraybuffer";
        return _this;
    }
    Connection.prototype.onOpenCallback = function (event) {
        _super.prototype.onOpenCallback.call(this);
        if (this._enqueuedCalls.length > 0) {
            for (var i = 0; i < this._enqueuedCalls.length; i++) {
                var _a = this._enqueuedCalls[i], method = _a[0], args = _a[1];
                this[method].apply(this, args);
            }
        }
    };
    Connection.prototype.send = function (data) {
        if (this.ws.readyState == WebSocket.OPEN) {
            return _super.prototype.send.call(this, msgpack.encode(data));
        }
        else {
            console.warn("colyseus.js: trying to send data while in " + this.ws.readyState + " state");
            // WebSocket not connected.
            // Enqueue data to be sent when readyState == OPEN
            this._enqueuedCalls.push(['send', [data]]);
        }
    };
    return Connection;
}(websocket_js_1.default));
exports.Connection = Connection;


/***/ },
/* 70 */
/***/ function(module, exports) {

"use strict";
"use strict";
/*\
|*|
|*|  :: cookies.js :: (from: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework)
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|  https://github.com/madmurphy/cookies.js
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/
Object.defineProperty(exports, "__esModule", { value: true });
function getItem(sKey) {
    if (!sKey) {
        return null;
    }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
exports.getItem = getItem;
function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
    }
    var sExpires = "";
    if (vEnd) {
        switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
            case String:
                sExpires = "; expires=" + vEnd;
                break;
            case Date:
                // does Date supports 'toUTCString'?
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
        }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
}
exports.setItem = setItem;
function removeItem(sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
        return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
}
exports.removeItem = removeItem;
function hasItem(sKey) {
    if (!sKey) {
        return false;
    }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}
exports.hasItem = hasItem;
function keys() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
}
exports.keys = keys;


/***/ },
/* 71 */
/***/ function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ },
/* 72 */
/***/ function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var backoff=__webpack_require__(35);var WebSocketClient=function(){/**
   * @param url DOMString The URL to which to connect; this should be the URL to which the WebSocket server will respond.
   * @param protocols DOMString|DOMString[] Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol). If you don't specify a protocol string, an empty string is assumed.
   */function WebSocketClient(url,protocols){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,WebSocketClient);this.url=url;this.protocols=protocols;this.reconnectEnabled=true;this.listeners={};this.backoff=backoff[options.backoff||'fibonacci'](options);this.backoff.on('backoff',this.onBackoffStart.bind(this));this.backoff.on('ready',this.onBackoffReady.bind(this));this.backoff.on('fail',this.onBackoffFail.bind(this));this.open();}_createClass(WebSocketClient,[{key:'open',value:function open(){var reconnect=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;this.isReconnect=reconnect;this.ws=new WebSocket(this.url,this.protocols);this.ws.onclose=this.onCloseCallback.bind(this);this.ws.onerror=this.onErrorCallback.bind(this);this.ws.onmessage=this.onMessageCallback.bind(this);this.ws.onopen=this.onOpenCallback.bind(this);}/**
   * @ignore
   */},{key:'onBackoffStart',value:function onBackoffStart(number,delay){}/**
   * @ignore
   */},{key:'onBackoffReady',value:function onBackoffReady(number,delay){// console.log("onBackoffReady", number + ' ' + delay + 'ms');
this.open(true);}/**
   * @ignore
   */},{key:'onBackoffFail',value:function onBackoffFail(){}/**
   * @ignore
   */},{key:'onCloseCallback',value:function onCloseCallback(){if(!this.isReconnect&&this.listeners['onclose'])this.listeners['onclose'].apply(null,arguments);if(this.reconnectEnabled){this.backoff.backoff();}}/**
   * @ignore
   */},{key:'onErrorCallback',value:function onErrorCallback(){if(this.listeners['onerror'])this.listeners['onerror'].apply(null,arguments);}/**
   * @ignore
   */},{key:'onMessageCallback',value:function onMessageCallback(){if(this.listeners['onmessage'])this.listeners['onmessage'].apply(null,arguments);}/**
   * @ignore
   */},{key:'onOpenCallback',value:function onOpenCallback(){if(this.listeners['onopen'])this.listeners['onopen'].apply(null,arguments);if(this.isReconnect&&this.listeners['onreconnect'])this.listeners['onreconnect'].apply(null,arguments);this.isReconnect=false;}/**
   * The number of bytes of data that have been queued using calls to send()
   * but not yet transmitted to the network. This value does not reset to zero
   * when the connection is closed; if you keep calling send(), this will
   * continue to climb.
   *
   * @type unsigned long
   * @readonly
   */},{key:'close',/**
   * Closes the WebSocket connection or connection attempt, if any. If the
   * connection is already CLOSED, this method does nothing.
   *
   * @param code A numeric value indicating the status code explaining why the connection is being closed. If this parameter is not specified, a default value of 1000 (indicating a normal "transaction complete" closure) is assumed. See the list of status codes on the CloseEvent page for permitted values.
   * @param reason A human-readable string explaining why the connection is closing. This string must be no longer than 123 bytes of UTF-8 text (not characters).
   *
   * @return void
   */value:function close(code,reason){if(typeof code=='undefined'){code=1000;}this.reconnectEnabled=false;this.ws.close(code,reason);}/**
   * Transmits data to the server over the WebSocket connection.
   * @param data DOMString|ArrayBuffer|Blob
   * @return void
   */},{key:'send',value:function send(data){this.ws.send(data);}/**
   * An event listener to be called when the WebSocket connection's readyState changes to CLOSED. The listener receives a CloseEvent named "close".
   * @param listener EventListener
   */},{key:'bufferedAmount',get:function get(){return this.ws.bufferedAmount;}/**
   * The current state of the connection; this is one of the Ready state constants.
   * @type unsigned short
   * @readonly
   */},{key:'readyState',get:function get(){return this.ws.readyState;}/**
   * A string indicating the type of binary data being transmitted by the
   * connection. This should be either "blob" if DOM Blob objects are being
   * used or "arraybuffer" if ArrayBuffer objects are being used.
   * @type DOMString
   */},{key:'binaryType',get:function get(){return this.ws.binaryType;},set:function set(binaryType){this.ws.binaryType=binaryType;}/**
   * The extensions selected by the server. This is currently only the empty
   * string or a list of extensions as negotiated by the connection.
   * @type DOMString
   */},{key:'extensions',get:function get(){return this.ws.extensions;},set:function set(extensions){this.ws.extensions=extensions;}/**
   * A string indicating the name of the sub-protocol the server selected;
   * this will be one of the strings specified in the protocols parameter when
   * creating the WebSocket object.
   * @type DOMString
   */},{key:'protocol',get:function get(){return this.ws.protocol;},set:function set(protocol){this.ws.protocol=protocol;}},{key:'onclose',set:function set(listener){this.listeners['onclose']=listener;},get:function get(){return this.listeners['onclose'];}/**
   * An event listener to be called when an error occurs. This is a simple event named "error".
   * @param listener EventListener
   */},{key:'onerror',set:function set(listener){this.listeners['onerror']=listener;},get:function get(){return this.listeners['onerror'];}/**
   * An event listener to be called when a message is received from the server. The listener receives a MessageEvent named "message".
   * @param listener EventListener
   */},{key:'onmessage',set:function set(listener){this.listeners['onmessage']=listener;},get:function get(){return this.listeners['onmessage'];}/**
   * An event listener to be called when the WebSocket connection's readyState changes to OPEN; this indicates that the connection is ready to send and receive data. The event is a simple one with the name "open".
   * @param listener EventListener
   */},{key:'onopen',set:function set(listener){this.listeners['onopen']=listener;},get:function get(){return this.listeners['onopen'];}/**
   * @param listener EventListener
   */},{key:'onreconnect',set:function set(listener){this.listeners['onreconnect']=listener;},get:function get(){return this.listeners['onreconnect'];}}]);return WebSocketClient;}();/**
 * The connection is not yet open.
 */WebSocketClient.CONNECTING=WebSocket.CONNECTING;/**
 * The connection is open and ready to communicate.
 */WebSocketClient.OPEN=WebSocket.OPEN;/**
 * The connection is in the process of closing.
 */WebSocketClient.CLOSING=WebSocket.CLOSING;/**
 * The connection is closed or couldn't be opened.
 */WebSocketClient.CLOSED=WebSocket.CLOSED;exports.default=WebSocketClient;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = __webpack_require__(34);
exports.Client = Client_1.Client;
var Protocol_1 = __webpack_require__(5);
exports.Protocol = Protocol_1.Protocol;
var Room_1 = __webpack_require__(17);
exports.Room = Room_1.Room;


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2I3MDgzNDdiMzFkOTNiYjJjZmQiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC5qcyIsIndlYnBhY2s6Ly8vLi9+L3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2NvZGVjLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3RvY29sLnRzIiwid2VicGFjazovLy8uL34vYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbnQ2NC1idWZmZXIvaW50NjQtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2V4dC1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL3JlYWQtY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByZWNvbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jvb20udHMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWNrb2ZmL2xpYi9iYWNrb2ZmLmpzIiwid2VicGFjazovLy8uL34vYmFja29mZi9saWIvc3RyYXRlZ3kvZmlib25hY2NpLmpzIiwid2VicGFjazovLy8uL34vYmFja29mZi9saWIvc3RyYXRlZ3kvc3RyYXRlZ3kuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudC1saXRlL2V2ZW50LWxpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2RlY29kZS1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvZW5jb2RlLWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9mbGV4LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvcmVhZC1mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXVpbnQ4LmpzIiwid2VicGFjazovLy8uL34vc2lnbmFscy5qcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1ByaW9yaXR5U2lnbmFsLmpzIiwid2VicGFjazovLy8uL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3RMaXN0LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9+L2JhY2tvZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWNrb2ZmL2xpYi9mdW5jdGlvbl9jYWxsLmpzIiwid2VicGFjazovLy8uL34vYmFja29mZi9saWIvc3RyYXRlZ3kvZXhwb25lbnRpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jbG9jay5qcy9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZGVsdGEtbGlzdGVuZXIvbGliL0RlbHRhQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL34vZGVsdGEtbGlzdGVuZXIvbGliL2NvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWx0YS1saXN0ZW5lci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mb3NzaWwtZGVsdGEvZm9zc2lsLWRlbHRhLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9idWZmZXItZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9idWZmZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtdWludDhhcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvY29kZWMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2RlY29kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2VuY29kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2V4dC1wYWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9tc2dwYWNrLWxpdGUvbGliL2V4dC11bnBhY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvZXh0LmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi9yZWFkLXRva2VuLmpzIiwid2VicGFjazovLy8uL34vbXNncGFjay1saXRlL2xpYi93cml0ZS10b2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9+L21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByZWNvbmQvbGliL2NoZWNrcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByZWNvbmQvbGliL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvRGVsdXhlU2lnbmFsLmpzIiwid2VicGFjazovLy8uL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVByaW9yaXR5U2lnbmFsLmpzIiwid2VicGFjazovLy8uL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2lnbmFsLmpzIiwid2VicGFjazovLy8uL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvTW9ub1NpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvZXZlbnRzL0dlbmVyaWNFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29ubmVjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29va2llLnRzIiwid2VicGFjazovLy8uL34vdXRpbC9+L2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwid2VicGFjazovLy8uL34vd2Vic29ja2V0LmpzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM5REE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsQzs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDemtCQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLDhCQUE4QixhQUFhOzs7Ozs7OztBQ2xFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsZ0M7Ozs7Ozs7QUNwTEE7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx1REFBdUQ7Ozs7Ozs7O0FDaEJ4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzV2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsUUFBUSxVQUFVOztBQUVsQjtBQUNBOzs7Ozs7O0FDbkZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYzs7QUFFZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1AsaURBQWlEO0FBQ2pELGtEQUFrRDtBQUNsRCxPQUFPO0FBQ1AsNENBQTRDO0FBQzVDLE9BQU87QUFDUCw0Q0FBNEM7QUFDNUMsT0FBTztBQUNQLDJDQUEyQztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsNEZBQTRGOzs7Ozs7OztBQ3BTN0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNUQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsT0FBTztBQUM3QixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckZBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUM7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esc0M7Ozs7Ozs7QUN6SkE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsa0NBQWtDO0FBQ2xDLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1DQUFtQyxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpQ0FBaUM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7OztBQ2hIQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDaEVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDM0JBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLElBQUk7QUFDM0I7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLDZCQUE2QixJQUFJLEVBQUU7QUFDbkMsK0JBQStCLElBQUksRUFBRTtBQUNyQyxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixlQUFlLFVBQVU7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixlQUFlLFVBQVU7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIscUJBQXFCO0FBQ3JCLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7OztBQ25MRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O0FDVkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDak1BOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNwTEE7O0FBRUE7O0FBRUEsa0JBQWtCLFdBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUMsa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGtDOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGFBQWE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7O0FDL01BOztBQUVBO0FBQ0EsaUJBQWlCLGFBQWEsRUFBRTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7OztBQ2xCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUNBQWlDO0FBQ2pGLGdEQUFnRCxpQ0FBaUM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsc0NBQXNDLEVBQUU7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7O0FDbkVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzdMQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN4Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDakhBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLFFBQVE7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBLGdFQUFnRSxhQUFhO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxTQUFTO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrRUFBa0U7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUNBQXVDO0FBQ2pFLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0EsMEJBQTBCLGdFQUFnRTtBQUMxRjtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsK0JBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsYUFBYTtBQUNiLGFBQWE7QUFDYiw0QkFBNEI7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMsd0JBQXdCLEVBQUU7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUSxlQUFlO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQywrQ0FBK0M7QUFDL0MsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9CQUFvQjtBQUNqQyxhQUFhLHFCQUFxQjtBQUNsQztBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMEJBQTBCO0FBQ25FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7OztBQ2pjRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDVkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0IsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNySUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLEdBQUc7QUFDSCw2QkFBNkI7QUFDN0I7QUFDQTs7Ozs7OztBQzdDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNsREE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1QkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXFEO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlEQUFxRDtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoRkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDTkE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEtBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsT0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1UUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJEOzs7Ozs7QUN4QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUNuTHRDO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esd0M7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esc0M7Ozs7Ozs7QUN4SUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsbUM7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esd0M7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQ0FBZ0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxtRkFBbUY7QUFDaEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsNENBQTRDO0FBQzdGO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDRHQUE0Ryx1Q0FBdUMscUNBQXFDO0FBQ3hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVEQUF1RCx1Q0FBdUM7QUFDbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFlBQVksb0JBQW9CLHNDQUFzQyxLQUFLO0FBQzlILDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNMQSxhQUFhLDRDQUE0QyxXQUFXLEVBQUUsNEJBQTRCLHdDQUF3QyxZQUFZLGVBQWUsS0FBSyx3QkFBd0IsbURBQW1ELDZCQUE2QixpREFBaUQsMERBQTBELG9EQUFvRCxpRUFBaUUseURBQXlELHNCQUFzQixHQUFHLCtDQUErQyx1Q0FBdUMsMkRBQTJELG9DQUErQiwrQkFBK0I7QUFDbnhCLHNEQUFzRDtBQUN0RDtBQUNBLDZDQUE2Qyx5RUFBeUUsc0NBQXNDLGFBQWEseUJBQXlCLDJCQUEyQixrQkFBa0IsNERBQTRELDBEQUEwRCx3REFBd0Qsc0RBQXNELGFBQWEsK0JBQStCLGlDQUFpQyw4RUFBOEUsMkJBQTJCLCtDQUErQyxnREFBZ0QsZ0RBQWdELG9EQUFvRCwrQ0FBK0M7QUFDMzNCO0FBQ0EsTUFBTSxFQUFFLGtFQUFrRTtBQUMxRTtBQUNBLE1BQU0sRUFBRSxpRUFBaUU7QUFDekUsaUJBQWlCO0FBQ2pCO0FBQ0EsTUFBTSxFQUFFLG9EQUFvRDtBQUM1RDtBQUNBLE1BQU0sRUFBRSx1REFBdUQsZ0dBQWdHLDBCQUEwQix5QkFBeUI7QUFDbE47QUFDQSxNQUFNLEVBQUUsdURBQXVELDhFQUE4RTtBQUM3STtBQUNBLE1BQU0sRUFBRSwyREFBMkQsa0ZBQWtGO0FBQ3JKO0FBQ0EsTUFBTSxFQUFFLHFEQUFxRCwyRUFBMkUsdUdBQXVHLHdCQUF3QjtBQUN2UTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsNkJBQTZCLFdBQVcsNEJBQTRCLDRCQUE0QjtBQUN2STtBQUNBO0FBQ0E7QUFDQSxNQUFNLEVBQUUscUNBQXFDLG9CQUFvQjtBQUNqRTtBQUNBO0FBQ0EsTUFBTSxFQUFFLHdDQUF3QywrQkFBK0I7QUFDL0UseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSxNQUFNLEVBQUUsb0NBQW9DLDJCQUEyQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRSxvQ0FBb0MsMkJBQTJCLDhCQUE4QiwrQkFBK0I7QUFDcEk7QUFDQTtBQUNBO0FBQ0EsTUFBTSxFQUFFLG9DQUFvQywyQkFBMkIsOEJBQThCLCtCQUErQjtBQUNwSTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRSxrQ0FBa0MseUJBQXlCLDRCQUE0Qiw0QkFBNEIsRUFBRSx5Q0FBeUMsb0NBQW9DLG9CQUFvQixrQ0FBa0M7QUFDaFE7QUFDQTtBQUNBLE1BQU0sRUFBRSx5Q0FBeUMsb0NBQW9DLG9CQUFvQixrQ0FBa0M7QUFDM0k7QUFDQTtBQUNBLE1BQU0sRUFBRSwyQ0FBMkMsc0NBQXNDLG9CQUFvQixvQ0FBb0M7QUFDakosK0ZBQStGO0FBQy9GO0FBQ0EsTUFBTSxFQUFFLHdDQUF3QyxtQ0FBbUMsb0JBQW9CLGlDQUFpQztBQUN4STtBQUNBLE1BQU0sRUFBRSw2Q0FBNkMsd0NBQXdDLG9CQUFvQix1Q0FBdUMsR0FBRyx3QkFBd0IsR0FBRztBQUN0TDtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLHVDQUF1QztBQUN2QztBQUNBLDZDQUE2QztBQUM3QztBQUNBLDJDQUEyQyxnQzs7Ozs7OztBQzlFM0M7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29seXNldXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9yeSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb3J5IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNzQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNiNzA4MzQ3YjMxZDkzYmIyY2ZkIiwiLy8gYnVmZmVyaXNoLmpzXG5cbnZhciBCdWZmZXIgPSBleHBvcnRzLmdsb2JhbCA9IHJlcXVpcmUoXCIuL2J1ZmZlci1nbG9iYWxcIik7XG52YXIgaGFzQnVmZmVyID0gZXhwb3J0cy5oYXNCdWZmZXIgPSBCdWZmZXIgJiYgISFCdWZmZXIuaXNCdWZmZXI7XG52YXIgaGFzQXJyYXlCdWZmZXIgPSBleHBvcnRzLmhhc0FycmF5QnVmZmVyID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBBcnJheUJ1ZmZlcik7XG5cbnZhciBpc0FycmF5ID0gZXhwb3J0cy5pc0FycmF5ID0gcmVxdWlyZShcImlzYXJyYXlcIik7XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBoYXNBcnJheUJ1ZmZlciA/IGlzQXJyYXlCdWZmZXIgOiBfZmFsc2U7XG52YXIgaXNCdWZmZXIgPSBleHBvcnRzLmlzQnVmZmVyID0gaGFzQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogX2ZhbHNlO1xudmFyIGlzVmlldyA9IGV4cG9ydHMuaXNWaWV3ID0gaGFzQXJyYXlCdWZmZXIgPyAoQXJyYXlCdWZmZXIuaXNWaWV3IHx8IF9pcyhcIkFycmF5QnVmZmVyXCIsIFwiYnVmZmVyXCIpKSA6IF9mYWxzZTtcblxuZXhwb3J0cy5hbGxvYyA9IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBjb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG52YXIgQnVmZmVyQXJyYXkgPSBleHBvcnRzLkFycmF5ID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLWFycmF5XCIpO1xudmFyIEJ1ZmZlckJ1ZmZlciA9IGV4cG9ydHMuQnVmZmVyID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLWJ1ZmZlclwiKTtcbnZhciBCdWZmZXJVaW50OEFycmF5ID0gZXhwb3J0cy5VaW50OEFycmF5ID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLXVpbnQ4YXJyYXlcIik7XG52YXIgQnVmZmVyUHJvdG8gPSBleHBvcnRzLnByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1wcm90b1wiKTtcblxuLyoqXG4gKiBAcGFyYW0gdmFsdWUge0FycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxTdHJpbmd9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGF1dG8odGhpcykuZnJvbSh2YWx1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIGF1dG8odGhpcykuYWxsb2Moc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIGxpc3Qge0FycmF5fSBhcnJheSBvZiAoQnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXkpc1xuICogQHBhcmFtIFtsZW5ndGhdXG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gY29uY2F0KGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IDA7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChsaXN0LCBkcnlydW4pO1xuICB9XG4gIHZhciByZWYgPSAodGhpcyAhPT0gZXhwb3J0cykgJiYgdGhpcyB8fCBsaXN0WzBdO1xuICB2YXIgcmVzdWx0ID0gYWxsb2MuY2FsbChyZWYsIGxlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpc3QsIGFwcGVuZCk7XG4gIHJldHVybiByZXN1bHQ7XG5cbiAgZnVuY3Rpb24gZHJ5cnVuKGJ1ZmZlcikge1xuICAgIGxlbmd0aCArPSBidWZmZXIubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kKGJ1ZmZlcikge1xuICAgIG9mZnNldCArPSBCdWZmZXJQcm90by5jb3B5LmNhbGwoYnVmZmVyLCByZXN1bHQsIG9mZnNldCk7XG4gIH1cbn1cblxudmFyIF9pc0FycmF5QnVmZmVyID0gX2lzKFwiQXJyYXlCdWZmZXJcIik7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCBfaXNBcnJheUJ1ZmZlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmcm9tU3RyaW5nKHZhbHVlKSB7XG4gIHZhciBleHBlY3RlZCA9IHZhbHVlLmxlbmd0aCAqIDM7XG4gIHZhciB0aGF0ID0gYWxsb2MuY2FsbCh0aGlzLCBleHBlY3RlZCk7XG4gIHZhciBhY3R1YWwgPSBCdWZmZXJQcm90by53cml0ZS5jYWxsKHRoYXQsIHZhbHVlKTtcbiAgaWYgKGV4cGVjdGVkICE9PSBhY3R1YWwpIHtcbiAgICB0aGF0ID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbCh0aGF0LCAwLCBhY3R1YWwpO1xuICB9XG4gIHJldHVybiB0aGF0O1xufVxuXG5mdW5jdGlvbiBhdXRvKHRoYXQpIHtcbiAgcmV0dXJuIGlzQnVmZmVyKHRoYXQpID8gQnVmZmVyQnVmZmVyXG4gICAgOiBpc1ZpZXcodGhhdCkgPyBCdWZmZXJVaW50OEFycmF5XG4gICAgOiBpc0FycmF5KHRoYXQpID8gQnVmZmVyQXJyYXlcbiAgICA6IGhhc0J1ZmZlciA/IEJ1ZmZlckJ1ZmZlclxuICAgIDogaGFzQXJyYXlCdWZmZXIgPyBCdWZmZXJVaW50OEFycmF5XG4gICAgOiBCdWZmZXJBcnJheTtcbn1cblxuZnVuY3Rpb24gX2ZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIF9pcyhuYW1lLCBrZXkpIHtcbiAgLyoganNoaW50IGVxbnVsbDp0cnVlICovXG4gIG5hbWUgPSBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCI7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgIT0gbnVsbCkgJiYge30udG9TdHJpbmcuY2FsbChrZXkgPyB2YWx1ZVtrZXldIDogdmFsdWUpID09PSBuYW1lO1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXRpbC91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lzYXJyYXkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY29kZWMtYmFzZS5qc1xuXG52YXIgSVNfQVJSQVkgPSByZXF1aXJlKFwiaXNhcnJheVwiKTtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IGNyZWF0ZUNvZGVjO1xuZXhwb3J0cy5pbnN0YWxsID0gaW5zdGFsbDtcbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG5mdW5jdGlvbiBDb2RlYyhvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb2RlYykpIHJldHVybiBuZXcgQ29kZWMob3B0aW9ucyk7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuaW5pdCgpO1xufVxuXG5Db2RlYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnVpbnQ4YXJyYXkpIHtcbiAgICB0aGlzLmJ1ZmZlcmlzaCA9IEJ1ZmZlcmlzaC5VaW50OEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBpbnN0YWxsKHByb3BzKSB7XG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIENvZGVjLnByb3RvdHlwZVtrZXldID0gYWRkKENvZGVjLnByb3RvdHlwZVtrZXldLCBwcm9wc1trZXldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gKGEgJiYgYikgPyBhYiA6IChhIHx8IGIpO1xuXG4gIGZ1bmN0aW9uIGFiKCkge1xuICAgIGEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGpvaW4oZmlsdGVycykge1xuICBmaWx0ZXJzID0gZmlsdGVycy5zbGljZSgpO1xuXG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmaWx0ZXJzLnJlZHVjZShpdGVyYXRvciwgdmFsdWUpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGl0ZXJhdG9yKHZhbHVlLCBmaWx0ZXIpIHtcbiAgICByZXR1cm4gZmlsdGVyKHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWx0ZXIoZmlsdGVyKSB7XG4gIHJldHVybiBJU19BUlJBWShmaWx0ZXIpID8gam9pbihmaWx0ZXIpIDogZmlsdGVyO1xufVxuXG4vLyBAcHVibGljXG4vLyBtc2dwYWNrLmNyZWF0ZUNvZGVjKClcblxuZnVuY3Rpb24gY3JlYXRlQ29kZWMob3B0aW9ucykge1xuICByZXR1cm4gbmV3IENvZGVjKG9wdGlvbnMpO1xufVxuXG4vLyBkZWZhdWx0IHNoYXJlZCBjb2RlY1xuXG5leHBvcnRzLnByZXNldCA9IGNyZWF0ZUNvZGVjKHtwcmVzZXQ6IHRydWV9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2NvZGVjLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFRoZSBTbG90IGNsYXNzIHJlcHJlc2VudHMgYSBzaWduYWwgc2xvdC5cbiAqXG4gKiBAYXV0aG9yIFJvYmVydCBQZW5uZXJcbiAqIEBhdXRob3IgSm9hIEViZXJ0XG4gKi9cbnZhciBTbG90ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IFNsb3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFRoZSBsaXN0ZW5lciBhc3NvY2lhdGVkIHdpdGggdGhlIHNsb3QuXG4gICAgICogQHBhcmFtIHNpZ25hbCBUaGUgc2lnbmFsIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2xvdC5cbiAgICAgKiBAcGFyYW0gb25jZSBXaGV0aGVyIG9yIG5vdCB0aGUgbGlzdGVuZXIgc2hvdWxkIGJlIGV4ZWN1dGVkIG9ubHkgb25jZS5cbiAgICAgKiBAcGFyYW0gcHJpb3JpdHkgVGhlIHByaW9yaXR5IG9mIHRoZSBzbG90LlxuICAgICAqXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKiBAdGhyb3dzIEVycm9yIDxjb2RlPkVycm9yPC9jb2RlPjogSW50ZXJuYWwgc2lnbmFsIHJlZmVyZW5jZSBoYXMgbm90IGJlZW4gc2V0IHlldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTbG90KGxpc3RlbmVyLCBzaWduYWwsIG9uY2UsIHByaW9yaXR5KSB7XG4gICAgICAgIGlmIChvbmNlID09PSB2b2lkIDApIHsgb25jZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb25jZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wcmlvcml0eSA9IDA7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHRoaXMuX29uY2UgPSBvbmNlO1xuICAgICAgICB0aGlzLl9zaWduYWwgPSBzaWduYWw7XG4gICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMudmVyaWZ5TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLmV4ZWN1dGUwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9vbmNlKVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmFtcyAmJiB0aGlzLl9wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lci5hcHBseShudWxsLCB0aGlzLl9wYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLmV4ZWN1dGUxID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX29uY2UpXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICBpZiAodGhpcy5fcGFyYW1zICYmIHRoaXMuX3BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyLmFwcGx5KG51bGwsIFt2YWx1ZV0uY29uY2F0KHRoaXMuX3BhcmFtcykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyKHZhbHVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uICh2YWx1ZU9iamVjdHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5fb25jZSlcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgcGFyYW1ldGVycywgYWRkIHRoZW0gdG8gdGhlIHZhbHVlT2JqZWN0XG4gICAgICAgIC8vIE5vdGU6IFRoaXMgY291bGQgYmUgZXhwZW5zaXZlIGlmIHdlJ3JlIGFmdGVyIHRoZSBmYXN0ZXN0IGRpc3BhdGNoIHBvc3NpYmxlLlxuICAgICAgICBpZiAodGhpcy5fcGFyYW1zICYmIHRoaXMuX3BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5jb25jYXQodGhpcy5fcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOT1RFOiBzaW1wbGUgaWZzIGFyZSBmYXN0ZXIgdGhhbiBzd2l0Y2g6IGh0dHA6Ly9qYWNrc29uZHVuc3Rhbi5jb20vYXJ0aWNsZXMvMTAwN1xuICAgICAgICB2YXIgbnVtVmFsdWVPYmplY3RzID0gdmFsdWVPYmplY3RzLmxlbmd0aDtcbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcih2YWx1ZU9iamVjdHNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcih2YWx1ZU9iamVjdHNbMF0sIHZhbHVlT2JqZWN0c1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtVmFsdWVPYmplY3RzID09IDMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyKHZhbHVlT2JqZWN0c1swXSwgdmFsdWVPYmplY3RzWzFdLCB2YWx1ZU9iamVjdHNbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIuYXBwbHkobnVsbCwgdmFsdWVPYmplY3RzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcImxpc3RlbmVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uIERpZCB5b3Ugd2FudCB0byBzZXQgZW5hYmxlZCB0byBmYWxzZSBpbnN0ZWFkP1xuICAgICAgICAgKiBAdGhyb3dzIEVycm9yIDxjb2RlPkVycm9yPC9jb2RlPjogSW50ZXJuYWwgc2lnbmFsIHJlZmVyZW5jZSBoYXMgbm90IGJlZW4gc2V0IHlldC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHaXZlbiBsaXN0ZW5lciBpcyBudWxsLlxcbkRpZCB5b3Ugd2FudCB0byBzZXQgZW5hYmxlZCB0byBmYWxzZSBpbnN0ZWFkPycpO1xuICAgICAgICAgICAgdGhpcy52ZXJpZnlMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lciA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwib25jZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb25jZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcInByaW9yaXR5XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBvYmplY3QuXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIltTbG90IGxpc3RlbmVyOiBcIiArIHRoaXMuX2xpc3RlbmVyICsgXCIsIG9uY2U6IFwiICsgdGhpcy5fb25jZVxuICAgICAgICAgICAgKyBcIiwgcHJpb3JpdHk6IFwiICsgdGhpcy5fcHJpb3JpdHkgKyBcIiwgZW5hYmxlZDogXCIgKyB0aGlzLl9lbmFibGVkICsgXCJdXCI7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwiZW5hYmxlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcInBhcmFtc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zaWduYWwucmVtb3ZlKHRoaXMuX2xpc3RlbmVyKTtcbiAgICB9O1xuICAgIFNsb3QucHJvdG90eXBlLnZlcmlmeUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChudWxsID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dpdmVuIGxpc3RlbmVyIGlzIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5fc2lnbmFsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVybmFsIHNpZ25hbCByZWZlcmVuY2UgaGFzIG5vdCBiZWVuIHNldCB5ZXQuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTbG90O1xufSgpKTtcbmV4cG9ydHMuU2xvdCA9IFNsb3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TbG90LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3QuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBVc2UgY29kZXMgYmV0d2VlbiAwfjEyNyBmb3IgbGVzc2VyIHRocm91Z2hwdXQgKDEgYnl0ZSlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQcm90b2NvbDtcbihmdW5jdGlvbiAoUHJvdG9jb2wpIHtcbiAgICAvLyBVc2VyLXJlbGF0ZWQgKDB+MTApXG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJVU0VSX0lEXCJdID0gMV0gPSBcIlVTRVJfSURcIjtcbiAgICAvLyBSb29tLXJlbGF0ZWQgKDEwfjIwKVxuICAgIFByb3RvY29sW1Byb3RvY29sW1wiSk9JTl9ST09NXCJdID0gMTBdID0gXCJKT0lOX1JPT01cIjtcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIkpPSU5fRVJST1JcIl0gPSAxMV0gPSBcIkpPSU5fRVJST1JcIjtcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIkxFQVZFX1JPT01cIl0gPSAxMl0gPSBcIkxFQVZFX1JPT01cIjtcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIlJPT01fREFUQVwiXSA9IDEzXSA9IFwiUk9PTV9EQVRBXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJST09NX1NUQVRFXCJdID0gMTRdID0gXCJST09NX1NUQVRFXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJST09NX1NUQVRFX1BBVENIXCJdID0gMTVdID0gXCJST09NX1NUQVRFX1BBVENIXCI7XG4gICAgLy8gR2VuZXJpYyBtZXNzYWdlcyAoNTB+NjApXG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJCQURfUkVRVUVTVFwiXSA9IDUwXSA9IFwiQkFEX1JFUVVFU1RcIjtcbn0pKFByb3RvY29sID0gZXhwb3J0cy5Qcm90b2NvbCB8fCAoZXhwb3J0cy5Qcm90b2NvbCA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Qcm90b2NvbC50c1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ldmVudHMvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaW50NjQtYnVmZmVyLmpzXG5cbi8qanNoaW50IC1XMDE4ICovIC8vIENvbmZ1c2luZyB1c2Ugb2YgJyEnLlxuLypqc2hpbnQgLVcwMzAgKi8gLy8gRXhwZWN0ZWQgYW4gYXNzaWdubWVudCBvciBmdW5jdGlvbiBjYWxsIGFuZCBpbnN0ZWFkIHNhdyBhbiBleHByZXNzaW9uLlxuLypqc2hpbnQgLVcwOTMgKi8gLy8gRGlkIHlvdSBtZWFuIHRvIHJldHVybiBhIGNvbmRpdGlvbmFsIGluc3RlYWQgb2YgYW4gYXNzaWdubWVudD9cblxudmFyIFVpbnQ2NEJFLCBJbnQ2NEJFLCBVaW50NjRMRSwgSW50NjRMRTtcblxuIWZ1bmN0aW9uKGV4cG9ydHMpIHtcbiAgLy8gY29uc3RhbnRzXG5cbiAgdmFyIFVOREVGSU5FRCA9IFwidW5kZWZpbmVkXCI7XG4gIHZhciBCVUZGRVIgPSAoVU5ERUZJTkVEICE9PSB0eXBlb2YgQnVmZmVyKSAmJiBCdWZmZXI7XG4gIHZhciBVSU5UOEFSUkFZID0gKFVOREVGSU5FRCAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG4gIHZhciBBUlJBWUJVRkZFUiA9IChVTkRFRklORUQgIT09IHR5cGVvZiBBcnJheUJ1ZmZlcikgJiYgQXJyYXlCdWZmZXI7XG4gIHZhciBaRVJPID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgX2lzQXJyYXk7XG4gIHZhciBCSVQzMiA9IDQyOTQ5NjcyOTY7XG4gIHZhciBCSVQyNCA9IDE2Nzc3MjE2O1xuXG4gIC8vIHN0b3JhZ2UgY2xhc3NcblxuICB2YXIgc3RvcmFnZTsgLy8gQXJyYXk7XG5cbiAgLy8gZ2VuZXJhdGUgY2xhc3Nlc1xuXG4gIFVpbnQ2NEJFID0gZmFjdG9yeShcIlVpbnQ2NEJFXCIsIHRydWUsIHRydWUpO1xuICBJbnQ2NEJFID0gZmFjdG9yeShcIkludDY0QkVcIiwgdHJ1ZSwgZmFsc2UpO1xuICBVaW50NjRMRSA9IGZhY3RvcnkoXCJVaW50NjRMRVwiLCBmYWxzZSwgdHJ1ZSk7XG4gIEludDY0TEUgPSBmYWN0b3J5KFwiSW50NjRMRVwiLCBmYWxzZSwgZmFsc2UpO1xuXG4gIC8vIGNsYXNzIGZhY3RvcnlcblxuICBmdW5jdGlvbiBmYWN0b3J5KG5hbWUsIGJpZ2VuZGlhbiwgdW5zaWduZWQpIHtcbiAgICB2YXIgcG9zSCA9IGJpZ2VuZGlhbiA/IDAgOiA0O1xuICAgIHZhciBwb3NMID0gYmlnZW5kaWFuID8gNCA6IDA7XG4gICAgdmFyIHBvczAgPSBiaWdlbmRpYW4gPyAwIDogMztcbiAgICB2YXIgcG9zMSA9IGJpZ2VuZGlhbiA/IDEgOiAyO1xuICAgIHZhciBwb3MyID0gYmlnZW5kaWFuID8gMiA6IDE7XG4gICAgdmFyIHBvczMgPSBiaWdlbmRpYW4gPyAzIDogMDtcbiAgICB2YXIgZnJvbVBvc2l0aXZlID0gYmlnZW5kaWFuID8gZnJvbVBvc2l0aXZlQkUgOiBmcm9tUG9zaXRpdmVMRTtcbiAgICB2YXIgZnJvbU5lZ2F0aXZlID0gYmlnZW5kaWFuID8gZnJvbU5lZ2F0aXZlQkUgOiBmcm9tTmVnYXRpdmVMRTtcbiAgICB2YXIgcHJvdG8gPSBJbnQ2NC5wcm90b3R5cGU7XG4gICAgdmFyIGlzTmFtZSA9IFwiaXNcIiArIG5hbWU7XG4gICAgdmFyIF9pc0ludDY0ID0gXCJfXCIgKyBpc05hbWU7XG5cbiAgICAvLyBwcm9wZXJ0aWVzXG4gICAgcHJvdG8uYnVmZmVyID0gdm9pZCAwO1xuICAgIHByb3RvLm9mZnNldCA9IDA7XG4gICAgcHJvdG9bX2lzSW50NjRdID0gdHJ1ZTtcblxuICAgIC8vIG1ldGhvZHNcbiAgICBwcm90by50b051bWJlciA9IHRvTnVtYmVyO1xuICAgIHByb3RvLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gICAgcHJvdG8udG9KU09OID0gdG9OdW1iZXI7XG4gICAgcHJvdG8udG9BcnJheSA9IHRvQXJyYXk7XG5cbiAgICAvLyBhZGQgLnRvQnVmZmVyKCkgbWV0aG9kIG9ubHkgd2hlbiBCdWZmZXIgYXZhaWxhYmxlXG4gICAgaWYgKEJVRkZFUikgcHJvdG8udG9CdWZmZXIgPSB0b0J1ZmZlcjtcblxuICAgIC8vIGFkZCAudG9BcnJheUJ1ZmZlcigpIG1ldGhvZCBvbmx5IHdoZW4gVWludDhBcnJheSBhdmFpbGFibGVcbiAgICBpZiAoVUlOVDhBUlJBWSkgcHJvdG8udG9BcnJheUJ1ZmZlciA9IHRvQXJyYXlCdWZmZXI7XG5cbiAgICAvLyBpc1VpbnQ2NEJFLCBpc0ludDY0QkVcbiAgICBJbnQ2NFtpc05hbWVdID0gaXNJbnQ2NDtcblxuICAgIC8vIENvbW1vbkpTXG4gICAgZXhwb3J0c1tuYW1lXSA9IEludDY0O1xuXG4gICAgcmV0dXJuIEludDY0O1xuXG4gICAgLy8gY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBJbnQ2NChidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCkge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEludDY0KSkgcmV0dXJuIG5ldyBJbnQ2NChidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCk7XG4gICAgICByZXR1cm4gaW5pdCh0aGlzLCBidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCk7XG4gICAgfVxuXG4gICAgLy8gaXNVaW50NjRCRSwgaXNJbnQ2NEJFXG4gICAgZnVuY3Rpb24gaXNJbnQ2NChiKSB7XG4gICAgICByZXR1cm4gISEoYiAmJiBiW19pc0ludDY0XSk7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGl6ZXJcbiAgICBmdW5jdGlvbiBpbml0KHRoYXQsIGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KSB7XG4gICAgICBpZiAoVUlOVDhBUlJBWSAmJiBBUlJBWUJVRkZFUikge1xuICAgICAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgQVJSQVlCVUZGRVIpIGJ1ZmZlciA9IG5ldyBVSU5UOEFSUkFZKGJ1ZmZlcik7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFSUkFZQlVGRkVSKSB2YWx1ZSA9IG5ldyBVSU5UOEFSUkFZKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW50NjRCRSgpIHN0eWxlXG4gICAgICBpZiAoIWJ1ZmZlciAmJiAhb2Zmc2V0ICYmICF2YWx1ZSAmJiAhc3RvcmFnZSkge1xuICAgICAgICAvLyBzaG9ydGN1dCB0byBpbml0aWFsaXplIHdpdGggemVyb1xuICAgICAgICB0aGF0LmJ1ZmZlciA9IG5ld0FycmF5KFpFUk8sIDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEludDY0QkUodmFsdWUsIHJhZGRpeCkgc3R5bGVcbiAgICAgIGlmICghaXNWYWxpZEJ1ZmZlcihidWZmZXIsIG9mZnNldCkpIHtcbiAgICAgICAgdmFyIF9zdG9yYWdlID0gc3RvcmFnZSB8fCBBcnJheTtcbiAgICAgICAgcmFkZGl4ID0gb2Zmc2V0O1xuICAgICAgICB2YWx1ZSA9IGJ1ZmZlcjtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgYnVmZmVyID0gbmV3IF9zdG9yYWdlKDgpO1xuICAgICAgfVxuXG4gICAgICB0aGF0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoYXQub2Zmc2V0ID0gb2Zmc2V0IHw9IDA7XG5cbiAgICAgIC8vIEludDY0QkUoYnVmZmVyLCBvZmZzZXQpIHN0eWxlXG4gICAgICBpZiAoVU5ERUZJTkVEID09PSB0eXBlb2YgdmFsdWUpIHJldHVybjtcblxuICAgICAgLy8gSW50NjRCRShidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCkgc3R5bGVcbiAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgZnJvbVN0cmluZyhidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCB8fCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKGlzVmFsaWRCdWZmZXIodmFsdWUsIHJhZGRpeCkpIHtcbiAgICAgICAgZnJvbUFycmF5KGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KTtcbiAgICAgIH0gZWxzZSBpZiAoXCJudW1iZXJcIiA9PT0gdHlwZW9mIHJhZGRpeCkge1xuICAgICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCwgdmFsdWUpOyAvLyBoaWdoXG4gICAgICAgIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NMLCByYWRkaXgpOyAvLyBsb3dcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIGZyb21Qb3NpdGl2ZShidWZmZXIsIG9mZnNldCwgdmFsdWUpOyAvLyBwb3NpdGl2ZVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgZnJvbU5lZ2F0aXZlKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSk7IC8vIG5lZ2F0aXZlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcm9tQXJyYXkoYnVmZmVyLCBvZmZzZXQsIFpFUk8sIDApOyAvLyB6ZXJvLCBOYU4gYW5kIG90aGVyc1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb21TdHJpbmcoYnVmZmVyLCBvZmZzZXQsIHN0ciwgcmFkZGl4KSB7XG4gICAgICB2YXIgcG9zID0gMDtcbiAgICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuICAgICAgdmFyIGhpZ2ggPSAwO1xuICAgICAgdmFyIGxvdyA9IDA7XG4gICAgICBpZiAoc3RyWzBdID09PSBcIi1cIikgcG9zKys7XG4gICAgICB2YXIgc2lnbiA9IHBvcztcbiAgICAgIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICAgICAgdmFyIGNociA9IHBhcnNlSW50KHN0cltwb3MrK10sIHJhZGRpeCk7XG4gICAgICAgIGlmICghKGNociA+PSAwKSkgYnJlYWs7IC8vIE5hTlxuICAgICAgICBsb3cgPSBsb3cgKiByYWRkaXggKyBjaHI7XG4gICAgICAgIGhpZ2ggPSBoaWdoICogcmFkZGl4ICsgTWF0aC5mbG9vcihsb3cgLyBCSVQzMik7XG4gICAgICAgIGxvdyAlPSBCSVQzMjtcbiAgICAgIH1cbiAgICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpZ2ggPSB+aGlnaDtcbiAgICAgICAgaWYgKGxvdykge1xuICAgICAgICAgIGxvdyA9IEJJVDMyIC0gbG93O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZ2grKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0gsIGhpZ2gpO1xuICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wsIGxvdyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9OdW1iZXIoKSB7XG4gICAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgaGlnaCA9IHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0gpO1xuICAgICAgdmFyIGxvdyA9IHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wpO1xuICAgICAgaWYgKCF1bnNpZ25lZCkgaGlnaCB8PSAwOyAvLyBhIHRyaWNrIHRvIGdldCBzaWduZWRcbiAgICAgIHJldHVybiBoaWdoID8gKGhpZ2ggKiBCSVQzMiArIGxvdykgOiBsb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcocmFkaXgpIHtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHZhciBoaWdoID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCk7XG4gICAgICB2YXIgbG93ID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCk7XG4gICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgIHZhciBzaWduID0gIXVuc2lnbmVkICYmIChoaWdoICYgMHg4MDAwMDAwMCk7XG4gICAgICBpZiAoc2lnbikge1xuICAgICAgICBoaWdoID0gfmhpZ2g7XG4gICAgICAgIGxvdyA9IEJJVDMyIC0gbG93O1xuICAgICAgfVxuICAgICAgcmFkaXggPSByYWRpeCB8fCAxMDtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHZhciBtb2QgPSAoaGlnaCAlIHJhZGl4KSAqIEJJVDMyICsgbG93O1xuICAgICAgICBoaWdoID0gTWF0aC5mbG9vcihoaWdoIC8gcmFkaXgpO1xuICAgICAgICBsb3cgPSBNYXRoLmZsb29yKG1vZCAvIHJhZGl4KTtcbiAgICAgICAgc3RyID0gKG1vZCAlIHJhZGl4KS50b1N0cmluZyhyYWRpeCkgKyBzdHI7XG4gICAgICAgIGlmICghaGlnaCAmJiAhbG93KSBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChzaWduKSB7XG4gICAgICAgIHN0ciA9IFwiLVwiICsgc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczNdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID4+IDg7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zMl0gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gODtcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MxXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgPSB2YWx1ZSA+PiA4O1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczBdID0gdmFsdWUgJiAyNTU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gKGJ1ZmZlcltvZmZzZXQgKyBwb3MwXSAqIEJJVDI0KSArXG4gICAgICAgIChidWZmZXJbb2Zmc2V0ICsgcG9zMV0gPDwgMTYpICtcbiAgICAgICAgKGJ1ZmZlcltvZmZzZXQgKyBwb3MyXSA8PCA4KSArXG4gICAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MzXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b0FycmF5KHJhdykge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgc3RvcmFnZSA9IG51bGw7IC8vIEFycmF5XG4gICAgaWYgKHJhdyAhPT0gZmFsc2UgJiYgb2Zmc2V0ID09PSAwICYmIGJ1ZmZlci5sZW5ndGggPT09IDggJiYgaXNBcnJheShidWZmZXIpKSByZXR1cm4gYnVmZmVyO1xuICAgIHJldHVybiBuZXdBcnJheShidWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0J1ZmZlcihyYXcpIHtcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHN0b3JhZ2UgPSBCVUZGRVI7XG4gICAgaWYgKHJhdyAhPT0gZmFsc2UgJiYgb2Zmc2V0ID09PSAwICYmIGJ1ZmZlci5sZW5ndGggPT09IDggJiYgQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcikpIHJldHVybiBidWZmZXI7XG4gICAgdmFyIGRlc3QgPSBuZXcgQlVGRkVSKDgpO1xuICAgIGZyb21BcnJheShkZXN0LCAwLCBidWZmZXIsIG9mZnNldCk7XG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiB0b0FycmF5QnVmZmVyKHJhdykge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGFycmJ1ZiA9IGJ1ZmZlci5idWZmZXI7XG4gICAgc3RvcmFnZSA9IFVJTlQ4QVJSQVk7XG4gICAgaWYgKHJhdyAhPT0gZmFsc2UgJiYgb2Zmc2V0ID09PSAwICYmIChhcnJidWYgaW5zdGFuY2VvZiBBUlJBWUJVRkZFUikgJiYgYXJyYnVmLmJ5dGVMZW5ndGggPT09IDgpIHJldHVybiBhcnJidWY7XG4gICAgdmFyIGRlc3QgPSBuZXcgVUlOVDhBUlJBWSg4KTtcbiAgICBmcm9tQXJyYXkoZGVzdCwgMCwgYnVmZmVyLCBvZmZzZXQpO1xuICAgIHJldHVybiBkZXN0LmJ1ZmZlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWRCdWZmZXIoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICB2YXIgbGVuID0gYnVmZmVyICYmIGJ1ZmZlci5sZW5ndGg7XG4gICAgb2Zmc2V0IHw9IDA7XG4gICAgcmV0dXJuIGxlbiAmJiAob2Zmc2V0ICsgOCA8PSBsZW4pICYmIChcInN0cmluZ1wiICE9PSB0eXBlb2YgYnVmZmVyW29mZnNldF0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJvbUFycmF5KGRlc3RidWYsIGRlc3RvZmYsIHNyY2J1Ziwgc3Jjb2ZmKSB7XG4gICAgZGVzdG9mZiB8PSAwO1xuICAgIHNyY29mZiB8PSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICBkZXN0YnVmW2Rlc3RvZmYrK10gPSBzcmNidWZbc3Jjb2ZmKytdICYgMjU1O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld0FycmF5KGJ1ZmZlciwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1ZmZlciwgb2Zmc2V0LCBvZmZzZXQgKyA4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21Qb3NpdGl2ZUJFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBwb3MgPSBvZmZzZXQgKyA4O1xuICAgIHdoaWxlIChwb3MgPiBvZmZzZXQpIHtcbiAgICAgIGJ1ZmZlclstLXBvc10gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlIC89IDI1NjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tTmVnYXRpdmVCRShidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICB2YXIgcG9zID0gb2Zmc2V0ICsgODtcbiAgICB2YWx1ZSsrO1xuICAgIHdoaWxlIChwb3MgPiBvZmZzZXQpIHtcbiAgICAgIGJ1ZmZlclstLXBvc10gPSAoKC12YWx1ZSkgJiAyNTUpIF4gMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21Qb3NpdGl2ZUxFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBlbmQgPSBvZmZzZXQgKyA4O1xuICAgIHdoaWxlIChvZmZzZXQgPCBlbmQpIHtcbiAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlIC89IDI1NjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tTmVnYXRpdmVMRShidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICB2YXIgZW5kID0gb2Zmc2V0ICsgODtcbiAgICB2YWx1ZSsrO1xuICAgIHdoaWxlIChvZmZzZXQgPCBlbmQpIHtcbiAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAoKC12YWx1ZSkgJiAyNTUpIF4gMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yZXRyb2ZveC9pcy1hcnJheVxuICBmdW5jdGlvbiBfaXNBcnJheSh2YWwpIHtcbiAgICByZXR1cm4gISF2YWwgJiYgXCJbb2JqZWN0IEFycmF5XVwiID09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpO1xuICB9XG5cbn0odHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJyA/IGV4cG9ydHMgOiAodGhpcyB8fCB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ludDY0LWJ1ZmZlci9pbnQ2NC1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYnJvd3Nlci5qc1xuXG5leHBvcnRzLmVuY29kZSA9IHJlcXVpcmUoXCIuL2VuY29kZVwiKS5lbmNvZGU7XG5leHBvcnRzLmRlY29kZSA9IHJlcXVpcmUoXCIuL2RlY29kZVwiKS5kZWNvZGU7XG5cbmV4cG9ydHMuRW5jb2RlciA9IHJlcXVpcmUoXCIuL2VuY29kZXJcIikuRW5jb2RlcjtcbmV4cG9ydHMuRGVjb2RlciA9IHJlcXVpcmUoXCIuL2RlY29kZXJcIikuRGVjb2RlcjtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IHJlcXVpcmUoXCIuL2V4dFwiKS5jcmVhdGVDb2RlYztcbmV4cG9ydHMuY29kZWMgPSByZXF1aXJlKFwiLi9jb2RlY1wiKS5jb2RlYztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJ1ZmZlcmlzaC1wcm90by5qc1xuXG4vKiBqc2hpbnQgZXFudWxsOnRydWUgKi9cblxudmFyIEJ1ZmZlckxpdGUgPSByZXF1aXJlKFwiLi9idWZmZXItbGl0ZVwiKTtcblxuZXhwb3J0cy5jb3B5ID0gY29weTtcbmV4cG9ydHMuc2xpY2UgPSBzbGljZTtcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbmV4cG9ydHMud3JpdGUgPSBnZW4oXCJ3cml0ZVwiKTtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xuXG52YXIgaXNCdWZmZXJTaGltID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiAoXCJUWVBFRF9BUlJBWV9TVVBQT1JUXCIgaW4gQnVmZmVyKTtcbnZhciBicm9rZW5UeXBlZEFycmF5ID0gaXNCdWZmZXJTaGltICYmICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVDtcblxuLyoqXG4gKiBAcGFyYW0gdGFyZ2V0IHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqIEBwYXJhbSBbdGFyZ2V0U3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gY29weSh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0aGlzSXNCdWZmZXIgPSBCdWZmZXJpc2guaXNCdWZmZXIodGhpcyk7XG4gIHZhciB0YXJnZXRJc0J1ZmZlciA9IEJ1ZmZlcmlzaC5pc0J1ZmZlcih0YXJnZXQpO1xuICBpZiAodGhpc0lzQnVmZmVyICYmIHRhcmdldElzQnVmZmVyKSB7XG4gICAgLy8gQnVmZmVyIHRvIEJ1ZmZlclxuICAgIHJldHVybiB0aGlzLmNvcHkodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCk7XG4gIH0gZWxzZSBpZiAoIWJyb2tlblR5cGVkQXJyYXkgJiYgIXRoaXNJc0J1ZmZlciAmJiAhdGFyZ2V0SXNCdWZmZXIgJiZcbiAgICBCdWZmZXJpc2guaXNWaWV3KHRoaXMpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodGFyZ2V0KSkge1xuICAgIC8vIFVpbnQ4QXJyYXkgdG8gVWludDhBcnJheSAoZXhjZXB0IGZvciBtaW5vciBzb21lIGJyb3dzZXJzKVxuICAgIHZhciBidWZmZXIgPSAoc3RhcnQgfHwgZW5kICE9IG51bGwpID8gc2xpY2UuY2FsbCh0aGlzLCBzdGFydCwgZW5kKSA6IHRoaXM7XG4gICAgdGFyZ2V0LnNldChidWZmZXIsIHRhcmdldFN0YXJ0KTtcbiAgICByZXR1cm4gYnVmZmVyLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlciBjYXNlc1xuICAgIHJldHVybiBCdWZmZXJMaXRlLmNvcHkuY2FsbCh0aGlzLCB0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gIC8vIGZvciBCdWZmZXIsIFVpbnQ4QXJyYXkgKGV4Y2VwdCBmb3IgbWlub3Igc29tZSBicm93c2VycykgYW5kIEFycmF5XG4gIHZhciBmID0gdGhpcy5zbGljZSB8fCAoIWJyb2tlblR5cGVkQXJyYXkgJiYgdGhpcy5zdWJhcnJheSk7XG4gIGlmIChmKSByZXR1cm4gZi5jYWxsKHRoaXMsIHN0YXJ0LCBlbmQpO1xuXG4gIC8vIFVpbnQ4QXJyYXkgKGZvciBtaW5vciBzb21lIGJyb3dzZXJzKVxuICB2YXIgdGFyZ2V0ID0gQnVmZmVyaXNoLmFsbG9jLmNhbGwodGhpcywgZW5kIC0gc3RhcnQpO1xuICBjb3B5LmNhbGwodGhpcywgdGFyZ2V0LCAwLCBzdGFydCwgZW5kKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nKClcbiAqXG4gKiBAcGFyYW0gW2VuY29kaW5nXSB7U3RyaW5nfSBpZ25vcmVkXG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBmID0gKCFpc0J1ZmZlclNoaW0gJiYgQnVmZmVyaXNoLmlzQnVmZmVyKHRoaXMpKSA/IHRoaXMudG9TdHJpbmcgOiBCdWZmZXJMaXRlLnRvU3RyaW5nO1xuICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2VuKG1ldGhvZCkge1xuICByZXR1cm4gd3JhcDtcblxuICBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBmID0gdGhpc1ttZXRob2RdIHx8IEJ1ZmZlckxpdGVbbWV0aG9kXTtcbiAgICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtcHJvdG8uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGV4dC1idWZmZXIuanNcblxuZXhwb3J0cy5FeHRCdWZmZXIgPSBFeHRCdWZmZXI7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbmZ1bmN0aW9uIEV4dEJ1ZmZlcihidWZmZXIsIHR5cGUpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEV4dEJ1ZmZlcikpIHJldHVybiBuZXcgRXh0QnVmZmVyKGJ1ZmZlciwgdHlwZSk7XG4gIHRoaXMuYnVmZmVyID0gQnVmZmVyaXNoLmZyb20oYnVmZmVyKTtcbiAgdGhpcy50eXBlID0gdHlwZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2V4dC1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlYWQtY29yZS5qc1xuXG52YXIgRXh0QnVmZmVyID0gcmVxdWlyZShcIi4vZXh0LWJ1ZmZlclwiKS5FeHRCdWZmZXI7XG52YXIgRXh0VW5wYWNrZXIgPSByZXF1aXJlKFwiLi9leHQtdW5wYWNrZXJcIik7XG52YXIgcmVhZFVpbnQ4ID0gcmVxdWlyZShcIi4vcmVhZC1mb3JtYXRcIikucmVhZFVpbnQ4O1xudmFyIFJlYWRUb2tlbiA9IHJlcXVpcmUoXCIuL3JlYWQtdG9rZW5cIik7XG52YXIgQ29kZWNCYXNlID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKTtcblxuQ29kZWNCYXNlLmluc3RhbGwoe1xuICBhZGRFeHRVbnBhY2tlcjogYWRkRXh0VW5wYWNrZXIsXG4gIGdldEV4dFVucGFja2VyOiBnZXRFeHRVbnBhY2tlcixcbiAgaW5pdDogaW5pdFxufSk7XG5cbmV4cG9ydHMucHJlc2V0ID0gaW5pdC5jYWxsKENvZGVjQmFzZS5wcmVzZXQpO1xuXG5mdW5jdGlvbiBnZXREZWNvZGVyKG9wdGlvbnMpIHtcbiAgdmFyIHJlYWRUb2tlbiA9IFJlYWRUb2tlbi5nZXRSZWFkVG9rZW4ob3B0aW9ucyk7XG4gIHJldHVybiBkZWNvZGU7XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGRlY29kZXIpIHtcbiAgICB2YXIgdHlwZSA9IHJlYWRVaW50OChkZWNvZGVyKTtcbiAgICB2YXIgZnVuYyA9IHJlYWRUb2tlblt0eXBlXTtcbiAgICBpZiAoIWZ1bmMpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZTogXCIgKyAodHlwZSA/IChcIjB4XCIgKyB0eXBlLnRvU3RyaW5nKDE2KSkgOiB0eXBlKSk7XG4gICAgcmV0dXJuIGZ1bmMoZGVjb2Rlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gIHRoaXMuZGVjb2RlID0gZ2V0RGVjb2RlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByZXNldCkge1xuICAgIEV4dFVucGFja2VyLnNldEV4dFVucGFja2Vycyh0aGlzKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBhZGRFeHRVbnBhY2tlcihldHlwZSwgdW5wYWNrZXIpIHtcbiAgdmFyIHVucGFja2VycyA9IHRoaXMuZXh0VW5wYWNrZXJzIHx8ICh0aGlzLmV4dFVucGFja2VycyA9IFtdKTtcbiAgdW5wYWNrZXJzW2V0eXBlXSA9IENvZGVjQmFzZS5maWx0ZXIodW5wYWNrZXIpO1xufVxuXG5mdW5jdGlvbiBnZXRFeHRVbnBhY2tlcih0eXBlKSB7XG4gIHZhciB1bnBhY2tlcnMgPSB0aGlzLmV4dFVucGFja2VycyB8fCAodGhpcy5leHRVbnBhY2tlcnMgPSBbXSk7XG4gIHJldHVybiB1bnBhY2tlcnNbdHlwZV0gfHwgZXh0VW5wYWNrZXI7XG5cbiAgZnVuY3Rpb24gZXh0VW5wYWNrZXIoYnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBFeHRCdWZmZXIoYnVmZmVyLCB0eXBlKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvcmVhZC1jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS1jb3JlLmpzXG5cbnZhciBFeHRCdWZmZXIgPSByZXF1aXJlKFwiLi9leHQtYnVmZmVyXCIpLkV4dEJ1ZmZlcjtcbnZhciBFeHRQYWNrZXIgPSByZXF1aXJlKFwiLi9leHQtcGFja2VyXCIpO1xudmFyIFdyaXRlVHlwZSA9IHJlcXVpcmUoXCIuL3dyaXRlLXR5cGVcIik7XG52YXIgQ29kZWNCYXNlID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKTtcblxuQ29kZWNCYXNlLmluc3RhbGwoe1xuICBhZGRFeHRQYWNrZXI6IGFkZEV4dFBhY2tlcixcbiAgZ2V0RXh0UGFja2VyOiBnZXRFeHRQYWNrZXIsXG4gIGluaXQ6IGluaXRcbn0pO1xuXG5leHBvcnRzLnByZXNldCA9IGluaXQuY2FsbChDb2RlY0Jhc2UucHJlc2V0KTtcblxuZnVuY3Rpb24gZ2V0RW5jb2RlcihvcHRpb25zKSB7XG4gIHZhciB3cml0ZVR5cGUgPSBXcml0ZVR5cGUuZ2V0V3JpdGVUeXBlKG9wdGlvbnMpO1xuICByZXR1cm4gZW5jb2RlO1xuXG4gIGZ1bmN0aW9uIGVuY29kZShlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBmdW5jID0gd3JpdGVUeXBlW3R5cGVvZiB2YWx1ZV07XG4gICAgaWYgKCFmdW5jKSB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB0eXBlIFxcXCJcIiArICh0eXBlb2YgdmFsdWUpICsgXCJcXFwiOiBcIiArIHZhbHVlKTtcbiAgICBmdW5jKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgdGhpcy5lbmNvZGUgPSBnZXRFbmNvZGVyKG9wdGlvbnMpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJlc2V0KSB7XG4gICAgRXh0UGFja2VyLnNldEV4dFBhY2tlcnModGhpcyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gYWRkRXh0UGFja2VyKGV0eXBlLCBDbGFzcywgcGFja2VyKSB7XG4gIHBhY2tlciA9IENvZGVjQmFzZS5maWx0ZXIocGFja2VyKTtcbiAgdmFyIG5hbWUgPSBDbGFzcy5uYW1lO1xuICBpZiAobmFtZSAmJiBuYW1lICE9PSBcIk9iamVjdFwiKSB7XG4gICAgdmFyIHBhY2tlcnMgPSB0aGlzLmV4dFBhY2tlcnMgfHwgKHRoaXMuZXh0UGFja2VycyA9IHt9KTtcbiAgICBwYWNrZXJzW25hbWVdID0gZXh0UGFja2VyO1xuICB9IGVsc2Uge1xuICAgIC8vIGZhbGxiYWNrIGZvciBJRVxuICAgIHZhciBsaXN0ID0gdGhpcy5leHRFbmNvZGVyTGlzdCB8fCAodGhpcy5leHRFbmNvZGVyTGlzdCA9IFtdKTtcbiAgICBsaXN0LnVuc2hpZnQoW0NsYXNzLCBleHRQYWNrZXJdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dFBhY2tlcih2YWx1ZSkge1xuICAgIGlmIChwYWNrZXIpIHZhbHVlID0gcGFja2VyKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEV4dEJ1ZmZlcih2YWx1ZSwgZXR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEV4dFBhY2tlcih2YWx1ZSkge1xuICB2YXIgcGFja2VycyA9IHRoaXMuZXh0UGFja2VycyB8fCAodGhpcy5leHRQYWNrZXJzID0ge30pO1xuICB2YXIgYyA9IHZhbHVlLmNvbnN0cnVjdG9yO1xuICB2YXIgZSA9IGMgJiYgYy5uYW1lICYmIHBhY2tlcnNbYy5uYW1lXTtcbiAgaWYgKGUpIHJldHVybiBlO1xuXG4gIC8vIGZhbGxiYWNrIGZvciBJRVxuICB2YXIgbGlzdCA9IHRoaXMuZXh0RW5jb2Rlckxpc3QgfHwgKHRoaXMuZXh0RW5jb2Rlckxpc3QgPSBbXSk7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBwYWlyID0gbGlzdFtpXTtcbiAgICBpZiAoYyA9PT0gcGFpclswXSkgcmV0dXJuIHBhaXJbMV07XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLWNvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgTWF0aGlldSBUdXJjb3R0ZVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvY2hlY2tzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3ByZWNvbmQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFNsb3RMaXN0XzEgPSByZXF1aXJlKFwiLi9TbG90TGlzdFwiKTtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9TbG90XCIpO1xuLyoqXG4gKiBBbGxvd3MgdGhlIHZhbHVlQ2xhc3NlcyB0byBiZSBzZXQgaW4gTVhNTCwgZS5nLlxuICogPHNpZ25hbHM6U2lnbmFsIGlkPVwibmFtZUNoYW5nZWRcIj57W1N0cmluZywgdWludF19PC9zaWduYWxzOlNpZ25hbD5cbiAqL1xuLypbRGVmYXVsdFByb3BlcnR5KFwidmFsdWVDbGFzc2VzXCIpXSovXG4vKipcbiAqIFNpZ25hbCBkaXNwYXRjaGVzIGV2ZW50cyB0byBtdWx0aXBsZSBsaXN0ZW5lcnMuXG4gKiBJdCBpcyBpbnNwaXJlZCBieSBDIyBldmVudHMgYW5kIGRlbGVnYXRlcywgYW5kIGJ5XG4gKiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU2lnbmFsc19hbmRfc2xvdHNcIj5zaWduYWxzIGFuZCBzbG90czwvYT5cbiAqIGluIFF0LlxuICogQSBTaWduYWwgYWRkcyBldmVudCBkaXNwYXRjaGluZyBmdW5jdGlvbmFsaXR5IHRocm91Z2ggY29tcG9zaXRpb24gYW5kIGludGVyZmFjZXMsXG4gKiByYXRoZXIgdGhhbiBpbmhlcml0aW5nIGZyb20gYSBkaXNwYXRjaGVyLlxuICogPGJyLz48YnIvPlxuICogUHJvamVjdCBob21lOiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy9cIj5odHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvPC9hPlxuICovXG52YXIgT25jZVNpZ25hbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNpZ25hbCBpbnN0YW5jZSB0byBkaXNwYXRjaCB2YWx1ZSBvYmplY3RzLlxuICAgICAqIEBwYXJhbSAgICB2YWx1ZUNsYXNzZXMgQW55IG51bWJlciBvZiBjbGFzcyByZWZlcmVuY2VzIHRoYXQgZW5hYmxlIHR5cGUgY2hlY2tzIGluIGRpc3BhdGNoKCkuXG4gICAgICogRm9yIGV4YW1wbGUsIG5ldyBTaWduYWwoU3RyaW5nLCB1aW50KVxuICAgICAqIHdvdWxkIGFsbG93OiBzaWduYWwuZGlzcGF0Y2goXCJ0aGUgQW5zd2VyXCIsIDQyKVxuICAgICAqIGJ1dCBub3Q6IHNpZ25hbC5kaXNwYXRjaCh0cnVlLCA0Mi41KVxuICAgICAqIG5vcjogc2lnbmFsLmRpc3BhdGNoKClcbiAgICAgKlxuICAgICAqIE5PVEU6IEluIEFTMywgc3ViY2xhc3NlcyBjYW5ub3QgY2FsbCBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLFxuICAgICAqIGJ1dCB0aGlzIGNvbnN0cnVjdG9yIGhhcyBsb2dpYyB0byBzdXBwb3J0IHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gT25jZVNpZ25hbCgpIHtcbiAgICAgICAgdmFyIHZhbHVlQ2xhc3NlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVDbGFzc2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbG90cyA9IFNsb3RMaXN0XzEuU2xvdExpc3QuTklMO1xuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHRoaXMudmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPbmNlU2lnbmFsLnByb3RvdHlwZSwgXCJ2YWx1ZUNsYXNzZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogaXRlbSBhdCBpbmRleCBzaG91bGQgYmUgYSBDbGFzcyBidXQgd2FzIG5vdC5cbiAgICAgICAgICovXG4gICAgICAgIC8qW0FycmF5RWxlbWVudFR5cGUoXCJDbGFzc1wiKV0qL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBDbG9uZSBzbyB0aGUgQXJyYXkgY2Fubm90IGJlIGFmZmVjdGVkIGZyb20gb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2xhc3NlcyA9IHZhbHVlID8gdmFsdWUuc2xpY2UoKSA6IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl92YWx1ZUNsYXNzZXNbaV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZUNsYXNzZXMgYXJndW1lbnQ6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW0gYXQgaW5kZXggJyArIGkgKyAnIHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXM6PCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSk7IC8vQENIQU5HRUQgLSB0ZW1wIHJlcGxhY2VtZW50IGZvciBnZXRRdWFsaWZpZWRDbGFzc0J5TmFtZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT25jZVNpZ25hbC5wcm90b3R5cGUsIFwibnVtTGlzdGVuZXJzXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdHMubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLmFkZE9uY2UgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIHNsb3QgPSB0aGlzLnNsb3RzLmZpbmQobGlzdGVuZXIpO1xuICAgICAgICBpZiAoIXNsb3QpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5zbG90cyA9IHRoaXMuc2xvdHMuZmlsdGVyTm90KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHNsb3Q7XG4gICAgfTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2xvdHMgPSBTbG90TGlzdF8xLlNsb3RMaXN0Lk5JTDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdmFsdWVDbGFzc2VzIGlzIGVtcHR5LCB2YWx1ZSBvYmplY3RzIGFyZSBub3QgdHlwZS1jaGVja2VkLlxuICAgICAgICB2YXIgbnVtVmFsdWVDbGFzc2VzID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBmZXdlciBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA8IG51bVZhbHVlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGF0IGxlYXN0ICcgKyBudW1WYWx1ZUNsYXNzZXMgKyAnIGJ1dCByZWNlaXZlZCAnICtcbiAgICAgICAgICAgICAgICBudW1WYWx1ZU9iamVjdHMgKyAnLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBkaWZmZXJlbnRseSB0eXBlZCBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1WYWx1ZUNsYXNzZXM7IGkrKykge1xuICAgICAgICAgICAgLy8gT3B0aW1pemVkIGZvciB0aGUgb3B0aW1pc3RpYyBjYXNlIHRoYXQgdmFsdWVzIGFyZSBjb3JyZWN0LlxuICAgICAgICAgICAgaWYgKHZhbHVlT2JqZWN0c1tpXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICh2YWx1ZU9iamVjdHNbaV0gaW5zdGFuY2VvZiB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gfHwgdmFsdWVPYmplY3RzW2ldLmNvbnN0cnVjdG9yID09PSB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG9iamVjdCA8JyArIHZhbHVlT2JqZWN0c1tpXVxuICAgICAgICAgICAgICAgICsgJz4gaXMgbm90IGFuIGluc3RhbmNlIG9mIDwnICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRvIGxpc3RlbmVycy5cbiAgICAgICAgdmFyIHNsb3RzVG9Qcm9jZXNzID0gdGhpcy5zbG90cztcbiAgICAgICAgaWYgKHNsb3RzVG9Qcm9jZXNzLm5vbkVtcHR5KSB7XG4gICAgICAgICAgICB3aGlsZSAoc2xvdHNUb1Byb2Nlc3Mubm9uRW1wdHkpIHtcbiAgICAgICAgICAgICAgICBzbG90c1RvUHJvY2Vzcy5oZWFkLmV4ZWN1dGUodmFsdWVPYmplY3RzKTtcbiAgICAgICAgICAgICAgICBzbG90c1RvUHJvY2VzcyA9IHNsb3RzVG9Qcm9jZXNzLnRhaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uUG9zc2libGUobGlzdGVuZXIsIG9uY2UpKSB7XG4gICAgICAgICAgICB2YXIgbmV3U2xvdCA9IG5ldyBTbG90XzEuU2xvdChsaXN0ZW5lciwgdGhpcywgb25jZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzID0gdGhpcy5zbG90cy5wcmVwZW5kKG5ld1Nsb3QpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1Nsb3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdHMuZmluZChsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZWdpc3RyYXRpb25Qb3NzaWJsZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSkge1xuICAgICAgICBpZiAoIXRoaXMuc2xvdHMubm9uRW1wdHkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIGV4aXN0aW5nU2xvdCA9IHRoaXMuc2xvdHMuZmluZChsaXN0ZW5lcik7XG4gICAgICAgIGlmICghZXhpc3RpbmdTbG90KVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChleGlzdGluZ1Nsb3Qub25jZSAhPSBvbmNlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgd2FzIHByZXZpb3VzbHkgYWRkZWQsIGRlZmluaXRlbHkgZG9uJ3QgYWRkIGl0IGFnYWluLlxuICAgICAgICAgICAgLy8gQnV0IHRocm93IGFuIGV4Y2VwdGlvbiBpZiB0aGVpciBvbmNlIHZhbHVlcyBkaWZmZXIuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gTGlzdGVuZXIgd2FzIGFscmVhZHkgcmVnaXN0ZXJlZC5cbiAgICB9O1xuICAgIHJldHVybiBPbmNlU2lnbmFsO1xufSgpKTtcbmV4cG9ydHMuT25jZVNpZ25hbCA9IE9uY2VTaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PbmNlU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc2lnbmFsc19qc18xID0gcmVxdWlyZShcInNpZ25hbHMuanNcIik7XG52YXIgQ2xvY2sgPSByZXF1aXJlKFwiY2xvY2suanNcIik7XG52YXIgZGVsdGFfbGlzdGVuZXJfMSA9IHJlcXVpcmUoXCJkZWx0YS1saXN0ZW5lclwiKTtcbnZhciBtc2dwYWNrID0gcmVxdWlyZShcIm1zZ3BhY2stbGl0ZVwiKTtcbnZhciBmb3NzaWxEZWx0YSA9IHJlcXVpcmUoXCJmb3NzaWwtZGVsdGFcIik7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xudmFyIFJvb20gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb29tLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvb20obmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB7fSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2xvY2sgPSBuZXcgQ2xvY2soKTsgLy8gZXhwZXJpbWVudGFsXG4gICAgICAgIF90aGlzLnJlbW90ZUNsb2NrID0gbmV3IENsb2NrKCk7IC8vIGV4cGVyaW1lbnRhbFxuICAgICAgICAvLyBQdWJsaWMgc2lnbmFsc1xuICAgICAgICBfdGhpcy5vbkpvaW4gPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5vblVwZGF0ZSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLm9uRGF0YSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLm9uRXJyb3IgPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5vbkxlYXZlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgX3RoaXMuaWQgPSBudWxsO1xuICAgICAgICBfdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgX3RoaXMub25MZWF2ZS5hZGQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7IH0pO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJvb20ucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2VDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5vbkxlYXZlLmRpc3BhdGNoKCk7IH07XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5vbk1lc3NhZ2VDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG1zZ3BhY2suZGVjb2RlKG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBtZXNzYWdlWzBdO1xuICAgICAgICBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgdGhpcy5vbkpvaW4uZGlzcGF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID09IFByb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9FUlJPUikge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX1NUQVRFKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBtZXNzYWdlWzJdO1xuICAgICAgICAgICAgdmFyIHJlbW90ZUN1cnJlbnRUaW1lID0gbWVzc2FnZVszXTtcbiAgICAgICAgICAgIHZhciByZW1vdGVFbGFwc2VkVGltZSA9IG1lc3NhZ2VbNF07XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCByZW1vdGVDdXJyZW50VGltZSwgcmVtb3RlRWxhcHNlZFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX1NUQVRFX1BBVENIKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX0RBVEEpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRhLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5MRUFWRV9ST09NKSB7XG4gICAgICAgICAgICB0aGlzLmxlYXZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCByZW1vdGVDdXJyZW50VGltZSwgcmVtb3RlRWxhcHNlZFRpbWUpIHtcbiAgICAgICAgdGhpcy5zZXQoc3RhdGUpO1xuICAgICAgICB0aGlzLl9wcmV2aW91c1N0YXRlID0gbXNncGFjay5lbmNvZGUoc3RhdGUpO1xuICAgICAgICAvLyBzZXQgcmVtb3RlIGNsb2NrIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHJlbW90ZUN1cnJlbnRUaW1lICYmIHJlbW90ZUVsYXBzZWRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmN1cnJlbnRUaW1lID0gcmVtb3RlQ3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmVsYXBzZWRUaW1lID0gcmVtb3RlRWxhcHNlZFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHN0YXRlKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKGJpbmFyeVBhdGNoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjbGllbnQtc2lkZSBwaW5nXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBwYXRjaFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAodGhpcy5sYXN0UGF0Y2hUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmcgPSBwYXRjaFRpbWUgLSB0aGlzLmxhc3RQYXRjaFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0UGF0Y2hUaW1lID0gcGF0Y2hUaW1lO1xuICAgICAgICB0aGlzLmNsb2NrLnRpY2soKTtcbiAgICAgICAgLy8gYXBwbHkgcGF0Y2hcbiAgICAgICAgdGhpcy5fcHJldmlvdXNTdGF0ZSA9IGZvc3NpbERlbHRhLmFwcGx5KHRoaXMuX3ByZXZpb3VzU3RhdGUsIGJpbmFyeVBhdGNoKTtcbiAgICAgICAgLy8gdHJpZ2dlciBzdGF0ZSBjYWxsYmFja3NcbiAgICAgICAgdGhpcy5zZXQobXNncGFjay5kZWNvZGUodGhpcy5fcHJldmlvdXNTdGF0ZSkpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHRoaXMuZGF0YSk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5sZWF2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoW1Byb3RvY29sXzEuUHJvdG9jb2wuUk9PTV9EQVRBLCB0aGlzLmlkLCBkYXRhXSk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMub25Kb2luLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uRGF0YS5yZW1vdmVBbGwoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uTGVhdmUucmVtb3ZlQWxsKCk7XG4gICAgfTtcbiAgICByZXR1cm4gUm9vbTtcbn0oZGVsdGFfbGlzdGVuZXJfMS5EZWx0YUNvbnRhaW5lcikpO1xuZXhwb3J0cy5Sb29tID0gUm9vbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1Jvb20udHNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDEyIE1hdGhpZXUgVHVyY290dGVcbi8vICAgICAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG52YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgcHJlY29uZCA9IHJlcXVpcmUoJ3ByZWNvbmQnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vLyBBIGNsYXNzIHRvIGhvbGQgdGhlIHN0YXRlIG9mIGEgYmFja29mZiBvcGVyYXRpb24uIEFjY2VwdHMgYSBiYWNrb2ZmIHN0cmF0ZWd5XG4vLyB0byBnZW5lcmF0ZSB0aGUgYmFja29mZiBkZWxheXMuXG5mdW5jdGlvbiBCYWNrb2ZmKGJhY2tvZmZTdHJhdGVneSkge1xuICAgIGV2ZW50cy5FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuYmFja29mZlN0cmF0ZWd5XyA9IGJhY2tvZmZTdHJhdGVneTtcbiAgICB0aGlzLm1heE51bWJlck9mUmV0cnlfID0gLTE7XG4gICAgdGhpcy5iYWNrb2ZmTnVtYmVyXyA9IDA7XG4gICAgdGhpcy5iYWNrb2ZmRGVsYXlfID0gMDtcbiAgICB0aGlzLnRpbWVvdXRJRF8gPSAtMTtcblxuICAgIHRoaXMuaGFuZGxlcnMgPSB7XG4gICAgICAgIGJhY2tvZmY6IHRoaXMub25CYWNrb2ZmXy5iaW5kKHRoaXMpXG4gICAgfTtcbn1cbnV0aWwuaW5oZXJpdHMoQmFja29mZiwgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cbi8vIFNldHMgYSBsaW1pdCwgZ3JlYXRlciB0aGFuIDAsIG9uIHRoZSBtYXhpbXVtIG51bWJlciBvZiBiYWNrb2Zmcy4gQSAnZmFpbCdcbi8vIGV2ZW50IHdpbGwgYmUgZW1pdHRlZCB3aGVuIHRoZSBsaW1pdCBpcyByZWFjaGVkLlxuQmFja29mZi5wcm90b3R5cGUuZmFpbEFmdGVyID0gZnVuY3Rpb24obWF4TnVtYmVyT2ZSZXRyeSkge1xuICAgIHByZWNvbmQuY2hlY2tBcmd1bWVudChtYXhOdW1iZXJPZlJldHJ5ID4gMCxcbiAgICAgICAgJ0V4cGVjdGVkIGEgbWF4aW11bSBudW1iZXIgb2YgcmV0cnkgZ3JlYXRlciB0aGFuIDAgYnV0IGdvdCAlcy4nLFxuICAgICAgICBtYXhOdW1iZXJPZlJldHJ5KTtcblxuICAgIHRoaXMubWF4TnVtYmVyT2ZSZXRyeV8gPSBtYXhOdW1iZXJPZlJldHJ5O1xufTtcblxuLy8gU3RhcnRzIGEgYmFja29mZiBvcGVyYXRpb24uIEFjY2VwdHMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRvIGxldCB0aGVcbi8vIGxpc3RlbmVycyBrbm93IHdoeSB0aGUgYmFja29mZiBvcGVyYXRpb24gd2FzIHN0YXJ0ZWQuXG5CYWNrb2ZmLnByb3RvdHlwZS5iYWNrb2ZmID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgcHJlY29uZC5jaGVja1N0YXRlKHRoaXMudGltZW91dElEXyA9PT0gLTEsICdCYWNrb2ZmIGluIHByb2dyZXNzLicpO1xuXG4gICAgaWYgKHRoaXMuYmFja29mZk51bWJlcl8gPT09IHRoaXMubWF4TnVtYmVyT2ZSZXRyeV8pIHtcbiAgICAgICAgdGhpcy5lbWl0KCdmYWlsJywgZXJyKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmFja29mZkRlbGF5XyA9IHRoaXMuYmFja29mZlN0cmF0ZWd5Xy5uZXh0KCk7XG4gICAgICAgIHRoaXMudGltZW91dElEXyA9IHNldFRpbWVvdXQodGhpcy5oYW5kbGVycy5iYWNrb2ZmLCB0aGlzLmJhY2tvZmZEZWxheV8pO1xuICAgICAgICB0aGlzLmVtaXQoJ2JhY2tvZmYnLCB0aGlzLmJhY2tvZmZOdW1iZXJfLCB0aGlzLmJhY2tvZmZEZWxheV8sIGVycik7XG4gICAgfVxufTtcblxuLy8gSGFuZGxlcyB0aGUgYmFja29mZiB0aW1lb3V0IGNvbXBsZXRpb24uXG5CYWNrb2ZmLnByb3RvdHlwZS5vbkJhY2tvZmZfID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50aW1lb3V0SURfID0gLTE7XG4gICAgdGhpcy5lbWl0KCdyZWFkeScsIHRoaXMuYmFja29mZk51bWJlcl8sIHRoaXMuYmFja29mZkRlbGF5Xyk7XG4gICAgdGhpcy5iYWNrb2ZmTnVtYmVyXysrO1xufTtcblxuLy8gU3RvcHMgYW55IGJhY2tvZmYgb3BlcmF0aW9uIGFuZCByZXNldHMgdGhlIGJhY2tvZmYgZGVsYXkgdG8gaXRzIGluaXRhbCB2YWx1ZS5cbkJhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5iYWNrb2ZmTnVtYmVyXyA9IDA7XG4gICAgdGhpcy5iYWNrb2ZmU3RyYXRlZ3lfLnJlc2V0KCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElEXyk7XG4gICAgdGhpcy50aW1lb3V0SURfID0gLTE7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmY7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFja29mZi9saWIvYmFja29mZi5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTIgTWF0aGlldSBUdXJjb3R0ZVxuLy8gICAgICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgQmFja29mZlN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9zdHJhdGVneScpO1xuXG4vLyBGaWJvbmFjY2kgYmFja29mZiBzdHJhdGVneS5cbmZ1bmN0aW9uIEZpYm9uYWNjaUJhY2tvZmZTdHJhdGVneShvcHRpb25zKSB7XG4gICAgQmFja29mZlN0cmF0ZWd5LmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5iYWNrb2ZmRGVsYXlfID0gMDtcbiAgICB0aGlzLm5leHRCYWNrb2ZmRGVsYXlfID0gdGhpcy5nZXRJbml0aWFsRGVsYXkoKTtcbn1cbnV0aWwuaW5oZXJpdHMoRmlib25hY2NpQmFja29mZlN0cmF0ZWd5LCBCYWNrb2ZmU3RyYXRlZ3kpO1xuXG5GaWJvbmFjY2lCYWNrb2ZmU3RyYXRlZ3kucHJvdG90eXBlLm5leHRfID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJhY2tvZmZEZWxheSA9IE1hdGgubWluKHRoaXMubmV4dEJhY2tvZmZEZWxheV8sIHRoaXMuZ2V0TWF4RGVsYXkoKSk7XG4gICAgdGhpcy5uZXh0QmFja29mZkRlbGF5XyArPSB0aGlzLmJhY2tvZmZEZWxheV87XG4gICAgdGhpcy5iYWNrb2ZmRGVsYXlfID0gYmFja29mZkRlbGF5O1xuICAgIHJldHVybiBiYWNrb2ZmRGVsYXk7XG59O1xuXG5GaWJvbmFjY2lCYWNrb2ZmU3RyYXRlZ3kucHJvdG90eXBlLnJlc2V0XyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubmV4dEJhY2tvZmZEZWxheV8gPSB0aGlzLmdldEluaXRpYWxEZWxheSgpO1xuICAgIHRoaXMuYmFja29mZkRlbGF5XyA9IDA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpYm9uYWNjaUJhY2tvZmZTdHJhdGVneTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWNrb2ZmL2xpYi9zdHJhdGVneS9maWJvbmFjY2kuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDEyIE1hdGhpZXUgVHVyY290dGVcbi8vICAgICAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG52YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuZnVuY3Rpb24gaXNEZWYodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuLy8gQWJzdHJhY3QgY2xhc3MgZGVmaW5pbmcgdGhlIHNrZWxldG9uIGZvciB0aGUgYmFja29mZiBzdHJhdGVnaWVzLiBBY2NlcHRzIGFuXG4vLyBvYmplY3QgaG9sZGluZyB0aGUgb3B0aW9ucyBmb3IgdGhlIGJhY2tvZmYgc3RyYXRlZ3k6XG4vL1xuLy8gICogYHJhbmRvbWlzYXRpb25GYWN0b3JgOiBUaGUgcmFuZG9taXNhdGlvbiBmYWN0b3Igd2hpY2ggbXVzdCBiZSBiZXR3ZWVuIDBcbi8vICAgICBhbmQgMSB3aGVyZSAxIGVxdWF0ZXMgdG8gYSByYW5kb21pemF0aW9uIGZhY3RvciBvZiAxMDAlIGFuZCAwIHRvIG5vXG4vLyAgICAgcmFuZG9taXphdGlvbi5cbi8vICAqIGBpbml0aWFsRGVsYXlgOiBUaGUgYmFja29mZiBpbml0aWFsIGRlbGF5IGluIG1pbGxpc2Vjb25kcy5cbi8vICAqIGBtYXhEZWxheWA6IFRoZSBiYWNrb2ZmIG1heGltYWwgZGVsYXkgaW4gbWlsbGlzZWNvbmRzLlxuZnVuY3Rpb24gQmFja29mZlN0cmF0ZWd5KG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmIChpc0RlZihvcHRpb25zLmluaXRpYWxEZWxheSkgJiYgb3B0aW9ucy5pbml0aWFsRGVsYXkgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluaXRpYWwgdGltZW91dCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLicpO1xuICAgIH0gZWxzZSBpZiAoaXNEZWYob3B0aW9ucy5tYXhEZWxheSkgJiYgb3B0aW9ucy5tYXhEZWxheSA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgbWF4aW1hbCB0aW1lb3V0IG11c3QgYmUgZ3JlYXRlciB0aGFuIDAuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsRGVsYXlfID0gb3B0aW9ucy5pbml0aWFsRGVsYXkgfHwgMTAwO1xuICAgIHRoaXMubWF4RGVsYXlfID0gb3B0aW9ucy5tYXhEZWxheSB8fCAxMDAwMDtcblxuICAgIGlmICh0aGlzLm1heERlbGF5XyA8PSB0aGlzLmluaXRpYWxEZWxheV8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgbWF4aW1hbCBiYWNrb2ZmIGRlbGF5IG11c3QgYmUgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ3JlYXRlciB0aGFuIHRoZSBpbml0aWFsIGJhY2tvZmYgZGVsYXkuJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGVmKG9wdGlvbnMucmFuZG9taXNhdGlvbkZhY3RvcikgJiZcbiAgICAgICAgKG9wdGlvbnMucmFuZG9taXNhdGlvbkZhY3RvciA8IDAgfHwgb3B0aW9ucy5yYW5kb21pc2F0aW9uRmFjdG9yID4gMSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcmFuZG9taXNhdGlvbiBmYWN0b3IgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yYW5kb21pc2F0aW9uRmFjdG9yXyA9IG9wdGlvbnMucmFuZG9taXNhdGlvbkZhY3RvciB8fCAwO1xufVxuXG4vLyBHZXRzIHRoZSBtYXhpbWFsIGJhY2tvZmYgZGVsYXkuXG5CYWNrb2ZmU3RyYXRlZ3kucHJvdG90eXBlLmdldE1heERlbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4RGVsYXlfO1xufTtcblxuLy8gR2V0cyB0aGUgaW5pdGlhbCBiYWNrb2ZmIGRlbGF5LlxuQmFja29mZlN0cmF0ZWd5LnByb3RvdHlwZS5nZXRJbml0aWFsRGVsYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsRGVsYXlfO1xufTtcblxuLy8gVGVtcGxhdGUgbWV0aG9kIHRoYXQgY29tcHV0ZXMgYW5kIHJldHVybnMgdGhlIG5leHQgYmFja29mZiBkZWxheSBpblxuLy8gbWlsbGlzZWNvbmRzLlxuQmFja29mZlN0cmF0ZWd5LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJhY2tvZmZEZWxheSA9IHRoaXMubmV4dF8oKTtcbiAgICB2YXIgcmFuZG9taXNhdGlvbk11bHRpcGxlID0gMSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhbmRvbWlzYXRpb25GYWN0b3JfO1xuICAgIHZhciByYW5kb21pemVkRGVsYXkgPSBNYXRoLnJvdW5kKGJhY2tvZmZEZWxheSAqIHJhbmRvbWlzYXRpb25NdWx0aXBsZSk7XG4gICAgcmV0dXJuIHJhbmRvbWl6ZWREZWxheTtcbn07XG5cbi8vIENvbXB1dGVzIGFuZCByZXR1cm5zIHRoZSBuZXh0IGJhY2tvZmYgZGVsYXkuIEludGVuZGVkIHRvIGJlIG92ZXJyaWRkZW4gYnlcbi8vIHN1YmNsYXNzZXMuXG5CYWNrb2ZmU3RyYXRlZ3kucHJvdG90eXBlLm5leHRfID0gZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCYWNrb2ZmU3RyYXRlZ3kubmV4dF8oKSB1bmltcGxlbWVudGVkLicpO1xufTtcblxuLy8gVGVtcGxhdGUgbWV0aG9kIHRoYXQgcmVzZXRzIHRoZSBiYWNrb2ZmIGRlbGF5IHRvIGl0cyBpbml0aWFsIHZhbHVlLlxuQmFja29mZlN0cmF0ZWd5LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVzZXRfKCk7XG59O1xuXG4vLyBSZXNldHMgdGhlIGJhY2tvZmYgZGVsYXkgdG8gaXRzIGluaXRpYWwgdmFsdWUuIEludGVuZGVkIHRvIGJlIG92ZXJyaWRkZW4gYnlcbi8vIHN1YmNsYXNzZXMuXG5CYWNrb2ZmU3RyYXRlZ3kucHJvdG90eXBlLnJlc2V0XyA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQmFja29mZlN0cmF0ZWd5LnJlc2V0XygpIHVuaW1wbGVtZW50ZWQuJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmZTdHJhdGVneTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWNrb2ZmL2xpYi9zdHJhdGVneS9zdHJhdGVneS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBldmVudC1saXRlLmpzIC0gTGlnaHQtd2VpZ2h0IEV2ZW50RW1pdHRlciAobGVzcyB0aGFuIDFLQiB3aGVuIGd6aXBwZWQpXG4gKlxuICogQGNvcHlyaWdodCBZdXN1a2UgS2F3YXNha2lcbiAqIEBsaWNlbnNlIE1JVFxuICogQGNvbnN0cnVjdG9yXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9rYXdhbmV0L2V2ZW50LWxpdGVcbiAqIEBzZWUgaHR0cDovL2thd2FuZXQuZ2l0aHViLmlvL2V2ZW50LWxpdGUvRXZlbnRMaXRlLmh0bWxcbiAqIEBleGFtcGxlXG4gKiB2YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG4gKlxuICogZnVuY3Rpb24gTXlDbGFzcygpIHsuLi59ICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NcbiAqXG4gKiBFdmVudExpdGUubWl4aW4oTXlDbGFzcy5wcm90b3R5cGUpOyAgLy8gaW1wb3J0IGV2ZW50IG1ldGhvZHNcbiAqXG4gKiB2YXIgb2JqID0gbmV3IE15Q2xhc3MoKTtcbiAqIG9iai5vbihcImZvb1wiLCBmdW5jdGlvbigpIHsuLi59KTsgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lclxuICogb2JqLm9uY2UoXCJiYXJcIiwgZnVuY3Rpb24oKSB7Li4ufSk7ICAgLy8gYWRkIG9uZS10aW1lIGV2ZW50IGxpc3RlbmVyXG4gKiBvYmouZW1pdChcImZvb1wiKTsgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwYXRjaCBldmVudFxuICogb2JqLmVtaXQoXCJiYXJcIik7ICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGF0Y2ggYW5vdGhlciBldmVudFxuICogb2JqLm9mZihcImZvb1wiKTsgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyXG4gKi9cblxuZnVuY3Rpb24gRXZlbnRMaXRlKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRXZlbnRMaXRlKSkgcmV0dXJuIG5ldyBFdmVudExpdGUoKTtcbn1cblxuKGZ1bmN0aW9uKEV2ZW50TGl0ZSkge1xuICAvLyBleHBvcnQgdGhlIGNsYXNzIGZvciBub2RlLmpzXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbW9kdWxlKSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50TGl0ZTtcblxuICAvLyBwcm9wZXJ0eSBuYW1lIHRvIGhvbGQgbGlzdGVuZXJzXG4gIHZhciBMSVNURU5FUlMgPSBcImxpc3RlbmVyc1wiO1xuXG4gIC8vIG1ldGhvZHMgdG8gZXhwb3J0XG4gIHZhciBtZXRob2RzID0ge1xuICAgIG9uOiBvbixcbiAgICBvbmNlOiBvbmNlLFxuICAgIG9mZjogb2ZmLFxuICAgIGVtaXQ6IGVtaXRcbiAgfTtcblxuICAvLyBtaXhpbiB0byBzZWxmXG4gIG1peGluKEV2ZW50TGl0ZS5wcm90b3R5cGUpO1xuXG4gIC8vIGV4cG9ydCBtaXhpbiBmdW5jdGlvblxuICBFdmVudExpdGUubWl4aW4gPSBtaXhpbjtcblxuICAvKipcbiAgICogSW1wb3J0IG9uKCksIG9uY2UoKSwgb2ZmKCkgYW5kIGVtaXQoKSBtZXRob2RzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5taXhpblxuICAgKiBAcGFyYW0gdGFyZ2V0IHtQcm90b3R5cGV9XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1peGluKHRhcmdldCkge1xuICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IG1ldGhvZHNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9uXG4gICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBmdW5jIHtGdW5jdGlvbn1cbiAgICogQHJldHVybnMge0V2ZW50TGl0ZX0gU2VsZiBmb3IgbWV0aG9kIGNoYWluaW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9uKHR5cGUsIGZ1bmMpIHtcbiAgICBnZXRMaXN0ZW5lcnModGhpcywgdHlwZSkucHVzaChmdW5jKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb25lLXRpbWUgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9uY2VcbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIGZ1bmMge0Z1bmN0aW9ufVxuICAgKiBAcmV0dXJucyB7RXZlbnRMaXRlfSBTZWxmIGZvciBtZXRob2QgY2hhaW5pbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gb25jZSh0eXBlLCBmdW5jKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHdyYXAub3JpZ2luYWxMaXN0ZW5lciA9IGZ1bmM7XG4gICAgZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUpLnB1c2god3JhcCk7XG4gICAgcmV0dXJuIHRoYXQ7XG5cbiAgICBmdW5jdGlvbiB3cmFwKCkge1xuICAgICAgb2ZmLmNhbGwodGhhdCwgdHlwZSwgd3JhcCk7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5wcm90b3R5cGUub2ZmXG4gICAqIEBwYXJhbSBbdHlwZV0ge3N0cmluZ31cbiAgICogQHBhcmFtIFtmdW5jXSB7RnVuY3Rpb259XG4gICAqIEByZXR1cm5zIHtFdmVudExpdGV9IFNlbGYgZm9yIG1ldGhvZCBjaGFpbmluZ1xuICAgKi9cblxuICBmdW5jdGlvbiBvZmYodHlwZSwgZnVuYykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgbGlzdG5lcnM7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgdGhhdFtMSVNURU5FUlNdO1xuICAgIH0gZWxzZSBpZiAoIWZ1bmMpIHtcbiAgICAgIGxpc3RuZXJzID0gdGhhdFtMSVNURU5FUlNdO1xuICAgICAgaWYgKGxpc3RuZXJzKSB7XG4gICAgICAgIGRlbGV0ZSBsaXN0bmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhsaXN0bmVycykubGVuZ3RoKSByZXR1cm4gb2ZmLmNhbGwodGhhdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RuZXJzID0gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHRydWUpO1xuICAgICAgaWYgKGxpc3RuZXJzKSB7XG4gICAgICAgIGxpc3RuZXJzID0gbGlzdG5lcnMuZmlsdGVyKG5lKTtcbiAgICAgICAgaWYgKCFsaXN0bmVycy5sZW5ndGgpIHJldHVybiBvZmYuY2FsbCh0aGF0LCB0eXBlKTtcbiAgICAgICAgdGhhdFtMSVNURU5FUlNdW3R5cGVdID0gbGlzdG5lcnM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGF0O1xuXG4gICAgZnVuY3Rpb24gbmUodGVzdCkge1xuICAgICAgcmV0dXJuIHRlc3QgIT09IGZ1bmMgJiYgdGVzdC5vcmlnaW5hbExpc3RlbmVyICE9PSBmdW5jO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCAodHJpZ2dlcikgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLmVtaXRcbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIFt2YWx1ZV0geyp9XG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gYSBsaXN0ZW5lciByZWNlaXZlZCB0aGUgZXZlbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1pdCh0eXBlLCB2YWx1ZSkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHRydWUpO1xuICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGFyZ2xlbiA9PT0gMSkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goemVyb2FyZyk7XG4gICAgfSBlbHNlIGlmIChhcmdsZW4gPT09IDIpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKG9uZWFyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKG1vcmVhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuICEhbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgIGZ1bmN0aW9uIHplcm9hcmcoZnVuYykge1xuICAgICAgZnVuYy5jYWxsKHRoYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uZWFyZyhmdW5jKSB7XG4gICAgICBmdW5jLmNhbGwodGhhdCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcmVhcmdzKGZ1bmMpIHtcbiAgICAgIGZ1bmMuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKHRoYXQsIHR5cGUsIHJlYWRvbmx5KSB7XG4gICAgaWYgKHJlYWRvbmx5ICYmICF0aGF0W0xJU1RFTkVSU10pIHJldHVybjtcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhhdFtMSVNURU5FUlNdIHx8ICh0aGF0W0xJU1RFTkVSU10gPSB7fSk7XG4gICAgcmV0dXJuIGxpc3RlbmVyc1t0eXBlXSB8fCAobGlzdGVuZXJzW3R5cGVdID0gW10pO1xuICB9XG5cbn0pKEV2ZW50TGl0ZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZXZlbnQtbGl0ZS9ldmVudC1saXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBkZWNvZGUtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRGVjb2RlQnVmZmVyID0gRGVjb2RlQnVmZmVyO1xuXG52YXIgcHJlc2V0ID0gcmVxdWlyZShcIi4vcmVhZC1jb3JlXCIpLnByZXNldDtcblxudmFyIEZsZXhEZWNvZGVyID0gcmVxdWlyZShcIi4vZmxleC1idWZmZXJcIikuRmxleERlY29kZXI7XG5cbkZsZXhEZWNvZGVyLm1peGluKERlY29kZUJ1ZmZlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBEZWNvZGVCdWZmZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVjb2RlQnVmZmVyKSkgcmV0dXJuIG5ldyBEZWNvZGVCdWZmZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLmNvZGVjKSB7XG4gICAgICB2YXIgY29kZWMgPSB0aGlzLmNvZGVjID0gb3B0aW9ucy5jb2RlYztcbiAgICAgIGlmIChjb2RlYy5idWZmZXJpc2gpIHRoaXMuYnVmZmVyaXNoID0gY29kZWMuYnVmZmVyaXNoO1xuICAgIH1cbiAgfVxufVxuXG5EZWNvZGVCdWZmZXIucHJvdG90eXBlLmNvZGVjID0gcHJlc2V0O1xuXG5EZWNvZGVCdWZmZXIucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNvZGVjLmRlY29kZSh0aGlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9kZWNvZGUtYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBkZWNvZGUuanNcblxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5cbnZhciBEZWNvZGVCdWZmZXIgPSByZXF1aXJlKFwiLi9kZWNvZGUtYnVmZmVyXCIpLkRlY29kZUJ1ZmZlcjtcblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0LCBvcHRpb25zKSB7XG4gIHZhciBkZWNvZGVyID0gbmV3IERlY29kZUJ1ZmZlcihvcHRpb25zKTtcbiAgZGVjb2Rlci53cml0ZShpbnB1dCk7XG4gIHJldHVybiBkZWNvZGVyLnJlYWQoKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGVuY29kZS1idWZmZXIuanNcblxuZXhwb3J0cy5FbmNvZGVCdWZmZXIgPSBFbmNvZGVCdWZmZXI7XG5cbnZhciBwcmVzZXQgPSByZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpLnByZXNldDtcblxudmFyIEZsZXhFbmNvZGVyID0gcmVxdWlyZShcIi4vZmxleC1idWZmZXJcIikuRmxleEVuY29kZXI7XG5cbkZsZXhFbmNvZGVyLm1peGluKEVuY29kZUJ1ZmZlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBFbmNvZGVCdWZmZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRW5jb2RlQnVmZmVyKSkgcmV0dXJuIG5ldyBFbmNvZGVCdWZmZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLmNvZGVjKSB7XG4gICAgICB2YXIgY29kZWMgPSB0aGlzLmNvZGVjID0gb3B0aW9ucy5jb2RlYztcbiAgICAgIGlmIChjb2RlYy5idWZmZXJpc2gpIHRoaXMuYnVmZmVyaXNoID0gY29kZWMuYnVmZmVyaXNoO1xuICAgIH1cbiAgfVxufVxuXG5FbmNvZGVCdWZmZXIucHJvdG90eXBlLmNvZGVjID0gcHJlc2V0O1xuXG5FbmNvZGVCdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgdGhpcy5jb2RlYy5lbmNvZGUodGhpcywgaW5wdXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2VuY29kZS1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGVuY29kZS5qc1xuXG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcblxudmFyIEVuY29kZUJ1ZmZlciA9IHJlcXVpcmUoXCIuL2VuY29kZS1idWZmZXJcIikuRW5jb2RlQnVmZmVyO1xuXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGVuY29kZXIgPSBuZXcgRW5jb2RlQnVmZmVyKG9wdGlvbnMpO1xuICBlbmNvZGVyLndyaXRlKGlucHV0KTtcbiAgcmV0dXJuIGVuY29kZXIucmVhZCgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmbGV4LWJ1ZmZlci5qc1xuXG5leHBvcnRzLkZsZXhEZWNvZGVyID0gRmxleERlY29kZXI7XG5leHBvcnRzLkZsZXhFbmNvZGVyID0gRmxleEVuY29kZXI7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbnZhciBNSU5fQlVGRkVSX1NJWkUgPSAyMDQ4O1xudmFyIE1BWF9CVUZGRVJfU0laRSA9IDY1NTM2O1xudmFyIEJVRkZFUl9TSE9SVEFHRSA9IFwiQlVGRkVSX1NIT1JUQUdFXCI7XG5cbmZ1bmN0aW9uIEZsZXhEZWNvZGVyKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRmxleERlY29kZXIpKSByZXR1cm4gbmV3IEZsZXhEZWNvZGVyKCk7XG59XG5cbmZ1bmN0aW9uIEZsZXhFbmNvZGVyKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRmxleEVuY29kZXIpKSByZXR1cm4gbmV3IEZsZXhFbmNvZGVyKCk7XG59XG5cbkZsZXhEZWNvZGVyLm1peGluID0gbWl4aW5GYWN0b3J5KGdldERlY29kZXJNZXRob2RzKCkpO1xuRmxleERlY29kZXIubWl4aW4oRmxleERlY29kZXIucHJvdG90eXBlKTtcblxuRmxleEVuY29kZXIubWl4aW4gPSBtaXhpbkZhY3RvcnkoZ2V0RW5jb2Rlck1ldGhvZHMoKSk7XG5GbGV4RW5jb2Rlci5taXhpbihGbGV4RW5jb2Rlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBnZXREZWNvZGVyTWV0aG9kcygpIHtcbiAgcmV0dXJuIHtcbiAgICBidWZmZXJpc2g6IEJ1ZmZlcmlzaCxcbiAgICB3cml0ZTogd3JpdGUsXG4gICAgZmV0Y2g6IGZldGNoLFxuICAgIGZsdXNoOiBmbHVzaCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHB1bGw6IHB1bGwsXG4gICAgcmVhZDogcmVhZCxcbiAgICByZXNlcnZlOiByZXNlcnZlLFxuICAgIG9mZnNldDogMFxuICB9O1xuXG4gIGZ1bmN0aW9uIHdyaXRlKGNodW5rKSB7XG4gICAgdmFyIHByZXYgPSB0aGlzLm9mZnNldCA/IEJ1ZmZlcmlzaC5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXQpIDogdGhpcy5idWZmZXI7XG4gICAgdGhpcy5idWZmZXIgPSBwcmV2ID8gKGNodW5rID8gdGhpcy5idWZmZXJpc2guY29uY2F0KFtwcmV2LCBjaHVua10pIDogcHJldikgOiBjaHVuaztcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAodGhpcy5vZmZzZXQgPCB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMub2Zmc2V0O1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmZldGNoKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlICYmIGUubWVzc2FnZSAhPSBCVUZGRVJfU0hPUlRBR0UpIHRocm93IGU7XG4gICAgICAgIC8vIHJvbGxiYWNrXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gc3RhcnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNlcnZlKGxlbmd0aCkge1xuICAgIHZhciBzdGFydCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBlbmQgPSBzdGFydCArIGxlbmd0aDtcbiAgICBpZiAoZW5kID4gdGhpcy5idWZmZXIubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoQlVGRkVSX1NIT1JUQUdFKTtcbiAgICB0aGlzLm9mZnNldCA9IGVuZDtcbiAgICByZXR1cm4gc3RhcnQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RW5jb2Rlck1ldGhvZHMoKSB7XG4gIHJldHVybiB7XG4gICAgYnVmZmVyaXNoOiBCdWZmZXJpc2gsXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIGZldGNoOiBmZXRjaCxcbiAgICBmbHVzaDogZmx1c2gsXG4gICAgcHVzaDogcHVzaCxcbiAgICBwdWxsOiBwdWxsLFxuICAgIHJlYWQ6IHJlYWQsXG4gICAgcmVzZXJ2ZTogcmVzZXJ2ZSxcbiAgICBzZW5kOiBzZW5kLFxuICAgIG1heEJ1ZmZlclNpemU6IE1BWF9CVUZGRVJfU0laRSxcbiAgICBtaW5CdWZmZXJTaXplOiBNSU5fQlVGRkVSX1NJWkUsXG4gICAgb2Zmc2V0OiAwLFxuICAgIHN0YXJ0OiAwXG4gIH07XG5cbiAgZnVuY3Rpb24gZmV0Y2goKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5zdGFydDtcbiAgICBpZiAoc3RhcnQgPCB0aGlzLm9mZnNldCkge1xuICAgICAgdmFyIGVuZCA9IHRoaXMuc3RhcnQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHJldHVybiBCdWZmZXJpc2gucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlICh0aGlzLnN0YXJ0IDwgdGhpcy5vZmZzZXQpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZmV0Y2goKTtcbiAgICAgIGlmICh2YWx1ZSkgdGhpcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwdWxsKCkge1xuICAgIHZhciBidWZmZXJzID0gdGhpcy5idWZmZXJzIHx8ICh0aGlzLmJ1ZmZlcnMgPSBbXSk7XG4gICAgdmFyIGNodW5rID0gYnVmZmVycy5sZW5ndGggPiAxID8gdGhpcy5idWZmZXJpc2guY29uY2F0KGJ1ZmZlcnMpIDogYnVmZmVyc1swXTtcbiAgICBidWZmZXJzLmxlbmd0aCA9IDA7IC8vIGJ1ZmZlciBleGhhdXN0ZWRcbiAgICByZXR1cm4gY2h1bms7XG4gIH1cblxuICBmdW5jdGlvbiByZXNlcnZlKGxlbmd0aCkge1xuICAgIHZhciByZXEgPSBsZW5ndGggfCAwO1xuXG4gICAgaWYgKHRoaXMuYnVmZmVyKSB7XG4gICAgICB2YXIgc2l6ZSA9IHRoaXMuYnVmZmVyLmxlbmd0aDtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMub2Zmc2V0IHwgMDtcbiAgICAgIHZhciBlbmQgPSBzdGFydCArIHJlcTtcblxuICAgICAgLy8gaXMgaXQgbG9uZyBlbm91Z2g/XG4gICAgICBpZiAoZW5kIDwgc2l6ZSkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IGVuZDtcbiAgICAgICAgcmV0dXJuIHN0YXJ0O1xuICAgICAgfVxuXG4gICAgICAvLyBmbHVzaCBjdXJyZW50IGJ1ZmZlclxuICAgICAgdGhpcy5mbHVzaCgpO1xuXG4gICAgICAvLyByZXNpemUgaXQgdG8gMnggY3VycmVudCBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgTWF0aC5taW4oc2l6ZSAqIDIsIHRoaXMubWF4QnVmZmVyU2l6ZSkpO1xuICAgIH1cblxuICAgIC8vIG1pbmltdW0gYnVmZmVyIHNpemVcbiAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIHRoaXMubWluQnVmZmVyU2l6ZSk7XG5cbiAgICAvLyBhbGxvY2F0ZSBuZXcgYnVmZmVyXG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLmJ1ZmZlcmlzaC5hbGxvYyhsZW5ndGgpO1xuICAgIHRoaXMuc3RhcnQgPSAwO1xuICAgIHRoaXMub2Zmc2V0ID0gcmVxO1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VuZChidWZmZXIpIHtcbiAgICB2YXIgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoID4gdGhpcy5taW5CdWZmZXJTaXplKSB7XG4gICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICB0aGlzLnB1c2goYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9mZnNldCA9IHRoaXMucmVzZXJ2ZShsZW5ndGgpO1xuICAgICAgQnVmZmVyaXNoLnByb3RvdHlwZS5jb3B5LmNhbGwoYnVmZmVyLCB0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gY29tbW9uIG1ldGhvZHNcblxuZnVuY3Rpb24gd3JpdGUoKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm1ldGhvZCBub3QgaW1wbGVtZW50ZWQ6IHdyaXRlKClcIik7XG59XG5cbmZ1bmN0aW9uIGZldGNoKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJtZXRob2Qgbm90IGltcGxlbWVudGVkOiBmZXRjaCgpXCIpO1xufVxuXG5mdW5jdGlvbiByZWFkKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5idWZmZXJzICYmIHRoaXMuYnVmZmVycy5sZW5ndGg7XG5cbiAgLy8gZmV0Y2ggdGhlIGZpcnN0IHJlc3VsdFxuICBpZiAoIWxlbmd0aCkgcmV0dXJuIHRoaXMuZmV0Y2goKTtcblxuICAvLyBmbHVzaCBjdXJyZW50IGJ1ZmZlclxuICB0aGlzLmZsdXNoKCk7XG5cbiAgLy8gcmVhZCBmcm9tIHRoZSByZXN1bHRzXG4gIHJldHVybiB0aGlzLnB1bGwoKTtcbn1cblxuZnVuY3Rpb24gcHVzaChjaHVuaykge1xuICB2YXIgYnVmZmVycyA9IHRoaXMuYnVmZmVycyB8fCAodGhpcy5idWZmZXJzID0gW10pO1xuICBidWZmZXJzLnB1c2goY2h1bmspO1xufVxuXG5mdW5jdGlvbiBwdWxsKCkge1xuICB2YXIgYnVmZmVycyA9IHRoaXMuYnVmZmVycyB8fCAodGhpcy5idWZmZXJzID0gW10pO1xuICByZXR1cm4gYnVmZmVycy5zaGlmdCgpO1xufVxuXG5mdW5jdGlvbiBtaXhpbkZhY3Rvcnkoc291cmNlKSB7XG4gIHJldHVybiBtaXhpbjtcblxuICBmdW5jdGlvbiBtaXhpbih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9mbGV4LWJ1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVhZC1mb3JtYXQuanNcblxudmFyIGllZWU3NTQgPSByZXF1aXJlKFwiaWVlZTc1NFwiKTtcbnZhciBJbnQ2NEJ1ZmZlciA9IHJlcXVpcmUoXCJpbnQ2NC1idWZmZXJcIik7XG52YXIgVWludDY0QkUgPSBJbnQ2NEJ1ZmZlci5VaW50NjRCRTtcbnZhciBJbnQ2NEJFID0gSW50NjRCdWZmZXIuSW50NjRCRTtcblxuZXhwb3J0cy5nZXRSZWFkRm9ybWF0ID0gZ2V0UmVhZEZvcm1hdDtcbmV4cG9ydHMucmVhZFVpbnQ4ID0gdWludDg7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyUHJvdG8gPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtcHJvdG9cIik7XG5cbnZhciBIQVNfTUFQID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBNYXApO1xudmFyIE5PX0FTU0VSVCA9IHRydWU7XG5cbmZ1bmN0aW9uIGdldFJlYWRGb3JtYXQob3B0aW9ucykge1xuICB2YXIgYmluYXJyYXlidWZmZXIgPSBCdWZmZXJpc2guaGFzQXJyYXlCdWZmZXIgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmJpbmFycmF5YnVmZmVyO1xuICB2YXIgaW50NjQgPSBvcHRpb25zICYmIG9wdGlvbnMuaW50NjQ7XG4gIHZhciB1c2VtYXAgPSBIQVNfTUFQICYmIG9wdGlvbnMgJiYgb3B0aW9ucy51c2VtYXA7XG5cbiAgdmFyIHJlYWRGb3JtYXQgPSB7XG4gICAgbWFwOiAodXNlbWFwID8gbWFwX3RvX21hcCA6IG1hcF90b19vYmopLFxuICAgIGFycmF5OiBhcnJheSxcbiAgICBzdHI6IHN0cixcbiAgICBiaW46IChiaW5hcnJheWJ1ZmZlciA/IGJpbl9hcnJheWJ1ZmZlciA6IGJpbl9idWZmZXIpLFxuICAgIGV4dDogZXh0LFxuICAgIHVpbnQ4OiB1aW50OCxcbiAgICB1aW50MTY6IHVpbnQxNixcbiAgICB1aW50MzI6IHVpbnQzMixcbiAgICB1aW50NjQ6IHJlYWQoOCwgaW50NjQgPyByZWFkVUludDY0QkVfaW50NjQgOiByZWFkVUludDY0QkUpLFxuICAgIGludDg6IGludDgsXG4gICAgaW50MTY6IGludDE2LFxuICAgIGludDMyOiBpbnQzMixcbiAgICBpbnQ2NDogcmVhZCg4LCBpbnQ2NCA/IHJlYWRJbnQ2NEJFX2ludDY0IDogcmVhZEludDY0QkUpLFxuICAgIGZsb2F0MzI6IHJlYWQoNCwgcmVhZEZsb2F0QkUpLFxuICAgIGZsb2F0NjQ6IHJlYWQoOCwgcmVhZERvdWJsZUJFKVxuICB9O1xuXG4gIHJldHVybiByZWFkRm9ybWF0O1xufVxuXG5mdW5jdGlvbiBtYXBfdG9fb2JqKGRlY29kZXIsIGxlbikge1xuICB2YXIgdmFsdWUgPSB7fTtcbiAgdmFyIGk7XG4gIHZhciBrID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciB2ID0gbmV3IEFycmF5KGxlbik7XG5cbiAgdmFyIGRlY29kZSA9IGRlY29kZXIuY29kZWMuZGVjb2RlO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICAgIHZbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFsdWVba1tpXV0gPSB2W2ldO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gbWFwX3RvX21hcChkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0gbmV3IE1hcCgpO1xuICB2YXIgaTtcbiAgdmFyIGsgPSBuZXcgQXJyYXkobGVuKTtcbiAgdmFyIHYgPSBuZXcgQXJyYXkobGVuKTtcblxuICB2YXIgZGVjb2RlID0gZGVjb2Rlci5jb2RlYy5kZWNvZGU7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gICAgdltpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YWx1ZS5zZXQoa1tpXSwgdltpXSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhcnJheShkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciBkZWNvZGUgPSBkZWNvZGVyLmNvZGVjLmRlY29kZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbHVlW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gc3RyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICByZXR1cm4gQnVmZmVyUHJvdG8udG9TdHJpbmcuY2FsbChkZWNvZGVyLmJ1ZmZlciwgXCJ1dGYtOFwiLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gYmluX2J1ZmZlcihkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbik7XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gQnVmZmVyaXNoLmZyb20oYnVmKTtcbn1cblxuZnVuY3Rpb24gYmluX2FycmF5YnVmZmVyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICB2YXIgYnVmID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbChkZWNvZGVyLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gIHJldHVybiBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKGJ1ZikuYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBleHQoZGVjb2RlciwgbGVuKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4rMSk7XG4gIHZhciB0eXBlID0gZGVjb2Rlci5idWZmZXJbc3RhcnQrK107XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIHVucGFjayA9IGRlY29kZXIuY29kZWMuZ2V0RXh0VW5wYWNrZXIodHlwZSk7XG4gIGlmICghdW5wYWNrKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV4dCB0eXBlOiBcIiArICh0eXBlID8gKFwiMHhcIiArIHR5cGUudG9TdHJpbmcoMTYpKSA6IHR5cGUpKTtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gdW5wYWNrKGJ1Zik7XG59XG5cbmZ1bmN0aW9uIHVpbnQ4KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDEpO1xuICByZXR1cm4gZGVjb2Rlci5idWZmZXJbc3RhcnRdO1xufVxuXG5mdW5jdGlvbiBpbnQ4KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDEpO1xuICB2YXIgdmFsdWUgPSBkZWNvZGVyLmJ1ZmZlcltzdGFydF07XG4gIHJldHVybiAodmFsdWUgJiAweDgwKSA/IHZhbHVlIC0gMHgxMDAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdWludDE2KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDIpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdIDw8IDgpIHwgYnVmZmVyW3N0YXJ0XTtcbn1cblxuZnVuY3Rpb24gaW50MTYoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoMik7XG4gIHZhciBidWZmZXIgPSBkZWNvZGVyLmJ1ZmZlcjtcbiAgdmFyIHZhbHVlID0gKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG4gIHJldHVybiAodmFsdWUgJiAweDgwMDApID8gdmFsdWUgLSAweDEwMDAwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVpbnQzMihkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSg0KTtcbiAgdmFyIGJ1ZmZlciA9IGRlY29kZXIuYnVmZmVyO1xuICByZXR1cm4gKGJ1ZmZlcltzdGFydCsrXSAqIDE2Nzc3MjE2KSArIChidWZmZXJbc3RhcnQrK10gPDwgMTYpICsgKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSArIGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIGludDMyKGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDQpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdIDw8IDI0KSB8IChidWZmZXJbc3RhcnQrK10gPDwgMTYpIHwgKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIHJlYWQobGVuLCBtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgICByZXR1cm4gbWV0aG9kLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBOT19BU1NFUlQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZWFkVUludDY0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBVaW50NjRCRSh0aGlzLCBzdGFydCkudG9OdW1iZXIoKTtcbn1cblxuZnVuY3Rpb24gcmVhZEludDY0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBJbnQ2NEJFKHRoaXMsIHN0YXJ0KS50b051bWJlcigpO1xufVxuXG5mdW5jdGlvbiByZWFkVUludDY0QkVfaW50NjQoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBVaW50NjRCRSh0aGlzLCBzdGFydCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRJbnQ2NEJFX2ludDY0KHN0YXJ0KSB7XG4gIHJldHVybiBuZXcgSW50NjRCRSh0aGlzLCBzdGFydCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG9hdEJFKHN0YXJ0KSB7XG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgc3RhcnQsIGZhbHNlLCAyMywgNCk7XG59XG5cbmZ1bmN0aW9uIHJlYWREb3VibGVCRShzdGFydCkge1xuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIHN0YXJ0LCBmYWxzZSwgNTIsIDgpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL3JlYWQtZm9ybWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS11bml0OC5qc1xuXG52YXIgY29uc3RhbnQgPSBleHBvcnRzLnVpbnQ4ID0gbmV3IEFycmF5KDI1Nik7XG5cbmZvciAodmFyIGkgPSAweDAwOyBpIDw9IDB4RkY7IGkrKykge1xuICBjb25zdGFudFtpXSA9IHdyaXRlMChpKTtcbn1cblxuZnVuY3Rpb24gd3JpdGUwKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDEpO1xuICAgIGVuY29kZXIuYnVmZmVyW29mZnNldF0gPSB0eXBlO1xuICB9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtdWludDguanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIERlbHV4ZVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9EZWx1eGVTaWduYWxcIik7XG5leHBvcnRzLkRlbHV4ZVNpZ25hbCA9IERlbHV4ZVNpZ25hbF8xLkRlbHV4ZVNpZ25hbDtcbnZhciBHZW5lcmljRXZlbnRfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvZXZlbnRzL0dlbmVyaWNFdmVudFwiKTtcbmV4cG9ydHMuR2VuZXJpY0V2ZW50ID0gR2VuZXJpY0V2ZW50XzEuR2VuZXJpY0V2ZW50O1xudmFyIElPbmNlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL0lPbmNlU2lnbmFsXCIpO1xuZXhwb3J0cy5JT25jZVNpZ25hbCA9IElPbmNlU2lnbmFsXzEuSU9uY2VTaWduYWw7XG52YXIgSVByaW9yaXR5U2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL0lQcmlvcml0eVNpZ25hbFwiKTtcbmV4cG9ydHMuSVByaW9yaXR5U2lnbmFsID0gSVByaW9yaXR5U2lnbmFsXzEuSVByaW9yaXR5U2lnbmFsO1xudmFyIElTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNpZ25hbFwiKTtcbmV4cG9ydHMuSVNpZ25hbCA9IElTaWduYWxfMS5JU2lnbmFsO1xudmFyIElTbG90XzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL0lTbG90XCIpO1xuZXhwb3J0cy5JU2xvdCA9IElTbG90XzEuSVNsb3Q7XG52YXIgTW9ub1NpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9Nb25vU2lnbmFsXCIpO1xuZXhwb3J0cy5Nb25vU2lnbmFsID0gTW9ub1NpZ25hbF8xLk1vbm9TaWduYWw7XG52YXIgT25jZVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9PbmNlU2lnbmFsXCIpO1xuZXhwb3J0cy5PbmNlU2lnbmFsID0gT25jZVNpZ25hbF8xLk9uY2VTaWduYWw7XG52YXIgUHJpb3JpdHlTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJpb3JpdHlTaWduYWxcIik7XG5leHBvcnRzLlByaW9yaXR5U2lnbmFsID0gUHJpb3JpdHlTaWduYWxfMS5Qcmlvcml0eVNpZ25hbDtcbnZhciBQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL1Byb21pc2VcIik7XG5leHBvcnRzLlByb21pc2UgPSBQcm9taXNlXzEuUHJvbWlzZTtcbnZhciBTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2lnbmFsXCIpO1xuZXhwb3J0cy5TaWduYWwgPSBTaWduYWxfMS5TaWduYWw7XG52YXIgU2xvdF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9TbG90XCIpO1xuZXhwb3J0cy5TbG90ID0gU2xvdF8xLlNsb3Q7XG52YXIgU2xvdExpc3RfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdExpc3RcIik7XG5leHBvcnRzLlNsb3RMaXN0ID0gU2xvdExpc3RfMS5TbG90TGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTaWduYWxfMSA9IHJlcXVpcmUoXCIuL1NpZ25hbFwiKTtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9TbG90XCIpO1xudmFyIFByaW9yaXR5U2lnbmFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJpb3JpdHlTaWduYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJpb3JpdHlTaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcztcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB2YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZUNsYXNzZXMpIHx8IHRoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIGZsYXNoLmVycm9ycy5JbGxlZ2FsT3BlcmF0aW9uRXJyb3IgPGNvZGU+SWxsZWdhbE9wZXJhdGlvbkVycm9yPC9jb2RlPjogWW91IGNhbm5vdCBhZGRPbmNlKCkgdGhlbiBhZGQoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBQcmlvcml0eVNpZ25hbC5wcm90b3R5cGUuYWRkV2l0aFByaW9yaXR5ID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBwcmlvcml0eSkge1xuICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eShsaXN0ZW5lciwgZmFsc2UsIHByaW9yaXR5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICovXG4gICAgUHJpb3JpdHlTaWduYWwucHJvdG90eXBlLmFkZE9uY2VXaXRoUHJpb3JpdHkgPSBmdW5jdGlvbiAobGlzdGVuZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyV2l0aFByaW9yaXR5KGxpc3RlbmVyLCB0cnVlLCBwcmlvcml0eSk7XG4gICAgfTtcbiAgICAvKm92ZXJyaWRlKi9cbiAgICBQcmlvcml0eVNpZ25hbC5wcm90b3R5cGUucmVnaXN0ZXJMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSkge1xuICAgICAgICBpZiAob25jZSA9PT0gdm9pZCAwKSB7IG9uY2UgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyV2l0aFByaW9yaXR5KGxpc3RlbmVyLCBvbmNlKTtcbiAgICB9O1xuICAgIFByaW9yaXR5U2lnbmFsLnByb3RvdHlwZS5yZWdpc3Rlckxpc3RlbmVyV2l0aFByaW9yaXR5ID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBvbmNlLCBwcmlvcml0eSkge1xuICAgICAgICBpZiAob25jZSA9PT0gdm9pZCAwKSB7IG9uY2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uUG9zc2libGUobGlzdGVuZXIsIG9uY2UpKSB7XG4gICAgICAgICAgICB2YXIgc2xvdCA9IG5ldyBTbG90XzEuU2xvdChsaXN0ZW5lciwgdGhpcywgb25jZSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgdGhpcy5zbG90cyA9IHRoaXMuc2xvdHMuaW5zZXJ0V2l0aFByaW9yaXR5KHNsb3QpO1xuICAgICAgICAgICAgcmV0dXJuIHNsb3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdHMuZmluZChsaXN0ZW5lcik7XG4gICAgfTtcbiAgICByZXR1cm4gUHJpb3JpdHlTaWduYWw7XG59KFNpZ25hbF8xLlNpZ25hbCkpO1xuZXhwb3J0cy5Qcmlvcml0eVNpZ25hbCA9IFByaW9yaXR5U2lnbmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UHJpb3JpdHlTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJpb3JpdHlTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgT25jZVNpZ25hbF8xID0gcmVxdWlyZShcIi4vT25jZVNpZ25hbFwiKTtcbi8qKlxuICogQWxsb3dzIHRoZSB2YWx1ZUNsYXNzZXMgdG8gYmUgc2V0IGluIE1YTUwsIGUuZy5cbiAqIDxzaWduYWxzOlNpZ25hbCBpZD1cIm5hbWVDaGFuZ2VkXCI+e1tTdHJpbmcsIHVpbnRdfTwvc2lnbmFsczpTaWduYWw+XG4gKi9cbi8qW0RlZmF1bHRQcm9wZXJ0eShcInZhbHVlQ2xhc3Nlc1wiKV0qL1xuLyoqXG4gKiBTaWduYWwgZGlzcGF0Y2hlcyBldmVudHMgdG8gbXVsdGlwbGUgbGlzdGVuZXJzLlxuICogSXQgaXMgaW5zcGlyZWQgYnkgQyMgZXZlbnRzIGFuZCBkZWxlZ2F0ZXMsIGFuZCBieVxuICogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NpZ25hbHNfYW5kX3Nsb3RzXCI+c2lnbmFscyBhbmQgc2xvdHM8L2E+XG4gKiBpbiBRdC5cbiAqIEEgU2lnbmFsIGFkZHMgZXZlbnQgZGlzcGF0Y2hpbmcgZnVuY3Rpb25hbGl0eSB0aHJvdWdoIGNvbXBvc2l0aW9uIGFuZCBpbnRlcmZhY2VzLFxuICogcmF0aGVyIHRoYW4gaW5oZXJpdGluZyBmcm9tIGEgZGlzcGF0Y2hlci5cbiAqIDxici8+PGJyLz5cbiAqIFByb2plY3QgaG9tZTogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvXCI+aHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzLzwvYT5cbiAqL1xudmFyIFNpZ25hbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNpZ25hbCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU2lnbmFsIGluc3RhbmNlIHRvIGRpc3BhdGNoIHZhbHVlIG9iamVjdHMuXG4gICAgICogQHBhcmFtICAgIHZhbHVlQ2xhc3NlcyBBbnkgbnVtYmVyIG9mIGNsYXNzIHJlZmVyZW5jZXMgdGhhdCBlbmFibGUgdHlwZSBjaGVja3MgaW4gZGlzcGF0Y2goKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgbmV3IFNpZ25hbChTdHJpbmcsIHVpbnQpXG4gICAgICogd291bGQgYWxsb3c6IHNpZ25hbC5kaXNwYXRjaChcInRoZSBBbnN3ZXJcIiwgNDIpXG4gICAgICogYnV0IG5vdDogc2lnbmFsLmRpc3BhdGNoKHRydWUsIDQyLjUpXG4gICAgICogbm9yOiBzaWduYWwuZGlzcGF0Y2goKVxuICAgICAqXG4gICAgICogTk9URTogSW4gQVMzLCBzdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcztcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB2YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZUNsYXNzZXMpIHx8IHRoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIGZsYXNoLmVycm9ycy5JbGxlZ2FsT3BlcmF0aW9uRXJyb3IgPGNvZGU+SWxsZWdhbE9wZXJhdGlvbkVycm9yPC9jb2RlPjogWW91IGNhbm5vdCBhZGRPbmNlKCkgdGhlbiBhZGQoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBTaWduYWwucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIHJldHVybiBTaWduYWw7XG59KE9uY2VTaWduYWxfMS5PbmNlU2lnbmFsKSk7XG5leHBvcnRzLlNpZ25hbCA9IFNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBUaGUgU2xvdExpc3QgY2xhc3MgcmVwcmVzZW50cyBhbiBpbW11dGFibGUgbGlzdCBvZiBTbG90IG9iamVjdHMuXG4gKlxuICogQGF1dGhvciBKb2EgRWJlcnRcbiAqIEBhdXRob3IgUm9iZXJ0IFBlbm5lclxuICovXG52YXIgU2xvdExpc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgU2xvdExpc3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogPHA+QSB1c2VyIG5ldmVyIGhhcyB0byBjcmVhdGUgYSBTbG90TGlzdCBtYW51YWxseS5cbiAgICAgKiBVc2UgdGhlIDxjb2RlPk5JTDwvY29kZT4gZWxlbWVudCB0byByZXByZXNlbnQgYW4gZW1wdHkgbGlzdC5cbiAgICAgKiA8Y29kZT5OSUwucHJlcGVuZCh2YWx1ZSk8L2NvZGU+IHdvdWxkIGNyZWF0ZSBhIGxpc3QgY29udGFpbmluZyA8Y29kZT52YWx1ZTwvY29kZT48L3A+LlxuICAgICAqXG4gICAgICogQHBhcmFtIGhlYWQgVGhlIGZpcnN0IHNsb3QgaW4gdGhlIGxpc3QuXG4gICAgICogQHBhcmFtIHRhaWwgQSBsaXN0IGNvbnRhaW5pbmcgYWxsIHNsb3RzIGV4Y2VwdCBoZWFkLlxuICAgICAqXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBQYXJhbWV0ZXJzIGhlYWQgYW5kIHRhaWwgYXJlIG51bGwuIFVzZSB0aGUgTklMIGVsZW1lbnQgaW5zdGVhZC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFBhcmFtZXRlciBoZWFkIGNhbm5vdCBiZSBudWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNsb3RMaXN0KGhlYWQsIHRhaWwpIHtcbiAgICAgICAgaWYgKHRhaWwgPT09IHZvaWQgMCkgeyB0YWlsID0gbnVsbDsgfVxuICAgICAgICB0aGlzLm5vbkVtcHR5ID0gZmFsc2U7XG4gICAgICAgIGlmICghaGVhZCAmJiAhdGFpbCkge1xuICAgICAgICAgICAgaWYgKFNsb3RMaXN0Lk5JTClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcnMgaGVhZCBhbmQgdGFpbCBhcmUgbnVsbC4gVXNlIHRoZSBOSUwgZWxlbWVudCBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgLy90aGlzIGlzIHRoZSBOSUwgZWxlbWVudCBhcyBwZXIgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5ub25FbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFoZWFkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBoZWFkIGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gaGVhZDtcbiAgICAgICAgICAgIHRoaXMudGFpbCA9IHRhaWwgfHwgU2xvdExpc3QuTklMO1xuICAgICAgICAgICAgdGhpcy5ub25FbXB0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3RMaXN0LnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBzbG90cyBpbiB0aGUgbGlzdC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFpbCA9PSBTbG90TGlzdC5OSUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAvLyBXZSBjb3VsZCBjYWNoZSB0aGUgbGVuZ3RoLCBidXQgaXQgd291bGQgbWFrZSBtZXRob2RzIGxpa2UgZmlsdGVyTm90IHVubmVjZXNzYXJpbHkgY29tcGxpY2F0ZWQuXG4gICAgICAgICAgICAvLyBJbnN0ZWFkIHdlIGFzc3VtZSB0aGF0IE8obikgaXMgb2theSBzaW5jZSB0aGUgbGVuZ3RoIHByb3BlcnR5IGlzIHVzZWQgaW4gcmFyZSBjYXNlcy5cbiAgICAgICAgICAgIC8vIFdlIGNvdWxkIGFsc28gY2FjaGUgdGhlIGxlbmd0aCBsYXp5LCBidXQgdGhhdCBpcyBhIHdhc3RlIG9mIGFub3RoZXIgOGIgcGVyIGxpc3Qgbm9kZSAoYXQgbGVhc3QpLlxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXM7XG4gICAgICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgICAgICsrcmVzdWx0O1xuICAgICAgICAgICAgICAgIHAgPSBwLnRhaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBQcmVwZW5kcyBhIHNsb3QgdG8gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSAgICBzbG90IFRoZSBpdGVtIHRvIGJlIHByZXBlbmRlZC5cbiAgICAgKiBAcmV0dXJuICAgIEEgbGlzdCBjb25zaXN0aW5nIG9mIHNsb3QgZm9sbG93ZWQgYnkgYWxsIGVsZW1lbnRzIG9mIHRoaXMgbGlzdC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVyIGhlYWQgY2Fubm90IGJlIG51bGwuXG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAoc2xvdCkge1xuICAgICAgICByZXR1cm4gbmV3IFNsb3RMaXN0KHNsb3QsIHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIHNsb3QgdG8gdGhpcyBsaXN0LlxuICAgICAqIE5vdGU6IGFwcGVuZGluZyBpcyBPKG4pLiBXaGVyZSBwb3NzaWJsZSwgcHJlcGVuZCB3aGljaCBpcyBPKDEpLlxuICAgICAqIEluIHNvbWUgY2FzZXMsIG1hbnkgbGlzdCBpdGVtcyBtdXN0IGJlIGNsb25lZCB0b1xuICAgICAqIGF2b2lkIGNoYW5naW5nIGV4aXN0aW5nIGxpc3RzLlxuICAgICAqIEBwYXJhbSAgICBzbG90IFRoZSBpdGVtIHRvIGJlIGFwcGVuZGVkLlxuICAgICAqIEByZXR1cm4gICAgQSBsaXN0IGNvbnNpc3Rpbmcgb2YgYWxsIGVsZW1lbnRzIG9mIHRoaXMgbGlzdCBmb2xsb3dlZCBieSBzbG90LlxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoc2xvdCkge1xuICAgICAgICBpZiAoIXNsb3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlOiBqdXN0IG9uZSBzbG90IGN1cnJlbnRseSBpbiB0aGUgbGlzdC5cbiAgICAgICAgaWYgKHRoaXMudGFpbCA9PSBTbG90TGlzdC5OSUwpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNsb3RMaXN0KHNsb3QpLnByZXBlbmQodGhpcy5oZWFkKTtcbiAgICAgICAgLy8gVGhlIGxpc3QgYWxyZWFkeSBoYXMgdHdvIG9yIG1vcmUgc2xvdHMuXG4gICAgICAgIC8vIFdlIGhhdmUgdG8gYnVpbGQgYSBuZXcgbGlzdCB3aXRoIGNsb25lZCBpdGVtcyBiZWNhdXNlIHRoZXkgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgdmFyIHdob2xlQ2xvbmUgPSBuZXcgU2xvdExpc3QodGhpcy5oZWFkKTtcbiAgICAgICAgdmFyIHN1YkNsb25lID0gd2hvbGVDbG9uZTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLnRhaWw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBzdWJDbG9uZSA9IHN1YkNsb25lLnRhaWwgPSBuZXcgU2xvdExpc3QoY3VycmVudC5oZWFkKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBuZXcgc2xvdCBsYXN0LlxuICAgICAgICBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KHNsb3QpO1xuICAgICAgICByZXR1cm4gd2hvbGVDbG9uZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydCBhIHNsb3QgaW50byB0aGUgbGlzdCBpbiBhIHBvc2l0aW9uIGFjY29yZGluZyB0byBpdHMgcHJpb3JpdHkuXG4gICAgICogVGhlIGhpZ2hlciB0aGUgcHJpb3JpdHksIHRoZSBjbG9zZXIgdGhlIGl0ZW0gd2lsbCBiZSBpbnNlcnRlZCB0byB0aGUgbGlzdCBoZWFkLlxuICAgICAqIEBwYXJhbXMgc2xvdCBUaGUgaXRlbSB0byBiZSBpbnNlcnRlZC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVycyBoZWFkIGFuZCB0YWlsIGFyZSBudWxsLiBVc2UgdGhlIE5JTCBlbGVtZW50IGluc3RlYWQuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBQYXJhbWV0ZXIgaGVhZCBjYW5ub3QgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuaW5zZXJ0V2l0aFByaW9yaXR5ID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgdmFyIHByaW9yaXR5ID0gc2xvdC5wcmlvcml0eTtcbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlOiBuZXcgc2xvdCBoYXMgdGhlIGhpZ2hlc3QgcHJpb3JpdHkuXG4gICAgICAgIGlmIChwcmlvcml0eSA+IHRoaXMuaGVhZC5wcmlvcml0eSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBlbmQoc2xvdCk7XG4gICAgICAgIHZhciB3aG9sZUNsb25lID0gbmV3IFNsb3RMaXN0KHRoaXMuaGVhZCk7XG4gICAgICAgIHZhciBzdWJDbG9uZSA9IHdob2xlQ2xvbmU7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy50YWlsO1xuICAgICAgICAvLyBGaW5kIGEgc2xvdCB3aXRoIGxvd2VyIHByaW9yaXR5IGFuZCBnbyBpbiBmcm9udCBvZiBpdC5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA+IGN1cnJlbnQuaGVhZC5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgIHN1YkNsb25lLnRhaWwgPSBjdXJyZW50LnByZXBlbmQoc2xvdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJDbG9uZSA9IHN1YkNsb25lLnRhaWwgPSBuZXcgU2xvdExpc3QoY3VycmVudC5oZWFkKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2xvdCBoYXMgbG93ZXN0IHByaW9yaXR5LlxuICAgICAgICBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KHNsb3QpO1xuICAgICAgICByZXR1cm4gd2hvbGVDbG9uZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNsb3RzIGluIHRoaXMgbGlzdCB0aGF0IGRvIG5vdCBjb250YWluIHRoZSBzdXBwbGllZCBsaXN0ZW5lci5cbiAgICAgKiBOb3RlOiBhc3N1bWVzIHRoZSBsaXN0ZW5lciBpcyBub3QgcmVwZWF0ZWQgd2l0aGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSAgICBsaXN0ZW5lciBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4gQSBsaXN0IGNvbnNpc3Rpbmcgb2YgYWxsIGVsZW1lbnRzIG9mIHRoaXMgbGlzdCB0aGF0IGRvIG5vdCBoYXZlIGxpc3RlbmVyLlxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5maWx0ZXJOb3QgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5IHx8IGxpc3RlbmVyID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgaWYgKGxpc3RlbmVyID09IHRoaXMuaGVhZC5saXN0ZW5lcilcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhaWw7XG4gICAgICAgIC8vIFRoZSBmaXJzdCBpdGVtIHdhc24ndCBhIG1hdGNoIHNvIHRoZSBmaWx0ZXJlZCBsaXN0IHdpbGwgY29udGFpbiBpdC5cbiAgICAgICAgdmFyIHdob2xlQ2xvbmUgPSBuZXcgU2xvdExpc3QodGhpcy5oZWFkKTtcbiAgICAgICAgdmFyIHN1YkNsb25lID0gd2hvbGVDbG9uZTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLnRhaWw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5oZWFkLmxpc3RlbmVyID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gU3BsaWNlIG91dCB0aGUgY3VycmVudCBoZWFkLlxuICAgICAgICAgICAgICAgIHN1YkNsb25lLnRhaWwgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJDbG9uZSA9IHN1YkNsb25lLnRhaWwgPSBuZXcgU2xvdExpc3QoY3VycmVudC5oZWFkKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGxpc3RlbmVyIHdhcyBub3QgZm91bmQgc28gdGhpcyBsaXN0IGlzIHVuY2hhbmdlZC5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHN1cHBsaWVkIGxpc3RlbmVyIEZ1bmN0aW9uIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBsaXN0XG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgaWYgKHAuaGVhZC5saXN0ZW5lciA9PSBsaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHAgPSBwLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBJU2xvdCBhc3NvY2lhdGVkIHdpdGggYSBzdXBwbGllZCBsaXN0ZW5lciB3aXRoaW4gdGhlIFNsb3RMaXN0LlxuICAgICAqIEBwYXJhbSAgIGxpc3RlbmVyIFRoZSBGdW5jdGlvbiBiZWluZyBzZWFyY2hlZCBmb3JcbiAgICAgKiBAcmV0dXJuICBUaGUgSVNsb3QgaW4gdGhpcyBsaXN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgbGlzdGVuZXIgcGFyYW1ldGVyIHRocm91Z2ggdGhlIElTbG90Lmxpc3RlbmVyIHByb3BlcnR5LlxuICAgICAqICAgICAgICAgIFJldHVybnMgbnVsbCBpZiBubyBzdWNoIElTbG90IGluc3RhbmNlIGV4aXN0cyBvciB0aGUgbGlzdCBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMubm9uRW1wdHkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgaWYgKHAuaGVhZC5saXN0ZW5lciA9PSBsaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5oZWFkO1xuICAgICAgICAgICAgcCA9IHAudGFpbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgICAgICB2YXIgcCA9IHRoaXM7XG4gICAgICAgIHdoaWxlIChwLm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gcC5oZWFkICsgXCIgLT4gXCI7XG4gICAgICAgICAgICBwID0gcC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlciArPSBcIk5JTFwiO1xuICAgICAgICByZXR1cm4gXCJbTGlzdCBcIiArIGJ1ZmZlciArIFwiXVwiO1xuICAgIH07XG4gICAgcmV0dXJuIFNsb3RMaXN0O1xufSgpKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBlbXB0eSBsaXN0LiBVc2VkIGFzIHRoZSBsaXN0IHRlcm1pbmF0b3IuXG4gKi9cblNsb3RMaXN0Lk5JTCA9IG5ldyBTbG90TGlzdChudWxsLCBudWxsKTtcbmV4cG9ydHMuU2xvdExpc3QgPSBTbG90TGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNsb3RMaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3RMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtc2dwYWNrID0gcmVxdWlyZShcIm1zZ3BhY2stbGl0ZVwiKTtcbnZhciBzaWduYWxzX2pzXzEgPSByZXF1aXJlKFwic2lnbmFscy5qc1wiKTtcbnZhciBjb29raWUgPSByZXF1aXJlKFwiLi9Db29raWVcIik7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xudmFyIFJvb21fMSA9IHJlcXVpcmUoXCIuL1Jvb21cIik7XG52YXIgQ29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4vQ29ubmVjdGlvblwiKTtcbnZhciBDbGllbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENsaWVudCh1cmwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gc2lnbmFsc1xuICAgICAgICB0aGlzLm9uT3BlbiA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIHRoaXMub25NZXNzYWdlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5yb29tcyA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbl8xLkNvbm5lY3Rpb24odXJsKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMub25DbG9zZS5kaXNwYXRjaCgpOyB9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5vbkVycm9yLmRpc3BhdGNoKCk7IH07XG4gICAgICAgIC8vIGNoZWNrIGZvciBpZCBvbiBjb29raWVcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25vcGVuIVwiKTtcbiAgICAgICAgICAgIHZhciBjb2x5c2V1c2lkID0gY29va2llLmdldEl0ZW0oJ2NvbHlzZXVzaWQnKTtcbiAgICAgICAgICAgIGlmIChjb2x5c2V1c2lkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaWQgPSBjb2x5c2V1c2lkO1xuICAgICAgICAgICAgICAgIF90aGlzLm9uT3Blbi5kaXNwYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDbGllbnQucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiAocm9vbU5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy5yb29tID0gbmV3IFJvb21fMS5Sb29tKHJvb21OYW1lKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoW1Byb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9ST09NLCByb29tTmFtZSwgb3B0aW9uc10pO1xuICAgICAgICByZXR1cm4gdGhpcy5yb29tO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgQ2xpZW50LnByb3RvdHlwZS5vbk1lc3NhZ2VDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG1zZ3BhY2suZGVjb2RlKG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBtZXNzYWdlWzBdO1xuICAgICAgICBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLlVTRVJfSUQpIHtcbiAgICAgICAgICAgIGNvb2tpZS5zZXRJdGVtKCdjb2x5c2V1c2lkJywgbWVzc2FnZVsxXSk7XG4gICAgICAgICAgICB0aGlzLmlkID0gbWVzc2FnZVsxXTtcbiAgICAgICAgICAgIHRoaXMub25PcGVuLmRpc3BhdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSkge1xuICAgICAgICAgICAgdmFyIHJvb21fMSA9IHRoaXMucm9vbTtcbiAgICAgICAgICAgIHJvb21fMS5pZCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICByb29tXzEuY29ubmVjdChuZXcgQ29ubmVjdGlvbl8xLkNvbm5lY3Rpb24odGhpcy5jb25uZWN0aW9uLnVybCArIFwiL1wiICsgdGhpcy5yb29tLmlkKSk7XG4gICAgICAgICAgICByb29tXzEub25MZWF2ZS5hZGQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVsZXRlIF90aGlzLnJvb21zW3Jvb21fMS5pZF07IH0pO1xuICAgICAgICAgICAgdGhpcy5yb29tc1tyb29tXzEuaWRdID0gcm9vbV8xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5KT0lOX0VSUk9SKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VydmVyIGVycm9yOlwiLCBtZXNzYWdlWzJdKTtcbiAgICAgICAgICAgIC8vIGdlbmVyYWwgZXJyb3JcbiAgICAgICAgICAgIHRoaXMub25FcnJvci5kaXNwYXRjaChtZXNzYWdlWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25NZXNzYWdlLmRpc3BhdGNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2xpZW50O1xufSgpKTtcbmV4cG9ydHMuQ2xpZW50ID0gQ2xpZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQ2xpZW50LnRzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAgICAgIENvcHlyaWdodCAoYykgMjAxMiBNYXRoaWV1IFR1cmNvdHRlXG4vLyAgICAgIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxudmFyIEJhY2tvZmYgPSByZXF1aXJlKCcuL2xpYi9iYWNrb2ZmJyk7XG52YXIgRXhwb25lbnRpYWxCYWNrb2ZmU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xpYi9zdHJhdGVneS9leHBvbmVudGlhbCcpO1xudmFyIEZpYm9uYWNjaUJhY2tvZmZTdHJhdGVneSA9IHJlcXVpcmUoJy4vbGliL3N0cmF0ZWd5L2ZpYm9uYWNjaScpO1xudmFyIEZ1bmN0aW9uQ2FsbCA9IHJlcXVpcmUoJy4vbGliL2Z1bmN0aW9uX2NhbGwuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuQmFja29mZiA9IEJhY2tvZmY7XG5tb2R1bGUuZXhwb3J0cy5GdW5jdGlvbkNhbGwgPSBGdW5jdGlvbkNhbGw7XG5tb2R1bGUuZXhwb3J0cy5GaWJvbmFjY2lTdHJhdGVneSA9IEZpYm9uYWNjaUJhY2tvZmZTdHJhdGVneTtcbm1vZHVsZS5leHBvcnRzLkV4cG9uZW50aWFsU3RyYXRlZ3kgPSBFeHBvbmVudGlhbEJhY2tvZmZTdHJhdGVneTtcblxuLy8gQ29uc3RydWN0cyBhIEZpYm9uYWNjaSBiYWNrb2ZmLlxubW9kdWxlLmV4cG9ydHMuZmlib25hY2NpID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQmFja29mZihuZXcgRmlib25hY2NpQmFja29mZlN0cmF0ZWd5KG9wdGlvbnMpKTtcbn07XG5cbi8vIENvbnN0cnVjdHMgYW4gZXhwb25lbnRpYWwgYmFja29mZi5cbm1vZHVsZS5leHBvcnRzLmV4cG9uZW50aWFsID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQmFja29mZihuZXcgRXhwb25lbnRpYWxCYWNrb2ZmU3RyYXRlZ3kob3B0aW9ucykpO1xufTtcblxuLy8gQ29uc3RydWN0cyBhIEZ1bmN0aW9uQ2FsbCBmb3IgdGhlIGdpdmVuIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMuXG5tb2R1bGUuZXhwb3J0cy5jYWxsID0gZnVuY3Rpb24oZm4sIHZhcmdzLCBjYWxsYmFjaykge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBmbiA9IGFyZ3NbMF07XG4gICAgdmFyZ3MgPSBhcmdzLnNsaWNlKDEsIGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNhbGwoZm4sIHZhcmdzLCBjYWxsYmFjayk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhY2tvZmYvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDEyIE1hdGhpZXUgVHVyY290dGVcbi8vICAgICAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG52YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgcHJlY29uZCA9IHJlcXVpcmUoJ3ByZWNvbmQnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgQmFja29mZiA9IHJlcXVpcmUoJy4vYmFja29mZicpO1xudmFyIEZpYm9uYWNjaUJhY2tvZmZTdHJhdGVneSA9IHJlcXVpcmUoJy4vc3RyYXRlZ3kvZmlib25hY2NpJyk7XG5cbi8vIFdyYXBzIGEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGluIGEgYmFja29mZiBsb29wLlxuZnVuY3Rpb24gRnVuY3Rpb25DYWxsKGZuLCBhcmdzLCBjYWxsYmFjaykge1xuICAgIGV2ZW50cy5FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHByZWNvbmQuY2hlY2tJc0Z1bmN0aW9uKGZuLCAnRXhwZWN0ZWQgZm4gdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICBwcmVjb25kLmNoZWNrSXNBcnJheShhcmdzLCAnRXhwZWN0ZWQgYXJncyB0byBiZSBhbiBhcnJheS4nKTtcbiAgICBwcmVjb25kLmNoZWNrSXNGdW5jdGlvbihjYWxsYmFjaywgJ0V4cGVjdGVkIGNhbGxiYWNrIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG5cbiAgICB0aGlzLmZ1bmN0aW9uXyA9IGZuO1xuICAgIHRoaXMuYXJndW1lbnRzXyA9IGFyZ3M7XG4gICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcbiAgICB0aGlzLmxhc3RSZXN1bHRfID0gW107XG4gICAgdGhpcy5udW1SZXRyaWVzXyA9IDA7XG5cbiAgICB0aGlzLmJhY2tvZmZfID0gbnVsbDtcbiAgICB0aGlzLnN0cmF0ZWd5XyA9IG51bGw7XG4gICAgdGhpcy5mYWlsQWZ0ZXJfID0gLTE7XG4gICAgdGhpcy5yZXRyeVByZWRpY2F0ZV8gPSBGdW5jdGlvbkNhbGwuREVGQVVMVF9SRVRSWV9QUkVESUNBVEVfO1xuXG4gICAgdGhpcy5zdGF0ZV8gPSBGdW5jdGlvbkNhbGwuU3RhdGVfLlBFTkRJTkc7XG59XG51dGlsLmluaGVyaXRzKEZ1bmN0aW9uQ2FsbCwgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cbi8vIFN0YXRlcyBpbiB3aGljaCB0aGUgY2FsbCBjYW4gYmUuXG5GdW5jdGlvbkNhbGwuU3RhdGVfID0ge1xuICAgIC8vIENhbGwgaXNuJ3Qgc3RhcnRlZCB5ZXQuXG4gICAgUEVORElORzogMCxcbiAgICAvLyBDYWxsIGlzIGluIHByb2dyZXNzLlxuICAgIFJVTk5JTkc6IDEsXG4gICAgLy8gQ2FsbCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5IHdoaWNoIG1lYW5zIHRoYXQgZWl0aGVyIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gICAgLy8gcmV0dXJuZWQgc3VjY2Vzc2Z1bGx5IG9yIHRoZSBtYXhpbWFsIG51bWJlciBvZiBiYWNrb2ZmcyB3YXMgcmVhY2hlZC5cbiAgICBDT01QTEVURUQ6IDIsXG4gICAgLy8gVGhlIGNhbGwgd2FzIGFib3J0ZWQuXG4gICAgQUJPUlRFRDogM1xufTtcblxuLy8gVGhlIGRlZmF1bHQgcmV0cnkgcHJlZGljYXRlIHdoaWNoIGNvbnNpZGVycyBhbnkgZXJyb3IgYXMgcmV0cmlhYmxlLlxuRnVuY3Rpb25DYWxsLkRFRkFVTFRfUkVUUllfUFJFRElDQVRFXyA9IGZ1bmN0aW9uKGVycikge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIENoZWNrcyB3aGV0aGVyIHRoZSBjYWxsIGlzIHBlbmRpbmcuXG5GdW5jdGlvbkNhbGwucHJvdG90eXBlLmlzUGVuZGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlXyA9PSBGdW5jdGlvbkNhbGwuU3RhdGVfLlBFTkRJTkc7XG59O1xuXG4vLyBDaGVja3Mgd2hldGhlciB0aGUgY2FsbCBpcyBpbiBwcm9ncmVzcy5cbkZ1bmN0aW9uQ2FsbC5wcm90b3R5cGUuaXNSdW5uaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVfID09IEZ1bmN0aW9uQ2FsbC5TdGF0ZV8uUlVOTklORztcbn07XG5cbi8vIENoZWNrcyB3aGV0aGVyIHRoZSBjYWxsIGlzIGNvbXBsZXRlZC5cbkZ1bmN0aW9uQ2FsbC5wcm90b3R5cGUuaXNDb21wbGV0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZV8gPT0gRnVuY3Rpb25DYWxsLlN0YXRlXy5DT01QTEVURUQ7XG59O1xuXG4vLyBDaGVja3Mgd2hldGhlciB0aGUgY2FsbCBpcyBhYm9ydGVkLlxuRnVuY3Rpb25DYWxsLnByb3RvdHlwZS5pc0Fib3J0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZV8gPT0gRnVuY3Rpb25DYWxsLlN0YXRlXy5BQk9SVEVEO1xufTtcblxuLy8gU2V0cyB0aGUgYmFja29mZiBzdHJhdGVneSB0byB1c2UuIENhbiBvbmx5IGJlIGNhbGxlZCBiZWZvcmUgdGhlIGNhbGwgaXNcbi8vIHN0YXJ0ZWQgb3RoZXJ3aXNlIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbkZ1bmN0aW9uQ2FsbC5wcm90b3R5cGUuc2V0U3RyYXRlZ3kgPSBmdW5jdGlvbihzdHJhdGVneSkge1xuICAgIHByZWNvbmQuY2hlY2tTdGF0ZSh0aGlzLmlzUGVuZGluZygpLCAnRnVuY3Rpb25DYWxsIGluIHByb2dyZXNzLicpO1xuICAgIHRoaXMuc3RyYXRlZ3lfID0gc3RyYXRlZ3k7XG4gICAgcmV0dXJuIHRoaXM7IC8vIFJldHVybiB0aGlzIGZvciBjaGFpbmluZy5cbn07XG5cbi8vIFNldHMgdGhlIHByZWRpY2F0ZSB3aGljaCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGVycm9yc1xuLy8gcmV0dXJuZWQgZnJvbSB0aGUgd3JhcHBlZCBmdW5jdGlvbiBzaG91bGQgYmUgcmV0cmllZCBvciBub3QsIGUuZy4gYVxuLy8gbmV0d29yayBlcnJvciB3b3VsZCBiZSByZXRyaWFibGUgd2hpbGUgYSB0eXBlIGVycm9yIHdvdWxkIHN0b3AgdGhlXG4vLyBmdW5jdGlvbiBjYWxsLlxuRnVuY3Rpb25DYWxsLnByb3RvdHlwZS5yZXRyeUlmID0gZnVuY3Rpb24ocmV0cnlQcmVkaWNhdGUpIHtcbiAgICBwcmVjb25kLmNoZWNrU3RhdGUodGhpcy5pc1BlbmRpbmcoKSwgJ0Z1bmN0aW9uQ2FsbCBpbiBwcm9ncmVzcy4nKTtcbiAgICB0aGlzLnJldHJ5UHJlZGljYXRlXyA9IHJldHJ5UHJlZGljYXRlO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8gUmV0dXJucyBhbGwgaW50ZXJtZWRpYXJ5IHJlc3VsdHMgcmV0dXJuZWQgYnkgdGhlIHdyYXBwZWQgZnVuY3Rpb24gc2luY2Vcbi8vIHRoZSBpbml0aWFsIGNhbGwuXG5GdW5jdGlvbkNhbGwucHJvdG90eXBlLmdldExhc3RSZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sYXN0UmVzdWx0Xy5jb25jYXQoKTtcbn07XG5cbi8vIFJldHVybnMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGUgd3JhcHBlZCBmdW5jdGlvbiBjYWxsIHdhcyByZXRyaWVkLlxuRnVuY3Rpb25DYWxsLnByb3RvdHlwZS5nZXROdW1SZXRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubnVtUmV0cmllc187XG59O1xuXG4vLyBTZXRzIHRoZSBiYWNrb2ZmIGxpbWl0LlxuRnVuY3Rpb25DYWxsLnByb3RvdHlwZS5mYWlsQWZ0ZXIgPSBmdW5jdGlvbihtYXhOdW1iZXJPZlJldHJ5KSB7XG4gICAgcHJlY29uZC5jaGVja1N0YXRlKHRoaXMuaXNQZW5kaW5nKCksICdGdW5jdGlvbkNhbGwgaW4gcHJvZ3Jlc3MuJyk7XG4gICAgdGhpcy5mYWlsQWZ0ZXJfID0gbWF4TnVtYmVyT2ZSZXRyeTtcbiAgICByZXR1cm4gdGhpczsgLy8gUmV0dXJuIHRoaXMgZm9yIGNoYWluaW5nLlxufTtcblxuLy8gQWJvcnRzIHRoZSBjYWxsLlxuRnVuY3Rpb25DYWxsLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKCkgfHwgdGhpcy5pc0Fib3J0ZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzUnVubmluZygpKSB7XG4gICAgICAgIHRoaXMuYmFja29mZl8ucmVzZXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlXyA9IEZ1bmN0aW9uQ2FsbC5TdGF0ZV8uQUJPUlRFRDtcbiAgICB0aGlzLmxhc3RSZXN1bHRfID0gW25ldyBFcnJvcignQmFja29mZiBhYm9ydGVkLicpXTtcbiAgICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gICAgdGhpcy5kb0NhbGxiYWNrXygpO1xufTtcblxuLy8gSW5pdGlhdGVzIHRoZSBjYWxsIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uLiBBY2NlcHRzIGFuIG9wdGlvbmFsIGZhY3Rvcnlcbi8vIGZ1bmN0aW9uIHVzZWQgdG8gY3JlYXRlIHRoZSBiYWNrb2ZmIGluc3RhbmNlOyB1c2VkIHdoZW4gdGVzdGluZy5cbkZ1bmN0aW9uQ2FsbC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihiYWNrb2ZmRmFjdG9yeSkge1xuICAgIHByZWNvbmQuY2hlY2tTdGF0ZSghdGhpcy5pc0Fib3J0ZWQoKSwgJ0Z1bmN0aW9uQ2FsbCBpcyBhYm9ydGVkLicpO1xuICAgIHByZWNvbmQuY2hlY2tTdGF0ZSh0aGlzLmlzUGVuZGluZygpLCAnRnVuY3Rpb25DYWxsIGFscmVhZHkgc3RhcnRlZC4nKTtcblxuICAgIHZhciBzdHJhdGVneSA9IHRoaXMuc3RyYXRlZ3lfIHx8IG5ldyBGaWJvbmFjY2lCYWNrb2ZmU3RyYXRlZ3koKTtcblxuICAgIHRoaXMuYmFja29mZl8gPSBiYWNrb2ZmRmFjdG9yeSA/XG4gICAgICAgIGJhY2tvZmZGYWN0b3J5KHN0cmF0ZWd5KSA6XG4gICAgICAgIG5ldyBCYWNrb2ZmKHN0cmF0ZWd5KTtcblxuICAgIHRoaXMuYmFja29mZl8ub24oJ3JlYWR5JywgdGhpcy5kb0NhbGxfLmJpbmQodGhpcywgdHJ1ZSAvKiBpc1JldHJ5ICovKSk7XG4gICAgdGhpcy5iYWNrb2ZmXy5vbignZmFpbCcsIHRoaXMuZG9DYWxsYmFja18uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5iYWNrb2ZmXy5vbignYmFja29mZicsIHRoaXMuaGFuZGxlQmFja29mZl8uYmluZCh0aGlzKSk7XG5cbiAgICBpZiAodGhpcy5mYWlsQWZ0ZXJfID4gMCkge1xuICAgICAgICB0aGlzLmJhY2tvZmZfLmZhaWxBZnRlcih0aGlzLmZhaWxBZnRlcl8pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGVfID0gRnVuY3Rpb25DYWxsLlN0YXRlXy5SVU5OSU5HO1xuICAgIHRoaXMuZG9DYWxsXyhmYWxzZSAvKiBpc1JldHJ5ICovKTtcbn07XG5cbi8vIENhbGxzIHRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuRnVuY3Rpb25DYWxsLnByb3RvdHlwZS5kb0NhbGxfID0gZnVuY3Rpb24oaXNSZXRyeSkge1xuICAgIGlmIChpc1JldHJ5KSB7XG4gICAgICAgIHRoaXMubnVtUmV0cmllc18rKztcbiAgICB9XG4gICAgdmFyIGV2ZW50QXJncyA9IFsnY2FsbCddLmNvbmNhdCh0aGlzLmFyZ3VtZW50c18pO1xuICAgIGV2ZW50cy5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQuYXBwbHkodGhpcywgZXZlbnRBcmdzKTtcbiAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmhhbmRsZUZ1bmN0aW9uQ2FsbGJhY2tfLmJpbmQodGhpcyk7XG4gICAgdGhpcy5mdW5jdGlvbl8uYXBwbHkobnVsbCwgdGhpcy5hcmd1bWVudHNfLmNvbmNhdChjYWxsYmFjaykpO1xufTtcblxuLy8gQ2FsbHMgdGhlIHdyYXBwZWQgZnVuY3Rpb24ncyBjYWxsYmFjayB3aXRoIHRoZSBsYXN0IHJlc3VsdCByZXR1cm5lZCBieSB0aGVcbi8vIHdyYXBwZWQgZnVuY3Rpb24uXG5GdW5jdGlvbkNhbGwucHJvdG90eXBlLmRvQ2FsbGJhY2tfID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jYWxsYmFja18uYXBwbHkobnVsbCwgdGhpcy5sYXN0UmVzdWx0Xyk7XG59O1xuXG4vLyBIYW5kbGVzIHdyYXBwZWQgZnVuY3Rpb24ncyBjb21wbGV0aW9uLiBUaGlzIG1ldGhvZCBhY3RzIGFzIGEgcmVwbGFjZW1lbnRcbi8vIGZvciB0aGUgb3JpZ2luYWwgY2FsbGJhY2sgZnVuY3Rpb24uXG5GdW5jdGlvbkNhbGwucHJvdG90eXBlLmhhbmRsZUZ1bmN0aW9uQ2FsbGJhY2tfID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuaXNBYm9ydGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxhc3RSZXN1bHRfID0gYXJnczsgLy8gU2F2ZSBsYXN0IGNhbGxiYWNrIGFyZ3VtZW50cy5cbiAgICBldmVudHMuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0LmFwcGx5KHRoaXMsIFsnY2FsbGJhY2snXS5jb25jYXQoYXJncykpO1xuXG4gICAgdmFyIGVyciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyciAmJiB0aGlzLnJldHJ5UHJlZGljYXRlXyhlcnIpKSB7XG4gICAgICAgIHRoaXMuYmFja29mZl8uYmFja29mZihlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGVfID0gRnVuY3Rpb25DYWxsLlN0YXRlXy5DT01QTEVURUQ7XG4gICAgICAgIHRoaXMuZG9DYWxsYmFja18oKTtcbiAgICB9XG59O1xuXG4vLyBIYW5kbGVzIHRoZSBiYWNrb2ZmIGV2ZW50IGJ5IHJlZW1pdHRpbmcgaXQuXG5GdW5jdGlvbkNhbGwucHJvdG90eXBlLmhhbmRsZUJhY2tvZmZfID0gZnVuY3Rpb24obnVtYmVyLCBkZWxheSwgZXJyKSB7XG4gICAgdGhpcy5lbWl0KCdiYWNrb2ZmJywgbnVtYmVyLCBkZWxheSwgZXJyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25DYWxsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhY2tvZmYvbGliL2Z1bmN0aW9uX2NhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDEyIE1hdGhpZXUgVHVyY290dGVcbi8vICAgICAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBwcmVjb25kID0gcmVxdWlyZSgncHJlY29uZCcpO1xuXG52YXIgQmFja29mZlN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9zdHJhdGVneScpO1xuXG4vLyBFeHBvbmVudGlhbCBiYWNrb2ZmIHN0cmF0ZWd5LlxuZnVuY3Rpb24gRXhwb25lbnRpYWxCYWNrb2ZmU3RyYXRlZ3kob3B0aW9ucykge1xuICAgIEJhY2tvZmZTdHJhdGVneS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuYmFja29mZkRlbGF5XyA9IDA7XG4gICAgdGhpcy5uZXh0QmFja29mZkRlbGF5XyA9IHRoaXMuZ2V0SW5pdGlhbERlbGF5KCk7XG4gICAgdGhpcy5mYWN0b3JfID0gRXhwb25lbnRpYWxCYWNrb2ZmU3RyYXRlZ3kuREVGQVVMVF9GQUNUT1I7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByZWNvbmQuY2hlY2tBcmd1bWVudChvcHRpb25zLmZhY3RvciA+IDEsXG4gICAgICAgICAgICAnRXhwb25lbnRpYWwgZmFjdG9yIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gMSBidXQgZ290ICVzLicsXG4gICAgICAgICAgICBvcHRpb25zLmZhY3Rvcik7XG4gICAgICAgIHRoaXMuZmFjdG9yXyA9IG9wdGlvbnMuZmFjdG9yO1xuICAgIH1cbn1cbnV0aWwuaW5oZXJpdHMoRXhwb25lbnRpYWxCYWNrb2ZmU3RyYXRlZ3ksIEJhY2tvZmZTdHJhdGVneSk7XG5cbi8vIERlZmF1bHQgbXVsdGlwbGljYXRpb24gZmFjdG9yIHVzZWQgdG8gY29tcHV0ZSB0aGUgbmV4dCBiYWNrb2ZmIGRlbGF5IGZyb21cbi8vIHRoZSBjdXJyZW50IG9uZS4gVGhlIHZhbHVlIGNhbiBiZSBvdmVycmlkZGVuIGJ5IHBhc3NpbmcgYSBjdXN0b20gZmFjdG9yIGFzXG4vLyBwYXJ0IG9mIHRoZSBvcHRpb25zLlxuRXhwb25lbnRpYWxCYWNrb2ZmU3RyYXRlZ3kuREVGQVVMVF9GQUNUT1IgPSAyO1xuXG5FeHBvbmVudGlhbEJhY2tvZmZTdHJhdGVneS5wcm90b3R5cGUubmV4dF8gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJhY2tvZmZEZWxheV8gPSBNYXRoLm1pbih0aGlzLm5leHRCYWNrb2ZmRGVsYXlfLCB0aGlzLmdldE1heERlbGF5KCkpO1xuICAgIHRoaXMubmV4dEJhY2tvZmZEZWxheV8gPSB0aGlzLmJhY2tvZmZEZWxheV8gKiB0aGlzLmZhY3Rvcl87XG4gICAgcmV0dXJuIHRoaXMuYmFja29mZkRlbGF5Xztcbn07XG5cbkV4cG9uZW50aWFsQmFja29mZlN0cmF0ZWd5LnByb3RvdHlwZS5yZXNldF8gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJhY2tvZmZEZWxheV8gPSAwO1xuICAgIHRoaXMubmV4dEJhY2tvZmZEZWxheV8gPSB0aGlzLmdldEluaXRpYWxEZWxheSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBvbmVudGlhbEJhY2tvZmZTdHJhdGVneTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWNrb2ZmL2xpYi9zdHJhdGVneS9leHBvbmVudGlhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIHBsYWNlSG9sZGVycyA9IHBsYWNlSG9sZGVyc0NvdW50KGI2NClcblxuICBhcnIgPSBuZXcgQXJyKGxlbiAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2xvY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENsb2NrKGF1dG9TdGFydCkge1xuICAgICAgICBpZiAoYXV0b1N0YXJ0ID09PSB2b2lkIDApIHsgYXV0b1N0YXJ0ID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLm5vdyA9ICh0eXBlb2YgKHdpbmRvdykgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnBlcmZvcm1hbmNlICYmICh3aW5kb3cucGVyZm9ybWFuY2Uubm93KS5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSkpIHx8IERhdGUubm93O1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIC8vIGF1dG8gc2V0IGludGVydmFsIHRvIDYwIHRpY2tzIHBlciBzZWNvbmRcbiAgICAgICAgaWYgKGF1dG9TdGFydCkge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwMDAgLyA2MCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2xvY2sucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLm5vdygpO1xuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICB9O1xuICAgIENsb2NrLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9O1xuICAgIENsb2NrLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24gKG5ld1RpbWUpIHtcbiAgICAgICAgaWYgKG5ld1RpbWUgPT09IHZvaWQgMCkgeyBuZXdUaW1lID0gdGhpcy5ub3coKTsgfVxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IG5ld1RpbWUgLSB0aGlzLmN1cnJlbnRUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gbmV3VGltZTtcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSArPSB0aGlzLmRlbHRhVGltZTtcbiAgICB9O1xuICAgIHJldHVybiBDbG9jaztcbn0oKSk7XG5tb2R1bGUuZXhwb3J0cyA9IENsb2NrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nsb2NrLmpzL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGNvbXBhcmVfMSA9IHJlcXVpcmUoXCIuL2NvbXBhcmVcIik7XG52YXIgRGVsdGFDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlbHRhQ29udGFpbmVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5tYXRjaGVyUGxhY2Vob2xkZXJzID0ge1xuICAgICAgICAgICAgXCI6aWRcIjogL14oW2EtekEtWjAtOVxcLV9dKykkLyxcbiAgICAgICAgICAgIFwiOm51bWJlclwiOiAvXihbMC05XSspJC8sXG4gICAgICAgICAgICBcIjpzdHJpbmdcIjogL14oXFx3KykkLyxcbiAgICAgICAgICAgIFwiOmF4aXNcIjogL14oW3h5el0pJC8sXG4gICAgICAgICAgICBcIipcIjogLyguKikvLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgICB2YXIgcGF0Y2hlcyA9IGNvbXBhcmVfMS5jb21wYXJlKHRoaXMuZGF0YSwgbmV3RGF0YSk7XG4gICAgICAgIHRoaXMuY2hlY2tQYXRjaGVzKHBhdGNoZXMpO1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXdEYXRhO1xuICAgICAgICByZXR1cm4gcGF0Y2hlcztcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZWdpc3RlclBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKHBsYWNlaG9sZGVyLCBtYXRjaGVyKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlclBsYWNlaG9sZGVyc1twbGFjZWhvbGRlcl0gPSBtYXRjaGVyO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLmxpc3RlbiA9IGZ1bmN0aW9uIChzZWdtZW50cywgb3BlcmF0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcnVsZXM7XG4gICAgICAgIGlmICh0eXBlb2YgKHNlZ21lbnRzKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBydWxlcyA9IFtdO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWdtZW50cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJ1bGVzID0gc2VnbWVudHMuc3BsaXQoXCIvXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgIG9wZXJhdGlvbjogb3BlcmF0aW9uLFxuICAgICAgICAgICAgcnVsZXM6IHJ1bGVzLm1hcChmdW5jdGlvbiAoc2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHNlZ21lbnQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgcGxhY2Vob2xkZXIgbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzZWdtZW50LmluZGV4T2YoXCI6XCIpID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy5tYXRjaGVyUGxhY2Vob2xkZXJzW3NlZ21lbnRdIHx8IF90aGlzLm1hdGNoZXJQbGFjZWhvbGRlcnNbXCIqXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBSZWdFeHAoc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpc3RlbmVyc1tvcGVyYXRpb24gfHwgXCJcIl0ucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5saXN0ZW5lcnNbbGlzdGVuZXIub3BlcmF0aW9uXS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2xpc3RlbmVyLm9wZXJhdGlvbl1baV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbGlzdGVuZXIub3BlcmF0aW9uXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5jaGVja1BhdGNoZXMgPSBmdW5jdGlvbiAocGF0Y2hlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gcGF0Y2hlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBvcCA9IHBhdGNoZXNbaV0ub3A7XG4gICAgICAgICAgICBmb3IgKHZhciBqXzEgPSAwLCBsZW5fMSA9IHRoaXMubGlzdGVuZXJzW29wXS5sZW5ndGg7IGpfMSA8IGxlbl8xOyBqXzErKykge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW29wXVtqXzFdO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gdGhpcy5jaGVja1BhdGNoKHBhdGNoZXNbaV0sIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5hcHBseShsaXN0ZW5lciwgbWF0Y2hlcy5jb25jYXQoW3BhdGNoZXNbaV0udmFsdWVdKSk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBmYWxsYmFjayBsaXN0ZW5lclxuICAgICAgICAgICAgaWYgKCFtYXRjaGVkICYmIHRoaXMubGlzdGVuZXJzW1wiXCJdKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW1wiXCJdLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW1wiXCJdW2pdLmNhbGxiYWNrKHBhdGNoZXNbaV0ucGF0aCwgcGF0Y2hlc1tpXS5vcCwgcGF0Y2hlc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUuY2hlY2tQYXRjaCA9IGZ1bmN0aW9uIChwYXRjaCwgbGlzdGVuZXIpIHtcbiAgICAgICAgLy8gc2tpcCBpZiBydWxlcyBjb3VudCBkaWZmZXIgZnJvbSBwYXRjaFxuICAgICAgICBpZiAocGF0Y2gucGF0aC5sZW5ndGggIT09IGxpc3RlbmVyLnJ1bGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXRoVmFycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGlzdGVuZXIucnVsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gcGF0Y2gucGF0aFtpXS5tYXRjaChsaXN0ZW5lci5ydWxlc1tpXSk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPT09IDAgfHwgbWF0Y2hlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aFZhcnMgPSBwYXRoVmFycy5jb25jYXQobWF0Y2hlcy5zbGljZSgxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGhWYXJzO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICAgICAgICAgIFwiXCI6IFtdLFxuICAgICAgICAgICAgXCJhZGRcIjogW10sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiBbXSxcbiAgICAgICAgICAgIFwicmVwbGFjZVwiOiBbXVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIERlbHRhQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydHMuRGVsdGFDb250YWluZXIgPSBEZWx0YUNvbnRhaW5lcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9kZWx0YS1saXN0ZW5lci9saWIvRGVsdGFDb250YWluZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gY29tcGFyZSh0cmVlMSwgdHJlZTIpIHtcbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xuICAgIGdlbmVyYXRlKHRyZWUxLCB0cmVlMiwgcGF0Y2hlcywgW10pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcbmZ1bmN0aW9uIGRlZXBDbG9uZShvYmopIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBvYmopIHtcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7IC8vRmFzdGVyIHRoYW4gRVM1IGNsb25lIC0gaHR0cDovL2pzcGVyZi5jb20vZGVlcC1jbG9uaW5nLW9mLW9iamVjdHMvNVxuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy90aGlzIGlzIGhvdyBKU09OLnN0cmluZ2lmeSBiZWhhdmVzIGZvciBhcnJheSBpdGVtc1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG9iajsgLy9ubyBuZWVkIHRvIGNsb25lIHByaW1pdGl2ZXNcbiAgICB9XG59XG5mdW5jdGlvbiBvYmplY3RLZXlzKG9iaikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgdmFyIGtleXMgPSBuZXcgQXJyYXkob2JqLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAga2V5c1trXSA9IFwiXCIgKyBrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xufVxuO1xuLy8gRGlydHkgY2hlY2sgaWYgb2JqIGlzIGRpZmZlcmVudCBmcm9tIG1pcnJvciwgZ2VuZXJhdGUgcGF0Y2hlcyBhbmQgdXBkYXRlIG1pcnJvclxuZnVuY3Rpb24gZ2VuZXJhdGUobWlycm9yLCBvYmosIHBhdGNoZXMsIHBhdGgpIHtcbiAgICB2YXIgbmV3S2V5cyA9IG9iamVjdEtleXMob2JqKTtcbiAgICB2YXIgb2xkS2V5cyA9IG9iamVjdEtleXMobWlycm9yKTtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBkZWxldGVkID0gZmFsc2U7XG4gICAgZm9yICh2YXIgdCA9IG9sZEtleXMubGVuZ3RoIC0gMTsgdCA+PSAwOyB0LS0pIHtcbiAgICAgICAgdmFyIGtleSA9IG9sZEtleXNbdF07XG4gICAgICAgIHZhciBvbGRWYWwgPSBtaXJyb3Jba2V5XTtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICEob2JqW2tleV0gPT09IHVuZGVmaW5lZCAmJiBvbGRWYWwgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KG9iaikgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWwgPT0gXCJvYmplY3RcIiAmJiBvbGRWYWwgIT0gbnVsbCAmJiB0eXBlb2YgbmV3VmFsID09IFwib2JqZWN0XCIgJiYgbmV3VmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZShvbGRWYWwsIG5ld1ZhbCwgcGF0Y2hlcywgcGF0aC5jb25jYXQoa2V5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkVmFsICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wOiBcInJlcGxhY2VcIiwgcGF0aDogcGF0aC5jb25jYXQoa2V5KSwgdmFsdWU6IGRlZXBDbG9uZShuZXdWYWwpIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wOiBcInJlbW92ZVwiLCBwYXRoOiBwYXRoLmNvbmNhdChrZXkpIH0pO1xuICAgICAgICAgICAgZGVsZXRlZCA9IHRydWU7IC8vIHByb3BlcnR5IGhhcyBiZWVuIGRlbGV0ZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWRlbGV0ZWQgJiYgbmV3S2V5cy5sZW5ndGggPT0gb2xkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG5ld0tleXMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgdmFyIGtleSA9IG5ld0tleXNbdF07XG4gICAgICAgIGlmICghbWlycm9yLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHsgb3A6IFwiYWRkXCIsIHBhdGg6IHBhdGguY29uY2F0KGtleSksIHZhbHVlOiBkZWVwQ2xvbmUob2JqW2tleV0pIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2RlbHRhLWxpc3RlbmVyL2xpYi9jb21wYXJlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBEZWx0YUNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vRGVsdGFDb250YWluZXJcIik7XG5leHBvcnRzLkRlbHRhQ29udGFpbmVyID0gRGVsdGFDb250YWluZXJfMS5EZWx0YUNvbnRhaW5lcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9kZWx0YS1saXN0ZW5lci9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEZvc3NpbCBTQ00gZGVsdGEgY29tcHJlc3Npb24gYWxnb3JpdGhtXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vIEZvcm1hdDpcbi8vIGh0dHA6Ly93d3cuZm9zc2lsLXNjbS5vcmcvaW5kZXguaHRtbC9kb2MvdGlwL3d3dy9kZWx0YV9mb3JtYXQud2lraVxuLy9cbi8vIEFsZ29yaXRobTpcbi8vIGh0dHA6Ly93d3cuZm9zc2lsLXNjbS5vcmcvaW5kZXguaHRtbC9kb2MvdGlwL3d3dy9kZWx0YV9lbmNvZGVyX2FsZ29yaXRobS53aWtpXG4vL1xuLy8gT3JpZ2luYWwgaW1wbGVtZW50YXRpb246XG4vLyBodHRwOi8vd3d3LmZvc3NpbC1zY20ub3JnL2luZGV4Lmh0bWwvYXJ0aWZhY3QvZDFiMDU5OGFkY2Q2NTBiMzU1MWY2M2IxN2RmYzg2NGU3Mzc3NWMzZFxuLy9cbi8vIExJQ0VOU0Vcbi8vIC0tLS0tLS1cbi8vXG4vLyBDb3B5cmlnaHQgMjAxNCBEbWl0cnkgQ2hlc3RueWtoIChKYXZhU2NyaXB0IHBvcnQpXG4vLyBDb3B5cmlnaHQgMjAwNyBELiBSaWNoYXJkIEhpcHAgIChvcmlnaW5hbCBDIHZlcnNpb24pXG4vLyBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy9cbi8vIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Jcbi8vIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuLy9cbi8vICAgMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZVxuLy8gICAgICBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlXG4vLyAgICAgIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuLy9cbi8vICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZVxuLy8gICAgICBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlXG4vLyAgICAgIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlclxuLy8gICAgICBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuLy9cbi8vIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIEFVVEhPUlMgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbi8vIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuLy8gQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPTlRSSUJVVE9SUyBCRVxuLy8gTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuLy8gQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0Zcbi8vIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUlxuLy8gQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4vLyBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRVxuLy8gT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSxcbi8vIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4vL1xuLy8gVGhlIHZpZXdzIGFuZCBjb25jbHVzaW9ucyBjb250YWluZWQgaW4gdGhlIHNvZnR3YXJlIGFuZCBkb2N1bWVudGF0aW9uXG4vLyBhcmUgdGhvc2Ugb2YgdGhlIGF1dGhvcnMgYW5kIGNvbnRyaWJ1dG9ycyBhbmQgc2hvdWxkIG5vdCBiZSBpbnRlcnByZXRlZFxuLy8gYXMgcmVwcmVzZW50aW5nIG9mZmljaWFsIHBvbGljaWVzLCBlaXRoZXIgZXhwcmVzc2VkIG9yIGltcGxpZWQsIG9mIGFueWJvZHlcbi8vIGVsc2UuXG4vL1xuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgZWxzZSByb290LmZvc3NpbERlbHRhID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBmb3NzaWxEZWx0YSA9IHt9O1xuXG4vLyBIYXNoIHdpbmRvdyB3aWR0aCBpbiBieXRlcy4gTXVzdCBiZSBhIHBvd2VyIG9mIHR3by5cbnZhciBOSEFTSCA9IDE2O1xuXG5mdW5jdGlvbiBSb2xsaW5nSGFzaCgpIHtcbiAgdGhpcy5hID0gMDsgLy8gaGFzaCAgICAgKDE2LWJpdCB1bnNpZ25lZClcbiAgdGhpcy5iID0gMDsgLy8gdmFsdWVzICAgKDE2LWJpdCB1bnNpZ25lZClcbiAgdGhpcy5pID0gMDsgLy8gc3RhcnQgb2YgdGhlIGhhc2ggd2luZG93ICgxNi1iaXQgdW5zaWduZWQpXG4gIHRoaXMueiA9IG5ldyBBcnJheShOSEFTSCk7IC8vIHRoZSB2YWx1ZXMgdGhhdCBoYXZlIGJlZW4gaGFzaGVkLlxufVxuXG4vLyBJbml0aWFsaXplIHRoZSByb2xsaW5nIGhhc2ggdXNpbmcgdGhlIGZpcnN0IE5IQVNIIGJ5dGVzIG9mXG4vLyB6IGF0IHRoZSBnaXZlbiBwb3NpdGlvbi5cblJvbGxpbmdIYXNoLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oeiwgcG9zKSB7XG4gIHZhciBhID0gMCwgYiA9IDAsIGksIHg7XG4gIGZvcihpID0gMDsgaSA8IE5IQVNIOyBpKyspe1xuICAgIHggPSB6W3BvcytpXTtcbiAgICBhID0gKGEgKyB4KSAmIDB4ZmZmZjtcbiAgICBiID0gKGIgKyAoTkhBU0gtaSkqeCkgJiAweGZmZmY7XG4gICAgdGhpcy56W2ldID0geDtcbiAgfVxuICB0aGlzLmEgPSBhICYgMHhmZmZmO1xuICB0aGlzLmIgPSBiICYgMHhmZmZmO1xuICB0aGlzLmkgPSAwO1xufTtcblxuLy8gQWR2YW5jZSB0aGUgcm9sbGluZyBoYXNoIGJ5IGEgc2luZ2xlIGJ5dGUgXCJjXCIuXG5Sb2xsaW5nSGFzaC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKGMpIHtcbiAgdmFyIG9sZCA9IHRoaXMuelt0aGlzLmldO1xuICB0aGlzLnpbdGhpcy5pXSA9IGM7XG4gIHRoaXMuaSA9ICh0aGlzLmkrMSkmKE5IQVNILTEpO1xuICB0aGlzLmEgPSAodGhpcy5hIC0gb2xkICsgYykgJiAweGZmZmY7XG4gIHRoaXMuYiA9ICh0aGlzLmIgLSBOSEFTSCpvbGQgKyB0aGlzLmEpICYgMHhmZmZmO1xufTtcblxuLy8gUmV0dXJuIGEgMzItYml0IGhhc2ggdmFsdWUuXG5Sb2xsaW5nSGFzaC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICgodGhpcy5hICYgMHhmZmZmKSB8ICh0aGlzLmIgJiAweGZmZmYpPDwxNik+Pj4wO1xufTtcblxudmFyIHpEaWdpdHMgPSBcIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl9hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5en5cIi5cbiAgICAgICAgICAgICAgICBzcGxpdCgnJykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmNoYXJDb2RlQXQoMCk7IH0pO1xuXG52YXIgelZhbHVlID0gW1xuICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsICAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsICAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsICAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAgMCwgIDEsICAyLCAgMywgIDQsICA1LCAgNiwgIDcsICAgIDgsICA5LCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAtMSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsICAgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LFxuICAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMSwgMzIsICAgMzMsIDM0LCAzNSwgLTEsIC0xLCAtMSwgLTEsIDM2LFxuICAtMSwgMzcsIDM4LCAzOSwgNDAsIDQxLCA0MiwgNDMsICAgNDQsIDQ1LCA0NiwgNDcsIDQ4LCA0OSwgNTAsIDUxLFxuICA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksICAgNjAsIDYxLCA2MiwgLTEsIC0xLCAtMSwgNjMsIC0xXG5dO1xuXG4vLyBSZWFkZXIgcmVhZHMgYnl0ZXMsIGNoYXJzLCBpbnRzIGZyb20gYXJyYXkuXG5mdW5jdGlvbiBSZWFkZXIoYXJyYXkpIHtcbiAgdGhpcy5hID0gYXJyYXk7IC8vIHNvdXJjZSBhcnJheVxuICB0aGlzLnBvcyA9IDA7ICAgLy8gY3VycmVudCBwb3NpdGlvbiBpbiBhcnJheVxufVxuXG5SZWFkZXIucHJvdG90eXBlLmhhdmVCeXRlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wb3MgPCB0aGlzLmEubGVuZ3RoO1xufTtcblxuUmVhZGVyLnByb3RvdHlwZS5nZXRCeXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBiID0gdGhpcy5hW3RoaXMucG9zXTtcbiAgdGhpcy5wb3MrKztcbiAgaWYgKHRoaXMucG9zID4gdGhpcy5hLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiBib3VuZHMnKTtcbiAgcmV0dXJuIGI7XG59O1xuXG5SZWFkZXIucHJvdG90eXBlLmdldENoYXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5nZXRCeXRlKCkpO1xufTtcblxuICAvLyBSZWFkIGJhc2U2NC1lbmNvZGVkIHVuc2lnbmVkIGludGVnZXIuXG5SZWFkZXIucHJvdG90eXBlLmdldEludCA9IGZ1bmN0aW9uKCl7XG4gIHZhciB2ID0gMCwgYztcbiAgd2hpbGUodGhpcy5oYXZlQnl0ZXMoKSAmJiAoYyA9IHpWYWx1ZVsweDdmICYgdGhpcy5nZXRCeXRlKCldKSA+PSAwKSB7XG4gICAgIHYgPSAodjw8NikgKyBjO1xuICB9XG4gIHRoaXMucG9zLS07XG4gIHJldHVybiB2ID4+PiAwO1xufTtcblxuXG4vLyBXcml0ZSB3cml0ZXMgYW4gYXJyYXkuXG5mdW5jdGlvbiBXcml0ZXIoKSB7XG4gIHRoaXMuYSA9IFtdO1xufVxuXG5Xcml0ZXIucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuYTtcbn07XG5cbldyaXRlci5wcm90b3R5cGUucHV0Qnl0ZSA9IGZ1bmN0aW9uKGIpIHtcbiAgdGhpcy5hLnB1c2goYiAmIDB4ZmYpO1xufTtcblxuLy8gV3JpdGUgYW4gQVNDSUkgY2hhcmFjdGVyIChzIGlzIGEgb25lLWNoYXIgc3RyaW5nKS5cbldyaXRlci5wcm90b3R5cGUucHV0Q2hhciA9IGZ1bmN0aW9uKHMpIHtcbiAgdGhpcy5wdXRCeXRlKHMuY2hhckNvZGVBdCgwKSk7XG59O1xuXG4vLyBXcml0ZSBhIGJhc2U2NCB1bnNpZ25lZCBpbnRlZ2VyLlxuV3JpdGVyLnByb3RvdHlwZS5wdXRJbnQgPSBmdW5jdGlvbih2KXtcbiAgdmFyIGksIGosIHpCdWYgPSBbXTtcbiAgaWYgKHYgPT09IDApIHtcbiAgICB0aGlzLnB1dENoYXIoJzAnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yIChpID0gMDsgdiA+IDA7IGkrKywgdiA+Pj49IDYpXG4gICAgekJ1Zi5wdXNoKHpEaWdpdHNbdiYweDNmXSk7XG4gIGZvciAoaiA9IGktMTsgaiA+PSAwOyBqLS0pXG4gICAgdGhpcy5wdXRCeXRlKHpCdWZbal0pO1xufTtcblxuLy8gQ29weSBmcm9tIGFycmF5IGF0IHN0YXJ0IHRvIGVuZC5cbldyaXRlci5wcm90b3R5cGUucHV0QXJyYXkgPSBmdW5jdGlvbihhLCBzdGFydCwgZW5kKSB7XG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB0aGlzLmEucHVzaChhW2ldKTtcbn07XG5cbi8vIFJldHVybiB0aGUgbnVtYmVyIGRpZ2l0cyBpbiB0aGUgYmFzZTY0IHJlcHJlc2VudGF0aW9uIG9mIGEgcG9zaXRpdmUgaW50ZWdlci5cbmZ1bmN0aW9uIGRpZ2l0Q291bnQodil7XG4gIHZhciBpLCB4O1xuICBmb3IgKGkgPSAxLCB4ID0gNjQ7IHYgPj0geDsgaSsrLCB4IDw8PSA2KXsgLyogbm90aGluZyAqLyB9XG4gIHJldHVybiBpO1xufVxuXG4vLyBSZXR1cm4gYSAzMi1iaXQgY2hlY2tzdW0gb2YgdGhlIGFycmF5LlxuZnVuY3Rpb24gY2hlY2tzdW0oYXJyKSB7XG4gIHZhciBzdW0wID0gMCwgc3VtMSA9IDAsIHN1bTIgPSAwLCBzdW0zID0gMCxcbiAgICAgIHogPSAwLCBOID0gYXJyLmxlbmd0aDtcbiAgLy9UT0RPIG1lYXN1cmUgaWYgdGhpcyB1bnJvbGxpbmcgaXMgaGVscGZ1bC5cbiAgd2hpbGUgKE4gPj0gMTYpIHtcbiAgICBzdW0wID0gc3VtMCArIGFyclt6KzBdIHwgMDtcbiAgICBzdW0xID0gc3VtMSArIGFyclt6KzFdIHwgMDtcbiAgICBzdW0yID0gc3VtMiArIGFyclt6KzJdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzNdIHwgMDtcblxuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orNF0gfCAwO1xuICAgIHN1bTEgPSBzdW0xICsgYXJyW3orNV0gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orNl0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orN10gfCAwO1xuXG4gICAgc3VtMCA9IHN1bTAgKyBhcnJbeis4XSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeis5XSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisxMF0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orMTFdIHwgMDtcblxuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orMTJdIHwgMDtcbiAgICBzdW0xID0gc3VtMSArIGFyclt6KzEzXSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisxNF0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orMTVdIHwgMDtcblxuICAgIHogKz0gMTY7XG4gICAgTiAtPSAxNjtcbiAgfVxuICB3aGlsZSAoTiA+PSA0KSB7XG4gICAgc3VtMCA9IHN1bTAgKyBhcnJbeiswXSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeisxXSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisyXSB8IDA7XG4gICAgc3VtMyA9IHN1bTMgKyBhcnJbeiszXSB8IDA7XG4gICAgeiArPSA0O1xuICAgIE4gLT0gNDtcbiAgfVxuICBzdW0zID0gKCgoc3VtMyArIChzdW0yIDw8IDgpIHwgMCkgKyAoc3VtMSA8PCAxNikgfCAwKSArIChzdW0wIDw8IDI0KSB8IDApO1xuICAvKiBqc2hpbnQgLVcwODYgKi9cbiAgc3dpdGNoIChOKSB7XG4gICAgY2FzZSAzOiBzdW0zID0gc3VtMyArIChhcnJbeisyXSA8PCAgOCkgfCAwOyAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgY2FzZSAyOiBzdW0zID0gc3VtMyArIChhcnJbeisxXSA8PCAxNikgfCAwOyAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgY2FzZSAxOiBzdW0zID0gc3VtMyArIChhcnJbeiswXSA8PCAyNCkgfCAwOyAvKiBmYWxscyB0aHJvdWdoICovXG4gIH1cbiAgcmV0dXJuIHN1bTMgPj4+IDA7XG59XG5cbi8vIENyZWF0ZSBhIG5ldyBkZWx0YSBmcm9tIHNyYyB0byBvdXQuXG5mb3NzaWxEZWx0YS5jcmVhdGUgPSBmdW5jdGlvbihzcmMsIG91dCkge1xuICB2YXIgekRlbHRhID0gbmV3IFdyaXRlcigpO1xuICB2YXIgbGVuT3V0ID0gb3V0Lmxlbmd0aDtcbiAgdmFyIGxlblNyYyA9IHNyYy5sZW5ndGg7XG4gIHZhciBpLCBsYXN0UmVhZCA9IC0xO1xuXG4gIHpEZWx0YS5wdXRJbnQobGVuT3V0KTtcbiAgekRlbHRhLnB1dENoYXIoJ1xcbicpO1xuXG4gIC8vIElmIHRoZSBzb3VyY2UgaXMgdmVyeSBzbWFsbCwgaXQgbWVhbnMgdGhhdCB3ZSBoYXZlIG5vXG4gIC8vIGNoYW5jZSBvZiBldmVyIGRvaW5nIGEgY29weSBjb21tYW5kLiAgSnVzdCBvdXRwdXQgYSBzaW5nbGVcbiAgLy8gbGl0ZXJhbCBzZWdtZW50IGZvciB0aGUgZW50aXJlIHRhcmdldCBhbmQgZXhpdC5cbiAgaWYgKGxlblNyYyA8PSBOSEFTSCkge1xuICAgIHpEZWx0YS5wdXRJbnQobGVuT3V0KTtcbiAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgIHpEZWx0YS5wdXRBcnJheShvdXQsIDAsIGxlbk91dCk7XG4gICAgekRlbHRhLnB1dEludChjaGVja3N1bShvdXQpKTtcbiAgICB6RGVsdGEucHV0Q2hhcignOycpO1xuICAgIHJldHVybiB6RGVsdGEudG9BcnJheSgpO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUgaGFzaCB0YWJsZSB1c2VkIHRvIGxvY2F0ZSBtYXRjaGluZyBzZWN0aW9ucyBpbiB0aGUgc291cmNlLlxuICB2YXIgbkhhc2ggPSBNYXRoLmNlaWwobGVuU3JjIC8gTkhBU0gpO1xuICB2YXIgY29sbGlkZSA9ICBuZXcgQXJyYXkobkhhc2gpO1xuICB2YXIgbGFuZG1hcmsgPSBuZXcgQXJyYXkobkhhc2gpO1xuICBmb3IgKGkgPSAwOyBpIDwgY29sbGlkZS5sZW5ndGg7IGkrKykgY29sbGlkZVtpXSA9IC0xO1xuICBmb3IgKGkgPSAwOyBpIDwgbGFuZG1hcmsubGVuZ3RoOyBpKyspIGxhbmRtYXJrW2ldID0gLTE7XG4gIHZhciBodiwgaCA9IG5ldyBSb2xsaW5nSGFzaCgpO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuU3JjLU5IQVNIOyBpICs9IE5IQVNIKSB7XG4gICAgaC5pbml0KHNyYywgaSk7XG4gICAgaHYgPSBoLnZhbHVlKCkgJSBuSGFzaDtcbiAgICBjb2xsaWRlW2kvTkhBU0hdID0gbGFuZG1hcmtbaHZdO1xuICAgIGxhbmRtYXJrW2h2XSA9IGkvTkhBU0g7XG4gIH1cblxuICB2YXIgYmFzZSA9IDA7XG4gIHZhciBpU3JjLCBpQmxvY2ssIGJlc3RDbnQsIGJlc3RPZnN0LCBiZXN0TGl0c3o7XG4gIHdoaWxlIChiYXNlK05IQVNIPGxlbk91dCkge1xuICAgIGJlc3RPZnN0PTA7XG4gICAgYmVzdExpdHN6PTA7XG4gICAgaC5pbml0KG91dCwgYmFzZSk7XG4gICAgaSA9IDA7IC8vIFRyeWluZyB0byBtYXRjaCBhIGxhbmRtYXJrIGFnYWluc3Qgek91dFtiYXNlK2ldXG4gICAgYmVzdENudCA9IDA7XG4gICAgd2hpbGUoMSkge1xuICAgICAgdmFyIGxpbWl0ID0gMjUwO1xuICAgICAgaHYgPSBoLnZhbHVlKCkgJSBuSGFzaDtcbiAgICAgIGlCbG9jayA9IGxhbmRtYXJrW2h2XTtcbiAgICAgIHdoaWxlIChpQmxvY2sgPj0gMCAmJiAobGltaXQtLSk+MCApIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIGhhc2ggd2luZG93IGhhcyBpZGVudGlmaWVkIGEgcG90ZW50aWFsIG1hdGNoIGFnYWluc3RcbiAgICAgICAgLy8gbGFuZG1hcmsgYmxvY2sgaUJsb2NrLiAgQnV0IHdlIG5lZWQgdG8gaW52ZXN0aWdhdGUgZnVydGhlci5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gTG9vayBmb3IgYSByZWdpb24gaW4gek91dCB0aGF0IG1hdGNoZXMgelNyYy4gQW5jaG9yIHRoZSBzZWFyY2hcbiAgICAgICAgLy8gYXQgelNyY1tpU3JjXSBhbmQgek91dFtiYXNlK2ldLiAgRG8gbm90IGluY2x1ZGUgYW55dGhpbmcgcHJpb3IgdG9cbiAgICAgICAgLy8gek91dFtiYXNlXSBvciBhZnRlciB6T3V0W291dExlbl0gbm9yIGFueXRoaW5nIGFmdGVyIHpTcmNbc3JjTGVuXS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNudCBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBtYXRjaCBhbmQgc2V0IG9mc3Qgc28gdGhhdFxuICAgICAgICAvLyB6U3JjW29mc3RdIGlzIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBtYXRjaC4gIGxpdHN6IGlzIHRoZSBudW1iZXJcbiAgICAgICAgLy8gb2YgY2hhcmFjdGVycyBiZXR3ZWVuIHpPdXRbYmFzZV0gYW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG1hdGNoLlxuICAgICAgICAvLyBzeiB3aWxsIGJlIHRoZSBvdmVyaGVhZCAoaW4gYnl0ZXMpIG5lZWRlZCB0byBlbmNvZGUgdGhlIGNvcHlcbiAgICAgICAgLy8gY29tbWFuZC4gIE9ubHkgZ2VuZXJhdGUgY29weSBjb21tYW5kIGlmIHRoZSBvdmVyaGVhZCBvZiB0aGVcbiAgICAgICAgLy8gY29weSBjb21tYW5kIGlzIGxlc3MgdGhhbiB0aGUgYW1vdW50IG9mIGxpdGVyYWwgdGV4dCB0byBiZSBjb3BpZWQuXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBjbnQsIG9mc3QsIGxpdHN6O1xuICAgICAgICB2YXIgaiwgaywgeCwgeTtcbiAgICAgICAgdmFyIHN6O1xuXG4gICAgICAgIC8vIEJlZ2lubmluZyBhdCBpU3JjLCBtYXRjaCBmb3J3YXJkcyBhcyBmYXIgYXMgd2UgY2FuLlxuICAgICAgICAvLyBqIGNvdW50cyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBtYXRjaC5cbiAgICAgICAgaVNyYyA9IGlCbG9jaypOSEFTSDtcbiAgICAgICAgZm9yIChqID0gMCwgeCA9IGlTcmMsIHkgPSBiYXNlK2k7IHggPCBsZW5TcmMgJiYgeSA8IGxlbk91dDsgaisrLCB4KyssIHkrKykge1xuICAgICAgICAgIGlmIChzcmNbeF0gIT09IG91dFt5XSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgai0tO1xuXG4gICAgICAgIC8vIEJlZ2lubmluZyBhdCBpU3JjLTEsIG1hdGNoIGJhY2t3YXJkcyBhcyBmYXIgYXMgd2UgY2FuLlxuICAgICAgICAvLyBrIGNvdW50cyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBtYXRjaC5cbiAgICAgICAgZm9yIChrID0gMTsgayA8IGlTcmMgJiYgayA8PSBpOyBrKyspIHtcbiAgICAgICAgICBpZiAoc3JjW2lTcmMta10gIT09IG91dFtiYXNlK2kta10pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGstLTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBvZmZzZXQgYW5kIHNpemUgb2YgdGhlIG1hdGNoaW5nIHJlZ2lvbi5cbiAgICAgICAgb2ZzdCA9IGlTcmMtaztcbiAgICAgICAgY250ID0gaitrKzE7XG4gICAgICAgIGxpdHN6ID0gaS1rOyAgLy8gTnVtYmVyIG9mIGJ5dGVzIG9mIGxpdGVyYWwgdGV4dCBiZWZvcmUgdGhlIGNvcHlcbiAgICAgICAgLy8gc3ogd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIGVuY29kZSB0aGUgXCJpbnNlcnRcIlxuICAgICAgICAvLyBjb21tYW5kIGFuZCB0aGUgY29weSBjb21tYW5kLCBub3QgY291bnRpbmcgdGhlIFwiaW5zZXJ0XCIgdGV4dC5cbiAgICAgICAgc3ogPSBkaWdpdENvdW50KGktaykrZGlnaXRDb3VudChjbnQpK2RpZ2l0Q291bnQob2ZzdCkrMztcbiAgICAgICAgaWYgKGNudCA+PSBzeiAmJiBjbnQgPiBiZXN0Q250KSB7XG4gICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBtYXRjaCBvbmx5IGlmIGl0IGlzIHRoZSBiZXN0IHNvIGZhciBhbmQgaXRcbiAgICAgICAgICAvLyBkb2VzIG5vdCBpbmNyZWFzZSB0aGUgZmlsZSBzaXplLlxuICAgICAgICAgIGJlc3RDbnQgPSBjbnQ7XG4gICAgICAgICAgYmVzdE9mc3QgPSBpU3JjLWs7XG4gICAgICAgICAgYmVzdExpdHN6ID0gbGl0c3o7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0aGUgbmV4dCBtYXRjaGluZyBibG9ja1xuICAgICAgICBpQmxvY2sgPSBjb2xsaWRlW2lCbG9ja107XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGhhdmUgYSBjb3B5IGNvbW1hbmQgdGhhdCBkb2VzIG5vdCBjYXVzZSB0aGUgZGVsdGEgdG8gYmUgbGFyZ2VyXG4gICAgICAvLyB0aGFuIGEgbGl0ZXJhbCBpbnNlcnQuICBTbyBhZGQgdGhlIGNvcHkgY29tbWFuZCB0byB0aGUgZGVsdGEuXG4gICAgICBpZiAoYmVzdENudCA+IDApIHtcbiAgICAgICAgaWYgKGJlc3RMaXRzeiA+IDApIHtcbiAgICAgICAgICAvLyBBZGQgYW4gaW5zZXJ0IGNvbW1hbmQgYmVmb3JlIHRoZSBjb3B5LlxuICAgICAgICAgIHpEZWx0YS5wdXRJbnQoYmVzdExpdHN6KTtcbiAgICAgICAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgICAgICAgIHpEZWx0YS5wdXRBcnJheShvdXQsIGJhc2UsIGJhc2UrYmVzdExpdHN6KTtcbiAgICAgICAgICBiYXNlICs9IGJlc3RMaXRzejtcbiAgICAgICAgfVxuICAgICAgICBiYXNlICs9IGJlc3RDbnQ7XG4gICAgICAgIHpEZWx0YS5wdXRJbnQoYmVzdENudCk7XG4gICAgICAgIHpEZWx0YS5wdXRDaGFyKCdAJyk7XG4gICAgICAgIHpEZWx0YS5wdXRJbnQoYmVzdE9mc3QpO1xuICAgICAgICB6RGVsdGEucHV0Q2hhcignLCcpO1xuICAgICAgICBpZiAoYmVzdE9mc3QgKyBiZXN0Q250IC0xID4gbGFzdFJlYWQpIHtcbiAgICAgICAgICBsYXN0UmVhZCA9IGJlc3RPZnN0ICsgYmVzdENudCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgYmVzdENudCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSByZWFjaCB0aGlzIHBvaW50LCBpdCBtZWFucyBubyBtYXRjaCBpcyBmb3VuZCBzbyBmYXJcbiAgICAgIGlmIChiYXNlK2krTkhBU0ggPj0gbGVuT3V0KXtcbiAgICAgICAgLy8gV2UgaGF2ZSByZWFjaGVkIHRoZSBlbmQgYW5kIGhhdmUgbm90IGZvdW5kIGFueVxuICAgICAgICAvLyBtYXRjaGVzLiAgRG8gYW4gXCJpbnNlcnRcIiBmb3IgZXZlcnl0aGluZyB0aGF0IGRvZXMgbm90IG1hdGNoXG4gICAgICAgIHpEZWx0YS5wdXRJbnQobGVuT3V0LWJhc2UpO1xuICAgICAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgICAgICB6RGVsdGEucHV0QXJyYXkob3V0LCBiYXNlLCBiYXNlK2xlbk91dC1iYXNlKTtcbiAgICAgICAgYmFzZSA9IGxlbk91dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkdmFuY2UgdGhlIGhhc2ggYnkgb25lIGNoYXJhY3Rlci4gS2VlcCBsb29raW5nIGZvciBhIG1hdGNoLlxuICAgICAgaC5uZXh0KG91dFtiYXNlK2krTkhBU0hdKTtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgLy8gT3V0cHV0IGEgZmluYWwgXCJpbnNlcnRcIiByZWNvcmQgdG8gZ2V0IGFsbCB0aGUgdGV4dCBhdCB0aGUgZW5kIG9mXG4gIC8vIHRoZSBmaWxlIHRoYXQgZG9lcyBub3QgbWF0Y2ggYW55dGhpbmcgaW4gdGhlIHNvdXJjZS5cbiAgaWYoYmFzZSA8IGxlbk91dCkge1xuICAgIHpEZWx0YS5wdXRJbnQobGVuT3V0LWJhc2UpO1xuICAgIHpEZWx0YS5wdXRDaGFyKCc6Jyk7XG4gICAgekRlbHRhLnB1dEFycmF5KG91dCwgYmFzZSwgYmFzZStsZW5PdXQtYmFzZSk7XG4gIH1cbiAgLy8gT3V0cHV0IHRoZSBmaW5hbCBjaGVja3N1bSByZWNvcmQuXG4gIHpEZWx0YS5wdXRJbnQoY2hlY2tzdW0ob3V0KSk7XG4gIHpEZWx0YS5wdXRDaGFyKCc7Jyk7XG4gIHJldHVybiB6RGVsdGEudG9BcnJheSgpO1xufTtcblxuLy8gUmV0dXJuIHRoZSBzaXplIChpbiBieXRlcykgb2YgdGhlIG91dHB1dCBmcm9tIGFwcGx5aW5nIGEgZGVsdGEuXG5mb3NzaWxEZWx0YS5vdXRwdXRTaXplID0gZnVuY3Rpb24oZGVsdGEpe1xuICB2YXIgekRlbHRhID0gbmV3IFJlYWRlcihkZWx0YSk7XG4gIHZhciBzaXplID0gekRlbHRhLmdldEludCgpO1xuICBpZiAoekRlbHRhLmdldENoYXIoKSAhPT0gJ1xcbicpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaXplIGludGVnZXIgbm90IHRlcm1pbmF0ZWQgYnkgXFwnXFxcXG5cXCcnKTtcbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vLyBBcHBseSBhIGRlbHRhLlxuZm9zc2lsRGVsdGEuYXBwbHkgPSBmdW5jdGlvbihzcmMsIGRlbHRhKSB7XG4gIHZhciBsaW1pdCwgdG90YWwgPSAwO1xuICB2YXIgekRlbHRhID0gbmV3IFJlYWRlcihkZWx0YSk7XG4gIHZhciBsZW5TcmMgPSBzcmMubGVuZ3RoO1xuICB2YXIgbGVuRGVsdGEgPSBkZWx0YS5sZW5ndGg7XG5cbiAgbGltaXQgPSB6RGVsdGEuZ2V0SW50KCk7XG4gIGlmICh6RGVsdGEuZ2V0Q2hhcigpICE9PSAnXFxuJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NpemUgaW50ZWdlciBub3QgdGVybWluYXRlZCBieSBcXCdcXFxcblxcJycpO1xuICB2YXIgek91dCA9IG5ldyBXcml0ZXIoKTtcbiAgd2hpbGUoekRlbHRhLmhhdmVCeXRlcygpKSB7XG4gICAgdmFyIGNudCwgb2ZzdDtcbiAgICBjbnQgPSB6RGVsdGEuZ2V0SW50KCk7XG5cbiAgICBzd2l0Y2ggKHpEZWx0YS5nZXRDaGFyKCkpIHtcbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgICBvZnN0ID0gekRlbHRhLmdldEludCgpO1xuICAgICAgICBpZiAoekRlbHRhLmhhdmVCeXRlcygpICYmIHpEZWx0YS5nZXRDaGFyKCkgIT09ICcsJylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvcHkgY29tbWFuZCBub3QgdGVybWluYXRlZCBieSBcXCcsXFwnJyk7XG4gICAgICAgIHRvdGFsICs9IGNudDtcbiAgICAgICAgaWYgKHRvdGFsID4gbGltaXQpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3B5IGV4Y2VlZHMgb3V0cHV0IGZpbGUgc2l6ZScpO1xuICAgICAgICBpZiAob2ZzdCtjbnQgPiBsZW5TcmMpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3B5IGV4dGVuZHMgcGFzdCBlbmQgb2YgaW5wdXQnKTtcbiAgICAgICAgek91dC5wdXRBcnJheShzcmMsIG9mc3QsIG9mc3QrY250KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJzonOlxuICAgICAgICB0b3RhbCArPSBjbnQ7XG4gICAgICAgIGlmICh0b3RhbCA+IGxpbWl0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW5zZXJ0IGNvbW1hbmQgZ2l2ZXMgYW4gb3V0cHV0IGxhcmdlciB0aGFuIHByZWRpY3RlZCcpO1xuICAgICAgICBpZiAoY250ID4gbGVuRGVsdGEpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnNlcnQgY291bnQgZXhjZWVkcyBzaXplIG9mIGRlbHRhJyk7XG4gICAgICAgIHpPdXQucHV0QXJyYXkoekRlbHRhLmEsIHpEZWx0YS5wb3MsIHpEZWx0YS5wb3MrY250KTtcbiAgICAgICAgekRlbHRhLnBvcyArPSBjbnQ7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICc7JzpcbiAgICAgICAgdmFyIG91dCA9IHpPdXQudG9BcnJheSgpO1xuICAgICAgICBpZiAoY250ICE9PSBjaGVja3N1bShvdXQpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIGNoZWNrc3VtJyk7XG4gICAgICAgIGlmICh0b3RhbCAhPT0gbGltaXQpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZW5lcmF0ZWQgc2l6ZSBkb2VzIG5vdCBtYXRjaCBwcmVkaWN0ZWQgc2l6ZScpO1xuICAgICAgICByZXR1cm4gb3V0O1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gZGVsdGEgb3BlcmF0b3InKTtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgZGVsdGEnKTtcbn07XG5cbnJldHVybiBmb3NzaWxEZWx0YTtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZm9zc2lsLWRlbHRhL2Zvc3NpbC1kZWx0YS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZ2xvYmFscyBCdWZmZXIgKi9cblxubW9kdWxlLmV4cG9ydHMgPVxuICBjKChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgQnVmZmVyKSAmJiBCdWZmZXIpIHx8XG4gIGModGhpcy5CdWZmZXIpIHx8XG4gIGMoKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiB3aW5kb3cpICYmIHdpbmRvdy5CdWZmZXIpIHx8XG4gIHRoaXMuQnVmZmVyO1xuXG5mdW5jdGlvbiBjKEIpIHtcbiAgcmV0dXJuIEIgJiYgQi5pc0J1ZmZlciAmJiBCO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlci1nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJ1ZmZlci1saXRlLmpzXG5cbnZhciBNQVhCVUZMRU4gPSA4MTkyO1xuXG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuZXhwb3J0cy53cml0ZSA9IHdyaXRlO1xuXG4vKipcbiAqIEJ1ZmZlci5wcm90b3R5cGUud3JpdGUoKVxuICpcbiAqIEBwYXJhbSBzdHJpbmcge1N0cmluZ31cbiAqIEBwYXJhbSBbb2Zmc2V0XSB7TnVtYmVyfVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiB3cml0ZShzdHJpbmcsIG9mZnNldCkge1xuICB2YXIgYnVmZmVyID0gdGhpcztcbiAgdmFyIGluZGV4ID0gb2Zmc2V0IHx8IChvZmZzZXQgfD0gMCk7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB2YXIgY2hyID0gMDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgIGNociA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICBpZiAoY2hyIDwgMTI4KSB7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSBjaHI7XG4gICAgfSBlbHNlIGlmIChjaHIgPCAweDgwMCkge1xuICAgICAgLy8gMiBieXRlc1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHhDMCB8IChjaHIgPj4+IDYpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8IChjaHIgJiAweDNGKTtcbiAgICB9IGVsc2UgaWYgKGNociA8IDB4RDgwMCB8fCBjaHIgPiAweERGRkYpIHtcbiAgICAgIC8vIDMgYnl0ZXNcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4RTAgfCAoY2hyICA+Pj4gMTIpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8ICgoY2hyID4+PiA2KSAgJiAweDNGKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoY2hyICAgICAgICAgICYgMHgzRik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIDQgYnl0ZXMgLSBzdXJyb2dhdGUgcGFpclxuICAgICAgY2hyID0gKCgoY2hyIC0gMHhEODAwKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSsrKSAtIDB4REMwMCkpICsgMHgxMDAwMDtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4RjAgfCAoY2hyID4+PiAxOCk7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKChjaHIgPj4+IDEyKSAmIDB4M0YpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8ICgoY2hyID4+PiA2KSAgJiAweDNGKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoY2hyICAgICAgICAgICYgMHgzRik7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmRleCAtIG9mZnNldDtcbn1cblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nKClcbiAqXG4gKiBAcGFyYW0gW2VuY29kaW5nXSB7U3RyaW5nfSBpZ25vcmVkXG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBidWZmZXIgPSB0aGlzO1xuICB2YXIgaW5kZXggPSBzdGFydHwwO1xuICBpZiAoIWVuZCkgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgdmFyIHN0cmluZyA9ICcnO1xuICB2YXIgY2hyID0gMDtcblxuICB3aGlsZSAoaW5kZXggPCBlbmQpIHtcbiAgICBjaHIgPSBidWZmZXJbaW5kZXgrK107XG4gICAgaWYgKGNociA8IDEyOCkge1xuICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICgoY2hyICYgMHhFMCkgPT09IDB4QzApIHtcbiAgICAgIC8vIDIgYnl0ZXNcbiAgICAgIGNociA9IChjaHIgJiAweDFGKSA8PCA2IHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKTtcblxuICAgIH0gZWxzZSBpZiAoKGNociAmIDB4RjApID09PSAweEUwKSB7XG4gICAgICAvLyAzIGJ5dGVzXG4gICAgICBjaHIgPSAoY2hyICYgMHgwRikgICAgICAgICAgICAgPDwgMTIgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpIDw8IDYgIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKTtcblxuICAgIH0gZWxzZSBpZiAoKGNociAmIDB4RjgpID09PSAweEYwKSB7XG4gICAgICAvLyA0IGJ5dGVzXG4gICAgICBjaHIgPSAoY2hyICYgMHgwNykgICAgICAgICAgICAgPDwgMTggfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpIDw8IDEyIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKSA8PCA2ICB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRik7XG4gICAgfVxuXG4gICAgaWYgKGNociA+PSAweDAxMDAwMCkge1xuICAgICAgLy8gQSBzdXJyb2dhdGUgcGFpclxuICAgICAgY2hyIC09IDB4MDEwMDAwO1xuXG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoY2hyID4+PiAxMCkgKyAweEQ4MDAsIChjaHIgJiAweDNGRikgKyAweERDMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHJpbmc7XG59XG5cbi8qKlxuICogQnVmZmVyLnByb3RvdHlwZS5jb3B5KClcbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IHtCdWZmZXJ9XG4gKiBAcGFyYW0gW3RhcmdldFN0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiBjb3B5KHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGk7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwO1xuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG5cbiAgaWYgKHRhcmdldCA9PT0gdGhpcyAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZ1xuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYXNjZW5kaW5nXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGVuO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyLWxpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJ1ZmZlcmlzaC1hcnJheS5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gYWxsb2MoMCk7XG5cbmV4cG9ydHMuYWxsb2MgPSBhbGxvYztcbmV4cG9ydHMuY29uY2F0ID0gQnVmZmVyaXNoLmNvbmNhdDtcbmV4cG9ydHMuZnJvbSA9IGZyb207XG5cbi8qKlxuICogQHBhcmFtIHNpemUge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKCFCdWZmZXJpc2guaXNCdWZmZXIodmFsdWUpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKHZhbHVlKTtcbiAgfSBlbHNlIGlmIChCdWZmZXJpc2guaXNBcnJheUJ1ZmZlcih2YWx1ZSkpIHtcbiAgICAvLyBBcnJheUJ1ZmZlciB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gU3RyaW5nIHRvIEFycmF5XG4gICAgcmV0dXJuIEJ1ZmZlcmlzaC5mcm9tLmNhbGwoZXhwb3J0cywgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgLy8gQXJyYXktbGlrZSB0byBBcnJheVxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWUpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXJpc2gtYnVmZmVyLmpzXG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcblxudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgPyBhbGxvYygwKSA6IFtdO1xuXG5leHBvcnRzLmFsbG9jID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiBCdWZmZXIuYWxsb2MgfHwgYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IEJ1ZmZlcmlzaC5jb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gdmFsdWUge0FycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxTdHJpbmd9XG4gKiBAcmV0dXJucyB7QnVmZmVyfVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKCFCdWZmZXJpc2guaXNCdWZmZXIodmFsdWUpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKHZhbHVlKTtcbiAgfSBlbHNlIGlmIChCdWZmZXJpc2guaXNBcnJheUJ1ZmZlcih2YWx1ZSkpIHtcbiAgICAvLyBBcnJheUJ1ZmZlciB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gU3RyaW5nIHRvIEJ1ZmZlclxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIC8vIEFycmF5LWxpa2UgdG8gQnVmZmVyXG4gIGlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbS5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWUpOyAvLyBub2RlIHY2K1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHZhbHVlKTsgLy8gbm9kZSB2NFxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXJpc2gtdWludDhhcnJheS5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gQnVmZmVyaXNoLmhhc0FycmF5QnVmZmVyID8gYWxsb2MoMCkgOiBbXTtcblxuZXhwb3J0cy5hbGxvYyA9IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBCdWZmZXJpc2guY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBBcnJheUJ1ZmZlclxuICAgIHZhciBieXRlT2Zmc2V0ID0gdmFsdWUuYnl0ZU9mZnNldDtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgdmFsdWUgPSB2YWx1ZS5idWZmZXI7XG4gICAgaWYgKHZhbHVlLmJ5dGVMZW5ndGggIT09IGJ5dGVMZW5ndGgpIHtcbiAgICAgIGlmICh2YWx1ZS5zbGljZSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFuZHJvaWQgNC4xIGRvZXMgbm90IGhhdmUgQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlXG4gICAgICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUuYnl0ZUxlbmd0aCAhPT0gYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIC8vIFR5cGVkQXJyYXkgdG8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheSB0byBBcnJheVxuICAgICAgICAgIHZhbHVlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWUsIGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBTdHJpbmcgdG8gVWludDhBcnJheVxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtdWludDhhcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY29kZWMuanNcblxuLy8gbG9hZCBib3RoIGludGVyZmFjZXNcbnJlcXVpcmUoXCIuL3JlYWQtY29yZVwiKTtcbnJlcXVpcmUoXCIuL3dyaXRlLWNvcmVcIik7XG5cbi8vIEBwdWJsaWNcbi8vIG1zZ3BhY2suY29kZWMucHJlc2V0XG5cbmV4cG9ydHMuY29kZWMgPSB7XG4gIHByZXNldDogcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKS5wcmVzZXRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9jb2RlYy5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZGVjb2Rlci5qc1xuXG5leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG52YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG52YXIgRGVjb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZGVjb2RlLWJ1ZmZlclwiKS5EZWNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIERlY29kZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVjb2RlcikpIHJldHVybiBuZXcgRGVjb2RlcihvcHRpb25zKTtcbiAgRGVjb2RlQnVmZmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlID0gbmV3IERlY29kZUJ1ZmZlcigpO1xuXG5FdmVudExpdGUubWl4aW4oRGVjb2Rlci5wcm90b3R5cGUpO1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihjaHVuaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy53cml0ZShjaHVuayk7XG4gIHRoaXMuZmx1c2goKTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihjaHVuaykge1xuICB0aGlzLmVtaXQoXCJkYXRhXCIsIGNodW5rKTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHRoaXMuZGVjb2RlKGNodW5rKTtcbiAgdGhpcy5lbWl0KFwiZW5kXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2RlY29kZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGVuY29kZXIuanNcblxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjtcblxudmFyIEV2ZW50TGl0ZSA9IHJlcXVpcmUoXCJldmVudC1saXRlXCIpO1xudmFyIEVuY29kZUJ1ZmZlciA9IHJlcXVpcmUoXCIuL2VuY29kZS1idWZmZXJcIikuRW5jb2RlQnVmZmVyO1xuXG5mdW5jdGlvbiBFbmNvZGVyKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEVuY29kZXIpKSByZXR1cm4gbmV3IEVuY29kZXIob3B0aW9ucyk7XG4gIEVuY29kZUJ1ZmZlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG5FbmNvZGVyLnByb3RvdHlwZSA9IG5ldyBFbmNvZGVCdWZmZXIoKTtcblxuRXZlbnRMaXRlLm1peGluKEVuY29kZXIucHJvdG90eXBlKTtcblxuRW5jb2Rlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgdGhpcy53cml0ZShjaHVuayk7XG4gIHRoaXMuZW1pdChcImRhdGFcIiwgdGhpcy5yZWFkKCkpO1xufTtcblxuRW5jb2Rlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHRoaXMuZW5jb2RlKGNodW5rKTtcbiAgdGhpcy5mbHVzaCgpO1xuICB0aGlzLmVtaXQoXCJlbmRcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvZW5jb2Rlci5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LXBhY2tlci5qc1xuXG5leHBvcnRzLnNldEV4dFBhY2tlcnMgPSBzZXRFeHRQYWNrZXJzO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG52YXIgcGFja1R5cGVkQXJyYXkgPSBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tO1xudmFyIF9lbmNvZGU7XG5cbnZhciBFUlJPUl9DT0xVTU5TID0ge25hbWU6IDEsIG1lc3NhZ2U6IDEsIHN0YWNrOiAxLCBjb2x1bW5OdW1iZXI6IDEsIGZpbGVOYW1lOiAxLCBsaW5lTnVtYmVyOiAxfTtcblxuZnVuY3Rpb24gc2V0RXh0UGFja2Vycyhjb2RlYykge1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwRSwgRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwMSwgRXZhbEVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDIsIFJhbmdlRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwMywgUmVmZXJlbmNlRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwNCwgU3ludGF4RXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwNSwgVHlwZUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDYsIFVSSUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcblxuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwQSwgUmVnRXhwLCBbcGFja1JlZ0V4cCwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBCLCBCb29sZWFuLCBbcGFja1ZhbHVlT2YsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwQywgU3RyaW5nLCBbcGFja1ZhbHVlT2YsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwRCwgRGF0ZSwgW051bWJlciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBGLCBOdW1iZXIsIFtwYWNrVmFsdWVPZiwgZW5jb2RlXSk7XG5cbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OEFycmF5KSB7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTEsIEludDhBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDEyLCBVaW50OEFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTMsIEludDE2QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNCwgVWludDE2QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNSwgSW50MzJBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE2LCBVaW50MzJBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE3LCBGbG9hdDMyQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcblxuICAgIC8vIFBoYW50b21KUy8xLjkuNyBkb2Vzbid0IGhhdmUgRmxvYXQ2NEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBGbG9hdDY0QXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE4LCBGbG9hdDY0QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICB9XG5cbiAgICAvLyBJRTEwIGRvZXNuJ3QgaGF2ZSBVaW50OENsYW1wZWRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE5LCBVaW50OENsYW1wZWRBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIH1cblxuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDFBLCBBcnJheUJ1ZmZlciwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDFELCBEYXRhVmlldywgcGFja1R5cGVkQXJyYXkpO1xuICB9XG5cbiAgaWYgKEJ1ZmZlcmlzaC5oYXNCdWZmZXIpIHtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxQiwgQnVmZmVyLCBCdWZmZXJpc2guZnJvbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG4gIGlmICghX2VuY29kZSkgX2VuY29kZSA9IHJlcXVpcmUoXCIuL2VuY29kZVwiKS5lbmNvZGU7IC8vIGxhenkgbG9hZFxuICByZXR1cm4gX2VuY29kZShpbnB1dCk7XG59XG5cbmZ1bmN0aW9uIHBhY2tWYWx1ZU9mKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUpLnZhbHVlT2YoKTtcbn1cblxuZnVuY3Rpb24gcGFja1JlZ0V4cCh2YWx1ZSkge1xuICB2YWx1ZSA9IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc3BsaXQoXCIvXCIpO1xuICB2YWx1ZS5zaGlmdCgpO1xuICB2YXIgb3V0ID0gW3ZhbHVlLnBvcCgpXTtcbiAgb3V0LnVuc2hpZnQodmFsdWUuam9pbihcIi9cIikpO1xuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwYWNrRXJyb3IodmFsdWUpIHtcbiAgdmFyIG91dCA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gRVJST1JfQ09MVU1OUykge1xuICAgIG91dFtrZXldID0gdmFsdWVba2V5XTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21zZ3BhY2stbGl0ZS9saWIvZXh0LXBhY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LXVucGFja2VyLmpzXG5cbmV4cG9ydHMuc2V0RXh0VW5wYWNrZXJzID0gc2V0RXh0VW5wYWNrZXJzO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG52YXIgX2RlY29kZTtcblxudmFyIEVSUk9SX0NPTFVNTlMgPSB7bmFtZTogMSwgbWVzc2FnZTogMSwgc3RhY2s6IDEsIGNvbHVtbk51bWJlcjogMSwgZmlsZU5hbWU6IDEsIGxpbmVOdW1iZXI6IDF9O1xuXG5mdW5jdGlvbiBzZXRFeHRVbnBhY2tlcnMoY29kZWMpIHtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwRSwgW2RlY29kZSwgdW5wYWNrRXJyb3IoRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDEsIFtkZWNvZGUsIHVucGFja0Vycm9yKEV2YWxFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwMiwgW2RlY29kZSwgdW5wYWNrRXJyb3IoUmFuZ2VFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwMywgW2RlY29kZSwgdW5wYWNrRXJyb3IoUmVmZXJlbmNlRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDQsIFtkZWNvZGUsIHVucGFja0Vycm9yKFN5bnRheEVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDA1LCBbZGVjb2RlLCB1bnBhY2tFcnJvcihUeXBlRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDYsIFtkZWNvZGUsIHVucGFja0Vycm9yKFVSSUVycm9yKV0pO1xuXG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEEsIFtkZWNvZGUsIHVucGFja1JlZ0V4cF0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBCLCBbZGVjb2RlLCB1bnBhY2tDbGFzcyhCb29sZWFuKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBDLCBbZGVjb2RlLCB1bnBhY2tDbGFzcyhTdHJpbmcpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEQsIFtkZWNvZGUsIHVucGFja0NsYXNzKERhdGUpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEYsIFtkZWNvZGUsIHVucGFja0NsYXNzKE51bWJlcildKTtcblxuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDExLCB1bnBhY2tDbGFzcyhJbnQ4QXJyYXkpKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDEyLCB1bnBhY2tDbGFzcyhVaW50OEFycmF5KSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxMywgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhJbnQxNkFycmF5KV0pO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTQsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoVWludDE2QXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNSwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhJbnQzMkFycmF5KV0pO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTYsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoVWludDMyQXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNywgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhGbG9hdDMyQXJyYXkpXSk7XG5cbiAgICAvLyBQaGFudG9tSlMvMS45LjcgZG9lc24ndCBoYXZlIEZsb2F0NjRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgRmxvYXQ2NEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE4LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEZsb2F0NjRBcnJheSldKTtcbiAgICB9XG5cbiAgICAvLyBJRTEwIGRvZXNuJ3QgaGF2ZSBVaW50OENsYW1wZWRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTksIHVucGFja0NsYXNzKFVpbnQ4Q2xhbXBlZEFycmF5KSk7XG4gICAgfVxuXG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxQSwgdW5wYWNrQXJyYXlCdWZmZXIpO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MUQsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoRGF0YVZpZXcpXSk7XG4gIH1cblxuICBpZiAoQnVmZmVyaXNoLmhhc0J1ZmZlcikge1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MUIsIHVucGFja0NsYXNzKEJ1ZmZlcikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICBpZiAoIV9kZWNvZGUpIF9kZWNvZGUgPSByZXF1aXJlKFwiLi9kZWNvZGVcIikuZGVjb2RlOyAvLyBsYXp5IGxvYWRcbiAgcmV0dXJuIF9kZWNvZGUoaW5wdXQpO1xufVxuXG5mdW5jdGlvbiB1bnBhY2tSZWdFeHAodmFsdWUpIHtcbiAgcmV0dXJuIFJlZ0V4cC5hcHBseShudWxsLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHVucGFja0Vycm9yKENsYXNzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBvdXQgPSBuZXcgQ2xhc3MoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gRVJST1JfQ09MVU1OUykge1xuICAgICAgb3V0W2tleV0gPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9O1xufVxuXG5mdW5jdGlvbiB1bnBhY2tDbGFzcyhDbGFzcykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IENsYXNzKHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdW5wYWNrQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuIChuZXcgVWludDhBcnJheSh2YWx1ZSkpLmJ1ZmZlcjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2V4dC11bnBhY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LmpzXG5cbi8vIGxvYWQgYm90aCBpbnRlcmZhY2VzXG5yZXF1aXJlKFwiLi9yZWFkLWNvcmVcIik7XG5yZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpO1xuXG5leHBvcnRzLmNyZWF0ZUNvZGVjID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKS5jcmVhdGVDb2RlYztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL2V4dC5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVhZC10b2tlbi5qc1xuXG52YXIgUmVhZEZvcm1hdCA9IHJlcXVpcmUoXCIuL3JlYWQtZm9ybWF0XCIpO1xuXG5leHBvcnRzLmdldFJlYWRUb2tlbiA9IGdldFJlYWRUb2tlbjtcblxuZnVuY3Rpb24gZ2V0UmVhZFRva2VuKG9wdGlvbnMpIHtcbiAgdmFyIGZvcm1hdCA9IFJlYWRGb3JtYXQuZ2V0UmVhZEZvcm1hdChvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnVzZXJhdykge1xuICAgIHJldHVybiBpbml0X3VzZXJhdyhmb3JtYXQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBpbml0X3Rva2VuKGZvcm1hdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdF90b2tlbihmb3JtYXQpIHtcbiAgdmFyIGk7XG4gIHZhciB0b2tlbiA9IG5ldyBBcnJheSgyNTYpO1xuXG4gIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICBmb3IgKGkgPSAweDAwOyBpIDw9IDB4N2Y7IGkrKykge1xuICAgIHRva2VuW2ldID0gY29uc3RhbnQoaSk7XG4gIH1cblxuICAvLyBmaXhtYXAgLS0gMHg4MCAtIDB4OGZcbiAgZm9yIChpID0gMHg4MDsgaSA8PSAweDhmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGZpeChpIC0gMHg4MCwgZm9ybWF0Lm1hcCk7XG4gIH1cblxuICAvLyBmaXhhcnJheSAtLSAweDkwIC0gMHg5ZlxuICBmb3IgKGkgPSAweDkwOyBpIDw9IDB4OWY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweDkwLCBmb3JtYXQuYXJyYXkpO1xuICB9XG5cbiAgLy8gZml4c3RyIC0tIDB4YTAgLSAweGJmXG4gIGZvciAoaSA9IDB4YTA7IGkgPD0gMHhiZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4YTAsIGZvcm1hdC5zdHIpO1xuICB9XG5cbiAgLy8gbmlsIC0tIDB4YzBcbiAgdG9rZW5bMHhjMF0gPSBjb25zdGFudChudWxsKTtcblxuICAvLyAobmV2ZXIgdXNlZCkgLS0gMHhjMVxuICB0b2tlblsweGMxXSA9IG51bGw7XG5cbiAgLy8gZmFsc2UgLS0gMHhjMlxuICAvLyB0cnVlIC0tIDB4YzNcbiAgdG9rZW5bMHhjMl0gPSBjb25zdGFudChmYWxzZSk7XG4gIHRva2VuWzB4YzNdID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgLy8gYmluIDggLS0gMHhjNFxuICAvLyBiaW4gMTYgLS0gMHhjNVxuICAvLyBiaW4gMzIgLS0gMHhjNlxuICB0b2tlblsweGM0XSA9IGZsZXgoZm9ybWF0LnVpbnQ4LCBmb3JtYXQuYmluKTtcbiAgdG9rZW5bMHhjNV0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5iaW4pO1xuICB0b2tlblsweGM2XSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LmJpbik7XG5cbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICB0b2tlblsweGM3XSA9IGZsZXgoZm9ybWF0LnVpbnQ4LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhjOF0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGM5XSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LmV4dCk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gZm9ybWF0LmZsb2F0MzI7XG4gIHRva2VuWzB4Y2JdID0gZm9ybWF0LmZsb2F0NjQ7XG5cbiAgLy8gdWludCA4IC0tIDB4Y2NcbiAgLy8gdWludCAxNiAtLSAweGNkXG4gIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgdG9rZW5bMHhjY10gPSBmb3JtYXQudWludDg7XG4gIHRva2VuWzB4Y2RdID0gZm9ybWF0LnVpbnQxNjtcbiAgdG9rZW5bMHhjZV0gPSBmb3JtYXQudWludDMyO1xuICB0b2tlblsweGNmXSA9IGZvcm1hdC51aW50NjQ7XG5cbiAgLy8gaW50IDggLS0gMHhkMFxuICAvLyBpbnQgMTYgLS0gMHhkMVxuICAvLyBpbnQgMzIgLS0gMHhkMlxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICB0b2tlblsweGQwXSA9IGZvcm1hdC5pbnQ4O1xuICB0b2tlblsweGQxXSA9IGZvcm1hdC5pbnQxNjtcbiAgdG9rZW5bMHhkMl0gPSBmb3JtYXQuaW50MzI7XG4gIHRva2VuWzB4ZDNdID0gZm9ybWF0LmludDY0O1xuXG4gIC8vIGZpeGV4dCAxIC0tIDB4ZDRcbiAgLy8gZml4ZXh0IDIgLS0gMHhkNVxuICAvLyBmaXhleHQgNCAtLSAweGQ2XG4gIC8vIGZpeGV4dCA4IC0tIDB4ZDdcbiAgLy8gZml4ZXh0IDE2IC0tIDB4ZDhcbiAgdG9rZW5bMHhkNF0gPSBmaXgoMSwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDVdID0gZml4KDIsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ2XSA9IGZpeCg0LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhkN10gPSBmaXgoOCwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDhdID0gZml4KDE2LCBmb3JtYXQuZXh0KTtcblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gZmxleChmb3JtYXQudWludDgsIGZvcm1hdC5zdHIpO1xuICB0b2tlblsweGRhXSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0LnN0cik7XG4gIHRva2VuWzB4ZGJdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQuc3RyKTtcblxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgdG9rZW5bMHhkY10gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5hcnJheSk7XG4gIHRva2VuWzB4ZGRdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQuYXJyYXkpO1xuXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIHRva2VuWzB4ZGVdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQubWFwKTtcbiAgdG9rZW5bMHhkZl0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5tYXApO1xuXG4gIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICBmb3IgKGkgPSAweGUwOyBpIDw9IDB4ZmY7IGkrKykge1xuICAgIHRva2VuW2ldID0gY29uc3RhbnQoaSAtIDB4MTAwKTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gaW5pdF91c2VyYXcoZm9ybWF0KSB7XG4gIHZhciBpO1xuICB2YXIgdG9rZW4gPSBpbml0X3Rva2VuKGZvcm1hdCkuc2xpY2UoKTtcblxuICAvLyByYXcgOCAtLSAweGQ5XG4gIC8vIHJhdyAxNiAtLSAweGRhXG4gIC8vIHJhdyAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gdG9rZW5bMHhjNF07XG4gIHRva2VuWzB4ZGFdID0gdG9rZW5bMHhjNV07XG4gIHRva2VuWzB4ZGJdID0gdG9rZW5bMHhjNl07XG5cbiAgLy8gZml4cmF3IC0tIDB4YTAgLSAweGJmXG4gIGZvciAoaSA9IDB4YTA7IGkgPD0gMHhiZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4YTAsIGZvcm1hdC5iaW4pO1xuICB9XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmbGV4KGxlbkZ1bmMsIGRlY29kZUZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICB2YXIgbGVuID0gbGVuRnVuYyhkZWNvZGVyKTtcbiAgICByZXR1cm4gZGVjb2RlRnVuYyhkZWNvZGVyLCBsZW4pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaXgobGVuLCBtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICByZXR1cm4gbWV0aG9kKGRlY29kZXIsIGxlbik7XG4gIH07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vbXNncGFjay1saXRlL2xpYi9yZWFkLXRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS10b2tlbi5qc1xuXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoXCJpZWVlNzU0XCIpO1xudmFyIEludDY0QnVmZmVyID0gcmVxdWlyZShcImludDY0LWJ1ZmZlclwiKTtcbnZhciBVaW50NjRCRSA9IEludDY0QnVmZmVyLlVpbnQ2NEJFO1xudmFyIEludDY0QkUgPSBJbnQ2NEJ1ZmZlci5JbnQ2NEJFO1xuXG52YXIgdWludDggPSByZXF1aXJlKFwiLi93cml0ZS11aW50OFwiKS51aW50ODtcbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcbnZhciBJU19CVUZGRVJfU0hJTSA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgKFwiVFlQRURfQVJSQVlfU1VQUE9SVFwiIGluIEJ1ZmZlcik7XG52YXIgTk9fVFlQRURfQVJSQVkgPSBJU19CVUZGRVJfU0hJTSAmJiAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQ7XG52YXIgQnVmZmVyX3Byb3RvdHlwZSA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgQnVmZmVyLnByb3RvdHlwZSB8fCB7fTtcblxuZXhwb3J0cy5nZXRXcml0ZVRva2VuID0gZ2V0V3JpdGVUb2tlbjtcblxuZnVuY3Rpb24gZ2V0V3JpdGVUb2tlbihvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMudWludDhhcnJheSkge1xuICAgIHJldHVybiBpbml0X3VpbnQ4YXJyYXkoKTtcbiAgfSBlbHNlIGlmIChOT19UWVBFRF9BUlJBWSB8fCAoQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiBvcHRpb25zICYmIG9wdGlvbnMuc2FmZSkpIHtcbiAgICByZXR1cm4gaW5pdF9zYWZlKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGluaXRfdG9rZW4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0X3VpbnQ4YXJyYXkoKSB7XG4gIHZhciB0b2tlbiA9IGluaXRfdG9rZW4oKTtcblxuICAvLyBmbG9hdCAzMiAtLSAweGNhXG4gIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgdG9rZW5bMHhjYV0gPSB3cml0ZU4oMHhjYSwgNCwgd3JpdGVGbG9hdEJFKTtcbiAgdG9rZW5bMHhjYl0gPSB3cml0ZU4oMHhjYiwgOCwgd3JpdGVEb3VibGVCRSk7XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG4vLyBOb2RlLmpzIGFuZCBicm93c2VycyB3aXRoIFR5cGVkQXJyYXlcblxuZnVuY3Rpb24gaW5pdF90b2tlbigpIHtcbiAgLy8gKGltbWVkaWF0ZSB2YWx1ZXMpXG4gIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICAvLyBuaWwgLS0gMHhjMFxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgdmFyIHRva2VuID0gdWludDguc2xpY2UoKTtcblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIHRva2VuWzB4YzRdID0gd3JpdGUxKDB4YzQpO1xuICB0b2tlblsweGM1XSA9IHdyaXRlMigweGM1KTtcbiAgdG9rZW5bMHhjNl0gPSB3cml0ZTQoMHhjNik7XG5cbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICB0b2tlblsweGM3XSA9IHdyaXRlMSgweGM3KTtcbiAgdG9rZW5bMHhjOF0gPSB3cml0ZTIoMHhjOCk7XG4gIHRva2VuWzB4YzldID0gd3JpdGU0KDB4YzkpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IHdyaXRlTigweGNhLCA0LCAoQnVmZmVyX3Byb3RvdHlwZS53cml0ZUZsb2F0QkUgfHwgd3JpdGVGbG9hdEJFKSwgdHJ1ZSk7XG4gIHRva2VuWzB4Y2JdID0gd3JpdGVOKDB4Y2IsIDgsIChCdWZmZXJfcHJvdG90eXBlLndyaXRlRG91YmxlQkUgfHwgd3JpdGVEb3VibGVCRSksIHRydWUpO1xuXG4gIC8vIHVpbnQgOCAtLSAweGNjXG4gIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAvLyB1aW50IDMyIC0tIDB4Y2VcbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIHRva2VuWzB4Y2NdID0gd3JpdGUxKDB4Y2MpO1xuICB0b2tlblsweGNkXSA9IHdyaXRlMigweGNkKTtcbiAgdG9rZW5bMHhjZV0gPSB3cml0ZTQoMHhjZSk7XG4gIHRva2VuWzB4Y2ZdID0gd3JpdGVOKDB4Y2YsIDgsIHdyaXRlVUludDY0QkUpO1xuXG4gIC8vIGludCA4IC0tIDB4ZDBcbiAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgLy8gaW50IDMyIC0tIDB4ZDJcbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgdG9rZW5bMHhkMF0gPSB3cml0ZTEoMHhkMCk7XG4gIHRva2VuWzB4ZDFdID0gd3JpdGUyKDB4ZDEpO1xuICB0b2tlblsweGQyXSA9IHdyaXRlNCgweGQyKTtcbiAgdG9rZW5bMHhkM10gPSB3cml0ZU4oMHhkMywgOCwgd3JpdGVJbnQ2NEJFKTtcblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gd3JpdGUxKDB4ZDkpO1xuICB0b2tlblsweGRhXSA9IHdyaXRlMigweGRhKTtcbiAgdG9rZW5bMHhkYl0gPSB3cml0ZTQoMHhkYik7XG5cbiAgLy8gYXJyYXkgMTYgLS0gMHhkY1xuICAvLyBhcnJheSAzMiAtLSAweGRkXG4gIHRva2VuWzB4ZGNdID0gd3JpdGUyKDB4ZGMpO1xuICB0b2tlblsweGRkXSA9IHdyaXRlNCgweGRkKTtcblxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICB0b2tlblsweGRlXSA9IHdyaXRlMigweGRlKTtcbiAgdG9rZW5bMHhkZl0gPSB3cml0ZTQoMHhkZik7XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG4vLyBzYWZlIG1vZGU6IGZvciBvbGQgYnJvd3NlcnMgYW5kIHdobyBuZWVkcyBhc3NlcnRzXG5cbmZ1bmN0aW9uIGluaXRfc2FmZSgpIHtcbiAgLy8gKGltbWVkaWF0ZSB2YWx1ZXMpXG4gIC8vIHBvc2l0aXZlIGZpeGludCAtLSAweDAwIC0gMHg3ZlxuICAvLyBuaWwgLS0gMHhjMFxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgdmFyIHRva2VuID0gdWludDguc2xpY2UoKTtcblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIHRva2VuWzB4YzRdID0gd3JpdGVOKDB4YzQsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCk7XG4gIHRva2VuWzB4YzVdID0gd3JpdGVOKDB4YzUsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4YzZdID0gd3JpdGVOKDB4YzYsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICB0b2tlblsweGM3XSA9IHdyaXRlTigweGM3LCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGM4XSA9IHdyaXRlTigweGM4LCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGM5XSA9IHdyaXRlTigweGM5LCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IHdyaXRlTigweGNhLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSk7XG4gIHRva2VuWzB4Y2JdID0gd3JpdGVOKDB4Y2IsIDgsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSk7XG5cbiAgLy8gdWludCA4IC0tIDB4Y2NcbiAgLy8gdWludCAxNiAtLSAweGNkXG4gIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgdG9rZW5bMHhjY10gPSB3cml0ZU4oMHhjYywgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhjZF0gPSB3cml0ZU4oMHhjZCwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhjZV0gPSB3cml0ZU4oMHhjZSwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcbiAgdG9rZW5bMHhjZl0gPSB3cml0ZU4oMHhjZiwgOCwgd3JpdGVVSW50NjRCRSk7XG5cbiAgLy8gaW50IDggLS0gMHhkMFxuICAvLyBpbnQgMTYgLS0gMHhkMVxuICAvLyBpbnQgMzIgLS0gMHhkMlxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICB0b2tlblsweGQwXSA9IHdyaXRlTigweGQwLCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCk7XG4gIHRva2VuWzB4ZDFdID0gd3JpdGVOKDB4ZDEsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkMl0gPSB3cml0ZU4oMHhkMiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUpO1xuICB0b2tlblsweGQzXSA9IHdyaXRlTigweGQzLCA4LCB3cml0ZUludDY0QkUpO1xuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgdG9rZW5bMHhkOV0gPSB3cml0ZU4oMHhkOSwgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhkYV0gPSB3cml0ZU4oMHhkYSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkYl0gPSB3cml0ZU4oMHhkYiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgdG9rZW5bMHhkY10gPSB3cml0ZU4oMHhkYywgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkZF0gPSB3cml0ZU4oMHhkZCwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICB0b2tlblsweGRlXSA9IHdyaXRlTigweGRlLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGRmXSA9IHdyaXRlTigweGRmLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gd3JpdGUxKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSgyKTtcbiAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgYnVmZmVyW29mZnNldF0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGUyKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSgzKTtcbiAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiA4O1xuICAgIGJ1ZmZlcltvZmZzZXRdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyaXRlNCh0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUoNSk7XG4gICAgdmFyIGJ1ZmZlciA9IGVuY29kZXIuYnVmZmVyO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0eXBlO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSA+Pj4gMjQ7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiAxNjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDg7XG4gICAgYnVmZmVyW29mZnNldF0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGVOKHR5cGUsIGxlbiwgbWV0aG9kLCBub0Fzc2VydCkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKGxlbiArIDEpO1xuICAgIGVuY29kZXIuYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgbWV0aG9kLmNhbGwoZW5jb2Rlci5idWZmZXIsIHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGVVSW50NjRCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIG5ldyBVaW50NjRCRSh0aGlzLCBvZmZzZXQsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVJbnQ2NEJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgbmV3IEludDY0QkUodGhpcywgb2Zmc2V0LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXRCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIGllZWU3NTQud3JpdGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIDIzLCA0KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGVCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIGllZWU3NTQud3JpdGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIDUyLCA4KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS10eXBlLmpzXG5cbnZhciBJU19BUlJBWSA9IHJlcXVpcmUoXCJpc2FycmF5XCIpO1xudmFyIEludDY0QnVmZmVyID0gcmVxdWlyZShcImludDY0LWJ1ZmZlclwiKTtcbnZhciBVaW50NjRCRSA9IEludDY0QnVmZmVyLlVpbnQ2NEJFO1xudmFyIEludDY0QkUgPSBJbnQ2NEJ1ZmZlci5JbnQ2NEJFO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlclByb3RvID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLXByb3RvXCIpO1xudmFyIFdyaXRlVG9rZW4gPSByZXF1aXJlKFwiLi93cml0ZS10b2tlblwiKTtcbnZhciB1aW50OCA9IHJlcXVpcmUoXCIuL3dyaXRlLXVpbnQ4XCIpLnVpbnQ4O1xudmFyIEV4dEJ1ZmZlciA9IHJlcXVpcmUoXCIuL2V4dC1idWZmZXJcIikuRXh0QnVmZmVyO1xuXG52YXIgSEFTX1VJTlQ4QVJSQVkgPSAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpO1xudmFyIEhBU19NQVAgPSAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIE1hcCk7XG5cbnZhciBleHRtYXAgPSBbXTtcbmV4dG1hcFsxXSA9IDB4ZDQ7XG5leHRtYXBbMl0gPSAweGQ1O1xuZXh0bWFwWzRdID0gMHhkNjtcbmV4dG1hcFs4XSA9IDB4ZDc7XG5leHRtYXBbMTZdID0gMHhkODtcblxuZXhwb3J0cy5nZXRXcml0ZVR5cGUgPSBnZXRXcml0ZVR5cGU7XG5cbmZ1bmN0aW9uIGdldFdyaXRlVHlwZShvcHRpb25zKSB7XG4gIHZhciB0b2tlbiA9IFdyaXRlVG9rZW4uZ2V0V3JpdGVUb2tlbihvcHRpb25zKTtcbiAgdmFyIHVzZXJhdyA9IG9wdGlvbnMgJiYgb3B0aW9ucy51c2VyYXc7XG4gIHZhciBiaW5hcnJheWJ1ZmZlciA9IEhBU19VSU5UOEFSUkFZICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5iaW5hcnJheWJ1ZmZlcjtcbiAgdmFyIGlzQnVmZmVyID0gYmluYXJyYXlidWZmZXIgPyBCdWZmZXJpc2guaXNBcnJheUJ1ZmZlciA6IEJ1ZmZlcmlzaC5pc0J1ZmZlcjtcbiAgdmFyIGJpbiA9IGJpbmFycmF5YnVmZmVyID8gYmluX2FycmF5YnVmZmVyIDogYmluX2J1ZmZlcjtcbiAgdmFyIHVzZW1hcCA9IEhBU19NQVAgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnVzZW1hcDtcbiAgdmFyIG1hcCA9IHVzZW1hcCA/IG1hcF90b19tYXAgOiBvYmpfdG9fbWFwO1xuXG4gIHZhciB3cml0ZVR5cGUgPSB7XG4gICAgXCJib29sZWFuXCI6IGJvb2wsXG4gICAgXCJmdW5jdGlvblwiOiBuaWwsXG4gICAgXCJudW1iZXJcIjogbnVtYmVyLFxuICAgIFwib2JqZWN0XCI6ICh1c2VyYXcgPyBvYmplY3RfcmF3IDogb2JqZWN0KSxcbiAgICBcInN0cmluZ1wiOiBfc3RyaW5nKHVzZXJhdyA/IHJhd19oZWFkX3NpemUgOiBzdHJfaGVhZF9zaXplKSxcbiAgICBcInN5bWJvbFwiOiBuaWwsXG4gICAgXCJ1bmRlZmluZWRcIjogbmlsXG4gIH07XG5cbiAgcmV0dXJuIHdyaXRlVHlwZTtcblxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICBmdW5jdGlvbiBib29sKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSB2YWx1ZSA/IDB4YzMgOiAweGMyO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG51bWJlcihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBpdmFsdWUgPSB2YWx1ZSB8IDA7XG4gICAgdmFyIHR5cGU7XG4gICAgaWYgKHZhbHVlICE9PSBpdmFsdWUpIHtcbiAgICAgIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgICAgIHR5cGUgPSAweGNiO1xuICAgICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoLTB4MjAgPD0gaXZhbHVlICYmIGl2YWx1ZSA8PSAweDdGKSB7XG4gICAgICAvLyBwb3NpdGl2ZSBmaXhpbnQgLS0gMHgwMCAtIDB4N2ZcbiAgICAgIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICAgICAgdHlwZSA9IGl2YWx1ZSAmIDB4RkY7XG4gICAgfSBlbHNlIGlmICgwIDw9IGl2YWx1ZSkge1xuICAgICAgLy8gdWludCA4IC0tIDB4Y2NcbiAgICAgIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAgICAgLy8gdWludCAzMiAtLSAweGNlXG4gICAgICB0eXBlID0gKGl2YWx1ZSA8PSAweEZGKSA/IDB4Y2MgOiAoaXZhbHVlIDw9IDB4RkZGRikgPyAweGNkIDogMHhjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW50IDggLS0gMHhkMFxuICAgICAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgICAgIC8vIGludCAzMiAtLSAweGQyXG4gICAgICB0eXBlID0gKC0weDgwIDw9IGl2YWx1ZSkgPyAweGQwIDogKC0weDgwMDAgPD0gaXZhbHVlKSA/IDB4ZDEgOiAweGQyO1xuICAgIH1cbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBpdmFsdWUpO1xuICB9XG5cbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIGZ1bmN0aW9uIHVpbnQ2NChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gMHhjZjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZS50b0FycmF5KCkpO1xuICB9XG5cbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgZnVuY3Rpb24gaW50NjQoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IDB4ZDM7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgLy8gZml4c3RyIC0tIDB4YTAgLSAweGJmXG4gIGZ1bmN0aW9uIHN0cl9oZWFkX3NpemUobGVuZ3RoKSB7XG4gICAgcmV0dXJuIChsZW5ndGggPCAzMikgPyAxIDogKGxlbmd0aCA8PSAweEZGKSA/IDIgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAzIDogNTtcbiAgfVxuXG4gIC8vIHJhdyAxNiAtLSAweGRhXG4gIC8vIHJhdyAzMiAtLSAweGRiXG4gIC8vIGZpeHJhdyAtLSAweGEwIC0gMHhiZlxuICBmdW5jdGlvbiByYXdfaGVhZF9zaXplKGxlbmd0aCkge1xuICAgIHJldHVybiAobGVuZ3RoIDwgMzIpID8gMSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDMgOiA1O1xuICB9XG5cbiAgZnVuY3Rpb24gX3N0cmluZyhoZWFkX3NpemUpIHtcbiAgICByZXR1cm4gc3RyaW5nO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5nKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgICAvLyBwcmVwYXJlIGJ1ZmZlclxuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgIHZhciBtYXhzaXplID0gNSArIGxlbmd0aCAqIDM7XG4gICAgICBlbmNvZGVyLm9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZShtYXhzaXplKTtcbiAgICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcblxuICAgICAgLy8gZXhwZWN0ZWQgaGVhZGVyIHNpemVcbiAgICAgIHZhciBleHBlY3RlZCA9IGhlYWRfc2l6ZShsZW5ndGgpO1xuXG4gICAgICAvLyBleHBlY3RlZCBzdGFydCBwb2ludFxuICAgICAgdmFyIHN0YXJ0ID0gZW5jb2Rlci5vZmZzZXQgKyBleHBlY3RlZDtcblxuICAgICAgLy8gd3JpdGUgc3RyaW5nXG4gICAgICBsZW5ndGggPSBCdWZmZXJQcm90by53cml0ZS5jYWxsKGJ1ZmZlciwgdmFsdWUsIHN0YXJ0KTtcblxuICAgICAgLy8gYWN0dWFsIGhlYWRlciBzaXplXG4gICAgICB2YXIgYWN0dWFsID0gaGVhZF9zaXplKGxlbmd0aCk7XG5cbiAgICAgIC8vIG1vdmUgY29udGVudCB3aGVuIG5lZWRlZFxuICAgICAgaWYgKGV4cGVjdGVkICE9PSBhY3R1YWwpIHtcbiAgICAgICAgdmFyIHRhcmdldFN0YXJ0ID0gc3RhcnQgKyBhY3R1YWwgLSBleHBlY3RlZDtcbiAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgICAgICBCdWZmZXJQcm90by5jb3B5LmNhbGwoYnVmZmVyLCBidWZmZXIsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKTtcbiAgICAgIH1cblxuICAgICAgLy8gd3JpdGUgaGVhZGVyXG4gICAgICB2YXIgdHlwZSA9IChhY3R1YWwgPT09IDEpID8gKDB4YTAgKyBsZW5ndGgpIDogKGFjdHVhbCA8PSAzKSA/ICgweGQ3ICsgYWN0dWFsKSA6IDB4ZGI7XG4gICAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuXG4gICAgICAvLyBtb3ZlIGN1cnNvclxuICAgICAgZW5jb2Rlci5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIC8vIG51bGxcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiBuaWwoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gQnVmZmVyXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkgcmV0dXJuIGJpbihlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBBcnJheVxuICAgIGlmIChJU19BUlJBWSh2YWx1ZSkpIHJldHVybiBhcnJheShlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBpbnQ2NC1idWZmZXIgb2JqZWN0c1xuICAgIGlmIChVaW50NjRCRS5pc1VpbnQ2NEJFKHZhbHVlKSkgcmV0dXJuIHVpbnQ2NChlbmNvZGVyLCB2YWx1ZSk7XG4gICAgaWYgKEludDY0QkUuaXNJbnQ2NEJFKHZhbHVlKSkgcmV0dXJuIGludDY0KGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIGV4dCBmb3JtYXRzXG4gICAgdmFyIHBhY2tlciA9IGVuY29kZXIuY29kZWMuZ2V0RXh0UGFja2VyKHZhbHVlKTtcbiAgICBpZiAocGFja2VyKSB2YWx1ZSA9IHBhY2tlcih2YWx1ZSk7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXh0QnVmZmVyKSByZXR1cm4gZXh0KGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIHBsYWluIG9sZCBPYmplY3RzIG9yIE1hcFxuICAgIG1hcChlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3RfcmF3KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgLy8gQnVmZmVyXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkgcmV0dXJuIHJhdyhlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBvdGhlcnNcbiAgICBvYmplY3QoZW5jb2RlciwgdmFsdWUpO1xuICB9XG5cbiAgLy8gbmlsIC0tIDB4YzBcbiAgZnVuY3Rpb24gbmlsKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSAweGMwO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIC8vIGZpeGFycmF5IC0tIDB4OTAgLSAweDlmXG4gIC8vIGFycmF5IDE2IC0tIDB4ZGNcbiAgLy8gYXJyYXkgMzIgLS0gMHhkZFxuICBmdW5jdGlvbiBhcnJheShlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMTYpID8gKDB4OTAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkYyA6IDB4ZGQ7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgIHZhciBlbmNvZGUgPSBlbmNvZGVyLmNvZGVjLmVuY29kZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBlbmNvZGUoZW5jb2RlciwgdmFsdWVbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgZnVuY3Rpb24gYmluX2J1ZmZlcihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMHhGRikgPyAweGM0IDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhjNSA6IDB4YzY7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcbiAgICBlbmNvZGVyLnNlbmQodmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluX2FycmF5YnVmZmVyKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgYmluX2J1ZmZlcihlbmNvZGVyLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICB9XG5cbiAgLy8gZml4ZXh0IDEgLS0gMHhkNFxuICAvLyBmaXhleHQgMiAtLSAweGQ1XG4gIC8vIGZpeGV4dCA0IC0tIDB4ZDZcbiAgLy8gZml4ZXh0IDggLS0gMHhkN1xuICAvLyBmaXhleHQgMTYgLS0gMHhkOFxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIGZ1bmN0aW9uIGV4dChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBidWZmZXIgPSB2YWx1ZS5idWZmZXI7XG4gICAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSBleHRtYXBbbGVuZ3RoXSB8fCAoKGxlbmd0aCA8IDB4RkYpID8gMHhjNyA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4YzggOiAweGM5KTtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuICAgIHVpbnQ4W3ZhbHVlLnR5cGVdKGVuY29kZXIpO1xuICAgIGVuY29kZXIuc2VuZChidWZmZXIpO1xuICB9XG5cbiAgLy8gZml4bWFwIC0tIDB4ODAgLSAweDhmXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIGZ1bmN0aW9uIG9ial90b19tYXAoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMTYpID8gKDB4ODAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkZSA6IDB4ZGY7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgIHZhciBlbmNvZGUgPSBlbmNvZGVyLmNvZGVjLmVuY29kZTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBlbmNvZGUoZW5jb2Rlciwga2V5KTtcbiAgICAgIGVuY29kZShlbmNvZGVyLCB2YWx1ZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGZpeG1hcCAtLSAweDgwIC0gMHg4ZlxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICBmdW5jdGlvbiBtYXBfdG9fbWFwKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gb2JqX3RvX21hcChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUuc2l6ZTtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAxNikgPyAoMHg4MCArIGxlbmd0aCkgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGRlIDogMHhkZjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuXG4gICAgdmFyIGVuY29kZSA9IGVuY29kZXIuY29kZWMuZW5jb2RlO1xuICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXksIG0pIHtcbiAgICAgIGVuY29kZShlbmNvZGVyLCBrZXkpO1xuICAgICAgZW5jb2RlKGVuY29kZXIsIHZhbCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByYXcgMTYgLS0gMHhkYVxuICAvLyByYXcgMzIgLS0gMHhkYlxuICAvLyBmaXhyYXcgLS0gMHhhMCAtIDB4YmZcbiAgZnVuY3Rpb24gcmF3KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAzMikgPyAoMHhhMCArIGxlbmd0aCkgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGRhIDogMHhkYjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuICAgIGVuY29kZXIuc2VuZCh2YWx1ZSk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXR5cGUuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgTWF0aGlldSBUdXJjb3R0ZVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgZXJyb3JzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xuXG5mdW5jdGlvbiBmYWlsQ2hlY2soRXhjZXB0aW9uQ29uc3RydWN0b3IsIGNhbGxlZSwgbWVzc2FnZUZvcm1hdCwgZm9ybWF0QXJncykge1xuICAgIG1lc3NhZ2VGb3JtYXQgPSBtZXNzYWdlRm9ybWF0IHx8ICcnO1xuICAgIHZhciBtZXNzYWdlID0gdXRpbC5mb3JtYXQuYXBwbHkodGhpcywgW21lc3NhZ2VGb3JtYXRdLmNvbmNhdChmb3JtYXRBcmdzKSk7XG4gICAgdmFyIGVycm9yID0gbmV3IEV4Y2VwdGlvbkNvbnN0cnVjdG9yKG1lc3NhZ2UpO1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVycm9yLCBjYWxsZWUpO1xuICAgIHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiBmYWlsQXJndW1lbnRDaGVjayhjYWxsZWUsIG1lc3NhZ2UsIGZvcm1hdEFyZ3MpIHtcbiAgICBmYWlsQ2hlY2soZXJyb3JzLklsbGVnYWxBcmd1bWVudEVycm9yLCBjYWxsZWUsIG1lc3NhZ2UsIGZvcm1hdEFyZ3MpO1xufVxuXG5mdW5jdGlvbiBmYWlsU3RhdGVDaGVjayhjYWxsZWUsIG1lc3NhZ2UsIGZvcm1hdEFyZ3MpIHtcbiAgICBmYWlsQ2hlY2soZXJyb3JzLklsbGVnYWxTdGF0ZUVycm9yLCBjYWxsZWUsIG1lc3NhZ2UsIGZvcm1hdEFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5jaGVja0FyZ3VtZW50ID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIGZhaWxBcmd1bWVudENoZWNrKGFyZ3VtZW50cy5jYWxsZWUsIG1lc3NhZ2UsXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jaGVja1N0YXRlID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIGZhaWxTdGF0ZUNoZWNrKGFyZ3VtZW50cy5jYWxsZWUsIG1lc3NhZ2UsXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jaGVja0lzRGVmID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZmFpbEFyZ3VtZW50Q2hlY2soYXJndW1lbnRzLmNhbGxlZSwgbWVzc2FnZSB8fFxuICAgICAgICAnRXhwZWN0ZWQgdmFsdWUgdG8gYmUgZGVmaW5lZCBidXQgd2FzIHVuZGVmaW5lZC4nLFxuICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmNoZWNrSXNEZWZBbmROb3ROdWxsID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAvLyBOb3RlIHRoYXQgdW5kZWZpbmVkID09IG51bGwuXG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGZhaWxBcmd1bWVudENoZWNrKGFyZ3VtZW50cy5jYWxsZWUsIG1lc3NhZ2UgfHxcbiAgICAgICAgJ0V4cGVjdGVkIHZhbHVlIHRvIGJlIGRlZmluZWQgYW5kIG5vdCBudWxsIGJ1dCBnb3QgXCInICtcbiAgICAgICAgdHlwZU9mKHZhbHVlKSArICdcIi4nLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbn07XG5cbi8vIEZpeGVkIHZlcnNpb24gb2YgdGhlIHR5cGVPZiBvcGVyYXRvciB3aGljaCByZXR1cm5zICdudWxsJyBmb3IgbnVsbCB2YWx1ZXNcbi8vIGFuZCAnYXJyYXknIGZvciBhcnJheXMuXG5mdW5jdGlvbiB0eXBlT2YodmFsdWUpIHtcbiAgICB2YXIgcyA9IHR5cGVvZiB2YWx1ZTtcbiAgICBpZiAocyA9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXJyYXknO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiB0eXBlQ2hlY2soZXhwZWN0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZU9mKHZhbHVlKTtcblxuICAgICAgICBpZiAodHlwZSA9PSBleHBlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZhaWxBcmd1bWVudENoZWNrKGFyZ3VtZW50cy5jYWxsZWUsIG1lc3NhZ2UgfHxcbiAgICAgICAgICAgICdFeHBlY3RlZCBcIicgKyBleHBlY3QgKyAnXCIgYnV0IGdvdCBcIicgKyB0eXBlICsgJ1wiLicsXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cy5jaGVja0lzU3RyaW5nID0gdHlwZUNoZWNrKCdzdHJpbmcnKTtcbm1vZHVsZS5leHBvcnRzLmNoZWNrSXNBcnJheSA9IHR5cGVDaGVjaygnYXJyYXknKTtcbm1vZHVsZS5leHBvcnRzLmNoZWNrSXNOdW1iZXIgPSB0eXBlQ2hlY2soJ251bWJlcicpO1xubW9kdWxlLmV4cG9ydHMuY2hlY2tJc0Jvb2xlYW4gPSB0eXBlQ2hlY2soJ2Jvb2xlYW4nKTtcbm1vZHVsZS5leHBvcnRzLmNoZWNrSXNGdW5jdGlvbiA9IHR5cGVDaGVjaygnZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzLmNoZWNrSXNPYmplY3QgPSB0eXBlQ2hlY2soJ29iamVjdCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3ByZWNvbmQvbGliL2NoZWNrcy5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxMiBNYXRoaWV1IFR1cmNvdHRlXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbmZ1bmN0aW9uIElsbGVnYWxBcmd1bWVudEVycm9yKG1lc3NhZ2UpIHtcbiAgICBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG51dGlsLmluaGVyaXRzKElsbGVnYWxBcmd1bWVudEVycm9yLCBFcnJvcik7XG5cbklsbGVnYWxBcmd1bWVudEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0lsbGVnYWxBcmd1bWVudEVycm9yJztcblxuZnVuY3Rpb24gSWxsZWdhbFN0YXRlRXJyb3IobWVzc2FnZSkge1xuICAgIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cbnV0aWwuaW5oZXJpdHMoSWxsZWdhbFN0YXRlRXJyb3IsIEVycm9yKTtcblxuSWxsZWdhbFN0YXRlRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSWxsZWdhbFN0YXRlRXJyb3InO1xuXG5tb2R1bGUuZXhwb3J0cy5JbGxlZ2FsU3RhdGVFcnJvciA9IElsbGVnYWxTdGF0ZUVycm9yO1xubW9kdWxlLmV4cG9ydHMuSWxsZWdhbEFyZ3VtZW50RXJyb3IgPSBJbGxlZ2FsQXJndW1lbnRFcnJvcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJlY29uZC9saWIvZXJyb3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBQcmlvcml0eVNpZ25hbF8xID0gcmVxdWlyZShcIi4vUHJpb3JpdHlTaWduYWxcIik7XG4vKipcbiAqIEFsbG93cyB0aGUgdmFsdWVDbGFzc2VzIHRvIGJlIHNldCBpbiBNWE1MLCBlLmcuXG4gKiA8c2lnbmFsczpTaWduYWwgaWQ9XCJuYW1lQ2hhbmdlZFwiPntbU3RyaW5nLCB1aW50XX08L3NpZ25hbHM6U2lnbmFsPlxuICovXG4vKltEZWZhdWx0UHJvcGVydHkoXCJ2YWx1ZUNsYXNzZXNcIildKi9cbi8qKlxuICogU2lnbmFsIGRpc3BhdGNoZXMgZXZlbnRzIHRvIG11bHRpcGxlIGxpc3RlbmVycy5cbiAqIEl0IGlzIGluc3BpcmVkIGJ5IEMjIGV2ZW50cyBhbmQgZGVsZWdhdGVzLCBhbmQgYnlcbiAqIDxhIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TaWduYWxzX2FuZF9zbG90c1wiPnNpZ25hbHMgYW5kIHNsb3RzPC9hPlxuICogaW4gUXQuXG4gKiBBIFNpZ25hbCBhZGRzIGV2ZW50IGRpc3BhdGNoaW5nIGZ1bmN0aW9uYWxpdHkgdGhyb3VnaCBjb21wb3NpdGlvbiBhbmQgaW50ZXJmYWNlcyxcbiAqIHJhdGhlciB0aGFuIGluaGVyaXRpbmcgZnJvbSBhIGRpc3BhdGNoZXIuXG4gKiA8YnIvPjxici8+XG4gKiBQcm9qZWN0IGhvbWU6IDxhIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzL1wiPmh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy88L2E+XG4gKi9cbnZhciBEZWx1eGVTaWduYWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEZWx1eGVTaWduYWwsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERlbHV4ZVNpZ25hbCBpbnN0YW5jZSB0byBkaXNwYXRjaCBldmVudHMgb24gYmVoYWxmIG9mIGEgdGFyZ2V0IG9iamVjdC5cbiAgICAgKiBAcGFyYW0gICAgdGFyZ2V0IFRoZSBvYmplY3QgdGhlIHNpZ25hbCBpcyBkaXNwYXRjaGluZyBldmVudHMgb24gYmVoYWxmIG9mLlxuICAgICAqIEBwYXJhbSAgICB2YWx1ZUNsYXNzZXMgQW55IG51bWJlciBvZiBjbGFzcyByZWZlcmVuY2VzIHRoYXQgZW5hYmxlIHR5cGUgY2hlY2tzIGluIGRpc3BhdGNoKCkuXG4gICAgICogRm9yIGV4YW1wbGUsIG5ldyBEZWx1eGVTaWduYWwodGhpcywgU3RyaW5nLCB1aW50KVxuICAgICAqIHdvdWxkIGFsbG93OiBzaWduYWwuZGlzcGF0Y2goXCJ0aGUgQW5zd2VyXCIsIDQyKVxuICAgICAqIGJ1dCBub3Q6IHNpZ25hbC5kaXNwYXRjaCh0cnVlLCA0Mi41KVxuICAgICAqIG5vcjogc2lnbmFsLmRpc3BhdGNoKClcbiAgICAgKlxuICAgICAqIE5PVEU6IFN1YmNsYXNzZXMgY2Fubm90IGNhbGwgc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSxcbiAgICAgKiBidXQgdGhpcyBjb25zdHJ1Y3RvciBoYXMgbG9naWMgdG8gc3VwcG9ydCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERlbHV4ZVNpZ25hbCh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7IHRhcmdldCA9IG51bGw7IH1cbiAgICAgICAgdmFyIHZhbHVlQ2xhc3NlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVDbGFzc2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcztcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB2YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZUNsYXNzZXMpIHx8IHRoaXM7XG4gICAgICAgIC8vQENIQU5HRUQgLSB0aGlzIHdhcyB0aGUgZmlyc3QgY2FsbCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgLy9UeXBlc2NyaXB0IGRvZXMgbm90IGFsbG93IFwidGhpc1wiIHRvIGJlIGNhbGxlZCBiZWZvcmUgc3VwZXJcbiAgICAgICAgX3RoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVsdXhlU2lnbmFsLnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuX3RhcmdldClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBEZWx1eGVTaWduYWwucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWVPYmplY3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0ZSB2YWx1ZSBvYmplY3RzIGFnYWluc3QgcHJlLWRlZmluZWQgdmFsdWUgY2xhc3Nlcy5cbiAgICAgICAgdmFyIG51bVZhbHVlQ2xhc3NlcyA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7XG4gICAgICAgIHZhciBudW1WYWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHMubGVuZ3RoO1xuICAgICAgICBpZiAobnVtVmFsdWVPYmplY3RzIDwgbnVtVmFsdWVDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXQgbGVhc3QgJyArIG51bVZhbHVlQ2xhc3NlcyArICcgYnV0IHJlY2VpdmVkICcgK1xuICAgICAgICAgICAgICAgIG51bVZhbHVlT2JqZWN0cyArICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGRpZmZlcmVudGx5IHR5cGVkIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVZhbHVlQ2xhc3NlczsgaSsrKSB7XG4gICAgICAgICAgICAvLyBPcHRpbWl6ZWQgZm9yIHRoZSBvcHRpbWlzdGljIGNhc2UgdGhhdCB2YWx1ZXMgYXJlIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodmFsdWVPYmplY3RzW2ldID09PSBudWxsIHx8IHZhbHVlT2JqZWN0c1tpXS5jb25zdHJ1Y3RvciA9PT0gdGhpcy5fdmFsdWVDbGFzc2VzW2ldKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBvYmplY3QgPCcgKyB2YWx1ZU9iamVjdHNbaV1cbiAgICAgICAgICAgICAgICArICc+IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiA8JyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSArICc+LicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4dHJhY3QgYW5kIGNsb25lIGV2ZW50IG9iamVjdCBpZiBuZWNlc3NhcnkuXG4gICAgICAgIHZhciBldmVudCA9IHZhbHVlT2JqZWN0c1swXTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHZhbHVlT2JqZWN0c1swXSA9IGV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBldmVudC5zaWduYWwgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJyb2FkY2FzdCB0byBsaXN0ZW5lcnMuXG4gICAgICAgIHZhciBzbG90c1RvUHJvY2VzcyA9IHRoaXMuc2xvdHM7XG4gICAgICAgIHdoaWxlIChzbG90c1RvUHJvY2Vzcy5ub25FbXB0eSkge1xuICAgICAgICAgICAgc2xvdHNUb1Byb2Nlc3MuaGVhZC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgICAgICBzbG90c1RvUHJvY2VzcyA9IHNsb3RzVG9Qcm9jZXNzLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnViYmxlIHRoZSBldmVudCBhcyBmYXIgYXMgcG9zc2libGUuXG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LmJ1YmJsZXMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBjdXJyZW50VGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChjdXJyZW50VGFyZ2V0ICYmIGN1cnJlbnRUYXJnZXQuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRcIikpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0W1wicGFyZW50XCJdO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQub25FdmVudEJ1YmJsZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIC8vIG9uRXZlbnRCdWJibGVkKCkgY2FuIHN0b3AgdGhlIGJ1YmJsaW5nIGJ5IHJldHVybmluZyBmYWxzZS5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRhcmdldC5vbkV2ZW50QnViYmxlZChldmVudCkpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGVsdXhlU2lnbmFsO1xufShQcmlvcml0eVNpZ25hbF8xLlByaW9yaXR5U2lnbmFsKSk7XG5leHBvcnRzLkRlbHV4ZVNpZ25hbCA9IERlbHV4ZVNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlbHV4ZVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9EZWx1eGVTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKlxuICovXG5leHBvcnRzLklPbmNlU2lnbmFsID0gU3ltYm9sKFwiSU9uY2VTaWduYWxcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JT25jZVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqXG4gKi9cbmV4cG9ydHMuSVByaW9yaXR5U2lnbmFsID0gU3ltYm9sKFwiSVByaW9yaXR5U2lnbmFsXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVByaW9yaXR5U2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL0lQcmlvcml0eVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqXG4gKi9cbmV4cG9ydHMuSVNpZ25hbCA9IFN5bWJvbChcIklTaWduYWxcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL0lTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBUaGUgSVNsb3QgaW50ZXJmYWNlIGRlZmluZXMgdGhlIGJhc2ljIHByb3BlcnRpZXMgb2YgYVxuICogbGlzdGVuZXIgYXNzb2NpYXRlZCB3aXRoIGEgU2lnbmFsLlxuICpcbiAqIEBhdXRob3IgSm9hIEViZXJ0XG4gKiBAYXV0aG9yIFJvYmVydCBQZW5uZXJcbiAqL1xuZXhwb3J0cy5JU2xvdCA9IFN5bWJvbChcIklTbG90XCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVNsb3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNsb3QuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFNsb3RfMSA9IHJlcXVpcmUoXCIuL1Nsb3RcIik7XG4vKipcbiAqIEFsbG93cyB0aGUgdmFsdWVDbGFzc2VzIHRvIGJlIHNldCBpbiBNWE1MLCBlLmcuXG4gKiA8c2lnbmFsczpTaWduYWwgaWQ9XCJuYW1lQ2hhbmdlZFwiPntbU3RyaW5nLCB1aW50XX08L3NpZ25hbHM6U2lnbmFsPlxuICovXG4vKltEZWZhdWx0UHJvcGVydHkoXCJ2YWx1ZUNsYXNzZXNcIildKi9cbi8qKlxuICogQSBNb25vU2lnbmFsIGNhbiBoYXZlIG9ubHkgb25lIGxpc3RlbmVyLlxuICovXG52YXIgTW9ub1NpZ25hbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE1vbm9TaWduYWwgaW5zdGFuY2UgdG8gZGlzcGF0Y2ggdmFsdWUgb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gICAgdmFsdWVDbGFzc2VzIEFueSBudW1iZXIgb2YgY2xhc3MgcmVmZXJlbmNlcyB0aGF0IGVuYWJsZSB0eXBlIGNoZWNrcyBpbiBkaXNwYXRjaCgpLlxuICAgICAqIEZvciBleGFtcGxlLCBuZXcgU2lnbmFsKFN0cmluZywgdWludClcbiAgICAgKiB3b3VsZCBhbGxvdzogc2lnbmFsLmRpc3BhdGNoKFwidGhlIEFuc3dlclwiLCA0MilcbiAgICAgKiBidXQgbm90OiBzaWduYWwuZGlzcGF0Y2godHJ1ZSwgNDIuNSlcbiAgICAgKiBub3I6IHNpZ25hbC5kaXNwYXRjaCgpXG4gICAgICpcbiAgICAgKiBOT1RFOiBTdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNb25vU2lnbmFsKCkge1xuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHRoaXMudmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb25vU2lnbmFsLnByb3RvdHlwZSwgXCJ2YWx1ZUNsYXNzZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogaXRlbSBhdCBpbmRleCBzaG91bGQgYmUgYSBDbGFzcyBidXQgd2FzIG5vdC5cbiAgICAgICAgICovXG4gICAgICAgIC8qW0FycmF5RWxlbWVudFR5cGUoXCJDbGFzc1wiKV0qL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBDbG9uZSBzbyB0aGUgQXJyYXkgY2Fubm90IGJlIGFmZmVjdGVkIGZyb20gb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2xhc3NlcyA9IHZhbHVlID8gdmFsdWUuc2xpY2UoKSA6IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl92YWx1ZUNsYXNzZXNbaV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZUNsYXNzZXMgYXJndW1lbnQ6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW0gYXQgaW5kZXggJyArIGkgKyAnIHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXM6PCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSk7IC8vQENIQU5HRUQgLSB0ZW1wIHJlcGxhY2VtZW50IGZvciBnZXRRdWFsaWZpZWRDbGFzc0J5TmFtZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9ub1NpZ25hbC5wcm90b3R5cGUsIFwibnVtTGlzdGVuZXJzXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdCA/IDEgOiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5hZGRPbmNlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgTW9ub1NpZ25hbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNsb3QgJiYgdGhpcy5zbG90Lmxpc3RlbmVyID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgdGhlU2xvdCA9IHRoaXMuc2xvdDtcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhlU2xvdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xvdClcbiAgICAgICAgICAgIHRoaXMuc2xvdC5yZW1vdmUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdmFsdWVDbGFzc2VzIGlzIGVtcHR5LCB2YWx1ZSBvYmplY3RzIGFyZSBub3QgdHlwZS1jaGVja2VkLlxuICAgICAgICB2YXIgbnVtVmFsdWVDbGFzc2VzID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBmZXdlciBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA8IG51bVZhbHVlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGF0IGxlYXN0ICcgKyBudW1WYWx1ZUNsYXNzZXMgKyAnIGJ1dCByZWNlaXZlZCAnICtcbiAgICAgICAgICAgICAgICBudW1WYWx1ZU9iamVjdHMgKyAnLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBkaWZmZXJlbnRseSB0eXBlZCBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1WYWx1ZUNsYXNzZXM7IGkrKykge1xuICAgICAgICAgICAgLy8gT3B0aW1pemVkIGZvciB0aGUgb3B0aW1pc3RpYyBjYXNlIHRoYXQgdmFsdWVzIGFyZSBjb3JyZWN0LlxuICAgICAgICAgICAgaWYgKHZhbHVlT2JqZWN0c1tpXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICh2YWx1ZU9iamVjdHNbaV0gaW5zdGFuY2VvZiB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gfHwgdmFsdWVPYmplY3RzW2ldLmNvbnN0cnVjdG9yID09PSB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG9iamVjdCA8JyArIHZhbHVlT2JqZWN0c1tpXVxuICAgICAgICAgICAgICAgICsgJz4gaXMgbm90IGFuIGluc3RhbmNlIG9mIDwnICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRvIHRoZSBvbmUgbGlzdGVuZXIuXG4gICAgICAgIGlmICh0aGlzLnNsb3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIGV4aXRzIHByZXZpb3VzbHkgYWRkZWQsIGRlZmluaXRlbHkgZG9uJ3QgYWRkIGl0LlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnNsb3QgPSBuZXcgU2xvdF8xLlNsb3QobGlzdGVuZXIsIHRoaXMsIG9uY2UpKTtcbiAgICB9O1xuICAgIHJldHVybiBNb25vU2lnbmFsO1xufSgpKTtcbmV4cG9ydHMuTW9ub1NpZ25hbCA9IE1vbm9TaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Nb25vU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL01vbm9TaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgT25jZVNpZ25hbF8xID0gcmVxdWlyZShcIi4vT25jZVNpZ25hbFwiKTtcbnZhciBQcm9taXNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJvbWlzZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgLypvdmVycmlkZSovXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuYWRkT25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2xvdCA9IF9zdXBlci5wcm90b3R5cGUuYWRkT25jZS5jYWxsKHRoaXMsIGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgICBzbG90LmV4ZWN1dGUodGhpcy52YWx1ZU9iamVjdHMpO1xuICAgICAgICAgICAgc2xvdC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2xvdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgZGlzcGF0Y2goKSBhIFByb21pc2UgbW9yZSB0aGFuIG9uY2VcbiAgICAgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBQcm9taXNlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IGRpc3BhdGNoKCkgYSBQcm9taXNlIG1vcmUgdGhhbiBvbmNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3BhdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHM7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRpc3BhdGNoLmFwcGx5KHRoaXMsIHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQcm9taXNlO1xufShPbmNlU2lnbmFsXzEuT25jZVNpZ25hbCkpO1xuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVByb21pc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqXG4gKiBAc2VlIG9yZy5vc2ZsYXNoLnNpZ25hbHMuZXZlbnRzLklFdmVudFxuICogRG9jdW1lbnRhdGlvbiBmb3IgdGhlIGV2ZW50IGludGVyZmFjZSBiZWluZyBtYWludGFpbmVkIGluIElFdmVudCB0byBhdm9pZCBkdXBsaWNhdGlvbiBmb3Igbm93LlxuICovXG52YXIgR2VuZXJpY0V2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHZW5lcmljRXZlbnQoYnViYmxlcykge1xuICAgICAgICBpZiAoYnViYmxlcyA9PT0gdm9pZCAwKSB7IGJ1YmJsZXMgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLl9idWJibGVzID0gYnViYmxlcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwic2lnbmFsXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25hbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJpY0V2ZW50LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHZW5lcmljRXZlbnQucHJvdG90eXBlLCBcImN1cnJlbnRUYXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwiYnViYmxlc1wiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWJibGVzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYnViYmxlcyA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBHZW5lcmljRXZlbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNFdmVudCh0aGlzLl9idWJibGVzKTtcbiAgICB9O1xuICAgIHJldHVybiBHZW5lcmljRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5HZW5lcmljRXZlbnQgPSBHZW5lcmljRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HZW5lcmljRXZlbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvZXZlbnRzL0dlbmVyaWNFdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3ZWJzb2NrZXRfanNfMSA9IHJlcXVpcmUoXCJ3ZWJzb2NrZXQuanNcIik7XG52YXIgbXNncGFjayA9IHJlcXVpcmUoXCJtc2dwYWNrLWxpdGVcIik7XG52YXIgQ29ubmVjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbm5lY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdXJsKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fZW5xdWV1ZWRDYWxscyA9IFtdO1xuICAgICAgICBfdGhpcy5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvbm5lY3Rpb24ucHJvdG90eXBlLm9uT3BlbkNhbGxiYWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUub25PcGVuQ2FsbGJhY2suY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX2VucXVldWVkQ2FsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9lbnF1ZXVlZENhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5fZW5xdWV1ZWRDYWxsc1tpXSwgbWV0aG9kID0gX2FbMF0sIGFyZ3MgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5zZW5kLmNhbGwodGhpcywgbXNncGFjay5lbmNvZGUoZGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY29seXNldXMuanM6IHRyeWluZyB0byBzZW5kIGRhdGEgd2hpbGUgaW4gXCIgKyB0aGlzLndzLnJlYWR5U3RhdGUgKyBcIiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIC8vIFdlYlNvY2tldCBub3QgY29ubmVjdGVkLlxuICAgICAgICAgICAgLy8gRW5xdWV1ZSBkYXRhIHRvIGJlIHNlbnQgd2hlbiByZWFkeVN0YXRlID09IE9QRU5cbiAgICAgICAgICAgIHRoaXMuX2VucXVldWVkQ2FsbHMucHVzaChbJ3NlbmQnLCBbZGF0YV1dKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbm5lY3Rpb247XG59KHdlYnNvY2tldF9qc18xLmRlZmF1bHQpKTtcbmV4cG9ydHMuQ29ubmVjdGlvbiA9IENvbm5lY3Rpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db25uZWN0aW9uLnRzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8qXFxcbnwqfFxufCp8ICA6OiBjb29raWVzLmpzIDo6IChmcm9tOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvY29va2llL1NpbXBsZV9kb2N1bWVudC5jb29raWVfZnJhbWV3b3JrKVxufCp8XG58KnwgIEEgY29tcGxldGUgY29va2llcyByZWFkZXIvd3JpdGVyIGZyYW1ld29yayB3aXRoIGZ1bGwgdW5pY29kZSBzdXBwb3J0LlxufCp8XG58KnwgIFJldmlzaW9uICMxIC0gU2VwdGVtYmVyIDQsIDIwMTRcbnwqfFxufCp8ICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvZG9jdW1lbnQuY29va2llXG58KnwgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1VzZXI6ZnVzaW9uY2hlc3NcbnwqfCAgaHR0cHM6Ly9naXRodWIuY29tL21hZG11cnBoeS9jb29raWVzLmpzXG58KnxcbnwqfCAgVGhpcyBmcmFtZXdvcmsgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIEdOVSBQdWJsaWMgTGljZW5zZSwgdmVyc2lvbiAzIG9yIGxhdGVyLlxufCp8ICBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTMuMC1zdGFuZGFsb25lLmh0bWxcbnwqfFxufCp8ICBTeW50YXhlczpcbnwqfFxufCp8ICAqIGRvY0Nvb2tpZXMuc2V0SXRlbShuYW1lLCB2YWx1ZVssIGVuZFssIHBhdGhbLCBkb21haW5bLCBzZWN1cmVdXV1dKVxufCp8ICAqIGRvY0Nvb2tpZXMuZ2V0SXRlbShuYW1lKVxufCp8ICAqIGRvY0Nvb2tpZXMucmVtb3ZlSXRlbShuYW1lWywgcGF0aFssIGRvbWFpbl1dKVxufCp8ICAqIGRvY0Nvb2tpZXMuaGFzSXRlbShuYW1lKVxufCp8ICAqIGRvY0Nvb2tpZXMua2V5cygpXG58KnxcblxcKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldEl0ZW0oc0tleSkge1xuICAgIGlmICghc0tleSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKD86KD86XnwuKjspXFxcXHMqXCIgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgXCJcXFxcJCZcIikgKyBcIlxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJFwiKSwgXCIkMVwiKSkgfHwgbnVsbDtcbn1cbmV4cG9ydHMuZ2V0SXRlbSA9IGdldEl0ZW07XG5mdW5jdGlvbiBzZXRJdGVtKHNLZXksIHNWYWx1ZSwgdkVuZCwgc1BhdGgsIHNEb21haW4sIGJTZWN1cmUpIHtcbiAgICBpZiAoIXNLZXkgfHwgL14oPzpleHBpcmVzfG1heFxcLWFnZXxwYXRofGRvbWFpbnxzZWN1cmUpJC9pLnRlc3Qoc0tleSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgc0V4cGlyZXMgPSBcIlwiO1xuICAgIGlmICh2RW5kKSB7XG4gICAgICAgIHN3aXRjaCAodkVuZC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICAgICAgc0V4cGlyZXMgPSB2RW5kID09PSBJbmZpbml0eSA/IFwiOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UXCIgOiBcIjsgbWF4LWFnZT1cIiArIHZFbmQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgICAgICAgICBzRXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgdkVuZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZTpcbiAgICAgICAgICAgICAgICAvLyBkb2VzIERhdGUgc3VwcG9ydHMgJ3RvVVRDU3RyaW5nJz9cbiAgICAgICAgICAgICAgICBzRXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgdkVuZC50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChzS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNWYWx1ZSkgKyBzRXhwaXJlcyArIChzRG9tYWluID8gXCI7IGRvbWFpbj1cIiArIHNEb21haW4gOiBcIlwiKSArIChzUGF0aCA/IFwiOyBwYXRoPVwiICsgc1BhdGggOiBcIlwiKSArIChiU2VjdXJlID8gXCI7IHNlY3VyZVwiIDogXCJcIik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnNldEl0ZW0gPSBzZXRJdGVtO1xuZnVuY3Rpb24gcmVtb3ZlSXRlbShzS2V5LCBzUGF0aCwgc0RvbWFpbikge1xuICAgIGlmICghdGhpcy5oYXNJdGVtKHNLZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgXCI9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCIgKyAoc0RvbWFpbiA/IFwiOyBkb21haW49XCIgKyBzRG9tYWluIDogXCJcIikgKyAoc1BhdGggPyBcIjsgcGF0aD1cIiArIHNQYXRoIDogXCJcIik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnJlbW92ZUl0ZW0gPSByZW1vdmVJdGVtO1xuZnVuY3Rpb24gaGFzSXRlbShzS2V5KSB7XG4gICAgaWYgKCFzS2V5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChuZXcgUmVnRXhwKFwiKD86Xnw7XFxcXHMqKVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csIFwiXFxcXCQmXCIpICsgXCJcXFxccypcXFxcPVwiKSkudGVzdChkb2N1bWVudC5jb29raWUpO1xufVxuZXhwb3J0cy5oYXNJdGVtID0gaGFzSXRlbTtcbmZ1bmN0aW9uIGtleXMoKSB7XG4gICAgdmFyIGFLZXlzID0gZG9jdW1lbnQuY29va2llLnJlcGxhY2UoLygoPzpefFxccyo7KVteXFw9XSspKD89O3wkKXxeXFxzKnxcXHMqKD86XFw9W147XSopPyg/OlxcMXwkKS9nLCBcIlwiKS5zcGxpdCgvXFxzKig/OlxcPVteO10qKT87XFxzKi8pO1xuICAgIGZvciAodmFyIG5MZW4gPSBhS2V5cy5sZW5ndGgsIG5JZHggPSAwOyBuSWR4IDwgbkxlbjsgbklkeCsrKSB7XG4gICAgICAgIGFLZXlzW25JZHhdID0gZGVjb2RlVVJJQ29tcG9uZW50KGFLZXlzW25JZHhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGFLZXlzO1xufVxuZXhwb3J0cy5rZXlzID0ga2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0Nvb2tpZS50c1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXRpbC9+L2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7dmFyIF9jcmVhdGVDbGFzcz1mdW5jdGlvbigpe2Z1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LHByb3BzKXtmb3IodmFyIGk9MDtpPHByb3BzLmxlbmd0aDtpKyspe3ZhciBkZXNjcmlwdG9yPXByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZT1kZXNjcmlwdG9yLmVudW1lcmFibGV8fGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlPXRydWU7aWYoXCJ2YWx1ZVwiaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKTt9fXJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3Rvcixwcm90b1Byb3BzLHN0YXRpY1Byb3BzKXtpZihwcm90b1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLHByb3RvUHJvcHMpO2lmKHN0YXRpY1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3Isc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsQ29uc3RydWN0b3Ipe2lmKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcikpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7fX12YXIgYmFja29mZj1yZXF1aXJlKCdiYWNrb2ZmJyk7dmFyIFdlYlNvY2tldENsaWVudD1mdW5jdGlvbigpey8qKlxuICAgKiBAcGFyYW0gdXJsIERPTVN0cmluZyBUaGUgVVJMIHRvIHdoaWNoIHRvIGNvbm5lY3Q7IHRoaXMgc2hvdWxkIGJlIHRoZSBVUkwgdG8gd2hpY2ggdGhlIFdlYlNvY2tldCBzZXJ2ZXIgd2lsbCByZXNwb25kLlxuICAgKiBAcGFyYW0gcHJvdG9jb2xzIERPTVN0cmluZ3xET01TdHJpbmdbXSBFaXRoZXIgYSBzaW5nbGUgcHJvdG9jb2wgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHByb3RvY29sIHN0cmluZ3MuIFRoZXNlIHN0cmluZ3MgYXJlIHVzZWQgdG8gaW5kaWNhdGUgc3ViLXByb3RvY29scywgc28gdGhhdCBhIHNpbmdsZSBzZXJ2ZXIgY2FuIGltcGxlbWVudCBtdWx0aXBsZSBXZWJTb2NrZXQgc3ViLXByb3RvY29scyAoZm9yIGV4YW1wbGUsIHlvdSBtaWdodCB3YW50IG9uZSBzZXJ2ZXIgdG8gYmUgYWJsZSB0byBoYW5kbGUgZGlmZmVyZW50IHR5cGVzIG9mIGludGVyYWN0aW9ucyBkZXBlbmRpbmcgb24gdGhlIHNwZWNpZmllZCBwcm90b2NvbCkuIElmIHlvdSBkb24ndCBzcGVjaWZ5IGEgcHJvdG9jb2wgc3RyaW5nLCBhbiBlbXB0eSBzdHJpbmcgaXMgYXNzdW1lZC5cbiAgICovZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCxwcm90b2NvbHMpe3ZhciBvcHRpb25zPWFyZ3VtZW50cy5sZW5ndGg+MiYmYXJndW1lbnRzWzJdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1syXTp7fTtfY2xhc3NDYWxsQ2hlY2sodGhpcyxXZWJTb2NrZXRDbGllbnQpO3RoaXMudXJsPXVybDt0aGlzLnByb3RvY29scz1wcm90b2NvbHM7dGhpcy5yZWNvbm5lY3RFbmFibGVkPXRydWU7dGhpcy5saXN0ZW5lcnM9e307dGhpcy5iYWNrb2ZmPWJhY2tvZmZbb3B0aW9ucy5iYWNrb2ZmfHwnZmlib25hY2NpJ10ob3B0aW9ucyk7dGhpcy5iYWNrb2ZmLm9uKCdiYWNrb2ZmJyx0aGlzLm9uQmFja29mZlN0YXJ0LmJpbmQodGhpcykpO3RoaXMuYmFja29mZi5vbigncmVhZHknLHRoaXMub25CYWNrb2ZmUmVhZHkuYmluZCh0aGlzKSk7dGhpcy5iYWNrb2ZmLm9uKCdmYWlsJyx0aGlzLm9uQmFja29mZkZhaWwuYmluZCh0aGlzKSk7dGhpcy5vcGVuKCk7fV9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsW3trZXk6J29wZW4nLHZhbHVlOmZ1bmN0aW9uIG9wZW4oKXt2YXIgcmVjb25uZWN0PWFyZ3VtZW50cy5sZW5ndGg+MCYmYXJndW1lbnRzWzBdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1swXTpmYWxzZTt0aGlzLmlzUmVjb25uZWN0PXJlY29ubmVjdDt0aGlzLndzPW5ldyBXZWJTb2NrZXQodGhpcy51cmwsdGhpcy5wcm90b2NvbHMpO3RoaXMud3Mub25jbG9zZT10aGlzLm9uQ2xvc2VDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25lcnJvcj10aGlzLm9uRXJyb3JDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25tZXNzYWdlPXRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTt0aGlzLndzLm9ub3Blbj10aGlzLm9uT3BlbkNhbGxiYWNrLmJpbmQodGhpcyk7fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25CYWNrb2ZmU3RhcnQnLHZhbHVlOmZ1bmN0aW9uIG9uQmFja29mZlN0YXJ0KG51bWJlcixkZWxheSl7fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25CYWNrb2ZmUmVhZHknLHZhbHVlOmZ1bmN0aW9uIG9uQmFja29mZlJlYWR5KG51bWJlcixkZWxheSl7Ly8gY29uc29sZS5sb2coXCJvbkJhY2tvZmZSZWFkeVwiLCBudW1iZXIgKyAnICcgKyBkZWxheSArICdtcycpO1xudGhpcy5vcGVuKHRydWUpO30vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uQmFja29mZkZhaWwnLHZhbHVlOmZ1bmN0aW9uIG9uQmFja29mZkZhaWwoKXt9LyoqXG4gICAqIEBpZ25vcmVcbiAgICovfSx7a2V5OidvbkNsb3NlQ2FsbGJhY2snLHZhbHVlOmZ1bmN0aW9uIG9uQ2xvc2VDYWxsYmFjaygpe2lmKCF0aGlzLmlzUmVjb25uZWN0JiZ0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddKXRoaXMubGlzdGVuZXJzWydvbmNsb3NlJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO2lmKHRoaXMucmVjb25uZWN0RW5hYmxlZCl7dGhpcy5iYWNrb2ZmLmJhY2tvZmYoKTt9fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25FcnJvckNhbGxiYWNrJyx2YWx1ZTpmdW5jdGlvbiBvbkVycm9yQ2FsbGJhY2soKXtpZih0aGlzLmxpc3RlbmVyc1snb25lcnJvciddKXRoaXMubGlzdGVuZXJzWydvbmVycm9yJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO30vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uTWVzc2FnZUNhbGxiYWNrJyx2YWx1ZTpmdW5jdGlvbiBvbk1lc3NhZ2VDYWxsYmFjaygpe2lmKHRoaXMubGlzdGVuZXJzWydvbm1lc3NhZ2UnXSl0aGlzLmxpc3RlbmVyc1snb25tZXNzYWdlJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO30vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uT3BlbkNhbGxiYWNrJyx2YWx1ZTpmdW5jdGlvbiBvbk9wZW5DYWxsYmFjaygpe2lmKHRoaXMubGlzdGVuZXJzWydvbm9wZW4nXSl0aGlzLmxpc3RlbmVyc1snb25vcGVuJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO2lmKHRoaXMuaXNSZWNvbm5lY3QmJnRoaXMubGlzdGVuZXJzWydvbnJlY29ubmVjdCddKXRoaXMubGlzdGVuZXJzWydvbnJlY29ubmVjdCddLmFwcGx5KG51bGwsYXJndW1lbnRzKTt0aGlzLmlzUmVjb25uZWN0PWZhbHNlO30vKipcbiAgICogVGhlIG51bWJlciBvZiBieXRlcyBvZiBkYXRhIHRoYXQgaGF2ZSBiZWVuIHF1ZXVlZCB1c2luZyBjYWxscyB0byBzZW5kKClcbiAgICogYnV0IG5vdCB5ZXQgdHJhbnNtaXR0ZWQgdG8gdGhlIG5ldHdvcmsuIFRoaXMgdmFsdWUgZG9lcyBub3QgcmVzZXQgdG8gemVyb1xuICAgKiB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZDsgaWYgeW91IGtlZXAgY2FsbGluZyBzZW5kKCksIHRoaXMgd2lsbFxuICAgKiBjb250aW51ZSB0byBjbGltYi5cbiAgICpcbiAgICogQHR5cGUgdW5zaWduZWQgbG9uZ1xuICAgKiBAcmVhZG9ubHlcbiAgICovfSx7a2V5OidjbG9zZScsLyoqXG4gICAqIENsb3NlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gb3IgY29ubmVjdGlvbiBhdHRlbXB0LCBpZiBhbnkuIElmIHRoZVxuICAgKiBjb25uZWN0aW9uIGlzIGFscmVhZHkgQ0xPU0VELCB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBjb2RlIEEgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIHRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjbG9zZWQuIElmIHRoaXMgcGFyYW1ldGVyIGlzIG5vdCBzcGVjaWZpZWQsIGEgZGVmYXVsdCB2YWx1ZSBvZiAxMDAwIChpbmRpY2F0aW5nIGEgbm9ybWFsIFwidHJhbnNhY3Rpb24gY29tcGxldGVcIiBjbG9zdXJlKSBpcyBhc3N1bWVkLiBTZWUgdGhlIGxpc3Qgb2Ygc3RhdHVzIGNvZGVzIG9uIHRoZSBDbG9zZUV2ZW50IHBhZ2UgZm9yIHBlcm1pdHRlZCB2YWx1ZXMuXG4gICAqIEBwYXJhbSByZWFzb24gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZy4gVGhpcyBzdHJpbmcgbXVzdCBiZSBubyBsb25nZXIgdGhhbiAxMjMgYnl0ZXMgb2YgVVRGLTggdGV4dCAobm90IGNoYXJhY3RlcnMpLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovdmFsdWU6ZnVuY3Rpb24gY2xvc2UoY29kZSxyZWFzb24pe2lmKHR5cGVvZiBjb2RlPT0ndW5kZWZpbmVkJyl7Y29kZT0xMDAwO310aGlzLnJlY29ubmVjdEVuYWJsZWQ9ZmFsc2U7dGhpcy53cy5jbG9zZShjb2RlLHJlYXNvbik7fS8qKlxuICAgKiBUcmFuc21pdHMgZGF0YSB0byB0aGUgc2VydmVyIG92ZXIgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uLlxuICAgKiBAcGFyYW0gZGF0YSBET01TdHJpbmd8QXJyYXlCdWZmZXJ8QmxvYlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovfSx7a2V5OidzZW5kJyx2YWx1ZTpmdW5jdGlvbiBzZW5kKGRhdGEpe3RoaXMud3Muc2VuZChkYXRhKTt9LyoqXG4gICAqIEFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbidzIHJlYWR5U3RhdGUgY2hhbmdlcyB0byBDTE9TRUQuIFRoZSBsaXN0ZW5lciByZWNlaXZlcyBhIENsb3NlRXZlbnQgbmFtZWQgXCJjbG9zZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J2J1ZmZlcmVkQW1vdW50JyxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMud3MuYnVmZmVyZWRBbW91bnQ7fS8qKlxuICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbjsgdGhpcyBpcyBvbmUgb2YgdGhlIFJlYWR5IHN0YXRlIGNvbnN0YW50cy5cbiAgICogQHR5cGUgdW5zaWduZWQgc2hvcnRcbiAgICogQHJlYWRvbmx5XG4gICAqL30se2tleToncmVhZHlTdGF0ZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnJlYWR5U3RhdGU7fS8qKlxuICAgKiBBIHN0cmluZyBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIGJpbmFyeSBkYXRhIGJlaW5nIHRyYW5zbWl0dGVkIGJ5IHRoZVxuICAgKiBjb25uZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBlaXRoZXIgXCJibG9iXCIgaWYgRE9NIEJsb2Igb2JqZWN0cyBhcmUgYmVpbmdcbiAgICogdXNlZCBvciBcImFycmF5YnVmZmVyXCIgaWYgQXJyYXlCdWZmZXIgb2JqZWN0cyBhcmUgYmVpbmcgdXNlZC5cbiAgICogQHR5cGUgRE9NU3RyaW5nXG4gICAqL30se2tleTonYmluYXJ5VHlwZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLmJpbmFyeVR5cGU7fSxzZXQ6ZnVuY3Rpb24gc2V0KGJpbmFyeVR5cGUpe3RoaXMud3MuYmluYXJ5VHlwZT1iaW5hcnlUeXBlO30vKipcbiAgICogVGhlIGV4dGVuc2lvbnMgc2VsZWN0ZWQgYnkgdGhlIHNlcnZlci4gVGhpcyBpcyBjdXJyZW50bHkgb25seSB0aGUgZW1wdHlcbiAgICogc3RyaW5nIG9yIGEgbGlzdCBvZiBleHRlbnNpb25zIGFzIG5lZ290aWF0ZWQgYnkgdGhlIGNvbm5lY3Rpb24uXG4gICAqIEB0eXBlIERPTVN0cmluZ1xuICAgKi99LHtrZXk6J2V4dGVuc2lvbnMnLGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy53cy5leHRlbnNpb25zO30sc2V0OmZ1bmN0aW9uIHNldChleHRlbnNpb25zKXt0aGlzLndzLmV4dGVuc2lvbnM9ZXh0ZW5zaW9uczt9LyoqXG4gICAqIEEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIHN1Yi1wcm90b2NvbCB0aGUgc2VydmVyIHNlbGVjdGVkO1xuICAgKiB0aGlzIHdpbGwgYmUgb25lIG9mIHRoZSBzdHJpbmdzIHNwZWNpZmllZCBpbiB0aGUgcHJvdG9jb2xzIHBhcmFtZXRlciB3aGVuXG4gICAqIGNyZWF0aW5nIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgKiBAdHlwZSBET01TdHJpbmdcbiAgICovfSx7a2V5Oidwcm90b2NvbCcsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnByb3RvY29sO30sc2V0OmZ1bmN0aW9uIHNldChwcm90b2NvbCl7dGhpcy53cy5wcm90b2NvbD1wcm90b2NvbDt9fSx7a2V5OidvbmNsb3NlJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLiBUaGlzIGlzIGEgc2ltcGxlIGV2ZW50IG5hbWVkIFwiZXJyb3JcIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbmVycm9yJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25lcnJvciddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25lcnJvciddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci4gVGhlIGxpc3RlbmVyIHJlY2VpdmVzIGEgTWVzc2FnZUV2ZW50IG5hbWVkIFwibWVzc2FnZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J29ubWVzc2FnZScsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25tZXNzYWdlJ107fS8qKlxuICAgKiBBbiBldmVudCBsaXN0ZW5lciB0byBiZSBjYWxsZWQgd2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24ncyByZWFkeVN0YXRlIGNoYW5nZXMgdG8gT1BFTjsgdGhpcyBpbmRpY2F0ZXMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyByZWFkeSB0byBzZW5kIGFuZCByZWNlaXZlIGRhdGEuIFRoZSBldmVudCBpcyBhIHNpbXBsZSBvbmUgd2l0aCB0aGUgbmFtZSBcIm9wZW5cIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5Oidvbm9wZW4nLHNldDpmdW5jdGlvbiBzZXQobGlzdGVuZXIpe3RoaXMubGlzdGVuZXJzWydvbm9wZW4nXT1saXN0ZW5lcjt9LGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddO30vKipcbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbnJlY29ubmVjdCcsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J109bGlzdGVuZXI7fSxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMubGlzdGVuZXJzWydvbnJlY29ubmVjdCddO319XSk7cmV0dXJuIFdlYlNvY2tldENsaWVudDt9KCk7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBub3QgeWV0IG9wZW4uXG4gKi9XZWJTb2NrZXRDbGllbnQuQ09OTkVDVElORz1XZWJTb2NrZXQuQ09OTkVDVElORzsvKipcbiAqIFRoZSBjb25uZWN0aW9uIGlzIG9wZW4gYW5kIHJlYWR5IHRvIGNvbW11bmljYXRlLlxuICovV2ViU29ja2V0Q2xpZW50Lk9QRU49V2ViU29ja2V0Lk9QRU47LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBpbiB0aGUgcHJvY2VzcyBvZiBjbG9zaW5nLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NJTkc9V2ViU29ja2V0LkNMT1NJTkc7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBjbG9zZWQgb3IgY291bGRuJ3QgYmUgb3BlbmVkLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NFRD1XZWJTb2NrZXQuQ0xPU0VEO2V4cG9ydHMuZGVmYXVsdD1XZWJTb2NrZXRDbGllbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dlYnNvY2tldC5qcy9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENsaWVudF8xID0gcmVxdWlyZShcIi4vQ2xpZW50XCIpO1xuZXhwb3J0cy5DbGllbnQgPSBDbGllbnRfMS5DbGllbnQ7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xuZXhwb3J0cy5Qcm90b2NvbCA9IFByb3RvY29sXzEuUHJvdG9jb2w7XG52YXIgUm9vbV8xID0gcmVxdWlyZShcIi4vUm9vbVwiKTtcbmV4cG9ydHMuUm9vbSA9IFJvb21fMS5Sb29tO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=