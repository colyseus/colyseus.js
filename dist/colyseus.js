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
        this.connection.onclose = function (e) { return _this.onLeave.dispatch(e); };
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
        this._previousState = fossilDelta.apply(this._previousState, binaryPatch, { verifyChecksum: false });
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
        this.connectingRooms = {};
        this.joinRequestId = 0;
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
        options.requestId = ++this.joinRequestId;
        this.connectingRooms[options.requestId] = new Room_1.Room(roomName);
        this.connection.send([Protocol_1.Protocol.JOIN_ROOM, roomName, options]);
        return this.connectingRooms[options.requestId];
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
            var requestId = message[2];
            var room_1 = this.connectingRooms[requestId];
            this.rooms[room_1.id] = room_1;
            room_1.id = message[1];
            room_1.connect(new Connection_1.Connection(this.hostname + "/" + room_1.id + "?colyseusid=" + this.id));
            room_1.onLeave.add(function () { return delete _this.rooms[room_1.id]; });
            delete this.connectingRooms[requestId];
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

Object.defineProperty(exports, "__esModule", { value: true });
var DeltaContainer_1 = __webpack_require__(55);
exports.DeltaContainer = DeltaContainer_1.DeltaContainer;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = __webpack_require__(56);
var DeltaContainer = /** @class */ (function () {
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
                        rawPath: patches[i].path,
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

Object.defineProperty(exports, "__esModule", { value: true });
function compare(tree1, tree2) {
    var patches = [];
    generate(tree1, tree2, patches, []);
    return patches;
}
exports.compare = compare;
function concat(arr, value) {
    var newArr = arr.slice();
    newArr.push(value);
    return newArr;
}
function objectKeys(obj) {
    if (Array.isArray(obj)) {
        var keys_1 = new Array(obj.length);
        for (var k = 0; k < keys_1.length; k++) {
            keys_1[k] = "" + k;
        }
        return keys_1;
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
                generate(oldVal, newVal, patches, concat(path, key));
            }
            else {
                if (oldVal !== newVal) {
                    changed = true;
                    patches.push({ operation: "replace", path: concat(path, key), value: newVal });
                }
            }
        }
        else {
            patches.push({ operation: "remove", path: concat(path, key) });
            deleted = true; // property has been deleted
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!mirror.hasOwnProperty(key) && obj[key] !== undefined) {
            var newVal = obj[key];
            var addPath = concat(path, key);
            // compare deeper additions
            if (typeof newVal == "object" && newVal != null) {
                generate({}, newVal, patches, addPath);
            }
            patches.push({ operation: "add", path: addPath, value: newVal });
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
fossilDelta.apply = function(src, delta, opts) {
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
        if ((!opts || opts.verifyChecksum !== false) && cnt !== checksum(out))
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
   */function WebSocketClient(url,protocols){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,WebSocketClient);this.url=url;this.protocols=protocols;this.reconnectEnabled=true;this.listeners={};this.backoff=createBackoff(options.backoff||'exponential',options);this.backoff.onReady=this.onBackoffReady.bind(this);this.open();}_createClass(WebSocketClient,[{key:'open',value:function open(){var reconnect=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;this.isReconnect=reconnect;// keep binaryType used on previous WebSocket connection
var binaryType=this.ws&&this.ws.binaryType;this.ws=new WebSocket(this.url,this.protocols);this.ws.onclose=this.onCloseCallback.bind(this);this.ws.onerror=this.onErrorCallback.bind(this);this.ws.onmessage=this.onMessageCallback.bind(this);this.ws.onopen=this.onOpenCallback.bind(this);if(binaryType){this.ws.binaryType=binaryType;}}/**
   * @ignore
   */},{key:'onBackoffReady',value:function onBackoffReady(number,delay){// console.log("onBackoffReady", number + ' ' + delay + 'ms');
this.open(true);}/**
   * @ignore
   */},{key:'onCloseCallback',value:function onCloseCallback(e){if(!this.isReconnect&&this.listeners['onclose']){this.listeners['onclose'].apply(null,arguments);}if(this.reconnectEnabled&&e.code<3000){this.backoff.backoff();}}/**
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGNiMDgzNTA2OTMzOTY3MmM4YmUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2NvZGVjLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLWNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludDY0LWJ1ZmZlci9pbnQ2NC1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC1jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3RvY29sLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGUtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXVpbnQ4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2ZsZXgtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGUtYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtZm9ybWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ldmVudC1saXRlL2V2ZW50LWxpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1ByaW9yaXR5U2lnbmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1NpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TbG90TGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXJpc2gtdWludDhhcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtcGFja2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtdG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LXVucGFja2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3JlYWQtdG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZW5jb2Rlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2V4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9jb2RlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9EZWx1eGVTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvZXZlbnRzL0dlbmVyaWNFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JUHJpb3JpdHlTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Nb25vU2lnbmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vY2xvY2svZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsdGEtbGlzdGVuZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvRGVsdGFDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlbHRhLWxpc3RlbmVyL2xpYi9jb21wYXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3NzaWwtZGVsdGEvZm9zc2lsLWRlbHRhLmpzIiwid2VicGFjazovLy8uL3NyYy9Db25uZWN0aW9uLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZ2FtZXN0ZGlvL3dlYnNvY2tldC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vd2Vic29ja2V0L2xpYi9iYWNrb2ZmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsQzs7Ozs7O0FDM0dBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsOEJBQThCLGFBQWE7Ozs7Ozs7O0FDbEUzQztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUMsa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxnQzs7Ozs7O0FDckxBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDVEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLFVBQVU7O0FBRWxCO0FBQ0E7Ozs7Ozs7QUNuRkE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0IsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JGQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWM7O0FBRWQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLGlEQUFpRDtBQUNqRCxrREFBa0Q7QUFDbEQsT0FBTztBQUNQLDRDQUE0QztBQUM1QyxPQUFPO0FBQ1AsNENBQTRDO0FBQzVDLE9BQU87QUFDUCwyQ0FBMkM7QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLDRGQUE0Rjs7Ozs7Ozs7QUNwUzdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25EQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esc0M7Ozs7Ozs7QUMxSkE7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx1REFBdUQ7Ozs7Ozs7QUNoQnhEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzV2REE7O0FBRUE7O0FBRUEsa0JBQWtCLFdBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqTUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNWQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJO0FBQzNCO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSSxFQUFFO0FBQ25DLCtCQUErQixJQUFJLEVBQUU7QUFDckMsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQixrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGVBQWUsVUFBVTtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsZUFBZSxVQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLHFCQUFxQjtBQUNyQixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDbkxEO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUMsa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDOzs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esa0M7Ozs7Ozs7QUMvREE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsYUFBYTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLG9DOzs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLGtDQUFrQztBQUNsQyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQ0FBbUMsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsa0NBQWtDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUZBQW1GLHdCQUF3QjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDaEhBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbUNBQW1DLEVBQUU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUNBQWlDO0FBQ2pGLGdEQUFnRCxpQ0FBaUM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsc0NBQXNDLEVBQUU7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7O0FDbkZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNWQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxVQUFVO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7O0FDakhBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4Q0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixHQUFHO0FBQ0gsNkJBQTZCO0FBQzdCO0FBQ0E7Ozs7Ozs7QUM3Q0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDbERBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsb0JBQW9CO0FBQ3BCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQix5QkFBeUI7QUFDekIsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDcklBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXFEO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0VBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNVFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsT0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXFEO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hGQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoS0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekJBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esd0M7Ozs7Ozs7QUN0SUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esd0M7Ozs7Ozs7QUMvREE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7O0FDTkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDOzs7Ozs7O0FDTkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7O0FDTkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7QUNWQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esc0M7Ozs7Ozs7QUN6SUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxtQzs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUJBQXFCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUJBQXFCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQ2pDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEO0FBQ0Esd0RBQXdELFNBQVM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQ2hIQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsK0RBQStEO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLCtDQUErQztBQUN6RSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsMEJBQTBCLGlEQUFpRDtBQUMzRTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrQkFBK0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2IsYUFBYTtBQUNiLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0Qyx3QkFBd0IsRUFBRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRLGVBQWU7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLCtDQUErQztBQUMvQywrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0JBQW9CO0FBQ2pDLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7OztBQ2pjRDtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsWUFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQzdDYSw0Q0FBNEMsV0FBVyxFQUFFLDRCQUE0Qix3Q0FBd0MsWUFBWSxlQUFlLEtBQUssd0JBQXdCLG1EQUFtRCw2QkFBNkIsaURBQWlELDBEQUEwRCxvREFBb0QsaUVBQWlFLHlEQUF5RCxzQkFBc0IsR0FBRywrQ0FBK0MsdUNBQXVDLDJEQUEyRCx3REFBcUQsK0JBQStCO0FBQ3p5QixzREFBc0Q7QUFDdEQ7QUFDQSw2Q0FBNkMseUVBQXlFLHNDQUFzQyxhQUFhLHlCQUF5QiwyQkFBMkIsa0JBQWtCLG1FQUFtRSxvREFBb0QsYUFBYSwrQkFBK0IsaUNBQWlDLDhFQUE4RSwyQkFBMkI7QUFDNWhCLDJDQUEyQywrQ0FBK0MsZ0RBQWdELGdEQUFnRCxvREFBb0QsOENBQThDLGVBQWUsZ0NBQWdDO0FBQzNVO0FBQ0EsTUFBTSxFQUFFLGlFQUFpRTtBQUN6RSxpQkFBaUI7QUFDakI7QUFDQSxNQUFNLEVBQUUsd0RBQXdELGlEQUFpRCxpREFBaUQsdUNBQXVDLHlCQUF5QjtBQUNsTztBQUNBLE1BQU0sRUFBRSx1REFBdUQsOEJBQThCLGtEQUFrRDtBQUMvSTtBQUNBLE1BQU0sRUFBRSwyREFBMkQsZ0NBQWdDLG9EQUFvRDtBQUN2SjtBQUNBLE1BQU0sRUFBRSxxREFBcUQsNkJBQTZCLGdEQUFnRCxvREFBb0QscURBQXFELHdCQUF3QjtBQUMzUTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsNkJBQTZCLFdBQVcsNEJBQTRCLDRCQUE0QjtBQUN2STtBQUNBO0FBQ0E7QUFDQSxNQUFNLEVBQUUscUNBQXFDLG9CQUFvQjtBQUNqRTtBQUNBO0FBQ0EsTUFBTSxFQUFFLHdDQUF3QywrQkFBK0I7QUFDL0UseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSxNQUFNLEVBQUUsb0NBQW9DLDJCQUEyQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRSxvQ0FBb0MsMkJBQTJCLDhCQUE4QiwrQkFBK0I7QUFDcEk7QUFDQTtBQUNBO0FBQ0EsTUFBTSxFQUFFLG9DQUFvQywyQkFBMkIsOEJBQThCLCtCQUErQjtBQUNwSTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRSxrQ0FBa0MseUJBQXlCLDRCQUE0Qiw0QkFBNEIsRUFBRSx5Q0FBeUMsb0NBQW9DLG9CQUFvQixrQ0FBa0M7QUFDaFE7QUFDQTtBQUNBLE1BQU0sRUFBRSx5Q0FBeUMsb0NBQW9DLG9CQUFvQixrQ0FBa0M7QUFDM0k7QUFDQTtBQUNBLE1BQU0sRUFBRSwyQ0FBMkMsc0NBQXNDLG9CQUFvQixvQ0FBb0M7QUFDakosK0ZBQStGO0FBQy9GO0FBQ0EsTUFBTSxFQUFFLHdDQUF3QyxtQ0FBbUMsb0JBQW9CLGlDQUFpQztBQUN4STtBQUNBLE1BQU0sRUFBRSw2Q0FBNkMsd0NBQXdDLG9CQUFvQix1Q0FBdUMsR0FBRyx3QkFBd0IsR0FBRztBQUN0TDtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLHVDQUF1QztBQUN2QztBQUNBLDZDQUE2QztBQUM3QztBQUNBLDJDQUEyQyxnQzs7Ozs7OztBQzNFOUIsNENBQTRDLFdBQVcsRUFBRSxvQ0FBb0MsYUFBYSxnREFBZ0QsNERBQTRELDZDQUE2QyxjQUFjLG9CQUFvQixxQkFBcUIsZ0JBQWdCLGNBQWMsU0FBUyxzQkFBc0IsYUFBYSxlQUFlLGtEQUFrRCxxQ0FBcUMsMkNBQTJDLCtCQUErQixlQUFlLGdCQUFnQiwrRUFBK0UscUNBQXFDLGlFIiwiZmlsZSI6ImNvbHlzZXVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDRjYjA4MzUwNjkzMzk2NzJjOGJlIiwiLy8gYnVmZmVyaXNoLmpzXG5cbnZhciBCdWZmZXIgPSBleHBvcnRzLmdsb2JhbCA9IHJlcXVpcmUoXCIuL2J1ZmZlci1nbG9iYWxcIik7XG52YXIgaGFzQnVmZmVyID0gZXhwb3J0cy5oYXNCdWZmZXIgPSBCdWZmZXIgJiYgISFCdWZmZXIuaXNCdWZmZXI7XG52YXIgaGFzQXJyYXlCdWZmZXIgPSBleHBvcnRzLmhhc0FycmF5QnVmZmVyID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBBcnJheUJ1ZmZlcik7XG5cbnZhciBpc0FycmF5ID0gZXhwb3J0cy5pc0FycmF5ID0gcmVxdWlyZShcImlzYXJyYXlcIik7XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBoYXNBcnJheUJ1ZmZlciA/IGlzQXJyYXlCdWZmZXIgOiBfZmFsc2U7XG52YXIgaXNCdWZmZXIgPSBleHBvcnRzLmlzQnVmZmVyID0gaGFzQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogX2ZhbHNlO1xudmFyIGlzVmlldyA9IGV4cG9ydHMuaXNWaWV3ID0gaGFzQXJyYXlCdWZmZXIgPyAoQXJyYXlCdWZmZXIuaXNWaWV3IHx8IF9pcyhcIkFycmF5QnVmZmVyXCIsIFwiYnVmZmVyXCIpKSA6IF9mYWxzZTtcblxuZXhwb3J0cy5hbGxvYyA9IGFsbG9jO1xuZXhwb3J0cy5jb25jYXQgPSBjb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG52YXIgQnVmZmVyQXJyYXkgPSBleHBvcnRzLkFycmF5ID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLWFycmF5XCIpO1xudmFyIEJ1ZmZlckJ1ZmZlciA9IGV4cG9ydHMuQnVmZmVyID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLWJ1ZmZlclwiKTtcbnZhciBCdWZmZXJVaW50OEFycmF5ID0gZXhwb3J0cy5VaW50OEFycmF5ID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLXVpbnQ4YXJyYXlcIik7XG52YXIgQnVmZmVyUHJvdG8gPSBleHBvcnRzLnByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaC1wcm90b1wiKTtcblxuLyoqXG4gKiBAcGFyYW0gdmFsdWUge0FycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxTdHJpbmd9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGF1dG8odGhpcykuZnJvbSh2YWx1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gc2l6ZSB7TnVtYmVyfVxuICogQHJldHVybnMge0J1ZmZlcnxVaW50OEFycmF5fEFycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgcmV0dXJuIGF1dG8odGhpcykuYWxsb2Moc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIGxpc3Qge0FycmF5fSBhcnJheSBvZiAoQnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXkpc1xuICogQHBhcmFtIFtsZW5ndGhdXG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gY29uY2F0KGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IDA7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChsaXN0LCBkcnlydW4pO1xuICB9XG4gIHZhciByZWYgPSAodGhpcyAhPT0gZXhwb3J0cykgJiYgdGhpcyB8fCBsaXN0WzBdO1xuICB2YXIgcmVzdWx0ID0gYWxsb2MuY2FsbChyZWYsIGxlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpc3QsIGFwcGVuZCk7XG4gIHJldHVybiByZXN1bHQ7XG5cbiAgZnVuY3Rpb24gZHJ5cnVuKGJ1ZmZlcikge1xuICAgIGxlbmd0aCArPSBidWZmZXIubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kKGJ1ZmZlcikge1xuICAgIG9mZnNldCArPSBCdWZmZXJQcm90by5jb3B5LmNhbGwoYnVmZmVyLCByZXN1bHQsIG9mZnNldCk7XG4gIH1cbn1cblxudmFyIF9pc0FycmF5QnVmZmVyID0gX2lzKFwiQXJyYXlCdWZmZXJcIik7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCBfaXNBcnJheUJ1ZmZlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmcm9tU3RyaW5nKHZhbHVlKSB7XG4gIHZhciBleHBlY3RlZCA9IHZhbHVlLmxlbmd0aCAqIDM7XG4gIHZhciB0aGF0ID0gYWxsb2MuY2FsbCh0aGlzLCBleHBlY3RlZCk7XG4gIHZhciBhY3R1YWwgPSBCdWZmZXJQcm90by53cml0ZS5jYWxsKHRoYXQsIHZhbHVlKTtcbiAgaWYgKGV4cGVjdGVkICE9PSBhY3R1YWwpIHtcbiAgICB0aGF0ID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbCh0aGF0LCAwLCBhY3R1YWwpO1xuICB9XG4gIHJldHVybiB0aGF0O1xufVxuXG5mdW5jdGlvbiBhdXRvKHRoYXQpIHtcbiAgcmV0dXJuIGlzQnVmZmVyKHRoYXQpID8gQnVmZmVyQnVmZmVyXG4gICAgOiBpc1ZpZXcodGhhdCkgPyBCdWZmZXJVaW50OEFycmF5XG4gICAgOiBpc0FycmF5KHRoYXQpID8gQnVmZmVyQXJyYXlcbiAgICA6IGhhc0J1ZmZlciA/IEJ1ZmZlckJ1ZmZlclxuICAgIDogaGFzQXJyYXlCdWZmZXIgPyBCdWZmZXJVaW50OEFycmF5XG4gICAgOiBCdWZmZXJBcnJheTtcbn1cblxuZnVuY3Rpb24gX2ZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIF9pcyhuYW1lLCBrZXkpIHtcbiAgLyoganNoaW50IGVxbnVsbDp0cnVlICovXG4gIG5hbWUgPSBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCI7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgIT0gbnVsbCkgJiYge30udG9TdHJpbmcuY2FsbChrZXkgPyB2YWx1ZVtrZXldIDogdmFsdWUpID09PSBuYW1lO1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjb2RlYy1iYXNlLmpzXG5cbnZhciBJU19BUlJBWSA9IHJlcXVpcmUoXCJpc2FycmF5XCIpO1xuXG5leHBvcnRzLmNyZWF0ZUNvZGVjID0gY3JlYXRlQ29kZWM7XG5leHBvcnRzLmluc3RhbGwgPSBpbnN0YWxsO1xuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbmZ1bmN0aW9uIENvZGVjKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvZGVjKSkgcmV0dXJuIG5ldyBDb2RlYyhvcHRpb25zKTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5pbml0KCk7XG59XG5cbkNvZGVjLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMudWludDhhcnJheSkge1xuICAgIHRoaXMuYnVmZmVyaXNoID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGluc3RhbGwocHJvcHMpIHtcbiAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgQ29kZWMucHJvdG90eXBlW2tleV0gPSBhZGQoQ29kZWMucHJvdG90eXBlW2tleV0sIHByb3BzW2tleV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gIHJldHVybiAoYSAmJiBiKSA/IGFiIDogKGEgfHwgYik7XG5cbiAgZnVuY3Rpb24gYWIoKSB7XG4gICAgYS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gam9pbihmaWx0ZXJzKSB7XG4gIGZpbHRlcnMgPSBmaWx0ZXJzLnNsaWNlKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZpbHRlcnMucmVkdWNlKGl0ZXJhdG9yLCB2YWx1ZSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXRlcmF0b3IodmFsdWUsIGZpbHRlcikge1xuICAgIHJldHVybiBmaWx0ZXIodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihmaWx0ZXIpIHtcbiAgcmV0dXJuIElTX0FSUkFZKGZpbHRlcikgPyBqb2luKGZpbHRlcikgOiBmaWx0ZXI7XG59XG5cbi8vIEBwdWJsaWNcbi8vIG1zZ3BhY2suY3JlYXRlQ29kZWMoKVxuXG5mdW5jdGlvbiBjcmVhdGVDb2RlYyhvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQ29kZWMob3B0aW9ucyk7XG59XG5cbi8vIGRlZmF1bHQgc2hhcmVkIGNvZGVjXG5cbmV4cG9ydHMucHJlc2V0ID0gY3JlYXRlQ29kZWMoe3ByZXNldDogdHJ1ZX0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9jb2RlYy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgU2xvdCBjbGFzcyByZXByZXNlbnRzIGEgc2lnbmFsIHNsb3QuXG4gKlxuICogQGF1dGhvciBSb2JlcnQgUGVubmVyXG4gKiBAYXV0aG9yIEpvYSBFYmVydFxuICovXG52YXIgU2xvdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBTbG90IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBzbG90LlxuICAgICAqIEBwYXJhbSBzaWduYWwgVGhlIHNpZ25hbCBhc3NvY2lhdGVkIHdpdGggdGhlIHNsb3QuXG4gICAgICogQHBhcmFtIG9uY2UgV2hldGhlciBvciBub3QgdGhlIGxpc3RlbmVyIHNob3VsZCBiZSBleGVjdXRlZCBvbmx5IG9uY2UuXG4gICAgICogQHBhcmFtIHByaW9yaXR5IFRoZSBwcmlvcml0eSBvZiB0aGUgc2xvdC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICogQHRocm93cyBFcnJvciA8Y29kZT5FcnJvcjwvY29kZT46IEludGVybmFsIHNpZ25hbCByZWZlcmVuY2UgaGFzIG5vdCBiZWVuIHNldCB5ZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2xvdChsaXN0ZW5lciwgc2lnbmFsLCBvbmNlLCBwcmlvcml0eSkge1xuICAgICAgICBpZiAob25jZSA9PT0gdm9pZCAwKSB7IG9uY2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX29uY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSAwO1xuICAgICAgICB0aGlzLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICB0aGlzLl9vbmNlID0gb25jZTtcbiAgICAgICAgdGhpcy5fc2lnbmFsID0gc2lnbmFsO1xuICAgICAgICB0aGlzLl9wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnZlcmlmeUxpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBTbG90LnByb3RvdHlwZS5leGVjdXRlMCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5fb25jZSlcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIGlmICh0aGlzLl9wYXJhbXMgJiYgdGhpcy5fcGFyYW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIuYXBwbHkobnVsbCwgdGhpcy5fcGFyYW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9saXN0ZW5lcigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKi9cbiAgICBTbG90LnByb3RvdHlwZS5leGVjdXRlMSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9vbmNlKVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmFtcyAmJiB0aGlzLl9wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lci5hcHBseShudWxsLCBbdmFsdWVdLmNvbmNhdCh0aGlzLl9wYXJhbXMpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9saXN0ZW5lcih2YWx1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAodmFsdWVPYmplY3RzKSB7XG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX29uY2UpXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIHBhcmFtZXRlcnMsIGFkZCB0aGVtIHRvIHRoZSB2YWx1ZU9iamVjdFxuICAgICAgICAvLyBOb3RlOiBUaGlzIGNvdWxkIGJlIGV4cGVuc2l2ZSBpZiB3ZSdyZSBhZnRlciB0aGUgZmFzdGVzdCBkaXNwYXRjaCBwb3NzaWJsZS5cbiAgICAgICAgaWYgKHRoaXMuX3BhcmFtcyAmJiB0aGlzLl9wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHMuY29uY2F0KHRoaXMuX3BhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTk9URTogc2ltcGxlIGlmcyBhcmUgZmFzdGVyIHRoYW4gc3dpdGNoOiBodHRwOi8vamFja3NvbmR1bnN0YW4uY29tL2FydGljbGVzLzEwMDdcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIGlmIChudW1WYWx1ZU9iamVjdHMgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChudW1WYWx1ZU9iamVjdHMgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIodmFsdWVPYmplY3RzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChudW1WYWx1ZU9iamVjdHMgPT0gMikge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIodmFsdWVPYmplY3RzWzBdLCB2YWx1ZU9iamVjdHNbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAzKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcih2YWx1ZU9iamVjdHNbMF0sIHZhbHVlT2JqZWN0c1sxXSwgdmFsdWVPYmplY3RzWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyLmFwcGx5KG51bGwsIHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90LnByb3RvdHlwZSwgXCJsaXN0ZW5lclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LiBEaWQgeW91IHdhbnQgdG8gc2V0IGVuYWJsZWQgdG8gZmFsc2UgaW5zdGVhZD9cbiAgICAgICAgICogQHRocm93cyBFcnJvciA8Y29kZT5FcnJvcjwvY29kZT46IEludGVybmFsIHNpZ25hbCByZWZlcmVuY2UgaGFzIG5vdCBiZWVuIHNldCB5ZXQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChudWxsID09IHZhbHVlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR2l2ZW4gbGlzdGVuZXIgaXMgbnVsbC5cXG5EaWQgeW91IHdhbnQgdG8gc2V0IGVuYWJsZWQgdG8gZmFsc2UgaW5zdGVhZD8nKTtcbiAgICAgICAgICAgIHRoaXMudmVyaWZ5TGlzdGVuZXIodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcIm9uY2VcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uY2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90LnByb3RvdHlwZSwgXCJwcmlvcml0eVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJbU2xvdCBsaXN0ZW5lcjogXCIgKyB0aGlzLl9saXN0ZW5lciArIFwiLCBvbmNlOiBcIiArIHRoaXMuX29uY2VcbiAgICAgICAgICAgICsgXCIsIHByaW9yaXR5OiBcIiArIHRoaXMuX3ByaW9yaXR5ICsgXCIsIGVuYWJsZWQ6IFwiICsgdGhpcy5fZW5hYmxlZCArIFwiXVwiO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcImVuYWJsZWRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90LnByb3RvdHlwZSwgXCJwYXJhbXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc2lnbmFsLnJlbW92ZSh0aGlzLl9saXN0ZW5lcik7XG4gICAgfTtcbiAgICBTbG90LnByb3RvdHlwZS52ZXJpZnlMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAobnVsbCA9PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHaXZlbiBsaXN0ZW5lciBpcyBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChudWxsID09IHRoaXMuX3NpZ25hbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlcm5hbCBzaWduYWwgcmVmZXJlbmNlIGhhcyBub3QgYmVlbiBzZXQgeWV0LicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU2xvdDtcbn0oKSk7XG5leHBvcnRzLlNsb3QgPSBTbG90O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2xvdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYnJvd3Nlci5qc1xuXG5leHBvcnRzLmVuY29kZSA9IHJlcXVpcmUoXCIuL2VuY29kZVwiKS5lbmNvZGU7XG5leHBvcnRzLmRlY29kZSA9IHJlcXVpcmUoXCIuL2RlY29kZVwiKS5kZWNvZGU7XG5cbmV4cG9ydHMuRW5jb2RlciA9IHJlcXVpcmUoXCIuL2VuY29kZXJcIikuRW5jb2RlcjtcbmV4cG9ydHMuRGVjb2RlciA9IHJlcXVpcmUoXCIuL2RlY29kZXJcIikuRGVjb2RlcjtcblxuZXhwb3J0cy5jcmVhdGVDb2RlYyA9IHJlcXVpcmUoXCIuL2V4dFwiKS5jcmVhdGVDb2RlYztcbmV4cG9ydHMuY29kZWMgPSByZXF1aXJlKFwiLi9jb2RlY1wiKS5jb2RlYztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS1jb3JlLmpzXG5cbnZhciBFeHRCdWZmZXIgPSByZXF1aXJlKFwiLi9leHQtYnVmZmVyXCIpLkV4dEJ1ZmZlcjtcbnZhciBFeHRQYWNrZXIgPSByZXF1aXJlKFwiLi9leHQtcGFja2VyXCIpO1xudmFyIFdyaXRlVHlwZSA9IHJlcXVpcmUoXCIuL3dyaXRlLXR5cGVcIik7XG52YXIgQ29kZWNCYXNlID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKTtcblxuQ29kZWNCYXNlLmluc3RhbGwoe1xuICBhZGRFeHRQYWNrZXI6IGFkZEV4dFBhY2tlcixcbiAgZ2V0RXh0UGFja2VyOiBnZXRFeHRQYWNrZXIsXG4gIGluaXQ6IGluaXRcbn0pO1xuXG5leHBvcnRzLnByZXNldCA9IGluaXQuY2FsbChDb2RlY0Jhc2UucHJlc2V0KTtcblxuZnVuY3Rpb24gZ2V0RW5jb2RlcihvcHRpb25zKSB7XG4gIHZhciB3cml0ZVR5cGUgPSBXcml0ZVR5cGUuZ2V0V3JpdGVUeXBlKG9wdGlvbnMpO1xuICByZXR1cm4gZW5jb2RlO1xuXG4gIGZ1bmN0aW9uIGVuY29kZShlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBmdW5jID0gd3JpdGVUeXBlW3R5cGVvZiB2YWx1ZV07XG4gICAgaWYgKCFmdW5jKSB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB0eXBlIFxcXCJcIiArICh0eXBlb2YgdmFsdWUpICsgXCJcXFwiOiBcIiArIHZhbHVlKTtcbiAgICBmdW5jKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgdGhpcy5lbmNvZGUgPSBnZXRFbmNvZGVyKG9wdGlvbnMpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJlc2V0KSB7XG4gICAgRXh0UGFja2VyLnNldEV4dFBhY2tlcnModGhpcyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gYWRkRXh0UGFja2VyKGV0eXBlLCBDbGFzcywgcGFja2VyKSB7XG4gIHBhY2tlciA9IENvZGVjQmFzZS5maWx0ZXIocGFja2VyKTtcbiAgdmFyIG5hbWUgPSBDbGFzcy5uYW1lO1xuICBpZiAobmFtZSAmJiBuYW1lICE9PSBcIk9iamVjdFwiKSB7XG4gICAgdmFyIHBhY2tlcnMgPSB0aGlzLmV4dFBhY2tlcnMgfHwgKHRoaXMuZXh0UGFja2VycyA9IHt9KTtcbiAgICBwYWNrZXJzW25hbWVdID0gZXh0UGFja2VyO1xuICB9IGVsc2Uge1xuICAgIC8vIGZhbGxiYWNrIGZvciBJRVxuICAgIHZhciBsaXN0ID0gdGhpcy5leHRFbmNvZGVyTGlzdCB8fCAodGhpcy5leHRFbmNvZGVyTGlzdCA9IFtdKTtcbiAgICBsaXN0LnVuc2hpZnQoW0NsYXNzLCBleHRQYWNrZXJdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dFBhY2tlcih2YWx1ZSkge1xuICAgIGlmIChwYWNrZXIpIHZhbHVlID0gcGFja2VyKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3IEV4dEJ1ZmZlcih2YWx1ZSwgZXR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEV4dFBhY2tlcih2YWx1ZSkge1xuICB2YXIgcGFja2VycyA9IHRoaXMuZXh0UGFja2VycyB8fCAodGhpcy5leHRQYWNrZXJzID0ge30pO1xuICB2YXIgYyA9IHZhbHVlLmNvbnN0cnVjdG9yO1xuICB2YXIgZSA9IGMgJiYgYy5uYW1lICYmIHBhY2tlcnNbYy5uYW1lXTtcbiAgaWYgKGUpIHJldHVybiBlO1xuXG4gIC8vIGZhbGxiYWNrIGZvciBJRVxuICB2YXIgbGlzdCA9IHRoaXMuZXh0RW5jb2Rlckxpc3QgfHwgKHRoaXMuZXh0RW5jb2Rlckxpc3QgPSBbXSk7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBwYWlyID0gbGlzdFtpXTtcbiAgICBpZiAoYyA9PT0gcGFpclswXSkgcmV0dXJuIHBhaXJbMV07XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBleHQtYnVmZmVyLmpzXG5cbmV4cG9ydHMuRXh0QnVmZmVyID0gRXh0QnVmZmVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG5mdW5jdGlvbiBFeHRCdWZmZXIoYnVmZmVyLCB0eXBlKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFeHRCdWZmZXIpKSByZXR1cm4gbmV3IEV4dEJ1ZmZlcihidWZmZXIsIHR5cGUpO1xuICB0aGlzLmJ1ZmZlciA9IEJ1ZmZlcmlzaC5mcm9tKGJ1ZmZlcik7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2V4dC1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJ1ZmZlcmlzaC1wcm90by5qc1xuXG4vKiBqc2hpbnQgZXFudWxsOnRydWUgKi9cblxudmFyIEJ1ZmZlckxpdGUgPSByZXF1aXJlKFwiLi9idWZmZXItbGl0ZVwiKTtcblxuZXhwb3J0cy5jb3B5ID0gY29weTtcbmV4cG9ydHMuc2xpY2UgPSBzbGljZTtcbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbmV4cG9ydHMud3JpdGUgPSBnZW4oXCJ3cml0ZVwiKTtcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcbnZhciBCdWZmZXIgPSBCdWZmZXJpc2guZ2xvYmFsO1xuXG52YXIgaXNCdWZmZXJTaGltID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiAoXCJUWVBFRF9BUlJBWV9TVVBQT1JUXCIgaW4gQnVmZmVyKTtcbnZhciBicm9rZW5UeXBlZEFycmF5ID0gaXNCdWZmZXJTaGltICYmICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVDtcblxuLyoqXG4gKiBAcGFyYW0gdGFyZ2V0IHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqIEBwYXJhbSBbdGFyZ2V0U3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gY29weSh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0aGlzSXNCdWZmZXIgPSBCdWZmZXJpc2guaXNCdWZmZXIodGhpcyk7XG4gIHZhciB0YXJnZXRJc0J1ZmZlciA9IEJ1ZmZlcmlzaC5pc0J1ZmZlcih0YXJnZXQpO1xuICBpZiAodGhpc0lzQnVmZmVyICYmIHRhcmdldElzQnVmZmVyKSB7XG4gICAgLy8gQnVmZmVyIHRvIEJ1ZmZlclxuICAgIHJldHVybiB0aGlzLmNvcHkodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCk7XG4gIH0gZWxzZSBpZiAoIWJyb2tlblR5cGVkQXJyYXkgJiYgIXRoaXNJc0J1ZmZlciAmJiAhdGFyZ2V0SXNCdWZmZXIgJiZcbiAgICBCdWZmZXJpc2guaXNWaWV3KHRoaXMpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodGFyZ2V0KSkge1xuICAgIC8vIFVpbnQ4QXJyYXkgdG8gVWludDhBcnJheSAoZXhjZXB0IGZvciBtaW5vciBzb21lIGJyb3dzZXJzKVxuICAgIHZhciBidWZmZXIgPSAoc3RhcnQgfHwgZW5kICE9IG51bGwpID8gc2xpY2UuY2FsbCh0aGlzLCBzdGFydCwgZW5kKSA6IHRoaXM7XG4gICAgdGFyZ2V0LnNldChidWZmZXIsIHRhcmdldFN0YXJ0KTtcbiAgICByZXR1cm4gYnVmZmVyLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlciBjYXNlc1xuICAgIHJldHVybiBCdWZmZXJMaXRlLmNvcHkuY2FsbCh0aGlzLCB0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSBbc3RhcnRdIHtOdW1iZXJ9XG4gKiBAcGFyYW0gW2VuZF0ge051bWJlcn1cbiAqIEByZXR1cm5zIHtCdWZmZXJ8VWludDhBcnJheXxBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gIC8vIGZvciBCdWZmZXIsIFVpbnQ4QXJyYXkgKGV4Y2VwdCBmb3IgbWlub3Igc29tZSBicm93c2VycykgYW5kIEFycmF5XG4gIHZhciBmID0gdGhpcy5zbGljZSB8fCAoIWJyb2tlblR5cGVkQXJyYXkgJiYgdGhpcy5zdWJhcnJheSk7XG4gIGlmIChmKSByZXR1cm4gZi5jYWxsKHRoaXMsIHN0YXJ0LCBlbmQpO1xuXG4gIC8vIFVpbnQ4QXJyYXkgKGZvciBtaW5vciBzb21lIGJyb3dzZXJzKVxuICB2YXIgdGFyZ2V0ID0gQnVmZmVyaXNoLmFsbG9jLmNhbGwodGhpcywgZW5kIC0gc3RhcnQpO1xuICBjb3B5LmNhbGwodGhpcywgdGFyZ2V0LCAwLCBzdGFydCwgZW5kKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nKClcbiAqXG4gKiBAcGFyYW0gW2VuY29kaW5nXSB7U3RyaW5nfSBpZ25vcmVkXG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBmID0gKCFpc0J1ZmZlclNoaW0gJiYgQnVmZmVyaXNoLmlzQnVmZmVyKHRoaXMpKSA/IHRoaXMudG9TdHJpbmcgOiBCdWZmZXJMaXRlLnRvU3RyaW5nO1xuICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2VuKG1ldGhvZCkge1xuICByZXR1cm4gd3JhcDtcblxuICBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBmID0gdGhpc1ttZXRob2RdIHx8IEJ1ZmZlckxpdGVbbWV0aG9kXTtcbiAgICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBpbnQ2NC1idWZmZXIuanNcblxuLypqc2hpbnQgLVcwMTggKi8gLy8gQ29uZnVzaW5nIHVzZSBvZiAnIScuXG4vKmpzaGludCAtVzAzMCAqLyAvLyBFeHBlY3RlZCBhbiBhc3NpZ25tZW50IG9yIGZ1bmN0aW9uIGNhbGwgYW5kIGluc3RlYWQgc2F3IGFuIGV4cHJlc3Npb24uXG4vKmpzaGludCAtVzA5MyAqLyAvLyBEaWQgeW91IG1lYW4gdG8gcmV0dXJuIGEgY29uZGl0aW9uYWwgaW5zdGVhZCBvZiBhbiBhc3NpZ25tZW50P1xuXG52YXIgVWludDY0QkUsIEludDY0QkUsIFVpbnQ2NExFLCBJbnQ2NExFO1xuXG4hZnVuY3Rpb24oZXhwb3J0cykge1xuICAvLyBjb25zdGFudHNcblxuICB2YXIgVU5ERUZJTkVEID0gXCJ1bmRlZmluZWRcIjtcbiAgdmFyIEJVRkZFUiA9IChVTkRFRklORUQgIT09IHR5cGVvZiBCdWZmZXIpICYmIEJ1ZmZlcjtcbiAgdmFyIFVJTlQ4QVJSQVkgPSAoVU5ERUZJTkVEICE9PSB0eXBlb2YgVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcbiAgdmFyIEFSUkFZQlVGRkVSID0gKFVOREVGSU5FRCAhPT0gdHlwZW9mIEFycmF5QnVmZmVyKSAmJiBBcnJheUJ1ZmZlcjtcbiAgdmFyIFpFUk8gPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBfaXNBcnJheTtcbiAgdmFyIEJJVDMyID0gNDI5NDk2NzI5NjtcbiAgdmFyIEJJVDI0ID0gMTY3NzcyMTY7XG5cbiAgLy8gc3RvcmFnZSBjbGFzc1xuXG4gIHZhciBzdG9yYWdlOyAvLyBBcnJheTtcblxuICAvLyBnZW5lcmF0ZSBjbGFzc2VzXG5cbiAgVWludDY0QkUgPSBmYWN0b3J5KFwiVWludDY0QkVcIiwgdHJ1ZSwgdHJ1ZSk7XG4gIEludDY0QkUgPSBmYWN0b3J5KFwiSW50NjRCRVwiLCB0cnVlLCBmYWxzZSk7XG4gIFVpbnQ2NExFID0gZmFjdG9yeShcIlVpbnQ2NExFXCIsIGZhbHNlLCB0cnVlKTtcbiAgSW50NjRMRSA9IGZhY3RvcnkoXCJJbnQ2NExFXCIsIGZhbHNlLCBmYWxzZSk7XG5cbiAgLy8gY2xhc3MgZmFjdG9yeVxuXG4gIGZ1bmN0aW9uIGZhY3RvcnkobmFtZSwgYmlnZW5kaWFuLCB1bnNpZ25lZCkge1xuICAgIHZhciBwb3NIID0gYmlnZW5kaWFuID8gMCA6IDQ7XG4gICAgdmFyIHBvc0wgPSBiaWdlbmRpYW4gPyA0IDogMDtcbiAgICB2YXIgcG9zMCA9IGJpZ2VuZGlhbiA/IDAgOiAzO1xuICAgIHZhciBwb3MxID0gYmlnZW5kaWFuID8gMSA6IDI7XG4gICAgdmFyIHBvczIgPSBiaWdlbmRpYW4gPyAyIDogMTtcbiAgICB2YXIgcG9zMyA9IGJpZ2VuZGlhbiA/IDMgOiAwO1xuICAgIHZhciBmcm9tUG9zaXRpdmUgPSBiaWdlbmRpYW4gPyBmcm9tUG9zaXRpdmVCRSA6IGZyb21Qb3NpdGl2ZUxFO1xuICAgIHZhciBmcm9tTmVnYXRpdmUgPSBiaWdlbmRpYW4gPyBmcm9tTmVnYXRpdmVCRSA6IGZyb21OZWdhdGl2ZUxFO1xuICAgIHZhciBwcm90byA9IEludDY0LnByb3RvdHlwZTtcbiAgICB2YXIgaXNOYW1lID0gXCJpc1wiICsgbmFtZTtcbiAgICB2YXIgX2lzSW50NjQgPSBcIl9cIiArIGlzTmFtZTtcblxuICAgIC8vIHByb3BlcnRpZXNcbiAgICBwcm90by5idWZmZXIgPSB2b2lkIDA7XG4gICAgcHJvdG8ub2Zmc2V0ID0gMDtcbiAgICBwcm90b1tfaXNJbnQ2NF0gPSB0cnVlO1xuXG4gICAgLy8gbWV0aG9kc1xuICAgIHByb3RvLnRvTnVtYmVyID0gdG9OdW1iZXI7XG4gICAgcHJvdG8udG9TdHJpbmcgPSB0b1N0cmluZztcbiAgICBwcm90by50b0pTT04gPSB0b051bWJlcjtcbiAgICBwcm90by50b0FycmF5ID0gdG9BcnJheTtcblxuICAgIC8vIGFkZCAudG9CdWZmZXIoKSBtZXRob2Qgb25seSB3aGVuIEJ1ZmZlciBhdmFpbGFibGVcbiAgICBpZiAoQlVGRkVSKSBwcm90by50b0J1ZmZlciA9IHRvQnVmZmVyO1xuXG4gICAgLy8gYWRkIC50b0FycmF5QnVmZmVyKCkgbWV0aG9kIG9ubHkgd2hlbiBVaW50OEFycmF5IGF2YWlsYWJsZVxuICAgIGlmIChVSU5UOEFSUkFZKSBwcm90by50b0FycmF5QnVmZmVyID0gdG9BcnJheUJ1ZmZlcjtcblxuICAgIC8vIGlzVWludDY0QkUsIGlzSW50NjRCRVxuICAgIEludDY0W2lzTmFtZV0gPSBpc0ludDY0O1xuXG4gICAgLy8gQ29tbW9uSlNcbiAgICBleHBvcnRzW25hbWVdID0gSW50NjQ7XG5cbiAgICByZXR1cm4gSW50NjQ7XG5cbiAgICAvLyBjb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIEludDY0KGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW50NjQpKSByZXR1cm4gbmV3IEludDY0KGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KTtcbiAgICAgIHJldHVybiBpbml0KHRoaXMsIGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KTtcbiAgICB9XG5cbiAgICAvLyBpc1VpbnQ2NEJFLCBpc0ludDY0QkVcbiAgICBmdW5jdGlvbiBpc0ludDY0KGIpIHtcbiAgICAgIHJldHVybiAhIShiICYmIGJbX2lzSW50NjRdKTtcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaXplclxuICAgIGZ1bmN0aW9uIGluaXQodGhhdCwgYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpIHtcbiAgICAgIGlmIChVSU5UOEFSUkFZICYmIEFSUkFZQlVGRkVSKSB7XG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBBUlJBWUJVRkZFUikgYnVmZmVyID0gbmV3IFVJTlQ4QVJSQVkoYnVmZmVyKTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQVJSQVlCVUZGRVIpIHZhbHVlID0gbmV3IFVJTlQ4QVJSQVkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnQ2NEJFKCkgc3R5bGVcbiAgICAgIGlmICghYnVmZmVyICYmICFvZmZzZXQgJiYgIXZhbHVlICYmICFzdG9yYWdlKSB7XG4gICAgICAgIC8vIHNob3J0Y3V0IHRvIGluaXRpYWxpemUgd2l0aCB6ZXJvXG4gICAgICAgIHRoYXQuYnVmZmVyID0gbmV3QXJyYXkoWkVSTywgMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSW50NjRCRSh2YWx1ZSwgcmFkZGl4KSBzdHlsZVxuICAgICAgaWYgKCFpc1ZhbGlkQnVmZmVyKGJ1ZmZlciwgb2Zmc2V0KSkge1xuICAgICAgICB2YXIgX3N0b3JhZ2UgPSBzdG9yYWdlIHx8IEFycmF5O1xuICAgICAgICByYWRkaXggPSBvZmZzZXQ7XG4gICAgICAgIHZhbHVlID0gYnVmZmVyO1xuICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICBidWZmZXIgPSBuZXcgX3N0b3JhZ2UoOCk7XG4gICAgICB9XG5cbiAgICAgIHRoYXQuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgdGhhdC5vZmZzZXQgPSBvZmZzZXQgfD0gMDtcblxuICAgICAgLy8gSW50NjRCRShidWZmZXIsIG9mZnNldCkgc3R5bGVcbiAgICAgIGlmIChVTkRFRklORUQgPT09IHR5cGVvZiB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAvLyBJbnQ2NEJFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4KSBzdHlsZVxuICAgICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBmcm9tU3RyaW5nKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSwgcmFkZGl4IHx8IDEwKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWYWxpZEJ1ZmZlcih2YWx1ZSwgcmFkZGl4KSkge1xuICAgICAgICBmcm9tQXJyYXkoYnVmZmVyLCBvZmZzZXQsIHZhbHVlLCByYWRkaXgpO1xuICAgICAgfSBlbHNlIGlmIChcIm51bWJlclwiID09PSB0eXBlb2YgcmFkZGl4KSB7XG4gICAgICAgIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NILCB2YWx1ZSk7IC8vIGhpZ2hcbiAgICAgICAgd3JpdGVJbnQzMihidWZmZXIsIG9mZnNldCArIHBvc0wsIHJhZGRpeCk7IC8vIGxvd1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgZnJvbVBvc2l0aXZlKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSk7IC8vIHBvc2l0aXZlXG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICBmcm9tTmVnYXRpdmUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKTsgLy8gbmVnYXRpdmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyb21BcnJheShidWZmZXIsIG9mZnNldCwgWkVSTywgMCk7IC8vIHplcm8sIE5hTiBhbmQgb3RoZXJzXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJvbVN0cmluZyhidWZmZXIsIG9mZnNldCwgc3RyLCByYWRkaXgpIHtcbiAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgdmFyIGxlbiA9IHN0ci5sZW5ndGg7XG4gICAgICB2YXIgaGlnaCA9IDA7XG4gICAgICB2YXIgbG93ID0gMDtcbiAgICAgIGlmIChzdHJbMF0gPT09IFwiLVwiKSBwb3MrKztcbiAgICAgIHZhciBzaWduID0gcG9zO1xuICAgICAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgICAgICB2YXIgY2hyID0gcGFyc2VJbnQoc3RyW3BvcysrXSwgcmFkZGl4KTtcbiAgICAgICAgaWYgKCEoY2hyID49IDApKSBicmVhazsgLy8gTmFOXG4gICAgICAgIGxvdyA9IGxvdyAqIHJhZGRpeCArIGNocjtcbiAgICAgICAgaGlnaCA9IGhpZ2ggKiByYWRkaXggKyBNYXRoLmZsb29yKGxvdyAvIEJJVDMyKTtcbiAgICAgICAgbG93ICU9IEJJVDMyO1xuICAgICAgfVxuICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgaGlnaCA9IH5oaWdoO1xuICAgICAgICBpZiAobG93KSB7XG4gICAgICAgICAgbG93ID0gQklUMzIgLSBsb3c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlnaCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCwgaGlnaCk7XG4gICAgICB3cml0ZUludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCwgbG93KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b051bWJlcigpIHtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHZhciBoaWdoID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zSCk7XG4gICAgICB2YXIgbG93ID0gcmVhZEludDMyKGJ1ZmZlciwgb2Zmc2V0ICsgcG9zTCk7XG4gICAgICBpZiAoIXVuc2lnbmVkKSBoaWdoIHw9IDA7IC8vIGEgdHJpY2sgdG8gZ2V0IHNpZ25lZFxuICAgICAgcmV0dXJuIGhpZ2ggPyAoaGlnaCAqIEJJVDMyICsgbG93KSA6IGxvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZyhyYWRpeCkge1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgdmFyIGhpZ2ggPSByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NIKTtcbiAgICAgIHZhciBsb3cgPSByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQgKyBwb3NMKTtcbiAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgdmFyIHNpZ24gPSAhdW5zaWduZWQgJiYgKGhpZ2ggJiAweDgwMDAwMDAwKTtcbiAgICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpZ2ggPSB+aGlnaDtcbiAgICAgICAgbG93ID0gQklUMzIgLSBsb3c7XG4gICAgICB9XG4gICAgICByYWRpeCA9IHJhZGl4IHx8IDEwO1xuICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgdmFyIG1vZCA9IChoaWdoICUgcmFkaXgpICogQklUMzIgKyBsb3c7XG4gICAgICAgIGhpZ2ggPSBNYXRoLmZsb29yKGhpZ2ggLyByYWRpeCk7XG4gICAgICAgIGxvdyA9IE1hdGguZmxvb3IobW9kIC8gcmFkaXgpO1xuICAgICAgICBzdHIgPSAobW9kICUgcmFkaXgpLnRvU3RyaW5nKHJhZGl4KSArIHN0cjtcbiAgICAgICAgaWYgKCFoaWdoICYmICFsb3cpIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgc3RyID0gXCItXCIgKyBzdHI7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdyaXRlSW50MzIoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zM10gPSB2YWx1ZSAmIDI1NTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gODtcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyBwb3MyXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgPSB2YWx1ZSA+PiA4O1xuICAgICAgYnVmZmVyW29mZnNldCArIHBvczFdID0gdmFsdWUgJiAyNTU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID4+IDg7XG4gICAgICBidWZmZXJbb2Zmc2V0ICsgcG9zMF0gPSB2YWx1ZSAmIDI1NTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkSW50MzIoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICAgIHJldHVybiAoYnVmZmVyW29mZnNldCArIHBvczBdICogQklUMjQpICtcbiAgICAgICAgKGJ1ZmZlcltvZmZzZXQgKyBwb3MxXSA8PCAxNikgK1xuICAgICAgICAoYnVmZmVyW29mZnNldCArIHBvczJdIDw8IDgpICtcbiAgICAgICAgYnVmZmVyW29mZnNldCArIHBvczNdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQXJyYXkocmF3KSB7XG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICBzdG9yYWdlID0gbnVsbDsgLy8gQXJyYXlcbiAgICBpZiAocmF3ICE9PSBmYWxzZSAmJiBvZmZzZXQgPT09IDAgJiYgYnVmZmVyLmxlbmd0aCA9PT0gOCAmJiBpc0FycmF5KGJ1ZmZlcikpIHJldHVybiBidWZmZXI7XG4gICAgcmV0dXJuIG5ld0FycmF5KGJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQnVmZmVyKHJhdykge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgc3RvcmFnZSA9IEJVRkZFUjtcbiAgICBpZiAocmF3ICE9PSBmYWxzZSAmJiBvZmZzZXQgPT09IDAgJiYgYnVmZmVyLmxlbmd0aCA9PT0gOCAmJiBCdWZmZXIuaXNCdWZmZXIoYnVmZmVyKSkgcmV0dXJuIGJ1ZmZlcjtcbiAgICB2YXIgZGVzdCA9IG5ldyBCVUZGRVIoOCk7XG4gICAgZnJvbUFycmF5KGRlc3QsIDAsIGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQXJyYXlCdWZmZXIocmF3KSB7XG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgYXJyYnVmID0gYnVmZmVyLmJ1ZmZlcjtcbiAgICBzdG9yYWdlID0gVUlOVDhBUlJBWTtcbiAgICBpZiAocmF3ICE9PSBmYWxzZSAmJiBvZmZzZXQgPT09IDAgJiYgKGFycmJ1ZiBpbnN0YW5jZW9mIEFSUkFZQlVGRkVSKSAmJiBhcnJidWYuYnl0ZUxlbmd0aCA9PT0gOCkgcmV0dXJuIGFycmJ1ZjtcbiAgICB2YXIgZGVzdCA9IG5ldyBVSU5UOEFSUkFZKDgpO1xuICAgIGZyb21BcnJheShkZXN0LCAwLCBidWZmZXIsIG9mZnNldCk7XG4gICAgcmV0dXJuIGRlc3QuYnVmZmVyO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZEJ1ZmZlcihidWZmZXIsIG9mZnNldCkge1xuICAgIHZhciBsZW4gPSBidWZmZXIgJiYgYnVmZmVyLmxlbmd0aDtcbiAgICBvZmZzZXQgfD0gMDtcbiAgICByZXR1cm4gbGVuICYmIChvZmZzZXQgKyA4IDw9IGxlbikgJiYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBidWZmZXJbb2Zmc2V0XSk7XG4gIH1cblxuICBmdW5jdGlvbiBmcm9tQXJyYXkoZGVzdGJ1ZiwgZGVzdG9mZiwgc3JjYnVmLCBzcmNvZmYpIHtcbiAgICBkZXN0b2ZmIHw9IDA7XG4gICAgc3Jjb2ZmIHw9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIGRlc3RidWZbZGVzdG9mZisrXSA9IHNyY2J1ZltzcmNvZmYrK10gJiAyNTU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbmV3QXJyYXkoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmZmVyLCBvZmZzZXQsIG9mZnNldCArIDgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJvbVBvc2l0aXZlQkUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgdmFyIHBvcyA9IG9mZnNldCArIDg7XG4gICAgd2hpbGUgKHBvcyA+IG9mZnNldCkge1xuICAgICAgYnVmZmVyWy0tcG9zXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21OZWdhdGl2ZUJFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBwb3MgPSBvZmZzZXQgKyA4O1xuICAgIHZhbHVlKys7XG4gICAgd2hpbGUgKHBvcyA+IG9mZnNldCkge1xuICAgICAgYnVmZmVyWy0tcG9zXSA9ICgoLXZhbHVlKSAmIDI1NSkgXiAyNTU7XG4gICAgICB2YWx1ZSAvPSAyNTY7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZnJvbVBvc2l0aXZlTEUoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgdmFyIGVuZCA9IG9mZnNldCArIDg7XG4gICAgd2hpbGUgKG9mZnNldCA8IGVuZCkge1xuICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlICYgMjU1O1xuICAgICAgdmFsdWUgLz0gMjU2O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyb21OZWdhdGl2ZUxFKGJ1ZmZlciwgb2Zmc2V0LCB2YWx1ZSkge1xuICAgIHZhciBlbmQgPSBvZmZzZXQgKyA4O1xuICAgIHZhbHVlKys7XG4gICAgd2hpbGUgKG9mZnNldCA8IGVuZCkge1xuICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICgoLXZhbHVlKSAmIDI1NSkgXiAyNTU7XG4gICAgICB2YWx1ZSAvPSAyNTY7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JldHJvZm94L2lzLWFycmF5XG4gIGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICAgIHJldHVybiAhIXZhbCAmJiBcIltvYmplY3QgQXJyYXldXCIgPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCk7XG4gIH1cblxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnID8gZXhwb3J0cyA6ICh0aGlzIHx8IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pbnQ2NC1idWZmZXIvaW50NjQtYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlYWQtY29yZS5qc1xuXG52YXIgRXh0QnVmZmVyID0gcmVxdWlyZShcIi4vZXh0LWJ1ZmZlclwiKS5FeHRCdWZmZXI7XG52YXIgRXh0VW5wYWNrZXIgPSByZXF1aXJlKFwiLi9leHQtdW5wYWNrZXJcIik7XG52YXIgcmVhZFVpbnQ4ID0gcmVxdWlyZShcIi4vcmVhZC1mb3JtYXRcIikucmVhZFVpbnQ4O1xudmFyIFJlYWRUb2tlbiA9IHJlcXVpcmUoXCIuL3JlYWQtdG9rZW5cIik7XG52YXIgQ29kZWNCYXNlID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKTtcblxuQ29kZWNCYXNlLmluc3RhbGwoe1xuICBhZGRFeHRVbnBhY2tlcjogYWRkRXh0VW5wYWNrZXIsXG4gIGdldEV4dFVucGFja2VyOiBnZXRFeHRVbnBhY2tlcixcbiAgaW5pdDogaW5pdFxufSk7XG5cbmV4cG9ydHMucHJlc2V0ID0gaW5pdC5jYWxsKENvZGVjQmFzZS5wcmVzZXQpO1xuXG5mdW5jdGlvbiBnZXREZWNvZGVyKG9wdGlvbnMpIHtcbiAgdmFyIHJlYWRUb2tlbiA9IFJlYWRUb2tlbi5nZXRSZWFkVG9rZW4ob3B0aW9ucyk7XG4gIHJldHVybiBkZWNvZGU7XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGRlY29kZXIpIHtcbiAgICB2YXIgdHlwZSA9IHJlYWRVaW50OChkZWNvZGVyKTtcbiAgICB2YXIgZnVuYyA9IHJlYWRUb2tlblt0eXBlXTtcbiAgICBpZiAoIWZ1bmMpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZTogXCIgKyAodHlwZSA/IChcIjB4XCIgKyB0eXBlLnRvU3RyaW5nKDE2KSkgOiB0eXBlKSk7XG4gICAgcmV0dXJuIGZ1bmMoZGVjb2Rlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gIHRoaXMuZGVjb2RlID0gZ2V0RGVjb2RlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByZXNldCkge1xuICAgIEV4dFVucGFja2VyLnNldEV4dFVucGFja2Vycyh0aGlzKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBhZGRFeHRVbnBhY2tlcihldHlwZSwgdW5wYWNrZXIpIHtcbiAgdmFyIHVucGFja2VycyA9IHRoaXMuZXh0VW5wYWNrZXJzIHx8ICh0aGlzLmV4dFVucGFja2VycyA9IFtdKTtcbiAgdW5wYWNrZXJzW2V0eXBlXSA9IENvZGVjQmFzZS5maWx0ZXIodW5wYWNrZXIpO1xufVxuXG5mdW5jdGlvbiBnZXRFeHRVbnBhY2tlcih0eXBlKSB7XG4gIHZhciB1bnBhY2tlcnMgPSB0aGlzLmV4dFVucGFja2VycyB8fCAodGhpcy5leHRVbnBhY2tlcnMgPSBbXSk7XG4gIHJldHVybiB1bnBhY2tlcnNbdHlwZV0gfHwgZXh0VW5wYWNrZXI7XG5cbiAgZnVuY3Rpb24gZXh0VW5wYWNrZXIoYnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBFeHRCdWZmZXIoYnVmZmVyLCB0eXBlKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9yZWFkLWNvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNsb3RMaXN0XzEgPSByZXF1aXJlKFwiLi9TbG90TGlzdFwiKTtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9TbG90XCIpO1xuLyoqXG4gKiBBbGxvd3MgdGhlIHZhbHVlQ2xhc3NlcyB0byBiZSBzZXQgaW4gTVhNTCwgZS5nLlxuICogPHNpZ25hbHM6U2lnbmFsIGlkPVwibmFtZUNoYW5nZWRcIj57W1N0cmluZywgdWludF19PC9zaWduYWxzOlNpZ25hbD5cbiAqL1xuLypbRGVmYXVsdFByb3BlcnR5KFwidmFsdWVDbGFzc2VzXCIpXSovXG4vKipcbiAqIFNpZ25hbCBkaXNwYXRjaGVzIGV2ZW50cyB0byBtdWx0aXBsZSBsaXN0ZW5lcnMuXG4gKiBJdCBpcyBpbnNwaXJlZCBieSBDIyBldmVudHMgYW5kIGRlbGVnYXRlcywgYW5kIGJ5XG4gKiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU2lnbmFsc19hbmRfc2xvdHNcIj5zaWduYWxzIGFuZCBzbG90czwvYT5cbiAqIGluIFF0LlxuICogQSBTaWduYWwgYWRkcyBldmVudCBkaXNwYXRjaGluZyBmdW5jdGlvbmFsaXR5IHRocm91Z2ggY29tcG9zaXRpb24gYW5kIGludGVyZmFjZXMsXG4gKiByYXRoZXIgdGhhbiBpbmhlcml0aW5nIGZyb20gYSBkaXNwYXRjaGVyLlxuICogPGJyLz48YnIvPlxuICogUHJvamVjdCBob21lOiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy9cIj5odHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvPC9hPlxuICovXG52YXIgT25jZVNpZ25hbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNpZ25hbCBpbnN0YW5jZSB0byBkaXNwYXRjaCB2YWx1ZSBvYmplY3RzLlxuICAgICAqIEBwYXJhbSAgICB2YWx1ZUNsYXNzZXMgQW55IG51bWJlciBvZiBjbGFzcyByZWZlcmVuY2VzIHRoYXQgZW5hYmxlIHR5cGUgY2hlY2tzIGluIGRpc3BhdGNoKCkuXG4gICAgICogRm9yIGV4YW1wbGUsIG5ldyBTaWduYWwoU3RyaW5nLCB1aW50KVxuICAgICAqIHdvdWxkIGFsbG93OiBzaWduYWwuZGlzcGF0Y2goXCJ0aGUgQW5zd2VyXCIsIDQyKVxuICAgICAqIGJ1dCBub3Q6IHNpZ25hbC5kaXNwYXRjaCh0cnVlLCA0Mi41KVxuICAgICAqIG5vcjogc2lnbmFsLmRpc3BhdGNoKClcbiAgICAgKlxuICAgICAqIE5PVEU6IEluIEFTMywgc3ViY2xhc3NlcyBjYW5ub3QgY2FsbCBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLFxuICAgICAqIGJ1dCB0aGlzIGNvbnN0cnVjdG9yIGhhcyBsb2dpYyB0byBzdXBwb3J0IHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gT25jZVNpZ25hbCgpIHtcbiAgICAgICAgdmFyIHZhbHVlQ2xhc3NlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVDbGFzc2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbG90cyA9IFNsb3RMaXN0XzEuU2xvdExpc3QuTklMO1xuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHRoaXMudmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPbmNlU2lnbmFsLnByb3RvdHlwZSwgXCJ2YWx1ZUNsYXNzZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogaXRlbSBhdCBpbmRleCBzaG91bGQgYmUgYSBDbGFzcyBidXQgd2FzIG5vdC5cbiAgICAgICAgICovXG4gICAgICAgIC8qW0FycmF5RWxlbWVudFR5cGUoXCJDbGFzc1wiKV0qL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBDbG9uZSBzbyB0aGUgQXJyYXkgY2Fubm90IGJlIGFmZmVjdGVkIGZyb20gb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2xhc3NlcyA9IHZhbHVlID8gdmFsdWUuc2xpY2UoKSA6IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl92YWx1ZUNsYXNzZXNbaV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZUNsYXNzZXMgYXJndW1lbnQ6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW0gYXQgaW5kZXggJyArIGkgKyAnIHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXM6PCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSk7IC8vQENIQU5HRUQgLSB0ZW1wIHJlcGxhY2VtZW50IGZvciBnZXRRdWFsaWZpZWRDbGFzc0J5TmFtZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT25jZVNpZ25hbC5wcm90b3R5cGUsIFwibnVtTGlzdGVuZXJzXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdHMubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLmFkZE9uY2UgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIHNsb3QgPSB0aGlzLnNsb3RzLmZpbmQobGlzdGVuZXIpO1xuICAgICAgICBpZiAoIXNsb3QpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5zbG90cyA9IHRoaXMuc2xvdHMuZmlsdGVyTm90KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHNsb3Q7XG4gICAgfTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2xvdHMgPSBTbG90TGlzdF8xLlNsb3RMaXN0Lk5JTDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdmFsdWVDbGFzc2VzIGlzIGVtcHR5LCB2YWx1ZSBvYmplY3RzIGFyZSBub3QgdHlwZS1jaGVja2VkLlxuICAgICAgICB2YXIgbnVtVmFsdWVDbGFzc2VzID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBmZXdlciBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA8IG51bVZhbHVlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGF0IGxlYXN0ICcgKyBudW1WYWx1ZUNsYXNzZXMgKyAnIGJ1dCByZWNlaXZlZCAnICtcbiAgICAgICAgICAgICAgICBudW1WYWx1ZU9iamVjdHMgKyAnLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBkaWZmZXJlbnRseSB0eXBlZCBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1WYWx1ZUNsYXNzZXM7IGkrKykge1xuICAgICAgICAgICAgLy8gT3B0aW1pemVkIGZvciB0aGUgb3B0aW1pc3RpYyBjYXNlIHRoYXQgdmFsdWVzIGFyZSBjb3JyZWN0LlxuICAgICAgICAgICAgaWYgKHZhbHVlT2JqZWN0c1tpXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICh2YWx1ZU9iamVjdHNbaV0gaW5zdGFuY2VvZiB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gfHwgdmFsdWVPYmplY3RzW2ldLmNvbnN0cnVjdG9yID09PSB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG9iamVjdCA8JyArIHZhbHVlT2JqZWN0c1tpXVxuICAgICAgICAgICAgICAgICsgJz4gaXMgbm90IGFuIGluc3RhbmNlIG9mIDwnICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRvIGxpc3RlbmVycy5cbiAgICAgICAgdmFyIHNsb3RzVG9Qcm9jZXNzID0gdGhpcy5zbG90cztcbiAgICAgICAgaWYgKHNsb3RzVG9Qcm9jZXNzLm5vbkVtcHR5KSB7XG4gICAgICAgICAgICB3aGlsZSAoc2xvdHNUb1Byb2Nlc3Mubm9uRW1wdHkpIHtcbiAgICAgICAgICAgICAgICBzbG90c1RvUHJvY2Vzcy5oZWFkLmV4ZWN1dGUodmFsdWVPYmplY3RzKTtcbiAgICAgICAgICAgICAgICBzbG90c1RvUHJvY2VzcyA9IHNsb3RzVG9Qcm9jZXNzLnRhaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uUG9zc2libGUobGlzdGVuZXIsIG9uY2UpKSB7XG4gICAgICAgICAgICB2YXIgbmV3U2xvdCA9IG5ldyBTbG90XzEuU2xvdChsaXN0ZW5lciwgdGhpcywgb25jZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3RzID0gdGhpcy5zbG90cy5wcmVwZW5kKG5ld1Nsb3QpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1Nsb3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdHMuZmluZChsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPbmNlU2lnbmFsLnByb3RvdHlwZS5yZWdpc3RyYXRpb25Qb3NzaWJsZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSkge1xuICAgICAgICBpZiAoIXRoaXMuc2xvdHMubm9uRW1wdHkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIGV4aXN0aW5nU2xvdCA9IHRoaXMuc2xvdHMuZmluZChsaXN0ZW5lcik7XG4gICAgICAgIGlmICghZXhpc3RpbmdTbG90KVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChleGlzdGluZ1Nsb3Qub25jZSAhPSBvbmNlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgd2FzIHByZXZpb3VzbHkgYWRkZWQsIGRlZmluaXRlbHkgZG9uJ3QgYWRkIGl0IGFnYWluLlxuICAgICAgICAgICAgLy8gQnV0IHRocm93IGFuIGV4Y2VwdGlvbiBpZiB0aGVpciBvbmNlIHZhbHVlcyBkaWZmZXIuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gTGlzdGVuZXIgd2FzIGFscmVhZHkgcmVnaXN0ZXJlZC5cbiAgICB9O1xuICAgIHJldHVybiBPbmNlU2lnbmFsO1xufSgpKTtcbmV4cG9ydHMuT25jZVNpZ25hbCA9IE9uY2VTaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PbmNlU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvT25jZVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBVc2UgY29kZXMgYmV0d2VlbiAwfjEyNyBmb3IgbGVzc2VyIHRocm91Z2hwdXQgKDEgYnl0ZSlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQcm90b2NvbDtcbihmdW5jdGlvbiAoUHJvdG9jb2wpIHtcbiAgICAvLyBVc2VyLXJlbGF0ZWQgKDB+MTApXG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJVU0VSX0lEXCJdID0gMV0gPSBcIlVTRVJfSURcIjtcbiAgICAvLyBSb29tLXJlbGF0ZWQgKDEwfjIwKVxuICAgIFByb3RvY29sW1Byb3RvY29sW1wiSk9JTl9ST09NXCJdID0gMTBdID0gXCJKT0lOX1JPT01cIjtcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIkpPSU5fRVJST1JcIl0gPSAxMV0gPSBcIkpPSU5fRVJST1JcIjtcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIkxFQVZFX1JPT01cIl0gPSAxMl0gPSBcIkxFQVZFX1JPT01cIjtcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIlJPT01fREFUQVwiXSA9IDEzXSA9IFwiUk9PTV9EQVRBXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJST09NX1NUQVRFXCJdID0gMTRdID0gXCJST09NX1NUQVRFXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJST09NX1NUQVRFX1BBVENIXCJdID0gMTVdID0gXCJST09NX1NUQVRFX1BBVENIXCI7XG4gICAgLy8gR2VuZXJpYyBtZXNzYWdlcyAoNTB+NjApXG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJCQURfUkVRVUVTVFwiXSA9IDUwXSA9IFwiQkFEX1JFUVVFU1RcIjtcbn0pKFByb3RvY29sID0gZXhwb3J0cy5Qcm90b2NvbCB8fCAoZXhwb3J0cy5Qcm90b2NvbCA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Qcm90b2NvbC50c1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZW5jb2RlLmpzXG5cbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuXG52YXIgRW5jb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZW5jb2RlLWJ1ZmZlclwiKS5FbmNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIGVuY29kZShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgZW5jb2RlciA9IG5ldyBFbmNvZGVCdWZmZXIob3B0aW9ucyk7XG4gIGVuY29kZXIud3JpdGUoaW5wdXQpO1xuICByZXR1cm4gZW5jb2Rlci5yZWFkKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZW5jb2RlLWJ1ZmZlci5qc1xuXG5leHBvcnRzLkVuY29kZUJ1ZmZlciA9IEVuY29kZUJ1ZmZlcjtcblxudmFyIHByZXNldCA9IHJlcXVpcmUoXCIuL3dyaXRlLWNvcmVcIikucHJlc2V0O1xuXG52YXIgRmxleEVuY29kZXIgPSByZXF1aXJlKFwiLi9mbGV4LWJ1ZmZlclwiKS5GbGV4RW5jb2RlcjtcblxuRmxleEVuY29kZXIubWl4aW4oRW5jb2RlQnVmZmVyLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIEVuY29kZUJ1ZmZlcihvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbmNvZGVCdWZmZXIpKSByZXR1cm4gbmV3IEVuY29kZUJ1ZmZlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMuY29kZWMpIHtcbiAgICAgIHZhciBjb2RlYyA9IHRoaXMuY29kZWMgPSBvcHRpb25zLmNvZGVjO1xuICAgICAgaWYgKGNvZGVjLmJ1ZmZlcmlzaCkgdGhpcy5idWZmZXJpc2ggPSBjb2RlYy5idWZmZXJpc2g7XG4gICAgfVxuICB9XG59XG5cbkVuY29kZUJ1ZmZlci5wcm90b3R5cGUuY29kZWMgPSBwcmVzZXQ7XG5cbkVuY29kZUJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihpbnB1dCkge1xuICB0aGlzLmNvZGVjLmVuY29kZSh0aGlzLCBpbnB1dCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9lbmNvZGUtYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub2RlLWxpYnMtYnJvd3Nlci9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS11bml0OC5qc1xuXG52YXIgY29uc3RhbnQgPSBleHBvcnRzLnVpbnQ4ID0gbmV3IEFycmF5KDI1Nik7XG5cbmZvciAodmFyIGkgPSAweDAwOyBpIDw9IDB4RkY7IGkrKykge1xuICBjb25zdGFudFtpXSA9IHdyaXRlMChpKTtcbn1cblxuZnVuY3Rpb24gd3JpdGUwKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDEpO1xuICAgIGVuY29kZXIuYnVmZmVyW29mZnNldF0gPSB0eXBlO1xuICB9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi93cml0ZS11aW50OC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmxleC1idWZmZXIuanNcblxuZXhwb3J0cy5GbGV4RGVjb2RlciA9IEZsZXhEZWNvZGVyO1xuZXhwb3J0cy5GbGV4RW5jb2RlciA9IEZsZXhFbmNvZGVyO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xuXG52YXIgTUlOX0JVRkZFUl9TSVpFID0gMjA0ODtcbnZhciBNQVhfQlVGRkVSX1NJWkUgPSA2NTUzNjtcbnZhciBCVUZGRVJfU0hPUlRBR0UgPSBcIkJVRkZFUl9TSE9SVEFHRVwiO1xuXG5mdW5jdGlvbiBGbGV4RGVjb2RlcigpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEZsZXhEZWNvZGVyKSkgcmV0dXJuIG5ldyBGbGV4RGVjb2RlcigpO1xufVxuXG5mdW5jdGlvbiBGbGV4RW5jb2RlcigpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEZsZXhFbmNvZGVyKSkgcmV0dXJuIG5ldyBGbGV4RW5jb2RlcigpO1xufVxuXG5GbGV4RGVjb2Rlci5taXhpbiA9IG1peGluRmFjdG9yeShnZXREZWNvZGVyTWV0aG9kcygpKTtcbkZsZXhEZWNvZGVyLm1peGluKEZsZXhEZWNvZGVyLnByb3RvdHlwZSk7XG5cbkZsZXhFbmNvZGVyLm1peGluID0gbWl4aW5GYWN0b3J5KGdldEVuY29kZXJNZXRob2RzKCkpO1xuRmxleEVuY29kZXIubWl4aW4oRmxleEVuY29kZXIucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gZ2V0RGVjb2Rlck1ldGhvZHMoKSB7XG4gIHJldHVybiB7XG4gICAgYnVmZmVyaXNoOiBCdWZmZXJpc2gsXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIGZldGNoOiBmZXRjaCxcbiAgICBmbHVzaDogZmx1c2gsXG4gICAgcHVzaDogcHVzaCxcbiAgICBwdWxsOiBwdWxsLFxuICAgIHJlYWQ6IHJlYWQsXG4gICAgcmVzZXJ2ZTogcmVzZXJ2ZSxcbiAgICBvZmZzZXQ6IDBcbiAgfTtcblxuICBmdW5jdGlvbiB3cml0ZShjaHVuaykge1xuICAgIHZhciBwcmV2ID0gdGhpcy5vZmZzZXQgPyBCdWZmZXJpc2gucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5idWZmZXIsIHRoaXMub2Zmc2V0KSA6IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMuYnVmZmVyID0gcHJldiA/IChjaHVuayA/IHRoaXMuYnVmZmVyaXNoLmNvbmNhdChbcHJldiwgY2h1bmtdKSA6IHByZXYpIDogY2h1bms7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKHRoaXMub2Zmc2V0IDwgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5mZXRjaCgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSAmJiBlLm1lc3NhZ2UgIT0gQlVGRkVSX1NIT1JUQUdFKSB0aHJvdyBlO1xuICAgICAgICAvLyByb2xsYmFja1xuICAgICAgICB0aGlzLm9mZnNldCA9IHN0YXJ0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXJ2ZShsZW5ndGgpIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGg7XG4gICAgaWYgKGVuZCA+IHRoaXMuYnVmZmVyLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKEJVRkZFUl9TSE9SVEFHRSk7XG4gICAgdGhpcy5vZmZzZXQgPSBlbmQ7XG4gICAgcmV0dXJuIHN0YXJ0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVuY29kZXJNZXRob2RzKCkge1xuICByZXR1cm4ge1xuICAgIGJ1ZmZlcmlzaDogQnVmZmVyaXNoLFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICBmZXRjaDogZmV0Y2gsXG4gICAgZmx1c2g6IGZsdXNoLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcHVsbDogcHVsbCxcbiAgICByZWFkOiByZWFkLFxuICAgIHJlc2VydmU6IHJlc2VydmUsXG4gICAgc2VuZDogc2VuZCxcbiAgICBtYXhCdWZmZXJTaXplOiBNQVhfQlVGRkVSX1NJWkUsXG4gICAgbWluQnVmZmVyU2l6ZTogTUlOX0JVRkZFUl9TSVpFLFxuICAgIG9mZnNldDogMCxcbiAgICBzdGFydDogMFxuICB9O1xuXG4gIGZ1bmN0aW9uIGZldGNoKCkge1xuICAgIHZhciBzdGFydCA9IHRoaXMuc3RhcnQ7XG4gICAgaWYgKHN0YXJ0IDwgdGhpcy5vZmZzZXQpIHtcbiAgICAgIHZhciBlbmQgPSB0aGlzLnN0YXJ0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICByZXR1cm4gQnVmZmVyaXNoLnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYnVmZmVyLCBzdGFydCwgZW5kKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAodGhpcy5zdGFydCA8IHRoaXMub2Zmc2V0KSB7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLmZldGNoKCk7XG4gICAgICBpZiAodmFsdWUpIHRoaXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHVsbCgpIHtcbiAgICB2YXIgYnVmZmVycyA9IHRoaXMuYnVmZmVycyB8fCAodGhpcy5idWZmZXJzID0gW10pO1xuICAgIHZhciBjaHVuayA9IGJ1ZmZlcnMubGVuZ3RoID4gMSA/IHRoaXMuYnVmZmVyaXNoLmNvbmNhdChidWZmZXJzKSA6IGJ1ZmZlcnNbMF07XG4gICAgYnVmZmVycy5sZW5ndGggPSAwOyAvLyBidWZmZXIgZXhoYXVzdGVkXG4gICAgcmV0dXJuIGNodW5rO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXJ2ZShsZW5ndGgpIHtcbiAgICB2YXIgcmVxID0gbGVuZ3RoIHwgMDtcblxuICAgIGlmICh0aGlzLmJ1ZmZlcikge1xuICAgICAgdmFyIHNpemUgPSB0aGlzLmJ1ZmZlci5sZW5ndGg7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldCB8IDA7XG4gICAgICB2YXIgZW5kID0gc3RhcnQgKyByZXE7XG5cbiAgICAgIC8vIGlzIGl0IGxvbmcgZW5vdWdoP1xuICAgICAgaWYgKGVuZCA8IHNpemUpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBlbmQ7XG4gICAgICAgIHJldHVybiBzdGFydDtcbiAgICAgIH1cblxuICAgICAgLy8gZmx1c2ggY3VycmVudCBidWZmZXJcbiAgICAgIHRoaXMuZmx1c2goKTtcblxuICAgICAgLy8gcmVzaXplIGl0IHRvIDJ4IGN1cnJlbnQgbGVuZ3RoXG4gICAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIE1hdGgubWluKHNpemUgKiAyLCB0aGlzLm1heEJ1ZmZlclNpemUpKTtcbiAgICB9XG5cbiAgICAvLyBtaW5pbXVtIGJ1ZmZlciBzaXplXG4gICAgbGVuZ3RoID0gTWF0aC5tYXgobGVuZ3RoLCB0aGlzLm1pbkJ1ZmZlclNpemUpO1xuXG4gICAgLy8gYWxsb2NhdGUgbmV3IGJ1ZmZlclxuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5idWZmZXJpc2guYWxsb2MobGVuZ3RoKTtcbiAgICB0aGlzLnN0YXJ0ID0gMDtcbiAgICB0aGlzLm9mZnNldCA9IHJlcTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbmQoYnVmZmVyKSB7XG4gICAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA+IHRoaXMubWluQnVmZmVyU2l6ZSkge1xuICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgdGhpcy5wdXNoKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnJlc2VydmUobGVuZ3RoKTtcbiAgICAgIEJ1ZmZlcmlzaC5wcm90b3R5cGUuY29weS5jYWxsKGJ1ZmZlciwgdGhpcy5idWZmZXIsIG9mZnNldCk7XG4gICAgfVxuICB9XG59XG5cbi8vIGNvbW1vbiBtZXRob2RzXG5cbmZ1bmN0aW9uIHdyaXRlKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJtZXRob2Qgbm90IGltcGxlbWVudGVkOiB3cml0ZSgpXCIpO1xufVxuXG5mdW5jdGlvbiBmZXRjaCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwibWV0aG9kIG5vdCBpbXBsZW1lbnRlZDogZmV0Y2goKVwiKTtcbn1cblxuZnVuY3Rpb24gcmVhZCgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMuYnVmZmVycyAmJiB0aGlzLmJ1ZmZlcnMubGVuZ3RoO1xuXG4gIC8vIGZldGNoIHRoZSBmaXJzdCByZXN1bHRcbiAgaWYgKCFsZW5ndGgpIHJldHVybiB0aGlzLmZldGNoKCk7XG5cbiAgLy8gZmx1c2ggY3VycmVudCBidWZmZXJcbiAgdGhpcy5mbHVzaCgpO1xuXG4gIC8vIHJlYWQgZnJvbSB0aGUgcmVzdWx0c1xuICByZXR1cm4gdGhpcy5wdWxsKCk7XG59XG5cbmZ1bmN0aW9uIHB1c2goY2h1bmspIHtcbiAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMgfHwgKHRoaXMuYnVmZmVycyA9IFtdKTtcbiAgYnVmZmVycy5wdXNoKGNodW5rKTtcbn1cblxuZnVuY3Rpb24gcHVsbCgpIHtcbiAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMgfHwgKHRoaXMuYnVmZmVycyA9IFtdKTtcbiAgcmV0dXJuIGJ1ZmZlcnMuc2hpZnQoKTtcbn1cblxuZnVuY3Rpb24gbWl4aW5GYWN0b3J5KHNvdXJjZSkge1xuICByZXR1cm4gbWl4aW47XG5cbiAgZnVuY3Rpb24gbWl4aW4odGFyZ2V0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9mbGV4LWJ1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZGVjb2RlLmpzXG5cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuXG52YXIgRGVjb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZGVjb2RlLWJ1ZmZlclwiKS5EZWNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgZGVjb2RlciA9IG5ldyBEZWNvZGVCdWZmZXIob3B0aW9ucyk7XG4gIGRlY29kZXIud3JpdGUoaW5wdXQpO1xuICByZXR1cm4gZGVjb2Rlci5yZWFkKCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGRlY29kZS1idWZmZXIuanNcblxuZXhwb3J0cy5EZWNvZGVCdWZmZXIgPSBEZWNvZGVCdWZmZXI7XG5cbnZhciBwcmVzZXQgPSByZXF1aXJlKFwiLi9yZWFkLWNvcmVcIikucHJlc2V0O1xuXG52YXIgRmxleERlY29kZXIgPSByZXF1aXJlKFwiLi9mbGV4LWJ1ZmZlclwiKS5GbGV4RGVjb2RlcjtcblxuRmxleERlY29kZXIubWl4aW4oRGVjb2RlQnVmZmVyLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIERlY29kZUJ1ZmZlcihvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBEZWNvZGVCdWZmZXIpKSByZXR1cm4gbmV3IERlY29kZUJ1ZmZlcihvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMuY29kZWMpIHtcbiAgICAgIHZhciBjb2RlYyA9IHRoaXMuY29kZWMgPSBvcHRpb25zLmNvZGVjO1xuICAgICAgaWYgKGNvZGVjLmJ1ZmZlcmlzaCkgdGhpcy5idWZmZXJpc2ggPSBjb2RlYy5idWZmZXJpc2g7XG4gICAgfVxuICB9XG59XG5cbkRlY29kZUJ1ZmZlci5wcm90b3R5cGUuY29kZWMgPSBwcmVzZXQ7XG5cbkRlY29kZUJ1ZmZlci5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY29kZWMuZGVjb2RlKHRoaXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2RlLWJ1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVhZC1mb3JtYXQuanNcblxudmFyIGllZWU3NTQgPSByZXF1aXJlKFwiaWVlZTc1NFwiKTtcbnZhciBJbnQ2NEJ1ZmZlciA9IHJlcXVpcmUoXCJpbnQ2NC1idWZmZXJcIik7XG52YXIgVWludDY0QkUgPSBJbnQ2NEJ1ZmZlci5VaW50NjRCRTtcbnZhciBJbnQ2NEJFID0gSW50NjRCdWZmZXIuSW50NjRCRTtcblxuZXhwb3J0cy5nZXRSZWFkRm9ybWF0ID0gZ2V0UmVhZEZvcm1hdDtcbmV4cG9ydHMucmVhZFVpbnQ4ID0gdWludDg7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyUHJvdG8gPSByZXF1aXJlKFwiLi9idWZmZXJpc2gtcHJvdG9cIik7XG5cbnZhciBIQVNfTUFQID0gKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBNYXApO1xudmFyIE5PX0FTU0VSVCA9IHRydWU7XG5cbmZ1bmN0aW9uIGdldFJlYWRGb3JtYXQob3B0aW9ucykge1xuICB2YXIgYmluYXJyYXlidWZmZXIgPSBCdWZmZXJpc2guaGFzQXJyYXlCdWZmZXIgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmJpbmFycmF5YnVmZmVyO1xuICB2YXIgaW50NjQgPSBvcHRpb25zICYmIG9wdGlvbnMuaW50NjQ7XG4gIHZhciB1c2VtYXAgPSBIQVNfTUFQICYmIG9wdGlvbnMgJiYgb3B0aW9ucy51c2VtYXA7XG5cbiAgdmFyIHJlYWRGb3JtYXQgPSB7XG4gICAgbWFwOiAodXNlbWFwID8gbWFwX3RvX21hcCA6IG1hcF90b19vYmopLFxuICAgIGFycmF5OiBhcnJheSxcbiAgICBzdHI6IHN0cixcbiAgICBiaW46IChiaW5hcnJheWJ1ZmZlciA/IGJpbl9hcnJheWJ1ZmZlciA6IGJpbl9idWZmZXIpLFxuICAgIGV4dDogZXh0LFxuICAgIHVpbnQ4OiB1aW50OCxcbiAgICB1aW50MTY6IHVpbnQxNixcbiAgICB1aW50MzI6IHVpbnQzMixcbiAgICB1aW50NjQ6IHJlYWQoOCwgaW50NjQgPyByZWFkVUludDY0QkVfaW50NjQgOiByZWFkVUludDY0QkUpLFxuICAgIGludDg6IGludDgsXG4gICAgaW50MTY6IGludDE2LFxuICAgIGludDMyOiBpbnQzMixcbiAgICBpbnQ2NDogcmVhZCg4LCBpbnQ2NCA/IHJlYWRJbnQ2NEJFX2ludDY0IDogcmVhZEludDY0QkUpLFxuICAgIGZsb2F0MzI6IHJlYWQoNCwgcmVhZEZsb2F0QkUpLFxuICAgIGZsb2F0NjQ6IHJlYWQoOCwgcmVhZERvdWJsZUJFKVxuICB9O1xuXG4gIHJldHVybiByZWFkRm9ybWF0O1xufVxuXG5mdW5jdGlvbiBtYXBfdG9fb2JqKGRlY29kZXIsIGxlbikge1xuICB2YXIgdmFsdWUgPSB7fTtcbiAgdmFyIGk7XG4gIHZhciBrID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciB2ID0gbmV3IEFycmF5KGxlbik7XG5cbiAgdmFyIGRlY29kZSA9IGRlY29kZXIuY29kZWMuZGVjb2RlO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICAgIHZbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFsdWVba1tpXV0gPSB2W2ldO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gbWFwX3RvX21hcChkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0gbmV3IE1hcCgpO1xuICB2YXIgaTtcbiAgdmFyIGsgPSBuZXcgQXJyYXkobGVuKTtcbiAgdmFyIHYgPSBuZXcgQXJyYXkobGVuKTtcblxuICB2YXIgZGVjb2RlID0gZGVjb2Rlci5jb2RlYy5kZWNvZGU7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtbaV0gPSBkZWNvZGUoZGVjb2Rlcik7XG4gICAgdltpXSA9IGRlY29kZShkZWNvZGVyKTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YWx1ZS5zZXQoa1tpXSwgdltpXSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhcnJheShkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHZhbHVlID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciBkZWNvZGUgPSBkZWNvZGVyLmNvZGVjLmRlY29kZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbHVlW2ldID0gZGVjb2RlKGRlY29kZXIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gc3RyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICByZXR1cm4gQnVmZmVyUHJvdG8udG9TdHJpbmcuY2FsbChkZWNvZGVyLmJ1ZmZlciwgXCJ1dGYtOFwiLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gYmluX2J1ZmZlcihkZWNvZGVyLCBsZW4pIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKGxlbik7XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gQnVmZmVyaXNoLmZyb20oYnVmKTtcbn1cblxuZnVuY3Rpb24gYmluX2FycmF5YnVmZmVyKGRlY29kZXIsIGxlbikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICB2YXIgYnVmID0gQnVmZmVyUHJvdG8uc2xpY2UuY2FsbChkZWNvZGVyLmJ1ZmZlciwgc3RhcnQsIGVuZCk7XG4gIHJldHVybiBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKGJ1ZikuYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBleHQoZGVjb2RlciwgbGVuKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZShsZW4rMSk7XG4gIHZhciB0eXBlID0gZGVjb2Rlci5idWZmZXJbc3RhcnQrK107XG4gIHZhciBlbmQgPSBzdGFydCArIGxlbjtcbiAgdmFyIHVucGFjayA9IGRlY29kZXIuY29kZWMuZ2V0RXh0VW5wYWNrZXIodHlwZSk7XG4gIGlmICghdW5wYWNrKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV4dCB0eXBlOiBcIiArICh0eXBlID8gKFwiMHhcIiArIHR5cGUudG9TdHJpbmcoMTYpKSA6IHR5cGUpKTtcbiAgdmFyIGJ1ZiA9IEJ1ZmZlclByb3RvLnNsaWNlLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBlbmQpO1xuICByZXR1cm4gdW5wYWNrKGJ1Zik7XG59XG5cbmZ1bmN0aW9uIHVpbnQ4KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDEpO1xuICByZXR1cm4gZGVjb2Rlci5idWZmZXJbc3RhcnRdO1xufVxuXG5mdW5jdGlvbiBpbnQ4KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDEpO1xuICB2YXIgdmFsdWUgPSBkZWNvZGVyLmJ1ZmZlcltzdGFydF07XG4gIHJldHVybiAodmFsdWUgJiAweDgwKSA/IHZhbHVlIC0gMHgxMDAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdWludDE2KGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDIpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdIDw8IDgpIHwgYnVmZmVyW3N0YXJ0XTtcbn1cblxuZnVuY3Rpb24gaW50MTYoZGVjb2Rlcikge1xuICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUoMik7XG4gIHZhciBidWZmZXIgPSBkZWNvZGVyLmJ1ZmZlcjtcbiAgdmFyIHZhbHVlID0gKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG4gIHJldHVybiAodmFsdWUgJiAweDgwMDApID8gdmFsdWUgLSAweDEwMDAwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVpbnQzMihkZWNvZGVyKSB7XG4gIHZhciBzdGFydCA9IGRlY29kZXIucmVzZXJ2ZSg0KTtcbiAgdmFyIGJ1ZmZlciA9IGRlY29kZXIuYnVmZmVyO1xuICByZXR1cm4gKGJ1ZmZlcltzdGFydCsrXSAqIDE2Nzc3MjE2KSArIChidWZmZXJbc3RhcnQrK10gPDwgMTYpICsgKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSArIGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIGludDMyKGRlY29kZXIpIHtcbiAgdmFyIHN0YXJ0ID0gZGVjb2Rlci5yZXNlcnZlKDQpO1xuICB2YXIgYnVmZmVyID0gZGVjb2Rlci5idWZmZXI7XG4gIHJldHVybiAoYnVmZmVyW3N0YXJ0KytdIDw8IDI0KSB8IChidWZmZXJbc3RhcnQrK10gPDwgMTYpIHwgKGJ1ZmZlcltzdGFydCsrXSA8PCA4KSB8IGJ1ZmZlcltzdGFydF07XG59XG5cbmZ1bmN0aW9uIHJlYWQobGVuLCBtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRlY29kZXIpIHtcbiAgICB2YXIgc3RhcnQgPSBkZWNvZGVyLnJlc2VydmUobGVuKTtcbiAgICByZXR1cm4gbWV0aG9kLmNhbGwoZGVjb2Rlci5idWZmZXIsIHN0YXJ0LCBOT19BU1NFUlQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZWFkVUludDY0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBVaW50NjRCRSh0aGlzLCBzdGFydCkudG9OdW1iZXIoKTtcbn1cblxuZnVuY3Rpb24gcmVhZEludDY0QkUoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBJbnQ2NEJFKHRoaXMsIHN0YXJ0KS50b051bWJlcigpO1xufVxuXG5mdW5jdGlvbiByZWFkVUludDY0QkVfaW50NjQoc3RhcnQpIHtcbiAgcmV0dXJuIG5ldyBVaW50NjRCRSh0aGlzLCBzdGFydCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRJbnQ2NEJFX2ludDY0KHN0YXJ0KSB7XG4gIHJldHVybiBuZXcgSW50NjRCRSh0aGlzLCBzdGFydCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG9hdEJFKHN0YXJ0KSB7XG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgc3RhcnQsIGZhbHNlLCAyMywgNCk7XG59XG5cbmZ1bmN0aW9uIHJlYWREb3VibGVCRShzdGFydCkge1xuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIHN0YXJ0LCBmYWxzZSwgNTIsIDgpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvcmVhZC1mb3JtYXQuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogZXZlbnQtbGl0ZS5qcyAtIExpZ2h0LXdlaWdodCBFdmVudEVtaXR0ZXIgKGxlc3MgdGhhbiAxS0Igd2hlbiBnemlwcGVkKVxuICpcbiAqIEBjb3B5cmlnaHQgWXVzdWtlIEthd2FzYWtpXG4gKiBAbGljZW5zZSBNSVRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20va2F3YW5ldC9ldmVudC1saXRlXG4gKiBAc2VlIGh0dHA6Ly9rYXdhbmV0LmdpdGh1Yi5pby9ldmVudC1saXRlL0V2ZW50TGl0ZS5odG1sXG4gKiBAZXhhbXBsZVxuICogdmFyIEV2ZW50TGl0ZSA9IHJlcXVpcmUoXCJldmVudC1saXRlXCIpO1xuICpcbiAqIGZ1bmN0aW9uIE15Q2xhc3MoKSB7Li4ufSAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzXG4gKlxuICogRXZlbnRMaXRlLm1peGluKE15Q2xhc3MucHJvdG90eXBlKTsgIC8vIGltcG9ydCBldmVudCBtZXRob2RzXG4gKlxuICogdmFyIG9iaiA9IG5ldyBNeUNsYXNzKCk7XG4gKiBvYmoub24oXCJmb29cIiwgZnVuY3Rpb24oKSB7Li4ufSk7ICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJcbiAqIG9iai5vbmNlKFwiYmFyXCIsIGZ1bmN0aW9uKCkgey4uLn0pOyAgIC8vIGFkZCBvbmUtdGltZSBldmVudCBsaXN0ZW5lclxuICogb2JqLmVtaXQoXCJmb29cIik7ICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGF0Y2ggZXZlbnRcbiAqIG9iai5lbWl0KFwiYmFyXCIpOyAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BhdGNoIGFub3RoZXIgZXZlbnRcbiAqIG9iai5vZmYoXCJmb29cIik7ICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBldmVudCBsaXN0ZW5lclxuICovXG5cbmZ1bmN0aW9uIEV2ZW50TGl0ZSgpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEV2ZW50TGl0ZSkpIHJldHVybiBuZXcgRXZlbnRMaXRlKCk7XG59XG5cbihmdW5jdGlvbihFdmVudExpdGUpIHtcbiAgLy8gZXhwb3J0IHRoZSBjbGFzcyBmb3Igbm9kZS5qc1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIG1vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBFdmVudExpdGU7XG5cbiAgLy8gcHJvcGVydHkgbmFtZSB0byBob2xkIGxpc3RlbmVyc1xuICB2YXIgTElTVEVORVJTID0gXCJsaXN0ZW5lcnNcIjtcblxuICAvLyBtZXRob2RzIHRvIGV4cG9ydFxuICB2YXIgbWV0aG9kcyA9IHtcbiAgICBvbjogb24sXG4gICAgb25jZTogb25jZSxcbiAgICBvZmY6IG9mZixcbiAgICBlbWl0OiBlbWl0XG4gIH07XG5cbiAgLy8gbWl4aW4gdG8gc2VsZlxuICBtaXhpbihFdmVudExpdGUucHJvdG90eXBlKTtcblxuICAvLyBleHBvcnQgbWl4aW4gZnVuY3Rpb25cbiAgRXZlbnRMaXRlLm1peGluID0gbWl4aW47XG5cbiAgLyoqXG4gICAqIEltcG9ydCBvbigpLCBvbmNlKCksIG9mZigpIGFuZCBlbWl0KCkgbWV0aG9kcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUubWl4aW5cbiAgICogQHBhcmFtIHRhcmdldCB7UHJvdG90eXBlfVxuICAgKi9cblxuICBmdW5jdGlvbiBtaXhpbih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuICAgICAgdGFyZ2V0W2tleV0gPSBtZXRob2RzW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAZnVuY3Rpb24gRXZlbnRMaXRlLnByb3RvdHlwZS5vblxuICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gZnVuYyB7RnVuY3Rpb259XG4gICAqIEByZXR1cm5zIHtFdmVudExpdGV9IFNlbGYgZm9yIG1ldGhvZCBjaGFpbmluZ1xuICAgKi9cblxuICBmdW5jdGlvbiBvbih0eXBlLCBmdW5jKSB7XG4gICAgZ2V0TGlzdGVuZXJzKHRoaXMsIHR5cGUpLnB1c2goZnVuYyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG9uZS10aW1lIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAZnVuY3Rpb24gRXZlbnRMaXRlLnByb3RvdHlwZS5vbmNlXG4gICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBmdW5jIHtGdW5jdGlvbn1cbiAgICogQHJldHVybnMge0V2ZW50TGl0ZX0gU2VsZiBmb3IgbWV0aG9kIGNoYWluaW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9uY2UodHlwZSwgZnVuYykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3cmFwLm9yaWdpbmFsTGlzdGVuZXIgPSBmdW5jO1xuICAgIGdldExpc3RlbmVycyh0aGF0LCB0eXBlKS5wdXNoKHdyYXApO1xuICAgIHJldHVybiB0aGF0O1xuXG4gICAgZnVuY3Rpb24gd3JhcCgpIHtcbiAgICAgIG9mZi5jYWxsKHRoYXQsIHR5cGUsIHdyYXApO1xuICAgICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBFdmVudExpdGUucHJvdG90eXBlLm9mZlxuICAgKiBAcGFyYW0gW3R5cGVdIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBbZnVuY10ge0Z1bmN0aW9ufVxuICAgKiBAcmV0dXJucyB7RXZlbnRMaXRlfSBTZWxmIGZvciBtZXRob2QgY2hhaW5pbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gb2ZmKHR5cGUsIGZ1bmMpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIGxpc3RuZXJzO1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgZGVsZXRlIHRoYXRbTElTVEVORVJTXTtcbiAgICB9IGVsc2UgaWYgKCFmdW5jKSB7XG4gICAgICBsaXN0bmVycyA9IHRoYXRbTElTVEVORVJTXTtcbiAgICAgIGlmIChsaXN0bmVycykge1xuICAgICAgICBkZWxldGUgbGlzdG5lcnNbdHlwZV07XG4gICAgICAgIGlmICghT2JqZWN0LmtleXMobGlzdG5lcnMpLmxlbmd0aCkgcmV0dXJuIG9mZi5jYWxsKHRoYXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0bmVycyA9IGdldExpc3RlbmVycyh0aGF0LCB0eXBlLCB0cnVlKTtcbiAgICAgIGlmIChsaXN0bmVycykge1xuICAgICAgICBsaXN0bmVycyA9IGxpc3RuZXJzLmZpbHRlcihuZSk7XG4gICAgICAgIGlmICghbGlzdG5lcnMubGVuZ3RoKSByZXR1cm4gb2ZmLmNhbGwodGhhdCwgdHlwZSk7XG4gICAgICAgIHRoYXRbTElTVEVORVJTXVt0eXBlXSA9IGxpc3RuZXJzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhhdDtcblxuICAgIGZ1bmN0aW9uIG5lKHRlc3QpIHtcbiAgICAgIHJldHVybiB0ZXN0ICE9PSBmdW5jICYmIHRlc3Qub3JpZ2luYWxMaXN0ZW5lciAhPT0gZnVuYztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggKHRyaWdnZXIpIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAZnVuY3Rpb24gRXZlbnRMaXRlLnByb3RvdHlwZS5lbWl0XG4gICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBbdmFsdWVdIHsqfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSB3aGVuIGEgbGlzdGVuZXIgcmVjZWl2ZWQgdGhlIGV2ZW50XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVtaXQodHlwZSwgdmFsdWUpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0aGF0LCB0eXBlLCB0cnVlKTtcbiAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChhcmdsZW4gPT09IDEpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKHplcm9hcmcpO1xuICAgIH0gZWxzZSBpZiAoYXJnbGVuID09PSAyKSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChvbmVhcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChtb3JlYXJncyk7XG4gICAgfVxuICAgIHJldHVybiAhIWxpc3RlbmVycy5sZW5ndGg7XG5cbiAgICBmdW5jdGlvbiB6ZXJvYXJnKGZ1bmMpIHtcbiAgICAgIGZ1bmMuY2FsbCh0aGF0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbmVhcmcoZnVuYykge1xuICAgICAgZnVuYy5jYWxsKHRoYXQsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JlYXJncyhmdW5jKSB7XG4gICAgICBmdW5jLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaWdub3JlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldExpc3RlbmVycyh0aGF0LCB0eXBlLCByZWFkb25seSkge1xuICAgIGlmIChyZWFkb25seSAmJiAhdGhhdFtMSVNURU5FUlNdKSByZXR1cm47XG4gICAgdmFyIGxpc3RlbmVycyA9IHRoYXRbTElTVEVORVJTXSB8fCAodGhhdFtMSVNURU5FUlNdID0ge30pO1xuICAgIHJldHVybiBsaXN0ZW5lcnNbdHlwZV0gfHwgKGxpc3RlbmVyc1t0eXBlXSA9IFtdKTtcbiAgfVxuXG59KShFdmVudExpdGUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXZlbnQtbGl0ZS9ldmVudC1saXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBEZWx1eGVTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvRGVsdXhlU2lnbmFsXCIpO1xuZXhwb3J0cy5EZWx1eGVTaWduYWwgPSBEZWx1eGVTaWduYWxfMS5EZWx1eGVTaWduYWw7XG52YXIgR2VuZXJpY0V2ZW50XzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL2V2ZW50cy9HZW5lcmljRXZlbnRcIik7XG5leHBvcnRzLkdlbmVyaWNFdmVudCA9IEdlbmVyaWNFdmVudF8xLkdlbmVyaWNFdmVudDtcbnZhciBJT25jZVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbFwiKTtcbmV4cG9ydHMuSU9uY2VTaWduYWwgPSBJT25jZVNpZ25hbF8xLklPbmNlU2lnbmFsO1xudmFyIElQcmlvcml0eVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9JUHJpb3JpdHlTaWduYWxcIik7XG5leHBvcnRzLklQcmlvcml0eVNpZ25hbCA9IElQcmlvcml0eVNpZ25hbF8xLklQcmlvcml0eVNpZ25hbDtcbnZhciBJU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL0lTaWduYWxcIik7XG5leHBvcnRzLklTaWduYWwgPSBJU2lnbmFsXzEuSVNpZ25hbDtcbnZhciBJU2xvdF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9JU2xvdFwiKTtcbmV4cG9ydHMuSVNsb3QgPSBJU2xvdF8xLklTbG90O1xudmFyIE1vbm9TaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvTW9ub1NpZ25hbFwiKTtcbmV4cG9ydHMuTW9ub1NpZ25hbCA9IE1vbm9TaWduYWxfMS5Nb25vU2lnbmFsO1xudmFyIE9uY2VTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvT25jZVNpZ25hbFwiKTtcbmV4cG9ydHMuT25jZVNpZ25hbCA9IE9uY2VTaWduYWxfMS5PbmNlU2lnbmFsO1xudmFyIFByaW9yaXR5U2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL1ByaW9yaXR5U2lnbmFsXCIpO1xuZXhwb3J0cy5Qcmlvcml0eVNpZ25hbCA9IFByaW9yaXR5U2lnbmFsXzEuUHJpb3JpdHlTaWduYWw7XG52YXIgUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9Qcm9taXNlXCIpO1xuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZV8xLlByb21pc2U7XG52YXIgU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL1NpZ25hbFwiKTtcbmV4cG9ydHMuU2lnbmFsID0gU2lnbmFsXzEuU2lnbmFsO1xudmFyIFNsb3RfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdFwiKTtcbmV4cG9ydHMuU2xvdCA9IFNsb3RfMS5TbG90O1xudmFyIFNsb3RMaXN0XzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3RMaXN0XCIpO1xuZXhwb3J0cy5TbG90TGlzdCA9IFNsb3RMaXN0XzEuU2xvdExpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTaWduYWxfMSA9IHJlcXVpcmUoXCIuL1NpZ25hbFwiKTtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9TbG90XCIpO1xudmFyIFByaW9yaXR5U2lnbmFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJpb3JpdHlTaWduYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJpb3JpdHlTaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIENhbm5vdCB1c2Ugc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSwgc28gYWxsb3cgdGhlIHN1YmNsYXNzIHRvIGNhbGwgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgICAgdmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdmFsdWVDbGFzc2VzKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICovXG4gICAgUHJpb3JpdHlTaWduYWwucHJvdG90eXBlLmFkZFdpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgcHJpb3JpdHkpIHtcbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJXaXRoUHJpb3JpdHkobGlzdGVuZXIsIGZhbHNlLCBwcmlvcml0eSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIFByaW9yaXR5U2lnbmFsLnByb3RvdHlwZS5hZGRPbmNlV2l0aFByaW9yaXR5ID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBwcmlvcml0eSkge1xuICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eShsaXN0ZW5lciwgdHJ1ZSwgcHJpb3JpdHkpO1xuICAgIH07XG4gICAgLypvdmVycmlkZSovXG4gICAgUHJpb3JpdHlTaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eShsaXN0ZW5lciwgb25jZSk7XG4gICAgfTtcbiAgICBQcmlvcml0eVNpZ25hbC5wcm90b3R5cGUucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvblBvc3NpYmxlKGxpc3RlbmVyLCBvbmNlKSkge1xuICAgICAgICAgICAgdmFyIHNsb3QgPSBuZXcgU2xvdF8xLlNsb3QobGlzdGVuZXIsIHRoaXMsIG9uY2UsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMgPSB0aGlzLnNsb3RzLmluc2VydFdpdGhQcmlvcml0eShzbG90KTtcbiAgICAgICAgICAgIHJldHVybiBzbG90O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RzLmZpbmQobGlzdGVuZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIFByaW9yaXR5U2lnbmFsO1xufShTaWduYWxfMS5TaWduYWwpKTtcbmV4cG9ydHMuUHJpb3JpdHlTaWduYWwgPSBQcmlvcml0eVNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVByaW9yaXR5U2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJpb3JpdHlTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgT25jZVNpZ25hbF8xID0gcmVxdWlyZShcIi4vT25jZVNpZ25hbFwiKTtcbi8qKlxuICogQWxsb3dzIHRoZSB2YWx1ZUNsYXNzZXMgdG8gYmUgc2V0IGluIE1YTUwsIGUuZy5cbiAqIDxzaWduYWxzOlNpZ25hbCBpZD1cIm5hbWVDaGFuZ2VkXCI+e1tTdHJpbmcsIHVpbnRdfTwvc2lnbmFsczpTaWduYWw+XG4gKi9cbi8qW0RlZmF1bHRQcm9wZXJ0eShcInZhbHVlQ2xhc3Nlc1wiKV0qL1xuLyoqXG4gKiBTaWduYWwgZGlzcGF0Y2hlcyBldmVudHMgdG8gbXVsdGlwbGUgbGlzdGVuZXJzLlxuICogSXQgaXMgaW5zcGlyZWQgYnkgQyMgZXZlbnRzIGFuZCBkZWxlZ2F0ZXMsIGFuZCBieVxuICogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NpZ25hbHNfYW5kX3Nsb3RzXCI+c2lnbmFscyBhbmQgc2xvdHM8L2E+XG4gKiBpbiBRdC5cbiAqIEEgU2lnbmFsIGFkZHMgZXZlbnQgZGlzcGF0Y2hpbmcgZnVuY3Rpb25hbGl0eSB0aHJvdWdoIGNvbXBvc2l0aW9uIGFuZCBpbnRlcmZhY2VzLFxuICogcmF0aGVyIHRoYW4gaW5oZXJpdGluZyBmcm9tIGEgZGlzcGF0Y2hlci5cbiAqIDxici8+PGJyLz5cbiAqIFByb2plY3QgaG9tZTogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvXCI+aHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzLzwvYT5cbiAqL1xudmFyIFNpZ25hbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNpZ25hbCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU2lnbmFsIGluc3RhbmNlIHRvIGRpc3BhdGNoIHZhbHVlIG9iamVjdHMuXG4gICAgICogQHBhcmFtICAgIHZhbHVlQ2xhc3NlcyBBbnkgbnVtYmVyIG9mIGNsYXNzIHJlZmVyZW5jZXMgdGhhdCBlbmFibGUgdHlwZSBjaGVja3MgaW4gZGlzcGF0Y2goKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgbmV3IFNpZ25hbChTdHJpbmcsIHVpbnQpXG4gICAgICogd291bGQgYWxsb3c6IHNpZ25hbC5kaXNwYXRjaChcInRoZSBBbnN3ZXJcIiwgNDIpXG4gICAgICogYnV0IG5vdDogc2lnbmFsLmRpc3BhdGNoKHRydWUsIDQyLjUpXG4gICAgICogbm9yOiBzaWduYWwuZGlzcGF0Y2goKVxuICAgICAqXG4gICAgICogTk9URTogSW4gQVMzLCBzdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIENhbm5vdCB1c2Ugc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSwgc28gYWxsb3cgdGhlIHN1YmNsYXNzIHRvIGNhbGwgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgICAgdmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdmFsdWVDbGFzc2VzKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICovXG4gICAgU2lnbmFsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfTtcbiAgICByZXR1cm4gU2lnbmFsO1xufShPbmNlU2lnbmFsXzEuT25jZVNpZ25hbCkpO1xuZXhwb3J0cy5TaWduYWwgPSBTaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgU2xvdExpc3QgY2xhc3MgcmVwcmVzZW50cyBhbiBpbW11dGFibGUgbGlzdCBvZiBTbG90IG9iamVjdHMuXG4gKlxuICogQGF1dGhvciBKb2EgRWJlcnRcbiAqIEBhdXRob3IgUm9iZXJ0IFBlbm5lclxuICovXG52YXIgU2xvdExpc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgU2xvdExpc3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogPHA+QSB1c2VyIG5ldmVyIGhhcyB0byBjcmVhdGUgYSBTbG90TGlzdCBtYW51YWxseS5cbiAgICAgKiBVc2UgdGhlIDxjb2RlPk5JTDwvY29kZT4gZWxlbWVudCB0byByZXByZXNlbnQgYW4gZW1wdHkgbGlzdC5cbiAgICAgKiA8Y29kZT5OSUwucHJlcGVuZCh2YWx1ZSk8L2NvZGU+IHdvdWxkIGNyZWF0ZSBhIGxpc3QgY29udGFpbmluZyA8Y29kZT52YWx1ZTwvY29kZT48L3A+LlxuICAgICAqXG4gICAgICogQHBhcmFtIGhlYWQgVGhlIGZpcnN0IHNsb3QgaW4gdGhlIGxpc3QuXG4gICAgICogQHBhcmFtIHRhaWwgQSBsaXN0IGNvbnRhaW5pbmcgYWxsIHNsb3RzIGV4Y2VwdCBoZWFkLlxuICAgICAqXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBQYXJhbWV0ZXJzIGhlYWQgYW5kIHRhaWwgYXJlIG51bGwuIFVzZSB0aGUgTklMIGVsZW1lbnQgaW5zdGVhZC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFBhcmFtZXRlciBoZWFkIGNhbm5vdCBiZSBudWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNsb3RMaXN0KGhlYWQsIHRhaWwpIHtcbiAgICAgICAgaWYgKHRhaWwgPT09IHZvaWQgMCkgeyB0YWlsID0gbnVsbDsgfVxuICAgICAgICB0aGlzLm5vbkVtcHR5ID0gZmFsc2U7XG4gICAgICAgIGlmICghaGVhZCAmJiAhdGFpbCkge1xuICAgICAgICAgICAgaWYgKFNsb3RMaXN0Lk5JTClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcnMgaGVhZCBhbmQgdGFpbCBhcmUgbnVsbC4gVXNlIHRoZSBOSUwgZWxlbWVudCBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgLy90aGlzIGlzIHRoZSBOSUwgZWxlbWVudCBhcyBwZXIgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5ub25FbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFoZWFkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBoZWFkIGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gaGVhZDtcbiAgICAgICAgICAgIHRoaXMudGFpbCA9IHRhaWwgfHwgU2xvdExpc3QuTklMO1xuICAgICAgICAgICAgdGhpcy5ub25FbXB0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3RMaXN0LnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiBzbG90cyBpbiB0aGUgbGlzdC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFpbCA9PSBTbG90TGlzdC5OSUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAvLyBXZSBjb3VsZCBjYWNoZSB0aGUgbGVuZ3RoLCBidXQgaXQgd291bGQgbWFrZSBtZXRob2RzIGxpa2UgZmlsdGVyTm90IHVubmVjZXNzYXJpbHkgY29tcGxpY2F0ZWQuXG4gICAgICAgICAgICAvLyBJbnN0ZWFkIHdlIGFzc3VtZSB0aGF0IE8obikgaXMgb2theSBzaW5jZSB0aGUgbGVuZ3RoIHByb3BlcnR5IGlzIHVzZWQgaW4gcmFyZSBjYXNlcy5cbiAgICAgICAgICAgIC8vIFdlIGNvdWxkIGFsc28gY2FjaGUgdGhlIGxlbmd0aCBsYXp5LCBidXQgdGhhdCBpcyBhIHdhc3RlIG9mIGFub3RoZXIgOGIgcGVyIGxpc3Qgbm9kZSAoYXQgbGVhc3QpLlxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXM7XG4gICAgICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgICAgICsrcmVzdWx0O1xuICAgICAgICAgICAgICAgIHAgPSBwLnRhaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBQcmVwZW5kcyBhIHNsb3QgdG8gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSAgICBzbG90IFRoZSBpdGVtIHRvIGJlIHByZXBlbmRlZC5cbiAgICAgKiBAcmV0dXJuICAgIEEgbGlzdCBjb25zaXN0aW5nIG9mIHNsb3QgZm9sbG93ZWQgYnkgYWxsIGVsZW1lbnRzIG9mIHRoaXMgbGlzdC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVyIGhlYWQgY2Fubm90IGJlIG51bGwuXG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAoc2xvdCkge1xuICAgICAgICByZXR1cm4gbmV3IFNsb3RMaXN0KHNsb3QsIHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBhIHNsb3QgdG8gdGhpcyBsaXN0LlxuICAgICAqIE5vdGU6IGFwcGVuZGluZyBpcyBPKG4pLiBXaGVyZSBwb3NzaWJsZSwgcHJlcGVuZCB3aGljaCBpcyBPKDEpLlxuICAgICAqIEluIHNvbWUgY2FzZXMsIG1hbnkgbGlzdCBpdGVtcyBtdXN0IGJlIGNsb25lZCB0b1xuICAgICAqIGF2b2lkIGNoYW5naW5nIGV4aXN0aW5nIGxpc3RzLlxuICAgICAqIEBwYXJhbSAgICBzbG90IFRoZSBpdGVtIHRvIGJlIGFwcGVuZGVkLlxuICAgICAqIEByZXR1cm4gICAgQSBsaXN0IGNvbnNpc3Rpbmcgb2YgYWxsIGVsZW1lbnRzIG9mIHRoaXMgbGlzdCBmb2xsb3dlZCBieSBzbG90LlxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoc2xvdCkge1xuICAgICAgICBpZiAoIXNsb3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlOiBqdXN0IG9uZSBzbG90IGN1cnJlbnRseSBpbiB0aGUgbGlzdC5cbiAgICAgICAgaWYgKHRoaXMudGFpbCA9PSBTbG90TGlzdC5OSUwpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNsb3RMaXN0KHNsb3QpLnByZXBlbmQodGhpcy5oZWFkKTtcbiAgICAgICAgLy8gVGhlIGxpc3QgYWxyZWFkeSBoYXMgdHdvIG9yIG1vcmUgc2xvdHMuXG4gICAgICAgIC8vIFdlIGhhdmUgdG8gYnVpbGQgYSBuZXcgbGlzdCB3aXRoIGNsb25lZCBpdGVtcyBiZWNhdXNlIHRoZXkgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgdmFyIHdob2xlQ2xvbmUgPSBuZXcgU2xvdExpc3QodGhpcy5oZWFkKTtcbiAgICAgICAgdmFyIHN1YkNsb25lID0gd2hvbGVDbG9uZTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLnRhaWw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBzdWJDbG9uZSA9IHN1YkNsb25lLnRhaWwgPSBuZXcgU2xvdExpc3QoY3VycmVudC5oZWFkKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBuZXcgc2xvdCBsYXN0LlxuICAgICAgICBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KHNsb3QpO1xuICAgICAgICByZXR1cm4gd2hvbGVDbG9uZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydCBhIHNsb3QgaW50byB0aGUgbGlzdCBpbiBhIHBvc2l0aW9uIGFjY29yZGluZyB0byBpdHMgcHJpb3JpdHkuXG4gICAgICogVGhlIGhpZ2hlciB0aGUgcHJpb3JpdHksIHRoZSBjbG9zZXIgdGhlIGl0ZW0gd2lsbCBiZSBpbnNlcnRlZCB0byB0aGUgbGlzdCBoZWFkLlxuICAgICAqIEBwYXJhbXMgc2xvdCBUaGUgaXRlbSB0byBiZSBpbnNlcnRlZC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVycyBoZWFkIGFuZCB0YWlsIGFyZSBudWxsLiBVc2UgdGhlIE5JTCBlbGVtZW50IGluc3RlYWQuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBQYXJhbWV0ZXIgaGVhZCBjYW5ub3QgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuaW5zZXJ0V2l0aFByaW9yaXR5ID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgdmFyIHByaW9yaXR5ID0gc2xvdC5wcmlvcml0eTtcbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlOiBuZXcgc2xvdCBoYXMgdGhlIGhpZ2hlc3QgcHJpb3JpdHkuXG4gICAgICAgIGlmIChwcmlvcml0eSA+IHRoaXMuaGVhZC5wcmlvcml0eSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBlbmQoc2xvdCk7XG4gICAgICAgIHZhciB3aG9sZUNsb25lID0gbmV3IFNsb3RMaXN0KHRoaXMuaGVhZCk7XG4gICAgICAgIHZhciBzdWJDbG9uZSA9IHdob2xlQ2xvbmU7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy50YWlsO1xuICAgICAgICAvLyBGaW5kIGEgc2xvdCB3aXRoIGxvd2VyIHByaW9yaXR5IGFuZCBnbyBpbiBmcm9udCBvZiBpdC5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA+IGN1cnJlbnQuaGVhZC5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgIHN1YkNsb25lLnRhaWwgPSBjdXJyZW50LnByZXBlbmQoc2xvdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJDbG9uZSA9IHN1YkNsb25lLnRhaWwgPSBuZXcgU2xvdExpc3QoY3VycmVudC5oZWFkKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2xvdCBoYXMgbG93ZXN0IHByaW9yaXR5LlxuICAgICAgICBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KHNsb3QpO1xuICAgICAgICByZXR1cm4gd2hvbGVDbG9uZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNsb3RzIGluIHRoaXMgbGlzdCB0aGF0IGRvIG5vdCBjb250YWluIHRoZSBzdXBwbGllZCBsaXN0ZW5lci5cbiAgICAgKiBOb3RlOiBhc3N1bWVzIHRoZSBsaXN0ZW5lciBpcyBub3QgcmVwZWF0ZWQgd2l0aGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSAgICBsaXN0ZW5lciBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4gQSBsaXN0IGNvbnNpc3Rpbmcgb2YgYWxsIGVsZW1lbnRzIG9mIHRoaXMgbGlzdCB0aGF0IGRvIG5vdCBoYXZlIGxpc3RlbmVyLlxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5maWx0ZXJOb3QgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5IHx8IGxpc3RlbmVyID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgaWYgKGxpc3RlbmVyID09IHRoaXMuaGVhZC5saXN0ZW5lcilcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhaWw7XG4gICAgICAgIC8vIFRoZSBmaXJzdCBpdGVtIHdhc24ndCBhIG1hdGNoIHNvIHRoZSBmaWx0ZXJlZCBsaXN0IHdpbGwgY29udGFpbiBpdC5cbiAgICAgICAgdmFyIHdob2xlQ2xvbmUgPSBuZXcgU2xvdExpc3QodGhpcy5oZWFkKTtcbiAgICAgICAgdmFyIHN1YkNsb25lID0gd2hvbGVDbG9uZTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLnRhaWw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5oZWFkLmxpc3RlbmVyID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gU3BsaWNlIG91dCB0aGUgY3VycmVudCBoZWFkLlxuICAgICAgICAgICAgICAgIHN1YkNsb25lLnRhaWwgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJDbG9uZSA9IHN1YkNsb25lLnRhaWwgPSBuZXcgU2xvdExpc3QoY3VycmVudC5oZWFkKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGxpc3RlbmVyIHdhcyBub3QgZm91bmQgc28gdGhpcyBsaXN0IGlzIHVuY2hhbmdlZC5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHN1cHBsaWVkIGxpc3RlbmVyIEZ1bmN0aW9uIGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBsaXN0XG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgaWYgKHAuaGVhZC5saXN0ZW5lciA9PSBsaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHAgPSBwLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBJU2xvdCBhc3NvY2lhdGVkIHdpdGggYSBzdXBwbGllZCBsaXN0ZW5lciB3aXRoaW4gdGhlIFNsb3RMaXN0LlxuICAgICAqIEBwYXJhbSAgIGxpc3RlbmVyIFRoZSBGdW5jdGlvbiBiZWluZyBzZWFyY2hlZCBmb3JcbiAgICAgKiBAcmV0dXJuICBUaGUgSVNsb3QgaW4gdGhpcyBsaXN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgbGlzdGVuZXIgcGFyYW1ldGVyIHRocm91Z2ggdGhlIElTbG90Lmxpc3RlbmVyIHByb3BlcnR5LlxuICAgICAqICAgICAgICAgIFJldHVybnMgbnVsbCBpZiBubyBzdWNoIElTbG90IGluc3RhbmNlIGV4aXN0cyBvciB0aGUgbGlzdCBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMubm9uRW1wdHkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgaWYgKHAuaGVhZC5saXN0ZW5lciA9PSBsaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5oZWFkO1xuICAgICAgICAgICAgcCA9IHAudGFpbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgICAgICB2YXIgcCA9IHRoaXM7XG4gICAgICAgIHdoaWxlIChwLm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gcC5oZWFkICsgXCIgLT4gXCI7XG4gICAgICAgICAgICBwID0gcC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlciArPSBcIk5JTFwiO1xuICAgICAgICByZXR1cm4gXCJbTGlzdCBcIiArIGJ1ZmZlciArIFwiXVwiO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50cyBhbiBlbXB0eSBsaXN0LiBVc2VkIGFzIHRoZSBsaXN0IHRlcm1pbmF0b3IuXG4gICAgICovXG4gICAgU2xvdExpc3QuTklMID0gbmV3IFNsb3RMaXN0KG51bGwsIG51bGwpO1xuICAgIHJldHVybiBTbG90TGlzdDtcbn0oKSk7XG5leHBvcnRzLlNsb3RMaXN0ID0gU2xvdExpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TbG90TGlzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3RMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNpZ25hbHNfanNfMSA9IHJlcXVpcmUoXCJzaWduYWxzLmpzXCIpO1xudmFyIENsb2NrID0gcmVxdWlyZShcIkBnYW1lc3RkaW8vY2xvY2tcIik7XG52YXIgZGVsdGFfbGlzdGVuZXJfMSA9IHJlcXVpcmUoXCJkZWx0YS1saXN0ZW5lclwiKTtcbnZhciBtc2dwYWNrID0gcmVxdWlyZShcIm1zZ3BhY2stbGl0ZVwiKTtcbnZhciBmb3NzaWxEZWx0YSA9IHJlcXVpcmUoXCJmb3NzaWwtZGVsdGFcIik7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xudmFyIFJvb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvb20sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm9vbShuYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHt9KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jbG9jayA9IG5ldyBDbG9jaygpOyAvLyBleHBlcmltZW50YWxcbiAgICAgICAgX3RoaXMucmVtb3RlQ2xvY2sgPSBuZXcgQ2xvY2soKTsgLy8gZXhwZXJpbWVudGFsXG4gICAgICAgIC8vIFB1YmxpYyBzaWduYWxzXG4gICAgICAgIF90aGlzLm9uSm9pbiA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLm9uVXBkYXRlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgX3RoaXMub25EYXRhID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgX3RoaXMub25FcnJvciA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLm9uTGVhdmUgPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIF90aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBfdGhpcy5vbkxlYXZlLmFkZChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTsgfSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUm9vbS5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZUNhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmNsb3NlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLm9uTGVhdmUuZGlzcGF0Y2goZSk7IH07XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5vbk1lc3NhZ2VDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG1zZ3BhY2suZGVjb2RlKG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBtZXNzYWdlWzBdO1xuICAgICAgICBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uSWQgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgdGhpcy5vbkpvaW4uZGlzcGF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID09IFByb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9FUlJPUikge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX1NUQVRFKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBtZXNzYWdlWzJdO1xuICAgICAgICAgICAgdmFyIHJlbW90ZUN1cnJlbnRUaW1lID0gbWVzc2FnZVszXTtcbiAgICAgICAgICAgIHZhciByZW1vdGVFbGFwc2VkVGltZSA9IG1lc3NhZ2VbNF07XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCByZW1vdGVDdXJyZW50VGltZSwgcmVtb3RlRWxhcHNlZFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX1NUQVRFX1BBVENIKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5ST09NX0RBVEEpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRhLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5MRUFWRV9ST09NKSB7XG4gICAgICAgICAgICB0aGlzLmxlYXZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCByZW1vdGVDdXJyZW50VGltZSwgcmVtb3RlRWxhcHNlZFRpbWUpIHtcbiAgICAgICAgdGhpcy5zZXQoc3RhdGUpO1xuICAgICAgICB0aGlzLl9wcmV2aW91c1N0YXRlID0gbXNncGFjay5lbmNvZGUoc3RhdGUpO1xuICAgICAgICAvLyBzZXQgcmVtb3RlIGNsb2NrIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHJlbW90ZUN1cnJlbnRUaW1lICYmIHJlbW90ZUVsYXBzZWRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmN1cnJlbnRUaW1lID0gcmVtb3RlQ3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmVsYXBzZWRUaW1lID0gcmVtb3RlRWxhcHNlZFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHN0YXRlKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKGJpbmFyeVBhdGNoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjbGllbnQtc2lkZSBwaW5nXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBwYXRjaFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAodGhpcy5sYXN0UGF0Y2hUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmcgPSBwYXRjaFRpbWUgLSB0aGlzLmxhc3RQYXRjaFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0UGF0Y2hUaW1lID0gcGF0Y2hUaW1lO1xuICAgICAgICB0aGlzLmNsb2NrLnRpY2soKTtcbiAgICAgICAgLy8gYXBwbHkgcGF0Y2hcbiAgICAgICAgdGhpcy5fcHJldmlvdXNTdGF0ZSA9IGZvc3NpbERlbHRhLmFwcGx5KHRoaXMuX3ByZXZpb3VzU3RhdGUsIGJpbmFyeVBhdGNoLCB7IHZlcmlmeUNoZWNrc3VtOiBmYWxzZSB9KTtcbiAgICAgICAgLy8gdHJpZ2dlciBzdGF0ZSBjYWxsYmFja3NcbiAgICAgICAgdGhpcy5zZXQobXNncGFjay5kZWNvZGUodGhpcy5fcHJldmlvdXNTdGF0ZSkpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHRoaXMuZGF0YSk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5sZWF2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoW1Byb3RvY29sXzEuUHJvdG9jb2wuUk9PTV9EQVRBLCB0aGlzLmlkLCBkYXRhXSk7XG4gICAgfTtcbiAgICBSb29tLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMub25Kb2luLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uRGF0YS5yZW1vdmVBbGwoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLm9uTGVhdmUucmVtb3ZlQWxsKCk7XG4gICAgfTtcbiAgICByZXR1cm4gUm9vbTtcbn0oZGVsdGFfbGlzdGVuZXJfMS5EZWx0YUNvbnRhaW5lcikpO1xuZXhwb3J0cy5Sb29tID0gUm9vbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1Jvb20udHNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENsaWVudF8xID0gcmVxdWlyZShcIi4vQ2xpZW50XCIpO1xuZXhwb3J0cy5DbGllbnQgPSBDbGllbnRfMS5DbGllbnQ7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xuZXhwb3J0cy5Qcm90b2NvbCA9IFByb3RvY29sXzEuUHJvdG9jb2w7XG52YXIgUm9vbV8xID0gcmVxdWlyZShcIi4vUm9vbVwiKTtcbmV4cG9ydHMuUm9vbSA9IFJvb21fMS5Sb29tO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1zZ3BhY2sgPSByZXF1aXJlKFwibXNncGFjay1saXRlXCIpO1xudmFyIHNpZ25hbHNfanNfMSA9IHJlcXVpcmUoXCJzaWduYWxzLmpzXCIpO1xudmFyIFByb3RvY29sXzEgPSByZXF1aXJlKFwiLi9Qcm90b2NvbFwiKTtcbnZhciBSb29tXzEgPSByZXF1aXJlKFwiLi9Sb29tXCIpO1xudmFyIENvbm5lY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0Nvbm5lY3Rpb25cIik7XG52YXIgQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENsaWVudCh1cmwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gc2lnbmFsc1xuICAgICAgICB0aGlzLm9uT3BlbiA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIHRoaXMub25NZXNzYWdlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgdGhpcy5yb29tcyA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3RpbmdSb29tcyA9IHt9O1xuICAgICAgICB0aGlzLmpvaW5SZXF1ZXN0SWQgPSAwO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICB0aGlzLmhvc3RuYW1lID0gdXJsO1xuICAgICAgICB2YXIgY29seXNldXNpZCA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKCdjb2x5c2V1c2lkJyk7XG4gICAgICAgIGlmICghKGNvbHlzZXVzaWQgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICAgICAgLy8gYnJvd3NlciBoYXMgc3luY2hyb25vdXMgcmV0dXJuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb24oY29seXNldXNpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByZWFjdC1uYXRpdmUgaXMgYXN5bmNocm9ub3VzXG4gICAgICAgICAgICBjb2x5c2V1c2lkLnRoZW4oZnVuY3Rpb24gKGlkKSB7IHJldHVybiBfdGhpcy5jcmVhdGVDb25uZWN0aW9uKGlkKTsgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2xpZW50LnByb3RvdHlwZS5jcmVhdGVDb25uZWN0aW9uID0gZnVuY3Rpb24gKGNvbHlzZXVzaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pZCA9IGNvbHlzZXVzaWQgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb25fMS5Db25uZWN0aW9uKHRoaXMuaG9zdG5hbWUgKyBcIi8/Y29seXNldXNpZD1cIiArIHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2VDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5vbkNsb3NlLmRpc3BhdGNoKCk7IH07XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLm9uRXJyb3IuZGlzcGF0Y2goKTsgfTtcbiAgICAgICAgLy8gY2hlY2sgZm9yIGlkIG9uIGNvb2tpZVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25PcGVuLmRpc3BhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDbGllbnQucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiAocm9vbU5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgb3B0aW9ucy5yZXF1ZXN0SWQgPSArK3RoaXMuam9pblJlcXVlc3RJZDtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nUm9vbXNbb3B0aW9ucy5yZXF1ZXN0SWRdID0gbmV3IFJvb21fMS5Sb29tKHJvb21OYW1lKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoW1Byb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9ST09NLCByb29tTmFtZSwgb3B0aW9uc10pO1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW5nUm9vbXNbb3B0aW9ucy5yZXF1ZXN0SWRdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgQ2xpZW50LnByb3RvdHlwZS5vbk1lc3NhZ2VDYWxsYmFjayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG1zZ3BhY2suZGVjb2RlKG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBtZXNzYWdlWzBdO1xuICAgICAgICBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLlVTRVJfSUQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCdjb2x5c2V1c2lkJywgbWVzc2FnZVsxXSk7XG4gICAgICAgICAgICB0aGlzLmlkID0gbWVzc2FnZVsxXTtcbiAgICAgICAgICAgIHRoaXMub25PcGVuLmRpc3BhdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSkge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RJZCA9IG1lc3NhZ2VbMl07XG4gICAgICAgICAgICB2YXIgcm9vbV8xID0gdGhpcy5jb25uZWN0aW5nUm9vbXNbcmVxdWVzdElkXTtcbiAgICAgICAgICAgIHRoaXMucm9vbXNbcm9vbV8xLmlkXSA9IHJvb21fMTtcbiAgICAgICAgICAgIHJvb21fMS5pZCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICByb29tXzEuY29ubmVjdChuZXcgQ29ubmVjdGlvbl8xLkNvbm5lY3Rpb24odGhpcy5ob3N0bmFtZSArIFwiL1wiICsgcm9vbV8xLmlkICsgXCI/Y29seXNldXNpZD1cIiArIHRoaXMuaWQpKTtcbiAgICAgICAgICAgIHJvb21fMS5vbkxlYXZlLmFkZChmdW5jdGlvbiAoKSB7IHJldHVybiBkZWxldGUgX3RoaXMucm9vbXNbcm9vbV8xLmlkXTsgfSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25uZWN0aW5nUm9vbXNbcmVxdWVzdElkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID09IFByb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9FUlJPUikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNlcnZlciBlcnJvcjpcIiwgbWVzc2FnZVsyXSk7XG4gICAgICAgICAgICAvLyBnZW5lcmFsIGVycm9yXG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IuZGlzcGF0Y2gobWVzc2FnZVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uTWVzc2FnZS5kaXNwYXRjaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENsaWVudDtcbn0oKSk7XG5leHBvcnRzLkNsaWVudCA9IENsaWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0NsaWVudC50c1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZ2xvYmFscyBCdWZmZXIgKi9cblxubW9kdWxlLmV4cG9ydHMgPVxuICBjKChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgQnVmZmVyKSAmJiBCdWZmZXIpIHx8XG4gIGModGhpcy5CdWZmZXIpIHx8XG4gIGMoKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiB3aW5kb3cpICYmIHdpbmRvdy5CdWZmZXIpIHx8XG4gIHRoaXMuQnVmZmVyO1xuXG5mdW5jdGlvbiBjKEIpIHtcbiAgcmV0dXJuIEIgJiYgQi5pc0J1ZmZlciAmJiBCO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyLWdsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXJpc2gtYXJyYXkuanNcblxudmFyIEJ1ZmZlcmlzaCA9IHJlcXVpcmUoXCIuL2J1ZmZlcmlzaFwiKTtcblxudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGFsbG9jKDApO1xuXG5leHBvcnRzLmFsbG9jID0gYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IEJ1ZmZlcmlzaC5jb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHNpemUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB7QXJyYXl8QXJyYXlCdWZmZXJ8QnVmZmVyfFN0cmluZ31cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuXG5mdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gIGlmICghQnVmZmVyaXNoLmlzQnVmZmVyKHZhbHVlKSAmJiBCdWZmZXJpc2guaXNWaWV3KHZhbHVlKSkge1xuICAgIC8vIFR5cGVkQXJyYXkgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gQnVmZmVyaXNoLlVpbnQ4QXJyYXkuZnJvbSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoQnVmZmVyaXNoLmlzQXJyYXlCdWZmZXIodmFsdWUpKSB7XG4gICAgLy8gQXJyYXlCdWZmZXIgdG8gVWludDhBcnJheVxuICAgIHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFN0cmluZyB0byBBcnJheVxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIC8vIEFycmF5LWxpa2UgdG8gQXJyYXlcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHZhbHVlKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBidWZmZXJpc2gtYnVmZmVyLmpzXG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcblxudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcmlzaC5oYXNCdWZmZXIgPyBhbGxvYygwKSA6IFtdO1xuXG5leHBvcnRzLmFsbG9jID0gQnVmZmVyaXNoLmhhc0J1ZmZlciAmJiBCdWZmZXIuYWxsb2MgfHwgYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IEJ1ZmZlcmlzaC5jb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gdmFsdWUge0FycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxTdHJpbmd9XG4gKiBAcmV0dXJucyB7QnVmZmVyfVxuICovXG5cbmZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgaWYgKCFCdWZmZXJpc2guaXNCdWZmZXIodmFsdWUpICYmIEJ1ZmZlcmlzaC5pc1ZpZXcodmFsdWUpKSB7XG4gICAgLy8gVHlwZWRBcnJheSB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tKHZhbHVlKTtcbiAgfSBlbHNlIGlmIChCdWZmZXJpc2guaXNBcnJheUJ1ZmZlcih2YWx1ZSkpIHtcbiAgICAvLyBBcnJheUJ1ZmZlciB0byBVaW50OEFycmF5XG4gICAgdmFsdWUgPSBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gU3RyaW5nIHRvIEJ1ZmZlclxuICAgIHJldHVybiBCdWZmZXJpc2guZnJvbS5jYWxsKGV4cG9ydHMsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIC8vIEFycmF5LWxpa2UgdG8gQnVmZmVyXG4gIGlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbS5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWUpOyAvLyBub2RlIHY2K1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHZhbHVlKTsgLy8gbm9kZSB2NFxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL2J1ZmZlcmlzaC1idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJ1ZmZlcmlzaC11aW50OGFycmF5LmpzXG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJpc2guaGFzQXJyYXlCdWZmZXIgPyBhbGxvYygwKSA6IFtdO1xuXG5leHBvcnRzLmFsbG9jID0gYWxsb2M7XG5leHBvcnRzLmNvbmNhdCA9IEJ1ZmZlcmlzaC5jb25jYXQ7XG5leHBvcnRzLmZyb20gPSBmcm9tO1xuXG4vKipcbiAqIEBwYXJhbSBzaXplIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7QnVmZmVyfFVpbnQ4QXJyYXl8QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHtBcnJheXxBcnJheUJ1ZmZlcnxCdWZmZXJ8U3RyaW5nfVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4gKi9cblxuZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICBpZiAoQnVmZmVyaXNoLmlzVmlldyh2YWx1ZSkpIHtcbiAgICAvLyBUeXBlZEFycmF5IHRvIEFycmF5QnVmZmVyXG4gICAgdmFyIGJ5dGVPZmZzZXQgPSB2YWx1ZS5ieXRlT2Zmc2V0O1xuICAgIHZhciBieXRlTGVuZ3RoID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICB2YWx1ZSA9IHZhbHVlLmJ1ZmZlcjtcbiAgICBpZiAodmFsdWUuYnl0ZUxlbmd0aCAhPT0gYnl0ZUxlbmd0aCkge1xuICAgICAgaWYgKHZhbHVlLnNsaWNlKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQW5kcm9pZCA0LjEgZG9lcyBub3QgaGF2ZSBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgdmFsdWUgPSBuZXcgVWludDhBcnJheSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZS5ieXRlTGVuZ3RoICE9PSBieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgLy8gVHlwZWRBcnJheSB0byBBcnJheUJ1ZmZlciB0byBVaW50OEFycmF5IHRvIEFycmF5XG4gICAgICAgICAgdmFsdWUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2YWx1ZSwgYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIFN0cmluZyB0byBVaW50OEFycmF5XG4gICAgcmV0dXJuIEJ1ZmZlcmlzaC5mcm9tLmNhbGwoZXhwb3J0cywgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbHVlKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvYnVmZmVyaXNoLXVpbnQ4YXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGJ1ZmZlci1saXRlLmpzXG5cbnZhciBNQVhCVUZMRU4gPSA4MTkyO1xuXG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuZXhwb3J0cy53cml0ZSA9IHdyaXRlO1xuXG4vKipcbiAqIEJ1ZmZlci5wcm90b3R5cGUud3JpdGUoKVxuICpcbiAqIEBwYXJhbSBzdHJpbmcge1N0cmluZ31cbiAqIEBwYXJhbSBbb2Zmc2V0XSB7TnVtYmVyfVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiB3cml0ZShzdHJpbmcsIG9mZnNldCkge1xuICB2YXIgYnVmZmVyID0gdGhpcztcbiAgdmFyIGluZGV4ID0gb2Zmc2V0IHx8IChvZmZzZXQgfD0gMCk7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB2YXIgY2hyID0gMDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgIGNociA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICBpZiAoY2hyIDwgMTI4KSB7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSBjaHI7XG4gICAgfSBlbHNlIGlmIChjaHIgPCAweDgwMCkge1xuICAgICAgLy8gMiBieXRlc1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHhDMCB8IChjaHIgPj4+IDYpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8IChjaHIgJiAweDNGKTtcbiAgICB9IGVsc2UgaWYgKGNociA8IDB4RDgwMCB8fCBjaHIgPiAweERGRkYpIHtcbiAgICAgIC8vIDMgYnl0ZXNcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4RTAgfCAoY2hyICA+Pj4gMTIpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8ICgoY2hyID4+PiA2KSAgJiAweDNGKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoY2hyICAgICAgICAgICYgMHgzRik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIDQgYnl0ZXMgLSBzdXJyb2dhdGUgcGFpclxuICAgICAgY2hyID0gKCgoY2hyIC0gMHhEODAwKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSsrKSAtIDB4REMwMCkpICsgMHgxMDAwMDtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4RjAgfCAoY2hyID4+PiAxOCk7XG4gICAgICBidWZmZXJbaW5kZXgrK10gPSAweDgwIHwgKChjaHIgPj4+IDEyKSAmIDB4M0YpO1xuICAgICAgYnVmZmVyW2luZGV4KytdID0gMHg4MCB8ICgoY2hyID4+PiA2KSAgJiAweDNGKTtcbiAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IDB4ODAgfCAoY2hyICAgICAgICAgICYgMHgzRik7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmRleCAtIG9mZnNldDtcbn1cblxuLyoqXG4gKiBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nKClcbiAqXG4gKiBAcGFyYW0gW2VuY29kaW5nXSB7U3RyaW5nfSBpZ25vcmVkXG4gKiBAcGFyYW0gW3N0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtlbmRdIHtOdW1iZXJ9XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBidWZmZXIgPSB0aGlzO1xuICB2YXIgaW5kZXggPSBzdGFydHwwO1xuICBpZiAoIWVuZCkgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgdmFyIHN0cmluZyA9ICcnO1xuICB2YXIgY2hyID0gMDtcblxuICB3aGlsZSAoaW5kZXggPCBlbmQpIHtcbiAgICBjaHIgPSBidWZmZXJbaW5kZXgrK107XG4gICAgaWYgKGNociA8IDEyOCkge1xuICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICgoY2hyICYgMHhFMCkgPT09IDB4QzApIHtcbiAgICAgIC8vIDIgYnl0ZXNcbiAgICAgIGNociA9IChjaHIgJiAweDFGKSA8PCA2IHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKTtcblxuICAgIH0gZWxzZSBpZiAoKGNociAmIDB4RjApID09PSAweEUwKSB7XG4gICAgICAvLyAzIGJ5dGVzXG4gICAgICBjaHIgPSAoY2hyICYgMHgwRikgICAgICAgICAgICAgPDwgMTIgfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpIDw8IDYgIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKTtcblxuICAgIH0gZWxzZSBpZiAoKGNociAmIDB4RjgpID09PSAweEYwKSB7XG4gICAgICAvLyA0IGJ5dGVzXG4gICAgICBjaHIgPSAoY2hyICYgMHgwNykgICAgICAgICAgICAgPDwgMTggfFxuICAgICAgICAgICAgKGJ1ZmZlcltpbmRleCsrXSAmIDB4M0YpIDw8IDEyIHxcbiAgICAgICAgICAgIChidWZmZXJbaW5kZXgrK10gJiAweDNGKSA8PCA2ICB8XG4gICAgICAgICAgICAoYnVmZmVyW2luZGV4KytdICYgMHgzRik7XG4gICAgfVxuXG4gICAgaWYgKGNociA+PSAweDAxMDAwMCkge1xuICAgICAgLy8gQSBzdXJyb2dhdGUgcGFpclxuICAgICAgY2hyIC09IDB4MDEwMDAwO1xuXG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoY2hyID4+PiAxMCkgKyAweEQ4MDAsIChjaHIgJiAweDNGRikgKyAweERDMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHJpbmc7XG59XG5cbi8qKlxuICogQnVmZmVyLnByb3RvdHlwZS5jb3B5KClcbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IHtCdWZmZXJ9XG4gKiBAcGFyYW0gW3RhcmdldFN0YXJ0XSB7TnVtYmVyfVxuICogQHBhcmFtIFtzdGFydF0ge051bWJlcn1cbiAqIEBwYXJhbSBbZW5kXSB7TnVtYmVyfVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiBjb3B5KHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGk7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwO1xuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG5cbiAgaWYgKHRhcmdldCA9PT0gdGhpcyAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZ1xuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYXNjZW5kaW5nXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGVuO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9idWZmZXItbGl0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LXBhY2tlci5qc1xuXG5leHBvcnRzLnNldEV4dFBhY2tlcnMgPSBzZXRFeHRQYWNrZXJzO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG52YXIgcGFja1R5cGVkQXJyYXkgPSBCdWZmZXJpc2guVWludDhBcnJheS5mcm9tO1xudmFyIF9lbmNvZGU7XG5cbnZhciBFUlJPUl9DT0xVTU5TID0ge25hbWU6IDEsIG1lc3NhZ2U6IDEsIHN0YWNrOiAxLCBjb2x1bW5OdW1iZXI6IDEsIGZpbGVOYW1lOiAxLCBsaW5lTnVtYmVyOiAxfTtcblxuZnVuY3Rpb24gc2V0RXh0UGFja2Vycyhjb2RlYykge1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwRSwgRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwMSwgRXZhbEVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDIsIFJhbmdlRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwMywgUmVmZXJlbmNlRXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwNCwgU3ludGF4RXJyb3IsIFtwYWNrRXJyb3IsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwNSwgVHlwZUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcbiAgY29kZWMuYWRkRXh0UGFja2VyKDB4MDYsIFVSSUVycm9yLCBbcGFja0Vycm9yLCBlbmNvZGVdKTtcblxuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwQSwgUmVnRXhwLCBbcGFja1JlZ0V4cCwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBCLCBCb29sZWFuLCBbcGFja1ZhbHVlT2YsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwQywgU3RyaW5nLCBbcGFja1ZhbHVlT2YsIGVuY29kZV0pO1xuICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgwRCwgRGF0ZSwgW051bWJlciwgZW5jb2RlXSk7XG4gIGNvZGVjLmFkZEV4dFBhY2tlcigweDBGLCBOdW1iZXIsIFtwYWNrVmFsdWVPZiwgZW5jb2RlXSk7XG5cbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OEFycmF5KSB7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTEsIEludDhBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDEyLCBVaW50OEFycmF5LCBwYWNrVHlwZWRBcnJheSk7XG4gICAgY29kZWMuYWRkRXh0UGFja2VyKDB4MTMsIEludDE2QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNCwgVWludDE2QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxNSwgSW50MzJBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE2LCBVaW50MzJBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE3LCBGbG9hdDMyQXJyYXksIHBhY2tUeXBlZEFycmF5KTtcblxuICAgIC8vIFBoYW50b21KUy8xLjkuNyBkb2Vzbid0IGhhdmUgRmxvYXQ2NEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBGbG9hdDY0QXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE4LCBGbG9hdDY0QXJyYXksIHBhY2tUeXBlZEFycmF5KTtcbiAgICB9XG5cbiAgICAvLyBJRTEwIGRvZXNuJ3QgaGF2ZSBVaW50OENsYW1wZWRBcnJheVxuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDE5LCBVaW50OENsYW1wZWRBcnJheSwgcGFja1R5cGVkQXJyYXkpO1xuICAgIH1cblxuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDFBLCBBcnJheUJ1ZmZlciwgcGFja1R5cGVkQXJyYXkpO1xuICAgIGNvZGVjLmFkZEV4dFBhY2tlcigweDFELCBEYXRhVmlldywgcGFja1R5cGVkQXJyYXkpO1xuICB9XG5cbiAgaWYgKEJ1ZmZlcmlzaC5oYXNCdWZmZXIpIHtcbiAgICBjb2RlYy5hZGRFeHRQYWNrZXIoMHgxQiwgQnVmZmVyLCBCdWZmZXJpc2guZnJvbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG4gIGlmICghX2VuY29kZSkgX2VuY29kZSA9IHJlcXVpcmUoXCIuL2VuY29kZVwiKS5lbmNvZGU7IC8vIGxhenkgbG9hZFxuICByZXR1cm4gX2VuY29kZShpbnB1dCk7XG59XG5cbmZ1bmN0aW9uIHBhY2tWYWx1ZU9mKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUpLnZhbHVlT2YoKTtcbn1cblxuZnVuY3Rpb24gcGFja1JlZ0V4cCh2YWx1ZSkge1xuICB2YWx1ZSA9IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc3BsaXQoXCIvXCIpO1xuICB2YWx1ZS5zaGlmdCgpO1xuICB2YXIgb3V0ID0gW3ZhbHVlLnBvcCgpXTtcbiAgb3V0LnVuc2hpZnQodmFsdWUuam9pbihcIi9cIikpO1xuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwYWNrRXJyb3IodmFsdWUpIHtcbiAgdmFyIG91dCA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gRVJST1JfQ09MVU1OUykge1xuICAgIG91dFtrZXldID0gdmFsdWVba2V5XTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtcGFja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB3cml0ZS10eXBlLmpzXG5cbnZhciBJU19BUlJBWSA9IHJlcXVpcmUoXCJpc2FycmF5XCIpO1xudmFyIEludDY0QnVmZmVyID0gcmVxdWlyZShcImludDY0LWJ1ZmZlclwiKTtcbnZhciBVaW50NjRCRSA9IEludDY0QnVmZmVyLlVpbnQ2NEJFO1xudmFyIEludDY0QkUgPSBJbnQ2NEJ1ZmZlci5JbnQ2NEJFO1xuXG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlclByb3RvID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoLXByb3RvXCIpO1xudmFyIFdyaXRlVG9rZW4gPSByZXF1aXJlKFwiLi93cml0ZS10b2tlblwiKTtcbnZhciB1aW50OCA9IHJlcXVpcmUoXCIuL3dyaXRlLXVpbnQ4XCIpLnVpbnQ4O1xudmFyIEV4dEJ1ZmZlciA9IHJlcXVpcmUoXCIuL2V4dC1idWZmZXJcIikuRXh0QnVmZmVyO1xuXG52YXIgSEFTX1VJTlQ4QVJSQVkgPSAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFVpbnQ4QXJyYXkpO1xudmFyIEhBU19NQVAgPSAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIE1hcCk7XG5cbnZhciBleHRtYXAgPSBbXTtcbmV4dG1hcFsxXSA9IDB4ZDQ7XG5leHRtYXBbMl0gPSAweGQ1O1xuZXh0bWFwWzRdID0gMHhkNjtcbmV4dG1hcFs4XSA9IDB4ZDc7XG5leHRtYXBbMTZdID0gMHhkODtcblxuZXhwb3J0cy5nZXRXcml0ZVR5cGUgPSBnZXRXcml0ZVR5cGU7XG5cbmZ1bmN0aW9uIGdldFdyaXRlVHlwZShvcHRpb25zKSB7XG4gIHZhciB0b2tlbiA9IFdyaXRlVG9rZW4uZ2V0V3JpdGVUb2tlbihvcHRpb25zKTtcbiAgdmFyIHVzZXJhdyA9IG9wdGlvbnMgJiYgb3B0aW9ucy51c2VyYXc7XG4gIHZhciBiaW5hcnJheWJ1ZmZlciA9IEhBU19VSU5UOEFSUkFZICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5iaW5hcnJheWJ1ZmZlcjtcbiAgdmFyIGlzQnVmZmVyID0gYmluYXJyYXlidWZmZXIgPyBCdWZmZXJpc2guaXNBcnJheUJ1ZmZlciA6IEJ1ZmZlcmlzaC5pc0J1ZmZlcjtcbiAgdmFyIGJpbiA9IGJpbmFycmF5YnVmZmVyID8gYmluX2FycmF5YnVmZmVyIDogYmluX2J1ZmZlcjtcbiAgdmFyIHVzZW1hcCA9IEhBU19NQVAgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnVzZW1hcDtcbiAgdmFyIG1hcCA9IHVzZW1hcCA/IG1hcF90b19tYXAgOiBvYmpfdG9fbWFwO1xuXG4gIHZhciB3cml0ZVR5cGUgPSB7XG4gICAgXCJib29sZWFuXCI6IGJvb2wsXG4gICAgXCJmdW5jdGlvblwiOiBuaWwsXG4gICAgXCJudW1iZXJcIjogbnVtYmVyLFxuICAgIFwib2JqZWN0XCI6ICh1c2VyYXcgPyBvYmplY3RfcmF3IDogb2JqZWN0KSxcbiAgICBcInN0cmluZ1wiOiBfc3RyaW5nKHVzZXJhdyA/IHJhd19oZWFkX3NpemUgOiBzdHJfaGVhZF9zaXplKSxcbiAgICBcInN5bWJvbFwiOiBuaWwsXG4gICAgXCJ1bmRlZmluZWRcIjogbmlsXG4gIH07XG5cbiAgcmV0dXJuIHdyaXRlVHlwZTtcblxuICAvLyBmYWxzZSAtLSAweGMyXG4gIC8vIHRydWUgLS0gMHhjM1xuICBmdW5jdGlvbiBib29sKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSB2YWx1ZSA/IDB4YzMgOiAweGMyO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG51bWJlcihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBpdmFsdWUgPSB2YWx1ZSB8IDA7XG4gICAgdmFyIHR5cGU7XG4gICAgaWYgKHZhbHVlICE9PSBpdmFsdWUpIHtcbiAgICAgIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgICAgIHR5cGUgPSAweGNiO1xuICAgICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoLTB4MjAgPD0gaXZhbHVlICYmIGl2YWx1ZSA8PSAweDdGKSB7XG4gICAgICAvLyBwb3NpdGl2ZSBmaXhpbnQgLS0gMHgwMCAtIDB4N2ZcbiAgICAgIC8vIG5lZ2F0aXZlIGZpeGludCAtLSAweGUwIC0gMHhmZlxuICAgICAgdHlwZSA9IGl2YWx1ZSAmIDB4RkY7XG4gICAgfSBlbHNlIGlmICgwIDw9IGl2YWx1ZSkge1xuICAgICAgLy8gdWludCA4IC0tIDB4Y2NcbiAgICAgIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAgICAgLy8gdWludCAzMiAtLSAweGNlXG4gICAgICB0eXBlID0gKGl2YWx1ZSA8PSAweEZGKSA/IDB4Y2MgOiAoaXZhbHVlIDw9IDB4RkZGRikgPyAweGNkIDogMHhjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW50IDggLS0gMHhkMFxuICAgICAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgICAgIC8vIGludCAzMiAtLSAweGQyXG4gICAgICB0eXBlID0gKC0weDgwIDw9IGl2YWx1ZSkgPyAweGQwIDogKC0weDgwMDAgPD0gaXZhbHVlKSA/IDB4ZDEgOiAweGQyO1xuICAgIH1cbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBpdmFsdWUpO1xuICB9XG5cbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIGZ1bmN0aW9uIHVpbnQ2NChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gMHhjZjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCB2YWx1ZS50b0FycmF5KCkpO1xuICB9XG5cbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgZnVuY3Rpb24gaW50NjQoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IDB4ZDM7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgdmFsdWUudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8vIHN0ciA4IC0tIDB4ZDlcbiAgLy8gc3RyIDE2IC0tIDB4ZGFcbiAgLy8gc3RyIDMyIC0tIDB4ZGJcbiAgLy8gZml4c3RyIC0tIDB4YTAgLSAweGJmXG4gIGZ1bmN0aW9uIHN0cl9oZWFkX3NpemUobGVuZ3RoKSB7XG4gICAgcmV0dXJuIChsZW5ndGggPCAzMikgPyAxIDogKGxlbmd0aCA8PSAweEZGKSA/IDIgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAzIDogNTtcbiAgfVxuXG4gIC8vIHJhdyAxNiAtLSAweGRhXG4gIC8vIHJhdyAzMiAtLSAweGRiXG4gIC8vIGZpeHJhdyAtLSAweGEwIC0gMHhiZlxuICBmdW5jdGlvbiByYXdfaGVhZF9zaXplKGxlbmd0aCkge1xuICAgIHJldHVybiAobGVuZ3RoIDwgMzIpID8gMSA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDMgOiA1O1xuICB9XG5cbiAgZnVuY3Rpb24gX3N0cmluZyhoZWFkX3NpemUpIHtcbiAgICByZXR1cm4gc3RyaW5nO1xuXG4gICAgZnVuY3Rpb24gc3RyaW5nKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgICAvLyBwcmVwYXJlIGJ1ZmZlclxuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgIHZhciBtYXhzaXplID0gNSArIGxlbmd0aCAqIDM7XG4gICAgICBlbmNvZGVyLm9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZShtYXhzaXplKTtcbiAgICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcblxuICAgICAgLy8gZXhwZWN0ZWQgaGVhZGVyIHNpemVcbiAgICAgIHZhciBleHBlY3RlZCA9IGhlYWRfc2l6ZShsZW5ndGgpO1xuXG4gICAgICAvLyBleHBlY3RlZCBzdGFydCBwb2ludFxuICAgICAgdmFyIHN0YXJ0ID0gZW5jb2Rlci5vZmZzZXQgKyBleHBlY3RlZDtcblxuICAgICAgLy8gd3JpdGUgc3RyaW5nXG4gICAgICBsZW5ndGggPSBCdWZmZXJQcm90by53cml0ZS5jYWxsKGJ1ZmZlciwgdmFsdWUsIHN0YXJ0KTtcblxuICAgICAgLy8gYWN0dWFsIGhlYWRlciBzaXplXG4gICAgICB2YXIgYWN0dWFsID0gaGVhZF9zaXplKGxlbmd0aCk7XG5cbiAgICAgIC8vIG1vdmUgY29udGVudCB3aGVuIG5lZWRlZFxuICAgICAgaWYgKGV4cGVjdGVkICE9PSBhY3R1YWwpIHtcbiAgICAgICAgdmFyIHRhcmdldFN0YXJ0ID0gc3RhcnQgKyBhY3R1YWwgLSBleHBlY3RlZDtcbiAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgICAgICBCdWZmZXJQcm90by5jb3B5LmNhbGwoYnVmZmVyLCBidWZmZXIsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKTtcbiAgICAgIH1cblxuICAgICAgLy8gd3JpdGUgaGVhZGVyXG4gICAgICB2YXIgdHlwZSA9IChhY3R1YWwgPT09IDEpID8gKDB4YTAgKyBsZW5ndGgpIDogKGFjdHVhbCA8PSAzKSA/ICgweGQ3ICsgYWN0dWFsKSA6IDB4ZGI7XG4gICAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuXG4gICAgICAvLyBtb3ZlIGN1cnNvclxuICAgICAgZW5jb2Rlci5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIC8vIG51bGxcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiBuaWwoZW5jb2RlciwgdmFsdWUpO1xuXG4gICAgLy8gQnVmZmVyXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkgcmV0dXJuIGJpbihlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBBcnJheVxuICAgIGlmIChJU19BUlJBWSh2YWx1ZSkpIHJldHVybiBhcnJheShlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBpbnQ2NC1idWZmZXIgb2JqZWN0c1xuICAgIGlmIChVaW50NjRCRS5pc1VpbnQ2NEJFKHZhbHVlKSkgcmV0dXJuIHVpbnQ2NChlbmNvZGVyLCB2YWx1ZSk7XG4gICAgaWYgKEludDY0QkUuaXNJbnQ2NEJFKHZhbHVlKSkgcmV0dXJuIGludDY0KGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIGV4dCBmb3JtYXRzXG4gICAgdmFyIHBhY2tlciA9IGVuY29kZXIuY29kZWMuZ2V0RXh0UGFja2VyKHZhbHVlKTtcbiAgICBpZiAocGFja2VyKSB2YWx1ZSA9IHBhY2tlcih2YWx1ZSk7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXh0QnVmZmVyKSByZXR1cm4gZXh0KGVuY29kZXIsIHZhbHVlKTtcblxuICAgIC8vIHBsYWluIG9sZCBPYmplY3RzIG9yIE1hcFxuICAgIG1hcChlbmNvZGVyLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3RfcmF3KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgLy8gQnVmZmVyXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkgcmV0dXJuIHJhdyhlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICAvLyBvdGhlcnNcbiAgICBvYmplY3QoZW5jb2RlciwgdmFsdWUpO1xuICB9XG5cbiAgLy8gbmlsIC0tIDB4YzBcbiAgZnVuY3Rpb24gbmlsKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSAweGMwO1xuICAgIHRva2VuW3R5cGVdKGVuY29kZXIsIHZhbHVlKTtcbiAgfVxuXG4gIC8vIGZpeGFycmF5IC0tIDB4OTAgLSAweDlmXG4gIC8vIGFycmF5IDE2IC0tIDB4ZGNcbiAgLy8gYXJyYXkgMzIgLS0gMHhkZFxuICBmdW5jdGlvbiBhcnJheShlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMTYpID8gKDB4OTAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkYyA6IDB4ZGQ7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgIHZhciBlbmNvZGUgPSBlbmNvZGVyLmNvZGVjLmVuY29kZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBlbmNvZGUoZW5jb2RlciwgdmFsdWVbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgZnVuY3Rpb24gYmluX2J1ZmZlcihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMHhGRikgPyAweGM0IDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhjNSA6IDB4YzY7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcbiAgICBlbmNvZGVyLnNlbmQodmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluX2FycmF5YnVmZmVyKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgYmluX2J1ZmZlcihlbmNvZGVyLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICB9XG5cbiAgLy8gZml4ZXh0IDEgLS0gMHhkNFxuICAvLyBmaXhleHQgMiAtLSAweGQ1XG4gIC8vIGZpeGV4dCA0IC0tIDB4ZDZcbiAgLy8gZml4ZXh0IDggLS0gMHhkN1xuICAvLyBmaXhleHQgMTYgLS0gMHhkOFxuICAvLyBleHQgOCAtLSAweGM3XG4gIC8vIGV4dCAxNiAtLSAweGM4XG4gIC8vIGV4dCAzMiAtLSAweGM5XG4gIGZ1bmN0aW9uIGV4dChlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBidWZmZXIgPSB2YWx1ZS5idWZmZXI7XG4gICAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSBleHRtYXBbbGVuZ3RoXSB8fCAoKGxlbmd0aCA8IDB4RkYpID8gMHhjNyA6IChsZW5ndGggPD0gMHhGRkZGKSA/IDB4YzggOiAweGM5KTtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuICAgIHVpbnQ4W3ZhbHVlLnR5cGVdKGVuY29kZXIpO1xuICAgIGVuY29kZXIuc2VuZChidWZmZXIpO1xuICB9XG5cbiAgLy8gZml4bWFwIC0tIDB4ODAgLSAweDhmXG4gIC8vIG1hcCAxNiAtLSAweGRlXG4gIC8vIG1hcCAzMiAtLSAweGRmXG4gIGZ1bmN0aW9uIG9ial90b19tYXAoZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHR5cGUgPSAobGVuZ3RoIDwgMTYpID8gKDB4ODAgKyBsZW5ndGgpIDogKGxlbmd0aCA8PSAweEZGRkYpID8gMHhkZSA6IDB4ZGY7XG4gICAgdG9rZW5bdHlwZV0oZW5jb2RlciwgbGVuZ3RoKTtcblxuICAgIHZhciBlbmNvZGUgPSBlbmNvZGVyLmNvZGVjLmVuY29kZTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBlbmNvZGUoZW5jb2Rlciwga2V5KTtcbiAgICAgIGVuY29kZShlbmNvZGVyLCB2YWx1ZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGZpeG1hcCAtLSAweDgwIC0gMHg4ZlxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICBmdW5jdGlvbiBtYXBfdG9fbWFwKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBNYXApKSByZXR1cm4gb2JqX3RvX21hcChlbmNvZGVyLCB2YWx1ZSk7XG5cbiAgICB2YXIgbGVuZ3RoID0gdmFsdWUuc2l6ZTtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAxNikgPyAoMHg4MCArIGxlbmd0aCkgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGRlIDogMHhkZjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuXG4gICAgdmFyIGVuY29kZSA9IGVuY29kZXIuY29kZWMuZW5jb2RlO1xuICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXksIG0pIHtcbiAgICAgIGVuY29kZShlbmNvZGVyLCBrZXkpO1xuICAgICAgZW5jb2RlKGVuY29kZXIsIHZhbCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByYXcgMTYgLS0gMHhkYVxuICAvLyByYXcgMzIgLS0gMHhkYlxuICAvLyBmaXhyYXcgLS0gMHhhMCAtIDB4YmZcbiAgZnVuY3Rpb24gcmF3KGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICB2YXIgdHlwZSA9IChsZW5ndGggPCAzMikgPyAoMHhhMCArIGxlbmd0aCkgOiAobGVuZ3RoIDw9IDB4RkZGRikgPyAweGRhIDogMHhkYjtcbiAgICB0b2tlblt0eXBlXShlbmNvZGVyLCBsZW5ndGgpO1xuICAgIGVuY29kZXIuc2VuZCh2YWx1ZSk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvd3JpdGUtdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gd3JpdGUtdG9rZW4uanNcblxudmFyIGllZWU3NTQgPSByZXF1aXJlKFwiaWVlZTc1NFwiKTtcbnZhciBJbnQ2NEJ1ZmZlciA9IHJlcXVpcmUoXCJpbnQ2NC1idWZmZXJcIik7XG52YXIgVWludDY0QkUgPSBJbnQ2NEJ1ZmZlci5VaW50NjRCRTtcbnZhciBJbnQ2NEJFID0gSW50NjRCdWZmZXIuSW50NjRCRTtcblxudmFyIHVpbnQ4ID0gcmVxdWlyZShcIi4vd3JpdGUtdWludDhcIikudWludDg7XG52YXIgQnVmZmVyaXNoID0gcmVxdWlyZShcIi4vYnVmZmVyaXNoXCIpO1xudmFyIEJ1ZmZlciA9IEJ1ZmZlcmlzaC5nbG9iYWw7XG52YXIgSVNfQlVGRkVSX1NISU0gPSBCdWZmZXJpc2guaGFzQnVmZmVyICYmIChcIlRZUEVEX0FSUkFZX1NVUFBPUlRcIiBpbiBCdWZmZXIpO1xudmFyIE5PX1RZUEVEX0FSUkFZID0gSVNfQlVGRkVSX1NISU0gJiYgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUO1xudmFyIEJ1ZmZlcl9wcm90b3R5cGUgPSBCdWZmZXJpc2guaGFzQnVmZmVyICYmIEJ1ZmZlci5wcm90b3R5cGUgfHwge307XG5cbmV4cG9ydHMuZ2V0V3JpdGVUb2tlbiA9IGdldFdyaXRlVG9rZW47XG5cbmZ1bmN0aW9uIGdldFdyaXRlVG9rZW4ob3B0aW9ucykge1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnVpbnQ4YXJyYXkpIHtcbiAgICByZXR1cm4gaW5pdF91aW50OGFycmF5KCk7XG4gIH0gZWxzZSBpZiAoTk9fVFlQRURfQVJSQVkgfHwgKEJ1ZmZlcmlzaC5oYXNCdWZmZXIgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnNhZmUpKSB7XG4gICAgcmV0dXJuIGluaXRfc2FmZSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBpbml0X3Rva2VuKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdF91aW50OGFycmF5KCkge1xuICB2YXIgdG9rZW4gPSBpbml0X3Rva2VuKCk7XG5cbiAgLy8gZmxvYXQgMzIgLS0gMHhjYVxuICAvLyBmbG9hdCA2NCAtLSAweGNiXG4gIHRva2VuWzB4Y2FdID0gd3JpdGVOKDB4Y2EsIDQsIHdyaXRlRmxvYXRCRSk7XG4gIHRva2VuWzB4Y2JdID0gd3JpdGVOKDB4Y2IsIDgsIHdyaXRlRG91YmxlQkUpO1xuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuLy8gTm9kZS5qcyBhbmQgYnJvd3NlcnMgd2l0aCBUeXBlZEFycmF5XG5cbmZ1bmN0aW9uIGluaXRfdG9rZW4oKSB7XG4gIC8vIChpbW1lZGlhdGUgdmFsdWVzKVxuICAvLyBwb3NpdGl2ZSBmaXhpbnQgLS0gMHgwMCAtIDB4N2ZcbiAgLy8gbmlsIC0tIDB4YzBcbiAgLy8gZmFsc2UgLS0gMHhjMlxuICAvLyB0cnVlIC0tIDB4YzNcbiAgLy8gbmVnYXRpdmUgZml4aW50IC0tIDB4ZTAgLSAweGZmXG4gIHZhciB0b2tlbiA9IHVpbnQ4LnNsaWNlKCk7XG5cbiAgLy8gYmluIDggLS0gMHhjNFxuICAvLyBiaW4gMTYgLS0gMHhjNVxuICAvLyBiaW4gMzIgLS0gMHhjNlxuICB0b2tlblsweGM0XSA9IHdyaXRlMSgweGM0KTtcbiAgdG9rZW5bMHhjNV0gPSB3cml0ZTIoMHhjNSk7XG4gIHRva2VuWzB4YzZdID0gd3JpdGU0KDB4YzYpO1xuXG4gIC8vIGV4dCA4IC0tIDB4YzdcbiAgLy8gZXh0IDE2IC0tIDB4YzhcbiAgLy8gZXh0IDMyIC0tIDB4YzlcbiAgdG9rZW5bMHhjN10gPSB3cml0ZTEoMHhjNyk7XG4gIHRva2VuWzB4YzhdID0gd3JpdGUyKDB4YzgpO1xuICB0b2tlblsweGM5XSA9IHdyaXRlNCgweGM5KTtcblxuICAvLyBmbG9hdCAzMiAtLSAweGNhXG4gIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgdG9rZW5bMHhjYV0gPSB3cml0ZU4oMHhjYSwgNCwgKEJ1ZmZlcl9wcm90b3R5cGUud3JpdGVGbG9hdEJFIHx8IHdyaXRlRmxvYXRCRSksIHRydWUpO1xuICB0b2tlblsweGNiXSA9IHdyaXRlTigweGNiLCA4LCAoQnVmZmVyX3Byb3RvdHlwZS53cml0ZURvdWJsZUJFIHx8IHdyaXRlRG91YmxlQkUpLCB0cnVlKTtcblxuICAvLyB1aW50IDggLS0gMHhjY1xuICAvLyB1aW50IDE2IC0tIDB4Y2RcbiAgLy8gdWludCAzMiAtLSAweGNlXG4gIC8vIHVpbnQgNjQgLS0gMHhjZlxuICB0b2tlblsweGNjXSA9IHdyaXRlMSgweGNjKTtcbiAgdG9rZW5bMHhjZF0gPSB3cml0ZTIoMHhjZCk7XG4gIHRva2VuWzB4Y2VdID0gd3JpdGU0KDB4Y2UpO1xuICB0b2tlblsweGNmXSA9IHdyaXRlTigweGNmLCA4LCB3cml0ZVVJbnQ2NEJFKTtcblxuICAvLyBpbnQgOCAtLSAweGQwXG4gIC8vIGludCAxNiAtLSAweGQxXG4gIC8vIGludCAzMiAtLSAweGQyXG4gIC8vIGludCA2NCAtLSAweGQzXG4gIHRva2VuWzB4ZDBdID0gd3JpdGUxKDB4ZDApO1xuICB0b2tlblsweGQxXSA9IHdyaXRlMigweGQxKTtcbiAgdG9rZW5bMHhkMl0gPSB3cml0ZTQoMHhkMik7XG4gIHRva2VuWzB4ZDNdID0gd3JpdGVOKDB4ZDMsIDgsIHdyaXRlSW50NjRCRSk7XG5cbiAgLy8gc3RyIDggLS0gMHhkOVxuICAvLyBzdHIgMTYgLS0gMHhkYVxuICAvLyBzdHIgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IHdyaXRlMSgweGQ5KTtcbiAgdG9rZW5bMHhkYV0gPSB3cml0ZTIoMHhkYSk7XG4gIHRva2VuWzB4ZGJdID0gd3JpdGU0KDB4ZGIpO1xuXG4gIC8vIGFycmF5IDE2IC0tIDB4ZGNcbiAgLy8gYXJyYXkgMzIgLS0gMHhkZFxuICB0b2tlblsweGRjXSA9IHdyaXRlMigweGRjKTtcbiAgdG9rZW5bMHhkZF0gPSB3cml0ZTQoMHhkZCk7XG5cbiAgLy8gbWFwIDE2IC0tIDB4ZGVcbiAgLy8gbWFwIDMyIC0tIDB4ZGZcbiAgdG9rZW5bMHhkZV0gPSB3cml0ZTIoMHhkZSk7XG4gIHRva2VuWzB4ZGZdID0gd3JpdGU0KDB4ZGYpO1xuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuLy8gc2FmZSBtb2RlOiBmb3Igb2xkIGJyb3dzZXJzIGFuZCB3aG8gbmVlZHMgYXNzZXJ0c1xuXG5mdW5jdGlvbiBpbml0X3NhZmUoKSB7XG4gIC8vIChpbW1lZGlhdGUgdmFsdWVzKVxuICAvLyBwb3NpdGl2ZSBmaXhpbnQgLS0gMHgwMCAtIDB4N2ZcbiAgLy8gbmlsIC0tIDB4YzBcbiAgLy8gZmFsc2UgLS0gMHhjMlxuICAvLyB0cnVlIC0tIDB4YzNcbiAgLy8gbmVnYXRpdmUgZml4aW50IC0tIDB4ZTAgLSAweGZmXG4gIHZhciB0b2tlbiA9IHVpbnQ4LnNsaWNlKCk7XG5cbiAgLy8gYmluIDggLS0gMHhjNFxuICAvLyBiaW4gMTYgLS0gMHhjNVxuICAvLyBiaW4gMzIgLS0gMHhjNlxuICB0b2tlblsweGM0XSA9IHdyaXRlTigweGM0LCAxLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDgpO1xuICB0b2tlblsweGM1XSA9IHdyaXRlTigweGM1LCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUpO1xuICB0b2tlblsweGM2XSA9IHdyaXRlTigweGM2LCA0LCBCdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUpO1xuXG4gIC8vIGV4dCA4IC0tIDB4YzdcbiAgLy8gZXh0IDE2IC0tIDB4YzhcbiAgLy8gZXh0IDMyIC0tIDB4YzlcbiAgdG9rZW5bMHhjN10gPSB3cml0ZU4oMHhjNywgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4KTtcbiAgdG9rZW5bMHhjOF0gPSB3cml0ZU4oMHhjOCwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhjOV0gPSB3cml0ZU4oMHhjOSwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICAvLyBmbG9hdCAzMiAtLSAweGNhXG4gIC8vIGZsb2F0IDY0IC0tIDB4Y2JcbiAgdG9rZW5bMHhjYV0gPSB3cml0ZU4oMHhjYSwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUpO1xuICB0b2tlblsweGNiXSA9IHdyaXRlTigweGNiLCA4LCBCdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUpO1xuXG4gIC8vIHVpbnQgOCAtLSAweGNjXG4gIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAvLyB1aW50IDMyIC0tIDB4Y2VcbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIHRva2VuWzB4Y2NdID0gd3JpdGVOKDB4Y2MsIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCk7XG4gIHRva2VuWzB4Y2RdID0gd3JpdGVOKDB4Y2QsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4Y2VdID0gd3JpdGVOKDB4Y2UsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG4gIHRva2VuWzB4Y2ZdID0gd3JpdGVOKDB4Y2YsIDgsIHdyaXRlVUludDY0QkUpO1xuXG4gIC8vIGludCA4IC0tIDB4ZDBcbiAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgLy8gaW50IDMyIC0tIDB4ZDJcbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgdG9rZW5bMHhkMF0gPSB3cml0ZU4oMHhkMCwgMSwgQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDgpO1xuICB0b2tlblsweGQxXSA9IHdyaXRlTigweGQxLCAyLCBCdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSk7XG4gIHRva2VuWzB4ZDJdID0gd3JpdGVOKDB4ZDIsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFKTtcbiAgdG9rZW5bMHhkM10gPSB3cml0ZU4oMHhkMywgOCwgd3JpdGVJbnQ2NEJFKTtcblxuICAvLyBzdHIgOCAtLSAweGQ5XG4gIC8vIHN0ciAxNiAtLSAweGRhXG4gIC8vIHN0ciAzMiAtLSAweGRiXG4gIHRva2VuWzB4ZDldID0gd3JpdGVOKDB4ZDksIDEsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCk7XG4gIHRva2VuWzB4ZGFdID0gd3JpdGVOKDB4ZGEsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4ZGJdID0gd3JpdGVOKDB4ZGIsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgLy8gYXJyYXkgMTYgLS0gMHhkY1xuICAvLyBhcnJheSAzMiAtLSAweGRkXG4gIHRva2VuWzB4ZGNdID0gd3JpdGVOKDB4ZGMsIDIsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSk7XG4gIHRva2VuWzB4ZGRdID0gd3JpdGVOKDB4ZGQsIDQsIEJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSk7XG5cbiAgLy8gbWFwIDE2IC0tIDB4ZGVcbiAgLy8gbWFwIDMyIC0tIDB4ZGZcbiAgdG9rZW5bMHhkZV0gPSB3cml0ZU4oMHhkZSwgMiwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFKTtcbiAgdG9rZW5bMHhkZl0gPSB3cml0ZU4oMHhkZiwgNCwgQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFKTtcblxuICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHdyaXRlMSh0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUoMik7XG4gICAgdmFyIGJ1ZmZlciA9IGVuY29kZXIuYnVmZmVyO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0eXBlO1xuICAgIGJ1ZmZlcltvZmZzZXRdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyaXRlMih0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihlbmNvZGVyLCB2YWx1ZSkge1xuICAgIHZhciBvZmZzZXQgPSBlbmNvZGVyLnJlc2VydmUoMyk7XG4gICAgdmFyIGJ1ZmZlciA9IGVuY29kZXIuYnVmZmVyO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0eXBlO1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSA+Pj4gODtcbiAgICBidWZmZXJbb2Zmc2V0XSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cml0ZTQodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZW5jb2RlciwgdmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZW5jb2Rlci5yZXNlcnZlKDUpO1xuICAgIHZhciBidWZmZXIgPSBlbmNvZGVyLmJ1ZmZlcjtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdHlwZTtcbiAgICBidWZmZXJbb2Zmc2V0KytdID0gdmFsdWUgPj4+IDI0O1xuICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB2YWx1ZSA+Pj4gMTY7XG4gICAgYnVmZmVyW29mZnNldCsrXSA9IHZhbHVlID4+PiA4O1xuICAgIGJ1ZmZlcltvZmZzZXRdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyaXRlTih0eXBlLCBsZW4sIG1ldGhvZCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVuY29kZXIsIHZhbHVlKSB7XG4gICAgdmFyIG9mZnNldCA9IGVuY29kZXIucmVzZXJ2ZShsZW4gKyAxKTtcbiAgICBlbmNvZGVyLmJ1ZmZlcltvZmZzZXQrK10gPSB0eXBlO1xuICAgIG1ldGhvZC5jYWxsKGVuY29kZXIuYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyaXRlVUludDY0QkUodmFsdWUsIG9mZnNldCkge1xuICBuZXcgVWludDY0QkUodGhpcywgb2Zmc2V0LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlSW50NjRCRSh2YWx1ZSwgb2Zmc2V0KSB7XG4gIG5ldyBJbnQ2NEJFKHRoaXMsIG9mZnNldCwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0QkUodmFsdWUsIG9mZnNldCkge1xuICBpZWVlNzU0LndyaXRlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCAyMywgNCk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlQkUodmFsdWUsIG9mZnNldCkge1xuICBpZWVlNzU0LndyaXRlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCA1MiwgOCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tc2dwYWNrLWxpdGUvbGliL3dyaXRlLXRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBleHQtdW5wYWNrZXIuanNcblxuZXhwb3J0cy5zZXRFeHRVbnBhY2tlcnMgPSBzZXRFeHRVbnBhY2tlcnM7XG5cbnZhciBCdWZmZXJpc2ggPSByZXF1aXJlKFwiLi9idWZmZXJpc2hcIik7XG52YXIgQnVmZmVyID0gQnVmZmVyaXNoLmdsb2JhbDtcbnZhciBfZGVjb2RlO1xuXG52YXIgRVJST1JfQ09MVU1OUyA9IHtuYW1lOiAxLCBtZXNzYWdlOiAxLCBzdGFjazogMSwgY29sdW1uTnVtYmVyOiAxLCBmaWxlTmFtZTogMSwgbGluZU51bWJlcjogMX07XG5cbmZ1bmN0aW9uIHNldEV4dFVucGFja2Vycyhjb2RlYykge1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDBFLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwMSwgW2RlY29kZSwgdW5wYWNrRXJyb3IoRXZhbEVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDAyLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihSYW5nZUVycm9yKV0pO1xuICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDAzLCBbZGVjb2RlLCB1bnBhY2tFcnJvcihSZWZlcmVuY2VFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwNCwgW2RlY29kZSwgdW5wYWNrRXJyb3IoU3ludGF4RXJyb3IpXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MDUsIFtkZWNvZGUsIHVucGFja0Vycm9yKFR5cGVFcnJvcildKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwNiwgW2RlY29kZSwgdW5wYWNrRXJyb3IoVVJJRXJyb3IpXSk7XG5cbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwQSwgW2RlY29kZSwgdW5wYWNrUmVnRXhwXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEIsIFtkZWNvZGUsIHVucGFja0NsYXNzKEJvb2xlYW4pXSk7XG4gIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MEMsIFtkZWNvZGUsIHVucGFja0NsYXNzKFN0cmluZyldKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwRCwgW2RlY29kZSwgdW5wYWNrQ2xhc3MoRGF0ZSldKTtcbiAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgwRiwgW2RlY29kZSwgdW5wYWNrQ2xhc3MoTnVtYmVyKV0pO1xuXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgVWludDhBcnJheSkge1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTEsIHVucGFja0NsYXNzKEludDhBcnJheSkpO1xuICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTIsIHVucGFja0NsYXNzKFVpbnQ4QXJyYXkpKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDEzLCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEludDE2QXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNCwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhVaW50MTZBcnJheSldKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE1LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEludDMyQXJyYXkpXSk7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxNiwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhVaW50MzJBcnJheSldKTtcbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDE3LCBbdW5wYWNrQXJyYXlCdWZmZXIsIHVucGFja0NsYXNzKEZsb2F0MzJBcnJheSldKTtcblxuICAgIC8vIFBoYW50b21KUy8xLjkuNyBkb2Vzbid0IGhhdmUgRmxvYXQ2NEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBGbG9hdDY0QXJyYXkpIHtcbiAgICAgIGNvZGVjLmFkZEV4dFVucGFja2VyKDB4MTgsIFt1bnBhY2tBcnJheUJ1ZmZlciwgdW5wYWNrQ2xhc3MoRmxvYXQ2NEFycmF5KV0pO1xuICAgIH1cblxuICAgIC8vIElFMTAgZG9lc24ndCBoYXZlIFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSkge1xuICAgICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxOSwgdW5wYWNrQ2xhc3MoVWludDhDbGFtcGVkQXJyYXkpKTtcbiAgICB9XG5cbiAgICBjb2RlYy5hZGRFeHRVbnBhY2tlcigweDFBLCB1bnBhY2tBcnJheUJ1ZmZlcik7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxRCwgW3VucGFja0FycmF5QnVmZmVyLCB1bnBhY2tDbGFzcyhEYXRhVmlldyldKTtcbiAgfVxuXG4gIGlmIChCdWZmZXJpc2guaGFzQnVmZmVyKSB7XG4gICAgY29kZWMuYWRkRXh0VW5wYWNrZXIoMHgxQiwgdW5wYWNrQ2xhc3MoQnVmZmVyKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG4gIGlmICghX2RlY29kZSkgX2RlY29kZSA9IHJlcXVpcmUoXCIuL2RlY29kZVwiKS5kZWNvZGU7IC8vIGxhenkgbG9hZFxuICByZXR1cm4gX2RlY29kZShpbnB1dCk7XG59XG5cbmZ1bmN0aW9uIHVucGFja1JlZ0V4cCh2YWx1ZSkge1xuICByZXR1cm4gUmVnRXhwLmFwcGx5KG51bGwsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gdW5wYWNrRXJyb3IoQ2xhc3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIG91dCA9IG5ldyBDbGFzcygpO1xuICAgIGZvciAodmFyIGtleSBpbiBFUlJPUl9DT0xVTU5TKSB7XG4gICAgICBvdXRba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVucGFja0NsYXNzKENsYXNzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQ2xhc3ModmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1bnBhY2tBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICByZXR1cm4gKG5ldyBVaW50OEFycmF5KHZhbHVlKSkuYnVmZmVyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9leHQtdW5wYWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlYWQtdG9rZW4uanNcblxudmFyIFJlYWRGb3JtYXQgPSByZXF1aXJlKFwiLi9yZWFkLWZvcm1hdFwiKTtcblxuZXhwb3J0cy5nZXRSZWFkVG9rZW4gPSBnZXRSZWFkVG9rZW47XG5cbmZ1bmN0aW9uIGdldFJlYWRUb2tlbihvcHRpb25zKSB7XG4gIHZhciBmb3JtYXQgPSBSZWFkRm9ybWF0LmdldFJlYWRGb3JtYXQob3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy51c2VyYXcpIHtcbiAgICByZXR1cm4gaW5pdF91c2VyYXcoZm9ybWF0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5pdF90b2tlbihmb3JtYXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRfdG9rZW4oZm9ybWF0KSB7XG4gIHZhciBpO1xuICB2YXIgdG9rZW4gPSBuZXcgQXJyYXkoMjU2KTtcblxuICAvLyBwb3NpdGl2ZSBmaXhpbnQgLS0gMHgwMCAtIDB4N2ZcbiAgZm9yIChpID0gMHgwMDsgaSA8PSAweDdmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGNvbnN0YW50KGkpO1xuICB9XG5cbiAgLy8gZml4bWFwIC0tIDB4ODAgLSAweDhmXG4gIGZvciAoaSA9IDB4ODA7IGkgPD0gMHg4ZjsgaSsrKSB7XG4gICAgdG9rZW5baV0gPSBmaXgoaSAtIDB4ODAsIGZvcm1hdC5tYXApO1xuICB9XG5cbiAgLy8gZml4YXJyYXkgLS0gMHg5MCAtIDB4OWZcbiAgZm9yIChpID0gMHg5MDsgaSA8PSAweDlmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGZpeChpIC0gMHg5MCwgZm9ybWF0LmFycmF5KTtcbiAgfVxuXG4gIC8vIGZpeHN0ciAtLSAweGEwIC0gMHhiZlxuICBmb3IgKGkgPSAweGEwOyBpIDw9IDB4YmY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweGEwLCBmb3JtYXQuc3RyKTtcbiAgfVxuXG4gIC8vIG5pbCAtLSAweGMwXG4gIHRva2VuWzB4YzBdID0gY29uc3RhbnQobnVsbCk7XG5cbiAgLy8gKG5ldmVyIHVzZWQpIC0tIDB4YzFcbiAgdG9rZW5bMHhjMV0gPSBudWxsO1xuXG4gIC8vIGZhbHNlIC0tIDB4YzJcbiAgLy8gdHJ1ZSAtLSAweGMzXG4gIHRva2VuWzB4YzJdID0gY29uc3RhbnQoZmFsc2UpO1xuICB0b2tlblsweGMzXSA9IGNvbnN0YW50KHRydWUpO1xuXG4gIC8vIGJpbiA4IC0tIDB4YzRcbiAgLy8gYmluIDE2IC0tIDB4YzVcbiAgLy8gYmluIDMyIC0tIDB4YzZcbiAgdG9rZW5bMHhjNF0gPSBmbGV4KGZvcm1hdC51aW50OCwgZm9ybWF0LmJpbik7XG4gIHRva2VuWzB4YzVdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuYmluKTtcbiAgdG9rZW5bMHhjNl0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5iaW4pO1xuXG4gIC8vIGV4dCA4IC0tIDB4YzdcbiAgLy8gZXh0IDE2IC0tIDB4YzhcbiAgLy8gZXh0IDMyIC0tIDB4YzlcbiAgdG9rZW5bMHhjN10gPSBmbGV4KGZvcm1hdC51aW50OCwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4YzhdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhjOV0gPSBmbGV4KGZvcm1hdC51aW50MzIsIGZvcm1hdC5leHQpO1xuXG4gIC8vIGZsb2F0IDMyIC0tIDB4Y2FcbiAgLy8gZmxvYXQgNjQgLS0gMHhjYlxuICB0b2tlblsweGNhXSA9IGZvcm1hdC5mbG9hdDMyO1xuICB0b2tlblsweGNiXSA9IGZvcm1hdC5mbG9hdDY0O1xuXG4gIC8vIHVpbnQgOCAtLSAweGNjXG4gIC8vIHVpbnQgMTYgLS0gMHhjZFxuICAvLyB1aW50IDMyIC0tIDB4Y2VcbiAgLy8gdWludCA2NCAtLSAweGNmXG4gIHRva2VuWzB4Y2NdID0gZm9ybWF0LnVpbnQ4O1xuICB0b2tlblsweGNkXSA9IGZvcm1hdC51aW50MTY7XG4gIHRva2VuWzB4Y2VdID0gZm9ybWF0LnVpbnQzMjtcbiAgdG9rZW5bMHhjZl0gPSBmb3JtYXQudWludDY0O1xuXG4gIC8vIGludCA4IC0tIDB4ZDBcbiAgLy8gaW50IDE2IC0tIDB4ZDFcbiAgLy8gaW50IDMyIC0tIDB4ZDJcbiAgLy8gaW50IDY0IC0tIDB4ZDNcbiAgdG9rZW5bMHhkMF0gPSBmb3JtYXQuaW50ODtcbiAgdG9rZW5bMHhkMV0gPSBmb3JtYXQuaW50MTY7XG4gIHRva2VuWzB4ZDJdID0gZm9ybWF0LmludDMyO1xuICB0b2tlblsweGQzXSA9IGZvcm1hdC5pbnQ2NDtcblxuICAvLyBmaXhleHQgMSAtLSAweGQ0XG4gIC8vIGZpeGV4dCAyIC0tIDB4ZDVcbiAgLy8gZml4ZXh0IDQgLS0gMHhkNlxuICAvLyBmaXhleHQgOCAtLSAweGQ3XG4gIC8vIGZpeGV4dCAxNiAtLSAweGQ4XG4gIHRva2VuWzB4ZDRdID0gZml4KDEsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ1XSA9IGZpeCgyLCBmb3JtYXQuZXh0KTtcbiAgdG9rZW5bMHhkNl0gPSBmaXgoNCwgZm9ybWF0LmV4dCk7XG4gIHRva2VuWzB4ZDddID0gZml4KDgsIGZvcm1hdC5leHQpO1xuICB0b2tlblsweGQ4XSA9IGZpeCgxNiwgZm9ybWF0LmV4dCk7XG5cbiAgLy8gc3RyIDggLS0gMHhkOVxuICAvLyBzdHIgMTYgLS0gMHhkYVxuICAvLyBzdHIgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IGZsZXgoZm9ybWF0LnVpbnQ4LCBmb3JtYXQuc3RyKTtcbiAgdG9rZW5bMHhkYV0gPSBmbGV4KGZvcm1hdC51aW50MTYsIGZvcm1hdC5zdHIpO1xuICB0b2tlblsweGRiXSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LnN0cik7XG5cbiAgLy8gYXJyYXkgMTYgLS0gMHhkY1xuICAvLyBhcnJheSAzMiAtLSAweGRkXG4gIHRva2VuWzB4ZGNdID0gZmxleChmb3JtYXQudWludDE2LCBmb3JtYXQuYXJyYXkpO1xuICB0b2tlblsweGRkXSA9IGZsZXgoZm9ybWF0LnVpbnQzMiwgZm9ybWF0LmFycmF5KTtcblxuICAvLyBtYXAgMTYgLS0gMHhkZVxuICAvLyBtYXAgMzIgLS0gMHhkZlxuICB0b2tlblsweGRlXSA9IGZsZXgoZm9ybWF0LnVpbnQxNiwgZm9ybWF0Lm1hcCk7XG4gIHRva2VuWzB4ZGZdID0gZmxleChmb3JtYXQudWludDMyLCBmb3JtYXQubWFwKTtcblxuICAvLyBuZWdhdGl2ZSBmaXhpbnQgLS0gMHhlMCAtIDB4ZmZcbiAgZm9yIChpID0gMHhlMDsgaSA8PSAweGZmOyBpKyspIHtcbiAgICB0b2tlbltpXSA9IGNvbnN0YW50KGkgLSAweDEwMCk7XG4gIH1cblxuICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIGluaXRfdXNlcmF3KGZvcm1hdCkge1xuICB2YXIgaTtcbiAgdmFyIHRva2VuID0gaW5pdF90b2tlbihmb3JtYXQpLnNsaWNlKCk7XG5cbiAgLy8gcmF3IDggLS0gMHhkOVxuICAvLyByYXcgMTYgLS0gMHhkYVxuICAvLyByYXcgMzIgLS0gMHhkYlxuICB0b2tlblsweGQ5XSA9IHRva2VuWzB4YzRdO1xuICB0b2tlblsweGRhXSA9IHRva2VuWzB4YzVdO1xuICB0b2tlblsweGRiXSA9IHRva2VuWzB4YzZdO1xuXG4gIC8vIGZpeHJhdyAtLSAweGEwIC0gMHhiZlxuICBmb3IgKGkgPSAweGEwOyBpIDw9IDB4YmY7IGkrKykge1xuICAgIHRva2VuW2ldID0gZml4KGkgLSAweGEwLCBmb3JtYXQuYmluKTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmxleChsZW5GdW5jLCBkZWNvZGVGdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNvZGVyKSB7XG4gICAgdmFyIGxlbiA9IGxlbkZ1bmMoZGVjb2Rlcik7XG4gICAgcmV0dXJuIGRlY29kZUZ1bmMoZGVjb2RlciwgbGVuKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZml4KGxlbiwgbWV0aG9kKSB7XG4gIHJldHVybiBmdW5jdGlvbihkZWNvZGVyKSB7XG4gICAgcmV0dXJuIG1ldGhvZChkZWNvZGVyLCBsZW4pO1xuICB9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXNncGFjay1saXRlL2xpYi9yZWFkLXRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBlbmNvZGVyLmpzXG5cbmV4cG9ydHMuRW5jb2RlciA9IEVuY29kZXI7XG5cbnZhciBFdmVudExpdGUgPSByZXF1aXJlKFwiZXZlbnQtbGl0ZVwiKTtcbnZhciBFbmNvZGVCdWZmZXIgPSByZXF1aXJlKFwiLi9lbmNvZGUtYnVmZmVyXCIpLkVuY29kZUJ1ZmZlcjtcblxuZnVuY3Rpb24gRW5jb2RlcihvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbmNvZGVyKSkgcmV0dXJuIG5ldyBFbmNvZGVyKG9wdGlvbnMpO1xuICBFbmNvZGVCdWZmZXIuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuRW5jb2Rlci5wcm90b3R5cGUgPSBuZXcgRW5jb2RlQnVmZmVyKCk7XG5cbkV2ZW50TGl0ZS5taXhpbihFbmNvZGVyLnByb3RvdHlwZSk7XG5cbkVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHRoaXMud3JpdGUoY2h1bmspO1xuICB0aGlzLmVtaXQoXCJkYXRhXCIsIHRoaXMucmVhZCgpKTtcbn07XG5cbkVuY29kZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSB0aGlzLmVuY29kZShjaHVuayk7XG4gIHRoaXMuZmx1c2goKTtcbiAgdGhpcy5lbWl0KFwiZW5kXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZW5jb2Rlci5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZGVjb2Rlci5qc1xuXG5leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG52YXIgRXZlbnRMaXRlID0gcmVxdWlyZShcImV2ZW50LWxpdGVcIik7XG52YXIgRGVjb2RlQnVmZmVyID0gcmVxdWlyZShcIi4vZGVjb2RlLWJ1ZmZlclwiKS5EZWNvZGVCdWZmZXI7XG5cbmZ1bmN0aW9uIERlY29kZXIob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVjb2RlcikpIHJldHVybiBuZXcgRGVjb2RlcihvcHRpb25zKTtcbiAgRGVjb2RlQnVmZmVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlID0gbmV3IERlY29kZUJ1ZmZlcigpO1xuXG5FdmVudExpdGUubWl4aW4oRGVjb2Rlci5wcm90b3R5cGUpO1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihjaHVuaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy53cml0ZShjaHVuayk7XG4gIHRoaXMuZmx1c2goKTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihjaHVuaykge1xuICB0aGlzLmVtaXQoXCJkYXRhXCIsIGNodW5rKTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gIHRoaXMuZGVjb2RlKGNodW5rKTtcbiAgdGhpcy5lbWl0KFwiZW5kXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZGVjb2Rlci5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZXh0LmpzXG5cbi8vIGxvYWQgYm90aCBpbnRlcmZhY2VzXG5yZXF1aXJlKFwiLi9yZWFkLWNvcmVcIik7XG5yZXF1aXJlKFwiLi93cml0ZS1jb3JlXCIpO1xuXG5leHBvcnRzLmNyZWF0ZUNvZGVjID0gcmVxdWlyZShcIi4vY29kZWMtYmFzZVwiKS5jcmVhdGVDb2RlYztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjb2RlYy5qc1xuXG4vLyBsb2FkIGJvdGggaW50ZXJmYWNlc1xucmVxdWlyZShcIi4vcmVhZC1jb3JlXCIpO1xucmVxdWlyZShcIi4vd3JpdGUtY29yZVwiKTtcblxuLy8gQHB1YmxpY1xuLy8gbXNncGFjay5jb2RlYy5wcmVzZXRcblxuZXhwb3J0cy5jb2RlYyA9IHtcbiAgcHJlc2V0OiByZXF1aXJlKFwiLi9jb2RlYy1iYXNlXCIpLnByZXNldFxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zZ3BhY2stbGl0ZS9saWIvY29kZWMuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUHJpb3JpdHlTaWduYWxfMSA9IHJlcXVpcmUoXCIuL1ByaW9yaXR5U2lnbmFsXCIpO1xuLyoqXG4gKiBBbGxvd3MgdGhlIHZhbHVlQ2xhc3NlcyB0byBiZSBzZXQgaW4gTVhNTCwgZS5nLlxuICogPHNpZ25hbHM6U2lnbmFsIGlkPVwibmFtZUNoYW5nZWRcIj57W1N0cmluZywgdWludF19PC9zaWduYWxzOlNpZ25hbD5cbiAqL1xuLypbRGVmYXVsdFByb3BlcnR5KFwidmFsdWVDbGFzc2VzXCIpXSovXG4vKipcbiAqIFNpZ25hbCBkaXNwYXRjaGVzIGV2ZW50cyB0byBtdWx0aXBsZSBsaXN0ZW5lcnMuXG4gKiBJdCBpcyBpbnNwaXJlZCBieSBDIyBldmVudHMgYW5kIGRlbGVnYXRlcywgYW5kIGJ5XG4gKiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU2lnbmFsc19hbmRfc2xvdHNcIj5zaWduYWxzIGFuZCBzbG90czwvYT5cbiAqIGluIFF0LlxuICogQSBTaWduYWwgYWRkcyBldmVudCBkaXNwYXRjaGluZyBmdW5jdGlvbmFsaXR5IHRocm91Z2ggY29tcG9zaXRpb24gYW5kIGludGVyZmFjZXMsXG4gKiByYXRoZXIgdGhhbiBpbmhlcml0aW5nIGZyb20gYSBkaXNwYXRjaGVyLlxuICogPGJyLz48YnIvPlxuICogUHJvamVjdCBob21lOiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy9cIj5odHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvPC9hPlxuICovXG52YXIgRGVsdXhlU2lnbmFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRGVsdXhlU2lnbmFsLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBEZWx1eGVTaWduYWwgaW5zdGFuY2UgdG8gZGlzcGF0Y2ggZXZlbnRzIG9uIGJlaGFsZiBvZiBhIHRhcmdldCBvYmplY3QuXG4gICAgICogQHBhcmFtICAgIHRhcmdldCBUaGUgb2JqZWN0IHRoZSBzaWduYWwgaXMgZGlzcGF0Y2hpbmcgZXZlbnRzIG9uIGJlaGFsZiBvZi5cbiAgICAgKiBAcGFyYW0gICAgdmFsdWVDbGFzc2VzIEFueSBudW1iZXIgb2YgY2xhc3MgcmVmZXJlbmNlcyB0aGF0IGVuYWJsZSB0eXBlIGNoZWNrcyBpbiBkaXNwYXRjaCgpLlxuICAgICAqIEZvciBleGFtcGxlLCBuZXcgRGVsdXhlU2lnbmFsKHRoaXMsIFN0cmluZywgdWludClcbiAgICAgKiB3b3VsZCBhbGxvdzogc2lnbmFsLmRpc3BhdGNoKFwidGhlIEFuc3dlclwiLCA0MilcbiAgICAgKiBidXQgbm90OiBzaWduYWwuZGlzcGF0Y2godHJ1ZSwgNDIuNSlcbiAgICAgKiBub3I6IHNpZ25hbC5kaXNwYXRjaCgpXG4gICAgICpcbiAgICAgKiBOT1RFOiBTdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWx1eGVTaWduYWwodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHZvaWQgMCkgeyB0YXJnZXQgPSBudWxsOyB9XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHZhbHVlQ2xhc3NlcyA9ICh2YWx1ZUNsYXNzZXMubGVuZ3RoID09IDEgJiYgdmFsdWVDbGFzc2VzWzBdIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWVDbGFzc2VzWzBdIDogdmFsdWVDbGFzc2VzO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHZhbHVlQ2xhc3NlcykgfHwgdGhpcztcbiAgICAgICAgLy9AQ0hBTkdFRCAtIHRoaXMgd2FzIHRoZSBmaXJzdCBjYWxsIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAvL1R5cGVzY3JpcHQgZG9lcyBub3QgYWxsb3cgXCJ0aGlzXCIgdG8gYmUgY2FsbGVkIGJlZm9yZSBzdXBlclxuICAgICAgICBfdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZWx1eGVTaWduYWwucHJvdG90eXBlLCBcInRhcmdldFwiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5fdGFyZ2V0KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEluY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogVmFsdWUgb2JqZWN0IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwcm9wcmlhdGUgdmFsdWVDbGFzc2VzIENsYXNzLlxuICAgICAqL1xuICAgIC8qb3ZlcnJpZGUqL1xuICAgIERlbHV4ZVNpZ25hbC5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZU9iamVjdHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlT2JqZWN0c1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRlIHZhbHVlIG9iamVjdHMgYWdhaW5zdCBwcmUtZGVmaW5lZCB2YWx1ZSBjbGFzc2VzLlxuICAgICAgICB2YXIgbnVtVmFsdWVDbGFzc2VzID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIGlmIChudW1WYWx1ZU9iamVjdHMgPCBudW1WYWx1ZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgICAgICdFeHBlY3RlZCBhdCBsZWFzdCAnICsgbnVtVmFsdWVDbGFzc2VzICsgJyBidXQgcmVjZWl2ZWQgJyArXG4gICAgICAgICAgICAgICAgbnVtVmFsdWVPYmplY3RzICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5ub3QgZGlzcGF0Y2ggZGlmZmVyZW50bHkgdHlwZWQgb2JqZWN0cyB0aGFuIGRlY2xhcmVkIGNsYXNzZXMuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVmFsdWVDbGFzc2VzOyBpKyspIHtcbiAgICAgICAgICAgIC8vIE9wdGltaXplZCBmb3IgdGhlIG9wdGltaXN0aWMgY2FzZSB0aGF0IHZhbHVlcyBhcmUgY29ycmVjdC5cbiAgICAgICAgICAgIGlmICh2YWx1ZU9iamVjdHNbaV0gPT09IG51bGwgfHwgdmFsdWVPYmplY3RzW2ldLmNvbnN0cnVjdG9yID09PSB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG9iamVjdCA8JyArIHZhbHVlT2JqZWN0c1tpXVxuICAgICAgICAgICAgICAgICsgJz4gaXMgbm90IGFuIGluc3RhbmNlIG9mIDwnICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXh0cmFjdCBhbmQgY2xvbmUgZXZlbnQgb2JqZWN0IGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgdmFyIGV2ZW50ID0gdmFsdWVPYmplY3RzWzBdO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50LmNsb25lKCk7XG4gICAgICAgICAgICAgICAgdmFsdWVPYmplY3RzWzBdID0gZXZlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgICAgIGV2ZW50LnNpZ25hbCA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRvIGxpc3RlbmVycy5cbiAgICAgICAgdmFyIHNsb3RzVG9Qcm9jZXNzID0gdGhpcy5zbG90cztcbiAgICAgICAgd2hpbGUgKHNsb3RzVG9Qcm9jZXNzLm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBzbG90c1RvUHJvY2Vzcy5oZWFkLmV4ZWN1dGUodmFsdWVPYmplY3RzKTtcbiAgICAgICAgICAgIHNsb3RzVG9Qcm9jZXNzID0gc2xvdHNUb1Byb2Nlc3MudGFpbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBCdWJibGUgdGhlIGV2ZW50IGFzIGZhciBhcyBwb3NzaWJsZS5cbiAgICAgICAgaWYgKCFldmVudCB8fCAhZXZlbnQuYnViYmxlcylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGN1cnJlbnRUYXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRUYXJnZXQgJiYgY3VycmVudFRhcmdldC5oYXNPd25Qcm9wZXJ0eShcInBhcmVudFwiKSkge1xuICAgICAgICAgICAgY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXRbXCJwYXJlbnRcIl07XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBpZiAoY3VycmVudFRhcmdldC5vbkV2ZW50QnViYmxlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgLy8gb25FdmVudEJ1YmJsZWQoKSBjYW4gc3RvcCB0aGUgYnViYmxpbmcgYnkgcmV0dXJuaW5nIGZhbHNlLlxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGFyZ2V0Lm9uRXZlbnRCdWJibGVkKGV2ZW50KSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEZWx1eGVTaWduYWw7XG59KFByaW9yaXR5U2lnbmFsXzEuUHJpb3JpdHlTaWduYWwpKTtcbmV4cG9ydHMuRGVsdXhlU2lnbmFsID0gRGVsdXhlU2lnbmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGVsdXhlU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvRGVsdXhlU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqIEBzZWUgb3JnLm9zZmxhc2guc2lnbmFscy5ldmVudHMuSUV2ZW50XG4gKiBEb2N1bWVudGF0aW9uIGZvciB0aGUgZXZlbnQgaW50ZXJmYWNlIGJlaW5nIG1haW50YWluZWQgaW4gSUV2ZW50IHRvIGF2b2lkIGR1cGxpY2F0aW9uIGZvciBub3cuXG4gKi9cbnZhciBHZW5lcmljRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdlbmVyaWNFdmVudChidWJibGVzKSB7XG4gICAgICAgIGlmIChidWJibGVzID09PSB2b2lkIDApIHsgYnViYmxlcyA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMuX2J1YmJsZXMgPSBidWJibGVzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJpY0V2ZW50LnByb3RvdHlwZSwgXCJzaWduYWxcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmFsO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2lnbmFsID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHZW5lcmljRXZlbnQucHJvdG90eXBlLCBcInRhcmdldFwiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwiY3VycmVudFRhcmdldFwiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFRhcmdldCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJpY0V2ZW50LnByb3RvdHlwZSwgXCJidWJibGVzXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9idWJibGVzID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIEdlbmVyaWNFdmVudC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJpY0V2ZW50KHRoaXMuX2J1YmJsZXMpO1xuICAgIH07XG4gICAgcmV0dXJuIEdlbmVyaWNFdmVudDtcbn0oKSk7XG5leHBvcnRzLkdlbmVyaWNFdmVudCA9IEdlbmVyaWNFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdlbmVyaWNFdmVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL2V2ZW50cy9HZW5lcmljRXZlbnQuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKlxuICovXG5leHBvcnRzLklPbmNlU2lnbmFsID0gU3ltYm9sKFwiSU9uY2VTaWduYWxcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JT25jZVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL0lPbmNlU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0cy5JUHJpb3JpdHlTaWduYWwgPSBTeW1ib2woXCJJUHJpb3JpdHlTaWduYWxcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JUHJpb3JpdHlTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JUHJpb3JpdHlTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKlxuICovXG5leHBvcnRzLklTaWduYWwgPSBTeW1ib2woXCJJU2lnbmFsXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL0lTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgSVNsb3QgaW50ZXJmYWNlIGRlZmluZXMgdGhlIGJhc2ljIHByb3BlcnRpZXMgb2YgYVxuICogbGlzdGVuZXIgYXNzb2NpYXRlZCB3aXRoIGEgU2lnbmFsLlxuICpcbiAqIEBhdXRob3IgSm9hIEViZXJ0XG4gKiBAYXV0aG9yIFJvYmVydCBQZW5uZXJcbiAqL1xuZXhwb3J0cy5JU2xvdCA9IFN5bWJvbChcIklTbG90XCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVNsb3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2xvdC5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU2xvdF8xID0gcmVxdWlyZShcIi4vU2xvdFwiKTtcbi8qKlxuICogQWxsb3dzIHRoZSB2YWx1ZUNsYXNzZXMgdG8gYmUgc2V0IGluIE1YTUwsIGUuZy5cbiAqIDxzaWduYWxzOlNpZ25hbCBpZD1cIm5hbWVDaGFuZ2VkXCI+e1tTdHJpbmcsIHVpbnRdfTwvc2lnbmFsczpTaWduYWw+XG4gKi9cbi8qW0RlZmF1bHRQcm9wZXJ0eShcInZhbHVlQ2xhc3Nlc1wiKV0qL1xuLyoqXG4gKiBBIE1vbm9TaWduYWwgY2FuIGhhdmUgb25seSBvbmUgbGlzdGVuZXIuXG4gKi9cbnZhciBNb25vU2lnbmFsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTW9ub1NpZ25hbCBpbnN0YW5jZSB0byBkaXNwYXRjaCB2YWx1ZSBvYmplY3RzLlxuICAgICAqIEBwYXJhbSAgICB2YWx1ZUNsYXNzZXMgQW55IG51bWJlciBvZiBjbGFzcyByZWZlcmVuY2VzIHRoYXQgZW5hYmxlIHR5cGUgY2hlY2tzIGluIGRpc3BhdGNoKCkuXG4gICAgICogRm9yIGV4YW1wbGUsIG5ldyBTaWduYWwoU3RyaW5nLCB1aW50KVxuICAgICAqIHdvdWxkIGFsbG93OiBzaWduYWwuZGlzcGF0Y2goXCJ0aGUgQW5zd2VyXCIsIDQyKVxuICAgICAqIGJ1dCBub3Q6IHNpZ25hbC5kaXNwYXRjaCh0cnVlLCA0Mi41KVxuICAgICAqIG5vcjogc2lnbmFsLmRpc3BhdGNoKClcbiAgICAgKlxuICAgICAqIE5PVEU6IFN1YmNsYXNzZXMgY2Fubm90IGNhbGwgc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSxcbiAgICAgKiBidXQgdGhpcyBjb25zdHJ1Y3RvciBoYXMgbG9naWMgdG8gc3VwcG9ydCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1vbm9TaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbm5vdCB1c2Ugc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSwgc28gYWxsb3cgdGhlIHN1YmNsYXNzIHRvIGNhbGwgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgICAgdGhpcy52YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vbm9TaWduYWwucHJvdG90eXBlLCBcInZhbHVlQ2xhc3Nlc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEludmFsaWQgdmFsdWVDbGFzc2VzIGFyZ3VtZW50OiBpdGVtIGF0IGluZGV4IHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXMgbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgLypbQXJyYXlFbGVtZW50VHlwZShcIkNsYXNzXCIpXSovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlQ2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIC8vIENsb25lIHNvIHRoZSBBcnJheSBjYW5ub3QgYmUgYWZmZWN0ZWQgZnJvbSBvdXRzaWRlLlxuICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzID0gdmFsdWUgPyB2YWx1ZS5zbGljZSgpIDogW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaXRlbSBhdCBpbmRleCAnICsgaSArICcgc2hvdWxkIGJlIGEgQ2xhc3MgYnV0IHdhczo8JyArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gKyAnPi4nICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldKTsgLy9AQ0hBTkdFRCAtIHRlbXAgcmVwbGFjZW1lbnQgZm9yIGdldFF1YWxpZmllZENsYXNzQnlOYW1lKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb25vU2lnbmFsLnByb3RvdHlwZSwgXCJudW1MaXN0ZW5lcnNcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zbG90ID8gMSA6IDA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkIG9yIGFkZE9uY2Ugd2l0aCBhIGxpc3RlbmVyIGFscmVhZHkgYWRkZWQsIHJlbW92ZSB0aGUgY3VycmVudCBsaXN0ZW5lciBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkIG9yIGFkZE9uY2Ugd2l0aCBhIGxpc3RlbmVyIGFscmVhZHkgYWRkZWQsIHJlbW92ZSB0aGUgY3VycmVudCBsaXN0ZW5lciBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLmFkZE9uY2UgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xvdCAmJiB0aGlzLnNsb3QubGlzdGVuZXIgPT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciB0aGVTbG90ID0gdGhpcy5zbG90O1xuICAgICAgICAgICAgdGhpcy5zbG90ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0aGVTbG90O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgTW9ub1NpZ25hbC5wcm90b3R5cGUucmVtb3ZlQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zbG90KVxuICAgICAgICAgICAgdGhpcy5zbG90LnJlbW92ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEluY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogVmFsdWUgb2JqZWN0IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwcm9wcmlhdGUgdmFsdWVDbGFzc2VzIENsYXNzLlxuICAgICAqL1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWVPYmplY3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB2YWx1ZUNsYXNzZXMgaXMgZW1wdHksIHZhbHVlIG9iamVjdHMgYXJlIG5vdCB0eXBlLWNoZWNrZWQuXG4gICAgICAgIHZhciBudW1WYWx1ZUNsYXNzZXMgPSB0aGlzLl92YWx1ZUNsYXNzZXMubGVuZ3RoO1xuICAgICAgICB2YXIgbnVtVmFsdWVPYmplY3RzID0gdmFsdWVPYmplY3RzLmxlbmd0aDtcbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGZld2VyIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBpZiAobnVtVmFsdWVPYmplY3RzIDwgbnVtVmFsdWVDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXQgbGVhc3QgJyArIG51bVZhbHVlQ2xhc3NlcyArICcgYnV0IHJlY2VpdmVkICcgK1xuICAgICAgICAgICAgICAgIG51bVZhbHVlT2JqZWN0cyArICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGRpZmZlcmVudGx5IHR5cGVkIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVZhbHVlQ2xhc3NlczsgaSsrKSB7XG4gICAgICAgICAgICAvLyBPcHRpbWl6ZWQgZm9yIHRoZSBvcHRpbWlzdGljIGNhc2UgdGhhdCB2YWx1ZXMgYXJlIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodmFsdWVPYmplY3RzW2ldID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgKHZhbHVlT2JqZWN0c1tpXSBpbnN0YW5jZW9mIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSB8fCB2YWx1ZU9iamVjdHNbaV0uY29uc3RydWN0b3IgPT09IHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgb2JqZWN0IDwnICsgdmFsdWVPYmplY3RzW2ldXG4gICAgICAgICAgICAgICAgKyAnPiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgPCcgKyB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gKyAnPi4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBCcm9hZGNhc3QgdG8gdGhlIG9uZSBsaXN0ZW5lci5cbiAgICAgICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgICAgICAgdGhpcy5zbG90LmV4ZWN1dGUodmFsdWVPYmplY3RzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9ub1NpZ25hbC5wcm90b3R5cGUucmVnaXN0ZXJMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSkge1xuICAgICAgICBpZiAob25jZSA9PT0gdm9pZCAwKSB7IG9uY2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAodGhpcy5zbG90KSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgZXhpdHMgcHJldmlvdXNseSBhZGRlZCwgZGVmaW5pdGVseSBkb24ndCBhZGQgaXQuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgYWRkIG9yIGFkZE9uY2Ugd2l0aCBhIGxpc3RlbmVyIGFscmVhZHkgYWRkZWQsIHJlbW92ZSB0aGUgY3VycmVudCBsaXN0ZW5lciBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuc2xvdCA9IG5ldyBTbG90XzEuU2xvdChsaXN0ZW5lciwgdGhpcywgb25jZSkpO1xuICAgIH07XG4gICAgcmV0dXJuIE1vbm9TaWduYWw7XG59KCkpO1xuZXhwb3J0cy5Nb25vU2lnbmFsID0gTW9ub1NpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1vbm9TaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Nb25vU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE9uY2VTaWduYWxfMSA9IHJlcXVpcmUoXCIuL09uY2VTaWduYWxcIik7XG52YXIgUHJvbWlzZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByb21pc2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBQcm9taXNlLnByb3RvdHlwZS5hZGRPbmNlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBzbG90ID0gX3N1cGVyLnByb3RvdHlwZS5hZGRPbmNlLmNhbGwodGhpcywgbGlzdGVuZXIpO1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3BhdGNoZWQpIHtcbiAgICAgICAgICAgIHNsb3QuZXhlY3V0ZSh0aGlzLnZhbHVlT2JqZWN0cyk7XG4gICAgICAgICAgICBzbG90LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzbG90O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIGZsYXNoLmVycm9ycy5JbGxlZ2FsT3BlcmF0aW9uRXJyb3IgPGNvZGU+SWxsZWdhbE9wZXJhdGlvbkVycm9yPC9jb2RlPjogWW91IGNhbm5vdCBkaXNwYXRjaCgpIGEgUHJvbWlzZSBtb3JlIHRoYW4gb25jZVxuICAgICAqL1xuICAgIC8qb3ZlcnJpZGUqL1xuICAgIFByb21pc2UucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWVPYmplY3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rpc3BhdGNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgZGlzcGF0Y2goKSBhIFByb21pc2UgbW9yZSB0aGFuIG9uY2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzRGlzcGF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cztcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGlzcGF0Y2guYXBwbHkodGhpcywgdmFsdWVPYmplY3RzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFByb21pc2U7XG59KE9uY2VTaWduYWxfMS5PbmNlU2lnbmFsKSk7XG5leHBvcnRzLlByb21pc2UgPSBQcm9taXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UHJvbWlzZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIENsb2NrID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDbG9jayh1c2VJbnRlcnZhbCkge1xuICAgICAgICBpZiAodXNlSW50ZXJ2YWwgPT09IHZvaWQgMCkgeyB1c2VJbnRlcnZhbCA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdyA9ICh0eXBlb2YgKHdpbmRvdykgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgJiYgKHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpLmJpbmQod2luZG93LnBlcmZvcm1hbmNlKSkgfHwgRGF0ZS5ub3c7XG4gICAgICAgIHRoaXMuc3RhcnQodXNlSW50ZXJ2YWwpO1xuICAgIH1cbiAgICBDbG9jay5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAodXNlSW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHVzZUludGVydmFsID09PSB2b2lkIDApIHsgdXNlSW50ZXJ2YWwgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLm5vdygpO1xuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHVzZUludGVydmFsKSB7XG4gICAgICAgICAgICAvLyBhdXRvIHNldCBpbnRlcnZhbCB0byA2MCB0aWNrcyBwZXIgc2Vjb25kXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMDAwIC8gNjApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDbG9jay5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENsb2NrLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24gKG5ld1RpbWUpIHtcbiAgICAgICAgaWYgKG5ld1RpbWUgPT09IHZvaWQgMCkgeyBuZXdUaW1lID0gdGhpcy5ub3coKTsgfVxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IG5ld1RpbWUgLSB0aGlzLmN1cnJlbnRUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gbmV3VGltZTtcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSArPSB0aGlzLmRlbHRhVGltZTtcbiAgICB9O1xuICAgIHJldHVybiBDbG9jaztcbn0oKSk7XG5tb2R1bGUuZXhwb3J0cyA9IENsb2NrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGdhbWVzdGRpby9jbG9jay9kaXN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBEZWx0YUNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vRGVsdGFDb250YWluZXJcIik7XG5leHBvcnRzLkRlbHRhQ29udGFpbmVyID0gRGVsdGFDb250YWluZXJfMS5EZWx0YUNvbnRhaW5lcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RlbHRhLWxpc3RlbmVyL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tcGFyZV8xID0gcmVxdWlyZShcIi4vY29tcGFyZVwiKTtcbnZhciBEZWx0YUNvbnRhaW5lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWx0YUNvbnRhaW5lcihkYXRhKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMubWF0Y2hlclBsYWNlaG9sZGVycyA9IHtcbiAgICAgICAgICAgIFwiOmlkXCI6IC9eKFthLXpBLVowLTlcXC1fXSspJC8sXG4gICAgICAgICAgICBcIjpudW1iZXJcIjogL14oWzAtOV0rKSQvLFxuICAgICAgICAgICAgXCI6c3RyaW5nXCI6IC9eKFxcdyspJC8sXG4gICAgICAgICAgICBcIjpheGlzXCI6IC9eKFt4eXpdKSQvLFxuICAgICAgICAgICAgXCI6KlwiOiAvKC4qKS8sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChuZXdEYXRhKSB7XG4gICAgICAgIHZhciBwYXRjaGVzID0gY29tcGFyZV8xLmNvbXBhcmUodGhpcy5kYXRhLCBuZXdEYXRhKTtcbiAgICAgICAgdGhpcy5jaGVja1BhdGNoZXMocGF0Y2hlcyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ld0RhdGE7XG4gICAgICAgIHJldHVybiBwYXRjaGVzO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLnJlZ2lzdGVyUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAocGxhY2Vob2xkZXIsIG1hdGNoZXIpIHtcbiAgICAgICAgdGhpcy5tYXRjaGVyUGxhY2Vob2xkZXJzW3BsYWNlaG9sZGVyXSA9IG1hdGNoZXI7XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gKHNlZ21lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcnVsZXM7XG4gICAgICAgIGlmICh0eXBlb2YgKHNlZ21lbnRzKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBydWxlcyA9IFtdO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWdtZW50cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJ1bGVzID0gc2VnbWVudHMuc3BsaXQoXCIvXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgIHJhd1J1bGVzOiBydWxlcyxcbiAgICAgICAgICAgIHJ1bGVzOiBydWxlcy5tYXAoZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzZWdtZW50KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHBsYWNlaG9sZGVyIG1hdGNoZXJzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoc2VnbWVudC5pbmRleE9mKFwiOlwiKSA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3RoaXMubWF0Y2hlclBsYWNlaG9sZGVyc1tzZWdtZW50XSB8fCBfdGhpcy5tYXRjaGVyUGxhY2Vob2xkZXJzW1wiOipcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IFJlZ0V4cChcIl5cIiArIHNlZ21lbnQgKyBcIiRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VnbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICBpZiAocnVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLmNoZWNrUGF0Y2hlcyA9IGZ1bmN0aW9uIChwYXRjaGVzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBwYXRjaGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbal07XG4gICAgICAgICAgICAgICAgdmFyIHBhdGhWYXJpYWJsZXMgPSB0aGlzLmdldFBhdGhWYXJpYWJsZXMocGF0Y2hlc1tpXSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGlmIChwYXRoVmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGhWYXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdQYXRoOiBwYXRjaGVzW2ldLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246IHBhdGNoZXNbaV0ub3BlcmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhdGNoZXNbaV0udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBmYWxsYmFjayBsaXN0ZW5lclxuICAgICAgICAgICAgaWYgKCFtYXRjaGVkICYmIHRoaXMuZGVmYXVsdExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0TGlzdGVuZXIuY2FsbGJhY2socGF0Y2hlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5nZXRQYXRoVmFyaWFibGVzID0gZnVuY3Rpb24gKHBhdGNoLCBsaXN0ZW5lcikge1xuICAgICAgICAvLyBza2lwIGlmIHJ1bGVzIGNvdW50IGRpZmZlciBmcm9tIHBhdGNoXG4gICAgICAgIGlmIChwYXRjaC5wYXRoLmxlbmd0aCAhPT0gbGlzdGVuZXIucnVsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhdGggPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3RlbmVyLnJ1bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHBhdGNoLnBhdGhbaV0ubWF0Y2gobGlzdGVuZXIucnVsZXNbaV0pO1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVzIHx8IG1hdGNoZXMubGVuZ3RoID09PSAwIHx8IG1hdGNoZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxpc3RlbmVyLnJhd1J1bGVzW2ldLnN1YnN0cigwLCAxKSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICBwYXRoW2xpc3RlbmVyLnJhd1J1bGVzW2ldLnN1YnN0cigxKV0gPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH07XG4gICAgcmV0dXJuIERlbHRhQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydHMuRGVsdGFDb250YWluZXIgPSBEZWx0YUNvbnRhaW5lcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RlbHRhLWxpc3RlbmVyL2xpYi9EZWx0YUNvbnRhaW5lci5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjb21wYXJlKHRyZWUxLCB0cmVlMikge1xuICAgIHZhciBwYXRjaGVzID0gW107XG4gICAgZ2VuZXJhdGUodHJlZTEsIHRyZWUyLCBwYXRjaGVzLCBbXSk7XG4gICAgcmV0dXJuIHBhdGNoZXM7XG59XG5leHBvcnRzLmNvbXBhcmUgPSBjb21wYXJlO1xuZnVuY3Rpb24gY29uY2F0KGFyciwgdmFsdWUpIHtcbiAgICB2YXIgbmV3QXJyID0gYXJyLnNsaWNlKCk7XG4gICAgbmV3QXJyLnB1c2godmFsdWUpO1xuICAgIHJldHVybiBuZXdBcnI7XG59XG5mdW5jdGlvbiBvYmplY3RLZXlzKG9iaikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgdmFyIGtleXNfMSA9IG5ldyBBcnJheShvYmoubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBrZXlzXzEubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGtleXNfMVtrXSA9IFwiXCIgKyBrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzXzE7XG4gICAgfVxuICAgIGlmIChPYmplY3Qua2V5cykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59XG47XG4vLyBEaXJ0eSBjaGVjayBpZiBvYmogaXMgZGlmZmVyZW50IGZyb20gbWlycm9yLCBnZW5lcmF0ZSBwYXRjaGVzIGFuZCB1cGRhdGUgbWlycm9yXG5mdW5jdGlvbiBnZW5lcmF0ZShtaXJyb3IsIG9iaiwgcGF0Y2hlcywgcGF0aCkge1xuICAgIHZhciBuZXdLZXlzID0gb2JqZWN0S2V5cyhvYmopO1xuICAgIHZhciBvbGRLZXlzID0gb2JqZWN0S2V5cyhtaXJyb3IpO1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIGRlbGV0ZWQgPSBmYWxzZTtcbiAgICBmb3IgKHZhciB0ID0gb2xkS2V5cy5sZW5ndGggLSAxOyB0ID49IDA7IHQtLSkge1xuICAgICAgICB2YXIga2V5ID0gb2xkS2V5c1t0XTtcbiAgICAgICAgdmFyIG9sZFZhbCA9IG1pcnJvcltrZXldO1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgIShvYmpba2V5XSA9PT0gdW5kZWZpbmVkICYmIG9sZFZhbCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkob2JqKSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbCA9PSBcIm9iamVjdFwiICYmIG9sZFZhbCAhPSBudWxsICYmIHR5cGVvZiBuZXdWYWwgPT0gXCJvYmplY3RcIiAmJiBuZXdWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlKG9sZFZhbCwgbmV3VmFsLCBwYXRjaGVzLCBjb25jYXQocGF0aCwga2V5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkVmFsICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wZXJhdGlvbjogXCJyZXBsYWNlXCIsIHBhdGg6IGNvbmNhdChwYXRoLCBrZXkpLCB2YWx1ZTogbmV3VmFsIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wZXJhdGlvbjogXCJyZW1vdmVcIiwgcGF0aDogY29uY2F0KHBhdGgsIGtleSkgfSk7XG4gICAgICAgICAgICBkZWxldGVkID0gdHJ1ZTsgLy8gcHJvcGVydHkgaGFzIGJlZW4gZGVsZXRlZFxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZGVsZXRlZCAmJiBuZXdLZXlzLmxlbmd0aCA9PSBvbGRLZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgbmV3S2V5cy5sZW5ndGg7IHQrKykge1xuICAgICAgICB2YXIga2V5ID0gbmV3S2V5c1t0XTtcbiAgICAgICAgaWYgKCFtaXJyb3IuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBvYmpba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICB2YXIgYWRkUGF0aCA9IGNvbmNhdChwYXRoLCBrZXkpO1xuICAgICAgICAgICAgLy8gY29tcGFyZSBkZWVwZXIgYWRkaXRpb25zXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbCA9PSBcIm9iamVjdFwiICYmIG5ld1ZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGUoe30sIG5ld1ZhbCwgcGF0Y2hlcywgYWRkUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRjaGVzLnB1c2goeyBvcGVyYXRpb246IFwiYWRkXCIsIHBhdGg6IGFkZFBhdGgsIHZhbHVlOiBuZXdWYWwgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvY29tcGFyZS5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gRm9zc2lsIFNDTSBkZWx0YSBjb21wcmVzc2lvbiBhbGdvcml0aG1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gRm9ybWF0OlxuLy8gaHR0cDovL3d3dy5mb3NzaWwtc2NtLm9yZy9pbmRleC5odG1sL2RvYy90aXAvd3d3L2RlbHRhX2Zvcm1hdC53aWtpXG4vL1xuLy8gQWxnb3JpdGhtOlxuLy8gaHR0cDovL3d3dy5mb3NzaWwtc2NtLm9yZy9pbmRleC5odG1sL2RvYy90aXAvd3d3L2RlbHRhX2VuY29kZXJfYWxnb3JpdGhtLndpa2lcbi8vXG4vLyBPcmlnaW5hbCBpbXBsZW1lbnRhdGlvbjpcbi8vIGh0dHA6Ly93d3cuZm9zc2lsLXNjbS5vcmcvaW5kZXguaHRtbC9hcnRpZmFjdC9kMWIwNTk4YWRjZDY1MGIzNTUxZjYzYjE3ZGZjODY0ZTczNzc1YzNkXG4vL1xuLy8gTElDRU5TRVxuLy8gLS0tLS0tLVxuLy9cbi8vIENvcHlyaWdodCAyMDE0IERtaXRyeSBDaGVzdG55a2ggKEphdmFTY3JpcHQgcG9ydClcbi8vIENvcHlyaWdodCAyMDA3IEQuIFJpY2hhcmQgSGlwcCAgKG9yaWdpbmFsIEMgdmVyc2lvbilcbi8vIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vL1xuLy8gUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvclxuLy8gd2l0aG91dCBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4vL1xuLy8gICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlXG4vLyAgICAgIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGVcbi8vICAgICAgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4vL1xuLy8gICAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlXG4vLyAgICAgIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGVcbi8vICAgICAgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyXG4vLyAgICAgIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4vL1xuLy8gVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQVVUSE9SUyBgYEFTIElTJycgQU5EIEFOWSBFWFBSRVNTXG4vLyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuLy8gV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4vLyBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09OVFJJQlVUT1JTIEJFXG4vLyBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4vLyBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuLy8gU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SXG4vLyBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbi8vIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFXG4vLyBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLFxuLy8gRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbi8vXG4vLyBUaGUgdmlld3MgYW5kIGNvbmNsdXNpb25zIGNvbnRhaW5lZCBpbiB0aGUgc29mdHdhcmUgYW5kIGRvY3VtZW50YXRpb25cbi8vIGFyZSB0aG9zZSBvZiB0aGUgYXV0aG9ycyBhbmQgY29udHJpYnV0b3JzIGFuZCBzaG91bGQgbm90IGJlIGludGVycHJldGVkXG4vLyBhcyByZXByZXNlbnRpbmcgb2ZmaWNpYWwgcG9saWNpZXMsIGVpdGhlciBleHByZXNzZWQgb3IgaW1wbGllZCwgb2YgYW55Ym9keVxuLy8gZWxzZS5cbi8vXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICBlbHNlIHJvb3QuZm9zc2lsRGVsdGEgPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIGZvc3NpbERlbHRhID0ge307XG5cbi8vIEhhc2ggd2luZG93IHdpZHRoIGluIGJ5dGVzLiBNdXN0IGJlIGEgcG93ZXIgb2YgdHdvLlxudmFyIE5IQVNIID0gMTY7XG5cbmZ1bmN0aW9uIFJvbGxpbmdIYXNoKCkge1xuICB0aGlzLmEgPSAwOyAvLyBoYXNoICAgICAoMTYtYml0IHVuc2lnbmVkKVxuICB0aGlzLmIgPSAwOyAvLyB2YWx1ZXMgICAoMTYtYml0IHVuc2lnbmVkKVxuICB0aGlzLmkgPSAwOyAvLyBzdGFydCBvZiB0aGUgaGFzaCB3aW5kb3cgKDE2LWJpdCB1bnNpZ25lZClcbiAgdGhpcy56ID0gbmV3IEFycmF5KE5IQVNIKTsgLy8gdGhlIHZhbHVlcyB0aGF0IGhhdmUgYmVlbiBoYXNoZWQuXG59XG5cbi8vIEluaXRpYWxpemUgdGhlIHJvbGxpbmcgaGFzaCB1c2luZyB0aGUgZmlyc3QgTkhBU0ggYnl0ZXMgb2Zcbi8vIHogYXQgdGhlIGdpdmVuIHBvc2l0aW9uLlxuUm9sbGluZ0hhc2gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbih6LCBwb3MpIHtcbiAgdmFyIGEgPSAwLCBiID0gMCwgaSwgeDtcbiAgZm9yKGkgPSAwOyBpIDwgTkhBU0g7IGkrKyl7XG4gICAgeCA9IHpbcG9zK2ldO1xuICAgIGEgPSAoYSArIHgpICYgMHhmZmZmO1xuICAgIGIgPSAoYiArIChOSEFTSC1pKSp4KSAmIDB4ZmZmZjtcbiAgICB0aGlzLnpbaV0gPSB4O1xuICB9XG4gIHRoaXMuYSA9IGEgJiAweGZmZmY7XG4gIHRoaXMuYiA9IGIgJiAweGZmZmY7XG4gIHRoaXMuaSA9IDA7XG59O1xuXG4vLyBBZHZhbmNlIHRoZSByb2xsaW5nIGhhc2ggYnkgYSBzaW5nbGUgYnl0ZSBcImNcIi5cblJvbGxpbmdIYXNoLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oYykge1xuICB2YXIgb2xkID0gdGhpcy56W3RoaXMuaV07XG4gIHRoaXMuelt0aGlzLmldID0gYztcbiAgdGhpcy5pID0gKHRoaXMuaSsxKSYoTkhBU0gtMSk7XG4gIHRoaXMuYSA9ICh0aGlzLmEgLSBvbGQgKyBjKSAmIDB4ZmZmZjtcbiAgdGhpcy5iID0gKHRoaXMuYiAtIE5IQVNIKm9sZCArIHRoaXMuYSkgJiAweGZmZmY7XG59O1xuXG4vLyBSZXR1cm4gYSAzMi1iaXQgaGFzaCB2YWx1ZS5cblJvbGxpbmdIYXNoLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKCh0aGlzLmEgJiAweGZmZmYpIHwgKHRoaXMuYiAmIDB4ZmZmZik8PDE2KT4+PjA7XG59O1xuXG52YXIgekRpZ2l0cyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaX2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6flwiLlxuICAgICAgICAgICAgICAgIHNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguY2hhckNvZGVBdCgwKTsgfSk7XG5cbnZhciB6VmFsdWUgPSBbXG4gIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsXG4gIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsXG4gIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsXG4gICAwLCAgMSwgIDIsICAzLCAgNCwgIDUsICA2LCAgNywgICAgOCwgIDksIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsXG4gIC0xLCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgICAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsXG4gIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgICAzMywgMzQsIDM1LCAtMSwgLTEsIC0xLCAtMSwgMzYsXG4gIC0xLCAzNywgMzgsIDM5LCA0MCwgNDEsIDQyLCA0MywgICA0NCwgNDUsIDQ2LCA0NywgNDgsIDQ5LCA1MCwgNTEsXG4gIDUyLCA1MywgNTQsIDU1LCA1NiwgNTcsIDU4LCA1OSwgICA2MCwgNjEsIDYyLCAtMSwgLTEsIC0xLCA2MywgLTFcbl07XG5cbi8vIFJlYWRlciByZWFkcyBieXRlcywgY2hhcnMsIGludHMgZnJvbSBhcnJheS5cbmZ1bmN0aW9uIFJlYWRlcihhcnJheSkge1xuICB0aGlzLmEgPSBhcnJheTsgLy8gc291cmNlIGFycmF5XG4gIHRoaXMucG9zID0gMDsgICAvLyBjdXJyZW50IHBvc2l0aW9uIGluIGFycmF5XG59XG5cblJlYWRlci5wcm90b3R5cGUuaGF2ZUJ5dGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnBvcyA8IHRoaXMuYS5sZW5ndGg7XG59O1xuXG5SZWFkZXIucHJvdG90eXBlLmdldEJ5dGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGIgPSB0aGlzLmFbdGhpcy5wb3NdO1xuICB0aGlzLnBvcysrO1xuICBpZiAodGhpcy5wb3MgPiB0aGlzLmEubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIGJvdW5kcycpO1xuICByZXR1cm4gYjtcbn07XG5cblJlYWRlci5wcm90b3R5cGUuZ2V0Q2hhciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmdldEJ5dGUoKSk7XG59O1xuXG4vLyBSZWFkIGJhc2U2NC1lbmNvZGVkIHVuc2lnbmVkIGludGVnZXIuXG5SZWFkZXIucHJvdG90eXBlLmdldEludCA9IGZ1bmN0aW9uKCl7XG4gIHZhciB2ID0gMCwgYztcbiAgd2hpbGUodGhpcy5oYXZlQnl0ZXMoKSAmJiAoYyA9IHpWYWx1ZVsweDdmICYgdGhpcy5nZXRCeXRlKCldKSA+PSAwKSB7XG4gICAgIHYgPSAodjw8NikgKyBjO1xuICB9XG4gIHRoaXMucG9zLS07XG4gIHJldHVybiB2ID4+PiAwO1xufTtcblxuXG4vLyBXcml0ZSB3cml0ZXMgYW4gYXJyYXkuXG5mdW5jdGlvbiBXcml0ZXIoKSB7XG4gIHRoaXMuYSA9IFtdO1xufVxuXG5Xcml0ZXIucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuYTtcbn07XG5cbldyaXRlci5wcm90b3R5cGUucHV0Qnl0ZSA9IGZ1bmN0aW9uKGIpIHtcbiAgdGhpcy5hLnB1c2goYiAmIDB4ZmYpO1xufTtcblxuLy8gV3JpdGUgYW4gQVNDSUkgY2hhcmFjdGVyIChzIGlzIGEgb25lLWNoYXIgc3RyaW5nKS5cbldyaXRlci5wcm90b3R5cGUucHV0Q2hhciA9IGZ1bmN0aW9uKHMpIHtcbiAgdGhpcy5wdXRCeXRlKHMuY2hhckNvZGVBdCgwKSk7XG59O1xuXG4vLyBXcml0ZSBhIGJhc2U2NCB1bnNpZ25lZCBpbnRlZ2VyLlxuV3JpdGVyLnByb3RvdHlwZS5wdXRJbnQgPSBmdW5jdGlvbih2KXtcbiAgdmFyIGksIGosIHpCdWYgPSBbXTtcbiAgaWYgKHYgPT09IDApIHtcbiAgICB0aGlzLnB1dENoYXIoJzAnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yIChpID0gMDsgdiA+IDA7IGkrKywgdiA+Pj49IDYpXG4gICAgekJ1Zi5wdXNoKHpEaWdpdHNbdiYweDNmXSk7XG4gIGZvciAoaiA9IGktMTsgaiA+PSAwOyBqLS0pXG4gICAgdGhpcy5wdXRCeXRlKHpCdWZbal0pO1xufTtcblxuLy8gQ29weSBmcm9tIGFycmF5IGF0IHN0YXJ0IHRvIGVuZC5cbldyaXRlci5wcm90b3R5cGUucHV0QXJyYXkgPSBmdW5jdGlvbihhLCBzdGFydCwgZW5kKSB7XG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB0aGlzLmEucHVzaChhW2ldKTtcbn07XG5cbi8vIFJldHVybiB0aGUgbnVtYmVyIGRpZ2l0cyBpbiB0aGUgYmFzZTY0IHJlcHJlc2VudGF0aW9uIG9mIGEgcG9zaXRpdmUgaW50ZWdlci5cbmZ1bmN0aW9uIGRpZ2l0Q291bnQodil7XG4gIHZhciBpLCB4O1xuICBmb3IgKGkgPSAxLCB4ID0gNjQ7IHYgPj0geDsgaSsrLCB4IDw8PSA2KXsgLyogbm90aGluZyAqLyB9XG4gIHJldHVybiBpO1xufVxuXG4vLyBSZXR1cm4gYSAzMi1iaXQgY2hlY2tzdW0gb2YgdGhlIGFycmF5LlxuZnVuY3Rpb24gY2hlY2tzdW0oYXJyKSB7XG4gIHZhciBzdW0wID0gMCwgc3VtMSA9IDAsIHN1bTIgPSAwLCBzdW0zID0gMCxcbiAgICAgIHogPSAwLCBOID0gYXJyLmxlbmd0aDtcbiAgLy9UT0RPIG1lYXN1cmUgaWYgdGhpcyB1bnJvbGxpbmcgaXMgaGVscGZ1bC5cbiAgd2hpbGUgKE4gPj0gMTYpIHtcbiAgICBzdW0wID0gc3VtMCArIGFyclt6KzBdIHwgMDtcbiAgICBzdW0xID0gc3VtMSArIGFyclt6KzFdIHwgMDtcbiAgICBzdW0yID0gc3VtMiArIGFyclt6KzJdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzNdIHwgMDtcblxuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orNF0gfCAwO1xuICAgIHN1bTEgPSBzdW0xICsgYXJyW3orNV0gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orNl0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orN10gfCAwO1xuXG4gICAgc3VtMCA9IHN1bTAgKyBhcnJbeis4XSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeis5XSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisxMF0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orMTFdIHwgMDtcblxuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orMTJdIHwgMDtcbiAgICBzdW0xID0gc3VtMSArIGFyclt6KzEzXSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisxNF0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orMTVdIHwgMDtcblxuICAgIHogKz0gMTY7XG4gICAgTiAtPSAxNjtcbiAgfVxuICB3aGlsZSAoTiA+PSA0KSB7XG4gICAgc3VtMCA9IHN1bTAgKyBhcnJbeiswXSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeisxXSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisyXSB8IDA7XG4gICAgc3VtMyA9IHN1bTMgKyBhcnJbeiszXSB8IDA7XG4gICAgeiArPSA0O1xuICAgIE4gLT0gNDtcbiAgfVxuICBzdW0zID0gKCgoc3VtMyArIChzdW0yIDw8IDgpIHwgMCkgKyAoc3VtMSA8PCAxNikgfCAwKSArIChzdW0wIDw8IDI0KSB8IDApO1xuICAvKiBqc2hpbnQgLVcwODYgKi9cbiAgc3dpdGNoIChOKSB7XG4gICAgY2FzZSAzOiBzdW0zID0gc3VtMyArIChhcnJbeisyXSA8PCAgOCkgfCAwOyAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgY2FzZSAyOiBzdW0zID0gc3VtMyArIChhcnJbeisxXSA8PCAxNikgfCAwOyAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgY2FzZSAxOiBzdW0zID0gc3VtMyArIChhcnJbeiswXSA8PCAyNCkgfCAwOyAvKiBmYWxscyB0aHJvdWdoICovXG4gIH1cbiAgcmV0dXJuIHN1bTMgPj4+IDA7XG59XG5cbi8vIENyZWF0ZSBhIG5ldyBkZWx0YSBmcm9tIHNyYyB0byBvdXQuXG5mb3NzaWxEZWx0YS5jcmVhdGUgPSBmdW5jdGlvbihzcmMsIG91dCkge1xuICB2YXIgekRlbHRhID0gbmV3IFdyaXRlcigpO1xuICB2YXIgbGVuT3V0ID0gb3V0Lmxlbmd0aDtcbiAgdmFyIGxlblNyYyA9IHNyYy5sZW5ndGg7XG4gIHZhciBpLCBsYXN0UmVhZCA9IC0xO1xuXG4gIHpEZWx0YS5wdXRJbnQobGVuT3V0KTtcbiAgekRlbHRhLnB1dENoYXIoJ1xcbicpO1xuXG4gIC8vIElmIHRoZSBzb3VyY2UgaXMgdmVyeSBzbWFsbCwgaXQgbWVhbnMgdGhhdCB3ZSBoYXZlIG5vXG4gIC8vIGNoYW5jZSBvZiBldmVyIGRvaW5nIGEgY29weSBjb21tYW5kLiAgSnVzdCBvdXRwdXQgYSBzaW5nbGVcbiAgLy8gbGl0ZXJhbCBzZWdtZW50IGZvciB0aGUgZW50aXJlIHRhcmdldCBhbmQgZXhpdC5cbiAgaWYgKGxlblNyYyA8PSBOSEFTSCkge1xuICAgIHpEZWx0YS5wdXRJbnQobGVuT3V0KTtcbiAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgIHpEZWx0YS5wdXRBcnJheShvdXQsIDAsIGxlbk91dCk7XG4gICAgekRlbHRhLnB1dEludChjaGVja3N1bShvdXQpKTtcbiAgICB6RGVsdGEucHV0Q2hhcignOycpO1xuICAgIHJldHVybiB6RGVsdGEudG9BcnJheSgpO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUgaGFzaCB0YWJsZSB1c2VkIHRvIGxvY2F0ZSBtYXRjaGluZyBzZWN0aW9ucyBpbiB0aGUgc291cmNlLlxuICB2YXIgbkhhc2ggPSBNYXRoLmNlaWwobGVuU3JjIC8gTkhBU0gpO1xuICB2YXIgY29sbGlkZSA9ICBuZXcgQXJyYXkobkhhc2gpO1xuICB2YXIgbGFuZG1hcmsgPSBuZXcgQXJyYXkobkhhc2gpO1xuICBmb3IgKGkgPSAwOyBpIDwgY29sbGlkZS5sZW5ndGg7IGkrKykgY29sbGlkZVtpXSA9IC0xO1xuICBmb3IgKGkgPSAwOyBpIDwgbGFuZG1hcmsubGVuZ3RoOyBpKyspIGxhbmRtYXJrW2ldID0gLTE7XG4gIHZhciBodiwgaCA9IG5ldyBSb2xsaW5nSGFzaCgpO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuU3JjLU5IQVNIOyBpICs9IE5IQVNIKSB7XG4gICAgaC5pbml0KHNyYywgaSk7XG4gICAgaHYgPSBoLnZhbHVlKCkgJSBuSGFzaDtcbiAgICBjb2xsaWRlW2kvTkhBU0hdID0gbGFuZG1hcmtbaHZdO1xuICAgIGxhbmRtYXJrW2h2XSA9IGkvTkhBU0g7XG4gIH1cblxuICB2YXIgYmFzZSA9IDA7XG4gIHZhciBpU3JjLCBpQmxvY2ssIGJlc3RDbnQsIGJlc3RPZnN0LCBiZXN0TGl0c3o7XG4gIHdoaWxlIChiYXNlK05IQVNIPGxlbk91dCkge1xuICAgIGJlc3RPZnN0PTA7XG4gICAgYmVzdExpdHN6PTA7XG4gICAgaC5pbml0KG91dCwgYmFzZSk7XG4gICAgaSA9IDA7IC8vIFRyeWluZyB0byBtYXRjaCBhIGxhbmRtYXJrIGFnYWluc3Qgek91dFtiYXNlK2ldXG4gICAgYmVzdENudCA9IDA7XG4gICAgd2hpbGUoMSkge1xuICAgICAgdmFyIGxpbWl0ID0gMjUwO1xuICAgICAgaHYgPSBoLnZhbHVlKCkgJSBuSGFzaDtcbiAgICAgIGlCbG9jayA9IGxhbmRtYXJrW2h2XTtcbiAgICAgIHdoaWxlIChpQmxvY2sgPj0gMCAmJiAobGltaXQtLSk+MCApIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIGhhc2ggd2luZG93IGhhcyBpZGVudGlmaWVkIGEgcG90ZW50aWFsIG1hdGNoIGFnYWluc3RcbiAgICAgICAgLy8gbGFuZG1hcmsgYmxvY2sgaUJsb2NrLiAgQnV0IHdlIG5lZWQgdG8gaW52ZXN0aWdhdGUgZnVydGhlci5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gTG9vayBmb3IgYSByZWdpb24gaW4gek91dCB0aGF0IG1hdGNoZXMgelNyYy4gQW5jaG9yIHRoZSBzZWFyY2hcbiAgICAgICAgLy8gYXQgelNyY1tpU3JjXSBhbmQgek91dFtiYXNlK2ldLiAgRG8gbm90IGluY2x1ZGUgYW55dGhpbmcgcHJpb3IgdG9cbiAgICAgICAgLy8gek91dFtiYXNlXSBvciBhZnRlciB6T3V0W291dExlbl0gbm9yIGFueXRoaW5nIGFmdGVyIHpTcmNbc3JjTGVuXS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNudCBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBtYXRjaCBhbmQgc2V0IG9mc3Qgc28gdGhhdFxuICAgICAgICAvLyB6U3JjW29mc3RdIGlzIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBtYXRjaC4gIGxpdHN6IGlzIHRoZSBudW1iZXJcbiAgICAgICAgLy8gb2YgY2hhcmFjdGVycyBiZXR3ZWVuIHpPdXRbYmFzZV0gYW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG1hdGNoLlxuICAgICAgICAvLyBzeiB3aWxsIGJlIHRoZSBvdmVyaGVhZCAoaW4gYnl0ZXMpIG5lZWRlZCB0byBlbmNvZGUgdGhlIGNvcHlcbiAgICAgICAgLy8gY29tbWFuZC4gIE9ubHkgZ2VuZXJhdGUgY29weSBjb21tYW5kIGlmIHRoZSBvdmVyaGVhZCBvZiB0aGVcbiAgICAgICAgLy8gY29weSBjb21tYW5kIGlzIGxlc3MgdGhhbiB0aGUgYW1vdW50IG9mIGxpdGVyYWwgdGV4dCB0byBiZSBjb3BpZWQuXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBjbnQsIG9mc3QsIGxpdHN6O1xuICAgICAgICB2YXIgaiwgaywgeCwgeTtcbiAgICAgICAgdmFyIHN6O1xuXG4gICAgICAgIC8vIEJlZ2lubmluZyBhdCBpU3JjLCBtYXRjaCBmb3J3YXJkcyBhcyBmYXIgYXMgd2UgY2FuLlxuICAgICAgICAvLyBqIGNvdW50cyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBtYXRjaC5cbiAgICAgICAgaVNyYyA9IGlCbG9jaypOSEFTSDtcbiAgICAgICAgZm9yIChqID0gMCwgeCA9IGlTcmMsIHkgPSBiYXNlK2k7IHggPCBsZW5TcmMgJiYgeSA8IGxlbk91dDsgaisrLCB4KyssIHkrKykge1xuICAgICAgICAgIGlmIChzcmNbeF0gIT09IG91dFt5XSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgai0tO1xuXG4gICAgICAgIC8vIEJlZ2lubmluZyBhdCBpU3JjLTEsIG1hdGNoIGJhY2t3YXJkcyBhcyBmYXIgYXMgd2UgY2FuLlxuICAgICAgICAvLyBrIGNvdW50cyB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBtYXRjaC5cbiAgICAgICAgZm9yIChrID0gMTsgayA8IGlTcmMgJiYgayA8PSBpOyBrKyspIHtcbiAgICAgICAgICBpZiAoc3JjW2lTcmMta10gIT09IG91dFtiYXNlK2kta10pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGstLTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBvZmZzZXQgYW5kIHNpemUgb2YgdGhlIG1hdGNoaW5nIHJlZ2lvbi5cbiAgICAgICAgb2ZzdCA9IGlTcmMtaztcbiAgICAgICAgY250ID0gaitrKzE7XG4gICAgICAgIGxpdHN6ID0gaS1rOyAgLy8gTnVtYmVyIG9mIGJ5dGVzIG9mIGxpdGVyYWwgdGV4dCBiZWZvcmUgdGhlIGNvcHlcbiAgICAgICAgLy8gc3ogd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIGVuY29kZSB0aGUgXCJpbnNlcnRcIlxuICAgICAgICAvLyBjb21tYW5kIGFuZCB0aGUgY29weSBjb21tYW5kLCBub3QgY291bnRpbmcgdGhlIFwiaW5zZXJ0XCIgdGV4dC5cbiAgICAgICAgc3ogPSBkaWdpdENvdW50KGktaykrZGlnaXRDb3VudChjbnQpK2RpZ2l0Q291bnQob2ZzdCkrMztcbiAgICAgICAgaWYgKGNudCA+PSBzeiAmJiBjbnQgPiBiZXN0Q250KSB7XG4gICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBtYXRjaCBvbmx5IGlmIGl0IGlzIHRoZSBiZXN0IHNvIGZhciBhbmQgaXRcbiAgICAgICAgICAvLyBkb2VzIG5vdCBpbmNyZWFzZSB0aGUgZmlsZSBzaXplLlxuICAgICAgICAgIGJlc3RDbnQgPSBjbnQ7XG4gICAgICAgICAgYmVzdE9mc3QgPSBpU3JjLWs7XG4gICAgICAgICAgYmVzdExpdHN6ID0gbGl0c3o7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0aGUgbmV4dCBtYXRjaGluZyBibG9ja1xuICAgICAgICBpQmxvY2sgPSBjb2xsaWRlW2lCbG9ja107XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGhhdmUgYSBjb3B5IGNvbW1hbmQgdGhhdCBkb2VzIG5vdCBjYXVzZSB0aGUgZGVsdGEgdG8gYmUgbGFyZ2VyXG4gICAgICAvLyB0aGFuIGEgbGl0ZXJhbCBpbnNlcnQuICBTbyBhZGQgdGhlIGNvcHkgY29tbWFuZCB0byB0aGUgZGVsdGEuXG4gICAgICBpZiAoYmVzdENudCA+IDApIHtcbiAgICAgICAgaWYgKGJlc3RMaXRzeiA+IDApIHtcbiAgICAgICAgICAvLyBBZGQgYW4gaW5zZXJ0IGNvbW1hbmQgYmVmb3JlIHRoZSBjb3B5LlxuICAgICAgICAgIHpEZWx0YS5wdXRJbnQoYmVzdExpdHN6KTtcbiAgICAgICAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgICAgICAgIHpEZWx0YS5wdXRBcnJheShvdXQsIGJhc2UsIGJhc2UrYmVzdExpdHN6KTtcbiAgICAgICAgICBiYXNlICs9IGJlc3RMaXRzejtcbiAgICAgICAgfVxuICAgICAgICBiYXNlICs9IGJlc3RDbnQ7XG4gICAgICAgIHpEZWx0YS5wdXRJbnQoYmVzdENudCk7XG4gICAgICAgIHpEZWx0YS5wdXRDaGFyKCdAJyk7XG4gICAgICAgIHpEZWx0YS5wdXRJbnQoYmVzdE9mc3QpO1xuICAgICAgICB6RGVsdGEucHV0Q2hhcignLCcpO1xuICAgICAgICBpZiAoYmVzdE9mc3QgKyBiZXN0Q250IC0xID4gbGFzdFJlYWQpIHtcbiAgICAgICAgICBsYXN0UmVhZCA9IGJlc3RPZnN0ICsgYmVzdENudCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgYmVzdENudCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSByZWFjaCB0aGlzIHBvaW50LCBpdCBtZWFucyBubyBtYXRjaCBpcyBmb3VuZCBzbyBmYXJcbiAgICAgIGlmIChiYXNlK2krTkhBU0ggPj0gbGVuT3V0KXtcbiAgICAgICAgLy8gV2UgaGF2ZSByZWFjaGVkIHRoZSBlbmQgYW5kIGhhdmUgbm90IGZvdW5kIGFueVxuICAgICAgICAvLyBtYXRjaGVzLiAgRG8gYW4gXCJpbnNlcnRcIiBmb3IgZXZlcnl0aGluZyB0aGF0IGRvZXMgbm90IG1hdGNoXG4gICAgICAgIHpEZWx0YS5wdXRJbnQobGVuT3V0LWJhc2UpO1xuICAgICAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgICAgICB6RGVsdGEucHV0QXJyYXkob3V0LCBiYXNlLCBiYXNlK2xlbk91dC1iYXNlKTtcbiAgICAgICAgYmFzZSA9IGxlbk91dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkdmFuY2UgdGhlIGhhc2ggYnkgb25lIGNoYXJhY3Rlci4gS2VlcCBsb29raW5nIGZvciBhIG1hdGNoLlxuICAgICAgaC5uZXh0KG91dFtiYXNlK2krTkhBU0hdKTtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgLy8gT3V0cHV0IGEgZmluYWwgXCJpbnNlcnRcIiByZWNvcmQgdG8gZ2V0IGFsbCB0aGUgdGV4dCBhdCB0aGUgZW5kIG9mXG4gIC8vIHRoZSBmaWxlIHRoYXQgZG9lcyBub3QgbWF0Y2ggYW55dGhpbmcgaW4gdGhlIHNvdXJjZS5cbiAgaWYoYmFzZSA8IGxlbk91dCkge1xuICAgIHpEZWx0YS5wdXRJbnQobGVuT3V0LWJhc2UpO1xuICAgIHpEZWx0YS5wdXRDaGFyKCc6Jyk7XG4gICAgekRlbHRhLnB1dEFycmF5KG91dCwgYmFzZSwgYmFzZStsZW5PdXQtYmFzZSk7XG4gIH1cbiAgLy8gT3V0cHV0IHRoZSBmaW5hbCBjaGVja3N1bSByZWNvcmQuXG4gIHpEZWx0YS5wdXRJbnQoY2hlY2tzdW0ob3V0KSk7XG4gIHpEZWx0YS5wdXRDaGFyKCc7Jyk7XG4gIHJldHVybiB6RGVsdGEudG9BcnJheSgpO1xufTtcblxuLy8gUmV0dXJuIHRoZSBzaXplIChpbiBieXRlcykgb2YgdGhlIG91dHB1dCBmcm9tIGFwcGx5aW5nIGEgZGVsdGEuXG5mb3NzaWxEZWx0YS5vdXRwdXRTaXplID0gZnVuY3Rpb24oZGVsdGEpe1xuICB2YXIgekRlbHRhID0gbmV3IFJlYWRlcihkZWx0YSk7XG4gIHZhciBzaXplID0gekRlbHRhLmdldEludCgpO1xuICBpZiAoekRlbHRhLmdldENoYXIoKSAhPT0gJ1xcbicpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaXplIGludGVnZXIgbm90IHRlcm1pbmF0ZWQgYnkgXFwnXFxcXG5cXCcnKTtcbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vLyBBcHBseSBhIGRlbHRhLlxuZm9zc2lsRGVsdGEuYXBwbHkgPSBmdW5jdGlvbihzcmMsIGRlbHRhLCBvcHRzKSB7XG4gIHZhciBsaW1pdCwgdG90YWwgPSAwO1xuICB2YXIgekRlbHRhID0gbmV3IFJlYWRlcihkZWx0YSk7XG4gIHZhciBsZW5TcmMgPSBzcmMubGVuZ3RoO1xuICB2YXIgbGVuRGVsdGEgPSBkZWx0YS5sZW5ndGg7XG5cbiAgbGltaXQgPSB6RGVsdGEuZ2V0SW50KCk7XG4gIGlmICh6RGVsdGEuZ2V0Q2hhcigpICE9PSAnXFxuJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NpemUgaW50ZWdlciBub3QgdGVybWluYXRlZCBieSBcXCdcXFxcblxcJycpO1xuICB2YXIgek91dCA9IG5ldyBXcml0ZXIoKTtcbiAgd2hpbGUoekRlbHRhLmhhdmVCeXRlcygpKSB7XG4gICAgdmFyIGNudCwgb2ZzdDtcbiAgICBjbnQgPSB6RGVsdGEuZ2V0SW50KCk7XG5cbiAgICBzd2l0Y2ggKHpEZWx0YS5nZXRDaGFyKCkpIHtcbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgICBvZnN0ID0gekRlbHRhLmdldEludCgpO1xuICAgICAgICBpZiAoekRlbHRhLmhhdmVCeXRlcygpICYmIHpEZWx0YS5nZXRDaGFyKCkgIT09ICcsJylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvcHkgY29tbWFuZCBub3QgdGVybWluYXRlZCBieSBcXCcsXFwnJyk7XG4gICAgICAgIHRvdGFsICs9IGNudDtcbiAgICAgICAgaWYgKHRvdGFsID4gbGltaXQpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3B5IGV4Y2VlZHMgb3V0cHV0IGZpbGUgc2l6ZScpO1xuICAgICAgICBpZiAob2ZzdCtjbnQgPiBsZW5TcmMpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3B5IGV4dGVuZHMgcGFzdCBlbmQgb2YgaW5wdXQnKTtcbiAgICAgICAgek91dC5wdXRBcnJheShzcmMsIG9mc3QsIG9mc3QrY250KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJzonOlxuICAgICAgICB0b3RhbCArPSBjbnQ7XG4gICAgICAgIGlmICh0b3RhbCA+IGxpbWl0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW5zZXJ0IGNvbW1hbmQgZ2l2ZXMgYW4gb3V0cHV0IGxhcmdlciB0aGFuIHByZWRpY3RlZCcpO1xuICAgICAgICBpZiAoY250ID4gbGVuRGVsdGEpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnNlcnQgY291bnQgZXhjZWVkcyBzaXplIG9mIGRlbHRhJyk7XG4gICAgICAgIHpPdXQucHV0QXJyYXkoekRlbHRhLmEsIHpEZWx0YS5wb3MsIHpEZWx0YS5wb3MrY250KTtcbiAgICAgICAgekRlbHRhLnBvcyArPSBjbnQ7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICc7JzpcbiAgICAgICAgdmFyIG91dCA9IHpPdXQudG9BcnJheSgpO1xuICAgICAgICBpZiAoKCFvcHRzIHx8IG9wdHMudmVyaWZ5Q2hlY2tzdW0gIT09IGZhbHNlKSAmJiBjbnQgIT09IGNoZWNrc3VtKG91dCkpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgY2hlY2tzdW0nKTtcbiAgICAgICAgaWYgKHRvdGFsICE9PSBsaW1pdClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dlbmVyYXRlZCBzaXplIGRvZXMgbm90IG1hdGNoIHByZWRpY3RlZCBzaXplJyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBkZWx0YSBvcGVyYXRvcicpO1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBkZWx0YScpO1xufTtcblxucmV0dXJuIGZvc3NpbERlbHRhO1xuXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Zvc3NpbC1kZWx0YS9mb3NzaWwtZGVsdGEuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd2Vic29ja2V0XzEgPSByZXF1aXJlKFwiQGdhbWVzdGRpby93ZWJzb2NrZXRcIik7XG52YXIgbXNncGFjayA9IHJlcXVpcmUoXCJtc2dwYWNrLWxpdGVcIik7XG52YXIgQ29ubmVjdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29ubmVjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb25uZWN0aW9uKHVybCwgcXVlcnkpIHtcbiAgICAgICAgaWYgKHF1ZXJ5ID09PSB2b2lkIDApIHsgcXVlcnkgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB1cmwpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9lbnF1ZXVlZENhbGxzID0gW107XG4gICAgICAgIF90aGlzLmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUub25PcGVuQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vbk9wZW5DYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fZW5xdWV1ZWRDYWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2VucXVldWVkQ2FsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLl9lbnF1ZXVlZENhbGxzW2ldLCBtZXRob2QgPSBfYVswXSwgYXJncyA9IF9hWzFdO1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnNlbmQuY2FsbCh0aGlzLCBtc2dwYWNrLmVuY29kZShkYXRhKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJjb2x5c2V1cy5qczogdHJ5aW5nIHRvIHNlbmQgZGF0YSB3aGlsZSBpbiBcIiArIHRoaXMud3MucmVhZHlTdGF0ZSArIFwiIHN0YXRlXCIpO1xuICAgICAgICAgICAgLy8gV2ViU29ja2V0IG5vdCBjb25uZWN0ZWQuXG4gICAgICAgICAgICAvLyBFbnF1ZXVlIGRhdGEgdG8gYmUgc2VudCB3aGVuIHJlYWR5U3RhdGUgPT0gT1BFTlxuICAgICAgICAgICAgdGhpcy5fZW5xdWV1ZWRDYWxscy5wdXNoKFsnc2VuZCcsIFtkYXRhXV0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29ubmVjdGlvbjtcbn0od2Vic29ja2V0XzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5Db25uZWN0aW9uID0gQ29ubmVjdGlvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0Nvbm5lY3Rpb24udHNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO3ZhciBfY3JlYXRlQ2xhc3M9ZnVuY3Rpb24oKXtmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCxwcm9wcyl7Zm9yKHZhciBpPTA7aTxwcm9wcy5sZW5ndGg7aSsrKXt2YXIgZGVzY3JpcHRvcj1wcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGU9ZGVzY3JpcHRvci5lbnVtZXJhYmxlfHxmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZT10cnVlO2lmKFwidmFsdWVcImluIGRlc2NyaXB0b3IpZGVzY3JpcHRvci53cml0YWJsZT10cnVlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsZGVzY3JpcHRvci5rZXksZGVzY3JpcHRvcik7fX1yZXR1cm4gZnVuY3Rpb24oQ29uc3RydWN0b3IscHJvdG9Qcm9wcyxzdGF0aWNQcm9wcyl7aWYocHJvdG9Qcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSxwcm90b1Byb3BzKTtpZihzdGF0aWNQcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7fTt9KCk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLENvbnN0cnVjdG9yKXtpZighKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO319dmFyIGNyZWF0ZUJhY2tvZmY9cmVxdWlyZSgnLi9iYWNrb2ZmJykuY3JlYXRlQmFja29mZjt2YXIgV2ViU29ja2V0Q2xpZW50PWZ1bmN0aW9uKCl7LyoqXG4gICAqIEBwYXJhbSB1cmwgRE9NU3RyaW5nIFRoZSBVUkwgdG8gd2hpY2ggdG8gY29ubmVjdDsgdGhpcyBzaG91bGQgYmUgdGhlIFVSTCB0byB3aGljaCB0aGUgV2ViU29ja2V0IHNlcnZlciB3aWxsIHJlc3BvbmQuXG4gICAqIEBwYXJhbSBwcm90b2NvbHMgRE9NU3RyaW5nfERPTVN0cmluZ1tdIEVpdGhlciBhIHNpbmdsZSBwcm90b2NvbCBzdHJpbmcgb3IgYW4gYXJyYXkgb2YgcHJvdG9jb2wgc3RyaW5ncy4gVGhlc2Ugc3RyaW5ncyBhcmUgdXNlZCB0byBpbmRpY2F0ZSBzdWItcHJvdG9jb2xzLCBzbyB0aGF0IGEgc2luZ2xlIHNlcnZlciBjYW4gaW1wbGVtZW50IG11bHRpcGxlIFdlYlNvY2tldCBzdWItcHJvdG9jb2xzIChmb3IgZXhhbXBsZSwgeW91IG1pZ2h0IHdhbnQgb25lIHNlcnZlciB0byBiZSBhYmxlIHRvIGhhbmRsZSBkaWZmZXJlbnQgdHlwZXMgb2YgaW50ZXJhY3Rpb25zIGRlcGVuZGluZyBvbiB0aGUgc3BlY2lmaWVkIHByb3RvY29sKS4gSWYgeW91IGRvbid0IHNwZWNpZnkgYSBwcm90b2NvbCBzdHJpbmcsIGFuIGVtcHR5IHN0cmluZyBpcyBhc3N1bWVkLlxuICAgKi9mdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsLHByb3RvY29scyl7dmFyIG9wdGlvbnM9YXJndW1lbnRzLmxlbmd0aD4yJiZhcmd1bWVudHNbMl0hPT11bmRlZmluZWQ/YXJndW1lbnRzWzJdOnt9O19jbGFzc0NhbGxDaGVjayh0aGlzLFdlYlNvY2tldENsaWVudCk7dGhpcy51cmw9dXJsO3RoaXMucHJvdG9jb2xzPXByb3RvY29sczt0aGlzLnJlY29ubmVjdEVuYWJsZWQ9dHJ1ZTt0aGlzLmxpc3RlbmVycz17fTt0aGlzLmJhY2tvZmY9Y3JlYXRlQmFja29mZihvcHRpb25zLmJhY2tvZmZ8fCdleHBvbmVudGlhbCcsb3B0aW9ucyk7dGhpcy5iYWNrb2ZmLm9uUmVhZHk9dGhpcy5vbkJhY2tvZmZSZWFkeS5iaW5kKHRoaXMpO3RoaXMub3BlbigpO31fY3JlYXRlQ2xhc3MoV2ViU29ja2V0Q2xpZW50LFt7a2V5OidvcGVuJyx2YWx1ZTpmdW5jdGlvbiBvcGVuKCl7dmFyIHJlY29ubmVjdD1hcmd1bWVudHMubGVuZ3RoPjAmJmFyZ3VtZW50c1swXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMF06ZmFsc2U7dGhpcy5pc1JlY29ubmVjdD1yZWNvbm5lY3Q7Ly8ga2VlcCBiaW5hcnlUeXBlIHVzZWQgb24gcHJldmlvdXMgV2ViU29ja2V0IGNvbm5lY3Rpb25cbnZhciBiaW5hcnlUeXBlPXRoaXMud3MmJnRoaXMud3MuYmluYXJ5VHlwZTt0aGlzLndzPW5ldyBXZWJTb2NrZXQodGhpcy51cmwsdGhpcy5wcm90b2NvbHMpO3RoaXMud3Mub25jbG9zZT10aGlzLm9uQ2xvc2VDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25lcnJvcj10aGlzLm9uRXJyb3JDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25tZXNzYWdlPXRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTt0aGlzLndzLm9ub3Blbj10aGlzLm9uT3BlbkNhbGxiYWNrLmJpbmQodGhpcyk7aWYoYmluYXJ5VHlwZSl7dGhpcy53cy5iaW5hcnlUeXBlPWJpbmFyeVR5cGU7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uQmFja29mZlJlYWR5Jyx2YWx1ZTpmdW5jdGlvbiBvbkJhY2tvZmZSZWFkeShudW1iZXIsZGVsYXkpey8vIGNvbnNvbGUubG9nKFwib25CYWNrb2ZmUmVhZHlcIiwgbnVtYmVyICsgJyAnICsgZGVsYXkgKyAnbXMnKTtcbnRoaXMub3Blbih0cnVlKTt9LyoqXG4gICAqIEBpZ25vcmVcbiAgICovfSx7a2V5OidvbkNsb3NlQ2FsbGJhY2snLHZhbHVlOmZ1bmN0aW9uIG9uQ2xvc2VDYWxsYmFjayhlKXtpZighdGhpcy5pc1JlY29ubmVjdCYmdGhpcy5saXN0ZW5lcnNbJ29uY2xvc2UnXSl7dGhpcy5saXN0ZW5lcnNbJ29uY2xvc2UnXS5hcHBseShudWxsLGFyZ3VtZW50cyk7fWlmKHRoaXMucmVjb25uZWN0RW5hYmxlZCYmZS5jb2RlPDMwMDApe3RoaXMuYmFja29mZi5iYWNrb2ZmKCk7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uRXJyb3JDYWxsYmFjaycsdmFsdWU6ZnVuY3Rpb24gb25FcnJvckNhbGxiYWNrKCl7aWYodGhpcy5saXN0ZW5lcnNbJ29uZXJyb3InXSl7dGhpcy5saXN0ZW5lcnNbJ29uZXJyb3InXS5hcHBseShudWxsLGFyZ3VtZW50cyk7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uTWVzc2FnZUNhbGxiYWNrJyx2YWx1ZTpmdW5jdGlvbiBvbk1lc3NhZ2VDYWxsYmFjaygpe2lmKHRoaXMubGlzdGVuZXJzWydvbm1lc3NhZ2UnXSl7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddLmFwcGx5KG51bGwsYXJndW1lbnRzKTt9fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25PcGVuQ2FsbGJhY2snLHZhbHVlOmZ1bmN0aW9uIG9uT3BlbkNhbGxiYWNrKCl7aWYodGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddKXt0aGlzLmxpc3RlbmVyc1snb25vcGVuJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO31pZih0aGlzLmlzUmVjb25uZWN0JiZ0aGlzLmxpc3RlbmVyc1snb25yZWNvbm5lY3QnXSl7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J10uYXBwbHkobnVsbCxhcmd1bWVudHMpO310aGlzLmlzUmVjb25uZWN0PWZhbHNlO30vKipcbiAgICogVGhlIG51bWJlciBvZiBieXRlcyBvZiBkYXRhIHRoYXQgaGF2ZSBiZWVuIHF1ZXVlZCB1c2luZyBjYWxscyB0byBzZW5kKClcbiAgICogYnV0IG5vdCB5ZXQgdHJhbnNtaXR0ZWQgdG8gdGhlIG5ldHdvcmsuIFRoaXMgdmFsdWUgZG9lcyBub3QgcmVzZXQgdG8gemVyb1xuICAgKiB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZDsgaWYgeW91IGtlZXAgY2FsbGluZyBzZW5kKCksIHRoaXMgd2lsbFxuICAgKiBjb250aW51ZSB0byBjbGltYi5cbiAgICpcbiAgICogQHR5cGUgdW5zaWduZWQgbG9uZ1xuICAgKiBAcmVhZG9ubHlcbiAgICovfSx7a2V5OidjbG9zZScsLyoqXG4gICAqIENsb3NlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gb3IgY29ubmVjdGlvbiBhdHRlbXB0LCBpZiBhbnkuIElmIHRoZVxuICAgKiBjb25uZWN0aW9uIGlzIGFscmVhZHkgQ0xPU0VELCB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBjb2RlIEEgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIHRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjbG9zZWQuIElmIHRoaXMgcGFyYW1ldGVyIGlzIG5vdCBzcGVjaWZpZWQsIGEgZGVmYXVsdCB2YWx1ZSBvZiAxMDAwIChpbmRpY2F0aW5nIGEgbm9ybWFsIFwidHJhbnNhY3Rpb24gY29tcGxldGVcIiBjbG9zdXJlKSBpcyBhc3N1bWVkLiBTZWUgdGhlIGxpc3Qgb2Ygc3RhdHVzIGNvZGVzIG9uIHRoZSBDbG9zZUV2ZW50IHBhZ2UgZm9yIHBlcm1pdHRlZCB2YWx1ZXMuXG4gICAqIEBwYXJhbSByZWFzb24gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZy4gVGhpcyBzdHJpbmcgbXVzdCBiZSBubyBsb25nZXIgdGhhbiAxMjMgYnl0ZXMgb2YgVVRGLTggdGV4dCAobm90IGNoYXJhY3RlcnMpLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovdmFsdWU6ZnVuY3Rpb24gY2xvc2UoY29kZSxyZWFzb24pe2lmKHR5cGVvZiBjb2RlPT0ndW5kZWZpbmVkJyl7Y29kZT0xMDAwO310aGlzLnJlY29ubmVjdEVuYWJsZWQ9ZmFsc2U7dGhpcy53cy5jbG9zZShjb2RlLHJlYXNvbik7fS8qKlxuICAgKiBUcmFuc21pdHMgZGF0YSB0byB0aGUgc2VydmVyIG92ZXIgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uLlxuICAgKiBAcGFyYW0gZGF0YSBET01TdHJpbmd8QXJyYXlCdWZmZXJ8QmxvYlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovfSx7a2V5OidzZW5kJyx2YWx1ZTpmdW5jdGlvbiBzZW5kKGRhdGEpe3RoaXMud3Muc2VuZChkYXRhKTt9LyoqXG4gICAqIEFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbidzIHJlYWR5U3RhdGUgY2hhbmdlcyB0byBDTE9TRUQuIFRoZSBsaXN0ZW5lciByZWNlaXZlcyBhIENsb3NlRXZlbnQgbmFtZWQgXCJjbG9zZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J2J1ZmZlcmVkQW1vdW50JyxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMud3MuYnVmZmVyZWRBbW91bnQ7fS8qKlxuICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbjsgdGhpcyBpcyBvbmUgb2YgdGhlIFJlYWR5IHN0YXRlIGNvbnN0YW50cy5cbiAgICogQHR5cGUgdW5zaWduZWQgc2hvcnRcbiAgICogQHJlYWRvbmx5XG4gICAqL30se2tleToncmVhZHlTdGF0ZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnJlYWR5U3RhdGU7fS8qKlxuICAgKiBBIHN0cmluZyBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIGJpbmFyeSBkYXRhIGJlaW5nIHRyYW5zbWl0dGVkIGJ5IHRoZVxuICAgKiBjb25uZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBlaXRoZXIgXCJibG9iXCIgaWYgRE9NIEJsb2Igb2JqZWN0cyBhcmUgYmVpbmdcbiAgICogdXNlZCBvciBcImFycmF5YnVmZmVyXCIgaWYgQXJyYXlCdWZmZXIgb2JqZWN0cyBhcmUgYmVpbmcgdXNlZC5cbiAgICogQHR5cGUgRE9NU3RyaW5nXG4gICAqL30se2tleTonYmluYXJ5VHlwZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLmJpbmFyeVR5cGU7fSxzZXQ6ZnVuY3Rpb24gc2V0KGJpbmFyeVR5cGUpe3RoaXMud3MuYmluYXJ5VHlwZT1iaW5hcnlUeXBlO30vKipcbiAgICogVGhlIGV4dGVuc2lvbnMgc2VsZWN0ZWQgYnkgdGhlIHNlcnZlci4gVGhpcyBpcyBjdXJyZW50bHkgb25seSB0aGUgZW1wdHlcbiAgICogc3RyaW5nIG9yIGEgbGlzdCBvZiBleHRlbnNpb25zIGFzIG5lZ290aWF0ZWQgYnkgdGhlIGNvbm5lY3Rpb24uXG4gICAqIEB0eXBlIERPTVN0cmluZ1xuICAgKi99LHtrZXk6J2V4dGVuc2lvbnMnLGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy53cy5leHRlbnNpb25zO30sc2V0OmZ1bmN0aW9uIHNldChleHRlbnNpb25zKXt0aGlzLndzLmV4dGVuc2lvbnM9ZXh0ZW5zaW9uczt9LyoqXG4gICAqIEEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIHN1Yi1wcm90b2NvbCB0aGUgc2VydmVyIHNlbGVjdGVkO1xuICAgKiB0aGlzIHdpbGwgYmUgb25lIG9mIHRoZSBzdHJpbmdzIHNwZWNpZmllZCBpbiB0aGUgcHJvdG9jb2xzIHBhcmFtZXRlciB3aGVuXG4gICAqIGNyZWF0aW5nIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgKiBAdHlwZSBET01TdHJpbmdcbiAgICovfSx7a2V5Oidwcm90b2NvbCcsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnByb3RvY29sO30sc2V0OmZ1bmN0aW9uIHNldChwcm90b2NvbCl7dGhpcy53cy5wcm90b2NvbD1wcm90b2NvbDt9fSx7a2V5OidvbmNsb3NlJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLiBUaGlzIGlzIGEgc2ltcGxlIGV2ZW50IG5hbWVkIFwiZXJyb3JcIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbmVycm9yJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25lcnJvciddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25lcnJvciddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci4gVGhlIGxpc3RlbmVyIHJlY2VpdmVzIGEgTWVzc2FnZUV2ZW50IG5hbWVkIFwibWVzc2FnZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J29ubWVzc2FnZScsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25tZXNzYWdlJ107fS8qKlxuICAgKiBBbiBldmVudCBsaXN0ZW5lciB0byBiZSBjYWxsZWQgd2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24ncyByZWFkeVN0YXRlIGNoYW5nZXMgdG8gT1BFTjsgdGhpcyBpbmRpY2F0ZXMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyByZWFkeSB0byBzZW5kIGFuZCByZWNlaXZlIGRhdGEuIFRoZSBldmVudCBpcyBhIHNpbXBsZSBvbmUgd2l0aCB0aGUgbmFtZSBcIm9wZW5cIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5Oidvbm9wZW4nLHNldDpmdW5jdGlvbiBzZXQobGlzdGVuZXIpe3RoaXMubGlzdGVuZXJzWydvbm9wZW4nXT1saXN0ZW5lcjt9LGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddO30vKipcbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbnJlY29ubmVjdCcsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J109bGlzdGVuZXI7fSxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMubGlzdGVuZXJzWydvbnJlY29ubmVjdCddO319XSk7cmV0dXJuIFdlYlNvY2tldENsaWVudDt9KCk7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBub3QgeWV0IG9wZW4uXG4gKi9XZWJTb2NrZXRDbGllbnQuQ09OTkVDVElORz1XZWJTb2NrZXQuQ09OTkVDVElORzsvKipcbiAqIFRoZSBjb25uZWN0aW9uIGlzIG9wZW4gYW5kIHJlYWR5IHRvIGNvbW11bmljYXRlLlxuICovV2ViU29ja2V0Q2xpZW50Lk9QRU49V2ViU29ja2V0Lk9QRU47LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBpbiB0aGUgcHJvY2VzcyBvZiBjbG9zaW5nLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NJTkc9V2ViU29ja2V0LkNMT1NJTkc7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBjbG9zZWQgb3IgY291bGRuJ3QgYmUgb3BlbmVkLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NFRD1XZWJTb2NrZXQuQ0xPU0VEO2V4cG9ydHMuZGVmYXVsdD1XZWJTb2NrZXRDbGllbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGdhbWVzdGRpby93ZWJzb2NrZXQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY3JlYXRlQmFja29mZj1jcmVhdGVCYWNrb2ZmO3ZhciBiYWNrb2ZmPXtleHBvbmVudGlhbDpmdW5jdGlvbiBleHBvbmVudGlhbChhdHRlbXB0LGRlbGF5KXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKk1hdGgucG93KDIsYXR0ZW1wdCkqZGVsYXkpO30sZmlib25hY2NpOmZ1bmN0aW9uIGZpYm9uYWNjaShhdHRlbXB0LGRlbGF5KXt2YXIgY3VycmVudD0xO2lmKGF0dGVtcHQ+Y3VycmVudCl7dmFyIHByZXY9MSxjdXJyZW50PTI7Zm9yKHZhciBpbmRleD0yO2luZGV4PGF0dGVtcHQ7aW5kZXgrKyl7dmFyIG5leHQ9cHJlditjdXJyZW50O3ByZXY9Y3VycmVudDtjdXJyZW50PW5leHQ7fX1yZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmN1cnJlbnQqZGVsYXkpO319O2Z1bmN0aW9uIGNyZWF0ZUJhY2tvZmYodHlwZSxvcHRpb25zKXtyZXR1cm4gbmV3IEJhY2tvZmYoYmFja29mZlt0eXBlXSxvcHRpb25zKTt9ZnVuY3Rpb24gQmFja29mZihmdW5jLG9wdGlvbnMpe3RoaXMuZnVuYz1mdW5jO3RoaXMuYXR0ZW1wdHM9MDt0aGlzLmRlbGF5PXR5cGVvZiBvcHRpb25zLmluaXRpYWxEZWxheSE9PVwidW5kZWZpbmVkXCI/b3B0aW9ucy5pbml0aWFsRGVsYXk6MTAwO31CYWNrb2ZmLnByb3RvdHlwZS5iYWNrb2ZmPWZ1bmN0aW9uKCl7c2V0VGltZW91dCh0aGlzLm9uUmVhZHksdGhpcy5mdW5jKCsrdGhpcy5hdHRlbXB0cyx0aGlzLmRlbGF5KSk7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZ2FtZXN0ZGlvL3dlYnNvY2tldC9saWIvYmFja29mZi5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==