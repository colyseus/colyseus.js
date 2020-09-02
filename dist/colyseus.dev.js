/*! colyseus.js@0.14.0-alpha.5 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION = exports.TYPE_ID = exports.INDEX_CHANGE = exports.NIL = exports.SWITCH_TO_STRUCTURE = exports.POP_STRUCTURE = exports.PUSH_STRUCTURE = void 0;
exports.PUSH_STRUCTURE = 190;
exports.POP_STRUCTURE = 191;
exports.SWITCH_TO_STRUCTURE = 0xc1; // 193
exports.NIL = 0xc0; // 192
exports.INDEX_CHANGE = 0xd4; // 212
exports.TYPE_ID = 0xd5; // 213
/**
 * Encoding Schema field operations.
 */
var OPERATION;
(function (OPERATION) {
    // add new structure/primitive
    // (128)
    OPERATION[OPERATION["ADD"] = 128] = "ADD";
    // replace structure/primitive
    OPERATION[OPERATION["REPLACE"] = 1] = "REPLACE";
    // delete field
    OPERATION[OPERATION["DELETE"] = 192] = "DELETE";
    // DELETE field, followed by an ADD
    OPERATION[OPERATION["DELETE_AND_ADD"] = 224] = "DELETE_AND_ADD";
    // TOUCH is used to determine hierarchy of nested Schema structures during serialization.
    // touches are NOT encoded.
    OPERATION[OPERATION["TOUCH"] = 0] = "TOUCH";
    // MapSchema Operations
    OPERATION[OPERATION["CLEAR"] = 10] = "CLEAR";
})(OPERATION = exports.OPERATION || (exports.OPERATION = {}));
//# sourceMappingURL=spec.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTree = exports.Root = void 0;
var spec_1 = __webpack_require__(0);
var Schema_1 = __webpack_require__(3);
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
    Root.prototype.addRef = function (refId, ref) {
        this.refs.set(refId, ref);
        this.refCounts[refId] = (this.refCounts[refId] || 0) + 1;
        // console.log("addRef:", { refId });
    };
