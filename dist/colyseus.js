var Colyseus =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// bufferish.js

var Buffer = exports.global = __webpack_require__(29);
var hasBuffer = exports.hasBuffer = Buffer && !!Buffer.isBuffer;
var hasArrayBuffer = exports.hasArrayBuffer = ("undefined" !== typeof ArrayBuffer);

var isArray = exports.isArray = __webpack_require__(1);
exports.isArrayBuffer = hasArrayBuffer ? isArrayBuffer : _false;
var isBuffer = exports.isBuffer = hasBuffer ? Buffer.isBuffer : _false;
var isView = exports.isView = hasArrayBuffer ? (ArrayBuffer.isView || _is("ArrayBuffer", "buffer")) : _false;

exports.alloc = alloc;
exports.concat = concat;
exports.from = from;

var BufferArray = exports.Array = __webpack_require__(32);
var BufferBuffer = exports.Buffer = __webpack_require__(33);
var BufferUint8Array = exports.Uint8Array = __webpack_require__(34);
var BufferProto = exports.prototype = __webpack_require__(8);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// codec-base.js

var IS_ARRAY = __webpack_require__(1);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// browser.js

exports.encode = __webpack_require__(13).encode;
exports.decode = __webpack_require__(18).decode;

exports.Encoder = __webpack_require__(41).Encoder;
exports.Decoder = __webpack_require__(42).Decoder;

exports.createCodec = __webpack_require__(43).createCodec;
exports.codec = __webpack_require__(44).codec;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// write-core.js

var ExtBuffer = __webpack_require__(6).ExtBuffer;
var ExtPacker = __webpack_require__(36);
var WriteType = __webpack_require__(37);
var CodecBase = __webpack_require__(2);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// ext-buffer.js

exports.ExtBuffer = ExtBuffer;

var Bufferish = __webpack_require__(0);

function ExtBuffer(buffer, type) {
  if (!(this instanceof ExtBuffer)) return new ExtBuffer(buffer, type);
  this.buffer = Bufferish.from(buffer);
  this.type = type;
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// bufferish-proto.js

/* jshint eqnull:true */

var BufferLite = __webpack_require__(35);

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).Buffer))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// read-core.js

var ExtBuffer = __webpack_require__(6).ExtBuffer;
var ExtUnpacker = __webpack_require__(39);
var readUint8 = __webpack_require__(20).readUint8;
var ReadToken = __webpack_require__(40);
var CodecBase = __webpack_require__(2);

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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SlotList_1 = __webpack_require__(25);
var Slot_1 = __webpack_require__(3);
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// encode.js

exports.encode = encode;

var EncodeBuffer = __webpack_require__(14).EncodeBuffer;

