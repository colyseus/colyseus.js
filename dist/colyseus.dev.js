/*! colyseus.js@0.13.2 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Colyseus"] = factory();
	else
		root["Colyseus"] = factory();
})(self || this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySchema = void 0;
var ArraySchema = /** @class */ (function (_super) {
    __extends(ArraySchema, _super);
    function ArraySchema() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(ArraySchema.prototype));
        Object.defineProperties(_this, {
            $sorting: { value: undefined, enumerable: false, writable: true },
            $changes: { value: undefined, enumerable: false, writable: true },
            onAdd: { value: undefined, enumerable: false, writable: true },
            onRemove: { value: undefined, enumerable: false, writable: true },
            onChange: { value: undefined, enumerable: false, writable: true },
            triggerAll: {
                value: function () {
                    if (!_this.onAdd) {
                        return;
                    }
                    for (var i = 0; i < _this.length; i++) {
                        _this.onAdd(_this[i], i);
                    }
                }
            },
            toJSON: {
                value: function () {
                    var arr = [];
                    for (var i = 0; i < _this.length; i++) {
                        var objAt = _this[i];
                        arr.push((typeof (objAt.toJSON) === "function")
                            ? objAt.toJSON()
                            : objAt);
                    }
                    return arr;
                }
            },
            clone: {
                value: function (isDecoding) {
                    var cloned;
                    if (isDecoding) {
                        cloned = ArraySchema.of.apply(ArraySchema, _this);
                        cloned.onAdd = _this.onAdd;
                        cloned.onRemove = _this.onRemove;
                        cloned.onChange = _this.onChange;
                    }
                    else {
                        cloned = new (ArraySchema.bind.apply(ArraySchema, __spreadArrays([void 0], _this.map(function (item) {
                            if (typeof (item) === "object") {
                                return item.clone();
                            }
                            else {
                                return item;
                            }
                        }))))();
                    }
                    return cloned;
                }
            }
        });
        return _this;
    }
    Object.defineProperty(ArraySchema, Symbol.species, {
        get: function () { return ArraySchema; },
        enumerable: false,
        configurable: true
    });
    ArraySchema.prototype.sort = function (compareFn) {
        this.$sorting = true;
        _super.prototype.sort.call(this, compareFn);
        if (this.$changes) { // allow to .slice() + .sort()
            var changes = Array.from(this.$changes.changes);
            for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
                var key = changes_1[_i];
                // track index change
                var previousIndex = this.$changes.getIndex(this[key]);
                if (previousIndex !== undefined) {
                    this.$changes.mapIndexChange(this[key], previousIndex);
                }
                this.$changes.mapIndex(this[key], key);
            }
        }
        this.$sorting = false;
        return this;
    };
    ArraySchema.prototype.filter = function (callbackfn, thisArg) {
        var filtered = _super.prototype.filter.call(this, callbackfn);
        filtered.$changes = this.$changes.clone();
        return filtered;
    };
    ArraySchema.prototype.splice = function (start, deleteCount) {
        var insert = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            insert[_i - 2] = arguments[_i];
        }
        var removedItems = Array.prototype.splice.apply(this, arguments);
        var movedItems = Array.prototype.filter.call(this, function (item, idx) {
            return idx >= start + deleteCount - 1;
        });
        removedItems.map(function (removedItem) {
            var $changes = removedItem && removedItem.$changes;
            // If the removed item is a schema we need to update it.
            if ($changes && $changes.parent) {
                $changes.parent.deleteIndex(removedItem);
                delete $changes.parent;
            }
        });
        movedItems.forEach(function (movedItem) {
            // If the moved item is a schema we need to update it.
            var $changes = movedItem && movedItem.$changes;
            if ($changes) {
                // Update current index in parent, so subsequent changes in
                // this item's properties are correctly reflected.
                $changes.parentField--;
            }
        });
        return removedItems;
    };
    return ArraySchema;
}(Array));
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=ArraySchema.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSchema = void 0;
var MapSchema = /** @class */ (function () {
    function MapSchema(obj) {
        var _this = this;
        if (obj === void 0) { obj = {}; }
        for (var key in obj) {
            this[key] = obj[key];
        }
        Object.defineProperties(this, {
            $changes: { value: undefined, enumerable: false, writable: true },
            onAdd: { value: undefined, enumerable: false, writable: true },
            onRemove: { value: undefined, enumerable: false, writable: true },
            onChange: { value: undefined, enumerable: false, writable: true },
            clone: {
                value: function (isDecoding) {
                    var cloned;
                    if (isDecoding) {
                        // client-side
                        cloned = Object.assign(new MapSchema(), _this);
                        cloned.onAdd = _this.onAdd;
                        cloned.onRemove = _this.onRemove;
                        cloned.onChange = _this.onChange;
                    }
                    else {
                        // server-side
                        var cloned_1 = new MapSchema();
                        for (var key in _this) {
                            if (typeof (_this[key]) === "object") {
                                cloned_1[key] = _this[key].clone();
                            }
                            else {
                                cloned_1[key] = _this[key];
                            }
                        }
                    }
                    return cloned;
                }
            },
            triggerAll: {
                value: function () {
                    if (!_this.onAdd) {
                        return;
                    }
                    for (var key in _this) {
                        _this.onAdd(_this[key], key);
                    }
                }
            },
            toJSON: {
                value: function () {
                    var map = {};
                    for (var key in _this) {
                        map[key] = (typeof (_this[key].toJSON) === "function")
                            ? _this[key].toJSON()
                            : _this[key];
                    }
                    return map;
                }
            },
            _indexes: { value: new Map(), enumerable: false, writable: true },
            _updateIndexes: {
                value: function (allKeys) {
                    var index = 0;
                    var indexes = new Map();
                    for (var _i = 0, allKeys_1 = allKeys; _i < allKeys_1.length; _i++) {
                        var key = allKeys_1[_i];
                        indexes.set(key, index++);
                    }
                    _this._indexes = indexes;
                }
            },
        });
    }
    return MapSchema;
}());
exports.MapSchema = MapSchema;
//# sourceMappingURL=MapSchema.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var spec_1 = __webpack_require__(10);
var encode = __webpack_require__(8);
var decode = __webpack_require__(9);
var ArraySchema_1 = __webpack_require__(0);
var MapSchema_1 = __webpack_require__(1);
var ChangeTree_1 = __webpack_require__(13);
var EventEmitter_1 = __webpack_require__(35);
var EncodeSchemaError = /** @class */ (function (_super) {
    __extends(EncodeSchemaError, _super);
    function EncodeSchemaError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EncodeSchemaError;
}(Error));
function assertType(value, type, klass, field) {
    var typeofTarget;
    var allowNull = false;
    switch (type) {
        case "number":
        case "int8":
        case "uint8":
        case "int16":
        case "uint16":
        case "int32":
        case "uint32":
        case "int64":
        case "uint64":
        case "float32":
        case "float64":
            typeofTarget = "number";
            if (isNaN(value)) {
                console.log("trying to encode \"NaN\" in " + klass.constructor.name + "#" + field);
            }
            break;
        case "string":
            typeofTarget = "string";
            allowNull = true;
            break;
        case "boolean":
            // boolean is always encoded as true/false based on truthiness
            return;
    }
    if (typeof (value) !== typeofTarget && (!allowNull || (allowNull && value !== null))) {
        var foundValue = "'" + JSON.stringify(value) + "'" + (value && value.constructor && " (" + value.constructor.name + ")");
        throw new EncodeSchemaError("a '" + typeofTarget + "' was expected, but " + foundValue + " was provided in " + klass.constructor.name + "#" + field);
    }
}
function assertInstanceType(value, type, klass, field) {
    if (!(value instanceof type)) {
        throw new EncodeSchemaError("a '" + type.name + "' was expected, but '" + value.constructor.name + "' was provided in " + klass.constructor.name + "#" + field);
    }
}
function encodePrimitiveType(type, bytes, value, klass, field) {
    assertType(value, type, klass, field);
    var encodeFunc = encode[type];
    if (encodeFunc) {
        encodeFunc(bytes, value);
    }
    else {
        throw new EncodeSchemaError("a '" + type + "' was expected, but " + value + " was provided in " + klass.constructor.name + "#" + field);
    }
}
function decodePrimitiveType(type, bytes, it) {
    return decode[type](bytes, it);
}
/**
 * Schema encoder / decoder
 */