<<<<<<< HEAD
    // for decoding
    Root.prototype.removeRef = function (refId) {
        this.refCounts[refId] = this.refCounts[refId] - 1;
        this.deletedRefs.add(refId);
        // console.log("removeRef:", { refId });
    };
    // for decoding
    Root.prototype.garbageCollectDeletedRefs = function () {
        var _this = this;
        this.deletedRefs.forEach(function (refId) {
            if (_this.refCounts[refId] <= 0) {
                var ref = _this.refs.get(refId);
                if (ref instanceof Schema_1.Schema) {
                    for (var fieldName in ref['_definition'].schema) {
                        if (typeof (ref['_definition'].schema[fieldName]) !== "string" &&
                            ref[fieldName] &&
                            ref[fieldName]['$changes']) {
                            _this.removeRef(ref[fieldName]['$changes'].refId);
                        }
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
                    }
                }
                _this.refs.delete(refId);
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
        if (!previousChange || previousChange.op === spec_1.OPERATION.DELETE) {
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
//# sourceMappingURL=ChangeTree.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.MapSchema = exports.getMapProxy = void 0;
var ChangeTree_1 = __webpack_require__(1);
var spec_1 = __webpack_require__(0);
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
=======
exports.MapSchema = void 0;
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
        var _this = this;
        if (!this.onAdd) {
            return;
        }
        this.forEach(function (value, key) { return _this.onAdd(value, key); });
    };
    return MapSchema;
}());
exports.MapSchema = MapSchema;
//# sourceMappingURL=MapSchema.js.map

/***/ }),
/* 3 */
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
<<<<<<< HEAD
var spec_1 = __webpack_require__(0);
var annotations_1 = __webpack_require__(7);
var encode = __webpack_require__(13);
var decode = __webpack_require__(14);
var ArraySchema_1 = __webpack_require__(4);
var MapSchema_1 = __webpack_require__(2);
var CollectionSchema_1 = __webpack_require__(5);
var SetSchema_1 = __webpack_require__(6);
var ChangeTree_1 = __webpack_require__(1);
var EventEmitter_1 = __webpack_require__(37);
var filters_1 = __webpack_require__(38);
=======
var spec_1 = __webpack_require__(10);
var encode = __webpack_require__(8);
var decode = __webpack_require__(9);
var ArraySchema_1 = __webpack_require__(0);
var MapSchema_1 = __webpack_require__(1);
var ChangeTree_1 = __webpack_require__(13);
var EventEmitter_1 = __webpack_require__(35);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
            if (byte === spec_1.SWITCH_TO_STRUCTURE) {
                refId = decode.number(bytes, it);
                ref = $root.refs.get(refId);
                //
                // Trying to access a reference that haven't been decoded yet.
                //
                if (!ref) {
                    throw new Error("\"refId\" not found: " + refId);
                }
                // create empty list of changes for this refId.
                changes = [];
                allChanges.set(refId, changes);
                // console.log("SWITCH_TO_STRUCTURE (DECODE)", {
                //     ref: ref.constructor.name,
                //     refId,
                // });
                continue;
            }
            var operation = byte;
            var fieldIndex = decode.number(bytes, it);
            var changeTree = ref['$changes'];
            var isSchema = ref['_definition'];
            var field = (isSchema)
                ? (ref['_definition'].fieldsByIndex && ref['_definition'].fieldsByIndex[fieldIndex])
                : fieldIndex;
            var _field = "_" + field;
            var type = changeTree.getType(fieldIndex);
            var value = void 0;
            var previousValue = void 0;
            var dynamicIndex = void 0;
            if (operation === spec_1.OPERATION.CLEAR) {
                //
                // TODO: refactor me!
                // The `.clear()` method is calling `$root.removeRef(refId)` for
                // each item inside this collection
                //
                ref.clear(true);
                continue;
            }
            if (!isSchema) {
                previousValue = ref['getByIndex'](fieldIndex);
                if (operation === spec_1.OPERATION.ADD ||
                    operation === spec_1.OPERATION.DELETE_AND_ADD) {
                    dynamicIndex = (decode.stringCheck(bytes, it))
                        ? decode.string(bytes, it)
                        : decode.number(bytes, it);
                    ref['setIndex'](field, dynamicIndex);
                }
                else {
                    // here
                    dynamicIndex = ref['getIndex'](fieldIndex);
                }
            }
            else {
                previousValue = ref[_field];
            }
            //
            // TODO: use bitwise operations to check for `DELETE` instead.
            //
            if (operation === spec_1.OPERATION.DELETE ||
                operation === spec_1.OPERATION.DELETE_AND_ADD) {
                if (operation !== spec_1.OPERATION.DELETE_AND_ADD) {
                    ref['deleteByIndex'](fieldIndex);
                }
                // Flag `refId` for garbage collection.
                if (previousValue && previousValue['$changes']) {
                    $root.removeRef(previousValue['$changes'].refId);
                }
                value = null;
            }
            if (field === undefined) {
                console.warn("@colyseus/schema: definition mismatch");
                var nextIterator = { offset: it.offset };
                while (it.offset < totalBytes) {
                    //
                    // keep skipping next bytes until reaches a known structure
                    // by local decoder.
                    //
                    var nextByte = bytes[it.offset + 1];
                    if (nextByte === spec_1.SWITCH_TO_STRUCTURE) {
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
                if (operation !== spec_1.OPERATION.REPLACE
                // operation === OPERATION.ADD ||
                // operation === OPERATION.DELETE_AND_ADD
                ) {
                    var childType = this.getSchemaType(bytes, it);
                    if (!value) {
                        value = this.createTypeInstance(bytes, it, childType || type);
                        value.$changes.refId = refId_1;
                        if (previousValue) {
                            value.onChange = previousValue.onChange;
                            value.onRemove = previousValue.onRemove;
                        }
                    }
                    if (value !== previousValue) {
                        $root.addRef(refId_1, value);
                        // $root.refs.set(refId, value);
                    }
                }
            }
            else if (ArraySchema_1.ArraySchema.is(type)) {
                var refId_2 = decode.number(bytes, it);
                var valueRef = ($root.refs.has(refId_2))
                    ? previousValue
                    : new ArraySchema_1.ArraySchema();
                value = valueRef.clone(true);
                value.$changes.refId = refId_2;
                // preserve schema callbacks
                if (previousValue) {
                    value.onAdd = previousValue.onAdd;
                    value.onRemove = previousValue.onRemove;
                    value.onChange = previousValue.onChange;
                }
                //
                // TODO: trigger onRemove if structure has been replaced.
                //
                // if (!$root.refs.has(refId) && value.length > 0) {
                //     value.forEach((element, i) => {
                //         changes.push({
                //             op: OPERATION.DELETE,
                //             field: i,
                //             // dynamicIndex,
                //             value: undefined,
                //             previousValue: element,
                //         });
                //     });
                // }
                $root.addRef(refId_2, value);
                // $root.refs.set(refId, value);
                value = ArraySchema_1.getArrayProxy(value);
            }
            else if (MapSchema_1.MapSchema.is(type)) {
                var refId_3 = decode.number(bytes, it);
                var valueRef = ($root.refs.has(refId_3))
                    ? previousValue
                    : new MapSchema_1.MapSchema();
                value = valueRef.clone(true);
                value.$changes.refId = refId_3;
                // preserve schema callbacks
                if (previousValue) {
                    value.onAdd = previousValue.onAdd;
                    value.onRemove = previousValue.onRemove;
                    value.onChange = previousValue.onChange;
                }
                $root.addRef(refId_3, value);
                // $root.refs.set(refId, value);
                value = MapSchema_1.getMapProxy(value);
            }
            else if (CollectionSchema_1.CollectionSchema.is(type)) {
                var refId_4 = decode.number(bytes, it);
                var valueRef = ($root.refs.has(refId_4))
                    ? previousValue
                    : new CollectionSchema_1.CollectionSchema();
                value = valueRef.clone(true);
                value.$changes.refId = refId_4;
                // preserve schema callbacks
                if (previousValue) {
                    value.onAdd = previousValue.onAdd;
                    value.onRemove = previousValue.onRemove;
                    value.onChange = previousValue.onChange;
                }
                $root.addRef(refId_4, value);
                // $root.refs.set(refId, value);
            }
            else if (SetSchema_1.SetSchema.is(type)) {
                var refId_5 = decode.number(bytes, it);
                var valueRef = ($root.refs.has(refId_5))
                    ? previousValue
                    : new SetSchema_1.SetSchema();
                value = valueRef.clone(true);
                value.$changes.refId = refId_5;
                // preserve schema callbacks
                if (previousValue) {
                    value.onAdd = previousValue.onAdd;
                    value.onRemove = previousValue.onRemove;
                    value.onChange = previousValue.onChange;
                }
                $root.addRef(refId_5, value);
                // $root.refs.set(refId, value);
            }
            else {
                value = decodePrimitiveType(type, bytes, it);
            }
            var hasChange = (previousValue !== value);
            if (value !== null &&
                value !== undefined) {
                if (value['$changes']) {
                    value['$changes'].setParent(changeTree.ref, changeTree.root, fieldIndex);
                }
                if (ref instanceof Schema) {
                    ref[field] = value;
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
                    ref.setAt(field, value);
                }
                else if (ref instanceof CollectionSchema_1.CollectionSchema ||
                    ref instanceof SetSchema_1.SetSchema) {
                    var index = ref.add(value);
                    ref['setIndex'](field, index);
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
                    field: field,
                    dynamicIndex: dynamicIndex,
                    value: value,
                    previousValue: previousValue,
                });
            }
        }
        this._triggerChanges(allChanges);
        // garbage collection!
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
            // console.log("SWITCH_TO_STRUCTURE (ENCODE)", {
            //     ref: ref.constructor.name,
            //     refId: changeTree.refId
            // });
            // root `refId` is skipped.
            if (changeTree.refId > 0 &&
                (changeTree.changed || encodeAll)) {
                encode.uint8(bytes, spec_1.SWITCH_TO_STRUCTURE);
                encode.number(bytes, changeTree.refId);
            }
            var changes = (encodeAll)
                ? Array.from(changeTree.allChanges)
                : Array.from(changeTree.changes.values());
            // console.log("CHANGES =>", {
            //     changes,
            //     definition: ref['_definition'],
            //     isSchema: ref instanceof Schema,
            //     isMap: ref instanceof MapSchema,
            //     isArray: ref instanceof ArraySchema,
            // });
            for (var j = 0, cl = changes.length; j < cl; j++) {
                var operation = (encodeAll)
                    ? { op: spec_1.OPERATION.ADD, index: changes[j] }
                    : changes[j];
                var fieldIndex = operation.index;
                var field = (isSchema)
                    ? ref['_definition'].fieldsByIndex && ref['_definition'].fieldsByIndex[fieldIndex]
                    : fieldIndex;
                var _field = "_" + field;
                // cache begin index if `useFilters`
                var beginIndex = bytes.length;
                // encode field index + operation
                if (operation.op > spec_1.OPERATION.TOUCH) {
                    encode.uint8(bytes, operation.op);
                    // custom operations
                    if (operation.op === spec_1.OPERATION.CLEAR) {
                        continue;
                    }
                    // indexed operations
                    encode.number(bytes, fieldIndex);
                }
                //
                // encode "alias" for dynamic fields (maps)
                //
                if (!isSchema &&
                    //
                    // TODO: use bitwise operations to check for `DELETE` instead.
                    //
                    (operation.op === spec_1.OPERATION.ADD ||
                        operation.op === spec_1.OPERATION.DELETE_AND_ADD)) {
                    if (ref instanceof MapSchema_1.MapSchema) {
                        //
                        // MapSchema dynamic key
                        //
                        var dynamicIndex = changeTree.ref['$indexes'].get(fieldIndex);
                        encode.string(bytes, dynamicIndex);
                    }
                    else {
                        //
                        // Key from other indexed structures (Array, Collection, etc.)
                        //
                        encode.number(bytes, fieldIndex);
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
                // console.log("ENCODE FIELD", {
                //     ref: ref.constructor.name,
                //     type,
                //     field,
                //     value,
                //     op: OPERATION[operation.op]
                // });
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
                    if (operation.op === spec_1.OPERATION.ADD ||
                        operation.op === spec_1.OPERATION.DELETE_AND_ADD) {
                        this.tryEncodeTypeId(bytes, type, value.constructor);
                    }
                }
                else if (ArraySchema_1.ArraySchema.is(type)) {
                    //
                    // ensure a ArraySchema has been provided
                    //
                    assertInstanceType(ref[_field], ArraySchema_1.ArraySchema, ref, field);
                    //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value.$changes.refId);
                }
                else if (MapSchema_1.MapSchema.is(type)) {
                    //
                    // ensure a MapSchema has been provided
                    //
                    assertInstanceType(ref[_field], MapSchema_1.MapSchema, ref, field);
                    //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value.$changes.refId);
                }
                else if (CollectionSchema_1.CollectionSchema.is(type)) {
                    //
                    // ensure a CollectionSchema has been provided
                    //
                    assertInstanceType(ref[_field], CollectionSchema_1.CollectionSchema, ref, field);
                    //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value.$changes.refId);
                }
                else if (SetSchema_1.SetSchema.is(type)) {
                    //
                    // ensure a SetSchema has been provided
                    //
                    assertInstanceType(ref[_field], SetSchema_1.SetSchema, ref, field);
                    //
                    // Encode refId for this instance.
                    // The actual instance is going to be encoded on next `changeTree` iteration.
                    //
                    encode.number(bytes, value.$changes.refId);
                }
                else {
                    encodePrimitiveType(type, bytes, value, ref, field);
                    // const tempBytes = [];
                    // encodePrimitiveType(type as PrimitiveType, tempBytes, value, ref as Schema, field);
                    // console.log("ENCODE PRIMITIVE TYPE:", {
                    //     ref: ref.constructor.name,
                    //     field,
                    //     value,
                    //     bytes: tempBytes,
                    // })
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
                    encode.uint8(filteredBytes, change.op);
                    encode.number(filteredBytes, fieldIndex);
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
                            else {
                                //
                                // Key from other indexed structures (Array, Collection, etc.)
                                //
                                encode.number(filteredBytes, fieldIndex);
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
                    else {
                        //
                        // Key from other indexed structures (Array, Collection, etc.)
                        //
                        encode.number(filteredBytes, fieldIndex);
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
        var changes = [];
        var schema = this._definition.schema;
        for (var field in schema) {
            if (this[field] !== undefined) {
                changes.push({
                    op: spec_1.OPERATION.REPLACE,
                    field: field,
                    value: this[field],
                    previousValue: undefined
                });
            }
        }
        try {
            var allChanges = new Map();
            allChanges.set(this.$changes.refId, changes);
            this._triggerChanges(allChanges);
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
        delete this[this._definition.fieldsByIndex[index]];
    };
    Schema.prototype.tryEncodeTypeId = function (bytes, type, targetType) {
        if (type._typeid !== targetType._typeid) {
            encode.uint8(bytes, spec_1.TYPE_ID);
            encode.uint8(bytes, targetType._typeid);
        }
    };
    Schema.prototype.getSchemaType = function (bytes, it) {
        var type;
        if (bytes[it.offset] === spec_1.TYPE_ID) {
            it.offset++;
            type = this.constructor._context.get(decode.uint8(bytes, it));
        }
        return type;
    };
    Schema.prototype.createTypeInstance = function (bytes, it, type) {
        var instance = new type();
        // assign root on $changes
        instance.$changes.root = this.$changes.root;
        return instance;
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
                        if (change.op === spec_1.OPERATION.ADD && !change.previousValue) {
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
                    if ((change.op === spec_1.OPERATION.DELETE ||
                        change.op === spec_1.OPERATION.DELETE_AND_ADD) &&
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
//# sourceMappingURL=Schema.js.map

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
var ChangeTree_1 = __webpack_require__(1);
var spec_1 = __webpack_require__(0);
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
                obj.setAt(parseInt(indexes[prop] || prop), setValue);
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
        //
        // TODO: touch `$changes`
        //
        // this.$items.reverse();
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
        var indexes = Array.from(this.$items.keys());
        var addCount = items.length;
        items.forEach(function (item, i) {
            var previousIndex = indexes[i];
            var previousValue = _this.$items.get(previousIndex);
            _this.setAt(previousIndex, item);
            if (previousValue)
                _this.push();
        });
        return this.length;
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
        return Array.from(this.$items.values()).indexOf(searchElement, fromIndex);
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
    Object.defineProperty(ArraySchema.prototype, "size", {
        get: function () {
            return this.$items.size;
        },
        enumerable: false,
        configurable: true
    });
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
        var _this = this;
        if (!this.onAdd) {
            return;
        }
        this.forEach(function (value, key) { return _this.onAdd(value, key); });
    };
    return ArraySchema;
}());
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=ArraySchema.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionSchema = void 0;
var ChangeTree_1 = __webpack_require__(1);
var spec_1 = __webpack_require__(0);
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
        var _this = this;
        if (!this.onAdd) {
            return;
        }
        this.forEach(function (value, key) { return _this.onAdd(value, key); });
    };
    return CollectionSchema;
}());
exports.CollectionSchema = CollectionSchema;
//# sourceMappingURL=CollectionSchema.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSchema = void 0;
var ChangeTree_1 = __webpack_require__(1);
var spec_1 = __webpack_require__(0);
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
        var _this = this;
        if (!this.onAdd) {
            return;
        }
        this.forEach(function (value, key) { return _this.onAdd(value, key); });
    };
    return SetSchema;
}());
exports.SetSchema = SetSchema;
//# sourceMappingURL=SetSchema.js.map

