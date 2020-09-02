/*! colyseus.js@0.14.0-alpha.9 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION = exports.TYPE_ID = exports.SWITCH_TO_STRUCTURE = void 0;
// export const SWITCH_TO_STRUCTURE = 193; (easily collides with DELETE_AND_ADD + fieldIndex = 2)
exports.SWITCH_TO_STRUCTURE = 255; // (decoding collides with DELETE_AND_ADD + fieldIndex = 63)
exports.TYPE_ID = 213;
/**
 * Encoding Schema field operations.
 */
var OPERATION;
(function (OPERATION) {
    // add new structure/primitive
    OPERATION[OPERATION["ADD"] = 128] = "ADD";
    // replace structure/primitive
    OPERATION[OPERATION["REPLACE"] = 0] = "REPLACE";
    // delete field
    OPERATION[OPERATION["DELETE"] = 64] = "DELETE";
    // DELETE field, followed by an ADD
    OPERATION[OPERATION["DELETE_AND_ADD"] = 192] = "DELETE_AND_ADD";
    // TOUCH is used to determine hierarchy of nested Schema structures during serialization.
    // touches are NOT encoded.
    OPERATION[OPERATION["TOUCH"] = 1] = "TOUCH";
    // MapSchema Operations
    OPERATION[OPERATION["CLEAR"] = 10] = "CLEAR";
})(OPERATION = exports.OPERATION || (exports.OPERATION = {}));
// export enum OPERATION {
//     // add new structure/primitive
//     // (128)
//     ADD = 128, // 10000000,
//     // replace structure/primitive
//     REPLACE = 1,// 00000001
//     // delete field
//     DELETE = 192, // 11000000
//     // DELETE field, followed by an ADD
//     DELETE_AND_ADD = 224, // 11100000
//     // TOUCH is used to determine hierarchy of nested Schema structures during serialization.
//     // touches are NOT encoded.
//     TOUCH = 0, // 00000000
//     // MapSchema Operations
//     CLEAR = 10,
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlHQUFpRztBQUNwRixRQUFBLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxDQUFDLDREQUE0RDtBQUN2RixRQUFBLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFFM0I7O0dBRUc7QUFDSCxJQUFZLFNBbUJYO0FBbkJELFdBQVksU0FBUztJQUNqQiw4QkFBOEI7SUFDOUIseUNBQVMsQ0FBQTtJQUVULDhCQUE4QjtJQUM5QiwrQ0FBVyxDQUFBO0lBRVgsZUFBZTtJQUNmLDhDQUFXLENBQUE7SUFFWCxtQ0FBbUM7SUFDbkMsK0RBQW9CLENBQUE7SUFFcEIseUZBQXlGO0lBQ3pGLDJCQUEyQjtJQUMzQiwyQ0FBUyxDQUFBO0lBRVQsdUJBQXVCO0lBQ3ZCLDRDQUFVLENBQUE7QUFDZCxDQUFDLEVBbkJXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBbUJwQjtBQUVELDBCQUEwQjtBQUMxQixxQ0FBcUM7QUFDckMsZUFBZTtBQUNmLDhCQUE4QjtBQUU5QixxQ0FBcUM7QUFDckMsOEJBQThCO0FBRTlCLHNCQUFzQjtBQUN0QixnQ0FBZ0M7QUFFaEMsMENBQTBDO0FBQzFDLHdDQUF3QztBQUV4QyxnR0FBZ0c7QUFDaEcsa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUU3Qiw4QkFBOEI7QUFDOUIsa0JBQWtCO0FBQ2xCLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHBvcnQgY29uc3QgU1dJVENIX1RPX1NUUlVDVFVSRSA9IDE5MzsgKGVhc2lseSBjb2xsaWRlcyB3aXRoIERFTEVURV9BTkRfQUREICsgZmllbGRJbmRleCA9IDIpXG5leHBvcnQgY29uc3QgU1dJVENIX1RPX1NUUlVDVFVSRSA9IDI1NTsgLy8gKGRlY29kaW5nIGNvbGxpZGVzIHdpdGggREVMRVRFX0FORF9BREQgKyBmaWVsZEluZGV4ID0gNjMpXG5leHBvcnQgY29uc3QgVFlQRV9JRCA9IDIxMztcblxuLyoqXG4gKiBFbmNvZGluZyBTY2hlbWEgZmllbGQgb3BlcmF0aW9ucy5cbiAqL1xuZXhwb3J0IGVudW0gT1BFUkFUSU9OIHtcbiAgICAvLyBhZGQgbmV3IHN0cnVjdHVyZS9wcmltaXRpdmVcbiAgICBBREQgPSAxMjgsXG5cbiAgICAvLyByZXBsYWNlIHN0cnVjdHVyZS9wcmltaXRpdmVcbiAgICBSRVBMQUNFID0gMCxcblxuICAgIC8vIGRlbGV0ZSBmaWVsZFxuICAgIERFTEVURSA9IDY0LFxuXG4gICAgLy8gREVMRVRFIGZpZWxkLCBmb2xsb3dlZCBieSBhbiBBRERcbiAgICBERUxFVEVfQU5EX0FERCA9IDE5MiwgLy8gMTExMDAwMDBcblxuICAgIC8vIFRPVUNIIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIGhpZXJhcmNoeSBvZiBuZXN0ZWQgU2NoZW1hIHN0cnVjdHVyZXMgZHVyaW5nIHNlcmlhbGl6YXRpb24uXG4gICAgLy8gdG91Y2hlcyBhcmUgTk9UIGVuY29kZWQuXG4gICAgVE9VQ0ggPSAxLCAvLyAwMDAwMDAwMFxuXG4gICAgLy8gTWFwU2NoZW1hIE9wZXJhdGlvbnNcbiAgICBDTEVBUiA9IDEwLFxufVxuXG4vLyBleHBvcnQgZW51bSBPUEVSQVRJT04ge1xuLy8gICAgIC8vIGFkZCBuZXcgc3RydWN0dXJlL3ByaW1pdGl2ZVxuLy8gICAgIC8vICgxMjgpXG4vLyAgICAgQUREID0gMTI4LCAvLyAxMDAwMDAwMCxcblxuLy8gICAgIC8vIHJlcGxhY2Ugc3RydWN0dXJlL3ByaW1pdGl2ZVxuLy8gICAgIFJFUExBQ0UgPSAxLC8vIDAwMDAwMDAxXG5cbi8vICAgICAvLyBkZWxldGUgZmllbGRcbi8vICAgICBERUxFVEUgPSAxOTIsIC8vIDExMDAwMDAwXG5cbi8vICAgICAvLyBERUxFVEUgZmllbGQsIGZvbGxvd2VkIGJ5IGFuIEFERFxuLy8gICAgIERFTEVURV9BTkRfQUREID0gMjI0LCAvLyAxMTEwMDAwMFxuXG4vLyAgICAgLy8gVE9VQ0ggaXMgdXNlZCB0byBkZXRlcm1pbmUgaGllcmFyY2h5IG9mIG5lc3RlZCBTY2hlbWEgc3RydWN0dXJlcyBkdXJpbmcgc2VyaWFsaXphdGlvbi5cbi8vICAgICAvLyB0b3VjaGVzIGFyZSBOT1QgZW5jb2RlZC5cbi8vICAgICBUT1VDSCA9IDAsIC8vIDAwMDAwMDAwXG5cbi8vICAgICAvLyBNYXBTY2hlbWEgT3BlcmF0aW9uc1xuLy8gICAgIENMRUFSID0gMTAsXG4vLyB9Il19

/***/ }),
/* 1 */
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var spec_1 = __webpack_require__(0);
var annotations_1 = __webpack_require__(6);
var encode = __webpack_require__(12);
var decode = __webpack_require__(13);
var ArraySchema_1 = __webpack_require__(4);
var MapSchema_1 = __webpack_require__(5);
var CollectionSchema_1 = __webpack_require__(16);
var SetSchema_1 = __webpack_require__(17);
var ChangeTree_1 = __webpack_require__(3);
var EventEmitter_1 = __webpack_require__(38);
var filters_1 = __webpack_require__(39);
var types_1 = __webpack_require__(2);
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
        var foundValue = "'" + JSON.stringify(value) + "'" + ((value && value.constructor && " (" + value.constructor.name + ")") || '');
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
                value: new ChangeTree_1.ChangeTree(this, undefined, new ChangeTree_1.Root()),
                enumerable: false,
                writable: true
            },
            $listeners: {
                value: {},
                enumerable: false,
                writable: true
            },
        });
        var descriptors = this._definition.descriptors;
        if (descriptors) {
            Object.defineProperties(this, descriptors);
        }
        //
        // Assign initial values
        //
        if (args[0]) {
            this.assign(args[0]);
        }
    }
    Schema.onError = function (e) {
        console.error(e);
    };
    Schema.is = function (type) {
        return (type['_definition'] &&
            type['_definition'].schema !== undefined);
    };
    Schema.prototype.assign = function (props) {
        Object.assign(this, props);
        return this;
    };
    Object.defineProperty(Schema.prototype, "_definition", {
        get: function () { return this.constructor._definition; },
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
    Schema.prototype.decode = function (bytes, it, ref, allChanges) {
        if (it === void 0) { it = { offset: 0 }; }
        if (ref === void 0) { ref = this; }
        if (allChanges === void 0) { allChanges = new Map(); }
        var $root = this.$changes.root;
        var totalBytes = bytes.length;
        var refId = 0;
        var changes = [];
        $root.refs.set(refId, this);
        allChanges.set(refId, changes);
        while (it.offset < totalBytes) {
            var byte = bytes[it.offset++];
            if (byte == spec_1.SWITCH_TO_STRUCTURE) {
                refId = decode.number(bytes, it);
                var nextRef = $root.refs.get(refId);
                //
                // Trying to access a reference that haven't been decoded yet.
                //
                if (!nextRef) {
                    throw new Error("\"refId\" not found: " + refId);
                }
                ref = nextRef;
                // create empty list of changes for this refId.
                changes = [];
                allChanges.set(refId, changes);
                continue;
            }
            var changeTree = ref['$changes'];
            var isSchema = (ref['_definition'] !== undefined);
            var operation = (isSchema)
                ? (byte >> 6) << 6 // "compressed" index + operation
                : byte; // "uncompressed" index + operation (array/map items)
            if (operation === spec_1.OPERATION.CLEAR) {
                //
                // TODO: refactor me!
                // The `.clear()` method is calling `$root.removeRef(refId)` for
                // each item inside this collection
                //
                ref.clear(true);
                continue;
            }
            var fieldIndex = (isSchema)
                ? byte % (operation || 255) // if "REPLACE" operation (0), use 255
                : decode.number(bytes, it);
            var fieldName = (isSchema)
                ? (ref['_definition'].fieldsByIndex[fieldIndex])
                : "";
            var type = changeTree.getType(fieldIndex);
            var value = void 0;
            var previousValue = void 0;
            var dynamicIndex = void 0;
            if (!isSchema) {
                previousValue = ref['getByIndex'](fieldIndex);
                if ((operation & spec_1.OPERATION.ADD) === spec_1.OPERATION.ADD) { // ADD or DELETE_AND_ADD
                    dynamicIndex = (ref instanceof MapSchema_1.MapSchema)
                        ? decode.string(bytes, it)
                        : fieldIndex;
                    ref['setIndex'](fieldIndex, dynamicIndex);
                }
                else {
                    // here
                    dynamicIndex = ref['getIndex'](fieldIndex);
                }
            }
            else {
                previousValue = ref["_" + fieldName];
            }
            //
            // Delete operations
            //
            if ((operation & spec_1.OPERATION.DELETE) === spec_1.OPERATION.DELETE) {
                if (operation !== spec_1.OPERATION.DELETE_AND_ADD) {
                    ref['deleteByIndex'](fieldIndex);
                }
                // Flag `refId` for garbage collection.
                if (previousValue && previousValue['$changes']) {
                    $root.removeRef(previousValue['$changes'].refId);
                }
                value = null;
            }
            if (fieldName === undefined) {
                console.warn("@colyseus/schema: definition mismatch");
                //
                // keep skipping next bytes until reaches a known structure
                // by local decoder.
                //
                var nextIterator = { offset: it.offset };
                while (it.offset < totalBytes) {
                    if (decode.switchStructureCheck(bytes, it)) {
                        nextIterator.offset = it.offset + 1;
                        if ($root.refs.has(decode.number(bytes, nextIterator))) {
                            break;
                        }
                    }
                    it.offset++;
                }
                continue;
            }
            else if (operation === spec_1.OPERATION.DELETE) {
                //
                // FIXME: refactor me.
                // Don't do anything.
                //
            }
            else if (Schema.is(type)) {
                var refId_1 = decode.number(bytes, it);
                value = $root.refs.get(refId_1);
                if (operation !== spec_1.OPERATION.REPLACE) {
                    var childType = this.getSchemaType(bytes, it, type);
                    if (!value) {
                        value = this.createTypeInstance(childType);
                        value.$changes.refId = refId_1;
                        if (previousValue) {
                            value.onChange = previousValue.onChange;
                            value.onRemove = previousValue.onRemove;
                            value.$listeners = previousValue.$listeners;
                            if (previousValue['$changes'].refId &&
                                refId_1 !== previousValue['$changes'].refId) {
                                $root.removeRef(previousValue['$changes'].refId);
                            }
                        }
                    }
                    $root.addRef(refId_1, value, (value !== previousValue));
                }
            }
            else if (typeof (type) === "string") {
                //
                // primitive value (number, string, boolean, etc)
                //
                value = decodePrimitiveType(type, bytes, it);
            }
            else {
                var typeDef = types_1.getType(Object.keys(type)[0]);
                var refId_2 = decode.number(bytes, it);
                var valueRef = ($root.refs.has(refId_2))
                    ? previousValue
                    : new typeDef.constructor();
                value = valueRef.clone(true);
                value.$changes.refId = refId_2;
                // preserve schema callbacks
                if (previousValue) {
                    value.onAdd = previousValue.onAdd;
                    value.onRemove = previousValue.onRemove;
                    value.onChange = previousValue.onChange;
                    if (previousValue['$changes'].refId &&
                        refId_2 !== previousValue['$changes'].refId) {
                        $root.removeRef(previousValue['$changes'].refId);
                        //
                        // Trigger onRemove if structure has been replaced.
                        //
                        var deletes = [];
                        var entries = previousValue.entries();
                        var iter = void 0;
                        while ((iter = entries.next()) && !iter.done) {
                            var _a = __read(iter.value, 2), key = _a[0], value_1 = _a[1];
                            deletes.push({
                                op: spec_1.OPERATION.DELETE,
                                field: key,
                                value: undefined,
                                previousValue: value_1,
                            });
                        }
                        allChanges.set(previousValue['$changes'].refId, deletes);
                    }
                }
                $root.addRef(refId_2, value, (valueRef !== previousValue));
                //
                // TODO: deprecate proxies on next version.
                // get proxy to target value.
                //
                if (typeDef.getProxy) {
                    value = typeDef.getProxy(value);
                }
            }
            var hasChange = (previousValue !== value);
            if (value !== null &&
                value !== undefined) {
                if (value['$changes']) {
                    value['$changes'].setParent(changeTree.ref, changeTree.root, fieldIndex);
                }
                if (ref instanceof Schema) {
                    ref[fieldName] = value;
                    //
                    // FIXME: use `_field` instead of `field`.
                    //
                    // `field` is going to use the setter of the PropertyDescriptor
                    // and create a proxy for array/map. This is only useful for
                    // backwards-compatibility with @colyseus/schema@0.5.x
                    //
                    // // ref[_field] = value;
                }
                else if (ref instanceof MapSchema_1.MapSchema) {
                    // const key = ref['$indexes'].get(field);
                    var key = dynamicIndex;
                    // ref.set(key, value);
                    ref['$items'].set(key, value);
                }
                else if (ref instanceof ArraySchema_1.ArraySchema) {
                    // const key = ref['$indexes'][field];
                    // console.log("SETTING FOR ArraySchema =>", { field, key, value });
                    // ref[key] = value;
                    ref.setAt(fieldIndex, value);
                }
                else if (ref instanceof CollectionSchema_1.CollectionSchema ||
                    ref instanceof SetSchema_1.SetSchema) {
                    var index = ref.add(value);
                    ref['setIndex'](fieldIndex, index);
                }
            }
            if (hasChange
            // &&
            // (
            //     this.onChange || ref.$listeners[field]
            // )
            ) {
                changes.push({
                    op: operation,
                    field: fieldName,
                    dynamicIndex: dynamicIndex,
                    value: value,
                    previousValue: previousValue,
                });
            }
        }
        this._triggerChanges(allChanges);
        // drop references of unused schemas
        $root.garbageCollectDeletedRefs();
        return allChanges;
    };
    Schema.prototype.encode = function (encodeAll, bytes, useFilters) {
        if (encodeAll === void 0) { encodeAll = false; }
        if (bytes === void 0) { bytes = []; }
        if (useFilters === void 0) { useFilters = false; }
        var refIdsVisited = new WeakSet();
        var changeTrees = [this.$changes];
        var numChangeTrees = 1;
        for (var i = 0; i < numChangeTrees; i++) {
            var changeTree = changeTrees[i];
            var ref = changeTree.ref;
            var isSchema = (ref instanceof Schema);
            // Generate unique refId for the ChangeTree.
            changeTree.ensureRefId();
            // mark this ChangeTree as visited.
            refIdsVisited.add(changeTree);
            // root `refId` is skipped.
            if (changeTree.refId > 0 &&
                (changeTree.changed || encodeAll)) {
                encode.uint8(bytes, spec_1.SWITCH_TO_STRUCTURE);
                encode.number(bytes, changeTree.refId);
            }
            var changes = (encodeAll)
                ? Array.from(changeTree.allChanges)
                : Array.from(changeTree.changes.values());
            for (var j = 0, cl = changes.length; j < cl; j++) {
                var operation = (encodeAll)
                    ? { op: spec_1.OPERATION.ADD, index: changes[j] }
                    : changes[j];
                var fieldIndex = operation.index;
                var field = (isSchema)
                    ? ref['_definition'].fieldsByIndex && ref['_definition'].fieldsByIndex[fieldIndex]
                    : fieldIndex;
                // cache begin index if `useFilters`
                var beginIndex = bytes.length;
                // encode field index + operation
                if (operation.op !== spec_1.OPERATION.TOUCH) {
                    if (isSchema) {
                        //
                        // Compress `fieldIndex` + `operation` into a single byte.
                        // This adds a limitaion of 64 fields per Schema structure
                        //
                        encode.uint8(bytes, (fieldIndex | operation.op));
                    }
                    else {
                        encode.uint8(bytes, operation.op);
                        // custom operations
                        if (operation.op === spec_1.OPERATION.CLEAR) {
                            continue;
                        }
                        // indexed operations
                        encode.number(bytes, fieldIndex);
                    }
                }
                //
                // encode "alias" for dynamic fields (maps)
                //
                if (!isSchema &&
                    (operation.op & spec_1.OPERATION.ADD) == spec_1.OPERATION.ADD // ADD or DELETE_AND_ADD
                ) {
                    if (ref instanceof MapSchema_1.MapSchema) {
                        //
                        // MapSchema dynamic key
                        //
                        var dynamicIndex = changeTree.ref['$indexes'].get(fieldIndex);
                        encode.string(bytes, dynamicIndex);
                    }
                }
                if (operation.op === spec_1.OPERATION.DELETE) {
                    //
                    // TODO: delete from filter cache data.
                    //
                    // if (useFilters) {
                    //     delete changeTree.caches[fieldIndex];
                    // }
                    continue;
                }
                // const type = changeTree.childType || ref._schema[field];
                var type = changeTree.getType(fieldIndex);
                // const type = changeTree.getType(fieldIndex);
                var value = changeTree.getValue(fieldIndex);
                // Enqueue ChangeTree to be visited
                if (value &&
                    value['$changes'] &&
                    !refIdsVisited.has(value['$changes'])) {
                    changeTrees.push(value['$changes']);
                    value['$changes'].ensureRefId();
                    numChangeTrees++;
                }
                if (operation.op === spec_1.OPERATION.TOUCH) {
                    continue;
                }
                if (Schema.is(type)) {
                    assertInstanceType(value, type, ref, field);
                    //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value.$changes.refId);
                    // Try to encode inherited TYPE_ID if it's an ADD operation.
                    if ((operation.op & spec_1.OPERATION.ADD) === spec_1.OPERATION.ADD) {
                        this.tryEncodeTypeId(bytes, type, value.constructor);
                    }
                }
                else if (typeof (type) === "string") {
                    //
                    // Primitive values
                    //
                    encodePrimitiveType(type, bytes, value, ref, field);
                }
                else {
                    //
                    // Custom type (MapSchema, ArraySchema, etc)
                    //
                    var definition = types_1.getType(Object.keys(type)[0]);
                    //
                    // ensure a ArraySchema has been provided
                    //
                    assertInstanceType(ref["_" + field], definition.constructor, ref, field);
                    //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value.$changes.refId);
                }
                if (useFilters) {
                    // cache begin / end index
                    changeTree.cache(fieldIndex, bytes.slice(beginIndex));
                }
            }
            if (!encodeAll && !useFilters) {
                changeTree.discard();
            }
        }
        return bytes;
    };
    Schema.prototype.encodeAll = function (useFilters) {
        return this.encode(true, [], useFilters);
    };
    Schema.prototype.applyFilters = function (client, encodeAll) {
        if (encodeAll === void 0) { encodeAll = false; }
        var root = this;
        var refIdsDissallowed = new Set();
        var $filterState = filters_1.ClientState.get(client);
        var changeTrees = [this.$changes];
        var numChangeTrees = 1;
        var filteredBytes = [];
        var _loop_1 = function (i) {
            var changeTree = changeTrees[i];
            if (refIdsDissallowed.has(changeTree.refId)) {
                return "continue";
            }
            var ref = changeTree.ref;
            var isSchema = ref instanceof Schema;
            encode.uint8(filteredBytes, spec_1.SWITCH_TO_STRUCTURE);
            encode.number(filteredBytes, changeTree.refId);
            var clientHasRefId = $filterState.refIds.has(changeTree);
            var isEncodeAll = (encodeAll || !clientHasRefId);
            // console.log("REF:", ref.constructor.name);
            // console.log("Encode all?", isEncodeAll);
            //
            // include `changeTree` on list of known refIds by this client.
            //
            $filterState.addRefId(changeTree);
            var containerIndexes = $filterState.containerIndexes.get(changeTree);
            var changes = (isEncodeAll)
                ? Array.from(changeTree.allChanges)
                : Array.from(changeTree.changes.values());
            //
            // WORKAROUND: tries to re-evaluate previously not included @filter() attributes
            // - see "DELETE a field of Schema" test case.
            //
            if (!encodeAll &&
                isSchema &&
                ref._definition.indexesWithFilters) {
                var indexesWithFilters = ref._definition.indexesWithFilters;
                indexesWithFilters.forEach(function (indexWithFilter) {
                    if (!containerIndexes.has(indexWithFilter) &&
                        changeTree.allChanges.has(indexWithFilter)) {
                        if (isEncodeAll) {
                            changes.push(indexWithFilter);
                        }
                        else {
                            changes.push({ op: spec_1.OPERATION.ADD, index: indexWithFilter, });
                        }
                    }
                });
            }
            for (var j = 0, cl = changes.length; j < cl; j++) {
                var change = (isEncodeAll)
                    ? { op: spec_1.OPERATION.ADD, index: changes[j] }
                    : changes[j];
                // custom operations
                if (change.op === spec_1.OPERATION.CLEAR) {
                    encode.uint8(filteredBytes, change.op);
                    continue;
                }
                var fieldIndex = change.index;
                //
                // Deleting fields: encode the operation + field index
                //
                if (change.op === spec_1.OPERATION.DELETE) {
                    //
                    // DELETE operations also need to go through filtering.
                    //
                    // TODO: cache the previous value so we can access the value (primitive or `refId`)
                    // (check against `$filterState.refIds`)
                    //
                    if (isSchema) {
                        encode.uint8(filteredBytes, change.op | fieldIndex);
                    }
                    else {
                        encode.uint8(filteredBytes, change.op);
                        encode.number(filteredBytes, fieldIndex);
                    }
                    continue;
                }
                // indexed operation
                var value = changeTree.getValue(fieldIndex);
                var type = changeTree.getType(fieldIndex);
                if (isSchema) {
                    // Is a Schema!
                    var filter = (ref._definition.filters &&
                        ref._definition.filters[fieldIndex]);
                    if (filter && !filter.call(ref, client, value, root)) {
                        if (value && value['$changes']) {
                            refIdsDissallowed.add(value['$changes'].refId);
                            ;
                        }
                        continue;
                    }
                }
                else {
                    // Is a collection! (map, array, etc.)
                    var parent = changeTree.parent;
                    var filter = changeTree.getChildrenFilter();
                    if (filter && !filter.call(parent, client, ref['$indexes'].get(fieldIndex), value, root)) {
                        if (value && value['$changes']) {
                            refIdsDissallowed.add(value['$changes'].refId);
                        }
                        continue;
                    }
                }
                // visit child ChangeTree on further iteration.
                if (value['$changes']) {
                    changeTrees.push(value['$changes']);
                    numChangeTrees++;
                }
                //
                // Copy cached bytes
                //
                if (change.op !== spec_1.OPERATION.TOUCH) {
                    //
                    // TODO: refactor me!
                    //
                    if (change.op === spec_1.OPERATION.ADD || isSchema) {
                        //
                        // use cached bytes directly if is from Schema type.
                        //
                        filteredBytes = filteredBytes.concat(changeTree.caches[fieldIndex]);
                        containerIndexes.add(fieldIndex);
                    }
                    else {
                        if (containerIndexes.has(fieldIndex)) {
                            //
                            // use cached bytes if already has the field
                            //
                            filteredBytes = filteredBytes.concat(changeTree.caches[fieldIndex]);
                        }
                        else {
                            //
                            // force ADD operation if field is not known by this client.
                            //
                            containerIndexes.add(fieldIndex);
                            encode.uint8(filteredBytes, spec_1.OPERATION.ADD);
                            encode.number(filteredBytes, fieldIndex);
                            if (ref instanceof MapSchema_1.MapSchema) {
                                //
                                // MapSchema dynamic key
                                //
                                var dynamicIndex = changeTree.ref['$indexes'].get(fieldIndex);
                                encode.string(filteredBytes, dynamicIndex);
                            }
                            if (value['$changes']) {
                                encode.number(filteredBytes, value['$changes'].refId);
                            }
                            else {
                                // "encodePrimitiveType" without type checking.
                                // the type checking has been done on the first .encode() call.
                                encode[type](filteredBytes, value);
                            }
                        }
                    }
                }
                else if (value['$changes'] && !isSchema) {
                    //
                    // TODO:
                    // - track ADD/REPLACE/DELETE instances on `$filterState`
                    // - do NOT always encode dynamicIndex for MapSchema.
                    //   (If client already has that key, only the first index is necessary.)
                    //
                    encode.uint8(filteredBytes, spec_1.OPERATION.ADD);
                    encode.number(filteredBytes, fieldIndex);
                    if (ref instanceof MapSchema_1.MapSchema) {
                        //
                        // MapSchema dynamic key
                        //
                        var dynamicIndex = changeTree.ref['$indexes'].get(fieldIndex);
                        encode.string(filteredBytes, dynamicIndex);
                    }
                    encode.number(filteredBytes, value['$changes'].refId);
                }
            }
            ;
        };
        for (var i = 0; i < numChangeTrees; i++) {
            _loop_1(i);
        }
        return filteredBytes;
    };
    Schema.prototype.clone = function () {
        var cloned = new (this.constructor);
        var schema = this._definition.schema;
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
        var allChanges = new Map();
        Schema.prototype._triggerAllFillChanges.call(this, this, allChanges);
        try {
            Schema.prototype._triggerChanges.call(this, allChanges);
        }
        catch (e) {
            Schema.onError(e);
        }
    };
    Schema.prototype.toJSON = function () {
        var schema = this._definition.schema;
        var deprecated = this._definition.deprecated;
        var obj = {};
        for (var field in schema) {
            if (!deprecated[field] && this[field] !== null && typeof (this[field]) !== "undefined") {
                obj[field] = (typeof (this[field]['toJSON']) === "function")
                    ? this[field]['toJSON']()
                    : this["_" + field];
            }
        }
        return obj;
    };
    Schema.prototype.discardAllChanges = function () {
        this.$changes.discardAll();
    };
    Schema.prototype.getByIndex = function (index) {
        return this[this._definition.fieldsByIndex[index]];
    };
    Schema.prototype.deleteByIndex = function (index) {
        this[this._definition.fieldsByIndex[index]] = undefined;
    };
    Schema.prototype.tryEncodeTypeId = function (bytes, type, targetType) {
        if (type._typeid !== targetType._typeid) {
            encode.uint8(bytes, spec_1.TYPE_ID);
            encode.number(bytes, targetType._typeid);
        }
    };
    Schema.prototype.getSchemaType = function (bytes, it, defaultType) {
        var type;
        if (bytes[it.offset] === spec_1.TYPE_ID) {
            it.offset++;
            type = this.constructor._context.get(decode.number(bytes, it));
        }
        return type || defaultType;
    };
    Schema.prototype.createTypeInstance = function (type) {
        var instance = new type();
        // assign root on $changes
        instance.$changes.root = this.$changes.root;
        return instance;
    };
    Schema.prototype._triggerAllFillChanges = function (ref, allChanges) {
        if (allChanges.has(ref['$changes'].refId)) {
            return;
        }
        var changes = [];
        allChanges.set(ref['$changes'].refId || 0, changes);
        if (ref instanceof Schema) {
            var schema = ref._definition.schema;
            for (var fieldName in schema) {
                var _field = "_" + fieldName;
                if (ref[_field] !== undefined) {
                    changes.push({
                        op: spec_1.OPERATION.ADD,
                        field: fieldName,
                        value: ref[_field],
                        previousValue: undefined
                    });
                    if (Schema.is(schema[fieldName])) {
                        Schema.prototype._triggerAllFillChanges.call(this, ref[_field], allChanges);
                    }
                    else {
                        var fieldType = Object.keys(schema[fieldName])[0];
                        if (typeof (schema[fieldName][fieldType]) !== "string") {
                            Schema.prototype._triggerAllFillChanges.call(this, ref[_field], allChanges);
                        }
                    }
                }
            }
        }
        else {
            var entries = ref.entries();
            var iter = void 0;
            while ((iter = entries.next()) && !iter.done) {
                var _a = __read(iter.value, 2), key = _a[0], value = _a[1];
                changes.push({
                    op: spec_1.OPERATION.ADD,
                    field: key,
                    value: value,
                    previousValue: undefined,
                });
                Schema.prototype._triggerAllFillChanges.call(this, value, allChanges);
            }
        }
    };
    Schema.prototype._triggerChanges = function (allChanges) {
        var _this = this;
        allChanges.forEach(function (changes, refId) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (changes.length > 0) {
                var ref = _this.$changes.root.refs.get(refId);
                var isSchema = ref instanceof Schema;
                for (var i = 0; i < changes.length; i++) {
                    var change = changes[i];
                    var listener = ref['$listeners'] && ref['$listeners'][change.field];
                    if (!isSchema) {
                        if (change.op === spec_1.OPERATION.ADD && change.previousValue === undefined) {
                            (_b = (_a = ref).onAdd) === null || _b === void 0 ? void 0 : _b.call(_a, change.value, change.dynamicIndex);
                        }
                        else if (change.op === spec_1.OPERATION.DELETE) {
                            //
                            // FIXME: `previousValue` should always be avaiiable.
                            // ADD + DELETE operations are still encoding DELETE operation.
                            //
                            if (change.previousValue !== undefined) {
                                (_d = (_c = ref).onRemove) === null || _d === void 0 ? void 0 : _d.call(_c, change.previousValue, change.dynamicIndex || change.field);
                            }
                        }
                        else if (change.op === spec_1.OPERATION.DELETE_AND_ADD) {
                            if (change.previousValue !== undefined) {
                                (_f = (_e = ref).onRemove) === null || _f === void 0 ? void 0 : _f.call(_e, change.previousValue, change.dynamicIndex);
                            }
                            (_h = (_g = ref).onAdd) === null || _h === void 0 ? void 0 : _h.call(_g, change.value, change.dynamicIndex);
                        }
                        else if (change.op === spec_1.OPERATION.REPLACE ||
                            change.value !== change.previousValue) {
                            (_k = (_j = ref).onChange) === null || _k === void 0 ? void 0 : _k.call(_j, change.value, change.dynamicIndex);
                        }
                    }
                    //
                    // trigger onRemove on child structure.
                    //
                    if ((change.op & spec_1.OPERATION.DELETE) === spec_1.OPERATION.DELETE &&
                        change.previousValue instanceof Schema &&
                        change.previousValue.onRemove) {
                        change.previousValue.onRemove();
                    }
                    if (listener) {
                        try {
                            listener.invoke(change.value, change.previousValue);
                        }
                        catch (e) {
                            Schema.onError(e);
                        }
                    }
                }
                if (isSchema) {
                    if (ref.onChange) {
                        try {
                            ref.onChange(changes);
                        }
                        catch (e) {
                            Schema.onError(e);
                        }
                    }
                }
            }
        });
    };
    Schema._definition = annotations_1.SchemaDefinition.create();
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFpRTtBQUNqRSw2Q0FBaUc7QUFFakcsMENBQTRDO0FBQzVDLDBDQUE0QztBQUU1QyxtREFBaUU7QUFDakUsK0NBQTJEO0FBQzNELDZEQUE0RDtBQUM1RCwrQ0FBOEM7QUFFOUMsbURBQThFO0FBRTlFLHNEQUFxRDtBQUNyRCxxQ0FBd0M7QUFDeEMsaUNBQWtDO0FBbUJsQztJQUFnQyxxQ0FBSztJQUFyQzs7SUFBdUMsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUF4QyxDQUFnQyxLQUFLLEdBQUc7QUFFeEMsU0FBUyxVQUFVLENBQUMsS0FBVSxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsS0FBc0I7SUFDL0UsSUFBSSxZQUFvQixDQUFDO0lBQ3pCLElBQUksU0FBUyxHQUFZLEtBQUssQ0FBQztJQUUvQixRQUFRLElBQUksRUFBRTtRQUNWLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxTQUFTO1lBQ1YsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUN4QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUE2QixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksU0FBSSxLQUFPLENBQUMsQ0FBQzthQUMvRTtZQUNELE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxZQUFZLEdBQUcs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QUEsQUFuOEJELElBbThCQztBQW44QnFCLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU1dJVENIX1RPX1NUUlVDVFVSRSwgVFlQRV9JRCwgT1BFUkFUSU9OIH0gZnJvbSAnLi9zcGVjJztcbmltcG9ydCB7IENsaWVudCwgUHJpbWl0aXZlVHlwZSwgQ29udGV4dCwgU2NoZW1hRGVmaW5pdGlvbiwgRGVmaW5pdGlvblR5cGUgfSBmcm9tIFwiLi9hbm5vdGF0aW9uc1wiO1xuXG5pbXBvcnQgKiBhcyBlbmNvZGUgZnJvbSBcIi4vZW5jb2RpbmcvZW5jb2RlXCI7XG5pbXBvcnQgKiBhcyBkZWNvZGUgZnJvbSBcIi4vZW5jb2RpbmcvZGVjb2RlXCI7XG5cbmltcG9ydCB7IEFycmF5U2NoZW1hLCBnZXRBcnJheVByb3h5IH0gZnJvbSBcIi4vdHlwZXMvQXJyYXlTY2hlbWFcIjtcbmltcG9ydCB7IE1hcFNjaGVtYSwgZ2V0TWFwUHJveHkgfSBmcm9tIFwiLi90eXBlcy9NYXBTY2hlbWFcIjtcbmltcG9ydCB7IENvbGxlY3Rpb25TY2hlbWEgfSBmcm9tICcuL3R5cGVzL0NvbGxlY3Rpb25TY2hlbWEnO1xuaW1wb3J0IHsgU2V0U2NoZW1hIH0gZnJvbSAnLi90eXBlcy9TZXRTY2hlbWEnO1xuXG5pbXBvcnQgeyBDaGFuZ2VUcmVlLCBSb290LCBSZWYsIENoYW5nZU9wZXJhdGlvbiB9IGZyb20gXCIuL2NoYW5nZXMvQ2hhbmdlVHJlZVwiO1xuaW1wb3J0IHsgTm9uRnVuY3Rpb25Qcm9wTmFtZXMgfSBmcm9tICcuL3R5cGVzL0hlbHBlclR5cGVzJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4vZXZlbnRzL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgeyBDbGllbnRTdGF0ZSB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBnZXRUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUNoYW5nZTxUPWFueT4ge1xuICAgIG9wOiBPUEVSQVRJT04sXG4gICAgZmllbGQ6IHN0cmluZztcbiAgICBkeW5hbWljSW5kZXg/OiBudW1iZXIgfCBzdHJpbmc7XG4gICAgdmFsdWU6IFQ7XG4gICAgcHJldmlvdXNWYWx1ZTogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFEZWNvZGVyQ2FsbGJhY2tzIHtcbiAgICBvbkFkZD86IChpdGVtOiBhbnksIGtleTogYW55KSA9PiB2b2lkO1xuICAgIG9uUmVtb3ZlPzogKGl0ZW06IGFueSwga2V5OiBhbnkpID0+IHZvaWQ7XG4gICAgb25DaGFuZ2U/OiAoaXRlbTogYW55LCBrZXk6IGFueSkgPT4gdm9pZDtcbiAgICBjbG9uZShkZWNvZGluZz86IGJvb2xlYW4pOiBTY2hlbWFEZWNvZGVyQ2FsbGJhY2tzO1xuICAgIGNsZWFyKGRlY29kaW5nPzogYm9vbGVhbik7XG4gICAgZGVjb2RlPyhieXRlLCBpdDogZGVjb2RlLkl0ZXJhdG9yKTtcbn1cblxuY2xhc3MgRW5jb2RlU2NoZW1hRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5mdW5jdGlvbiBhc3NlcnRUeXBlKHZhbHVlOiBhbnksIHR5cGU6IHN0cmluZywga2xhc3M6IFNjaGVtYSwgZmllbGQ6IHN0cmluZyB8IG51bWJlcikge1xuICAgIGxldCB0eXBlb2ZUYXJnZXQ6IHN0cmluZztcbiAgICBsZXQgYWxsb3dOdWxsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICBjYXNlIFwiaW50OFwiOlxuICAgICAgICBjYXNlIFwidWludDhcIjpcbiAgICAgICAgY2FzZSBcImludDE2XCI6XG4gICAgICAgIGNhc2UgXCJ1aW50MTZcIjpcbiAgICAgICAgY2FzZSBcImludDMyXCI6XG4gICAgICAgIGNhc2UgXCJ1aW50MzJcIjpcbiAgICAgICAgY2FzZSBcImludDY0XCI6XG4gICAgICAgIGNhc2UgXCJ1aW50NjRcIjpcbiAgICAgICAgY2FzZSBcImZsb2F0MzJcIjpcbiAgICAgICAgY2FzZSBcImZsb2F0NjRcIjpcbiAgICAgICAgICAgIHR5cGVvZlRhcmdldCA9IFwibnVtYmVyXCI7XG4gICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRyeWluZyB0byBlbmNvZGUgXCJOYU5cIiBpbiAke2tsYXNzLmNvbnN0cnVjdG9yLm5hbWV9IyR7ZmllbGR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgdHlwZW9mVGFyZ2V0ID0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIGFsbG93TnVsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgIC8vIGJvb2xlYW4gaXMgYWx3YXlzIGVuY29kZWQgYXMgdHJ1ZS9mYWxzZSBiYXNlZCBvbiB0cnV0aGluZXNzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiAodmFsdWUpICE9PSB0eXBlb2ZUYXJnZXQgJiYgKCFhbGxvd051bGwgfHwgKGFsbG93TnVsbCAmJiB2YWx1ZSAhPT0gbnVsbCkpKSB7XG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gYCcke0pTT04uc3RyaW5naWZ5KHZhbHVlKX0nJHsodmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IgJiYgYCAoJHt2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lfSlgKSB8fCAnJ31gO1xuICAgICAgICB0aHJvdyBuZXcgRW5jb2RlU2NoZW1hRXJyb3IoYGEgJyR7dHlwZW9mVGFyZ2V0fScgd2FzIGV4cGVjdGVkLCBidXQgJHtmb3VuZFZhbHVlfSB3YXMgcHJvdmlkZWQgaW4gJHtrbGFzcy5jb25zdHJ1Y3Rvci5uYW1lfSMke2ZpZWxkfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0SW5zdGFuY2VUeXBlKFxuICAgIHZhbHVlOiBTY2hlbWEsXG4gICAgdHlwZTogdHlwZW9mIFNjaGVtYVxuICAgICAgICB8IHR5cGVvZiBBcnJheVNjaGVtYVxuICAgICAgICB8IHR5cGVvZiBNYXBTY2hlbWFcbiAgICAgICAgfCB0eXBlb2YgQ29sbGVjdGlvblNjaGVtYVxuICAgICAgICB8IHR5cGVvZiBTZXRTY2hlbWEsXG4gICAga2xhc3M6IFNjaGVtYSxcbiAgICBmaWVsZDogc3RyaW5nIHwgbnVtYmVyLFxuKSB7XG4gICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRW5jb2RlU2NoZW1hRXJyb3IoYGEgJyR7dHlwZS5uYW1lfScgd2FzIGV4cGVjdGVkLCBidXQgJyR7KHZhbHVlIGFzIGFueSkuY29uc3RydWN0b3IubmFtZX0nIHdhcyBwcm92aWRlZCBpbiAke2tsYXNzLmNvbnN0cnVjdG9yLm5hbWV9IyR7ZmllbGR9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVQcmltaXRpdmVUeXBlKFxuICAgIHR5cGU6IFByaW1pdGl2ZVR5cGUsXG4gICAgYnl0ZXM6IG51bWJlcltdLFxuICAgIHZhbHVlOiBhbnksXG4gICAga2xhc3M6IFNjaGVtYSxcbiAgICBmaWVsZDogc3RyaW5nIHwgbnVtYmVyLFxuKSB7XG4gICAgYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZSBhcyBzdHJpbmcsIGtsYXNzLCBmaWVsZCk7XG5cbiAgICBjb25zdCBlbmNvZGVGdW5jID0gZW5jb2RlW3R5cGUgYXMgc3RyaW5nXTtcblxuICAgIGlmIChlbmNvZGVGdW5jKSB7XG4gICAgICAgIGVuY29kZUZ1bmMoYnl0ZXMsIHZhbHVlKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFbmNvZGVTY2hlbWFFcnJvcihgYSAnJHt0eXBlfScgd2FzIGV4cGVjdGVkLCBidXQgJHt2YWx1ZX0gd2FzIHByb3ZpZGVkIGluICR7a2xhc3MuY29uc3RydWN0b3IubmFtZX0jJHtmaWVsZH1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlY29kZVByaW1pdGl2ZVR5cGUgKHR5cGU6IHN0cmluZywgYnl0ZXM6IG51bWJlcltdLCBpdDogZGVjb2RlLkl0ZXJhdG9yKSB7XG4gICAgcmV0dXJuIGRlY29kZVt0eXBlIGFzIHN0cmluZ10oYnl0ZXMsIGl0KTtcbn1cblxuLyoqXG4gKiBTY2hlbWEgZW5jb2RlciAvIGRlY29kZXJcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNjaGVtYSB7XG4gICAgc3RhdGljIF90eXBlaWQ6IG51bWJlcjtcbiAgICBzdGF0aWMgX2NvbnRleHQ6IENvbnRleHQ7XG5cbiAgICBzdGF0aWMgX2RlZmluaXRpb246IFNjaGVtYURlZmluaXRpb24gPSBTY2hlbWFEZWZpbml0aW9uLmNyZWF0ZSgpO1xuXG4gICAgc3RhdGljIG9uRXJyb3IoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpcyh0eXBlOiBEZWZpbml0aW9uVHlwZSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZVsnX2RlZmluaXRpb24nXSAmJlxuICAgICAgICAgICAgdHlwZVsnX2RlZmluaXRpb24nXS5zY2hlbWEgIT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCAkY2hhbmdlczogQ2hhbmdlVHJlZTtcbiAgICAvLyBwcm90ZWN0ZWQgJHJvb3Q6IENoYW5nZVNldDtcblxuICAgIHByb3RlY3RlZCAkbGlzdGVuZXJzOiB7IFtmaWVsZDogc3RyaW5nXTogRXZlbnRFbWl0dGVyPChhOiBhbnksIGI6IGFueSkgPT4gdm9pZD4gfTtcblxuICAgIHB1YmxpYyBvbkNoYW5nZT8oY2hhbmdlczogRGF0YUNoYW5nZVtdKTtcbiAgICBwdWJsaWMgb25SZW1vdmU/KCk7XG5cbiAgICAvLyBhbGxvdyBpbmhlcml0ZWQgY2xhc3NlcyB0byBoYXZlIGEgY29uc3RydWN0b3JcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAvLyBmaXggZW51bWVyYWJpbGl0eSBvZiBmaWVsZHMgZm9yIGVuZC11c2VyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICAgICAgICRjaGFuZ2VzOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5ldyBDaGFuZ2VUcmVlKHRoaXMsIHVuZGVmaW5lZCwgbmV3IFJvb3QoKSksXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICRsaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3JzID0gdGhpcy5fZGVmaW5pdGlvbi5kZXNjcmlwdG9ycztcbiAgICAgICAgaWYgKGRlc2NyaXB0b3JzKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCBkZXNjcmlwdG9ycyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBBc3NpZ24gaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKGFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHRoaXMuYXNzaWduKGFyZ3NbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzc2lnbihcbiAgICAgICAgcHJvcHM6IHsgW3Byb3AgaW4gTm9uRnVuY3Rpb25Qcm9wTmFtZXM8dGhpcz5dPzogdGhpc1twcm9wXSB9XG4gICAgKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvcHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IF9kZWZpbml0aW9uICgpIHsgcmV0dXJuICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBTY2hlbWEpLl9kZWZpbml0aW9uOyB9XG5cbiAgICBwdWJsaWMgbGlzdGVuIDxLIGV4dGVuZHMgTm9uRnVuY3Rpb25Qcm9wTmFtZXM8dGhpcz4+KGF0dHI6IEssIGNhbGxiYWNrOiAodmFsdWU6IHRoaXNbS10sIHByZXZpb3VzVmFsdWU6IHRoaXNbS10pID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRsaXN0ZW5lcnNbYXR0ciBhcyBzdHJpbmddKSB7XG4gICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbYXR0ciBhcyBzdHJpbmddID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGxpc3RlbmVyc1thdHRyIGFzIHN0cmluZ10ucmVnaXN0ZXIoY2FsbGJhY2spO1xuXG4gICAgICAgIC8vIHJldHVybiB1bi1yZWdpc3RlciBjYWxsYmFjay5cbiAgICAgICAgcmV0dXJuICgpID0+XG4gICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbYXR0ciBhcyBzdHJpbmddLnJlbW92ZShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZGVjb2RlKFxuICAgICAgICBieXRlczogbnVtYmVyW10sXG4gICAgICAgIGl0OiBkZWNvZGUuSXRlcmF0b3IgPSB7IG9mZnNldDogMCB9LFxuICAgICAgICByZWY6IFJlZiA9IHRoaXMsXG4gICAgICAgIGFsbENoYW5nZXM6IE1hcDxudW1iZXIsIERhdGFDaGFuZ2VbXT4gPSBuZXcgTWFwPG51bWJlciwgRGF0YUNoYW5nZVtdPigpLFxuICAgICkge1xuICAgICAgICBjb25zdCAkcm9vdCA9IHRoaXMuJGNoYW5nZXMucm9vdDtcbiAgICAgICAgY29uc3QgdG90YWxCeXRlcyA9IGJ5dGVzLmxlbmd0aDtcblxuICAgICAgICBsZXQgcmVmSWQ6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBjaGFuZ2VzOiBEYXRhQ2hhbmdlW10gPSBbXTtcblxuICAgICAgICAkcm9vdC5yZWZzLnNldChyZWZJZCwgdGhpcyk7XG4gICAgICAgIGFsbENoYW5nZXMuc2V0KHJlZklkLCBjaGFuZ2VzKTtcblxuICAgICAgICB3aGlsZSAoaXQub2Zmc2V0IDwgdG90YWxCeXRlcykge1xuICAgICAgICAgICAgbGV0IGJ5dGUgPSBieXRlc1tpdC5vZmZzZXQrK107XG5cbiAgICAgICAgICAgIGlmIChieXRlID09IFNXSVRDSF9UT19TVFJVQ1RVUkUpIHtcbiAgICAgICAgICAgICAgICByZWZJZCA9IGRlY29kZS5udW1iZXIoYnl0ZXMsIGl0KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSZWYgPSAkcm9vdC5yZWZzLmdldChyZWZJZCkgYXMgU2NoZW1hO1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBUcnlpbmcgdG8gYWNjZXNzIGEgcmVmZXJlbmNlIHRoYXQgaGF2ZW4ndCBiZWVuIGRlY29kZWQgeWV0LlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0UmVmKSB7IHRocm93IG5ldyBFcnJvcihgXCJyZWZJZFwiIG5vdCBmb3VuZDogJHtyZWZJZH1gKTsgfVxuXG4gICAgICAgICAgICAgICAgcmVmID0gbmV4dFJlZjtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBlbXB0eSBsaXN0IG9mIGNoYW5nZXMgZm9yIHRoaXMgcmVmSWQuXG4gICAgICAgICAgICAgICAgY2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGFsbENoYW5nZXMuc2V0KHJlZklkLCBjaGFuZ2VzKTtcblxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VUcmVlOiBDaGFuZ2VUcmVlID0gcmVmWyckY2hhbmdlcyddO1xuICAgICAgICAgICAgY29uc3QgaXNTY2hlbWEgPSAocmVmWydfZGVmaW5pdGlvbiddICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBjb25zdCBvcGVyYXRpb24gPSAoaXNTY2hlbWEpXG4gICAgICAgICAgICAgICAgPyAoYnl0ZSA+PiA2KSA8PCA2IC8vIFwiY29tcHJlc3NlZFwiIGluZGV4ICsgb3BlcmF0aW9uXG4gICAgICAgICAgICAgICAgOiBieXRlOyAvLyBcInVuY29tcHJlc3NlZFwiIGluZGV4ICsgb3BlcmF0aW9uIChhcnJheS9tYXAgaXRlbXMpXG5cbiAgICAgICAgICAgIGlmIChvcGVyYXRpb24gPT09IE9QRVJBVElPTi5DTEVBUikge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcmVmYWN0b3IgbWUhXG4gICAgICAgICAgICAgICAgLy8gVGhlIGAuY2xlYXIoKWAgbWV0aG9kIGlzIGNhbGxpbmcgYCRyb290LnJlbW92ZVJlZihyZWZJZClgIGZvclxuICAgICAgICAgICAgICAgIC8vIGVhY2ggaXRlbSBpbnNpZGUgdGhpcyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAocmVmIGFzIFNjaGVtYURlY29kZXJDYWxsYmFja3MpLmNsZWFyKHRydWUpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaWVsZEluZGV4ID0gKGlzU2NoZW1hKVxuICAgICAgICAgICAgICAgID8gYnl0ZSAlIChvcGVyYXRpb24gfHwgMjU1KSAvLyBpZiBcIlJFUExBQ0VcIiBvcGVyYXRpb24gKDApLCB1c2UgMjU1XG4gICAgICAgICAgICAgICAgOiBkZWNvZGUubnVtYmVyKGJ5dGVzLCBpdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IChpc1NjaGVtYSlcbiAgICAgICAgICAgICAgICA/IChyZWZbJ19kZWZpbml0aW9uJ10uZmllbGRzQnlJbmRleFtmaWVsZEluZGV4XSlcbiAgICAgICAgICAgICAgICA6IFwiXCI7XG5cbiAgICAgICAgICAgIGxldCB0eXBlID0gY2hhbmdlVHJlZS5nZXRUeXBlKGZpZWxkSW5kZXgpO1xuICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNWYWx1ZTogYW55O1xuXG4gICAgICAgICAgICBsZXQgZHluYW1pY0luZGV4OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgICAgICAgICAgIGlmICghaXNTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlID0gcmVmWydnZXRCeUluZGV4J10oZmllbGRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKG9wZXJhdGlvbiAmIE9QRVJBVElPTi5BREQpID09PSBPUEVSQVRJT04uQUREKSB7IC8vIEFERCBvciBERUxFVEVfQU5EX0FERFxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljSW5kZXggPSAocmVmIGluc3RhbmNlb2YgTWFwU2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkZWNvZGUuc3RyaW5nKGJ5dGVzLCBpdClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZmllbGRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgcmVmWydzZXRJbmRleCddKGZpZWxkSW5kZXgsIGR5bmFtaWNJbmRleCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBoZXJlXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNJbmRleCA9IHJlZlsnZ2V0SW5kZXgnXShmaWVsZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZSA9IHJlZltgXyR7ZmllbGROYW1lfWBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRGVsZXRlIG9wZXJhdGlvbnNcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBpZiAoKG9wZXJhdGlvbiAmIE9QRVJBVElPTi5ERUxFVEUpID09PSBPUEVSQVRJT04uREVMRVRFKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24gIT09IE9QRVJBVElPTi5ERUxFVEVfQU5EX0FERCkge1xuICAgICAgICAgICAgICAgICAgICByZWZbJ2RlbGV0ZUJ5SW5kZXgnXShmaWVsZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGbGFnIGByZWZJZGAgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiBwcmV2aW91c1ZhbHVlWyckY2hhbmdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290LnJlbW92ZVJlZihwcmV2aW91c1ZhbHVlWyckY2hhbmdlcyddLnJlZklkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaWVsZE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkBjb2x5c2V1cy9zY2hlbWE6IGRlZmluaXRpb24gbWlzbWF0Y2hcIik7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgc2tpcHBpbmcgbmV4dCBieXRlcyB1bnRpbCByZWFjaGVzIGEga25vd24gc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgLy8gYnkgbG9jYWwgZGVjb2Rlci5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJdGVyYXRvcjogZGVjb2RlLkl0ZXJhdG9yID0geyBvZmZzZXQ6IGl0Lm9mZnNldCB9O1xuICAgICAgICAgICAgICAgIHdoaWxlIChpdC5vZmZzZXQgPCB0b3RhbEJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWNvZGUuc3dpdGNoU3RydWN0dXJlQ2hlY2soYnl0ZXMsIGl0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZXJhdG9yLm9mZnNldCA9IGl0Lm9mZnNldCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHJvb3QucmVmcy5oYXMoZGVjb2RlLm51bWJlcihieXRlcywgbmV4dEl0ZXJhdG9yKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGl0Lm9mZnNldCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gT1BFUkFUSU9OLkRFTEVURSkge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gRklYTUU6IHJlZmFjdG9yIG1lLlxuICAgICAgICAgICAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nLlxuICAgICAgICAgICAgICAgIC8vXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU2NoZW1hLmlzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmSWQgPSBkZWNvZGUubnVtYmVyKGJ5dGVzLCBpdCk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAkcm9vdC5yZWZzLmdldChyZWZJZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBPUEVSQVRJT04uUkVQTEFDRSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFR5cGUgPSB0aGlzLmdldFNjaGVtYVR5cGUoYnl0ZXMsIGl0LCB0eXBlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY3JlYXRlVHlwZUluc3RhbmNlKGNoaWxkVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS4kY2hhbmdlcy5yZWZJZCA9IHJlZklkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm9uQ2hhbmdlID0gcHJldmlvdXNWYWx1ZS5vbkNoYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5vblJlbW92ZSA9IHByZXZpb3VzVmFsdWUub25SZW1vdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuJGxpc3RlbmVycyA9IHByZXZpb3VzVmFsdWUuJGxpc3RlbmVycztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXS5yZWZJZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZJZCAhPT0gcHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXS5yZWZJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdC5yZW1vdmVSZWYocHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXS5yZWZJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuYWRkUmVmKHJlZklkLCB2YWx1ZSwgKHZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YodHlwZSkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIHByaW1pdGl2ZSB2YWx1ZSAobnVtYmVyLCBzdHJpbmcsIGJvb2xlYW4sIGV0YylcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlUHJpbWl0aXZlVHlwZSh0eXBlIGFzIHN0cmluZywgYnl0ZXMsIGl0KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlRGVmID0gZ2V0VHlwZShPYmplY3Qua2V5cyh0eXBlKVswXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmSWQgPSBkZWNvZGUubnVtYmVyKGJ5dGVzLCBpdCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVJlZjogU2NoZW1hRGVjb2RlckNhbGxiYWNrcyA9ICgkcm9vdC5yZWZzLmhhcyhyZWZJZCkpXG4gICAgICAgICAgICAgICAgICAgID8gcHJldmlvdXNWYWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IG5ldyB0eXBlRGVmLmNvbnN0cnVjdG9yKCk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlUmVmLmNsb25lKHRydWUpO1xuICAgICAgICAgICAgICAgIHZhbHVlLiRjaGFuZ2VzLnJlZklkID0gcmVmSWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmVzZXJ2ZSBzY2hlbWEgY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUub25BZGQgPSBwcmV2aW91c1ZhbHVlLm9uQWRkO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5vblJlbW92ZSA9IHByZXZpb3VzVmFsdWUub25SZW1vdmU7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm9uQ2hhbmdlID0gcHJldmlvdXNWYWx1ZS5vbkNoYW5nZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlWyckY2hhbmdlcyddLnJlZklkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZJZCAhPT0gcHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXS5yZWZJZFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290LnJlbW92ZVJlZihwcmV2aW91c1ZhbHVlWyckY2hhbmdlcyddLnJlZklkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgb25SZW1vdmUgaWYgc3RydWN0dXJlIGhhcyBiZWVuIHJlcGxhY2VkLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZXM6IERhdGFDaGFuZ2VbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cmllczogSXRlcmFibGVJdGVyYXRvcjxbYW55LCBhbnldPiA9IHByZXZpb3VzVmFsdWUuZW50cmllcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZXI6IEl0ZXJhdG9yUmVzdWx0PFthbnksIGFueV0+O1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChpdGVyID0gZW50cmllcy5uZXh0KCkpICYmICFpdGVyLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBpdGVyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wOiBPUEVSQVRJT04uREVMRVRFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsQ2hhbmdlcy5zZXQocHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXS5yZWZJZCwgZGVsZXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkcm9vdC5hZGRSZWYocmVmSWQsIHZhbHVlLCAodmFsdWVSZWYgIT09IHByZXZpb3VzVmFsdWUpKTtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZGVwcmVjYXRlIHByb3hpZXMgb24gbmV4dCB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgIC8vIGdldCBwcm94eSB0byB0YXJnZXQgdmFsdWUuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBpZiAodHlwZURlZi5nZXRQcm94eSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHR5cGVEZWYuZ2V0UHJveHkodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGhhc0NoYW5nZSA9IChwcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB2YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVsnJGNoYW5nZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZVsnJGNoYW5nZXMnXS5zZXRQYXJlbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VUcmVlLnJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVRyZWUucm9vdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIFNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICByZWZbZmllbGROYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIEZJWE1FOiB1c2UgYF9maWVsZGAgaW5zdGVhZCBvZiBgZmllbGRgLlxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBgZmllbGRgIGlzIGdvaW5nIHRvIHVzZSB0aGUgc2V0dGVyIG9mIHRoZSBQcm9wZXJ0eURlc2NyaXB0b3JcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGNyZWF0ZSBhIHByb3h5IGZvciBhcnJheS9tYXAuIFRoaXMgaXMgb25seSB1c2VmdWwgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IHdpdGggQGNvbHlzZXVzL3NjaGVtYUAwLjUueFxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAvLyByZWZbX2ZpZWxkXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZWYgaW5zdGFuY2VvZiBNYXBTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qga2V5ID0gcmVmWyckaW5kZXhlcyddLmdldChmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGR5bmFtaWNJbmRleCBhcyBzdHJpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVmLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmWyckaXRlbXMnXS5zZXQoa2V5LCB2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlZiBpbnN0YW5jZW9mIEFycmF5U2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGtleSA9IHJlZlsnJGluZGV4ZXMnXVtmaWVsZF07XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU0VUVElORyBGT1IgQXJyYXlTY2hlbWEgPT5cIiwgeyBmaWVsZCwga2V5LCB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVmW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLnNldEF0KGZpZWxkSW5kZXgsIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlZiBpbnN0YW5jZW9mIENvbGxlY3Rpb25TY2hlbWEgfHxcbiAgICAgICAgICAgICAgICAgICAgcmVmIGluc3RhbmNlb2YgU2V0U2NoZW1hXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcmVmLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlZlsnc2V0SW5kZXgnXShmaWVsZEluZGV4LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlXG4gICAgICAgICAgICAgICAgLy8gJiZcbiAgICAgICAgICAgICAgICAvLyAoXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMub25DaGFuZ2UgfHwgcmVmLiRsaXN0ZW5lcnNbZmllbGRdXG4gICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgb3A6IG9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY0luZGV4LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2VzKGFsbENoYW5nZXMpO1xuXG4gICAgICAgIC8vIGRyb3AgcmVmZXJlbmNlcyBvZiB1bnVzZWQgc2NoZW1hc1xuICAgICAgICAkcm9vdC5nYXJiYWdlQ29sbGVjdERlbGV0ZWRSZWZzKCk7XG5cbiAgICAgICAgcmV0dXJuIGFsbENoYW5nZXM7XG4gICAgfVxuXG4gICAgZW5jb2RlKFxuICAgICAgICBlbmNvZGVBbGwgPSBmYWxzZSxcbiAgICAgICAgYnl0ZXM6IG51bWJlcltdID0gW10sXG4gICAgICAgIHVzZUZpbHRlcnM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgcmVmSWRzVmlzaXRlZCA9IG5ldyBXZWFrU2V0PENoYW5nZVRyZWU+KCk7XG5cbiAgICAgICAgY29uc3QgY2hhbmdlVHJlZXM6IENoYW5nZVRyZWVbXSA9IFt0aGlzLiRjaGFuZ2VzXTtcbiAgICAgICAgbGV0IG51bUNoYW5nZVRyZWVzID0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYW5nZVRyZWVzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZVRyZWUgPSBjaGFuZ2VUcmVlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IGNoYW5nZVRyZWUucmVmO1xuICAgICAgICAgICAgY29uc3QgaXNTY2hlbWEgPSAocmVmIGluc3RhbmNlb2YgU2NoZW1hKTtcblxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgdW5pcXVlIHJlZklkIGZvciB0aGUgQ2hhbmdlVHJlZS5cbiAgICAgICAgICAgIGNoYW5nZVRyZWUuZW5zdXJlUmVmSWQoKTtcblxuICAgICAgICAgICAgLy8gbWFyayB0aGlzIENoYW5nZVRyZWUgYXMgdmlzaXRlZC5cbiAgICAgICAgICAgIHJlZklkc1Zpc2l0ZWQuYWRkKGNoYW5nZVRyZWUpO1xuXG4gICAgICAgICAgICAvLyByb290IGByZWZJZGAgaXMgc2tpcHBlZC5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjaGFuZ2VUcmVlLnJlZklkID4gMCAmJlxuICAgICAgICAgICAgICAgIChjaGFuZ2VUcmVlLmNoYW5nZWQgfHwgZW5jb2RlQWxsKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZW5jb2RlLnVpbnQ4KGJ5dGVzLCBTV0lUQ0hfVE9fU1RSVUNUVVJFKTtcbiAgICAgICAgICAgICAgICBlbmNvZGUubnVtYmVyKGJ5dGVzLCBjaGFuZ2VUcmVlLnJlZklkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY2hhbmdlczogQ2hhbmdlT3BlcmF0aW9uW10gfCBudW1iZXJbXSA9IChlbmNvZGVBbGwpXG4gICAgICAgICAgICAgICAgPyBBcnJheS5mcm9tKGNoYW5nZVRyZWUuYWxsQ2hhbmdlcylcbiAgICAgICAgICAgICAgICA6IEFycmF5LmZyb20oY2hhbmdlVHJlZS5jaGFuZ2VzLnZhbHVlcygpKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGNsID0gY2hhbmdlcy5sZW5ndGg7IGogPCBjbDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3BlcmF0aW9uOiBDaGFuZ2VPcGVyYXRpb24gPSAoZW5jb2RlQWxsKVxuICAgICAgICAgICAgICAgICAgICA/IHsgb3A6IE9QRVJBVElPTi5BREQsIGluZGV4OiBjaGFuZ2VzW2pdIGFzIG51bWJlciB9XG4gICAgICAgICAgICAgICAgICAgIDogY2hhbmdlc1tqXSBhcyBDaGFuZ2VPcGVyYXRpb247XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZEluZGV4ID0gb3BlcmF0aW9uLmluZGV4O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSAoaXNTY2hlbWEpXG4gICAgICAgICAgICAgICAgICAgID8gcmVmWydfZGVmaW5pdGlvbiddLmZpZWxkc0J5SW5kZXggJiYgcmVmWydfZGVmaW5pdGlvbiddLmZpZWxkc0J5SW5kZXhbZmllbGRJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgOiBmaWVsZEluZGV4O1xuXG4gICAgICAgICAgICAgICAgLy8gY2FjaGUgYmVnaW4gaW5kZXggaWYgYHVzZUZpbHRlcnNgXG4gICAgICAgICAgICAgICAgY29uc3QgYmVnaW5JbmRleCA9IGJ5dGVzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIC8vIGVuY29kZSBmaWVsZCBpbmRleCArIG9wZXJhdGlvblxuICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24ub3AgIT09IE9QRVJBVElPTi5UT1VDSCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb21wcmVzcyBgZmllbGRJbmRleGAgKyBgb3BlcmF0aW9uYCBpbnRvIGEgc2luZ2xlIGJ5dGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFkZHMgYSBsaW1pdGFpb24gb2YgNjQgZmllbGRzIHBlciBTY2hlbWEgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlLnVpbnQ4KGJ5dGVzLCAoZmllbGRJbmRleCB8IG9wZXJhdGlvbi5vcCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGUudWludDgoYnl0ZXMsIG9wZXJhdGlvbi5vcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGN1c3RvbSBvcGVyYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uLm9wID09PSBPUEVSQVRJT04uQ0xFQVIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5kZXhlZCBvcGVyYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGUubnVtYmVyKGJ5dGVzLCBmaWVsZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gZW5jb2RlIFwiYWxpYXNcIiBmb3IgZHluYW1pYyBmaWVsZHMgKG1hcHMpXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICFpc1NjaGVtYSAmJlxuICAgICAgICAgICAgICAgICAgICAob3BlcmF0aW9uLm9wICYgT1BFUkFUSU9OLkFERCkgPT0gT1BFUkFUSU9OLkFERCAvLyBBREQgb3IgREVMRVRFX0FORF9BRERcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIE1hcFNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hcFNjaGVtYSBkeW5hbWljIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNJbmRleCA9IGNoYW5nZVRyZWUucmVmWyckaW5kZXhlcyddLmdldChmaWVsZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZS5zdHJpbmcoYnl0ZXMsIGR5bmFtaWNJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uLm9wID09PSBPUEVSQVRJT04uREVMRVRFKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBmcm9tIGZpbHRlciBjYWNoZSBkYXRhLlxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXNlRmlsdGVycykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZGVsZXRlIGNoYW5nZVRyZWUuY2FjaGVzW2ZpZWxkSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHR5cGUgPSBjaGFuZ2VUcmVlLmNoaWxkVHlwZSB8fCByZWYuX3NjaGVtYVtmaWVsZF07XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoYW5nZVRyZWUuZ2V0VHlwZShmaWVsZEluZGV4KTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHR5cGUgPSBjaGFuZ2VUcmVlLmdldFR5cGUoZmllbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFuZ2VUcmVlLmdldFZhbHVlKGZpZWxkSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgLy8gRW5xdWV1ZSBDaGFuZ2VUcmVlIHRvIGJlIHZpc2l0ZWRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICYmXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlWyckY2hhbmdlcyddICYmXG4gICAgICAgICAgICAgICAgICAgICFyZWZJZHNWaXNpdGVkLmhhcyh2YWx1ZVsnJGNoYW5nZXMnXSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlVHJlZXMucHVzaCh2YWx1ZVsnJGNoYW5nZXMnXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlWyckY2hhbmdlcyddLmVuc3VyZVJlZklkKCk7XG4gICAgICAgICAgICAgICAgICAgIG51bUNoYW5nZVRyZWVzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5vcCA9PT0gT1BFUkFUSU9OLlRPVUNIKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChTY2hlbWEuaXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0SW5zdGFuY2VUeXBlKHZhbHVlLCB0eXBlIGFzIHR5cGVvZiBTY2hlbWEsIHJlZiBhcyBTY2hlbWEsIGZpZWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBFbmNvZGUgcmVmSWQgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBhY3R1YWwgaW5zdGFuY2UgaXMgZ29pbmcgdG8gYmUgZW5jb2RlZCBvbiBuZXh0IGBjaGFuZ2VUcmVlYCBpdGVyYXRpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZS5udW1iZXIoYnl0ZXMsIHZhbHVlLiRjaGFuZ2VzLnJlZklkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZW5jb2RlIGluaGVyaXRlZCBUWVBFX0lEIGlmIGl0J3MgYW4gQUREIG9wZXJhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKChvcGVyYXRpb24ub3AgJiBPUEVSQVRJT04uQUREKSA9PT0gT1BFUkFUSU9OLkFERCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlFbmNvZGVUeXBlSWQoYnl0ZXMsIHR5cGUgYXMgdHlwZW9mIFNjaGVtYSwgdmFsdWUuY29uc3RydWN0b3IgYXMgdHlwZW9mIFNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKHR5cGUpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIFByaW1pdGl2ZSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlUHJpbWl0aXZlVHlwZSh0eXBlIGFzIFByaW1pdGl2ZVR5cGUsIGJ5dGVzLCB2YWx1ZSwgcmVmIGFzIFNjaGVtYSwgZmllbGQpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQ3VzdG9tIHR5cGUgKE1hcFNjaGVtYSwgQXJyYXlTY2hlbWEsIGV0YylcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IGdldFR5cGUoT2JqZWN0LmtleXModHlwZSlbMF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBhIEFycmF5U2NoZW1hIGhhcyBiZWVuIHByb3ZpZGVkXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydEluc3RhbmNlVHlwZShyZWZbYF8ke2ZpZWxkfWBdLCBkZWZpbml0aW9uLmNvbnN0cnVjdG9yLCByZWYgYXMgU2NoZW1hLCBmaWVsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gRW5jb2RlIHJlZklkIGZvciB0aGlzIGluc3RhbmNlLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYWN0dWFsIGluc3RhbmNlIGlzIGdvaW5nIHRvIGJlIGVuY29kZWQgb24gbmV4dCBgY2hhbmdlVHJlZWAgaXRlcmF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGUubnVtYmVyKGJ5dGVzLCB2YWx1ZS4kY2hhbmdlcy5yZWZJZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHVzZUZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FjaGUgYmVnaW4gLyBlbmQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlVHJlZS5jYWNoZShmaWVsZEluZGV4IGFzIG51bWJlciwgYnl0ZXMuc2xpY2UoYmVnaW5JbmRleCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFlbmNvZGVBbGwgJiYgIXVzZUZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VUcmVlLmRpc2NhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG5cbiAgICBlbmNvZGVBbGwgKHVzZUZpbHRlcnM/OiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZSh0cnVlLCBbXSwgdXNlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJzKGNsaWVudDogQ2xpZW50LCBlbmNvZGVBbGw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCByb290ID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVmSWRzRGlzc2FsbG93ZWQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICAgICAgICBjb25zdCAkZmlsdGVyU3RhdGUgPSBDbGllbnRTdGF0ZS5nZXQoY2xpZW50KTtcblxuICAgICAgICBjb25zdCBjaGFuZ2VUcmVlcyA9IFt0aGlzLiRjaGFuZ2VzXTtcbiAgICAgICAgbGV0IG51bUNoYW5nZVRyZWVzID0gMTtcblxuICAgICAgICBsZXQgZmlsdGVyZWRCeXRlczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYW5nZVRyZWVzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZVRyZWUgPSBjaGFuZ2VUcmVlc1tpXTtcblxuICAgICAgICAgICAgaWYgKHJlZklkc0Rpc3NhbGxvd2VkLmhhcyhjaGFuZ2VUcmVlLnJlZklkKSkgIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlJFRklEIElTIE5PVCBBTExPV0VELiBTS0lQLlwiLCB7IHJlZklkOiBjaGFuZ2VUcmVlLnJlZklkIH0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IGNoYW5nZVRyZWUucmVmIGFzIFJlZjtcbiAgICAgICAgICAgIGNvbnN0IGlzU2NoZW1hOiBib29sZWFuID0gcmVmIGluc3RhbmNlb2YgU2NoZW1hO1xuXG4gICAgICAgICAgICBlbmNvZGUudWludDgoZmlsdGVyZWRCeXRlcywgU1dJVENIX1RPX1NUUlVDVFVSRSk7XG4gICAgICAgICAgICBlbmNvZGUubnVtYmVyKGZpbHRlcmVkQnl0ZXMsIGNoYW5nZVRyZWUucmVmSWQpO1xuXG4gICAgICAgICAgICBjb25zdCBjbGllbnRIYXNSZWZJZCA9ICRmaWx0ZXJTdGF0ZS5yZWZJZHMuaGFzKGNoYW5nZVRyZWUpO1xuICAgICAgICAgICAgY29uc3QgaXNFbmNvZGVBbGwgPSAoZW5jb2RlQWxsIHx8ICFjbGllbnRIYXNSZWZJZCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUkVGOlwiLCByZWYuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVuY29kZSBhbGw/XCIsIGlzRW5jb2RlQWxsKTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGluY2x1ZGUgYGNoYW5nZVRyZWVgIG9uIGxpc3Qgb2Yga25vd24gcmVmSWRzIGJ5IHRoaXMgY2xpZW50LlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICRmaWx0ZXJTdGF0ZS5hZGRSZWZJZChjaGFuZ2VUcmVlKTtcblxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVySW5kZXhlcyA9ICRmaWx0ZXJTdGF0ZS5jb250YWluZXJJbmRleGVzLmdldChjaGFuZ2VUcmVlKVxuICAgICAgICAgICAgY29uc3QgY2hhbmdlcyA9IChpc0VuY29kZUFsbClcbiAgICAgICAgICAgICAgICA/IEFycmF5LmZyb20oY2hhbmdlVHJlZS5hbGxDaGFuZ2VzKVxuICAgICAgICAgICAgICAgIDogQXJyYXkuZnJvbShjaGFuZ2VUcmVlLmNoYW5nZXMudmFsdWVzKCkpO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV09SS0FST1VORDogdHJpZXMgdG8gcmUtZXZhbHVhdGUgcHJldmlvdXNseSBub3QgaW5jbHVkZWQgQGZpbHRlcigpIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIC8vIC0gc2VlIFwiREVMRVRFIGEgZmllbGQgb2YgU2NoZW1hXCIgdGVzdCBjYXNlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhZW5jb2RlQWxsICYmXG4gICAgICAgICAgICAgICAgaXNTY2hlbWEgJiZcbiAgICAgICAgICAgICAgICAocmVmIGFzIFNjaGVtYSkuX2RlZmluaXRpb24uaW5kZXhlc1dpdGhGaWx0ZXJzXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleGVzV2l0aEZpbHRlcnMgPSAocmVmIGFzIFNjaGVtYSkuX2RlZmluaXRpb24uaW5kZXhlc1dpdGhGaWx0ZXJzO1xuICAgICAgICAgICAgICAgIGluZGV4ZXNXaXRoRmlsdGVycy5mb3JFYWNoKGluZGV4V2l0aEZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICFjb250YWluZXJJbmRleGVzLmhhcyhpbmRleFdpdGhGaWx0ZXIpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VUcmVlLmFsbENoYW5nZXMuaGFzKGluZGV4V2l0aEZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmNvZGVBbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goaW5kZXhXaXRoRmlsdGVyIGFzIGFueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlcy5wdXNoKHsgb3A6IE9QRVJBVElPTi5BREQsIGluZGV4OiBpbmRleFdpdGhGaWx0ZXIsIH0gYXMgYW55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgY2wgPSBjaGFuZ2VzLmxlbmd0aDsgaiA8IGNsOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2U6IENoYW5nZU9wZXJhdGlvbiA9IChpc0VuY29kZUFsbClcbiAgICAgICAgICAgICAgICAgICAgPyB7IG9wOiBPUEVSQVRJT04uQURELCBpbmRleDogY2hhbmdlc1tqXSBhcyBudW1iZXIgfVxuICAgICAgICAgICAgICAgICAgICA6IGNoYW5nZXNbal0gYXMgQ2hhbmdlT3BlcmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY3VzdG9tIG9wZXJhdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLm9wID09PSBPUEVSQVRJT04uQ0xFQVIpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlLnVpbnQ4KGZpbHRlcmVkQnl0ZXMsIGNoYW5nZS5vcCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkSW5kZXggPSBjaGFuZ2UuaW5kZXg7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIERlbGV0aW5nIGZpZWxkczogZW5jb2RlIHRoZSBvcGVyYXRpb24gKyBmaWVsZCBpbmRleFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5vcCA9PT0gT1BFUkFUSU9OLkRFTEVURSkge1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBERUxFVEUgb3BlcmF0aW9ucyBhbHNvIG5lZWQgdG8gZ28gdGhyb3VnaCBmaWx0ZXJpbmcuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNhY2hlIHRoZSBwcmV2aW91cyB2YWx1ZSBzbyB3ZSBjYW4gYWNjZXNzIHRoZSB2YWx1ZSAocHJpbWl0aXZlIG9yIGByZWZJZGApXG4gICAgICAgICAgICAgICAgICAgIC8vIChjaGVjayBhZ2FpbnN0IGAkZmlsdGVyU3RhdGUucmVmSWRzYClcbiAgICAgICAgICAgICAgICAgICAgLy9cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZS51aW50OChmaWx0ZXJlZEJ5dGVzLCBjaGFuZ2Uub3AgfCBmaWVsZEluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlLnVpbnQ4KGZpbHRlcmVkQnl0ZXMsIGNoYW5nZS5vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGUubnVtYmVyKGZpbHRlcmVkQnl0ZXMsIGZpZWxkSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaW5kZXhlZCBvcGVyYXRpb25cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNoYW5nZVRyZWUuZ2V0VmFsdWUoZmllbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoYW5nZVRyZWUuZ2V0VHlwZShmaWVsZEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJcyBhIFNjaGVtYSFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlZiBhcyBTY2hlbWEpLl9kZWZpbml0aW9uLmZpbHRlcnMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZWYgYXMgU2NoZW1hKS5fZGVmaW5pdGlvbi5maWx0ZXJzW2ZpZWxkSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlciAmJiAhZmlsdGVyLmNhbGwocmVmLCBjbGllbnQsIHZhbHVlLCByb290KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlWyckY2hhbmdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmSWRzRGlzc2FsbG93ZWQuYWRkKHZhbHVlWyckY2hhbmdlcyddLnJlZklkKTs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXMgYSBjb2xsZWN0aW9uISAobWFwLCBhcnJheSwgZXRjLilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY2hhbmdlVHJlZS5wYXJlbnQgYXMgUmVmO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBjaGFuZ2VUcmVlLmdldENoaWxkcmVuRmlsdGVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlciAmJiAhZmlsdGVyLmNhbGwocGFyZW50LCBjbGllbnQsIHJlZlsnJGluZGV4ZXMnXS5nZXQoZmllbGRJbmRleCksIHZhbHVlLCByb290KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlWyckY2hhbmdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmSWRzRGlzc2FsbG93ZWQuYWRkKHZhbHVlWyckY2hhbmdlcyddLnJlZklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdmlzaXQgY2hpbGQgQ2hhbmdlVHJlZSBvbiBmdXJ0aGVyIGl0ZXJhdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWVbJyRjaGFuZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlVHJlZXMucHVzaCh2YWx1ZVsnJGNoYW5nZXMnXSk7XG4gICAgICAgICAgICAgICAgICAgIG51bUNoYW5nZVRyZWVzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBDb3B5IGNhY2hlZCBieXRlc1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5vcCAhPT0gT1BFUkFUSU9OLlRPVUNIKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVmYWN0b3IgbWUhXG4gICAgICAgICAgICAgICAgICAgIC8vXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5vcCA9PT0gT1BFUkFUSU9OLkFERCB8fCBpc1NjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBjYWNoZWQgYnl0ZXMgZGlyZWN0bHkgaWYgaXMgZnJvbSBTY2hlbWEgdHlwZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEJ5dGVzID0gZmlsdGVyZWRCeXRlcy5jb25jYXQoY2hhbmdlVHJlZS5jYWNoZXNbZmllbGRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVySW5kZXhlcy5hZGQoZmllbGRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJJbmRleGVzLmhhcyhmaWVsZEluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNhY2hlZCBieXRlcyBpZiBhbHJlYWR5IGhhcyB0aGUgZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQnl0ZXMgPSBmaWx0ZXJlZEJ5dGVzLmNvbmNhdChjaGFuZ2VUcmVlLmNhY2hlc1tmaWVsZEluZGV4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3JjZSBBREQgb3BlcmF0aW9uIGlmIGZpZWxkIGlzIG5vdCBrbm93biBieSB0aGlzIGNsaWVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckluZGV4ZXMuYWRkKGZpZWxkSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlLnVpbnQ4KGZpbHRlcmVkQnl0ZXMsIE9QRVJBVElPTi5BREQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZS5udW1iZXIoZmlsdGVyZWRCeXRlcywgZmllbGRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVmIGluc3RhbmNlb2YgTWFwU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hcFNjaGVtYSBkeW5hbWljIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkeW5hbWljSW5kZXggPSBjaGFuZ2VUcmVlLnJlZlsnJGluZGV4ZXMnXS5nZXQoZmllbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZS5zdHJpbmcoZmlsdGVyZWRCeXRlcywgZHluYW1pY0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbJyRjaGFuZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlLm51bWJlcihmaWx0ZXJlZEJ5dGVzLCB2YWx1ZVsnJGNoYW5nZXMnXS5yZWZJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcImVuY29kZVByaW1pdGl2ZVR5cGVcIiB3aXRob3V0IHR5cGUgY2hlY2tpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB0eXBlIGNoZWNraW5nIGhhcyBiZWVuIGRvbmUgb24gdGhlIGZpcnN0IC5lbmNvZGUoKSBjYWxsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVbdHlwZSBhcyBzdHJpbmddKGZpbHRlcmVkQnl0ZXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVbJyRjaGFuZ2VzJ10gJiYgIWlzU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86XG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdHJhY2sgQUREL1JFUExBQ0UvREVMRVRFIGluc3RhbmNlcyBvbiBgJGZpbHRlclN0YXRlYFxuICAgICAgICAgICAgICAgICAgICAvLyAtIGRvIE5PVCBhbHdheXMgZW5jb2RlIGR5bmFtaWNJbmRleCBmb3IgTWFwU2NoZW1hLlxuICAgICAgICAgICAgICAgICAgICAvLyAgIChJZiBjbGllbnQgYWxyZWFkeSBoYXMgdGhhdCBrZXksIG9ubHkgdGhlIGZpcnN0IGluZGV4IGlzIG5lY2Vzc2FyeS4pXG4gICAgICAgICAgICAgICAgICAgIC8vXG5cbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlLnVpbnQ4KGZpbHRlcmVkQnl0ZXMsIE9QRVJBVElPTi5BREQpO1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGUubnVtYmVyKGZpbHRlcmVkQnl0ZXMsIGZpZWxkSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBNYXBTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXBTY2hlbWEgZHluYW1pYyBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkeW5hbWljSW5kZXggPSBjaGFuZ2VUcmVlLnJlZlsnJGluZGV4ZXMnXS5nZXQoZmllbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGUuc3RyaW5nKGZpbHRlcmVkQnl0ZXMsIGR5bmFtaWNJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbmNvZGUubnVtYmVyKGZpbHRlcmVkQnl0ZXMsIHZhbHVlWyckY2hhbmdlcyddLnJlZklkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRCeXRlcztcbiAgICB9XG5cbiAgICBjbG9uZSAoKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IGNsb25lZCA9IG5ldyAoKHRoaXMgYXMgYW55KS5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMuX2RlZmluaXRpb24uc2NoZW1hO1xuICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBzY2hlbWEpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgKHRoaXNbZmllbGRdKSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiAodGhpc1tmaWVsZF0uY2xvbmUpID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIGRlZXAgY2xvbmVcbiAgICAgICAgICAgICAgICBjbG9uZWRbZmllbGRdID0gdGhpc1tmaWVsZF0uY2xvbmUoKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwcmltaXRpdmUgdmFsdWVzXG4gICAgICAgICAgICAgICAgY2xvbmVkW2ZpZWxkXSA9IHRoaXNbZmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbG9uZWQ7XG4gICAgfVxuXG4gICAgdHJpZ2dlckFsbCgpIHtcbiAgICAgICAgY29uc3QgYWxsQ2hhbmdlcyA9IG5ldyBNYXA8bnVtYmVyLCBEYXRhQ2hhbmdlW10+KCk7XG4gICAgICAgIFNjaGVtYS5wcm90b3R5cGUuX3RyaWdnZXJBbGxGaWxsQ2hhbmdlcy5jYWxsKHRoaXMsIHRoaXMsIGFsbENoYW5nZXMpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBTY2hlbWEucHJvdG90eXBlLl90cmlnZ2VyQ2hhbmdlcy5jYWxsKHRoaXMsIGFsbENoYW5nZXMpO1xuXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIFNjaGVtYS5vbkVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9KU09OICgpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5fZGVmaW5pdGlvbi5zY2hlbWE7XG4gICAgICAgIGNvbnN0IGRlcHJlY2F0ZWQgPSB0aGlzLl9kZWZpbml0aW9uLmRlcHJlY2F0ZWQ7XG5cbiAgICAgICAgY29uc3Qgb2JqID0ge31cbiAgICAgICAgZm9yIChsZXQgZmllbGQgaW4gc2NoZW1hKSB7XG4gICAgICAgICAgICBpZiAoIWRlcHJlY2F0ZWRbZmllbGRdICYmIHRoaXNbZmllbGRdICE9PSBudWxsICYmIHR5cGVvZiAodGhpc1tmaWVsZF0pICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgb2JqW2ZpZWxkXSA9ICh0eXBlb2YgKHRoaXNbZmllbGRdWyd0b0pTT04nXSkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzW2ZpZWxkXVsndG9KU09OJ10oKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXNbYF8ke2ZpZWxkfWBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgZGlzY2FyZEFsbENoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuJGNoYW5nZXMuZGlzY2FyZEFsbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRCeUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbdGhpcy5fZGVmaW5pdGlvbi5maWVsZHNCeUluZGV4W2luZGV4XV07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRlbGV0ZUJ5SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzW3RoaXMuX2RlZmluaXRpb24uZmllbGRzQnlJbmRleFtpbmRleF1dID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJ5RW5jb2RlVHlwZUlkIChieXRlczogbnVtYmVyW10sIHR5cGU6IHR5cGVvZiBTY2hlbWEsIHRhcmdldFR5cGU6IHR5cGVvZiBTY2hlbWEpIHtcbiAgICAgICAgaWYgKHR5cGUuX3R5cGVpZCAhPT0gdGFyZ2V0VHlwZS5fdHlwZWlkKSB7XG4gICAgICAgICAgICBlbmNvZGUudWludDgoYnl0ZXMsIFRZUEVfSUQpO1xuICAgICAgICAgICAgZW5jb2RlLm51bWJlcihieXRlcywgdGFyZ2V0VHlwZS5fdHlwZWlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2NoZW1hVHlwZShieXRlczogbnVtYmVyW10sIGl0OiBkZWNvZGUuSXRlcmF0b3IsIGRlZmF1bHRUeXBlOiB0eXBlb2YgU2NoZW1hKTogdHlwZW9mIFNjaGVtYSB7XG4gICAgICAgIGxldCB0eXBlOiB0eXBlb2YgU2NoZW1hO1xuXG4gICAgICAgIGlmIChieXRlc1tpdC5vZmZzZXRdID09PSBUWVBFX0lEKSB7XG4gICAgICAgICAgICBpdC5vZmZzZXQrKztcbiAgICAgICAgICAgIHR5cGUgPSAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgU2NoZW1hKS5fY29udGV4dC5nZXQoZGVjb2RlLm51bWJlcihieXRlcywgaXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0eXBlIHx8IGRlZmF1bHRUeXBlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVHlwZUluc3RhbmNlICh0eXBlOiB0eXBlb2YgU2NoZW1hKTogU2NoZW1hIHtcbiAgICAgICAgbGV0IGluc3RhbmNlOiBTY2hlbWEgPSBuZXcgKHR5cGUgYXMgYW55KSgpO1xuXG4gICAgICAgIC8vIGFzc2lnbiByb290IG9uICRjaGFuZ2VzXG4gICAgICAgIGluc3RhbmNlLiRjaGFuZ2VzLnJvb3QgPSB0aGlzLiRjaGFuZ2VzLnJvb3Q7XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyaWdnZXJBbGxGaWxsQ2hhbmdlcyhyZWY6IFJlZiwgYWxsQ2hhbmdlczogTWFwPG51bWJlciwgRGF0YUNoYW5nZVtdPikge1xuICAgICAgICBpZiAoYWxsQ2hhbmdlcy5oYXMocmVmWyckY2hhbmdlcyddLnJlZklkKSkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBjaGFuZ2VzOiBEYXRhQ2hhbmdlW10gPSBbXTtcbiAgICAgICAgYWxsQ2hhbmdlcy5zZXQocmVmWyckY2hhbmdlcyddLnJlZklkIHx8IDAsIGNoYW5nZXMpO1xuXG4gICAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBTY2hlbWEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IHJlZi5fZGVmaW5pdGlvbi5zY2hlbWE7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBpbiBzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfZmllbGQgPSBgXyR7ZmllbGROYW1lfWA7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVmW19maWVsZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3A6IE9QRVJBVElPTi5BREQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZmllbGROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlZltfZmllbGRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChTY2hlbWEuaXMoc2NoZW1hW2ZpZWxkTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTY2hlbWEucHJvdG90eXBlLl90cmlnZ2VyQWxsRmlsbENoYW5nZXMuY2FsbCh0aGlzLCByZWZbX2ZpZWxkXSwgYWxsQ2hhbmdlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IE9iamVjdC5rZXlzKHNjaGVtYVtmaWVsZE5hbWVdKVswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzY2hlbWFbZmllbGROYW1lXVtmaWVsZFR5cGVdKSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjaGVtYS5wcm90b3R5cGUuX3RyaWdnZXJBbGxGaWxsQ2hhbmdlcy5jYWxsKHRoaXMsIHJlZltfZmllbGRdLCBhbGxDaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZW50cmllczogSXRlcmFibGVJdGVyYXRvcjxbYW55LCBhbnldPiAgPSByZWYuZW50cmllcygpO1xuICAgICAgICAgICAgbGV0IGl0ZXI6IEl0ZXJhdG9yUmVzdWx0PFthbnksIGFueV0+O1xuXG4gICAgICAgICAgICB3aGlsZSAoKGl0ZXIgPSBlbnRyaWVzLm5leHQoKSkgJiYgIWl0ZXIuZG9uZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGl0ZXIudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBvcDogT1BFUkFUSU9OLkFERCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBTY2hlbWEucHJvdG90eXBlLl90cmlnZ2VyQWxsRmlsbENoYW5nZXMuY2FsbCh0aGlzLCB2YWx1ZSwgYWxsQ2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmlnZ2VyQ2hhbmdlcyhhbGxDaGFuZ2VzOiBNYXA8bnVtYmVyLCBEYXRhQ2hhbmdlW10+KSB7XG4gICAgICAgIGFsbENoYW5nZXMuZm9yRWFjaCgoY2hhbmdlcywgcmVmSWQpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWYgPSB0aGlzLiRjaGFuZ2VzLnJvb3QucmVmcy5nZXQocmVmSWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2NoZW1hID0gcmVmIGluc3RhbmNlb2YgU2NoZW1hO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0gcmVmWyckbGlzdGVuZXJzJ10gJiYgcmVmWyckbGlzdGVuZXJzJ11bY2hhbmdlLmZpZWxkXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLm9wID09PSBPUEVSQVRJT04uQUREICYmIGNoYW5nZS5wcmV2aW91c1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVmIGFzIFNjaGVtYURlY29kZXJDYWxsYmFja3MpLm9uQWRkPy4oY2hhbmdlLnZhbHVlLCBjaGFuZ2UuZHluYW1pY0luZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2Uub3AgPT09IE9QRVJBVElPTi5ERUxFVEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZJWE1FOiBgcHJldmlvdXNWYWx1ZWAgc2hvdWxkIGFsd2F5cyBiZSBhdmFpaWFibGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQUREICsgREVMRVRFIG9wZXJhdGlvbnMgYXJlIHN0aWxsIGVuY29kaW5nIERFTEVURSBvcGVyYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVmIGFzIFNjaGVtYURlY29kZXJDYWxsYmFja3MpLm9uUmVtb3ZlPy4oY2hhbmdlLnByZXZpb3VzVmFsdWUsIGNoYW5nZS5keW5hbWljSW5kZXggfHwgY2hhbmdlLmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLm9wID09PSBPUEVSQVRJT04uREVMRVRFX0FORF9BREQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVmIGFzIFNjaGVtYURlY29kZXJDYWxsYmFja3MpLm9uUmVtb3ZlPy4oY2hhbmdlLnByZXZpb3VzVmFsdWUsIGNoYW5nZS5keW5hbWljSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVmIGFzIFNjaGVtYURlY29kZXJDYWxsYmFja3MpLm9uQWRkPy4oY2hhbmdlLnZhbHVlLCBjaGFuZ2UuZHluYW1pY0luZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2Uub3AgPT09IE9QRVJBVElPTi5SRVBMQUNFIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLnZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlZiBhcyBTY2hlbWFEZWNvZGVyQ2FsbGJhY2tzKS5vbkNoYW5nZT8uKGNoYW5nZS52YWx1ZSwgY2hhbmdlLmR5bmFtaWNJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIG9uUmVtb3ZlIG9uIGNoaWxkIHN0cnVjdHVyZS5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZS5vcCAmIE9QRVJBVElPTi5ERUxFVEUpID09PSBPUEVSQVRJT04uREVMRVRFICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UucHJldmlvdXNWYWx1ZSBpbnN0YW5jZW9mIFNjaGVtYSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLnByZXZpb3VzVmFsdWUub25SZW1vdmVcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UucHJldmlvdXNWYWx1ZS5vblJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmludm9rZShjaGFuZ2UudmFsdWUsIGNoYW5nZS5wcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY2hlbWEub25FcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1NjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVmLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZWYgYXMgU2NoZW1hKS5vbkNoYW5nZShjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY2hlbWEub25FcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = exports.registerType = void 0;
var registeredTypes = {};
function registerType(identifier, definition) {
    registeredTypes[identifier] = definition;
}
exports.registerType = registerType;
function getType(identifier) {
    return registeredTypes[identifier];
}
exports.getType = getType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsSUFBTSxlQUFlLEdBQTRDLEVBQUUsQ0FBQztBQUVwRSxTQUFnQixZQUFZLENBQUMsVUFBa0IsRUFBRSxVQUEwQjtJQUN2RSxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQzdDLENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxVQUFrQjtJQUN0QyxPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRkQsMEJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFR5cGVEZWZpbml0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcjogYW55LFxuXG4gICAgLy9cbiAgICAvLyBUT0RPOiBkZXByZWNhdGUgcHJveHkgb24gbmV4dCB2ZXJzaW9uXG4gICAgLy8gdGhlIHByb3h5IGlzIHVzZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCB2ZXJzaW9ucyA8MS4wLjAgb2YgQGNvbHlzZXVzL3NjaGVtYVxuICAgIC8vXG4gICAgZ2V0UHJveHk/OiBhbnksXG59XG5cbmNvbnN0IHJlZ2lzdGVyZWRUeXBlczoge1tpZGVudGlmaWVyOiBzdHJpbmddIDogVHlwZURlZmluaXRpb259ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclR5cGUoaWRlbnRpZmllcjogc3RyaW5nLCBkZWZpbml0aW9uOiBUeXBlRGVmaW5pdGlvbikge1xuICAgIHJlZ2lzdGVyZWRUeXBlc1tpZGVudGlmaWVyXSA9IGRlZmluaXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlKGlkZW50aWZpZXI6IHN0cmluZyk6IFR5cGVEZWZpbml0aW9uIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJlZFR5cGVzW2lkZW50aWZpZXJdO1xufSJdfQ==

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTree = exports.Root = void 0;
var spec_1 = __webpack_require__(0);
var Schema_1 = __webpack_require__(1);
//
// Root holds all schema references by unique id
//
var Root = /** @class */ (function () {
    function Root() {
        //
        // Relation of refId => Schema structure
        // For direct access of structures during decoding time.
        //
        this.refs = new Map();
        this.refCounts = {};
        this.deletedRefs = new Set();
        this.nextUniqueId = 0;
    }
    Root.prototype.getNextUniqueId = function () {
        return this.nextUniqueId++;
    };
    // for decoding
    Root.prototype.addRef = function (refId, ref, incrementCount) {
        if (incrementCount === void 0) { incrementCount = true; }
        this.refs.set(refId, ref);
        if (incrementCount) {
            this.refCounts[refId] = (this.refCounts[refId] || 0) + 1;
        }
    };
    // for decoding
    Root.prototype.removeRef = function (refId) {
        this.refCounts[refId] = this.refCounts[refId] - 1;
        this.deletedRefs.add(refId);
    };
    Root.prototype.clearRefs = function () {
        this.refs.clear();
        this.deletedRefs.clear();
        this.refCounts = {};
    };
    // for decoding
    Root.prototype.garbageCollectDeletedRefs = function () {
        var _this = this;
        this.deletedRefs.forEach(function (refId) {
            if (_this.refCounts[refId] <= 0) {
                var ref = _this.refs.get(refId);
                //
                // Ensure child schema instances have their references removed as well.
                //
                if (ref instanceof Schema_1.Schema) {
                    for (var fieldName in ref['_definition'].schema) {
                        if (typeof (ref['_definition'].schema[fieldName]) !== "string" &&
                            ref[fieldName] &&
                            ref[fieldName]['$changes']) {
                            _this.removeRef(ref[fieldName]['$changes'].refId);
                        }
                    }
                }
                else {
                    var definition = ref['$changes'].parent._definition;
                    var type = definition.schema[definition.fieldsByIndex[ref['$changes'].parentIndex]];
                    if (typeof (Object.values(type)[0]) === "function") {
                        Array.from(ref.values())
                            .forEach(function (child) { return _this.removeRef(child['$changes'].refId); });
                    }
                }
                _this.refs.delete(refId);
                delete _this.refCounts[refId];
            }
        });
        // clear deleted refs.
        this.deletedRefs.clear();
    };
    return Root;
}());
exports.Root = Root;
var ChangeTree = /** @class */ (function () {
    function ChangeTree(ref, parent, root) {
        this.changed = false;
        this.changes = new Map();
        this.allChanges = new Set();
        // cached indexes for filtering
        this.caches = {};
        this.currentCustomOperation = 0;
        this.ref = ref;
        this.setParent(parent, root);
    }
    ChangeTree.prototype.setParent = function (parent, root, parentIndex) {
        var _this = this;
        if (!this.indexes) {
            this.indexes = (this.ref instanceof Schema_1.Schema)
                ? this.ref['_definition'].indexes
                : {};
        }
        this.parent = parent;
        this.parentIndex = parentIndex;
        // avoid setting parents with empty `root`
        if (!root) {
            return;
        }
        this.root = root;
        //
        // assign same parent on child structures
        //
        if (this.ref instanceof Schema_1.Schema) {
            var definition = this.ref['_definition'];
            for (var field in definition.schema) {
                var value = this.ref[field];
                if (value && value['$changes']) {
                    var parentIndex_1 = definition.indexes[field];
                    value['$changes'].setParent(this.ref, root, parentIndex_1);
                }
            }
        }
        else if (typeof (this.ref) === "object") {
            this.ref.forEach(function (value, key) {
                if (value instanceof Schema_1.Schema) {
                    var changeTreee = value['$changes'];
                    var parentIndex_2 = _this.ref['$changes'].indexes[key];
                    changeTreee.setParent(_this.ref, _this.root, parentIndex_2);
                }
            });
        }
    };
    ChangeTree.prototype.operation = function (op) {
        this.changes.set(--this.currentCustomOperation, op);
    };
    ChangeTree.prototype.change = function (fieldName, operation) {
        if (operation === void 0) { operation = spec_1.OPERATION.ADD; }
        var index = (typeof (fieldName) === "number")
            ? fieldName
            : this.indexes[fieldName];
        this.assertValidIndex(index, fieldName);
        var previousChange = this.changes.get(index);
        if (!previousChange ||
            previousChange.op === spec_1.OPERATION.DELETE ||
            previousChange.op === spec_1.OPERATION.TOUCH // (mazmorra.io's BattleAction issue)
        ) {
            this.changes.set(index, {
                op: (!previousChange)
                    ? operation
                    : (previousChange.op === spec_1.OPERATION.DELETE)
                        ? spec_1.OPERATION.DELETE_AND_ADD
                        : operation,
                // : OPERATION.REPLACE,
                index: index
            });
        }
        this.allChanges.add(index);
        this.changed = true;
        this.touchParents();
    };
    ChangeTree.prototype.touch = function (fieldName) {
        var index = (typeof (fieldName) === "number")
            ? fieldName
            : this.indexes[fieldName];
        this.assertValidIndex(index, fieldName);
        if (!this.changes.has(index)) {
            this.changes.set(index, { op: spec_1.OPERATION.TOUCH, index: index });
        }
        this.allChanges.add(index);
        // ensure touch is placed until the $root is found.
        this.touchParents();
    };
    ChangeTree.prototype.touchParents = function () {
        if (this.parent) {
            this.parent['$changes'].touch(this.parentIndex);
        }
    };
    ChangeTree.prototype.getType = function (index) {
        if (this.ref['_definition']) {
            var definition = this.ref['_definition'];
            return definition.schema[definition.fieldsByIndex[index]];
        }
        else {
            var definition = this.parent['_definition'];
            var parentType = definition.schema[definition.fieldsByIndex[this.parentIndex]];
            //
            // Get the child type from parent structure.
            // - ["string"] => "string"
            // - { map: "string" } => "string"
            // - { set: "string" } => "string"
            //
            return Object.values(parentType)[0];
        }
    };
    ChangeTree.prototype.getChildrenFilter = function () {
        var childFilters = this.parent['_definition'].childFilters;
        return childFilters && childFilters[this.parentIndex];
    };
    //
    // used during `.encode()`
    //
    ChangeTree.prototype.getValue = function (index) {
        return this.ref['getByIndex'](index);
    };
    ChangeTree.prototype.delete = function (fieldName) {
        var index = (typeof (fieldName) === "number")
            ? fieldName
            : this.indexes[fieldName];
        if (index === undefined) {
            console.warn("@colyseus/schema " + this.ref.constructor.name + ": trying to delete non-existing index: " + fieldName + " (" + index + ")");
            return;
        }
        var previousValue = this.getValue(index);
        // console.log("$changes.delete =>", { fieldName, index, previousValue });
        this.changes.set(index, { op: spec_1.OPERATION.DELETE, index: index });
        this.allChanges.delete(index);
        // delete cache
        delete this.caches[index];
        // remove `root` reference
        if (previousValue && previousValue['$changes']) {
            previousValue['$changes'].parent = undefined;
        }
        this.changed = true;
        this.touchParents();
    };
    ChangeTree.prototype.discard = function (changed) {
        var _this = this;
        if (changed === void 0) { changed = false; }
        //
        // Map, Array, etc:
        // Remove cached key to ensure ADD operations is unsed instead of
        // REPLACE in case same key is used on next patches.
        //
        // TODO: refactor this. this is not relevant for Collection and Set.
        //
        if (!(this.ref instanceof Schema_1.Schema)) {
            this.changes.forEach(function (change) {
                if (change.op === spec_1.OPERATION.DELETE) {
                    var index = _this.ref['getIndex'](change.index);
                    delete _this.indexes[index];
                }
            });
        }
        this.changes.clear();
        this.changed = changed;
        // re-set `currentCustomOperation`
        this.currentCustomOperation = 0;
    };
    /**
     * Recursively discard all changes from this, and child structures.
     */
    ChangeTree.prototype.discardAll = function () {
        var _this = this;
        this.changes.forEach(function (change) {
            var value = _this.getValue(change.index);
            if (value && value['$changes']) {
                value['$changes'].discardAll();
            }
        });
        this.discard();
    };
    // cache(field: number, beginIndex: number, endIndex: number) {
    ChangeTree.prototype.cache = function (field, cachedBytes) {
        this.caches[field] = cachedBytes;
    };
    ChangeTree.prototype.clone = function () {
        return new ChangeTree(this.ref, this.parent, this.root);
    };
    ChangeTree.prototype.ensureRefId = function () {
        // skip if refId is already set.
        if (this.refId !== undefined) {
            return;
        }
        this.refId = this.root.getNextUniqueId();
    };
    ChangeTree.prototype.assertValidIndex = function (index, fieldName) {
        if (index === undefined) {
            throw new Error("ChangeTree: missing index for field \"" + fieldName + "\"");
        }
    };
    return ChangeTree;
}());
exports.ChangeTree = ChangeTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbmdlVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGFuZ2VzL0NoYW5nZVRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQW9DO0FBQ3BDLG9DQUFtQztBQTRCbkMsRUFBRTtBQUNGLGdEQUFnRDtBQUNoRCxFQUFFO0FBQ0Y7SUFBQTtRQUNJLEVBQUU7UUFDRix3Q0FBd0M7UUFDeEMsd0RBQXdEO1FBQ3hELEVBQUU7UUFDSyxTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUM5QixjQUFTLEdBQThCLEVBQUUsQ0FBQztRQUMxQyxnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFFN0IsaUJBQVksR0FBVyxDQUFDLENBQUM7SUFpRXZDLENBQUM7SUEvREcsOEJBQWUsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxlQUFlO0lBQ2YscUJBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxHQUFRLEVBQUUsY0FBOEI7UUFBOUIsK0JBQUEsRUFBQSxxQkFBOEI7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLElBQUksY0FBYyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFRCxlQUFlO0lBQ2Ysd0JBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxlQUFlO0lBQ2Ysd0NBQXlCLEdBQXpCO1FBQUEsaUJBb0NDO1FBbkNHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUMzQixJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFakMsRUFBRTtnQkFDRix1RUFBdUU7Z0JBQ3ZFLEVBQUU7Z0JBQ0YsSUFBSSxHQUFHLFlBQVksZUFBTSxFQUFFO29CQUN2QixLQUFLLElBQU0sU0FBUyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUU7d0JBQy9DLElBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxRQUFROzRCQUMxRCxHQUFHLENBQUMsU0FBUyxDQUFDOzRCQUNkLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDNUI7NEJBQ0UsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3BEO3FCQUNKO2lCQUVKO3FCQUFNO29CQUNILElBQU0sVUFBVSxHQUFxQixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztvQkFDeEUsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUV0RixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs2QkFDbkIsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQztxQkFDcEU7aUJBQ0o7Z0JBRUQsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBMUVELElBMEVDO0FBMUVZLG9CQUFJO0FBNEVqQjtJQW9CSSxvQkFBWSxHQUFRLEVBQUUsTUFBWSxFQUFFLElBQVc7UUFUL0MsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixZQUFPLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFDN0MsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFFL0IsK0JBQStCO1FBQy9CLFdBQU0sR0FBZ0MsRUFBRSxDQUFDO1FBRXpDLDJCQUFzQixHQUFXLENBQUMsQ0FBQztRQUcvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCw4QkFBUyxHQUFULFVBQ0ksTUFBVyxFQUNYLElBQVcsRUFDWCxXQUFvQjtRQUh4QixpQkFvREM7UUEvQ0csSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxlQUFNLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU87Z0JBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBRS9CLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUU7UUFDRix5Q0FBeUM7UUFDekMsRUFBRTtRQUNGLElBQUksSUFBSSxDQUFDLEdBQUcsWUFBWSxlQUFNLEVBQUU7WUFDNUIsSUFBTSxVQUFVLEdBQXFCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0QsS0FBSyxJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNqQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU5QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzVCLElBQU0sYUFBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTdDLEtBQUssQ0FBQyxVQUFVLENBQWdCLENBQUMsU0FBUyxDQUN2QyxJQUFJLENBQUMsR0FBRyxFQUNSLElBQUksRUFDSixhQUFXLENBQ2QsQ0FBQztpQkFDTDthQUNKO1NBRUo7YUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ3hCLElBQUksS0FBSyxZQUFZLGVBQU0sRUFBRTtvQkFDekIsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN0QyxJQUFNLGFBQVcsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFdEQsV0FBVyxDQUFDLFNBQVMsQ0FDakIsS0FBSSxDQUFDLEdBQUcsRUFDUixLQUFJLENBQUMsSUFBSSxFQUNULGFBQVcsQ0FDZCxDQUFDO2lCQUNMO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCw4QkFBUyxHQUFULFVBQVUsRUFBbUI7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELDJCQUFNLEdBQU4sVUFBTyxTQUEwQixFQUFFLFNBQW9DO1FBQXBDLDBCQUFBLEVBQUEsWUFBdUIsZ0JBQVMsQ0FBQyxHQUFHO1FBQ25FLElBQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztZQUMzQyxDQUFDLENBQUMsU0FBUztZQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFeEMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0MsSUFDSSxDQUFDLGNBQWM7WUFDZixjQUFjLENBQUMsRUFBRSxLQUFLLGdCQUFTLENBQUMsTUFBTTtZQUN0QyxjQUFjLENBQUMsRUFBRSxLQUFLLGdCQUFTLENBQUMsS0FBSyxDQUFDLHFDQUFxQztVQUM3RTtZQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsRUFBRSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxTQUFTO29CQUNYLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssZ0JBQVMsQ0FBQyxNQUFNLENBQUM7d0JBQ3RDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLGNBQWM7d0JBQzFCLENBQUMsQ0FBQyxTQUFTO2dCQUNYLHVCQUF1QjtnQkFDL0IsS0FBSyxPQUFBO2FBQ1IsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDBCQUFLLEdBQUwsVUFBTSxTQUEwQjtRQUM1QixJQUFNLEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxRQUFRLENBQUM7WUFDM0MsQ0FBQyxDQUFDLFNBQVM7WUFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsZ0JBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUNBQVksR0FBWjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkU7SUFDTCxDQUFDO0lBRUQsNEJBQU8sR0FBUCxVQUFRLEtBQWM7UUFDbEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pCLElBQU0sVUFBVSxHQUFJLElBQUksQ0FBQyxHQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkQsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUUsQ0FBQztTQUUvRDthQUFNO1lBQ0gsSUFBTSxVQUFVLEdBQUksSUFBSSxDQUFDLE1BQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUQsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBRSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBRSxDQUFDO1lBRW5GLEVBQUU7WUFDRiw0Q0FBNEM7WUFDNUMsMkJBQTJCO1lBQzNCLGtDQUFrQztZQUNsQyxrQ0FBa0M7WUFDbEMsRUFBRTtZQUNGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxzQ0FBaUIsR0FBakI7UUFDSSxJQUFNLFlBQVksR0FBSSxJQUFJLENBQUMsTUFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDekUsT0FBTyxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsRUFBRTtJQUNGLDBCQUEwQjtJQUMxQixFQUFFO0lBQ0YsNkJBQVEsR0FBUixVQUFTLEtBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCwyQkFBTSxHQUFOLFVBQU8sU0FBMEI7UUFDN0IsSUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssUUFBUSxDQUFDO1lBQzNDLENBQUMsQ0FBQyxTQUFTO1lBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFOUIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQW9CLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksK0NBQTBDLFNBQVMsVUFBSyxLQUFLLE1BQUcsQ0FBQyxDQUFDO1lBQzVILE9BQU87U0FDVjtRQUVELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsMEVBQTBFO1FBRTFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxnQkFBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQiwwQkFBMEI7UUFDMUIsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsT0FBd0I7UUFBaEMsaUJBc0JDO1FBdEJPLHdCQUFBLEVBQUEsZUFBd0I7UUFDNUIsRUFBRTtRQUNGLG1CQUFtQjtRQUNuQixpRUFBaUU7UUFDakUsb0RBQW9EO1FBQ3BELEVBQUU7UUFDRixvRUFBb0U7UUFDcEUsRUFBRTtRQUNGLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksZUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUN4QixJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssZ0JBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNoRCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzlCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQVUsR0FBVjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ3hCLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDNUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELCtEQUErRDtJQUMvRCwwQkFBSyxHQUFMLFVBQU0sS0FBYSxFQUFFLFdBQXFCO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQkFBSyxHQUFMO1FBQ0ksT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0ksZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFUyxxQ0FBZ0IsR0FBMUIsVUFBMkIsS0FBYSxFQUFFLFNBQTBCO1FBQ2hFLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUF3QyxTQUFTLE9BQUcsQ0FBQyxDQUFDO1NBQ3pFO0lBQ0wsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FBQyxBQXBRRCxJQW9RQztBQXBRWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9QRVJBVElPTiB9IGZyb20gXCIuLi9zcGVjXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBTY2hlbWFEZWZpbml0aW9uIH0gZnJvbSBcIi4uL2Fubm90YXRpb25zXCI7XG5cbmltcG9ydCB7IE1hcFNjaGVtYSB9IGZyb20gXCIuLi90eXBlcy9NYXBTY2hlbWFcIjtcbmltcG9ydCB7IEFycmF5U2NoZW1hIH0gZnJvbSBcIi4uL3R5cGVzL0FycmF5U2NoZW1hXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2NoZW1hIH0gZnJvbSBcIi4uL3R5cGVzL0NvbGxlY3Rpb25TY2hlbWFcIjtcbmltcG9ydCB7IFNldFNjaGVtYSB9IGZyb20gXCIuLi90eXBlcy9TZXRTY2hlbWFcIjtcblxuZXhwb3J0IHR5cGUgUmVmID0gU2NoZW1hXG4gICAgfCBBcnJheVNjaGVtYVxuICAgIHwgTWFwU2NoZW1hXG4gICAgfCBDb2xsZWN0aW9uU2NoZW1hXG4gICAgfCBTZXRTY2hlbWE7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlT3BlcmF0aW9uIHtcbiAgICBvcDogT1BFUkFUSU9OLFxuICAgIGluZGV4OiBudW1iZXIsXG59XG5cbi8vXG4vLyBGaWVsZENhY2hlIGlzIHVzZWQgZm9yIEBmaWx0ZXIoKVxuLy9cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRDYWNoZSB7XG4gICAgYmVnaW5JbmRleDogbnVtYmVyO1xuICAgIGVuZEluZGV4OiBudW1iZXI7XG59XG5cblxuLy9cbi8vIFJvb3QgaG9sZHMgYWxsIHNjaGVtYSByZWZlcmVuY2VzIGJ5IHVuaXF1ZSBpZFxuLy9cbmV4cG9ydCBjbGFzcyBSb290IHtcbiAgICAvL1xuICAgIC8vIFJlbGF0aW9uIG9mIHJlZklkID0+IFNjaGVtYSBzdHJ1Y3R1cmVcbiAgICAvLyBGb3IgZGlyZWN0IGFjY2VzcyBvZiBzdHJ1Y3R1cmVzIGR1cmluZyBkZWNvZGluZyB0aW1lLlxuICAgIC8vXG4gICAgcHVibGljIHJlZnMgPSBuZXcgTWFwPG51bWJlciwgUmVmPigpO1xuICAgIHB1YmxpYyByZWZDb3VudHM6IHtbcmVmSWQ6IG51bWJlcl06IG51bWJlcn0gPSB7fTtcbiAgICBwdWJsaWMgZGVsZXRlZFJlZnMgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICAgIHByb3RlY3RlZCBuZXh0VW5pcXVlSWQ6IG51bWJlciA9IDA7XG5cbiAgICBnZXROZXh0VW5pcXVlSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5leHRVbmlxdWVJZCsrO1xuICAgIH1cblxuICAgIC8vIGZvciBkZWNvZGluZ1xuICAgIGFkZFJlZihyZWZJZDogbnVtYmVyLCByZWY6IFJlZiwgaW5jcmVtZW50Q291bnQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMucmVmcy5zZXQocmVmSWQsIHJlZik7XG5cbiAgICAgICAgaWYgKGluY3JlbWVudENvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlZkNvdW50c1tyZWZJZF0gPSAodGhpcy5yZWZDb3VudHNbcmVmSWRdIHx8IDApICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBkZWNvZGluZ1xuICAgIHJlbW92ZVJlZihyZWZJZCkge1xuICAgICAgICB0aGlzLnJlZkNvdW50c1tyZWZJZF0gPSB0aGlzLnJlZkNvdW50c1tyZWZJZF0gLSAxO1xuICAgICAgICB0aGlzLmRlbGV0ZWRSZWZzLmFkZChyZWZJZCk7XG4gICAgfVxuXG4gICAgY2xlYXJSZWZzKCkge1xuICAgICAgICB0aGlzLnJlZnMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5kZWxldGVkUmVmcy5jbGVhcigpO1xuICAgICAgICB0aGlzLnJlZkNvdW50cyA9IHt9O1xuICAgIH1cblxuICAgIC8vIGZvciBkZWNvZGluZ1xuICAgIGdhcmJhZ2VDb2xsZWN0RGVsZXRlZFJlZnMoKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlZFJlZnMuZm9yRWFjaCgocmVmSWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZkNvdW50c1tyZWZJZF0gPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZiA9IHRoaXMucmVmcy5nZXQocmVmSWQpO1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgY2hpbGQgc2NoZW1hIGluc3RhbmNlcyBoYXZlIHRoZWlyIHJlZmVyZW5jZXMgcmVtb3ZlZCBhcyB3ZWxsLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIFNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkTmFtZSBpbiByZWZbJ19kZWZpbml0aW9uJ10uc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIChyZWZbJ19kZWZpbml0aW9uJ10uc2NoZW1hW2ZpZWxkTmFtZV0pICE9PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmW2ZpZWxkTmFtZV0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZbZmllbGROYW1lXVsnJGNoYW5nZXMnXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSZWYocmVmW2ZpZWxkTmFtZV1bJyRjaGFuZ2VzJ10ucmVmSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZpbml0aW9uOiBTY2hlbWFEZWZpbml0aW9uID0gcmVmWyckY2hhbmdlcyddLnBhcmVudC5fZGVmaW5pdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGRlZmluaXRpb24uc2NoZW1hW2RlZmluaXRpb24uZmllbGRzQnlJbmRleFtyZWZbJyRjaGFuZ2VzJ10ucGFyZW50SW5kZXhdXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChPYmplY3QudmFsdWVzKHR5cGUpWzBdKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHJlZi52YWx1ZXMoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHRoaXMucmVtb3ZlUmVmKGNoaWxkWyckY2hhbmdlcyddLnJlZklkKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMuZGVsZXRlKHJlZklkKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZWZDb3VudHNbcmVmSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGVhciBkZWxldGVkIHJlZnMuXG4gICAgICAgIHRoaXMuZGVsZXRlZFJlZnMuY2xlYXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VUcmVlIHtcbiAgICByZWY6IFJlZjtcbiAgICByZWZJZDogbnVtYmVyO1xuXG4gICAgcm9vdD86IFJvb3Q7XG5cbiAgICBwYXJlbnQ/OiBSZWY7XG4gICAgcGFyZW50SW5kZXg/OiBudW1iZXI7XG5cbiAgICBpbmRleGVzOiB7W2luZGV4OiBzdHJpbmddOiBhbnl9O1xuXG4gICAgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNoYW5nZXMgPSBuZXcgTWFwPG51bWJlciwgQ2hhbmdlT3BlcmF0aW9uPigpO1xuICAgIGFsbENoYW5nZXMgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICAgIC8vIGNhY2hlZCBpbmRleGVzIGZvciBmaWx0ZXJpbmdcbiAgICBjYWNoZXM6IHtbZmllbGQ6IG51bWJlcl06IG51bWJlcltdfSA9IHt9O1xuXG4gICAgY3VycmVudEN1c3RvbU9wZXJhdGlvbjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogUmVmLCBwYXJlbnQ/OiBSZWYsIHJvb3Q/OiBSb290KSB7XG4gICAgICAgIHRoaXMucmVmID0gcmVmO1xuICAgICAgICB0aGlzLnNldFBhcmVudChwYXJlbnQsIHJvb3QpO1xuICAgIH1cblxuICAgIHNldFBhcmVudChcbiAgICAgICAgcGFyZW50OiBSZWYsXG4gICAgICAgIHJvb3Q/OiBSb290LFxuICAgICAgICBwYXJlbnRJbmRleD86IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlcyA9ICh0aGlzLnJlZiBpbnN0YW5jZW9mIFNjaGVtYSlcbiAgICAgICAgICAgICAgICA/IHRoaXMucmVmWydfZGVmaW5pdGlvbiddLmluZGV4ZXNcbiAgICAgICAgICAgICAgICA6IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMucGFyZW50SW5kZXggPSBwYXJlbnRJbmRleDtcblxuICAgICAgICAvLyBhdm9pZCBzZXR0aW5nIHBhcmVudHMgd2l0aCBlbXB0eSBgcm9vdGBcbiAgICAgICAgaWYgKCFyb290KSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFzc2lnbiBzYW1lIHBhcmVudCBvbiBjaGlsZCBzdHJ1Y3R1cmVzXG4gICAgICAgIC8vXG4gICAgICAgIGlmICh0aGlzLnJlZiBpbnN0YW5jZW9mIFNjaGVtYSkge1xuICAgICAgICAgICAgY29uc3QgZGVmaW5pdGlvbjogU2NoZW1hRGVmaW5pdGlvbiA9IHRoaXMucmVmWydfZGVmaW5pdGlvbiddO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBkZWZpbml0aW9uLnNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZWZbZmllbGRdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlWyckY2hhbmdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluZGV4ID0gZGVmaW5pdGlvbi5pbmRleGVzW2ZpZWxkXTtcblxuICAgICAgICAgICAgICAgICAgICAodmFsdWVbJyRjaGFuZ2VzJ10gYXMgQ2hhbmdlVHJlZSkuc2V0UGFyZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICByb290LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mICh0aGlzLnJlZikgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVmLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlVHJlZWUgPSB2YWx1ZVsnJGNoYW5nZXMnXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPSB0aGlzLnJlZlsnJGNoYW5nZXMnXS5pbmRleGVzW2tleV07XG5cbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlVHJlZWUuc2V0UGFyZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZXJhdGlvbihvcDogQ2hhbmdlT3BlcmF0aW9uKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5zZXQoLS10aGlzLmN1cnJlbnRDdXN0b21PcGVyYXRpb24sIG9wKTtcbiAgICB9XG5cbiAgICBjaGFuZ2UoZmllbGROYW1lOiBzdHJpbmcgfCBudW1iZXIsIG9wZXJhdGlvbjogT1BFUkFUSU9OID0gT1BFUkFUSU9OLkFERCkge1xuICAgICAgICBjb25zdCBpbmRleCA9ICh0eXBlb2YgKGZpZWxkTmFtZSkgPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICA/IGZpZWxkTmFtZVxuICAgICAgICAgICAgOiB0aGlzLmluZGV4ZXNbZmllbGROYW1lXTtcblxuICAgICAgICB0aGlzLmFzc2VydFZhbGlkSW5kZXgoaW5kZXgsIGZpZWxkTmFtZSk7XG5cbiAgICAgICAgY29uc3QgcHJldmlvdXNDaGFuZ2UgPSB0aGlzLmNoYW5nZXMuZ2V0KGluZGV4KTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcHJldmlvdXNDaGFuZ2UgfHxcbiAgICAgICAgICAgIHByZXZpb3VzQ2hhbmdlLm9wID09PSBPUEVSQVRJT04uREVMRVRFIHx8XG4gICAgICAgICAgICBwcmV2aW91c0NoYW5nZS5vcCA9PT0gT1BFUkFUSU9OLlRPVUNIIC8vIChtYXptb3JyYS5pbydzIEJhdHRsZUFjdGlvbiBpc3N1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZXMuc2V0KGluZGV4LCB7XG4gICAgICAgICAgICAgICAgb3A6ICghcHJldmlvdXNDaGFuZ2UpXG4gICAgICAgICAgICAgICAgICAgID8gb3BlcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIDogKHByZXZpb3VzQ2hhbmdlLm9wID09PSBPUEVSQVRJT04uREVMRVRFKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBPUEVSQVRJT04uREVMRVRFX0FORF9BRERcbiAgICAgICAgICAgICAgICAgICAgICAgIDogb3BlcmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOiBPUEVSQVRJT04uUkVQTEFDRSxcbiAgICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFsbENoYW5nZXMuYWRkKGluZGV4KTtcblxuICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvdWNoUGFyZW50cygpO1xuICAgIH1cblxuICAgIHRvdWNoKGZpZWxkTmFtZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gKHR5cGVvZiAoZmllbGROYW1lKSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgID8gZmllbGROYW1lXG4gICAgICAgICAgICA6IHRoaXMuaW5kZXhlc1tmaWVsZE5hbWVdO1xuXG4gICAgICAgIHRoaXMuYXNzZXJ0VmFsaWRJbmRleChpbmRleCwgZmllbGROYW1lKTtcblxuICAgICAgICBpZiAoIXRoaXMuY2hhbmdlcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZXMuc2V0KGluZGV4LCB7IG9wOiBPUEVSQVRJT04uVE9VQ0gsIGluZGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbGxDaGFuZ2VzLmFkZChpbmRleCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRvdWNoIGlzIHBsYWNlZCB1bnRpbCB0aGUgJHJvb3QgaXMgZm91bmQuXG4gICAgICAgIHRoaXMudG91Y2hQYXJlbnRzKCk7XG4gICAgfVxuXG4gICAgdG91Y2hQYXJlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICh0aGlzLnBhcmVudFsnJGNoYW5nZXMnXSBhcyBDaGFuZ2VUcmVlKS50b3VjaCh0aGlzLnBhcmVudEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFR5cGUoaW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmWydfZGVmaW5pdGlvbiddKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZpbml0aW9uID0gKHRoaXMucmVmIGFzIFNjaGVtYSlbJ19kZWZpbml0aW9uJ107XG4gICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbi5zY2hlbWFbIGRlZmluaXRpb24uZmllbGRzQnlJbmRleFtpbmRleF0gXTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9ICh0aGlzLnBhcmVudCBhcyBTY2hlbWEpWydfZGVmaW5pdGlvbiddO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50VHlwZSA9IGRlZmluaXRpb24uc2NoZW1hWyBkZWZpbml0aW9uLmZpZWxkc0J5SW5kZXhbdGhpcy5wYXJlbnRJbmRleF0gXTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEdldCB0aGUgY2hpbGQgdHlwZSBmcm9tIHBhcmVudCBzdHJ1Y3R1cmUuXG4gICAgICAgICAgICAvLyAtIFtcInN0cmluZ1wiXSA9PiBcInN0cmluZ1wiXG4gICAgICAgICAgICAvLyAtIHsgbWFwOiBcInN0cmluZ1wiIH0gPT4gXCJzdHJpbmdcIlxuICAgICAgICAgICAgLy8gLSB7IHNldDogXCJzdHJpbmdcIiB9ID0+IFwic3RyaW5nXCJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhwYXJlbnRUeXBlKVswXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENoaWxkcmVuRmlsdGVyKCkge1xuICAgICAgICBjb25zdCBjaGlsZEZpbHRlcnMgPSAodGhpcy5wYXJlbnQgYXMgU2NoZW1hKVsnX2RlZmluaXRpb24nXS5jaGlsZEZpbHRlcnM7XG4gICAgICAgIHJldHVybiBjaGlsZEZpbHRlcnMgJiYgY2hpbGRGaWx0ZXJzW3RoaXMucGFyZW50SW5kZXhdO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gdXNlZCBkdXJpbmcgYC5lbmNvZGUoKWBcbiAgICAvL1xuICAgIGdldFZhbHVlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmWydnZXRCeUluZGV4J10oaW5kZXgpO1xuICAgIH1cblxuICAgIGRlbGV0ZShmaWVsZE5hbWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICBjb25zdCBpbmRleCA9ICh0eXBlb2YgKGZpZWxkTmFtZSkgPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICA/IGZpZWxkTmFtZVxuICAgICAgICAgICAgOiB0aGlzLmluZGV4ZXNbZmllbGROYW1lXTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBAY29seXNldXMvc2NoZW1hICR7dGhpcy5yZWYuY29uc3RydWN0b3IubmFtZX06IHRyeWluZyB0byBkZWxldGUgbm9uLWV4aXN0aW5nIGluZGV4OiAke2ZpZWxkTmFtZX0gKCR7aW5kZXh9KWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUoaW5kZXgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiRjaGFuZ2VzLmRlbGV0ZSA9PlwiLCB7IGZpZWxkTmFtZSwgaW5kZXgsIHByZXZpb3VzVmFsdWUgfSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VzLnNldChpbmRleCwgeyBvcDogT1BFUkFUSU9OLkRFTEVURSwgaW5kZXggfSk7XG5cbiAgICAgICAgdGhpcy5hbGxDaGFuZ2VzLmRlbGV0ZShpbmRleCk7XG5cbiAgICAgICAgLy8gZGVsZXRlIGNhY2hlXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlc1tpbmRleF07XG5cbiAgICAgICAgLy8gcmVtb3ZlIGByb290YCByZWZlcmVuY2VcbiAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgcHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXSkge1xuICAgICAgICAgICAgcHJldmlvdXNWYWx1ZVsnJGNoYW5nZXMnXS5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvdWNoUGFyZW50cygpO1xuICAgIH1cblxuICAgIGRpc2NhcmQoY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE1hcCwgQXJyYXksIGV0YzpcbiAgICAgICAgLy8gUmVtb3ZlIGNhY2hlZCBrZXkgdG8gZW5zdXJlIEFERCBvcGVyYXRpb25zIGlzIHVuc2VkIGluc3RlYWQgb2ZcbiAgICAgICAgLy8gUkVQTEFDRSBpbiBjYXNlIHNhbWUga2V5IGlzIHVzZWQgb24gbmV4dCBwYXRjaGVzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUT0RPOiByZWZhY3RvciB0aGlzLiB0aGlzIGlzIG5vdCByZWxldmFudCBmb3IgQ29sbGVjdGlvbiBhbmQgU2V0LlxuICAgICAgICAvL1xuICAgICAgICBpZiAoISh0aGlzLnJlZiBpbnN0YW5jZW9mIFNjaGVtYSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlcy5mb3JFYWNoKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLm9wID09PSBPUEVSQVRJT04uREVMRVRFKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZWZbJ2dldEluZGV4J10oY2hhbmdlLmluZGV4KVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5pbmRleGVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmNoYW5nZWQgPSBjaGFuZ2VkO1xuXG4gICAgICAgIC8vIHJlLXNldCBgY3VycmVudEN1c3RvbU9wZXJhdGlvbmBcbiAgICAgICAgdGhpcy5jdXJyZW50Q3VzdG9tT3BlcmF0aW9uID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBkaXNjYXJkIGFsbCBjaGFuZ2VzIGZyb20gdGhpcywgYW5kIGNoaWxkIHN0cnVjdHVyZXMuXG4gICAgICovXG4gICAgZGlzY2FyZEFsbCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VzLmZvckVhY2goKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKGNoYW5nZS5pbmRleCk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZVsnJGNoYW5nZXMnXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlWyckY2hhbmdlcyddLmRpc2NhcmRBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kaXNjYXJkKCk7XG4gICAgfVxuXG4gICAgLy8gY2FjaGUoZmllbGQ6IG51bWJlciwgYmVnaW5JbmRleDogbnVtYmVyLCBlbmRJbmRleDogbnVtYmVyKSB7XG4gICAgY2FjaGUoZmllbGQ6IG51bWJlciwgY2FjaGVkQnl0ZXM6IG51bWJlcltdKSB7XG4gICAgICAgIHRoaXMuY2FjaGVzW2ZpZWxkXSA9IGNhY2hlZEJ5dGVzO1xuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IENoYW5nZVRyZWUodGhpcy5yZWYsIHRoaXMucGFyZW50LCB0aGlzLnJvb3QpO1xuICAgIH1cblxuICAgIGVuc3VyZVJlZklkKCkge1xuICAgICAgICAvLyBza2lwIGlmIHJlZklkIGlzIGFscmVhZHkgc2V0LlxuICAgICAgICBpZiAodGhpcy5yZWZJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZklkID0gdGhpcy5yb290LmdldE5leHRVbmlxdWVJZCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3NlcnRWYWxpZEluZGV4KGluZGV4OiBudW1iZXIsIGZpZWxkTmFtZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoYW5nZVRyZWU6IG1pc3NpbmcgaW5kZXggZm9yIGZpZWxkIFwiJHtmaWVsZE5hbWV9XCJgKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySchema = exports.getArrayProxy = void 0;
var ChangeTree_1 = __webpack_require__(3);
var spec_1 = __webpack_require__(0);
var Schema_1 = __webpack_require__(1);
var _1 = __webpack_require__(2);
var DEFAULT_SORT = function (a, b) {
    var A = a.toString();
    var B = b.toString();
    if (A < B)
        return -1;
    else if (A > B)
        return 1;
    else
        return 0;
};
function getArrayProxy(value) {
    value['$proxy'] = true;
    //
    // compatibility with @colyseus/schema 0.5.x
    // - allow `map["key"]`
    // - allow `map["key"] = "xxx"`
    // - allow `delete map["key"]`
    //
    value = new Proxy(value, {
        get: function (obj, prop) {
            if (typeof (prop) !== "symbol" &&
                !isNaN(prop) // https://stackoverflow.com/a/175787/892698
            ) {
                return obj.at(prop);
            }
            else {
                return obj[prop];
            }
        },
        set: function (obj, prop, setValue) {
            if (typeof (prop) !== "symbol" &&
                !isNaN(prop)) {
                var indexes = Array.from(obj['$items'].keys());
                var key = parseInt(indexes[prop] || prop);
                if (setValue === undefined || setValue === null) {
                    obj.deleteAt(key);
                }
                else {
                    obj.setAt(key, setValue);
                }
            }
            else {
                obj[prop] = setValue;
            }
            return true;
        },
        deleteProperty: function (obj, prop) {
            if (typeof (prop) === "number") {
                obj.deleteAt(prop);
            }
            else {
                delete obj[prop];
            }
            return true;
        },
    });
    return value;
}
exports.getArrayProxy = getArrayProxy;
var ArraySchema = /** @class */ (function () {
    function ArraySchema() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.$changes = new ChangeTree_1.ChangeTree(this);
        this.$items = new Map();
        this.$indexes = new Map();
        this.$refId = 0;
        this.push.apply(this, __spread(items));
    }
    ArraySchema.is = function (type) {
        return Array.isArray(type);
    };
    Object.defineProperty(ArraySchema.prototype, "length", {
        get: function () {
            return this.$items.size;
        },
        set: function (value) {
            if (value === 0) {
                this.clear();
            }
            else {
                this.splice(value, this.length - value);
            }
        },
        enumerable: false,
        configurable: true
    });
    ArraySchema.prototype.push = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var lastIndex;
        values.forEach(function (value) {
            // set "index" for reference.
            lastIndex = _this.$refId++;
            _this.setAt(lastIndex, value);
        });
        return lastIndex;
    };
    /**
     * Removes the last element from an array and returns it.
     */
    ArraySchema.prototype.pop = function () {
        var key = Array.from(this.$indexes.values()).pop();
        if (key === undefined) {
            return undefined;
        }
        this.$changes.delete(key);
        this.$indexes.delete(key);
        var value = this.$items.get(key);
        this.$items.delete(key);
        return value;
    };
    ArraySchema.prototype.at = function (index) {
        //
        // FIXME: this should be O(1)
        //
        var key = Array.from(this.$items.keys())[index];
        return this.$items.get(key);
    };
    ArraySchema.prototype.setAt = function (index, value) {
        if (value['$changes'] !== undefined) {
            value['$changes'].setParent(this, this.$changes.root, index);
        }
        var operation = (this.$changes.indexes[index] !== undefined)
            ? spec_1.OPERATION.REPLACE
            : spec_1.OPERATION.ADD;
        this.$changes.indexes[index] = index;
        this.$indexes.set(index, index);
        this.$items.set(index, value);
        this.$changes.change(index, operation);
    };
    ArraySchema.prototype.deleteAt = function (index) {
        var key = Array.from(this.$items.keys())[index];
        if (key === undefined) {
            return false;
        }
        return this.$deleteAt(key);
    };
    ArraySchema.prototype.$deleteAt = function (index) {
        // delete at internal index
        this.$changes.delete(index);
        this.$indexes.delete(index);
        return this.$items.delete(index);
    };
    ArraySchema.prototype.clear = function (isDecoding) {
        var _this = this;
        // discard previous operations.
        this.$changes.discard(true);
        this.$changes.indexes = {};
        // clear previous indexes
        this.$indexes.clear();
        // flag child items for garbage collection.
        if (isDecoding && typeof (this.$changes.getType()) !== "string") {
            this.$items.forEach(function (item) {
                _this.$changes.root.removeRef(item['$changes'].refId);
            });
        }
        // clear items
        this.$items.clear();
        this.$changes.operation({ index: 0, op: spec_1.OPERATION.CLEAR });
        // touch all structures until reach root
        this.$changes.touchParents();
    };
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    ArraySchema.prototype.concat = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return new (ArraySchema.bind.apply(ArraySchema, __spread([void 0], (_a = Array.from(this.$items.values())).concat.apply(_a, __spread(items)))))();
    };
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
     */
    ArraySchema.prototype.join = function (separator) {
        return Array.from(this.$items.values()).join(separator);
    };
    /**
     * Reverses the elements in an Array.
     */
    ArraySchema.prototype.reverse = function () {
        var _this = this;
        var indexes = Array.from(this.$items.keys());
        var reversedItems = Array.from(this.$items.values()).reverse();
        reversedItems.forEach(function (item, i) {
            _this.setAt(indexes[i], item);
        });
        return this;
    };
    /**
     * Removes the first element from an array and returns it.
     */
    ArraySchema.prototype.shift = function () {
        var indexes = Array.from(this.$items.keys());
        var shiftAt = indexes.shift();
        if (shiftAt === undefined) {
            return undefined;
        }
        var value = this.$items.get(shiftAt);
        this.$deleteAt(shiftAt);
        return value;
    };
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    ArraySchema.prototype.slice = function (start, end) {
        return new (ArraySchema.bind.apply(ArraySchema, __spread([void 0], Array.from(this.$items.values()).slice(start, end))))();
    };
    /**
     * Sorts an array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if first argument is less than second argument, zero if they're equal and a positive
     * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * ```ts
     * [11,2,22,1].sort((a, b) => a - b)
     * ```
     */
    ArraySchema.prototype.sort = function (compareFn) {
        var _this = this;
        if (compareFn === void 0) { compareFn = DEFAULT_SORT; }
        var indexes = Array.from(this.$items.keys());
        var sortedItems = Array.from(this.$items.values()).sort(compareFn);
        sortedItems.forEach(function (item, i) {
            _this.setAt(indexes[i], item);
        });
        return this;
    };
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    ArraySchema.prototype.splice = function (start, deleteCount) {
        if (deleteCount === void 0) { deleteCount = this.length - start; }
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var indexes = Array.from(this.$items.keys());
        var removedItems = [];
        for (var i = start; i < start + deleteCount; i++) {
            removedItems.push(this.$items.get(indexes[i]));
            this.$deleteAt(indexes[i]);
        }
        return removedItems;
    };
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    ArraySchema.prototype.unshift = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var length = this.length;
        var addedLength = items.length;
        // const indexes = Array.from(this.$items.keys());
        var previousValues = Array.from(this.$items.values());
        items.forEach(function (item, i) {
            _this.setAt(i, item);
        });
        previousValues.forEach(function (previousValue, i) {
            _this.setAt(addedLength + i, previousValue);
        });
        return length + addedLength;
    };
    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    ArraySchema.prototype.indexOf = function (searchElement, fromIndex) {
        return Array.from(this.$items.values()).indexOf(searchElement, fromIndex);
    };
    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    ArraySchema.prototype.lastIndexOf = function (searchElement, fromIndex) {
        if (fromIndex === void 0) { fromIndex = this.length - 1; }
        return Array.from(this.$items.values()).lastIndexOf(searchElement, fromIndex);
    };
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls
     * the callbackfn function for each element in the array until the callbackfn returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    ArraySchema.prototype.every = function (callbackfn, thisArg) {
        return Array.from(this.$items.values()).every(callbackfn, thisArg);
    };
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls
     * the callbackfn function for each element in the array until the callbackfn returns a value
     * which is coercible to the Boolean value true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    ArraySchema.prototype.some = function (callbackfn, thisArg) {
        return Array.from(this.$items.values()).some(callbackfn, thisArg);
    };
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    ArraySchema.prototype.forEach = function (callbackfn, thisArg) {
        Array.from(this.$items.values()).forEach(callbackfn, thisArg);
    };
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    ArraySchema.prototype.map = function (callbackfn, thisArg) {
        return Array.from(this.$items.values()).map(callbackfn, thisArg);
    };
    ArraySchema.prototype.filter = function (callbackfn, thisArg) {
        return Array.from(this.$items.values()).filter(callbackfn, thisArg);
    };
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    ArraySchema.prototype.reduce = function (callbackfn, initialValue) {
        return Array.from(this.$items.values()).reduce(callbackfn, initialValue);
    };
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    ArraySchema.prototype.reduceRight = function (callbackfn, initialValue) {
        return Array.from(this.$items.values()).reduceRight(callbackfn, initialValue);
    };
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    ArraySchema.prototype.find = function (predicate, thisArg) {
        return Array.from(this.$items.values()).find(predicate, thisArg);
    };
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    ArraySchema.prototype.findIndex = function (predicate, thisArg) {
        return Array.from(this.$items.values()).findIndex(predicate, thisArg);
    };
    /**
     * Returns the this object after filling the section identified by start and end with value
     * @param value value to fill array section with
     * @param start index to start filling the array at. If start is negative, it is treated as
     * length+start where length is the length of the array.
     * @param end index to stop filling the array at. If end is negative, it is treated as
     * length+end.
     */
    ArraySchema.prototype.fill = function (value, start, end) {
        //
        // TODO
        //
        throw new Error("ArraySchema#fill() not implemented");
        // this.$items.fill(value, start, end);
        return this;
    };
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target
     * @param target If target is negative, it is treated as length+target where length is the
     * length of the array.
     * @param start If start is negative, it is treated as length+start. If end is negative, it
     * is treated as length+end.
     * @param end If not specified, length of the this object is used as its default value.
     */
    ArraySchema.prototype.copyWithin = function (target, start, end) {
        //
        // TODO
        //
        throw new Error("ArraySchema#copyWithin() not implemented");
        return this;
    };
    /**
     * Returns a string representation of an array.
     */
    ArraySchema.prototype.toString = function () { return this.$items.toString(); };
    /**
     * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
     */
    ArraySchema.prototype.toLocaleString = function () { return this.$items.toLocaleString(); };
    ;
    /** Iterator */
    ArraySchema.prototype[Symbol.iterator] = function () {
        return Array.from(this.$items.values())[Symbol.iterator]();
    };
    ArraySchema.prototype[Symbol.unscopables] = function () {
        return this.$items[Symbol.unscopables]();
    };
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    ArraySchema.prototype.entries = function () { return this.$items.entries(); };
    /**
     * Returns an iterable of keys in the array
     */
    ArraySchema.prototype.keys = function () { return this.$items.keys(); };
    /**
     * Returns an iterable of values in the array
     */
    ArraySchema.prototype.values = function () { return this.$items.values(); };
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    ArraySchema.prototype.includes = function (searchElement, fromIndex) {
        return Array.from(this.$items.values()).includes(searchElement, fromIndex);
    };
    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by flat with depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    // @ts-ignore
    ArraySchema.prototype.flatMap = function (callback, thisArg) {
        // @ts-ignore
        throw new Error("ArraySchema#flatMap() is not supported.");
    };
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    // @ts-ignore
    ArraySchema.prototype.flat = function (depth) {
        // @ts-ignore
        throw new Error("ArraySchema#flat() is not supported.");
    };
    // get size () {
    //     return this.$items.size;
    // }
    ArraySchema.prototype.setIndex = function (index, key) {
        this.$indexes.set(index, key);
    };
    ArraySchema.prototype.getIndex = function (index) {
        return this.$indexes.get(index);
    };
    ArraySchema.prototype.getByIndex = function (index) {
        return this.$items.get(this.$indexes.get(index));
    };
    ArraySchema.prototype.deleteByIndex = function (index) {
        var key = this.$indexes.get(index);
        this.$items.delete(key);
        this.$indexes.delete(index);
    };
    ArraySchema.prototype.toArray = function () {
        return Array.from(this.$items.values());
    };
    ArraySchema.prototype.toJSON = function () {
        return this.toArray().map(function (value) {
            return (typeof (value['toJSON']) === "function")
                ? value['toJSON']()
                : value;
        });
    };
    //
    // Decoding utilities
    //
    ArraySchema.prototype.clone = function (isDecoding) {
        var cloned;
        if (isDecoding) {
            cloned = new (ArraySchema.bind.apply(ArraySchema, __spread([void 0], Array.from(this.$items.values()))))();
        }
        else {
            cloned = new (ArraySchema.bind.apply(ArraySchema, __spread([void 0], this.map(function (item) { return ((item['$changes'])
                ? item.clone()
                : item); }))))();
        }
        return cloned;
    };
    ;
    ArraySchema.prototype.triggerAll = function () {
        Schema_1.Schema.prototype.triggerAll.apply(this);
    };
    return ArraySchema;
}());
exports.ArraySchema = ArraySchema;
_1.registerType("array", {
    constructor: ArraySchema,
    getProxy: getArrayProxy,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvQXJyYXlTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBbUQ7QUFDbkQsZ0NBQW9DO0FBQ3BDLG9DQUEyRDtBQUMzRCxzQkFBaUM7QUFZakMsSUFBTSxZQUFZLEdBQUcsVUFBQyxDQUFNLEVBQUUsQ0FBTTtJQUNoQyxJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQzs7UUFDcEIsT0FBTyxDQUFDLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQWtCO0lBQzVDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFdkIsRUFBRTtJQUNGLDRDQUE0QztJQUM1Qyx1QkFBdUI7SUFDdkIsK0JBQStCO0lBQy9CLDhCQUE4QjtJQUM5QixFQUFFO0lBQ0YsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNyQixHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtZQUNYLElBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVE7Z0JBQzFCLENBQUMsS0FBSyxDQUFDLElBQVcsQ0FBQyxDQUFDLDRDQUE0QztjQUNsRTtnQkFDRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBYyxDQUFDLENBQUM7YUFFakM7aUJBQU07Z0JBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDO1FBRUQsR0FBRyxFQUFFLFVBQUMs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QVc7QUErZ0J4QixlQUFZLENBQUMsT0FBTyxFQUFFO0lBQ2xCLFdBQVcsRUFBRSxXQUFXO0lBQ3hCLFFBQVEsRUFBRSxhQUFhO0NBQzFCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZVRyZWUgfSBmcm9tIFwiLi4vY2hhbmdlcy9DaGFuZ2VUcmVlXCI7XG5pbXBvcnQgeyBPUEVSQVRJT04gfSBmcm9tIFwiLi4vc3BlY1wiO1xuaW1wb3J0IHsgU2NoZW1hRGVjb2RlckNhbGxiYWNrcywgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJUeXBlIH0gZnJvbSBcIi5cIjtcblxuLy9cbi8vIE5vdGVzOlxuLy8gLS0tLS1cbi8vXG4vLyAtIFRoZSB0c2NvbmZpZy5qc29uIG9mIEBjb2x5c2V1cy9zY2hlbWEgdXNlcyBFUzIwMTguXG4vLyAtIEVTMjAxOSBpbnRyb2R1Y2VzIGBmbGF0TWFwYCAvIGBmbGF0YCwgd2hpY2ggaXMgbm90IGN1cnJlbnRseSByZWxldmFudCwgYW5kIGNhdXNlZCBvdGhlciBpc3N1ZXMuXG4vL1xuXG50eXBlIEsgPSBudW1iZXI7IC8vIFRPRE86IGFsbG93IHRvIHNwZWNpZnkgSyBnZW5lcmljIG9uIE1hcFNjaGVtYS5cblxuY29uc3QgREVGQVVMVF9TT1JUID0gKGE6IGFueSwgYjogYW55KSA9PiB7XG4gICAgY29uc3QgQSA9IGEudG9TdHJpbmcoKTtcbiAgICBjb25zdCBCID0gYi50b1N0cmluZygpO1xuICAgIGlmIChBIDwgQikgcmV0dXJuIC0xO1xuICAgIGVsc2UgaWYgKEEgPiBCKSByZXR1cm4gMTtcbiAgICBlbHNlIHJldHVybiAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnJheVByb3h5KHZhbHVlOiBBcnJheVNjaGVtYSkge1xuICAgIHZhbHVlWyckcHJveHknXSA9IHRydWU7XG5cbiAgICAvL1xuICAgIC8vIGNvbXBhdGliaWxpdHkgd2l0aCBAY29seXNldXMvc2NoZW1hIDAuNS54XG4gICAgLy8gLSBhbGxvdyBgbWFwW1wia2V5XCJdYFxuICAgIC8vIC0gYWxsb3cgYG1hcFtcImtleVwiXSA9IFwieHh4XCJgXG4gICAgLy8gLSBhbGxvdyBgZGVsZXRlIG1hcFtcImtleVwiXWBcbiAgICAvL1xuICAgIHZhbHVlID0gbmV3IFByb3h5KHZhbHVlLCB7XG4gICAgICAgIGdldDogKG9iaiwgcHJvcCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiAocHJvcCkgIT09IFwic3ltYm9sXCIgJiZcbiAgICAgICAgICAgICAgICAhaXNOYU4ocHJvcCBhcyBhbnkpIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNzU3ODcvODkyNjk4XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmF0KHByb3AgYXMgbnVtYmVyKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldDogKG9iaiwgcHJvcCwgc2V0VmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgKHByb3ApICE9PSBcInN5bWJvbFwiICYmXG4gICAgICAgICAgICAgICAgIWlzTmFOKHByb3AgYXMgYW55KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXhlcyA9IEFycmF5LmZyb20ob2JqWyckaXRlbXMnXS5rZXlzKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IHBhcnNlSW50KGluZGV4ZXNbcHJvcF0gfHwgcHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlID09PSB1bmRlZmluZWQgfHwgc2V0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmRlbGV0ZUF0KGtleSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmouc2V0QXQoa2V5LCBzZXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IHNldFZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWxldGVQcm9wZXJ0eTogKG9iaiwgcHJvcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAocHJvcCkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBvYmouZGVsZXRlQXQocHJvcCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ialtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBjbGFzcyBBcnJheVNjaGVtYTxWPWFueT4gaW1wbGVtZW50cyBBcnJheTxWPiwgU2NoZW1hRGVjb2RlckNhbGxiYWNrcyB7XG4gICAgcHJvdGVjdGVkICRjaGFuZ2VzOiBDaGFuZ2VUcmVlID0gbmV3IENoYW5nZVRyZWUodGhpcyk7XG5cbiAgICBwcm90ZWN0ZWQgJGl0ZW1zOiBNYXA8bnVtYmVyLCBWPiA9IG5ldyBNYXA8bnVtYmVyLCBWPigpO1xuICAgIHByb3RlY3RlZCAkaW5kZXhlczogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgICBwcm90ZWN0ZWQgJHJlZklkOiBudW1iZXIgPSAwO1xuXG4gICAgW246IG51bWJlcl06IFY7XG5cbiAgICAvL1xuICAgIC8vIERlY29kaW5nIGNhbGxiYWNrc1xuICAgIC8vXG4gICAgcHVibGljIG9uQWRkPzogKGl0ZW06IFYsIGtleTogbnVtYmVyKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBvblJlbW92ZT86IChpdGVtOiBWLCBrZXk6IG51bWJlcikgPT4gdm9pZDtcbiAgICBwdWJsaWMgb25DaGFuZ2U/OiAoaXRlbTogViwga2V5OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgICBzdGF0aWMgaXModHlwZTogYW55KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHR5cGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yICguLi5pdGVtczogVltdKSB7XG4gICAgICAgIHRoaXMucHVzaCguLi5pdGVtcyk7XG4gICAgfVxuXG4gICAgc2V0IGxlbmd0aCAodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UodmFsdWUsIHRoaXMubGVuZ3RoIC0gdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLnNpemU7XG4gICAgfVxuXG4gICAgcHVzaCguLi52YWx1ZXM6IFZbXSkge1xuICAgICAgICBsZXQgbGFzdEluZGV4OiBudW1iZXI7XG5cbiAgICAgICAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgLy8gc2V0IFwiaW5kZXhcIiBmb3IgcmVmZXJlbmNlLlxuICAgICAgICAgICAgbGFzdEluZGV4ID0gdGhpcy4kcmVmSWQrKztcblxuICAgICAgICAgICAgdGhpcy5zZXRBdChsYXN0SW5kZXgsIHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxhc3RJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBsYXN0IGVsZW1lbnQgZnJvbSBhbiBhcnJheSBhbmQgcmV0dXJucyBpdC5cbiAgICAgKi9cbiAgICBwb3AoKTogViB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGtleSA9IEFycmF5LmZyb20odGhpcy4kaW5kZXhlcy52YWx1ZXMoKSkucG9wKCk7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgdGhpcy4kaW5kZXhlcy5kZWxldGUoa2V5KTtcblxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGl0ZW1zLmdldChrZXkpO1xuICAgICAgICB0aGlzLiRpdGVtcy5kZWxldGUoa2V5KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgYXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICAvL1xuICAgICAgICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgTygxKVxuICAgICAgICAvL1xuICAgICAgICBjb25zdCBrZXkgPSBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLmtleXMoKSlbaW5kZXhdO1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgc2V0QXQoaW5kZXg6IG51bWJlciwgdmFsdWU6IFYpIHtcbiAgICAgICAgaWYgKHZhbHVlWyckY2hhbmdlcyddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICh2YWx1ZVsnJGNoYW5nZXMnXSBhcyBDaGFuZ2VUcmVlKS5zZXRQYXJlbnQodGhpcywgdGhpcy4kY2hhbmdlcy5yb290LCBpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcGVyYXRpb24gPSAodGhpcy4kY2hhbmdlcy5pbmRleGVzW2luZGV4XSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgPyBPUEVSQVRJT04uUkVQTEFDRVxuICAgICAgICAgICAgOiBPUEVSQVRJT04uQUREO1xuXG4gICAgICAgIHRoaXMuJGNoYW5nZXMuaW5kZXhlc1tpbmRleF0gPSBpbmRleDtcblxuICAgICAgICB0aGlzLiRpbmRleGVzLnNldChpbmRleCwgaW5kZXgpO1xuICAgICAgICB0aGlzLiRpdGVtcy5zZXQoaW5kZXgsIHZhbHVlKTtcblxuICAgICAgICB0aGlzLiRjaGFuZ2VzLmNoYW5nZShpbmRleCwgb3BlcmF0aW9uKTtcbiAgICB9XG5cbiAgICBkZWxldGVBdChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMua2V5cygpKVtpbmRleF07XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGRlbGV0ZUF0KGtleSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkICRkZWxldGVBdChpbmRleCkge1xuICAgICAgICAvLyBkZWxldGUgYXQgaW50ZXJuYWwgaW5kZXhcbiAgICAgICAgdGhpcy4kY2hhbmdlcy5kZWxldGUoaW5kZXgpO1xuICAgICAgICB0aGlzLiRpbmRleGVzLmRlbGV0ZShpbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuXG4gICAgY2xlYXIoaXNEZWNvZGluZz86IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gZGlzY2FyZCBwcmV2aW91cyBvcGVyYXRpb25zLlxuICAgICAgICB0aGlzLiRjaGFuZ2VzLmRpc2NhcmQodHJ1ZSk7XG4gICAgICAgIHRoaXMuJGNoYW5nZXMuaW5kZXhlcyA9IHt9O1xuXG4gICAgICAgIC8vIGNsZWFyIHByZXZpb3VzIGluZGV4ZXNcbiAgICAgICAgdGhpcy4kaW5kZXhlcy5jbGVhcigpO1xuXG4gICAgICAgIC8vIGZsYWcgY2hpbGQgaXRlbXMgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgaWYgKGlzRGVjb2RpbmcgJiYgdHlwZW9mICh0aGlzLiRjaGFuZ2VzLmdldFR5cGUoKSkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuJGl0ZW1zLmZvckVhY2goKGl0ZW06IFYpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjaGFuZ2VzLnJvb3QucmVtb3ZlUmVmKGl0ZW1bJyRjaGFuZ2VzJ10ucmVmSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBpdGVtc1xuICAgICAgICB0aGlzLiRpdGVtcy5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuJGNoYW5nZXMub3BlcmF0aW9uKHsgaW5kZXg6IDAsIG9wOiBPUEVSQVRJT04uQ0xFQVIgfSk7XG5cbiAgICAgICAgLy8gdG91Y2ggYWxsIHN0cnVjdHVyZXMgdW50aWwgcmVhY2ggcm9vdFxuICAgICAgICB0aGlzLiRjaGFuZ2VzLnRvdWNoUGFyZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbWJpbmVzIHR3byBvciBtb3JlIGFycmF5cy5cbiAgICAgKiBAcGFyYW0gaXRlbXMgQWRkaXRpb25hbCBpdGVtcyB0byBhZGQgdG8gdGhlIGVuZCBvZiBhcnJheTEuXG4gICAgICovXG4gICAgY29uY2F0KC4uLml0ZW1zOiAoViB8IENvbmNhdEFycmF5PFY+KVtdKTogQXJyYXlTY2hlbWE8Vj4ge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5U2NoZW1hKC4uLkFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLmNvbmNhdCguLi5pdGVtcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIHRoZSBlbGVtZW50cyBvZiBhbiBhcnJheSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBzZXBhcmF0b3Igc3RyaW5nLlxuICAgICAqIEBwYXJhbSBzZXBhcmF0b3IgQSBzdHJpbmcgdXNlZCB0byBzZXBhcmF0ZSBvbmUgZWxlbWVudCBvZiBhbiBhcnJheSBmcm9tIHRoZSBuZXh0IGluIHRoZSByZXN1bHRpbmcgU3RyaW5nLiBJZiBvbWl0dGVkLCB0aGUgYXJyYXkgZWxlbWVudHMgYXJlIHNlcGFyYXRlZCB3aXRoIGEgY29tbWEuXG4gICAgICovXG4gICAgam9pbihzZXBhcmF0b3I/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiRpdGVtcy52YWx1ZXMoKSkuam9pbihzZXBhcmF0b3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldmVyc2VzIHRoZSBlbGVtZW50cyBpbiBhbiBBcnJheS5cbiAgICAgKi9cbiAgICByZXZlcnNlKCk6IEFycmF5U2NoZW1hPFY+IHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMua2V5cygpKTtcbiAgICAgICAgY29uc3QgcmV2ZXJzZWRJdGVtcyA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLnJldmVyc2UoKTtcblxuICAgICAgICByZXZlcnNlZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXQoaW5kZXhlc1tpXSwgaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBhbiBhcnJheSBhbmQgcmV0dXJucyBpdC5cbiAgICAgKi9cbiAgICBzaGlmdCgpOiBWIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgaW5kZXhlcyA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMua2V5cygpKTtcblxuICAgICAgICBjb25zdCBzaGlmdEF0ID0gaW5kZXhlcy5zaGlmdCgpO1xuICAgICAgICBpZiAoc2hpZnRBdCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGl0ZW1zLmdldChzaGlmdEF0KTtcbiAgICAgICAgdGhpcy4kZGVsZXRlQXQoc2hpZnRBdCk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzZWN0aW9uIG9mIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSBzdGFydCBUaGUgYmVnaW5uaW5nIG9mIHRoZSBzcGVjaWZpZWQgcG9ydGlvbiBvZiB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIGVuZCBUaGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgcG9ydGlvbiBvZiB0aGUgYXJyYXkuIFRoaXMgaXMgZXhjbHVzaXZlIG9mIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleCAnZW5kJy5cbiAgICAgKi9cbiAgICBzbGljZShzdGFydD86IG51bWJlciwgZW5kPzogbnVtYmVyKTogVltdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheVNjaGVtYSguLi5BcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKS5zbGljZShzdGFydCwgZW5kKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU29ydHMgYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIGNvbXBhcmVGbiBGdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzLiBJdCBpcyBleHBlY3RlZCB0byByZXR1cm5cbiAgICAgKiBhIG5lZ2F0aXZlIHZhbHVlIGlmIGZpcnN0IGFyZ3VtZW50IGlzIGxlc3MgdGhhbiBzZWNvbmQgYXJndW1lbnQsIHplcm8gaWYgdGhleSdyZSBlcXVhbCBhbmQgYSBwb3NpdGl2ZVxuICAgICAqIHZhbHVlIG90aGVyd2lzZS4gSWYgb21pdHRlZCwgdGhlIGVsZW1lbnRzIGFyZSBzb3J0ZWQgaW4gYXNjZW5kaW5nLCBBU0NJSSBjaGFyYWN0ZXIgb3JkZXIuXG4gICAgICogYGBgdHNcbiAgICAgKiBbMTEsMiwyMiwxXS5zb3J0KChhLCBiKSA9PiBhIC0gYilcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBzb3J0KGNvbXBhcmVGbjogKGE6IFYsIGI6IFYpID0+IG51bWJlciA9IERFRkFVTFRfU09SVCk6IHRoaXMge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gQXJyYXkuZnJvbSh0aGlzLiRpdGVtcy5rZXlzKCkpO1xuICAgICAgICBjb25zdCBzb3J0ZWRJdGVtcyA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLnNvcnQoY29tcGFyZUZuKTtcblxuICAgICAgICBzb3J0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEF0KGluZGV4ZXNbaV0sIGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGVsZW1lbnRzIGZyb20gYW4gYXJyYXkgYW5kLCBpZiBuZWNlc3NhcnksIGluc2VydHMgbmV3IGVsZW1lbnRzIGluIHRoZWlyIHBsYWNlLCByZXR1cm5pbmcgdGhlIGRlbGV0ZWQgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHN0YXJ0IFRoZSB6ZXJvLWJhc2VkIGxvY2F0aW9uIGluIHRoZSBhcnJheSBmcm9tIHdoaWNoIHRvIHN0YXJ0IHJlbW92aW5nIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSBkZWxldGVDb3VudCBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0gaXRlbXMgRWxlbWVudHMgdG8gaW5zZXJ0IGludG8gdGhlIGFycmF5IGluIHBsYWNlIG9mIHRoZSBkZWxldGVkIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHNwbGljZShcbiAgICAgICAgc3RhcnQ6IG51bWJlcixcbiAgICAgICAgZGVsZXRlQ291bnQ6IG51bWJlciA9IHRoaXMubGVuZ3RoIC0gc3RhcnQsXG4gICAgICAgIC4uLml0ZW1zOiBWW11cbiAgICApOiBWW10ge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gQXJyYXkuZnJvbSh0aGlzLiRpdGVtcy5rZXlzKCkpO1xuICAgICAgICBjb25zdCByZW1vdmVkSXRlbXM6IFZbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0YXJ0ICsgZGVsZXRlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgcmVtb3ZlZEl0ZW1zLnB1c2godGhpcy4kaXRlbXMuZ2V0KGluZGV4ZXNbaV0pKTtcbiAgICAgICAgICAgIHRoaXMuJGRlbGV0ZUF0KGluZGV4ZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWRJdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIG5ldyBlbGVtZW50cyBhdCB0aGUgc3RhcnQgb2YgYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIGl0ZW1zICBFbGVtZW50cyB0byBpbnNlcnQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBBcnJheS5cbiAgICAgKi9cbiAgICB1bnNoaWZ0KC4uLml0ZW1zOiBWW10pOiBudW1iZXIge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgYWRkZWRMZW5ndGggPSBpdGVtcy5sZW5ndGg7XG5cbiAgICAgICAgLy8gY29uc3QgaW5kZXhlcyA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMua2V5cygpKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZXMgPSBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKTtcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEF0KGksIGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmV2aW91c1ZhbHVlcy5mb3JFYWNoKChwcmV2aW91c1ZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEF0KGFkZGVkTGVuZ3RoICsgaSwgcHJldmlvdXNWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBsZW5ndGggKyBhZGRlZExlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhIHZhbHVlIGluIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSBzZWFyY2hFbGVtZW50IFRoZSB2YWx1ZSB0byBsb2NhdGUgaW4gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSBmcm9tSW5kZXggVGhlIGFycmF5IGluZGV4IGF0IHdoaWNoIHRvIGJlZ2luIHRoZSBzZWFyY2guIElmIGZyb21JbmRleCBpcyBvbWl0dGVkLCB0aGUgc2VhcmNoIHN0YXJ0cyBhdCBpbmRleCAwLlxuICAgICAqL1xuICAgIGluZGV4T2Yoc2VhcmNoRWxlbWVudDogViwgZnJvbUluZGV4PzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLmluZGV4T2Yoc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIGEgc3BlY2lmaWVkIHZhbHVlIGluIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSBzZWFyY2hFbGVtZW50IFRoZSB2YWx1ZSB0byBsb2NhdGUgaW4gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSBmcm9tSW5kZXggVGhlIGFycmF5IGluZGV4IGF0IHdoaWNoIHRvIGJlZ2luIHRoZSBzZWFyY2guIElmIGZyb21JbmRleCBpcyBvbWl0dGVkLCB0aGUgc2VhcmNoIHN0YXJ0cyBhdCB0aGUgbGFzdCBpbmRleCBpbiB0aGUgYXJyYXkuXG4gICAgICovXG4gICAgbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudDogViwgZnJvbUluZGV4OiBudW1iZXIgPSB0aGlzLmxlbmd0aCAtIDEpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiRpdGVtcy52YWx1ZXMoKSkubGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgYWxsIHRoZSBtZW1iZXJzIG9mIGFuIGFycmF5IHNhdGlzZnkgdGhlIHNwZWNpZmllZCB0ZXN0LlxuICAgICAqIEBwYXJhbSBjYWxsYmFja2ZuIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIHVwIHRvIHRocmVlIGFyZ3VtZW50cy4gVGhlIGV2ZXJ5IG1ldGhvZCBjYWxsc1xuICAgICAqIHRoZSBjYWxsYmFja2ZuIGZ1bmN0aW9uIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5IHVudGlsIHRoZSBjYWxsYmFja2ZuIHJldHVybnMgYSB2YWx1ZVxuICAgICAqIHdoaWNoIGlzIGNvZXJjaWJsZSB0byB0aGUgQm9vbGVhbiB2YWx1ZSBmYWxzZSwgb3IgdW50aWwgdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIHRoaXNBcmcgQW4gb2JqZWN0IHRvIHdoaWNoIHRoZSB0aGlzIGtleXdvcmQgY2FuIHJlZmVyIGluIHRoZSBjYWxsYmFja2ZuIGZ1bmN0aW9uLlxuICAgICAqIElmIHRoaXNBcmcgaXMgb21pdHRlZCwgdW5kZWZpbmVkIGlzIHVzZWQgYXMgdGhlIHRoaXMgdmFsdWUuXG4gICAgICovXG4gICAgZXZlcnkoY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiB1bmtub3duLCB0aGlzQXJnPzogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKS5ldmVyeShjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBjYWxsYmFjayBmdW5jdGlvbiByZXR1cm5zIHRydWUgZm9yIGFueSBlbGVtZW50IG9mIGFuIGFycmF5LlxuICAgICAqIEBwYXJhbSBjYWxsYmFja2ZuIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIHVwIHRvIHRocmVlIGFyZ3VtZW50cy4gVGhlIHNvbWUgbWV0aG9kIGNhbGxzXG4gICAgICogdGhlIGNhbGxiYWNrZm4gZnVuY3Rpb24gZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgdW50aWwgdGhlIGNhbGxiYWNrZm4gcmV0dXJucyBhIHZhbHVlXG4gICAgICogd2hpY2ggaXMgY29lcmNpYmxlIHRvIHRoZSBCb29sZWFuIHZhbHVlIHRydWUsIG9yIHVudGlsIHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB0aGlzQXJnIEFuIG9iamVjdCB0byB3aGljaCB0aGUgdGhpcyBrZXl3b3JkIGNhbiByZWZlciBpbiB0aGUgY2FsbGJhY2tmbiBmdW5jdGlvbi5cbiAgICAgKiBJZiB0aGlzQXJnIGlzIG9taXR0ZWQsIHVuZGVmaW5lZCBpcyB1c2VkIGFzIHRoZSB0aGlzIHZhbHVlLlxuICAgICAqL1xuICAgIHNvbWUoY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiB1bmtub3duLCB0aGlzQXJnPzogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKS5zb21lKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBzcGVjaWZpZWQgYWN0aW9uIGZvciBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXkuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrZm4gIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIHVwIHRvIHRocmVlIGFyZ3VtZW50cy4gZm9yRWFjaCBjYWxscyB0aGUgY2FsbGJhY2tmbiBmdW5jdGlvbiBvbmUgdGltZSBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gdGhpc0FyZyAgQW4gb2JqZWN0IHRvIHdoaWNoIHRoZSB0aGlzIGtleXdvcmQgY2FuIHJlZmVyIGluIHRoZSBjYWxsYmFja2ZuIGZ1bmN0aW9uLiBJZiB0aGlzQXJnIGlzIG9taXR0ZWQsIHVuZGVmaW5lZCBpcyB1c2VkIGFzIHRoZSB0aGlzIHZhbHVlLlxuICAgICAqL1xuICAgIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZCB7XG4gICAgICAgIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgYSBkZWZpbmVkIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIGVhY2ggZWxlbWVudCBvZiBhbiBhcnJheSwgYW5kIHJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUgcmVzdWx0cy5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tmbiBBIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyB1cCB0byB0aHJlZSBhcmd1bWVudHMuIFRoZSBtYXAgbWV0aG9kIGNhbGxzIHRoZSBjYWxsYmFja2ZuIGZ1bmN0aW9uIG9uZSB0aW1lIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB0aGlzQXJnIEFuIG9iamVjdCB0byB3aGljaCB0aGUgdGhpcyBrZXl3b3JkIGNhbiByZWZlciBpbiB0aGUgY2FsbGJhY2tmbiBmdW5jdGlvbi4gSWYgdGhpc0FyZyBpcyBvbWl0dGVkLCB1bmRlZmluZWQgaXMgdXNlZCBhcyB0aGUgdGhpcyB2YWx1ZS5cbiAgICAgKi9cbiAgICBtYXA8VT4oY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiBVLCB0aGlzQXJnPzogYW55KTogVVtdIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLm1hcChjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiBhbiBhcnJheSB0aGF0IG1lZXQgdGhlIGNvbmRpdGlvbiBzcGVjaWZpZWQgaW4gYSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tmbiBBIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyB1cCB0byB0aHJlZSBhcmd1bWVudHMuIFRoZSBmaWx0ZXIgbWV0aG9kIGNhbGxzIHRoZSBjYWxsYmFja2ZuIGZ1bmN0aW9uIG9uZSB0aW1lIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB0aGlzQXJnIEFuIG9iamVjdCB0byB3aGljaCB0aGUgdGhpcyBrZXl3b3JkIGNhbiByZWZlciBpbiB0aGUgY2FsbGJhY2tmbiBmdW5jdGlvbi4gSWYgdGhpc0FyZyBpcyBvbWl0dGVkLCB1bmRlZmluZWQgaXMgdXNlZCBhcyB0aGUgdGhpcyB2YWx1ZS5cbiAgICAgKi9cbiAgICBmaWx0ZXIoY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiB1bmtub3duLCB0aGlzQXJnPzogYW55KVxuICAgIGZpbHRlcjxTIGV4dGVuZHMgVj4oY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiB2YWx1ZSBpcyBTLCB0aGlzQXJnPzogYW55KTogVltdIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLmZpbHRlcihjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBhbGwgdGhlIGVsZW1lbnRzIGluIGFuIGFycmF5LiBUaGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyB0aGUgYWNjdW11bGF0ZWQgcmVzdWx0LCBhbmQgaXMgcHJvdmlkZWQgYXMgYW4gYXJndW1lbnQgaW4gdGhlIG5leHQgY2FsbCB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIGNhbGxiYWNrZm4gQSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgdXAgdG8gZm91ciBhcmd1bWVudHMuIFRoZSByZWR1Y2UgbWV0aG9kIGNhbGxzIHRoZSBjYWxsYmFja2ZuIGZ1bmN0aW9uIG9uZSB0aW1lIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSBpbml0aWFsVmFsdWUgSWYgaW5pdGlhbFZhbHVlIGlzIHNwZWNpZmllZCwgaXQgaXMgdXNlZCBhcyB0aGUgaW5pdGlhbCB2YWx1ZSB0byBzdGFydCB0aGUgYWNjdW11bGF0aW9uLiBUaGUgZmlyc3QgY2FsbCB0byB0aGUgY2FsbGJhY2tmbiBmdW5jdGlvbiBwcm92aWRlcyB0aGlzIHZhbHVlIGFzIGFuIGFyZ3VtZW50IGluc3RlYWQgb2YgYW4gYXJyYXkgdmFsdWUuXG4gICAgICovXG4gICAgcmVkdWNlPFU9Vj4oY2FsbGJhY2tmbjogKHByZXZpb3VzVmFsdWU6IFUsIGN1cnJlbnRWYWx1ZTogViwgY3VycmVudEluZGV4OiBudW1iZXIsIGFycmF5OiBWW10pID0+IFUsIGluaXRpYWxWYWx1ZT86IFUpOiBVIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLnJlZHVjZShjYWxsYmFja2ZuLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGFsbCB0aGUgZWxlbWVudHMgaW4gYW4gYXJyYXksIGluIGRlc2NlbmRpbmcgb3JkZXIuIFRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIHRoZSBhY2N1bXVsYXRlZCByZXN1bHQsIGFuZCBpcyBwcm92aWRlZCBhcyBhbiBhcmd1bWVudCBpbiB0aGUgbmV4dCBjYWxsIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tmbiBBIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyB1cCB0byBmb3VyIGFyZ3VtZW50cy4gVGhlIHJlZHVjZVJpZ2h0IG1ldGhvZCBjYWxscyB0aGUgY2FsbGJhY2tmbiBmdW5jdGlvbiBvbmUgdGltZSBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gaW5pdGlhbFZhbHVlIElmIGluaXRpYWxWYWx1ZSBpcyBzcGVjaWZpZWQsIGl0IGlzIHVzZWQgYXMgdGhlIGluaXRpYWwgdmFsdWUgdG8gc3RhcnQgdGhlIGFjY3VtdWxhdGlvbi4gVGhlIGZpcnN0IGNhbGwgdG8gdGhlIGNhbGxiYWNrZm4gZnVuY3Rpb24gcHJvdmlkZXMgdGhpcyB2YWx1ZSBhcyBhbiBhcmd1bWVudCBpbnN0ZWFkIG9mIGFuIGFycmF5IHZhbHVlLlxuICAgICAqL1xuICAgIHJlZHVjZVJpZ2h0PFU9Vj4oY2FsbGJhY2tmbjogKHByZXZpb3VzVmFsdWU6IFUsIGN1cnJlbnRWYWx1ZTogViwgY3VycmVudEluZGV4OiBudW1iZXIsIGFycmF5OiBWW10pID0+IFUsIGluaXRpYWxWYWx1ZT86IFUpOiBVIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLnJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4sIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGFycmF5IHdoZXJlIHByZWRpY2F0ZSBpcyB0cnVlLCBhbmQgdW5kZWZpbmVkXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqIEBwYXJhbSBwcmVkaWNhdGUgZmluZCBjYWxscyBwcmVkaWNhdGUgb25jZSBmb3IgZWFjaCBlbGVtZW50IG9mIHRoZSBhcnJheSwgaW4gYXNjZW5kaW5nXG4gICAgICogb3JkZXIsIHVudGlsIGl0IGZpbmRzIG9uZSB3aGVyZSBwcmVkaWNhdGUgcmV0dXJucyB0cnVlLiBJZiBzdWNoIGFuIGVsZW1lbnQgaXMgZm91bmQsIGZpbmRcbiAgICAgKiBpbW1lZGlhdGVseSByZXR1cm5zIHRoYXQgZWxlbWVudCB2YWx1ZS4gT3RoZXJ3aXNlLCBmaW5kIHJldHVybnMgdW5kZWZpbmVkLlxuICAgICAqIEBwYXJhbSB0aGlzQXJnIElmIHByb3ZpZGVkLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIHRoaXMgdmFsdWUgZm9yIGVhY2ggaW52b2NhdGlvbiBvZlxuICAgICAqIHByZWRpY2F0ZS4gSWYgaXQgaXMgbm90IHByb3ZpZGVkLCB1bmRlZmluZWQgaXMgdXNlZCBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGZpbmQocHJlZGljYXRlOiAodmFsdWU6IFYsIGluZGV4OiBudW1iZXIsIG9iajogVltdKSA9PiBib29sZWFuLCB0aGlzQXJnPzogYW55KTogViB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKS5maW5kKHByZWRpY2F0ZSwgdGhpc0FyZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGFycmF5IHdoZXJlIHByZWRpY2F0ZSBpcyB0cnVlLCBhbmQgLTFcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICogQHBhcmFtIHByZWRpY2F0ZSBmaW5kIGNhbGxzIHByZWRpY2F0ZSBvbmNlIGZvciBlYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5LCBpbiBhc2NlbmRpbmdcbiAgICAgKiBvcmRlciwgdW50aWwgaXQgZmluZHMgb25lIHdoZXJlIHByZWRpY2F0ZSByZXR1cm5zIHRydWUuIElmIHN1Y2ggYW4gZWxlbWVudCBpcyBmb3VuZCxcbiAgICAgKiBmaW5kSW5kZXggaW1tZWRpYXRlbHkgcmV0dXJucyB0aGF0IGVsZW1lbnQgaW5kZXguIE90aGVyd2lzZSwgZmluZEluZGV4IHJldHVybnMgLTEuXG4gICAgICogQHBhcmFtIHRoaXNBcmcgSWYgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdXNlZCBhcyB0aGUgdGhpcyB2YWx1ZSBmb3IgZWFjaCBpbnZvY2F0aW9uIG9mXG4gICAgICogcHJlZGljYXRlLiBJZiBpdCBpcyBub3QgcHJvdmlkZWQsIHVuZGVmaW5lZCBpcyB1c2VkIGluc3RlYWQuXG4gICAgICovXG4gICAgZmluZEluZGV4KHByZWRpY2F0ZTogKHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBvYmo6IFZbXSkgPT4gdW5rbm93biwgdGhpc0FyZz86IGFueSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKS5maW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0aGlzIG9iamVjdCBhZnRlciBmaWxsaW5nIHRoZSBzZWN0aW9uIGlkZW50aWZpZWQgYnkgc3RhcnQgYW5kIGVuZCB3aXRoIHZhbHVlXG4gICAgICogQHBhcmFtIHZhbHVlIHZhbHVlIHRvIGZpbGwgYXJyYXkgc2VjdGlvbiB3aXRoXG4gICAgICogQHBhcmFtIHN0YXJ0IGluZGV4IHRvIHN0YXJ0IGZpbGxpbmcgdGhlIGFycmF5IGF0LiBJZiBzdGFydCBpcyBuZWdhdGl2ZSwgaXQgaXMgdHJlYXRlZCBhc1xuICAgICAqIGxlbmd0aCtzdGFydCB3aGVyZSBsZW5ndGggaXMgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIGVuZCBpbmRleCB0byBzdG9wIGZpbGxpbmcgdGhlIGFycmF5IGF0LiBJZiBlbmQgaXMgbmVnYXRpdmUsIGl0IGlzIHRyZWF0ZWQgYXNcbiAgICAgKiBsZW5ndGgrZW5kLlxuICAgICAqL1xuICAgIGZpbGwodmFsdWU6IFYsIHN0YXJ0PzogbnVtYmVyLCBlbmQ/OiBudW1iZXIpOiB0aGlzIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVE9ET1xuICAgICAgICAvL1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcnJheVNjaGVtYSNmaWxsKCkgbm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICAvLyB0aGlzLiRpdGVtcy5maWxsKHZhbHVlLCBzdGFydCwgZW5kKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0aGlzIG9iamVjdCBhZnRlciBjb3B5aW5nIGEgc2VjdGlvbiBvZiB0aGUgYXJyYXkgaWRlbnRpZmllZCBieSBzdGFydCBhbmQgZW5kXG4gICAgICogdG8gdGhlIHNhbWUgYXJyYXkgc3RhcnRpbmcgYXQgcG9zaXRpb24gdGFyZ2V0XG4gICAgICogQHBhcmFtIHRhcmdldCBJZiB0YXJnZXQgaXMgbmVnYXRpdmUsIGl0IGlzIHRyZWF0ZWQgYXMgbGVuZ3RoK3RhcmdldCB3aGVyZSBsZW5ndGggaXMgdGhlXG4gICAgICogbGVuZ3RoIG9mIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0gc3RhcnQgSWYgc3RhcnQgaXMgbmVnYXRpdmUsIGl0IGlzIHRyZWF0ZWQgYXMgbGVuZ3RoK3N0YXJ0LiBJZiBlbmQgaXMgbmVnYXRpdmUsIGl0XG4gICAgICogaXMgdHJlYXRlZCBhcyBsZW5ndGgrZW5kLlxuICAgICAqIEBwYXJhbSBlbmQgSWYgbm90IHNwZWNpZmllZCwgbGVuZ3RoIG9mIHRoZSB0aGlzIG9iamVjdCBpcyB1c2VkIGFzIGl0cyBkZWZhdWx0IHZhbHVlLlxuICAgICAqL1xuICAgIGNvcHlXaXRoaW4odGFyZ2V0OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZD86IG51bWJlcik6IHRoaXMge1xuICAgICAgICAvL1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFycmF5U2NoZW1hI2NvcHlXaXRoaW4oKSBub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYW4gYXJyYXkuXG4gICAgICovXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuJGl0ZW1zLnRvU3RyaW5nKCk7IH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYW4gYXJyYXkuIFRoZSBlbGVtZW50cyBhcmUgY29udmVydGVkIHRvIHN0cmluZyB1c2luZyB0aGVpciB0b0xvY2FsU3RyaW5nIG1ldGhvZHMuXG4gICAgICovXG4gICAgdG9Mb2NhbGVTdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuJGl0ZW1zLnRvTG9jYWxlU3RyaW5nKCkgfTtcblxuICAgIC8qKiBJdGVyYXRvciAqL1xuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiRpdGVtcy52YWx1ZXMoKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cblxuICAgIFtTeW1ib2wudW5zY29wYWJsZXNdKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXNbU3ltYm9sLnVuc2NvcGFibGVzXSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlcmFibGUgb2Yga2V5LCB2YWx1ZSBwYWlycyBmb3IgZXZlcnkgZW50cnkgaW4gdGhlIGFycmF5XG4gICAgICovXG4gICAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtudW1iZXIsIFZdPiB7IHJldHVybiB0aGlzLiRpdGVtcy5lbnRyaWVzKCk7IH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlcmFibGUgb2Yga2V5cyBpbiB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8bnVtYmVyPiB7IHJldHVybiB0aGlzLiRpdGVtcy5rZXlzKCk7IH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlcmFibGUgb2YgdmFsdWVzIGluIHRoZSBhcnJheVxuICAgICAqL1xuICAgIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHsgcmV0dXJuIHRoaXMuJGl0ZW1zLnZhbHVlcygpOyB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gYXJyYXkgaW5jbHVkZXMgYSBjZXJ0YWluIGVsZW1lbnQsIHJldHVybmluZyB0cnVlIG9yIGZhbHNlIGFzIGFwcHJvcHJpYXRlLlxuICAgICAqIEBwYXJhbSBzZWFyY2hFbGVtZW50IFRoZSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIGZyb21JbmRleCBUaGUgcG9zaXRpb24gaW4gdGhpcyBhcnJheSBhdCB3aGljaCB0byBiZWdpbiBzZWFyY2hpbmcgZm9yIHNlYXJjaEVsZW1lbnQuXG4gICAgICovXG4gICAgaW5jbHVkZXMoc2VhcmNoRWxlbWVudDogViwgZnJvbUluZGV4PzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKS5pbmNsdWRlcyhzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIGEgZGVmaW5lZCBjYWxsYmFjayBmdW5jdGlvbiBvbiBlYWNoIGVsZW1lbnQgb2YgYW4gYXJyYXkuIFRoZW4sIGZsYXR0ZW5zIHRoZSByZXN1bHQgaW50b1xuICAgICAqIGEgbmV3IGFycmF5LlxuICAgICAqIFRoaXMgaXMgaWRlbnRpY2FsIHRvIGEgbWFwIGZvbGxvd2VkIGJ5IGZsYXQgd2l0aCBkZXB0aCAxLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIHVwIHRvIHRocmVlIGFyZ3VtZW50cy4gVGhlIGZsYXRNYXAgbWV0aG9kIGNhbGxzIHRoZVxuICAgICAqIGNhbGxiYWNrIGZ1bmN0aW9uIG9uZSB0aW1lIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB0aGlzQXJnIEFuIG9iamVjdCB0byB3aGljaCB0aGUgdGhpcyBrZXl3b3JkIGNhbiByZWZlciBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uIElmXG4gICAgICogdGhpc0FyZyBpcyBvbWl0dGVkLCB1bmRlZmluZWQgaXMgdXNlZCBhcyB0aGUgdGhpcyB2YWx1ZS5cbiAgICAgKi9cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZmxhdE1hcDxVLCBUaGlzID0gdW5kZWZpbmVkPihjYWxsYmFjazogKHRoaXM6IFRoaXMsIHZhbHVlOiBWLCBpbmRleDogbnVtYmVyLCBhcnJheTogVltdKSA9PiBVIHwgUmVhZG9ubHlBcnJheTxVPiwgdGhpc0FyZz86IFRoaXMpOiBVW10ge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFycmF5U2NoZW1hI2ZsYXRNYXAoKSBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggYWxsIHN1Yi1hcnJheSBlbGVtZW50cyBjb25jYXRlbmF0ZWQgaW50byBpdCByZWN1cnNpdmVseSB1cCB0byB0aGVcbiAgICAgKiBzcGVjaWZpZWQgZGVwdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGVwdGggVGhlIG1heGltdW0gcmVjdXJzaW9uIGRlcHRoXG4gICAgICovXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGZsYXQ8QSwgRCBleHRlbmRzIG51bWJlciA9IDE+KHRoaXM6IEEsIGRlcHRoPzogRCk6IGFueSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJyYXlTY2hlbWEjZmxhdCgpIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cblxuICAgIC8vIGdldCBzaXplICgpIHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLnNpemU7XG4gICAgLy8gfVxuXG4gICAgcHJvdGVjdGVkIHNldEluZGV4KGluZGV4OiBudW1iZXIsIGtleTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJGluZGV4ZXMuc2V0KGluZGV4LCBrZXkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpbmRleGVzLmdldChpbmRleCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEJ5SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuZ2V0KHRoaXMuJGluZGV4ZXMuZ2V0KGluZGV4KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRlbGV0ZUJ5SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLiRpbmRleGVzLmdldChpbmRleCk7XG4gICAgICAgIHRoaXMuJGl0ZW1zLmRlbGV0ZShrZXkpO1xuICAgICAgICB0aGlzLiRpbmRleGVzLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuXG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9BcnJheSgpLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mICh2YWx1ZVsndG9KU09OJ10pID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgPyB2YWx1ZVsndG9KU09OJ10oKVxuICAgICAgICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gRGVjb2RpbmcgdXRpbGl0aWVzXG4gICAgLy9cbiAgICBjbG9uZShpc0RlY29kaW5nPzogYm9vbGVhbik6IEFycmF5U2NoZW1hPFY+IHtcbiAgICAgICAgbGV0IGNsb25lZDogQXJyYXlTY2hlbWE7XG5cbiAgICAgICAgaWYgKGlzRGVjb2RpbmcpIHtcbiAgICAgICAgICAgIGNsb25lZCA9IG5ldyBBcnJheVNjaGVtYSguLi5BcnJheS5mcm9tKHRoaXMuJGl0ZW1zLnZhbHVlcygpKSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsb25lZCA9IG5ldyBBcnJheVNjaGVtYSguLi50aGlzLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgICAoaXRlbVsnJGNoYW5nZXMnXSlcbiAgICAgICAgICAgICAgICAgICAgPyAoaXRlbSBhcyBhbnkgYXMgU2NoZW1hKS5jbG9uZSgpXG4gICAgICAgICAgICAgICAgICAgIDogaXRlbVxuICAgICAgICAgICAgKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9O1xuXG4gICAgdHJpZ2dlckFsbCAoKTogdm9pZCB7XG4gICAgICAgIFNjaGVtYS5wcm90b3R5cGUudHJpZ2dlckFsbC5hcHBseSh0aGlzKTtcbiAgICB9XG59XG5cbnJlZ2lzdGVyVHlwZShcImFycmF5XCIsIHtcbiAgICBjb25zdHJ1Y3RvcjogQXJyYXlTY2hlbWEsXG4gICAgZ2V0UHJveHk6IGdldEFycmF5UHJveHksXG59KTsiXX0=

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSchema = exports.getMapProxy = void 0;
var ChangeTree_1 = __webpack_require__(3);
var spec_1 = __webpack_require__(0);
var Schema_1 = __webpack_require__(1);
var _1 = __webpack_require__(2);
function getMapProxy(value) {
    value['$proxy'] = true;
    value = new Proxy(value, {
        get: function (obj, prop) {
            if (typeof (prop) !== "symbol" && // accessing properties
                typeof (obj[prop]) === "undefined") {
                return obj.get(prop);
            }
            else {
                return obj[prop];
            }
        },
        set: function (obj, prop, setValue) {
            if (typeof (prop) !== "symbol" &&
                (prop.indexOf("$") === -1 &&
                    prop !== "onAdd" &&
                    prop !== "onRemove" &&
                    prop !== "onChange")) {
                obj.set(prop, setValue);
            }
            else {
                obj[prop] = setValue;
            }
            return true;
        },
        deleteProperty: function (obj, prop) {
            obj.delete(prop);
            return true;
        },
    });
    return value;
}
exports.getMapProxy = getMapProxy;
var MapSchema = /** @class */ (function () {
    function MapSchema(initialValues) {
        var _this = this;
        this.$changes = new ChangeTree_1.ChangeTree(this);
        this.$items = new Map();
        this.$indexes = new Map();
        this.$refId = 0;
        if (initialValues) {
            if (initialValues instanceof Map) {
                initialValues.forEach(function (v, k) { return _this.set(k, v); });
            }
            else {
                for (var k in initialValues) {
                    this.set(k, initialValues[k]);
                }
            }
        }
    }
    MapSchema.is = function (type) {
        return type['map'] !== undefined;
    };
    /** Iterator */
    MapSchema.prototype[Symbol.iterator] = function () { return this.$items[Symbol.iterator](); };
    Object.defineProperty(MapSchema.prototype, Symbol.toStringTag, {
        get: function () { return this.$items[Symbol.toStringTag]; },
        enumerable: false,
        configurable: true
    });
    MapSchema.prototype.set = function (key, value) {
        // get "index" for this value.
        var hasIndex = typeof (this.$changes.indexes[key]) !== "undefined";
        var index = (hasIndex)
            ? this.$changes.indexes[key]
            : this.$refId++;
        var operation = (hasIndex)
            ? spec_1.OPERATION.REPLACE
            : spec_1.OPERATION.ADD;
        var isRef = (value['$changes']) !== undefined;
        if (isRef) {
            value['$changes'].setParent(this, this.$changes.root, index);
        }
        //
        // (encoding)
        // set a unique id to relate directly with this key/value.
        //
        if (!hasIndex) {
            this.$changes.indexes[key] = index;
            this.$indexes.set(index, key);
        }
        else if (isRef && // if is schema, force ADD operation if value differ from previous one.
            this.$items.get(key) !== value) {
            operation = spec_1.OPERATION.ADD;
        }
        this.$items.set(key, value);
        this.$changes.change(key, operation);
        return this;
    };
    MapSchema.prototype.get = function (key) {
        return this.$items.get(key);
    };
    MapSchema.prototype.delete = function (key) {
        //
        // TODO: add a "purge" method after .encode() runs, to cleanup removed `$indexes`
        //
        // We don't remove $indexes to allow setting the same key in the same patch
        // (See "should allow to remove and set an item in the same place" test)
        //
        // // const index = this.$changes.indexes[key];
        // // this.$indexes.delete(index);
        this.$changes.delete(key);
        return this.$items.delete(key);
    };
    MapSchema.prototype.clear = function (isDecoding) {
        var _this = this;
        // discard previous operations.
        this.$changes.discard(true);
        this.$changes.indexes = {};
        // clear previous indexes
        this.$indexes.clear();
        // flag child items for garbage collection.
        if (isDecoding && typeof (this.$changes.getType()) !== "string") {
            this.$items.forEach(function (item) {
                _this.$changes.root.removeRef(item['$changes'].refId);
            });
        }
        // clear items
        this.$items.clear();
        this.$changes.operation({ index: 0, op: spec_1.OPERATION.CLEAR });
        // touch all structures until reach root
        this.$changes.touchParents();
    };
    MapSchema.prototype.has = function (key) {
        return this.$items.has(key);
    };
    MapSchema.prototype.forEach = function (callbackfn) {
        this.$items.forEach(callbackfn);
    };
    MapSchema.prototype.entries = function () {
        return this.$items.entries();
    };
    MapSchema.prototype.keys = function () {
        return this.$items.keys();
    };
    MapSchema.prototype.values = function () {
        return this.$items.values();
    };
    Object.defineProperty(MapSchema.prototype, "size", {
        get: function () {
            return this.$items.size;
        },
        enumerable: false,
        configurable: true
    });
    MapSchema.prototype.setIndex = function (index, key) {
        this.$indexes.set(index, key);
    };
    MapSchema.prototype.getIndex = function (index) {
        return this.$indexes.get(index);
    };
    MapSchema.prototype.getByIndex = function (index) {
        return this.$items.get(this.$indexes.get(index));
    };
    MapSchema.prototype.deleteByIndex = function (index) {
        var key = this.$indexes.get(index);
        this.$items.delete(key);
        this.$indexes.delete(index);
    };
    MapSchema.prototype.toJSON = function () {
        var map = {};
        this.forEach(function (value, key) {
            map[key] = (typeof (value['toJSON']) === "function")
                ? value['toJSON']()
                : value;
        });
        return map;
    };
    //
    // Decoding utilities
    //
    MapSchema.prototype.clone = function (isDecoding) {
        var cloned;
        if (isDecoding) {
            // client-side
            cloned = Object.assign(new MapSchema(), this);
        }
        else {
            // server-side
            var cloned_1 = new MapSchema();
            this.forEach(function (value, key) {
                if (value['$changes']) {
                    cloned_1.set(key, value['clone']());
                }
                else {
                    cloned_1.set(key, value);
                }
            });
        }
        return cloned;
    };
    MapSchema.prototype.triggerAll = function () {
        Schema_1.Schema.prototype.triggerAll.apply(this);
    };
    return MapSchema;
}());
exports.MapSchema = MapSchema;
_1.registerType("map", {
    constructor: MapSchema,
    getProxy: getMapProxy,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL01hcFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBbUQ7QUFDbkQsZ0NBQW9DO0FBQ3BDLG9DQUEyRDtBQUMzRCxzQkFBaUM7QUFJakMsU0FBZ0IsV0FBVyxDQUFDLEtBQWdCO0lBQ3hDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFdkIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNyQixHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtZQUNYLElBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsSUFBSSx1QkFBdUI7Z0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQ3BDO2dCQUNFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFjLENBQUMsQ0FBQzthQUVsQztpQkFBTTtnQkFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUM7UUFFRCxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVE7WUFDckIsSUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUTtnQkFDMUIsQ0FDSyxJQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxLQUFLLE9BQU87b0JBQ2hCLElBQUksS0FBSyxVQUFVO29CQUNuQixJQUFJLEtBQUssVUFBVSxDQUN0QixFQUNIO2dCQUNFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBRXJDO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDeEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsY0FBYyxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFjLENBQUMsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQXpDRCxrQ0F5Q0M7QUFFRDtJQW1CSSxtQkFBYSxhQUFvQztRQUFqRCxpQkFXQztRQTdCUyxhQUFRLEdBQWUsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBbUIsSUFBSSxHQUFHLEVBQWEsQ0FBQztRQUM5QyxhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRTFELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFjekIsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLGFBQWEsWUFBWSxHQUFHLEVBQUU7Z0JBQzlCLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWQsQ0FBYyxDQUFDLENBQUM7YUFFbkQ7aUJBQU07Z0JBQ0gsS0FBSyxJQUFNLENBQUMsSUFBSSxhQUFhLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBZk0sWUFBRSxHQUFULFVBQVUsSUFBUztRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBZUQsZUFBZTtJQUNmLG9CQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBakIsY0FBZ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixzQkFBSSxxQkFBQyxNQUFNLENBQUMsV0FBWTthQUF4QixjQUE2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFFckUsdUJBQUcsR0FBSCxVQUFJLEdBQU0sRUFBRSxLQUFRO1FBQ2hCLDhCQUE4QjtRQUM5QixJQUFNLFFBQVEsR0FBRyxPQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUM7UUFDcEUsSUFBTSxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXBCLElBQUksU0FBUyxHQUFjLENBQUMsUUFBUSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU87WUFDbkIsQ0FBQyxDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDO1FBRXBCLElBQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQ2hELElBQUksS0FBSyxFQUFFO1lBQ04sS0FBSyxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQyxTQUFTLENBQ3ZDLElBQUksRUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDbEIsS0FBSyxDQUNSLENBQUM7U0FDTDtRQUVELEVBQUU7UUFDRixhQUFhO1FBQ2IsMERBQTBEO1FBQzFELEVBQUU7UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUVqQzthQUFNLElBQ0gsS0FBSyxJQUFJLHVFQUF1RTtZQUNoRixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQ2hDO1lBQ0UsU0FBUyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLEdBQU07UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQU8sR0FBTTtRQUNULEVBQUU7UUFDRixpRkFBaUY7UUFDakYsRUFBRTtRQUNGLDJFQUEyRTtRQUMzRSx3RUFBd0U7UUFDeEUsRUFBRTtRQUNGLCtDQUErQztRQUMvQyxrQ0FBa0M7UUFFbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQseUJBQUssR0FBTCxVQUFNLFVBQW9CO1FBQTFCLGlCQXNCQztRQXJCRywrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRTNCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRCLDJDQUEyQztRQUMzQyxJQUFJLFVBQVUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQU87Z0JBQ3hCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELGNBQWM7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsZ0JBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTNELHdDQUF3QztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1QkFBRyxHQUFILFVBQUssR0FBTTtRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELDJCQUFPLEdBQVAsVUFBUSxVQUFzRDtRQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsMkJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0JBQUksR0FBSjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0JBQUksMkJBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFUyw0QkFBUSxHQUFsQixVQUFtQixLQUFhLEVBQUUsR0FBVztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVTLDRCQUFRLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRVMsOEJBQVUsR0FBcEIsVUFBcUIsS0FBYTtRQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVTLGlDQUFhLEdBQXZCLFVBQXdCLEtBQWE7UUFDakMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDSSxJQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO1lBQ3BCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ25CLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxFQUFFO0lBQ0YscUJBQXFCO0lBQ3JCLEVBQUU7SUFDRix5QkFBSyxHQUFMLFVBQU0sVUFBb0I7UUFDdEIsSUFBSSxNQUFpQixDQUFDO1FBRXRCLElBQUksVUFBVSxFQUFFO1lBQ1osY0FBYztZQUNkLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFakQ7YUFBTTtZQUNILGNBQWM7WUFDZCxJQUFNLFFBQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDcEIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ25CLFFBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JDO3FCQUFNO29CQUNILFFBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtZQUNMLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLGVBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBMU1ELElBME1DO0FBMU1ZLDhCQUFTO0FBNE10QixlQUFZLENBQUMsS0FBSyxFQUFFO0lBQ2hCLFdBQVcsRUFBRSxTQUFTO0lBQ3RCLFFBQVEsRUFBRSxXQUFXO0NBQ3hCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZVRyZWUgfSBmcm9tIFwiLi4vY2hhbmdlcy9DaGFuZ2VUcmVlXCI7XG5pbXBvcnQgeyBPUEVSQVRJT04gfSBmcm9tIFwiLi4vc3BlY1wiO1xuaW1wb3J0IHsgU2NoZW1hRGVjb2RlckNhbGxiYWNrcywgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJUeXBlIH0gZnJvbSBcIi5cIjtcblxudHlwZSBLID0gc3RyaW5nOyAvLyBUT0RPOiBhbGxvdyB0byBzcGVjaWZ5IEsgZ2VuZXJpYyBvbiBNYXBTY2hlbWEuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXBQcm94eSh2YWx1ZTogTWFwU2NoZW1hKSB7XG4gICAgdmFsdWVbJyRwcm94eSddID0gdHJ1ZTtcblxuICAgIHZhbHVlID0gbmV3IFByb3h5KHZhbHVlLCB7XG4gICAgICAgIGdldDogKG9iaiwgcHJvcCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiAocHJvcCkgIT09IFwic3ltYm9sXCIgJiYgLy8gYWNjZXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICB0eXBlb2YgKG9ialtwcm9wXSkgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmouZ2V0KHByb3AgYXMgc3RyaW5nKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldDogKG9iaiwgcHJvcCwgc2V0VmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgKHByb3ApICE9PSBcInN5bWJvbFwiICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAocHJvcCBhcyBzdHJpbmcpLmluZGV4T2YoXCIkXCIpID09PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBwcm9wICE9PSBcIm9uQWRkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvcCAhPT0gXCJvblJlbW92ZVwiICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3AgIT09IFwib25DaGFuZ2VcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iai5zZXQocHJvcCBhcyBzdHJpbmcsIHNldFZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBzZXRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5OiAob2JqLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICBvYmouZGVsZXRlKHByb3AgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgY2xhc3MgTWFwU2NoZW1hPFY9YW55PiBpbXBsZW1lbnRzIE1hcDxzdHJpbmcsIFY+LCBTY2hlbWFEZWNvZGVyQ2FsbGJhY2tzIHtcbiAgICBwcm90ZWN0ZWQgJGNoYW5nZXM6IENoYW5nZVRyZWUgPSBuZXcgQ2hhbmdlVHJlZSh0aGlzKTtcblxuICAgIHByb3RlY3RlZCAkaXRlbXM6IE1hcDxzdHJpbmcsIFY+ID0gbmV3IE1hcDxzdHJpbmcsIFY+KCk7XG4gICAgcHJvdGVjdGVkICRpbmRleGVzOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oKTtcblxuICAgIHByb3RlY3RlZCAkcmVmSWQ6IG51bWJlciA9IDA7XG5cbiAgICAvL1xuICAgIC8vIERlY29kaW5nIGNhbGxiYWNrc1xuICAgIC8vXG4gICAgcHVibGljIG9uQWRkPzogKGl0ZW06IFYsIGtleTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBvblJlbW92ZT86IChpdGVtOiBWLCBrZXk6IHN0cmluZykgPT4gdm9pZDtcbiAgICBwdWJsaWMgb25DaGFuZ2U/OiAoaXRlbTogViwga2V5OiBzdHJpbmcpID0+IHZvaWQ7XG5cbiAgICBzdGF0aWMgaXModHlwZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlWydtYXAnXSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChpbml0aWFsVmFsdWVzPzogTWFwPHN0cmluZywgVj4gfCBhbnkpIHtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChpbml0aWFsVmFsdWVzIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlcy5mb3JFYWNoKCh2LCBrKSA9PiB0aGlzLnNldChrLCB2KSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgaW5pdGlhbFZhbHVlc1trXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEl0ZXJhdG9yICovXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHsgcmV0dXJuIHRoaXMuJGl0ZW1zW1N5bWJvbC5pdGVyYXRvcl0oKTsgfVxuICAgIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHsgcmV0dXJuIHRoaXMuJGl0ZW1zW1N5bWJvbC50b1N0cmluZ1RhZ10gfVxuXG4gICAgc2V0KGtleTogSywgdmFsdWU6IFYpIHtcbiAgICAgICAgLy8gZ2V0IFwiaW5kZXhcIiBmb3IgdGhpcyB2YWx1ZS5cbiAgICAgICAgY29uc3QgaGFzSW5kZXggPSB0eXBlb2YodGhpcy4kY2hhbmdlcy5pbmRleGVzW2tleV0pICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICBjb25zdCBpbmRleCA9IChoYXNJbmRleClcbiAgICAgICAgICAgID8gdGhpcy4kY2hhbmdlcy5pbmRleGVzW2tleV1cbiAgICAgICAgICAgIDogdGhpcy4kcmVmSWQrKztcblxuICAgICAgICBsZXQgb3BlcmF0aW9uOiBPUEVSQVRJT04gPSAoaGFzSW5kZXgpXG4gICAgICAgICAgICA/IE9QRVJBVElPTi5SRVBMQUNFXG4gICAgICAgICAgICA6IE9QRVJBVElPTi5BREQ7XG5cbiAgICAgICAgY29uc3QgaXNSZWYgPSAodmFsdWVbJyRjaGFuZ2VzJ10pICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChpc1JlZikge1xuICAgICAgICAgICAgKHZhbHVlWyckY2hhbmdlcyddIGFzIENoYW5nZVRyZWUpLnNldFBhcmVudChcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIHRoaXMuJGNoYW5nZXMucm9vdCxcbiAgICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIChlbmNvZGluZylcbiAgICAgICAgLy8gc2V0IGEgdW5pcXVlIGlkIHRvIHJlbGF0ZSBkaXJlY3RseSB3aXRoIHRoaXMga2V5L3ZhbHVlLlxuICAgICAgICAvL1xuICAgICAgICBpZiAoIWhhc0luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLiRjaGFuZ2VzLmluZGV4ZXNba2V5XSA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy4kaW5kZXhlcy5zZXQoaW5kZXgsIGtleSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIGlzUmVmICYmIC8vIGlmIGlzIHNjaGVtYSwgZm9yY2UgQUREIG9wZXJhdGlvbiBpZiB2YWx1ZSBkaWZmZXIgZnJvbSBwcmV2aW91cyBvbmUuXG4gICAgICAgICAgICB0aGlzLiRpdGVtcy5nZXQoa2V5KSAhPT0gdmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvcGVyYXRpb24gPSBPUEVSQVRJT04uQUREO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kaXRlbXMuc2V0KGtleSwgdmFsdWUpO1xuXG4gICAgICAgIHRoaXMuJGNoYW5nZXMuY2hhbmdlKGtleSwgb3BlcmF0aW9uKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQoa2V5OiBLKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBkZWxldGUoa2V5OiBLKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRPRE86IGFkZCBhIFwicHVyZ2VcIiBtZXRob2QgYWZ0ZXIgLmVuY29kZSgpIHJ1bnMsIHRvIGNsZWFudXAgcmVtb3ZlZCBgJGluZGV4ZXNgXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFdlIGRvbid0IHJlbW92ZSAkaW5kZXhlcyB0byBhbGxvdyBzZXR0aW5nIHRoZSBzYW1lIGtleSBpbiB0aGUgc2FtZSBwYXRjaFxuICAgICAgICAvLyAoU2VlIFwic2hvdWxkIGFsbG93IHRvIHJlbW92ZSBhbmQgc2V0IGFuIGl0ZW0gaW4gdGhlIHNhbWUgcGxhY2VcIiB0ZXN0KVxuICAgICAgICAvL1xuICAgICAgICAvLyAvLyBjb25zdCBpbmRleCA9IHRoaXMuJGNoYW5nZXMuaW5kZXhlc1trZXldO1xuICAgICAgICAvLyAvLyB0aGlzLiRpbmRleGVzLmRlbGV0ZShpbmRleCk7XG5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIGNsZWFyKGlzRGVjb2Rpbmc/OiBib29sZWFuKSB7XG4gICAgICAgIC8vIGRpc2NhcmQgcHJldmlvdXMgb3BlcmF0aW9ucy5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5kaXNjYXJkKHRydWUpO1xuICAgICAgICB0aGlzLiRjaGFuZ2VzLmluZGV4ZXMgPSB7fTtcblxuICAgICAgICAvLyBjbGVhciBwcmV2aW91cyBpbmRleGVzXG4gICAgICAgIHRoaXMuJGluZGV4ZXMuY2xlYXIoKTtcblxuICAgICAgICAvLyBmbGFnIGNoaWxkIGl0ZW1zIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgIGlmIChpc0RlY29kaW5nICYmIHR5cGVvZiAodGhpcy4kY2hhbmdlcy5nZXRUeXBlKCkpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLiRpdGVtcy5mb3JFYWNoKChpdGVtOiBWKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY2hhbmdlcy5yb290LnJlbW92ZVJlZihpdGVtWyckY2hhbmdlcyddLnJlZklkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgaXRlbXNcbiAgICAgICAgdGhpcy4kaXRlbXMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiRjaGFuZ2VzLm9wZXJhdGlvbih7IGluZGV4OiAwLCBvcDogT1BFUkFUSU9OLkNMRUFSIH0pO1xuXG4gICAgICAgIC8vIHRvdWNoIGFsbCBzdHJ1Y3R1cmVzIHVudGlsIHJlYWNoIHJvb3RcbiAgICAgICAgdGhpcy4kY2hhbmdlcy50b3VjaFBhcmVudHMoKTtcbiAgICB9XG5cbiAgICBoYXMgKGtleTogSykge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNYXA8SywgVj4pID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy4kaXRlbXMuZm9yRWFjaChjYWxsYmFja2ZuKTtcbiAgICB9XG5cbiAgICBlbnRyaWVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmVudHJpZXMoKTtcbiAgICB9XG5cbiAgICBrZXlzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmtleXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcy52YWx1ZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcy5zaXplO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRJbmRleChpbmRleDogbnVtYmVyLCBrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLiRpbmRleGVzLnNldChpbmRleCwga2V5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy4kaW5kZXhlcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRCeUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmdldCh0aGlzLiRpbmRleGVzLmdldChpbmRleCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkZWxldGVCeUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy4kaW5kZXhlcy5nZXQoaW5kZXgpO1xuICAgICAgICB0aGlzLiRpdGVtcy5kZWxldGUoa2V5KTtcbiAgICAgICAgdGhpcy4kaW5kZXhlcy5kZWxldGUoaW5kZXgpO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgbWFwOiBhbnkgPSB7fTtcblxuICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG1hcFtrZXldID0gKHR5cGVvZiAodmFsdWVbJ3RvSlNPTiddKSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgID8gdmFsdWVbJ3RvSlNPTiddKClcbiAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gRGVjb2RpbmcgdXRpbGl0aWVzXG4gICAgLy9cbiAgICBjbG9uZShpc0RlY29kaW5nPzogYm9vbGVhbik6IE1hcFNjaGVtYTxWPiB7XG4gICAgICAgIGxldCBjbG9uZWQ6IE1hcFNjaGVtYTtcblxuICAgICAgICBpZiAoaXNEZWNvZGluZykge1xuICAgICAgICAgICAgLy8gY2xpZW50LXNpZGVcbiAgICAgICAgICAgIGNsb25lZCA9IE9iamVjdC5hc3NpZ24obmV3IE1hcFNjaGVtYSgpLCB0aGlzKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VydmVyLXNpZGVcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG5ldyBNYXBTY2hlbWEoKTtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVsnJGNoYW5nZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9uZWQuc2V0KGtleSwgdmFsdWVbJ2Nsb25lJ10oKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQWxsICgpOiB2b2lkIHtcbiAgICAgICAgU2NoZW1hLnByb3RvdHlwZS50cmlnZ2VyQWxsLmFwcGx5KHRoaXMpO1xuICAgIH1cbn1cblxucmVnaXN0ZXJUeXBlKFwibWFwXCIsIHtcbiAgICBjb25zdHJ1Y3RvcjogTWFwU2NoZW1hLFxuICAgIGdldFByb3h5OiBnZXRNYXBQcm94eSxcbn0pOyJdfQ==

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTypes = exports.deprecated = exports.filterChildren = exports.filter = exports.type = exports.globalContext = exports.Context = exports.hasFilter = exports.SchemaDefinition = void 0;
var Schema_1 = __webpack_require__(1);
var ArraySchema_1 = __webpack_require__(4);
var MapSchema_1 = __webpack_require__(5);
var types_1 = __webpack_require__(2);
var SchemaDefinition = /** @class */ (function () {
    function SchemaDefinition() {
        //
        // TODO: use a "field" structure combining all these properties per-field.
        //
        this.indexes = {};
        this.fieldsByIndex = {};
        this.deprecated = {};
        this.descriptors = {};
    }
    SchemaDefinition.create = function (parent) {
        var definition = new SchemaDefinition();
        // support inheritance
        definition.schema = Object.assign({}, parent && parent.schema || {});
        definition.indexes = Object.assign({}, parent && parent.indexes || {});
        definition.fieldsByIndex = Object.assign({}, parent && parent.fieldsByIndex || {});
        definition.descriptors = Object.assign({}, parent && parent.descriptors || {});
        definition.deprecated = Object.assign({}, parent && parent.deprecated || {});
        return definition;
    };
    SchemaDefinition.prototype.addField = function (field, type) {
        var index = this.getNextFieldIndex();
        this.fieldsByIndex[index] = field;
        this.indexes[field] = index;
        this.schema[field] = (Array.isArray(type))
            ? { array: type[0] }
            : type;
    };
    SchemaDefinition.prototype.addFilter = function (field, cb) {
        if (!this.filters) {
            this.filters = {};
            this.indexesWithFilters = [];
        }
        this.filters[this.indexes[field]] = cb;
        this.indexesWithFilters.push(this.indexes[field]);
        return true;
    };
    SchemaDefinition.prototype.addChildrenFilter = function (field, cb) {
        var index = this.indexes[field];
        var type = this.schema[field];
        if (types_1.getType(Object.keys(type)[0])) {
            if (!this.childFilters) {
                this.childFilters = {};
            }
            this.childFilters[index] = cb;
            return true;
        }
        else {
            console.warn("@filterChildren: field '" + field + "' can't have children. Ignoring filter.");
        }
    };
    SchemaDefinition.prototype.getChildrenFilter = function (field) {
        return this.childFilters && this.childFilters[this.indexes[field]];
    };
    SchemaDefinition.prototype.getNextFieldIndex = function () {
        return Object.keys(this.schema || {}).length;
    };
    return SchemaDefinition;
}());
exports.SchemaDefinition = SchemaDefinition;
function hasFilter(klass) {
    return klass._context && klass._context.useFilters;
}
exports.hasFilter = hasFilter;
var Context = /** @class */ (function () {
    function Context() {
        this.types = {};
        this.schemas = new Map();
        this.useFilters = false;
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
    Context.create = function (context) {
        if (context === void 0) { context = new Context; }
        return function (definition) {
            return type(definition, context);
        };
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
            constructor._definition = SchemaDefinition.create(constructor._definition);
        }
        var definition = constructor._definition;
        definition.addField(field, type);
        /**
         * skip if descriptor already exists for this field (`@deprecated()`)
         */
        if (definition.descriptors[field]) {
            return;
        }
        var isArray = ArraySchema_1.ArraySchema.is(type);
        var isMap = !isArray && MapSchema_1.MapSchema.is(type);
        // TODO: refactor me.
        // Allow abstract intermediary classes with no fields to be serialized
        // (See "should support an inheritance with a Schema type without fields" test)
        if (typeof (type) !== "string" && !Schema_1.Schema.is(type)) {
            var childType = Object.values(type)[0];
            if (typeof (childType) !== "string" && !childType._context) {
                context.add(childType);
            }
        }
        var fieldCached = "_" + field;
        definition.descriptors[fieldCached] = {
            enumerable: false,
            configurable: false,
            writable: true,
        };
        definition.descriptors[field] = {
            get: function () {
                return this[fieldCached];
            },
            set: function (value) {
                /**
                 * Create Proxy for array or map items
                 */
                // skip if value is the same as cached.
                if (value === this[fieldCached]) {
                    return;
                }
                if (value !== undefined &&
                    value !== null) {
                    // automaticallty transform Array into ArraySchema
                    if (isArray && !(value instanceof ArraySchema_1.ArraySchema)) {
                        value = new (ArraySchema_1.ArraySchema.bind.apply(ArraySchema_1.ArraySchema, __spread([void 0], value)))();
                    }
                    // automaticallty transform Map into MapSchema
                    if (isMap && !(value instanceof MapSchema_1.MapSchema)) {
                        value = new MapSchema_1.MapSchema(value);
                    }
                    // try to turn provided structure into a Proxy
                    if (value['$proxy'] === undefined) {
                        if (isMap) {
                            value = MapSchema_1.getMapProxy(value);
                        }
                        else if (isArray) {
                            value = ArraySchema_1.getArrayProxy(value);
                        }
                    }
                    // flag the change for encoding.
                    this.$changes.change(field);
                    //
                    // call setParent() recursively for this and its child
                    // structures.
                    //
                    if (value['$changes']) {
                        value['$changes'].setParent(this, this.$changes.root, this._definition.indexes[field]);
                    }
                }
                else {
                    //
                    // Setting a field to `null` or `undefined` will delete it.
                    //
                    this.$changes.delete(field);
                }
                this[fieldCached] = value;
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
        var definition = constructor._definition;
        if (definition.addFilter(field, cb)) {
            constructor._context.useFilters = true;
        }
    };
}
exports.filter = filter;
function filterChildren(cb) {
    return function (target, field) {
        var constructor = target.constructor;
        var definition = constructor._definition;
        if (definition.addChildrenFilter(field, cb)) {
            constructor._context.useFilters = true;
        }
    };
}
exports.filterChildren = filterChildren;
/**
 * `@deprecated()` flag a field as deprecated.
 * The previous `@type()` annotation should remain along with this one.
 */
function deprecated(throws, context) {
    if (throws === void 0) { throws = true; }
    if (context === void 0) { context = exports.globalContext; }
    return function (target, field) {
        var constructor = target.constructor;
        var definition = constructor._definition;
        definition.deprecated[field] = true;
        if (throws) {
            definition.descriptors[field] = {
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
    if (context === void 0) { context = target._context || exports.globalContext; }
    for (var field in fields) {
        type(fields[field], context)(target.prototype, field);
    }
    return target;
}
exports.defineTypes = defineTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ub3RhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYW5ub3RhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBa0M7QUFDbEMsbURBQWlFO0FBQ2pFLCtDQUEyRDtBQUMzRCxpQ0FBa0M7QUFnRGxDO0lBQUE7UUFHSSxFQUFFO1FBQ0YsMEVBQTBFO1FBQzFFLEVBQUU7UUFFRixZQUFPLEdBQWdDLEVBQUUsQ0FBQztRQUMxQyxrQkFBYSxHQUFnQyxFQUFFLENBQUM7UUFNaEQsZUFBVSxHQUFpQyxFQUFFLENBQUM7UUFDOUMsZ0JBQVcsR0FBMEMsRUFBRSxDQUFDO0lBd0Q1RCxDQUFDO0lBdERVLHVCQUFNLEdBQWIsVUFBYyxNQUF5QjtRQUNuQyxJQUFNLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFFMUMsc0JBQXNCO1FBQ3RCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckUsVUFBVSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2RSxVQUFVLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLFVBQVUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0UsVUFBVSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFN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QixVQUFVLENBQUMsTUFBc0IsRUFBRSxPQUFnQztJQUF4RCx1QkFBQSxFQUFBLGFBQXNCO0lBQUUsd0JBQUEsRUFBQSxVQUFtQixxQkFBYTtJQUMvRSxPQUFPLFVBQVUsTUFBcUIsRUFBRSxLQUFhO1FBQ2pELElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUE0QixDQUFDO1FBQ3hELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFFM0MsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFcEMsSUFBSSxNQUFNLEVBQUU7WUFDUixVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHO2dCQUM1QixHQUFHLEVBQUUsY0FBYyxNQUFNLElBQUksS0FBSyxDQUFJLEtBQUssb0JBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLEdBQUcsRUFBRSxVQUF3QixLQUFVLElBQXNELENBQUM7Z0JBQzlGLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDO1NBQ0w7SUFDTCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBaEJELGdDQWdCQztBQUVELFNBQWdCLFdBQVcsQ0FDdkIsTUFBcUIsRUFDckIsTUFBOEMsRUFDOUMsT0FBbUQ7SUFBbkQsd0JBQUEsRUFBQSxVQUFtQixNQUFNLENBQUMsUUFBUSxJQUFJLHFCQUFhO0lBRW5ELEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCxrQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZVRyZWUgfSBmcm9tICcuL2NoYW5nZXMvQ2hhbmdlVHJlZSc7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tICcuL1NjaGVtYSc7XG5pbXBvcnQgeyBBcnJheVNjaGVtYSwgZ2V0QXJyYXlQcm94eSB9IGZyb20gJy4vdHlwZXMvQXJyYXlTY2hlbWEnO1xuaW1wb3J0IHsgTWFwU2NoZW1hLCBnZXRNYXBQcm94eSB9IGZyb20gJy4vdHlwZXMvTWFwU2NoZW1hJztcbmltcG9ydCB7IGdldFR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBEYXRhIHR5cGVzXG4gKi9cbmV4cG9ydCB0eXBlIFByaW1pdGl2ZVR5cGUgPVxuICAgIFwic3RyaW5nXCIgfFxuICAgIFwibnVtYmVyXCIgfFxuICAgIFwiYm9vbGVhblwiIHxcbiAgICBcImludDhcIiB8XG4gICAgXCJ1aW50OFwiIHxcbiAgICBcImludDE2XCIgfFxuICAgIFwidWludDE2XCIgfFxuICAgIFwiaW50MzJcIiB8XG4gICAgXCJ1aW50MzJcIiB8XG4gICAgXCJpbnQ2NFwiIHxcbiAgICBcInVpbnQ2NFwiIHxcbiAgICBcImZsb2F0MzJcIiB8XG4gICAgXCJmbG9hdDY0XCIgfFxuICAgIHR5cGVvZiBTY2hlbWE7XG5cbmV4cG9ydCB0eXBlIERlZmluaXRpb25UeXBlID0gUHJpbWl0aXZlVHlwZVxuICAgIHwgUHJpbWl0aXZlVHlwZVtdXG4gICAgfCB7IGFycmF5OiBQcmltaXRpdmVUeXBlIH1cbiAgICB8IHsgbWFwOiBQcmltaXRpdmVUeXBlIH1cbiAgICB8IHsgY29sbGVjdGlvbjogUHJpbWl0aXZlVHlwZSB9XG4gICAgfCB7IHNldDogUHJpbWl0aXZlVHlwZSB9O1xuXG5leHBvcnQgdHlwZSBEZWZpbml0aW9uID0geyBbZmllbGQ6IHN0cmluZ106IERlZmluaXRpb25UeXBlIH07XG5leHBvcnQgdHlwZSBGaWx0ZXJDYWxsYmFjazxcbiAgICBUIGV4dGVuZHMgU2NoZW1hID0gYW55LFxuICAgIFYgPSBhbnksXG4gICAgUiBleHRlbmRzIFNjaGVtYSA9IGFueVxuPiA9IChcbiAgICAoKHRoaXM6IFQsIGNsaWVudDogQ2xpZW50LCB2YWx1ZTogVikgPT4gYm9vbGVhbikgfFxuICAgICgodGhpczogVCwgY2xpZW50OiBDbGllbnQsIHZhbHVlOiBWLCByb290OiBSKSA9PiBib29sZWFuKVxuKTtcblxuZXhwb3J0IHR5cGUgRmlsdGVyQ2hpbGRyZW5DYWxsYmFjazxcbiAgICBUIGV4dGVuZHMgU2NoZW1hID0gYW55LFxuICAgIEsgPSBhbnksXG4gICAgViA9IGFueSxcbiAgICBSIGV4dGVuZHMgU2NoZW1hID0gYW55XG4+ID0gKFxuICAgICgodGhpczogVCwgY2xpZW50OiBDbGllbnQsIGtleTogSywgdmFsdWU6IFYpID0+IGJvb2xlYW4pIHxcbiAgICAoKHRoaXM6IFQsIGNsaWVudDogQ2xpZW50LCBrZXk6IEssIHZhbHVlOiBWLCByb290OiBSKSA9PiBib29sZWFuKVxuKVxuXG5leHBvcnQgY2xhc3MgU2NoZW1hRGVmaW5pdGlvbiB7XG4gICAgc2NoZW1hOiBEZWZpbml0aW9uO1xuXG4gICAgLy9cbiAgICAvLyBUT0RPOiB1c2UgYSBcImZpZWxkXCIgc3RydWN0dXJlIGNvbWJpbmluZyBhbGwgdGhlc2UgcHJvcGVydGllcyBwZXItZmllbGQuXG4gICAgLy9cblxuICAgIGluZGV4ZXM6IHsgW2ZpZWxkOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuICAgIGZpZWxkc0J5SW5kZXg6IHsgW2luZGV4OiBudW1iZXJdOiBzdHJpbmcgfSA9IHt9O1xuXG4gICAgZmlsdGVyczogeyBbZmllbGQ6IHN0cmluZ106IEZpbHRlckNhbGxiYWNrIH07XG4gICAgaW5kZXhlc1dpdGhGaWx0ZXJzOiBudW1iZXJbXTtcbiAgICBjaGlsZEZpbHRlcnM6IHsgW2ZpZWxkOiBzdHJpbmddOiBGaWx0ZXJDaGlsZHJlbkNhbGxiYWNrIH07IC8vIGNoaWxkRmlsdGVycyBhcmUgdXNlZCBvbiBNYXAsIEFycmF5LCBTZXQgaXRlbXMuXG5cbiAgICBkZXByZWNhdGVkOiB7IFtmaWVsZDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gICAgZGVzY3JpcHRvcnM6IFByb3BlcnR5RGVzY3JpcHRvck1hcCAmIFRoaXNUeXBlPGFueT4gPSB7fTtcblxuICAgIHN0YXRpYyBjcmVhdGUocGFyZW50PzogU2NoZW1hRGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBkZWZpbml0aW9uID0gbmV3IFNjaGVtYURlZmluaXRpb24oKTtcblxuICAgICAgICAvLyBzdXBwb3J0IGluaGVyaXRhbmNlXG4gICAgICAgIGRlZmluaXRpb24uc2NoZW1hID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyZW50ICYmIHBhcmVudC5zY2hlbWEgfHwge30pO1xuICAgICAgICBkZWZpbml0aW9uLmluZGV4ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJlbnQgJiYgcGFyZW50LmluZGV4ZXMgfHwge30pO1xuICAgICAgICBkZWZpbml0aW9uLmZpZWxkc0J5SW5kZXggPSBPYmplY3QuYXNzaWduKHt9LCBwYXJlbnQgJiYgcGFyZW50LmZpZWxkc0J5SW5kZXggfHwge30pO1xuICAgICAgICBkZWZpbml0aW9uLmRlc2NyaXB0b3JzID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyZW50ICYmIHBhcmVudC5kZXNjcmlwdG9ycyB8fCB7fSk7XG4gICAgICAgIGRlZmluaXRpb24uZGVwcmVjYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmVudCAmJiBwYXJlbnQuZGVwcmVjYXRlZCB8fCB7fSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgfVxuXG4gICAgYWRkRmllbGQoZmllbGQ6IHN0cmluZywgdHlwZTogRGVmaW5pdGlvblR5cGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldE5leHRGaWVsZEluZGV4KCk7XG4gICAgICAgIHRoaXMuZmllbGRzQnlJbmRleFtpbmRleF0gPSBmaWVsZDtcbiAgICAgICAgdGhpcy5pbmRleGVzW2ZpZWxkXSA9IGluZGV4O1xuICAgICAgICB0aGlzLnNjaGVtYVtmaWVsZF0gPSAoQXJyYXkuaXNBcnJheSh0eXBlKSlcbiAgICAgICAgICAgID8geyBhcnJheTogdHlwZVswXSB9XG4gICAgICAgICAgICA6IHR5cGU7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKGZpZWxkOiBzdHJpbmcsIGNiOiBGaWx0ZXJDYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMuZmlsdGVycykge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0ge307XG4gICAgICAgICAgICB0aGlzLmluZGV4ZXNXaXRoRmlsdGVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsdGVyc1t0aGlzLmluZGV4ZXNbZmllbGRdXSA9IGNiO1xuICAgICAgICB0aGlzLmluZGV4ZXNXaXRoRmlsdGVycy5wdXNoKHRoaXMuaW5kZXhlc1tmaWVsZF0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZHJlbkZpbHRlcihmaWVsZDogc3RyaW5nLCBjYjogRmlsdGVyQ2hpbGRyZW5DYWxsYmFjaykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXhlc1tmaWVsZF07XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnNjaGVtYVtmaWVsZF07XG5cbiAgICAgICAgaWYgKGdldFR5cGUoT2JqZWN0LmtleXModHlwZSlbMF0pKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hpbGRGaWx0ZXJzKSB7IHRoaXMuY2hpbGRGaWx0ZXJzID0ge307IH1cblxuICAgICAgICAgICAgdGhpcy5jaGlsZEZpbHRlcnNbaW5kZXhdID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBAZmlsdGVyQ2hpbGRyZW46IGZpZWxkICcke2ZpZWxkfScgY2FuJ3QgaGF2ZSBjaGlsZHJlbi4gSWdub3JpbmcgZmlsdGVyLmApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRyZW5GaWx0ZXIoZmllbGQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZEZpbHRlcnMgJiYgdGhpcy5jaGlsZEZpbHRlcnNbdGhpcy5pbmRleGVzW2ZpZWxkXV07XG4gICAgfVxuXG4gICAgZ2V0TmV4dEZpZWxkSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnNjaGVtYSB8fCB7fSkubGVuZ3RoO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0ZpbHRlcihrbGFzczogdHlwZW9mIFNjaGVtYSkge1xuICAgIHJldHVybiBrbGFzcy5fY29udGV4dCAmJiBrbGFzcy5fY29udGV4dC51c2VGaWx0ZXJzO1xufVxuXG4vLyBDb2x5c2V1cyBpbnRlZ3JhdGlvblxuZXhwb3J0IHR5cGUgQ2xpZW50ID0ge1xuICAgIHNlc3Npb25JZDogc3RyaW5nLFxufSAmIGFueTtcblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIHR5cGVzOiB7W2lkOiBudW1iZXJdOiB0eXBlb2YgU2NoZW1hfSA9IHt9O1xuICAgIHNjaGVtYXMgPSBuZXcgTWFwPHR5cGVvZiBTY2hlbWEsIG51bWJlcj4oKTtcbiAgICB1c2VGaWx0ZXJzID0gZmFsc2U7XG5cbiAgICBoYXMoc2NoZW1hOiB0eXBlb2YgU2NoZW1hKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjaGVtYXMuaGFzKHNjaGVtYSk7XG4gICAgfVxuXG4gICAgZ2V0KHR5cGVpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGVzW3R5cGVpZF07XG4gICAgfVxuXG4gICAgYWRkKHNjaGVtYTogdHlwZW9mIFNjaGVtYSkge1xuICAgICAgICBzY2hlbWEuX3R5cGVpZCA9IHRoaXMuc2NoZW1hcy5zaXplO1xuICAgICAgICB0aGlzLnR5cGVzW3NjaGVtYS5fdHlwZWlkXSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5zY2hlbWFzLnNldChzY2hlbWEsIHNjaGVtYS5fdHlwZWlkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlKGNvbnRleHQ6IENvbnRleHQgPSBuZXcgQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRlZmluaXRpb246IERlZmluaXRpb25UeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZShkZWZpbml0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdsb2JhbENvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4vKipcbiAqIGBAdHlwZSgpYCBkZWNvcmF0b3IgZm9yIHByb3hpZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGUgKHR5cGU6IERlZmluaXRpb25UeXBlLCBjb250ZXh0OiBDb250ZXh0ID0gZ2xvYmFsQ29udGV4dCk6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogdHlwZW9mIFNjaGVtYSwgZmllbGQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjb25zdHJ1Y3RvciA9IHRhcmdldC5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgU2NoZW1hO1xuICAgICAgICBjb25zdHJ1Y3Rvci5fY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogc3RhdGljIHNjaGVtYVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFjb250ZXh0Lmhhcyhjb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIGNvbnRleHQuYWRkKGNvbnN0cnVjdG9yKTtcblxuICAgICAgICAgICAgLy8gc3VwcG9ydCBpbmhlcml0YW5jZVxuICAgICAgICAgICAgY29uc3RydWN0b3IuX2RlZmluaXRpb24gPSBTY2hlbWFEZWZpbml0aW9uLmNyZWF0ZShjb25zdHJ1Y3Rvci5fZGVmaW5pdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWZpbml0aW9uID0gY29uc3RydWN0b3IuX2RlZmluaXRpb247XG4gICAgICAgIGRlZmluaXRpb24uYWRkRmllbGQoZmllbGQsIHR5cGUpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBza2lwIGlmIGRlc2NyaXB0b3IgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgZmllbGQgKGBAZGVwcmVjYXRlZCgpYClcbiAgICAgICAgICovXG4gICAgICAgIGlmIChkZWZpbml0aW9uLmRlc2NyaXB0b3JzW2ZpZWxkXSkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBpc0FycmF5ID0gQXJyYXlTY2hlbWEuaXModHlwZSk7XG4gICAgICAgIGNvbnN0IGlzTWFwID0gIWlzQXJyYXkgJiYgTWFwU2NoZW1hLmlzKHR5cGUpO1xuXG4gICAgICAgIC8vIFRPRE86IHJlZmFjdG9yIG1lLlxuICAgICAgICAvLyBBbGxvdyBhYnN0cmFjdCBpbnRlcm1lZGlhcnkgY2xhc3NlcyB3aXRoIG5vIGZpZWxkcyB0byBiZSBzZXJpYWxpemVkXG4gICAgICAgIC8vIChTZWUgXCJzaG91bGQgc3VwcG9ydCBhbiBpbmhlcml0YW5jZSB3aXRoIGEgU2NoZW1hIHR5cGUgd2l0aG91dCBmaWVsZHNcIiB0ZXN0KVxuICAgICAgICBpZiAodHlwZW9mICh0eXBlKSAhPT0gXCJzdHJpbmdcIiAmJiAhU2NoZW1hLmlzKHR5cGUpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFR5cGUgPSBPYmplY3QudmFsdWVzKHR5cGUpWzBdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZihjaGlsZFR5cGUpICE9PSBcInN0cmluZ1wiICYmICFjaGlsZFR5cGUuX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFkZChjaGlsZFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmllbGRDYWNoZWQgPSBgXyR7ZmllbGR9YDtcblxuICAgICAgICBkZWZpbml0aW9uLmRlc2NyaXB0b3JzW2ZpZWxkQ2FjaGVkXSA9IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGRlZmluaXRpb24uZGVzY3JpcHRvcnNbZmllbGRdID0ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbZmllbGRDYWNoZWRdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodGhpczogU2NoZW1hLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ3JlYXRlIFByb3h5IGZvciBhcnJheSBvciBtYXAgaXRlbXNcbiAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIC8vIHNraXAgaWYgdmFsdWUgaXMgdGhlIHNhbWUgYXMgY2FjaGVkLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpc1tmaWVsZENhY2hlZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx0eSB0cmFuc2Zvcm0gQXJyYXkgaW50byBBcnJheVNjaGVtYVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlTY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG5ldyBBcnJheVNjaGVtYSguLi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx0eSB0cmFuc2Zvcm0gTWFwIGludG8gTWFwU2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01hcCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgTWFwU2NoZW1hKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgTWFwU2NoZW1hKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRyeSB0byB0dXJuIHByb3ZpZGVkIHN0cnVjdHVyZSBpbnRvIGEgUHJveHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlWyckcHJveHknXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldE1hcFByb3h5KHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXRBcnJheVByb3h5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZsYWcgdGhlIGNoYW5nZSBmb3IgZW5jb2RpbmcuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGNoYW5nZXMuY2hhbmdlKGZpZWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHNldFBhcmVudCgpIHJlY3Vyc2l2ZWx5IGZvciB0aGlzIGFuZCBpdHMgY2hpbGRcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RydWN0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlWyckY2hhbmdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAodmFsdWVbJyRjaGFuZ2VzJ10gYXMgQ2hhbmdlVHJlZSkuc2V0UGFyZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kY2hhbmdlcy5yb290LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmluaXRpb24uaW5kZXhlc1tmaWVsZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXR0aW5nIGEgZmllbGQgdG8gYG51bGxgIG9yIGB1bmRlZmluZWRgIHdpbGwgZGVsZXRlIGl0LlxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjaGFuZ2VzLmRlbGV0ZShmaWVsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpc1tmaWVsZENhY2hlZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogYEBmaWx0ZXIoKWAgZGVjb3JhdG9yIGZvciBkZWZpbmluZyBkYXRhIGZpbHRlcnMgcGVyIGNsaWVudFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXI8VCBleHRlbmRzIFNjaGVtYSwgViwgUiBleHRlbmRzIFNjaGVtYT4oY2I6IEZpbHRlckNhbGxiYWNrPFQsIFYsIFI+KTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0YXJnZXQuY29uc3RydWN0b3IgYXMgdHlwZW9mIFNjaGVtYTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IGNvbnN0cnVjdG9yLl9kZWZpbml0aW9uO1xuXG4gICAgICAgIGlmIChkZWZpbml0aW9uLmFkZEZpbHRlcihmaWVsZCwgY2IpKSB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5fY29udGV4dC51c2VGaWx0ZXJzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckNoaWxkcmVuPFQgZXh0ZW5kcyBTY2hlbWEsIEssIFYsIFIgZXh0ZW5kcyBTY2hlbWE+KGNiOiBGaWx0ZXJDaGlsZHJlbkNhbGxiYWNrPFQsIEssIFYsIFI+KTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0YXJnZXQuY29uc3RydWN0b3IgYXMgdHlwZW9mIFNjaGVtYTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IGNvbnN0cnVjdG9yLl9kZWZpbml0aW9uO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5hZGRDaGlsZHJlbkZpbHRlcihmaWVsZCwgY2IpKSB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5fY29udGV4dC51c2VGaWx0ZXJzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKipcbiAqIGBAZGVwcmVjYXRlZCgpYCBmbGFnIGEgZmllbGQgYXMgZGVwcmVjYXRlZC5cbiAqIFRoZSBwcmV2aW91cyBgQHR5cGUoKWAgYW5ub3RhdGlvbiBzaG91bGQgcmVtYWluIGFsb25nIHdpdGggdGhpcyBvbmUuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlcHJlY2F0ZWQodGhyb3dzOiBib29sZWFuID0gdHJ1ZSwgY29udGV4dDogQ29udGV4dCA9IGdsb2JhbENvbnRleHQpOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IHR5cGVvZiBTY2hlbWEsIGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0YXJnZXQuY29uc3RydWN0b3IgYXMgdHlwZW9mIFNjaGVtYTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IGNvbnN0cnVjdG9yLl9kZWZpbml0aW9uO1xuXG4gICAgICAgIGRlZmluaXRpb24uZGVwcmVjYXRlZFtmaWVsZF0gPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aHJvd3MpIHtcbiAgICAgICAgICAgIGRlZmluaXRpb24uZGVzY3JpcHRvcnNbZmllbGRdID0ge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoYCR7ZmllbGR9IGlzIGRlcHJlY2F0ZWQuYCk7IH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodGhpczogU2NoZW1hLCB2YWx1ZTogYW55KSB7IC8qIHRocm93IG5ldyBFcnJvcihgJHtmaWVsZH0gaXMgZGVwcmVjYXRlZC5gKTsgKi8gfSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVUeXBlcyhcbiAgICB0YXJnZXQ6IHR5cGVvZiBTY2hlbWEsXG4gICAgZmllbGRzOiB7IFtwcm9wZXJ0eTogc3RyaW5nXTogRGVmaW5pdGlvblR5cGUgfSxcbiAgICBjb250ZXh0OiBDb250ZXh0ID0gdGFyZ2V0Ll9jb250ZXh0IHx8IGdsb2JhbENvbnRleHRcbikge1xuICAgIGZvciAobGV0IGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgICB0eXBlKGZpZWxkc1tmaWVsZF0sIGNvbnRleHQpKHRhcmdldC5wcm90b3R5cGUsIGZpZWxkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbiJdfQ==

/***/ }),
/* 7 */
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
/* 8 */
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
var msgpack = __importStar(__webpack_require__(9));
var strong_events_1 = __webpack_require__(24);
var nanoevents_1 = __webpack_require__(25);
var Connection_1 = __webpack_require__(26);
var Serializer_1 = __webpack_require__(10);
var Protocol_1 = __webpack_require__(11);
var encode = __importStar(__webpack_require__(12));
var decode = __importStar(__webpack_require__(13));
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
            // Instantiate serializer if not locally available.
            if (!this.serializer) {
                var serializer = Serializer_1.getSerializer(this.serializerId);
                this.serializer = new serializer();
            }
            if (bytes.length > offset && this.serializer.handshake) {
                this.serializer.handshake(bytes, { offset: offset });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFFckMsK0NBQTZDO0FBQzdDLHlDQUE4QztBQUU5QywyQ0FBMEM7QUFDMUMsc0RBQW9FO0FBQ3BFLHVDQUE0RDtBQVE1RCwyRUFBK0Q7QUFDL0QsMkVBQStEO0FBUy9EO0lBd0JJLGNBQVksSUFBWSxFQUFFLFVBQXFDO1FBQS9ELGlCQVlDO1FBOUJELGlCQUFpQjtRQUNWLFdBQU0sR0FBRyw0QkFBWSxFQUFFLENBQUM7UUFDeEIsa0JBQWEsR0FBRyw0QkFBWSxFQUEwQixDQUFDO1FBQ3ZELFlBQU8sR0FBRyw0QkFBWSxFQUE0QyxDQUFDO1FBQ25FLFlBQU8sR0FBRyw0QkFBWSxFQUEwQixDQUFDO1FBTzlDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLM0Isc0JBQWlCLEdBQUcsNkJBQWdCLEVBQUUsQ0FBQztRQUc3QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksVUFBVSxFQUFFO1lBQ1osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUErQixDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLCtCQUE2QixJQUFJLFVBQUssT0FBUyxDQUFDLEVBQTdELENBQTZELENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMs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QUFPLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDO0lBRUwsV0FBQztBQUFELENBQUMsQUFqUUQsSUFpUUM7QUFqUVksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtc2dwYWNrIGZyb20gJy4vbXNncGFjayc7XG5cbmltcG9ydCB7IGNyZWF0ZVNpZ25hbCB9IGZyb20gJ3N0cm9uZy1ldmVudHMnO1xuaW1wb3J0IHsgY3JlYXRlTmFub0V2ZW50cyB9IGZyb20gJ25hbm9ldmVudHMnO1xuXG5pbXBvcnQgeyBDb25uZWN0aW9uIH0gZnJvbSAnLi9Db25uZWN0aW9uJztcbmltcG9ydCB7IFNlcmlhbGl6ZXIsIGdldFNlcmlhbGl6ZXIgfSBmcm9tICcuL3NlcmlhbGl6ZXIvU2VyaWFsaXplcic7XG5pbXBvcnQgeyBQcm90b2NvbCwgdXRmOFJlYWQsIHV0ZjhMZW5ndGggfSBmcm9tICcuL1Byb3RvY29sJztcblxuaW1wb3J0IHsgRm9zc2lsRGVsdGFTZXJpYWxpemVyIH0gZnJvbSAnLi9zZXJpYWxpemVyL0Zvc3NpbERlbHRhU2VyaWFsaXplcic7XG5pbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gJ0BnYW1lc3RkaW8vc3RhdGUtbGlzdGVuZXInO1xuaW1wb3J0IHsgU2NoZW1hU2VyaWFsaXplciB9IGZyb20gJy4nO1xuaW1wb3J0IHsgU2NoZW1hQ29uc3RydWN0b3IgfSBmcm9tICcuL3NlcmlhbGl6ZXIvU2NoZW1hU2VyaWFsaXplcic7XG5pbXBvcnQgeyBDb250ZXh0LCBTY2hlbWEgfSBmcm9tICdAY29seXNldXMvc2NoZW1hJztcblxuaW1wb3J0ICogYXMgZW5jb2RlIGZyb20gJ0Bjb2x5c2V1cy9zY2hlbWEvbGliL2VuY29kaW5nL2VuY29kZSc7XG5pbXBvcnQgKiBhcyBkZWNvZGUgZnJvbSAnQGNvbHlzZXVzL3NjaGVtYS9saWIvZW5jb2RpbmcvZGVjb2RlJztcblxuZXhwb3J0IGludGVyZmFjZSBSb29tQXZhaWxhYmxlPE1ldGFkYXRhPiB7XG4gICAgcm9vbUlkOiBzdHJpbmc7XG4gICAgY2xpZW50czogbnVtYmVyO1xuICAgIG1heENsaWVudHM6IG51bWJlcjtcbiAgICBtZXRhZGF0YT86IE1ldGFkYXRhO1xufVxuXG5leHBvcnQgY2xhc3MgUm9vbTxTdGF0ZT0gYW55PiB7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nO1xuXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICAgIC8vIFB1YmxpYyBzaWduYWxzXG4gICAgcHVibGljIG9uSm9pbiA9IGNyZWF0ZVNpZ25hbCgpO1xuICAgIHB1YmxpYyBvblN0YXRlQ2hhbmdlID0gY3JlYXRlU2lnbmFsPChzdGF0ZTogU3RhdGUpID0+IHZvaWQ+KCk7XG4gICAgcHVibGljIG9uRXJyb3IgPSBjcmVhdGVTaWduYWw8KGNvZGU6IG51bWJlciwgbWVzc2FnZT86IHN0cmluZykgPT4gdm9pZD4oKTtcbiAgICBwdWJsaWMgb25MZWF2ZSA9IGNyZWF0ZVNpZ25hbDwoY29kZTogbnVtYmVyKSA9PiB2b2lkPigpO1xuXG4gICAgcHVibGljIGNvbm5lY3Rpb246IENvbm5lY3Rpb247XG5cbiAgICBwdWJsaWMgc2VyaWFsaXplcklkOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIHNlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI8U3RhdGU+O1xuXG4gICAgcHJvdGVjdGVkIGhhc0pvaW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETzogcmVtb3ZlIG1lIG9uIDEuMC4wXG4gICAgcHJvdGVjdGVkIHJvb3RTY2hlbWE6IFNjaGVtYUNvbnN0cnVjdG9yPFN0YXRlPjtcblxuICAgIHByb3RlY3RlZCBvbk1lc3NhZ2VIYW5kbGVycyA9IGNyZWF0ZU5hbm9FdmVudHMoKTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcm9vdFNjaGVtYT86IFNjaGVtYUNvbnN0cnVjdG9yPFN0YXRlPikge1xuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICBpZiAocm9vdFNjaGVtYSkge1xuICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVyID0gbmV3IChnZXRTZXJpYWxpemVyKFwic2NoZW1hXCIpKTtcbiAgICAgICAgICAgIHRoaXMucm9vdFNjaGVtYSA9IHJvb3RTY2hlbWE7XG4gICAgICAgICAgICAodGhpcy5zZXJpYWxpemVyIGFzIFNjaGVtYVNlcmlhbGl6ZXIpLnN0YXRlID0gbmV3IHJvb3RTY2hlbWEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25FcnJvcigoY29kZSwgbWVzc2FnZSkgPT4gY29uc29sZS53YXJuKGBjb2x5c2V1cy5qcyAtIG9uRXJyb3IgPT4gKCR7Y29kZX0pICR7bWVzc2FnZX1gKSk7XG4gICAgICAgIHRoaXMub25MZWF2ZSgoKSA9PiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29ubmVjdChlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKGVuZHBvaW50LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5yZWNvbm5lY3RFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZUNhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmNsb3NlID0gKGU6IENsb3NlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNKb2luZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFJvb20gY29ubmVjdGlvbiB3YXMgY2xvc2VkIHVuZXhwZWN0ZWRseSAoJHtlLmNvZGV9KTogJHtlLnJlYXNvbn1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuaW52b2tlKGUuY29kZSwgZS5yZWFzb24pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkxlYXZlLmludm9rZShlLmNvZGUpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gKGU6IENsb3NlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgUm9vbSwgb25FcnJvciAoJHtlLmNvZGV9KTogJHtlLnJlYXNvbn1gKTtcbiAgICAgICAgICAgIHRoaXMub25FcnJvci5pbnZva2UoZS5jb2RlLCBlLnJlYXNvbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vcGVuKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxlYXZlKGNvbnNlbnRlZDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKGNvbnNlbnRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKFtQcm90b2NvbC5MRUFWRV9ST09NXSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uTGVhdmUuaW52b2tlKDQwMDApOyAvLyBcImNvbnNlbnRlZFwiIGNvZGVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk1lc3NhZ2U8VCA9IGFueT4oXG4gICAgICAgIHR5cGU6IFwiKlwiLFxuICAgICAgICBjYWxsYmFjazogKHR5cGU6IHN0cmluZyB8IG51bWJlciB8IFNjaGVtYSwgbWVzc2FnZTogVCkgPT4gdm9pZFxuICAgIClcbiAgICBwdWJsaWMgb25NZXNzYWdlPFQgZXh0ZW5kcyAodHlwZW9mIFNjaGVtYSAmIChuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpKT4oXG4gICAgICAgIHR5cGU6IFQsXG4gICAgICAgIGNhbGxiYWNrOiAobWVzc2FnZTogSW5zdGFuY2VUeXBlPFQ+KSA9PiB2b2lkXG4gICAgKVxuICAgIHB1YmxpYyBvbk1lc3NhZ2U8VCA9IGFueT4oXG4gICAgICAgIHR5cGU6IHN0cmluZyB8IG51bWJlcixcbiAgICAgICAgY2FsbGJhY2s6IChtZXNzYWdlOiBUKSA9PiB2b2lkXG4gICAgKVxuICAgIHB1YmxpYyBvbk1lc3NhZ2U8VCA9IGFueT4oXG4gICAgICAgIHR5cGU6ICcqJyB8IHN0cmluZyB8IG51bWJlciB8IHR5cGVvZiBTY2hlbWEsXG4gICAgICAgIGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IHZvaWRcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25NZXNzYWdlSGFuZGxlcnMub24odGhpcy5nZXRNZXNzYWdlSGFuZGxlcktleSh0eXBlKSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZW5kKHR5cGU6IHN0cmluZyB8IG51bWJlciwgbWVzc2FnZT86IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbml0aWFsQnl0ZXM6IG51bWJlcltdID0gW1Byb3RvY29sLlJPT01fREFUQV07XG5cbiAgICAgICAgaWYgKHR5cGVvZih0eXBlKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZW5jb2RlLnN0cmluZyhpbml0aWFsQnl0ZXMsIHR5cGUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmNvZGUubnVtYmVyKGluaXRpYWxCeXRlcywgdHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYXJyOiBVaW50OEFycmF5O1xuXG4gICAgICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWQgPSBtc2dwYWNrLmVuY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIGFyciA9IG5ldyBVaW50OEFycmF5KGluaXRpYWxCeXRlcy5sZW5ndGggKyBlbmNvZGVkLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgYXJyLnNldChuZXcgVWludDhBcnJheShpbml0aWFsQnl0ZXMpLCAwKTtcbiAgICAgICAgICAgIGFyci5zZXQobmV3IFVpbnQ4QXJyYXkoZW5jb2RlZCksIGluaXRpYWxCeXRlcy5sZW5ndGgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnIgPSBuZXcgVWludDhBcnJheShpbml0aWFsQnl0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoYXJyLmJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0ZSAoKTogU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJpYWxpemVyLmdldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZGVwcmVjYXRlIC8gbW92ZSBzb21ld2hlcmUgZWxzZVxuICAgIC8vIHRoaXMgbWV0aG9kIGlzIHVzZWZ1bCBvbmx5IGZvciBGb3NzaWxEZWx0YVNlcmlhbGl6ZXJcbiAgICBwdWJsaWMgbGlzdGVuKHNlZ21lbnRzOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgaW1tZWRpYXRlPzogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5zZXJpYWxpemVySWQgPT09IFwic2NoZW1hXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJyR7dGhpcy5zZXJpYWxpemVySWR9JyBzZXJpYWxpemVyIGRvZXNuJ3Qgc3VwcG9ydCAubGlzdGVuKCkgbWV0aG9kIGhlcmUuYCk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zZXJpYWxpemVySWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcInJvb20uTGlzdGVuKCkgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciByb29tLm9uSm9pbiBoYXMgYmVlbiBjYWxsZWQgKERFUFJFQ0FUSU9OIFdBUk5JTkcpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLnNlcmlhbGl6ZXIgYXMgRm9zc2lsRGVsdGFTZXJpYWxpemVyPFN0YXRlPikuYXBpLmxpc3RlbihzZWdtZW50cywgY2FsbGJhY2ssIGltbWVkaWF0ZSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZGVwcmVjYXRlIC8gbW92ZSBzb21ld2hlcmUgZWxzZVxuICAgIC8vIHRoaXMgbWV0aG9kIGlzIHVzZWZ1bCBvbmx5IGZvciBGb3NzaWxEZWx0YVNlcmlhbGl6ZXJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZXJpYWxpemVyIGFzIEZvc3NpbERlbHRhU2VyaWFsaXplcjxTdGF0ZT4pLmFwaS5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcilcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5zZXJpYWxpemVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZXIudGVhcmRvd24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uSm9pbi5jbGVhcigpO1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5vbkVycm9yLmNsZWFyKCk7XG4gICAgICAgIHRoaXMub25MZWF2ZS5jbGVhcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1lc3NhZ2VDYWxsYmFjayhldmVudDogTWVzc2FnZUV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShldmVudC5kYXRhKSlcbiAgICAgICAgY29uc3QgY29kZSA9IGJ5dGVzWzBdO1xuXG4gICAgICAgIGlmIChjb2RlID09PSBQcm90b2NvbC5KT0lOX1JPT00pIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZXJJZCA9IHV0ZjhSZWFkKGJ5dGVzLCBvZmZzZXQpO1xuICAgICAgICAgICAgb2Zmc2V0ICs9IHV0ZjhMZW5ndGgodGhpcy5zZXJpYWxpemVySWQpO1xuXG4gICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSBzZXJpYWxpemVyIGlmIG5vdCBsb2NhbGx5IGF2YWlsYWJsZS5cbiAgICAgICAgICAgIGlmICghdGhpcy5zZXJpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VyaWFsaXplciA9IGdldFNlcmlhbGl6ZXIodGhpcy5zZXJpYWxpemVySWQpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVyID0gbmV3IHNlcmlhbGl6ZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJ5dGVzLmxlbmd0aCA+IG9mZnNldCAmJiB0aGlzLnNlcmlhbGl6ZXIuaGFuZHNoYWtlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVyLmhhbmRzaGFrZShieXRlcywgeyBvZmZzZXQgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGFzSm9pbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25Kb2luLmludm9rZSgpO1xuXG4gICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBzdWNjZXNzZnVsbCBKT0lOX1JPT01cbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKFtQcm90b2NvbC5KT0lOX1JPT01dKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IFByb3RvY29sLkVSUk9SKSB7XG4gICAgICAgICAgICBjb25zdCBpdDogZGVjb2RlLkl0ZXJhdG9yID0geyBvZmZzZXQ6IDEgfTtcblxuICAgICAgICAgICAgY29uc3QgY29kZSA9IGRlY29kZS5udW1iZXIoYnl0ZXMsIGl0KTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkZWNvZGUuc3RyaW5nKGJ5dGVzLCBpdCk7XG5cbiAgICAgICAgICAgIHRoaXMub25FcnJvci5pbnZva2UoY29kZSwgbWVzc2FnZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSBQcm90b2NvbC5MRUFWRV9ST09NKSB7XG4gICAgICAgICAgICB0aGlzLmxlYXZlKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSBQcm90b2NvbC5ST09NX0RBVEFfU0NIRU1BKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0OiBDb250ZXh0ID0gKHRoaXMuc2VyaWFsaXplci5nZXRTdGF0ZSgpIGFzIGFueSkuY29uc3RydWN0b3IuX2NvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gY29udGV4dC5nZXQoYnl0ZXNbMV0pO1xuXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlOiBTY2hlbWEgPSBuZXcgKHR5cGUgYXMgYW55KSgpO1xuICAgICAgICAgICAgbWVzc2FnZS5kZWNvZGUoYnl0ZXMsIHsgb2Zmc2V0OiAyIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWVzc2FnZSh0eXBlLCBtZXNzYWdlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IFByb3RvY29sLlJPT01fU1RBVEUpIHtcbiAgICAgICAgICAgIGJ5dGVzLnNoaWZ0KCk7IC8vIGRyb3AgYGNvZGVgIGJ5dGVcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoYnl0ZXMpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gUHJvdG9jb2wuUk9PTV9TVEFURV9QQVRDSCkge1xuICAgICAgICAgICAgYnl0ZXMuc2hpZnQoKTsgLy8gZHJvcCBgY29kZWAgYnl0ZVxuICAgICAgICAgICAgdGhpcy5wYXRjaChieXRlcyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSBQcm90b2NvbC5ST09NX0RBVEEpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0OiBkZWNvZGUuSXRlcmF0b3IgPSB7IG9mZnNldDogMSB9O1xuXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gKGRlY29kZS5zdHJpbmdDaGVjayhieXRlcywgaXQpKVxuICAgICAgICAgICAgICAgID8gZGVjb2RlLnN0cmluZyhieXRlcywgaXQpXG4gICAgICAgICAgICAgICAgOiBkZWNvZGUubnVtYmVyKGJ5dGVzLCBpdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoYnl0ZXMubGVuZ3RoID4gaXQub2Zmc2V0KVxuICAgICAgICAgICAgICAgID8gbXNncGFjay5kZWNvZGUoZXZlbnQuZGF0YSwgaXQub2Zmc2V0KVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTWVzc2FnZSh0eXBlLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRTdGF0ZShlbmNvZGVkU3RhdGU6IG51bWJlcltdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplci5zZXRTdGF0ZShlbmNvZGVkU3RhdGUpO1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UuaW52b2tlKHRoaXMuc2VyaWFsaXplci5nZXRTdGF0ZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGF0Y2goYmluYXJ5UGF0Y2g6IG51bWJlcltdKSB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplci5wYXRjaChiaW5hcnlQYXRjaCk7XG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZS5pbnZva2UodGhpcy5zZXJpYWxpemVyLmdldFN0YXRlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzcGF0Y2hNZXNzYWdlKHR5cGU6IHN0cmluZyB8IG51bWJlciB8IHR5cGVvZiBTY2hlbWEsIG1lc3NhZ2U6IGFueSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlVHlwZSA9IHRoaXMuZ2V0TWVzc2FnZUhhbmRsZXJLZXkodHlwZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub25NZXNzYWdlSGFuZGxlcnMuZXZlbnRzW21lc3NhZ2VUeXBlXSkge1xuICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2VIYW5kbGVycy5lbWl0KG1lc3NhZ2VUeXBlLCBtZXNzYWdlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub25NZXNzYWdlSGFuZGxlcnMuZXZlbnRzWycqJ10pIHtcbiAgICAgICAgICAgIHRoaXMub25NZXNzYWdlSGFuZGxlcnMuZW1pdCgnKicsIHR5cGUsIG1lc3NhZ2UpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYG9uTWVzc2FnZSBub3QgcmVnaXN0ZXJlZCBmb3IgdHlwZSAnJHt0eXBlfScuYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1lc3NhZ2VIYW5kbGVyS2V5KHR5cGU6IHN0cmluZyB8IG51bWJlciB8IHR5cGVvZiBTY2hlbWEpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZih0eXBlKSkge1xuICAgICAgICAgICAgLy8gdHlwZW9mIFNjaGVtYVxuICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6IHJldHVybiBgJCR7KHR5cGUgYXMgdHlwZW9mIFNjaGVtYSkuX3R5cGVpZH1gO1xuXG4gICAgICAgICAgICAvLyBzdHJpbmdcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHR5cGU7XG5cbiAgICAgICAgICAgIC8vIG51bWJlclxuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gYGkke3R5cGV9YDtcblxuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBtZXNzYWdlIHR5cGUuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
var decode_1 = __importDefault(__webpack_require__(22));
var encode_1 = __importDefault(__webpack_require__(23));
exports.decode = decode_1.default;
exports.encode = encode_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNncGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tc2dwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUE2QztBQUM3Qyw0REFBNkM7QUFFaEMsUUFBQSxNQUFNLEdBQUcsZ0JBQWEsQ0FBQztBQUN2QixRQUFBLE1BQU0sR0FBRyxnQkFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1zZ3BhY2tEZWNvZGUgZnJvbSAnLi9tc2dwYWNrL2RlY29kZSc7XG5pbXBvcnQgbXNncGFja0VuY29kZSBmcm9tICcuL21zZ3BhY2svZW5jb2RlJztcblxuZXhwb3J0IGNvbnN0IGRlY29kZSA9IG1zZ3BhY2tEZWNvZGU7XG5leHBvcnQgY29uc3QgZW5jb2RlID0gbXNncGFja0VuY29kZTtcbiJdfQ==

/***/ }),
/* 10 */
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
    var serializer = serializers[id];
    if (!serializer) {
        throw new Error("missing serializer: " + id);
    }
    return serializer;
}
exports.getSerializer = getSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemVyL1NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUEsSUFBTSxXQUFXLEdBQTBCLEVBQUUsQ0FBQztBQUU5QyxTQUFnQixrQkFBa0IsQ0FBRSxFQUFVLEVBQUUsVUFBZTtJQUMzRCxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ2pDLENBQUM7QUFGRCxnREFFQztBQUVELFNBQWdCLGFBQWEsQ0FBRSxFQUFVO0lBQ3JDLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUFFO0lBQ2xFLE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFKRCxzQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplcjxTdGF0ZT4ge1xuICAgIHNldFN0YXRlKGRhdGE6IGFueSk6IHZvaWQ7XG4gICAgZ2V0U3RhdGUoKTogU3RhdGU7XG5cbiAgICBwYXRjaChkYXRhOiBhbnkpOiB2b2lkO1xuICAgIHRlYXJkb3duKCk6IHZvaWQ7XG5cbiAgICBoYW5kc2hha2U/KGJ5dGVzOiBudW1iZXJbXSwgaXQ/OiBhbnkpOiB2b2lkO1xufVxuXG5jb25zdCBzZXJpYWxpemVyczogeyBbaWQ6IHN0cmluZ106IGFueSB9ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclNlcmlhbGl6ZXIgKGlkOiBzdHJpbmcsIHNlcmlhbGl6ZXI6IGFueSkge1xuICAgIHNlcmlhbGl6ZXJzW2lkXSA9IHNlcmlhbGl6ZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXJpYWxpemVyIChpZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2VyaWFsaXplciA9IHNlcmlhbGl6ZXJzW2lkXTtcbiAgICBpZiAoIXNlcmlhbGl6ZXIpIHsgdGhyb3cgbmV3IEVycm9yKFwibWlzc2luZyBzZXJpYWxpemVyOiBcIiArIGlkKTsgfVxuICAgIHJldHVybiBzZXJpYWxpemVyO1xufSJdfQ==

/***/ }),
/* 11 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdG9jb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUHJvdG9jb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlEQUF5RDs7O0FBRXpELElBQVksUUFVWDtBQVZELFdBQVksUUFBUTtJQUNoQix1QkFBdUI7SUFDdkIsaURBQWEsQ0FBQTtJQUNiLGtEQUFjLENBQUE7SUFDZCwwQ0FBVSxDQUFBO0lBQ1Ysb0RBQWUsQ0FBQTtJQUNmLGtEQUFjLENBQUE7SUFDZCxvREFBZSxDQUFBO0lBQ2YsZ0VBQXFCLENBQUE7SUFDckIsZ0VBQXFCLENBQUE7QUFDekIsQ0FBQyxFQVZXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBVW5CO0FBRUQsSUFBWSxTQVNYO0FBVEQsV0FBWSxTQUFTO0lBQ2pCLDRFQUEyQixDQUFBO0lBQzNCLHdGQUFpQyxDQUFBO0lBQ2pDLHNGQUFnQyxDQUFBO0lBQ2hDLDBFQUEwQixDQUFBO0lBQzFCLHNFQUF3QixDQUFBO0lBRXhCLDBEQUFrQixDQUFBO0lBQ2xCLHNFQUF3QixDQUFBO0FBQzVCLENBQUMsRUFUVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVNwQjtBQUVELFNBQWdCLFFBQVEsQ0FBQyxJQUFjLEVBQUUsTUFBYztJQUNyRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUU5QixJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLElB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QztZQUNKLE1BQU0sSUFBSSxDQUFDLENBQUM7U0FDYjtLQUNGO0lBQ0QsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFqQkQsZ0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVXNlIGNvZGVzIGJldHdlZW4gMH4xMjcgZm9yIGxlc3NlciB0aHJvdWdocHV0ICgxIGJ5dGUpXG5cbmV4cG9ydCBlbnVtIFByb3RvY29sIHtcbiAgICAvLyBSb29tLXJlbGF0ZWQgKDEwfjE5KVxuICAgIEhBTkRTSEFLRSA9IDksXG4gICAgSk9JTl9ST09NID0gMTAsXG4gICAgRVJST1IgPSAxMSxcbiAgICBMRUFWRV9ST09NID0gMTIsXG4gICAgUk9PTV9EQVRBID0gMTMsXG4gICAgUk9PTV9TVEFURSA9IDE0LFxuICAgIFJPT01fU1RBVEVfUEFUQ0ggPSAxNSxcbiAgICBST09NX0RBVEFfU0NIRU1BID0gMTYsXG59XG5cbmV4cG9ydCBlbnVtIEVycm9yQ29kZSB7XG4gICAgTUFUQ0hNQUtFX05PX0hBTkRMRVIgPSA0MjEwLFxuICAgIE1BVENITUFLRV9JTlZBTElEX0NSSVRFUklBID0gNDIxMSxcbiAgICBNQVRDSE1BS0VfSU5WQUxJRF9ST09NX0lEID0gNDIxMixcbiAgICBNQVRDSE1BS0VfVU5IQU5ETEVEID0gNDIxMyxcbiAgICBNQVRDSE1BS0VfRVhQSVJFRCA9IDQyMTQsXG5cbiAgICBBVVRIX0ZBSUxFRCA9IDQyMTUsXG4gICAgQVBQTElDQVRJT05fRVJST1IgPSA0MjE2LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRmOFJlYWQodmlldzogbnVtYmVyW10sIG9mZnNldDogbnVtYmVyKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHZpZXdbb2Zmc2V0KytdO1xuXG4gIHZhciBzdHJpbmcgPSAnJywgY2hyID0gMDtcbiAgZm9yICh2YXIgaSA9IG9mZnNldCwgZW5kID0gb2Zmc2V0ICsgbGVuZ3RoOyBpIDwgZW5kOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHZpZXdbaV07XG4gICAgaWYgKChieXRlICYgMHg4MCkgPT09IDB4MDApIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICgoYnl0ZSAmIDB4ZTApID09PSAweGMwKSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgKChieXRlICYgMHgxZikgPDwgNikgfFxuICAgICAgICAodmlld1srK2ldICYgMHgzZilcbiAgICAgICk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKChieXRlICYgMHhmMCkgPT09IDB4ZTApIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAoKGJ5dGUgJiAweDBmKSA8PCAxMikgfFxuICAgICAgICAoKHZpZXdbKytpXSAmIDB4M2YpIDw8IDYpIHxcbiAgICAgICAgKCh2aWV3WysraV0gJiAweDNmKSA8PCAwKVxuICAgICAgKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoKGJ5dGUgJiAweGY4KSA9PT0gMHhmMCkge1xuICAgICAgY2hyID0gKChieXRlICYgMHgwNykgPDwgMTgpIHxcbiAgICAgICAgKCh2aWV3WysraV0gJiAweDNmKSA8PCAxMikgfFxuICAgICAgICAoKHZpZXdbKytpXSAmIDB4M2YpIDw8IDYpIHxcbiAgICAgICAgKCh2aWV3WysraV0gJiAweDNmKSA8PCAwKTtcbiAgICAgIGlmIChjaHIgPj0gMHgwMTAwMDApIHsgLy8gc3Vycm9nYXRlIHBhaXJcbiAgICAgICAgY2hyIC09IDB4MDEwMDAwO1xuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoY2hyID4+PiAxMCkgKyAweEQ4MDAsIChjaHIgJiAweDNGRikgKyAweERDMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYnl0ZSAnICsgYnl0ZS50b1N0cmluZygxNikpO1xuICB9XG4gIHJldHVybiBzdHJpbmc7XG59XG5cbi8vIEZhc3RlciBmb3Igc2hvcnQgc3RyaW5ncyB0aGFuIEJ1ZmZlci5ieXRlTGVuZ3RoXG5leHBvcnQgZnVuY3Rpb24gdXRmOExlbmd0aChzdHI6IHN0cmluZyA9ICcnKSB7XG4gIGxldCBjID0gMDtcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgIGxlbmd0aCArPSAxO1xuICAgIH0gZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICBsZW5ndGggKz0gMjtcbiAgICB9IGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgIGxlbmd0aCArPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpKys7XG4gICAgICBsZW5ndGggKz0gNDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxlbmd0aCArIDE7XG59XG4iXX0=

/***/ }),
/* 12 */
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
            bytes.push(0xe0 | (value + 0x20));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuY29kaW5nL2VuY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRzs7O0FBRUg7OztHQUdHO0FBR0gsU0FBUyxVQUFVLENBQUMsR0FBRztJQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtZQUNaLE1BQU0sSUFBSSxDQUFDLENBQUM7U0FDYjthQUNJLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRTtZQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2I7YUFDSSxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUNsQyxNQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2I7YUFDSTtZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osTUFBTSxJQUFJLENBQUMsQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRztJQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMs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QUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELFFBQVE7UUFDUixJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELFNBQVM7UUFDVCxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELFNBQVM7UUFDVCxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELFNBQVM7UUFDVCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLENBQUM7S0FDVjtBQUNILENBQUM7QUF4RkQsd0JBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggRW5kZWwgRHJleWVyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSW9uIERyaXZlIFNvZnR3YXJlIEx0ZC5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFXG4gKi9cblxuLyoqXG4gKiBtc2dwYWNrIGltcGxlbWVudGF0aW9uIGhpZ2hseSBiYXNlZCBvbiBub3RlcGFjay5pb1xuICogaHR0cHM6Ly9naXRodWIuY29tL2RhcnJhY2hlcXVlc25lL25vdGVwYWNrXG4gKi9cblxuXG5mdW5jdGlvbiB1dGY4TGVuZ3RoKHN0cikge1xuICB2YXIgYyA9IDAsIGxlbmd0aCA9IDA7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgIGxlbmd0aCArPSAxO1xuICAgIH1cbiAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgIGxlbmd0aCArPSAyO1xuICAgIH1cbiAgICBlbHNlIGlmIChjIDwgMHhkODAwIHx8IGMgPj0gMHhlMDAwKSB7XG4gICAgICBsZW5ndGggKz0gMztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpKys7XG4gICAgICBsZW5ndGggKz0gNDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV0ZjhXcml0ZSh2aWV3LCBvZmZzZXQsIHN0cikge1xuICB2YXIgYyA9IDA7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgIHZpZXdbb2Zmc2V0KytdID0gYztcbiAgICB9XG4gICAgZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICB2aWV3W29mZnNldCsrXSA9IDB4YzAgfCAoYyA+PiA2KTtcbiAgICAgIHZpZXdbb2Zmc2V0KytdID0gMHg4MCB8IChjICYgMHgzZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgIHZpZXdbb2Zmc2V0KytdID0gMHhlMCB8IChjID4+IDEyKTtcbiAgICAgIHZpZXdbb2Zmc2V0KytdID0gMHg4MCB8IChjID4+IDYgJiAweDNmKTtcbiAgICAgIHZpZXdbb2Zmc2V0KytdID0gMHg4MCB8IChjICYgMHgzZik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaSsrO1xuICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzZmYpIDw8IDEwKSB8IChzdHIuY2hhckNvZGVBdChpKSAmIDB4M2ZmKSk7XG4gICAgICB2aWV3W29mZnNldCsrXSA9IDB4ZjAgfCAoYyA+PiAxOCk7XG4gICAgICB2aWV3W29mZnNldCsrXSA9IDB4ODAgfCAoYyA+PiAxMiAmIDB4M2YpO1xuICAgICAgdmlld1tvZmZzZXQrK10gPSAweDgwIHwgKGMgPj4gNiAmIDB4M2YpO1xuICAgICAgdmlld1tvZmZzZXQrK10gPSAweDgwIHwgKGMgJiAweDNmKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludDgoYnl0ZXMsIHZhbHVlKSB7XG4gIGJ5dGVzLnB1c2godmFsdWUgJiAyNTUpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ4KGJ5dGVzLCB2YWx1ZSkge1xuICBieXRlcy5wdXNoKHZhbHVlICYgMjU1KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnQxNihieXRlcywgdmFsdWUpIHtcbiAgYnl0ZXMucHVzaCh2YWx1ZSAmIDI1NSk7XG4gIGJ5dGVzLnB1c2goKHZhbHVlID4+IDgpICYgMjU1KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50MTYoYnl0ZXMsIHZhbHVlKSB7XG4gIGJ5dGVzLnB1c2godmFsdWUgJiAyNTUpO1xuICBieXRlcy5wdXNoKCh2YWx1ZSA+PiA4KSAmIDI1NSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW50MzIoYnl0ZXMsIHZhbHVlKSB7XG4gIGJ5dGVzLnB1c2godmFsdWUgJiAyNTUpO1xuICBieXRlcy5wdXNoKCh2YWx1ZSA+PiA4KSAmIDI1NSk7XG4gIGJ5dGVzLnB1c2goKHZhbHVlID4+IDE2KSAmIDI1NSk7XG4gIGJ5dGVzLnB1c2goKHZhbHVlID4+IDI0KSAmIDI1NSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdWludDMyKGJ5dGVzLCB2YWx1ZSkge1xuICBjb25zdCBiNCA9IHZhbHVlID4+IDI0O1xuICBjb25zdCBiMyA9IHZhbHVlID4+IDE2O1xuICBjb25zdCBiMiA9IHZhbHVlID4+IDg7XG4gIGNvbnN0IGIxID0gdmFsdWU7XG4gIGJ5dGVzLnB1c2goYjEgJiAyNTUpO1xuICBieXRlcy5wdXNoKGIyICYgMjU1KTtcbiAgYnl0ZXMucHVzaChiMyAmIDI1NSk7XG4gIGJ5dGVzLnB1c2goYjQgJiAyNTUpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGludDY0KGJ5dGVzLCB2YWx1ZSkge1xuICBjb25zdCBoaWdoID0gTWF0aC5mbG9vcih2YWx1ZSAvIE1hdGgucG93KDIsIDMyKSk7XG4gIGNvbnN0IGxvdyA9IHZhbHVlID4+PiAwO1xuICB1aW50MzIoYnl0ZXMsIGxvdyk7XG4gIHVpbnQzMihieXRlcywgaGlnaCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdWludDY0KGJ5dGVzLCB2YWx1ZSkge1xuICBjb25zdCBoaWdoID0gKHZhbHVlIC8gTWF0aC5wb3coMiwgMzIpKSA+PiAwO1xuICBjb25zdCBsb3cgPSB2YWx1ZSA+Pj4gMDtcbiAgdWludDMyKGJ5dGVzLCBsb3cpO1xuICB1aW50MzIoYnl0ZXMsIGhpZ2gpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZsb2F0MzIoYnl0ZXMsIHZhbHVlKSB7XG4gIHdyaXRlRmxvYXQzMihieXRlcywgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxvYXQ2NChieXRlcywgdmFsdWUpIHtcbiAgd3JpdGVGbG9hdDY0KGJ5dGVzLCB2YWx1ZSk7XG59XG5cbi8vIGZvcmNlIGxpdHRsZSBlbmRpYW4gdG8gZmFjaWxpdGF0ZSBkZWNvZGluZyBvbiBtdWx0aXBsZSBpbXBsZW1lbnRhdGlvbnNcbmNvbnN0IF9pc0xpdHRsZUVuZGlhbiA9IHRydWU7ICAvLyBuZXcgVWludDE2QXJyYXkobmV3IFVpbnQ4QXJyYXkoWzEsIDBdKS5idWZmZXIpWzBdID09PSAxO1xuY29uc3QgX2ludDMyID0gbmV3IEludDMyQXJyYXkoMik7XG5jb25zdCBfZmxvYXQzMiA9IG5ldyBGbG9hdDMyQXJyYXkoX2ludDMyLmJ1ZmZlcik7XG5jb25zdCBfZmxvYXQ2NCA9IG5ldyBGbG9hdDY0QXJyYXkoX2ludDMyLmJ1ZmZlcik7XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZUZsb2F0MzIoYnl0ZXMsIHZhbHVlKSB7XG4gIF9mbG9hdDMyWzBdID0gdmFsdWU7XG4gIGludDMyKGJ5dGVzLCBfaW50MzJbMF0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlRmxvYXQ2NChieXRlcywgdmFsdWUpIHtcbiAgX2Zsb2F0NjRbMF0gPSB2YWx1ZTtcbiAgaW50MzIoYnl0ZXMsIF9pbnQzMltfaXNMaXR0bGVFbmRpYW4gPyAwIDogMV0pO1xuICBpbnQzMihieXRlcywgX2ludDMyW19pc0xpdHRsZUVuZGlhbiA/IDEgOiAwXSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhbihieXRlcywgdmFsdWUpIHtcbiAgcmV0dXJuIHVpbnQ4KGJ5dGVzLCB2YWx1ZSA/IDEgOiAwKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcoYnl0ZXMsIHZhbHVlKSB7XG4gIC8vIGVuY29kZSBgbnVsbGAgc3RyaW5ncyBhcyBlbXB0eS5cbiAgaWYgKCF2YWx1ZSkgeyB2YWx1ZSA9IFwiXCI7IH1cblxuICBsZXQgbGVuZ3RoID0gdXRmOExlbmd0aCh2YWx1ZSk7XG4gIGxldCBzaXplID0gMDtcblxuICAvLyBmaXhzdHJcbiAgaWYgKGxlbmd0aCA8IDB4MjApIHtcbiAgICBieXRlcy5wdXNoKGxlbmd0aCB8IDB4YTApO1xuICAgIHNpemUgPSAxO1xuICB9XG4gIC8vIHN0ciA4XG4gIGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwKSB7XG4gICAgYnl0ZXMucHVzaCgweGQ5KTtcbiAgICB1aW50OChieXRlcywgbGVuZ3RoKTtcbiAgICBzaXplID0gMjtcbiAgfVxuICAvLyBzdHIgMTZcbiAgZWxzZSBpZiAobGVuZ3RoIDwgMHgxMDAwMCkge1xuICAgIGJ5dGVzLnB1c2goMHhkYSk7XG4gICAgdWludDE2KGJ5dGVzLCBsZW5ndGgpO1xuICAgIHNpemUgPSAzO1xuICB9XG4gIC8vIHN0ciAzMlxuICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwMDAwMCkge1xuICAgIGJ5dGVzLnB1c2goMHhkYik7XG4gICAgdWludDMyKGJ5dGVzLCBsZW5ndGgpO1xuICAgIHNpemUgPSA1O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIHRvbyBsb25nJyk7XG4gIH1cblxuICB1dGY4V3JpdGUoYnl0ZXMsIGJ5dGVzLmxlbmd0aCwgdmFsdWUpO1xuXG4gIHJldHVybiBzaXplICsgbGVuZ3RoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyKGJ5dGVzLCB2YWx1ZSkge1xuICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgcmV0dXJuIG51bWJlcihieXRlcywgMCk7XG5cbiAgfSBlbHNlIGlmICghaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgcmV0dXJuIG51bWJlcihieXRlcywgKHZhbHVlID4gMCkgPyBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiA6IC1OdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG5cbiAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gKHZhbHVlfDApKSB7XG4gICAgYnl0ZXMucHVzaCgweGNiKTtcbiAgICB3cml0ZUZsb2F0NjQoYnl0ZXMsIHZhbHVlKTtcbiAgICByZXR1cm4gOTtcblxuICAgIC8vIFRPRE86IGVuY29kZSBmbG9hdCAzMj9cbiAgICAvLyBpcyBpdCBwb3NzaWJsZSB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW4gZmxvYXQzMiAvIGZsb2F0NjQgaGVyZT9cblxuICAgIC8vIC8vIGZsb2F0IDMyXG4gICAgLy8gYnl0ZXMucHVzaCgweGNhKTtcbiAgICAvLyB3cml0ZUZsb2F0MzIoYnl0ZXMsIHZhbHVlKTtcbiAgICAvLyByZXR1cm4gNTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA+PSAwKSB7XG4gICAgLy8gcG9zaXRpdmUgZml4bnVtXG4gICAgaWYgKHZhbHVlIDwgMHg4MCkge1xuICAgICAgdWludDgoYnl0ZXMsIHZhbHVlKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIHVpbnQgOFxuICAgIGlmICh2YWx1ZSA8IDB4MTAwKSB7XG4gICAgICBieXRlcy5wdXNoKDB4Y2MpO1xuICAgICAgdWludDgoYnl0ZXMsIHZhbHVlKTtcbiAgICAgIHJldHVybiAyO1xuICAgIH1cblxuICAgIC8vIHVpbnQgMTZcbiAgICBpZiAodmFsdWUgPCAweDEwMDAwKSB7XG4gICAgICBieXRlcy5wdXNoKDB4Y2QpO1xuICAgICAgdWludDE2KGJ5dGVzLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gMztcbiAgICB9XG5cbiAgICAvLyB1aW50IDMyXG4gICAgaWYgKHZhbHVlIDwgMHgxMDAwMDAwMDApIHtcbiAgICAgIGJ5dGVzLnB1c2goMHhjZSk7XG4gICAgICB1aW50MzIoYnl0ZXMsIHZhbHVlKTtcbiAgICAgIHJldHVybiA1O1xuICAgIH1cblxuICAgIC8vIHVpbnQgNjRcbiAgICBieXRlcy5wdXNoKDB4Y2YpO1xuICAgIHVpbnQ2NChieXRlcywgdmFsdWUpO1xuICAgIHJldHVybiA5O1xuXG4gIH0gZWxzZSB7XG5cbiAgICAvLyBuZWdhdGl2ZSBmaXhudW1cbiAgICBpZiAodmFsdWUgPj0gLTB4MjApIHtcbiAgICAgIGJ5dGVzLnB1c2goMHhlMCB8ICh2YWx1ZSArIDB4MjApKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIGludCA4XG4gICAgaWYgKHZhbHVlID49IC0weDgwKSB7XG4gICAgICBieXRlcy5wdXNoKDB4ZDApO1xuICAgICAgaW50OChieXRlcywgdmFsdWUpO1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuXG4gICAgLy8gaW50IDE2XG4gICAgaWYgKHZhbHVlID49IC0weDgwMDApIHtcbiAgICAgIGJ5dGVzLnB1c2goMHhkMSk7XG4gICAgICBpbnQxNihieXRlcywgdmFsdWUpO1xuICAgICAgcmV0dXJuIDM7XG4gICAgfVxuXG4gICAgLy8gaW50IDMyXG4gICAgaWYgKHZhbHVlID49IC0weDgwMDAwMDAwKSB7XG4gICAgICBieXRlcy5wdXNoKDB4ZDIpO1xuICAgICAgaW50MzIoYnl0ZXMsIHZhbHVlKTtcbiAgICAgIHJldHVybiA1O1xuICAgIH1cblxuICAgIC8vIGludCA2NFxuICAgIGJ5dGVzLnB1c2goMHhkMyk7XG4gICAgaW50NjQoYnl0ZXMsIHZhbHVlKTtcbiAgICByZXR1cm4gOTtcbiAgfVxufSJdfQ==

/***/ }),
/* 13 */
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
exports.switchStructureCheck = exports.arrayCheck = exports.numberCheck = exports.number = exports.stringCheck = exports.string = exports.boolean = exports.readFloat64 = exports.readFloat32 = exports.uint64 = exports.int64 = exports.float64 = exports.float32 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = void 0;
var spec_1 = __webpack_require__(0);
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
        console.error('Invalid byte ' + byte.toString(16));
        // (do not throw error to avoid server/client from crashing due to hack attemps)
        // throw new Error('Invalid byte ' + byte.toString(16));
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
function switchStructureCheck(bytes, it) {
    return (
    // previous byte should be `SWITCH_TO_STRUCTURE`
    bytes[it.offset - 1] === spec_1.SWITCH_TO_STRUCTURE &&
        // next byte should be a number
        (bytes[it.offset] < 0x80 || (bytes[it.offset] >= 0xca && bytes[it.offset] <= 0xd3)));
}
exports.switchStructureCheck = switchStructureCheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuY29kaW5nL2RlY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRzs7O0FBRUgsZ0NBQThDO0FBUzlDLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUNyQyxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxTQUFTO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FDM0IsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQ3BCLENBQUM7WUFDRixTQUFTO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FDM0IsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFD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QUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUN0RixDQUFDO0FBQ0osQ0FBQztBQVBELG9EQU9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggRW5kZWwgRHJleWVyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSW9uIERyaXZlIFNvZnR3YXJlIEx0ZC5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFXG4gKi9cblxuaW1wb3J0IHsgU1dJVENIX1RPX1NUUlVDVFVSRSB9IGZyb20gXCIuLi9zcGVjXCI7XG5cbi8qKlxuICogbXNncGFjayBpbXBsZW1lbnRhdGlvbiBoaWdobHkgYmFzZWQgb24gbm90ZXBhY2suaW9cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJyYWNoZXF1ZXNuZS9ub3RlcGFja1xuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmF0b3IgeyBvZmZzZXQ6IG51bWJlcjsgfVxuXG5mdW5jdGlvbiB1dGY4UmVhZChieXRlcywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHN0cmluZyA9ICcnLCBjaHIgPSAwO1xuICBmb3IgKHZhciBpID0gb2Zmc2V0LCBlbmQgPSBvZmZzZXQgKyBsZW5ndGg7IGkgPCBlbmQ7IGkrKykge1xuICAgIHZhciBieXRlID0gYnl0ZXNbaV07XG4gICAgaWYgKChieXRlICYgMHg4MCkgPT09IDB4MDApIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICgoYnl0ZSAmIDB4ZTApID09PSAweGMwKSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgKChieXRlICYgMHgxZikgPDwgNikgfFxuICAgICAgICAoYnl0ZXNbKytpXSAmIDB4M2YpXG4gICAgICApO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICgoYnl0ZSAmIDB4ZjApID09PSAweGUwKSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgKChieXRlICYgMHgwZikgPDwgMTIpIHxcbiAgICAgICAgKChieXRlc1srK2ldICYgMHgzZikgPDwgNikgfFxuICAgICAgICAoKGJ5dGVzWysraV0gJiAweDNmKSA8PCAwKVxuICAgICAgKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoKGJ5dGUgJiAweGY4KSA9PT0gMHhmMCkge1xuICAgICAgY2hyID0gKChieXRlICYgMHgwNykgPDwgMTgpIHxcbiAgICAgICAgKChieXRlc1srK2ldICYgMHgzZikgPDwgMTIpIHxcbiAgICAgICAgKChieXRlc1srK2ldICYgMHgzZikgPDwgNikgfFxuICAgICAgICAoKGJ5dGVzWysraV0gJiAweDNmKSA8PCAwKTtcbiAgICAgIGlmIChjaHIgPj0gMHgwMTAwMDApIHsgLy8gc3Vycm9nYXRlIHBhaXJcbiAgICAgICAgY2hyIC09IDB4MDEwMDAwO1xuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoY2hyID4+PiAxMCkgKyAweEQ4MDAsIChjaHIgJiAweDNGRikgKyAweERDMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgYnl0ZSAnICsgYnl0ZS50b1N0cmluZygxNikpO1xuICAgIC8vIChkbyBub3QgdGhyb3cgZXJyb3IgdG8gYXZvaWQgc2VydmVyL2NsaWVudCBmcm9tIGNyYXNoaW5nIGR1ZSB0byBoYWNrIGF0dGVtcHMpXG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGJ5dGUgJyArIGJ5dGUudG9TdHJpbmcoMTYpKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50OCAoYnl0ZXM6IG51bWJlcltdLCBpdDogSXRlcmF0b3IpIHtcbiAgICByZXR1cm4gdWludDgoYnl0ZXMsIGl0KSA8PCAyNCA+PiAyNDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50OCAoYnl0ZXM6IG51bWJlcltdLCBpdDogSXRlcmF0b3IpIHtcbiAgICByZXR1cm4gYnl0ZXNbaXQub2Zmc2V0KytdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGludDE2IChieXRlczogbnVtYmVyW10sIGl0OiBJdGVyYXRvcikge1xuICAgIHJldHVybiB1aW50MTYoYnl0ZXMsIGl0KSA8PCAxNiA+PiAxNjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50MTYgKGJ5dGVzOiBudW1iZXJbXSwgaXQ6IEl0ZXJhdG9yKSB7XG4gICAgcmV0dXJuIGJ5dGVzW2l0Lm9mZnNldCsrXSB8IGJ5dGVzW2l0Lm9mZnNldCsrXSA8PCA4O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGludDMyIChieXRlczogbnVtYmVyW10sIGl0OiBJdGVyYXRvcikge1xuICAgIHJldHVybiBieXRlc1tpdC5vZmZzZXQrK10gfCBieXRlc1tpdC5vZmZzZXQrK10gPDwgOCB8IGJ5dGVzW2l0Lm9mZnNldCsrXSA8PCAxNiB8IGJ5dGVzW2l0Lm9mZnNldCsrXSA8PCAyNDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50MzIgKGJ5dGVzOiBudW1iZXJbXSwgaXQ6IEl0ZXJhdG9yKSB7XG4gICAgcmV0dXJuIGludDMyKGJ5dGVzLCBpdCkgPj4+IDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmxvYXQzMihieXRlczogbnVtYmVyW10sIGl0OiBJdGVyYXRvcikge1xuICByZXR1cm4gcmVhZEZsb2F0MzIoYnl0ZXMsIGl0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb2F0NjQoYnl0ZXM6IG51bWJlcltdLCBpdDogSXRlcmF0b3IpIHtcbiAgcmV0dXJuIHJlYWRGbG9hdDY0KGJ5dGVzLCBpdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnQ2NChieXRlczogbnVtYmVyW10sIGl0OiBJdGVyYXRvcikge1xuICBjb25zdCBsb3cgPSB1aW50MzIoYnl0ZXMsIGl0KTtcbiAgY29uc3QgaGlnaCA9IGludDMyKGJ5dGVzLCBpdCkgKiBNYXRoLnBvdygyLCAzMik7XG4gIHJldHVybiBoaWdoICsgbG93O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ2NChieXRlczogbnVtYmVyW10sIGl0OiBJdGVyYXRvcikge1xuICBjb25zdCBsb3cgPSB1aW50MzIoYnl0ZXMsIGl0KTtcbiAgY29uc3QgaGlnaCA9IHVpbnQzMihieXRlcywgaXQpICogTWF0aC5wb3coMiwgMzIpO1xuICByZXR1cm4gaGlnaCArIGxvdztcbn07XG5cbi8vIGZvcmNlIGxpdHRsZSBlbmRpYW4gdG8gZmFjaWxpdGF0ZSBkZWNvZGluZyBvbiBtdWx0aXBsZSBpbXBsZW1lbnRhdGlvbnNcbmNvbnN0IF9pc0xpdHRsZUVuZGlhbiA9IHRydWU7ICAvLyBuZXcgVWludDE2QXJyYXkobmV3IFVpbnQ4QXJyYXkoWzEsIDBdKS5idWZmZXIpWzBdID09PSAxO1xuY29uc3QgX2ludDMyID0gbmV3IEludDMyQXJyYXkoMik7XG5jb25zdCBfZmxvYXQzMiA9IG5ldyBGbG9hdDMyQXJyYXkoX2ludDMyLmJ1ZmZlcik7XG5jb25zdCBfZmxvYXQ2NCA9IG5ldyBGbG9hdDY0QXJyYXkoX2ludDMyLmJ1ZmZlcik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkRmxvYXQzMiAoYnl0ZXM6IG51bWJlcltdLCBpdDogSXRlcmF0b3IpIHtcbiAgICBfaW50MzJbMF0gPSBpbnQzMihieXRlcywgaXQpO1xuICAgIHJldHVybiBfZmxvYXQzMlswXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkRmxvYXQ2NCAoYnl0ZXM6IG51bWJlcltdLCBpdDogSXRlcmF0b3IpIHtcbiAgICBfaW50MzJbX2lzTGl0dGxlRW5kaWFuID8gMCA6IDFdID0gaW50MzIoYnl0ZXMsIGl0KTtcbiAgICBfaW50MzJbX2lzTGl0dGxlRW5kaWFuID8gMSA6IDBdID0gaW50MzIoYnl0ZXMsIGl0KTtcbiAgICByZXR1cm4gX2Zsb2F0NjRbMF07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhbiAoYnl0ZXM6IG51bWJlcltdLCBpdDogSXRlcmF0b3IpIHtcbiAgICByZXR1cm4gdWludDgoYnl0ZXMsIGl0KSA+IDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nIChieXRlcywgaXQ6IEl0ZXJhdG9yKSB7XG4gIGNvbnN0IHByZWZpeCA9IGJ5dGVzW2l0Lm9mZnNldCsrXTtcbiAgbGV0IGxlbmd0aDogbnVtYmVyO1xuXG4gIGlmIChwcmVmaXggPCAweGMwKSB7XG4gICAgLy8gZml4c3RyXG4gICAgbGVuZ3RoID0gcHJlZml4ICYgMHgxZjtcblxuICB9IGVsc2UgaWYgKHByZWZpeCA9PT0gMHhkOSkge1xuICAgIGxlbmd0aCA9IHVpbnQ4KGJ5dGVzLCBpdCk7XG5cbiAgfSBlbHNlIGlmIChwcmVmaXggPT09IDB4ZGEpIHtcbiAgICBsZW5ndGggPSB1aW50MTYoYnl0ZXMsIGl0KTtcblxuICB9IGVsc2UgaWYgKHByZWZpeCA9PT0gMHhkYikge1xuICAgIGxlbmd0aCA9IHVpbnQzMihieXRlcywgaXQpO1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSB1dGY4UmVhZChieXRlcywgaXQub2Zmc2V0LCBsZW5ndGgpO1xuICBpdC5vZmZzZXQgKz0gbGVuZ3RoO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0NoZWNrKGJ5dGVzLCBpdDogSXRlcmF0b3IpIHtcbiAgY29uc3QgcHJlZml4ID0gYnl0ZXNbaXQub2Zmc2V0XTtcbiAgcmV0dXJuIChcbiAgICAvLyBmaXhzdHJcbiAgICAocHJlZml4IDwgMHhjMCAmJiBwcmVmaXggPiAweGEwKSB8fFxuICAgIC8vIHN0ciA4XG4gICAgcHJlZml4ID09PSAweGQ5IHx8XG4gICAgLy8gc3RyIDE2XG4gICAgcHJlZml4ID09PSAweGRhIHx8XG4gICAgLy8gc3RyIDMyXG4gICAgcHJlZml4ID09PSAweGRiXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXIgKGJ5dGVzLCBpdDogSXRlcmF0b3IpIHtcbiAgY29uc3QgcHJlZml4ID0gYnl0ZXNbaXQub2Zmc2V0KytdO1xuXG4gIGlmIChwcmVmaXggPCAweDgwKSB7XG4gICAgLy8gcG9zaXRpdmUgZml4aW50XG4gICAgcmV0dXJuIHByZWZpeDtcblxuICB9IGVsc2UgaWYgKHByZWZpeCA9PT0gMHhjYSkge1xuICAgIC8vIGZsb2F0IDMyXG4gICAgcmV0dXJuIHJlYWRGbG9hdDMyKGJ5dGVzLCBpdCk7XG5cbiAgfSBlbHNlIGlmIChwcmVmaXggPT09IDB4Y2IpIHtcbiAgICAvLyBmbG9hdCA2NFxuICAgIHJldHVybiByZWFkRmxvYXQ2NChieXRlcywgaXQpO1xuXG4gIH0gZWxzZSBpZiAocHJlZml4ID09PSAweGNjKSB7XG4gICAgLy8gdWludCA4XG4gICAgcmV0dXJuIHVpbnQ4KGJ5dGVzLCBpdCk7XG5cbiAgfSBlbHNlIGlmIChwcmVmaXggPT09IDB4Y2QpIHtcbiAgICAvLyB1aW50IDE2XG4gICAgcmV0dXJuIHVpbnQxNihieXRlcywgaXQpO1xuXG4gIH0gZWxzZSBpZiAocHJlZml4ID09PSAweGNlKSB7XG4gICAgLy8gdWludCAzMlxuICAgIHJldHVybiB1aW50MzIoYnl0ZXMsIGl0KTtcblxuICB9IGVsc2UgaWYgKHByZWZpeCA9PT0gMHhjZikge1xuICAgIC8vIHVpbnQgNjRcbiAgICByZXR1cm4gdWludDY0KGJ5dGVzLCBpdCk7XG5cbiAgfSBlbHNlIGlmIChwcmVmaXggPT09IDB4ZDApIHtcbiAgICAvLyBpbnQgOFxuICAgIHJldHVybiBpbnQ4KGJ5dGVzLCBpdCk7XG5cbiAgfSBlbHNlIGlmIChwcmVmaXggPT09IDB4ZDEpIHtcbiAgICAvLyBpbnQgMTZcbiAgICByZXR1cm4gaW50MTYoYnl0ZXMsIGl0KTtcblxuICB9IGVsc2UgaWYgKHByZWZpeCA9PT0gMHhkMikge1xuICAgIC8vIGludCAzMlxuICAgIHJldHVybiBpbnQzMihieXRlcywgaXQpO1xuXG4gIH0gZWxzZSBpZiAocHJlZml4ID09PSAweGQzKSB7XG4gICAgLy8gaW50IDY0XG4gICAgcmV0dXJuIGludDY0KGJ5dGVzLCBpdCk7XG5cbiAgfSBlbHNlIGlmIChwcmVmaXggPiAweGRmKSB7XG4gICAgLy8gbmVnYXRpdmUgZml4aW50XG4gICAgcmV0dXJuICgweGZmIC0gcHJlZml4ICsgMSkgKiAtMVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyQ2hlY2sgKGJ5dGVzLCBpdDogSXRlcmF0b3IpIHtcbiAgY29uc3QgcHJlZml4ID0gYnl0ZXNbaXQub2Zmc2V0XTtcbiAgLy8gcG9zaXRpdmUgZml4aW50IC0gMHgwMCAtIDB4N2ZcbiAgLy8gZmxvYXQgMzIgICAgICAgIC0gMHhjYVxuICAvLyBmbG9hdCA2NCAgICAgICAgLSAweGNiXG4gIC8vIHVpbnQgOCAgICAgICAgICAtIDB4Y2NcbiAgLy8gdWludCAxNiAgICAgICAgIC0gMHhjZFxuICAvLyB1aW50IDMyICAgICAgICAgLSAweGNlXG4gIC8vIHVpbnQgNjQgICAgICAgICAtIDB4Y2ZcbiAgLy8gaW50IDggICAgICAgICAgIC0gMHhkMFxuICAvLyBpbnQgMTYgICAgICAgICAgLSAweGQxXG4gIC8vIGludCAzMiAgICAgICAgICAtIDB4ZDJcbiAgLy8gaW50IDY0ICAgICAgICAgIC0gMHhkM1xuICByZXR1cm4gKFxuICAgIHByZWZpeCA8IDB4ODAgfHxcbiAgICAocHJlZml4ID49IDB4Y2EgJiYgcHJlZml4IDw9IDB4ZDMpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUNoZWNrIChieXRlcywgaXQ6IEl0ZXJhdG9yKSB7XG4gIHJldHVybiBieXRlc1tpdC5vZmZzZXRdIDwgMHhhMDtcblxuICAvLyBjb25zdCBwcmVmaXggPSBieXRlc1tpdC5vZmZzZXRdIDtcblxuICAvLyBpZiAocHJlZml4IDwgMHhhMCkge1xuICAvLyAgIHJldHVybiBwcmVmaXg7XG5cbiAgLy8gLy8gYXJyYXlcbiAgLy8gfSBlbHNlIGlmIChwcmVmaXggPT09IDB4ZGMpIHtcbiAgLy8gICBpdC5vZmZzZXQgKz0gMjtcblxuICAvLyB9IGVsc2UgaWYgKDB4ZGQpIHtcbiAgLy8gICBpdC5vZmZzZXQgKz0gNDtcbiAgLy8gfVxuXG4gIC8vIHJldHVybiBwcmVmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hTdHJ1Y3R1cmVDaGVjayhieXRlcywgaXQ6IEl0ZXJhdG9yKSB7XG4gIHJldHVybiAoXG4gICAgICAvLyBwcmV2aW91cyBieXRlIHNob3VsZCBiZSBgU1dJVENIX1RPX1NUUlVDVFVSRWBcbiAgICAgIGJ5dGVzW2l0Lm9mZnNldCAtIDFdID09PSBTV0lUQ0hfVE9fU1RSVUNUVVJFICYmXG4gICAgICAvLyBuZXh0IGJ5dGUgc2hvdWxkIGJlIGEgbnVtYmVyXG4gICAgICAoYnl0ZXNbaXQub2Zmc2V0XSA8IDB4ODAgfHwgKGJ5dGVzW2l0Lm9mZnNldF0gPj0gMHhjYSAmJiBieXRlc1tpdC5vZmZzZXRdIDw9IDB4ZDMpKVxuICApO1xufSJdfQ==

/***/ }),
/* 14 */
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
var http = __importStar(__webpack_require__(7));
var Storage_1 = __webpack_require__(30);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBdUM7QUFDdkMscUNBQXlEO0FBRXpELElBQU0sYUFBYSxHQUFHLHFCQUFxQixDQUFDO0FBRTVDLElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNoQix1QkFBVyxDQUFBO0lBQ1gsK0JBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQUhXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBR25CO0FBd0NEO0lBa0NJLGNBQVksUUFBZ0I7UUFBNUIsaUJBR0M7UUFwQ0QsUUFBRyxHQUFXLFNBQVMsQ0FBQztRQUN4QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFFOUIsZ0JBQVcsR0FBWSxTQUFTLENBQUM7UUFDakMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUM3QixhQUFRLEdBQVEsU0FBUyxDQUFDO1FBRTFCLFlBQU8sR0FBYSxTQUFTLENBQUM7UUFFOUIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUMvQixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBQzlCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFDakMsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUU1QixjQUFTLEdBQWEsU0FBUyxDQUFDO1FBQ2hDLG1CQUFjLEdBQWEsU0FBUyxDQUFDO1FBRXJDLGNBQVMsR0FBUyxTQUFTLENBQUM7UUFDNUIsY0FBUyxHQUFTLFNBQVMsQ0FBQztRQUU1QixhQUFhO1FB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QUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUwsV0FBQztBQUFELENBQUMsQUE3SkQsSUE2SkM7QUE3Slksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBodHRwIGZyb20gXCJAY29seXNldXMvaHR0cFwiO1xuaW1wb3J0IHsgZ2V0SXRlbSwgc2V0SXRlbSwgcmVtb3ZlSXRlbSB9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuY29uc3QgVE9LRU5fU1RPUkFHRSA9IFwiY29seXNldXMtYXV0aC10b2tlblwiO1xuXG5leHBvcnQgZW51bSBQbGF0Zm9ybSB7XG4gICAgaW9zID0gXCJpb3NcIixcbiAgICBhbmRyb2lkID0gXCJhbmRyb2lkXCIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGV2aWNlIHtcbiAgICBpZDogc3RyaW5nLFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0dXMge1xuICAgIHN0YXR1czogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciB7XG4gICAgX2lkOiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICAgIGF2YXRhclVybDogc3RyaW5nO1xuXG4gICAgaXNBbm9ueW1vdXM6IGJvb2xlYW47XG4gICAgZW1haWw6IHN0cmluZztcblxuICAgIGxhbmc6IHN0cmluZztcbiAgICBsb2NhdGlvbjogc3RyaW5nO1xuICAgIHRpbWV6b25lOiBzdHJpbmc7XG4gICAgbWV0YWRhdGE6IGFueTtcblxuICAgIGRldmljZXM6IERldmljZVtdO1xuXG4gICAgZmFjZWJvb2tJZDogc3RyaW5nO1xuICAgIHR3aXR0ZXJJZDogc3RyaW5nO1xuICAgIGdvb2dsZUlkOiBzdHJpbmc7XG4gICAgZ2FtZUNlbnRlcklkOiBzdHJpbmc7XG4gICAgc3RlYW1JZDogc3RyaW5nO1xuXG4gICAgZnJpZW5kSWRzOiBzdHJpbmdbXTtcbiAgICBibG9ja2VkVXNlcklkczogc3RyaW5nW107XG5cbiAgICBjcmVhdGVkQXQ6IERhdGU7XG4gICAgdXBkYXRlZEF0OiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgQXV0aCBpbXBsZW1lbnRzIElVc2VyIHtcbiAgICBfaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICB1c2VybmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgYXZhdGFyVXJsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBpc0Fub255bW91czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcbiAgICBlbWFpbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICAgIGxvY2F0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgdGltZXpvbmU6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICBtZXRhZGF0YTogYW55ID0gdW5kZWZpbmVkO1xuXG4gICAgZGV2aWNlczogRGV2aWNlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBmYWNlYm9va0lkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgdHdpdHRlcklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgZ29vZ2xlSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICBnYW1lQ2VudGVySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICBzdGVhbUlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBmcmllbmRJZHM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuICAgIGJsb2NrZWRVc2VySWRzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIGNyZWF0ZWRBdDogRGF0ZSA9IHVuZGVmaW5lZDtcbiAgICB1cGRhdGVkQXQ6IERhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBhdXRoIHRva2VuXG4gICAgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIHByb3RlY3RlZCBlbmRwb2ludDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBrZWVwT25saW5lSW50ZXJ2YWw6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGVuZHBvaW50OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbmRwb2ludCA9IGVuZHBvaW50LnJlcGxhY2UoXCJ3c1wiLCBcImh0dHBcIik7XG4gICAgICAgIGdldEl0ZW0oVE9LRU5fU1RPUkFHRSwgKHRva2VuKSA9PiB0aGlzLnRva2VuID0gdG9rZW4pO1xuICAgIH1cblxuICAgIGdldCBoYXNUb2tlbigpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy50b2tlbjtcbiAgICB9XG5cbiAgICBhc3luYyBsb2dpbiAob3B0aW9uczoge1xuICAgICAgICBhY2Nlc3NUb2tlbj86IHN0cmluZyxcbiAgICAgICAgZGV2aWNlSWQ/OiBzdHJpbmcsXG4gICAgICAgIHBsYXRmb3JtPzogc3RyaW5nLFxuICAgICAgICBlbWFpbD86IHN0cmluZyxcbiAgICAgICAgcGFzc3dvcmQ/OiBzdHJpbmcsXG4gICAgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNUb2tlbikge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXMudG9rZW4gPSB0aGlzLnRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMucmVxdWVzdCgncG9zdCcsICcvYXV0aCcsIHF1ZXJ5UGFyYW1zKTtcblxuICAgICAgICAvLyBzZXQgJiBjYWNoZSB0b2tlblxuICAgICAgICB0aGlzLnRva2VuID0gZGF0YS50b2tlbjtcbiAgICAgICAgc2V0SXRlbShUT0tFTl9TVE9SQUdFLCB0aGlzLnRva2VuKTtcblxuICAgICAgICBmb3IgKGxldCBhdHRyIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGF0dHIpKSB7IHRoaXNbYXR0cl0gPSBkYXRhW2F0dHJdOyB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyUGluZ1NlcnZpY2UoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLnJlcXVlc3QoJ3B1dCcsICcvYXV0aCcsIHt9LCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiB0aGlzLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgYXZhdGFyVXJsOiB0aGlzLmF2YXRhclVybCxcbiAgICAgICAgICAgIGxhbmc6IHRoaXMubGFuZyxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmxvY2F0aW9uLFxuICAgICAgICAgICAgdGltZXpvbmU6IHRoaXMudGltZXpvbmUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFzeW5jIGdldEZyaWVuZHMoKSB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5yZXF1ZXN0KCdnZXQnLCAnL2ZyaWVuZHMvYWxsJykpIGFzIElVc2VyW107XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0T25saW5lRnJpZW5kcygpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldCcsICcvZnJpZW5kcy9vbmxpbmUnKSkgYXMgSVVzZXJbXTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRGcmllbmRSZXF1ZXN0cygpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnJlcXVlc3QoJ2dldCcsICcvZnJpZW5kcy9yZXF1ZXN0cycpKSBhcyBJVXNlcltdO1xuICAgIH1cblxuICAgIGFzeW5jIHNlbmRGcmllbmRSZXF1ZXN0KGZyaWVuZElkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnJlcXVlc3QoJ3Bvc3QnLCAnL2ZyaWVuZHMvcmVxdWVzdHMnLCB7IHVzZXJJZDogZnJpZW5kSWQgfSkpIGFzIElTdGF0dXM7XG4gICAgfVxuXG4gICAgYXN5bmMgYWNjZXB0RnJpZW5kUmVxdWVzdChmcmllbmRJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5yZXF1ZXN0KCdwdXQnLCAnL2ZyaWVuZHMvcmVxdWVzdHMnLCB7IHVzZXJJZDogZnJpZW5kSWQgfSkpIGFzIElTdGF0dXM7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVjbGluZUZyaWVuZFJlcXVlc3QoZnJpZW5kSWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMucmVxdWVzdCgnZGVsJywgJy9mcmllbmRzL3JlcXVlc3RzJywgeyB1c2VySWQ6IGZyaWVuZElkIH0pKSBhcyBJU3RhdHVzO1xuICAgIH1cblxuICAgIGFzeW5jIGJsb2NrVXNlcihmcmllbmRJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5yZXF1ZXN0KCdwb3N0JywgJy9mcmllbmRzL2Jsb2NrJywgeyB1c2VySWQ6IGZyaWVuZElkIH0pKSBhcyBJU3RhdHVzO1xuICAgIH1cblxuICAgIGFzeW5jIHVuYmxvY2tVc2VyKGZyaWVuZElkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLnJlcXVlc3QoJ3B1dCcsICcvZnJpZW5kcy9ibG9jaycsIHsgdXNlcklkOiBmcmllbmRJZCB9KSkgYXMgSVN0YXR1cztcbiAgICB9XG5cbiAgICBhc3luYyByZXF1ZXN0KFxuICAgICAgICBtZXRob2Q6ICdnZXQnIHwgJ3Bvc3QnIHwgJ3B1dCcgfCAnZGVsJyxcbiAgICAgICAgc2VnbWVudHM6IHN0cmluZyxcbiAgICAgICAgcXVlcnk6IHtba2V5OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmd9ID0ge30sXG4gICAgICAgIGJvZHk/OiBhbnksXG4gICAgICAgIGhlYWRlcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge31cbiAgICApIHtcbiAgICAgICAgaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIGlmICh0aGlzLmhhc1Rva2VuKSB7IGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9ICdCZWFyZXIgJyArIHRoaXMudG9rZW47IH1cblxuICAgICAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHF1ZXJ5KSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtcy5wdXNoKGAke25hbWV9PSR7cXVlcnlbbmFtZV19YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IChxdWVyeVBhcmFtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgPyBgPyR7cXVlcnlQYXJhbXMuam9pbihcIiZcIil9YFxuICAgICAgICAgICAgOiAnJztcblxuICAgICAgICBjb25zdCBvcHRzOiBQYXJ0aWFsPGh0dHAuSHR0cGllT3B0aW9ucz4gPSB7IGhlYWRlcnMgfTtcbiAgICAgICAgaWYgKGJvZHkpIHsgb3B0cy5ib2R5ID0gYm9keTsgfVxuXG4gICAgICAgIHJldHVybiAoYXdhaXQgaHR0cFttZXRob2RdKGAke3RoaXMuZW5kcG9pbnR9JHtzZWdtZW50c30ke3F1ZXJ5U3RyaW5nfWAsIG9wdHMpKS5kYXRhO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVtb3ZlSXRlbShUT0tFTl9TVE9SQUdFKTtcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyUGluZ1NlcnZpY2UoKTtcbiAgICB9XG5cbiAgICByZWdpc3RlclBpbmdTZXJ2aWNlKHRpbWVvdXQ6IG51bWJlciA9IDE1MDAwKSB7XG4gICAgICAgIHRoaXMudW5yZWdpc3RlclBpbmdTZXJ2aWNlKCk7XG5cbiAgICAgICAgdGhpcy5rZWVwT25saW5lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnJlcXVlc3QoJ2dldCcsICcvYXV0aCcpLCB0aW1lb3V0KTtcbiAgICB9XG5cbiAgICB1bnJlZ2lzdGVyUGluZ1NlcnZpY2UoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5rZWVwT25saW5lSW50ZXJ2YWwpO1xuICAgIH1cblxufVxuIl19

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = __webpack_require__(1);
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return Schema_1.Schema; } });
var MapSchema_1 = __webpack_require__(5);
Object.defineProperty(exports, "MapSchema", { enumerable: true, get: function () { return MapSchema_1.MapSchema; } });
var ArraySchema_1 = __webpack_require__(4);
Object.defineProperty(exports, "ArraySchema", { enumerable: true, get: function () { return ArraySchema_1.ArraySchema; } });
var CollectionSchema_1 = __webpack_require__(16);
Object.defineProperty(exports, "CollectionSchema", { enumerable: true, get: function () { return CollectionSchema_1.CollectionSchema; } });
var SetSchema_1 = __webpack_require__(17);
Object.defineProperty(exports, "SetSchema", { enumerable: true, get: function () { return SetSchema_1.SetSchema; } });
// Utils
var utils_1 = __webpack_require__(40);
Object.defineProperty(exports, "dumpChanges", { enumerable: true, get: function () { return utils_1.dumpChanges; } });
// Reflection
var Reflection_1 = __webpack_require__(41);
Object.defineProperty(exports, "Reflection", { enumerable: true, get: function () { return Reflection_1.Reflection; } });
Object.defineProperty(exports, "ReflectionType", { enumerable: true, get: function () { return Reflection_1.ReflectionType; } });
Object.defineProperty(exports, "ReflectionField", { enumerable: true, get: function () { return Reflection_1.ReflectionField; } });
var annotations_1 = __webpack_require__(6);
// Annotations
Object.defineProperty(exports, "type", { enumerable: true, get: function () { return annotations_1.type; } });
Object.defineProperty(exports, "deprecated", { enumerable: true, get: function () { return annotations_1.deprecated; } });
Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return annotations_1.filter; } });
Object.defineProperty(exports, "filterChildren", { enumerable: true, get: function () { return annotations_1.filterChildren; } });
Object.defineProperty(exports, "defineTypes", { enumerable: true, get: function () { return annotations_1.defineTypes; } });
Object.defineProperty(exports, "hasFilter", { enumerable: true, get: function () { return annotations_1.hasFilter; } });
// Internals
Object.defineProperty(exports, "SchemaDefinition", { enumerable: true, get: function () { return annotations_1.SchemaDefinition; } });
// Types
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return annotations_1.Context; } });
var spec_1 = __webpack_require__(0);
Object.defineProperty(exports, "OPERATION", { enumerable: true, get: function () { return spec_1.OPERATION; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBOEM7QUFBckMsZ0dBQUEsTUFBTSxPQUFBO0FBRWYsK0NBQThDO0FBQXJDLHNHQUFBLFNBQVMsT0FBQTtBQUNsQixtREFBa0Q7QUFBekMsMEdBQUEsV0FBVyxPQUFBO0FBQ3BCLDZEQUE0RDtBQUFuRCxvSEFBQSxnQkFBZ0IsT0FBQTtBQUN6QiwrQ0FBOEM7QUFBckMsc0dBQUEsU0FBUyxPQUFBO0FBRWxCLFFBQVE7QUFDUixpQ0FBc0M7QUFBN0Isb0dBQUEsV0FBVyxPQUFBO0FBS3BCLGFBQWE7QUFDYiwyQ0FJc0I7QUFIbEIsd0dBQUEsVUFBVSxPQUFBO0FBQ1YsNEdBQUEsY0FBYyxPQUFBO0FBQ2QsNkdBQUEsZUFBZSxPQUFBO0FBR25CLDZDQWtCdUI7QUFqQm5CLGNBQWM7QUFDZCxtR0FBQSxJQUFJLE9BQUE7QUFDSix5R0FBQSxVQUFVLE9BQUE7QUFDVixxR0FBQSxNQUFNLE9BQUE7QUFDTiw2R0FBQSxjQUFjLE9BQUE7QUFDZCwwR0FBQSxXQUFXLE9BQUE7QUFDWCx3R0FBQSxTQUFTLE9BQUE7QUFFVCxZQUFZO0FBQ1osK0dBQUEsZ0JBQWdCLE9BQUE7QUFFaEIsUUFBUTtBQUNSLHNHQUFBLE9BQU8sT0FBQTtBQU9YLCtCQUFtQztBQUExQixpR0FBQSxTQUFTLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBTY2hlbWEsIERhdGFDaGFuZ2UgfSBmcm9tIFwiLi9TY2hlbWFcIjtcblxuZXhwb3J0IHsgTWFwU2NoZW1hIH0gZnJvbSBcIi4vdHlwZXMvTWFwU2NoZW1hXCI7XG5leHBvcnQgeyBBcnJheVNjaGVtYSB9IGZyb20gXCIuL3R5cGVzL0FycmF5U2NoZW1hXCI7XG5leHBvcnQgeyBDb2xsZWN0aW9uU2NoZW1hIH0gZnJvbSBcIi4vdHlwZXMvQ29sbGVjdGlvblNjaGVtYVwiO1xuZXhwb3J0IHsgU2V0U2NoZW1hIH0gZnJvbSBcIi4vdHlwZXMvU2V0U2NoZW1hXCI7XG5cbi8vIFV0aWxzXG5leHBvcnQgeyBkdW1wQ2hhbmdlcyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8vIERlY29kZXJcbmV4cG9ydCB7IEl0ZXJhdG9yIH0gZnJvbSBcIi4vZW5jb2RpbmcvZGVjb2RlXCI7XG5cbi8vIFJlZmxlY3Rpb25cbmV4cG9ydCB7XG4gICAgUmVmbGVjdGlvbixcbiAgICBSZWZsZWN0aW9uVHlwZSxcbiAgICBSZWZsZWN0aW9uRmllbGQsXG59IGZyb20gXCIuL1JlZmxlY3Rpb25cIjtcblxuZXhwb3J0IHtcbiAgICAvLyBBbm5vdGF0aW9uc1xuICAgIHR5cGUsXG4gICAgZGVwcmVjYXRlZCxcbiAgICBmaWx0ZXIsXG4gICAgZmlsdGVyQ2hpbGRyZW4sXG4gICAgZGVmaW5lVHlwZXMsXG4gICAgaGFzRmlsdGVyLFxuXG4gICAgLy8gSW50ZXJuYWxzXG4gICAgU2NoZW1hRGVmaW5pdGlvbixcblxuICAgIC8vIFR5cGVzXG4gICAgQ29udGV4dCxcbiAgICBQcmltaXRpdmVUeXBlLFxuICAgIERlZmluaXRpb24sXG4gICAgRGVmaW5pdGlvblR5cGUsXG4gICAgRmlsdGVyQ2FsbGJhY2ssXG59IGZyb20gXCIuL2Fubm90YXRpb25zXCI7XG5cbmV4cG9ydCB7IE9QRVJBVElPTiB9IGZyb20gXCIuL3NwZWNcIjsiXX0=

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionSchema = void 0;
var ChangeTree_1 = __webpack_require__(3);
var spec_1 = __webpack_require__(0);
var Schema_1 = __webpack_require__(1);
var _1 = __webpack_require__(2);
var CollectionSchema = /** @class */ (function () {
    function CollectionSchema(initialValues) {
        var _this = this;
        this.$changes = new ChangeTree_1.ChangeTree(this);
        this.$items = new Map();
        this.$indexes = new Map();
        this.$refId = 0;
        if (initialValues) {
            initialValues.forEach(function (v) { return _this.add(v); });
        }
    }
    CollectionSchema.is = function (type) {
        return type['collection'] !== undefined;
    };
    CollectionSchema.prototype.add = function (value) {
        // set "index" for reference.
        var index = this.$refId++;
        var isRef = (value['$changes']) !== undefined;
        if (isRef) {
            value['$changes'].setParent(this, this.$changes.root, index);
        }
        this.$changes.indexes[index] = index;
        this.$indexes.set(index, index);
        this.$items.set(index, value);
        this.$changes.change(index);
        return index;
    };
    CollectionSchema.prototype.at = function (index) {
        var key = Array.from(this.$items.keys())[index];
        return this.$items.get(key);
    };
    CollectionSchema.prototype.entries = function () {
        return this.$items.entries();
    };
    CollectionSchema.prototype.delete = function (item) {
        var entries = this.$items.entries();
        var index;
        var entry;
        while (entry = entries.next()) {
            if (entry.done) {
                break;
            }
            if (item === entry.value[1]) {
                index = entry.value[0];
                break;
            }
        }
        if (index === undefined) {
            return false;
        }
        this.$changes.delete(index);
        this.$indexes.delete(index);
        return this.$items.delete(index);
    };
    CollectionSchema.prototype.clear = function (isDecoding) {
        var _this = this;
        // discard previous operations.
        this.$changes.discard(true);
        this.$changes.indexes = {};
        // clear previous indexes
        this.$indexes.clear();
        // flag child items for garbage collection.
        if (isDecoding && typeof (this.$changes.getType()) !== "string") {
            this.$items.forEach(function (item) {
                _this.$changes.root.removeRef(item['$changes'].refId);
            });
        }
        // clear items
        this.$items.clear();
        this.$changes.operation({ index: 0, op: spec_1.OPERATION.CLEAR });
        // touch all structures until reach root
        this.$changes.touchParents();
    };
    CollectionSchema.prototype.has = function (value) {
        return Array.from(this.$items.values()).some(function (v) { return v === value; });
    };
    CollectionSchema.prototype.forEach = function (callbackfn) {
        var _this = this;
        this.$items.forEach(function (value, key, _) { return callbackfn(value, key, _this); });
    };
    CollectionSchema.prototype.values = function () {
        return this.$items.values();
    };
    Object.defineProperty(CollectionSchema.prototype, "size", {
        get: function () {
            return this.$items.size;
        },
        enumerable: false,
        configurable: true
    });
    CollectionSchema.prototype.setIndex = function (index, key) {
        this.$indexes.set(index, key);
    };
    CollectionSchema.prototype.getIndex = function (index) {
        return this.$indexes.get(index);
    };
    CollectionSchema.prototype.getByIndex = function (index) {
        return this.$items.get(this.$indexes.get(index));
    };
    CollectionSchema.prototype.deleteByIndex = function (index) {
        var key = this.$indexes.get(index);
        this.$items.delete(key);
        this.$indexes.delete(index);
    };
    CollectionSchema.prototype.toArray = function () {
        return Array.from(this.$items.values());
    };
    CollectionSchema.prototype.toJSON = function () {
        var values = [];
        this.forEach(function (value, key) {
            values.push((typeof (value['toJSON']) === "function")
                ? value['toJSON']()
                : value);
        });
        return values;
    };
    //
    // Decoding utilities
    //
    CollectionSchema.prototype.clone = function (isDecoding) {
        var cloned;
        if (isDecoding) {
            // client-side
            cloned = Object.assign(new CollectionSchema(), this);
        }
        else {
            // server-side
            var cloned_1 = new CollectionSchema();
            this.forEach(function (value) {
                if (value['$changes']) {
                    cloned_1.add(value['clone']());
                }
                else {
                    cloned_1.add(value);
                }
            });
        }
        return cloned;
    };
    CollectionSchema.prototype.triggerAll = function () {
        Schema_1.Schema.prototype.triggerAll.apply(this);
    };
    return CollectionSchema;
}());
exports.CollectionSchema = CollectionSchema;
_1.registerType("collection", {
    constructor: CollectionSchema,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGlvblNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9Db2xsZWN0aW9uU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9EQUFtRDtBQUNuRCxnQ0FBb0M7QUFDcEMsb0NBQTJEO0FBQzNELHNCQUFpQztBQUlqQztJQW1CSSwwQkFBYSxhQUF3QjtRQUFyQyxpQkFJQztRQXRCUyxhQUFRLEdBQWUsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBbUIsSUFBSSxHQUFHLEVBQWEsQ0FBQztRQUM5QyxhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRTFELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFjekIsSUFBSSxhQUFhLEVBQUU7WUFDZixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFSTSxtQkFBRSxHQUFULFVBQVUsSUFBUztRQUNmLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUM1QyxDQUFDO0lBUUQsOEJBQUcsR0FBSCxVQUFJLEtBQVE7UUFDUiw2QkFBNkI7UUFDN0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTVCLElBQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQ2hELElBQUksS0FBSyxFQUFFO1lBQ04sS0FBSyxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFD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Q0FBQyxDQUFDO2lCQUNyQjtZQUNMLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQscUNBQVUsR0FBVjtRQUNJLGVBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBckxELElBcUxDO0FBckxZLDRDQUFnQjtBQXVMN0IsZUFBWSxDQUFDLFlBQVksRUFBRTtJQUN2QixXQUFXLEVBQUUsZ0JBQWdCO0NBQ2hDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZVRyZWUgfSBmcm9tIFwiLi4vY2hhbmdlcy9DaGFuZ2VUcmVlXCI7XG5pbXBvcnQgeyBPUEVSQVRJT04gfSBmcm9tIFwiLi4vc3BlY1wiO1xuaW1wb3J0IHsgU2NoZW1hRGVjb2RlckNhbGxiYWNrcywgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJUeXBlIH0gZnJvbSBcIi5cIjtcblxudHlwZSBLID0gbnVtYmVyOyAvLyBUT0RPOiBhbGxvdyB0byBzcGVjaWZ5IEsgZ2VuZXJpYyBvbiBNYXBTY2hlbWEuXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uU2NoZW1hPFY9YW55PiBpbXBsZW1lbnRzIFNjaGVtYURlY29kZXJDYWxsYmFja3Mge1xuICAgIHByb3RlY3RlZCAkY2hhbmdlczogQ2hhbmdlVHJlZSA9IG5ldyBDaGFuZ2VUcmVlKHRoaXMpO1xuXG4gICAgcHJvdGVjdGVkICRpdGVtczogTWFwPG51bWJlciwgVj4gPSBuZXcgTWFwPG51bWJlciwgVj4oKTtcbiAgICBwcm90ZWN0ZWQgJGluZGV4ZXM6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xuXG4gICAgcHJvdGVjdGVkICRyZWZJZDogbnVtYmVyID0gMDtcblxuICAgIC8vXG4gICAgLy8gRGVjb2RpbmcgY2FsbGJhY2tzXG4gICAgLy9cbiAgICBwdWJsaWMgb25BZGQ/OiAoaXRlbTogViwga2V5OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgcHVibGljIG9uUmVtb3ZlPzogKGl0ZW06IFYsIGtleTogbnVtYmVyKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBvbkNoYW5nZT86IChpdGVtOiBWLCBrZXk6IG51bWJlcikgPT4gdm9pZDtcblxuICAgIHN0YXRpYyBpcyh0eXBlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbJ2NvbGxlY3Rpb24nXSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChpbml0aWFsVmFsdWVzPzogQXJyYXk8Vj4pIHtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZXMpIHtcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZXMuZm9yRWFjaCgodikgPT4gdGhpcy5hZGQodikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHZhbHVlOiBWKSB7XG4gICAgICAgIC8vIHNldCBcImluZGV4XCIgZm9yIHJlZmVyZW5jZS5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLiRyZWZJZCsrO1xuXG4gICAgICAgIGNvbnN0IGlzUmVmID0gKHZhbHVlWyckY2hhbmdlcyddKSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaXNSZWYpIHtcbiAgICAgICAgICAgICh2YWx1ZVsnJGNoYW5nZXMnXSBhcyBDaGFuZ2VUcmVlKS5zZXRQYXJlbnQodGhpcywgdGhpcy4kY2hhbmdlcy5yb290LCBpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjaGFuZ2VzLmluZGV4ZXNbaW5kZXhdID0gaW5kZXg7XG5cbiAgICAgICAgdGhpcy4kaW5kZXhlcy5zZXQoaW5kZXgsIGluZGV4KTtcbiAgICAgICAgdGhpcy4kaXRlbXMuc2V0KGluZGV4LCB2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5jaGFuZ2UoaW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBhdChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IEFycmF5LmZyb20odGhpcy4kaXRlbXMua2V5cygpKVtpbmRleF07XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuZW50cmllcygpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpdGVtOiBWKSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLiRpdGVtcy5lbnRyaWVzKCk7XG5cbiAgICAgICAgbGV0IGluZGV4OiBLO1xuICAgICAgICBsZXQgZW50cnk6IEl0ZXJhdG9yUmVzdWx0PFtudW1iZXIsIFZdPjtcbiAgICAgICAgd2hpbGUgKGVudHJ5ID0gZW50cmllcy5uZXh0KCkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5kb25lKSB7IGJyZWFrOyB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtID09PSBlbnRyeS52YWx1ZVsxXSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZW50cnkudmFsdWVbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5kZWxldGUoaW5kZXgpO1xuICAgICAgICB0aGlzLiRpbmRleGVzLmRlbGV0ZShpbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuXG4gICAgY2xlYXIoaXNEZWNvZGluZz86IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gZGlzY2FyZCBwcmV2aW91cyBvcGVyYXRpb25zLlxuICAgICAgICB0aGlzLiRjaGFuZ2VzLmRpc2NhcmQodHJ1ZSk7XG4gICAgICAgIHRoaXMuJGNoYW5nZXMuaW5kZXhlcyA9IHt9O1xuXG4gICAgICAgIC8vIGNsZWFyIHByZXZpb3VzIGluZGV4ZXNcbiAgICAgICAgdGhpcy4kaW5kZXhlcy5jbGVhcigpO1xuXG4gICAgICAgIC8vIGZsYWcgY2hpbGQgaXRlbXMgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgaWYgKGlzRGVjb2RpbmcgJiYgdHlwZW9mICh0aGlzLiRjaGFuZ2VzLmdldFR5cGUoKSkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuJGl0ZW1zLmZvckVhY2goKGl0ZW06IFYpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjaGFuZ2VzLnJvb3QucmVtb3ZlUmVmKGl0ZW1bJyRjaGFuZ2VzJ10ucmVmSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBpdGVtc1xuICAgICAgICB0aGlzLiRpdGVtcy5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuJGNoYW5nZXMub3BlcmF0aW9uKHsgaW5kZXg6IDAsIG9wOiBPUEVSQVRJT04uQ0xFQVIgfSk7XG5cbiAgICAgICAgLy8gdG91Y2ggYWxsIHN0cnVjdHVyZXMgdW50aWwgcmVhY2ggcm9vdFxuICAgICAgICB0aGlzLiRjaGFuZ2VzLnRvdWNoUGFyZW50cygpO1xuICAgIH1cblxuICAgIGhhcyAodmFsdWU6IFYpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpLnNvbWUoKHYpID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG5cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uU2NoZW1hPFY+KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuJGl0ZW1zLmZvckVhY2goKHZhbHVlLCBrZXksIF8pID0+IGNhbGxiYWNrZm4odmFsdWUsIGtleSwgdGhpcykpO1xuICAgIH1cblxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLnZhbHVlcygpO1xuICAgIH1cblxuICAgIGdldCBzaXplICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGl0ZW1zLnNpemU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEluZGV4KGluZGV4OiBudW1iZXIsIGtleTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJGluZGV4ZXMuc2V0KGluZGV4LCBrZXkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpbmRleGVzLmdldChpbmRleCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEJ5SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuZ2V0KHRoaXMuJGluZGV4ZXMuZ2V0KGluZGV4KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRlbGV0ZUJ5SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLiRpbmRleGVzLmdldChpbmRleCk7XG4gICAgICAgIHRoaXMuJGl0ZW1zLmRlbGV0ZShrZXkpO1xuICAgICAgICB0aGlzLiRpbmRleGVzLmRlbGV0ZShpbmRleCk7XG4gICAgfVxuXG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy4kaXRlbXMudmFsdWVzKCkpO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBWW10gPSBbXTtcblxuICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKFxuICAgICAgICAgICAgICAgICh0eXBlb2YgKHZhbHVlWyd0b0pTT04nXSkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgPyB2YWx1ZVsndG9KU09OJ10oKVxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gRGVjb2RpbmcgdXRpbGl0aWVzXG4gICAgLy9cbiAgICBjbG9uZShpc0RlY29kaW5nPzogYm9vbGVhbik6IENvbGxlY3Rpb25TY2hlbWE8Vj4ge1xuICAgICAgICBsZXQgY2xvbmVkOiBDb2xsZWN0aW9uU2NoZW1hO1xuXG4gICAgICAgIGlmIChpc0RlY29kaW5nKSB7XG4gICAgICAgICAgICAvLyBjbGllbnQtc2lkZVxuICAgICAgICAgICAgY2xvbmVkID0gT2JqZWN0LmFzc2lnbihuZXcgQ29sbGVjdGlvblNjaGVtYSgpLCB0aGlzKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VydmVyLXNpZGVcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG5ldyBDb2xsZWN0aW9uU2NoZW1hKCk7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlWyckY2hhbmdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lZC5hZGQodmFsdWVbJ2Nsb25lJ10oKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbG9uZWQ7XG4gICAgfVxuXG4gICAgdHJpZ2dlckFsbCAoKTogdm9pZCB7XG4gICAgICAgIFNjaGVtYS5wcm90b3R5cGUudHJpZ2dlckFsbC5hcHBseSh0aGlzKTtcbiAgICB9XG59XG5cbnJlZ2lzdGVyVHlwZShcImNvbGxlY3Rpb25cIiwge1xuICAgIGNvbnN0cnVjdG9yOiBDb2xsZWN0aW9uU2NoZW1hLFxufSk7XG4iXX0=

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSchema = void 0;
var ChangeTree_1 = __webpack_require__(3);
var spec_1 = __webpack_require__(0);
var Schema_1 = __webpack_require__(1);
var _1 = __webpack_require__(2);
var SetSchema = /** @class */ (function () {
    function SetSchema(initialValues) {
        var _this = this;
        this.$changes = new ChangeTree_1.ChangeTree(this);
        this.$items = new Map();
        this.$indexes = new Map();
        this.$refId = 0;
        if (initialValues) {
            initialValues.forEach(function (v) { return _this.add(v); });
        }
    }
    SetSchema.is = function (type) {
        return type['set'] !== undefined;
    };
    SetSchema.prototype.add = function (value) {
        if (this.has(value)) {
            return false;
        }
        // set "index" for reference.
        var index = this.$refId++;
        var isRef = (value['$changes']) !== undefined;
        if (isRef) {
            value['$changes'].setParent(this, this.$changes.root, index);
        }
        this.$changes.indexes[index] = index;
        this.$indexes.set(index, index);
        this.$items.set(index, value);
        this.$changes.change(index);
        return index;
    };
    SetSchema.prototype.entries = function () {
        return this.$items.entries();
    };
    SetSchema.prototype.delete = function (item) {
        var entries = this.$items.entries();
        var index;
        var entry;
        while (entry = entries.next()) {
            if (entry.done) {
                break;
            }
            if (item === entry.value[1]) {
                index = entry.value[0];
                break;
            }
        }
        if (index === undefined) {
            return false;
        }
        this.$changes.delete(index);
        this.$indexes.delete(index);
        return this.$items.delete(index);
    };
    SetSchema.prototype.clear = function (isDecoding) {
        var _this = this;
        // discard previous operations.
        this.$changes.discard(true);
        this.$changes.indexes = {};
        // clear previous indexes
        this.$indexes.clear();
        // flag child items for garbage collection.
        if (isDecoding && typeof (this.$changes.getType()) !== "string") {
            this.$items.forEach(function (item) {
                _this.$changes.root.removeRef(item['$changes'].refId);
            });
        }
        // clear items
        this.$items.clear();
        this.$changes.operation({ index: 0, op: spec_1.OPERATION.CLEAR });
        // touch all structures until reach root
        this.$changes.touchParents();
    };
    SetSchema.prototype.has = function (value) {
        var values = this.$items.values();
        var has = false;
        var entry;
        while (entry = values.next()) {
            if (entry.done) {
                break;
            }
            if (value === entry.value) {
                has = true;
                break;
            }
        }
        return has;
    };
    SetSchema.prototype.forEach = function (callbackfn) {
        var _this = this;
        this.$items.forEach(function (value, key, _) { return callbackfn(value, key, _this); });
    };
    SetSchema.prototype.values = function () {
        return this.$items.values();
    };
    Object.defineProperty(SetSchema.prototype, "size", {
        get: function () {
            return this.$items.size;
        },
        enumerable: false,
        configurable: true
    });
    SetSchema.prototype.setIndex = function (index, key) {
        this.$indexes.set(index, key);
    };
    SetSchema.prototype.getIndex = function (index) {
        return this.$indexes.get(index);
    };
    SetSchema.prototype.getByIndex = function (index) {
        return this.$items.get(this.$indexes.get(index));
    };
    SetSchema.prototype.deleteByIndex = function (index) {
        var key = this.$indexes.get(index);
        this.$items.delete(key);
        this.$indexes.delete(index);
    };
    SetSchema.prototype.toArray = function () {
        return Array.from(this.$items.values());
    };
    SetSchema.prototype.toJSON = function () {
        var values = [];
        this.forEach(function (value, key) {
            values.push((typeof (value['toJSON']) === "function")
                ? value['toJSON']()
                : value);
        });
        return values;
    };
    //
    // Decoding utilities
    //
    SetSchema.prototype.clone = function (isDecoding) {
        var cloned;
        if (isDecoding) {
            // client-side
            cloned = Object.assign(new SetSchema(), this);
        }
        else {
            // server-side
            var cloned_1 = new SetSchema();
            this.forEach(function (value) {
                if (value['$changes']) {
                    cloned_1.add(value['clone']());
                }
                else {
                    cloned_1.add(value);
                }
            });
        }
        return cloned;
    };
    SetSchema.prototype.triggerAll = function () {
        Schema_1.Schema.prototype.triggerAll.apply(this);
    };
    return SetSchema;
}());
exports.SetSchema = SetSchema;
_1.registerType("set", {
    constructor: SetSchema,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0U2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL1NldFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBbUQ7QUFDbkQsZ0NBQW9DO0FBQ3BDLG9DQUEyRDtBQUMzRCxzQkFBaUM7QUFJakM7SUFtQkksbUJBQWEsYUFBd0I7UUFBckMsaUJBSUM7UUF0QlMsYUFBUSxHQUFlLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QyxXQUFNLEdBQW1CLElBQUksR0FBRyxFQUFhLENBQUM7UUFDOUMsYUFBUSxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUUxRCxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBY3pCLElBQUksYUFBYSxFQUFFO1lBQ2YsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBUk0sWUFBRSxHQUFULFVBQVUsSUFBUztRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBUUQsdUJBQUcsR0FBSCxVQUFJLEtBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCw2QkFBNkI7UUFDN0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTVCLElBQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQ2hELElBQUksS0FBSyxFQUFFO1lBQ04sS0FBSyxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FB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QztxQkFBTTtvQkFDSCxRQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyQjtZQUNMLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLGVBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBak1ELElBaU1DO0FBak1ZLDhCQUFTO0FBbU10QixlQUFZLENBQUMsS0FBSyxFQUFFO0lBQ2hCLFdBQVcsRUFBRSxTQUFTO0NBQ3pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZVRyZWUgfSBmcm9tIFwiLi4vY2hhbmdlcy9DaGFuZ2VUcmVlXCI7XG5pbXBvcnQgeyBPUEVSQVRJT04gfSBmcm9tIFwiLi4vc3BlY1wiO1xuaW1wb3J0IHsgU2NoZW1hRGVjb2RlckNhbGxiYWNrcywgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJUeXBlIH0gZnJvbSBcIi5cIjtcblxudHlwZSBLID0gbnVtYmVyOyAvLyBUT0RPOiBhbGxvdyB0byBzcGVjaWZ5IEsgZ2VuZXJpYyBvbiBNYXBTY2hlbWEuXG5cbmV4cG9ydCBjbGFzcyBTZXRTY2hlbWE8Vj1hbnk+IGltcGxlbWVudHMgU2NoZW1hRGVjb2RlckNhbGxiYWNrcyB7XG4gICAgcHJvdGVjdGVkICRjaGFuZ2VzOiBDaGFuZ2VUcmVlID0gbmV3IENoYW5nZVRyZWUodGhpcyk7XG5cbiAgICBwcm90ZWN0ZWQgJGl0ZW1zOiBNYXA8bnVtYmVyLCBWPiA9IG5ldyBNYXA8bnVtYmVyLCBWPigpO1xuICAgIHByb3RlY3RlZCAkaW5kZXhlczogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgICBwcm90ZWN0ZWQgJHJlZklkOiBudW1iZXIgPSAwO1xuXG4gICAgLy9cbiAgICAvLyBEZWNvZGluZyBjYWxsYmFja3NcbiAgICAvL1xuICAgIHB1YmxpYyBvbkFkZD86IChpdGVtOiBWLCBrZXk6IG51bWJlcikgPT4gdm9pZDtcbiAgICBwdWJsaWMgb25SZW1vdmU/OiAoaXRlbTogViwga2V5OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgcHVibGljIG9uQ2hhbmdlPzogKGl0ZW06IFYsIGtleTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gICAgc3RhdGljIGlzKHR5cGU6IGFueSkge1xuICAgICAgICByZXR1cm4gdHlwZVsnc2V0J10gIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoaW5pdGlhbFZhbHVlcz86IEFycmF5PFY+KSB7XG4gICAgICAgIGlmIChpbml0aWFsVmFsdWVzKSB7XG4gICAgICAgICAgICBpbml0aWFsVmFsdWVzLmZvckVhY2goKHYpID0+IHRoaXMuYWRkKHYpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZCh2YWx1ZTogVikge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgXCJpbmRleFwiIGZvciByZWZlcmVuY2UuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy4kcmVmSWQrKztcblxuICAgICAgICBjb25zdCBpc1JlZiA9ICh2YWx1ZVsnJGNoYW5nZXMnXSkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGlzUmVmKSB7XG4gICAgICAgICAgICAodmFsdWVbJyRjaGFuZ2VzJ10gYXMgQ2hhbmdlVHJlZSkuc2V0UGFyZW50KHRoaXMsIHRoaXMuJGNoYW5nZXMucm9vdCwgaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5pbmRleGVzW2luZGV4XSA9IGluZGV4O1xuXG4gICAgICAgIHRoaXMuJGluZGV4ZXMuc2V0KGluZGV4LCBpbmRleCk7XG4gICAgICAgIHRoaXMuJGl0ZW1zLnNldChpbmRleCwgdmFsdWUpO1xuXG4gICAgICAgIHRoaXMuJGNoYW5nZXMuY2hhbmdlKGluZGV4KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZW50cmllcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcy5lbnRyaWVzKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGl0ZW06IFYpIHtcbiAgICAgICAgY29uc3QgZW50cmllcyA9IHRoaXMuJGl0ZW1zLmVudHJpZXMoKTtcblxuICAgICAgICBsZXQgaW5kZXg6IEs7XG4gICAgICAgIGxldCBlbnRyeTogSXRlcmF0b3JSZXN1bHQ8W251bWJlciwgVl0+O1xuICAgICAgICB3aGlsZSAoZW50cnkgPSBlbnRyaWVzLm5leHQoKSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmRvbmUpIHsgYnJlYWs7IH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IGVudHJ5LnZhbHVlWzFdKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBlbnRyeS52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjaGFuZ2VzLmRlbGV0ZShpbmRleCk7XG4gICAgICAgIHRoaXMuJGluZGV4ZXMuZGVsZXRlKGluZGV4KTtcblxuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuZGVsZXRlKGluZGV4KTtcbiAgICB9XG5cbiAgICBjbGVhcihpc0RlY29kaW5nPzogYm9vbGVhbikge1xuICAgICAgICAvLyBkaXNjYXJkIHByZXZpb3VzIG9wZXJhdGlvbnMuXG4gICAgICAgIHRoaXMuJGNoYW5nZXMuZGlzY2FyZCh0cnVlKTtcbiAgICAgICAgdGhpcy4kY2hhbmdlcy5pbmRleGVzID0ge307XG5cbiAgICAgICAgLy8gY2xlYXIgcHJldmlvdXMgaW5kZXhlc1xuICAgICAgICB0aGlzLiRpbmRleGVzLmNsZWFyKCk7XG5cbiAgICAgICAgLy8gZmxhZyBjaGlsZCBpdGVtcyBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICBpZiAoaXNEZWNvZGluZyAmJiB0eXBlb2YgKHRoaXMuJGNoYW5nZXMuZ2V0VHlwZSgpKSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy4kaXRlbXMuZm9yRWFjaCgoaXRlbTogVikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNoYW5nZXMucm9vdC5yZW1vdmVSZWYoaXRlbVsnJGNoYW5nZXMnXS5yZWZJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIGl0ZW1zXG4gICAgICAgIHRoaXMuJGl0ZW1zLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy4kY2hhbmdlcy5vcGVyYXRpb24oeyBpbmRleDogMCwgb3A6IE9QRVJBVElPTi5DTEVBUiB9KTtcblxuICAgICAgICAvLyB0b3VjaCBhbGwgc3RydWN0dXJlcyB1bnRpbCByZWFjaCByb290XG4gICAgICAgIHRoaXMuJGNoYW5nZXMudG91Y2hQYXJlbnRzKCk7XG4gICAgfVxuXG4gICAgaGFzICh2YWx1ZTogVik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLiRpdGVtcy52YWx1ZXMoKTtcblxuICAgICAgICBsZXQgaGFzID0gZmFsc2U7XG4gICAgICAgIGxldCBlbnRyeTogSXRlcmF0b3JSZXN1bHQ8Vj47XG5cbiAgICAgICAgd2hpbGUgKGVudHJ5ID0gdmFsdWVzLm5leHQoKSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmRvbmUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZW50cnkudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBoYXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhhcztcbiAgICB9XG5cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBjb2xsZWN0aW9uOiBTZXRTY2hlbWE8Vj4pID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy4kaXRlbXMuZm9yRWFjaCgodmFsdWUsIGtleSwgXykgPT4gY2FsbGJhY2tmbih2YWx1ZSwga2V5LCB0aGlzKSk7XG4gICAgfVxuXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMudmFsdWVzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXRlbXMuc2l6ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0SW5kZXgoaW5kZXg6IG51bWJlciwga2V5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kaW5kZXhlcy5zZXQoaW5kZXgsIGtleSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluZGV4ZXMuZ2V0KGluZGV4KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QnlJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpdGVtcy5nZXQodGhpcy4kaW5kZXhlcy5nZXQoaW5kZXgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGVsZXRlQnlJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuJGluZGV4ZXMuZ2V0KGluZGV4KTtcbiAgICAgICAgdGhpcy4kaXRlbXMuZGVsZXRlKGtleSk7XG4gICAgICAgIHRoaXMuJGluZGV4ZXMuZGVsZXRlKGluZGV4KTtcbiAgICB9XG5cbiAgICB0b0FycmF5KCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLiRpdGVtcy52YWx1ZXMoKSk7XG4gICAgfVxuXG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCB2YWx1ZXM6IFZbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzLnB1c2goXG4gICAgICAgICAgICAgICAgKHR5cGVvZiAodmFsdWVbJ3RvSlNPTiddKSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgICAgICA/IHZhbHVlWyd0b0pTT04nXSgpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBEZWNvZGluZyB1dGlsaXRpZXNcbiAgICAvL1xuICAgIGNsb25lKGlzRGVjb2Rpbmc/OiBib29sZWFuKTogU2V0U2NoZW1hPFY+IHtcbiAgICAgICAgbGV0IGNsb25lZDogU2V0U2NoZW1hO1xuXG4gICAgICAgIGlmIChpc0RlY29kaW5nKSB7XG4gICAgICAgICAgICAvLyBjbGllbnQtc2lkZVxuICAgICAgICAgICAgY2xvbmVkID0gT2JqZWN0LmFzc2lnbihuZXcgU2V0U2NoZW1hKCksIHRoaXMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXJ2ZXItc2lkZVxuICAgICAgICAgICAgY29uc3QgY2xvbmVkID0gbmV3IFNldFNjaGVtYSgpO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVsnJGNoYW5nZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9uZWQuYWRkKHZhbHVlWydjbG9uZSddKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lZC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cblxuICAgIHRyaWdnZXJBbGwgKCk6IHZvaWQge1xuICAgICAgICBTY2hlbWEucHJvdG90eXBlLnRyaWdnZXJBbGwuYXBwbHkodGhpcyk7XG4gICAgfVxufVxuXG5yZWdpc3RlclR5cGUoXCJzZXRcIiwge1xuICAgIGNvbnN0cnVjdG9yOiBTZXRTY2hlbWEsXG59KTtcbiJdfQ==

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = exports.FossilDeltaSerializer = exports.registerSerializer = void 0;
__webpack_require__(19);
var Client_1 = __webpack_require__(20);
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Protocol_1 = __webpack_require__(11);
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return Protocol_1.Protocol; } });
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return Protocol_1.ErrorCode; } });
var Room_1 = __webpack_require__(8);
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return Room_1.Room; } });
var Auth_1 = __webpack_require__(14);
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_1.Auth; } });
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return Auth_1.Platform; } });
/*
 * Serializers
 */
var FossilDeltaSerializer_1 = __webpack_require__(32);
Object.defineProperty(exports, "FossilDeltaSerializer", { enumerable: true, get: function () { return FossilDeltaSerializer_1.FossilDeltaSerializer; } });
var SchemaSerializer_1 = __webpack_require__(37);
Object.defineProperty(exports, "SchemaSerializer", { enumerable: true, get: function () { return SchemaSerializer_1.SchemaSerializer; } });
var NoneSerializer_1 = __webpack_require__(42);
var Serializer_1 = __webpack_require__(10);
Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function () { return Serializer_1.registerSerializer; } });
Serializer_1.registerSerializer('fossil-delta', FossilDeltaSerializer_1.FossilDeltaSerializer);
Serializer_1.registerSerializer('schema', SchemaSerializer_1.SchemaSerializer);
Serializer_1.registerSerializer('none', NoneSerializer_1.NoneSerializer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0JBQWtCO0FBRWxCLG1DQUErQztBQUF0QyxnR0FBQSxNQUFNLE9BQUE7QUFDZix1Q0FBaUQ7QUFBeEMsb0dBQUEsUUFBUSxPQUFBO0FBQUUscUdBQUEsU0FBUyxPQUFBO0FBQzVCLCtCQUE2QztBQUFwQyw0RkFBQSxJQUFJLE9BQUE7QUFFYiwrQkFBZ0Q7QUFBdkMsNEZBQUEsSUFBSSxPQUFBO0FBQUUsZ0dBQUEsUUFBUSxPQUFBO0FBRXZCOztHQUVHO0FBRUgsNEVBQTJFO0FBSzlDLHNHQUxwQiw2Q0FBcUIsT0FLb0I7QUFKbEQsa0VBQWlFO0FBSWIsaUdBSjNDLG1DQUFnQixPQUkyQztBQUhwRSw4REFBNkQ7QUFDN0Qsc0RBQTZEO0FBRXBELG1HQUZBLCtCQUFrQixPQUVBO0FBQzNCLCtCQUFrQixDQUFDLGNBQWMsRUFBRSw2Q0FBcUIsQ0FBQyxDQUFDO0FBQzFELCtCQUFrQixDQUFDLFFBQVEsRUFBRSxtQ0FBZ0IsQ0FBQyxDQUFDO0FBQy9DLCtCQUFrQixDQUFDLE1BQU0sRUFBRSwrQkFBYyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vbGVnYWN5JztcblxuZXhwb3J0IHsgQ2xpZW50LCBKb2luT3B0aW9ucyB9IGZyb20gJy4vQ2xpZW50JztcbmV4cG9ydCB7IFByb3RvY29sLCBFcnJvckNvZGUgfSBmcm9tICcuL1Byb3RvY29sJztcbmV4cG9ydCB7IFJvb20sIFJvb21BdmFpbGFibGUgfSBmcm9tICcuL1Jvb20nO1xuZXhwb3J0IHsgRGF0YUNoYW5nZSB9IGZyb20gJ0BnYW1lc3RkaW8vc3RhdGUtbGlzdGVuZXInO1xuZXhwb3J0IHsgQXV0aCwgUGxhdGZvcm0sIERldmljZSB9IGZyb20gXCIuL0F1dGhcIjtcblxuLypcbiAqIFNlcmlhbGl6ZXJzXG4gKi9cblxuaW1wb3J0IHsgRm9zc2lsRGVsdGFTZXJpYWxpemVyIH0gZnJvbSAnLi9zZXJpYWxpemVyL0Zvc3NpbERlbHRhU2VyaWFsaXplcic7XG5pbXBvcnQgeyBTY2hlbWFTZXJpYWxpemVyIH0gZnJvbSBcIi4vc2VyaWFsaXplci9TY2hlbWFTZXJpYWxpemVyXCI7XG5pbXBvcnQgeyBOb25lU2VyaWFsaXplciB9IGZyb20gXCIuL3NlcmlhbGl6ZXIvTm9uZVNlcmlhbGl6ZXJcIjtcbmltcG9ydCB7IHJlZ2lzdGVyU2VyaWFsaXplciB9IGZyb20gJy4vc2VyaWFsaXplci9TZXJpYWxpemVyJztcblxuZXhwb3J0IHsgcmVnaXN0ZXJTZXJpYWxpemVyLCBGb3NzaWxEZWx0YVNlcmlhbGl6ZXIsIFNjaGVtYVNlcmlhbGl6ZXIgfTtcbnJlZ2lzdGVyU2VyaWFsaXplcignZm9zc2lsLWRlbHRhJywgRm9zc2lsRGVsdGFTZXJpYWxpemVyKTtcbnJlZ2lzdGVyU2VyaWFsaXplcignc2NoZW1hJywgU2NoZW1hU2VyaWFsaXplcik7XG5yZWdpc3RlclNlcmlhbGl6ZXIoJ25vbmUnLCBOb25lU2VyaWFsaXplcik7XG4iXX0=

/***/ }),
/* 19 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xlZ2FjeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxFQUFFO0FBQ0Ysb0NBQW9DO0FBQ3BDLEVBQUU7QUFFRjs7R0FFRztBQUNILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO0lBQ3JCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBQyxDQUFNO1FBQ3hCLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksV0FBVyxDQUFDO0lBQ3BGLENBQUMsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIFBvbHlmaWxscyBmb3IgbGVnYWN5IGVudmlyb25tZW50c1xuLy9cblxuLypcbiAqIFN1cHBvcnQgQW5kcm9pZCA0LjQueFxuICovXG5pZiAoIUFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIEFycmF5QnVmZmVyLmlzVmlldyA9IChhOiBhbnkpOiBhIGlzIEFycmF5QnVmZmVyVmlldyA9PiB7XG4gICAgICAgIHJldHVybiBhICE9PSBudWxsICYmIHR5cGVvZiAoYSkgPT09ICdvYmplY3QnICYmIGEuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG4gICAgfTtcbn1cbiJdfQ==

/***/ }),
/* 20 */
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
var http_1 = __webpack_require__(7);
var ServerError_1 = __webpack_require__(21);
var Room_1 = __webpack_require__(8);
var Auth_1 = __webpack_require__(14);
var Push_1 = __webpack_require__(31);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTJDO0FBRTNDLG9EQUFtRDtBQUNuRCwrQkFBNkM7QUFDN0MsK0JBQThCO0FBQzlCLCtCQUE4QjtBQUs5QjtJQUFvQyxrQ0FBSztJQUVyQyx3QkFBWSxPQUFlLEVBQUUsSUFBWTtRQUF6QyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUdqQjtRQUZHLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDMUQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQVBELENBQW9DLEtBQUssR0FPeEM7QUFQWSx3Q0FBYztBQVMzQjtJQVFJLGdCQUFZLFFBQThIO1FBQTlILHlCQUFBLEVBQUEsV0FBc0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFLLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLE1BQUksUUFBUSxDQUFDLElBQU0sQ0FBRztRQUN0SSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRVksNkJBQVksR0FBekIsVUFBNkIsUUFBZ0IsRUFBRSxPQUF5QixFQUFFLFVBQWlDO1FBQTVELHdCQUFBLEVBQUEsWUFBeUI7Ozs7NEJBQzdELHFCQUFNLElB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QWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDaEQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEtBQUssSUFBTSxNQUFJLElBQUksT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQUksQ0FBQyxFQUFFO2dCQUMvQixTQUFTO2FBQ1o7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFJLE1BQUksU0FBSSxPQUFPLENBQUMsTUFBSSxDQUFHLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQVUsSUFBSSxDQUFDLFFBQVEsU0FBSSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxNQUFNLFNBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQztJQUNuRixDQUFDO0lBRUwsYUFBQztBQUFELENBQUMsQUF4R0QsSUF3R0M7QUF4R1ksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwb3N0LCBnZXQgfSBmcm9tIFwiQGNvbHlzZXVzL2h0dHBcIjtcblxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tICcuL2Vycm9ycy9TZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyBSb29tLCBSb29tQXZhaWxhYmxlIH0gZnJvbSAnLi9Sb29tJztcbmltcG9ydCB7IEF1dGggfSBmcm9tICcuL0F1dGgnO1xuaW1wb3J0IHsgUHVzaCB9IGZyb20gJy4vUHVzaCc7XG5pbXBvcnQgeyBTY2hlbWFDb25zdHJ1Y3RvciB9IGZyb20gJy4vc2VyaWFsaXplci9TY2hlbWFTZXJpYWxpemVyJztcblxuZXhwb3J0IHR5cGUgSm9pbk9wdGlvbnMgPSBhbnk7XG5cbmV4cG9ydCBjbGFzcyBNYXRjaE1ha2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBjb2RlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBNYXRjaE1ha2VFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsaWVudCB7XG4gICAgLy8gc3RhdGljIFZFUlNJT04gPSBwcm9jZXNzLmVudi5WRVJTSU9OO1xuXG4gICAgcHVibGljIGF1dGg6IEF1dGg7XG4gICAgcHVibGljIHB1c2g6IFB1c2g7XG5cbiAgICBwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGVuZHBvaW50OiBzdHJpbmcgPSBgJHtsb2NhdGlvbi5wcm90b2NvbC5yZXBsYWNlKFwiaHR0cFwiLCBcIndzXCIpfS8vJHtsb2NhdGlvbi5ob3N0bmFtZX0keyhsb2NhdGlvbi5wb3J0ICYmIGA6JHtsb2NhdGlvbi5wb3J0fWApfWApIHtcbiAgICAgICAgdGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCh0aGlzLmVuZHBvaW50KTtcbiAgICAgICAgdGhpcy5wdXNoID0gbmV3IFB1c2godGhpcy5lbmRwb2ludCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGpvaW5PckNyZWF0ZTxUPihyb29tTmFtZTogc3RyaW5nLCBvcHRpb25zOiBKb2luT3B0aW9ucyA9IHt9LCByb290U2NoZW1hPzogU2NoZW1hQ29uc3RydWN0b3I8VD4pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY3JlYXRlTWF0Y2hNYWtlUmVxdWVzdDxUPignam9pbk9yQ3JlYXRlJywgcm9vbU5hbWUsIG9wdGlvbnMsIHJvb3RTY2hlbWEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGU8VD4ocm9vbU5hbWU6IHN0cmluZywgb3B0aW9uczogSm9pbk9wdGlvbnMgPSB7fSwgcm9vdFNjaGVtYT86IFNjaGVtYUNvbnN0cnVjdG9yPFQ+KSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNyZWF0ZU1hdGNoTWFrZVJlcXVlc3Q8VD4oJ2NyZWF0ZScsIHJvb21OYW1lLCBvcHRpb25zLCByb290U2NoZW1hKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgam9pbjxUPihyb29tTmFtZTogc3RyaW5nLCBvcHRpb25zOiBKb2luT3B0aW9ucyA9IHt9LCByb290U2NoZW1hPzogU2NoZW1hQ29uc3RydWN0b3I8VD4pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY3JlYXRlTWF0Y2hNYWtlUmVxdWVzdDxUPignam9pbicsIHJvb21OYW1lLCBvcHRpb25zLCByb290U2NoZW1hKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgam9pbkJ5SWQ8VD4ocm9vbUlkOiBzdHJpbmcsIG9wdGlvbnM6IEpvaW5PcHRpb25zID0ge30sIHJvb3RTY2hlbWE/OiBTY2hlbWFDb25zdHJ1Y3RvcjxUPikge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jcmVhdGVNYXRjaE1ha2VSZXF1ZXN0PFQ+KCdqb2luQnlJZCcsIHJvb21JZCwgb3B0aW9ucywgcm9vdFNjaGVtYSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlY29ubmVjdDxUPihyb29tSWQ6IHN0cmluZywgc2Vzc2lvbklkOiBzdHJpbmcsIHJvb3RTY2hlbWE/OiBTY2hlbWFDb25zdHJ1Y3RvcjxUPikge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jcmVhdGVNYXRjaE1ha2VSZXF1ZXN0PFQ+KCdqb2luQnlJZCcsIHJvb21JZCwgeyBzZXNzaW9uSWQgfSwgcm9vdFNjaGVtYSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldEF2YWlsYWJsZVJvb21zPE1ldGFkYXRhPSBhbnk+KHJvb21OYW1lOiBzdHJpbmcgPSBcIlwiKTogUHJvbWlzZTxSb29tQXZhaWxhYmxlPE1ldGFkYXRhPltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuZW5kcG9pbnQucmVwbGFjZShcIndzXCIsIFwiaHR0cFwiKX0vbWF0Y2htYWtlLyR7cm9vbU5hbWV9YDtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBnZXQodXJsLCB7IGhlYWRlcnM6IHsgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pKS5kYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjb25zdW1lU2VhdFJlc2VydmF0aW9uPFQ+KHJlc3BvbnNlOiBhbnksIHJvb3RTY2hlbWE/OiBTY2hlbWFDb25zdHJ1Y3RvcjxUPik6IFByb21pc2U8Um9vbTxUPj4ge1xuICAgICAgICBjb25zdCByb29tID0gdGhpcy5jcmVhdGVSb29tPFQ+KHJlc3BvbnNlLnJvb20ubmFtZSwgcm9vdFNjaGVtYSk7XG4gICAgICAgIHJvb20uaWQgPSByZXNwb25zZS5yb29tLnJvb21JZDtcbiAgICAgICAgcm9vbS5zZXNzaW9uSWQgPSByZXNwb25zZS5zZXNzaW9uSWQ7XG5cbiAgICAgICAgcm9vbS5jb25uZWN0KHRoaXMuYnVpbGRFbmRwb2ludChyZXNwb25zZS5yb29tLCB7IHNlc3Npb25JZDogcm9vbS5zZXNzaW9uSWQgfSkpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbkVycm9yID0gKGNvZGUsIG1lc3NhZ2UpID0+IHJlamVjdChuZXcgU2VydmVyRXJyb3IoY29kZSwgbWVzc2FnZSkpO1xuICAgICAgICAgICAgcm9vbS5vbkVycm9yLm9uY2Uob25FcnJvcik7XG5cbiAgICAgICAgICAgIHJvb20ub25Kb2luLm9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJvb20ub25FcnJvci5yZW1vdmUob25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyb29tKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgY3JlYXRlTWF0Y2hNYWtlUmVxdWVzdDxUPihcbiAgICAgICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgICAgIHJvb21OYW1lOiBzdHJpbmcsXG4gICAgICAgIG9wdGlvbnM6IEpvaW5PcHRpb25zID0ge30sXG4gICAgICAgIHJvb3RTY2hlbWE/OiBTY2hlbWFDb25zdHJ1Y3RvcjxUPlxuICAgICkge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmVuZHBvaW50LnJlcGxhY2UoXCJ3c1wiLCBcImh0dHBcIil9L21hdGNobWFrZS8ke21ldGhvZH0vJHtyb29tTmFtZX1gO1xuXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZm9yd2FyZCBhdXRoIHRva2VuLCBpZiBwcmVzZW50XG4gICAgICAgIGlmICh0aGlzLmF1dGguaGFzVG9rZW4pIHtcbiAgICAgICAgICAgIG9wdGlvbnMudG9rZW4gPSB0aGlzLmF1dGgudG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IChcbiAgICAgICAgICAgIGF3YWl0IHBvc3QodXJsLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5kYXRhO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1hdGNoTWFrZUVycm9yKHJlc3BvbnNlLmVycm9yLCByZXNwb25zZS5jb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN1bWVTZWF0UmVzZXJ2YXRpb248VD4ocmVzcG9uc2UsIHJvb3RTY2hlbWEpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVSb29tPFQ+KHJvb21OYW1lOiBzdHJpbmcsIHJvb3RTY2hlbWE/OiBTY2hlbWFDb25zdHJ1Y3RvcjxUPikge1xuICAgICAgICByZXR1cm4gbmV3IFJvb208VD4ocm9vbU5hbWUsIHJvb3RTY2hlbWEpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBidWlsZEVuZHBvaW50KHJvb206IGFueSwgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyYW1zLnB1c2goYCR7bmFtZX09JHtvcHRpb25zW25hbWVdfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZW5kcG9pbnR9LyR7cm9vbS5wcm9jZXNzSWR9LyR7cm9vbS5yb29tSWR9PyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIH1cblxufVxuIl19

/***/ }),
/* 21 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL1NlcnZlckVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUFpQywrQkFBSztJQUdwQyxxQkFBWSxJQUFZLEVBQUUsT0FBZTtRQUF6QyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUlmO1FBRkMsS0FBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7UUFDMUIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0lBQ25CLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFURCxDQUFpQyxLQUFLLEdBU3JDO0FBVFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIGNvZGU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJTZXJ2ZXJFcnJvclwiO1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gIH1cbn1cbiJdfQ==

/***/ }),
/* 22 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21zZ3BhY2svZGVjb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHOztBQUVIOzs7Ozs7R0FNRztBQUVILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNO0lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLElBQUksTUFBTSxZQUFZLFdBQVcsRUFBRTtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQztTQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pGO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDdkM7QUFDTCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQ2xDLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJ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LENBQUM7UUFDN0IsS0FBSyxJQUFJO1lBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0IsTUFBTTtRQUNOLEtBQUssSUFBSTtZQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckMsS0FBSyxJQUFJO1lBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyQyxLQUFLLElBQUk7WUFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUks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SUFBVix1QkFBQSxFQUFBLFVBQVU7SUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztLQUM5RTtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCBJb24gRHJpdmUgU29mdHdhcmUgTHRkLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2RhcnJhY2hlcXVlc25lL25vdGVwYWNrL1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBQYXRjaCBmb3IgQ29seXNldXM6XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogYWRkZWQgYG9mZnNldGAgb24gRGVjb2RlciBjb25zdHJ1Y3RvciwgZm9yIG1lc3NhZ2VzIGFycml2aW5nIHdpdGggYSBjb2RlXG4gKiBiZWZvcmUgYWN0dWFsIG1zZ3BhY2sgZGF0YVxuICovXG5cbmZ1bmN0aW9uIERlY29kZXIoYnVmZmVyLCBvZmZzZXQpIHtcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5fdmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLl9idWZmZXIpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJ1ZmZlcikpIHtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gYnVmZmVyLmJ1ZmZlcjtcbiAgICAgICAgdGhpcy5fdmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLl9idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1dGY4UmVhZCh2aWV3LCBvZmZzZXQsIGxlbmd0aCkge1xuICAgIHZhciBzdHJpbmcgPSAnJywgY2hyID0gMDtcbiAgICBmb3IgKHZhciBpID0gb2Zmc2V0LCBlbmQgPSBvZmZzZXQgKyBsZW5ndGg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICB2YXIgYnl0ZSA9IHZpZXcuZ2V0VWludDgoaSk7XG4gICAgICAgIGlmICgoYnl0ZSAmIDB4ODApID09PSAweDAwKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYnl0ZSAmIDB4ZTApID09PSAweGMwKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAgICAgICAoKGJ5dGUgJiAweDFmKSA8PCA2KSB8XG4gICAgICAgICAgICAgICAgKHZpZXcuZ2V0VWludDgoKytpKSAmIDB4M2YpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChieXRlICYgMHhmMCkgPT09IDB4ZTApIHtcbiAgICAgICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgICAgICAgICgoYnl0ZSAmIDB4MGYpIDw8IDEyKSB8XG4gICAgICAgICAgICAgICAgKCh2aWV3LmdldFVpbnQ4KCsraSkgJiAweDNmKSA8PCA2KSB8XG4gICAgICAgICAgICAgICAgKCh2aWV3LmdldFVpbnQ4KCsraSkgJiAweDNmKSA8PCAwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoYnl0ZSAmIDB4ZjgpID09PSAweGYwKSB7XG4gICAgICAgICAgICBjaHIgPSAoKGJ5dGUgJiAweDA3KSA8PCAxOCkgfFxuICAgICAgICAgICAgICAgICgodmlldy5nZXRVaW50OCgrK2kpICYgMHgzZikgPDwgMTIpIHxcbiAgICAgICAgICAgICAgICAoKHZpZXcuZ2V0VWludDgoKytpKSAmIDB4M2YpIDw8IDYpIHxcbiAgICAgICAgICAgICAgICAoKHZpZXcuZ2V0VWludDgoKytpKSAmIDB4M2YpIDw8IDApO1xuICAgICAgICAgICAgaWYgKGNociA+PSAweDAxMDAwMCkgeyAvLyBzdXJyb2dhdGUgcGFpclxuICAgICAgICAgICAgICAgIGNociAtPSAweDAxMDAwMDtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoY2hyID4+PiAxMCkgKyAweEQ4MDAsIChjaHIgJiAweDNGRikgKyAweERDMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGJ5dGUgJyArIGJ5dGUudG9TdHJpbmcoMTYpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuX2FycmF5ID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWVbaV0gPSB0aGlzLl9wYXJzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5EZWNvZGVyLnByb3RvdHlwZS5fbWFwID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSAnJywgdmFsdWUgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IHRoaXMuX3BhcnNlKCk7XG4gICAgICAgIHZhbHVlW2tleV0gPSB0aGlzLl9wYXJzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5EZWNvZGVyLnByb3RvdHlwZS5fc3RyID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IHV0ZjhSZWFkKHRoaXMuX3ZpZXcsIHRoaXMuX29mZnNldCwgbGVuZ3RoKTtcbiAgICB0aGlzLl9vZmZzZXQgKz0gbGVuZ3RoO1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLl9iaW4gPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5fYnVmZmVyLnNsaWNlKHRoaXMuX29mZnNldCwgdGhpcy5fb2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICB0aGlzLl9vZmZzZXQgKz0gbGVuZ3RoO1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLl9wYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJlZml4ID0gdGhpcy5fdmlldy5nZXRVaW50OCh0aGlzLl9vZmZzZXQrKyk7XG4gICAgdmFyIHZhbHVlLCBsZW5ndGggPSAwLCB0eXBlID0gMCwgaGkgPSAwLCBsbyA9IDA7XG5cbiAgICBpZiAocHJlZml4IDwgMHhjMCkge1xuICAgICAgICAvLyBwb3NpdGl2ZSBmaXhpbnRcbiAgICAgICAgaWYgKHByZWZpeCA8IDB4ODApIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZml4bWFwXG4gICAgICAgIGlmIChwcmVmaXggPCAweDkwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwKHByZWZpeCAmIDB4MGYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZpeGFycmF5XG4gICAgICAgIGlmIChwcmVmaXggPCAweGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkocHJlZml4ICYgMHgwZik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZml4c3RyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdHIocHJlZml4ICYgMHgxZik7XG4gICAgfVxuXG4gICAgLy8gbmVnYXRpdmUgZml4aW50XG4gICAgaWYgKHByZWZpeCA+IDB4ZGYpIHtcbiAgICAgICAgcmV0dXJuICgweGZmIC0gcHJlZml4ICsgMSkgKiAtMTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHByZWZpeCkge1xuICAgICAgICAvLyBuaWxcbiAgICAgICAgY2FzZSAweGMwOlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIGZhbHNlXG4gICAgICAgIGNhc2UgMHhjMjpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gdHJ1ZVxuICAgICAgICBjYXNlIDB4YzM6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAvLyBiaW5cbiAgICAgICAgY2FzZSAweGM0OlxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fdmlldy5nZXRVaW50OCh0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmluKGxlbmd0aCk7XG4gICAgICAgIGNhc2UgMHhjNTpcbiAgICAgICAgICAgIGxlbmd0aCA9IHRoaXMuX3ZpZXcuZ2V0VWludDE2KHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gMjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iaW4obGVuZ3RoKTtcbiAgICAgICAgY2FzZSAweGM2OlxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fdmlldy5nZXRVaW50MzIodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSA0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JpbihsZW5ndGgpO1xuXG4gICAgICAgIC8vIGV4dFxuICAgICAgICBjYXNlIDB4Yzc6XG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl92aWV3LmdldFVpbnQ4KHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0eXBlID0gdGhpcy5fdmlldy5nZXRJbnQ4KHRoaXMuX29mZnNldCArIDEpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDI7XG4gICAgICAgICAgICByZXR1cm4gW3R5cGUsIHRoaXMuX2JpbihsZW5ndGgpXTtcbiAgICAgICAgY2FzZSAweGM4OlxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fdmlldy5nZXRVaW50MTYodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLl92aWV3LmdldEludDgodGhpcy5fb2Zmc2V0ICsgMik7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gMztcbiAgICAgICAgICAgIHJldHVybiBbdHlwZSwgdGhpcy5fYmluKGxlbmd0aCldO1xuICAgICAgICBjYXNlIDB4Yzk6XG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl92aWV3LmdldFVpbnQzMih0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdHlwZSA9IHRoaXMuX3ZpZXcuZ2V0SW50OCh0aGlzLl9vZmZzZXQgKyA0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSA1O1xuICAgICAgICAgICAgcmV0dXJuIFt0eXBlLCB0aGlzLl9iaW4obGVuZ3RoKV07XG5cbiAgICAgICAgLy8gZmxvYXRcbiAgICAgICAgY2FzZSAweGNhOlxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl92aWV3LmdldEZsb2F0MzIodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSA0O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBjYXNlIDB4Y2I6XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3ZpZXcuZ2V0RmxvYXQ2NCh0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgLy8gdWludFxuICAgICAgICBjYXNlIDB4Y2M6XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3ZpZXcuZ2V0VWludDgodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBjYXNlIDB4Y2Q6XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3ZpZXcuZ2V0VWludDE2KHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gMjtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgY2FzZSAweGNlOlxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl92aWV3LmdldFVpbnQzMih0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNhc2UgMHhjZjpcbiAgICAgICAgICAgIGhpID0gdGhpcy5fdmlldy5nZXRVaW50MzIodGhpcy5fb2Zmc2V0KSAqIE1hdGgucG93KDIsIDMyKTtcbiAgICAgICAgICAgIGxvID0gdGhpcy5fdmlldy5nZXRVaW50MzIodGhpcy5fb2Zmc2V0ICsgNCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gODtcbiAgICAgICAgICAgIHJldHVybiBoaSArIGxvO1xuXG4gICAgICAgIC8vIGludFxuICAgICAgICBjYXNlIDB4ZDA6XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3ZpZXcuZ2V0SW50OCh0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNhc2UgMHhkMTpcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fdmlldy5nZXRJbnQxNih0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDI7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNhc2UgMHhkMjpcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fdmlldy5nZXRJbnQzMih0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNhc2UgMHhkMzpcbiAgICAgICAgICAgIGhpID0gdGhpcy5fdmlldy5nZXRJbnQzMih0aGlzLl9vZmZzZXQpICogTWF0aC5wb3coMiwgMzIpO1xuICAgICAgICAgICAgbG8gPSB0aGlzLl92aWV3LmdldFVpbnQzMih0aGlzLl9vZmZzZXQgKyA0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSA4O1xuICAgICAgICAgICAgcmV0dXJuIGhpICsgbG87XG5cbiAgICAgICAgLy8gZml4ZXh0XG4gICAgICAgIGNhc2UgMHhkNDpcbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLl92aWV3LmdldEludDgodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSAxO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IDB4MDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt0eXBlLCB0aGlzLl9iaW4oMSldO1xuICAgICAgICBjYXNlIDB4ZDU6XG4gICAgICAgICAgICB0eXBlID0gdGhpcy5fdmlldy5nZXRJbnQ4KHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiBbdHlwZSwgdGhpcy5fYmluKDIpXTtcbiAgICAgICAgY2FzZSAweGQ2OlxuICAgICAgICAgICAgdHlwZSA9IHRoaXMuX3ZpZXcuZ2V0SW50OCh0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gW3R5cGUsIHRoaXMuX2Jpbig0KV07XG4gICAgICAgIGNhc2UgMHhkNzpcbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLl92aWV3LmdldEludDgodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSAxO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IDB4MDApIHtcbiAgICAgICAgICAgICAgICBoaSA9IHRoaXMuX3ZpZXcuZ2V0SW50MzIodGhpcy5fb2Zmc2V0KSAqIE1hdGgucG93KDIsIDMyKTtcbiAgICAgICAgICAgICAgICBsbyA9IHRoaXMuX3ZpZXcuZ2V0VWludDMyKHRoaXMuX29mZnNldCArIDQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSA4O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShoaSArIGxvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbdHlwZSwgdGhpcy5fYmluKDgpXTtcbiAgICAgICAgY2FzZSAweGQ4OlxuICAgICAgICAgICAgdHlwZSA9IHRoaXMuX3ZpZXcuZ2V0SW50OCh0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gW3R5cGUsIHRoaXMuX2JpbigxNildO1xuXG4gICAgICAgIC8vIHN0clxuICAgICAgICBjYXNlIDB4ZDk6XG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl92aWV3LmdldFVpbnQ4KHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHIobGVuZ3RoKTtcbiAgICAgICAgY2FzZSAweGRhOlxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fdmlldy5nZXRVaW50MTYodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSAyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cihsZW5ndGgpO1xuICAgICAgICBjYXNlIDB4ZGI6XG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl92aWV3LmdldFVpbnQzMih0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RyKGxlbmd0aCk7XG5cbiAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgY2FzZSAweGRjOlxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fdmlldy5nZXRVaW50MTYodGhpcy5fb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCArPSAyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5KGxlbmd0aCk7XG4gICAgICAgIGNhc2UgMHhkZDpcbiAgICAgICAgICAgIGxlbmd0aCA9IHRoaXMuX3ZpZXcuZ2V0VWludDMyKHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gNDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcnJheShsZW5ndGgpO1xuXG4gICAgICAgIC8vIG1hcFxuICAgICAgICBjYXNlIDB4ZGU6XG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl92aWV3LmdldFVpbnQxNih0aGlzLl9vZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ICs9IDI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwKGxlbmd0aCk7XG4gICAgICAgIGNhc2UgMHhkZjpcbiAgICAgICAgICAgIGxlbmd0aCA9IHRoaXMuX3ZpZXcuZ2V0VWludDMyKHRoaXMuX29mZnNldCk7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgKz0gNDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXAobGVuZ3RoKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZScpO1xufTtcblxuZnVuY3Rpb24gZGVjb2RlKGJ1ZmZlciwgb2Zmc2V0ID0gMCkge1xuICAgIHZhciBkZWNvZGVyID0gbmV3IERlY29kZXIoYnVmZmVyLCBvZmZzZXQpO1xuICAgIHZhciB2YWx1ZSA9IGRlY29kZXIuX3BhcnNlKCk7XG4gICAgaWYgKGRlY29kZXIuX29mZnNldCAhPT0gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKChidWZmZXIuYnl0ZUxlbmd0aCAtIGRlY29kZXIuX29mZnNldCkgKyAnIHRyYWlsaW5nIGJ5dGVzJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVjb2RlOyJdfQ==

/***/ }),
/* 23 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21zZ3BhY2svZW5jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHOztBQUVILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRztJQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtZQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFDSSxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzlDO2FBQ0ksSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMs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SUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQztTQUNKO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ25CLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsVUFBVSxFQUFFLENBQUM7UUFDYixZQUFZLElBQUksV0FBVyxDQUFDO1FBQzVCLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQzNDO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCBJb24gRHJpdmUgU29mdHdhcmUgTHRkLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2RhcnJhY2hlcXVlc25lL25vdGVwYWNrL1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuZnVuY3Rpb24gdXRmOFdyaXRlKHZpZXcsIG9mZnNldCwgc3RyKSB7XG4gICAgdmFyIGMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgYyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCAweGMwIHwgKGMgPj4gNikpO1xuICAgICAgICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHg4MCB8IChjICYgMHgzZikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgICAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIDB4ZTAgfCAoYyA+PiAxMikpO1xuICAgICAgICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHg4MCB8IChjID4+IDYpICYgMHgzZik7XG4gICAgICAgICAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCAweDgwIHwgKGMgJiAweDNmKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNmZikgPDwgMTApIHwgKHN0ci5jaGFyQ29kZUF0KGkpICYgMHgzZmYpKTtcbiAgICAgICAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIDB4ZjAgfCAoYyA+PiAxOCkpO1xuICAgICAgICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHg4MCB8IChjID4+IDEyKSAmIDB4M2YpO1xuICAgICAgICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHg4MCB8IChjID4+IDYpICYgMHgzZik7XG4gICAgICAgICAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCAweDgwIHwgKGMgJiAweDNmKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhMZW5ndGgoc3RyKSB7XG4gICAgdmFyIGMgPSAwLCBsZW5ndGggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHhkODAwIHx8IGMgPj0gMHhlMDAwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGxlbmd0aCArPSA0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG59XG5cbmZ1bmN0aW9uIF9lbmNvZGUoYnl0ZXMsIGRlZmVycywgdmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZSwgaSA9IDAsIGwgPSAwLCBoaSA9IDAsIGxvID0gMCwgbGVuZ3RoID0gMCwgc2l6ZSA9IDA7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGVuZ3RoID0gdXRmOExlbmd0aCh2YWx1ZSk7XG5cbiAgICAgICAgLy8gZml4c3RyXG4gICAgICAgIGlmIChsZW5ndGggPCAweDIwKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKGxlbmd0aCB8IDB4YTApO1xuICAgICAgICAgICAgc2l6ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RyIDhcbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoIDwgMHgxMDApIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhkOSwgbGVuZ3RoKTtcbiAgICAgICAgICAgIHNpemUgPSAyO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0ciAxNlxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKDB4ZGEsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgICAgICAgc2l6ZSA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RyIDMyXG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwMDAwMDAwKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKDB4ZGIsIGxlbmd0aCA+PiAyNCwgbGVuZ3RoID4+IDE2LCBsZW5ndGggPj4gOCwgbGVuZ3RoKTtcbiAgICAgICAgICAgIHNpemUgPSA1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdG9vIGxvbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZlcnMucHVzaCh7IF9zdHI6IHZhbHVlLCBfbGVuZ3RoOiBsZW5ndGgsIF9vZmZzZXQ6IGJ5dGVzLmxlbmd0aCB9KTtcbiAgICAgICAgcmV0dXJuIHNpemUgKyBsZW5ndGg7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBUT0RPOiBlbmNvZGUgdG8gZmxvYXQgMzI/XG5cbiAgICAgICAgLy8gZmxvYXQgNjRcbiAgICAgICAgaWYgKE1hdGguZmxvb3IodmFsdWUpICE9PSB2YWx1ZSB8fCAhaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKDB4Y2IpO1xuICAgICAgICAgICAgZGVmZXJzLnB1c2goeyBfZmxvYXQ6IHZhbHVlLCBfbGVuZ3RoOiA4LCBfb2Zmc2V0OiBieXRlcy5sZW5ndGggfSk7XG4gICAgICAgICAgICByZXR1cm4gOTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwb3NpdGl2ZSBmaXhudW1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IDB4ODApIHtcbiAgICAgICAgICAgICAgICBieXRlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVpbnQgOFxuICAgICAgICAgICAgaWYgKHZhbHVlIDwgMHgxMDApIHtcbiAgICAgICAgICAgICAgICBieXRlcy5wdXNoKDB4Y2MsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVpbnQgMTZcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IDB4MTAwMDApIHtcbiAgICAgICAgICAgICAgICBieXRlcy5wdXNoKDB4Y2QsIHZhbHVlID4+IDgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVpbnQgMzJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IDB4MTAwMDAwMDAwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaCgweGNlLCB2YWx1ZSA+PiAyNCwgdmFsdWUgPj4gMTYsIHZhbHVlID4+IDgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVpbnQgNjRcbiAgICAgICAgICAgIGhpID0gKHZhbHVlIC8gTWF0aC5wb3coMiwgMzIpKSA+PiAwO1xuICAgICAgICAgICAgbG8gPSB2YWx1ZSA+Pj4gMDtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhjZiwgaGkgPj4gMjQsIGhpID4+IDE2LCBoaSA+PiA4LCBoaSwgbG8gPj4gMjQsIGxvID4+IDE2LCBsbyA+PiA4LCBsbyk7XG4gICAgICAgICAgICByZXR1cm4gOTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG5lZ2F0aXZlIGZpeG51bVxuICAgICAgICAgICAgaWYgKHZhbHVlID49IC0weDIwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpbnQgOFxuICAgICAgICAgICAgaWYgKHZhbHVlID49IC0weDgwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaCgweGQwLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpbnQgMTZcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSAtMHg4MDAwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaCgweGQxLCB2YWx1ZSA+PiA4LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpbnQgMzJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSAtMHg4MDAwMDAwMCkge1xuICAgICAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhkMiwgdmFsdWUgPj4gMjQsIHZhbHVlID4+IDE2LCB2YWx1ZSA+PiA4LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpbnQgNjRcbiAgICAgICAgICAgIGhpID0gTWF0aC5mbG9vcih2YWx1ZSAvIE1hdGgucG93KDIsIDMyKSk7XG4gICAgICAgICAgICBsbyA9IHZhbHVlID4+PiAwO1xuICAgICAgICAgICAgYnl0ZXMucHVzaCgweGQzLCBoaSA+PiAyNCwgaGkgPj4gMTYsIGhpID4+IDgsIGhpLCBsbyA+PiAyNCwgbG8gPj4gMTYsIGxvID4+IDgsIGxvKTtcbiAgICAgICAgICAgIHJldHVybiA5O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBuaWxcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKDB4YzApO1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gZml4YXJyYXlcbiAgICAgICAgICAgIGlmIChsZW5ndGggPCAweDEwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaChsZW5ndGggfCAweDkwKTtcbiAgICAgICAgICAgICAgICBzaXplID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFycmF5IDE2XG4gICAgICAgICAgICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaCgweGRjLCBsZW5ndGggPj4gOCwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBzaXplID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFycmF5IDMyXG4gICAgICAgICAgICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwMDAwMCkge1xuICAgICAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhkZCwgbGVuZ3RoID4+IDI0LCBsZW5ndGggPj4gMTYsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHNpemUgPSA1O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IHRvbyBsYXJnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSArPSBfZW5jb2RlKGJ5dGVzLCBkZWZlcnMsIHZhbHVlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZml4ZXh0IDggLyBEYXRlXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHZhciB0aW1lID0gdmFsdWUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgaGkgPSBNYXRoLmZsb29yKHRpbWUgLyBNYXRoLnBvdygyLCAzMikpO1xuICAgICAgICAgICAgbG8gPSB0aW1lID4+PiAwO1xuICAgICAgICAgICAgYnl0ZXMucHVzaCgweGQ3LCAwLCBoaSA+PiAyNCwgaGkgPj4gMTYsIGhpID4+IDgsIGhpLCBsbyA+PiAyNCwgbG8gPj4gMTYsIGxvID4+IDgsIGxvKTtcbiAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBiaW4gOFxuICAgICAgICAgICAgaWYgKGxlbmd0aCA8IDB4MTAwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZXMucHVzaCgweGM0LCBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHNpemUgPSAyO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgLy8gYmluIDE2XG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA8IDB4MTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZXMucHVzaCgweGM1LCBsZW5ndGggPj4gOCwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IDM7XG4gICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vIGJpbiAzMlxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuZ3RoIDwgMHgxMDAwMDAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhjNiwgbGVuZ3RoID4+IDI0LCBsZW5ndGggPj4gMTYsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlciB0b28gbGFyZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmZXJzLnB1c2goeyBfYmluOiB2YWx1ZSwgX2xlbmd0aDogbGVuZ3RoLCBfb2Zmc2V0OiBieXRlcy5sZW5ndGggfSk7XG4gICAgICAgICAgICByZXR1cm4gc2l6ZSArIGxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gX2VuY29kZShieXRlcywgZGVmZXJzLCB2YWx1ZS50b0pTT04oKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5cyA9IFtdLCBrZXkgPSAnJztcblxuICAgICAgICB2YXIgYWxsS2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGFsbEtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBrZXkgPSBhbGxLZXlzW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtrZXldICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgICAgLy8gZml4bWFwXG4gICAgICAgIGlmIChsZW5ndGggPCAweDEwKSB7XG4gICAgICAgICAgICBieXRlcy5wdXNoKGxlbmd0aCB8IDB4ODApO1xuICAgICAgICAgICAgc2l6ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWFwIDE2XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwMDApIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhkZSwgbGVuZ3RoID4+IDgsIGxlbmd0aCk7XG4gICAgICAgICAgICBzaXplID0gMztcbiAgICAgICAgfVxuICAgICAgICAvLyBtYXAgMzJcbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoIDwgMHgxMDAwMDAwMDApIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhkZiwgbGVuZ3RoID4+IDI0LCBsZW5ndGggPj4gMTYsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgICAgICAgc2l6ZSA9IDU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdCB0b28gbGFyZ2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIHNpemUgKz0gX2VuY29kZShieXRlcywgZGVmZXJzLCBrZXkpO1xuICAgICAgICAgICAgc2l6ZSArPSBfZW5jb2RlKGJ5dGVzLCBkZWZlcnMsIHZhbHVlW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgICAvLyBmYWxzZS90cnVlXG4gICAgaWYgKHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICBieXRlcy5wdXNoKHZhbHVlID8gMHhjMyA6IDB4YzIpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgLy8gZml4ZXh0IDEgLyB1bmRlZmluZWRcbiAgICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgYnl0ZXMucHVzaCgweGQ0LCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGVuY29kZScpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUpIHtcbiAgICB2YXIgYnl0ZXMgPSBbXTtcbiAgICB2YXIgZGVmZXJzID0gW107XG4gICAgdmFyIHNpemUgPSBfZW5jb2RlKGJ5dGVzLCBkZWZlcnMsIHZhbHVlKTtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKHNpemUpO1xuICAgIHZhciB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1Zik7XG5cbiAgICB2YXIgZGVmZXJJbmRleCA9IDA7XG4gICAgdmFyIGRlZmVyV3JpdHRlbiA9IDA7XG4gICAgdmFyIG5leHRPZmZzZXQgPSAtMTtcbiAgICBpZiAoZGVmZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV4dE9mZnNldCA9IGRlZmVyc1swXS5fb2Zmc2V0O1xuICAgIH1cblxuICAgIHZhciBkZWZlciwgZGVmZXJMZW5ndGggPSAwLCBvZmZzZXQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYnl0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZpZXcuc2V0VWludDgoZGVmZXJXcml0dGVuICsgaSwgYnl0ZXNbaV0pO1xuICAgICAgICBpZiAoaSArIDEgIT09IG5leHRPZmZzZXQpIHsgY29udGludWU7IH1cbiAgICAgICAgZGVmZXIgPSBkZWZlcnNbZGVmZXJJbmRleF07XG4gICAgICAgIGRlZmVyTGVuZ3RoID0gZGVmZXIuX2xlbmd0aDtcbiAgICAgICAgb2Zmc2V0ID0gZGVmZXJXcml0dGVuICsgbmV4dE9mZnNldDtcbiAgICAgICAgaWYgKGRlZmVyLl9iaW4pIHtcbiAgICAgICAgICAgIHZhciBiaW4gPSBuZXcgVWludDhBcnJheShkZWZlci5fYmluKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGVmZXJMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0ICsgaiwgYmluW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkZWZlci5fc3RyKSB7XG4gICAgICAgICAgICB1dGY4V3JpdGUodmlldywgb2Zmc2V0LCBkZWZlci5fc3RyKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZlci5fZmxvYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmlldy5zZXRGbG9hdDY0KG9mZnNldCwgZGVmZXIuX2Zsb2F0KTtcbiAgICAgICAgfVxuICAgICAgICBkZWZlckluZGV4Kys7XG4gICAgICAgIGRlZmVyV3JpdHRlbiArPSBkZWZlckxlbmd0aDtcbiAgICAgICAgaWYgKGRlZmVyc1tkZWZlckluZGV4XSkge1xuICAgICAgICAgICAgbmV4dE9mZnNldCA9IGRlZmVyc1tkZWZlckluZGV4XS5fb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVuY29kZTtcbiJdfQ==

/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
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
var websocket_1 = __importDefault(__webpack_require__(27));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBbUQ7QUFHbkQ7SUFBZ0MsOEJBQWU7SUFHM0Msb0JBQVksR0FBVyxFQUFFLFdBQTJCO1FBQTNCLDRCQUFBLEVBQUEsa0JBQTJCO1FBQXBELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxTQUNsRDtRQUpPLG9CQUFjLEdBQVUsRUFBRSxDQUFDOztJQUluQyxDQUFDO0lBRU0sbUNBQWMsR0FBckIsVUFBc0IsS0FBSztRQUN2QixpQkFBTSxjQUFjLFdBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztRQUVoQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoQyxLQUE2QixVQUFtQixFQUFuQixLQUFBLElBQUksQ0FBQyxjQUFjLEVBQW5CLGNBQW1CLEVBQW5CLElBQW1CLEVBQUU7Z0JBQXZDLElBQUEsV0FBYyxFQUFiLE1BQU0sUUFBQSxFQUFFLElBQUksUUFBQTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEM7WUFFRCx3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRU0seUJBQUksR0FBWCxVQUFZLElBQWlDO1FBQ3pDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssbUJBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDN0MsSUFBSSxJQUFJLFlBQVksV0FBVyxFQUFFO2dCQUM3QixPQUFPLGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsQ0FBQzthQUUzQjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8saUJBQU0sSUFBSSxZQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRDtTQUVKO2FBQU07WUFDSCwyQkFBMkI7WUFDM0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUFnQyxtQkFBZSxHQXNDOUM7QUF0Q1ksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gJ0BnYW1lc3RkaW8vd2Vic29ja2V0JztcbmltcG9ydCAqIGFzIG1zZ3BhY2sgZnJvbSAnLi9tc2dwYWNrJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24gZXh0ZW5kcyBXZWJTb2NrZXRDbGllbnQge1xuICAgIHByaXZhdGUgX2VucXVldWVkQ2FsbHM6IGFueVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgYXV0b0Nvbm5lY3Q6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHN1cGVyKHVybCwgdW5kZWZpbmVkLCB7IGNvbm5lY3Q6IGF1dG9Db25uZWN0IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk9wZW5DYWxsYmFjayhldmVudCkge1xuICAgICAgICBzdXBlci5vbk9wZW5DYWxsYmFjaygpO1xuXG4gICAgICAgIHRoaXMuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VucXVldWVkQ2FsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBbbWV0aG9kLCBhcmdzXSBvZiB0aGlzLl9lbnF1ZXVlZENhbGxzKSB7XG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjbGVhciBlbnF1ZXVlZCBjYWxscy5cbiAgICAgICAgICAgIHRoaXMuX2VucXVldWVkQ2FsbHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZW5kKGRhdGE6IEFycmF5QnVmZmVyIHwgQXJyYXk8bnVtYmVyPik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXRDbGllbnQuT1BFTikge1xuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5zZW5kKGRhdGEpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuc2VuZCgobmV3IFVpbnQ4QXJyYXkoZGF0YSkpLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdlYlNvY2tldCBub3QgY29ubmVjdGVkLlxuICAgICAgICAgICAgLy8gRW5xdWV1ZSBkYXRhIHRvIGJlIHNlbnQgd2hlbiByZWFkeVN0YXRlID09IE9QRU5cbiAgICAgICAgICAgIHRoaXMuX2VucXVldWVkQ2FsbHMucHVzaChbJ3NlbmQnLCBbZGF0YV1dKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var createBackoff=__webpack_require__(28).createBackoff;var WebSocketImpl=typeof WebSocket!=="undefined"?WebSocket:__webpack_require__(29);var WebSocketClient=function(){/**
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.createBackoff=createBackoff;var backoff={exponential:function exponential(attempt,delay){return Math.floor(Math.random()*Math.pow(2,attempt)*delay);},fibonacci:function fibonacci(attempt,delay){var current=1;if(attempt>current){var prev=1,current=2;for(var index=2;index<attempt;index++){var next=prev+current;prev=current;current=next;}}return Math.floor(Math.random()*current*delay);}};function createBackoff(type,options){return new Backoff(backoff[type],options);}function Backoff(func,options){this.func=func;this.attempts=0;this.delay=typeof options.initialDelay!=="undefined"?options.initialDelay:100;}Backoff.prototype.backoff=function(){setTimeout(this.onReady,this.func(++this.attempts,this.delay));};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 30 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzREFBc0Q7OztBQUV0RDs7OztHQUlHO0FBRUgsSUFBSSxPQUFZLENBQUM7QUFFakIsU0FBUyxVQUFVO0lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRztRQUNYLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxXQUFXLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUNwRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUUsbUNBQW1DO1lBQzFELENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsMkVBQTJFO2dCQUNoSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEI7Z0JBQ3BELENBQUMsQ0FBQztvQkFDRSxLQUFLLEVBQUUsRUFBRTtvQkFDVCxPQUFPLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDMUQsT0FBTyxFQUFFLFVBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxVQUFVLEVBQUUsVUFBUyxHQUFHLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEQsQ0FBQztLQUViO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYTtJQUM5QyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFGRCwwQkFFQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxHQUFXO0lBQ2xDLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFnQixPQUFPLENBQUMsR0FBVyxFQUFFLFFBQWtCO0lBQ25ELElBQU0sS0FBSyxHQUFRLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QyxJQUNJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksZUFBZTtRQUNuRCxDQUFDLENBQUMsS0FBSyxZQUFZLE9BQU8sQ0FBQyxFQUM3QjtRQUNFLGlDQUFpQztRQUNqQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFbkI7U0FBTTtRQUNILCtCQUErQjtRQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0wsQ0FBQztBQWRELDBCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvY29jb3MtY3JlYXRvci5kLnRzXCIgLz5cblxuLyoqXG4gKiBXZSBkbyBub3QgYXNzaWduICdzdG9yYWdlJyB0byB3aW5kb3cubG9jYWxTdG9yYWdlIGltbWVkaWF0ZWxseSBmb3IgUmVhY3RcbiAqIE5hdGl2ZSBjb21wYXRpYmlsaXR5LiB3aW5kb3cubG9jYWxTdG9yYWdlIGlzIG5vdCBwcmVzZW50IHdoZW4gdGhpcyBtb2R1bGUgaXNcbiAqIGxvYWRlZC5cbiAqL1xuXG5sZXQgc3RvcmFnZTogYW55O1xuXG5mdW5jdGlvbiBnZXRTdG9yYWdlKCk6IFN0b3JhZ2Uge1xuICAgIGlmICghc3RvcmFnZSkgIHtcbiAgICAgICAgc3RvcmFnZSA9ICh0eXBlb2YgKGNjKSAhPT0gJ3VuZGVmaW5lZCcgJiYgY2Muc3lzICYmIGNjLnN5cy5sb2NhbFN0b3JhZ2UpXG4gICAgICAgICAgICA/IGNjLnN5cy5sb2NhbFN0b3JhZ2UgIC8vIGNvbXBhdGliaWxpdHkgd2l0aCBjb2NvcyBjcmVhdG9yXG4gICAgICAgICAgICA6IHR5cGVvZiAod2luZG93KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYWxTdG9yYWdlIC8vUk4gZG9lcyBoYXZlIHdpbmRvdyBvYmplY3QgYXQgdGhpcyBwb2ludCwgYnV0IGxvY2FsU3RvcmFnZSBpcyBub3QgZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gd2luZG93LmxvY2FsU3RvcmFnZSAvLyByZWd1bGFyIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICA6IHsgLy8gbW9jayBsb2NhbFN0b3JhZ2UgZm9yIE5vZGUuanMgb3IgUk4gZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICBzZXRJdGVtOiBmdW5jdGlvbihrZXksIHZhbHVlKSB7IHRoaXMuY2FjaGVba2V5XSA9IHZhbHVlOyB9LFxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtOiBmdW5jdGlvbihrZXkpIHsgdGhpcy5jYWNoZVtrZXldOyB9LFxuICAgICAgICAgICAgICAgICAgICByZW1vdmVJdGVtOiBmdW5jdGlvbihrZXkpIHsgZGVsZXRlIHRoaXMuY2FjaGVba2V5XTsgfSxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGdldFN0b3JhZ2UoKS5zZXRJdGVtKGtleSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXk6IHN0cmluZykge1xuICAgIGdldFN0b3JhZ2UoKS5yZW1vdmVJdGVtKGtleSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtKGtleTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBjb25zdCB2YWx1ZTogYW55ID0gZ2V0U3RvcmFnZSgpLmdldEl0ZW0oa2V5KTtcblxuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIChQcm9taXNlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgLy8gb2xkIGJyb3dzZXJzXG4gICAgICAgICEodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKVxuICAgICkge1xuICAgICAgICAvLyBicm93c2VyIGhhcyBzeW5jaHJvbm91cyByZXR1cm5cbiAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVhY3QtbmF0aXZlIGlzIGFzeW5jaHJvbm91c1xuICAgICAgICB2YWx1ZS50aGVuKChpZCkgPT4gY2FsbGJhY2soaWQpKTtcbiAgICB9XG59XG4iXX0=

/***/ }),
/* 31 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QdXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBR0ksY0FBYSxRQUFnQjtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFWSx1QkFBUSxHQUFyQjs7Ozs7d0JBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFBOzt3QkFBbEMsU0FBa0MsQ0FBQzt3QkFDbkMscUJBQU0sSUFBSSxDQUFDLDZCQUE2QixFQUFFLEVBQUE7O3dCQUExQyxTQUEwQyxDQUFDOzs7OztLQUM5QztJQUFBLENBQUM7SUFFYyxvQ0FBcUIsR0FBckM7Ozs7NEJBQ1cscUJBQU0sU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUksSUFBSSxDQUFDLFFBQVEsVUFBTyxDQUFDLEVBQUE7NEJBQXRFLHNCQUFPLFNBQStELEVBQUM7Ozs7S0FDMUU7SUFFZSw0Q0FBNkIsR0FBN0M7Ozs7OzRCQUN1QixxQkFBTSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsRUFBQTs7d0JBQTdELFVBQVUsR0FBRyxTQUFnRDt3QkFDbkUsNERBQTREO3dCQUM1RCx5Q0FBeUM7d0JBQ3pDLGlGQUFpRjt3QkFDakYsdUNBQXVDO3dCQUN2QyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7NEJBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQzt5QkFDOUQ7Ozs7O0tBQ0o7SUFFUyxvQkFBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQUU7UUFDdkYsSUFBSSxDQUFDLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQUU7SUFDaEYsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDO0FBakNZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFB1c2gge1xuICAgIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvciAoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQucmVwbGFjZShcIndzXCIsIFwiaHR0cFwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuY2hlY2soKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlclNlcnZpY2VXb3JrZXIoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZXF1ZXN0Tm90aWZpY2F0aW9uUGVybWlzc2lvbigpO1xuICAgIH07XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgcmVnaXN0ZXJTZXJ2aWNlV29ya2VyKCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoYCR7dGhpcy5lbmRwb2ludH0vcHVzaGApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyByZXF1ZXN0Tm90aWZpY2F0aW9uUGVybWlzc2lvbigpIHtcbiAgICAgICAgY29uc3QgcGVybWlzc2lvbiA9IGF3YWl0IHdpbmRvd1tcIk5vdGlmaWNhdGlvblwiXS5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgICAgICAvLyB2YWx1ZSBvZiBwZXJtaXNzaW9uIGNhbiBiZSAnZ3JhbnRlZCcsICdkZWZhdWx0JywgJ2RlbmllZCdcbiAgICAgICAgLy8gZ3JhbnRlZDogdXNlciBoYXMgYWNjZXB0ZWQgdGhlIHJlcXVlc3RcbiAgICAgICAgLy8gZGVmYXVsdDogdXNlciBoYXMgZGlzbWlzc2VkIHRoZSBub3RpZmljYXRpb24gcGVybWlzc2lvbiBwb3B1cCBieSBjbGlja2luZyBvbiB4XG4gICAgICAgIC8vIGRlbmllZDogdXNlciBoYXMgZGVuaWVkIHRoZSByZXF1ZXN0LlxuICAgICAgICBpZiAocGVybWlzc2lvbiAhPT0gXCJncmFudGVkXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBlcm1pc3Npb24gbm90IGdyYW50ZWQgZm9yIE5vdGlmaWNhdGlvblwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVjaygpIHtcbiAgICAgICAgaWYgKCEoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJObyBTZXJ2aWNlIFdvcmtlciBzdXBwb3J0IVwiKTsgfVxuICAgICAgICBpZiAoIShcIlB1c2hNYW5hZ2VyXCIgaW4gd2luZG93KSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJObyBQdXNoIEFQSSBTdXBwb3J0IVwiKTsgfVxuICAgIH1cblxufSJdfQ==

/***/ }),
/* 32 */
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
var state_listener_1 = __webpack_require__(33);
var fossilDelta = __importStar(__webpack_require__(36));
var msgpack = __importStar(__webpack_require__(9));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9zc2lsRGVsdGFTZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbGl6ZXIvRm9zc2lsRGVsdGFTZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw0REFBMkQ7QUFDM0Qsd0RBQTRDO0FBQzVDLGtEQUFzQztBQUV0QztJQUFBO1FBQ0ksUUFBRyxHQUEwQixJQUFJLCtCQUFjLENBQVEsRUFBVyxDQUFDLENBQUM7SUF1QnhFLENBQUM7SUFwQkcsd0NBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxZQUFpQjtRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHFDQUFLLEdBQUwsVUFBTSxXQUFXO1FBQ2IsY0FBYztRQUNkLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFeEYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSBcIi4vU2VyaWFsaXplclwiO1xuXG5pbXBvcnQgeyBTdGF0ZUNvbnRhaW5lciB9IGZyb20gJ0BnYW1lc3RkaW8vc3RhdGUtbGlzdGVuZXInO1xuaW1wb3J0ICogYXMgZm9zc2lsRGVsdGEgZnJvbSAnZm9zc2lsLWRlbHRhJztcbmltcG9ydCAqIGFzIG1zZ3BhY2sgZnJvbSAnLi4vbXNncGFjayc7XG5cbmV4cG9ydCBjbGFzcyBGb3NzaWxEZWx0YVNlcmlhbGl6ZXI8U3RhdGU9IGFueT4gaW1wbGVtZW50cyBTZXJpYWxpemVyPFN0YXRlPiB7XG4gICAgYXBpOiBTdGF0ZUNvbnRhaW5lcjxTdGF0ZT4gPSBuZXcgU3RhdGVDb250YWluZXI8U3RhdGU+KHt9IGFzIFN0YXRlKTtcbiAgICBwcm90ZWN0ZWQgcHJldmlvdXNTdGF0ZTogYW55O1xuXG4gICAgZ2V0U3RhdGUoKTogU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5hcGkuc3RhdGU7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoZW5jb2RlZFN0YXRlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c1N0YXRlID0gbmV3IFVpbnQ4QXJyYXkoZW5jb2RlZFN0YXRlKTtcbiAgICAgICAgdGhpcy5hcGkuc2V0KG1zZ3BhY2suZGVjb2RlKHRoaXMucHJldmlvdXNTdGF0ZSkpO1xuICAgIH1cblxuICAgIHBhdGNoKGJpbmFyeVBhdGNoKSB7XG4gICAgICAgIC8vIGFwcGx5IHBhdGNoXG4gICAgICAgIHRoaXMucHJldmlvdXNTdGF0ZSA9IG5ldyBVaW50OEFycmF5KGZvc3NpbERlbHRhLmFwcGx5KHRoaXMucHJldmlvdXNTdGF0ZSwgYmluYXJ5UGF0Y2gpKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIHVwZGF0ZSBjYWxsYmFja3NcbiAgICAgICAgdGhpcy5hcGkuc2V0KG1zZ3BhY2suZGVjb2RlKHRoaXMucHJldmlvdXNTdGF0ZSkpO1xuICAgIH1cblxuICAgIHRlYXJkb3duKCkge1xuICAgICAgICB0aGlzLmFwaS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG59Il19

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StateContainer_1 = __webpack_require__(34);
exports.StateContainer = StateContainer_1.StateContainer;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = __webpack_require__(35);
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
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = void 0;
var schema_1 = __webpack_require__(15);
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
        var _a, _b;
        (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a['$changes']) === null || _b === void 0 ? void 0 : _b.root.clearRefs();
    };
    SchemaSerializer.prototype.handshake = function (bytes, it) {
        if (this.state) {
            // validate client/server definitinos
            var reflection = new schema_1.Reflection();
            reflection.decode(bytes, it);
        }
        else {
            // initialize reflected state from server
            this.state = schema_1.Reflection.decode(bytes, it);
        }
    };
    return SchemaSerializer;
}());
exports.SchemaSerializer = SchemaSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hU2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemVyL1NjaGVtYVNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXNEO0FBS3REO0lBQUE7SUE4QkEsQ0FBQztJQTNCRyxtQ0FBUSxHQUFSLFVBQVMsUUFBYTtRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0NBQUssR0FBTCxVQUFNLE9BQU87UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUNBQVEsR0FBUjs7UUFDSSxZQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFHLFVBQVUsMkNBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRztJQUMvQyxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLEtBQWUsRUFBRSxFQUFhO1FBQ3BDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLHFDQUFxQztZQUNyQyxJQUFNLFVBQVUsR0FBRyxJQUFJLG1CQUFVLEVBQUUsQ0FBQztZQUNwQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUVoQzthQUFNO1lBQ0gseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBUSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQztBQTlCWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSBcIi4vU2VyaWFsaXplclwiO1xuaW1wb3J0IHsgU2NoZW1hLCBSZWZsZWN0aW9uIH0gZnJvbSBcIkBjb2x5c2V1cy9zY2hlbWFcIjtcbmltcG9ydCB7IEl0ZXJhdG9yIH0gZnJvbSBcIkBjb2x5c2V1cy9zY2hlbWEvbGliL2VuY29kaW5nL2RlY29kZVwiO1xuXG5leHBvcnQgdHlwZSBTY2hlbWFDb25zdHJ1Y3RvcjxUID0gU2NoZW1hPiA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFTZXJpYWxpemVyPFQgZXh0ZW5kcyBTY2hlbWEgPSBhbnk+IGltcGxlbWVudHMgU2VyaWFsaXplcjxUPiB7XG4gICAgc3RhdGU6IFQ7XG5cbiAgICBzZXRTdGF0ZShyYXdTdGF0ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGUuZGVjb2RlKHJhd1N0YXRlKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuXG4gICAgcGF0Y2gocGF0Y2hlcykge1xuICAgICAgICB0aGlzLnN0YXRlLmRlY29kZShwYXRjaGVzKTtcbiAgICB9XG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZT8uWyckY2hhbmdlcyddPy5yb290LmNsZWFyUmVmcygpO1xuICAgIH1cblxuICAgIGhhbmRzaGFrZShieXRlczogbnVtYmVyW10sIGl0PzogSXRlcmF0b3IpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIGNsaWVudC9zZXJ2ZXIgZGVmaW5pdGlub3NcbiAgICAgICAgICAgIGNvbnN0IHJlZmxlY3Rpb24gPSBuZXcgUmVmbGVjdGlvbigpO1xuICAgICAgICAgICAgcmVmbGVjdGlvbi5kZWNvZGUoYnl0ZXMsIGl0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSByZWZsZWN0ZWQgc3RhdGUgZnJvbSBzZXJ2ZXJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBSZWZsZWN0aW9uLmRlY29kZShieXRlcywgaXQpIGFzIGFueTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Extracted from https://www.npmjs.com/package/strong-events
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
        this.handlers.forEach(function (handler) { return handler.apply(void 0, __spread(args)); });
    };
    EventEmitter.prototype.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Promise.all(this.handlers.map(function (handler) { return handler.apply(void 0, __spread(args)); }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRFbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9FdmVudEVtaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9IO0lBQUE7UUFDRSxhQUFRLEdBQTZCLEVBQUUsQ0FBQztJQXdCMUMsQ0FBQztJQXRCQywrQkFBUSxHQUFSLFVBQVMsRUFBcUIsRUFBRSxJQUFxQjtRQUFyQixxQkFBQSxFQUFBLFlBQXFCO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDZCQUFNLEdBQU47UUFBTyxjQUE4QzthQUE5QyxVQUE4QyxFQUE5QyxxQkFBOEMsRUFBOUMsSUFBOEM7WUFBOUMseUJBQThDOztRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sd0JBQUksSUFBSSxJQUFmLENBQWdCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUFZLGNBQThDO2FBQTlDLFVBQThDLEVBQTlDLHFCQUE4QyxFQUE5QyxJQUE4QztZQUE5Qyx5QkFBOEM7O1FBQ3hELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sd0JBQUksSUFBSSxJQUFmLENBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQVEsRUFBcUI7UUFDM0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRyYWN0ZWQgZnJvbSBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9zdHJvbmctZXZlbnRzXG4gKi9cblxudHlwZSBGdW5jdGlvblBhcmFtZXRlcnM8VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PiA9XG4gIFQgZXh0ZW5kcyAoLi4uYXJnczogaW5mZXIgUCkgPT4gYW55XG4gICAgPyBQXG4gICAgOiBuZXZlcjtcblxuZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlcjxDYWxsYmFja1NpZ25hdHVyZSBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PiB7XG4gIGhhbmRsZXJzOiBBcnJheTxDYWxsYmFja1NpZ25hdHVyZT4gPSBbXTtcblxuICByZWdpc3RlcihjYjogQ2FsbGJhY2tTaWduYXR1cmUsIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuaGFuZGxlcnMucHVzaChjYik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpbnZva2UoLi4uYXJnczogRnVuY3Rpb25QYXJhbWV0ZXJzPENhbGxiYWNrU2lnbmF0dXJlPikge1xuICAgIHRoaXMuaGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlciguLi5hcmdzKSk7XG4gIH1cblxuICBpbnZva2VBc3luYyguLi5hcmdzOiBGdW5jdGlvblBhcmFtZXRlcnM8Q2FsbGJhY2tTaWduYXR1cmU+KSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuaGFuZGxlcnMubWFwKChoYW5kbGVyKSA9PiBoYW5kbGVyKC4uLmFyZ3MpKSk7XG4gIH1cblxuICByZW1vdmUgKGNiOiBDYWxsYmFja1NpZ25hdHVyZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5oYW5kbGVycy5pbmRleE9mKGNiKTtcbiAgICB0aGlzLmhhbmRsZXJzW2luZGV4XSA9IHRoaXMuaGFuZGxlcnNbdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxXTtcbiAgICB0aGlzLmhhbmRsZXJzLnBvcCgpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICB9XG59XG4iXX0=

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientState = void 0;
var ClientState = /** @class */ (function () {
    function ClientState() {
        this.refIds = new WeakSet();
        this.containerIndexes = new WeakMap();
    }
    // containerIndexes = new Map<ChangeTree, Set<number>>();
    ClientState.prototype.addRefId = function (changeTree) {
        if (!this.refIds.has(changeTree)) {
            this.refIds.add(changeTree);
            this.containerIndexes.set(changeTree, new Set());
        }
    };
    ClientState.get = function (client) {
        if (client.$filterState === undefined) {
            client.$filterState = new ClientState();
        }
        return client.$filterState;
    };
    return ClientState;
}());
exports.ClientState = ClientState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmlsdGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTtJQUFBO1FBQ0ksV0FBTSxHQUFHLElBQUksT0FBTyxFQUFjLENBQUM7UUFDbkMscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQTJCLENBQUM7SUFpQjlELENBQUM7SUFoQkcseURBQXlEO0lBRXpELDhCQUFRLEdBQVIsVUFBUyxVQUFzQjtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUVNLGVBQUcsR0FBVixVQUFXLE1BQWM7UUFDckIsSUFBSSxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNuQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7U0FDM0M7UUFFRCxPQUFPLE1BQU0sQ0FBQyxZQUEyQixDQUFDO0lBQzlDLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VUcmVlIH0gZnJvbSBcIi4uL2NoYW5nZXMvQ2hhbmdlVHJlZVwiO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uL2Fubm90YXRpb25zXCI7XG5cbmV4cG9ydCBjbGFzcyBDbGllbnRTdGF0ZSB7XG4gICAgcmVmSWRzID0gbmV3IFdlYWtTZXQ8Q2hhbmdlVHJlZT4oKTtcbiAgICBjb250YWluZXJJbmRleGVzID0gbmV3IFdlYWtNYXA8Q2hhbmdlVHJlZSwgU2V0PG51bWJlcj4+KCk7XG4gICAgLy8gY29udGFpbmVySW5kZXhlcyA9IG5ldyBNYXA8Q2hhbmdlVHJlZSwgU2V0PG51bWJlcj4+KCk7XG5cbiAgICBhZGRSZWZJZChjaGFuZ2VUcmVlOiBDaGFuZ2VUcmVlKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWZJZHMuaGFzKGNoYW5nZVRyZWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZklkcy5hZGQoY2hhbmdlVHJlZSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckluZGV4ZXMuc2V0KGNoYW5nZVRyZWUsIG5ldyBTZXQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0KGNsaWVudDogQ2xpZW50KSB7XG4gICAgICAgIGlmIChjbGllbnQuJGZpbHRlclN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNsaWVudC4kZmlsdGVyU3RhdGUgPSBuZXcgQ2xpZW50U3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGllbnQuJGZpbHRlclN0YXRlIGFzIENsaWVudFN0YXRlO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpChanges = void 0;
var _1 = __webpack_require__(15);
var MapSchema_1 = __webpack_require__(5);
function dumpChanges(schema) {
    var changeTrees = [schema['$changes']];
    var numChangeTrees = 1;
    var dump = {};
    var currentStructure = dump;
    var _loop_1 = function (i) {
        var changeTree = changeTrees[i];
        // TODO: this method doesn't work as expected.
        changeTree.changes.forEach(function (change) {
            var ref = changeTree.ref;
            var fieldIndex = change.index;
            var field = (ref instanceof _1.Schema)
                ? ref['_definition'].fieldsByIndex[fieldIndex]
                : (ref instanceof MapSchema_1.MapSchema)
                    ? ref['$indexes'].get(fieldIndex)
                    : ref['$indexes'][fieldIndex];
            currentStructure[field] = changeTree.getValue(fieldIndex);
        });
    };
    for (var i = 0; i < numChangeTrees; i++) {
        _loop_1(i);
    }
    return dump;
}
exports.dumpChanges = dumpChanges;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUJBQTRCO0FBRTVCLCtDQUE4QztBQUc5QyxTQUFnQixXQUFXLENBQUMsTUFBYztJQUN0QyxJQUFNLFdBQVcsR0FBaUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN2RCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFFdkIsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDOzRCQUVuQixDQUFDO1FBQ04sSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLDhDQUE4QztRQUU5QyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDOUIsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUMzQixJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBRWhDLElBQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxZQUFZLFNBQU0sQ0FBQztnQkFDakMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO2dCQUM5QyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVkscUJBQVMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO29CQUNqQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBR3JDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7O0lBakJQLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFO2dCQUE5QixDQUFDO0tBbUJUO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTdCRCxrQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9cIjtcbmltcG9ydCB7IE9QRVJBVElPTiB9IGZyb20gXCIuL3NwZWNcIjtcbmltcG9ydCB7IE1hcFNjaGVtYSB9IGZyb20gXCIuL3R5cGVzL01hcFNjaGVtYVwiO1xuaW1wb3J0IHsgQ2hhbmdlVHJlZSB9IGZyb20gXCIuL2NoYW5nZXMvQ2hhbmdlVHJlZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZHVtcENoYW5nZXMoc2NoZW1hOiBTY2hlbWEpIHtcbiAgICBjb25zdCBjaGFuZ2VUcmVlczogQ2hhbmdlVHJlZVtdID0gW3NjaGVtYVsnJGNoYW5nZXMnXV07XG4gICAgbGV0IG51bUNoYW5nZVRyZWVzID0gMTtcblxuICAgIGNvbnN0IGR1bXAgPSB7fTtcbiAgICBsZXQgY3VycmVudFN0cnVjdHVyZSA9IGR1bXA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYW5nZVRyZWVzOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hhbmdlVHJlZSA9IGNoYW5nZVRyZWVzW2ldO1xuXG4gICAgICAgIC8vIFRPRE86IHRoaXMgbWV0aG9kIGRvZXNuJ3Qgd29yayBhcyBleHBlY3RlZC5cblxuICAgICAgICBjaGFuZ2VUcmVlLmNoYW5nZXMuZm9yRWFjaCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWYgPSBjaGFuZ2VUcmVlLnJlZjtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkSW5kZXggPSBjaGFuZ2UuaW5kZXg7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gKHJlZiBpbnN0YW5jZW9mIFNjaGVtYSlcbiAgICAgICAgICAgICAgICA/IHJlZlsnX2RlZmluaXRpb24nXS5maWVsZHNCeUluZGV4W2ZpZWxkSW5kZXhdXG4gICAgICAgICAgICAgICAgOiAocmVmIGluc3RhbmNlb2YgTWFwU2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICA/IHJlZlsnJGluZGV4ZXMnXS5nZXQoZmllbGRJbmRleClcbiAgICAgICAgICAgICAgICAgICAgOiByZWZbJyRpbmRleGVzJ11bZmllbGRJbmRleF1cblxuXG4gICAgICAgICAgICBjdXJyZW50U3RydWN0dXJlW2ZpZWxkXSA9IGNoYW5nZVRyZWUuZ2V0VmFsdWUoZmllbGRJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIGR1bXA7XG59Il19

/***/ }),
/* 41 */
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
var annotations_1 = __webpack_require__(6);
var Schema_1 = __webpack_require__(1);
var ArraySchema_1 = __webpack_require__(4);
var types_1 = __webpack_require__(2);
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
        annotations_1.type("number", reflectionContext)
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
        annotations_1.type("number", reflectionContext)
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
                    var type_1 = schema[fieldName];
                    var childTypeSchema = void 0;
                    //
                    // TODO: refactor below.
                    //
                    if (Schema_1.Schema.is(type_1)) {
                        fieldType = "ref";
                        childTypeSchema = schema[fieldName];
                    }
                    else {
                        fieldType = Object.keys(type_1)[0];
                        if (typeof (type_1[fieldType]) === "string") {
                            fieldType += ":" + type_1[fieldType]; // array:string
                        }
                        else {
                            childTypeSchema = type_1[fieldType];
                        }
                    }
                    field.referencedType = (childTypeSchema)
                        ? childTypeSchema._typeid
                        : -1;
                }
                field.type = fieldType;
                currentType.fields.push(field);
            }
            reflection.types.push(currentType);
        };
        var types = rootSchemaType._context.types;
        for (var typeid in types) {
            var type_2 = new ReflectionType();
            type_2.id = Number(typeid);
            buildType(type_2, types[typeid]._definition.schema);
        }
        return reflection.encodeAll();
    };
    Reflection.decode = function (bytes, it) {
        var context = new annotations_1.Context();
        var reflection = new Reflection();
        reflection.decode(bytes, it);
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
                var _a;
                var schemaType = schemaTypes[reflectionType.id];
                if (field.referencedType !== undefined) {
                    var fieldType = field.type;
                    var refType = schemaTypes[field.referencedType];
                    // map or array of primitive type (-1)
                    if (!refType) {
                        var typeInfo = field.type.split(":");
                        fieldType = typeInfo[0];
                        refType = typeInfo[1];
                    }
                    if (fieldType === "ref") {
                        annotations_1.type(refType, context)(schemaType.prototype, field.name);
                    }
                    else {
                        annotations_1.type((_a = {}, _a[fieldType] = refType, _a), context)(schemaType.prototype, field.name);
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
        for (var fieldName in rootType._definition.schema) {
            var fieldType = rootType._definition.schema[fieldName];
            if (typeof (fieldType) !== "string") {
                var typeDef = types_1.getType(Object.keys(fieldType)[0]);
                var isSchema = typeof (fieldType) === "function";
                rootInstance[fieldName] = (isSchema)
                    ? new fieldType()
                    : new typeDef.constructor();
            }
        }
        return rootInstance;
    };
    __decorate([
        annotations_1.type([ReflectionType], reflectionContext)
    ], Reflection.prototype, "types", void 0);
    __decorate([
        annotations_1.type("number", reflectionContext)
    ], Reflection.prototype, "rootType", void 0);
    return Reflection;
}(Schema_1.Schema));
exports.Reflection = Reflection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVmbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWZsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkU7QUFDN0UsbUNBQWtDO0FBQ2xDLG1EQUFrRDtBQUNsRCxpQ0FBa0M7QUFHbEMsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLHFCQUFPLEVBQUUsQ0FBQztBQUV4Qzs7R0FFRztBQUNIO0lBQXFDLG1DQUFNO0lBQTNDOztJQVNBLENBQUM7SUFQRztRQURDLGtCQUFJLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDO2lEQUNyQjtJQUdiO1FBREMsa0JBQUksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUM7aURBQ3JCO0lBR2I7UUFEQyxrQkFBSSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQzsyREFDWDtJQUMzQixzQkFBQztDQUFBLEFBVEQsQ0FBcUMsZUFBTSxHQVMxQztBQVRZLDBDQUFlO0FBVzVCO0lBQW9DLGtDQUFNO0lBQTFDO1FBQUEscUVBTUM7UUFERyxZQUFNLEdBQWlDLElBQUkseUJBQVcsRUFBbUIsQ0FBQzs7SUFDOUUsQ0FBQztJQUpHO1FBREMsa0JBQUksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUM7OENBQ3ZCO0lBR1g7UUFEQyxrQkFBSSxDQUFDLENBQUUsZUFBZSxDQUFFLEVBQUUsaUJBQWlCLENBQUM7a0RBQzZCO0lBQzlFLHFCQUFDO0NBQUEsQUFORCxDQUFvQyxlQUFNLEdBTXpDO0FBTlksd0NBQWM7QUFRM0I7SUFBZ0MsOEJBQU07SUFBdEM7UUFBQSxxRUFnSUM7UUE5SEcsV0FBSyxHQUFnQyxJQUFJLHlCQUFXLEVBQWtCLENBQUM7O0lBOEgzRSxDQUFDO0lBekhVLGlCQUFNLEdBQWIsVUFBZSxRQUFnQjtRQUMzQixJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBNEIsQ0FBQztRQUU3RCxJQUFNLFVBQVUsR0FBRyxJQUFJ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QyxJQUFJLENBQUMsQ0FBQztpQkFDaEY7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBTSxRQUFRLEdBQVEsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFNLFlBQVksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBRXBDOzs7V0FHRztRQUNILEtBQUssSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDL0MsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFekQsSUFBSSxPQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxJQUFNLE9BQU8sR0FBRyxlQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssVUFBVSxDQUFDO2dCQUVuRCxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxJQUFLLFNBQWlCLEVBQUU7b0JBQzFCLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNuQztTQUNKO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQTdIRDtRQURDLGtCQUFJLENBQUMsQ0FBRSxjQUFjLENBQUUsRUFBRSxpQkFBaUIsQ0FBQzs2Q0FDMkI7SUFHdkU7UUFEQyxrQkFBSSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztnREFDakI7SUEySHJCLGlCQUFDO0NBQUEsQUFoSUQsQ0FBZ0MsZUFBTSxHQWdJckM7QUFoSVksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlLCBQcmltaXRpdmVUeXBlLCBDb250ZXh0LCBEZWZpbml0aW9uVHlwZSB9IGZyb20gXCIuL2Fubm90YXRpb25zXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IEFycmF5U2NoZW1hIH0gZnJvbSBcIi4vdHlwZXMvQXJyYXlTY2hlbWFcIjtcbmltcG9ydCB7IGdldFR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0ICogYXMgZGVjb2RlIGZyb20gXCIuL2VuY29kaW5nL2RlY29kZVwiO1xuXG5jb25zdCByZWZsZWN0aW9uQ29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbi8qKlxuICogUmVmbGVjdGlvblxuICovXG5leHBvcnQgY2xhc3MgUmVmbGVjdGlvbkZpZWxkIGV4dGVuZHMgU2NoZW1hIHtcbiAgICBAdHlwZShcInN0cmluZ1wiLCByZWZsZWN0aW9uQ29udGV4dClcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICBAdHlwZShcInN0cmluZ1wiLCByZWZsZWN0aW9uQ29udGV4dClcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICBAdHlwZShcIm51bWJlclwiLCByZWZsZWN0aW9uQ29udGV4dClcbiAgICByZWZlcmVuY2VkVHlwZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUmVmbGVjdGlvblR5cGUgZXh0ZW5kcyBTY2hlbWEge1xuICAgIEB0eXBlKFwibnVtYmVyXCIsIHJlZmxlY3Rpb25Db250ZXh0KVxuICAgIGlkOiBudW1iZXI7XG5cbiAgICBAdHlwZShbIFJlZmxlY3Rpb25GaWVsZCBdLCByZWZsZWN0aW9uQ29udGV4dClcbiAgICBmaWVsZHM6IEFycmF5U2NoZW1hPFJlZmxlY3Rpb25GaWVsZD4gPSBuZXcgQXJyYXlTY2hlbWE8UmVmbGVjdGlvbkZpZWxkPigpO1xufVxuXG5leHBvcnQgY2xhc3MgUmVmbGVjdGlvbiBleHRlbmRzIFNjaGVtYSB7XG4gICAgQHR5cGUoWyBSZWZsZWN0aW9uVHlwZSBdLCByZWZsZWN0aW9uQ29udGV4dClcbiAgICB0eXBlczogQXJyYXlTY2hlbWE8UmVmbGVjdGlvblR5cGU+ID0gbmV3IEFycmF5U2NoZW1hPFJlZmxlY3Rpb25UeXBlPigpO1xuXG4gICAgQHR5cGUoXCJudW1iZXJcIiwgcmVmbGVjdGlvbkNvbnRleHQpXG4gICAgcm9vdFR5cGU6IG51bWJlcjtcblxuICAgIHN0YXRpYyBlbmNvZGUgKGluc3RhbmNlOiBTY2hlbWEpIHtcbiAgICAgICAgY29uc3Qgcm9vdFNjaGVtYVR5cGUgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgU2NoZW1hO1xuXG4gICAgICAgIGNvbnN0IHJlZmxlY3Rpb24gPSBuZXcgUmVmbGVjdGlvbigpO1xuICAgICAgICByZWZsZWN0aW9uLnJvb3RUeXBlID0gcm9vdFNjaGVtYVR5cGUuX3R5cGVpZDtcblxuICAgICAgICBjb25zdCBidWlsZFR5cGUgPSAoY3VycmVudFR5cGU6IFJlZmxlY3Rpb25UeXBlLCBzY2hlbWE6IGFueSkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIGluIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gbmV3IFJlZmxlY3Rpb25GaWVsZCgpO1xuICAgICAgICAgICAgICAgIGZpZWxkLm5hbWUgPSBmaWVsZE5hbWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgZmllbGRUeXBlOiBzdHJpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzY2hlbWFbZmllbGROYW1lXSkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlID0gc2NoZW1hW2ZpZWxkTmFtZV07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc2NoZW1hW2ZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZFR5cGVTY2hlbWE6IHR5cGVvZiBTY2hlbWE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVmYWN0b3IgYmVsb3cuXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIGlmIChTY2hlbWEuaXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZSA9IFwicmVmXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFR5cGVTY2hlbWEgPSBzY2hlbWFbZmllbGROYW1lXTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlID0gT2JqZWN0LmtleXModHlwZSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodHlwZVtmaWVsZFR5cGVdKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZSArPSBcIjpcIiArIHR5cGVbZmllbGRUeXBlXTsgLy8gYXJyYXk6c3RyaW5nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRUeXBlU2NoZW1hID0gdHlwZVtmaWVsZFR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZmllbGQucmVmZXJlbmNlZFR5cGUgPSAoY2hpbGRUeXBlU2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBjaGlsZFR5cGVTY2hlbWEuX3R5cGVpZFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmaWVsZC50eXBlID0gZmllbGRUeXBlO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUeXBlLmZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVmbGVjdGlvbi50eXBlcy5wdXNoKGN1cnJlbnRUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGVzID0gcm9vdFNjaGVtYVR5cGUuX2NvbnRleHQudHlwZXM7XG4gICAgICAgIGZvciAobGV0IHR5cGVpZCBpbiB0eXBlcykge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IG5ldyBSZWZsZWN0aW9uVHlwZSgpO1xuICAgICAgICAgICAgdHlwZS5pZCA9IE51bWJlcih0eXBlaWQpO1xuICAgICAgICAgICAgYnVpbGRUeXBlKHR5cGUsIHR5cGVzW3R5cGVpZF0uX2RlZmluaXRpb24uc2NoZW1hKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZsZWN0aW9uLmVuY29kZUFsbCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWNvZGU8VCBleHRlbmRzIFNjaGVtYSA9IFNjaGVtYT4oYnl0ZXM6IG51bWJlcltdLCBpdD86IGRlY29kZS5JdGVyYXRvcik6IFQge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQoKTtcblxuICAgICAgICBjb25zdCByZWZsZWN0aW9uID0gbmV3IFJlZmxlY3Rpb24oKTtcbiAgICAgICAgcmVmbGVjdGlvbi5kZWNvZGUoYnl0ZXMsIGl0KTtcblxuICAgICAgICBjb25zdCBzY2hlbWFUeXBlcyA9IHJlZmxlY3Rpb24udHlwZXMucmVkdWNlKCh0eXBlcywgcmVmbGVjdGlvblR5cGUpID0+IHtcbiAgICAgICAgICAgIHR5cGVzW3JlZmxlY3Rpb25UeXBlLmlkXSA9IGNsYXNzIF8gZXh0ZW5kcyBTY2hlbWEge307XG4gICAgICAgICAgICByZXR1cm4gdHlwZXM7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICByZWZsZWN0aW9uLnR5cGVzLmZvckVhY2goKHJlZmxlY3Rpb25UeXBlLCBpKSA9PiB7XG4gICAgICAgICAgICByZWZsZWN0aW9uVHlwZS5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hVHlwZSA9IHNjaGVtYVR5cGVzW3JlZmxlY3Rpb25UeXBlLmlkXTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZC5yZWZlcmVuY2VkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZFR5cGUgPSBmaWVsZC50eXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmVHlwZSA9IHNjaGVtYVR5cGVzW2ZpZWxkLnJlZmVyZW5jZWRUeXBlXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBtYXAgb3IgYXJyYXkgb2YgcHJpbWl0aXZlIHR5cGUgKC0xKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZlR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVJbmZvID0gZmllbGQudHlwZS5zcGxpdChcIjpcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGUgPSB0eXBlSW5mb1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZlR5cGUgPSB0eXBlSW5mb1sxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFR5cGUgPT09IFwicmVmXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUocmVmVHlwZSwgY29udGV4dCkoc2NoZW1hVHlwZS5wcm90b3R5cGUsIGZpZWxkLm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlKHsgW2ZpZWxkVHlwZV06IHJlZlR5cGUgfSBhcyBEZWZpbml0aW9uVHlwZSwgY29udGV4dCkoc2NoZW1hVHlwZS5wcm90b3R5cGUsIGZpZWxkLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0eXBlKGZpZWxkLnR5cGUgYXMgUHJpbWl0aXZlVHlwZSwgY29udGV4dCkoc2NoZW1hVHlwZS5wcm90b3R5cGUsIGZpZWxkLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHJvb3RUeXBlOiBhbnkgPSBzY2hlbWFUeXBlc1tyZWZsZWN0aW9uLnJvb3RUeXBlXTtcbiAgICAgICAgY29uc3Qgcm9vdEluc3RhbmNlID0gbmV3IHJvb3RUeXBlKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGF1dG8taW5pdGlhbGl6ZSByZWZlcmVuY2VkIHR5cGVzIG9uIHJvb3QgdHlwZVxuICAgICAgICAgKiB0byBhbGxvdyByZWdpc3RlcmluZyBsaXN0ZW5lcnMgaW1tZWRpYXRlbGx5IG9uIGNsaWVudC1zaWRlXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgaW4gcm9vdFR5cGUuX2RlZmluaXRpb24uc2NoZW1hKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSByb290VHlwZS5fZGVmaW5pdGlvbi5zY2hlbWFbZmllbGROYW1lXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZihmaWVsZFR5cGUpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZURlZiA9IGdldFR5cGUoT2JqZWN0LmtleXMoZmllbGRUeXBlKVswXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTY2hlbWEgPSB0eXBlb2YgKGZpZWxkVHlwZSkgPT09IFwiZnVuY3Rpb25cIjtcblxuICAgICAgICAgICAgICAgIHJvb3RJbnN0YW5jZVtmaWVsZE5hbWVdID0gKGlzU2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICA/IG5ldyAoZmllbGRUeXBlIGFzIGFueSkoKVxuICAgICAgICAgICAgICAgICAgICA6IG5ldyB0eXBlRGVmLmNvbnN0cnVjdG9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm9vdEluc3RhbmNlO1xuICAgIH1cbn0iXX0=

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NoneSerializer = void 0;
var NoneSerializer = /** @class */ (function () {
    function NoneSerializer() {
    }
    NoneSerializer.prototype.setState = function (rawState) { };
    NoneSerializer.prototype.getState = function () { return null; };
    NoneSerializer.prototype.patch = function (patches) { };
    NoneSerializer.prototype.teardown = function () { };
    NoneSerializer.prototype.handshake = function (bytes) { };
    return NoneSerializer;
}());
exports.NoneSerializer = NoneSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9uZVNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplci9Ob25lU2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTtJQUFBO0lBTUEsQ0FBQztJQUxHLGlDQUFRLEdBQVIsVUFBUyxRQUFhLElBQVMsQ0FBQztJQUNoQyxpQ0FBUSxHQUFSLGNBQWEsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNCLDhCQUFLLEdBQUwsVUFBTSxPQUFPLElBQUcsQ0FBQztJQUNqQixpQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUNkLGtDQUFTLEdBQVQsVUFBVSxLQUFlLElBQUcsQ0FBQztJQUNqQyxxQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSBcIi4vU2VyaWFsaXplclwiO1xuXG5leHBvcnQgY2xhc3MgTm9uZVNlcmlhbGl6ZXI8VCA9IGFueT4gaW1wbGVtZW50cyBTZXJpYWxpemVyPFQ+IHtcbiAgICBzZXRTdGF0ZShyYXdTdGF0ZTogYW55KTogdm9pZCB7fVxuICAgIGdldFN0YXRlKCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHBhdGNoKHBhdGNoZXMpIHt9XG4gICAgdGVhcmRvd24oKSB7IH1cbiAgICBoYW5kc2hha2UoYnl0ZXM6IG51bWJlcltdKSB7fVxufVxuIl19

/***/ })
/******/ ]);
});