var Schema = /** @class */ (function () {
    // allow inherited classes to have a constructor
    function Schema() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // fix enumerability of fields for end-user
        Object.defineProperties(this, {
            $changes: {
                value: new ChangeTree_1.ChangeTree(this._indexes),
                enumerable: false,
                writable: true
            },
            $listeners: {
                value: {},
                enumerable: false,
                writable: true
            },
        });
        var descriptors = this._descriptors;
        if (descriptors) {
            Object.defineProperties(this, descriptors);
        }
    }
    Schema.onError = function (e) {
        console.error(e);
    };
    Object.defineProperty(Schema.prototype, "_schema", {
        get: function () { return this.constructor._schema; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_descriptors", {
        get: function () { return this.constructor._descriptors; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_indexes", {
        get: function () { return this.constructor._indexes; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_fieldsByIndex", {
        get: function () { return this.constructor._fieldsByIndex; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_filters", {
        get: function () { return this.constructor._filters; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_deprecated", {
        get: function () { return this.constructor._deprecated; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "$changed", {
        get: function () { return this.$changes.changed; },
        enumerable: false,
        configurable: true
    });
    Schema.prototype.listen = function (attr, callback) {
        var _this = this;
        if (!this.$listeners[attr]) {
            this.$listeners[attr] = new EventEmitter_1.EventEmitter();
        }
        this.$listeners[attr].register(callback);
        // return un-register callback.
        return function () {
            return _this.$listeners[attr].remove(callback);
        };
    };
    Schema.prototype.decode = function (bytes, it) {
        if (it === void 0) { it = { offset: 0 }; }
        var changes = [];
        var schema = this._schema;
        var fieldsByIndex = this._fieldsByIndex;
        var totalBytes = bytes.length;
        // skip TYPE_ID of existing instances
        if (bytes[it.offset] === spec_1.TYPE_ID) {
            it.offset += 2;
        }
        var _loop_1 = function () {
            var isNil = decode.nilCheck(bytes, it) && ++it.offset;
            var index = bytes[it.offset++];
            if (index === spec_1.END_OF_STRUCTURE) {
                return "break";
            }
            var field = fieldsByIndex[index];
            var _field = "_" + field;
            var type = schema[field];
            var value = void 0;
            var hasChange = false;
            if (!field) {
                return "continue";
            }
            else if (isNil) {
                value = null;
                hasChange = true;
            }
            else if (type._schema) {
                value = this_1[_field] || this_1.createTypeInstance(bytes, it, type);
                value.decode(bytes, it);
                hasChange = true;
            }
            else if (Array.isArray(type)) {
                type = type[0];
                var valueRef_1 = this_1[_field] || new ArraySchema_1.ArraySchema();
                value = valueRef_1.clone(true);
                var newLength_1 = decode.number(bytes, it);
                var numChanges = Math.min(decode.number(bytes, it), newLength_1);
                var hasRemoval = (value.length > newLength_1);
                hasChange = (numChanges > 0) || hasRemoval;
                // FIXME: this may not be reliable. possibly need to encode this variable during serialization
                var hasIndexChange = false;
                // ensure current array has the same length as encoded one
                if (hasRemoval) {
                    // decrease removed items from number of changes.
                    // no need to iterate through them, as they're going to be removed.
                    Array.prototype.splice.call(value, newLength_1).forEach(function (itemRemoved, i) {
                        if (itemRemoved && itemRemoved.onRemove) {
                            try {
                                itemRemoved.onRemove();
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                        if (valueRef_1.onRemove) {
                            try {
                                valueRef_1.onRemove(itemRemoved, newLength_1 + i);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                    });
                }
                for (var i = 0; i < numChanges; i++) {
                    var newIndex = decode.number(bytes, it);
                    var indexChangedFrom = void 0; // index change check
                    if (decode.indexChangeCheck(bytes, it)) {
                        decode.uint8(bytes, it);
                        indexChangedFrom = decode.number(bytes, it);
                        hasIndexChange = true;
                    }
                    var isNew = (!hasIndexChange && value[newIndex] === undefined) || (hasIndexChange && indexChangedFrom === undefined);
                    if (type.prototype instanceof Schema) {
                        var item = void 0;
                        if (isNew) {
                            item = this_1.createTypeInstance(bytes, it, type);
                        }
                        else if (indexChangedFrom !== undefined) {
                            item = valueRef_1[indexChangedFrom];
                        }
                        else {
                            item = valueRef_1[newIndex];
                        }
                        if (!item) {
                            item = this_1.createTypeInstance(bytes, it, type);
                            isNew = true;
                        }
                        item.decode(bytes, it);
                        value[newIndex] = item;
                    }
                    else {
                        value[newIndex] = decodePrimitiveType(type, bytes, it);
                    }
                    if (isNew) {
                        if (valueRef_1.onAdd) {
                            try {
                                valueRef_1.onAdd(value[newIndex], newIndex);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                    }
                    else if (valueRef_1.onChange) {
                        try {
                            valueRef_1.onChange(value[newIndex], newIndex);
                        }
                        catch (e) {
                            Schema.onError(e);
                        }
                    }
                }
            }
            else if (type.map) {
                type = type.map;
                var valueRef = this_1[_field] || new MapSchema_1.MapSchema();
                value = valueRef.clone(true);
                var length = decode.number(bytes, it);
                hasChange = (length > 0);
                // FIXME: this may not be reliable. possibly need to encode this variable during
                // serializagion
                var hasIndexChange = false;
                var previousKeys = Object.keys(valueRef);
                for (var i = 0; i < length; i++) {
                    // `encodeAll` may indicate a higher number of indexes it actually encodes
                    // TODO: do not encode a higher number than actual encoded entries
                    if (bytes[it.offset] === undefined ||
                        bytes[it.offset] === spec_1.END_OF_STRUCTURE) {
                        break;
                    }
                    var isNilItem = decode.nilCheck(bytes, it) && ++it.offset;
                    // index change check
                    var previousKey = void 0;
                    if (decode.indexChangeCheck(bytes, it)) {
                        decode.uint8(bytes, it);
                        previousKey = previousKeys[decode.number(bytes, it)];
                        hasIndexChange = true;
                    }
                    var hasMapIndex = decode.numberCheck(bytes, it);
                    var isSchemaType = typeof (type) !== "string";
                    var newKey = (hasMapIndex)
                        ? previousKeys[decode.number(bytes, it)]
                        : decode.string(bytes, it);
                    var item = void 0;
                    var isNew = (!hasIndexChange && valueRef[newKey] === undefined) || (hasIndexChange && previousKey === undefined && hasMapIndex);
                    if (isNew && isSchemaType) {
                        item = this_1.createTypeInstance(bytes, it, type);
                    }
                    else if (previousKey !== undefined) {
                        item = valueRef[previousKey];
                    }
                    else {
                        item = valueRef[newKey];
                    }
                    if (isNilItem) {
                        if (item && item.onRemove) {
                            try {
                                item.onRemove();
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                        if (valueRef.onRemove) {
                            try {
                                valueRef.onRemove(item, newKey);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                        delete value[newKey];
                        continue;
                    }
                    else if (!isSchemaType) {
                        value[newKey] = decodePrimitiveType(type, bytes, it);
                    }
                    else {
                        item.decode(bytes, it);
                        value[newKey] = item;
                    }
                    if (isNew) {
                        if (valueRef.onAdd) {
                            try {
                                valueRef.onAdd(value[newKey], newKey);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                    }
                    else if (valueRef.onChange) {
                        try {
                            valueRef.onChange(value[newKey], newKey);
                        }
                        catch (e) {
                            Schema.onError(e);
                        }
                    }
                }
            }
            else {
                value = decodePrimitiveType(type, bytes, it);
                // FIXME: should not even have encoded if value haven't changed in the first place!
                // check FilterTest.ts: "should not trigger `onChange` if field haven't changed"
                hasChange = (value !== this_1[_field]);
            }
            if (hasChange && (this_1.onChange || this_1.$listeners[field])) {
                changes.push({
                    field: field,
                    value: value,
                    previousValue: this_1[_field]
                });
            }
            this_1[_field] = value;
        };
        var this_1 = this;
        while (it.offset < totalBytes) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        this._triggerChanges(changes);
        return this;
    };
    Schema.prototype.encode = function (root, encodeAll, client, bytes) {
        var _this = this;
        if (root === void 0) { root = this; }
        if (encodeAll === void 0) { encodeAll = false; }
        if (bytes === void 0) { bytes = []; }
        // skip if nothing has changed
        if (!this.$changes.changed && !encodeAll) {
            this._encodeEndOfStructure(this, root, bytes);
            return bytes;
        }
        var schema = this._schema;
        var indexes = this._indexes;
        var fieldsByIndex = this._fieldsByIndex;
        var filters = this._filters;
        var changes = Array.from((encodeAll) //  || client
            ? this.$changes.allChanges
            : this.$changes.changes).sort();
        var _loop_2 = function (i, l) {
            var field = fieldsByIndex[changes[i]] || changes[i];
            var _field = "_" + field;
            var type = schema[field];
            var filter = (filters && filters[field]);
            // const value = (filter && this.$allChanges[field]) || changes[field];
            var value = this_2[_field];
            var fieldIndex = indexes[field];
            if (value === undefined) {
                encode.uint8(bytes, spec_1.NIL);
                encode.number(bytes, fieldIndex);
            }
            else if (type._schema) {
                if (client && filter) {
                    // skip if not allowed by custom filter
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                if (!value) {
                    // value has been removed
                    encode.uint8(bytes, spec_1.NIL);
                    encode.number(bytes, fieldIndex);
                }
                else {
                    // encode child object
                    encode.number(bytes, fieldIndex);
                    assertInstanceType(value, type, this_2, field);
                    this_2.tryEncodeTypeId(bytes, type, value.constructor);
                    value.encode(root, encodeAll, client, bytes);
                }
            }
            else if (Array.isArray(type)) {
                var $changes = value.$changes;
                if (client && filter) {
                    // skip if not allowed by custom filter
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                encode.number(bytes, fieldIndex);
                // total number of items in the array
                encode.number(bytes, value.length);
                var arrayChanges = Array.from((encodeAll) //  || client
                    ? $changes.allChanges
                    : $changes.changes)
                    .filter(function (index) { return _this[_field][index] !== undefined; })
                    .sort(function (a, b) { return a - b; });
                // ensure number of changes doesn't exceed array length
                var numChanges = arrayChanges.length;
                // number of changed items
                encode.number(bytes, numChanges);
                var isChildSchema = typeof (type[0]) !== "string";
                // assert ArraySchema was provided
                assertInstanceType(this_2[_field], ArraySchema_1.ArraySchema, this_2, field);
                // encode Array of type
                for (var j = 0; j < numChanges; j++) {
                    var index = arrayChanges[j];
                    var item = this_2[_field][index];
                    /**
                     * TODO: filter array by items instead of the whole object
                     */
                    // if (client && filter) {
                    //     // skip if not allowed by custom filter
                    //     if (!filter.call(this, client, item, root)) {
                    //         continue;
                    //     }
                    // }
                    if (isChildSchema) { // is array of Schema
                        encode.number(bytes, index);
                        if (!encodeAll) {
                            var indexChange = $changes.getIndexChange(item);
                            if (indexChange !== undefined) {
                                encode.uint8(bytes, spec_1.INDEX_CHANGE);
                                encode.number(bytes, indexChange);
                            }
                        }
                        assertInstanceType(item, type[0], this_2, field);
                        this_2.tryEncodeTypeId(bytes, type[0], item.constructor);
                        item.encode(root, encodeAll, client, bytes);
                    }
                    else if (item !== undefined) { // is array of primitives
                        encode.number(bytes, index);
                        encodePrimitiveType(type[0], bytes, item, this_2, field);
                    }
                }
                if (!encodeAll && !client) {
                    $changes.discard();
                }
            }
            else if (type.map) {
                var $changes = value.$changes;
                if (client && filter) {
                    // skip if not allowed by custom filter
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                // encode Map of type
                encode.number(bytes, fieldIndex);
                // TODO: during `encodeAll`, removed entries are not going to be encoded
                var keys = Array.from((encodeAll) //  || client
                    ? $changes.allChanges
                    : $changes.changes);
                encode.number(bytes, keys.length);
                // const previousKeys = Object.keys(this[_field]); // this is costly!
                var previousKeys = Array.from($changes.allChanges);
                var isChildSchema = typeof (type.map) !== "string";
                var numChanges = keys.length;
                // assert MapSchema was provided
                assertInstanceType(this_2[_field], MapSchema_1.MapSchema, this_2, field);
                for (var i_1 = 0; i_1 < numChanges; i_1++) {
                    var key = keys[i_1];
                    var item = this_2[_field][key];
                    var mapItemIndex = undefined;
                    /**
                     * TODO: filter map by items instead of the whole object
                     */
                    // if (client && filter) {
                    //     // skip if not allowed by custom filter
                    //     if (!filter.call(this, client, item, root)) {
                    //         continue;
                    //     }
                    // }
                    if (encodeAll) {
                        if (item === undefined) {
                            // previously deleted items are skipped during `encodeAll`
                            continue;
                        }
                    }
                    else {
                        // encode index change
                        var indexChange = $changes.getIndexChange(item);
                        if (item && indexChange !== undefined) {
                            encode.uint8(bytes, spec_1.INDEX_CHANGE);
                            encode.number(bytes, this_2[_field]._indexes.get(indexChange));
                        }
                        /**
                         * - Allow item replacement
                         * - Allow to use the index of a deleted item to encode as NIL
                         */
                        mapItemIndex = (!$changes.isDeleted(key) || !item)
                            ? this_2[_field]._indexes.get(key)
                            : undefined;
                    }
                    var isNil = (item === undefined);
                    /**
                     * Invert NIL to prevent collision with data starting with NIL byte
                     */
                    if (isNil) {
                        // TODO: remove item
                        // console.log("REMOVE KEY INDEX", { key });
                        // this[_field]._indexes.delete(key);
                        encode.uint8(bytes, spec_1.NIL);
                    }
                    if (mapItemIndex !== undefined) {
                        encode.number(bytes, mapItemIndex);
                    }
                    else {
                        encode.string(bytes, key);
                    }
                    if (item && isChildSchema) {
                        assertInstanceType(item, type.map, this_2, field);
                        this_2.tryEncodeTypeId(bytes, type.map, item.constructor);
                        item.encode(root, encodeAll, client, bytes);
                    }
                    else if (!isNil) {
                        encodePrimitiveType(type.map, bytes, item, this_2, field);
                    }
                }
                if (!encodeAll && !client) {
                    $changes.discard();
                    // TODO: track array/map indexes per client (for filtering)?
                    // TODO: do not iterate though all MapSchema indexes here.
                    this_2[_field]._updateIndexes(previousKeys);
                }
            }
            else {
                if (client && filter) {
                    // skip if not allowed by custom filter
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                encode.number(bytes, fieldIndex);
                encodePrimitiveType(type, bytes, value, this_2, field);
            }
        };
        var this_2 = this;
        for (var i = 0, l = changes.length; i < l; i++) {
            _loop_2(i, l);
        }
        // flag end of Schema object structure
        this._encodeEndOfStructure(this, root, bytes);
        if (!encodeAll && !client) {
            this.$changes.discard();
        }
        return bytes;
    };
    Schema.prototype.encodeFiltered = function (client, bytes) {
        return this.encode(this, false, client, bytes);
    };
    Schema.prototype.encodeAll = function (bytes) {
        return this.encode(this, true, undefined, bytes);
    };
    Schema.prototype.encodeAllFiltered = function (client, bytes) {
        return this.encode(this, true, client, bytes);
    };
    Schema.prototype.clone = function () {
        var cloned = new (this.constructor);
        var schema = this._schema;
        for (var field in schema) {
            if (typeof (this[field]) === "object" &&
                typeof (this[field].clone) === "function") {
                // deep clone
                cloned[field] = this[field].clone();
            }
            else {
                // primitive values
                cloned[field] = this[field];
            }
        }
        return cloned;
    };
    Schema.prototype.triggerAll = function () {
        var changes = [];
        var schema = this._schema;
        for (var field in schema) {
            if (this[field] !== undefined) {
                changes.push({
                    field: field,
                    value: this[field],
                    previousValue: undefined
                });
            }
        }
        try {
            this._triggerChanges(changes);
        }
        catch (e) {
            Schema.onError(e);
        }
    };
    Schema.prototype.toJSON = function () {
        var schema = this._schema;
        var deprecated = this._deprecated;
        var obj = {};
        for (var field in schema) {
            if (!deprecated[field] && this[field] !== null && typeof (this[field]) !== "undefined") {
                obj[field] = (typeof (this[field].toJSON) === "function")
                    ? this[field].toJSON()
                    : this["_" + field];
            }
        }
        return obj;
    };
    Schema.prototype.discardAllChanges = function () {
        var schema = this._schema;
        var changes = Array.from(this.$changes.changes);
        var fieldsByIndex = this._fieldsByIndex;
        for (var index in changes) {
            var field = fieldsByIndex[changes[index]];
            var type = schema[field];
            var value = this[field];
            // skip unchagned fields
            if (value === undefined) {
                continue;
            }
            if (type._schema) {
                value.discardAllChanges();
            }
            else if (Array.isArray(type)) {
                for (var i = 0, l = value.length; i < l; i++) {
                    var index_1 = value[i];
                    var item = this["_" + field][index_1];
                    if (typeof (type[0]) !== "string" && item) { // is array of Schema
                        item.discardAllChanges();
                    }
                }
                value.$changes.discard();
            }
            else if (type.map) {
                var keys = value;
                var mapKeys = Object.keys(this["_" + field]);
                for (var i = 0; i < keys.length; i++) {
                    var key = mapKeys[keys[i]] || keys[i];
                    var item = this["_" + field][key];
                    if (item instanceof Schema && item) {
                        item.discardAllChanges();
                    }
                }
                value.$changes.discard();
            }
        }
        this.$changes.discard();
    };
    Schema.prototype._encodeEndOfStructure = function (instance, root, bytes) {
        if (instance !== root) {
            bytes.push(spec_1.END_OF_STRUCTURE);
        }
    };
    Schema.prototype.tryEncodeTypeId = function (bytes, type, targetType) {
        if (type._typeid !== targetType._typeid) {
            encode.uint8(bytes, spec_1.TYPE_ID);
            encode.uint8(bytes, targetType._typeid);
        }
    };
    Schema.prototype.createTypeInstance = function (bytes, it, type) {
        if (bytes[it.offset] === spec_1.TYPE_ID) {
            it.offset++;
            var anotherType = this.constructor._context.get(decode.uint8(bytes, it));
            return new anotherType();
        }
        else {
            return new type();
        }
    };
    Schema.prototype._triggerChanges = function (changes) {
        if (changes.length > 0) {
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                var listener = this.$listeners[change.field];
                if (listener) {
                    try {
                        listener.invoke(change.value, change.previousValue);
                    }
                    catch (e) {
                        Schema.onError(e);
                    }
                }
            }
            if (this.onChange) {
                try {
                    this.onChange(changes);
                }
                catch (e) {
                    Schema.onError(e);
                }
            }
        }
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function apply(src, tar) {
	tar.headers = src.headers || {};
	tar.statusMessage = src.statusText;
	tar.statusCode = src.status;
	tar.data = src.response;
}

exports.send = function (method, uri, opts) {
	return new Promise(function (res, rej) {
		opts = opts || {};
		var k, str, tmp, arr;
		var req = new XMLHttpRequest;
		var headers = opts.headers || {};

		// IE compatible
		if (opts.timeout) req.timeout = opts.timeout;
		req.ontimeout = req.onerror = function (err) {
			err.timeout = err.type == 'timeout';
			rej(err);
		}

		req.open(method, uri.href || uri);

		req.onload = function () {
			arr = req.getAllResponseHeaders().trim().split(/[\r\n]+/);
			apply(req, req); //=> req.headers

			while (tmp = arr.shift()) {
				tmp = tmp.split(': ');
				req.headers[tmp.shift().toLowerCase()] = tmp.join(': ');
			}

			tmp = req.headers['content-type'];
			if (tmp && !!~tmp.indexOf('application/json')) {
				try {
					req.data = JSON.parse(req.data, opts.reviver);
				} catch (err) {
					apply(req, err);
					return rej(err);
				}
			}

			(req.status >= 400 ? rej : res)(req);
		};

		if ((str = opts.body) && typeof str == 'object') {
			headers['content-type'] = 'application/json';
			str = JSON.stringify(str);
		}

		req.withCredentials = !!opts.withCredentials;

		for (k in headers) {
			req.setRequestHeader(k, headers[k]);
		}

		req.send(str);
	});
}

exports.get = exports.send.bind(exports.send, 'GET');
exports.post = exports.send.bind(exports.send, 'POST');
exports.patch = exports.send.bind(exports.send, 'PATCH');
exports.del = exports.send.bind(exports.send, 'DELETE');
exports.put = exports.send.bind(exports.send, 'PUT');


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
var msgpack = __importStar(__webpack_require__(5));
var strong_events_1 = __webpack_require__(21);
var nanoevents_1 = __webpack_require__(22);
var Connection_1 = __webpack_require__(23);
var Serializer_1 = __webpack_require__(6);
var Protocol_1 = __webpack_require__(7);
var encode = __importStar(__webpack_require__(8));
var decode = __importStar(__webpack_require__(9));
var Room = /** @class */ (function () {
    function Room(name, rootSchema) {
        var _this = this;
        // Public signals
        this.onJoin = strong_events_1.createSignal();
        this.onStateChange = strong_events_1.createSignal();
        this.onError = strong_events_1.createSignal();
        this.onLeave = strong_events_1.createSignal();
        this.hasJoined = false;
        this.onMessageHandlers = nanoevents_1.createNanoEvents();
        this.id = null;
        this.name = name;
        if (rootSchema) {
            this.serializer = new (Serializer_1.getSerializer("schema"));
            this.rootSchema = rootSchema;
            this.serializer.state = new rootSchema();
        }
        else {
            // TODO: remove default serializer. it should arrive only after JOIN_ROOM.
            this.serializer = new (Serializer_1.getSerializer("fossil-delta"));
        }
        this.onError(function (code, message) { return console.warn("colyseus.js - onError => (" + code + ") " + message); });
        this.onLeave(function () { return _this.removeAllListeners(); });
    }
    Room.prototype.connect = function (endpoint) {
        var _this = this;
        this.connection = new Connection_1.Connection(endpoint, false);
        this.connection.reconnectEnabled = false;
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = function (e) {
            if (!_this.hasJoined) {
                console.warn("Room connection was closed unexpectedly (" + e.code + "): " + e.reason);
                _this.onError.invoke(e.code, e.reason);
                return;
            }
            _this.onLeave.invoke(e.code);
        };
        this.connection.onerror = function (e) {
            console.warn("Room, onError (" + e.code + "): " + e.reason);
            _this.onError.invoke(e.code, e.reason);
        };
        this.connection.open();
    };
    Room.prototype.leave = function (consented) {
        if (consented === void 0) { consented = true; }
        if (this.connection) {
            if (consented) {
                this.connection.send([Protocol_1.Protocol.LEAVE_ROOM]);
            }
            else {
                this.connection.close();
            }
        }
        else {
            this.onLeave.invoke(4000); // "consented" code
        }
    };
    Room.prototype.onMessage = function (type, callback) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    };
    Room.prototype.send = function (type, message) {
        var initialBytes = [Protocol_1.Protocol.ROOM_DATA];
        if (typeof (type) === "string") {
            encode.string(initialBytes, type);
        }
        else {
            encode.number(initialBytes, type);
        }
        var arr;
        if (message !== undefined) {
            var encoded = msgpack.encode(message);
            arr = new Uint8Array(initialBytes.length + encoded.byteLength);
            arr.set(new Uint8Array(initialBytes), 0);
            arr.set(new Uint8Array(encoded), initialBytes.length);
        }
        else {
            arr = new Uint8Array(initialBytes);
        }
        this.connection.send(arr.buffer);
    };
    Object.defineProperty(Room.prototype, "state", {
        get: function () {
            return this.serializer.getState();
        },
        enumerable: false,
        configurable: true
    });
    // TODO: deprecate / move somewhere else
    // this method is useful only for FossilDeltaSerializer
    Room.prototype.listen = function (segments, callback, immediate) {
        if (this.serializerId === "schema") {
            console.warn("'" + this.serializerId + "' serializer doesn't support .listen() method here.");
            return;
        }
        else if (!this.serializerId) {
            console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)");
        }
        return this.serializer.api.listen(segments, callback, immediate);
    };
    // TODO: deprecate / move somewhere else
    // this method is useful only for FossilDeltaSerializer
    Room.prototype.removeListener = function (listener) {
        return this.serializer.api.removeListener(listener);
    };
    Room.prototype.removeAllListeners = function () {
        if (this.serializer) {
            this.serializer.teardown();
        }
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
    };
    Room.prototype.onMessageCallback = function (event) {
        var bytes = Array.from(new Uint8Array(event.data));
        var code = bytes[0];
        if (code === Protocol_1.Protocol.JOIN_ROOM) {
            var offset = 1;
            this.serializerId = Protocol_1.utf8Read(bytes, offset);
            offset += Protocol_1.utf8Length(this.serializerId);
            // get serializer implementation
            var serializer = Serializer_1.getSerializer(this.serializerId);
            if (!serializer) {
                throw new Error("missing serializer: " + this.serializerId);
            }
            // TODO: remove this check
            if (this.serializerId !== "fossil-delta" && !this.rootSchema) {
                this.serializer = new serializer();
            }
            if (bytes.length > offset && this.serializer.handshake) {
                this.serializer.handshake(bytes, { offset: 1 });
            }
            this.hasJoined = true;
            this.onJoin.invoke();
            // acknowledge successfull JOIN_ROOM
            this.connection.send([Protocol_1.Protocol.JOIN_ROOM]);
        }
        else if (code === Protocol_1.Protocol.ERROR) {
            var it_1 = { offset: 1 };
            var code_1 = decode.number(bytes, it_1);
            var message = decode.string(bytes, it_1);
            this.onError.invoke(code_1, message);
        }
        else if (code === Protocol_1.Protocol.LEAVE_ROOM) {
            this.leave();
        }
        else if (code === Protocol_1.Protocol.ROOM_DATA_SCHEMA) {
            var context_1 = this.serializer.getState().constructor._context;
            var type = context_1.get(bytes[1]);
            var message = new type();
            message.decode(bytes, { offset: 2 });
            this.dispatchMessage(type, message);
        }
        else if (code === Protocol_1.Protocol.ROOM_STATE) {
            bytes.shift(); // drop `code` byte
            this.setState(bytes);
        }
        else if (code === Protocol_1.Protocol.ROOM_STATE_PATCH) {
            bytes.shift(); // drop `code` byte
            this.patch(bytes);
        }
        else if (code === Protocol_1.Protocol.ROOM_DATA) {
            var it_2 = { offset: 1 };
            var type = (decode.stringCheck(bytes, it_2))
                ? decode.string(bytes, it_2)
                : decode.number(bytes, it_2);
            var message = (bytes.length > it_2.offset)
                ? msgpack.decode(event.data, it_2.offset)
                : undefined;
            this.dispatchMessage(type, message);
        }
    };
    Room.prototype.setState = function (encodedState) {
        this.serializer.setState(encodedState);
        this.onStateChange.invoke(this.serializer.getState());
    };
    Room.prototype.patch = function (binaryPatch) {
        this.serializer.patch(binaryPatch);
        this.onStateChange.invoke(this.serializer.getState());
    };
    Room.prototype.dispatchMessage = function (type, message) {
        var messageType = this.getMessageHandlerKey(type);
        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);
        }
        else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);
        }
        else {
            console.warn("onMessage not registered for type '" + type + "'.");
        }
    };
    Room.prototype.getMessageHandlerKey = function (type) {
        switch (typeof (type)) {
            // typeof Schema
            case "function": return "$" + type._typeid;
            // string
            case "string": return type;
            // number
            case "number": return "i" + type;
            default: throw new Error("invalid message type.");
        }
    };
    return Room;
}());
exports.Room = Room;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
var decode_1 = __importDefault(__webpack_require__(19));
var encode_1 = __importDefault(__webpack_require__(20));
exports.decode = decode_1.default;
exports.encode = encode_1.default;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerializer = exports.registerSerializer = void 0;
var serializers = {};
function registerSerializer(id, serializer) {
    serializers[id] = serializer;
}
exports.registerSerializer = registerSerializer;
function getSerializer(id) {
    return serializers[id];
}
exports.getSerializer = getSerializer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Use codes between 0~127 for lesser throughput (1 byte)
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf8Length = exports.utf8Read = exports.ErrorCode = exports.Protocol = void 0;
var Protocol;
(function (Protocol) {
    // Room-related (10~19)
    Protocol[Protocol["HANDSHAKE"] = 9] = "HANDSHAKE";
    Protocol[Protocol["JOIN_ROOM"] = 10] = "JOIN_ROOM";
    Protocol[Protocol["ERROR"] = 11] = "ERROR";
    Protocol[Protocol["LEAVE_ROOM"] = 12] = "LEAVE_ROOM";
    Protocol[Protocol["ROOM_DATA"] = 13] = "ROOM_DATA";
    Protocol[Protocol["ROOM_STATE"] = 14] = "ROOM_STATE";
    Protocol[Protocol["ROOM_STATE_PATCH"] = 15] = "ROOM_STATE_PATCH";
    Protocol[Protocol["ROOM_DATA_SCHEMA"] = 16] = "ROOM_DATA_SCHEMA";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MATCHMAKE_NO_HANDLER"] = 4210] = "MATCHMAKE_NO_HANDLER";
    ErrorCode[ErrorCode["MATCHMAKE_INVALID_CRITERIA"] = 4211] = "MATCHMAKE_INVALID_CRITERIA";
    ErrorCode[ErrorCode["MATCHMAKE_INVALID_ROOM_ID"] = 4212] = "MATCHMAKE_INVALID_ROOM_ID";
    ErrorCode[ErrorCode["MATCHMAKE_UNHANDLED"] = 4213] = "MATCHMAKE_UNHANDLED";
    ErrorCode[ErrorCode["MATCHMAKE_EXPIRED"] = 4214] = "MATCHMAKE_EXPIRED";
    ErrorCode[ErrorCode["AUTH_FAILED"] = 4215] = "AUTH_FAILED";
    ErrorCode[ErrorCode["APPLICATION_ERROR"] = 4216] = "APPLICATION_ERROR";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
function utf8Read(view, offset) {
    var length = view[offset++];
    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
        var byte = view[i];
        if ((byte & 0x80) === 0x00) {
            string += String.fromCharCode(byte);
            continue;
        }
        if ((byte & 0xe0) === 0xc0) {
            string += String.fromCharCode(((byte & 0x1f) << 6) |
                (view[++i] & 0x3f));
            continue;
        }
        if ((byte & 0xf0) === 0xe0) {
            string += String.fromCharCode(((byte & 0x0f) << 12) |
                ((view[++i] & 0x3f) << 6) |
                ((view[++i] & 0x3f) << 0));
            continue;
        }
        if ((byte & 0xf8) === 0xf0) {
            chr = ((byte & 0x07) << 18) |
                ((view[++i] & 0x3f) << 12) |
                ((view[++i] & 0x3f) << 6) |
                ((view[++i] & 0x3f) << 0);
            if (chr >= 0x010000) { // surrogate pair
                chr -= 0x010000;
                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
            }
            else {
                string += String.fromCharCode(chr);
            }
            continue;
        }
        throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
}
exports.utf8Read = utf8Read;
// Faster for short strings than Buffer.byteLength
function utf8Length(str) {
    if (str === void 0) { str = ''; }
    var c = 0;
    var length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length + 1;
}
exports.utf8Length = utf8Length;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) 2018 Endel Dreyer
 * Copyright (c) 2014 Ion Drive Software Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.string = exports.boolean = exports.writeFloat64 = exports.writeFloat32 = exports.float64 = exports.float32 = exports.uint64 = exports.int64 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = exports.utf8Write = void 0;
/**
 * msgpack implementation highly based on notepack.io
 * https://github.com/darrachequesne/notepack
 */
function utf8Length(str) {
    var c = 0, length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}
function utf8Write(view, offset, str) {
    var c = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            view[offset++] = c;
        }
        else if (c < 0x800) {
            view[offset++] = 0xc0 | (c >> 6);
            view[offset++] = 0x80 | (c & 0x3f);
        }
        else if (c < 0xd800 || c >= 0xe000) {
            view[offset++] = 0xe0 | (c >> 12);
            view[offset++] = 0x80 | (c >> 6 & 0x3f);
            view[offset++] = 0x80 | (c & 0x3f);
        }
        else {
            i++;
            c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
            view[offset++] = 0xf0 | (c >> 18);
            view[offset++] = 0x80 | (c >> 12 & 0x3f);
            view[offset++] = 0x80 | (c >> 6 & 0x3f);
            view[offset++] = 0x80 | (c & 0x3f);
        }
    }
}
exports.utf8Write = utf8Write;
function int8(bytes, value) {
    bytes.push(value & 255);
}
exports.int8 = int8;
;
function uint8(bytes, value) {
    bytes.push(value & 255);
}
exports.uint8 = uint8;
;
function int16(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
}
exports.int16 = int16;
;
function uint16(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
}
exports.uint16 = uint16;
;
function int32(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
    bytes.push((value >> 16) & 255);
    bytes.push((value >> 24) & 255);
}
exports.int32 = int32;
;
function uint32(bytes, value) {
    var b4 = value >> 24;
    var b3 = value >> 16;
    var b2 = value >> 8;
    var b1 = value;
    bytes.push(b1 & 255);
    bytes.push(b2 & 255);
    bytes.push(b3 & 255);
    bytes.push(b4 & 255);
}
exports.uint32 = uint32;
;
function int64(bytes, value) {
    var high = Math.floor(value / Math.pow(2, 32));
    var low = value >>> 0;
    uint32(bytes, low);
    uint32(bytes, high);
}
exports.int64 = int64;
;
function uint64(bytes, value) {
    var high = (value / Math.pow(2, 32)) >> 0;
    var low = value >>> 0;
    uint32(bytes, low);
    uint32(bytes, high);
}
exports.uint64 = uint64;
;
function float32(bytes, value) {
    writeFloat32(bytes, value);
}
exports.float32 = float32;
function float64(bytes, value) {
    writeFloat64(bytes, value);
}
exports.float64 = float64;
// force little endian to facilitate decoding on multiple implementations
var _isLittleEndian = true; // new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
var _int32 = new Int32Array(2);
var _float32 = new Float32Array(_int32.buffer);
var _float64 = new Float64Array(_int32.buffer);
function writeFloat32(bytes, value) {
    _float32[0] = value;
    int32(bytes, _int32[0]);
}
exports.writeFloat32 = writeFloat32;
;
function writeFloat64(bytes, value) {
    _float64[0] = value;
    int32(bytes, _int32[_isLittleEndian ? 0 : 1]);
    int32(bytes, _int32[_isLittleEndian ? 1 : 0]);
}
exports.writeFloat64 = writeFloat64;
;
function boolean(bytes, value) {
    return uint8(bytes, value ? 1 : 0);
}
exports.boolean = boolean;
;
function string(bytes, value) {
    // encode `null` strings as empty.
    if (!value) {
        value = "";
    }
    var length = utf8Length(value);
    var size = 0;
    // fixstr
    if (length < 0x20) {
        bytes.push(length | 0xa0);
        size = 1;
    }
    // str 8
    else if (length < 0x100) {
        bytes.push(0xd9);
        uint8(bytes, length);
        size = 2;
    }
    // str 16
    else if (length < 0x10000) {
        bytes.push(0xda);
        uint16(bytes, length);
        size = 3;
    }
    // str 32
    else if (length < 0x100000000) {
        bytes.push(0xdb);
        uint32(bytes, length);
        size = 5;
    }
    else {
        throw new Error('String too long');
    }
    utf8Write(bytes, bytes.length, value);
    return size + length;
}
exports.string = string;
function number(bytes, value) {
    if (isNaN(value)) {
        return number(bytes, 0);
    }
    else if (!isFinite(value)) {
        return number(bytes, (value > 0) ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
    }
    else if (value !== (value | 0)) {
        bytes.push(0xcb);
        writeFloat64(bytes, value);
        return 9;
        // TODO: encode float 32?
        // is it possible to differentiate between float32 / float64 here?
        // // float 32
        // bytes.push(0xca);
        // writeFloat32(bytes, value);
        // return 5;
    }
    if (value >= 0) {
        // positive fixnum
        if (value < 0x80) {
            uint8(bytes, value);
            return 1;
        }
        // uint 8
        if (value < 0x100) {
            bytes.push(0xcc);
            uint8(bytes, value);
            return 2;
        }
        // uint 16
        if (value < 0x10000) {
            bytes.push(0xcd);
            uint16(bytes, value);
            return 3;
        }
        // uint 32
        if (value < 0x100000000) {
            bytes.push(0xce);
            uint32(bytes, value);
            return 5;
        }
        // uint 64
        bytes.push(0xcf);
        uint64(bytes, value);
        return 9;
    }
    else {
        // negative fixnum
        if (value >= -0x20) {
            bytes.push(value);
            return 1;
        }
        // int 8
        if (value >= -0x80) {
            bytes.push(0xd0);
            int8(bytes, value);
            return 2;
        }
        // int 16
        if (value >= -0x8000) {
            bytes.push(0xd1);
            int16(bytes, value);
            return 3;
        }
        // int 32
        if (value >= -0x80000000) {
            bytes.push(0xd2);
            int32(bytes, value);
            return 5;
        }
        // int 64
        bytes.push(0xd3);
        int64(bytes, value);
        return 9;
    }
}
exports.number = number;
//# sourceMappingURL=encode.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.indexChangeCheck = exports.nilCheck = exports.arrayCheck = exports.numberCheck = exports.number = exports.stringCheck = exports.string = exports.boolean = exports.readFloat64 = exports.readFloat32 = exports.uint64 = exports.int64 = exports.float64 = exports.float32 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = void 0;
var spec_1 = __webpack_require__(10);
function utf8Read(bytes, offset, length) {
    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
        var byte = bytes[i];
        if ((byte & 0x80) === 0x00) {
            string += String.fromCharCode(byte);
            continue;
        }
        if ((byte & 0xe0) === 0xc0) {
            string += String.fromCharCode(((byte & 0x1f) << 6) |
                (bytes[++i] & 0x3f));
            continue;
        }
        if ((byte & 0xf0) === 0xe0) {
            string += String.fromCharCode(((byte & 0x0f) << 12) |
                ((bytes[++i] & 0x3f) << 6) |
                ((bytes[++i] & 0x3f) << 0));
            continue;
        }
        if ((byte & 0xf8) === 0xf0) {
            chr = ((byte & 0x07) << 18) |
                ((bytes[++i] & 0x3f) << 12) |
                ((bytes[++i] & 0x3f) << 6) |
                ((bytes[++i] & 0x3f) << 0);
            if (chr >= 0x010000) { // surrogate pair
                chr -= 0x010000;
                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
            }
            else {
                string += String.fromCharCode(chr);
            }
            continue;
        }
        throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
}
function int8(bytes, it) {
    return uint8(bytes, it) << 24 >> 24;
}
exports.int8 = int8;
;
function uint8(bytes, it) {
    return bytes[it.offset++];
}
exports.uint8 = uint8;
;
function int16(bytes, it) {
    return uint16(bytes, it) << 16 >> 16;
}
exports.int16 = int16;
;
function uint16(bytes, it) {
    return bytes[it.offset++] | bytes[it.offset++] << 8;
}
exports.uint16 = uint16;
;
function int32(bytes, it) {
    return bytes[it.offset++] | bytes[it.offset++] << 8 | bytes[it.offset++] << 16 | bytes[it.offset++] << 24;
}
exports.int32 = int32;
;
function uint32(bytes, it) {
    return int32(bytes, it) >>> 0;
}
exports.uint32 = uint32;
;
function float32(bytes, it) {
    return readFloat32(bytes, it);
}
exports.float32 = float32;
function float64(bytes, it) {
    return readFloat64(bytes, it);
}
exports.float64 = float64;
function int64(bytes, it) {
    var low = uint32(bytes, it);
    var high = int32(bytes, it) * Math.pow(2, 32);
    return high + low;
}
exports.int64 = int64;
;
function uint64(bytes, it) {
    var low = uint32(bytes, it);
    var high = uint32(bytes, it) * Math.pow(2, 32);
    return high + low;
}
exports.uint64 = uint64;
;
// force little endian to facilitate decoding on multiple implementations
var _isLittleEndian = true; // new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
var _int32 = new Int32Array(2);
var _float32 = new Float32Array(_int32.buffer);
var _float64 = new Float64Array(_int32.buffer);
function readFloat32(bytes, it) {
    _int32[0] = int32(bytes, it);
    return _float32[0];
}
exports.readFloat32 = readFloat32;
;
function readFloat64(bytes, it) {
    _int32[_isLittleEndian ? 0 : 1] = int32(bytes, it);
    _int32[_isLittleEndian ? 1 : 0] = int32(bytes, it);
    return _float64[0];
}
exports.readFloat64 = readFloat64;
;
function boolean(bytes, it) {
    return uint8(bytes, it) > 0;
}
exports.boolean = boolean;
;
function string(bytes, it) {
    var prefix = bytes[it.offset++];
    var length;
    if (prefix < 0xc0) {
        // fixstr
        length = prefix & 0x1f;
    }
    else if (prefix === 0xd9) {
        length = uint8(bytes, it);
    }
    else if (prefix === 0xda) {
        length = uint16(bytes, it);
    }
    else if (prefix === 0xdb) {
        length = uint32(bytes, it);
    }
    var value = utf8Read(bytes, it.offset, length);
    it.offset += length;
    return value;
}
exports.string = string;
function stringCheck(bytes, it) {
    var prefix = bytes[it.offset];
    return (
    // fixstr
    (prefix < 0xc0 && prefix > 0xa0) ||
        // str 8
        prefix === 0xd9 ||
        // str 16
        prefix === 0xda ||
        // str 32
        prefix === 0xdb);
}
exports.stringCheck = stringCheck;
function number(bytes, it) {
    var prefix = bytes[it.offset++];
    if (prefix < 0x80) {
        // positive fixint
        return prefix;
    }
    else if (prefix === 0xca) {
        // float 32
        return readFloat32(bytes, it);
    }
    else if (prefix === 0xcb) {
        // float 64
        return readFloat64(bytes, it);
    }
    else if (prefix === 0xcc) {
        // uint 8
        return uint8(bytes, it);
    }
    else if (prefix === 0xcd) {
        // uint 16
        return uint16(bytes, it);
    }
    else if (prefix === 0xce) {
        // uint 32
        return uint32(bytes, it);
    }
    else if (prefix === 0xcf) {
        // uint 64
        return uint64(bytes, it);
    }
    else if (prefix === 0xd0) {
        // int 8
        return int8(bytes, it);
    }
    else if (prefix === 0xd1) {
        // int 16
        return int16(bytes, it);
    }
    else if (prefix === 0xd2) {
        // int 32
        return int32(bytes, it);
    }
    else if (prefix === 0xd3) {
        // int 64
        return int64(bytes, it);
    }
    else if (prefix > 0xdf) {
        // negative fixint
        return (0xff - prefix + 1) * -1;
    }
}
exports.number = number;
;
function numberCheck(bytes, it) {
    var prefix = bytes[it.offset];
    // positive fixint - 0x00 - 0x7f
    // float 32        - 0xca
    // float 64        - 0xcb
    // uint 8          - 0xcc
    // uint 16         - 0xcd
    // uint 32         - 0xce
    // uint 64         - 0xcf
    // int 8           - 0xd0
    // int 16          - 0xd1
    // int 32          - 0xd2
    // int 64          - 0xd3
    return (prefix < 0x80 ||
        (prefix >= 0xca && prefix <= 0xd3));
}
exports.numberCheck = numberCheck;
function arrayCheck(bytes, it) {
    return bytes[it.offset] < 0xa0;
    // const prefix = bytes[it.offset] ;
    // if (prefix < 0xa0) {
    //   return prefix;
    // // array
    // } else if (prefix === 0xdc) {
    //   it.offset += 2;
    // } else if (0xdd) {
    //   it.offset += 4;
    // }
    // return prefix;
}
exports.arrayCheck = arrayCheck;
function nilCheck(bytes, it) {
    return bytes[it.offset] === spec_1.NIL;
}
exports.nilCheck = nilCheck;
function indexChangeCheck(bytes, it) {
    return bytes[it.offset] === spec_1.INDEX_CHANGE;
}
exports.indexChangeCheck = indexChangeCheck;
//# sourceMappingURL=decode.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_ID = exports.INDEX_CHANGE = exports.NIL = exports.END_OF_STRUCTURE = void 0;
exports.END_OF_STRUCTURE = 0xc1; // (msgpack spec: never used)
exports.NIL = 0xc0;
exports.INDEX_CHANGE = 0xd4;
exports.TYPE_ID = 0xd5;
//# sourceMappingURL=spec.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Platform = void 0;
var http = __importStar(__webpack_require__(3));
var Storage_1 = __webpack_require__(27);
var TOKEN_STORAGE = "colyseus-auth-token";
var Platform;
(function (Platform) {
    Platform["ios"] = "ios";
    Platform["android"] = "android";
})(Platform = exports.Platform || (exports.Platform = {}));
var Auth = /** @class */ (function () {
    function Auth(endpoint) {
        var _this = this;
        this._id = undefined;
        this.username = undefined;
        this.displayName = undefined;
        this.avatarUrl = undefined;
        this.isAnonymous = undefined;
        this.email = undefined;
        this.lang = undefined;
        this.location = undefined;
        this.timezone = undefined;
        this.metadata = undefined;
        this.devices = undefined;
        this.facebookId = undefined;
        this.twitterId = undefined;
        this.googleId = undefined;
        this.gameCenterId = undefined;
        this.steamId = undefined;
        this.friendIds = undefined;
        this.blockedUserIds = undefined;
        this.createdAt = undefined;
        this.updatedAt = undefined;
        // auth token
        this.token = undefined;
        this.endpoint = endpoint.replace("ws", "http");
        Storage_1.getItem(TOKEN_STORAGE, function (token) { return _this.token = token; });
    }
    Object.defineProperty(Auth.prototype, "hasToken", {
        get: function () {
            return !!this.token;
        },
        enumerable: false,
        configurable: true
    });
    Auth.prototype.login = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, data, attr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = Object.assign({}, options);
                        if (this.hasToken) {
                            queryParams.token = this.token;
                        }
                        return [4 /*yield*/, this.request('post', '/auth', queryParams)];
                    case 1:
                        data = _a.sent();
                        // set & cache token
                        this.token = data.token;
                        Storage_1.setItem(TOKEN_STORAGE, this.token);
                        for (attr in data) {
                            if (this.hasOwnProperty(attr)) {
                                this[attr] = data[attr];
                            }
                        }
                        this.registerPingService();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Auth.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('put', '/auth', {}, {
                            username: this.username,
                            displayName: this.displayName,
                            avatarUrl: this.avatarUrl,
                            lang: this.lang,
                            location: this.location,
                            timezone: this.timezone,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Auth.prototype.getFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/friends/all')];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.getOnlineFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/friends/online')];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.getFriendRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('get', '/friends/requests')];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.sendFriendRequest = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('post', '/friends/requests', { userId: friendId })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.acceptFriendRequest = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('put', '/friends/requests', { userId: friendId })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.declineFriendRequest = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('del', '/friends/requests', { userId: friendId })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.blockUser = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('post', '/friends/block', { userId: friendId })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.unblockUser = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('put', '/friends/block', { userId: friendId })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.request = function (method, segments, query, body, headers) {
        if (query === void 0) { query = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, name_1, queryString, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers['Accept'] = 'application/json';
                        if (this.hasToken) {
                            headers['Authorization'] = 'Bearer ' + this.token;
                        }
                        queryParams = [];
                        for (name_1 in query) {
                            queryParams.push(name_1 + "=" + query[name_1]);
                        }
                        queryString = (queryParams.length > 0)
                            ? "?" + queryParams.join("&")
                            : '';
                        opts = { headers: headers };
                        if (body) {
                            opts.body = body;
                        }
                        return [4 /*yield*/, http[method]("" + this.endpoint + segments + queryString, opts)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Auth.prototype.logout = function () {
        this.token = undefined;
        Storage_1.removeItem(TOKEN_STORAGE);
        this.unregisterPingService();
    };
    Auth.prototype.registerPingService = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 15000; }
        this.unregisterPingService();
        this.keepOnlineInterval = setInterval(function () { return _this.request('get', '/auth'); }, timeout);
    };
    Auth.prototype.unregisterPingService = function () {
        clearInterval(this.keepOnlineInterval);
    };
    return Auth;
}());
exports.Auth = Auth;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = __webpack_require__(2);
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return Schema_1.Schema; } });
var MapSchema_1 = __webpack_require__(1);
Object.defineProperty(exports, "MapSchema", { enumerable: true, get: function () { return MapSchema_1.MapSchema; } });
var ArraySchema_1 = __webpack_require__(0);
Object.defineProperty(exports, "ArraySchema", { enumerable: true, get: function () { return ArraySchema_1.ArraySchema; } });
// Utils
var utils_1 = __webpack_require__(36);
Object.defineProperty(exports, "dumpChanges", { enumerable: true, get: function () { return utils_1.dumpChanges; } });
// Reflection
var Reflection_1 = __webpack_require__(37);
Object.defineProperty(exports, "Reflection", { enumerable: true, get: function () { return Reflection_1.Reflection; } });
Object.defineProperty(exports, "ReflectionType", { enumerable: true, get: function () { return Reflection_1.ReflectionType; } });
Object.defineProperty(exports, "ReflectionField", { enumerable: true, get: function () { return Reflection_1.ReflectionField; } });
var annotations_1 = __webpack_require__(14);
// Annotations
Object.defineProperty(exports, "type", { enumerable: true, get: function () { return annotations_1.type; } });
Object.defineProperty(exports, "deprecated", { enumerable: true, get: function () { return annotations_1.deprecated; } });
Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return annotations_1.filter; } });
Object.defineProperty(exports, "defineTypes", { enumerable: true, get: function () { return annotations_1.defineTypes; } });
// Types
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return annotations_1.Context; } });
//# sourceMappingURL=index.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTree = void 0;
var Schema_1 = __webpack_require__(2);
var ArraySchema_1 = __webpack_require__(0);
var MapSchema_1 = __webpack_require__(1);
var ChangeTree = /** @class */ (function () {
    function ChangeTree(indexes, parentField, parent) {
        if (indexes === void 0) { indexes = {}; }
        if (parentField === void 0) { parentField = null; }
        this.changed = false;
        this.changes = new Set();
        this.allChanges = new Set();
        this.deletedKeys = {};
        this.fieldIndexes = indexes;
        this.parent = parent;
        this.parentField = parentField;
    }
    ChangeTree.prototype.change = function (fieldName, isDelete) {
        if (isDelete === void 0) { isDelete = false; }
        var fieldIndex = this.fieldIndexes[fieldName];
        var field = (typeof (fieldIndex) === "number") ? fieldIndex : fieldName;
        if (!isDelete) {
            this.changed = true;
            this.changes.add(field);
            this.allChanges.add(field);
        }
        else if (isDelete) {
            // if (this.changes.has(field))  {
            //     /**
            //      * un-flag a change if item has been added AND removed in the same patch.
            //      * (https://github.com/colyseus/colyseus-unity3d/issues/103)
            //      */
            //     this.changes.delete(field);
            // } else {
            this.changed = true;
            this.changes.add(field);
            // }
            // discard all-changes for removed items.
            this.allChanges.delete(field);
        }
        if (this.parent) {
            this.parent.change(this.parentField);
        }
    };
    ChangeTree.prototype.mapIndex = function (instance, key) {
        if (typeof instance === "object") {
            if (!this.indexMap) {
                this.indexMap = new Map();
                this.indexChange = new Map();
            }
            this.indexMap.set(instance, key);
        }
    };
    ChangeTree.prototype.getIndex = function (instance) {
        return this.indexMap && this.indexMap.get(instance);
    };
    ChangeTree.prototype.deleteIndex = function (instance) {
        if (typeof instance === "object") {
            this.deletedKeys[this.indexMap.get(instance)] = true;
            this.indexMap.delete(instance);
        }
    };
    ChangeTree.prototype.isDeleted = function (key) {
        return this.deletedKeys[key] !== undefined;
    };
    ChangeTree.prototype.mapIndexChange = function (instance, previousKey) {
        if (typeof instance === "object" && !this.indexChange.has(instance)) {
            this.indexChange.set(instance, previousKey);
        }
    };
    ChangeTree.prototype.getIndexChange = function (instance) {
        return this.indexChange && this.indexChange.get(instance);
    };
    ChangeTree.prototype.deleteIndexChange = function (instance) {
        if (typeof instance === "object") {
            this.indexChange.delete(instance);
        }
    };
    ChangeTree.prototype.changeAll = function (obj) {
        if (obj instanceof Schema_1.Schema) {
            var schema = obj['_schema'];
            for (var field in schema) {
                // ensure ArraySchema and MapSchema already initialized
                // on its structure have a valid parent.
                if ((obj[field] instanceof Schema_1.Schema ||
                    obj[field] instanceof ArraySchema_1.ArraySchema ||
                    obj[field] instanceof MapSchema_1.MapSchema) &&
                    !obj[field].$changes.parent.parent) {
                    obj[field].$changes.parent = this;
                }
                if (obj[field] !== undefined) {
                    this.change(field);
                }
            }
        }
        else {
            var keys = Object.keys(obj);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (obj[key] !== undefined) {
                    this.change(key);
                }
            }
        }
    };
    ChangeTree.prototype.discard = function () {
        this.changed = false;
        this.changes.clear();
        this.deletedKeys = {};
        if (this.indexChange) {
            this.indexChange.clear();
        }
    };
    ChangeTree.prototype.clone = function () {
        return new ChangeTree(this.fieldIndexes, this.parentField, undefined);
    };
    return ChangeTree;
}());
exports.ChangeTree = ChangeTree;
//# sourceMappingURL=ChangeTree.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTypes = exports.deprecated = exports.filter = exports.type = exports.globalContext = exports.Context = void 0;
var ChangeTree_1 = __webpack_require__(13);
var Schema_1 = __webpack_require__(2);
var Context = /** @class */ (function () {
    function Context() {
        this.types = {};
        this.schemas = new Map();
    }
    Context.prototype.has = function (schema) {
        return this.schemas.has(schema);
    };
    Context.prototype.get = function (typeid) {
        return this.types[typeid];
    };
    Context.prototype.add = function (schema) {
        schema._typeid = this.schemas.size;
        this.types[schema._typeid] = schema;
        this.schemas.set(schema, schema._typeid);
    };
    return Context;
}());
exports.Context = Context;
exports.globalContext = new Context();
/**
 * `@type()` decorator for proxies
 */
function type(type, context) {
    if (context === void 0) { context = exports.globalContext; }
    return function (target, field) {
        var constructor = target.constructor;
        constructor._context = context;
        /*
         * static schema
         */
        if (!context.has(constructor)) {
            context.add(constructor);
            // support inheritance
            constructor._schema = Object.assign({}, constructor._schema || {});
            constructor._indexes = Object.assign({}, constructor._indexes || {});
            constructor._fieldsByIndex = Object.assign({}, constructor._fieldsByIndex || {});
            constructor._descriptors = Object.assign({}, constructor._descriptors || {});
            constructor._deprecated = Object.assign({}, constructor._deprecated || {});
        }
        var index = Object.keys(constructor._schema).length;
        constructor._fieldsByIndex[index] = field;
        constructor._indexes[field] = index;
        constructor._schema[field] = type;
        /**
         * skip if descriptor already exists for this field (`@deprecated()`)
         */
        if (constructor._descriptors[field]) {
            return;
        }
        /**
         * TODO: `isSchema` / `isArray` / `isMap` is repeated on many places!
         * need to refactor all of them.
         */
        var isArray = Array.isArray(type);
        var isMap = !isArray && type.map;
        var isSchema = (typeof (constructor._schema[field]) === "function");
        var fieldCached = "_" + field;
        constructor._descriptors[fieldCached] = {
            enumerable: false,
            configurable: false,
            writable: true,
        };
        constructor._descriptors[field] = {
            get: function () {
                return this[fieldCached];
            },
            set: function (value) {
                /**
                 * Create Proxy for array or map items
                 */
                if (isArray || isMap) {
                    value = new Proxy(value, {
                        get: function (obj, prop) { return obj[prop]; },
                        set: function (obj, prop, setValue) {
                            if (prop !== "length" && prop.indexOf("$") !== 0) {
                                // ensure new value has a parent
                                var key = (isArray) ? Number(prop) : String(prop);
                                if (!obj.$sorting) {
                                    // track index change
                                    var previousIndex = obj.$changes.getIndex(setValue);
                                    if (previousIndex !== undefined) {
                                        obj.$changes.mapIndexChange(setValue, previousIndex);
                                    }
                                    obj.$changes.mapIndex(setValue, key);
                                }
                                // if (isMap) {
                                //     obj._indexes.delete(prop);
                                // }
                                if (setValue instanceof Schema_1.Schema) {
                                    // new items are flagged with all changes
                                    if (!setValue.$changes.parent) {
                                        setValue.$changes = new ChangeTree_1.ChangeTree(setValue._indexes, key, obj.$changes);
                                        setValue.$changes.changeAll(setValue);
                                    }
                                }
                                else {
                                    obj[prop] = setValue;
                                }
                                // apply change on ArraySchema / MapSchema
                                obj.$changes.change(key);
                            }
                            else if (setValue !== obj[prop]) {
                                // console.log("SET NEW LENGTH:", setValue);
                                // console.log("PREVIOUS LENGTH: ", obj[prop]);
                            }
                            obj[prop] = setValue;
                            return true;
                        },
                        deleteProperty: function (obj, prop) {
                            var deletedValue = obj[prop];
                            if (isMap && deletedValue !== undefined) {
                                obj.$changes.deleteIndex(deletedValue);
                                obj.$changes.deleteIndexChange(deletedValue);
                                if (deletedValue.$changes) { // deletedValue may be a primitive value
                                    delete deletedValue.$changes.parent;
                                }
                                // obj._indexes.delete(prop);
                            }
                            delete obj[prop];
                            var key = (isArray) ? Number(prop) : String(prop);
                            obj.$changes.change(key, true);
                            return true;
                        },
                    });
                }
                // skip if value is the same as cached.
                if (value === this[fieldCached]) {
                    return;
                }
                this[fieldCached] = value;
                if (isArray) {
                    // directly assigning an array of items as value.
                    this.$changes.change(field);
                    value.$changes = new ChangeTree_1.ChangeTree({}, field, this.$changes);
                    for (var i = 0; i < value.length; i++) {
                        if (value[i] instanceof Schema_1.Schema) {
                            value[i].$changes = new ChangeTree_1.ChangeTree(value[i]._indexes, i, value.$changes);
                            value[i].$changes.changeAll(value[i]);
                        }
                        value.$changes.mapIndex(value[i], i);
                        value.$changes.change(i);
                    }
                }
                else if (isMap) {
                    // directly assigning a map
                    value.$changes = new ChangeTree_1.ChangeTree({}, field, this.$changes);
                    this.$changes.change(field);
                    for (var key in value) {
                        if (value[key] instanceof Schema_1.Schema) {
                            value[key].$changes = new ChangeTree_1.ChangeTree(value[key]._indexes, key, value.$changes);
                            value[key].$changes.changeAll(value[key]);
                        }
                        value.$changes.mapIndex(value[key], key);
                        value.$changes.change(key);
                    }
                }
                else if (isSchema) {
                    // directly assigning a `Schema` object
                    // value may be set to null
                    this.$changes.change(field);
                    if (value) {
                        value.$changes = new ChangeTree_1.ChangeTree(value._indexes, field, this.$changes);
                        value.$changes.changeAll(value);
                    }
                }
                else {
                    // directly assigning a primitive type
                    this.$changes.change(field);
                }
            },
            enumerable: true,
            configurable: true
        };
    };
}
exports.type = type;
/**
 * `@filter()` decorator for defining data filters per client
 */
function filter(cb) {
    return function (target, field) {
        var constructor = target.constructor;
        /*
         * static filters
         */
        if (!constructor._filters) {
            constructor._filters = {};
        }
        constructor._filters[field] = cb;
    };
}
exports.filter = filter;
/**
 * `@deprecated()` flag a field as deprecated.
 * The previous `@type()` annotation should remain along with this one.
 */
function deprecated(throws, context) {
    if (throws === void 0) { throws = true; }
    if (context === void 0) { context = exports.globalContext; }
    return function (target, field) {
        var constructor = target.constructor;
        constructor._deprecated[field] = true;
        if (throws) {
            constructor._descriptors[field] = {
                get: function () { throw new Error(field + " is deprecated."); },
                set: function (value) { },
                enumerable: false,
                configurable: true
            };
        }
    };
}
exports.deprecated = deprecated;
function defineTypes(target, fields, context) {
    if (context === void 0) { context = exports.globalContext; }
    for (var field in fields) {
        type(fields[field], context)(target.prototype, field);
    }
    return target;
}
exports.defineTypes = defineTypes;
//# sourceMappingURL=annotations.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = exports.FossilDeltaSerializer = exports.registerSerializer = void 0;
__webpack_require__(16);
var Client_1 = __webpack_require__(17);
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Protocol_1 = __webpack_require__(7);
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return Protocol_1.Protocol; } });
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return Protocol_1.ErrorCode; } });
var Room_1 = __webpack_require__(4);
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return Room_1.Room; } });
var Auth_1 = __webpack_require__(11);
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_1.Auth; } });
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return Auth_1.Platform; } });
/*
 * Serializers
 */