/***/ }),
/* 7 */
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
var Schema_1 = __webpack_require__(3);
var ArraySchema_1 = __webpack_require__(4);
var MapSchema_1 = __webpack_require__(2);
var CollectionSchema_1 = __webpack_require__(5);
var SetSchema_1 = __webpack_require__(6);
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
        this.schema[field] = type;
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
        var type = this.schema[field];
        var index = this.indexes[field];
        if (CollectionSchema_1.CollectionSchema.is(type) ||
            ArraySchema_1.ArraySchema.is(type) ||
            MapSchema_1.MapSchema.is(type) ||
            SetSchema_1.SetSchema.is(type)) {
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
//# sourceMappingURL=annotations.js.map

/***/ }),
<<<<<<< HEAD
/* 8 */
=======
/* 3 */
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
/* 9 */
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
<<<<<<< HEAD
var msgpack = __importStar(__webpack_require__(10));
var strong_events_1 = __webpack_require__(23);
var nanoevents_1 = __webpack_require__(24);
var Connection_1 = __webpack_require__(25);
var Serializer_1 = __webpack_require__(11);
var Protocol_1 = __webpack_require__(12);
var encode = __importStar(__webpack_require__(13));
var decode = __importStar(__webpack_require__(14));
=======
var msgpack = __importStar(__webpack_require__(5));
var strong_events_1 = __webpack_require__(21);
var nanoevents_1 = __webpack_require__(22);
var Connection_1 = __webpack_require__(23);
var Serializer_1 = __webpack_require__(6);
var Protocol_1 = __webpack_require__(7);
var encode = __importStar(__webpack_require__(8));
var decode = __importStar(__webpack_require__(9));
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
<<<<<<< HEAD
        this.onError(function (code, message) { return console.error("colyseus.js - onError => (" + code + ") " + message); });