function encode(input, options) {
  var encoder = new EncodeBuffer(options);
  encoder.write(input);
  return encoder.read();
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// encode-buffer.js

exports.EncodeBuffer = EncodeBuffer;

var preset = __webpack_require__(5).preset;

var FlexEncoder = __webpack_require__(17).FlexEncoder;

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


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(31)
var ieee754 = __webpack_require__(7)
var isArray = __webpack_require__(1)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

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


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// decode.js

exports.decode = decode;

var DecodeBuffer = __webpack_require__(19).DecodeBuffer;

function decode(input, options) {
  var decoder = new DecodeBuffer(options);
  decoder.write(input);
  return decoder.read();
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// decode-buffer.js

exports.DecodeBuffer = DecodeBuffer;

var preset = __webpack_require__(10).preset;

var FlexDecoder = __webpack_require__(17).FlexDecoder;

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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// read-format.js

var ieee754 = __webpack_require__(7);
var Int64Buffer = __webpack_require__(9);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

exports.getReadFormat = getReadFormat;
exports.readUint8 = uint8;

var Bufferish = __webpack_require__(0);
var BufferProto = __webpack_require__(8);

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

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DeluxeSignal_1 = __webpack_require__(45);
exports.DeluxeSignal = DeluxeSignal_1.DeluxeSignal;
var GenericEvent_1 = __webpack_require__(46);
exports.GenericEvent = GenericEvent_1.GenericEvent;
var IOnceSignal_1 = __webpack_require__(47);
exports.IOnceSignal = IOnceSignal_1.IOnceSignal;
var IPrioritySignal_1 = __webpack_require__(48);
exports.IPrioritySignal = IPrioritySignal_1.IPrioritySignal;
var ISignal_1 = __webpack_require__(49);
exports.ISignal = ISignal_1.ISignal;
var ISlot_1 = __webpack_require__(50);
exports.ISlot = ISlot_1.ISlot;
var MonoSignal_1 = __webpack_require__(51);
exports.MonoSignal = MonoSignal_1.MonoSignal;
var OnceSignal_1 = __webpack_require__(11);
exports.OnceSignal = OnceSignal_1.OnceSignal;
var PrioritySignal_1 = __webpack_require__(23);
exports.PrioritySignal = PrioritySignal_1.PrioritySignal;
var Promise_1 = __webpack_require__(52);
exports.Promise = Promise_1.Promise;
var Signal_1 = __webpack_require__(24);
exports.Signal = Signal_1.Signal;
var Slot_1 = __webpack_require__(3);
exports.Slot = Slot_1.Slot;
var SlotList_1 = __webpack_require__(25);
exports.SlotList = SlotList_1.SlotList;
//# sourceMappingURL=index.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

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
var Signal_1 = __webpack_require__(24);
var Slot_1 = __webpack_require__(3);
var PrioritySignal = (function (_super) {
    __extends(PrioritySignal, _super);
    function PrioritySignal() {
        var valueClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            valueClasses[_i] = arguments[_i];
        }
        var _this = this;
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

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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
var OnceSignal_1 = __webpack_require__(11);
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
        var _this = this;
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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    /**
     * Represents an empty list. Used as the list terminator.
     */
    SlotList.NIL = new SlotList(null, null);
    return SlotList;
}());
exports.SlotList = SlotList;
//# sourceMappingURL=SlotList.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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
var signals_js_1 = __webpack_require__(22);
var Clock = __webpack_require__(53);
var delta_listener_1 = __webpack_require__(54);
var msgpack = __webpack_require__(4);
var fossilDelta = __webpack_require__(57);
var Protocol_1 = __webpack_require__(12);
var Room = /** @class */ (function (_super) {
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


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = __webpack_require__(28);
exports.Client = Client_1.Client;
var Protocol_1 = __webpack_require__(12);
exports.Protocol = Protocol_1.Protocol;
var Room_1 = __webpack_require__(26);
exports.Room = Room_1.Room;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var msgpack = __webpack_require__(4);
var signals_js_1 = __webpack_require__(22);
var Protocol_1 = __webpack_require__(12);
var Room_1 = __webpack_require__(26);
var Connection_1 = __webpack_require__(58);
var Client = /** @class */ (function () {
    function Client(url) {
        var _this = this;
        // signals
        this.onOpen = new signals_js_1.Signal();
        this.onMessage = new signals_js_1.Signal();
        this.onClose = new signals_js_1.Signal();
        this.onError = new signals_js_1.Signal();
        this.rooms = {};
        this.storage = window.localStorage;
        this.hostname = url;
        var colyseusid = this.storage.getItem('colyseusid');
        if (!(colyseusid instanceof Promise)) {
            // browser has synchronous return
            this.createConnection(colyseusid);
        }
        else {
            // react-native is asynchronous
            colyseusid.then(function (id) { return _this.createConnection(id); });
        }
    }
    Client.prototype.createConnection = function (colyseusid) {
        var _this = this;
        this.id = colyseusid || "";
        this.connection = new Connection_1.Connection(this.hostname + "/?colyseusid=" + this.id);
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = function (e) { return _this.onClose.dispatch(); };
        this.connection.onerror = function (e) { return _this.onError.dispatch(); };
        // check for id on cookie
        this.connection.onopen = function () {
            if (_this.id) {
                _this.onOpen.dispatch();
            }
        };
    };
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
            this.storage.setItem('colyseusid', message[1]);
            this.id = message[1];
            this.onOpen.dispatch();
        }
        else if (code == Protocol_1.Protocol.JOIN_ROOM) {
            var room_1 = this.room;
            room_1.id = message[1];
            room_1.connect(new Connection_1.Connection(this.hostname + "/" + this.room.id + "?colyseusid=" + this.id));
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


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* globals Buffer */

module.exports =
  c(("undefined" !== typeof Buffer) && Buffer) ||
  c(this.Buffer) ||
  c(("undefined" !== typeof window) && window.Buffer) ||
  this.Buffer;

function c(B) {
  return B && B.isBuffer && B;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).Buffer))

/***/ }),
/* 30 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

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


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
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


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 35 */
/***/ (function(module, exports) {

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


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

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
  if (!_encode) _encode = __webpack_require__(13).encode; // lazy load
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


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// write-type.js

var IS_ARRAY = __webpack_require__(1);
var Int64Buffer = __webpack_require__(9);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var Bufferish = __webpack_require__(0);
var BufferProto = __webpack_require__(8);
var WriteToken = __webpack_require__(38);
var uint8 = __webpack_require__(16).uint8;
var ExtBuffer = __webpack_require__(6).ExtBuffer;

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


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// write-token.js

var ieee754 = __webpack_require__(7);
var Int64Buffer = __webpack_require__(9);
var Uint64BE = Int64Buffer.Uint64BE;
var Int64BE = Int64Buffer.Int64BE;

var uint8 = __webpack_require__(16).uint8;
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


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

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
  if (!_decode) _decode = __webpack_require__(18).decode; // lazy load
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


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// read-token.js

var ReadFormat = __webpack_require__(20);

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


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// encoder.js

exports.Encoder = Encoder;

var EventLite = __webpack_require__(21);
var EncodeBuffer = __webpack_require__(14).EncodeBuffer;

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


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// decoder.js

exports.Decoder = Decoder;

var EventLite = __webpack_require__(21);
var DecodeBuffer = __webpack_require__(19).DecodeBuffer;

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


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// ext.js

// load both interfaces
__webpack_require__(10);
__webpack_require__(5);

exports.createCodec = __webpack_require__(2).createCodec;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// codec.js

// load both interfaces
__webpack_require__(10);
__webpack_require__(5);

// @public
// msgpack.codec.preset

exports.codec = {
  preset: __webpack_require__(2).preset
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

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
var PrioritySignal_1 = __webpack_require__(23);
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
        var _this = this;
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

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.IOnceSignal = Symbol("IOnceSignal");
//# sourceMappingURL=IOnceSignal.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.IPrioritySignal = Symbol("IPrioritySignal");
//# sourceMappingURL=IPrioritySignal.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.ISignal = Symbol("ISignal");
//# sourceMappingURL=ISignal.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The ISlot interface defines the basic properties of a
 * listener associated with a Signal.
 *
 * @author Joa Ebert
 * @author Robert Penner
 */
exports.ISlot = Symbol("ISlot");
//# sourceMappingURL=ISlot.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Slot_1 = __webpack_require__(3);
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

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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
var OnceSignal_1 = __webpack_require__(11);
var Promise = (function (_super) {
    __extends(Promise, _super);
    function Promise() {
        return _super !== null && _super.apply(this, arguments) || this;
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

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Clock = (function () {
    function Clock(useInterval) {
        if (useInterval === void 0) { useInterval = false; }
        this.running = false;
        this.now = (typeof (window) !== "undefined" && window.performance && window.performance.now && (window.performance.now).bind(window.performance)) || Date.now;
        this.start(useInterval);
    }
    Clock.prototype.start = function (useInterval) {
        if (useInterval === void 0) { useInterval = false; }
        this.deltaTime = 0;
        this.currentTime = this.now();
        this.elapsedTime = 0;
        this.running = true;
        if (useInterval) {
            // auto set interval to 60 ticks per second
            this._interval = setInterval(this.tick.bind(this), 1000 / 60);
        }
    };
    Clock.prototype.stop = function () {
        this.running = false;
        if (this._interval) {
            clearInterval(this._interval);
        }
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


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DeltaContainer_1 = __webpack_require__(55);
exports.DeltaContainer = DeltaContainer_1.DeltaContainer;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var compare_1 = __webpack_require__(56);
var DeltaContainer = (function () {
    function DeltaContainer(data) {
        this.listeners = [];
        this.matcherPlaceholders = {
            ":id": /^([a-zA-Z0-9\-_]+)$/,
            ":number": /^([0-9]+)$/,
            ":string": /^(\w+)$/,
            ":axis": /^([xyz])$/,
            ":*": /(.*)/,
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
    DeltaContainer.prototype.listen = function (segments, callback) {
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
            rawRules: rules,
            rules: rules.map(function (segment) {
                if (typeof (segment) === "string") {
                    // replace placeholder matchers
                    return (segment.indexOf(":") === 0)
                        ? _this.matcherPlaceholders[segment] || _this.matcherPlaceholders[":*"]
                        : new RegExp("^" + segment + "$");
                }
                else {
                    return segment;
                }
            })
        };
        if (rules.length === 0) {
            this.defaultListener = listener;
        }
        else {
            this.listeners.push(listener);
        }
        return listener;
    };
    DeltaContainer.prototype.removeListener = function (listener) {
        for (var i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i] === listener) {
                this.listeners.splice(i, 1);
            }
        }
    };
    DeltaContainer.prototype.removeAllListeners = function () {
        this.reset();
    };
    DeltaContainer.prototype.checkPatches = function (patches) {
        for (var i = patches.length - 1; i >= 0; i--) {
            var matched = false;
            for (var j = 0, len = this.listeners.length; j < len; j++) {
                var listener = this.listeners[j];
                var pathVariables = this.getPathVariables(patches[i], listener);
                if (pathVariables) {
                    listener.callback({
                        path: pathVariables,
                        operation: patches[i].operation,
                        value: patches[i].value
                    });
                    matched = true;
                }
            }
            // check for fallback listener
            if (!matched && this.defaultListener) {
                this.defaultListener.callback(patches[i]);
            }
        }
    };
    DeltaContainer.prototype.getPathVariables = function (patch, listener) {
        // skip if rules count differ from patch
        if (patch.path.length !== listener.rules.length) {
            return false;
        }
        var path = {};
        for (var i = 0, len = listener.rules.length; i < len; i++) {
            var matches = patch.path[i].match(listener.rules[i]);
            if (!matches || matches.length === 0 || matches.length > 2) {
                return false;
            }
            else if (listener.rawRules[i].substr(0, 1) === ":") {
                path[listener.rawRules[i].substr(1)] = matches[1];
            }
        }
        return path;
    };
    DeltaContainer.prototype.reset = function () {
        this.listeners = [];
    };
    return DeltaContainer;
}());
exports.DeltaContainer = DeltaContainer;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

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
                    patches.push({ operation: "replace", path: path.concat(key), value: deepClone(newVal) });
                }
            }
        }
        else {
            patches.push({ operation: "remove", path: path.concat(key) });
            deleted = true; // property has been deleted
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!mirror.hasOwnProperty(key) && obj[key] !== undefined) {
            patches.push({ operation: "add", path: path.concat(key), value: deepClone(obj[key]) });
        }
    }
}


/***/ }),
/* 57 */
/***/ (function(module, exports) {

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


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

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
var websocket_1 = __webpack_require__(59);
var msgpack = __webpack_require__(4);
var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    function Connection(url, query) {
        if (query === void 0) { query = {}; }
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
}(websocket_1.default));
exports.Connection = Connection;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var createBackoff=__webpack_require__(60).createBackoff;var WebSocketClient=function(){/**
   * @param url DOMString The URL to which to connect; this should be the URL to which the WebSocket server will respond.
   * @param protocols DOMString|DOMString[] Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol). If you don't specify a protocol string, an empty string is assumed.
   */function WebSocketClient(url,protocols){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,WebSocketClient);this.url=url;this.protocols=protocols;this.reconnectEnabled=true;this.listeners={};this.backoff=createBackoff(options.backoff||'exponential',options);this.backoff.onReady=this.onBackoffReady.bind(this);this.open();}_createClass(WebSocketClient,[{key:'open',value:function open(){var reconnect=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;this.isReconnect=reconnect;this.ws=new WebSocket(this.url,this.protocols);this.ws.onclose=this.onCloseCallback.bind(this);this.ws.onerror=this.onErrorCallback.bind(this);this.ws.onmessage=this.onMessageCallback.bind(this);this.ws.onopen=this.onOpenCallback.bind(this);}/**
   * @ignore
   */},{key:'onBackoffReady',value:function onBackoffReady(number,delay){// console.log("onBackoffReady", number + ' ' + delay + 'ms');
this.open(true);}/**
   * @ignore
   */},{key:'onCloseCallback',value:function onCloseCallback(){if(!this.isReconnect&&this.listeners['onclose']){this.listeners['onclose'].apply(null,arguments);}if(this.reconnectEnabled){this.backoff.backoff();}}/**
   * @ignore
   */},{key:'onErrorCallback',value:function onErrorCallback(){if(this.listeners['onerror']){this.listeners['onerror'].apply(null,arguments);}}/**
   * @ignore
   */},{key:'onMessageCallback',value:function onMessageCallback(){if(this.listeners['onmessage']){this.listeners['onmessage'].apply(null,arguments);}}/**
   * @ignore
   */},{key:'onOpenCallback',value:function onOpenCallback(){if(this.listeners['onopen']){this.listeners['onopen'].apply(null,arguments);}if(this.isReconnect&&this.listeners['onreconnect']){this.listeners['onreconnect'].apply(null,arguments);}this.isReconnect=false;}/**
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

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.createBackoff=createBackoff;var backoff={exponential:function exponential(attempt,delay){return Math.floor(Math.random()*Math.pow(2,attempt)*delay);},fibonacci:function fibonacci(attempt,delay){var current=1;if(attempt>current){var prev=1,current=2;for(var index=2;index<attempt;index++){var next=prev+current;prev=current;current=next;}}return Math.floor(Math.random()*current*delay);}};function createBackoff(type,options){return new Backoff(backoff[type],options);}function Backoff(func,options){this.func=func;this.attempts=0;this.delay=typeof options.initialDelay!=="undefined"?options.initialDelay:100;}Backoff.prototype.backoff=function(){setTimeout(this.onReady,this.func(++this.attempts,this.delay));};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGNmNmU5ZjRjMzE0YWM4YmQ2ZmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2NvZGVjLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLWNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludDY0LWJ1ZmZlci9pbnQ2NC1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC1jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3RvY29sLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGUtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXVpbnQ4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2ZsZXgtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGUtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtZm9ybWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudC1saXRlL2V2ZW50LWxpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1ByaW9yaXR5U2lnbmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1NpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TbG90TGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtdWludDhhcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtcGFja2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtdG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LXVucGFja2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtdG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZW5jb2Rlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2V4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9jb2RlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9EZWx1eGVTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvZXZlbnRzL0dlbmVyaWNFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JUHJpb3JpdHlTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Nb25vU2lnbmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vY2xvY2svZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsdGEtbGlzdGVuZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvRGVsdGFDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlbHRhLWxpc3RlbmVyL2xpYi9jb21wYXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3NzaWwtZGVsdGEvZm9zc2lsLWRlbHRhLmpzIiwid2VicGFjazovLy8uL3NyYy9Db25uZWN0aW9uLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZ2FtZXN0ZGlvL3dlYnNvY2tldC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vd2Vic29ja2V0L2xpYi9iYWNrb2ZmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsQzs7Ozs7O0FDM0dBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsOEJBQThCLGFBQWE7Ozs7Ozs7O0FDbEUzQztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUMsa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxnQzs7Ozs7O0FDckxBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDVEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLFVBQVU7O0FBRWxCO0FBQ0E7Ozs7Ozs7QUNuRkE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0IsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JGQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWM7O0FBRWQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLGlEQUFpRDtBQUNqRCxrREFBa0Q7QUFDbEQsT0FBTztBQUNQLDRDQUE0QztBQUM1QyxPQUFPO0FBQ1AsNENBQTRDO0FBQzVDLE9BQU87QUFDUCwyQ0FBMkM7QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLDRGQUE0Rjs7Ozs7Ozs7QUNwUzdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25EQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esc0M7Ozs7Ozs7QUMxSkE7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx1REFBdUQ7Ozs7Ozs7QUNoQnhEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzV2REE7O0FBRUE7O0FBRUEsa0JBQWtCLFdBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqTUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNWQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJO0FBQzNCO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSSxFQUFFO0FBQ25DLCtCQUErQixJQUFJLEVBQUU7QUFDckMsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQixrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGVBQWUsVUFBVTtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHFCQUFxQjtBQUNyQixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDbkxEO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUMsa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDOzs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esa0M7Ozs7Ozs7QUMvREE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsYUFBYTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLG9DOzs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLGtDQUFrQztBQUNsQyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQ0FBbUMsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUNBQWlDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDaEhBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtQ0FBbUMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpQ0FBaUM7QUFDakYsZ0RBQWdELGlDQUFpQztBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxzQ0FBc0MsRUFBRTtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7QUM5RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQ1ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNqSEE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLEdBQUc7QUFDSCw2QkFBNkI7QUFDN0I7QUFDQTs7Ozs7OztBQzdDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNsREE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0IsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNySUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBcUQ7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1UUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xPQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBcUQ7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDaEZBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hLQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6QkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1QkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGVBQWU7QUFDL0M7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx3Qzs7Ozs7OztBQ3RJQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx3Qzs7Ozs7OztBQy9EQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7QUNOQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7QUNOQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7QUNOQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7OztBQ1ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxLQUFLO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxzQzs7Ozs7OztBQ3pJQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLG1DOzs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxQkFBcUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxQkFBcUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0JBQXNCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQSx3REFBd0QsU0FBUztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxRQUFRO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlFQUF5RTtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4Q0FBOEM7QUFDeEUsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQSwwQkFBMEIsdUVBQXVFO0FBQ2pHO0FBQ0E7QUFDQTs7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtCQUErQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiLGFBQWE7QUFDYixhQUFhO0FBQ2IsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHdCQUF3QixFQUFFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsZUFBZTtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0MsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQkFBb0I7QUFDakMsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDBCQUEwQjtBQUNuRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7O0FDamNEO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixZQUFZO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0NBQWdDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDN0NhLDRDQUE0QyxXQUFXLEVBQUUsNEJBQTRCLHdDQUF3QyxZQUFZLGVBQWUsS0FBSyx3QkFBd0IsbURBQW1ELDZCQUE2QixpREFBaUQsMERBQTBELG9EQUFvRCxpRUFBaUUseURBQXlELHNCQUFzQixHQUFHLCtDQUErQyx1Q0FBdUMsMkRBQTJELHdEQUFxRCwrQkFBK0I7QUFDenlCLHNEQUFzRDtBQUN0RDtBQUNBLDZDQUE2Qyx5RUFBeUUsc0NBQXNDLGFBQWEseUJBQXlCLDJCQUEyQixrQkFBa0IsbUVBQW1FLG9EQUFvRCxhQUFhLCtCQUErQixpQ0FBaUMsOEVBQThFLDJCQUEyQiwrQ0FBK0MsZ0RBQWdELGdEQUFnRCxvREFBb0QsK0NBQStDO0FBQzl3QjtBQUNBLE1BQU0sRUFBRSxpRUFBaUU7QUFDekUsaUJBQWlCO0FBQ2pCO0FBQ0EsTUFBTSxFQUFFLHVEQUF1RCxpREFBaUQsaURBQWlELDBCQUEwQix5QkFBeUI7QUFDcE47QUFDQSxNQUFNLEVBQUUsdURBQXVELDhCQUE4QixrREFBa0Q7QUFDL0k7QUFDQSxNQUFNLEVBQUUsMkRBQTJELGdDQUFnQyxvREFBb0Q7QUFDdko7QUFDQSxNQUFNLEVBQUUscURBQXFELDZCQUE2QixnREFBZ0Qsb0RBQW9ELHFEQUFxRCx3QkFBd0I7QUFDM1E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDZCQUE2QixXQUFXLDRCQUE0Qiw0QkFBNEI7QUFDdkk7QUFDQTtBQUNBO0FBQ0EsTUFBTSxFQUFFLHFDQUFxQyxvQkFBb0I7QUFDakU7QUFDQTtBQUNBLE1BQU0sRUFBRSx3Q0FBd0MsK0JBQStCO0FBQy9FLHlDQUF5QztBQUN6QztBQUNBO0FBQ0EsTUFBTSxFQUFFLG9DQUFvQywyQkFBMkI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEVBQUUsb0NBQW9DLDJCQUEyQiw4QkFBOEIsK0JBQStCO0FBQ3BJO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRSxvQ0FBb0MsMkJBQTJCLDhCQUE4QiwrQkFBK0I7QUFDcEk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEVBQUUsa0NBQWtDLHlCQUF5Qiw0QkFBNEIsNEJBQTRCLEVBQUUseUNBQXlDLG9DQUFvQyxvQkFBb0Isa0NBQWtDO0FBQ2hRO0FBQ0E7QUFDQSxNQUFNLEVBQUUseUNBQXlDLG9DQUFvQyxvQkFBb0Isa0NBQWtDO0FBQzNJO0FBQ0E7QUFDQSxNQUFNLEVBQUUsMkNBQTJDLHNDQUFzQyxvQkFBb0Isb0NBQW9DO0FBQ2pKLCtGQUErRjtBQUMvRjtBQUNBLE1BQU0sRUFBRSx3Q0FBd0MsbUNBQW1DLG9CQUFvQixpQ0FBaUM7QUFDeEk7QUFDQSxNQUFNLEVBQUUsNkNBQTZDLHdDQUF3QyxvQkFBb0IsdUNBQXVDLEdBQUcsd0JBQXdCLEdBQUc7QUFDdEw7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQ0FBMkMsZ0M7Ozs7Ozs7QUMxRTlCLDRDQUE0QyxXQUFXLEVBQUUsb0NBQW9DLGFBQWEsZ0RBQWdELDREQUE0RCw2Q0FBNkMsY0FBYyxvQkFBb0IscUJBQXFCLGdCQUFnQixjQUFjLFNBQVMsc0JBQXNCLGFBQWEsZUFBZSxrREFBa0QscUNBQXFDLDJDQUEyQywrQkFBK0IsZUFBZSxnQkFBZ0IsK0VBQStFLHFDQUFxQyxpRSIsImZpbGUiOiJjb2x5c2V1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwY2Y2ZTlmNGMzMTRhYzhiZDZmYSIsIi8vIGJ1ZmZlcmlzaC5qc1xuXG52YXIgQnVmZmVyID0gZXhwb3J0cy5nbG9iYWwgPSByZXF1aXJlKFwiLi9idWZmZXItZ2xvYmFsXCIpO1xudmFyIGhhc0J1ZmZlciA9IGV4cG9ydHMuaGFzQnVmZmVyID0gQnVmZmVyICYmICEhQnVmZmVyLmlzQnVmZmVyO1xudmFyIGhhc0FycmF5QnVmZmVyID0gZXhwb3J0cy5oYXNBcnJheUJ1ZmZlciA9IChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgQXJyYXlCdWZmZXIpO1xuXG52YXIgaXNBcnJheSA9IGV4cG9ydHMuaXNBcnJheSA9IHJlcXVpcmUoXCJpc2FycmF5XCIpO1xuZXhwb3J0cy5pc0FycmF5QnVmZmVyID0gaGFzQXJyYXlCdWZmZXIgPyBpc0FycmF5QnVmZmVyIDogX2ZhbHNlO1xudmFyIGlzQnVmZmVyID0gZXhwb3J0cy5pc0J1ZmZlciA9IGhhc0J1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IF9mYWxzZTtcbnZhciBpc1ZpZXcgPSBleHBvcnRzLmlzVmlldyA9IGhhc0FycmF5QnVmZmVyID8gKEFycmF5QnVmZmVyLmlzVmlldyB8fCBfaXMoXCJBcnJheUJ1ZmZlclwiLCBcImJ1ZmZlclwiKSkgOiBfZmFsc2U7XG5cbmV4cG9ydHMuYWxsb2MgPSBhbGxvYztcbmV4cG9ydHMuY29uY2F0ID0gY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxudmFyIEJ1ZmZlckFycmF5ID0gZXhwb3J0cy5BcnJheSA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1hcnJheVwiKTtcbnZhciBCdWZmZXJCdWZmZXIgPSBleHBvcnRzLkJ1ZmZlciA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1idWZmZXJcIik7XG52YXIgQnVmZmVyVWludDhBcnJheSA9IGV4cG9ydHMuVWludDhBcnJheSA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC11aW50OGFycmF5XCIpO1xudmFyIEJ1ZmZlclByb3RvID0gZXhwb3J0cy5wcm90b3R5cGUgPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtcHJvdG9cIik7XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBmcm9tU3RyaW5nLmNhbGwodGhpcywgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhdXRvKHRoaXMpLmZyb20odmFsdWUpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHNpemUge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gIHJldHVybiBhdXRvKHRoaXMpLmFsbG9jKHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSBsaXN0IHtBcnJheX0gYXJyYXkgb2YgKEJ1ZmZlcnxVaW50OEFycmF5fEFycmF5KXNcbiAqIEBwYXJhbSBbbGVuZ3RoXVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGNvbmNhdChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSAwO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGlzdCwgZHJ5cnVuKTtcbiAgfVxuICB2YXIgcmVmID0gKHRoaXMgIT09IGV4cG9ydHMpICYmIHRoaXMgfHwgbGlzdFswXTtcbiAgdmFyIHJlc3VsdCA9IGFsbG9jLmNhbGwocmVmLCBsZW5ndGgpO1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChsaXN0LCBhcHBlbmQpO1xuICByZXR1cm4gcmVzdWx0O1xuXG4gIGZ1bmN0aW9uIGRyeXJ1bihidWZmZXIpIHtcbiAgICBsZW5ndGggKz0gYnVmZmVyLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZChidWZmZXIpIHtcbiAgICBvZmZzZXQgKz0gQnVmZmVyUHJvdG8uY29weS5jYWxsKGJ1ZmZlciwgcmVzdWx0LCBvZmZzZXQpO1xuICB9XG59XG5cbnZhciBfaXNBcnJheUJ1ZmZlciA9IF9pcyhcIkFycmF5QnVmZmVyXCIpO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgX2lzQXJyYXlCdWZmZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZnJvbVN0cmluZyh2YWx1ZSkge1xuICB2YXIgZXhwZWN0ZWQgPSB2YWx1ZS5sZW5ndGggKiAzO1xuICB2YXIgdGhhdCA9IGFsbG9jLmNhbGwodGhpcywgZXhwZWN0ZWQpO1xuICB2YXIgYWN0dWFsID0gQnVmZmVyUHJvdG8ud3JpdGUuY2FsbCh0aGF0LCB2YWx1ZSk7XG4gIGlmIChleHBlY3RlZCAhPT0gYWN0dWFsKSB7XG4gICAgdGhhdCA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwodGhhdCwgMCwgYWN0dWFsKTtcbiAgfVxuICByZXR1cm4gdGhhdDtcbn1cblxuZnVuY3Rpb24gYXV0byh0aGF0KSB7XG4gIHJldHVybiBpc0J1ZmZlcih0aGF0KSA/IEJ1ZmZlckJ1ZmZlclxuICAgIDogaXNWaWV3KHRoYXQpID8gQnVmZmVyVWludDhBcnJheVxuICAgIDogaXNBcnJheSh0aGF0KSA/IEJ1ZmZlckFycmF5XG4gICAgOiBoYXNCdWZmZXIgPyBCdWZmZXJCdWZmZXJcbiAgICA6IGhhc0FycmF5QnVmZmVyID8gQnVmZmVyVWludDhBcnJheVxuICAgIDogQnVmZmVyQXJyYXk7XG59XG5cbmZ1bmN0aW9uIF9mYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBfaXMobmFtZSwga2V5KSB7XG4gIC8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuICBuYW1lID0gXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiO1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICE9IG51bGwpICYmIHt9LnRvU3RyaW5nLmNhbGwoa2V5ID8gdmFsdWVba2V5XSA6IHZhbHVlKSA9PT0gbmFtZTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY29kZWMtYmFzZS5qc1xuXG52YXIgSVNfQVJSQVkgPSByZXF1aXJlKFwiaXNhcnJheVwiKTtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IGNyZWF0ZUNvZGVjO1xuZXhwb3J0cy5pbnN0YWxsID0gaW5zdGFsbDtcbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG5mdW5jdGlvbiBDb2RlYyhvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb2RlYykpIHJldHVybiBuZXcgQ29kZWMob3B0aW9ucyk7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuaW5pdCgpO1xufVxuXG5Db2RlYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnVpbnQ4YXJyYXkpIHtcbiAgICB0aGlzLmJ1ZmZlcmlzaCA9IEJ1ZmZlcmlzaC5VaW50OEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBpbnN0YWxsKHByb3BzKSB7XG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIENvZGVjLnByb3RvdHlwZVtrZXldID0gYWRkKENvZGVjLnByb3RvdHlwZVtrZXldLCBwcm9wc1trZXldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gKGEgJiYgYikgPyBhYiA6IChhIHx8IGIpO1xuXG4gIGZ1bmN0aW9uIGFiKCkge1xuICAgIGEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGpvaW4oZmlsdGVycykge1xuICBmaWx0ZXJzID0gZmlsdGVycy5zbGljZSgpO1xuXG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmaWx0ZXJzLnJlZHVjZShpdGVyYXRvciwgdmFsdWUpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGl0ZXJhdG9yKHZhbHVlLCBmaWx0ZXIpIHtcbiAgICByZXR1cm4gZmlsdGVyKHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWx0ZXIoZmlsdGVyKSB7XG4gIHJldHVybiBJU19BUlJBWShmaWx0ZXIpID8gam9pbihmaWx0ZXIpIDogZmlsdGVyO1xufVxuXG4vLyBAcHVibGljXG4vLyBtc2dwYWNrLmNyZWF0ZUNvZGVjKClcblxuZnVuY3Rpb24gY3JlYXRlQ29kZWMob3B0aW9ucykge1xuICByZXR1cm4gbmV3IENvZGVjKG9wdGlvbnMpO1xufVxuXG4vLyBkZWZhdWx0IHNoYXJlZCBjb2RlY1xuXG5leHBvcnRzLnByZXNldCA9IGNyZWF0ZUNvZGVjKHtwcmVzZXQ6IHRydWV9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvY29kZWMtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIFNsb3QgY2xhc3MgcmVwcmVzZW50cyBhIHNpZ25hbCBzbG90LlxuICpcbiAqIEBhdXRob3IgUm9iZXJ0IFBlbm5lclxuICogQGF1dGhvciBKb2EgRWJlcnRcbiAqL1xudmFyIFNsb3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgU2xvdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2xvdC5cbiAgICAgKiBAcGFyYW0gc2lnbmFsIFRoZSBzaWduYWwgYXNzb2NpYXRlZCB3aXRoIHRoZSBzbG90LlxuICAgICAqIEBwYXJhbSBvbmNlIFdoZXRoZXIgb3Igbm90IHRoZSBsaXN0ZW5lciBzaG91bGQgYmUgZXhlY3V0ZWQgb25seSBvbmNlLlxuICAgICAqIEBwYXJhbSBwcmlvcml0eSBUaGUgcHJpb3JpdHkgb2YgdGhlIHNsb3QuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqIEB0aHJvd3MgRXJyb3IgPGNvZGU+RXJyb3I8L2NvZGU+OiBJbnRlcm5hbCBzaWduYWwgcmVmZXJlbmNlIGhhcyBub3QgYmVlbiBzZXQgeWV0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNsb3QobGlzdGVuZXIsIHNpZ25hbCwgb25jZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9vbmNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gMDtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgdGhpcy5fb25jZSA9IG9uY2U7XG4gICAgICAgIHRoaXMuX3NpZ25hbCA9IHNpZ25hbDtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy52ZXJpZnlMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUuZXhlY3V0ZTAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX29uY2UpXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICBpZiAodGhpcy5fcGFyYW1zICYmIHRoaXMuX3BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyLmFwcGx5KG51bGwsIHRoaXMuX3BhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGlzdGVuZXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUuZXhlY3V0ZTEgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5fb25jZSlcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIGlmICh0aGlzLl9wYXJhbXMgJiYgdGhpcy5fcGFyYW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIuYXBwbHkobnVsbCwgW3ZhbHVlXS5jb25jYXQodGhpcy5fcGFyYW1zKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGlzdGVuZXIodmFsdWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBTbG90LnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHZhbHVlT2JqZWN0cykge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9vbmNlKVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBwYXJhbWV0ZXJzLCBhZGQgdGhlbSB0byB0aGUgdmFsdWVPYmplY3RcbiAgICAgICAgLy8gTm90ZTogVGhpcyBjb3VsZCBiZSBleHBlbnNpdmUgaWYgd2UncmUgYWZ0ZXIgdGhlIGZhc3Rlc3QgZGlzcGF0Y2ggcG9zc2libGUuXG4gICAgICAgIGlmICh0aGlzLl9wYXJhbXMgJiYgdGhpcy5fcGFyYW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzID0gdmFsdWVPYmplY3RzLmNvbmNhdCh0aGlzLl9wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5PVEU6IHNpbXBsZSBpZnMgYXJlIGZhc3RlciB0aGFuIHN3aXRjaDogaHR0cDovL2phY2tzb25kdW5zdGFuLmNvbS9hcnRpY2xlcy8xMDA3XG4gICAgICAgIHZhciBudW1WYWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHMubGVuZ3RoO1xuICAgICAgICBpZiAobnVtVmFsdWVPYmplY3RzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtVmFsdWVPYmplY3RzID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyKHZhbHVlT2JqZWN0c1swXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtVmFsdWVPYmplY3RzID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyKHZhbHVlT2JqZWN0c1swXSwgdmFsdWVPYmplY3RzWzFdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChudW1WYWx1ZU9iamVjdHMgPT0gMykge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIodmFsdWVPYmplY3RzWzBdLCB2YWx1ZU9iamVjdHNbMV0sIHZhbHVlT2JqZWN0c1syXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lci5hcHBseShudWxsLCB2YWx1ZU9iamVjdHMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwibGlzdGVuZXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi4gRGlkIHlvdSB3YW50IHRvIHNldCBlbmFibGVkIHRvIGZhbHNlIGluc3RlYWQ/XG4gICAgICAgICAqIEB0aHJvd3MgRXJyb3IgPGNvZGU+RXJyb3I8L2NvZGU+OiBJbnRlcm5hbCBzaWduYWwgcmVmZXJlbmNlIGhhcyBub3QgYmVlbiBzZXQgeWV0LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSB2YWx1ZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dpdmVuIGxpc3RlbmVyIGlzIG51bGwuXFxuRGlkIHlvdSB3YW50IHRvIHNldCBlbmFibGVkIHRvIGZhbHNlIGluc3RlYWQ/Jyk7XG4gICAgICAgICAgICB0aGlzLnZlcmlmeUxpc3RlbmVyKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90LnByb3RvdHlwZSwgXCJvbmNlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwicHJpb3JpdHlcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByaW9yaXR5O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybiBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICAgKi9cbiAgICBTbG90LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiW1Nsb3QgbGlzdGVuZXI6IFwiICsgdGhpcy5fbGlzdGVuZXIgKyBcIiwgb25jZTogXCIgKyB0aGlzLl9vbmNlXG4gICAgICAgICAgICArIFwiLCBwcmlvcml0eTogXCIgKyB0aGlzLl9wcmlvcml0eSArIFwiLCBlbmFibGVkOiBcIiArIHRoaXMuX2VuYWJsZWQgKyBcIl1cIjtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90LnByb3RvdHlwZSwgXCJlbmFibGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwicGFyYW1zXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJhbXMgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBTbG90LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NpZ25hbC5yZW1vdmUodGhpcy5fbGlzdGVuZXIpO1xuICAgIH07XG4gICAgU2xvdC5wcm90b3R5cGUudmVyaWZ5TGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKG51bGwgPT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR2l2ZW4gbGlzdGVuZXIgaXMgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLl9zaWduYWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJuYWwgc2lnbmFsIHJlZmVyZW5jZSBoYXMgbm90IGJlZW4gc2V0IHlldC4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFNsb3Q7XG59KCkpO1xuZXhwb3J0cy5TbG90ID0gU2xvdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNsb3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TbG90LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJyb3dzZXIuanNcblxuZXhwb3J0cy5lbmNvZGUgPSByZXF1aXJlKFwiLi9lbmNvZGVcIikuZW5jb2RlO1xuZXhwb3J0cy5kZWNvZGUgPSByZXF1aXJlKFwiLi9kZWNvZGVcIikuZGVjb2RlO1xuXG5leHBvcnRzLkVuY29kZXIgPSByZXF1aXJlKFwiLi9lbmNvZGVyXCIpLkVuY29kZXI7XG5leHBvcnRzLkRlY29kZXIgPSByZXF1aXJlKFwiLi9kZWNvZGVyXCIpLkRlY29kZXI7XG5cbmV4cG9ydHMuY3JlYXRlQ29kZWMgPSByZXF1aXJlKFwiLi9leHRcIikuY3JlYXRlQ29kZWM7XG5leHBvcnRzLmNvZGVjID0gcmVxdWlyZShcIi4vY29kZWNcIikuY29kZWM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gd3JpdGUtY29yZS5qc1xuXG52YXIgRXh0QnVmZmVyID0gcmVxdWlyZShcIi4vZXh0LWJ1ZmZlclwiKS5FeHRCdWZmZXI7XG52YXIgRXh0UGFja2VyID0gcmVxdWlyZShcIi4vZXh0LXBhY2tlclwiKTtcbnZhciBXcml0ZVR5cGUgPSByZXF1aXJlKFwiLi93cml0ZS10eXBlXCIpO1xudmFyIENvZGVjQmFzZSA9IHJlcXVpcmUoXCIuL2NvZGVjLWJhc2VcIik7XG5cbkNvZGVjQmFzZS5pbnN0YWxsKHtcbiAgYWRkRXh0UGFja2VyOiBhZGRFeHRQYWNrZXIsXG4gIGdldEV4dFBhY2tlcjogZ2V0RXh0UGFja2VyLFxuICBpbml0OiBpbml0XG59KTtcblxuZXhwb3J0cy5wcmVzZXQgPSBpbml0LmNhbGwoQ29kZWNCYXNlLnByZXNldCk7XG5cbmZ1bmN0aW9uIGdldEVuY29kZXIob3B0aW9ucykge1xuICB2YXIgd3JpdGVUeXBlID0gV3JpdGVUeXBlLmdldFdyaXRlVHlwZShvcHRpb25zKTtcbiAgcmV0dXJuIGVuY29kZTtcblxuICBmdW5jdGlvbiBlbmNvZGUoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgZnVuYyA9IHdyaXRlVHlwZVt0eXBlb2YgdmFsdWVdO1xuICAgIGlmICghZnVuYykgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdHlwZSBcXFwiXCIgKyAodHlwZW9mIHZhbHVlKSArIFwiXFxcIjogXCIgKyB2YWx1ZSk7XG4gICAgZnVuYyhlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gIHRoaXMuZW5jb2RlID0gZ2V0RW5jb2RlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByZXNldCkge1xuICAgIEV4dFBhY2tlci5zZXRFeHRQYWNrZXJzKHRoaXMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGFkZEV4dFBhY2tlcihldHlwZSwgQ2xhc3MsIHBhY2tlcikge1xuICBwYWNrZXIgPSBDb2RlY0Jhc2UuZmlsdGVyKHBhY2tlcik7XG4gIHZhciBuYW1lID0gQ2xhc3MubmFtZTtcbiAgaWYgKG5hbWUgJiYgbmFtZSAhPT0gXCJPYmplY3RcIikge1xuICAgIHZhciBwYWNrZXJzID0gdGhpcy5leHRQYWNrZXJzIHx8ICh0aGlzLmV4dFBhY2tlcnMgPSB7fSk7XG4gICAgcGFja2Vyc1tuYW1lXSA9IGV4dFBhY2tlcjtcbiAgfSBlbHNlIHtcbiAgICAvLyBmYWxsYmFjayBmb3IgSUVcbiAgICB2YXIgbGlzdCA9IHRoaXMuZXh0RW5jb2Rlckxpc3QgfHwgKHRoaXMuZXh0RW5jb2Rlckxpc3QgPSBbXSk7XG4gICAgbGlzdC51bnNoaWZ0KFtDbGFzcywgZXh0UGFja2VyXSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRQYWNrZXIodmFsdWUpIHtcbiAgICBpZiAocGFja2VyKSB2YWx1ZSA9IHBhY2tlcih2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBFeHRCdWZmZXIodmFsdWUsIGV0eXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFeHRQYWNrZXIodmFsdWUpIHtcbiAgdmFyIHBhY2tlcnMgPSB0aGlzLmV4dFBhY2tlcnMgfHwgKHRoaXMuZXh0UGFja2VycyA9IHt9KTtcbiAgdmFyIGMgPSB2YWx1ZS5jb25zdHJ1Y3RvcjtcbiAgdmFyIGUgPSBjICYmIGMubmFtZSAmJiBwYWNrZXJzW2MubmFtZV07XG4gIGlmIChlKSByZXR1cm4gZTtcblxuICAvLyBmYWxsYmFjayBmb3IgSUVcbiAgdmFyIGxpc3QgPSB0aGlzLmV4dEVuY29kZXJMaXN0IHx8ICh0aGlzLmV4dEVuY29kZXJMaXN0ID0gW10pO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IGxpc3RbaV07XG4gICAgaWYgKGMgPT09IHBhaXJbMF0pIHJldHVybiBwYWlyWzFdO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLWNvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LWJ1ZmZlci5qc1xuXG5leHBvcnRzLkV4dEJ1ZmZlciA9IEV4dEJ1ZmZlcjtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcblxuZnVuY3Rpb24gRXh0QnVmZmVyKGJ1ZmZlciwgdHlwZSkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRXh0QnVmZmVyKSkgcmV0dXJuIG5ldyBFeHRCdWZmZXIoYnVmZmVyLCB0eXBlKTtcbiAgdGhpcy5idWZmZXIgPSBCdWZmZXJpc2guZnJvbShidWZmZXIpO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXJpc2gtcHJvdG8uanNcblxuLyoganNoaW50IGVxbnVsbDp0cnVlICovXG5cbnZhciBCdWZmZXJMaXRlID0gcmVxdWlyZShcIi4vYnVmZmVyLWxpdGVcIik7XG5cbmV4cG9ydHMuY29weSA9IGNvcHk7XG5leHBvcnRzLnNsaWNlID0gc2xpY2U7XG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG5leHBvcnRzLndyaXRlID0gZ2VuKFwid3JpdGVcIik7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcblxudmFyIGlzQnVmZmVyU2hpbSA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgKFwiVFlQRURfQVJSQVlfU1VQUE9SVFwiIGluIEJ1ZmZlcik7XG52YXIgYnJva2VuVHlwZWRBcnJheSA9IGlzQnVmZmVyU2hpbSAmJiAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQ7XG5cbi8qKlxuICogQHBhcmFtIHRhcmdldCB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKiBAcGFyYW0gW3RhcmdldFN0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGNvcHkodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdGhpc0lzQnVmZmVyID0gQnVmZmVyaXNoLmlzQnVmZmVyKHRoaXMpO1xuICB2YXIgdGFyZ2V0SXNCdWZmZXIgPSBCdWZmZXJpc2guaXNCdWZmZXIodGFyZ2V0KTtcbiAgaWYgKHRoaXNJc0J1ZmZlciAmJiB0YXJnZXRJc0J1ZmZlcikge1xuICAgIC8vIEJ1ZmZlciB0byBCdWZmZXJcbiAgICByZXR1cm4gdGhpcy5jb3B5KHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpO1xuICB9IGVsc2UgaWYgKCFicm9rZW5UeXBlZEFycmF5ICYmICF0aGlzSXNCdWZmZXIgJiYgIXRhcmdldElzQnVmZmVyICYmXG4gICAgQnVmZmVyaXNoLmlzVmlldyh0aGlzKSAmJiBCdWZmZXJpc2guaXNWaWV3KHRhcmdldCkpIHtcbiAgICAvLyBVaW50OEFycmF5IHRvIFVpbnQ4QXJyYXkgKGV4Y2VwdCBmb3IgbWlub3Igc29tZSBicm93c2VycylcbiAgICB2YXIgYnVmZmVyID0gKHN0YXJ0IHx8IGVuZCAhPSBudWxsKSA/IHNsaWNlLmNhbGwodGhpcywgc3RhcnQsIGVuZCkgOiB0aGlzO1xuICAgIHRhcmdldC5zZXQoYnVmZmVyLCB0YXJnZXRTdGFydCk7XG4gICAgcmV0dXJuIGJ1ZmZlci5sZW5ndGg7XG4gIH0gZWxzZSB7XG4gICAgLy8gb3RoZXIgY2FzZXNcbiAgICByZXR1cm4gQnVmZmVyTGl0ZS5jb3B5LmNhbGwodGhpcywgdGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAvLyBmb3IgQnVmZmVyLCBVaW50OEFycmF5IChleGNlcHQgZm9yIG1pbm9yIHNvbWUgYnJvd3NlcnMpIGFuZCBBcnJheVxuICB2YXIgZiA9IHRoaXMuc2xpY2UgfHwgKCFicm9rZW5UeXBlZEFycmF5ICYmIHRoaXMuc3ViYXJyYXkpO1xuICBpZiAoZikgcmV0dXJuIGYuY2FsbCh0aGlzLCBzdGFydCwgZW5kKTtcblxuICAvLyBVaW50OEFycmF5IChmb3IgbWlub3Igc29tZSBicm93c2VycylcbiAgdmFyIHRhcmdldCA9IEJ1ZmZlcmlzaC5hbGxvYy5jYWxsKHRoaXMsIGVuZCAtIHN0YXJ0KTtcbiAgY29weS5jYWxsKHRoaXMsIHRhcmdldCwgMCwgc3RhcnQsIGVuZCk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZygpXG4gKlxuICogQHBhcmFtIFtlbmNvZGluZ10ge1N0cmluZ30gaWdub3JlZFxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b1N0cmluZyhlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgZiA9ICghaXNCdWZmZXJTaGltICYmIEJ1ZmZlcmlzaC5pc0J1ZmZlcih0aGlzKSkgPyB0aGlzLnRvU3RyaW5nIDogQnVmZmVyTGl0ZS50b1N0cmluZztcbiAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGdlbihtZXRob2QpIHtcbiAgcmV0dXJuIHdyYXA7XG5cbiAgZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgZiA9IHRoaXNbbWV0aG9kXSB8fCBCdWZmZXJMaXRlW21ldGhvZF07XG4gICAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtcHJvdG8uanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaW50NjQtYnVmZmVyLmpzXG5cbi8qanNoaW50IC1XMDE4ICovIC8vIENvbmZ1c2luZyB1c2Ugb2YgJyEnLlxuLypqc2hpbnQgLVcwMzAgKi8gLy8gRXhwZWN0ZWQgYW4gYXNzaWdubWVudCBvciBmdW5jdGlvbiBjYWxsIGFuZCBpbnN0ZWFkIHNhdyBhbiBleHByZXNzaW9uLlxuLypqc2hpbnQgLVcwOTMgKi8gLy8gRGlkIHlvdSBtZWFuIHRvIHJldHVybiBhIGNvbmRpdGlvbmFsIGluc3RlYWQgb2YgYW4gYXNzaWdubWVudD9cblxudmFyIFVpbnQ2NEJFLCBJbnQ2NEJFLCBVaW50NjRMRSwgSW50NjRMRTtcblxuIWZ1bmN0aW9uKGV4cG9ydHMpIHtcbiAgLy8gY29uc3RhbnRzXG5cbiAgdmFyIFVOREVGSU5FRCA9IFwidW5kZWZpbmVkXCI7XG4gIHZhciBCVUZGRVIgPSAoVU5ERUZJTkVEICE9PSB0eXBlb2YgQnVmZmVyKSAmJiBCdWZmZXI7XG4gIHZhciBVSU5UOEFSUkFZID0gKFVOREVGSU5FRCAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG4gIHZhciBBUlJBWUJVRkZFUiA9IChVTkRFRklORUQgIT09IHR5cGVvZiBBcnJheUJ1ZmZlcikgJiYgQXJyYXlCdWZmZXI7XG4gIHZhciBaRVJPID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgX2lzQXJyYXk7XG4gIHZhciBCSVQzMiA9IDQyOTQ5NjcyOTY7XG4gIHZhciBCSVQyNCA9IDE2Nzc3MjE2O1xuXG4gIC8vIHN0b3JhZ2UgY2xhc3NcblxuICB2YXIgc3RvcmFnZTsgLy8gQXJyYXk7XG5cbiAgLy8gZ2VuZXJhdGUgY2xhc3Nlc1xuXG4gIFVpbnQ2NEJFID0gZmFjdG9yeShcIlVpbnQ2NEJFXCIsIHRydWUsIHRydWUpO1xuICBJbnQ2NEJFID0gZmFjdG9yeShcIkludDY0QkVcIiwgdHJ1ZSwgZmFsc2UpO1xuICBVaW50NjRMRSA9IGZhY3RvcnkoXCJVaW50NjRMRVwiLCBmYWxzZSwgdHJ1ZSk7XG4gIEludDY0TEUgPSBmYWN0b3J5KFwiSW50NjRMRVwiLCBmYWxzZSwgZmFsc2UpO1xuXG4gIC8vIGNsYXNzIGZhY3RvcnlcblxuICBmdW5jdGlvbiBmYWN0b3J5KG5hbWUsIGJpZ2VuZGlhbiwgdW5zaWduZWQpIHtcbiAgICB2YXIgcG9zSCA9IGJpZ2VuZGlhbiA/IDAgOiA0O1xuICAgIHZhciBwb3NMID0gYmlnZW5kaWFuID8gNCA6IDA7XG4gICAgdmFyIHBvczAgPSBiaWdlbmRpYW4gPyAwIDogMztcbiAgICB2YXIgcG9zMSA9IGJpZ2VuZGlhbiA/IDEgOiAyO1xuICAgIHZhciBwb3MyID0gYmlnZW5kaWFuID8gMiA6IDE7XG4gICAgdmFyIHBvczMgPSBiaWdlbmRpYW4gPyAzIDogMDtcbiAgICB2YXIgZnJvbVBvc2l0aXZlID0gYmlnZW5kaWFuID8gZnJvbVBvc2l0aXZlQkUgOiBmcm9tUG9zaXRpdmVMRTtcbiAgICB2YXIgZnJvbU5lZ2F0aXZlID0gYmlnZW5kaWFuID8gZnJvbU5lZ2F0aXZlQkUgOiBmcm9tTmVnYXRpdmVMRTtcbiAgICB2YXIgcHJvdG8gPSBJbnQ2NC5wcm90b3R5cGU7XG4gICAgdmFyIGlzTmFtZSA9IFwiaXNcIiArIG5hbWU7XG4gICAgdmFyIF9pc0ludDY0ID0gXCJfXCIgKyBpc05hbWU7XG5cbiAgICAvLyBwcm9wZXJ0aWVzXG4gICAgcHJvdG8uYnVmZmVyID0gdm9pZCAwO1xuICAgIHByb3RvLm9mZnNldCA9IDA7XG4gICAgcHJvdG9bX2lzSW50NjRdID0gdHJ1ZTtcblxuICAgIC8vIG1ldGhvZHNcbiAgICBwcm90by50b051bWJlciA9IHRvTnVtYmVyO1xuICAgIHByb3RvLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gICAgcHJvdG8udG9KU09OID0gdG9OdW1iZXI7XG4gICAgcHJvdG8udG9BcnJheSA9IHRvQXJyYXk7XG5cbiAgICAvLyBhZGQgLnRvQnVmZmVyKCkgbWV0aG9kIG9ubHkgd2hlbiBCdWZmZXIgYXZhaWxhYmxlXG4gICAgaWYgKEJVRkZFUikgcHJvdG8udG9CdWZmZXIgPSB0b0J1ZmZlcjtcblxuICAgIC8vIGFkZCAudG9BcnJheUJ1ZmZlcigpIG1ldGhvZCBvbmx5IHdoZW4gVWludDhBcnJheSBhdmFpbGFibGVcbiAgICBpZiAoVUlOVDhBUlJBWSkgcHJvdG8udG9BcnJheUJ1ZmZlciA9IHRvQXJyYXlCdWZmZXI7XG5cbiAgICAvLyBpc1VpbnQ2NEJFLCBpc0ludDY0QkVcbiAgICBJbnQ2NFtpc05hbWVdID0gaXNJbnQ2NDtcblxuICAgIC8vIENvbW1vbkpTXG4gICAgZXhwb3J0c1tuYW1lXSA9IEludDY0O1xuXG4gICAgcmV0dXJuIEludDY0O1xuXG4gICAgLy8gY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBJbnQ2NChidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCkge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEludDY0KSkgcmV0dXJuIG5ldyBJbnQ2NChidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCk7XG4gICAgICByZXR1cm4gaW5pdCh0aGlzLCBidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCk7XG4gICAgfVxuXG4gICAgLy8gaXNVaW50NjRCRSwgaXNJbnQ2NEJFXG4gICAgZnVuY3Rpb24gaXNJbnQ2NChiKSB7XG4gICAgICByZXR1cm4gISEoYiAmJiBiW19pc0ludDY0XSk7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGl6ZXJcbiAgICBmdW5jdGlvbiBpbml0KHRoYXQsIGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KSB7XG4gICAgICBpZiAoVUlOVDhBUlJBWSAmJiBBUlJBWUJVRkZFUikge1xuICAgICAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgQVJSQVlCVUZGRVIpIGJ1ZmZlciA9IG5ldyBVSU5UOEFSUkFZKGJ1ZmZlcik7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFSUkFZQlVGRkVSKSB2YWx1ZSA9IG5ldyBVSU5UOEFSUkFZKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW50NjRCRSgpIHN0eWxlXG4gICAgICBpZiAoIWJ1ZmZlciAmJiAhb2Zmc2V0ICYmICF2YWx1ZSAmJiAhc3RvcmFnZSkge1xuICAgICAgICAvLyBzaG9ydGN1dCB0byBpbml0aWFsaXplIHdpdGggemVyb1xuICAgICAgICB0aGF0LmJ1ZmZlciA9IG5ld0FycmF5KFpFUk8sIDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEludDY0QkUodmFsdWUsIHJhZGRpeCkgc3R5bGVcbiAgICAgIGlmICghaXNWYWxpZEJ1ZmZlcihidWZmZXIsIG9mZnNldCkpIHtcbiAgICAgICAgdmFyIF9zdG9yYWdlID0gc3RvcmFnZSB8fCBBcnJheTtcbiAgICAgICAgcmFkZGl4ID0gb2Zmc2V0O1xuICAgICAgICB2YWx1ZSA9IGJ1ZmZlcjtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgYnVmZmVyID0gbmV3IF9zdG9yYWdlKDgpO1xuICAgICAgfVxuXG4gICAgICB0aGF0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoYXQub2Zmc2V0ID0gb2Zmc2V0IHw9IDA7XG5cbiAgICAgIC8vIEludDY0QkUoYnVmZmVyLCBvZmZzZXQpIHN0eWxlXG4gICAgICBpZiAoVU5ERUZJTkVEID09PSB0eXBlb2YgdmFsdWUpIHJldHVybjtcblxuICAgICAgLy8gSW50NjRCRShidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCkgc3R5bGVcbiAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgZnJvbVN0cmluZyhidWZmZXIsIG9mZnNldCwgdmFsdWUsIHJhZGRpeCB8fCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKGlzVmFsaWRCdWZmZXIodmFsdWUsIHJhZGRpeCkpIHtcbiAgICAgICAgZnJvbUFycmF5KGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KTtcbiAgICAgIH0gZWxzZSBpZiAoXCJudW1iZXJcIiA9PT0gdHlwZW9mIHJhZGRpeCkge1xuICAgICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCwgdmFsdWUpOyAvLyBoaWdoXG4gICAgICAgIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NMLCByYWRkaXgpOyAvLyBsb3dcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIGZyb21Qb3NpdGl2ZShidWZmZXIsIG9mZnNldCwgdmFsdWUpOyAvLyBwb3NpdGl2ZVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgZnJvbU5lZ2F0aXZlKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSk7IC8vIG5lZ2F0aXZlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcm9tQXJyYXkoYnVmZmVyLCBvZmZzZXQsIFpFUk8sIDApOyAvLyB6ZXJvLCBOYU4gYW5kIG90aGVyc1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb21TdHJpbmcoYnVmZmVyLCBvZmZzZXQsIHN0ciwgcmFkZGl4KSB7XG4gICAgICB2YXIgcG9zID0gMDtcbiAgICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuICAgICAgdmFyIGhpZ2ggPSAwO1xuICAgICAgdmFyIGxvdyA9IDA7XG4gICAgICBpZiAoc3RyWzBdID09PSBcIi1cIikgcG9zKys7XG4gICAgICB2YXIgc2lnbiA9IHBvcztcbiAgICAgIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICAgICAgdmFyIGNociA9IHBhcnNlSW50KHN0cltwb3MrK10sIHJhZGRpeCk7XG4gICAgICAgIGlmICghKGNociA+PSAwKSkgYnJlYWs7IC8vIE5hTlxuICAgICAgICBsb3cgPSBsb3cgKiByYWRkaXggKyBjaHI7XG4gICAgICAgIGhpZ2ggPSBoaWdoICogcmFkZGl4ICsgTWF0aC5mbG9vcihsb3cgLyBCSVQzMik7XG4gICAgICAgIGxvdyAlPSBCSVQzMjtcbiAgICAgIH1cbiAgICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpZ2ggPSB+aGlnaDtcbiAgICAgICAgaWYgKGxvdykge1xuICAgICAgICAgIGxvdyA9IEJJVDMyIC0gbG93O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZ2grKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0gsIGhpZ2gpO1xuICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wsIGxvdyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9OdW1iZXIoKSB7XG4gICAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgaGlnaCA9IHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0gpO1xuICAgICAgdmFyIGxvdyA9IHJlYWRJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wpO1xuICAgICAgaWYgKCF1bnNpZ25lZCkgaGlnaCB8PSAwOyAvLyBhIHRyaWNrIHRvIGdldCBzaWduZWRcbiAgICAgIHJldHVybiBoaWdoID8gKGhpZ2ggKiBCSVQzMiArIGxvdykgOiBsb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcocmFkaXgpIHtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHZhciBoaWdoID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCk7XG4gICAgICB2YXIgbG93ID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCk7XG4gICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgIHZhciBzaWduID0gIXVuc2lnbmVkICYmIChoaWdoICYgMHg4MDAwMDAwMCk7XG4gICAgICBpZiAoc2lnbikge1xuICAgICAgICBoaWdoID0gfmhpZ2g7XG4gICAgICAgIGxvdyA9IEJJVDMyIC0gbG93O1xuICAgICAgfVxuICAgICAgcmFkaXggPSByYWRpeCB8fCAxMDtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHZhciBtb2QgPSAoaGlnaCAlIHJhZGl4KSAqIEJJVDMyICsgbG93O1xuICAgICAgICBoaWdoID0gTWF0aC5mbG9vcihoaWdoIC8gcmFkaXgpO1xuICAgICAgICBsb3cgPSBNYXRoLmZsb29yKG1vZCAvIHJhZGl4KTtcbiAgICAgICAgc3RyID0gKG1vZCAlIHJhZGl4KS50b1N0cmluZyhyYWRpeCkgKyBzdHI7XG4gICAgICAgIGlmICghaGlnaCAmJiAhbG93KSBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChzaWduKSB7XG4gICAgICAgIHN0ciA9IFwiLVwiICsgc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczNdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID4+IDg7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zMl0gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gODtcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MxXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgPSB2YWx1ZSA+PiA4O1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczBdID0gdmFsdWUgJiAyNTU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gKGJ1ZmZlcltvZmZzZXQgKyBwb3MwXSAqIEJJVDI0KSArXG4gICAgICAgIChidWZmZXJbb2Zmc2V0ICsgcG9zMV0gPDwgMTYpICtcbiAgICAgICAgKGJ1ZmZlcltvZmZzZXQgKyBwb3MyXSA8PCA4KSArXG4gICAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MzXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b0FycmF5KHJhdykge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgc3RvcmFnZSA9IG51bGw7IC8vIEFycmF5XG4gICAgaWYgKHJhdyAhPT0gZmFsc2UgJiYgb2Zmc2V0ID09PSAwICYmIGJ1ZmZlci5sZW5ndGggPT09IDggJiYgaXNBcnJheShidWZmZXIpKSByZXR1cm4gYnVmZmVyO1xuICAgIHJldHVybiBuZXdBcnJheShidWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0J1ZmZlcihyYXcpIHtcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHN0b3JhZ2UgPSBCVUZGRVI7XG4gICAgaWYgKHJhdyAhPT0gZmFsc2UgJiYgb2Zmc2V0ID09PSAwICYmIGJ1ZmZlci5sZW5ndGggPT09IDggJiYgQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcikpIHJldHVybiBidWZmZXI7XG4gICAgdmFyIGRlc3QgPSBuZXcgQlVGRkVSKDgpO1xuICAgIGZyb21BcnJheShkZXN0LCAwLCBidWZmZXIsIG9mZnNldCk7XG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiB0b0FycmF5QnVmZmVyKHJhdykge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGFycmJ1ZiA9IGJ1ZmZlci5idWZmZXI7XG4gICAgc3RvcmFnZSA9IFVJTlQ4QVJSQVk7XG4gICAgaWYgKHJhdyAhPT0gZmFsc2UgJiYgb2Zmc2V0ID09PSAwICYmIChhcnJidWYgaW5zdGFuY2VvZiBBUlJBWUJVRkZFUikgJiYgYXJyYnVmLmJ5dGVMZW5ndGggPT09IDgpIHJldHVybiBhcnJidWY7XG4gICAgdmFyIGRlc3QgPSBuZXcgVUlOVDhBUlJBWSg4KTtcbiAgICBmcm9tQXJyYXkoZGVzdCwgMCwgYnVmZmVyLCBvZmZzZXQpO1xuICAgIHJldHVybiBkZXN0LmJ1ZmZlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWRCdWZmZXIoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICB2YXIgbGVuID0gYnVmZmVyICYmIGJ1ZmZlci5sZW5ndGg7XG4gICAgb2Zmc2V0IHw9IDA7XG4gICAgcmV0dXJuIGxlbiAmJiAob2Zmc2V0ICsgOCA8PSBsZW4pICYmIChcInN0cmluZ1wiICE9PSB0eXBlb2YgYnVmZmVyW29mZnNldF0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJvbUFycmF5KGRlc3RidWYsIGRlc3RvZmYsIHNyY2J1Ziwgc3Jjb2ZmKSB7XG4gICAgZGVzdG9mZiB8PSAwO1xuICAgIHNyY29mZiB8PSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICBkZXN0YnVmW2Rlc3RvZmYrK10gPSBzcmNidWZbc3Jjb2ZmKytdICYgMjU1O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld0FycmF5KGJ1ZmZlciwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1ZmZlciwgb2Zmc2V0LCBvZmZzZXQgKyA4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21Qb3NpdGl2ZUJFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBwb3MgPSBvZmZzZXQgKyA4O1xuICAgIHdoaWxlIChwb3MgPiBvZmZzZXQpIHtcbiAgICAgIGJ1ZmZlclstLXBvc10gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlIC89IDI1NjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tTmVnYXRpdmVCRShidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICB2YXIgcG9zID0gb2Zmc2V0ICsgODtcbiAgICB2YWx1ZSsrO1xuICAgIHdoaWxlIChwb3MgPiBvZmZzZXQpIHtcbiAgICAgIGJ1ZmZlclstLXBvc10gPSAoKC12YWx1ZSkgJiAyNTUpIF4gMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21Qb3NpdGl2ZUxFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBlbmQgPSBvZmZzZXQgKyA4O1xuICAgIHdoaWxlIChvZmZzZXQgPCBlbmQpIHtcbiAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlIC89IDI1NjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tTmVnYXRpdmVMRShidWZmZXIsIG9mZnNldCwgdmFsdWUpIHtcbiAgICB2YXIgZW5kID0gb2Zmc2V0ICsgODtcbiAgICB2YWx1ZSsrO1xuICAgIHdoaWxlIChvZmZzZXQgPCBlbmQpIHtcbiAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAoKC12YWx1ZSkgJiAyNTUpIF4gMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yZXRyb2ZveC9pcy1hcnJheVxuICBmdW5jdGlvbiBfaXNBcnJheSh2YWwpIHtcbiAgICByZXR1cm4gISF2YWwgJiYgXCJbb2JqZWN0IEFycmF5XVwiID09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpO1xuICB9XG5cbn0odHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJyA/IGV4cG9ydHMgOiAodGhpcyB8fCB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaW50NjQtYnVmZmVyL2ludDY0LWJ1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZWFkLWNvcmUuanNcblxudmFyIEV4dEJ1ZmZlciA9IHJlcXVpcmUoXCIuL2V4dC1idWZmZXJcIikuRXh0QnVmZmVyO1xudmFyIEV4dFVucGFja2VyID0gcmVxdWlyZShcIi4vZXh0LXVucGFja2VyXCIpO1xudmFyIHJlYWRVaW50OCA9IHJlcXVpcmUoXCIuL3JlYWQtZm9ybWF0XCIpLnJlYWRVaW50ODtcbnZhciBSZWFkVG9rZW4gPSByZXF1aXJlKFwiLi9yZWFkLXRva2VuXCIpO1xudmFyIENvZGVjQmFzZSA9IHJlcXVpcmUoXCIuL2NvZGVjLWJhc2VcIik7XG5cbkNvZGVjQmFzZS5pbnN0YWxsKHtcbiAgYWRkRXh0VW5wYWNrZXI6IGFkZEV4dFVucGFja2VyLFxuICBnZXRFeHRVbnBhY2tlcjogZ2V0RXh0VW5wYWNrZXIsXG4gIGluaXQ6IGluaXRcbn0pO1xuXG5leHBvcnRzLnByZXNldCA9IGluaXQuY2FsbChDb2RlY0Jhc2UucHJlc2V0KTtcblxuZnVuY3Rpb24gZ2V0RGVjb2RlcihvcHRpb25zKSB7XG4gIHZhciByZWFkVG9rZW4gPSBSZWFkVG9rZW4uZ2V0UmVhZFRva2VuKG9wdGlvbnMpO1xuICByZXR1cm4gZGVjb2RlO1xuXG4gIGZ1bmN0aW9uIGRlY29kZShkZWNvZGVyKSB7XG4gICAgdmFyIHR5cGUgPSByZWFkVWludDgoZGVjb2Rlcik7XG4gICAgdmFyIGZ1bmMgPSByZWFkVG9rZW5bdHlwZV07XG4gICAgaWYgKCFmdW5jKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHR5cGU6IFwiICsgKHR5cGUgPyAoXCIweFwiICsgdHlwZS50b1N0cmluZygxNikpIDogdHlwZSkpO1xuICAgIHJldHVybiBmdW5jKGRlY29kZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICB0aGlzLmRlY29kZSA9IGdldERlY29kZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVzZXQpIHtcbiAgICBFeHRVbnBhY2tlci5zZXRFeHRVbnBhY2tlcnModGhpcyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gYWRkRXh0VW5wYWNrZXIoZXR5cGUsIHVucGFja2VyKSB7XG4gIHZhciB1bnBhY2tlcnMgPSB0aGlzLmV4dFVucGFja2VycyB8fCAodGhpcy5leHRVbnBhY2tlcnMgPSBbXSk7XG4gIHVucGFja2Vyc1tldHlwZV0gPSBDb2RlY0Jhc2UuZmlsdGVyKHVucGFja2VyKTtcbn1cblxuZnVuY3Rpb24gZ2V0RXh0VW5wYWNrZXIodHlwZSkge1xuICB2YXIgdW5wYWNrZXJzID0gdGhpcy5leHRVbnBhY2tlcnMgfHwgKHRoaXMuZXh0VW5wYWNrZXJzID0gW10pO1xuICByZXR1cm4gdW5wYWNrZXJzW3R5cGVdIHx8IGV4dFVucGFja2VyO1xuXG4gIGZ1bmN0aW9uIGV4dFVucGFja2VyKGJ1ZmZlcikge1xuICAgIHJldHVybiBuZXcgRXh0QnVmZmVyKGJ1ZmZlciwgdHlwZSk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC1jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTbG90TGlzdF8xID0gcmVxdWlyZShcIi4vU2xvdExpc3RcIik7XG52YXIgU2xvdF8xID0gcmVxdWlyZShcIi4vU2xvdFwiKTtcbi8qKlxuICogQWxsb3dzIHRoZSB2YWx1ZUNsYXNzZXMgdG8gYmUgc2V0IGluIE1YTUwsIGUuZy5cbiAqIDxzaWduYWxzOlNpZ25hbCBpZD1cIm5hbWVDaGFuZ2VkXCI+e1tTdHJpbmcsIHVpbnRdfTwvc2lnbmFsczpTaWduYWw+XG4gKi9cbi8qW0RlZmF1bHRQcm9wZXJ0eShcInZhbHVlQ2xhc3Nlc1wiKV0qL1xuLyoqXG4gKiBTaWduYWwgZGlzcGF0Y2hlcyBldmVudHMgdG8gbXVsdGlwbGUgbGlzdGVuZXJzLlxuICogSXQgaXMgaW5zcGlyZWQgYnkgQyMgZXZlbnRzIGFuZCBkZWxlZ2F0ZXMsIGFuZCBieVxuICogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NpZ25hbHNfYW5kX3Nsb3RzXCI+c2lnbmFscyBhbmQgc2xvdHM8L2E+XG4gKiBpbiBRdC5cbiAqIEEgU2lnbmFsIGFkZHMgZXZlbnQgZGlzcGF0Y2hpbmcgZnVuY3Rpb25hbGl0eSB0aHJvdWdoIGNvbXBvc2l0aW9uIGFuZCBpbnRlcmZhY2VzLFxuICogcmF0aGVyIHRoYW4gaW5oZXJpdGluZyBmcm9tIGEgZGlzcGF0Y2hlci5cbiAqIDxici8+PGJyLz5cbiAqIFByb2plY3QgaG9tZTogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvXCI+aHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzLzwvYT5cbiAqL1xudmFyIE9uY2VTaWduYWwgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTaWduYWwgaW5zdGFuY2UgdG8gZGlzcGF0Y2ggdmFsdWUgb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gICAgdmFsdWVDbGFzc2VzIEFueSBudW1iZXIgb2YgY2xhc3MgcmVmZXJlbmNlcyB0aGF0IGVuYWJsZSB0eXBlIGNoZWNrcyBpbiBkaXNwYXRjaCgpLlxuICAgICAqIEZvciBleGFtcGxlLCBuZXcgU2lnbmFsKFN0cmluZywgdWludClcbiAgICAgKiB3b3VsZCBhbGxvdzogc2lnbmFsLmRpc3BhdGNoKFwidGhlIEFuc3dlclwiLCA0MilcbiAgICAgKiBidXQgbm90OiBzaWduYWwuZGlzcGF0Y2godHJ1ZSwgNDIuNSlcbiAgICAgKiBub3I6IHNpZ25hbC5kaXNwYXRjaCgpXG4gICAgICpcbiAgICAgKiBOT1RFOiBJbiBBUzMsIHN1YmNsYXNzZXMgY2Fubm90IGNhbGwgc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSxcbiAgICAgKiBidXQgdGhpcyBjb25zdHJ1Y3RvciBoYXMgbG9naWMgdG8gc3VwcG9ydCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE9uY2VTaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xvdHMgPSBTbG90TGlzdF8xLlNsb3RMaXN0Lk5JTDtcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB0aGlzLnZhbHVlQ2xhc3NlcyA9ICh2YWx1ZUNsYXNzZXMubGVuZ3RoID09IDEgJiYgdmFsdWVDbGFzc2VzWzBdIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWVDbGFzc2VzWzBdIDogdmFsdWVDbGFzc2VzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT25jZVNpZ25hbC5wcm90b3R5cGUsIFwidmFsdWVDbGFzc2VzXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogSW52YWxpZCB2YWx1ZUNsYXNzZXMgYXJndW1lbnQ6IGl0ZW0gYXQgaW5kZXggc2hvdWxkIGJlIGEgQ2xhc3MgYnV0IHdhcyBub3QuXG4gICAgICAgICAqL1xuICAgICAgICAvKltBcnJheUVsZW1lbnRUeXBlKFwiQ2xhc3NcIildKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVDbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gQ2xvbmUgc28gdGhlIEFycmF5IGNhbm5vdCBiZSBhZmZlY3RlZCBmcm9tIG91dHNpZGUuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZUNsYXNzZXMgPSB2YWx1ZSA/IHZhbHVlLnNsaWNlKCkgOiBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLl92YWx1ZUNsYXNzZXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5fdmFsdWVDbGFzc2VzW2ldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWVDbGFzc2VzIGFyZ3VtZW50OiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpdGVtIGF0IGluZGV4ICcgKyBpICsgJyBzaG91bGQgYmUgYSBDbGFzcyBidXQgd2FzOjwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSArICc+LicgKyB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pOyAvL0BDSEFOR0VEIC0gdGVtcCByZXBsYWNlbWVudCBmb3IgZ2V0UXVhbGlmaWVkQ2xhc3NCeU5hbWUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9uY2VTaWduYWwucHJvdG90eXBlLCBcIm51bUxpc3RlbmVyc1wiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNsb3RzLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIGZsYXNoLmVycm9ycy5JbGxlZ2FsT3BlcmF0aW9uRXJyb3IgPGNvZGU+SWxsZWdhbE9wZXJhdGlvbkVycm9yPC9jb2RlPjogWW91IGNhbm5vdCBhZGRPbmNlKCkgdGhlbiBhZGQoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5hZGRPbmNlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgT25jZVNpZ25hbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBzbG90ID0gdGhpcy5zbG90cy5maW5kKGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKCFzbG90KVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuc2xvdHMgPSB0aGlzLnNsb3RzLmZpbHRlck5vdChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiBzbG90O1xuICAgIH07XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgT25jZVNpZ25hbC5wcm90b3R5cGUucmVtb3ZlQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNsb3RzID0gU2xvdExpc3RfMS5TbG90TGlzdC5OSUw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBWYWx1ZSBvYmplY3QgaXMgbm90IGFuIGluc3RhbmNlIG9mIHRoZSBhcHByb3ByaWF0ZSB2YWx1ZUNsYXNzZXMgQ2xhc3MuXG4gICAgICovXG4gICAgT25jZVNpZ25hbC5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZU9iamVjdHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlT2JqZWN0c1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHZhbHVlQ2xhc3NlcyBpcyBlbXB0eSwgdmFsdWUgb2JqZWN0cyBhcmUgbm90IHR5cGUtY2hlY2tlZC5cbiAgICAgICAgdmFyIG51bVZhbHVlQ2xhc3NlcyA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7XG4gICAgICAgIHZhciBudW1WYWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHMubGVuZ3RoO1xuICAgICAgICAvLyBDYW5ub3QgZGlzcGF0Y2ggZmV3ZXIgb2JqZWN0cyB0aGFuIGRlY2xhcmVkIGNsYXNzZXMuXG4gICAgICAgIGlmIChudW1WYWx1ZU9iamVjdHMgPCBudW1WYWx1ZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgICAgICdFeHBlY3RlZCBhdCBsZWFzdCAnICsgbnVtVmFsdWVDbGFzc2VzICsgJyBidXQgcmVjZWl2ZWQgJyArXG4gICAgICAgICAgICAgICAgbnVtVmFsdWVPYmplY3RzICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5ub3QgZGlzcGF0Y2ggZGlmZmVyZW50bHkgdHlwZWQgb2JqZWN0cyB0aGFuIGRlY2xhcmVkIGNsYXNzZXMuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVmFsdWVDbGFzc2VzOyBpKyspIHtcbiAgICAgICAgICAgIC8vIE9wdGltaXplZCBmb3IgdGhlIG9wdGltaXN0aWMgY2FzZSB0aGF0IHZhbHVlcyBhcmUgY29ycmVjdC5cbiAgICAgICAgICAgIGlmICh2YWx1ZU9iamVjdHNbaV0gPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAodmFsdWVPYmplY3RzW2ldIGluc3RhbmNlb2YgdGhpcy5fdmFsdWVDbGFzc2VzW2ldIHx8IHZhbHVlT2JqZWN0c1tpXS5jb25zdHJ1Y3RvciA9PT0gdGhpcy5fdmFsdWVDbGFzc2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBvYmplY3QgPCcgKyB2YWx1ZU9iamVjdHNbaV1cbiAgICAgICAgICAgICAgICArICc+IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiA8JyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSArICc+LicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJyb2FkY2FzdCB0byBsaXN0ZW5lcnMuXG4gICAgICAgIHZhciBzbG90c1RvUHJvY2VzcyA9IHRoaXMuc2xvdHM7XG4gICAgICAgIGlmIChzbG90c1RvUHJvY2Vzcy5ub25FbXB0eSkge1xuICAgICAgICAgICAgd2hpbGUgKHNsb3RzVG9Qcm9jZXNzLm5vbkVtcHR5KSB7XG4gICAgICAgICAgICAgICAgc2xvdHNUb1Byb2Nlc3MuaGVhZC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgc2xvdHNUb1Byb2Nlc3MgPSBzbG90c1RvUHJvY2Vzcy50YWlsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZWdpc3Rlckxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBvbmNlKSB7XG4gICAgICAgIGlmIChvbmNlID09PSB2b2lkIDApIHsgb25jZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvblBvc3NpYmxlKGxpc3RlbmVyLCBvbmNlKSkge1xuICAgICAgICAgICAgdmFyIG5ld1Nsb3QgPSBuZXcgU2xvdF8xLlNsb3QobGlzdGVuZXIsIHRoaXMsIG9uY2UpO1xuICAgICAgICAgICAgdGhpcy5zbG90cyA9IHRoaXMuc2xvdHMucHJlcGVuZChuZXdTbG90KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdTbG90O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RzLmZpbmQobGlzdGVuZXIpO1xuICAgIH07XG4gICAgT25jZVNpZ25hbC5wcm90b3R5cGUucmVnaXN0cmF0aW9uUG9zc2libGUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNsb3RzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBleGlzdGluZ1Nsb3QgPSB0aGlzLnNsb3RzLmZpbmQobGlzdGVuZXIpO1xuICAgICAgICBpZiAoIWV4aXN0aW5nU2xvdClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoZXhpc3RpbmdTbG90Lm9uY2UgIT0gb25jZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHdhcyBwcmV2aW91c2x5IGFkZGVkLCBkZWZpbml0ZWx5IGRvbid0IGFkZCBpdCBhZ2Fpbi5cbiAgICAgICAgICAgIC8vIEJ1dCB0aHJvdyBhbiBleGNlcHRpb24gaWYgdGhlaXIgb25jZSB2YWx1ZXMgZGlmZmVyLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIExpc3RlbmVyIHdhcyBhbHJlYWR5IHJlZ2lzdGVyZWQuXG4gICAgfTtcbiAgICByZXR1cm4gT25jZVNpZ25hbDtcbn0oKSk7XG5leHBvcnRzLk9uY2VTaWduYWwgPSBPbmNlU2lnbmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T25jZVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLy8gVXNlIGNvZGVzIGJldHdlZW4gMH4xMjcgZm9yIGxlc3NlciB0aHJvdWdocHV0ICgxIGJ5dGUpXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUHJvdG9jb2w7XG4oZnVuY3Rpb24gKFByb3RvY29sKSB7XG4gICAgLy8gVXNlci1yZWxhdGVkICgwfjEwKVxuICAgIFByb3RvY29sW1Byb3RvY29sW1wiVVNFUl9JRFwiXSA9IDFdID0gXCJVU0VSX0lEXCI7XG4gICAgLy8gUm9vbS1yZWxhdGVkICgxMH4yMClcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIkpPSU5fUk9PTVwiXSA9IDEwXSA9IFwiSk9JTl9ST09NXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJKT0lOX0VSUk9SXCJdID0gMTFdID0gXCJKT0lOX0VSUk9SXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJMRUFWRV9ST09NXCJdID0gMTJdID0gXCJMRUFWRV9ST09NXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJST09NX0RBVEFcIl0gPSAxM10gPSBcIlJPT01fREFUQVwiO1xuICAgIFByb3RvY29sW1Byb3RvY29sW1wiUk9PTV9TVEFURVwiXSA9IDE0XSA9IFwiUk9PTV9TVEFURVwiO1xuICAgIFByb3RvY29sW1Byb3RvY29sW1wiUk9PTV9TVEFURV9QQVRDSFwiXSA9IDE1XSA9IFwiUk9PTV9TVEFURV9QQVRDSFwiO1xuICAgIC8vIEdlbmVyaWMgbWVzc2FnZXMgKDUwfjYwKVxuICAgIFByb3RvY29sW1Byb3RvY29sW1wiQkFEX1JFUVVFU1RcIl0gPSA1MF0gPSBcIkJBRF9SRVFVRVNUXCI7XG59KShQcm90b2NvbCA9IGV4cG9ydHMuUHJvdG9jb2wgfHwgKGV4cG9ydHMuUHJvdG9jb2wgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvUHJvdG9jb2wudHNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGVuY29kZS5qc1xuXG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcblxudmFyIEVuY29kZUJ1ZmZlciA9IHJlcXVpcmUoXCIuL2VuY29kZS1idWZmZXJcIikuRW5jb2RlQnVmZmVyO1xuXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGVuY29kZXIgPSBuZXcgRW5jb2RlQnVmZmVyKG9wdGlvbnMpO1xuICBlbmNvZGVyLndyaXRlKGlucHV0KTtcbiAgcmV0dXJuIGVuY29kZXIucmVhZCgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGVuY29kZS1idWZmZXIuanNcblxuZXhwb3J0cy5FbmNvZGVCdWZmZXIgPSBFbmNvZGVCdWZmZXI7XG5cbnZhciBwcmVzZXQgPSByZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpLnByZXNldDtcblxudmFyIEZsZXhFbmNvZGVyID0gcmVxdWlyZShcIi4vZmxleC1idWZmZXJcIikuRmxleEVuY29kZXI7XG5cbkZsZXhFbmNvZGVyLm1peGluKEVuY29kZUJ1ZmZlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBFbmNvZGVCdWZmZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRW5jb2RlQnVmZmVyKSkgcmV0dXJuIG5ldyBFbmNvZGVCdWZmZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLmNvZGVjKSB7XG4gICAgICB2YXIgY29kZWMgPSB0aGlzLmNvZGVjID0gb3B0aW9ucy5jb2RlYztcbiAgICAgIGlmIChjb2RlYy5idWZmZXJpc2gpIHRoaXMuYnVmZmVyaXNoID0gY29kZWMuYnVmZmVyaXNoO1xuICAgIH1cbiAgfVxufVxuXG5FbmNvZGVCdWZmZXIucHJvdG90eXBlLmNvZGVjID0gcHJlc2V0O1xuXG5FbmNvZGVCdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgdGhpcy5jb2RlYy5lbmNvZGUodGhpcywgaW5wdXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZW5jb2RlLWJ1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gd3JpdGUtdW5pdDguanNcblxudmFyIGNvbnN0YW50ID0gZXhwb3J0cy51aW50OCA9IG5ldyBBcnJheSgyNTYpO1xuXG5mb3IgKHZhciBpID0gMHgwMDsgaSA8PSAweEZGOyBpKyspIHtcbiAgY29uc3RhbnRbaV0gPSB3cml0ZTAoaSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlMCh0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSgxKTtcbiAgICBlbmNvZGVyLmJ1ZmZlcltvZmZzZXRdID0gdHlwZTtcbiAgfTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtdWludDguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZsZXgtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRmxleERlY29kZXIgPSBGbGV4RGVjb2RlcjtcbmV4cG9ydHMuRmxleEVuY29kZXIgPSBGbGV4RW5jb2RlcjtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcblxudmFyIE1JTl9CVUZGRVJfU0laRSA9IDIwNDg7XG52YXIgTUFYX0JVRkZFUl9TSVpFID0gNjU1MzY7XG52YXIgQlVGRkVSX1NIT1JUQUdFID0gXCJCVUZGRVJfU0hPUlRBR0VcIjtcblxuZnVuY3Rpb24gRmxleERlY29kZXIoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBGbGV4RGVjb2RlcikpIHJldHVybiBuZXcgRmxleERlY29kZXIoKTtcbn1cblxuZnVuY3Rpb24gRmxleEVuY29kZXIoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBGbGV4RW5jb2RlcikpIHJldHVybiBuZXcgRmxleEVuY29kZXIoKTtcbn1cblxuRmxleERlY29kZXIubWl4aW4gPSBtaXhpbkZhY3RvcnkoZ2V0RGVjb2Rlck1ldGhvZHMoKSk7XG5GbGV4RGVjb2Rlci5taXhpbihGbGV4RGVjb2Rlci5wcm90b3R5cGUpO1xuXG5GbGV4RW5jb2Rlci5taXhpbiA9IG1peGluRmFjdG9yeShnZXRFbmNvZGVyTWV0aG9kcygpKTtcbkZsZXhFbmNvZGVyLm1peGluKEZsZXhFbmNvZGVyLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIGdldERlY29kZXJNZXRob2RzKCkge1xuICByZXR1cm4ge1xuICAgIGJ1ZmZlcmlzaDogQnVmZmVyaXNoLFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICBmZXRjaDogZmV0Y2gsXG4gICAgZmx1c2g6IGZsdXNoLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcHVsbDogcHVsbCxcbiAgICByZWFkOiByZWFkLFxuICAgIHJlc2VydmU6IHJlc2VydmUsXG4gICAgb2Zmc2V0OiAwXG4gIH07XG5cbiAgZnVuY3Rpb24gd3JpdGUoY2h1bmspIHtcbiAgICB2YXIgcHJldiA9IHRoaXMub2Zmc2V0ID8gQnVmZmVyaXNoLnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYnVmZmVyLCB0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLmJ1ZmZlciA9IHByZXYgPyAoY2h1bmsgPyB0aGlzLmJ1ZmZlcmlzaC5jb25jYXQoW3ByZXYsIGNodW5rXSkgOiBwcmV2KSA6IGNodW5rO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlICh0aGlzLm9mZnNldCA8IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZmV0Y2goKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgJiYgZS5tZXNzYWdlICE9IEJVRkZFUl9TSE9SVEFHRSkgdGhyb3cgZTtcbiAgICAgICAgLy8gcm9sbGJhY2tcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBzdGFydDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2VydmUobGVuZ3RoKSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgIGlmIChlbmQgPiB0aGlzLmJ1ZmZlci5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihCVUZGRVJfU0hPUlRBR0UpO1xuICAgIHRoaXMub2Zmc2V0ID0gZW5kO1xuICAgIHJldHVybiBzdGFydDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbmNvZGVyTWV0aG9kcygpIHtcbiAgcmV0dXJuIHtcbiAgICBidWZmZXJpc2g6IEJ1ZmZlcmlzaCxcbiAgICB3cml0ZTogd3JpdGUsXG4gICAgZmV0Y2g6IGZldGNoLFxuICAgIGZsdXNoOiBmbHVzaCxcbiAgICBwdXNoOiBwdXNoLFxuICAgIHB1bGw6IHB1bGwsXG4gICAgcmVhZDogcmVhZCxcbiAgICByZXNlcnZlOiByZXNlcnZlLFxuICAgIHNlbmQ6IHNlbmQsXG4gICAgbWF4QnVmZmVyU2l6ZTogTUFYX0JVRkZFUl9TSVpFLFxuICAgIG1pbkJ1ZmZlclNpemU6IE1JTl9CVUZGRVJfU0laRSxcbiAgICBvZmZzZXQ6IDAsXG4gICAgc3RhcnQ6IDBcbiAgfTtcblxuICBmdW5jdGlvbiBmZXRjaCgpIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgIGlmIChzdGFydCA8IHRoaXMub2Zmc2V0KSB7XG4gICAgICB2YXIgZW5kID0gdGhpcy5zdGFydCA9IHRoaXMub2Zmc2V0O1xuICAgICAgcmV0dXJuIEJ1ZmZlcmlzaC5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKHRoaXMuc3RhcnQgPCB0aGlzLm9mZnNldCkge1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5mZXRjaCgpO1xuICAgICAgaWYgKHZhbHVlKSB0aGlzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHB1bGwoKSB7XG4gICAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMgfHwgKHRoaXMuYnVmZmVycyA9IFtdKTtcbiAgICB2YXIgY2h1bmsgPSBidWZmZXJzLmxlbmd0aCA+IDEgPyB0aGlzLmJ1ZmZlcmlzaC5jb25jYXQoYnVmZmVycykgOiBidWZmZXJzWzBdO1xuICAgIGJ1ZmZlcnMubGVuZ3RoID0gMDsgLy8gYnVmZmVyIGV4aGF1c3RlZFxuICAgIHJldHVybiBjaHVuaztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2VydmUobGVuZ3RoKSB7XG4gICAgdmFyIHJlcSA9IGxlbmd0aCB8IDA7XG5cbiAgICBpZiAodGhpcy5idWZmZXIpIHtcbiAgICAgIHZhciBzaXplID0gdGhpcy5idWZmZXIubGVuZ3RoO1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5vZmZzZXQgfCAwO1xuICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgcmVxO1xuXG4gICAgICAvLyBpcyBpdCBsb25nIGVub3VnaD9cbiAgICAgIGlmIChlbmQgPCBzaXplKSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gZW5kO1xuICAgICAgICByZXR1cm4gc3RhcnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIGZsdXNoIGN1cnJlbnQgYnVmZmVyXG4gICAgICB0aGlzLmZsdXNoKCk7XG5cbiAgICAgIC8vIHJlc2l6ZSBpdCB0byAyeCBjdXJyZW50IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCBNYXRoLm1pbihzaXplICogMiwgdGhpcy5tYXhCdWZmZXJTaXplKSk7XG4gICAgfVxuXG4gICAgLy8gbWluaW11bSBidWZmZXIgc2l6ZVxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgdGhpcy5taW5CdWZmZXJTaXplKTtcblxuICAgIC8vIGFsbG9jYXRlIG5ldyBidWZmZXJcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuYnVmZmVyaXNoLmFsbG9jKGxlbmd0aCk7XG4gICAgdGhpcy5zdGFydCA9IDA7XG4gICAgdGhpcy5vZmZzZXQgPSByZXE7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBzZW5kKGJ1ZmZlcikge1xuICAgIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPiB0aGlzLm1pbkJ1ZmZlclNpemUpIHtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIHRoaXMucHVzaChidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5yZXNlcnZlKGxlbmd0aCk7XG4gICAgICBCdWZmZXJpc2gucHJvdG90eXBlLmNvcHkuY2FsbChidWZmZXIsIHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBjb21tb24gbWV0aG9kc1xuXG5mdW5jdGlvbiB3cml0ZSgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwibWV0aG9kIG5vdCBpbXBsZW1lbnRlZDogd3JpdGUoKVwiKTtcbn1cblxuZnVuY3Rpb24gZmV0Y2goKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm1ldGhvZCBub3QgaW1wbGVtZW50ZWQ6IGZldGNoKClcIik7XG59XG5cbmZ1bmN0aW9uIHJlYWQoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmJ1ZmZlcnMgJiYgdGhpcy5idWZmZXJzLmxlbmd0aDtcblxuICAvLyBmZXRjaCB0aGUgZmlyc3QgcmVzdWx0XG4gIGlmICghbGVuZ3RoKSByZXR1cm4gdGhpcy5mZXRjaCgpO1xuXG4gIC8vIGZsdXNoIGN1cnJlbnQgYnVmZmVyXG4gIHRoaXMuZmx1c2goKTtcblxuICAvLyByZWFkIGZyb20gdGhlIHJlc3VsdHNcbiAgcmV0dXJuIHRoaXMucHVsbCgpO1xufVxuXG5mdW5jdGlvbiBwdXNoKGNodW5rKSB7XG4gIHZhciBidWZmZXJzID0gdGhpcy5idWZmZXJzIHx8ICh0aGlzLmJ1ZmZlcnMgPSBbXSk7XG4gIGJ1ZmZlcnMucHVzaChjaHVuayk7XG59XG5cbmZ1bmN0aW9uIHB1bGwoKSB7XG4gIHZhciBidWZmZXJzID0gdGhpcy5idWZmZXJzIHx8ICh0aGlzLmJ1ZmZlcnMgPSBbXSk7XG4gIHJldHVybiBidWZmZXJzLnNoaWZ0KCk7XG59XG5cbmZ1bmN0aW9uIG1peGluRmFjdG9yeShzb3VyY2UpIHtcbiAgcmV0dXJuIG1peGluO1xuXG4gIGZ1bmN0aW9uIG1peGluKHRhcmdldCkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZmxleC1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGRlY29kZS5qc1xuXG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcblxudmFyIERlY29kZUJ1ZmZlciA9IHJlcXVpcmUoXCIuL2RlY29kZS1idWZmZXJcIikuRGVjb2RlQnVmZmVyO1xuXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRlY29kZXIgPSBuZXcgRGVjb2RlQnVmZmVyKG9wdGlvbnMpO1xuICBkZWNvZGVyLndyaXRlKGlucHV0KTtcbiAgcmV0dXJuIGRlY29kZXIucmVhZCgpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBkZWNvZGUtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRGVjb2RlQnVmZmVyID0gRGVjb2RlQnVmZmVyO1xuXG52YXIgcHJlc2V0ID0gcmVxdWlyZShcIi4vcmVhZC1jb3JlXCIpLnByZXNldDtcblxudmFyIEZsZXhEZWNvZGVyID0gcmVxdWlyZShcIi4vZmxleC1idWZmZXJcIikuRmxleERlY29kZXI7XG5cbkZsZXhEZWNvZGVyLm1peGluKERlY29kZUJ1ZmZlci5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBEZWNvZGVCdWZmZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVjb2RlQnVmZmVyKSkgcmV0dXJuIG5ldyBEZWNvZGVCdWZmZXIob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLmNvZGVjKSB7XG4gICAgICB2YXIgY29kZWMgPSB0aGlzLmNvZGVjID0gb3B0aW9ucy5jb2RlYztcbiAgICAgIGlmIChjb2RlYy5idWZmZXJpc2gpIHRoaXMuYnVmZmVyaXNoID0gY29kZWMuYnVmZmVyaXNoO1xuICAgIH1cbiAgfVxufVxuXG5EZWNvZGVCdWZmZXIucHJvdG90eXBlLmNvZGVjID0gcHJlc2V0O1xuXG5EZWNvZGVCdWZmZXIucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNvZGVjLmRlY29kZSh0aGlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2RlY29kZS1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlYWQtZm9ybWF0LmpzXG5cbnZhciBpZWVlNzU0ID0gcmVxdWlyZShcImllZWU3NTRcIik7XG52YXIgSW50NjRCdWZmZXIgPSByZXF1aXJlKFwiaW50NjQtYnVmZmVyXCIpO1xudmFyIFVpbnQ2NEJFID0gSW50NjRCdWZmZXIuVWludDY0QkU7XG52YXIgSW50NjRCRSA9IEludDY0QnVmZmVyLkludDY0QkU7XG5cbmV4cG9ydHMuZ2V0UmVhZEZvcm1hdCA9IGdldFJlYWRGb3JtYXQ7XG5leHBvcnRzLnJlYWRVaW50OCA9IHVpbnQ4O1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlclByb3RvID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLXByb3RvXCIpO1xuXG52YXIgSEFTX01BUCA9IChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgTWFwKTtcbnZhciBOT19BU1NFUlQgPSB0cnVlO1xuXG5mdW5jdGlvbiBnZXRSZWFkRm9ybWF0KG9wdGlvbnMpIHtcbiAgdmFyIGJpbmFycmF5YnVmZmVyID0gQnVmZmVyaXNoLmhhc0FycmF5QnVmZmVyICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5iaW5hcnJheWJ1ZmZlcjtcbiAgdmFyIGludDY0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmludDY0O1xuICB2YXIgdXNlbWFwID0gSEFTX01BUCAmJiBvcHRpb25zICYmIG9wdGlvbnMudXNlbWFwO1xuXG4gIHZhciByZWFkRm9ybWF0ID0ge1xuICAgIG1hcDogKHVzZW1hcCA/IG1hcF90b19tYXAgOiBtYXBfdG9fb2JqKSxcbiAgICBhcnJheTogYXJyYXksXG4gICAgc3RyOiBzdHIsXG4gICAgYmluOiAoYmluYXJyYXlidWZmZXIgPyBiaW5fYXJyYXlidWZmZXIgOiBiaW5fYnVmZmVyKSxcbiAgICBleHQ6IGV4dCxcbiAgICB1aW50ODogdWludDgsXG4gICAgdWludDE2OiB1aW50MTYsXG4gICAgdWludDMyOiB1aW50MzIsXG4gICAgdWludDY0OiByZWFkKDgsIGludDY0ID8gcmVhZFVJbnQ2NEJFX2ludDY0IDogcmVhZFVJbnQ2NEJFKSxcbiAgICBpbnQ4OiBpbnQ4LFxuICAgIGludDE2OiBpbnQxNixcbiAgICBpbnQzMjogaW50MzIsXG4gICAgaW50NjQ6IHJlYWQoOCwgaW50NjQgPyByZWFkSW50NjRCRV9pbnQ2NCA6IHJlYWRJbnQ2NEJFKSxcbiAgICBmbG9hdDMyOiByZWFkKDQsIHJlYWRGbG9hdEJFKSxcbiAgICBmbG9hdDY0OiByZWFkKDgsIHJlYWREb3VibGVCRSlcbiAgfTtcblxuICByZXR1cm4gcmVhZEZvcm1hdDtcbn1cblxuZnVuY3Rpb24gbWFwX3RvX29iaihkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0ge307XG4gIHZhciBpO1xuICB2YXIgayA9IG5ldyBBcnJheShsZW4pO1xuICB2YXIgdiA9IG5ldyBBcnJheShsZW4pO1xuXG4gIHZhciBkZWNvZGUgPSBkZWNvZGVyLmNvZGVjLmRlY29kZTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga1tpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgICB2W2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbHVlW2tbaV1dID0gdltpXTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIG1hcF90b19tYXAoZGVjb2RlciwgbGVuKSB7XG4gIHZhciB2YWx1ZSA9IG5ldyBNYXAoKTtcbiAgdmFyIGk7XG4gIHZhciBrID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciB2ID0gbmV3IEFycmF5KGxlbik7XG5cbiAgdmFyIGRlY29kZSA9IGRlY29kZXIuY29kZWMuZGVjb2RlO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICAgIHZbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFsdWUuc2V0KGtbaV0sIHZbaV0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gYXJyYXkoZGVjb2RlciwgbGVuKSB7XG4gIHZhciB2YWx1ZSA9IG5ldyBBcnJheShsZW4pO1xuICB2YXIgZGVjb2RlID0gZGVjb2Rlci5jb2RlYy5kZWNvZGU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YWx1ZVtpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHN0cihkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbik7XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgcmV0dXJuIEJ1ZmZlclByb3RvLnRvU3RyaW5nLmNhbGwoZGVjb2Rlci5idWZmZXIsIFwidXRmLThcIiwgc3RhcnQsIGVuZCk7XG59XG5cbmZ1bmN0aW9uIGJpbl9idWZmZXIoZGVjb2RlciwgbGVuKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4pO1xuICB2YXIgZW5kID0gc3RhcnQgKyBsZW47XG4gIHZhciBidWYgPSBCdWZmZXJQcm90by5zbGljZS5jYWxsKGRlY29kZXIuYnVmZmVyLCBzdGFydCwgZW5kKTtcbiAgcmV0dXJuIEJ1ZmZlcmlzaC5mcm9tKGJ1Zik7XG59XG5cbmZ1bmN0aW9uIGJpbl9hcnJheWJ1ZmZlcihkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbik7XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbShidWYpLmJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gZXh0KGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKzEpO1xuICB2YXIgdHlwZSA9IGRlY29kZXIuYnVmZmVyW3N0YXJ0KytdO1xuICB2YXIgZW5kID0gc3RhcnQgKyBsZW47XG4gIHZhciB1bnBhY2sgPSBkZWNvZGVyLmNvZGVjLmdldEV4dFVucGFja2VyKHR5cGUpO1xuICBpZiAoIXVucGFjaykgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBleHQgdHlwZTogXCIgKyAodHlwZSA/IChcIjB4XCIgKyB0eXBlLnRvU3RyaW5nKDE2KSkgOiB0eXBlKSk7XG4gIHZhciBidWYgPSBCdWZmZXJQcm90by5zbGljZS5jYWxsKGRlY29kZXIuYnVmZmVyLCBzdGFydCwgZW5kKTtcbiAgcmV0dXJuIHVucGFjayhidWYpO1xufVxuXG5mdW5jdGlvbiB1aW50OChkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSgxKTtcbiAgcmV0dXJuIGRlY29kZXIuYnVmZmVyW3N0YXJ0XTtcbn1cblxuZnVuY3Rpb24gaW50OChkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSgxKTtcbiAgdmFyIHZhbHVlID0gZGVjb2Rlci5idWZmZXJbc3RhcnRdO1xuICByZXR1cm4gKHZhbHVlICYgMHg4MCkgPyB2YWx1ZSAtIDB4MTAwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVpbnQxNihkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSgyKTtcbiAgdmFyIGJ1ZmZlciA9IGRlY29kZXIuYnVmZmVyO1xuICByZXR1cm4gKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIGludDE2KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDIpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHZhciB2YWx1ZSA9IChidWZmZXJbc3RhcnQrK10gPDwgOCkgfCBidWZmZXJbc3RhcnRdO1xuICByZXR1cm4gKHZhbHVlICYgMHg4MDAwKSA/IHZhbHVlIC0gMHgxMDAwMCA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB1aW50MzIoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoNCk7XG4gIHZhciBidWZmZXIgPSBkZWNvZGVyLmJ1ZmZlcjtcbiAgcmV0dXJuIChidWZmZXJbc3RhcnQrK10gKiAxNjc3NzIxNikgKyAoYnVmZmVyW3N0YXJ0KytdIDw8IDE2KSArIChidWZmZXJbc3RhcnQrK10gPDwgOCkgKyBidWZmZXJbc3RhcnRdO1xufVxuXG5mdW5jdGlvbiBpbnQzMihkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSg0KTtcbiAgdmFyIGJ1ZmZlciA9IGRlY29kZXIuYnVmZmVyO1xuICByZXR1cm4gKGJ1ZmZlcltzdGFydCsrXSA8PCAyNCkgfCAoYnVmZmVyW3N0YXJ0KytdIDw8IDE2KSB8IChidWZmZXJbc3RhcnQrK10gPDwgOCkgfCBidWZmZXJbc3RhcnRdO1xufVxuXG5mdW5jdGlvbiByZWFkKGxlbiwgbWV0aG9kKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNvZGVyKSB7XG4gICAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbik7XG4gICAgcmV0dXJuIG1ldGhvZC5jYWxsKGRlY29kZXIuYnVmZmVyLCBzdGFydCwgTk9fQVNTRVJUKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVhZFVJbnQ2NEJFKHN0YXJ0KSB7XG4gIHJldHVybiBuZXcgVWludDY0QkUodGhpcywgc3RhcnQpLnRvTnVtYmVyKCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRJbnQ2NEJFKHN0YXJ0KSB7XG4gIHJldHVybiBuZXcgSW50NjRCRSh0aGlzLCBzdGFydCkudG9OdW1iZXIoKTtcbn1cblxuZnVuY3Rpb24gcmVhZFVJbnQ2NEJFX2ludDY0KHN0YXJ0KSB7XG4gIHJldHVybiBuZXcgVWludDY0QkUodGhpcywgc3RhcnQpO1xufVxuXG5mdW5jdGlvbiByZWFkSW50NjRCRV9pbnQ2NChzdGFydCkge1xuICByZXR1cm4gbmV3IEludDY0QkUodGhpcywgc3RhcnQpO1xufVxuXG5mdW5jdGlvbiByZWFkRmxvYXRCRShzdGFydCkge1xuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIHN0YXJ0LCBmYWxzZSwgMjMsIDQpO1xufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlQkUoc3RhcnQpIHtcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBzdGFydCwgZmFsc2UsIDUyLCA4KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtZm9ybWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIGV2ZW50LWxpdGUuanMgLSBMaWdodC13ZWlnaHQgRXZlbnRFbWl0dGVyIChsZXNzIHRoYW4gMUtCIHdoZW4gZ3ppcHBlZClcbiAqXG4gKiBAY29weXJpZ2h0IFl1c3VrZSBLYXdhc2FraVxuICogQGxpY2Vuc2UgTUlUXG4gKiBAY29uc3RydWN0b3JcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2thd2FuZXQvZXZlbnQtbGl0ZVxuICogQHNlZSBodHRwOi8va2F3YW5ldC5naXRodWIuaW8vZXZlbnQtbGl0ZS9FdmVudExpdGUuaHRtbFxuICogQGV4YW1wbGVcbiAqIHZhciBFdmVudExpdGUgPSByZXF1aXJlKFwiZXZlbnQtbGl0ZVwiKTtcbiAqXG4gKiBmdW5jdGlvbiBNeUNsYXNzKCkgey4uLn0gICAgICAgICAgICAgLy8geW91ciBjbGFzc1xuICpcbiAqIEV2ZW50TGl0ZS5taXhpbihNeUNsYXNzLnByb3RvdHlwZSk7ICAvLyBpbXBvcnQgZXZlbnQgbWV0aG9kc1xuICpcbiAqIHZhciBvYmogPSBuZXcgTXlDbGFzcygpO1xuICogb2JqLm9uKFwiZm9vXCIsIGZ1bmN0aW9uKCkgey4uLn0pOyAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyXG4gKiBvYmoub25jZShcImJhclwiLCBmdW5jdGlvbigpIHsuLi59KTsgICAvLyBhZGQgb25lLXRpbWUgZXZlbnQgbGlzdGVuZXJcbiAqIG9iai5lbWl0KFwiZm9vXCIpOyAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BhdGNoIGV2ZW50XG4gKiBvYmouZW1pdChcImJhclwiKTsgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwYXRjaCBhbm90aGVyIGV2ZW50XG4gKiBvYmoub2ZmKFwiZm9vXCIpOyAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZXZlbnQgbGlzdGVuZXJcbiAqL1xuXG5mdW5jdGlvbiBFdmVudExpdGUoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFdmVudExpdGUpKSByZXR1cm4gbmV3IEV2ZW50TGl0ZSgpO1xufVxuXG4oZnVuY3Rpb24oRXZlbnRMaXRlKSB7XG4gIC8vIGV4cG9ydCB0aGUgY2xhc3MgZm9yIG5vZGUuanNcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gRXZlbnRMaXRlO1xuXG4gIC8vIHByb3BlcnR5IG5hbWUgdG8gaG9sZCBsaXN0ZW5lcnNcbiAgdmFyIExJU1RFTkVSUyA9IFwibGlzdGVuZXJzXCI7XG5cbiAgLy8gbWV0aG9kcyB0byBleHBvcnRcbiAgdmFyIG1ldGhvZHMgPSB7XG4gICAgb246IG9uLFxuICAgIG9uY2U6IG9uY2UsXG4gICAgb2ZmOiBvZmYsXG4gICAgZW1pdDogZW1pdFxuICB9O1xuXG4gIC8vIG1peGluIHRvIHNlbGZcbiAgbWl4aW4oRXZlbnRMaXRlLnByb3RvdHlwZSk7XG5cbiAgLy8gZXhwb3J0IG1peGluIGZ1bmN0aW9uXG4gIEV2ZW50TGl0ZS5taXhpbiA9IG1peGluO1xuXG4gIC8qKlxuICAgKiBJbXBvcnQgb24oKSwgb25jZSgpLCBvZmYoKSBhbmQgZW1pdCgpIG1ldGhvZHMgaW50byB0YXJnZXQgb2JqZWN0LlxuICAgKlxuICAgKiBAZnVuY3Rpb24gRXZlbnRMaXRlLm1peGluXG4gICAqIEBwYXJhbSB0YXJnZXQge1Byb3RvdHlwZX1cbiAgICovXG5cbiAgZnVuY3Rpb24gbWl4aW4odGFyZ2V0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIHRhcmdldFtrZXldID0gbWV0aG9kc1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5wcm90b3R5cGUub25cbiAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICogQHBhcmFtIGZ1bmMge0Z1bmN0aW9ufVxuICAgKiBAcmV0dXJucyB7RXZlbnRMaXRlfSBTZWxmIGZvciBtZXRob2QgY2hhaW5pbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gb24odHlwZSwgZnVuYykge1xuICAgIGdldExpc3RlbmVycyh0aGlzLCB0eXBlKS5wdXNoKGZ1bmMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBvbmUtdGltZSBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5wcm90b3R5cGUub25jZVxuICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gZnVuYyB7RnVuY3Rpb259XG4gICAqIEByZXR1cm5zIHtFdmVudExpdGV9IFNlbGYgZm9yIG1ldGhvZCBjaGFpbmluZ1xuICAgKi9cblxuICBmdW5jdGlvbiBvbmNlKHR5cGUsIGZ1bmMpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3JhcC5vcmlnaW5hbExpc3RlbmVyID0gZnVuYztcbiAgICBnZXRMaXN0ZW5lcnModGhhdCwgdHlwZSkucHVzaCh3cmFwKTtcbiAgICByZXR1cm4gdGhhdDtcblxuICAgIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgICBvZmYuY2FsbCh0aGF0LCB0eXBlLCB3cmFwKTtcbiAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAZnVuY3Rpb24gRXZlbnRMaXRlLnByb3RvdHlwZS5vZmZcbiAgICogQHBhcmFtIFt0eXBlXSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gW2Z1bmNdIHtGdW5jdGlvbn1cbiAgICogQHJldHVybnMge0V2ZW50TGl0ZX0gU2VsZiBmb3IgbWV0aG9kIGNoYWluaW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9mZih0eXBlLCBmdW5jKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBsaXN0bmVycztcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGRlbGV0ZSB0aGF0W0xJU1RFTkVSU107XG4gICAgfSBlbHNlIGlmICghZnVuYykge1xuICAgICAgbGlzdG5lcnMgPSB0aGF0W0xJU1RFTkVSU107XG4gICAgICBpZiAobGlzdG5lcnMpIHtcbiAgICAgICAgZGVsZXRlIGxpc3RuZXJzW3R5cGVdO1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKGxpc3RuZXJzKS5sZW5ndGgpIHJldHVybiBvZmYuY2FsbCh0aGF0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdG5lcnMgPSBnZXRMaXN0ZW5lcnModGhhdCwgdHlwZSwgdHJ1ZSk7XG4gICAgICBpZiAobGlzdG5lcnMpIHtcbiAgICAgICAgbGlzdG5lcnMgPSBsaXN0bmVycy5maWx0ZXIobmUpO1xuICAgICAgICBpZiAoIWxpc3RuZXJzLmxlbmd0aCkgcmV0dXJuIG9mZi5jYWxsKHRoYXQsIHR5cGUpO1xuICAgICAgICB0aGF0W0xJU1RFTkVSU11bdHlwZV0gPSBsaXN0bmVycztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoYXQ7XG5cbiAgICBmdW5jdGlvbiBuZSh0ZXN0KSB7XG4gICAgICByZXR1cm4gdGVzdCAhPT0gZnVuYyAmJiB0ZXN0Lm9yaWdpbmFsTGlzdGVuZXIgIT09IGZ1bmM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoICh0cmlnZ2VyKSBhbiBldmVudC5cbiAgICpcbiAgICogQGZ1bmN0aW9uIEV2ZW50TGl0ZS5wcm90b3R5cGUuZW1pdFxuICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gW3ZhbHVlXSB7Kn1cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgd2hlbiBhIGxpc3RlbmVyIHJlY2VpdmVkIHRoZSBldmVudFxuICAgKi9cblxuICBmdW5jdGlvbiBlbWl0KHR5cGUsIHZhbHVlKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModGhhdCwgdHlwZSwgdHJ1ZSk7XG4gICAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiBmYWxzZTtcbiAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoYXJnbGVuID09PSAxKSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaCh6ZXJvYXJnKTtcbiAgICB9IGVsc2UgaWYgKGFyZ2xlbiA9PT0gMikge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2gob25lYXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2gobW9yZWFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gISFsaXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgZnVuY3Rpb24gemVyb2FyZyhmdW5jKSB7XG4gICAgICBmdW5jLmNhbGwodGhhdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25lYXJnKGZ1bmMpIHtcbiAgICAgIGZ1bmMuY2FsbCh0aGF0LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9yZWFyZ3MoZnVuYykge1xuICAgICAgZnVuYy5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRMaXN0ZW5lcnModGhhdCwgdHlwZSwgcmVhZG9ubHkpIHtcbiAgICBpZiAocmVhZG9ubHkgJiYgIXRoYXRbTElTVEVORVJTXSkgcmV0dXJuO1xuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGF0W0xJU1RFTkVSU10gfHwgKHRoYXRbTElTVEVORVJTXSA9IHt9KTtcbiAgICByZXR1cm4gbGlzdGVuZXJzW3R5cGVdIHx8IChsaXN0ZW5lcnNbdHlwZV0gPSBbXSk7XG4gIH1cblxufSkoRXZlbnRMaXRlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2V2ZW50LWxpdGUvZXZlbnQtbGl0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGVsdXhlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL0RlbHV4ZVNpZ25hbFwiKTtcbmV4cG9ydHMuRGVsdXhlU2lnbmFsID0gRGVsdXhlU2lnbmFsXzEuRGVsdXhlU2lnbmFsO1xudmFyIEdlbmVyaWNFdmVudF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9ldmVudHMvR2VuZXJpY0V2ZW50XCIpO1xuZXhwb3J0cy5HZW5lcmljRXZlbnQgPSBHZW5lcmljRXZlbnRfMS5HZW5lcmljRXZlbnQ7XG52YXIgSU9uY2VTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSU9uY2VTaWduYWxcIik7XG5leHBvcnRzLklPbmNlU2lnbmFsID0gSU9uY2VTaWduYWxfMS5JT25jZVNpZ25hbDtcbnZhciBJUHJpb3JpdHlTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVByaW9yaXR5U2lnbmFsXCIpO1xuZXhwb3J0cy5JUHJpb3JpdHlTaWduYWwgPSBJUHJpb3JpdHlTaWduYWxfMS5JUHJpb3JpdHlTaWduYWw7XG52YXIgSVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9JU2lnbmFsXCIpO1xuZXhwb3J0cy5JU2lnbmFsID0gSVNpZ25hbF8xLklTaWduYWw7XG52YXIgSVNsb3RfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNsb3RcIik7XG5leHBvcnRzLklTbG90ID0gSVNsb3RfMS5JU2xvdDtcbnZhciBNb25vU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL01vbm9TaWduYWxcIik7XG5leHBvcnRzLk1vbm9TaWduYWwgPSBNb25vU2lnbmFsXzEuTW9ub1NpZ25hbDtcbnZhciBPbmNlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWxcIik7XG5leHBvcnRzLk9uY2VTaWduYWwgPSBPbmNlU2lnbmFsXzEuT25jZVNpZ25hbDtcbnZhciBQcmlvcml0eVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9Qcmlvcml0eVNpZ25hbFwiKTtcbmV4cG9ydHMuUHJpb3JpdHlTaWduYWwgPSBQcmlvcml0eVNpZ25hbF8xLlByaW9yaXR5U2lnbmFsO1xudmFyIFByb21pc2VfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJvbWlzZVwiKTtcbmV4cG9ydHMuUHJvbWlzZSA9IFByb21pc2VfMS5Qcm9taXNlO1xudmFyIFNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9TaWduYWxcIik7XG5leHBvcnRzLlNpZ25hbCA9IFNpZ25hbF8xLlNpZ25hbDtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3RcIik7XG5leHBvcnRzLlNsb3QgPSBTbG90XzEuU2xvdDtcbnZhciBTbG90TGlzdF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9TbG90TGlzdFwiKTtcbmV4cG9ydHMuU2xvdExpc3QgPSBTbG90TGlzdF8xLlNsb3RMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9TaWduYWxcIik7XG52YXIgU2xvdF8xID0gcmVxdWlyZShcIi4vU2xvdFwiKTtcbnZhciBQcmlvcml0eVNpZ25hbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByaW9yaXR5U2lnbmFsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFByaW9yaXR5U2lnbmFsKCkge1xuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHZhbHVlQ2xhc3NlcyA9ICh2YWx1ZUNsYXNzZXMubGVuZ3RoID09IDEgJiYgdmFsdWVDbGFzc2VzWzBdIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWVDbGFzc2VzWzBdIDogdmFsdWVDbGFzc2VzO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHZhbHVlQ2xhc3NlcykgfHwgdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIFByaW9yaXR5U2lnbmFsLnByb3RvdHlwZS5hZGRXaXRoUHJpb3JpdHkgPSBmdW5jdGlvbiAobGlzdGVuZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyV2l0aFByaW9yaXR5KGxpc3RlbmVyLCBmYWxzZSwgcHJpb3JpdHkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIGZsYXNoLmVycm9ycy5JbGxlZ2FsT3BlcmF0aW9uRXJyb3IgPGNvZGU+SWxsZWdhbE9wZXJhdGlvbkVycm9yPC9jb2RlPjogWW91IGNhbm5vdCBhZGRPbmNlKCkgdGhlbiBhZGQoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBQcmlvcml0eVNpZ25hbC5wcm90b3R5cGUuYWRkT25jZVdpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgcHJpb3JpdHkpIHtcbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJXaXRoUHJpb3JpdHkobGlzdGVuZXIsIHRydWUsIHByaW9yaXR5KTtcbiAgICB9O1xuICAgIC8qb3ZlcnJpZGUqL1xuICAgIFByaW9yaXR5U2lnbmFsLnByb3RvdHlwZS5yZWdpc3Rlckxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBvbmNlKSB7XG4gICAgICAgIGlmIChvbmNlID09PSB2b2lkIDApIHsgb25jZSA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJXaXRoUHJpb3JpdHkobGlzdGVuZXIsIG9uY2UpO1xuICAgIH07XG4gICAgUHJpb3JpdHlTaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXJXaXRoUHJpb3JpdHkgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UsIHByaW9yaXR5KSB7XG4gICAgICAgIGlmIChvbmNlID09PSB2b2lkIDApIHsgb25jZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyYXRpb25Qb3NzaWJsZShsaXN0ZW5lciwgb25jZSkpIHtcbiAgICAgICAgICAgIHZhciBzbG90ID0gbmV3IFNsb3RfMS5TbG90KGxpc3RlbmVyLCB0aGlzLCBvbmNlLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzID0gdGhpcy5zbG90cy5pbnNlcnRXaXRoUHJpb3JpdHkoc2xvdCk7XG4gICAgICAgICAgICByZXR1cm4gc2xvdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zbG90cy5maW5kKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIHJldHVybiBQcmlvcml0eVNpZ25hbDtcbn0oU2lnbmFsXzEuU2lnbmFsKSk7XG5leHBvcnRzLlByaW9yaXR5U2lnbmFsID0gUHJpb3JpdHlTaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qcmlvcml0eVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1ByaW9yaXR5U2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE9uY2VTaWduYWxfMSA9IHJlcXVpcmUoXCIuL09uY2VTaWduYWxcIik7XG4vKipcbiAqIEFsbG93cyB0aGUgdmFsdWVDbGFzc2VzIHRvIGJlIHNldCBpbiBNWE1MLCBlLmcuXG4gKiA8c2lnbmFsczpTaWduYWwgaWQ9XCJuYW1lQ2hhbmdlZFwiPntbU3RyaW5nLCB1aW50XX08L3NpZ25hbHM6U2lnbmFsPlxuICovXG4vKltEZWZhdWx0UHJvcGVydHkoXCJ2YWx1ZUNsYXNzZXNcIildKi9cbi8qKlxuICogU2lnbmFsIGRpc3BhdGNoZXMgZXZlbnRzIHRvIG11bHRpcGxlIGxpc3RlbmVycy5cbiAqIEl0IGlzIGluc3BpcmVkIGJ5IEMjIGV2ZW50cyBhbmQgZGVsZWdhdGVzLCBhbmQgYnlcbiAqIDxhIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TaWduYWxzX2FuZF9zbG90c1wiPnNpZ25hbHMgYW5kIHNsb3RzPC9hPlxuICogaW4gUXQuXG4gKiBBIFNpZ25hbCBhZGRzIGV2ZW50IGRpc3BhdGNoaW5nIGZ1bmN0aW9uYWxpdHkgdGhyb3VnaCBjb21wb3NpdGlvbiBhbmQgaW50ZXJmYWNlcyxcbiAqIHJhdGhlciB0aGFuIGluaGVyaXRpbmcgZnJvbSBhIGRpc3BhdGNoZXIuXG4gKiA8YnIvPjxici8+XG4gKiBQcm9qZWN0IGhvbWU6IDxhIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzL1wiPmh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy88L2E+XG4gKi9cbnZhciBTaWduYWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaWduYWwsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNpZ25hbCBpbnN0YW5jZSB0byBkaXNwYXRjaCB2YWx1ZSBvYmplY3RzLlxuICAgICAqIEBwYXJhbSAgICB2YWx1ZUNsYXNzZXMgQW55IG51bWJlciBvZiBjbGFzcyByZWZlcmVuY2VzIHRoYXQgZW5hYmxlIHR5cGUgY2hlY2tzIGluIGRpc3BhdGNoKCkuXG4gICAgICogRm9yIGV4YW1wbGUsIG5ldyBTaWduYWwoU3RyaW5nLCB1aW50KVxuICAgICAqIHdvdWxkIGFsbG93OiBzaWduYWwuZGlzcGF0Y2goXCJ0aGUgQW5zd2VyXCIsIDQyKVxuICAgICAqIGJ1dCBub3Q6IHNpZ25hbC5kaXNwYXRjaCh0cnVlLCA0Mi41KVxuICAgICAqIG5vcjogc2lnbmFsLmRpc3BhdGNoKClcbiAgICAgKlxuICAgICAqIE5PVEU6IEluIEFTMywgc3ViY2xhc3NlcyBjYW5ub3QgY2FsbCBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLFxuICAgICAqIGJ1dCB0aGlzIGNvbnN0cnVjdG9yIGhhcyBsb2dpYyB0byBzdXBwb3J0IHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2lnbmFsKCkge1xuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHZhbHVlQ2xhc3NlcyA9ICh2YWx1ZUNsYXNzZXMubGVuZ3RoID09IDEgJiYgdmFsdWVDbGFzc2VzWzBdIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWVDbGFzc2VzWzBdIDogdmFsdWVDbGFzc2VzO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHZhbHVlQ2xhc3NlcykgfHwgdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIFNpZ25hbC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIFNpZ25hbDtcbn0oT25jZVNpZ25hbF8xLk9uY2VTaWduYWwpKTtcbmV4cG9ydHMuU2lnbmFsID0gU2lnbmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIFNsb3RMaXN0IGNsYXNzIHJlcHJlc2VudHMgYW4gaW1tdXRhYmxlIGxpc3Qgb2YgU2xvdCBvYmplY3RzLlxuICpcbiAqIEBhdXRob3IgSm9hIEViZXJ0XG4gKiBAYXV0aG9yIFJvYmVydCBQZW5uZXJcbiAqL1xudmFyIFNsb3RMaXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IFNsb3RMaXN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIDxwPkEgdXNlciBuZXZlciBoYXMgdG8gY3JlYXRlIGEgU2xvdExpc3QgbWFudWFsbHkuXG4gICAgICogVXNlIHRoZSA8Y29kZT5OSUw8L2NvZGU+IGVsZW1lbnQgdG8gcmVwcmVzZW50IGFuIGVtcHR5IGxpc3QuXG4gICAgICogPGNvZGU+TklMLnByZXBlbmQodmFsdWUpPC9jb2RlPiB3b3VsZCBjcmVhdGUgYSBsaXN0IGNvbnRhaW5pbmcgPGNvZGU+dmFsdWU8L2NvZGU+PC9wPi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBoZWFkIFRoZSBmaXJzdCBzbG90IGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSB0YWlsIEEgbGlzdCBjb250YWluaW5nIGFsbCBzbG90cyBleGNlcHQgaGVhZC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVycyBoZWFkIGFuZCB0YWlsIGFyZSBudWxsLiBVc2UgdGhlIE5JTCBlbGVtZW50IGluc3RlYWQuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBQYXJhbWV0ZXIgaGVhZCBjYW5ub3QgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTbG90TGlzdChoZWFkLCB0YWlsKSB7XG4gICAgICAgIGlmICh0YWlsID09PSB2b2lkIDApIHsgdGFpbCA9IG51bGw7IH1cbiAgICAgICAgdGhpcy5ub25FbXB0eSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWhlYWQgJiYgIXRhaWwpIHtcbiAgICAgICAgICAgIGlmIChTbG90TGlzdC5OSUwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIGhlYWQgYW5kIHRhaWwgYXJlIG51bGwuIFVzZSB0aGUgTklMIGVsZW1lbnQgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIC8vdGhpcyBpcyB0aGUgTklMIGVsZW1lbnQgYXMgcGVyIGRlZmluaXRpb25cbiAgICAgICAgICAgIHRoaXMubm9uRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghaGVhZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgaGVhZCBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IGhlYWQ7XG4gICAgICAgICAgICB0aGlzLnRhaWwgPSB0YWlsIHx8IFNsb3RMaXN0Lk5JTDtcbiAgICAgICAgICAgIHRoaXMubm9uRW1wdHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90TGlzdC5wcm90b3R5cGUsIFwibGVuZ3RoXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2Ygc2xvdHMgaW4gdGhlIGxpc3QuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhaWwgPT0gU2xvdExpc3QuTklMKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgLy8gV2UgY291bGQgY2FjaGUgdGhlIGxlbmd0aCwgYnV0IGl0IHdvdWxkIG1ha2UgbWV0aG9kcyBsaWtlIGZpbHRlck5vdCB1bm5lY2Vzc2FyaWx5IGNvbXBsaWNhdGVkLlxuICAgICAgICAgICAgLy8gSW5zdGVhZCB3ZSBhc3N1bWUgdGhhdCBPKG4pIGlzIG9rYXkgc2luY2UgdGhlIGxlbmd0aCBwcm9wZXJ0eSBpcyB1c2VkIGluIHJhcmUgY2FzZXMuXG4gICAgICAgICAgICAvLyBXZSBjb3VsZCBhbHNvIGNhY2hlIHRoZSBsZW5ndGggbGF6eSwgYnV0IHRoYXQgaXMgYSB3YXN0ZSBvZiBhbm90aGVyIDhiIHBlciBsaXN0IG5vZGUgKGF0IGxlYXN0KS5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICAgICAgd2hpbGUgKHAubm9uRW1wdHkpIHtcbiAgICAgICAgICAgICAgICArK3Jlc3VsdDtcbiAgICAgICAgICAgICAgICBwID0gcC50YWlsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogUHJlcGVuZHMgYSBzbG90IHRvIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0gICAgc2xvdCBUaGUgaXRlbSB0byBiZSBwcmVwZW5kZWQuXG4gICAgICogQHJldHVybiAgICBBIGxpc3QgY29uc2lzdGluZyBvZiBzbG90IGZvbGxvd2VkIGJ5IGFsbCBlbGVtZW50cyBvZiB0aGlzIGxpc3QuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFBhcmFtZXRlciBoZWFkIGNhbm5vdCBiZSBudWxsLlxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90LCB0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBzbG90IHRvIHRoaXMgbGlzdC5cbiAgICAgKiBOb3RlOiBhcHBlbmRpbmcgaXMgTyhuKS4gV2hlcmUgcG9zc2libGUsIHByZXBlbmQgd2hpY2ggaXMgTygxKS5cbiAgICAgKiBJbiBzb21lIGNhc2VzLCBtYW55IGxpc3QgaXRlbXMgbXVzdCBiZSBjbG9uZWQgdG9cbiAgICAgKiBhdm9pZCBjaGFuZ2luZyBleGlzdGluZyBsaXN0cy5cbiAgICAgKiBAcGFyYW0gICAgc2xvdCBUaGUgaXRlbSB0byBiZSBhcHBlbmRlZC5cbiAgICAgKiBAcmV0dXJuICAgIEEgbGlzdCBjb25zaXN0aW5nIG9mIGFsbCBlbGVtZW50cyBvZiB0aGlzIGxpc3QgZm9sbG93ZWQgYnkgc2xvdC5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICAgICAgaWYgKCFzbG90KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xvdExpc3Qoc2xvdCk7XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZToganVzdCBvbmUgc2xvdCBjdXJyZW50bHkgaW4gdGhlIGxpc3QuXG4gICAgICAgIGlmICh0aGlzLnRhaWwgPT0gU2xvdExpc3QuTklMKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90KS5wcmVwZW5kKHRoaXMuaGVhZCk7XG4gICAgICAgIC8vIFRoZSBsaXN0IGFscmVhZHkgaGFzIHR3byBvciBtb3JlIHNsb3RzLlxuICAgICAgICAvLyBXZSBoYXZlIHRvIGJ1aWxkIGEgbmV3IGxpc3Qgd2l0aCBjbG9uZWQgaXRlbXMgYmVjYXVzZSB0aGV5IGFyZSBpbW11dGFibGUuXG4gICAgICAgIHZhciB3aG9sZUNsb25lID0gbmV3IFNsb3RMaXN0KHRoaXMuaGVhZCk7XG4gICAgICAgIHZhciBzdWJDbG9uZSA9IHdob2xlQ2xvbmU7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy50YWlsO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5ub25FbXB0eSkge1xuICAgICAgICAgICAgc3ViQ2xvbmUgPSBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KGN1cnJlbnQuaGVhZCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgbmV3IHNsb3QgbGFzdC5cbiAgICAgICAgc3ViQ2xvbmUudGFpbCA9IG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBzbG90IGludG8gdGhlIGxpc3QgaW4gYSBwb3NpdGlvbiBhY2NvcmRpbmcgdG8gaXRzIHByaW9yaXR5LlxuICAgICAqIFRoZSBoaWdoZXIgdGhlIHByaW9yaXR5LCB0aGUgY2xvc2VyIHRoZSBpdGVtIHdpbGwgYmUgaW5zZXJ0ZWQgdG8gdGhlIGxpc3QgaGVhZC5cbiAgICAgKiBAcGFyYW1zIHNsb3QgVGhlIGl0ZW0gdG8gYmUgaW5zZXJ0ZWQuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFBhcmFtZXRlcnMgaGVhZCBhbmQgdGFpbCBhcmUgbnVsbC4gVXNlIHRoZSBOSUwgZWxlbWVudCBpbnN0ZWFkLlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVyIGhlYWQgY2Fubm90IGJlIG51bGwuXG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLmluc2VydFdpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChzbG90KSB7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xvdExpc3Qoc2xvdCk7XG4gICAgICAgIHZhciBwcmlvcml0eSA9IHNsb3QucHJpb3JpdHk7XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZTogbmV3IHNsb3QgaGFzIHRoZSBoaWdoZXN0IHByaW9yaXR5LlxuICAgICAgICBpZiAocHJpb3JpdHkgPiB0aGlzLmhlYWQucHJpb3JpdHkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwZW5kKHNsb3QpO1xuICAgICAgICB2YXIgd2hvbGVDbG9uZSA9IG5ldyBTbG90TGlzdCh0aGlzLmhlYWQpO1xuICAgICAgICB2YXIgc3ViQ2xvbmUgPSB3aG9sZUNsb25lO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMudGFpbDtcbiAgICAgICAgLy8gRmluZCBhIHNsb3Qgd2l0aCBsb3dlciBwcmlvcml0eSBhbmQgZ28gaW4gZnJvbnQgb2YgaXQuXG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAocHJpb3JpdHkgPiBjdXJyZW50LmhlYWQucHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICBzdWJDbG9uZS50YWlsID0gY3VycmVudC5wcmVwZW5kKHNsb3QpO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aG9sZUNsb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2xvbmUgPSBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KGN1cnJlbnQuaGVhZCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNsb3QgaGFzIGxvd2VzdCBwcmlvcml0eS5cbiAgICAgICAgc3ViQ2xvbmUudGFpbCA9IG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzbG90cyBpbiB0aGlzIGxpc3QgdGhhdCBkbyBub3QgY29udGFpbiB0aGUgc3VwcGxpZWQgbGlzdGVuZXIuXG4gICAgICogTm90ZTogYXNzdW1lcyB0aGUgbGlzdGVuZXIgaXMgbm90IHJlcGVhdGVkIHdpdGhpbiB0aGUgbGlzdC5cbiAgICAgKiBAcGFyYW0gICAgbGlzdGVuZXIgVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIEEgbGlzdCBjb25zaXN0aW5nIG9mIGFsbCBlbGVtZW50cyBvZiB0aGlzIGxpc3QgdGhhdCBkbyBub3QgaGF2ZSBsaXN0ZW5lci5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuZmlsdGVyTm90ID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSB8fCBsaXN0ZW5lciA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGlmIChsaXN0ZW5lciA9PSB0aGlzLmhlYWQubGlzdGVuZXIpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWlsO1xuICAgICAgICAvLyBUaGUgZmlyc3QgaXRlbSB3YXNuJ3QgYSBtYXRjaCBzbyB0aGUgZmlsdGVyZWQgbGlzdCB3aWxsIGNvbnRhaW4gaXQuXG4gICAgICAgIHZhciB3aG9sZUNsb25lID0gbmV3IFNsb3RMaXN0KHRoaXMuaGVhZCk7XG4gICAgICAgIHZhciBzdWJDbG9uZSA9IHdob2xlQ2xvbmU7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy50YWlsO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5ub25FbXB0eSkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaGVhZC5saXN0ZW5lciA9PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIC8vIFNwbGljZSBvdXQgdGhlIGN1cnJlbnQgaGVhZC5cbiAgICAgICAgICAgICAgICBzdWJDbG9uZS50YWlsID0gY3VycmVudC50YWlsO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aG9sZUNsb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2xvbmUgPSBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KGN1cnJlbnQuaGVhZCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBsaXN0ZW5lciB3YXMgbm90IGZvdW5kIHNvIHRoaXMgbGlzdCBpcyB1bmNoYW5nZWQuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzdXBwbGllZCBsaXN0ZW5lciBGdW5jdGlvbiBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgbGlzdFxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMubm9uRW1wdHkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHAubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChwLmhlYWQubGlzdGVuZXIgPT0gbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBwID0gcC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgSVNsb3QgYXNzb2NpYXRlZCB3aXRoIGEgc3VwcGxpZWQgbGlzdGVuZXIgd2l0aGluIHRoZSBTbG90TGlzdC5cbiAgICAgKiBAcGFyYW0gICBsaXN0ZW5lciBUaGUgRnVuY3Rpb24gYmVpbmcgc2VhcmNoZWQgZm9yXG4gICAgICogQHJldHVybiAgVGhlIElTbG90IGluIHRoaXMgbGlzdCBhc3NvY2lhdGVkIHdpdGggdGhlIGxpc3RlbmVyIHBhcmFtZXRlciB0aHJvdWdoIHRoZSBJU2xvdC5saXN0ZW5lciBwcm9wZXJ0eS5cbiAgICAgKiAgICAgICAgICBSZXR1cm5zIG51bGwgaWYgbm8gc3VjaCBJU2xvdCBpbnN0YW5jZSBleGlzdHMgb3IgdGhlIGxpc3QgaXMgZW1wdHkuXG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBwID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHAubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChwLmhlYWQubGlzdGVuZXIgPT0gbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuaGVhZDtcbiAgICAgICAgICAgIHAgPSBwLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBTbG90TGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSAnJztcbiAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgYnVmZmVyICs9IHAuaGVhZCArIFwiIC0+IFwiO1xuICAgICAgICAgICAgcCA9IHAudGFpbDtcbiAgICAgICAgfVxuICAgICAgICBidWZmZXIgKz0gXCJOSUxcIjtcbiAgICAgICAgcmV0dXJuIFwiW0xpc3QgXCIgKyBidWZmZXIgKyBcIl1cIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudHMgYW4gZW1wdHkgbGlzdC4gVXNlZCBhcyB0aGUgbGlzdCB0ZXJtaW5hdG9yLlxuICAgICAqL1xuICAgIFNsb3RMaXN0Lk5JTCA9IG5ldyBTbG90TGlzdChudWxsLCBudWxsKTtcbiAgICByZXR1cm4gU2xvdExpc3Q7XG59KCkpO1xuZXhwb3J0cy5TbG90TGlzdCA9IFNsb3RMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2xvdExpc3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TbG90TGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzaWduYWxzX2pzXzEgPSByZXF1aXJlKFwic2lnbmFscy5qc1wiKTtcbnZhciBDbG9jayA9IHJlcXVpcmUoXCJAZ2FtZXN0ZGlvL2Nsb2NrXCIpO1xudmFyIGRlbHRhX2xpc3RlbmVyXzEgPSByZXF1aXJlKFwiZGVsdGEtbGlzdGVuZXJcIik7XG52YXIgbXNncGFjayA9IHJlcXVpcmUoXCJtc2dwYWNrLWxpdGVcIik7XG52YXIgZm9zc2lsRGVsdGEgPSByZXF1aXJlKFwiZm9zc2lsLWRlbHRhXCIpO1xudmFyIFByb3RvY29sXzEgPSByZXF1aXJlKFwiLi9Qcm90b2NvbFwiKTtcbnZhciBSb29tID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb29tLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvb20obmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB7fSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2xvY2sgPSBuZXcgQ2xvY2soKTsgLy8gZXhwZXJpbWVudGFsXG4gICAgICAgIF90aGlzLnJlbW90ZUNsb2NrID0gbmV3IENsb2NrKCk7IC8vIGV4cGVyaW1lbnRhbFxuICAgICAgICAvLyBQdWJsaWMgc2lnbmFsc1xuICAgICAgICBfdGhpcy5vbkpvaW4gPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5vblVwZGF0ZSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLm9uRGF0YSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLm9uRXJyb3IgPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5vbkxlYXZlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgX3RoaXMuaWQgPSBudWxsO1xuICAgICAgICBfdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgX3RoaXMub25MZWF2ZS5hZGQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7IH0pO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJvb20ucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2VDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5vbkxlYXZlLmRpc3BhdGNoKCk7IH07XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5vbk1lc3NhZ2VDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG1zZ3BhY2suZGVjb2RlKG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBtZXNzYWdlWzBdO1xuICAgICAgICBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgdGhpcy5vbkpvaW4uZGlzcGF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID09IFByb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9FUlJPUikge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX1NUQVRFKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBtZXNzYWdlWzJdO1xuICAgICAgICAgICAgdmFyIHJlbW90ZUN1cnJlbnRUaW1lID0gbWVzc2FnZVszXTtcbiAgICAgICAgICAgIHZhciByZW1vdGVFbGFwc2VkVGltZSA9IG1lc3NhZ2VbNF07XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCByZW1vdGVDdXJyZW50VGltZSwgcmVtb3RlRWxhcHNlZFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX1NUQVRFX1BBVENIKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX0RBVEEpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRhLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5MRUFWRV9ST09NKSB7XG4gICAgICAgICAgICB0aGlzLmxlYXZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCByZW1vdGVDdXJyZW50VGltZSwgcmVtb3RlRWxhcHNlZFRpbWUpIHtcbiAgICAgICAgdGhpcy5zZXQoc3RhdGUpO1xuICAgICAgICB0aGlzLl9wcmV2aW91c1N0YXRlID0gbXNncGFjay5lbmNvZGUoc3RhdGUpO1xuICAgICAgICAvLyBzZXQgcmVtb3RlIGNsb2NrIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHJlbW90ZUN1cnJlbnRUaW1lICYmIHJlbW90ZUVsYXBzZWRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmN1cnJlbnRUaW1lID0gcmVtb3RlQ3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmVsYXBzZWRUaW1lID0gcmVtb3RlRWxhcHNlZFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHN0YXRlKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKGJpbmFyeVBhdGNoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjbGllbnQtc2lkZSBwaW5nXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBwYXRjaFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAodGhpcy5sYXN0UGF0Y2hUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmcgPSBwYXRjaFRpbWUgLSB0aGlzLmxhc3RQYXRjaFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0UGF0Y2hUaW1lID0gcGF0Y2hUaW1lO1xuICAgICAgICB0aGlzLmNsb2NrLnRpY2soKTtcbiAgICAgICAgLy8gYXBwbHkgcGF0Y2hcbiAgICAgICAgdGhpcy5fcHJldmlvdXNTdGF0ZSA9IGZvc3NpbERlbHRhLmFwcGx5KHRoaXMuX3ByZXZpb3VzU3RhdGUsIGJpbmFyeVBhdGNoKTtcbiAgICAgICAgLy8gdHJpZ2dlciBzdGF0ZSBjYWxsYmFja3NcbiAgICAgICAgdGhpcy5zZXQobXNncGFjay5kZWNvZGUodGhpcy5fcHJldmlvdXNTdGF0ZSkpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHRoaXMuZGF0YSk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5sZWF2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoW1Byb3RvY29sXzEuUHJvdG9jb2wuUk9PTV9EQVRBLCB0aGlzLmlkLCBkYXRhXSk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMub25Kb2luLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uRGF0YS5yZW1vdmVBbGwoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uTGVhdmUucmVtb3ZlQWxsKCk7XG4gICAgfTtcbiAgICByZXR1cm4gUm9vbTtcbn0oZGVsdGFfbGlzdGVuZXJfMS5EZWx0YUNvbnRhaW5lcikpO1xuZXhwb3J0cy5Sb29tID0gUm9vbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1Jvb20udHNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENsaWVudF8xID0gcmVxdWlyZShcIi4vQ2xpZW50XCIpO1xuZXhwb3J0cy5DbGllbnQgPSBDbGllbnRfMS5DbGllbnQ7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xuZXhwb3J0cy5Qcm90b2NvbCA9IFByb3RvY29sXzEuUHJvdG9jb2w7XG52YXIgUm9vbV8xID0gcmVxdWlyZShcIi4vUm9vbVwiKTtcbmV4cG9ydHMuUm9vbSA9IFJvb21fMS5Sb29tO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1zZ3BhY2sgPSByZXF1aXJlKFwibXNncGFjay1saXRlXCIpO1xudmFyIHNpZ25hbHNfanNfMSA9IHJlcXVpcmUoXCJzaWduYWxzLmpzXCIpO1xudmFyIFByb3RvY29sXzEgPSByZXF1aXJlKFwiLi9Qcm90b2NvbFwiKTtcbnZhciBSb29tXzEgPSByZXF1aXJlKFwiLi9Sb29tXCIpO1xudmFyIENvbm5lY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0Nvbm5lY3Rpb25cIik7XG52YXIgQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENsaWVudCh1cmwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gc2lnbmFsc1xuICAgICAgICB0aGlzLm9uT3BlbiA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIHRoaXMub25NZXNzYWdlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5yb29tcyA9IHt9O1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICB0aGlzLmhvc3RuYW1lID0gdXJsO1xuICAgICAgICB2YXIgY29seXNldXNpZCA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKCdjb2x5c2V1c2lkJyk7XG4gICAgICAgIGlmICghKGNvbHlzZXVzaWQgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICAgICAgLy8gYnJvd3NlciBoYXMgc3luY2hyb25vdXMgcmV0dXJuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb24oY29seXNldXNpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByZWFjdC1uYXRpdmUgaXMgYXN5bmNocm9ub3VzXG4gICAgICAgICAgICBjb2x5c2V1c2lkLnRoZW4oZnVuY3Rpb24gKGlkKSB7IHJldHVybiBfdGhpcy5jcmVhdGVDb25uZWN0aW9uKGlkKTsgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2xpZW50LnByb3RvdHlwZS5jcmVhdGVDb25uZWN0aW9uID0gZnVuY3Rpb24gKGNvbHlzZXVzaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pZCA9IGNvbHlzZXVzaWQgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb25fMS5Db25uZWN0aW9uKHRoaXMuaG9zdG5hbWUgKyBcIi8/Y29seXNldXNpZD1cIiArIHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2VDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5vbkNsb3NlLmRpc3BhdGNoKCk7IH07XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLm9uRXJyb3IuZGlzcGF0Y2goKTsgfTtcbiAgICAgICAgLy8gY2hlY2sgZm9yIGlkIG9uIGNvb2tpZVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25PcGVuLmRpc3BhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDbGllbnQucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiAocm9vbU5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy5yb29tID0gbmV3IFJvb21fMS5Sb29tKHJvb21OYW1lKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoW1Byb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9ST09NLCByb29tTmFtZSwgb3B0aW9uc10pO1xuICAgICAgICByZXR1cm4gdGhpcy5yb29tO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgQ2xpZW50LnByb3RvdHlwZS5vbk1lc3NhZ2VDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG1zZ3BhY2suZGVjb2RlKG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBtZXNzYWdlWzBdO1xuICAgICAgICBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLlVTRVJfSUQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCdjb2x5c2V1c2lkJywgbWVzc2FnZVsxXSk7XG4gICAgICAgICAgICB0aGlzLmlkID0gbWVzc2FnZVsxXTtcbiAgICAgICAgICAgIHRoaXMub25PcGVuLmRpc3BhdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSkge1xuICAgICAgICAgICAgdmFyIHJvb21fMSA9IHRoaXMucm9vbTtcbiAgICAgICAgICAgIHJvb21fMS5pZCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICByb29tXzEuY29ubmVjdChuZXcgQ29ubmVjdGlvbl8xLkNvbm5lY3Rpb24odGhpcy5ob3N0bmFtZSArIFwiL1wiICsgdGhpcy5yb29tLmlkICsgXCI/Y29seXNldXNpZD1cIiArIHRoaXMuaWQpKTtcbiAgICAgICAgICAgIHJvb21fMS5vbkxlYXZlLmFkZChmdW5jdGlvbiAoKSB7IHJldHVybiBkZWxldGUgX3RoaXMucm9vbXNbcm9vbV8xLmlkXTsgfSk7XG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jvb21fMS5pZF0gPSByb29tXzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fRVJST1IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzZXJ2ZXIgZXJyb3I6XCIsIG1lc3NhZ2VbMl0pO1xuICAgICAgICAgICAgLy8gZ2VuZXJhbCBlcnJvclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UuZGlzcGF0Y2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDbGllbnQ7XG59KCkpO1xuZXhwb3J0cy5DbGllbnQgPSBDbGllbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9DbGllbnQudHNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbHMgQnVmZmVyICovXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYygoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIEJ1ZmZlcikgJiYgQnVmZmVyKSB8fFxuICBjKHRoaXMuQnVmZmVyKSB8fFxuICBjKChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2Ygd2luZG93KSAmJiB3aW5kb3cuQnVmZmVyKSB8fFxuICB0aGlzLkJ1ZmZlcjtcblxuZnVuY3Rpb24gYyhCKSB7XG4gIHJldHVybiBCICYmIEIuaXNCdWZmZXIgJiYgQjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlci1nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gKGI2NC5sZW5ndGggKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIoKGxlbiAqIDMgLyA0KSAtIHBsYWNlSG9sZGVycylcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gbGVuIC0gNCA6IGxlblxuXG4gIHZhciBMID0gMFxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICsgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYnVmZmVyaXNoLWFycmF5LmpzXG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBhbGxvYygwKTtcblxuZXhwb3J0cy5hbGxvYyA9IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBCdWZmZXJpc2guY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gdmFsdWUge0FycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxTdHJpbmd9XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICBpZiAoIUJ1ZmZlcmlzaC5pc0J1ZmZlcih2YWx1ZSkgJiYgQnVmZmVyaXNoLmlzVmlldyh2YWx1ZSkpIHtcbiAgICAvLyBUeXBlZEFycmF5IHRvIFVpbnQ4QXJyYXlcbiAgICB2YWx1ZSA9IEJ1ZmZlcmlzaC5VaW50OEFycmF5LmZyb20odmFsdWUpO1xuICB9IGVsc2UgaWYgKEJ1ZmZlcmlzaC5pc0FycmF5QnVmZmVyKHZhbHVlKSkge1xuICAgIC8vIEFycmF5QnVmZmVyIHRvIFVpbnQ4QXJyYXlcbiAgICB2YWx1ZSA9IG5ldyBVaW50OEFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBTdHJpbmcgdG8gQXJyYXlcbiAgICByZXR1cm4gQnVmZmVyaXNoLmZyb20uY2FsbChleHBvcnRzLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJyk7XG4gIH1cblxuICAvLyBBcnJheS1saWtlIHRvIEFycmF5XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWx1ZSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYnVmZmVyaXNoLWJ1ZmZlci5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJpc2guaGFzQnVmZmVyID8gYWxsb2MoMCkgOiBbXTtcblxuZXhwb3J0cy5hbGxvYyA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgQnVmZmVyLmFsbG9jIHx8IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBCdWZmZXJpc2guY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqL1xuXG5mdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gIGlmICghQnVmZmVyaXNoLmlzQnVmZmVyKHZhbHVlKSAmJiBCdWZmZXJpc2guaXNWaWV3KHZhbHVlKSkge1xuICAgIC8vIFR5cGVkQXJyYXkgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoQnVmZmVyaXNoLmlzQXJyYXlCdWZmZXIodmFsdWUpKSB7XG4gICAgLy8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFN0cmluZyB0byBCdWZmZXJcbiAgICByZXR1cm4gQnVmZmVyaXNoLmZyb20uY2FsbChleHBvcnRzLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJyk7XG4gIH1cblxuICAvLyBBcnJheS1saWtlIHRvIEJ1ZmZlclxuICBpZiAoQnVmZmVyLmZyb20gJiYgQnVmZmVyLmZyb20ubGVuZ3RoICE9PSAxKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlKTsgLy8gbm9kZSB2NitcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSk7IC8vIG5vZGUgdjRcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXJpc2gtdWludDhhcnJheS5qc1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gQnVmZmVyaXNoLmhhc0FycmF5QnVmZmVyID8gYWxsb2MoMCkgOiBbXTtcblxuZXhwb3J0cy5hbGxvYyA9IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBCdWZmZXJpc2guY29uY2F0O1xuZXhwb3J0cy5mcm9tID0gZnJvbTtcblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBBcnJheUJ1ZmZlclxuICAgIHZhciBieXRlT2Zmc2V0ID0gdmFsdWUuYnl0ZU9mZnNldDtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgdmFsdWUgPSB2YWx1ZS5idWZmZXI7XG4gICAgaWYgKHZhbHVlLmJ5dGVMZW5ndGggIT09IGJ5dGVMZW5ndGgpIHtcbiAgICAgIGlmICh2YWx1ZS5zbGljZSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFuZHJvaWQgNC4xIGRvZXMgbm90IGhhdmUgQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlXG4gICAgICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUuYnl0ZUxlbmd0aCAhPT0gYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIC8vIFR5cGVkQXJyYXkgdG8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheSB0byBBcnJheVxuICAgICAgICAgIHZhbHVlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWUsIGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBTdHJpbmcgdG8gVWludDhBcnJheVxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC11aW50OGFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXItbGl0ZS5qc1xuXG52YXIgTUFYQlVGTEVOID0gODE5MjtcblxuZXhwb3J0cy5jb3B5ID0gY29weTtcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbmV4cG9ydHMud3JpdGUgPSB3cml0ZTtcblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLndyaXRlKClcbiAqXG4gKiBAcGFyYW0gc3RyaW5nIHtTdHJpbmd9XG4gKiBAcGFyYW0gW29mZnNldF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cblxuZnVuY3Rpb24gd3JpdGUoc3RyaW5nLCBvZmZzZXQpIHtcbiAgdmFyIGJ1ZmZlciA9IHRoaXM7XG4gIHZhciBpbmRleCA9IG9mZnNldCB8fCAob2Zmc2V0IHw9IDApO1xuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgdmFyIGNociA9IDA7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICBjaHIgPSBzdHJpbmcuY2hhckNvZGVBdChpKyspO1xuXG4gICAgaWYgKGNociA8IDEyOCkge1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gY2hyO1xuICAgIH0gZWxzZSBpZiAoY2hyIDwgMHg4MDApIHtcbiAgICAgIC8vIDIgYnl0ZXNcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4QzAgfCAoY2hyID4+PiA2KTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoY2hyICYgMHgzRik7XG4gICAgfSBlbHNlIGlmIChjaHIgPCAweEQ4MDAgfHwgY2hyID4gMHhERkZGKSB7XG4gICAgICAvLyAzIGJ5dGVzXG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweEUwIHwgKGNociAgPj4+IDEyKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoKGNociA+Pj4gNikgICYgMHgzRik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKGNociAgICAgICAgICAmIDB4M0YpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyA0IGJ5dGVzIC0gc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNociA9ICgoKGNociAtIDB4RDgwMCkgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkrKykgLSAweERDMDApKSArIDB4MTAwMDA7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweEYwIHwgKGNociA+Pj4gMTgpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8ICgoY2hyID4+PiAxMikgJiAweDNGKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoKGNociA+Pj4gNikgICYgMHgzRik7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKGNociAgICAgICAgICAmIDB4M0YpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXggLSBvZmZzZXQ7XG59XG5cbi8qKlxuICogQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZygpXG4gKlxuICogQHBhcmFtIFtlbmNvZGluZ10ge1N0cmluZ30gaWdub3JlZFxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b1N0cmluZyhlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgYnVmZmVyID0gdGhpcztcbiAgdmFyIGluZGV4ID0gc3RhcnR8MDtcbiAgaWYgKCFlbmQpIGVuZCA9IGJ1ZmZlci5sZW5ndGg7XG4gIHZhciBzdHJpbmcgPSAnJztcbiAgdmFyIGNociA9IDA7XG5cbiAgd2hpbGUgKGluZGV4IDwgZW5kKSB7XG4gICAgY2hyID0gYnVmZmVyW2luZGV4KytdO1xuICAgIGlmIChjaHIgPCAxMjgpIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoKGNociAmIDB4RTApID09PSAweEMwKSB7XG4gICAgICAvLyAyIGJ5dGVzXG4gICAgICBjaHIgPSAoY2hyICYgMHgxRikgPDwgNiB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRik7XG5cbiAgICB9IGVsc2UgaWYgKChjaHIgJiAweEYwKSA9PT0gMHhFMCkge1xuICAgICAgLy8gMyBieXRlc1xuICAgICAgY2hyID0gKGNociAmIDB4MEYpICAgICAgICAgICAgIDw8IDEyIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKSA8PCA2ICB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRik7XG5cbiAgICB9IGVsc2UgaWYgKChjaHIgJiAweEY4KSA9PT0gMHhGMCkge1xuICAgICAgLy8gNCBieXRlc1xuICAgICAgY2hyID0gKGNociAmIDB4MDcpICAgICAgICAgICAgIDw8IDE4IHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKSA8PCAxMiB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRikgPDwgNiAgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpO1xuICAgIH1cblxuICAgIGlmIChjaHIgPj0gMHgwMTAwMDApIHtcbiAgICAgIC8vIEEgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNociAtPSAweDAxMDAwMDtcblxuICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGNociA+Pj4gMTApICsgMHhEODAwLCAoY2hyICYgMHgzRkYpICsgMHhEQzAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nO1xufVxuXG4vKipcbiAqIEJ1ZmZlci5wcm90b3R5cGUuY29weSgpXG4gKlxuICogQHBhcmFtIHRhcmdldCB7QnVmZmVyfVxuICogQHBhcmFtIFt0YXJnZXRTdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblxuZnVuY3Rpb24gY29weSh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpO1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDA7XG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMDtcbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xuXG4gIGlmICh0YXJnZXQgPT09IHRoaXMgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmdcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGFzY2VuZGluZ1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxlbjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyLWxpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGV4dC1wYWNrZXIuanNcblxuZXhwb3J0cy5zZXRFeHRQYWNrZXJzID0gc2V0RXh0UGFja2VycztcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xudmFyIHBhY2tUeXBlZEFycmF5ID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbTtcbnZhciBfZW5jb2RlO1xuXG52YXIgRVJST1JfQ09MVU1OUyA9IHtuYW1lOiAxLCBtZXNzYWdlOiAxLCBzdGFjazogMSwgY29sdW1uTnVtYmVyOiAxLCBmaWxlTmFtZTogMSwgbGluZU51bWJlcjogMX07XG5cbmZ1bmN0aW9uIHNldEV4dFBhY2tlcnMoY29kZWMpIHtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEUsIEVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDEsIEV2YWxFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDAyLCBSYW5nZUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDMsIFJlZmVyZW5jZUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDQsIFN5bnRheEVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDUsIFR5cGVFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDA2LCBVUklFcnJvciwgW3BhY2tFcnJvciwgZW5jb2RlXSk7XG5cbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEEsIFJlZ0V4cCwgW3BhY2tSZWdFeHAsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwQiwgQm9vbGVhbiwgW3BhY2tWYWx1ZU9mLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEMsIFN0cmluZywgW3BhY2tWYWx1ZU9mLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MEQsIERhdGUsIFtOdW1iZXIsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwRiwgTnVtYmVyLCBbcGFja1ZhbHVlT2YsIGVuY29kZV0pO1xuXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhBcnJheSkge1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDExLCBJbnQ4QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxMiwgVWludDhBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDEzLCBJbnQxNkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTQsIFVpbnQxNkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTUsIEludDMyQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNiwgVWludDMyQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNywgRmxvYXQzMkFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG5cbiAgICAvLyBQaGFudG9tSlMvMS45LjcgZG9lc24ndCBoYXZlIEZsb2F0NjRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgRmxvYXQ2NEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxOCwgRmxvYXQ2NEFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgfVxuXG4gICAgLy8gSUUxMCBkb2Vzbid0IGhhdmUgVWludDhDbGFtcGVkQXJyYXlcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxOSwgVWludDhDbGFtcGVkQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICB9XG5cbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxQSwgQXJyYXlCdWZmZXIsIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxRCwgRGF0YVZpZXcsIHBhY2tUeXBlZEFycmF5KTtcbiAgfVxuXG4gIGlmIChCdWZmZXJpc2guaGFzQnVmZmVyKSB7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MUIsIEJ1ZmZlciwgQnVmZmVyaXNoLmZyb20pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuICBpZiAoIV9lbmNvZGUpIF9lbmNvZGUgPSByZXF1aXJlKFwiLi9lbmNvZGVcIikuZW5jb2RlOyAvLyBsYXp5IGxvYWRcbiAgcmV0dXJuIF9lbmNvZGUoaW5wdXQpO1xufVxuXG5mdW5jdGlvbiBwYWNrVmFsdWVPZih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlKS52YWx1ZU9mKCk7XG59XG5cbmZ1bmN0aW9uIHBhY2tSZWdFeHAodmFsdWUpIHtcbiAgdmFsdWUgPSBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNwbGl0KFwiL1wiKTtcbiAgdmFsdWUuc2hpZnQoKTtcbiAgdmFyIG91dCA9IFt2YWx1ZS5wb3AoKV07XG4gIG91dC51bnNoaWZ0KHZhbHVlLmpvaW4oXCIvXCIpKTtcbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcGFja0Vycm9yKHZhbHVlKSB7XG4gIHZhciBvdXQgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIEVSUk9SX0NPTFVNTlMpIHtcbiAgICBvdXRba2V5XSA9IHZhbHVlW2tleV07XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LXBhY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gd3JpdGUtdHlwZS5qc1xuXG52YXIgSVNfQVJSQVkgPSByZXF1aXJlKFwiaXNhcnJheVwiKTtcbnZhciBJbnQ2NEJ1ZmZlciA9IHJlcXVpcmUoXCJpbnQ2NC1idWZmZXJcIik7XG52YXIgVWludDY0QkUgPSBJbnQ2NEJ1ZmZlci5VaW50NjRCRTtcbnZhciBJbnQ2NEJFID0gSW50NjRCdWZmZXIuSW50NjRCRTtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXJQcm90byA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1wcm90b1wiKTtcbnZhciBXcml0ZVRva2VuID0gcmVxdWlyZShcIi4vd3JpdGUtdG9rZW5cIik7XG52YXIgdWludDggPSByZXF1aXJlKFwiLi93cml0ZS11aW50OFwiKS51aW50ODtcbnZhciBFeHRCdWZmZXIgPSByZXF1aXJlKFwiLi9leHQtYnVmZmVyXCIpLkV4dEJ1ZmZlcjtcblxudmFyIEhBU19VSU5UOEFSUkFZID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OEFycmF5KTtcbnZhciBIQVNfTUFQID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBNYXApO1xuXG52YXIgZXh0bWFwID0gW107XG5leHRtYXBbMV0gPSAweGQ0O1xuZXh0bWFwWzJdID0gMHhkNTtcbmV4dG1hcFs0XSA9IDB4ZDY7XG5leHRtYXBbOF0gPSAweGQ3O1xuZXh0bWFwWzE2XSA9IDB4ZDg7XG5cbmV4cG9ydHMuZ2V0V3JpdGVUeXBlID0gZ2V0V3JpdGVUeXBlO1xuXG5mdW5jdGlvbiBnZXRXcml0ZVR5cGUob3B0aW9ucykge1xuICB2YXIgdG9rZW4gPSBXcml0ZVRva2VuLmdldFdyaXRlVG9rZW4ob3B0aW9ucyk7XG4gIHZhciB1c2VyYXcgPSBvcHRpb25zICYmIG9wdGlvbnMudXNlcmF3O1xuICB2YXIgYmluYXJyYXlidWZmZXIgPSBIQVNfVUlOVDhBUlJBWSAmJiBvcHRpb25zICYmIG9wdGlvbnMuYmluYXJyYXlidWZmZXI7XG4gIHZhciBpc0J1ZmZlciA9IGJpbmFycmF5YnVmZmVyID8gQnVmZmVyaXNoLmlzQXJyYXlCdWZmZXIgOiBCdWZmZXJpc2guaXNCdWZmZXI7XG4gIHZhciBiaW4gPSBiaW5hcnJheWJ1ZmZlciA/IGJpbl9hcnJheWJ1ZmZlciA6IGJpbl9idWZmZXI7XG4gIHZhciB1c2VtYXAgPSBIQVNfTUFQICYmIG9wdGlvbnMgJiYgb3B0aW9ucy51c2VtYXA7XG4gIHZhciBtYXAgPSB1c2VtYXAgPyBtYXBfdG9fbWFwIDogb2JqX3RvX21hcDtcblxuICB2YXIgd3JpdGVUeXBlID0ge1xuICAgIFwiYm9vbGVhblwiOiBib29sLFxuICAgIFwiZnVuY3Rpb25cIjogbmlsLFxuICAgIFwibnVtYmVyXCI6IG51bWJlcixcbiAgICBcIm9iamVjdFwiOiAodXNlcmF3ID8gb2JqZWN0X3JhdyA6IG9iamVjdCksXG4gICAgXCJzdHJpbmdcIjogX3N0cmluZyh1c2VyYXcgPyByYXdfaGVhZF9zaXplIDogc3RyX2hlYWRfc2l6ZSksXG4gICAgXCJzeW1ib2xcIjogbmlsLFxuICAgIFwidW5kZWZpbmVkXCI6IG5pbFxuICB9O1xuXG4gIHJldHVybiB3cml0ZVR5cGU7XG5cbiAgLy8gZmFsc2UgLS0gMHhjMlxuICAvLyB0cnVlIC0tIDB4YzNcbiAgZnVuY3Rpb24gYm9vbChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gdmFsdWUgPyAweGMzIDogMHhjMjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBudW1iZXIoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgaXZhbHVlID0gdmFsdWUgfCAwO1xuICAgIHZhciB0eXBlO1xuICAgIGlmICh2YWx1ZSAhPT0gaXZhbHVlKSB7XG4gICAgICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gICAgICB0eXBlID0gMHhjYjtcbiAgICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKC0weDIwIDw9IGl2YWx1ZSAmJiBpdmFsdWUgPD0gMHg3Rikge1xuICAgICAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gICAgICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgICAgIHR5cGUgPSBpdmFsdWUgJiAweEZGO1xuICAgIH0gZWxzZSBpZiAoMCA8PSBpdmFsdWUpIHtcbiAgICAgIC8vIHVpbnQgOCAtLSAweGNjXG4gICAgICAvLyB1aW50IDE2IC0tIDB4Y2RcbiAgICAgIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAgICAgdHlwZSA9IChpdmFsdWUgPD0gMHhGRikgPyAweGNjIDogKGl2YWx1ZSA8PSAweEZGRkYpID8gMHhjZCA6IDB4Y2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGludCA4IC0tIDB4ZDBcbiAgICAgIC8vIGludCAxNiAtLSAweGQxXG4gICAgICAvLyBpbnQgMzIgLS0gMHhkMlxuICAgICAgdHlwZSA9ICgtMHg4MCA8PSBpdmFsdWUpID8gMHhkMCA6ICgtMHg4MDAwIDw9IGl2YWx1ZSkgPyAweGQxIDogMHhkMjtcbiAgICB9XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgaXZhbHVlKTtcbiAgfVxuXG4gIC8vIHVpbnQgNjQgLS0gMHhjZlxuICBmdW5jdGlvbiB1aW50NjQoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IDB4Y2Y7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8vIGludCA2NCAtLSAweGQzXG4gIGZ1bmN0aW9uIGludDY0KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSAweGQzO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlLnRvQXJyYXkoKSk7XG4gIH1cblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIC8vIGZpeHN0ciAtLSAweGEwIC0gMHhiZlxuICBmdW5jdGlvbiBzdHJfaGVhZF9zaXplKGxlbmd0aCkge1xuICAgIHJldHVybiAobGVuZ3RoIDwgMzIpID8gMSA6IChsZW5ndGggPD0gMHhGRikgPyAyIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMyA6IDU7XG4gIH1cblxuICAvLyByYXcgMTYgLS0gMHhkYVxuICAvLyByYXcgMzIgLS0gMHhkYlxuICAvLyBmaXhyYXcgLS0gMHhhMCAtIDB4YmZcbiAgZnVuY3Rpb24gcmF3X2hlYWRfc2l6ZShsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCA8IDMyKSA/IDEgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAzIDogNTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdHJpbmcoaGVhZF9zaXplKSB7XG4gICAgcmV0dXJuIHN0cmluZztcblxuICAgIGZ1bmN0aW9uIHN0cmluZyhlbmNvZGVyLCB2YWx1ZSkge1xuICAgICAgLy8gcHJlcGFyZSBidWZmZXJcbiAgICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICB2YXIgbWF4c2l6ZSA9IDUgKyBsZW5ndGggKiAzO1xuICAgICAgZW5jb2Rlci5vZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUobWF4c2l6ZSk7XG4gICAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG5cbiAgICAgIC8vIGV4cGVjdGVkIGhlYWRlciBzaXplXG4gICAgICB2YXIgZXhwZWN0ZWQgPSBoZWFkX3NpemUobGVuZ3RoKTtcblxuICAgICAgLy8gZXhwZWN0ZWQgc3RhcnQgcG9pbnRcbiAgICAgIHZhciBzdGFydCA9IGVuY29kZXIub2Zmc2V0ICsgZXhwZWN0ZWQ7XG5cbiAgICAgIC8vIHdyaXRlIHN0cmluZ1xuICAgICAgbGVuZ3RoID0gQnVmZmVyUHJvdG8ud3JpdGUuY2FsbChidWZmZXIsIHZhbHVlLCBzdGFydCk7XG5cbiAgICAgIC8vIGFjdHVhbCBoZWFkZXIgc2l6ZVxuICAgICAgdmFyIGFjdHVhbCA9IGhlYWRfc2l6ZShsZW5ndGgpO1xuXG4gICAgICAvLyBtb3ZlIGNvbnRlbnQgd2hlbiBuZWVkZWRcbiAgICAgIGlmIChleHBlY3RlZCAhPT0gYWN0dWFsKSB7XG4gICAgICAgIHZhciB0YXJnZXRTdGFydCA9IHN0YXJ0ICsgYWN0dWFsIC0gZXhwZWN0ZWQ7XG4gICAgICAgIHZhciBlbmQgPSBzdGFydCArIGxlbmd0aDtcbiAgICAgICAgQnVmZmVyUHJvdG8uY29weS5jYWxsKGJ1ZmZlciwgYnVmZmVyLCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdyaXRlIGhlYWRlclxuICAgICAgdmFyIHR5cGUgPSAoYWN0dWFsID09PSAxKSA/ICgweGEwICsgbGVuZ3RoKSA6IChhY3R1YWwgPD0gMykgPyAoMHhkNyArIGFjdHVhbCkgOiAweGRiO1xuICAgICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgICAgLy8gbW92ZSBjdXJzb3JcbiAgICAgIGVuY29kZXIub2Zmc2V0ICs9IGxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3QoZW5jb2RlciwgdmFsdWUpIHtcbiAgICAvLyBudWxsXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gbmlsKGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIEJ1ZmZlclxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHJldHVybiBiaW4oZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gQXJyYXlcbiAgICBpZiAoSVNfQVJSQVkodmFsdWUpKSByZXR1cm4gYXJyYXkoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gaW50NjQtYnVmZmVyIG9iamVjdHNcbiAgICBpZiAoVWludDY0QkUuaXNVaW50NjRCRSh2YWx1ZSkpIHJldHVybiB1aW50NjQoZW5jb2RlciwgdmFsdWUpO1xuICAgIGlmIChJbnQ2NEJFLmlzSW50NjRCRSh2YWx1ZSkpIHJldHVybiBpbnQ2NChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBleHQgZm9ybWF0c1xuICAgIHZhciBwYWNrZXIgPSBlbmNvZGVyLmNvZGVjLmdldEV4dFBhY2tlcih2YWx1ZSk7XG4gICAgaWYgKHBhY2tlcikgdmFsdWUgPSBwYWNrZXIodmFsdWUpO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEV4dEJ1ZmZlcikgcmV0dXJuIGV4dChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBwbGFpbiBvbGQgT2JqZWN0cyBvciBNYXBcbiAgICBtYXAoZW5jb2RlciwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0X3JhdyhlbmNvZGVyLCB2YWx1ZSkge1xuICAgIC8vIEJ1ZmZlclxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHJldHVybiByYXcoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gb3RoZXJzXG4gICAgb2JqZWN0KGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIC8vIG5pbCAtLSAweGMwXG4gIGZ1bmN0aW9uIG5pbChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gMHhjMDtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICAvLyBmaXhhcnJheSAtLSAweDkwIC0gMHg5ZlxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgZnVuY3Rpb24gYXJyYXkoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDE2KSA/ICgweDkwICsgbGVuZ3RoKSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4ZGMgOiAweGRkO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG5cbiAgICB2YXIgZW5jb2RlID0gZW5jb2Rlci5jb2RlYy5lbmNvZGU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgZW5jb2RlKGVuY29kZXIsIHZhbHVlW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIGZ1bmN0aW9uIGJpbl9idWZmZXIoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDB4RkYpID8gMHhjNCA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4YzUgOiAweGM2O1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG4gICAgZW5jb2Rlci5zZW5kKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbl9hcnJheWJ1ZmZlcihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIGJpbl9idWZmZXIoZW5jb2RlciwgbmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgfVxuXG4gIC8vIGZpeGV4dCAxIC0tIDB4ZDRcbiAgLy8gZml4ZXh0IDIgLS0gMHhkNVxuICAvLyBmaXhleHQgNCAtLSAweGQ2XG4gIC8vIGZpeGV4dCA4IC0tIDB4ZDdcbiAgLy8gZml4ZXh0IDE2IC0tIDB4ZDhcbiAgLy8gZXh0IDggLS0gMHhjN1xuICAvLyBleHQgMTYgLS0gMHhjOFxuICAvLyBleHQgMzIgLS0gMHhjOVxuICBmdW5jdGlvbiBleHQoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgYnVmZmVyID0gdmFsdWUuYnVmZmVyO1xuICAgIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gZXh0bWFwW2xlbmd0aF0gfHwgKChsZW5ndGggPCAweEZGKSA/IDB4YzcgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGM4IDogMHhjOSk7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcbiAgICB1aW50OFt2YWx1ZS50eXBlXShlbmNvZGVyKTtcbiAgICBlbmNvZGVyLnNlbmQoYnVmZmVyKTtcbiAgfVxuXG4gIC8vIGZpeG1hcCAtLSAweDgwIC0gMHg4ZlxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICBmdW5jdGlvbiBvYmpfdG9fbWFwKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB0eXBlID0gKGxlbmd0aCA8IDE2KSA/ICgweDgwICsgbGVuZ3RoKSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4ZGUgOiAweGRmO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIGxlbmd0aCk7XG5cbiAgICB2YXIgZW5jb2RlID0gZW5jb2Rlci5jb2RlYy5lbmNvZGU7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgZW5jb2RlKGVuY29kZXIsIGtleSk7XG4gICAgICBlbmNvZGUoZW5jb2RlciwgdmFsdWVba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBmaXhtYXAgLS0gMHg4MCAtIDB4OGZcbiAgLy8gbWFwIDE2IC0tIDB4ZGVcbiAgLy8gbWFwIDMyIC0tIDB4ZGZcbiAgZnVuY3Rpb24gbWFwX3RvX21hcChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgTWFwKSkgcmV0dXJuIG9ial90b19tYXAoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlLnNpemU7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMTYpID8gKDB4ODAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkZSA6IDB4ZGY7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgIHZhciBlbmNvZGUgPSBlbmNvZGVyLmNvZGVjLmVuY29kZTtcbiAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwga2V5LCBtKSB7XG4gICAgICBlbmNvZGUoZW5jb2Rlciwga2V5KTtcbiAgICAgIGVuY29kZShlbmNvZGVyLCB2YWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmF3IDE2IC0tIDB4ZGFcbiAgLy8gcmF3IDMyIC0tIDB4ZGJcbiAgLy8gZml4cmF3IC0tIDB4YTAgLSAweGJmXG4gIGZ1bmN0aW9uIHJhdyhlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMzIpID8gKDB4YTAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkYSA6IDB4ZGI7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcbiAgICBlbmNvZGVyLnNlbmQodmFsdWUpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXR5cGUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHdyaXRlLXRva2VuLmpzXG5cbnZhciBpZWVlNzU0ID0gcmVxdWlyZShcImllZWU3NTRcIik7XG52YXIgSW50NjRCdWZmZXIgPSByZXF1aXJlKFwiaW50NjQtYnVmZmVyXCIpO1xudmFyIFVpbnQ2NEJFID0gSW50NjRCdWZmZXIuVWludDY0QkU7XG52YXIgSW50NjRCRSA9IEludDY0QnVmZmVyLkludDY0QkU7XG5cbnZhciB1aW50OCA9IHJlcXVpcmUoXCIuL3dyaXRlLXVpbnQ4XCIpLnVpbnQ4O1xudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xudmFyIElTX0JVRkZFUl9TSElNID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiAoXCJUWVBFRF9BUlJBWV9TVVBQT1JUXCIgaW4gQnVmZmVyKTtcbnZhciBOT19UWVBFRF9BUlJBWSA9IElTX0JVRkZFUl9TSElNICYmICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVDtcbnZhciBCdWZmZXJfcHJvdG90eXBlID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiBCdWZmZXIucHJvdG90eXBlIHx8IHt9O1xuXG5leHBvcnRzLmdldFdyaXRlVG9rZW4gPSBnZXRXcml0ZVRva2VuO1xuXG5mdW5jdGlvbiBnZXRXcml0ZVRva2VuKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy51aW50OGFycmF5KSB7XG4gICAgcmV0dXJuIGluaXRfdWludDhhcnJheSgpO1xuICB9IGVsc2UgaWYgKE5PX1RZUEVEX0FSUkFZIHx8IChCdWZmZXJpc2guaGFzQnVmZmVyICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5zYWZlKSkge1xuICAgIHJldHVybiBpbml0X3NhZmUoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5pdF90b2tlbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRfdWludDhhcnJheSgpIHtcbiAgdmFyIHRva2VuID0gaW5pdF90b2tlbigpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IHdyaXRlTigweGNhLCA0LCB3cml0ZUZsb2F0QkUpO1xuICB0b2tlblsweGNiXSA9IHdyaXRlTigweGNiLCA4LCB3cml0ZURvdWJsZUJFKTtcblxuICByZXR1cm4gdG9rZW47XG59XG5cbi8vIE5vZGUuanMgYW5kIGJyb3dzZXJzIHdpdGggVHlwZWRBcnJheVxuXG5mdW5jdGlvbiBpbml0X3Rva2VuKCkge1xuICAvLyAoaW1tZWRpYXRlIHZhbHVlcylcbiAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gIC8vIG5pbCAtLSAweGMwXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICB2YXIgdG9rZW4gPSB1aW50OC5zbGljZSgpO1xuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgdG9rZW5bMHhjNF0gPSB3cml0ZTEoMHhjNCk7XG4gIHRva2VuWzB4YzVdID0gd3JpdGUyKDB4YzUpO1xuICB0b2tlblsweGM2XSA9IHdyaXRlNCgweGM2KTtcblxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIHRva2VuWzB4YzddID0gd3JpdGUxKDB4YzcpO1xuICB0b2tlblsweGM4XSA9IHdyaXRlMigweGM4KTtcbiAgdG9rZW5bMHhjOV0gPSB3cml0ZTQoMHhjOSk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gd3JpdGVOKDB4Y2EsIDQsIChCdWZmZXJfcHJvdG90eXBlLndyaXRlRmxvYXRCRSB8fCB3cml0ZUZsb2F0QkUpLCB0cnVlKTtcbiAgdG9rZW5bMHhjYl0gPSB3cml0ZU4oMHhjYiwgOCwgKEJ1ZmZlcl9wcm90b3R5cGUud3JpdGVEb3VibGVCRSB8fCB3cml0ZURvdWJsZUJFKSwgdHJ1ZSk7XG5cbiAgLy8gdWludCA4IC0tIDB4Y2NcbiAgLy8gdWludCAxNiAtLSAweGNkXG4gIC8vIHVpbnQgMzIgLS0gMHhjZVxuICAvLyB1aW50IDY0IC0tIDB4Y2ZcbiAgdG9rZW5bMHhjY10gPSB3cml0ZTEoMHhjYyk7XG4gIHRva2VuWzB4Y2RdID0gd3JpdGUyKDB4Y2QpO1xuICB0b2tlblsweGNlXSA9IHdyaXRlNCgweGNlKTtcbiAgdG9rZW5bMHhjZl0gPSB3cml0ZU4oMHhjZiwgOCwgd3JpdGVVSW50NjRCRSk7XG5cbiAgLy8gaW50IDggLS0gMHhkMFxuICAvLyBpbnQgMTYgLS0gMHhkMVxuICAvLyBpbnQgMzIgLS0gMHhkMlxuICAvLyBpbnQgNjQgLS0gMHhkM1xuICB0b2tlblsweGQwXSA9IHdyaXRlMSgweGQwKTtcbiAgdG9rZW5bMHhkMV0gPSB3cml0ZTIoMHhkMSk7XG4gIHRva2VuWzB4ZDJdID0gd3JpdGU0KDB4ZDIpO1xuICB0b2tlblsweGQzXSA9IHdyaXRlTigweGQzLCA4LCB3cml0ZUludDY0QkUpO1xuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgdG9rZW5bMHhkOV0gPSB3cml0ZTEoMHhkOSk7XG4gIHRva2VuWzB4ZGFdID0gd3JpdGUyKDB4ZGEpO1xuICB0b2tlblsweGRiXSA9IHdyaXRlNCgweGRiKTtcblxuICAvLyBhcnJheSAxNiAtLSAweGRjXG4gIC8vIGFycmF5IDMyIC0tIDB4ZGRcbiAgdG9rZW5bMHhkY10gPSB3cml0ZTIoMHhkYyk7XG4gIHRva2VuWzB4ZGRdID0gd3JpdGU0KDB4ZGQpO1xuXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIHRva2VuWzB4ZGVdID0gd3JpdGUyKDB4ZGUpO1xuICB0b2tlblsweGRmXSA9IHdyaXRlNCgweGRmKTtcblxuICByZXR1cm4gdG9rZW47XG59XG5cbi8vIHNhZmUgbW9kZTogZm9yIG9sZCBicm93c2VycyBhbmQgd2hvIG5lZWRzIGFzc2VydHNcblxuZnVuY3Rpb24gaW5pdF9zYWZlKCkge1xuICAvLyAoaW1tZWRpYXRlIHZhbHVlcylcbiAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gIC8vIG5pbCAtLSAweGMwXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICB2YXIgdG9rZW4gPSB1aW50OC5zbGljZSgpO1xuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgdG9rZW5bMHhjNF0gPSB3cml0ZU4oMHhjNCwgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhjNV0gPSB3cml0ZU4oMHhjNSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhjNl0gPSB3cml0ZU4oMHhjNiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIHRva2VuWzB4YzddID0gd3JpdGVOKDB4YzcsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCk7XG4gIHRva2VuWzB4YzhdID0gd3JpdGVOKDB4YzgsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4YzldID0gd3JpdGVOKDB4YzksIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gd3JpdGVOKDB4Y2EsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFKTtcbiAgdG9rZW5bMHhjYl0gPSB3cml0ZU4oMHhjYiwgOCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFKTtcblxuICAvLyB1aW50IDggLS0gMHhjY1xuICAvLyB1aW50IDE2IC0tIDB4Y2RcbiAgLy8gdWludCAzMiAtLSAweGNlXG4gIC8vIHVpbnQgNjQgLS0gMHhjZlxuICB0b2tlblsweGNjXSA9IHdyaXRlTigweGNjLCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGNkXSA9IHdyaXRlTigweGNkLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGNlXSA9IHdyaXRlTigweGNlLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuICB0b2tlblsweGNmXSA9IHdyaXRlTigweGNmLCA4LCB3cml0ZVVJbnQ2NEJFKTtcblxuICAvLyBpbnQgOCAtLSAweGQwXG4gIC8vIGludCAxNiAtLSAweGQxXG4gIC8vIGludCAzMiAtLSAweGQyXG4gIC8vIGludCA2NCAtLSAweGQzXG4gIHRva2VuWzB4ZDBdID0gd3JpdGVOKDB4ZDAsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4KTtcbiAgdG9rZW5bMHhkMV0gPSB3cml0ZU4oMHhkMSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUpO1xuICB0b2tlblsweGQyXSA9IHdyaXRlTigweGQyLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSk7XG4gIHRva2VuWzB4ZDNdID0gd3JpdGVOKDB4ZDMsIDgsIHdyaXRlSW50NjRCRSk7XG5cbiAgLy8gc3RyIDggLS0gMHhkOVxuICAvLyBzdHIgMTYgLS0gMHhkYVxuICAvLyBzdHIgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IHdyaXRlTigweGQ5LCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGRhXSA9IHdyaXRlTigweGRhLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGRiXSA9IHdyaXRlTigweGRiLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIGFycmF5IDE2IC0tIDB4ZGNcbiAgLy8gYXJyYXkgMzIgLS0gMHhkZFxuICB0b2tlblsweGRjXSA9IHdyaXRlTigweGRjLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGRkXSA9IHdyaXRlTigweGRkLCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIHRva2VuWzB4ZGVdID0gd3JpdGVOKDB4ZGUsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4ZGZdID0gd3JpdGVOKDB4ZGYsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB3cml0ZTEodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDIpO1xuICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBidWZmZXJbb2Zmc2V0XSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZTIodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDMpO1xuICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDg7XG4gICAgYnVmZmVyW29mZnNldF0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JpdGU0KHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZSg1KTtcbiAgICB2YXIgYnVmZmVyID0gZW5jb2Rlci5idWZmZXI7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHR5cGU7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiAyNDtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDE2O1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSA+Pj4gODtcbiAgICBidWZmZXJbb2Zmc2V0XSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZU4odHlwZSwgbGVuLCBtZXRob2QsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUobGVuICsgMSk7XG4gICAgZW5jb2Rlci5idWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBtZXRob2QuY2FsbChlbmNvZGVyLmJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZVVJbnQ2NEJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgbmV3IFVpbnQ2NEJFKHRoaXMsIG9mZnNldCwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUludDY0QkUodmFsdWUsIG9mZnNldCkge1xuICBuZXcgSW50NjRCRSh0aGlzLCBvZmZzZXQsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdEJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgaWVlZTc1NC53cml0ZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpO1xufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZUJFKHZhbHVlLCBvZmZzZXQpIHtcbiAgaWVlZTc1NC53cml0ZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi93cml0ZS10b2tlbi5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LXVucGFja2VyLmpzXG5cbmV4cG9ydHMuc2V0RXh0VW5wYWNrZXJzID0gc2V0RXh0VW5wYWNrZXJzO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG52YXIgX2RlY29kZTtcblxudmFyIEVSUk9SX0NPTFVNTlMgPSB7bmFtZTogMSwgbWVzc2FnZTogMSwgc3RhY2s6IDEsIGNvbHVtbk51bWJlcjogMSwgZmlsZU5hbWU6IDEsIGxpbmVOdW1iZXI6IDF9O1xuXG5mdW5jdGlvbiBzZXRFeHRVbnBhY2tlcnMoY29kZWMpIHtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwRSwgW2RlY29kZSwgdW5wYWNrRXJyb3IoRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDEsIFtkZWNvZGUsIHVucGFja0Vycm9yKEV2YWxFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwMiwgW2RlY29kZSwgdW5wYWNrRXJyb3IoUmFuZ2VFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwMywgW2RlY29kZSwgdW5wYWNrRXJyb3IoUmVmZXJlbmNlRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDQsIFtkZWNvZGUsIHVucGFja0Vycm9yKFN5bnRheEVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDA1LCBbZGVjb2RlLCB1bnBhY2tFcnJvcihUeXBlRXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDYsIFtkZWNvZGUsIHVucGFja0Vycm9yKFVSSUVycm9yKV0pO1xuXG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEEsIFtkZWNvZGUsIHVucGFja1JlZ0V4cF0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBCLCBbZGVjb2RlLCB1bnBhY2tDbGFzcyhCb29sZWFuKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBDLCBbZGVjb2RlLCB1bnBhY2tDbGFzcyhTdHJpbmcpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEQsIFtkZWNvZGUsIHVucGFja0NsYXNzKERhdGUpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEYsIFtkZWNvZGUsIHVucGFja0NsYXNzKE51bWJlcildKTtcblxuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDExLCB1bnBhY2tDbGFzcyhJbnQ4QXJyYXkpKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDEyLCB1bnBhY2tDbGFzcyhVaW50OEFycmF5KSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxMywgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhJbnQxNkFycmF5KV0pO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTQsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoVWludDE2QXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNSwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhJbnQzMkFycmF5KV0pO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTYsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoVWludDMyQXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNywgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhGbG9hdDMyQXJyYXkpXSk7XG5cbiAgICAvLyBQaGFudG9tSlMvMS45LjcgZG9lc24ndCBoYXZlIEZsb2F0NjRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgRmxvYXQ2NEFycmF5KSB7XG4gICAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE4LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEZsb2F0NjRBcnJheSldKTtcbiAgICB9XG5cbiAgICAvLyBJRTEwIGRvZXNuJ3QgaGF2ZSBVaW50OENsYW1wZWRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTksIHVucGFja0NsYXNzKFVpbnQ4Q2xhbXBlZEFycmF5KSk7XG4gICAgfVxuXG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxQSwgdW5wYWNrQXJyYXlCdWZmZXIpO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MUQsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoRGF0YVZpZXcpXSk7XG4gIH1cblxuICBpZiAoQnVmZmVyaXNoLmhhc0J1ZmZlcikge1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MUIsIHVucGFja0NsYXNzKEJ1ZmZlcikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICBpZiAoIV9kZWNvZGUpIF9kZWNvZGUgPSByZXF1aXJlKFwiLi9kZWNvZGVcIikuZGVjb2RlOyAvLyBsYXp5IGxvYWRcbiAgcmV0dXJuIF9kZWNvZGUoaW5wdXQpO1xufVxuXG5mdW5jdGlvbiB1bnBhY2tSZWdFeHAodmFsdWUpIHtcbiAgcmV0dXJuIFJlZ0V4cC5hcHBseShudWxsLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHVucGFja0Vycm9yKENsYXNzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBvdXQgPSBuZXcgQ2xhc3MoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gRVJST1JfQ09MVU1OUykge1xuICAgICAgb3V0W2tleV0gPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9O1xufVxuXG5mdW5jdGlvbiB1bnBhY2tDbGFzcyhDbGFzcykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IENsYXNzKHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdW5wYWNrQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuIChuZXcgVWludDhBcnJheSh2YWx1ZSkpLmJ1ZmZlcjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LXVucGFja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZWFkLXRva2VuLmpzXG5cbnZhciBSZWFkRm9ybWF0ID0gcmVxdWlyZShcIi4vcmVhZC1mb3JtYXRcIik7XG5cbmV4cG9ydHMuZ2V0UmVhZFRva2VuID0gZ2V0UmVhZFRva2VuO1xuXG5mdW5jdGlvbiBnZXRSZWFkVG9rZW4ob3B0aW9ucykge1xuICB2YXIgZm9ybWF0ID0gUmVhZEZvcm1hdC5nZXRSZWFkRm9ybWF0KG9wdGlvbnMpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMudXNlcmF3KSB7XG4gICAgcmV0dXJuIGluaXRfdXNlcmF3KGZvcm1hdCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGluaXRfdG9rZW4oZm9ybWF0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0X3Rva2VuKGZvcm1hdCkge1xuICB2YXIgaTtcbiAgdmFyIHRva2VuID0gbmV3IEFycmF5KDI1Nik7XG5cbiAgLy8gcG9zaXRpdmUgZml4aW50IC0tIDB4MDAgLSAweDdmXG4gIGZvciAoaSA9IDB4MDA7IGkgPD0gMHg3ZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBjb25zdGFudChpKTtcbiAgfVxuXG4gIC8vIGZpeG1hcCAtLSAweDgwIC0gMHg4ZlxuICBmb3IgKGkgPSAweDgwOyBpIDw9IDB4OGY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweDgwLCBmb3JtYXQubWFwKTtcbiAgfVxuXG4gIC8vIGZpeGFycmF5IC0tIDB4OTAgLSAweDlmXG4gIGZvciAoaSA9IDB4OTA7IGkgPD0gMHg5ZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4OTAsIGZvcm1hdC5hcnJheSk7XG4gIH1cblxuICAvLyBmaXhzdHIgLS0gMHhhMCAtIDB4YmZcbiAgZm9yIChpID0gMHhhMDsgaSA8PSAweGJmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGZpeChpIC0gMHhhMCwgZm9ybWF0LnN0cik7XG4gIH1cblxuICAvLyBuaWwgLS0gMHhjMFxuICB0b2tlblsweGMwXSA9IGNvbnN0YW50KG51bGwpO1xuXG4gIC8vIChuZXZlciB1c2VkKSAtLSAweGMxXG4gIHRva2VuWzB4YzFdID0gbnVsbDtcblxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICB0b2tlblsweGMyXSA9IGNvbnN0YW50KGZhbHNlKTtcbiAgdG9rZW5bMHhjM10gPSBjb25zdGFudCh0cnVlKTtcblxuICAvLyBiaW4gOCAtLSAweGM0XG4gIC8vIGJpbiAxNiAtLSAweGM1XG4gIC8vIGJpbiAzMiAtLSAweGM2XG4gIHRva2VuWzB4YzRdID0gZmxleChmb3JtYXQudWludDgsIGZvcm1hdC5iaW4pO1xuICB0b2tlblsweGM1XSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0LmJpbik7XG4gIHRva2VuWzB4YzZdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQuYmluKTtcblxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIHRva2VuWzB4YzddID0gZmxleChmb3JtYXQudWludDgsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGM4XSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4YzldID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQuZXh0KTtcblxuICAvLyBmbG9hdCAzMiAtLSAweGNhXG4gIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgdG9rZW5bMHhjYV0gPSBmb3JtYXQuZmxvYXQzMjtcbiAgdG9rZW5bMHhjYl0gPSBmb3JtYXQuZmxvYXQ2NDtcblxuICAvLyB1aW50IDggLS0gMHhjY1xuICAvLyB1aW50IDE2IC0tIDB4Y2RcbiAgLy8gdWludCAzMiAtLSAweGNlXG4gIC8vIHVpbnQgNjQgLS0gMHhjZlxuICB0b2tlblsweGNjXSA9IGZvcm1hdC51aW50ODtcbiAgdG9rZW5bMHhjZF0gPSBmb3JtYXQudWludDE2O1xuICB0b2tlblsweGNlXSA9IGZvcm1hdC51aW50MzI7XG4gIHRva2VuWzB4Y2ZdID0gZm9ybWF0LnVpbnQ2NDtcblxuICAvLyBpbnQgOCAtLSAweGQwXG4gIC8vIGludCAxNiAtLSAweGQxXG4gIC8vIGludCAzMiAtLSAweGQyXG4gIC8vIGludCA2NCAtLSAweGQzXG4gIHRva2VuWzB4ZDBdID0gZm9ybWF0LmludDg7XG4gIHRva2VuWzB4ZDFdID0gZm9ybWF0LmludDE2O1xuICB0b2tlblsweGQyXSA9IGZvcm1hdC5pbnQzMjtcbiAgdG9rZW5bMHhkM10gPSBmb3JtYXQuaW50NjQ7XG5cbiAgLy8gZml4ZXh0IDEgLS0gMHhkNFxuICAvLyBmaXhleHQgMiAtLSAweGQ1XG4gIC8vIGZpeGV4dCA0IC0tIDB4ZDZcbiAgLy8gZml4ZXh0IDggLS0gMHhkN1xuICAvLyBmaXhleHQgMTYgLS0gMHhkOFxuICB0b2tlblsweGQ0XSA9IGZpeCgxLCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhkNV0gPSBmaXgoMiwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDZdID0gZml4KDQsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ3XSA9IGZpeCg4LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhkOF0gPSBmaXgoMTYsIGZvcm1hdC5leHQpO1xuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgdG9rZW5bMHhkOV0gPSBmbGV4KGZvcm1hdC51aW50OCwgZm9ybWF0LnN0cik7XG4gIHRva2VuWzB4ZGFdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuc3RyKTtcbiAgdG9rZW5bMHhkYl0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5zdHIpO1xuXG4gIC8vIGFycmF5IDE2IC0tIDB4ZGNcbiAgLy8gYXJyYXkgMzIgLS0gMHhkZFxuICB0b2tlblsweGRjXSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0LmFycmF5KTtcbiAgdG9rZW5bMHhkZF0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5hcnJheSk7XG5cbiAgLy8gbWFwIDE2IC0tIDB4ZGVcbiAgLy8gbWFwIDMyIC0tIDB4ZGZcbiAgdG9rZW5bMHhkZV0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5tYXApO1xuICB0b2tlblsweGRmXSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0Lm1hcCk7XG5cbiAgLy8gbmVnYXRpdmUgZml4aW50IC0tIDB4ZTAgLSAweGZmXG4gIGZvciAoaSA9IDB4ZTA7IGkgPD0gMHhmZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBjb25zdGFudChpIC0gMHgxMDApO1xuICB9XG5cbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiBpbml0X3VzZXJhdyhmb3JtYXQpIHtcbiAgdmFyIGk7XG4gIHZhciB0b2tlbiA9IGluaXRfdG9rZW4oZm9ybWF0KS5zbGljZSgpO1xuXG4gIC8vIHJhdyA4IC0tIDB4ZDlcbiAgLy8gcmF3IDE2IC0tIDB4ZGFcbiAgLy8gcmF3IDMyIC0tIDB4ZGJcbiAgdG9rZW5bMHhkOV0gPSB0b2tlblsweGM0XTtcbiAgdG9rZW5bMHhkYV0gPSB0b2tlblsweGM1XTtcbiAgdG9rZW5bMHhkYl0gPSB0b2tlblsweGM2XTtcblxuICAvLyBmaXhyYXcgLS0gMHhhMCAtIDB4YmZcbiAgZm9yIChpID0gMHhhMDsgaSA8PSAweGJmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGZpeChpIC0gMHhhMCwgZm9ybWF0LmJpbik7XG4gIH1cblxuICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZsZXgobGVuRnVuYywgZGVjb2RlRnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24oZGVjb2Rlcikge1xuICAgIHZhciBsZW4gPSBsZW5GdW5jKGRlY29kZXIpO1xuICAgIHJldHVybiBkZWNvZGVGdW5jKGRlY29kZXIsIGxlbik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpeChsZW4sIG1ldGhvZCkge1xuICByZXR1cm4gZnVuY3Rpb24oZGVjb2Rlcikge1xuICAgIHJldHVybiBtZXRob2QoZGVjb2RlciwgbGVuKTtcbiAgfTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC10b2tlbi5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZW5jb2Rlci5qc1xuXG5leHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyO1xuXG52YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG52YXIgRW5jb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZW5jb2RlLWJ1ZmZlclwiKS5FbmNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIEVuY29kZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRW5jb2RlcikpIHJldHVybiBuZXcgRW5jb2RlcihvcHRpb25zKTtcbiAgRW5jb2RlQnVmZmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbkVuY29kZXIucHJvdG90eXBlID0gbmV3IEVuY29kZUJ1ZmZlcigpO1xuXG5FdmVudExpdGUubWl4aW4oRW5jb2Rlci5wcm90b3R5cGUpO1xuXG5FbmNvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihjaHVuaykge1xuICB0aGlzLndyaXRlKGNodW5rKTtcbiAgdGhpcy5lbWl0KFwiZGF0YVwiLCB0aGlzLnJlYWQoKSk7XG59O1xuXG5FbmNvZGVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihjaHVuaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy5lbmNvZGUoY2h1bmspO1xuICB0aGlzLmZsdXNoKCk7XG4gIHRoaXMuZW1pdChcImVuZFwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2VuY29kZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGRlY29kZXIuanNcblxuZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjtcblxudmFyIEV2ZW50TGl0ZSA9IHJlcXVpcmUoXCJldmVudC1saXRlXCIpO1xudmFyIERlY29kZUJ1ZmZlciA9IHJlcXVpcmUoXCIuL2RlY29kZS1idWZmZXJcIikuRGVjb2RlQnVmZmVyO1xuXG5mdW5jdGlvbiBEZWNvZGVyKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIERlY29kZXIpKSByZXR1cm4gbmV3IERlY29kZXIob3B0aW9ucyk7XG4gIERlY29kZUJ1ZmZlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZSA9IG5ldyBEZWNvZGVCdWZmZXIoKTtcblxuRXZlbnRMaXRlLm1peGluKERlY29kZXIucHJvdG90eXBlKTtcblxuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHRoaXMud3JpdGUoY2h1bmspO1xuICB0aGlzLmZsdXNoKCk7XG59O1xuXG5EZWNvZGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgdGhpcy5lbWl0KFwiZGF0YVwiLCBjaHVuayk7XG59O1xuXG5EZWNvZGVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihjaHVuaykge1xuICB0aGlzLmRlY29kZShjaHVuayk7XG4gIHRoaXMuZW1pdChcImVuZFwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2RlY29kZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGV4dC5qc1xuXG4vLyBsb2FkIGJvdGggaW50ZXJmYWNlc1xucmVxdWlyZShcIi4vcmVhZC1jb3JlXCIpO1xucmVxdWlyZShcIi4vd3JpdGUtY29yZVwiKTtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IHJlcXVpcmUoXCIuL2NvZGVjLWJhc2VcIikuY3JlYXRlQ29kZWM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2V4dC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY29kZWMuanNcblxuLy8gbG9hZCBib3RoIGludGVyZmFjZXNcbnJlcXVpcmUoXCIuL3JlYWQtY29yZVwiKTtcbnJlcXVpcmUoXCIuL3dyaXRlLWNvcmVcIik7XG5cbi8vIEBwdWJsaWNcbi8vIG1zZ3BhY2suY29kZWMucHJlc2V0XG5cbmV4cG9ydHMuY29kZWMgPSB7XG4gIHByZXNldDogcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKS5wcmVzZXRcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2NvZGVjLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFByaW9yaXR5U2lnbmFsXzEgPSByZXF1aXJlKFwiLi9Qcmlvcml0eVNpZ25hbFwiKTtcbi8qKlxuICogQWxsb3dzIHRoZSB2YWx1ZUNsYXNzZXMgdG8gYmUgc2V0IGluIE1YTUwsIGUuZy5cbiAqIDxzaWduYWxzOlNpZ25hbCBpZD1cIm5hbWVDaGFuZ2VkXCI+e1tTdHJpbmcsIHVpbnRdfTwvc2lnbmFsczpTaWduYWw+XG4gKi9cbi8qW0RlZmF1bHRQcm9wZXJ0eShcInZhbHVlQ2xhc3Nlc1wiKV0qL1xuLyoqXG4gKiBTaWduYWwgZGlzcGF0Y2hlcyBldmVudHMgdG8gbXVsdGlwbGUgbGlzdGVuZXJzLlxuICogSXQgaXMgaW5zcGlyZWQgYnkgQyMgZXZlbnRzIGFuZCBkZWxlZ2F0ZXMsIGFuZCBieVxuICogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NpZ25hbHNfYW5kX3Nsb3RzXCI+c2lnbmFscyBhbmQgc2xvdHM8L2E+XG4gKiBpbiBRdC5cbiAqIEEgU2lnbmFsIGFkZHMgZXZlbnQgZGlzcGF0Y2hpbmcgZnVuY3Rpb25hbGl0eSB0aHJvdWdoIGNvbXBvc2l0aW9uIGFuZCBpbnRlcmZhY2VzLFxuICogcmF0aGVyIHRoYW4gaW5oZXJpdGluZyBmcm9tIGEgZGlzcGF0Y2hlci5cbiAqIDxici8+PGJyLz5cbiAqIFByb2plY3QgaG9tZTogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvXCI+aHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzLzwvYT5cbiAqL1xudmFyIERlbHV4ZVNpZ25hbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERlbHV4ZVNpZ25hbCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgRGVsdXhlU2lnbmFsIGluc3RhbmNlIHRvIGRpc3BhdGNoIGV2ZW50cyBvbiBiZWhhbGYgb2YgYSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSAgICB0YXJnZXQgVGhlIG9iamVjdCB0aGUgc2lnbmFsIGlzIGRpc3BhdGNoaW5nIGV2ZW50cyBvbiBiZWhhbGYgb2YuXG4gICAgICogQHBhcmFtICAgIHZhbHVlQ2xhc3NlcyBBbnkgbnVtYmVyIG9mIGNsYXNzIHJlZmVyZW5jZXMgdGhhdCBlbmFibGUgdHlwZSBjaGVja3MgaW4gZGlzcGF0Y2goKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgbmV3IERlbHV4ZVNpZ25hbCh0aGlzLCBTdHJpbmcsIHVpbnQpXG4gICAgICogd291bGQgYWxsb3c6IHNpZ25hbC5kaXNwYXRjaChcInRoZSBBbnN3ZXJcIiwgNDIpXG4gICAgICogYnV0IG5vdDogc2lnbmFsLmRpc3BhdGNoKHRydWUsIDQyLjUpXG4gICAgICogbm9yOiBzaWduYWwuZGlzcGF0Y2goKVxuICAgICAqXG4gICAgICogTk9URTogU3ViY2xhc3NlcyBjYW5ub3QgY2FsbCBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLFxuICAgICAqIGJ1dCB0aGlzIGNvbnN0cnVjdG9yIGhhcyBsb2dpYyB0byBzdXBwb3J0IHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGVsdXhlU2lnbmFsKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB2b2lkIDApIHsgdGFyZ2V0ID0gbnVsbDsgfVxuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB2YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZUNsYXNzZXMpIHx8IHRoaXM7XG4gICAgICAgIC8vQENIQU5HRUQgLSB0aGlzIHdhcyB0aGUgZmlyc3QgY2FsbCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgLy9UeXBlc2NyaXB0IGRvZXMgbm90IGFsbG93IFwidGhpc1wiIHRvIGJlIGNhbGxlZCBiZWZvcmUgc3VwZXJcbiAgICAgICAgX3RoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVsdXhlU2lnbmFsLnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuX3RhcmdldClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBEZWx1eGVTaWduYWwucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWVPYmplY3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0ZSB2YWx1ZSBvYmplY3RzIGFnYWluc3QgcHJlLWRlZmluZWQgdmFsdWUgY2xhc3Nlcy5cbiAgICAgICAgdmFyIG51bVZhbHVlQ2xhc3NlcyA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7XG4gICAgICAgIHZhciBudW1WYWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHMubGVuZ3RoO1xuICAgICAgICBpZiAobnVtVmFsdWVPYmplY3RzIDwgbnVtVmFsdWVDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXQgbGVhc3QgJyArIG51bVZhbHVlQ2xhc3NlcyArICcgYnV0IHJlY2VpdmVkICcgK1xuICAgICAgICAgICAgICAgIG51bVZhbHVlT2JqZWN0cyArICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGRpZmZlcmVudGx5IHR5cGVkIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVZhbHVlQ2xhc3NlczsgaSsrKSB7XG4gICAgICAgICAgICAvLyBPcHRpbWl6ZWQgZm9yIHRoZSBvcHRpbWlzdGljIGNhc2UgdGhhdCB2YWx1ZXMgYXJlIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodmFsdWVPYmplY3RzW2ldID09PSBudWxsIHx8IHZhbHVlT2JqZWN0c1tpXS5jb25zdHJ1Y3RvciA9PT0gdGhpcy5fdmFsdWVDbGFzc2VzW2ldKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBvYmplY3QgPCcgKyB2YWx1ZU9iamVjdHNbaV1cbiAgICAgICAgICAgICAgICArICc+IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiA8JyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSArICc+LicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4dHJhY3QgYW5kIGNsb25lIGV2ZW50IG9iamVjdCBpZiBuZWNlc3NhcnkuXG4gICAgICAgIHZhciBldmVudCA9IHZhbHVlT2JqZWN0c1swXTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHZhbHVlT2JqZWN0c1swXSA9IGV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBldmVudC5zaWduYWwgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJyb2FkY2FzdCB0byBsaXN0ZW5lcnMuXG4gICAgICAgIHZhciBzbG90c1RvUHJvY2VzcyA9IHRoaXMuc2xvdHM7XG4gICAgICAgIHdoaWxlIChzbG90c1RvUHJvY2Vzcy5ub25FbXB0eSkge1xuICAgICAgICAgICAgc2xvdHNUb1Byb2Nlc3MuaGVhZC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgICAgICBzbG90c1RvUHJvY2VzcyA9IHNsb3RzVG9Qcm9jZXNzLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnViYmxlIHRoZSBldmVudCBhcyBmYXIgYXMgcG9zc2libGUuXG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LmJ1YmJsZXMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBjdXJyZW50VGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChjdXJyZW50VGFyZ2V0ICYmIGN1cnJlbnRUYXJnZXQuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRcIikpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0W1wicGFyZW50XCJdO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQub25FdmVudEJ1YmJsZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIC8vIG9uRXZlbnRCdWJibGVkKCkgY2FuIHN0b3AgdGhlIGJ1YmJsaW5nIGJ5IHJldHVybmluZyBmYWxzZS5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRhcmdldC5vbkV2ZW50QnViYmxlZChldmVudCkpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGVsdXhlU2lnbmFsO1xufShQcmlvcml0eVNpZ25hbF8xLlByaW9yaXR5U2lnbmFsKSk7XG5leHBvcnRzLkRlbHV4ZVNpZ25hbCA9IERlbHV4ZVNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlbHV4ZVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL0RlbHV4ZVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqXG4gKiBAc2VlIG9yZy5vc2ZsYXNoLnNpZ25hbHMuZXZlbnRzLklFdmVudFxuICogRG9jdW1lbnRhdGlvbiBmb3IgdGhlIGV2ZW50IGludGVyZmFjZSBiZWluZyBtYWludGFpbmVkIGluIElFdmVudCB0byBhdm9pZCBkdXBsaWNhdGlvbiBmb3Igbm93LlxuICovXG52YXIgR2VuZXJpY0V2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHZW5lcmljRXZlbnQoYnViYmxlcykge1xuICAgICAgICBpZiAoYnViYmxlcyA9PT0gdm9pZCAwKSB7IGJ1YmJsZXMgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLl9idWJibGVzID0gYnViYmxlcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwic2lnbmFsXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25hbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJpY0V2ZW50LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHZW5lcmljRXZlbnQucHJvdG90eXBlLCBcImN1cnJlbnRUYXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwiYnViYmxlc1wiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWJibGVzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYnViYmxlcyA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBHZW5lcmljRXZlbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNFdmVudCh0aGlzLl9idWJibGVzKTtcbiAgICB9O1xuICAgIHJldHVybiBHZW5lcmljRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5HZW5lcmljRXZlbnQgPSBHZW5lcmljRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HZW5lcmljRXZlbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9ldmVudHMvR2VuZXJpY0V2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0cy5JT25jZVNpZ25hbCA9IFN5bWJvbChcIklPbmNlU2lnbmFsXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SU9uY2VTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqXG4gKi9cbmV4cG9ydHMuSVByaW9yaXR5U2lnbmFsID0gU3ltYm9sKFwiSVByaW9yaXR5U2lnbmFsXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVByaW9yaXR5U2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVByaW9yaXR5U2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0cy5JU2lnbmFsID0gU3ltYm9sKFwiSVNpZ25hbFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIElTbG90IGludGVyZmFjZSBkZWZpbmVzIHRoZSBiYXNpYyBwcm9wZXJ0aWVzIG9mIGFcbiAqIGxpc3RlbmVyIGFzc29jaWF0ZWQgd2l0aCBhIFNpZ25hbC5cbiAqXG4gKiBAYXV0aG9yIEpvYSBFYmVydFxuICogQGF1dGhvciBSb2JlcnQgUGVubmVyXG4gKi9cbmV4cG9ydHMuSVNsb3QgPSBTeW1ib2woXCJJU2xvdFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlTbG90LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNsb3QuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNsb3RfMSA9IHJlcXVpcmUoXCIuL1Nsb3RcIik7XG4vKipcbiAqIEFsbG93cyB0aGUgdmFsdWVDbGFzc2VzIHRvIGJlIHNldCBpbiBNWE1MLCBlLmcuXG4gKiA8c2lnbmFsczpTaWduYWwgaWQ9XCJuYW1lQ2hhbmdlZFwiPntbU3RyaW5nLCB1aW50XX08L3NpZ25hbHM6U2lnbmFsPlxuICovXG4vKltEZWZhdWx0UHJvcGVydHkoXCJ2YWx1ZUNsYXNzZXNcIildKi9cbi8qKlxuICogQSBNb25vU2lnbmFsIGNhbiBoYXZlIG9ubHkgb25lIGxpc3RlbmVyLlxuICovXG52YXIgTW9ub1NpZ25hbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE1vbm9TaWduYWwgaW5zdGFuY2UgdG8gZGlzcGF0Y2ggdmFsdWUgb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gICAgdmFsdWVDbGFzc2VzIEFueSBudW1iZXIgb2YgY2xhc3MgcmVmZXJlbmNlcyB0aGF0IGVuYWJsZSB0eXBlIGNoZWNrcyBpbiBkaXNwYXRjaCgpLlxuICAgICAqIEZvciBleGFtcGxlLCBuZXcgU2lnbmFsKFN0cmluZywgdWludClcbiAgICAgKiB3b3VsZCBhbGxvdzogc2lnbmFsLmRpc3BhdGNoKFwidGhlIEFuc3dlclwiLCA0MilcbiAgICAgKiBidXQgbm90OiBzaWduYWwuZGlzcGF0Y2godHJ1ZSwgNDIuNSlcbiAgICAgKiBub3I6IHNpZ25hbC5kaXNwYXRjaCgpXG4gICAgICpcbiAgICAgKiBOT1RFOiBTdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNb25vU2lnbmFsKCkge1xuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHRoaXMudmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb25vU2lnbmFsLnByb3RvdHlwZSwgXCJ2YWx1ZUNsYXNzZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogaXRlbSBhdCBpbmRleCBzaG91bGQgYmUgYSBDbGFzcyBidXQgd2FzIG5vdC5cbiAgICAgICAgICovXG4gICAgICAgIC8qW0FycmF5RWxlbWVudFR5cGUoXCJDbGFzc1wiKV0qL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBDbG9uZSBzbyB0aGUgQXJyYXkgY2Fubm90IGJlIGFmZmVjdGVkIGZyb20gb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2xhc3NlcyA9IHZhbHVlID8gdmFsdWUuc2xpY2UoKSA6IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl92YWx1ZUNsYXNzZXNbaV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZUNsYXNzZXMgYXJndW1lbnQ6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW0gYXQgaW5kZXggJyArIGkgKyAnIHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXM6PCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSk7IC8vQENIQU5HRUQgLSB0ZW1wIHJlcGxhY2VtZW50IGZvciBnZXRRdWFsaWZpZWRDbGFzc0J5TmFtZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9ub1NpZ25hbC5wcm90b3R5cGUsIFwibnVtTGlzdGVuZXJzXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdCA/IDEgOiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5hZGRPbmNlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgTW9ub1NpZ25hbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNsb3QgJiYgdGhpcy5zbG90Lmxpc3RlbmVyID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgdGhlU2xvdCA9IHRoaXMuc2xvdDtcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhlU2xvdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xvdClcbiAgICAgICAgICAgIHRoaXMuc2xvdC5yZW1vdmUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdmFsdWVDbGFzc2VzIGlzIGVtcHR5LCB2YWx1ZSBvYmplY3RzIGFyZSBub3QgdHlwZS1jaGVja2VkLlxuICAgICAgICB2YXIgbnVtVmFsdWVDbGFzc2VzID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBmZXdlciBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA8IG51bVZhbHVlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGF0IGxlYXN0ICcgKyBudW1WYWx1ZUNsYXNzZXMgKyAnIGJ1dCByZWNlaXZlZCAnICtcbiAgICAgICAgICAgICAgICBudW1WYWx1ZU9iamVjdHMgKyAnLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBkaWZmZXJlbnRseSB0eXBlZCBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1WYWx1ZUNsYXNzZXM7IGkrKykge1xuICAgICAgICAgICAgLy8gT3B0aW1pemVkIGZvciB0aGUgb3B0aW1pc3RpYyBjYXNlIHRoYXQgdmFsdWVzIGFyZSBjb3JyZWN0LlxuICAgICAgICAgICAgaWYgKHZhbHVlT2JqZWN0c1tpXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICh2YWx1ZU9iamVjdHNbaV0gaW5zdGFuY2VvZiB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gfHwgdmFsdWVPYmplY3RzW2ldLmNvbnN0cnVjdG9yID09PSB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG9iamVjdCA8JyArIHZhbHVlT2JqZWN0c1tpXVxuICAgICAgICAgICAgICAgICsgJz4gaXMgbm90IGFuIGluc3RhbmNlIG9mIDwnICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRvIHRoZSBvbmUgbGlzdGVuZXIuXG4gICAgICAgIGlmICh0aGlzLnNsb3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIGV4aXRzIHByZXZpb3VzbHkgYWRkZWQsIGRlZmluaXRlbHkgZG9uJ3QgYWRkIGl0LlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnNsb3QgPSBuZXcgU2xvdF8xLlNsb3QobGlzdGVuZXIsIHRoaXMsIG9uY2UpKTtcbiAgICB9O1xuICAgIHJldHVybiBNb25vU2lnbmFsO1xufSgpKTtcbmV4cG9ydHMuTW9ub1NpZ25hbCA9IE1vbm9TaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Nb25vU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvTW9ub1NpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBPbmNlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9PbmNlU2lnbmFsXCIpO1xudmFyIFByb21pc2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9taXNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgLypvdmVycmlkZSovXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuYWRkT25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2xvdCA9IF9zdXBlci5wcm90b3R5cGUuYWRkT25jZS5jYWxsKHRoaXMsIGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgICBzbG90LmV4ZWN1dGUodGhpcy52YWx1ZU9iamVjdHMpO1xuICAgICAgICAgICAgc2xvdC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2xvdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgZGlzcGF0Y2goKSBhIFByb21pc2UgbW9yZSB0aGFuIG9uY2VcbiAgICAgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBQcm9taXNlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IGRpc3BhdGNoKCkgYSBQcm9taXNlIG1vcmUgdGhhbiBvbmNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3BhdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHM7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRpc3BhdGNoLmFwcGx5KHRoaXMsIHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQcm9taXNlO1xufShPbmNlU2lnbmFsXzEuT25jZVNpZ25hbCkpO1xuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVByb21pc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Qcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBDbG9jayA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2xvY2sodXNlSW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHVzZUludGVydmFsID09PSB2b2lkIDApIHsgdXNlSW50ZXJ2YWwgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3cgPSAodHlwZW9mICh3aW5kb3cpICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICYmICh3aW5kb3cucGVyZm9ybWFuY2Uubm93KS5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSkpIHx8IERhdGUubm93O1xuICAgICAgICB0aGlzLnN0YXJ0KHVzZUludGVydmFsKTtcbiAgICB9XG4gICAgQ2xvY2sucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKHVzZUludGVydmFsKSB7XG4gICAgICAgIGlmICh1c2VJbnRlcnZhbCA9PT0gdm9pZCAwKSB7IHVzZUludGVydmFsID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5ub3coKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIGlmICh1c2VJbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gYXV0byBzZXQgaW50ZXJ2YWwgdG8gNjAgdGlja3MgcGVyIHNlY29uZFxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2xvY2sucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDbG9jay5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uIChuZXdUaW1lKSB7XG4gICAgICAgIGlmIChuZXdUaW1lID09PSB2b2lkIDApIHsgbmV3VGltZSA9IHRoaXMubm93KCk7IH1cbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSBuZXdUaW1lIC0gdGhpcy5jdXJyZW50VGltZTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IG5ld1RpbWU7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gdGhpcy5kZWx0YVRpbWU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2xvY2s7XG59KCkpO1xubW9kdWxlLmV4cG9ydHMgPSBDbG9jaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vY2xvY2svZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRGVsdGFDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0RlbHRhQ29udGFpbmVyXCIpO1xuZXhwb3J0cy5EZWx0YUNvbnRhaW5lciA9IERlbHRhQ29udGFpbmVyXzEuRGVsdGFDb250YWluZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGNvbXBhcmVfMSA9IHJlcXVpcmUoXCIuL2NvbXBhcmVcIik7XG52YXIgRGVsdGFDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlbHRhQ29udGFpbmVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXRjaGVyUGxhY2Vob2xkZXJzID0ge1xuICAgICAgICAgICAgXCI6aWRcIjogL14oW2EtekEtWjAtOVxcLV9dKykkLyxcbiAgICAgICAgICAgIFwiOm51bWJlclwiOiAvXihbMC05XSspJC8sXG4gICAgICAgICAgICBcIjpzdHJpbmdcIjogL14oXFx3KykkLyxcbiAgICAgICAgICAgIFwiOmF4aXNcIjogL14oW3h5el0pJC8sXG4gICAgICAgICAgICBcIjoqXCI6IC8oLiopLyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKG5ld0RhdGEpIHtcbiAgICAgICAgdmFyIHBhdGNoZXMgPSBjb21wYXJlXzEuY29tcGFyZSh0aGlzLmRhdGEsIG5ld0RhdGEpO1xuICAgICAgICB0aGlzLmNoZWNrUGF0Y2hlcyhwYXRjaGVzKTtcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3RGF0YTtcbiAgICAgICAgcmV0dXJuIHBhdGNoZXM7XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUucmVnaXN0ZXJQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIChwbGFjZWhvbGRlciwgbWF0Y2hlcikge1xuICAgICAgICB0aGlzLm1hdGNoZXJQbGFjZWhvbGRlcnNbcGxhY2Vob2xkZXJdID0gbWF0Y2hlcjtcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5saXN0ZW4gPSBmdW5jdGlvbiAoc2VnbWVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBydWxlcztcbiAgICAgICAgaWYgKHR5cGVvZiAoc2VnbWVudHMpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJ1bGVzID0gW107XG4gICAgICAgICAgICBjYWxsYmFjayA9IHNlZ21lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcnVsZXMgPSBzZWdtZW50cy5zcGxpdChcIi9cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0ge1xuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgcmF3UnVsZXM6IHJ1bGVzLFxuICAgICAgICAgICAgcnVsZXM6IHJ1bGVzLm1hcChmdW5jdGlvbiAoc2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHNlZ21lbnQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgcGxhY2Vob2xkZXIgbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzZWdtZW50LmluZGV4T2YoXCI6XCIpID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdGhpcy5tYXRjaGVyUGxhY2Vob2xkZXJzW3NlZ21lbnRdIHx8IF90aGlzLm1hdGNoZXJQbGFjZWhvbGRlcnNbXCI6KlwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgUmVnRXhwKFwiXlwiICsgc2VnbWVudCArIFwiJFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWdtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIGlmIChydWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdExpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUuY2hlY2tQYXRjaGVzID0gZnVuY3Rpb24gKHBhdGNoZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHBhdGNoZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1tqXTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aFZhcmlhYmxlcyA9IHRoaXMuZ2V0UGF0aFZhcmlhYmxlcyhwYXRjaGVzW2ldLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKHBhdGhWYXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aFZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogcGF0Y2hlc1tpXS5vcGVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGF0Y2hlc1tpXS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGZhbGxiYWNrIGxpc3RlbmVyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWQgJiYgdGhpcy5kZWZhdWx0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRMaXN0ZW5lci5jYWxsYmFjayhwYXRjaGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLmdldFBhdGhWYXJpYWJsZXMgPSBmdW5jdGlvbiAocGF0Y2gsIGxpc3RlbmVyKSB7XG4gICAgICAgIC8vIHNraXAgaWYgcnVsZXMgY291bnQgZGlmZmVyIGZyb20gcGF0Y2hcbiAgICAgICAgaWYgKHBhdGNoLnBhdGgubGVuZ3RoICE9PSBsaXN0ZW5lci5ydWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGF0aCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGlzdGVuZXIucnVsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gcGF0Y2gucGF0aFtpXS5tYXRjaChsaXN0ZW5lci5ydWxlc1tpXSk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPT09IDAgfHwgbWF0Y2hlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGlzdGVuZXIucmF3UnVsZXNbaV0uc3Vic3RyKDAsIDEpID09PSBcIjpcIikge1xuICAgICAgICAgICAgICAgIHBhdGhbbGlzdGVuZXIucmF3UnVsZXNbaV0uc3Vic3RyKDEpXSA9IG1hdGNoZXNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgfTtcbiAgICByZXR1cm4gRGVsdGFDb250YWluZXI7XG59KCkpO1xuZXhwb3J0cy5EZWx0YUNvbnRhaW5lciA9IERlbHRhQ29udGFpbmVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZGVsdGEtbGlzdGVuZXIvbGliL0RlbHRhQ29udGFpbmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGNvbXBhcmUodHJlZTEsIHRyZWUyKSB7XG4gICAgdmFyIHBhdGNoZXMgPSBbXTtcbiAgICBnZW5lcmF0ZSh0cmVlMSwgdHJlZTIsIHBhdGNoZXMsIFtdKTtcbiAgICByZXR1cm4gcGF0Y2hlcztcbn1cbmV4cG9ydHMuY29tcGFyZSA9IGNvbXBhcmU7XG5mdW5jdGlvbiBkZWVwQ2xvbmUob2JqKSB7XG4gICAgc3dpdGNoICh0eXBlb2Ygb2JqKSB7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpOyAvL0Zhc3RlciB0aGFuIEVTNSBjbG9uZSAtIGh0dHA6Ly9qc3BlcmYuY29tL2RlZXAtY2xvbmluZy1vZi1vYmplY3RzLzVcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vdGhpcyBpcyBob3cgSlNPTi5zdHJpbmdpZnkgYmVoYXZlcyBmb3IgYXJyYXkgaXRlbXNcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBvYmo7IC8vbm8gbmVlZCB0byBjbG9uZSBwcmltaXRpdmVzXG4gICAgfVxufVxuZnVuY3Rpb24gb2JqZWN0S2V5cyhvYmopIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHZhciBrZXlzID0gbmV3IEFycmF5KG9iai5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGtleXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGtleXNba10gPSBcIlwiICsgaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIGtleXMucHVzaChpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn1cbjtcbi8vIERpcnR5IGNoZWNrIGlmIG9iaiBpcyBkaWZmZXJlbnQgZnJvbSBtaXJyb3IsIGdlbmVyYXRlIHBhdGNoZXMgYW5kIHVwZGF0ZSBtaXJyb3JcbmZ1bmN0aW9uIGdlbmVyYXRlKG1pcnJvciwgb2JqLCBwYXRjaGVzLCBwYXRoKSB7XG4gICAgdmFyIG5ld0tleXMgPSBvYmplY3RLZXlzKG9iaik7XG4gICAgdmFyIG9sZEtleXMgPSBvYmplY3RLZXlzKG1pcnJvcik7XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgZGVsZXRlZCA9IGZhbHNlO1xuICAgIGZvciAodmFyIHQgPSBvbGRLZXlzLmxlbmd0aCAtIDE7IHQgPj0gMDsgdC0tKSB7XG4gICAgICAgIHZhciBrZXkgPSBvbGRLZXlzW3RdO1xuICAgICAgICB2YXIgb2xkVmFsID0gbWlycm9yW2tleV07XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhKG9ialtrZXldID09PSB1bmRlZmluZWQgJiYgb2xkVmFsICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShvYmopID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHZhciBuZXdWYWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkVmFsID09IFwib2JqZWN0XCIgJiYgb2xkVmFsICE9IG51bGwgJiYgdHlwZW9mIG5ld1ZhbCA9PSBcIm9iamVjdFwiICYmIG5ld1ZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGUob2xkVmFsLCBuZXdWYWwsIHBhdGNoZXMsIHBhdGguY29uY2F0KGtleSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbCAhPT0gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2goeyBvcGVyYXRpb246IFwicmVwbGFjZVwiLCBwYXRoOiBwYXRoLmNvbmNhdChrZXkpLCB2YWx1ZTogZGVlcENsb25lKG5ld1ZhbCkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHsgb3BlcmF0aW9uOiBcInJlbW92ZVwiLCBwYXRoOiBwYXRoLmNvbmNhdChrZXkpIH0pO1xuICAgICAgICAgICAgZGVsZXRlZCA9IHRydWU7IC8vIHByb3BlcnR5IGhhcyBiZWVuIGRlbGV0ZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWRlbGV0ZWQgJiYgbmV3S2V5cy5sZW5ndGggPT0gb2xkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG5ld0tleXMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgdmFyIGtleSA9IG5ld0tleXNbdF07XG4gICAgICAgIGlmICghbWlycm9yLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHsgb3BlcmF0aW9uOiBcImFkZFwiLCBwYXRoOiBwYXRoLmNvbmNhdChrZXkpLCB2YWx1ZTogZGVlcENsb25lKG9ialtrZXldKSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RlbHRhLWxpc3RlbmVyL2xpYi9jb21wYXJlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBGb3NzaWwgU0NNIGRlbHRhIGNvbXByZXNzaW9uIGFsZ29yaXRobVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBGb3JtYXQ6XG4vLyBodHRwOi8vd3d3LmZvc3NpbC1zY20ub3JnL2luZGV4Lmh0bWwvZG9jL3RpcC93d3cvZGVsdGFfZm9ybWF0Lndpa2lcbi8vXG4vLyBBbGdvcml0aG06XG4vLyBodHRwOi8vd3d3LmZvc3NpbC1zY20ub3JnL2luZGV4Lmh0bWwvZG9jL3RpcC93d3cvZGVsdGFfZW5jb2Rlcl9hbGdvcml0aG0ud2lraVxuLy9cbi8vIE9yaWdpbmFsIGltcGxlbWVudGF0aW9uOlxuLy8gaHR0cDovL3d3dy5mb3NzaWwtc2NtLm9yZy9pbmRleC5odG1sL2FydGlmYWN0L2QxYjA1OThhZGNkNjUwYjM1NTFmNjNiMTdkZmM4NjRlNzM3NzVjM2Rcbi8vXG4vLyBMSUNFTlNFXG4vLyAtLS0tLS0tXG4vL1xuLy8gQ29weXJpZ2h0IDIwMTQgRG1pdHJ5IENoZXN0bnlraCAoSmF2YVNjcmlwdCBwb3J0KVxuLy8gQ29weXJpZ2h0IDIwMDcgRC4gUmljaGFyZCBIaXBwICAob3JpZ2luYWwgQyB2ZXJzaW9uKVxuLy8gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vXG4vLyBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yXG4vLyB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbi8vXG4vLyAgIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmVcbi8vICAgICAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZVxuLy8gICAgICBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbi8vXG4vLyAgIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmVcbi8vICAgICAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZVxuLy8gICAgICBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXJcbi8vICAgICAgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbi8vXG4vLyBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBBVVRIT1JTIGBgQVMgSVMnJyBBTkQgQU5ZIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4vLyBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0Vcbi8vIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT05UUklCVVRPUlMgQkVcbi8vIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1Jcbi8vIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4vLyBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1Jcbi8vIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuLy8gV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0Vcbi8vIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsXG4vLyBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuLy9cbi8vIFRoZSB2aWV3cyBhbmQgY29uY2x1c2lvbnMgY29udGFpbmVkIGluIHRoZSBzb2Z0d2FyZSBhbmQgZG9jdW1lbnRhdGlvblxuLy8gYXJlIHRob3NlIG9mIHRoZSBhdXRob3JzIGFuZCBjb250cmlidXRvcnMgYW5kIHNob3VsZCBub3QgYmUgaW50ZXJwcmV0ZWRcbi8vIGFzIHJlcHJlc2VudGluZyBvZmZpY2lhbCBwb2xpY2llcywgZWl0aGVyIGV4cHJlc3NlZCBvciBpbXBsaWVkLCBvZiBhbnlib2R5XG4vLyBlbHNlLlxuLy9cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIGVsc2Ugcm9vdC5mb3NzaWxEZWx0YSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9zc2lsRGVsdGEgPSB7fTtcblxuLy8gSGFzaCB3aW5kb3cgd2lkdGggaW4gYnl0ZXMuIE11c3QgYmUgYSBwb3dlciBvZiB0d28uXG52YXIgTkhBU0ggPSAxNjtcblxuZnVuY3Rpb24gUm9sbGluZ0hhc2goKSB7XG4gIHRoaXMuYSA9IDA7IC8vIGhhc2ggICAgICgxNi1iaXQgdW5zaWduZWQpXG4gIHRoaXMuYiA9IDA7IC8vIHZhbHVlcyAgICgxNi1iaXQgdW5zaWduZWQpXG4gIHRoaXMuaSA9IDA7IC8vIHN0YXJ0IG9mIHRoZSBoYXNoIHdpbmRvdyAoMTYtYml0IHVuc2lnbmVkKVxuICB0aGlzLnogPSBuZXcgQXJyYXkoTkhBU0gpOyAvLyB0aGUgdmFsdWVzIHRoYXQgaGF2ZSBiZWVuIGhhc2hlZC5cbn1cblxuLy8gSW5pdGlhbGl6ZSB0aGUgcm9sbGluZyBoYXNoIHVzaW5nIHRoZSBmaXJzdCBOSEFTSCBieXRlcyBvZlxuLy8geiBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24uXG5Sb2xsaW5nSGFzaC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHosIHBvcykge1xuICB2YXIgYSA9IDAsIGIgPSAwLCBpLCB4O1xuICBmb3IoaSA9IDA7IGkgPCBOSEFTSDsgaSsrKXtcbiAgICB4ID0geltwb3MraV07XG4gICAgYSA9IChhICsgeCkgJiAweGZmZmY7XG4gICAgYiA9IChiICsgKE5IQVNILWkpKngpICYgMHhmZmZmO1xuICAgIHRoaXMueltpXSA9IHg7XG4gIH1cbiAgdGhpcy5hID0gYSAmIDB4ZmZmZjtcbiAgdGhpcy5iID0gYiAmIDB4ZmZmZjtcbiAgdGhpcy5pID0gMDtcbn07XG5cbi8vIEFkdmFuY2UgdGhlIHJvbGxpbmcgaGFzaCBieSBhIHNpbmdsZSBieXRlIFwiY1wiLlxuUm9sbGluZ0hhc2gucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbihjKSB7XG4gIHZhciBvbGQgPSB0aGlzLnpbdGhpcy5pXTtcbiAgdGhpcy56W3RoaXMuaV0gPSBjO1xuICB0aGlzLmkgPSAodGhpcy5pKzEpJihOSEFTSC0xKTtcbiAgdGhpcy5hID0gKHRoaXMuYSAtIG9sZCArIGMpICYgMHhmZmZmO1xuICB0aGlzLmIgPSAodGhpcy5iIC0gTkhBU0gqb2xkICsgdGhpcy5hKSAmIDB4ZmZmZjtcbn07XG5cbi8vIFJldHVybiBhIDMyLWJpdCBoYXNoIHZhbHVlLlxuUm9sbGluZ0hhc2gucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAoKHRoaXMuYSAmIDB4ZmZmZikgfCAodGhpcy5iICYgMHhmZmZmKTw8MTYpPj4+MDtcbn07XG5cbnZhciB6RGlnaXRzID0gXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpfYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp+XCIuXG4gICAgICAgICAgICAgICAgc3BsaXQoJycpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5jaGFyQ29kZUF0KDApOyB9KTtcblxudmFyIHpWYWx1ZSA9IFtcbiAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAgIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSxcbiAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAgIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSxcbiAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAgIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSxcbiAgIDAsICAxLCAgMiwgIDMsICA0LCAgNSwgIDYsICA3LCAgICA4LCAgOSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSxcbiAgLTEsIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAgIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzLCAyNCxcbiAgMjUsIDI2LCAyNywgMjgsIDI5LCAzMCwgMzEsIDMyLCAgIDMzLCAzNCwgMzUsIC0xLCAtMSwgLTEsIC0xLCAzNixcbiAgLTEsIDM3LCAzOCwgMzksIDQwLCA0MSwgNDIsIDQzLCAgIDQ0LCA0NSwgNDYsIDQ3LCA0OCwgNDksIDUwLCA1MSxcbiAgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgNTgsIDU5LCAgIDYwLCA2MSwgNjIsIC0xLCAtMSwgLTEsIDYzLCAtMVxuXTtcblxuLy8gUmVhZGVyIHJlYWRzIGJ5dGVzLCBjaGFycywgaW50cyBmcm9tIGFycmF5LlxuZnVuY3Rpb24gUmVhZGVyKGFycmF5KSB7XG4gIHRoaXMuYSA9IGFycmF5OyAvLyBzb3VyY2UgYXJyYXlcbiAgdGhpcy5wb3MgPSAwOyAgIC8vIGN1cnJlbnQgcG9zaXRpb24gaW4gYXJyYXlcbn1cblxuUmVhZGVyLnByb3RvdHlwZS5oYXZlQnl0ZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucG9zIDwgdGhpcy5hLmxlbmd0aDtcbn07XG5cblJlYWRlci5wcm90b3R5cGUuZ2V0Qnl0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYiA9IHRoaXMuYVt0aGlzLnBvc107XG4gIHRoaXMucG9zKys7XG4gIGlmICh0aGlzLnBvcyA+IHRoaXMuYS5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgYm91bmRzJyk7XG4gIHJldHVybiBiO1xufTtcblxuUmVhZGVyLnByb3RvdHlwZS5nZXRDaGFyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuZ2V0Qnl0ZSgpKTtcbn07XG5cbiAgLy8gUmVhZCBiYXNlNjQtZW5jb2RlZCB1bnNpZ25lZCBpbnRlZ2VyLlxuUmVhZGVyLnByb3RvdHlwZS5nZXRJbnQgPSBmdW5jdGlvbigpe1xuICB2YXIgdiA9IDAsIGM7XG4gIHdoaWxlKHRoaXMuaGF2ZUJ5dGVzKCkgJiYgKGMgPSB6VmFsdWVbMHg3ZiAmIHRoaXMuZ2V0Qnl0ZSgpXSkgPj0gMCkge1xuICAgICB2ID0gKHY8PDYpICsgYztcbiAgfVxuICB0aGlzLnBvcy0tO1xuICByZXR1cm4gdiA+Pj4gMDtcbn07XG5cblxuLy8gV3JpdGUgd3JpdGVzIGFuIGFycmF5LlxuZnVuY3Rpb24gV3JpdGVyKCkge1xuICB0aGlzLmEgPSBbXTtcbn1cblxuV3JpdGVyLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmE7XG59O1xuXG5Xcml0ZXIucHJvdG90eXBlLnB1dEJ5dGUgPSBmdW5jdGlvbihiKSB7XG4gIHRoaXMuYS5wdXNoKGIgJiAweGZmKTtcbn07XG5cbi8vIFdyaXRlIGFuIEFTQ0lJIGNoYXJhY3RlciAocyBpcyBhIG9uZS1jaGFyIHN0cmluZykuXG5Xcml0ZXIucHJvdG90eXBlLnB1dENoYXIgPSBmdW5jdGlvbihzKSB7XG4gIHRoaXMucHV0Qnl0ZShzLmNoYXJDb2RlQXQoMCkpO1xufTtcblxuLy8gV3JpdGUgYSBiYXNlNjQgdW5zaWduZWQgaW50ZWdlci5cbldyaXRlci5wcm90b3R5cGUucHV0SW50ID0gZnVuY3Rpb24odil7XG4gIHZhciBpLCBqLCB6QnVmID0gW107XG4gIGlmICh2ID09PSAwKSB7XG4gICAgdGhpcy5wdXRDaGFyKCcwJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoaSA9IDA7IHYgPiAwOyBpKyssIHYgPj4+PSA2KVxuICAgIHpCdWYucHVzaCh6RGlnaXRzW3YmMHgzZl0pO1xuICBmb3IgKGogPSBpLTE7IGogPj0gMDsgai0tKVxuICAgIHRoaXMucHV0Qnl0ZSh6QnVmW2pdKTtcbn07XG5cbi8vIENvcHkgZnJvbSBhcnJheSBhdCBzdGFydCB0byBlbmQuXG5Xcml0ZXIucHJvdG90eXBlLnB1dEFycmF5ID0gZnVuY3Rpb24oYSwgc3RhcnQsIGVuZCkge1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykgdGhpcy5hLnB1c2goYVtpXSk7XG59O1xuXG4vLyBSZXR1cm4gdGhlIG51bWJlciBkaWdpdHMgaW4gdGhlIGJhc2U2NCByZXByZXNlbnRhdGlvbiBvZiBhIHBvc2l0aXZlIGludGVnZXIuXG5mdW5jdGlvbiBkaWdpdENvdW50KHYpe1xuICB2YXIgaSwgeDtcbiAgZm9yIChpID0gMSwgeCA9IDY0OyB2ID49IHg7IGkrKywgeCA8PD0gNil7IC8qIG5vdGhpbmcgKi8gfVxuICByZXR1cm4gaTtcbn1cblxuLy8gUmV0dXJuIGEgMzItYml0IGNoZWNrc3VtIG9mIHRoZSBhcnJheS5cbmZ1bmN0aW9uIGNoZWNrc3VtKGFycikge1xuICB2YXIgc3VtMCA9IDAsIHN1bTEgPSAwLCBzdW0yID0gMCwgc3VtMyA9IDAsXG4gICAgICB6ID0gMCwgTiA9IGFyci5sZW5ndGg7XG4gIC8vVE9ETyBtZWFzdXJlIGlmIHRoaXMgdW5yb2xsaW5nIGlzIGhlbHBmdWwuXG4gIHdoaWxlIChOID49IDE2KSB7XG4gICAgc3VtMCA9IHN1bTAgKyBhcnJbeiswXSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeisxXSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisyXSB8IDA7XG4gICAgc3VtMyA9IHN1bTMgKyBhcnJbeiszXSB8IDA7XG5cbiAgICBzdW0wID0gc3VtMCArIGFyclt6KzRdIHwgMDtcbiAgICBzdW0xID0gc3VtMSArIGFyclt6KzVdIHwgMDtcbiAgICBzdW0yID0gc3VtMiArIGFyclt6KzZdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzddIHwgMDtcblxuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orOF0gfCAwO1xuICAgIHN1bTEgPSBzdW0xICsgYXJyW3orOV0gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orMTBdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzExXSB8IDA7XG5cbiAgICBzdW0wID0gc3VtMCArIGFyclt6KzEyXSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeisxM10gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orMTRdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzE1XSB8IDA7XG5cbiAgICB6ICs9IDE2O1xuICAgIE4gLT0gMTY7XG4gIH1cbiAgd2hpbGUgKE4gPj0gNCkge1xuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orMF0gfCAwO1xuICAgIHN1bTEgPSBzdW0xICsgYXJyW3orMV0gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orMl0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orM10gfCAwO1xuICAgIHogKz0gNDtcbiAgICBOIC09IDQ7XG4gIH1cbiAgc3VtMyA9ICgoKHN1bTMgKyAoc3VtMiA8PCA4KSB8IDApICsgKHN1bTEgPDwgMTYpIHwgMCkgKyAoc3VtMCA8PCAyNCkgfCAwKTtcbiAgLyoganNoaW50IC1XMDg2ICovXG4gIHN3aXRjaCAoTikge1xuICAgIGNhc2UgMzogc3VtMyA9IHN1bTMgKyAoYXJyW3orMl0gPDwgIDgpIHwgMDsgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgIGNhc2UgMjogc3VtMyA9IHN1bTMgKyAoYXJyW3orMV0gPDwgMTYpIHwgMDsgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgIGNhc2UgMTogc3VtMyA9IHN1bTMgKyAoYXJyW3orMF0gPDwgMjQpIHwgMDsgLyogZmFsbHMgdGhyb3VnaCAqL1xuICB9XG4gIHJldHVybiBzdW0zID4+PiAwO1xufVxuXG4vLyBDcmVhdGUgYSBuZXcgZGVsdGEgZnJvbSBzcmMgdG8gb3V0LlxuZm9zc2lsRGVsdGEuY3JlYXRlID0gZnVuY3Rpb24oc3JjLCBvdXQpIHtcbiAgdmFyIHpEZWx0YSA9IG5ldyBXcml0ZXIoKTtcbiAgdmFyIGxlbk91dCA9IG91dC5sZW5ndGg7XG4gIHZhciBsZW5TcmMgPSBzcmMubGVuZ3RoO1xuICB2YXIgaSwgbGFzdFJlYWQgPSAtMTtcblxuICB6RGVsdGEucHV0SW50KGxlbk91dCk7XG4gIHpEZWx0YS5wdXRDaGFyKCdcXG4nKTtcblxuICAvLyBJZiB0aGUgc291cmNlIGlzIHZlcnkgc21hbGwsIGl0IG1lYW5zIHRoYXQgd2UgaGF2ZSBub1xuICAvLyBjaGFuY2Ugb2YgZXZlciBkb2luZyBhIGNvcHkgY29tbWFuZC4gIEp1c3Qgb3V0cHV0IGEgc2luZ2xlXG4gIC8vIGxpdGVyYWwgc2VnbWVudCBmb3IgdGhlIGVudGlyZSB0YXJnZXQgYW5kIGV4aXQuXG4gIGlmIChsZW5TcmMgPD0gTkhBU0gpIHtcbiAgICB6RGVsdGEucHV0SW50KGxlbk91dCk7XG4gICAgekRlbHRhLnB1dENoYXIoJzonKTtcbiAgICB6RGVsdGEucHV0QXJyYXkob3V0LCAwLCBsZW5PdXQpO1xuICAgIHpEZWx0YS5wdXRJbnQoY2hlY2tzdW0ob3V0KSk7XG4gICAgekRlbHRhLnB1dENoYXIoJzsnKTtcbiAgICByZXR1cm4gekRlbHRhLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGhhc2ggdGFibGUgdXNlZCB0byBsb2NhdGUgbWF0Y2hpbmcgc2VjdGlvbnMgaW4gdGhlIHNvdXJjZS5cbiAgdmFyIG5IYXNoID0gTWF0aC5jZWlsKGxlblNyYyAvIE5IQVNIKTtcbiAgdmFyIGNvbGxpZGUgPSAgbmV3IEFycmF5KG5IYXNoKTtcbiAgdmFyIGxhbmRtYXJrID0gbmV3IEFycmF5KG5IYXNoKTtcbiAgZm9yIChpID0gMDsgaSA8IGNvbGxpZGUubGVuZ3RoOyBpKyspIGNvbGxpZGVbaV0gPSAtMTtcbiAgZm9yIChpID0gMDsgaSA8IGxhbmRtYXJrLmxlbmd0aDsgaSsrKSBsYW5kbWFya1tpXSA9IC0xO1xuICB2YXIgaHYsIGggPSBuZXcgUm9sbGluZ0hhc2goKTtcbiAgZm9yIChpID0gMDsgaSA8IGxlblNyYy1OSEFTSDsgaSArPSBOSEFTSCkge1xuICAgIGguaW5pdChzcmMsIGkpO1xuICAgIGh2ID0gaC52YWx1ZSgpICUgbkhhc2g7XG4gICAgY29sbGlkZVtpL05IQVNIXSA9IGxhbmRtYXJrW2h2XTtcbiAgICBsYW5kbWFya1todl0gPSBpL05IQVNIO1xuICB9XG5cbiAgdmFyIGJhc2UgPSAwO1xuICB2YXIgaVNyYywgaUJsb2NrLCBiZXN0Q250LCBiZXN0T2ZzdCwgYmVzdExpdHN6O1xuICB3aGlsZSAoYmFzZStOSEFTSDxsZW5PdXQpIHtcbiAgICBiZXN0T2ZzdD0wO1xuICAgIGJlc3RMaXRzej0wO1xuICAgIGguaW5pdChvdXQsIGJhc2UpO1xuICAgIGkgPSAwOyAvLyBUcnlpbmcgdG8gbWF0Y2ggYSBsYW5kbWFyayBhZ2FpbnN0IHpPdXRbYmFzZStpXVxuICAgIGJlc3RDbnQgPSAwO1xuICAgIHdoaWxlKDEpIHtcbiAgICAgIHZhciBsaW1pdCA9IDI1MDtcbiAgICAgIGh2ID0gaC52YWx1ZSgpICUgbkhhc2g7XG4gICAgICBpQmxvY2sgPSBsYW5kbWFya1todl07XG4gICAgICB3aGlsZSAoaUJsb2NrID49IDAgJiYgKGxpbWl0LS0pPjAgKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBoYXNoIHdpbmRvdyBoYXMgaWRlbnRpZmllZCBhIHBvdGVudGlhbCBtYXRjaCBhZ2FpbnN0XG4gICAgICAgIC8vIGxhbmRtYXJrIGJsb2NrIGlCbG9jay4gIEJ1dCB3ZSBuZWVkIHRvIGludmVzdGlnYXRlIGZ1cnRoZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIExvb2sgZm9yIGEgcmVnaW9uIGluIHpPdXQgdGhhdCBtYXRjaGVzIHpTcmMuIEFuY2hvciB0aGUgc2VhcmNoXG4gICAgICAgIC8vIGF0IHpTcmNbaVNyY10gYW5kIHpPdXRbYmFzZStpXS4gIERvIG5vdCBpbmNsdWRlIGFueXRoaW5nIHByaW9yIHRvXG4gICAgICAgIC8vIHpPdXRbYmFzZV0gb3IgYWZ0ZXIgek91dFtvdXRMZW5dIG5vciBhbnl0aGluZyBhZnRlciB6U3JjW3NyY0xlbl0uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjbnQgZXF1YWwgdG8gdGhlIGxlbmd0aCBvZiB0aGUgbWF0Y2ggYW5kIHNldCBvZnN0IHNvIHRoYXRcbiAgICAgICAgLy8gelNyY1tvZnN0XSBpcyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbWF0Y2guICBsaXRzeiBpcyB0aGUgbnVtYmVyXG4gICAgICAgIC8vIG9mIGNoYXJhY3RlcnMgYmV0d2VlbiB6T3V0W2Jhc2VdIGFuZCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBtYXRjaC5cbiAgICAgICAgLy8gc3ogd2lsbCBiZSB0aGUgb3ZlcmhlYWQgKGluIGJ5dGVzKSBuZWVkZWQgdG8gZW5jb2RlIHRoZSBjb3B5XG4gICAgICAgIC8vIGNvbW1hbmQuICBPbmx5IGdlbmVyYXRlIGNvcHkgY29tbWFuZCBpZiB0aGUgb3ZlcmhlYWQgb2YgdGhlXG4gICAgICAgIC8vIGNvcHkgY29tbWFuZCBpcyBsZXNzIHRoYW4gdGhlIGFtb3VudCBvZiBsaXRlcmFsIHRleHQgdG8gYmUgY29waWVkLlxuICAgICAgICAvL1xuICAgICAgICB2YXIgY250LCBvZnN0LCBsaXRzejtcbiAgICAgICAgdmFyIGosIGssIHgsIHk7XG4gICAgICAgIHZhciBzejtcblxuICAgICAgICAvLyBCZWdpbm5pbmcgYXQgaVNyYywgbWF0Y2ggZm9yd2FyZHMgYXMgZmFyIGFzIHdlIGNhbi5cbiAgICAgICAgLy8gaiBjb3VudHMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgbWF0Y2guXG4gICAgICAgIGlTcmMgPSBpQmxvY2sqTkhBU0g7XG4gICAgICAgIGZvciAoaiA9IDAsIHggPSBpU3JjLCB5ID0gYmFzZStpOyB4IDwgbGVuU3JjICYmIHkgPCBsZW5PdXQ7IGorKywgeCsrLCB5KyspIHtcbiAgICAgICAgICBpZiAoc3JjW3hdICE9PSBvdXRbeV0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGotLTtcblxuICAgICAgICAvLyBCZWdpbm5pbmcgYXQgaVNyYy0xLCBtYXRjaCBiYWNrd2FyZHMgYXMgZmFyIGFzIHdlIGNhbi5cbiAgICAgICAgLy8gayBjb3VudHMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgbWF0Y2guXG4gICAgICAgIGZvciAoayA9IDE7IGsgPCBpU3JjICYmIGsgPD0gaTsgaysrKSB7XG4gICAgICAgICAgaWYgKHNyY1tpU3JjLWtdICE9PSBvdXRbYmFzZStpLWtdKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBrLS07XG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgb2Zmc2V0IGFuZCBzaXplIG9mIHRoZSBtYXRjaGluZyByZWdpb24uXG4gICAgICAgIG9mc3QgPSBpU3JjLWs7XG4gICAgICAgIGNudCA9IGoraysxO1xuICAgICAgICBsaXRzeiA9IGktazsgIC8vIE51bWJlciBvZiBieXRlcyBvZiBsaXRlcmFsIHRleHQgYmVmb3JlIHRoZSBjb3B5XG4gICAgICAgIC8vIHN6IHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGJ5dGVzIG5lZWRlZCB0byBlbmNvZGUgdGhlIFwiaW5zZXJ0XCJcbiAgICAgICAgLy8gY29tbWFuZCBhbmQgdGhlIGNvcHkgY29tbWFuZCwgbm90IGNvdW50aW5nIHRoZSBcImluc2VydFwiIHRleHQuXG4gICAgICAgIHN6ID0gZGlnaXRDb3VudChpLWspK2RpZ2l0Q291bnQoY250KStkaWdpdENvdW50KG9mc3QpKzM7XG4gICAgICAgIGlmIChjbnQgPj0gc3ogJiYgY250ID4gYmVzdENudCkge1xuICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgbWF0Y2ggb25seSBpZiBpdCBpcyB0aGUgYmVzdCBzbyBmYXIgYW5kIGl0XG4gICAgICAgICAgLy8gZG9lcyBub3QgaW5jcmVhc2UgdGhlIGZpbGUgc2l6ZS5cbiAgICAgICAgICBiZXN0Q250ID0gY250O1xuICAgICAgICAgIGJlc3RPZnN0ID0gaVNyYy1rO1xuICAgICAgICAgIGJlc3RMaXRzeiA9IGxpdHN6O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhlIG5leHQgbWF0Y2hpbmcgYmxvY2tcbiAgICAgICAgaUJsb2NrID0gY29sbGlkZVtpQmxvY2tdO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBoYXZlIGEgY29weSBjb21tYW5kIHRoYXQgZG9lcyBub3QgY2F1c2UgdGhlIGRlbHRhIHRvIGJlIGxhcmdlclxuICAgICAgLy8gdGhhbiBhIGxpdGVyYWwgaW5zZXJ0LiAgU28gYWRkIHRoZSBjb3B5IGNvbW1hbmQgdG8gdGhlIGRlbHRhLlxuICAgICAgaWYgKGJlc3RDbnQgPiAwKSB7XG4gICAgICAgIGlmIChiZXN0TGl0c3ogPiAwKSB7XG4gICAgICAgICAgLy8gQWRkIGFuIGluc2VydCBjb21tYW5kIGJlZm9yZSB0aGUgY29weS5cbiAgICAgICAgICB6RGVsdGEucHV0SW50KGJlc3RMaXRzeik7XG4gICAgICAgICAgekRlbHRhLnB1dENoYXIoJzonKTtcbiAgICAgICAgICB6RGVsdGEucHV0QXJyYXkob3V0LCBiYXNlLCBiYXNlK2Jlc3RMaXRzeik7XG4gICAgICAgICAgYmFzZSArPSBiZXN0TGl0c3o7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZSArPSBiZXN0Q250O1xuICAgICAgICB6RGVsdGEucHV0SW50KGJlc3RDbnQpO1xuICAgICAgICB6RGVsdGEucHV0Q2hhcignQCcpO1xuICAgICAgICB6RGVsdGEucHV0SW50KGJlc3RPZnN0KTtcbiAgICAgICAgekRlbHRhLnB1dENoYXIoJywnKTtcbiAgICAgICAgaWYgKGJlc3RPZnN0ICsgYmVzdENudCAtMSA+IGxhc3RSZWFkKSB7XG4gICAgICAgICAgbGFzdFJlYWQgPSBiZXN0T2ZzdCArIGJlc3RDbnQgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGJlc3RDbnQgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgcmVhY2ggdGhpcyBwb2ludCwgaXQgbWVhbnMgbm8gbWF0Y2ggaXMgZm91bmQgc28gZmFyXG4gICAgICBpZiAoYmFzZStpK05IQVNIID49IGxlbk91dCl7XG4gICAgICAgIC8vIFdlIGhhdmUgcmVhY2hlZCB0aGUgZW5kIGFuZCBoYXZlIG5vdCBmb3VuZCBhbnlcbiAgICAgICAgLy8gbWF0Y2hlcy4gIERvIGFuIFwiaW5zZXJ0XCIgZm9yIGV2ZXJ5dGhpbmcgdGhhdCBkb2VzIG5vdCBtYXRjaFxuICAgICAgICB6RGVsdGEucHV0SW50KGxlbk91dC1iYXNlKTtcbiAgICAgICAgekRlbHRhLnB1dENoYXIoJzonKTtcbiAgICAgICAgekRlbHRhLnB1dEFycmF5KG91dCwgYmFzZSwgYmFzZStsZW5PdXQtYmFzZSk7XG4gICAgICAgIGJhc2UgPSBsZW5PdXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBBZHZhbmNlIHRoZSBoYXNoIGJ5IG9uZSBjaGFyYWN0ZXIuIEtlZXAgbG9va2luZyBmb3IgYSBtYXRjaC5cbiAgICAgIGgubmV4dChvdXRbYmFzZStpK05IQVNIXSk7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIC8vIE91dHB1dCBhIGZpbmFsIFwiaW5zZXJ0XCIgcmVjb3JkIHRvIGdldCBhbGwgdGhlIHRleHQgYXQgdGhlIGVuZCBvZlxuICAvLyB0aGUgZmlsZSB0aGF0IGRvZXMgbm90IG1hdGNoIGFueXRoaW5nIGluIHRoZSBzb3VyY2UuXG4gIGlmKGJhc2UgPCBsZW5PdXQpIHtcbiAgICB6RGVsdGEucHV0SW50KGxlbk91dC1iYXNlKTtcbiAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgIHpEZWx0YS5wdXRBcnJheShvdXQsIGJhc2UsIGJhc2UrbGVuT3V0LWJhc2UpO1xuICB9XG4gIC8vIE91dHB1dCB0aGUgZmluYWwgY2hlY2tzdW0gcmVjb3JkLlxuICB6RGVsdGEucHV0SW50KGNoZWNrc3VtKG91dCkpO1xuICB6RGVsdGEucHV0Q2hhcignOycpO1xuICByZXR1cm4gekRlbHRhLnRvQXJyYXkoKTtcbn07XG5cbi8vIFJldHVybiB0aGUgc2l6ZSAoaW4gYnl0ZXMpIG9mIHRoZSBvdXRwdXQgZnJvbSBhcHBseWluZyBhIGRlbHRhLlxuZm9zc2lsRGVsdGEub3V0cHV0U2l6ZSA9IGZ1bmN0aW9uKGRlbHRhKXtcbiAgdmFyIHpEZWx0YSA9IG5ldyBSZWFkZXIoZGVsdGEpO1xuICB2YXIgc2l6ZSA9IHpEZWx0YS5nZXRJbnQoKTtcbiAgaWYgKHpEZWx0YS5nZXRDaGFyKCkgIT09ICdcXG4nKVxuICAgIHRocm93IG5ldyBFcnJvcignc2l6ZSBpbnRlZ2VyIG5vdCB0ZXJtaW5hdGVkIGJ5IFxcJ1xcXFxuXFwnJyk7XG4gIHJldHVybiBzaXplO1xufTtcblxuLy8gQXBwbHkgYSBkZWx0YS5cbmZvc3NpbERlbHRhLmFwcGx5ID0gZnVuY3Rpb24oc3JjLCBkZWx0YSkge1xuICB2YXIgbGltaXQsIHRvdGFsID0gMDtcbiAgdmFyIHpEZWx0YSA9IG5ldyBSZWFkZXIoZGVsdGEpO1xuICB2YXIgbGVuU3JjID0gc3JjLmxlbmd0aDtcbiAgdmFyIGxlbkRlbHRhID0gZGVsdGEubGVuZ3RoO1xuXG4gIGxpbWl0ID0gekRlbHRhLmdldEludCgpO1xuICBpZiAoekRlbHRhLmdldENoYXIoKSAhPT0gJ1xcbicpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaXplIGludGVnZXIgbm90IHRlcm1pbmF0ZWQgYnkgXFwnXFxcXG5cXCcnKTtcbiAgdmFyIHpPdXQgPSBuZXcgV3JpdGVyKCk7XG4gIHdoaWxlKHpEZWx0YS5oYXZlQnl0ZXMoKSkge1xuICAgIHZhciBjbnQsIG9mc3Q7XG4gICAgY250ID0gekRlbHRhLmdldEludCgpO1xuXG4gICAgc3dpdGNoICh6RGVsdGEuZ2V0Q2hhcigpKSB7XG4gICAgICBjYXNlICdAJzpcbiAgICAgICAgb2ZzdCA9IHpEZWx0YS5nZXRJbnQoKTtcbiAgICAgICAgaWYgKHpEZWx0YS5oYXZlQnl0ZXMoKSAmJiB6RGVsdGEuZ2V0Q2hhcigpICE9PSAnLCcpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3B5IGNvbW1hbmQgbm90IHRlcm1pbmF0ZWQgYnkgXFwnLFxcJycpO1xuICAgICAgICB0b3RhbCArPSBjbnQ7XG4gICAgICAgIGlmICh0b3RhbCA+IGxpbWl0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY29weSBleGNlZWRzIG91dHB1dCBmaWxlIHNpemUnKTtcbiAgICAgICAgaWYgKG9mc3QrY250ID4gbGVuU3JjKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY29weSBleHRlbmRzIHBhc3QgZW5kIG9mIGlucHV0Jyk7XG4gICAgICAgIHpPdXQucHV0QXJyYXkoc3JjLCBvZnN0LCBvZnN0K2NudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICc6JzpcbiAgICAgICAgdG90YWwgKz0gY250O1xuICAgICAgICBpZiAodG90YWwgPiBsaW1pdClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luc2VydCBjb21tYW5kIGdpdmVzIGFuIG91dHB1dCBsYXJnZXIgdGhhbiBwcmVkaWN0ZWQnKTtcbiAgICAgICAgaWYgKGNudCA+IGxlbkRlbHRhKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW5zZXJ0IGNvdW50IGV4Y2VlZHMgc2l6ZSBvZiBkZWx0YScpO1xuICAgICAgICB6T3V0LnB1dEFycmF5KHpEZWx0YS5hLCB6RGVsdGEucG9zLCB6RGVsdGEucG9zK2NudCk7XG4gICAgICAgIHpEZWx0YS5wb3MgKz0gY250O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnOyc6XG4gICAgICAgIHZhciBvdXQgPSB6T3V0LnRvQXJyYXkoKTtcbiAgICAgICAgaWYgKGNudCAhPT0gY2hlY2tzdW0ob3V0KSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBjaGVja3N1bScpO1xuICAgICAgICBpZiAodG90YWwgIT09IGxpbWl0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ2VuZXJhdGVkIHNpemUgZG9lcyBub3QgbWF0Y2ggcHJlZGljdGVkIHNpemUnKTtcbiAgICAgICAgcmV0dXJuIG91dDtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGRlbHRhIG9wZXJhdG9yJyk7XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIGRlbHRhJyk7XG59O1xuXG5yZXR1cm4gZm9zc2lsRGVsdGE7XG5cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZm9zc2lsLWRlbHRhL2Zvc3NpbC1kZWx0YS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3ZWJzb2NrZXRfMSA9IHJlcXVpcmUoXCJAZ2FtZXN0ZGlvL3dlYnNvY2tldFwiKTtcbnZhciBtc2dwYWNrID0gcmVxdWlyZShcIm1zZ3BhY2stbGl0ZVwiKTtcbnZhciBDb25uZWN0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb25uZWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbm5lY3Rpb24odXJsLCBxdWVyeSkge1xuICAgICAgICBpZiAocXVlcnkgPT09IHZvaWQgMCkgeyBxdWVyeSA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHVybCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX2VucXVldWVkQ2FsbHMgPSBbXTtcbiAgICAgICAgX3RoaXMuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5vbk9wZW5DYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm9uT3BlbkNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9lbnF1ZXVlZENhbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZW5xdWV1ZWRDYWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuX2VucXVldWVkQ2FsbHNbaV0sIG1ldGhvZCA9IF9hWzBdLCBhcmdzID0gX2FbMV07XG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuc2VuZC5jYWxsKHRoaXMsIG1zZ3BhY2suZW5jb2RlKGRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImNvbHlzZXVzLmpzOiB0cnlpbmcgdG8gc2VuZCBkYXRhIHdoaWxlIGluIFwiICsgdGhpcy53cy5yZWFkeVN0YXRlICsgXCIgc3RhdGVcIik7XG4gICAgICAgICAgICAvLyBXZWJTb2NrZXQgbm90IGNvbm5lY3RlZC5cbiAgICAgICAgICAgIC8vIEVucXVldWUgZGF0YSB0byBiZSBzZW50IHdoZW4gcmVhZHlTdGF0ZSA9PSBPUEVOXG4gICAgICAgICAgICB0aGlzLl9lbnF1ZXVlZENhbGxzLnB1c2goWydzZW5kJywgW2RhdGFdXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDb25uZWN0aW9uO1xufSh3ZWJzb2NrZXRfMS5kZWZhdWx0KSk7XG5leHBvcnRzLkNvbm5lY3Rpb24gPSBDb25uZWN0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQ29ubmVjdGlvbi50c1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7dmFyIF9jcmVhdGVDbGFzcz1mdW5jdGlvbigpe2Z1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LHByb3BzKXtmb3IodmFyIGk9MDtpPHByb3BzLmxlbmd0aDtpKyspe3ZhciBkZXNjcmlwdG9yPXByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZT1kZXNjcmlwdG9yLmVudW1lcmFibGV8fGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlPXRydWU7aWYoXCJ2YWx1ZVwiaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKTt9fXJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3Rvcixwcm90b1Byb3BzLHN0YXRpY1Byb3BzKXtpZihwcm90b1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLHByb3RvUHJvcHMpO2lmKHN0YXRpY1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3Isc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcjt9O30oKTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsQ29uc3RydWN0b3Ipe2lmKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcikpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7fX12YXIgY3JlYXRlQmFja29mZj1yZXF1aXJlKCcuL2JhY2tvZmYnKS5jcmVhdGVCYWNrb2ZmO3ZhciBXZWJTb2NrZXRDbGllbnQ9ZnVuY3Rpb24oKXsvKipcbiAgICogQHBhcmFtIHVybCBET01TdHJpbmcgVGhlIFVSTCB0byB3aGljaCB0byBjb25uZWN0OyB0aGlzIHNob3VsZCBiZSB0aGUgVVJMIHRvIHdoaWNoIHRoZSBXZWJTb2NrZXQgc2VydmVyIHdpbGwgcmVzcG9uZC5cbiAgICogQHBhcmFtIHByb3RvY29scyBET01TdHJpbmd8RE9NU3RyaW5nW10gRWl0aGVyIGEgc2luZ2xlIHByb3RvY29sIHN0cmluZyBvciBhbiBhcnJheSBvZiBwcm90b2NvbCBzdHJpbmdzLiBUaGVzZSBzdHJpbmdzIGFyZSB1c2VkIHRvIGluZGljYXRlIHN1Yi1wcm90b2NvbHMsIHNvIHRoYXQgYSBzaW5nbGUgc2VydmVyIGNhbiBpbXBsZW1lbnQgbXVsdGlwbGUgV2ViU29ja2V0IHN1Yi1wcm90b2NvbHMgKGZvciBleGFtcGxlLCB5b3UgbWlnaHQgd2FudCBvbmUgc2VydmVyIHRvIGJlIGFibGUgdG8gaGFuZGxlIGRpZmZlcmVudCB0eXBlcyBvZiBpbnRlcmFjdGlvbnMgZGVwZW5kaW5nIG9uIHRoZSBzcGVjaWZpZWQgcHJvdG9jb2wpLiBJZiB5b3UgZG9uJ3Qgc3BlY2lmeSBhIHByb3RvY29sIHN0cmluZywgYW4gZW1wdHkgc3RyaW5nIGlzIGFzc3VtZWQuXG4gICAqL2Z1bmN0aW9uIFdlYlNvY2tldENsaWVudCh1cmwscHJvdG9jb2xzKXt2YXIgb3B0aW9ucz1hcmd1bWVudHMubGVuZ3RoPjImJmFyZ3VtZW50c1syXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMl06e307X2NsYXNzQ2FsbENoZWNrKHRoaXMsV2ViU29ja2V0Q2xpZW50KTt0aGlzLnVybD11cmw7dGhpcy5wcm90b2NvbHM9cHJvdG9jb2xzO3RoaXMucmVjb25uZWN0RW5hYmxlZD10cnVlO3RoaXMubGlzdGVuZXJzPXt9O3RoaXMuYmFja29mZj1jcmVhdGVCYWNrb2ZmKG9wdGlvbnMuYmFja29mZnx8J2V4cG9uZW50aWFsJyxvcHRpb25zKTt0aGlzLmJhY2tvZmYub25SZWFkeT10aGlzLm9uQmFja29mZlJlYWR5LmJpbmQodGhpcyk7dGhpcy5vcGVuKCk7fV9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsW3trZXk6J29wZW4nLHZhbHVlOmZ1bmN0aW9uIG9wZW4oKXt2YXIgcmVjb25uZWN0PWFyZ3VtZW50cy5sZW5ndGg+MCYmYXJndW1lbnRzWzBdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1swXTpmYWxzZTt0aGlzLmlzUmVjb25uZWN0PXJlY29ubmVjdDt0aGlzLndzPW5ldyBXZWJTb2NrZXQodGhpcy51cmwsdGhpcy5wcm90b2NvbHMpO3RoaXMud3Mub25jbG9zZT10aGlzLm9uQ2xvc2VDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25lcnJvcj10aGlzLm9uRXJyb3JDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25tZXNzYWdlPXRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTt0aGlzLndzLm9ub3Blbj10aGlzLm9uT3BlbkNhbGxiYWNrLmJpbmQodGhpcyk7fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25CYWNrb2ZmUmVhZHknLHZhbHVlOmZ1bmN0aW9uIG9uQmFja29mZlJlYWR5KG51bWJlcixkZWxheSl7Ly8gY29uc29sZS5sb2coXCJvbkJhY2tvZmZSZWFkeVwiLCBudW1iZXIgKyAnICcgKyBkZWxheSArICdtcycpO1xudGhpcy5vcGVuKHRydWUpO30vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uQ2xvc2VDYWxsYmFjaycsdmFsdWU6ZnVuY3Rpb24gb25DbG9zZUNhbGxiYWNrKCl7aWYoIXRoaXMuaXNSZWNvbm5lY3QmJnRoaXMubGlzdGVuZXJzWydvbmNsb3NlJ10pe3RoaXMubGlzdGVuZXJzWydvbmNsb3NlJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO31pZih0aGlzLnJlY29ubmVjdEVuYWJsZWQpe3RoaXMuYmFja29mZi5iYWNrb2ZmKCk7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uRXJyb3JDYWxsYmFjaycsdmFsdWU6ZnVuY3Rpb24gb25FcnJvckNhbGxiYWNrKCl7aWYodGhpcy5saXN0ZW5lcnNbJ29uZXJyb3InXSl7dGhpcy5saXN0ZW5lcnNbJ29uZXJyb3InXS5hcHBseShudWxsLGFyZ3VtZW50cyk7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uTWVzc2FnZUNhbGxiYWNrJyx2YWx1ZTpmdW5jdGlvbiBvbk1lc3NhZ2VDYWxsYmFjaygpe2lmKHRoaXMubGlzdGVuZXJzWydvbm1lc3NhZ2UnXSl7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddLmFwcGx5KG51bGwsYXJndW1lbnRzKTt9fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25PcGVuQ2FsbGJhY2snLHZhbHVlOmZ1bmN0aW9uIG9uT3BlbkNhbGxiYWNrKCl7aWYodGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddKXt0aGlzLmxpc3RlbmVyc1snb25vcGVuJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO31pZih0aGlzLmlzUmVjb25uZWN0JiZ0aGlzLmxpc3RlbmVyc1snb25yZWNvbm5lY3QnXSl7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J10uYXBwbHkobnVsbCxhcmd1bWVudHMpO310aGlzLmlzUmVjb25uZWN0PWZhbHNlO30vKipcbiAgICogVGhlIG51bWJlciBvZiBieXRlcyBvZiBkYXRhIHRoYXQgaGF2ZSBiZWVuIHF1ZXVlZCB1c2luZyBjYWxscyB0byBzZW5kKClcbiAgICogYnV0IG5vdCB5ZXQgdHJhbnNtaXR0ZWQgdG8gdGhlIG5ldHdvcmsuIFRoaXMgdmFsdWUgZG9lcyBub3QgcmVzZXQgdG8gemVyb1xuICAgKiB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZDsgaWYgeW91IGtlZXAgY2FsbGluZyBzZW5kKCksIHRoaXMgd2lsbFxuICAgKiBjb250aW51ZSB0byBjbGltYi5cbiAgICpcbiAgICogQHR5cGUgdW5zaWduZWQgbG9uZ1xuICAgKiBAcmVhZG9ubHlcbiAgICovfSx7a2V5OidjbG9zZScsLyoqXG4gICAqIENsb3NlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gb3IgY29ubmVjdGlvbiBhdHRlbXB0LCBpZiBhbnkuIElmIHRoZVxuICAgKiBjb25uZWN0aW9uIGlzIGFscmVhZHkgQ0xPU0VELCB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBjb2RlIEEgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIHRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjbG9zZWQuIElmIHRoaXMgcGFyYW1ldGVyIGlzIG5vdCBzcGVjaWZpZWQsIGEgZGVmYXVsdCB2YWx1ZSBvZiAxMDAwIChpbmRpY2F0aW5nIGEgbm9ybWFsIFwidHJhbnNhY3Rpb24gY29tcGxldGVcIiBjbG9zdXJlKSBpcyBhc3N1bWVkLiBTZWUgdGhlIGxpc3Qgb2Ygc3RhdHVzIGNvZGVzIG9uIHRoZSBDbG9zZUV2ZW50IHBhZ2UgZm9yIHBlcm1pdHRlZCB2YWx1ZXMuXG4gICAqIEBwYXJhbSByZWFzb24gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZy4gVGhpcyBzdHJpbmcgbXVzdCBiZSBubyBsb25nZXIgdGhhbiAxMjMgYnl0ZXMgb2YgVVRGLTggdGV4dCAobm90IGNoYXJhY3RlcnMpLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovdmFsdWU6ZnVuY3Rpb24gY2xvc2UoY29kZSxyZWFzb24pe2lmKHR5cGVvZiBjb2RlPT0ndW5kZWZpbmVkJyl7Y29kZT0xMDAwO310aGlzLnJlY29ubmVjdEVuYWJsZWQ9ZmFsc2U7dGhpcy53cy5jbG9zZShjb2RlLHJlYXNvbik7fS8qKlxuICAgKiBUcmFuc21pdHMgZGF0YSB0byB0aGUgc2VydmVyIG92ZXIgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uLlxuICAgKiBAcGFyYW0gZGF0YSBET01TdHJpbmd8QXJyYXlCdWZmZXJ8QmxvYlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovfSx7a2V5OidzZW5kJyx2YWx1ZTpmdW5jdGlvbiBzZW5kKGRhdGEpe3RoaXMud3Muc2VuZChkYXRhKTt9LyoqXG4gICAqIEFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbidzIHJlYWR5U3RhdGUgY2hhbmdlcyB0byBDTE9TRUQuIFRoZSBsaXN0ZW5lciByZWNlaXZlcyBhIENsb3NlRXZlbnQgbmFtZWQgXCJjbG9zZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J2J1ZmZlcmVkQW1vdW50JyxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMud3MuYnVmZmVyZWRBbW91bnQ7fS8qKlxuICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbjsgdGhpcyBpcyBvbmUgb2YgdGhlIFJlYWR5IHN0YXRlIGNvbnN0YW50cy5cbiAgICogQHR5cGUgdW5zaWduZWQgc2hvcnRcbiAgICogQHJlYWRvbmx5XG4gICAqL30se2tleToncmVhZHlTdGF0ZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnJlYWR5U3RhdGU7fS8qKlxuICAgKiBBIHN0cmluZyBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIGJpbmFyeSBkYXRhIGJlaW5nIHRyYW5zbWl0dGVkIGJ5IHRoZVxuICAgKiBjb25uZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBlaXRoZXIgXCJibG9iXCIgaWYgRE9NIEJsb2Igb2JqZWN0cyBhcmUgYmVpbmdcbiAgICogdXNlZCBvciBcImFycmF5YnVmZmVyXCIgaWYgQXJyYXlCdWZmZXIgb2JqZWN0cyBhcmUgYmVpbmcgdXNlZC5cbiAgICogQHR5cGUgRE9NU3RyaW5nXG4gICAqL30se2tleTonYmluYXJ5VHlwZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLmJpbmFyeVR5cGU7fSxzZXQ6ZnVuY3Rpb24gc2V0KGJpbmFyeVR5cGUpe3RoaXMud3MuYmluYXJ5VHlwZT1iaW5hcnlUeXBlO30vKipcbiAgICogVGhlIGV4dGVuc2lvbnMgc2VsZWN0ZWQgYnkgdGhlIHNlcnZlci4gVGhpcyBpcyBjdXJyZW50bHkgb25seSB0aGUgZW1wdHlcbiAgICogc3RyaW5nIG9yIGEgbGlzdCBvZiBleHRlbnNpb25zIGFzIG5lZ290aWF0ZWQgYnkgdGhlIGNvbm5lY3Rpb24uXG4gICAqIEB0eXBlIERPTVN0cmluZ1xuICAgKi99LHtrZXk6J2V4dGVuc2lvbnMnLGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy53cy5leHRlbnNpb25zO30sc2V0OmZ1bmN0aW9uIHNldChleHRlbnNpb25zKXt0aGlzLndzLmV4dGVuc2lvbnM9ZXh0ZW5zaW9uczt9LyoqXG4gICAqIEEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIHN1Yi1wcm90b2NvbCB0aGUgc2VydmVyIHNlbGVjdGVkO1xuICAgKiB0aGlzIHdpbGwgYmUgb25lIG9mIHRoZSBzdHJpbmdzIHNwZWNpZmllZCBpbiB0aGUgcHJvdG9jb2xzIHBhcmFtZXRlciB3aGVuXG4gICAqIGNyZWF0aW5nIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgKiBAdHlwZSBET01TdHJpbmdcbiAgICovfSx7a2V5Oidwcm90b2NvbCcsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnByb3RvY29sO30sc2V0OmZ1bmN0aW9uIHNldChwcm90b2NvbCl7dGhpcy53cy5wcm90b2NvbD1wcm90b2NvbDt9fSx7a2V5OidvbmNsb3NlJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLiBUaGlzIGlzIGEgc2ltcGxlIGV2ZW50IG5hbWVkIFwiZXJyb3JcIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbmVycm9yJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25lcnJvciddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25lcnJvciddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci4gVGhlIGxpc3RlbmVyIHJlY2VpdmVzIGEgTWVzc2FnZUV2ZW50IG5hbWVkIFwibWVzc2FnZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J29ubWVzc2FnZScsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25tZXNzYWdlJ107fS8qKlxuICAgKiBBbiBldmVudCBsaXN0ZW5lciB0byBiZSBjYWxsZWQgd2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24ncyByZWFkeVN0YXRlIGNoYW5nZXMgdG8gT1BFTjsgdGhpcyBpbmRpY2F0ZXMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyByZWFkeSB0byBzZW5kIGFuZCByZWNlaXZlIGRhdGEuIFRoZSBldmVudCBpcyBhIHNpbXBsZSBvbmUgd2l0aCB0aGUgbmFtZSBcIm9wZW5cIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5Oidvbm9wZW4nLHNldDpmdW5jdGlvbiBzZXQobGlzdGVuZXIpe3RoaXMubGlzdGVuZXJzWydvbm9wZW4nXT1saXN0ZW5lcjt9LGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddO30vKipcbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbnJlY29ubmVjdCcsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J109bGlzdGVuZXI7fSxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMubGlzdGVuZXJzWydvbnJlY29ubmVjdCddO319XSk7cmV0dXJuIFdlYlNvY2tldENsaWVudDt9KCk7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBub3QgeWV0IG9wZW4uXG4gKi9XZWJTb2NrZXRDbGllbnQuQ09OTkVDVElORz1XZWJTb2NrZXQuQ09OTkVDVElORzsvKipcbiAqIFRoZSBjb25uZWN0aW9uIGlzIG9wZW4gYW5kIHJlYWR5IHRvIGNvbW11bmljYXRlLlxuICovV2ViU29ja2V0Q2xpZW50Lk9QRU49V2ViU29ja2V0Lk9QRU47LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBpbiB0aGUgcHJvY2VzcyBvZiBjbG9zaW5nLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NJTkc9V2ViU29ja2V0LkNMT1NJTkc7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBjbG9zZWQgb3IgY291bGRuJ3QgYmUgb3BlbmVkLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NFRD1XZWJTb2NrZXQuQ0xPU0VEO2V4cG9ydHMuZGVmYXVsdD1XZWJTb2NrZXRDbGllbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGdhbWVzdGRpby93ZWJzb2NrZXQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY3JlYXRlQmFja29mZj1jcmVhdGVCYWNrb2ZmO3ZhciBiYWNrb2ZmPXtleHBvbmVudGlhbDpmdW5jdGlvbiBleHBvbmVudGlhbChhdHRlbXB0LGRlbGF5KXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKk1hdGgucG93KDIsYXR0ZW1wdCkqZGVsYXkpO30sZmlib25hY2NpOmZ1bmN0aW9uIGZpYm9uYWNjaShhdHRlbXB0LGRlbGF5KXt2YXIgY3VycmVudD0xO2lmKGF0dGVtcHQ+Y3VycmVudCl7dmFyIHByZXY9MSxjdXJyZW50PTI7Zm9yKHZhciBpbmRleD0yO2luZGV4PGF0dGVtcHQ7aW5kZXgrKyl7dmFyIG5leHQ9cHJlditjdXJyZW50O3ByZXY9Y3VycmVudDtjdXJyZW50PW5leHQ7fX1yZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmN1cnJlbnQqZGVsYXkpO319O2Z1bmN0aW9uIGNyZWF0ZUJhY2tvZmYodHlwZSxvcHRpb25zKXtyZXR1cm4gbmV3IEJhY2tvZmYoYmFja29mZlt0eXBlXSxvcHRpb25zKTt9ZnVuY3Rpb24gQmFja29mZihmdW5jLG9wdGlvbnMpe3RoaXMuZnVuYz1mdW5jO3RoaXMuYXR0ZW1wdHM9MDt0aGlzLmRlbGF5PXR5cGVvZiBvcHRpb25zLmluaXRpYWxEZWxheSE9PVwidW5kZWZpbmVkXCI/b3B0aW9ucy5pbml0aWFsRGVsYXk6MTAwO31CYWNrb2ZmLnByb3RvdHlwZS5iYWNrb2ZmPWZ1bmN0aW9uKCl7c2V0VGltZW91dCh0aGlzLm9uUmVhZHksdGhpcy5mdW5jKCsrdGhpcy5hdHRlbXB0cyx0aGlzLmRlbGF5KSk7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZ2FtZXN0ZGlvL3dlYnNvY2tldC9saWIvYmFja29mZi5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==