var FossilDeltaSerializer_1 = __webpack_require__(29);
Object.defineProperty(exports, "FossilDeltaSerializer", { enumerable: true, get: function () { return FossilDeltaSerializer_1.FossilDeltaSerializer; } });
var SchemaSerializer_1 = __webpack_require__(34);
Object.defineProperty(exports, "SchemaSerializer", { enumerable: true, get: function () { return SchemaSerializer_1.SchemaSerializer; } });
var Serializer_1 = __webpack_require__(6);
Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function () { return Serializer_1.registerSerializer; } });
Serializer_1.registerSerializer('fossil-delta', FossilDeltaSerializer_1.FossilDeltaSerializer);
Serializer_1.registerSerializer('schema', SchemaSerializer_1.SchemaSerializer);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

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


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.MatchMakeError = void 0;
var http_1 = __webpack_require__(3);
var ServerError_1 = __webpack_require__(18);
var Room_1 = __webpack_require__(4);
var Auth_1 = __webpack_require__(11);
var Push_1 = __webpack_require__(28);
var MatchMakeError = /** @class */ (function (_super) {
    __extends(MatchMakeError, _super);
    function MatchMakeError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        Object.setPrototypeOf(_this, MatchMakeError.prototype);
        return _this;
    }
    return MatchMakeError;
}(Error));
exports.MatchMakeError = MatchMakeError;
var Client = /** @class */ (function () {
    function Client(endpoint) {
        if (endpoint === void 0) { endpoint = location.protocol.replace("http", "ws") + "//" + location.hostname + (location.port && ":" + location.port); }
        this.endpoint = endpoint;
        this.auth = new Auth_1.Auth(this.endpoint);
        this.push = new Push_1.Push(this.endpoint);
    }
    Client.prototype.joinOrCreate = function (roomName, options, rootSchema) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMatchMakeRequest('joinOrCreate', roomName, options, rootSchema)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.create = function (roomName, options, rootSchema) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMatchMakeRequest('create', roomName, options, rootSchema)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.join = function (roomName, options, rootSchema) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMatchMakeRequest('join', roomName, options, rootSchema)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.joinById = function (roomId, options, rootSchema) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMatchMakeRequest('joinById', roomId, options, rootSchema)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.reconnect = function (roomId, sessionId, rootSchema) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMatchMakeRequest('joinById', roomId, { sessionId: sessionId }, rootSchema)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.getAvailableRooms = function (roomName) {
        if (roomName === void 0) { roomName = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.endpoint.replace("ws", "http") + "/matchmake/" + roomName;
                        return [4 /*yield*/, http_1.get(url, { headers: { 'Accept': 'application/json' } })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Client.prototype.consumeSeatReservation = function (response, rootSchema) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.createRoom(response.room.name, rootSchema);
                room.id = response.room.roomId;
                room.sessionId = response.sessionId;
                room.connect(this.buildEndpoint(response.room, { sessionId: room.sessionId }));
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var onError = function (code, message) { return reject(new ServerError_1.ServerError(code, message)); };
                        room.onError.once(onError);
                        room.onJoin.once(function () {
                            room.onError.remove(onError);
                            resolve(room);
                        });
                    })];
            });
        });
    };
    Client.prototype.createMatchMakeRequest = function (method, roomName, options, rootSchema) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.endpoint.replace("ws", "http") + "/matchmake/" + method + "/" + roomName;
                        // automatically forward auth token, if present
                        if (this.auth.hasToken) {
                            options.token = this.auth.token;
                        }
                        return [4 /*yield*/, http_1.post(url, {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(options)
                            })];
                    case 1:
                        response = (_a.sent()).data;
                        if (response.error) {
                            throw new MatchMakeError(response.error, response.code);
                        }
                        return [2 /*return*/, this.consumeSeatReservation(response, rootSchema)];
                }
            });
        });
    };
    Client.prototype.createRoom = function (roomName, rootSchema) {
        return new Room_1.Room(roomName, rootSchema);
    };
    Client.prototype.buildEndpoint = function (room, options) {
        if (options === void 0) { options = {}; }
        var params = [];
        for (var name_1 in options) {
            if (!options.hasOwnProperty(name_1)) {
                continue;
            }
            params.push(name_1 + "=" + options[name_1]);
        }
        return this.endpoint + "/" + room.processId + "/" + room.roomId + "?" + params.join('&');
    };
    return Client;
}());
exports.Client = Client;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ServerError";
        _this.code = code;
        return _this;
    }
    return ServerError;
}(Error));
exports.ServerError = ServerError;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) 2014 Ion Drive Software Ltd.
 * https://github.com/darrachequesne/notepack/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Patch for Colyseus:
 * -------------------
 *
 * added `offset` on Decoder constructor, for messages arriving with a code
 * before actual msgpack data
 */