=======
        else {
            // TODO: remove default serializer. it should arrive only after JOIN_ROOM.
            this.serializer = new (Serializer_1.getSerializer("fossil-delta"));
        }
        this.onError(function (code, message) { return console.warn("colyseus.js - onError => (" + code + ") " + message); });
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
<<<<<<< HEAD
var decode_1 = __importDefault(__webpack_require__(21));
var encode_1 = __importDefault(__webpack_require__(22));
=======
var decode_1 = __importDefault(__webpack_require__(19));
var encode_1 = __importDefault(__webpack_require__(20));
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
exports.decode = decode_1.default;
exports.encode = encode_1.default;


/***/ }),
/* 11 */
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


/***/ }),
/* 12 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.indexChangeCheck = exports.switchStructureCheck = exports.nilCheck = exports.arrayCheck = exports.numberCheck = exports.number = exports.stringCheck = exports.string = exports.boolean = exports.readFloat64 = exports.readFloat32 = exports.uint64 = exports.int64 = exports.float64 = exports.float32 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = void 0;
var spec_1 = __webpack_require__(0);
=======
exports.indexChangeCheck = exports.nilCheck = exports.arrayCheck = exports.numberCheck = exports.number = exports.stringCheck = exports.string = exports.boolean = exports.readFloat64 = exports.readFloat32 = exports.uint64 = exports.int64 = exports.float64 = exports.float32 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = void 0;
var spec_1 = __webpack_require__(10);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
function switchStructureCheck(bytes, it) {
    return bytes[it.offset] === spec_1.SWITCH_TO_STRUCTURE;
}
exports.switchStructureCheck = switchStructureCheck;
function indexChangeCheck(bytes, it) {
    return bytes[it.offset] === spec_1.INDEX_CHANGE;
}
exports.indexChangeCheck = indexChangeCheck;
//# sourceMappingURL=decode.js.map

/***/ }),
<<<<<<< HEAD
/* 15 */
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
<<<<<<< HEAD
var http = __importStar(__webpack_require__(8));
var Storage_1 = __webpack_require__(29);
=======
var http = __importStar(__webpack_require__(3));
var Storage_1 = __webpack_require__(27);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
<<<<<<< HEAD
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
var Schema_1 = __webpack_require__(3);
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return Schema_1.Schema; } });
var MapSchema_1 = __webpack_require__(2);
Object.defineProperty(exports, "MapSchema", { enumerable: true, get: function () { return MapSchema_1.MapSchema; } });
var ArraySchema_1 = __webpack_require__(4);
Object.defineProperty(exports, "ArraySchema", { enumerable: true, get: function () { return ArraySchema_1.ArraySchema; } });
var CollectionSchema_1 = __webpack_require__(5);
Object.defineProperty(exports, "CollectionSchema", { enumerable: true, get: function () { return CollectionSchema_1.CollectionSchema; } });
var SetSchema_1 = __webpack_require__(6);
Object.defineProperty(exports, "SetSchema", { enumerable: true, get: function () { return SetSchema_1.SetSchema; } });
// Utils
var utils_1 = __webpack_require__(39);
Object.defineProperty(exports, "dumpChanges", { enumerable: true, get: function () { return utils_1.dumpChanges; } });
// Reflection
var Reflection_1 = __webpack_require__(40);
Object.defineProperty(exports, "Reflection", { enumerable: true, get: function () { return Reflection_1.Reflection; } });
Object.defineProperty(exports, "ReflectionType", { enumerable: true, get: function () { return Reflection_1.ReflectionType; } });
Object.defineProperty(exports, "ReflectionField", { enumerable: true, get: function () { return Reflection_1.ReflectionField; } });
var annotations_1 = __webpack_require__(7);
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
//# sourceMappingURL=index.js.map
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = exports.FossilDeltaSerializer = exports.registerSerializer = void 0;
<<<<<<< HEAD
__webpack_require__(18);
var Client_1 = __webpack_require__(19);
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Protocol_1 = __webpack_require__(12);
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return Protocol_1.Protocol; } });
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return Protocol_1.ErrorCode; } });
var Room_1 = __webpack_require__(9);
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return Room_1.Room; } });
var Auth_1 = __webpack_require__(15);
=======
__webpack_require__(16);
var Client_1 = __webpack_require__(17);
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Protocol_1 = __webpack_require__(7);
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return Protocol_1.Protocol; } });
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return Protocol_1.ErrorCode; } });
var Room_1 = __webpack_require__(4);
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return Room_1.Room; } });
var Auth_1 = __webpack_require__(11);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_1.Auth; } });
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return Auth_1.Platform; } });
/*
 * Serializers
 */
<<<<<<< HEAD
var FossilDeltaSerializer_1 = __webpack_require__(31);
Object.defineProperty(exports, "FossilDeltaSerializer", { enumerable: true, get: function () { return FossilDeltaSerializer_1.FossilDeltaSerializer; } });
var SchemaSerializer_1 = __webpack_require__(36);
Object.defineProperty(exports, "SchemaSerializer", { enumerable: true, get: function () { return SchemaSerializer_1.SchemaSerializer; } });
var NoneSerializer_1 = __webpack_require__(41);
var Serializer_1 = __webpack_require__(11);
=======
var FossilDeltaSerializer_1 = __webpack_require__(29);
Object.defineProperty(exports, "FossilDeltaSerializer", { enumerable: true, get: function () { return FossilDeltaSerializer_1.FossilDeltaSerializer; } });
var SchemaSerializer_1 = __webpack_require__(34);
Object.defineProperty(exports, "SchemaSerializer", { enumerable: true, get: function () { return SchemaSerializer_1.SchemaSerializer; } });
var Serializer_1 = __webpack_require__(6);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function () { return Serializer_1.registerSerializer; } });
Serializer_1.registerSerializer('fossil-delta', FossilDeltaSerializer_1.FossilDeltaSerializer);
Serializer_1.registerSerializer('schema', SchemaSerializer_1.SchemaSerializer);
Serializer_1.registerSerializer('none', NoneSerializer_1.NoneSerializer);