function Decoder(buffer, offset) {
    this._offset = offset;
    if (buffer instanceof ArrayBuffer) {
        this._buffer = buffer;
        this._view = new DataView(this._buffer);
    }
    else if (ArrayBuffer.isView(buffer)) {
        this._buffer = buffer.buffer;
        this._view = new DataView(this._buffer, buffer.byteOffset, buffer.byteLength);
    }
    else {
        throw new Error('Invalid argument');
    }
}
function utf8Read(view, offset, length) {
    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
        var byte = view.getUint8(i);
        if ((byte & 0x80) === 0x00) {
            string += String.fromCharCode(byte);
            continue;
        }
        if ((byte & 0xe0) === 0xc0) {
            string += String.fromCharCode(((byte & 0x1f) << 6) |
                (view.getUint8(++i) & 0x3f));
            continue;
        }
        if ((byte & 0xf0) === 0xe0) {
            string += String.fromCharCode(((byte & 0x0f) << 12) |
                ((view.getUint8(++i) & 0x3f) << 6) |
                ((view.getUint8(++i) & 0x3f) << 0));
            continue;
        }
        if ((byte & 0xf8) === 0xf0) {
            chr = ((byte & 0x07) << 18) |
                ((view.getUint8(++i) & 0x3f) << 12) |
                ((view.getUint8(++i) & 0x3f) << 6) |
                ((view.getUint8(++i) & 0x3f) << 0);
            if (chr >= 0x010000) { // surrogate pair
                chr -= 0x010000;
                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
            }
            else {
                string += String.fromCharCode(chr);
            }
            continue;
        }
        throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
}
Decoder.prototype._array = function (length) {
    var value = new Array(length);
    for (var i = 0; i < length; i++) {
        value[i] = this._parse();
    }
    return value;
};
Decoder.prototype._map = function (length) {
    var key = '', value = {};
    for (var i = 0; i < length; i++) {
        key = this._parse();
        value[key] = this._parse();
    }
    return value;
};
Decoder.prototype._str = function (length) {
    var value = utf8Read(this._view, this._offset, length);
    this._offset += length;
    return value;
};
Decoder.prototype._bin = function (length) {
    var value = this._buffer.slice(this._offset, this._offset + length);
    this._offset += length;
    return value;
};
Decoder.prototype._parse = function () {
    var prefix = this._view.getUint8(this._offset++);
    var value, length = 0, type = 0, hi = 0, lo = 0;
    if (prefix < 0xc0) {
        // positive fixint
        if (prefix < 0x80) {
            return prefix;
        }
        // fixmap
        if (prefix < 0x90) {
            return this._map(prefix & 0x0f);
        }
        // fixarray
        if (prefix < 0xa0) {
            return this._array(prefix & 0x0f);
        }
        // fixstr
        return this._str(prefix & 0x1f);
    }
    // negative fixint
    if (prefix > 0xdf) {
        return (0xff - prefix + 1) * -1;
    }
    switch (prefix) {
        // nil
        case 0xc0:
            return null;
        // false
        case 0xc2:
            return false;
        // true
        case 0xc3:
            return true;
        // bin
        case 0xc4:
            length = this._view.getUint8(this._offset);
            this._offset += 1;
            return this._bin(length);
        case 0xc5:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._bin(length);
        case 0xc6:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._bin(length);
        // ext
        case 0xc7:
            length = this._view.getUint8(this._offset);
            type = this._view.getInt8(this._offset + 1);
            this._offset += 2;
            return [type, this._bin(length)];
        case 0xc8:
            length = this._view.getUint16(this._offset);
            type = this._view.getInt8(this._offset + 2);
            this._offset += 3;
            return [type, this._bin(length)];
        case 0xc9:
            length = this._view.getUint32(this._offset);
            type = this._view.getInt8(this._offset + 4);
            this._offset += 5;
            return [type, this._bin(length)];
        // float
        case 0xca:
            value = this._view.getFloat32(this._offset);
            this._offset += 4;
            return value;
        case 0xcb:
            value = this._view.getFloat64(this._offset);
            this._offset += 8;
            return value;
        // uint
        case 0xcc:
            value = this._view.getUint8(this._offset);
            this._offset += 1;
            return value;
        case 0xcd:
            value = this._view.getUint16(this._offset);
            this._offset += 2;
            return value;
        case 0xce:
            value = this._view.getUint32(this._offset);
            this._offset += 4;
            return value;
        case 0xcf:
            hi = this._view.getUint32(this._offset) * Math.pow(2, 32);
            lo = this._view.getUint32(this._offset + 4);
            this._offset += 8;
            return hi + lo;
        // int
        case 0xd0:
            value = this._view.getInt8(this._offset);
            this._offset += 1;
            return value;
        case 0xd1:
            value = this._view.getInt16(this._offset);
            this._offset += 2;
            return value;
        case 0xd2:
            value = this._view.getInt32(this._offset);
            this._offset += 4;
            return value;
        case 0xd3:
            hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
            lo = this._view.getUint32(this._offset + 4);
            this._offset += 8;
            return hi + lo;
        // fixext
        case 0xd4:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            if (type === 0x00) {
                this._offset += 1;
                return void 0;
            }
            return [type, this._bin(1)];
        case 0xd5:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            return [type, this._bin(2)];
        case 0xd6:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            return [type, this._bin(4)];
        case 0xd7:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            if (type === 0x00) {
                hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
                lo = this._view.getUint32(this._offset + 4);
                this._offset += 8;
                return new Date(hi + lo);
            }
            return [type, this._bin(8)];
        case 0xd8:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            return [type, this._bin(16)];
        // str
        case 0xd9:
            length = this._view.getUint8(this._offset);
            this._offset += 1;
            return this._str(length);
        case 0xda:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._str(length);
        case 0xdb:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._str(length);
        // array
        case 0xdc:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._array(length);
        case 0xdd:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._array(length);
        // map
        case 0xde:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._map(length);
        case 0xdf:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._map(length);
    }
    throw new Error('Could not parse');
};
function decode(buffer, offset) {
    if (offset === void 0) { offset = 0; }
    var decoder = new Decoder(buffer, offset);
    var value = decoder._parse();
    if (decoder._offset !== buffer.byteLength) {
        throw new Error((buffer.byteLength - decoder._offset) + ' trailing bytes');
    }
    return value;
}
exports.default = decode;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) 2014 Ion Drive Software Ltd.
 * https://github.com/darrachequesne/notepack/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function utf8Write(view, offset, str) {
    var c = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            view.setUint8(offset++, c);
        }
        else if (c < 0x800) {
            view.setUint8(offset++, 0xc0 | (c >> 6));
            view.setUint8(offset++, 0x80 | (c & 0x3f));
        }
        else if (c < 0xd800 || c >= 0xe000) {
            view.setUint8(offset++, 0xe0 | (c >> 12));
            view.setUint8(offset++, 0x80 | (c >> 6) & 0x3f);
            view.setUint8(offset++, 0x80 | (c & 0x3f));
        }
        else {
            i++;
            c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
            view.setUint8(offset++, 0xf0 | (c >> 18));
            view.setUint8(offset++, 0x80 | (c >> 12) & 0x3f);
            view.setUint8(offset++, 0x80 | (c >> 6) & 0x3f);
            view.setUint8(offset++, 0x80 | (c & 0x3f));
        }
    }
}
function utf8Length(str) {
    var c = 0, length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}