/***/ }),
/* 18 */
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
/* 19 */
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
<<<<<<< HEAD
var http_1 = __webpack_require__(8);
var ServerError_1 = __webpack_require__(20);
var Room_1 = __webpack_require__(9);
var Auth_1 = __webpack_require__(15);
var Push_1 = __webpack_require__(30);
=======
var http_1 = __webpack_require__(3);
var ServerError_1 = __webpack_require__(18);
var Room_1 = __webpack_require__(4);
var Auth_1 = __webpack_require__(11);
var Push_1 = __webpack_require__(28);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
/* 21 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
<<<<<<< HEAD
var websocket_1 = __importDefault(__webpack_require__(26));
=======
var websocket_1 = __importDefault(__webpack_require__(24));
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var createBackoff=__webpack_require__(27).createBackoff;var WebSocketImpl=typeof WebSocket!=="undefined"?WebSocket:__webpack_require__(28);var WebSocketClient=function(){/**
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.createBackoff=createBackoff;var backoff={exponential:function exponential(attempt,delay){return Math.floor(Math.random()*Math.pow(2,attempt)*delay);},fibonacci:function fibonacci(attempt,delay){var current=1;if(attempt>current){var prev=1,current=2;for(var index=2;index<attempt;index++){var next=prev+current;prev=current;current=next;}}return Math.floor(Math.random()*current*delay);}};function createBackoff(type,options){return new Backoff(backoff[type],options);}function Backoff(func,options){this.func=func;this.attempts=0;this.delay=typeof options.initialDelay!=="undefined"?options.initialDelay:100;}Backoff.prototype.backoff=function(){setTimeout(this.onReady,this.func(++this.attempts,this.delay));};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 29 */
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
/* 30 */
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
/* 31 */
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
<<<<<<< HEAD
var state_listener_1 = __webpack_require__(32);
var fossilDelta = __importStar(__webpack_require__(35));
var msgpack = __importStar(__webpack_require__(10));
=======
var state_listener_1 = __webpack_require__(30);
var fossilDelta = __importStar(__webpack_require__(33));
var msgpack = __importStar(__webpack_require__(5));
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StateContainer_1 = __webpack_require__(33);
exports.StateContainer = StateContainer_1.StateContainer;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = __webpack_require__(34);
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
/* 34 */
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSerializer = void 0;
<<<<<<< HEAD
var schema_1 = __webpack_require__(16);
=======
var schema_1 = __webpack_require__(12);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
            this.state = schema_1.Reflection.decode(bytes, it);
        }
    };
    return SchemaSerializer;
}());
exports.SchemaSerializer = SchemaSerializer;


/***/ }),
/* 37 */
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
//# sourceMappingURL=EventEmitter.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
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
=======
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
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
//# sourceMappingURL=index.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpChanges = void 0;
var _1 = __webpack_require__(16);
var MapSchema_1 = __webpack_require__(2);
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
//# sourceMappingURL=utils.js.map

/***/ }),
/* 40 */
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
<<<<<<< HEAD
var annotations_1 = __webpack_require__(7);
var Schema_1 = __webpack_require__(3);
var ArraySchema_1 = __webpack_require__(4);
var MapSchema_1 = __webpack_require__(2);
var CollectionSchema_1 = __webpack_require__(5);
var SetSchema_1 = __webpack_require__(6);
=======
var annotations_1 = __webpack_require__(14);
var Schema_1 = __webpack_require__(2);
var ArraySchema_1 = __webpack_require__(0);
var MapSchema_1 = __webpack_require__(1);
>>>>>>> 8fb833b... use console.warn instead of console.error for internal errors. colyseus/colyseus#363
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
                    var type_1 = schema[fieldName];
                    var childTypeSchema = void 0;
                    //
                    // TODO: refactor below.
                    //
                    if (Schema_1.Schema.is(type_1)) {
                        fieldType = "ref";
                        childTypeSchema = schema[fieldName];
                    }
                    else if (ArraySchema_1.ArraySchema.is(type_1)) {
                        fieldType = "array";
                        if (typeof (schema[fieldName][0]) === "string") {
                            fieldType += ":" + schema[fieldName][0]; // array:string
                        }
                        else {
                            childTypeSchema = schema[fieldName][0];
                        }
                    }
                    else if (MapSchema_1.MapSchema.is(type_1)) {
                        fieldType = "map";
                        if (typeof (schema[fieldName].map) === "string") {
                            fieldType += ":" + schema[fieldName].map; // array:string
                        }
                        else {
                            childTypeSchema = schema[fieldName].map;
                        }
                    }
                    else if (CollectionSchema_1.CollectionSchema.is(type_1)) {
                        fieldType = "collection";
                        if (typeof (schema[fieldName].collection) === "string") {
                            fieldType += ":" + schema[fieldName].collection; // collection:string
                        }
                        else {
                            childTypeSchema = schema[fieldName].collection;
                        }
                    }
                    else if (SetSchema_1.SetSchema.is(type_1)) {
                        fieldType = "set";
                        if (typeof (schema[fieldName].set) === "string") {
                            fieldType += ":" + schema[fieldName].set; // set:string
                        }
                        else {
                            childTypeSchema = schema[fieldName].set;
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
                    else if (field.type.indexOf("collection") === 0) {
                        annotations_1.type({ collection: refType }, context)(schemaType.prototype, field.name);
                    }
                    else if (field.type.indexOf("set") === 0) {
                        annotations_1.type({ set: refType }, context)(schemaType.prototype, field.name);
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
        for (var fieldName in rootType._definition.schema) {
            var fieldType = rootType._definition.schema[fieldName];
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

/***/ }),
/* 41 */
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


/***/ })
/******/ ]);
});