function _encode(bytes, defers, value) {
    var type = typeof value, i = 0, l = 0, hi = 0, lo = 0, length = 0, size = 0;
    if (type === 'string') {
        length = utf8Length(value);
        // fixstr
        if (length < 0x20) {
            bytes.push(length | 0xa0);
            size = 1;
        }
        // str 8
        else if (length < 0x100) {
            bytes.push(0xd9, length);
            size = 2;
        }
        // str 16
        else if (length < 0x10000) {
            bytes.push(0xda, length >> 8, length);
            size = 3;
        }
        // str 32
        else if (length < 0x100000000) {
            bytes.push(0xdb, length >> 24, length >> 16, length >> 8, length);
            size = 5;
        }
        else {
            throw new Error('String too long');
        }
        defers.push({ _str: value, _length: length, _offset: bytes.length });
        return size + length;
    }
    if (type === 'number') {
        // TODO: encode to float 32?
        // float 64
        if (Math.floor(value) !== value || !isFinite(value)) {
            bytes.push(0xcb);
            defers.push({ _float: value, _length: 8, _offset: bytes.length });
            return 9;
        }
        if (value >= 0) {
            // positive fixnum
            if (value < 0x80) {
                bytes.push(value);
                return 1;
            }
            // uint 8
            if (value < 0x100) {
                bytes.push(0xcc, value);
                return 2;
            }
            // uint 16
            if (value < 0x10000) {
                bytes.push(0xcd, value >> 8, value);
                return 3;
            }
            // uint 32
            if (value < 0x100000000) {
                bytes.push(0xce, value >> 24, value >> 16, value >> 8, value);
                return 5;
            }
            // uint 64
            hi = (value / Math.pow(2, 32)) >> 0;
            lo = value >>> 0;
            bytes.push(0xcf, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
            return 9;
        }
        else {
            // negative fixnum
            if (value >= -0x20) {
                bytes.push(value);
                return 1;
            }
            // int 8
            if (value >= -0x80) {
                bytes.push(0xd0, value);
                return 2;
            }
            // int 16
            if (value >= -0x8000) {
                bytes.push(0xd1, value >> 8, value);
                return 3;
            }
            // int 32
            if (value >= -0x80000000) {
                bytes.push(0xd2, value >> 24, value >> 16, value >> 8, value);
                return 5;
            }
            // int 64
            hi = Math.floor(value / Math.pow(2, 32));
            lo = value >>> 0;
            bytes.push(0xd3, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
            return 9;
        }
    }
    if (type === 'object') {
        // nil
        if (value === null) {
            bytes.push(0xc0);
            return 1;
        }
        if (Array.isArray(value)) {
            length = value.length;
            // fixarray
            if (length < 0x10) {
                bytes.push(length | 0x90);
                size = 1;
            }
            // array 16
            else if (length < 0x10000) {
                bytes.push(0xdc, length >> 8, length);
                size = 3;
            }
            // array 32
            else if (length < 0x100000000) {
                bytes.push(0xdd, length >> 24, length >> 16, length >> 8, length);
                size = 5;
            }
            else {
                throw new Error('Array too large');
            }
            for (i = 0; i < length; i++) {
                size += _encode(bytes, defers, value[i]);
            }
            return size;
        }
        // fixext 8 / Date
        if (value instanceof Date) {
            var time = value.getTime();
            hi = Math.floor(time / Math.pow(2, 32));
            lo = time >>> 0;
            bytes.push(0xd7, 0, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
            return 10;
        }
        if (value instanceof ArrayBuffer) {
            length = value.byteLength;
            // bin 8
            if (length < 0x100) {
                bytes.push(0xc4, length);
                size = 2;
            }
            else 
            // bin 16
            if (length < 0x10000) {
                bytes.push(0xc5, length >> 8, length);
                size = 3;
            }
            else 
            // bin 32
            if (length < 0x100000000) {
                bytes.push(0xc6, length >> 24, length >> 16, length >> 8, length);
                size = 5;
            }
            else {
                throw new Error('Buffer too large');
            }
            defers.push({ _bin: value, _length: length, _offset: bytes.length });
            return size + length;
        }
        if (typeof value.toJSON === 'function') {
            return _encode(bytes, defers, value.toJSON());
        }
        var keys = [], key = '';
        var allKeys = Object.keys(value);
        for (i = 0, l = allKeys.length; i < l; i++) {
            key = allKeys[i];
            if (typeof value[key] !== 'function') {
                keys.push(key);
            }
        }
        length = keys.length;
        // fixmap
        if (length < 0x10) {
            bytes.push(length | 0x80);
            size = 1;
        }
        // map 16
        else if (length < 0x10000) {
            bytes.push(0xde, length >> 8, length);
            size = 3;
        }
        // map 32
        else if (length < 0x100000000) {
            bytes.push(0xdf, length >> 24, length >> 16, length >> 8, length);
            size = 5;
        }
        else {
            throw new Error('Object too large');
        }
        for (i = 0; i < length; i++) {
            key = keys[i];
            size += _encode(bytes, defers, key);
            size += _encode(bytes, defers, value[key]);
        }
        return size;
    }
    // false/true
    if (type === 'boolean') {
        bytes.push(value ? 0xc3 : 0xc2);
        return 1;
    }
    // fixext 1 / undefined
    if (type === 'undefined') {
        bytes.push(0xd4, 0, 0);
        return 3;
    }
    throw new Error('Could not encode');
}
function encode(value) {
    var bytes = [];
    var defers = [];
    var size = _encode(bytes, defers, value);
    var buf = new ArrayBuffer(size);
    var view = new DataView(buf);
    var deferIndex = 0;
    var deferWritten = 0;
    var nextOffset = -1;
    if (defers.length > 0) {
        nextOffset = defers[0]._offset;
    }
    var defer, deferLength = 0, offset = 0;
    for (var i = 0, l = bytes.length; i < l; i++) {
        view.setUint8(deferWritten + i, bytes[i]);
        if (i + 1 !== nextOffset) {
            continue;
        }
        defer = defers[deferIndex];
        deferLength = defer._length;
        offset = deferWritten + nextOffset;
        if (defer._bin) {
            var bin = new Uint8Array(defer._bin);
            for (var j = 0; j < deferLength; j++) {
                view.setUint8(offset + j, bin[j]);
            }
        }
        else if (defer._str) {
            utf8Write(view, offset, defer._str);
        }
        else if (defer._float !== undefined) {
            view.setFloat64(offset, defer._float);
        }
        deferIndex++;
        deferWritten += deferLength;
        if (defers[deferIndex]) {
            nextOffset = defers[deferIndex]._offset;
        }
    }
    return buf;
}
exports.default = encode;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.handlers = [];
    }
    EventEmitter.prototype.register = function (cb, once) {
        if (once === void 0) { once = false; }
        this.handlers.push(cb);
        return this;
    };
    EventEmitter.prototype.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.handlers.forEach(function (handler) { return handler.apply(void 0, args); });
    };
    EventEmitter.prototype.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Promise.all(this.handlers.map(function (handler) { return handler.apply(void 0, args); }));
    };
    EventEmitter.prototype.remove = function (cb) {
        var index = this.handlers.indexOf(cb);
        this.handlers[index] = this.handlers[this.handlers.length - 1];
        this.handlers.pop();
    };
    EventEmitter.prototype.clear = function () {
        this.handlers = [];
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
function createSignal() {
    var emitter = new EventEmitter();
    function register(cb) {
        return emitter.register(cb, this === null);
    }
    ;
    register.once = function (cb) {
        var callback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            cb.apply(void 0, args);
            emitter.remove(callback);
        };
        emitter.register(callback);
    };
    register.remove = function (cb) { return emitter.remove(cb); };
    register.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return emitter.invoke.apply(emitter, args);
    };
    register.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return emitter.invokeAsync.apply(emitter, args);
    };
    register.clear = function () { return emitter.clear(); };
    return register;
}
exports.createSignal = createSignal;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNanoEvents", function() { return createNanoEvents; });
let createNanoEvents = () => ({
  events: {},
  emit (event, ...args) {
    for (let i of this.events[event] || []) {
      i(...args)
    }
  },
  on (event, cb) {
    ;(this.events[event] = this.events[event] || []).push(cb)
    return () => (this.events[event] = this.events[event].filter(i => i !== cb))
  }
})




/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
var websocket_1 = __importDefault(__webpack_require__(24));
var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    function Connection(url, autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        var _this = _super.call(this, url, undefined, { connect: autoConnect }) || this;
        _this._enqueuedCalls = [];
        return _this;
    }
    Connection.prototype.onOpenCallback = function (event) {
        _super.prototype.onOpenCallback.call(this);
        this.binaryType = 'arraybuffer';
        if (this._enqueuedCalls.length > 0) {
            for (var _i = 0, _a = this._enqueuedCalls; _i < _a.length; _i++) {
                var _b = _a[_i], method = _b[0], args = _b[1];
                this[method].apply(this, args);
            }
            // clear enqueued calls.
            this._enqueuedCalls = [];
        }
    };
    Connection.prototype.send = function (data) {
        if (this.ws.readyState === websocket_1.default.OPEN) {
            if (data instanceof ArrayBuffer) {
                return _super.prototype.send.call(this, data);
            }
            else if (Array.isArray(data)) {
                return _super.prototype.send.call(this, (new Uint8Array(data)).buffer);
            }
        }
        else {
            // WebSocket not connected.
            // Enqueue data to be sent when readyState == OPEN
            this._enqueuedCalls.push(['send', [data]]);
        }
    };
    return Connection;
}(websocket_1.default));
exports.Connection = Connection;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var createBackoff=__webpack_require__(25).createBackoff;var WebSocketImpl=typeof WebSocket!=="undefined"?WebSocket:__webpack_require__(26);var WebSocketClient=function(){/**
   * @param url DOMString The URL to which to connect; this should be the URL to which the WebSocket server will respond.
   * @param protocols DOMString|DOMString[] Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol). If you don't specify a protocol string, an empty string is assumed.
   */function WebSocketClient(url,protocols){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,WebSocketClient);this.url=url;this.protocols=protocols;this.reconnectEnabled=true;this.listeners={};this.backoff=createBackoff(options.backoff||'exponential',options);this.backoff.onReady=this.onBackoffReady.bind(this);if(typeof options.connect==="undefined"||options.connect){this.open();}}_createClass(WebSocketClient,[{key:'open',value:function open(){var reconnect=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;this.isReconnect=reconnect;// keep binaryType used on previous WebSocket connection
var binaryType=this.ws&&this.ws.binaryType;this.ws=new WebSocketImpl(this.url,this.protocols);this.ws.onclose=this.onCloseCallback.bind(this);this.ws.onerror=this.onErrorCallback.bind(this);this.ws.onmessage=this.onMessageCallback.bind(this);this.ws.onopen=this.onOpenCallback.bind(this);if(binaryType){this.ws.binaryType=binaryType;}}/**
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
 */WebSocketClient.CONNECTING=WebSocketImpl.CONNECTING;/**
 * The connection is open and ready to communicate.
 */WebSocketClient.OPEN=WebSocketImpl.OPEN;/**
 * The connection is in the process of closing.
 */WebSocketClient.CLOSING=WebSocketImpl.CLOSING;/**
 * The connection is closed or couldn't be opened.
 */WebSocketClient.CLOSED=WebSocketImpl.CLOSED;exports.default=WebSocketClient;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.createBackoff=createBackoff;var backoff={exponential:function exponential(attempt,delay){return Math.floor(Math.random()*Math.pow(2,attempt)*delay);},fibonacci:function fibonacci(attempt,delay){var current=1;if(attempt>current){var prev=1,current=2;for(var index=2;index<attempt;index++){var next=prev+current;prev=current;current=next;}}return Math.floor(Math.random()*current*delay);}};function createBackoff(type,options){return new Backoff(backoff[type],options);}function Backoff(func,options){this.func=func;this.attempts=0;this.delay=typeof options.initialDelay!=="undefined"?options.initialDelay:100;}Backoff.prototype.backoff=function(){setTimeout(this.onReady,this.func(++this.attempts,this.delay));};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../typings/cocos-creator.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = exports.removeItem = exports.setItem = void 0;
/**
 * We do not assign 'storage' to window.localStorage immediatelly for React
 * Native compatibility. window.localStorage is not present when this module is
 * loaded.
 */
var storage;
function getStorage() {
    if (!storage) {
        storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
            ? cc.sys.localStorage // compatibility with cocos creator
            : typeof (window) !== "undefined" && window.localStorage //RN does have window object at this point, but localStorage is not defined
                ? window.localStorage // regular browser environment
                : {
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
exports.setItem = setItem;
function removeItem(key) {
    getStorage().removeItem(key);
}
exports.removeItem = removeItem;
function getItem(key, callback) {
    var value = getStorage().getItem(key);
    if (typeof (Promise) === 'undefined' || // old browsers
        !(value instanceof Promise)) {
        // browser has synchronous return
        callback(value);
    }
    else {
        // react-native is asynchronous
        value.then(function (id) { return callback(id); });
    }
}
exports.getItem = getItem;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
var Push = /** @class */ (function () {
    function Push(endpoint) {
        this.endpoint = endpoint.replace("ws", "http");
    }
    Push.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.check();
                        return [4 /*yield*/, this.registerServiceWorker()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.requestNotificationPermission()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    Push.prototype.registerServiceWorker = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, navigator.serviceWorker.register(this.endpoint + "/push")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Push.prototype.requestNotificationPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window["Notification"].requestPermission()];
                    case 1:
                        permission = _a.sent();
                        // value of permission can be 'granted', 'default', 'denied'
                        // granted: user has accepted the request
                        // default: user has dismissed the notification permission popup by clicking on x
                        // denied: user has denied the request.
                        if (permission !== "granted") {
                            throw new Error("Permission not granted for Notification");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Push.prototype.check = function () {
        if (!("serviceWorker" in navigator)) {
            throw new Error("No Service Worker support!");
        }
        if (!("PushManager" in window)) {
            throw new Error("No Push API Support!");
        }
    };
    return Push;
}());
exports.Push = Push;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FossilDeltaSerializer = void 0;
var state_listener_1 = __webpack_require__(30);
var fossilDelta = __importStar(__webpack_require__(33));
var msgpack = __importStar(__webpack_require__(5));
var FossilDeltaSerializer = /** @class */ (function () {
    function FossilDeltaSerializer() {
        this.api = new state_listener_1.StateContainer({});
    }
    FossilDeltaSerializer.prototype.getState = function () {
        return this.api.state;
    };
    FossilDeltaSerializer.prototype.setState = function (encodedState) {
        this.previousState = new Uint8Array(encodedState);
        this.api.set(msgpack.decode(this.previousState));
    };
    FossilDeltaSerializer.prototype.patch = function (binaryPatch) {
        // apply patch
        this.previousState = new Uint8Array(fossilDelta.apply(this.previousState, binaryPatch));
        // trigger update callbacks
        this.api.set(msgpack.decode(this.previousState));
    };
    FossilDeltaSerializer.prototype.teardown = function () {
        this.api.removeAllListeners();
    };
    return FossilDeltaSerializer;
}());
exports.FossilDeltaSerializer = FossilDeltaSerializer;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StateContainer_1 = __webpack_require__(31);
exports.StateContainer = StateContainer_1.StateContainer;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = __webpack_require__(32);
var StateContainer = /** @class */ (function () {
    function StateContainer(state) {
        this.listeners = [];
        this.matcherPlaceholders = {
            ":id": /^([a-zA-Z0-9\-_]+)$/,
            ":number": /^([0-9]+)$/,
            ":string": /^(\w+)$/,
            ":axis": /^([xyz])$/,
            ":*": /(.*)/,
        };
        this.state = state;
        this.reset();
    }
    StateContainer.prototype.set = function (newState) {
        var patches = compare_1.compare(this.state, newState);
        this.state = newState;
        this.checkPatches(patches, this.listeners, this.defaultListener);
        return patches;
    };
    StateContainer.prototype.registerPlaceholder = function (placeholder, matcher) {
        this.matcherPlaceholders[placeholder] = matcher;
    };
    StateContainer.prototype.listen = function (segments, callback, immediate) {
        var _this = this;
        var rules;
        if (typeof (segments) === "function") {
            rules = [];
            callback = segments;
        }
        else {
            rules = segments.split("/");
        }
        if (callback.length > 1) {
            console.warn(".listen() accepts only one parameter.");
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
        // immediatelly try to trigger this listener.
        if (immediate) {
            this.checkPatches(compare_1.compare({}, this.state), [listener]);
        }
        return listener;
    };
    StateContainer.prototype.removeListener = function (listener) {
        for (var i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i] === listener) {
                this.listeners.splice(i, 1);
            }
        }
    };
    StateContainer.prototype.removeAllListeners = function () {
        this.reset();
    };
    StateContainer.prototype.checkPatches = function (patches, listeners, defaultListener) {
        for (var j = 0, len = listeners.length; j < len; j++) {
            var listener = listeners[j];
            for (var i = patches.length - 1; i >= 0; i--) {
                var pathVariables = listener && this.getPathVariables(patches[i], listener);
                if (pathVariables) {
                    listener.callback({
                        path: pathVariables,
                        rawPath: patches[i].path,
                        operation: patches[i].operation,
                        value: patches[i].value
                    });
                    patches[i].matched = true;
                }
            }
        }
        // trigger default listener callback with each unmatched patch
        if (defaultListener) {
            for (var i = patches.length - 1; i >= 0; i--) {
                if (!patches[i].matched) {
                    defaultListener.callback(patches[i]);
                }
            }
        }
    };
    StateContainer.prototype.getPathVariables = function (patch, listener) {
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
    StateContainer.prototype.reset = function () {
        this.listeners = [];
    };
    return StateContainer;
}());
exports.StateContainer = StateContainer;


/***/ }),
/* 32 */
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
                    patches.push({
                        operation: "replace",
                        path: concat(path, key),
                        value: newVal,
                        previousValue: oldVal
                    });
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
    for (var t = newKeys.length - 1; t >= 0; t--) {
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

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
  if ( true && module.exports) module.exports = factory();
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = void 0;
var schema_1 = __webpack_require__(12);
var SchemaSerializer = /** @class */ (function () {
    function SchemaSerializer() {
    }
    SchemaSerializer.prototype.setState = function (rawState) {
        this.state.decode(rawState);
    };
    SchemaSerializer.prototype.getState = function () {
        return this.state;
    };
    SchemaSerializer.prototype.patch = function (patches) {
        this.state.decode(patches);
    };
    SchemaSerializer.prototype.teardown = function () {
        // this.state.onRemove
    };
    SchemaSerializer.prototype.handshake = function (bytes, it) {
        if (this.state) {
            // validate client/server definitinos
            var reflection = new schema_1.Reflection();
            reflection.decode(bytes, it);
        }
        else {
            // initialize reflected state from server
            this.state = schema_1.Reflection.decode(bytes);
        }
    };
    return SchemaSerializer;
}());
exports.SchemaSerializer = SchemaSerializer;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Extracted from https://www.npmjs.com/package/strong-events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.handlers = [];
    }
    EventEmitter.prototype.register = function (cb, once) {
        if (once === void 0) { once = false; }
        this.handlers.push(cb);
        return this;
    };
    EventEmitter.prototype.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.handlers.forEach(function (handler) { return handler.apply(void 0, args); });
    };
    EventEmitter.prototype.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Promise.all(this.handlers.map(function (handler) { return handler.apply(void 0, args); }));
    };
    EventEmitter.prototype.remove = function (cb) {
        var index = this.handlers.indexOf(cb);
        this.handlers[index] = this.handlers[this.handlers.length - 1];
        this.handlers.pop();
    };
    EventEmitter.prototype.clear = function () {
        this.handlers = [];
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpChanges = void 0;
var _1 = __webpack_require__(12);
var MapSchema_1 = __webpack_require__(1);
var ArraySchema_1 = __webpack_require__(0);
function dumpChanges(schema) {
    var dump = {};
    var $changes = schema.$changes;
    var fieldsByIndex = schema['_fieldsByIndex'] || {};
    for (var _i = 0, _a = Array.from($changes.changes); _i < _a.length; _i++) {
        var fieldIndex = _a[_i];
        var field = fieldsByIndex[fieldIndex] || fieldIndex;
        if (schema[field] instanceof MapSchema_1.MapSchema ||
            schema[field] instanceof ArraySchema_1.ArraySchema ||
            schema[field] instanceof _1.Schema) {
            dump[field] = dumpChanges(schema[field]);
        }
        else {
            dump[field] = schema[field];
        }
    }
    return dump;
}
exports.dumpChanges = dumpChanges;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflection = exports.ReflectionType = exports.ReflectionField = void 0;
var annotations_1 = __webpack_require__(14);
var Schema_1 = __webpack_require__(2);
var ArraySchema_1 = __webpack_require__(0);
var MapSchema_1 = __webpack_require__(1);
var reflectionContext = new annotations_1.Context();
/**
 * Reflection
 */
var ReflectionField = /** @class */ (function (_super) {
    __extends(ReflectionField, _super);
    function ReflectionField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        annotations_1.type("string", reflectionContext)
    ], ReflectionField.prototype, "name", void 0);
    __decorate([
        annotations_1.type("string", reflectionContext)
    ], ReflectionField.prototype, "type", void 0);
    __decorate([
        annotations_1.type("uint8", reflectionContext)
    ], ReflectionField.prototype, "referencedType", void 0);
    return ReflectionField;
}(Schema_1.Schema));
exports.ReflectionField = ReflectionField;
var ReflectionType = /** @class */ (function (_super) {
    __extends(ReflectionType, _super);
    function ReflectionType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = new ArraySchema_1.ArraySchema();
        return _this;
    }
    __decorate([
        annotations_1.type("uint8", reflectionContext)
    ], ReflectionType.prototype, "id", void 0);
    __decorate([
        annotations_1.type([ReflectionField], reflectionContext)
    ], ReflectionType.prototype, "fields", void 0);
    return ReflectionType;
}(Schema_1.Schema));
exports.ReflectionType = ReflectionType;
var Reflection = /** @class */ (function (_super) {
    __extends(Reflection, _super);
    function Reflection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.types = new ArraySchema_1.ArraySchema();
        return _this;
    }
    Reflection.encode = function (instance) {
        var rootSchemaType = instance.constructor;
        var reflection = new Reflection();
        reflection.rootType = rootSchemaType._typeid;
        var buildType = function (currentType, schema) {
            for (var fieldName in schema) {
                var field = new ReflectionField();
                field.name = fieldName;
                var fieldType = void 0;
                if (typeof (schema[fieldName]) === "string") {
                    fieldType = schema[fieldName];
                }
                else {
                    var isSchema = typeof (schema[fieldName]) === "function";
                    var isArray = Array.isArray(schema[fieldName]);
                    var isMap = !isArray && schema[fieldName].map;
                    var childTypeSchema = void 0;
                    if (isSchema) {
                        fieldType = "ref";
                        childTypeSchema = schema[fieldName];
                    }
                    else if (isArray) {
                        fieldType = "array";
                        if (typeof (schema[fieldName][0]) === "string") {
                            fieldType += ":" + schema[fieldName][0]; // array:string
                        }
                        else {
                            childTypeSchema = schema[fieldName][0];
                        }
                    }
                    else if (isMap) {
                        fieldType = "map";
                        if (typeof (schema[fieldName].map) === "string") {
                            fieldType += ":" + schema[fieldName].map; // array:string
                        }
                        else {
                            childTypeSchema = schema[fieldName].map;
                        }
                    }
                    field.referencedType = (childTypeSchema)
                        ? childTypeSchema._typeid
                        : 255;
                }
                field.type = fieldType;
                currentType.fields.push(field);
            }
            reflection.types.push(currentType);
        };
        var types = rootSchemaType._context.types;
        for (var typeid in types) {
            var type_1 = new ReflectionType();
            type_1.id = Number(typeid);
            buildType(type_1, types[typeid]._schema);
        }
        return reflection.encodeAll();
    };
    Reflection.decode = function (bytes) {
        var context = new annotations_1.Context();
        var reflection = new Reflection();
        reflection.decode(bytes);
        var schemaTypes = reflection.types.reduce(function (types, reflectionType) {
            types[reflectionType.id] = /** @class */ (function (_super) {
                __extends(_, _super);
                function _() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return _;
            }(Schema_1.Schema));
            return types;
        }, {});
        reflection.types.forEach(function (reflectionType, i) {
            reflectionType.fields.forEach(function (field) {
                var schemaType = schemaTypes[reflectionType.id];
                if (field.referencedType !== undefined) {
                    var refType = schemaTypes[field.referencedType];
                    // map or array of primitive type (255)
                    if (!refType) {
                        refType = field.type.split(":")[1];
                    }
                    if (field.type.indexOf("array") === 0) {
                        annotations_1.type([refType], context)(schemaType.prototype, field.name);
                    }
                    else if (field.type.indexOf("map") === 0) {
                        annotations_1.type({ map: refType }, context)(schemaType.prototype, field.name);
                    }
                    else if (field.type === "ref") {
                        annotations_1.type(refType, context)(schemaType.prototype, field.name);
                    }
                }
                else {
                    annotations_1.type(field.type, context)(schemaType.prototype, field.name);
                }
            });
        });
        var rootType = schemaTypes[reflection.rootType];
        var rootInstance = new rootType();
        /**
         * auto-initialize referenced types on root type
         * to allow registering listeners immediatelly on client-side
         */
        for (var fieldName in rootType._schema) {
            var fieldType = rootType._schema[fieldName];
            if (typeof (fieldType) !== "string") {
                var isSchema = typeof (fieldType) === "function";
                var isArray = Array.isArray(fieldType);
                var isMap = !isArray && fieldType.map;
                rootInstance[fieldName] = (isArray)
                    ? new ArraySchema_1.ArraySchema()
                    : (isMap)
                        ? new MapSchema_1.MapSchema()
                        : (isSchema)
                            ? new fieldType()
                            : undefined;
            }
        }
        return rootInstance;
    };
    __decorate([
        annotations_1.type([ReflectionType], reflectionContext)
    ], Reflection.prototype, "types", void 0);
    __decorate([
        annotations_1.type("uint8", reflectionContext)
    ], Reflection.prototype, "rootType", void 0);
    return Reflection;
}(Schema_1.Schema));
exports.Reflection = Reflection;
//# sourceMappingURL=Reflection.js.map

/***/ })
/******/ ]);
});