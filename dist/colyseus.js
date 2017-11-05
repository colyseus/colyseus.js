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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports.encode = __webpack_require__(11);
exports.decode = __webpack_require__(12);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SlotList_1 = __webpack_require__(7);
var Slot_1 = __webpack_require__(0);
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DeluxeSignal_1 = __webpack_require__(13);
exports.DeluxeSignal = DeluxeSignal_1.DeluxeSignal;
var GenericEvent_1 = __webpack_require__(14);
exports.GenericEvent = GenericEvent_1.GenericEvent;
var IOnceSignal_1 = __webpack_require__(15);
exports.IOnceSignal = IOnceSignal_1.IOnceSignal;
var IPrioritySignal_1 = __webpack_require__(16);
exports.IPrioritySignal = IPrioritySignal_1.IPrioritySignal;
var ISignal_1 = __webpack_require__(17);
exports.ISignal = ISignal_1.ISignal;
var ISlot_1 = __webpack_require__(18);
exports.ISlot = ISlot_1.ISlot;
var MonoSignal_1 = __webpack_require__(19);
exports.MonoSignal = MonoSignal_1.MonoSignal;
var OnceSignal_1 = __webpack_require__(2);
exports.OnceSignal = OnceSignal_1.OnceSignal;
var PrioritySignal_1 = __webpack_require__(5);
exports.PrioritySignal = PrioritySignal_1.PrioritySignal;
var Promise_1 = __webpack_require__(20);
exports.Promise = Promise_1.Promise;
var Signal_1 = __webpack_require__(6);
exports.Signal = Signal_1.Signal;
var Slot_1 = __webpack_require__(0);
exports.Slot = Slot_1.Slot;
var SlotList_1 = __webpack_require__(7);
exports.SlotList = SlotList_1.SlotList;
//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
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
var Signal_1 = __webpack_require__(6);
var Slot_1 = __webpack_require__(0);
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
/* 6 */
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
var OnceSignal_1 = __webpack_require__(2);
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
/* 7 */
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
/* 8 */
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
var signals_js_1 = __webpack_require__(4);
var Clock = __webpack_require__(21);
var delta_listener_1 = __webpack_require__(22);
var msgpack = __webpack_require__(1);
var fossilDelta = __webpack_require__(25);
var Protocol_1 = __webpack_require__(3);
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
        this._previousState = new Uint8Array(msgpack.encode(state));
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
        this._previousState = new Uint8Array(fossilDelta.apply(this._previousState, binaryPatch, { verifyChecksum: false }));
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = __webpack_require__(10);
exports.Client = Client_1.Client;
var Protocol_1 = __webpack_require__(3);
exports.Protocol = Protocol_1.Protocol;
var Room_1 = __webpack_require__(8);
exports.Room = Room_1.Room;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var msgpack = __webpack_require__(1);
var signals_js_1 = __webpack_require__(4);
var Protocol_1 = __webpack_require__(3);
var Room_1 = __webpack_require__(8);
var Connection_1 = __webpack_require__(26);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    } else {
      throw new Error('String too long');
    }
    defers.push({ str: value, length: length, offset: bytes.length });
    return size + length;
  }
  if (type === 'number') {
    // TODO: encode to float 32?

    // float 64
    if (Math.floor(value) !== value || !isFinite(value)) {
      bytes.push(0xcb);
      defers.push({ float: value, length: 8, offset: bytes.length });
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
    } else {
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
      } else {
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
      } else
      // bin 16
      if (length < 0x10000) {
        bytes.push(0xc5, length >> 8, length);
        size = 3;
      } else
      // bin 32
      if (length < 0x100000000) {
        bytes.push(0xc6, length >> 24, length >> 16, length >> 8, length);
        size = 5;
      } else {
        throw new Error('Buffer too large');
      }
      defers.push({ bin: value, length: length, offset: bytes.length });
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
    } else {
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
    nextOffset = defers[0].offset;
  }

  var defer, deferLength = 0, offset = 0;
  for (var i = 0, l = bytes.length; i < l; i++) {
    view.setUint8(deferWritten + i, bytes[i]);
    if (i + 1 !== nextOffset) { continue; }
    defer = defers[deferIndex];
    deferLength = defer.length;
    offset = deferWritten + nextOffset;
    if (defer.bin) {
      var bin = new Uint8Array(defer.bin);
      for (var j = 0; j < deferLength; j++) {
        view.setUint8(offset + j, bin[j]);
      }
    } else if (defer.str) {
      utf8Write(view, offset, defer.str);
    } else if (defer.float !== undefined) {
      view.setFloat64(offset, defer.float);
    }
    deferIndex++;
    deferWritten += deferLength;
    if (defers[deferIndex]) {
      nextOffset = defers[deferIndex].offset;
    }
  }
  return buf;
}

module.exports = encode;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Decoder(buffer) {
  this.offset = 0;
  if (buffer instanceof ArrayBuffer) {
    this.buffer = buffer;
    this.view = new DataView(this.buffer);
  } else if (ArrayBuffer.isView(buffer)) {
    this.buffer = buffer.buffer;
    this.view = new DataView(this.buffer, buffer.byteOffset, buffer.byteLength);
  } else {
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
      string += String.fromCharCode(
        ((byte & 0x0f) << 6) |
        (view.getUint8(++i) & 0x3f)
      );
      continue;
    }
    if ((byte & 0xf0) === 0xe0) {
      string += String.fromCharCode(
        ((byte & 0x0f) << 12) |
        ((view.getUint8(++i) & 0x3f) << 6) |
        ((view.getUint8(++i) & 0x3f) << 0)
      );
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
      } else {
        string += String.fromCharCode(chr);
      }
      continue;
    }
    throw new Error('Invalid byte ' + byte.toString(16));
  }
  return string;
}

Decoder.prototype.array = function (length) {
  var value = new Array(length);
  for (var i = 0; i < length; i++) {
    value[i] = this.parse();
  }
  return value;
};

Decoder.prototype.map = function (length) {
  var key = '', value = {};
  for (var i = 0; i < length; i++) {
    key = this.parse();
    value[key] = this.parse();
  }
  return value;
};

Decoder.prototype.str = function (length) {
  var value = utf8Read(this.view, this.offset, length);
  this.offset += length;
  return value;
};

Decoder.prototype.bin = function (length) {
  var value = this.buffer.slice(this.offset, this.offset + length);
  this.offset += length;
  return value;
};

Decoder.prototype.parse = function () {
  var prefix = this.view.getUint8(this.offset++);
  var value, length = 0, type = 0, hi = 0, lo = 0;

  if (prefix < 0xc0) {
    // positive fixint
    if (prefix < 0x80) {
      return prefix;
    }
    // fixmap
    if (prefix < 0x90) {
      return this.map(prefix & 0x0f);
    }
    // fixarray
    if (prefix < 0xa0) {
      return this.array(prefix & 0x0f);
    }
    // fixstr
    return this.str(prefix & 0x1f);
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
      length = this.view.getUint8(this.offset);
      this.offset += 1;
      return this.bin(length);
    case 0xc5:
      length = this.view.getUint16(this.offset);
      this.offset += 2;
      return this.bin(length);
    case 0xc6:
      length = this.view.getUint32(this.offset);
      this.offset += 4;
      return this.bin(length);

    // ext
    case 0xc7:
      length = this.view.getUint8(this.offset);
      type = this.view.getInt8(this.offset + 1);
      this.offset += 2;
      return [type, this.bin(length)];
    case 0xc8:
      length = this.view.getUint16(this.offset);
      type = this.view.getInt8(this.offset + 2);
      this.offset += 3;
      return [type, this.bin(length)];
    case 0xc9:
      length = this.view.getUint32(this.offset);
      type = this.view.getInt8(this.offset + 4);
      this.offset += 5;
      return [type, this.bin(length)];

    // float
    case 0xca:
      value = this.view.getFloat32(this.offset);
      this.offset += 4;
      return value;
    case 0xcb:
      value = this.view.getFloat64(this.offset);
      this.offset += 8;
      return value;

    // uint
    case 0xcc:
      value = this.view.getUint8(this.offset);
      this.offset += 1;
      return value;
    case 0xcd:
      value = this.view.getUint16(this.offset);
      this.offset += 2;
      return value;
    case 0xce:
      value = this.view.getUint32(this.offset);
      this.offset += 4;
      return value;
    case 0xcf:
      hi = this.view.getUint32(this.offset) * Math.pow(2, 32);
      lo = this.view.getUint32(this.offset + 4);
      this.offset += 8;
      return hi + lo;

    // int
    case 0xd0:
      value = this.view.getInt8(this.offset);
      this.offset += 1;
      return value;
    case 0xd1:
      value = this.view.getInt16(this.offset);
      this.offset += 2;
      return value;
    case 0xd2:
      value = this.view.getInt32(this.offset);
      this.offset += 4;
      return value;
    case 0xd3:
      hi = this.view.getInt32(this.offset) * Math.pow(2, 32);
      lo = this.view.getUint32(this.offset + 4);
      this.offset += 8;
      return hi + lo;

    // fixext
    case 0xd4:
      type = this.view.getInt8(this.offset);
      this.offset += 1;
      if (type === 0x00) {
        this.offset += 1;
        return void 0;
      }
      return [type, this.bin(1)];
    case 0xd5:
      type = this.view.getInt8(this.offset);
      this.offset += 1;
      return [type, this.bin(2)];
    case 0xd6:
      type = this.view.getInt8(this.offset);
      this.offset += 1;
      return [type, this.bin(4)];
    case 0xd7:
      type = this.view.getInt8(this.offset);
      this.offset += 1;
      if (type === 0x00) {
        hi = this.view.getInt32(this.offset) * Math.pow(2, 32);
        lo = this.view.getUint32(this.offset + 4);
        this.offset += 8;
        return new Date(hi + lo);
      }
      return [type, this.bin(8)];
    case 0xd8:
      type = this.view.getInt8(this.offset);
      this.offset += 1;
      return [type, this.bin(16)];

    // str
    case 0xd9:
      length = this.view.getUint8(this.offset);
      this.offset += 1;
      return this.str(length);
    case 0xda:
      length = this.view.getUint16(this.offset);
      this.offset += 2;
      return this.str(length);
    case 0xdb:
      length = this.view.getUint32(this.offset);
      this.offset += 4;
      return this.str(length);

    // array
    case 0xdc:
      length = this.view.getUint16(this.offset);
      this.offset += 2;
      return this.array(length);
    case 0xdd:
      length = this.view.getUint32(this.offset);
      this.offset += 4;
      return this.array(length);

    // map
    case 0xde:
      length = this.view.getUint16(this.offset);
      this.offset += 2;
      return this.map(length);
    case 0xdf:
      length = this.view.getUint32(this.offset);
      this.offset += 4;
      return this.map(length);
  }

  throw new Error('Could not parse');
};

function decode(buffer) {
  var decoder = new Decoder(buffer);
  var value = decoder.parse();
  if (decoder.offset !== buffer.byteLength) {
    throw new Error((buffer.byteLength - decoder.offset) + ' trailing bytes');
  }
  return value;
}

module.exports = decode;


/***/ }),
/* 13 */
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
var PrioritySignal_1 = __webpack_require__(5);
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.IOnceSignal = Symbol("IOnceSignal");
//# sourceMappingURL=IOnceSignal.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.IPrioritySignal = Symbol("IPrioritySignal");
//# sourceMappingURL=IPrioritySignal.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.ISignal = Symbol("ISignal");
//# sourceMappingURL=ISignal.js.map

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Slot_1 = __webpack_require__(0);
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
/* 20 */
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
var OnceSignal_1 = __webpack_require__(2);
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DeltaContainer_1 = __webpack_require__(23);
exports.DeltaContainer = DeltaContainer_1.DeltaContainer;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = __webpack_require__(24);
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
/* 24 */
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
/* 25 */
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
var websocket_1 = __webpack_require__(27);
var msgpack = __webpack_require__(1);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var createBackoff=__webpack_require__(28).createBackoff;var WebSocketClient=function(){/**
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.createBackoff=createBackoff;var backoff={exponential:function exponential(attempt,delay){return Math.floor(Math.random()*Math.pow(2,attempt)*delay);},fibonacci:function fibonacci(attempt,delay){var current=1;if(attempt>current){var prev=1,current=2;for(var index=2;index<attempt;index++){var next=prev+current;prev=current;current=next;}}return Math.floor(Math.random()*current*delay);}};function createBackoff(type,options){return new Backoff(backoff[type],options);}function Backoff(func,options){this.func=func;this.attempts=0;this.delay=typeof options.initialDelay!=="undefined"?options.initialDelay:100;}Backoff.prototype.backoff=function(){setTimeout(this.onReady,this.func(++this.attempts,this.delay));};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTRiMDU2MjU1MGI5ZWM4NzIxNTkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm90ZXBhY2suaW8vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3RvY29sLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Qcmlvcml0eVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jvb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9DbGllbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vdGVwYWNrLmlvL2Jyb3dzZXIvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub3RlcGFjay5pby9icm93c2VyL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9EZWx1eGVTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvZXZlbnRzL0dlbmVyaWNFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JUHJpb3JpdHlTaWduYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNpZ25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2xvdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Nb25vU2lnbmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vY2xvY2svZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsdGEtbGlzdGVuZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvRGVsdGFDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlbHRhLWxpc3RlbmVyL2xpYi9jb21wYXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb3NzaWwtZGVsdGEvZm9zc2lsLWRlbHRhLmpzIiwid2VicGFjazovLy8uL3NyYy9Db25uZWN0aW9uLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZ2FtZXN0ZGlvL3dlYnNvY2tldC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vd2Vic29ja2V0L2xpYi9iYWNrb2ZmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsY0FBYztBQUM1QyxrQ0FBa0MsY0FBYztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGdDOzs7Ozs7QUNyTEE7QUFDQTs7Ozs7Ozs7QUNEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQSw4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Ozs7Ozs7O0FDL0RBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGFBQWE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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RjtBQUMvRjtBQUNBLE1BQU0sRUFBRSx3Q0FBd0MsbUNBQW1DLG9CQUFvQixpQ0FBaUM7QUFDeEk7QUFDQSxNQUFNLEVBQUUsNkNBQTZDLHdDQUF3QyxvQkFBb0IsdUNBQXVDLEdBQUcsd0JBQXdCLEdBQUc7QUFDdEw7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQ0FBMkMsZ0M7Ozs7Ozs7QUMzRTlCLDRDQUE0QyxXQUFXLEVBQUUsb0NBQW9DLGFBQWEsZ0RBQWdELDREQUE0RCw2Q0FBNkMsY0FBYyxvQkFBb0IscUJBQXFCLGdCQUFnQixjQUFjLFNBQVMsc0JBQXNCLGFBQWEsZUFBZSxrREFBa0QscUNBQXFDLDJDQUEyQywrQkFBK0IsZUFBZSxnQkFBZ0IsK0VBQStFLHFDQUFxQyxpRSIsImZpbGUiOiJjb2x5c2V1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE0YjA1NjI1NTBiOWVjODcyMTU5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoZSBTbG90IGNsYXNzIHJlcHJlc2VudHMgYSBzaWduYWwgc2xvdC5cbiAqXG4gKiBAYXV0aG9yIFJvYmVydCBQZW5uZXJcbiAqIEBhdXRob3IgSm9hIEViZXJ0XG4gKi9cbnZhciBTbG90ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IFNsb3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFRoZSBsaXN0ZW5lciBhc3NvY2lhdGVkIHdpdGggdGhlIHNsb3QuXG4gICAgICogQHBhcmFtIHNpZ25hbCBUaGUgc2lnbmFsIGFzc29jaWF0ZWQgd2l0aCB0aGUgc2xvdC5cbiAgICAgKiBAcGFyYW0gb25jZSBXaGV0aGVyIG9yIG5vdCB0aGUgbGlzdGVuZXIgc2hvdWxkIGJlIGV4ZWN1dGVkIG9ubHkgb25jZS5cbiAgICAgKiBAcGFyYW0gcHJpb3JpdHkgVGhlIHByaW9yaXR5IG9mIHRoZSBzbG90LlxuICAgICAqXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKiBAdGhyb3dzIEVycm9yIDxjb2RlPkVycm9yPC9jb2RlPjogSW50ZXJuYWwgc2lnbmFsIHJlZmVyZW5jZSBoYXMgbm90IGJlZW4gc2V0IHlldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTbG90KGxpc3RlbmVyLCBzaWduYWwsIG9uY2UsIHByaW9yaXR5KSB7XG4gICAgICAgIGlmIChvbmNlID09PSB2b2lkIDApIHsgb25jZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb25jZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wcmlvcml0eSA9IDA7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHRoaXMuX29uY2UgPSBvbmNlO1xuICAgICAgICB0aGlzLl9zaWduYWwgPSBzaWduYWw7XG4gICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMudmVyaWZ5TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLmV4ZWN1dGUwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9vbmNlKVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmFtcyAmJiB0aGlzLl9wYXJhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lci5hcHBseShudWxsLCB0aGlzLl9wYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqL1xuICAgIFNsb3QucHJvdG90eXBlLmV4ZWN1dGUxID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX29uY2UpXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICBpZiAodGhpcy5fcGFyYW1zICYmIHRoaXMuX3BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyLmFwcGx5KG51bGwsIFt2YWx1ZV0uY29uY2F0KHRoaXMuX3BhcmFtcykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyKHZhbHVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uICh2YWx1ZU9iamVjdHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5fb25jZSlcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgcGFyYW1ldGVycywgYWRkIHRoZW0gdG8gdGhlIHZhbHVlT2JqZWN0XG4gICAgICAgIC8vIE5vdGU6IFRoaXMgY291bGQgYmUgZXhwZW5zaXZlIGlmIHdlJ3JlIGFmdGVyIHRoZSBmYXN0ZXN0IGRpc3BhdGNoIHBvc3NpYmxlLlxuICAgICAgICBpZiAodGhpcy5fcGFyYW1zICYmIHRoaXMuX3BhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5jb25jYXQodGhpcy5fcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOT1RFOiBzaW1wbGUgaWZzIGFyZSBmYXN0ZXIgdGhhbiBzd2l0Y2g6IGh0dHA6Ly9qYWNrc29uZHVuc3Rhbi5jb20vYXJ0aWNsZXMvMTAwN1xuICAgICAgICB2YXIgbnVtVmFsdWVPYmplY3RzID0gdmFsdWVPYmplY3RzLmxlbmd0aDtcbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcih2YWx1ZU9iamVjdHNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG51bVZhbHVlT2JqZWN0cyA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcih2YWx1ZU9iamVjdHNbMF0sIHZhbHVlT2JqZWN0c1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobnVtVmFsdWVPYmplY3RzID09IDMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyKHZhbHVlT2JqZWN0c1swXSwgdmFsdWVPYmplY3RzWzFdLCB2YWx1ZU9iamVjdHNbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIuYXBwbHkobnVsbCwgdmFsdWVPYmplY3RzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcImxpc3RlbmVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uIERpZCB5b3Ugd2FudCB0byBzZXQgZW5hYmxlZCB0byBmYWxzZSBpbnN0ZWFkP1xuICAgICAgICAgKiBAdGhyb3dzIEVycm9yIDxjb2RlPkVycm9yPC9jb2RlPjogSW50ZXJuYWwgc2lnbmFsIHJlZmVyZW5jZSBoYXMgbm90IGJlZW4gc2V0IHlldC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHaXZlbiBsaXN0ZW5lciBpcyBudWxsLlxcbkRpZCB5b3Ugd2FudCB0byBzZXQgZW5hYmxlZCB0byBmYWxzZSBpbnN0ZWFkPycpO1xuICAgICAgICAgICAgdGhpcy52ZXJpZnlMaXN0ZW5lcih2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lciA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwib25jZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb25jZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcInByaW9yaXR5XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbmhlcml0RG9jXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBvYmplY3QuXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIltTbG90IGxpc3RlbmVyOiBcIiArIHRoaXMuX2xpc3RlbmVyICsgXCIsIG9uY2U6IFwiICsgdGhpcy5fb25jZVxuICAgICAgICAgICAgKyBcIiwgcHJpb3JpdHk6IFwiICsgdGhpcy5fcHJpb3JpdHkgKyBcIiwgZW5hYmxlZDogXCIgKyB0aGlzLl9lbmFibGVkICsgXCJdXCI7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2xvdC5wcm90b3R5cGUsIFwiZW5hYmxlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNsb3QucHJvdG90eXBlLCBcInBhcmFtc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICovXG4gICAgU2xvdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zaWduYWwucmVtb3ZlKHRoaXMuX2xpc3RlbmVyKTtcbiAgICB9O1xuICAgIFNsb3QucHJvdG90eXBlLnZlcmlmeUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChudWxsID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dpdmVuIGxpc3RlbmVyIGlzIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5fc2lnbmFsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVybmFsIHNpZ25hbCByZWZlcmVuY2UgaGFzIG5vdCBiZWVuIHNldCB5ZXQuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTbG90O1xufSgpKTtcbmV4cG9ydHMuU2xvdCA9IFNsb3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TbG90LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvU2xvdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmVuY29kZSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG5leHBvcnRzLmRlY29kZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub3RlcGFjay5pby9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU2xvdExpc3RfMSA9IHJlcXVpcmUoXCIuL1Nsb3RMaXN0XCIpO1xudmFyIFNsb3RfMSA9IHJlcXVpcmUoXCIuL1Nsb3RcIik7XG4vKipcbiAqIEFsbG93cyB0aGUgdmFsdWVDbGFzc2VzIHRvIGJlIHNldCBpbiBNWE1MLCBlLmcuXG4gKiA8c2lnbmFsczpTaWduYWwgaWQ9XCJuYW1lQ2hhbmdlZFwiPntbU3RyaW5nLCB1aW50XX08L3NpZ25hbHM6U2lnbmFsPlxuICovXG4vKltEZWZhdWx0UHJvcGVydHkoXCJ2YWx1ZUNsYXNzZXNcIildKi9cbi8qKlxuICogU2lnbmFsIGRpc3BhdGNoZXMgZXZlbnRzIHRvIG11bHRpcGxlIGxpc3RlbmVycy5cbiAqIEl0IGlzIGluc3BpcmVkIGJ5IEMjIGV2ZW50cyBhbmQgZGVsZWdhdGVzLCBhbmQgYnlcbiAqIDxhIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TaWduYWxzX2FuZF9zbG90c1wiPnNpZ25hbHMgYW5kIHNsb3RzPC9hPlxuICogaW4gUXQuXG4gKiBBIFNpZ25hbCBhZGRzIGV2ZW50IGRpc3BhdGNoaW5nIGZ1bmN0aW9uYWxpdHkgdGhyb3VnaCBjb21wb3NpdGlvbiBhbmQgaW50ZXJmYWNlcyxcbiAqIHJhdGhlciB0aGFuIGluaGVyaXRpbmcgZnJvbSBhIGRpc3BhdGNoZXIuXG4gKiA8YnIvPjxici8+XG4gKiBQcm9qZWN0IGhvbWU6IDxhIHRhcmdldD1cIl90b3BcIiBocmVmPVwiaHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzL1wiPmh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy88L2E+XG4gKi9cbnZhciBPbmNlU2lnbmFsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU2lnbmFsIGluc3RhbmNlIHRvIGRpc3BhdGNoIHZhbHVlIG9iamVjdHMuXG4gICAgICogQHBhcmFtICAgIHZhbHVlQ2xhc3NlcyBBbnkgbnVtYmVyIG9mIGNsYXNzIHJlZmVyZW5jZXMgdGhhdCBlbmFibGUgdHlwZSBjaGVja3MgaW4gZGlzcGF0Y2goKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgbmV3IFNpZ25hbChTdHJpbmcsIHVpbnQpXG4gICAgICogd291bGQgYWxsb3c6IHNpZ25hbC5kaXNwYXRjaChcInRoZSBBbnN3ZXJcIiwgNDIpXG4gICAgICogYnV0IG5vdDogc2lnbmFsLmRpc3BhdGNoKHRydWUsIDQyLjUpXG4gICAgICogbm9yOiBzaWduYWwuZGlzcGF0Y2goKVxuICAgICAqXG4gICAgICogTk9URTogSW4gQVMzLCBzdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBPbmNlU2lnbmFsKCkge1xuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsb3RzID0gU2xvdExpc3RfMS5TbG90TGlzdC5OSUw7XG4gICAgICAgIC8vIENhbm5vdCB1c2Ugc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSwgc28gYWxsb3cgdGhlIHN1YmNsYXNzIHRvIGNhbGwgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgICAgdGhpcy52YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9uY2VTaWduYWwucHJvdG90eXBlLCBcInZhbHVlQ2xhc3Nlc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAaW5oZXJpdERvY1xuICAgICAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEludmFsaWQgdmFsdWVDbGFzc2VzIGFyZ3VtZW50OiBpdGVtIGF0IGluZGV4IHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXMgbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgLypbQXJyYXlFbGVtZW50VHlwZShcIkNsYXNzXCIpXSovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlQ2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIC8vIENsb25lIHNvIHRoZSBBcnJheSBjYW5ub3QgYmUgYWZmZWN0ZWQgZnJvbSBvdXRzaWRlLlxuICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzID0gdmFsdWUgPyB2YWx1ZS5zbGljZSgpIDogW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnaXRlbSBhdCBpbmRleCAnICsgaSArICcgc2hvdWxkIGJlIGEgQ2xhc3MgYnV0IHdhczo8JyArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gKyAnPi4nICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldKTsgLy9AQ0hBTkdFRCAtIHRlbXAgcmVwbGFjZW1lbnQgZm9yIGdldFF1YWxpZmllZENsYXNzQnlOYW1lKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPbmNlU2lnbmFsLnByb3RvdHlwZSwgXCJudW1MaXN0ZW5lcnNcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zbG90cy5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICovXG4gICAgT25jZVNpZ25hbC5wcm90b3R5cGUuYWRkT25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2xvdCA9IHRoaXMuc2xvdHMuZmluZChsaXN0ZW5lcik7XG4gICAgICAgIGlmICghc2xvdClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnNsb3RzID0gdGhpcy5zbG90cy5maWx0ZXJOb3QobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gc2xvdDtcbiAgICB9O1xuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zbG90cyA9IFNsb3RMaXN0XzEuU2xvdExpc3QuTklMO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEluY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogVmFsdWUgb2JqZWN0IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwcm9wcmlhdGUgdmFsdWVDbGFzc2VzIENsYXNzLlxuICAgICAqL1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWVPYmplY3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB2YWx1ZUNsYXNzZXMgaXMgZW1wdHksIHZhbHVlIG9iamVjdHMgYXJlIG5vdCB0eXBlLWNoZWNrZWQuXG4gICAgICAgIHZhciBudW1WYWx1ZUNsYXNzZXMgPSB0aGlzLl92YWx1ZUNsYXNzZXMubGVuZ3RoO1xuICAgICAgICB2YXIgbnVtVmFsdWVPYmplY3RzID0gdmFsdWVPYmplY3RzLmxlbmd0aDtcbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGZld2VyIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBpZiAobnVtVmFsdWVPYmplY3RzIDwgbnVtVmFsdWVDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXQgbGVhc3QgJyArIG51bVZhbHVlQ2xhc3NlcyArICcgYnV0IHJlY2VpdmVkICcgK1xuICAgICAgICAgICAgICAgIG51bVZhbHVlT2JqZWN0cyArICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGRpZmZlcmVudGx5IHR5cGVkIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVZhbHVlQ2xhc3NlczsgaSsrKSB7XG4gICAgICAgICAgICAvLyBPcHRpbWl6ZWQgZm9yIHRoZSBvcHRpbWlzdGljIGNhc2UgdGhhdCB2YWx1ZXMgYXJlIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodmFsdWVPYmplY3RzW2ldID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgKHZhbHVlT2JqZWN0c1tpXSBpbnN0YW5jZW9mIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSB8fCB2YWx1ZU9iamVjdHNbaV0uY29uc3RydWN0b3IgPT09IHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgb2JqZWN0IDwnICsgdmFsdWVPYmplY3RzW2ldXG4gICAgICAgICAgICAgICAgKyAnPiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgPCcgKyB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gKyAnPi4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBCcm9hZGNhc3QgdG8gbGlzdGVuZXJzLlxuICAgICAgICB2YXIgc2xvdHNUb1Byb2Nlc3MgPSB0aGlzLnNsb3RzO1xuICAgICAgICBpZiAoc2xvdHNUb1Byb2Nlc3Mubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIHdoaWxlIChzbG90c1RvUHJvY2Vzcy5ub25FbXB0eSkge1xuICAgICAgICAgICAgICAgIHNsb3RzVG9Qcm9jZXNzLmhlYWQuZXhlY3V0ZSh2YWx1ZU9iamVjdHMpO1xuICAgICAgICAgICAgICAgIHNsb3RzVG9Qcm9jZXNzID0gc2xvdHNUb1Byb2Nlc3MudGFpbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgT25jZVNpZ25hbC5wcm90b3R5cGUucmVnaXN0ZXJMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSkge1xuICAgICAgICBpZiAob25jZSA9PT0gdm9pZCAwKSB7IG9uY2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAodGhpcy5yZWdpc3RyYXRpb25Qb3NzaWJsZShsaXN0ZW5lciwgb25jZSkpIHtcbiAgICAgICAgICAgIHZhciBuZXdTbG90ID0gbmV3IFNsb3RfMS5TbG90KGxpc3RlbmVyLCB0aGlzLCBvbmNlKTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMgPSB0aGlzLnNsb3RzLnByZXBlbmQobmV3U2xvdCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3U2xvdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zbG90cy5maW5kKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIE9uY2VTaWduYWwucHJvdG90eXBlLnJlZ2lzdHJhdGlvblBvc3NpYmxlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBvbmNlKSB7XG4gICAgICAgIGlmICghdGhpcy5zbG90cy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB2YXIgZXhpc3RpbmdTbG90ID0gdGhpcy5zbG90cy5maW5kKGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKCFleGlzdGluZ1Nsb3QpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKGV4aXN0aW5nU2xvdC5vbmNlICE9IG9uY2UpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciB3YXMgcHJldmlvdXNseSBhZGRlZCwgZGVmaW5pdGVseSBkb24ndCBhZGQgaXQgYWdhaW4uXG4gICAgICAgICAgICAvLyBCdXQgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIHRoZWlyIG9uY2UgdmFsdWVzIGRpZmZlci5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCBhZGRPbmNlKCkgdGhlbiBhZGQoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBMaXN0ZW5lciB3YXMgYWxyZWFkeSByZWdpc3RlcmVkLlxuICAgIH07XG4gICAgcmV0dXJuIE9uY2VTaWduYWw7XG59KCkpO1xuZXhwb3J0cy5PbmNlU2lnbmFsID0gT25jZVNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9uY2VTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9PbmNlU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLy8gVXNlIGNvZGVzIGJldHdlZW4gMH4xMjcgZm9yIGxlc3NlciB0aHJvdWdocHV0ICgxIGJ5dGUpXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUHJvdG9jb2w7XG4oZnVuY3Rpb24gKFByb3RvY29sKSB7XG4gICAgLy8gVXNlci1yZWxhdGVkICgwfjEwKVxuICAgIFByb3RvY29sW1Byb3RvY29sW1wiVVNFUl9JRFwiXSA9IDFdID0gXCJVU0VSX0lEXCI7XG4gICAgLy8gUm9vbS1yZWxhdGVkICgxMH4yMClcbiAgICBQcm90b2NvbFtQcm90b2NvbFtcIkpPSU5fUk9PTVwiXSA9IDEwXSA9IFwiSk9JTl9ST09NXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJKT0lOX0VSUk9SXCJdID0gMTFdID0gXCJKT0lOX0VSUk9SXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJMRUFWRV9ST09NXCJdID0gMTJdID0gXCJMRUFWRV9ST09NXCI7XG4gICAgUHJvdG9jb2xbUHJvdG9jb2xbXCJST09NX0RBVEFcIl0gPSAxM10gPSBcIlJPT01fREFUQVwiO1xuICAgIFByb3RvY29sW1Byb3RvY29sW1wiUk9PTV9TVEFURVwiXSA9IDE0XSA9IFwiUk9PTV9TVEFURVwiO1xuICAgIFByb3RvY29sW1Byb3RvY29sW1wiUk9PTV9TVEFURV9QQVRDSFwiXSA9IDE1XSA9IFwiUk9PTV9TVEFURV9QQVRDSFwiO1xuICAgIC8vIEdlbmVyaWMgbWVzc2FnZXMgKDUwfjYwKVxuICAgIFByb3RvY29sW1Byb3RvY29sW1wiQkFEX1JFUVVFU1RcIl0gPSA1MF0gPSBcIkJBRF9SRVFVRVNUXCI7XG59KShQcm90b2NvbCA9IGV4cG9ydHMuUHJvdG9jb2wgfHwgKGV4cG9ydHMuUHJvdG9jb2wgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvUHJvdG9jb2wudHNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGVsdXhlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL0RlbHV4ZVNpZ25hbFwiKTtcbmV4cG9ydHMuRGVsdXhlU2lnbmFsID0gRGVsdXhlU2lnbmFsXzEuRGVsdXhlU2lnbmFsO1xudmFyIEdlbmVyaWNFdmVudF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9ldmVudHMvR2VuZXJpY0V2ZW50XCIpO1xuZXhwb3J0cy5HZW5lcmljRXZlbnQgPSBHZW5lcmljRXZlbnRfMS5HZW5lcmljRXZlbnQ7XG52YXIgSU9uY2VTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSU9uY2VTaWduYWxcIik7XG5leHBvcnRzLklPbmNlU2lnbmFsID0gSU9uY2VTaWduYWxfMS5JT25jZVNpZ25hbDtcbnZhciBJUHJpb3JpdHlTaWduYWxfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVByaW9yaXR5U2lnbmFsXCIpO1xuZXhwb3J0cy5JUHJpb3JpdHlTaWduYWwgPSBJUHJpb3JpdHlTaWduYWxfMS5JUHJpb3JpdHlTaWduYWw7XG52YXIgSVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9JU2lnbmFsXCIpO1xuZXhwb3J0cy5JU2lnbmFsID0gSVNpZ25hbF8xLklTaWduYWw7XG52YXIgSVNsb3RfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNsb3RcIik7XG5leHBvcnRzLklTbG90ID0gSVNsb3RfMS5JU2xvdDtcbnZhciBNb25vU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL01vbm9TaWduYWxcIik7XG5leHBvcnRzLk1vbm9TaWduYWwgPSBNb25vU2lnbmFsXzEuTW9ub1NpZ25hbDtcbnZhciBPbmNlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL09uY2VTaWduYWxcIik7XG5leHBvcnRzLk9uY2VTaWduYWwgPSBPbmNlU2lnbmFsXzEuT25jZVNpZ25hbDtcbnZhciBQcmlvcml0eVNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9Qcmlvcml0eVNpZ25hbFwiKTtcbmV4cG9ydHMuUHJpb3JpdHlTaWduYWwgPSBQcmlvcml0eVNpZ25hbF8xLlByaW9yaXR5U2lnbmFsO1xudmFyIFByb21pc2VfMSA9IHJlcXVpcmUoXCIuL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJvbWlzZVwiKTtcbmV4cG9ydHMuUHJvbWlzZSA9IFByb21pc2VfMS5Qcm9taXNlO1xudmFyIFNpZ25hbF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9TaWduYWxcIik7XG5leHBvcnRzLlNpZ25hbCA9IFNpZ25hbF8xLlNpZ25hbDtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9vcmcvb3NmbGFzaC9zaWduYWxzL1Nsb3RcIik7XG5leHBvcnRzLlNsb3QgPSBTbG90XzEuU2xvdDtcbnZhciBTbG90TGlzdF8xID0gcmVxdWlyZShcIi4vb3JnL29zZmxhc2gvc2lnbmFscy9TbG90TGlzdFwiKTtcbmV4cG9ydHMuU2xvdExpc3QgPSBTbG90TGlzdF8xLlNsb3RMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTaWduYWxfMSA9IHJlcXVpcmUoXCIuL1NpZ25hbFwiKTtcbnZhciBTbG90XzEgPSByZXF1aXJlKFwiLi9TbG90XCIpO1xudmFyIFByaW9yaXR5U2lnbmFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJpb3JpdHlTaWduYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJpb3JpdHlTaWduYWwoKSB7XG4gICAgICAgIHZhciB2YWx1ZUNsYXNzZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlQ2xhc3Nlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIENhbm5vdCB1c2Ugc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSwgc28gYWxsb3cgdGhlIHN1YmNsYXNzIHRvIGNhbGwgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgICAgdmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdmFsdWVDbGFzc2VzKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgYWRkT25jZSgpIHRoZW4gYWRkKCkgdGhlIHNhbWUgbGlzdGVuZXIgd2l0aG91dCByZW1vdmluZyB0aGUgcmVsYXRpb25zaGlwIGZpcnN0LlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogR2l2ZW4gbGlzdGVuZXIgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG4gICAgICovXG4gICAgUHJpb3JpdHlTaWduYWwucHJvdG90eXBlLmFkZFdpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgcHJpb3JpdHkpIHtcbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJXaXRoUHJpb3JpdHkobGlzdGVuZXIsIGZhbHNlLCBwcmlvcml0eSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZE9uY2UoKSB0aGVuIGFkZCgpIHRoZSBzYW1lIGxpc3RlbmVyIHdpdGhvdXQgcmVtb3ZpbmcgdGhlIHJlbGF0aW9uc2hpcCBmaXJzdC5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IEdpdmVuIGxpc3RlbmVyIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuICAgICAqL1xuICAgIFByaW9yaXR5U2lnbmFsLnByb3RvdHlwZS5hZGRPbmNlV2l0aFByaW9yaXR5ID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBwcmlvcml0eSkge1xuICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eShsaXN0ZW5lciwgdHJ1ZSwgcHJpb3JpdHkpO1xuICAgIH07XG4gICAgLypvdmVycmlkZSovXG4gICAgUHJpb3JpdHlTaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eShsaXN0ZW5lciwgb25jZSk7XG4gICAgfTtcbiAgICBQcmlvcml0eVNpZ25hbC5wcm90b3R5cGUucmVnaXN0ZXJMaXN0ZW5lcldpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgb25jZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvblBvc3NpYmxlKGxpc3RlbmVyLCBvbmNlKSkge1xuICAgICAgICAgICAgdmFyIHNsb3QgPSBuZXcgU2xvdF8xLlNsb3QobGlzdGVuZXIsIHRoaXMsIG9uY2UsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuc2xvdHMgPSB0aGlzLnNsb3RzLmluc2VydFdpdGhQcmlvcml0eShzbG90KTtcbiAgICAgICAgICAgIHJldHVybiBzbG90O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RzLmZpbmQobGlzdGVuZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIFByaW9yaXR5U2lnbmFsO1xufShTaWduYWxfMS5TaWduYWwpKTtcbmV4cG9ydHMuUHJpb3JpdHlTaWduYWwgPSBQcmlvcml0eVNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVByaW9yaXR5U2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvUHJpb3JpdHlTaWduYWwuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBPbmNlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9PbmNlU2lnbmFsXCIpO1xuLyoqXG4gKiBBbGxvd3MgdGhlIHZhbHVlQ2xhc3NlcyB0byBiZSBzZXQgaW4gTVhNTCwgZS5nLlxuICogPHNpZ25hbHM6U2lnbmFsIGlkPVwibmFtZUNoYW5nZWRcIj57W1N0cmluZywgdWludF19PC9zaWduYWxzOlNpZ25hbD5cbiAqL1xuLypbRGVmYXVsdFByb3BlcnR5KFwidmFsdWVDbGFzc2VzXCIpXSovXG4vKipcbiAqIFNpZ25hbCBkaXNwYXRjaGVzIGV2ZW50cyB0byBtdWx0aXBsZSBsaXN0ZW5lcnMuXG4gKiBJdCBpcyBpbnNwaXJlZCBieSBDIyBldmVudHMgYW5kIGRlbGVnYXRlcywgYW5kIGJ5XG4gKiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU2lnbmFsc19hbmRfc2xvdHNcIj5zaWduYWxzIGFuZCBzbG90czwvYT5cbiAqIGluIFF0LlxuICogQSBTaWduYWwgYWRkcyBldmVudCBkaXNwYXRjaGluZyBmdW5jdGlvbmFsaXR5IHRocm91Z2ggY29tcG9zaXRpb24gYW5kIGludGVyZmFjZXMsXG4gKiByYXRoZXIgdGhhbiBpbmhlcml0aW5nIGZyb20gYSBkaXNwYXRjaGVyLlxuICogPGJyLz48YnIvPlxuICogUHJvamVjdCBob21lOiA8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cImh0dHA6Ly9naXRodWIuY29tL3JvYmVydHBlbm5lci9hczMtc2lnbmFscy9cIj5odHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvPC9hPlxuICovXG52YXIgU2lnbmFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2lnbmFsLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTaWduYWwgaW5zdGFuY2UgdG8gZGlzcGF0Y2ggdmFsdWUgb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gICAgdmFsdWVDbGFzc2VzIEFueSBudW1iZXIgb2YgY2xhc3MgcmVmZXJlbmNlcyB0aGF0IGVuYWJsZSB0eXBlIGNoZWNrcyBpbiBkaXNwYXRjaCgpLlxuICAgICAqIEZvciBleGFtcGxlLCBuZXcgU2lnbmFsKFN0cmluZywgdWludClcbiAgICAgKiB3b3VsZCBhbGxvdzogc2lnbmFsLmRpc3BhdGNoKFwidGhlIEFuc3dlclwiLCA0MilcbiAgICAgKiBidXQgbm90OiBzaWduYWwuZGlzcGF0Y2godHJ1ZSwgNDIuNSlcbiAgICAgKiBub3I6IHNpZ25hbC5kaXNwYXRjaCgpXG4gICAgICpcbiAgICAgKiBOT1RFOiBJbiBBUzMsIHN1YmNsYXNzZXMgY2Fubm90IGNhbGwgc3VwZXIuYXBwbHkobnVsbCwgdmFsdWVDbGFzc2VzKSxcbiAgICAgKiBidXQgdGhpcyBjb25zdHJ1Y3RvciBoYXMgbG9naWMgdG8gc3VwcG9ydCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNpZ25hbCgpIHtcbiAgICAgICAgdmFyIHZhbHVlQ2xhc3NlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVDbGFzc2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB2YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZUNsYXNzZXMpIHx8IHRoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGluaGVyaXREb2NcbiAgICAgKiBAdGhyb3dzIGZsYXNoLmVycm9ycy5JbGxlZ2FsT3BlcmF0aW9uRXJyb3IgPGNvZGU+SWxsZWdhbE9wZXJhdGlvbkVycm9yPC9jb2RlPjogWW91IGNhbm5vdCBhZGRPbmNlKCkgdGhlbiBhZGQoKSB0aGUgc2FtZSBsaXN0ZW5lciB3aXRob3V0IHJlbW92aW5nIHRoZSByZWxhdGlvbnNoaXAgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBTaWduYWwucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIHJldHVybiBTaWduYWw7XG59KE9uY2VTaWduYWxfMS5PbmNlU2lnbmFsKSk7XG5leHBvcnRzLlNpZ25hbCA9IFNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL1NpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIFNsb3RMaXN0IGNsYXNzIHJlcHJlc2VudHMgYW4gaW1tdXRhYmxlIGxpc3Qgb2YgU2xvdCBvYmplY3RzLlxuICpcbiAqIEBhdXRob3IgSm9hIEViZXJ0XG4gKiBAYXV0aG9yIFJvYmVydCBQZW5uZXJcbiAqL1xudmFyIFNsb3RMaXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IFNsb3RMaXN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIDxwPkEgdXNlciBuZXZlciBoYXMgdG8gY3JlYXRlIGEgU2xvdExpc3QgbWFudWFsbHkuXG4gICAgICogVXNlIHRoZSA8Y29kZT5OSUw8L2NvZGU+IGVsZW1lbnQgdG8gcmVwcmVzZW50IGFuIGVtcHR5IGxpc3QuXG4gICAgICogPGNvZGU+TklMLnByZXBlbmQodmFsdWUpPC9jb2RlPiB3b3VsZCBjcmVhdGUgYSBsaXN0IGNvbnRhaW5pbmcgPGNvZGU+dmFsdWU8L2NvZGU+PC9wPi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBoZWFkIFRoZSBmaXJzdCBzbG90IGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSB0YWlsIEEgbGlzdCBjb250YWluaW5nIGFsbCBzbG90cyBleGNlcHQgaGVhZC5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVycyBoZWFkIGFuZCB0YWlsIGFyZSBudWxsLiBVc2UgdGhlIE5JTCBlbGVtZW50IGluc3RlYWQuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBQYXJhbWV0ZXIgaGVhZCBjYW5ub3QgYmUgbnVsbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTbG90TGlzdChoZWFkLCB0YWlsKSB7XG4gICAgICAgIGlmICh0YWlsID09PSB2b2lkIDApIHsgdGFpbCA9IG51bGw7IH1cbiAgICAgICAgdGhpcy5ub25FbXB0eSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWhlYWQgJiYgIXRhaWwpIHtcbiAgICAgICAgICAgIGlmIChTbG90TGlzdC5OSUwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIGhlYWQgYW5kIHRhaWwgYXJlIG51bGwuIFVzZSB0aGUgTklMIGVsZW1lbnQgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIC8vdGhpcyBpcyB0aGUgTklMIGVsZW1lbnQgYXMgcGVyIGRlZmluaXRpb25cbiAgICAgICAgICAgIHRoaXMubm9uRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghaGVhZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgaGVhZCBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IGhlYWQ7XG4gICAgICAgICAgICB0aGlzLnRhaWwgPSB0YWlsIHx8IFNsb3RMaXN0Lk5JTDtcbiAgICAgICAgICAgIHRoaXMubm9uRW1wdHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTbG90TGlzdC5wcm90b3R5cGUsIFwibGVuZ3RoXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2Ygc2xvdHMgaW4gdGhlIGxpc3QuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhaWwgPT0gU2xvdExpc3QuTklMKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgLy8gV2UgY291bGQgY2FjaGUgdGhlIGxlbmd0aCwgYnV0IGl0IHdvdWxkIG1ha2UgbWV0aG9kcyBsaWtlIGZpbHRlck5vdCB1bm5lY2Vzc2FyaWx5IGNvbXBsaWNhdGVkLlxuICAgICAgICAgICAgLy8gSW5zdGVhZCB3ZSBhc3N1bWUgdGhhdCBPKG4pIGlzIG9rYXkgc2luY2UgdGhlIGxlbmd0aCBwcm9wZXJ0eSBpcyB1c2VkIGluIHJhcmUgY2FzZXMuXG4gICAgICAgICAgICAvLyBXZSBjb3VsZCBhbHNvIGNhY2hlIHRoZSBsZW5ndGggbGF6eSwgYnV0IHRoYXQgaXMgYSB3YXN0ZSBvZiBhbm90aGVyIDhiIHBlciBsaXN0IG5vZGUgKGF0IGxlYXN0KS5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICAgICAgd2hpbGUgKHAubm9uRW1wdHkpIHtcbiAgICAgICAgICAgICAgICArK3Jlc3VsdDtcbiAgICAgICAgICAgICAgICBwID0gcC50YWlsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogUHJlcGVuZHMgYSBzbG90IHRvIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0gICAgc2xvdCBUaGUgaXRlbSB0byBiZSBwcmVwZW5kZWQuXG4gICAgICogQHJldHVybiAgICBBIGxpc3QgY29uc2lzdGluZyBvZiBzbG90IGZvbGxvd2VkIGJ5IGFsbCBlbGVtZW50cyBvZiB0aGlzIGxpc3QuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFBhcmFtZXRlciBoZWFkIGNhbm5vdCBiZSBudWxsLlxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90LCB0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBzbG90IHRvIHRoaXMgbGlzdC5cbiAgICAgKiBOb3RlOiBhcHBlbmRpbmcgaXMgTyhuKS4gV2hlcmUgcG9zc2libGUsIHByZXBlbmQgd2hpY2ggaXMgTygxKS5cbiAgICAgKiBJbiBzb21lIGNhc2VzLCBtYW55IGxpc3QgaXRlbXMgbXVzdCBiZSBjbG9uZWQgdG9cbiAgICAgKiBhdm9pZCBjaGFuZ2luZyBleGlzdGluZyBsaXN0cy5cbiAgICAgKiBAcGFyYW0gICAgc2xvdCBUaGUgaXRlbSB0byBiZSBhcHBlbmRlZC5cbiAgICAgKiBAcmV0dXJuICAgIEEgbGlzdCBjb25zaXN0aW5nIG9mIGFsbCBlbGVtZW50cyBvZiB0aGlzIGxpc3QgZm9sbG93ZWQgYnkgc2xvdC5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICAgICAgaWYgKCFzbG90KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xvdExpc3Qoc2xvdCk7XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZToganVzdCBvbmUgc2xvdCBjdXJyZW50bHkgaW4gdGhlIGxpc3QuXG4gICAgICAgIGlmICh0aGlzLnRhaWwgPT0gU2xvdExpc3QuTklMKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTbG90TGlzdChzbG90KS5wcmVwZW5kKHRoaXMuaGVhZCk7XG4gICAgICAgIC8vIFRoZSBsaXN0IGFscmVhZHkgaGFzIHR3byBvciBtb3JlIHNsb3RzLlxuICAgICAgICAvLyBXZSBoYXZlIHRvIGJ1aWxkIGEgbmV3IGxpc3Qgd2l0aCBjbG9uZWQgaXRlbXMgYmVjYXVzZSB0aGV5IGFyZSBpbW11dGFibGUuXG4gICAgICAgIHZhciB3aG9sZUNsb25lID0gbmV3IFNsb3RMaXN0KHRoaXMuaGVhZCk7XG4gICAgICAgIHZhciBzdWJDbG9uZSA9IHdob2xlQ2xvbmU7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy50YWlsO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5ub25FbXB0eSkge1xuICAgICAgICAgICAgc3ViQ2xvbmUgPSBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KGN1cnJlbnQuaGVhZCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgbmV3IHNsb3QgbGFzdC5cbiAgICAgICAgc3ViQ2xvbmUudGFpbCA9IG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBzbG90IGludG8gdGhlIGxpc3QgaW4gYSBwb3NpdGlvbiBhY2NvcmRpbmcgdG8gaXRzIHByaW9yaXR5LlxuICAgICAqIFRoZSBoaWdoZXIgdGhlIHByaW9yaXR5LCB0aGUgY2xvc2VyIHRoZSBpdGVtIHdpbGwgYmUgaW5zZXJ0ZWQgdG8gdGhlIGxpc3QgaGVhZC5cbiAgICAgKiBAcGFyYW1zIHNsb3QgVGhlIGl0ZW0gdG8gYmUgaW5zZXJ0ZWQuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFBhcmFtZXRlcnMgaGVhZCBhbmQgdGFpbCBhcmUgbnVsbC4gVXNlIHRoZSBOSUwgZWxlbWVudCBpbnN0ZWFkLlxuICAgICAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPjogUGFyYW1ldGVyIGhlYWQgY2Fubm90IGJlIG51bGwuXG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLmluc2VydFdpdGhQcmlvcml0eSA9IGZ1bmN0aW9uIChzbG90KSB7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xvdExpc3Qoc2xvdCk7XG4gICAgICAgIHZhciBwcmlvcml0eSA9IHNsb3QucHJpb3JpdHk7XG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZTogbmV3IHNsb3QgaGFzIHRoZSBoaWdoZXN0IHByaW9yaXR5LlxuICAgICAgICBpZiAocHJpb3JpdHkgPiB0aGlzLmhlYWQucHJpb3JpdHkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwZW5kKHNsb3QpO1xuICAgICAgICB2YXIgd2hvbGVDbG9uZSA9IG5ldyBTbG90TGlzdCh0aGlzLmhlYWQpO1xuICAgICAgICB2YXIgc3ViQ2xvbmUgPSB3aG9sZUNsb25lO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMudGFpbDtcbiAgICAgICAgLy8gRmluZCBhIHNsb3Qgd2l0aCBsb3dlciBwcmlvcml0eSBhbmQgZ28gaW4gZnJvbnQgb2YgaXQuXG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5vbkVtcHR5KSB7XG4gICAgICAgICAgICBpZiAocHJpb3JpdHkgPiBjdXJyZW50LmhlYWQucHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICBzdWJDbG9uZS50YWlsID0gY3VycmVudC5wcmVwZW5kKHNsb3QpO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aG9sZUNsb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2xvbmUgPSBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KGN1cnJlbnQuaGVhZCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNsb3QgaGFzIGxvd2VzdCBwcmlvcml0eS5cbiAgICAgICAgc3ViQ2xvbmUudGFpbCA9IG5ldyBTbG90TGlzdChzbG90KTtcbiAgICAgICAgcmV0dXJuIHdob2xlQ2xvbmU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzbG90cyBpbiB0aGlzIGxpc3QgdGhhdCBkbyBub3QgY29udGFpbiB0aGUgc3VwcGxpZWQgbGlzdGVuZXIuXG4gICAgICogTm90ZTogYXNzdW1lcyB0aGUgbGlzdGVuZXIgaXMgbm90IHJlcGVhdGVkIHdpdGhpbiB0aGUgbGlzdC5cbiAgICAgKiBAcGFyYW0gICAgbGlzdGVuZXIgVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIEEgbGlzdCBjb25zaXN0aW5nIG9mIGFsbCBlbGVtZW50cyBvZiB0aGlzIGxpc3QgdGhhdCBkbyBub3QgaGF2ZSBsaXN0ZW5lci5cbiAgICAgKi9cbiAgICBTbG90TGlzdC5wcm90b3R5cGUuZmlsdGVyTm90ID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5ub25FbXB0eSB8fCBsaXN0ZW5lciA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGlmIChsaXN0ZW5lciA9PSB0aGlzLmhlYWQubGlzdGVuZXIpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWlsO1xuICAgICAgICAvLyBUaGUgZmlyc3QgaXRlbSB3YXNuJ3QgYSBtYXRjaCBzbyB0aGUgZmlsdGVyZWQgbGlzdCB3aWxsIGNvbnRhaW4gaXQuXG4gICAgICAgIHZhciB3aG9sZUNsb25lID0gbmV3IFNsb3RMaXN0KHRoaXMuaGVhZCk7XG4gICAgICAgIHZhciBzdWJDbG9uZSA9IHdob2xlQ2xvbmU7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy50YWlsO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5ub25FbXB0eSkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaGVhZC5saXN0ZW5lciA9PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIC8vIFNwbGljZSBvdXQgdGhlIGN1cnJlbnQgaGVhZC5cbiAgICAgICAgICAgICAgICBzdWJDbG9uZS50YWlsID0gY3VycmVudC50YWlsO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aG9sZUNsb25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2xvbmUgPSBzdWJDbG9uZS50YWlsID0gbmV3IFNsb3RMaXN0KGN1cnJlbnQuaGVhZCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBsaXN0ZW5lciB3YXMgbm90IGZvdW5kIHNvIHRoaXMgbGlzdCBpcyB1bmNoYW5nZWQuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzdXBwbGllZCBsaXN0ZW5lciBGdW5jdGlvbiBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgbGlzdFxuICAgICAqL1xuICAgIFNsb3RMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMubm9uRW1wdHkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHAubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChwLmhlYWQubGlzdGVuZXIgPT0gbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBwID0gcC50YWlsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgSVNsb3QgYXNzb2NpYXRlZCB3aXRoIGEgc3VwcGxpZWQgbGlzdGVuZXIgd2l0aGluIHRoZSBTbG90TGlzdC5cbiAgICAgKiBAcGFyYW0gICBsaXN0ZW5lciBUaGUgRnVuY3Rpb24gYmVpbmcgc2VhcmNoZWQgZm9yXG4gICAgICogQHJldHVybiAgVGhlIElTbG90IGluIHRoaXMgbGlzdCBhc3NvY2lhdGVkIHdpdGggdGhlIGxpc3RlbmVyIHBhcmFtZXRlciB0aHJvdWdoIHRoZSBJU2xvdC5saXN0ZW5lciBwcm9wZXJ0eS5cbiAgICAgKiAgICAgICAgICBSZXR1cm5zIG51bGwgaWYgbm8gc3VjaCBJU2xvdCBpbnN0YW5jZSBleGlzdHMgb3IgdGhlIGxpc3QgaXMgZW1wdHkuXG4gICAgICovXG4gICAgU2xvdExpc3QucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vbkVtcHR5KVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBwID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHAubm9uRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChwLmhlYWQubGlzdGVuZXIgPT0gbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuaGVhZDtcbiAgICAgICAgICAgIHAgPSBwLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBTbG90TGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSAnJztcbiAgICAgICAgdmFyIHAgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocC5ub25FbXB0eSkge1xuICAgICAgICAgICAgYnVmZmVyICs9IHAuaGVhZCArIFwiIC0+IFwiO1xuICAgICAgICAgICAgcCA9IHAudGFpbDtcbiAgICAgICAgfVxuICAgICAgICBidWZmZXIgKz0gXCJOSUxcIjtcbiAgICAgICAgcmV0dXJuIFwiW0xpc3QgXCIgKyBidWZmZXIgKyBcIl1cIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudHMgYW4gZW1wdHkgbGlzdC4gVXNlZCBhcyB0aGUgbGlzdCB0ZXJtaW5hdG9yLlxuICAgICAqL1xuICAgIFNsb3RMaXN0Lk5JTCA9IG5ldyBTbG90TGlzdChudWxsLCBudWxsKTtcbiAgICByZXR1cm4gU2xvdExpc3Q7XG59KCkpO1xuZXhwb3J0cy5TbG90TGlzdCA9IFNsb3RMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2xvdExpc3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9TbG90TGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHNpZ25hbHNfanNfMSA9IHJlcXVpcmUoXCJzaWduYWxzLmpzXCIpO1xudmFyIENsb2NrID0gcmVxdWlyZShcIkBnYW1lc3RkaW8vY2xvY2tcIik7XG52YXIgZGVsdGFfbGlzdGVuZXJfMSA9IHJlcXVpcmUoXCJkZWx0YS1saXN0ZW5lclwiKTtcbnZhciBtc2dwYWNrID0gcmVxdWlyZShcIm5vdGVwYWNrLmlvXCIpO1xudmFyIGZvc3NpbERlbHRhID0gcmVxdWlyZShcImZvc3NpbC1kZWx0YVwiKTtcbnZhciBQcm90b2NvbF8xID0gcmVxdWlyZShcIi4vUHJvdG9jb2xcIik7XG52YXIgUm9vbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUm9vbSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSb29tKG5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywge30pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNsb2NrID0gbmV3IENsb2NrKCk7IC8vIGV4cGVyaW1lbnRhbFxuICAgICAgICBfdGhpcy5yZW1vdGVDbG9jayA9IG5ldyBDbG9jaygpOyAvLyBleHBlcmltZW50YWxcbiAgICAgICAgLy8gUHVibGljIHNpZ25hbHNcbiAgICAgICAgX3RoaXMub25Kb2luID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgX3RoaXMub25VcGRhdGUgPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5vbkRhdGEgPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICBfdGhpcy5vbkVycm9yID0gbmV3IHNpZ25hbHNfanNfMS5TaWduYWwoKTtcbiAgICAgICAgX3RoaXMub25MZWF2ZSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIF90aGlzLmlkID0gbnVsbDtcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIF90aGlzLm9uTGVhdmUuYWRkKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnJlbW92ZUFsbExpc3RlbmVycygpOyB9KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSb29tLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMub25MZWF2ZS5kaXNwYXRjaChlKTsgfTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLm9uTWVzc2FnZUNhbGxiYWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbXNncGFjay5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoZXZlbnQuZGF0YSkpO1xuICAgICAgICB2YXIgY29kZSA9IG1lc3NhZ2VbMF07XG4gICAgICAgIGlmIChjb2RlID09IFByb3RvY29sXzEuUHJvdG9jb2wuSk9JTl9ST09NKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25JZCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICB0aGlzLm9uSm9pbi5kaXNwYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5KT0lOX0VSUk9SKSB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IuZGlzcGF0Y2gobWVzc2FnZVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLlJPT01fU1RBVEUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IG1lc3NhZ2VbMl07XG4gICAgICAgICAgICB2YXIgcmVtb3RlQ3VycmVudFRpbWUgPSBtZXNzYWdlWzNdO1xuICAgICAgICAgICAgdmFyIHJlbW90ZUVsYXBzZWRUaW1lID0gbWVzc2FnZVs0XTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUsIHJlbW90ZUN1cnJlbnRUaW1lLCByZW1vdGVFbGFwc2VkVGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLlJPT01fU1RBVEVfUEFUQ0gpIHtcbiAgICAgICAgICAgIHRoaXMucGF0Y2gobWVzc2FnZVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLlJPT01fREFUQSkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGEuZGlzcGF0Y2gobWVzc2FnZVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkxFQVZFX1JPT00pIHtcbiAgICAgICAgICAgIHRoaXMubGVhdmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUm9vbS5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIHJlbW90ZUN1cnJlbnRUaW1lLCByZW1vdGVFbGFwc2VkVGltZSkge1xuICAgICAgICB0aGlzLnNldChzdGF0ZSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzU3RhdGUgPSBuZXcgVWludDhBcnJheShtc2dwYWNrLmVuY29kZShzdGF0ZSkpO1xuICAgICAgICAvLyBzZXQgcmVtb3RlIGNsb2NrIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHJlbW90ZUN1cnJlbnRUaW1lICYmIHJlbW90ZUVsYXBzZWRUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmN1cnJlbnRUaW1lID0gcmVtb3RlQ3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUNsb2NrLmVsYXBzZWRUaW1lID0gcmVtb3RlRWxhcHNlZFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9jay5zdGFydCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHN0YXRlKTtcbiAgICB9O1xuICAgIFJvb20ucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKGJpbmFyeVBhdGNoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjbGllbnQtc2lkZSBwaW5nXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBwYXRjaFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAodGhpcy5sYXN0UGF0Y2hUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmcgPSBwYXRjaFRpbWUgLSB0aGlzLmxhc3RQYXRjaFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0UGF0Y2hUaW1lID0gcGF0Y2hUaW1lO1xuICAgICAgICB0aGlzLmNsb2NrLnRpY2soKTtcbiAgICAgICAgLy8gYXBwbHkgcGF0Y2hcbiAgICAgICAgdGhpcy5fcHJldmlvdXNTdGF0ZSA9IG5ldyBVaW50OEFycmF5KGZvc3NpbERlbHRhLmFwcGx5KHRoaXMuX3ByZXZpb3VzU3RhdGUsIGJpbmFyeVBhdGNoLCB7IHZlcmlmeUNoZWNrc3VtOiBmYWxzZSB9KSk7XG4gICAgICAgIC8vIHRyaWdnZXIgc3RhdGUgY2FsbGJhY2tzXG4gICAgICAgIHRoaXMuc2V0KG1zZ3BhY2suZGVjb2RlKHRoaXMuX3ByZXZpb3VzU3RhdGUpKTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZS5kaXNwYXRjaCh0aGlzLmRhdGEpO1xuICAgIH07XG4gICAgUm9vbS5wcm90b3R5cGUubGVhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUm9vbS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKFtQcm90b2NvbF8xLlByb3RvY29sLlJPT01fREFUQSwgdGhpcy5pZCwgZGF0YV0pO1xuICAgIH07XG4gICAgUm9vbS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycy5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm9uSm9pbi5yZW1vdmVBbGwoKTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZS5yZW1vdmVBbGwoKTtcbiAgICAgICAgdGhpcy5vbkRhdGEucmVtb3ZlQWxsKCk7XG4gICAgICAgIHRoaXMub25FcnJvci5yZW1vdmVBbGwoKTtcbiAgICAgICAgdGhpcy5vbkxlYXZlLnJlbW92ZUFsbCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFJvb207XG59KGRlbHRhX2xpc3RlbmVyXzEuRGVsdGFDb250YWluZXIpKTtcbmV4cG9ydHMuUm9vbSA9IFJvb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Sb29tLnRzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENsaWVudF8xID0gcmVxdWlyZShcIi4vQ2xpZW50XCIpO1xuZXhwb3J0cy5DbGllbnQgPSBDbGllbnRfMS5DbGllbnQ7XG52YXIgUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL1Byb3RvY29sXCIpO1xuZXhwb3J0cy5Qcm90b2NvbCA9IFByb3RvY29sXzEuUHJvdG9jb2w7XG52YXIgUm9vbV8xID0gcmVxdWlyZShcIi4vUm9vbVwiKTtcbmV4cG9ydHMuUm9vbSA9IFJvb21fMS5Sb29tO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbXNncGFjayA9IHJlcXVpcmUoXCJub3RlcGFjay5pb1wiKTtcbnZhciBzaWduYWxzX2pzXzEgPSByZXF1aXJlKFwic2lnbmFscy5qc1wiKTtcbnZhciBQcm90b2NvbF8xID0gcmVxdWlyZShcIi4vUHJvdG9jb2xcIik7XG52YXIgUm9vbV8xID0gcmVxdWlyZShcIi4vUm9vbVwiKTtcbnZhciBDb25uZWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Db25uZWN0aW9uXCIpO1xudmFyIENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDbGllbnQodXJsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIHNpZ25hbHNcbiAgICAgICAgdGhpcy5vbk9wZW4gPSBuZXcgc2lnbmFsc19qc18xLlNpZ25hbCgpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIHRoaXMub25DbG9zZSA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIHRoaXMub25FcnJvciA9IG5ldyBzaWduYWxzX2pzXzEuU2lnbmFsKCk7XG4gICAgICAgIHRoaXMucm9vbXMgPSB7fTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nUm9vbXMgPSB7fTtcbiAgICAgICAgdGhpcy5qb2luUmVxdWVzdElkID0gMDtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9IHVybDtcbiAgICAgICAgdmFyIGNvbHlzZXVzaWQgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgnY29seXNldXNpZCcpO1xuICAgICAgICBpZiAoIShjb2x5c2V1c2lkIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgICAgIC8vIGJyb3dzZXIgaGFzIHN5bmNocm9ub3VzIHJldHVyblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9uKGNvbHlzZXVzaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gcmVhY3QtbmF0aXZlIGlzIGFzeW5jaHJvbm91c1xuICAgICAgICAgICAgY29seXNldXNpZC50aGVuKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gX3RoaXMuY3JlYXRlQ29ubmVjdGlvbihpZCk7IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIENsaWVudC5wcm90b3R5cGUuY3JlYXRlQ29ubmVjdGlvbiA9IGZ1bmN0aW9uIChjb2x5c2V1c2lkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWQgPSBjb2x5c2V1c2lkIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uXzEuQ29ubmVjdGlvbih0aGlzLmhvc3RuYW1lICsgXCIvP2NvbHlzZXVzaWQ9XCIgKyB0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMub25DbG9zZS5kaXNwYXRjaCgpOyB9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5vbkVycm9yLmRpc3BhdGNoKCk7IH07XG4gICAgICAgIC8vIGNoZWNrIGZvciBpZCBvbiBjb29raWVcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uT3Blbi5kaXNwYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgQ2xpZW50LnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gKHJvb21OYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIG9wdGlvbnMucmVxdWVzdElkID0gKyt0aGlzLmpvaW5SZXF1ZXN0SWQ7XG4gICAgICAgIHRoaXMuY29ubmVjdGluZ1Jvb21zW29wdGlvbnMucmVxdWVzdElkXSA9IG5ldyBSb29tXzEuUm9vbShyb29tTmFtZSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKFtQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fUk9PTSwgcm9vbU5hbWUsIG9wdGlvbnNdKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGluZ1Jvb21zW29wdGlvbnMucmVxdWVzdElkXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIENsaWVudC5wcm90b3R5cGUub25NZXNzYWdlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBtc2dwYWNrLmRlY29kZShuZXcgVWludDhBcnJheShldmVudC5kYXRhKSk7XG4gICAgICAgIHZhciBjb2RlID0gbWVzc2FnZVswXTtcbiAgICAgICAgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5VU0VSX0lEKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSgnY29seXNldXNpZCcsIG1lc3NhZ2VbMV0pO1xuICAgICAgICAgICAgdGhpcy5pZCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICB0aGlzLm9uT3Blbi5kaXNwYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPT0gUHJvdG9jb2xfMS5Qcm90b2NvbC5KT0lOX1JPT00pIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0SWQgPSBtZXNzYWdlWzJdO1xuICAgICAgICAgICAgdmFyIHJvb21fMSA9IHRoaXMuY29ubmVjdGluZ1Jvb21zW3JlcXVlc3RJZF07XG4gICAgICAgICAgICB0aGlzLnJvb21zW3Jvb21fMS5pZF0gPSByb29tXzE7XG4gICAgICAgICAgICByb29tXzEuaWQgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgcm9vbV8xLmNvbm5lY3QobmV3IENvbm5lY3Rpb25fMS5Db25uZWN0aW9uKHRoaXMuaG9zdG5hbWUgKyBcIi9cIiArIHJvb21fMS5pZCArIFwiP2NvbHlzZXVzaWQ9XCIgKyB0aGlzLmlkKSk7XG4gICAgICAgICAgICByb29tXzEub25MZWF2ZS5hZGQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVsZXRlIF90aGlzLnJvb21zW3Jvb21fMS5pZF07IH0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29ubmVjdGluZ1Jvb21zW3JlcXVlc3RJZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZSA9PSBQcm90b2NvbF8xLlByb3RvY29sLkpPSU5fRVJST1IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzZXJ2ZXIgZXJyb3I6XCIsIG1lc3NhZ2VbMl0pO1xuICAgICAgICAgICAgLy8gZ2VuZXJhbCBlcnJvclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yLmRpc3BhdGNoKG1lc3NhZ2VbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UuZGlzcGF0Y2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDbGllbnQ7XG59KCkpO1xuZXhwb3J0cy5DbGllbnQgPSBDbGllbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9DbGllbnQudHNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdXRmOFdyaXRlKHZpZXcsIG9mZnNldCwgc3RyKSB7XG4gIHZhciBjID0gMDtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgYyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHhjMCB8IChjID4+IDYpKTtcbiAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIDB4ODAgfCAoYyAmIDB4M2YpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYyA8IDB4ZDgwMCB8fCBjID49IDB4ZTAwMCkge1xuICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHhlMCB8IChjID4+IDEyKSk7XG4gICAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCAweDgwIHwgKGMgPj4gNikgJiAweDNmKTtcbiAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIDB4ODAgfCAoYyAmIDB4M2YpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpKys7XG4gICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNmZikgPDwgMTApIHwgKHN0ci5jaGFyQ29kZUF0KGkpICYgMHgzZmYpKTtcbiAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIDB4ZjAgfCAoYyA+PiAxOCkpO1xuICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHg4MCB8IChjID4+IDEyKSAmIDB4M2YpO1xuICAgICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgMHg4MCB8IChjID4+IDYpICYgMHgzZik7XG4gICAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCAweDgwIHwgKGMgJiAweDNmKSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhMZW5ndGgoc3RyKSB7XG4gIHZhciBjID0gMCwgbGVuZ3RoID0gMDtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgbGVuZ3RoICs9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgbGVuZ3RoICs9IDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgIGxlbmd0aCArPSAzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGkrKztcbiAgICAgIGxlbmd0aCArPSA0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBfZW5jb2RlKGJ5dGVzLCBkZWZlcnMsIHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlLCBpID0gMCwgbCA9IDAsIGhpID0gMCwgbG8gPSAwLCBsZW5ndGggPSAwLCBzaXplID0gMDtcblxuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBsZW5ndGggPSB1dGY4TGVuZ3RoKHZhbHVlKTtcblxuICAgIC8vIGZpeHN0clxuICAgIGlmIChsZW5ndGggPCAweDIwKSB7XG4gICAgICBieXRlcy5wdXNoKGxlbmd0aCB8IDB4YTApO1xuICAgICAgc2l6ZSA9IDE7XG4gICAgfVxuICAgIC8vIHN0ciA4XG4gICAgZWxzZSBpZiAobGVuZ3RoIDwgMHgxMDApIHtcbiAgICAgIGJ5dGVzLnB1c2goMHhkOSwgbGVuZ3RoKTtcbiAgICAgIHNpemUgPSAyO1xuICAgIH1cbiAgICAvLyBzdHIgMTZcbiAgICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwKSB7XG4gICAgICBieXRlcy5wdXNoKDB4ZGEsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgc2l6ZSA9IDM7XG4gICAgfVxuICAgIC8vIHN0ciAzMlxuICAgIGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwMDAwMDAwKSB7XG4gICAgICBieXRlcy5wdXNoKDB4ZGIsIGxlbmd0aCA+PiAyNCwgbGVuZ3RoID4+IDE2LCBsZW5ndGggPj4gOCwgbGVuZ3RoKTtcbiAgICAgIHNpemUgPSA1O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0b28gbG9uZycpO1xuICAgIH1cbiAgICBkZWZlcnMucHVzaCh7IHN0cjogdmFsdWUsIGxlbmd0aDogbGVuZ3RoLCBvZmZzZXQ6IGJ5dGVzLmxlbmd0aCB9KTtcbiAgICByZXR1cm4gc2l6ZSArIGxlbmd0aDtcbiAgfVxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBUT0RPOiBlbmNvZGUgdG8gZmxvYXQgMzI/XG5cbiAgICAvLyBmbG9hdCA2NFxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUgfHwgIWlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgYnl0ZXMucHVzaCgweGNiKTtcbiAgICAgIGRlZmVycy5wdXNoKHsgZmxvYXQ6IHZhbHVlLCBsZW5ndGg6IDgsIG9mZnNldDogYnl0ZXMubGVuZ3RoIH0pO1xuICAgICAgcmV0dXJuIDk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID49IDApIHtcbiAgICAgIC8vIHBvc2l0aXZlIGZpeG51bVxuICAgICAgaWYgKHZhbHVlIDwgMHg4MCkge1xuICAgICAgICBieXRlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICAvLyB1aW50IDhcbiAgICAgIGlmICh2YWx1ZSA8IDB4MTAwKSB7XG4gICAgICAgIGJ5dGVzLnB1c2goMHhjYywgdmFsdWUpO1xuICAgICAgICByZXR1cm4gMjtcbiAgICAgIH1cbiAgICAgIC8vIHVpbnQgMTZcbiAgICAgIGlmICh2YWx1ZSA8IDB4MTAwMDApIHtcbiAgICAgICAgYnl0ZXMucHVzaCgweGNkLCB2YWx1ZSA+PiA4LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiAzO1xuICAgICAgfVxuICAgICAgLy8gdWludCAzMlxuICAgICAgaWYgKHZhbHVlIDwgMHgxMDAwMDAwMDApIHtcbiAgICAgICAgYnl0ZXMucHVzaCgweGNlLCB2YWx1ZSA+PiAyNCwgdmFsdWUgPj4gMTYsIHZhbHVlID4+IDgsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIDU7XG4gICAgICB9XG4gICAgICAvLyB1aW50IDY0XG4gICAgICBoaSA9ICh2YWx1ZSAvIE1hdGgucG93KDIsIDMyKSkgPj4gMDtcbiAgICAgIGxvID0gdmFsdWUgPj4+IDA7XG4gICAgICBieXRlcy5wdXNoKDB4Y2YsIGhpID4+IDI0LCBoaSA+PiAxNiwgaGkgPj4gOCwgaGksIGxvID4+IDI0LCBsbyA+PiAxNiwgbG8gPj4gOCwgbG8pO1xuICAgICAgcmV0dXJuIDk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5lZ2F0aXZlIGZpeG51bVxuICAgICAgaWYgKHZhbHVlID49IC0weDIwKSB7XG4gICAgICAgIGJ5dGVzLnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIC8vIGludCA4XG4gICAgICBpZiAodmFsdWUgPj0gLTB4ODApIHtcbiAgICAgICAgYnl0ZXMucHVzaCgweGQwLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiAyO1xuICAgICAgfVxuICAgICAgLy8gaW50IDE2XG4gICAgICBpZiAodmFsdWUgPj0gLTB4ODAwMCkge1xuICAgICAgICBieXRlcy5wdXNoKDB4ZDEsIHZhbHVlID4+IDgsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgICB9XG4gICAgICAvLyBpbnQgMzJcbiAgICAgIGlmICh2YWx1ZSA+PSAtMHg4MDAwMDAwMCkge1xuICAgICAgICBieXRlcy5wdXNoKDB4ZDIsIHZhbHVlID4+IDI0LCB2YWx1ZSA+PiAxNiwgdmFsdWUgPj4gOCwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gNTtcbiAgICAgIH1cbiAgICAgIC8vIGludCA2NFxuICAgICAgaGkgPSBNYXRoLmZsb29yKHZhbHVlIC8gTWF0aC5wb3coMiwgMzIpKTtcbiAgICAgIGxvID0gdmFsdWUgPj4+IDA7XG4gICAgICBieXRlcy5wdXNoKDB4ZDMsIGhpID4+IDI0LCBoaSA+PiAxNiwgaGkgPj4gOCwgaGksIGxvID4+IDI0LCBsbyA+PiAxNiwgbG8gPj4gOCwgbG8pO1xuICAgICAgcmV0dXJuIDk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIC8vIG5pbFxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgYnl0ZXMucHVzaCgweGMwKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuXG4gICAgICAvLyBmaXhhcnJheVxuICAgICAgaWYgKGxlbmd0aCA8IDB4MTApIHtcbiAgICAgICAgYnl0ZXMucHVzaChsZW5ndGggfCAweDkwKTtcbiAgICAgICAgc2l6ZSA9IDE7XG4gICAgICB9XG4gICAgICAvLyBhcnJheSAxNlxuICAgICAgZWxzZSBpZiAobGVuZ3RoIDwgMHgxMDAwMCkge1xuICAgICAgICBieXRlcy5wdXNoKDB4ZGMsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgICBzaXplID0gMztcbiAgICAgIH1cbiAgICAgIC8vIGFycmF5IDMyXG4gICAgICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwMDAwMCkge1xuICAgICAgICBieXRlcy5wdXNoKDB4ZGQsIGxlbmd0aCA+PiAyNCwgbGVuZ3RoID4+IDE2LCBsZW5ndGggPj4gOCwgbGVuZ3RoKTtcbiAgICAgICAgc2l6ZSA9IDU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5IHRvbyBsYXJnZScpO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNpemUgKz0gX2VuY29kZShieXRlcywgZGVmZXJzLCB2YWx1ZVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG5cbiAgICAvLyBmaXhleHQgOCAvIERhdGVcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB2YXIgdGltZSA9IHZhbHVlLmdldFRpbWUoKTtcbiAgICAgIGhpID0gTWF0aC5mbG9vcih0aW1lIC8gTWF0aC5wb3coMiwgMzIpKTtcbiAgICAgIGxvID0gdGltZSA+Pj4gMDtcbiAgICAgIGJ5dGVzLnB1c2goMHhkNywgMCwgaGkgPj4gMjQsIGhpID4+IDE2LCBoaSA+PiA4LCBoaSwgbG8gPj4gMjQsIGxvID4+IDE2LCBsbyA+PiA4LCBsbyk7XG4gICAgICByZXR1cm4gMTA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIGxlbmd0aCA9IHZhbHVlLmJ5dGVMZW5ndGg7XG5cbiAgICAgIC8vIGJpbiA4XG4gICAgICBpZiAobGVuZ3RoIDwgMHgxMDApIHtcbiAgICAgICAgYnl0ZXMucHVzaCgweGM0LCBsZW5ndGgpO1xuICAgICAgICBzaXplID0gMjtcbiAgICAgIH0gZWxzZVxuICAgICAgLy8gYmluIDE2XG4gICAgICBpZiAobGVuZ3RoIDwgMHgxMDAwMCkge1xuICAgICAgICBieXRlcy5wdXNoKDB4YzUsIGxlbmd0aCA+PiA4LCBsZW5ndGgpO1xuICAgICAgICBzaXplID0gMztcbiAgICAgIH0gZWxzZVxuICAgICAgLy8gYmluIDMyXG4gICAgICBpZiAobGVuZ3RoIDwgMHgxMDAwMDAwMDApIHtcbiAgICAgICAgYnl0ZXMucHVzaCgweGM2LCBsZW5ndGggPj4gMjQsIGxlbmd0aCA+PiAxNiwgbGVuZ3RoID4+IDgsIGxlbmd0aCk7XG4gICAgICAgIHNpemUgPSA1O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIgdG9vIGxhcmdlJyk7XG4gICAgICB9XG4gICAgICBkZWZlcnMucHVzaCh7IGJpbjogdmFsdWUsIGxlbmd0aDogbGVuZ3RoLCBvZmZzZXQ6IGJ5dGVzLmxlbmd0aCB9KTtcbiAgICAgIHJldHVybiBzaXplICsgbGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX2VuY29kZShieXRlcywgZGVmZXJzLCB2YWx1ZS50b0pTT04oKSk7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXSwga2V5ID0gJyc7XG5cbiAgICB2YXIgYWxsS2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICBmb3IgKGkgPSAwLCBsID0gYWxsS2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGtleSA9IGFsbEtleXNbaV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlW2tleV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgLy8gZml4bWFwXG4gICAgaWYgKGxlbmd0aCA8IDB4MTApIHtcbiAgICAgIGJ5dGVzLnB1c2gobGVuZ3RoIHwgMHg4MCk7XG4gICAgICBzaXplID0gMTtcbiAgICB9XG4gICAgLy8gbWFwIDE2XG4gICAgZWxzZSBpZiAobGVuZ3RoIDwgMHgxMDAwMCkge1xuICAgICAgYnl0ZXMucHVzaCgweGRlLCBsZW5ndGggPj4gOCwgbGVuZ3RoKTtcbiAgICAgIHNpemUgPSAzO1xuICAgIH1cbiAgICAvLyBtYXAgMzJcbiAgICBlbHNlIGlmIChsZW5ndGggPCAweDEwMDAwMDAwMCkge1xuICAgICAgYnl0ZXMucHVzaCgweGRmLCBsZW5ndGggPj4gMjQsIGxlbmd0aCA+PiAxNiwgbGVuZ3RoID4+IDgsIGxlbmd0aCk7XG4gICAgICBzaXplID0gNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgdG9vIGxhcmdlJyk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgc2l6ZSArPSBfZW5jb2RlKGJ5dGVzLCBkZWZlcnMsIGtleSk7XG4gICAgICBzaXplICs9IF9lbmNvZGUoYnl0ZXMsIGRlZmVycywgdmFsdWVba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9XG4gIC8vIGZhbHNlL3RydWVcbiAgaWYgKHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIGJ5dGVzLnB1c2godmFsdWUgPyAweGMzIDogMHhjMik7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgLy8gZml4ZXh0IDEgLyB1bmRlZmluZWRcbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgYnl0ZXMucHVzaCgweGQ0LCAwLCAwKTtcbiAgICByZXR1cm4gMztcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBlbmNvZGUnKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlKHZhbHVlKSB7XG4gIHZhciBieXRlcyA9IFtdO1xuICB2YXIgZGVmZXJzID0gW107XG4gIHZhciBzaXplID0gX2VuY29kZShieXRlcywgZGVmZXJzLCB2YWx1ZSk7XG4gIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc2l6ZSk7XG4gIHZhciB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1Zik7XG5cbiAgdmFyIGRlZmVySW5kZXggPSAwO1xuICB2YXIgZGVmZXJXcml0dGVuID0gMDtcbiAgdmFyIG5leHRPZmZzZXQgPSAtMTtcbiAgaWYgKGRlZmVycy5sZW5ndGggPiAwKSB7XG4gICAgbmV4dE9mZnNldCA9IGRlZmVyc1swXS5vZmZzZXQ7XG4gIH1cblxuICB2YXIgZGVmZXIsIGRlZmVyTGVuZ3RoID0gMCwgb2Zmc2V0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBieXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2aWV3LnNldFVpbnQ4KGRlZmVyV3JpdHRlbiArIGksIGJ5dGVzW2ldKTtcbiAgICBpZiAoaSArIDEgIT09IG5leHRPZmZzZXQpIHsgY29udGludWU7IH1cbiAgICBkZWZlciA9IGRlZmVyc1tkZWZlckluZGV4XTtcbiAgICBkZWZlckxlbmd0aCA9IGRlZmVyLmxlbmd0aDtcbiAgICBvZmZzZXQgPSBkZWZlcldyaXR0ZW4gKyBuZXh0T2Zmc2V0O1xuICAgIGlmIChkZWZlci5iaW4pIHtcbiAgICAgIHZhciBiaW4gPSBuZXcgVWludDhBcnJheShkZWZlci5iaW4pO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkZWZlckxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZpZXcuc2V0VWludDgob2Zmc2V0ICsgaiwgYmluW2pdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRlZmVyLnN0cikge1xuICAgICAgdXRmOFdyaXRlKHZpZXcsIG9mZnNldCwgZGVmZXIuc3RyKTtcbiAgICB9IGVsc2UgaWYgKGRlZmVyLmZsb2F0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZpZXcuc2V0RmxvYXQ2NChvZmZzZXQsIGRlZmVyLmZsb2F0KTtcbiAgICB9XG4gICAgZGVmZXJJbmRleCsrO1xuICAgIGRlZmVyV3JpdHRlbiArPSBkZWZlckxlbmd0aDtcbiAgICBpZiAoZGVmZXJzW2RlZmVySW5kZXhdKSB7XG4gICAgICBuZXh0T2Zmc2V0ID0gZGVmZXJzW2RlZmVySW5kZXhdLm9mZnNldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbmNvZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ub3RlcGFjay5pby9icm93c2VyL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBEZWNvZGVyKGJ1ZmZlcikge1xuICB0aGlzLm9mZnNldCA9IDA7XG4gIGlmIChidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLmJ1ZmZlcik7XG4gIH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJ1ZmZlcikpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlci5idWZmZXI7XG4gICAgdGhpcy52aWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhSZWFkKHZpZXcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBzdHJpbmcgPSAnJywgY2hyID0gMDtcbiAgZm9yICh2YXIgaSA9IG9mZnNldCwgZW5kID0gb2Zmc2V0ICsgbGVuZ3RoOyBpIDwgZW5kOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHZpZXcuZ2V0VWludDgoaSk7XG4gICAgaWYgKChieXRlICYgMHg4MCkgPT09IDB4MDApIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICgoYnl0ZSAmIDB4ZTApID09PSAweGMwKSB7XG4gICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgKChieXRlICYgMHgwZikgPDwgNikgfFxuICAgICAgICAodmlldy5nZXRVaW50OCgrK2kpICYgMHgzZilcbiAgICAgICk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKChieXRlICYgMHhmMCkgPT09IDB4ZTApIHtcbiAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAoKGJ5dGUgJiAweDBmKSA8PCAxMikgfFxuICAgICAgICAoKHZpZXcuZ2V0VWludDgoKytpKSAmIDB4M2YpIDw8IDYpIHxcbiAgICAgICAgKCh2aWV3LmdldFVpbnQ4KCsraSkgJiAweDNmKSA8PCAwKVxuICAgICAgKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoKGJ5dGUgJiAweGY4KSA9PT0gMHhmMCkge1xuICAgICAgY2hyID0gKChieXRlICYgMHgwNykgPDwgMTgpIHxcbiAgICAgICAgKCh2aWV3LmdldFVpbnQ4KCsraSkgJiAweDNmKSA8PCAxMikgfFxuICAgICAgICAoKHZpZXcuZ2V0VWludDgoKytpKSAmIDB4M2YpIDw8IDYpIHxcbiAgICAgICAgKCh2aWV3LmdldFVpbnQ4KCsraSkgJiAweDNmKSA8PCAwKTtcbiAgICAgIGlmIChjaHIgPj0gMHgwMTAwMDApIHsgLy8gc3Vycm9nYXRlIHBhaXJcbiAgICAgICAgY2hyIC09IDB4MDEwMDAwO1xuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoY2hyID4+PiAxMCkgKyAweEQ4MDAsIChjaHIgJiAweDNGRikgKyAweERDMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYnl0ZSAnICsgYnl0ZS50b1N0cmluZygxNikpO1xuICB9XG4gIHJldHVybiBzdHJpbmc7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmFycmF5ID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICB2YXIgdmFsdWUgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhbHVlW2ldID0gdGhpcy5wYXJzZSgpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgdmFyIGtleSA9ICcnLCB2YWx1ZSA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gdGhpcy5wYXJzZSgpO1xuICAgIHZhbHVlW2tleV0gPSB0aGlzLnBhcnNlKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuRGVjb2Rlci5wcm90b3R5cGUuc3RyID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICB2YXIgdmFsdWUgPSB1dGY4UmVhZCh0aGlzLnZpZXcsIHRoaXMub2Zmc2V0LCBsZW5ndGgpO1xuICB0aGlzLm9mZnNldCArPSBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbkRlY29kZXIucHJvdG90eXBlLmJpbiA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgdmFyIHZhbHVlID0gdGhpcy5idWZmZXIuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKTtcbiAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5EZWNvZGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByZWZpeCA9IHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCsrKTtcbiAgdmFyIHZhbHVlLCBsZW5ndGggPSAwLCB0eXBlID0gMCwgaGkgPSAwLCBsbyA9IDA7XG5cbiAgaWYgKHByZWZpeCA8IDB4YzApIHtcbiAgICAvLyBwb3NpdGl2ZSBmaXhpbnRcbiAgICBpZiAocHJlZml4IDwgMHg4MCkge1xuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG4gICAgLy8gZml4bWFwXG4gICAgaWYgKHByZWZpeCA8IDB4OTApIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcChwcmVmaXggJiAweDBmKTtcbiAgICB9XG4gICAgLy8gZml4YXJyYXlcbiAgICBpZiAocHJlZml4IDwgMHhhMCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXJyYXkocHJlZml4ICYgMHgwZik7XG4gICAgfVxuICAgIC8vIGZpeHN0clxuICAgIHJldHVybiB0aGlzLnN0cihwcmVmaXggJiAweDFmKTtcbiAgfVxuXG4gIC8vIG5lZ2F0aXZlIGZpeGludFxuICBpZiAocHJlZml4ID4gMHhkZikge1xuICAgIHJldHVybiAoMHhmZiAtIHByZWZpeCArIDEpICogLTE7XG4gIH1cblxuICBzd2l0Y2ggKHByZWZpeCkge1xuICAgIC8vIG5pbFxuICAgIGNhc2UgMHhjMDpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIC8vIGZhbHNlXG4gICAgY2FzZSAweGMyOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIHRydWVcbiAgICBjYXNlIDB4YzM6XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIGJpblxuICAgIGNhc2UgMHhjNDpcbiAgICAgIGxlbmd0aCA9IHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgcmV0dXJuIHRoaXMuYmluKGxlbmd0aCk7XG4gICAgY2FzZSAweGM1OlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgcmV0dXJuIHRoaXMuYmluKGxlbmd0aCk7XG4gICAgY2FzZSAweGM2OlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgcmV0dXJuIHRoaXMuYmluKGxlbmd0aCk7XG5cbiAgICAvLyBleHRcbiAgICBjYXNlIDB4Yzc6XG4gICAgICBsZW5ndGggPSB0aGlzLnZpZXcuZ2V0VWludDgodGhpcy5vZmZzZXQpO1xuICAgICAgdHlwZSA9IHRoaXMudmlldy5nZXRJbnQ4KHRoaXMub2Zmc2V0ICsgMSk7XG4gICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgcmV0dXJuIFt0eXBlLCB0aGlzLmJpbihsZW5ndGgpXTtcbiAgICBjYXNlIDB4Yzg6XG4gICAgICBsZW5ndGggPSB0aGlzLnZpZXcuZ2V0VWludDE2KHRoaXMub2Zmc2V0KTtcbiAgICAgIHR5cGUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCArIDIpO1xuICAgICAgdGhpcy5vZmZzZXQgKz0gMztcbiAgICAgIHJldHVybiBbdHlwZSwgdGhpcy5iaW4obGVuZ3RoKV07XG4gICAgY2FzZSAweGM5OlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCk7XG4gICAgICB0eXBlID0gdGhpcy52aWV3LmdldEludDgodGhpcy5vZmZzZXQgKyA0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDU7XG4gICAgICByZXR1cm4gW3R5cGUsIHRoaXMuYmluKGxlbmd0aCldO1xuXG4gICAgLy8gZmxvYXRcbiAgICBjYXNlIDB4Y2E6XG4gICAgICB2YWx1ZSA9IHRoaXMudmlldy5nZXRGbG9hdDMyKHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSAweGNiOlxuICAgICAgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0RmxvYXQ2NCh0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgLy8gdWludFxuICAgIGNhc2UgMHhjYzpcbiAgICAgIHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSAweGNkOlxuICAgICAgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDE2KHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSAweGNlOlxuICAgICAgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSAweGNmOlxuICAgICAgaGkgPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0KSAqIE1hdGgucG93KDIsIDMyKTtcbiAgICAgIGxvID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCArIDQpO1xuICAgICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICAgIHJldHVybiBoaSArIGxvO1xuXG4gICAgLy8gaW50XG4gICAgY2FzZSAweGQwOlxuICAgICAgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgMHhkMTpcbiAgICAgIHZhbHVlID0gdGhpcy52aWV3LmdldEludDE2KHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSAweGQyOlxuICAgICAgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50MzIodGhpcy5vZmZzZXQpO1xuICAgICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBjYXNlIDB4ZDM6XG4gICAgICBoaSA9IHRoaXMudmlldy5nZXRJbnQzMih0aGlzLm9mZnNldCkgKiBNYXRoLnBvdygyLCAzMik7XG4gICAgICBsbyA9IHRoaXMudmlldy5nZXRVaW50MzIodGhpcy5vZmZzZXQgKyA0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgICByZXR1cm4gaGkgKyBsbztcblxuICAgIC8vIGZpeGV4dFxuICAgIGNhc2UgMHhkNDpcbiAgICAgIHR5cGUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgaWYgKHR5cGUgPT09IDB4MDApIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbdHlwZSwgdGhpcy5iaW4oMSldO1xuICAgIGNhc2UgMHhkNTpcbiAgICAgIHR5cGUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgcmV0dXJuIFt0eXBlLCB0aGlzLmJpbigyKV07XG4gICAgY2FzZSAweGQ2OlxuICAgICAgdHlwZSA9IHRoaXMudmlldy5nZXRJbnQ4KHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICByZXR1cm4gW3R5cGUsIHRoaXMuYmluKDQpXTtcbiAgICBjYXNlIDB4ZDc6XG4gICAgICB0eXBlID0gdGhpcy52aWV3LmdldEludDgodGhpcy5vZmZzZXQpO1xuICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgIGlmICh0eXBlID09PSAweDAwKSB7XG4gICAgICAgIGhpID0gdGhpcy52aWV3LmdldEludDMyKHRoaXMub2Zmc2V0KSAqIE1hdGgucG93KDIsIDMyKTtcbiAgICAgICAgbG8gPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0ICsgNCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShoaSArIGxvKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbdHlwZSwgdGhpcy5iaW4oOCldO1xuICAgIGNhc2UgMHhkODpcbiAgICAgIHR5cGUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgcmV0dXJuIFt0eXBlLCB0aGlzLmJpbigxNildO1xuXG4gICAgLy8gc3RyXG4gICAgY2FzZSAweGQ5OlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICByZXR1cm4gdGhpcy5zdHIobGVuZ3RoKTtcbiAgICBjYXNlIDB4ZGE6XG4gICAgICBsZW5ndGggPSB0aGlzLnZpZXcuZ2V0VWludDE2KHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICByZXR1cm4gdGhpcy5zdHIobGVuZ3RoKTtcbiAgICBjYXNlIDB4ZGI6XG4gICAgICBsZW5ndGggPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gdGhpcy5zdHIobGVuZ3RoKTtcblxuICAgIC8vIGFycmF5XG4gICAgY2FzZSAweGRjOlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgcmV0dXJuIHRoaXMuYXJyYXkobGVuZ3RoKTtcbiAgICBjYXNlIDB4ZGQ6XG4gICAgICBsZW5ndGggPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0KTtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gdGhpcy5hcnJheShsZW5ndGgpO1xuXG4gICAgLy8gbWFwXG4gICAgY2FzZSAweGRlOlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGxlbmd0aCk7XG4gICAgY2FzZSAweGRmOlxuICAgICAgbGVuZ3RoID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCk7XG4gICAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGxlbmd0aCk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZScpO1xufTtcblxuZnVuY3Rpb24gZGVjb2RlKGJ1ZmZlcikge1xuICB2YXIgZGVjb2RlciA9IG5ldyBEZWNvZGVyKGJ1ZmZlcik7XG4gIHZhciB2YWx1ZSA9IGRlY29kZXIucGFyc2UoKTtcbiAgaWYgKGRlY29kZXIub2Zmc2V0ICE9PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigoYnVmZmVyLmJ5dGVMZW5ndGggLSBkZWNvZGVyLm9mZnNldCkgKyAnIHRyYWlsaW5nIGJ5dGVzJyk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25vdGVwYWNrLmlvL2Jyb3dzZXIvZGVjb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFByaW9yaXR5U2lnbmFsXzEgPSByZXF1aXJlKFwiLi9Qcmlvcml0eVNpZ25hbFwiKTtcbi8qKlxuICogQWxsb3dzIHRoZSB2YWx1ZUNsYXNzZXMgdG8gYmUgc2V0IGluIE1YTUwsIGUuZy5cbiAqIDxzaWduYWxzOlNpZ25hbCBpZD1cIm5hbWVDaGFuZ2VkXCI+e1tTdHJpbmcsIHVpbnRdfTwvc2lnbmFsczpTaWduYWw+XG4gKi9cbi8qW0RlZmF1bHRQcm9wZXJ0eShcInZhbHVlQ2xhc3Nlc1wiKV0qL1xuLyoqXG4gKiBTaWduYWwgZGlzcGF0Y2hlcyBldmVudHMgdG8gbXVsdGlwbGUgbGlzdGVuZXJzLlxuICogSXQgaXMgaW5zcGlyZWQgYnkgQyMgZXZlbnRzIGFuZCBkZWxlZ2F0ZXMsIGFuZCBieVxuICogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NpZ25hbHNfYW5kX3Nsb3RzXCI+c2lnbmFscyBhbmQgc2xvdHM8L2E+XG4gKiBpbiBRdC5cbiAqIEEgU2lnbmFsIGFkZHMgZXZlbnQgZGlzcGF0Y2hpbmcgZnVuY3Rpb25hbGl0eSB0aHJvdWdoIGNvbXBvc2l0aW9uIGFuZCBpbnRlcmZhY2VzLFxuICogcmF0aGVyIHRoYW4gaW5oZXJpdGluZyBmcm9tIGEgZGlzcGF0Y2hlci5cbiAqIDxici8+PGJyLz5cbiAqIFByb2plY3QgaG9tZTogPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJodHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHMvXCI+aHR0cDovL2dpdGh1Yi5jb20vcm9iZXJ0cGVubmVyL2FzMy1zaWduYWxzLzwvYT5cbiAqL1xudmFyIERlbHV4ZVNpZ25hbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERlbHV4ZVNpZ25hbCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgRGVsdXhlU2lnbmFsIGluc3RhbmNlIHRvIGRpc3BhdGNoIGV2ZW50cyBvbiBiZWhhbGYgb2YgYSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSAgICB0YXJnZXQgVGhlIG9iamVjdCB0aGUgc2lnbmFsIGlzIGRpc3BhdGNoaW5nIGV2ZW50cyBvbiBiZWhhbGYgb2YuXG4gICAgICogQHBhcmFtICAgIHZhbHVlQ2xhc3NlcyBBbnkgbnVtYmVyIG9mIGNsYXNzIHJlZmVyZW5jZXMgdGhhdCBlbmFibGUgdHlwZSBjaGVja3MgaW4gZGlzcGF0Y2goKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgbmV3IERlbHV4ZVNpZ25hbCh0aGlzLCBTdHJpbmcsIHVpbnQpXG4gICAgICogd291bGQgYWxsb3c6IHNpZ25hbC5kaXNwYXRjaChcInRoZSBBbnN3ZXJcIiwgNDIpXG4gICAgICogYnV0IG5vdDogc2lnbmFsLmRpc3BhdGNoKHRydWUsIDQyLjUpXG4gICAgICogbm9yOiBzaWduYWwuZGlzcGF0Y2goKVxuICAgICAqXG4gICAgICogTk9URTogU3ViY2xhc3NlcyBjYW5ub3QgY2FsbCBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLFxuICAgICAqIGJ1dCB0aGlzIGNvbnN0cnVjdG9yIGhhcyBsb2dpYyB0byBzdXBwb3J0IHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGVsdXhlU2lnbmFsKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB2b2lkIDApIHsgdGFyZ2V0ID0gbnVsbDsgfVxuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gQ2Fubm90IHVzZSBzdXBlci5hcHBseShudWxsLCB2YWx1ZUNsYXNzZXMpLCBzbyBhbGxvdyB0aGUgc3ViY2xhc3MgdG8gY2FsbCBzdXBlcih2YWx1ZUNsYXNzZXMpLlxuICAgICAgICB2YWx1ZUNsYXNzZXMgPSAodmFsdWVDbGFzc2VzLmxlbmd0aCA9PSAxICYmIHZhbHVlQ2xhc3Nlc1swXSBpbnN0YW5jZW9mIEFycmF5KSA/IHZhbHVlQ2xhc3Nlc1swXSA6IHZhbHVlQ2xhc3NlcztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB2YWx1ZUNsYXNzZXMpIHx8IHRoaXM7XG4gICAgICAgIC8vQENIQU5HRUQgLSB0aGlzIHdhcyB0aGUgZmlyc3QgY2FsbCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgLy9UeXBlc2NyaXB0IGRvZXMgbm90IGFsbG93IFwidGhpc1wiIHRvIGJlIGNhbGxlZCBiZWZvcmUgc3VwZXJcbiAgICAgICAgX3RoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVsdXhlU2lnbmFsLnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuX3RhcmdldClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBEZWx1eGVTaWduYWwucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWVPYmplY3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZU9iamVjdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0ZSB2YWx1ZSBvYmplY3RzIGFnYWluc3QgcHJlLWRlZmluZWQgdmFsdWUgY2xhc3Nlcy5cbiAgICAgICAgdmFyIG51bVZhbHVlQ2xhc3NlcyA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7XG4gICAgICAgIHZhciBudW1WYWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHMubGVuZ3RoO1xuICAgICAgICBpZiAobnVtVmFsdWVPYmplY3RzIDwgbnVtVmFsdWVDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXQgbGVhc3QgJyArIG51bVZhbHVlQ2xhc3NlcyArICcgYnV0IHJlY2VpdmVkICcgK1xuICAgICAgICAgICAgICAgIG51bVZhbHVlT2JqZWN0cyArICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2Fubm90IGRpc3BhdGNoIGRpZmZlcmVudGx5IHR5cGVkIG9iamVjdHMgdGhhbiBkZWNsYXJlZCBjbGFzc2VzLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVZhbHVlQ2xhc3NlczsgaSsrKSB7XG4gICAgICAgICAgICAvLyBPcHRpbWl6ZWQgZm9yIHRoZSBvcHRpbWlzdGljIGNhc2UgdGhhdCB2YWx1ZXMgYXJlIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodmFsdWVPYmplY3RzW2ldID09PSBudWxsIHx8IHZhbHVlT2JqZWN0c1tpXS5jb25zdHJ1Y3RvciA9PT0gdGhpcy5fdmFsdWVDbGFzc2VzW2ldKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBvYmplY3QgPCcgKyB2YWx1ZU9iamVjdHNbaV1cbiAgICAgICAgICAgICAgICArICc+IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiA8JyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSArICc+LicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4dHJhY3QgYW5kIGNsb25lIGV2ZW50IG9iamVjdCBpZiBuZWNlc3NhcnkuXG4gICAgICAgIHZhciBldmVudCA9IHZhbHVlT2JqZWN0c1swXTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHZhbHVlT2JqZWN0c1swXSA9IGV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBldmVudC5zaWduYWwgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJyb2FkY2FzdCB0byBsaXN0ZW5lcnMuXG4gICAgICAgIHZhciBzbG90c1RvUHJvY2VzcyA9IHRoaXMuc2xvdHM7XG4gICAgICAgIHdoaWxlIChzbG90c1RvUHJvY2Vzcy5ub25FbXB0eSkge1xuICAgICAgICAgICAgc2xvdHNUb1Byb2Nlc3MuaGVhZC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgICAgICBzbG90c1RvUHJvY2VzcyA9IHNsb3RzVG9Qcm9jZXNzLnRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnViYmxlIHRoZSBldmVudCBhcyBmYXIgYXMgcG9zc2libGUuXG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LmJ1YmJsZXMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBjdXJyZW50VGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChjdXJyZW50VGFyZ2V0ICYmIGN1cnJlbnRUYXJnZXQuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRcIikpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0W1wicGFyZW50XCJdO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUYXJnZXQub25FdmVudEJ1YmJsZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIC8vIG9uRXZlbnRCdWJibGVkKCkgY2FuIHN0b3AgdGhlIGJ1YmJsaW5nIGJ5IHJldHVybmluZyBmYWxzZS5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRhcmdldC5vbkV2ZW50QnViYmxlZChldmVudCkpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGVsdXhlU2lnbmFsO1xufShQcmlvcml0eVNpZ25hbF8xLlByaW9yaXR5U2lnbmFsKSk7XG5leHBvcnRzLkRlbHV4ZVNpZ25hbCA9IERlbHV4ZVNpZ25hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlbHV4ZVNpZ25hbC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaWduYWxzLmpzL2xpYi9vcmcvb3NmbGFzaC9zaWduYWxzL0RlbHV4ZVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqXG4gKiBAc2VlIG9yZy5vc2ZsYXNoLnNpZ25hbHMuZXZlbnRzLklFdmVudFxuICogRG9jdW1lbnRhdGlvbiBmb3IgdGhlIGV2ZW50IGludGVyZmFjZSBiZWluZyBtYWludGFpbmVkIGluIElFdmVudCB0byBhdm9pZCBkdXBsaWNhdGlvbiBmb3Igbm93LlxuICovXG52YXIgR2VuZXJpY0V2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHZW5lcmljRXZlbnQoYnViYmxlcykge1xuICAgICAgICBpZiAoYnViYmxlcyA9PT0gdm9pZCAwKSB7IGJ1YmJsZXMgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLl9idWJibGVzID0gYnViYmxlcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwic2lnbmFsXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25hbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJpY0V2ZW50LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHZW5lcmljRXZlbnQucHJvdG90eXBlLCBcImN1cnJlbnRUYXJnZXRcIiwge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyaWNFdmVudC5wcm90b3R5cGUsIFwiYnViYmxlc1wiLCB7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWJibGVzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYnViYmxlcyA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBHZW5lcmljRXZlbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNFdmVudCh0aGlzLl9idWJibGVzKTtcbiAgICB9O1xuICAgIHJldHVybiBHZW5lcmljRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5HZW5lcmljRXZlbnQgPSBHZW5lcmljRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HZW5lcmljRXZlbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9ldmVudHMvR2VuZXJpY0V2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0cy5JT25jZVNpZ25hbCA9IFN5bWJvbChcIklPbmNlU2lnbmFsXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SU9uY2VTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JT25jZVNpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqXG4gKi9cbmV4cG9ydHMuSVByaW9yaXR5U2lnbmFsID0gU3ltYm9sKFwiSVByaW9yaXR5U2lnbmFsXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVByaW9yaXR5U2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVByaW9yaXR5U2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0cy5JU2lnbmFsID0gU3ltYm9sKFwiSVNpZ25hbFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlTaWduYWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9JU2lnbmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIElTbG90IGludGVyZmFjZSBkZWZpbmVzIHRoZSBiYXNpYyBwcm9wZXJ0aWVzIG9mIGFcbiAqIGxpc3RlbmVyIGFzc29jaWF0ZWQgd2l0aCBhIFNpZ25hbC5cbiAqXG4gKiBAYXV0aG9yIEpvYSBFYmVydFxuICogQGF1dGhvciBSb2JlcnQgUGVubmVyXG4gKi9cbmV4cG9ydHMuSVNsb3QgPSBTeW1ib2woXCJJU2xvdFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlTbG90LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvSVNsb3QuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNsb3RfMSA9IHJlcXVpcmUoXCIuL1Nsb3RcIik7XG4vKipcbiAqIEFsbG93cyB0aGUgdmFsdWVDbGFzc2VzIHRvIGJlIHNldCBpbiBNWE1MLCBlLmcuXG4gKiA8c2lnbmFsczpTaWduYWwgaWQ9XCJuYW1lQ2hhbmdlZFwiPntbU3RyaW5nLCB1aW50XX08L3NpZ25hbHM6U2lnbmFsPlxuICovXG4vKltEZWZhdWx0UHJvcGVydHkoXCJ2YWx1ZUNsYXNzZXNcIildKi9cbi8qKlxuICogQSBNb25vU2lnbmFsIGNhbiBoYXZlIG9ubHkgb25lIGxpc3RlbmVyLlxuICovXG52YXIgTW9ub1NpZ25hbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE1vbm9TaWduYWwgaW5zdGFuY2UgdG8gZGlzcGF0Y2ggdmFsdWUgb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gICAgdmFsdWVDbGFzc2VzIEFueSBudW1iZXIgb2YgY2xhc3MgcmVmZXJlbmNlcyB0aGF0IGVuYWJsZSB0eXBlIGNoZWNrcyBpbiBkaXNwYXRjaCgpLlxuICAgICAqIEZvciBleGFtcGxlLCBuZXcgU2lnbmFsKFN0cmluZywgdWludClcbiAgICAgKiB3b3VsZCBhbGxvdzogc2lnbmFsLmRpc3BhdGNoKFwidGhlIEFuc3dlclwiLCA0MilcbiAgICAgKiBidXQgbm90OiBzaWduYWwuZGlzcGF0Y2godHJ1ZSwgNDIuNSlcbiAgICAgKiBub3I6IHNpZ25hbC5kaXNwYXRjaCgpXG4gICAgICpcbiAgICAgKiBOT1RFOiBTdWJjbGFzc2VzIGNhbm5vdCBjYWxsIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksXG4gICAgICogYnV0IHRoaXMgY29uc3RydWN0b3IgaGFzIGxvZ2ljIHRvIHN1cHBvcnQgc3VwZXIodmFsdWVDbGFzc2VzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNb25vU2lnbmFsKCkge1xuICAgICAgICB2YXIgdmFsdWVDbGFzc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZUNsYXNzZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYW5ub3QgdXNlIHN1cGVyLmFwcGx5KG51bGwsIHZhbHVlQ2xhc3NlcyksIHNvIGFsbG93IHRoZSBzdWJjbGFzcyB0byBjYWxsIHN1cGVyKHZhbHVlQ2xhc3NlcykuXG4gICAgICAgIHRoaXMudmFsdWVDbGFzc2VzID0gKHZhbHVlQ2xhc3Nlcy5sZW5ndGggPT0gMSAmJiB2YWx1ZUNsYXNzZXNbMF0gaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZUNsYXNzZXNbMF0gOiB2YWx1ZUNsYXNzZXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb25vU2lnbmFsLnByb3RvdHlwZSwgXCJ2YWx1ZUNsYXNzZXNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGluaGVyaXREb2NcbiAgICAgICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbnZhbGlkIHZhbHVlQ2xhc3NlcyBhcmd1bWVudDogaXRlbSBhdCBpbmRleCBzaG91bGQgYmUgYSBDbGFzcyBidXQgd2FzIG5vdC5cbiAgICAgICAgICovXG4gICAgICAgIC8qW0FycmF5RWxlbWVudFR5cGUoXCJDbGFzc1wiKV0qL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZUNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBDbG9uZSBzbyB0aGUgQXJyYXkgY2Fubm90IGJlIGFmZmVjdGVkIGZyb20gb3V0c2lkZS5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2xhc3NlcyA9IHZhbHVlID8gdmFsdWUuc2xpY2UoKSA6IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX3ZhbHVlQ2xhc3Nlcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl92YWx1ZUNsYXNzZXNbaV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZUNsYXNzZXMgYXJndW1lbnQ6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2l0ZW0gYXQgaW5kZXggJyArIGkgKyAnIHNob3VsZCBiZSBhIENsYXNzIGJ1dCB3YXM6PCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyArIHRoaXMuX3ZhbHVlQ2xhc3Nlc1tpXSk7IC8vQENIQU5HRUQgLSB0ZW1wIHJlcGxhY2VtZW50IGZvciBnZXRRdWFsaWZpZWRDbGFzc0J5TmFtZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9ub1NpZ25hbC5wcm90b3R5cGUsIFwibnVtTGlzdGVuZXJzXCIsIHtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdCA/IDEgOiAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaW5oZXJpdERvY1xuICAgICAqIEB0aHJvd3MgZmxhc2guZXJyb3JzLklsbGVnYWxPcGVyYXRpb25FcnJvciA8Y29kZT5JbGxlZ2FsT3BlcmF0aW9uRXJyb3I8L2NvZGU+OiBZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBHaXZlbiBsaXN0ZW5lciBpcyA8Y29kZT5udWxsPC9jb2RlPi5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5hZGRPbmNlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgTW9ub1NpZ25hbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNsb3QgJiYgdGhpcy5zbG90Lmxpc3RlbmVyID09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgdGhlU2xvdCA9IHRoaXMuc2xvdDtcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhlU2xvdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xvdClcbiAgICAgICAgICAgIHRoaXMuc2xvdC5yZW1vdmUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBBcmd1bWVudEVycm9yIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+OiBJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT46IFZhbHVlIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcHJvcHJpYXRlIHZhbHVlQ2xhc3NlcyBDbGFzcy5cbiAgICAgKi9cbiAgICBNb25vU2lnbmFsLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdmFsdWVDbGFzc2VzIGlzIGVtcHR5LCB2YWx1ZSBvYmplY3RzIGFyZSBub3QgdHlwZS1jaGVja2VkLlxuICAgICAgICB2YXIgbnVtVmFsdWVDbGFzc2VzID0gdGhpcy5fdmFsdWVDbGFzc2VzLmxlbmd0aDtcbiAgICAgICAgdmFyIG51bVZhbHVlT2JqZWN0cyA9IHZhbHVlT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBmZXdlciBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgaWYgKG51bVZhbHVlT2JqZWN0cyA8IG51bVZhbHVlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGF0IGxlYXN0ICcgKyBudW1WYWx1ZUNsYXNzZXMgKyAnIGJ1dCByZWNlaXZlZCAnICtcbiAgICAgICAgICAgICAgICBudW1WYWx1ZU9iamVjdHMgKyAnLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbm5vdCBkaXNwYXRjaCBkaWZmZXJlbnRseSB0eXBlZCBvYmplY3RzIHRoYW4gZGVjbGFyZWQgY2xhc3Nlcy5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1WYWx1ZUNsYXNzZXM7IGkrKykge1xuICAgICAgICAgICAgLy8gT3B0aW1pemVkIGZvciB0aGUgb3B0aW1pc3RpYyBjYXNlIHRoYXQgdmFsdWVzIGFyZSBjb3JyZWN0LlxuICAgICAgICAgICAgaWYgKHZhbHVlT2JqZWN0c1tpXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICh2YWx1ZU9iamVjdHNbaV0gaW5zdGFuY2VvZiB0aGlzLl92YWx1ZUNsYXNzZXNbaV0gfHwgdmFsdWVPYmplY3RzW2ldLmNvbnN0cnVjdG9yID09PSB0aGlzLl92YWx1ZUNsYXNzZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIG9iamVjdCA8JyArIHZhbHVlT2JqZWN0c1tpXVxuICAgICAgICAgICAgICAgICsgJz4gaXMgbm90IGFuIGluc3RhbmNlIG9mIDwnICsgdGhpcy5fdmFsdWVDbGFzc2VzW2ldICsgJz4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnJvYWRjYXN0IHRvIHRoZSBvbmUgbGlzdGVuZXIuXG4gICAgICAgIGlmICh0aGlzLnNsb3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdC5leGVjdXRlKHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vbm9TaWduYWwucHJvdG90eXBlLnJlZ2lzdGVyTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIsIG9uY2UpIHtcbiAgICAgICAgaWYgKG9uY2UgPT09IHZvaWQgMCkgeyBvbmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMuc2xvdCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIGV4aXRzIHByZXZpb3VzbHkgYWRkZWQsIGRlZmluaXRlbHkgZG9uJ3QgYWRkIGl0LlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGFkZCBvciBhZGRPbmNlIHdpdGggYSBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLCByZW1vdmUgdGhlIGN1cnJlbnQgbGlzdGVuZXIgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnNsb3QgPSBuZXcgU2xvdF8xLlNsb3QobGlzdGVuZXIsIHRoaXMsIG9uY2UpKTtcbiAgICB9O1xuICAgIHJldHVybiBNb25vU2lnbmFsO1xufSgpKTtcbmV4cG9ydHMuTW9ub1NpZ25hbCA9IE1vbm9TaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Nb25vU2lnbmFsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NpZ25hbHMuanMvbGliL29yZy9vc2ZsYXNoL3NpZ25hbHMvTW9ub1NpZ25hbC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBPbmNlU2lnbmFsXzEgPSByZXF1aXJlKFwiLi9PbmNlU2lnbmFsXCIpO1xudmFyIFByb21pc2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9taXNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgLypvdmVycmlkZSovXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuYWRkT25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2xvdCA9IF9zdXBlci5wcm90b3R5cGUuYWRkT25jZS5jYWxsKHRoaXMsIGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgICBzbG90LmV4ZWN1dGUodGhpcy52YWx1ZU9iamVjdHMpO1xuICAgICAgICAgICAgc2xvdC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2xvdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpbmhlcml0RG9jXG4gICAgICogQHRocm93cyBmbGFzaC5lcnJvcnMuSWxsZWdhbE9wZXJhdGlvbkVycm9yIDxjb2RlPklsbGVnYWxPcGVyYXRpb25FcnJvcjwvY29kZT46IFlvdSBjYW5ub3QgZGlzcGF0Y2goKSBhIFByb21pc2UgbW9yZSB0aGFuIG9uY2VcbiAgICAgKi9cbiAgICAvKm92ZXJyaWRlKi9cbiAgICBQcm9taXNlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlT2JqZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFsdWVPYmplY3RzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IGRpc3BhdGNoKCkgYSBQcm9taXNlIG1vcmUgdGhhbiBvbmNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3BhdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZU9iamVjdHMgPSB2YWx1ZU9iamVjdHM7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRpc3BhdGNoLmFwcGx5KHRoaXMsIHZhbHVlT2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQcm9taXNlO1xufShPbmNlU2lnbmFsXzEuT25jZVNpZ25hbCkpO1xuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVByb21pc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2lnbmFscy5qcy9saWIvb3JnL29zZmxhc2gvc2lnbmFscy9Qcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBDbG9jayA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2xvY2sodXNlSW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHVzZUludGVydmFsID09PSB2b2lkIDApIHsgdXNlSW50ZXJ2YWwgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3cgPSAodHlwZW9mICh3aW5kb3cpICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICYmICh3aW5kb3cucGVyZm9ybWFuY2Uubm93KS5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSkpIHx8IERhdGUubm93O1xuICAgICAgICB0aGlzLnN0YXJ0KHVzZUludGVydmFsKTtcbiAgICB9XG4gICAgQ2xvY2sucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKHVzZUludGVydmFsKSB7XG4gICAgICAgIGlmICh1c2VJbnRlcnZhbCA9PT0gdm9pZCAwKSB7IHVzZUludGVydmFsID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5ub3coKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIGlmICh1c2VJbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gYXV0byBzZXQgaW50ZXJ2YWwgdG8gNjAgdGlja3MgcGVyIHNlY29uZFxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTAwMCAvIDYwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2xvY2sucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDbG9jay5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uIChuZXdUaW1lKSB7XG4gICAgICAgIGlmIChuZXdUaW1lID09PSB2b2lkIDApIHsgbmV3VGltZSA9IHRoaXMubm93KCk7IH1cbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSBuZXdUaW1lIC0gdGhpcy5jdXJyZW50VGltZTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IG5ld1RpbWU7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gdGhpcy5kZWx0YVRpbWU7XG4gICAgfTtcbiAgICByZXR1cm4gQ2xvY2s7XG59KCkpO1xubW9kdWxlLmV4cG9ydHMgPSBDbG9jaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BnYW1lc3RkaW8vY2xvY2svZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGVsdGFDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0RlbHRhQ29udGFpbmVyXCIpO1xuZXhwb3J0cy5EZWx0YUNvbnRhaW5lciA9IERlbHRhQ29udGFpbmVyXzEuRGVsdGFDb250YWluZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbXBhcmVfMSA9IHJlcXVpcmUoXCIuL2NvbXBhcmVcIik7XG52YXIgRGVsdGFDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVsdGFDb250YWluZXIoZGF0YSkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLm1hdGNoZXJQbGFjZWhvbGRlcnMgPSB7XG4gICAgICAgICAgICBcIjppZFwiOiAvXihbYS16QS1aMC05XFwtX10rKSQvLFxuICAgICAgICAgICAgXCI6bnVtYmVyXCI6IC9eKFswLTldKykkLyxcbiAgICAgICAgICAgIFwiOnN0cmluZ1wiOiAvXihcXHcrKSQvLFxuICAgICAgICAgICAgXCI6YXhpc1wiOiAvXihbeHl6XSkkLyxcbiAgICAgICAgICAgIFwiOipcIjogLyguKikvLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgICB2YXIgcGF0Y2hlcyA9IGNvbXBhcmVfMS5jb21wYXJlKHRoaXMuZGF0YSwgbmV3RGF0YSk7XG4gICAgICAgIHRoaXMuY2hlY2tQYXRjaGVzKHBhdGNoZXMpO1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXdEYXRhO1xuICAgICAgICByZXR1cm4gcGF0Y2hlcztcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZWdpc3RlclBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKHBsYWNlaG9sZGVyLCBtYXRjaGVyKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlclBsYWNlaG9sZGVyc1twbGFjZWhvbGRlcl0gPSBtYXRjaGVyO1xuICAgIH07XG4gICAgRGVsdGFDb250YWluZXIucHJvdG90eXBlLmxpc3RlbiA9IGZ1bmN0aW9uIChzZWdtZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJ1bGVzO1xuICAgICAgICBpZiAodHlwZW9mIChzZWdtZW50cykgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcnVsZXMgPSBbXTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gc2VnbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBydWxlcyA9IHNlZ21lbnRzLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiLmxpc3RlbigpIGFjY2VwdHMgb25seSBvbmUgcGFyYW1ldGVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICByYXdSdWxlczogcnVsZXMsXG4gICAgICAgICAgICBydWxlczogcnVsZXMubWFwKGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc2VnbWVudCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBwbGFjZWhvbGRlciBtYXRjaGVyc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHNlZ21lbnQuaW5kZXhPZihcIjpcIikgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF90aGlzLm1hdGNoZXJQbGFjZWhvbGRlcnNbc2VnbWVudF0gfHwgX3RoaXMubWF0Y2hlclBsYWNlaG9sZGVyc1tcIjoqXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBSZWdFeHAoXCJeXCIgKyBzZWdtZW50ICsgXCIkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5jaGVja1BhdGNoZXMgPSBmdW5jdGlvbiAocGF0Y2hlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gcGF0Y2hlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVycy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW2pdO1xuICAgICAgICAgICAgICAgIHZhciBwYXRoVmFyaWFibGVzID0gdGhpcy5nZXRQYXRoVmFyaWFibGVzKHBhdGNoZXNbaV0sIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAocGF0aFZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBwYXRoVmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3UGF0aDogcGF0Y2hlc1tpXS5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiBwYXRjaGVzW2ldLm9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXRjaGVzW2ldLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgZmFsbGJhY2sgbGlzdGVuZXJcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZCAmJiB0aGlzLmRlZmF1bHRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdExpc3RlbmVyLmNhbGxiYWNrKHBhdGNoZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBEZWx0YUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0UGF0aFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChwYXRjaCwgbGlzdGVuZXIpIHtcbiAgICAgICAgLy8gc2tpcCBpZiBydWxlcyBjb3VudCBkaWZmZXIgZnJvbSBwYXRjaFxuICAgICAgICBpZiAocGF0Y2gucGF0aC5sZW5ndGggIT09IGxpc3RlbmVyLnJ1bGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXRoID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaXN0ZW5lci5ydWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSBwYXRjaC5wYXRoW2ldLm1hdGNoKGxpc3RlbmVyLnJ1bGVzW2ldKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2hlcyB8fCBtYXRjaGVzLmxlbmd0aCA9PT0gMCB8fCBtYXRjaGVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsaXN0ZW5lci5yYXdSdWxlc1tpXS5zdWJzdHIoMCwgMSkgPT09IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgcGF0aFtsaXN0ZW5lci5yYXdSdWxlc1tpXS5zdWJzdHIoMSldID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xuICAgIERlbHRhQ29udGFpbmVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9O1xuICAgIHJldHVybiBEZWx0YUNvbnRhaW5lcjtcbn0oKSk7XG5leHBvcnRzLkRlbHRhQ29udGFpbmVyID0gRGVsdGFDb250YWluZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWx0YS1saXN0ZW5lci9saWIvRGVsdGFDb250YWluZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY29tcGFyZSh0cmVlMSwgdHJlZTIpIHtcbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xuICAgIGdlbmVyYXRlKHRyZWUxLCB0cmVlMiwgcGF0Y2hlcywgW10pO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcbmZ1bmN0aW9uIGNvbmNhdChhcnIsIHZhbHVlKSB7XG4gICAgdmFyIG5ld0FyciA9IGFyci5zbGljZSgpO1xuICAgIG5ld0Fyci5wdXNoKHZhbHVlKTtcbiAgICByZXR1cm4gbmV3QXJyO1xufVxuZnVuY3Rpb24gb2JqZWN0S2V5cyhvYmopIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHZhciBrZXlzXzEgPSBuZXcgQXJyYXkob2JqLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5c18xLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBrZXlzXzFba10gPSBcIlwiICsgaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5c18xO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xufVxuO1xuLy8gRGlydHkgY2hlY2sgaWYgb2JqIGlzIGRpZmZlcmVudCBmcm9tIG1pcnJvciwgZ2VuZXJhdGUgcGF0Y2hlcyBhbmQgdXBkYXRlIG1pcnJvclxuZnVuY3Rpb24gZ2VuZXJhdGUobWlycm9yLCBvYmosIHBhdGNoZXMsIHBhdGgpIHtcbiAgICB2YXIgbmV3S2V5cyA9IG9iamVjdEtleXMob2JqKTtcbiAgICB2YXIgb2xkS2V5cyA9IG9iamVjdEtleXMobWlycm9yKTtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBkZWxldGVkID0gZmFsc2U7XG4gICAgZm9yICh2YXIgdCA9IG9sZEtleXMubGVuZ3RoIC0gMTsgdCA+PSAwOyB0LS0pIHtcbiAgICAgICAgdmFyIGtleSA9IG9sZEtleXNbdF07XG4gICAgICAgIHZhciBvbGRWYWwgPSBtaXJyb3Jba2V5XTtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICEob2JqW2tleV0gPT09IHVuZGVmaW5lZCAmJiBvbGRWYWwgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KG9iaikgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWwgPT0gXCJvYmplY3RcIiAmJiBvbGRWYWwgIT0gbnVsbCAmJiB0eXBlb2YgbmV3VmFsID09IFwib2JqZWN0XCIgJiYgbmV3VmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZShvbGRWYWwsIG5ld1ZhbCwgcGF0Y2hlcywgY29uY2F0KHBhdGgsIGtleSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbCAhPT0gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwYXRjaGVzLnB1c2goeyBvcGVyYXRpb246IFwicmVwbGFjZVwiLCBwYXRoOiBjb25jYXQocGF0aCwga2V5KSwgdmFsdWU6IG5ld1ZhbCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXRjaGVzLnB1c2goeyBvcGVyYXRpb246IFwicmVtb3ZlXCIsIHBhdGg6IGNvbmNhdChwYXRoLCBrZXkpIH0pO1xuICAgICAgICAgICAgZGVsZXRlZCA9IHRydWU7IC8vIHByb3BlcnR5IGhhcyBiZWVuIGRlbGV0ZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWRlbGV0ZWQgJiYgbmV3S2V5cy5sZW5ndGggPT0gb2xkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciB0ID0gMDsgdCA8IG5ld0tleXMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgdmFyIGtleSA9IG5ld0tleXNbdF07XG4gICAgICAgIGlmICghbWlycm9yLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgdmFyIGFkZFBhdGggPSBjb25jYXQocGF0aCwga2V5KTtcbiAgICAgICAgICAgIC8vIGNvbXBhcmUgZGVlcGVyIGFkZGl0aW9uc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWwgPT0gXCJvYmplY3RcIiAmJiBuZXdWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlKHt9LCBuZXdWYWwsIHBhdGNoZXMsIGFkZFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKHsgb3BlcmF0aW9uOiBcImFkZFwiLCBwYXRoOiBhZGRQYXRoLCB2YWx1ZTogbmV3VmFsIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZGVsdGEtbGlzdGVuZXIvbGliL2NvbXBhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEZvc3NpbCBTQ00gZGVsdGEgY29tcHJlc3Npb24gYWxnb3JpdGhtXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vIEZvcm1hdDpcbi8vIGh0dHA6Ly93d3cuZm9zc2lsLXNjbS5vcmcvaW5kZXguaHRtbC9kb2MvdGlwL3d3dy9kZWx0YV9mb3JtYXQud2lraVxuLy9cbi8vIEFsZ29yaXRobTpcbi8vIGh0dHA6Ly93d3cuZm9zc2lsLXNjbS5vcmcvaW5kZXguaHRtbC9kb2MvdGlwL3d3dy9kZWx0YV9lbmNvZGVyX2FsZ29yaXRobS53aWtpXG4vL1xuLy8gT3JpZ2luYWwgaW1wbGVtZW50YXRpb246XG4vLyBodHRwOi8vd3d3LmZvc3NpbC1zY20ub3JnL2luZGV4Lmh0bWwvYXJ0aWZhY3QvZDFiMDU5OGFkY2Q2NTBiMzU1MWY2M2IxN2RmYzg2NGU3Mzc3NWMzZFxuLy9cbi8vIExJQ0VOU0Vcbi8vIC0tLS0tLS1cbi8vXG4vLyBDb3B5cmlnaHQgMjAxNCBEbWl0cnkgQ2hlc3RueWtoIChKYXZhU2NyaXB0IHBvcnQpXG4vLyBDb3B5cmlnaHQgMjAwNyBELiBSaWNoYXJkIEhpcHAgIChvcmlnaW5hbCBDIHZlcnNpb24pXG4vLyBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy9cbi8vIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Jcbi8vIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuLy9cbi8vICAgMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZVxuLy8gICAgICBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlXG4vLyAgICAgIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuLy9cbi8vICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZVxuLy8gICAgICBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlXG4vLyAgICAgIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlclxuLy8gICAgICBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuLy9cbi8vIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIEFVVEhPUlMgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbi8vIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuLy8gQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPTlRSSUJVVE9SUyBCRVxuLy8gTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuLy8gQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0Zcbi8vIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUlxuLy8gQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4vLyBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRVxuLy8gT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSxcbi8vIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4vL1xuLy8gVGhlIHZpZXdzIGFuZCBjb25jbHVzaW9ucyBjb250YWluZWQgaW4gdGhlIHNvZnR3YXJlIGFuZCBkb2N1bWVudGF0aW9uXG4vLyBhcmUgdGhvc2Ugb2YgdGhlIGF1dGhvcnMgYW5kIGNvbnRyaWJ1dG9ycyBhbmQgc2hvdWxkIG5vdCBiZSBpbnRlcnByZXRlZFxuLy8gYXMgcmVwcmVzZW50aW5nIG9mZmljaWFsIHBvbGljaWVzLCBlaXRoZXIgZXhwcmVzc2VkIG9yIGltcGxpZWQsIG9mIGFueWJvZHlcbi8vIGVsc2UuXG4vL1xuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgZWxzZSByb290LmZvc3NpbERlbHRhID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBmb3NzaWxEZWx0YSA9IHt9O1xuXG4vLyBIYXNoIHdpbmRvdyB3aWR0aCBpbiBieXRlcy4gTXVzdCBiZSBhIHBvd2VyIG9mIHR3by5cbnZhciBOSEFTSCA9IDE2O1xuXG5mdW5jdGlvbiBSb2xsaW5nSGFzaCgpIHtcbiAgdGhpcy5hID0gMDsgLy8gaGFzaCAgICAgKDE2LWJpdCB1bnNpZ25lZClcbiAgdGhpcy5iID0gMDsgLy8gdmFsdWVzICAgKDE2LWJpdCB1bnNpZ25lZClcbiAgdGhpcy5pID0gMDsgLy8gc3RhcnQgb2YgdGhlIGhhc2ggd2luZG93ICgxNi1iaXQgdW5zaWduZWQpXG4gIHRoaXMueiA9IG5ldyBBcnJheShOSEFTSCk7IC8vIHRoZSB2YWx1ZXMgdGhhdCBoYXZlIGJlZW4gaGFzaGVkLlxufVxuXG4vLyBJbml0aWFsaXplIHRoZSByb2xsaW5nIGhhc2ggdXNpbmcgdGhlIGZpcnN0IE5IQVNIIGJ5dGVzIG9mXG4vLyB6IGF0IHRoZSBnaXZlbiBwb3NpdGlvbi5cblJvbGxpbmdIYXNoLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oeiwgcG9zKSB7XG4gIHZhciBhID0gMCwgYiA9IDAsIGksIHg7XG4gIGZvcihpID0gMDsgaSA8IE5IQVNIOyBpKyspe1xuICAgIHggPSB6W3BvcytpXTtcbiAgICBhID0gKGEgKyB4KSAmIDB4ZmZmZjtcbiAgICBiID0gKGIgKyAoTkhBU0gtaSkqeCkgJiAweGZmZmY7XG4gICAgdGhpcy56W2ldID0geDtcbiAgfVxuICB0aGlzLmEgPSBhICYgMHhmZmZmO1xuICB0aGlzLmIgPSBiICYgMHhmZmZmO1xuICB0aGlzLmkgPSAwO1xufTtcblxuLy8gQWR2YW5jZSB0aGUgcm9sbGluZyBoYXNoIGJ5IGEgc2luZ2xlIGJ5dGUgXCJjXCIuXG5Sb2xsaW5nSGFzaC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKGMpIHtcbiAgdmFyIG9sZCA9IHRoaXMuelt0aGlzLmldO1xuICB0aGlzLnpbdGhpcy5pXSA9IGM7XG4gIHRoaXMuaSA9ICh0aGlzLmkrMSkmKE5IQVNILTEpO1xuICB0aGlzLmEgPSAodGhpcy5hIC0gb2xkICsgYykgJiAweGZmZmY7XG4gIHRoaXMuYiA9ICh0aGlzLmIgLSBOSEFTSCpvbGQgKyB0aGlzLmEpICYgMHhmZmZmO1xufTtcblxuLy8gUmV0dXJuIGEgMzItYml0IGhhc2ggdmFsdWUuXG5Sb2xsaW5nSGFzaC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICgodGhpcy5hICYgMHhmZmZmKSB8ICh0aGlzLmIgJiAweGZmZmYpPDwxNik+Pj4wO1xufTtcblxudmFyIHpEaWdpdHMgPSBcIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl9hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5en5cIi5cbiAgICAgICAgICAgICAgICBzcGxpdCgnJykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LmNoYXJDb2RlQXQoMCk7IH0pO1xuXG52YXIgelZhbHVlID0gW1xuICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsICAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsICAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsICAgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAgMCwgIDEsICAyLCAgMywgIDQsICA1LCAgNiwgIDcsICAgIDgsICA5LCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLFxuICAtMSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsICAgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LFxuICAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMSwgMzIsICAgMzMsIDM0LCAzNSwgLTEsIC0xLCAtMSwgLTEsIDM2LFxuICAtMSwgMzcsIDM4LCAzOSwgNDAsIDQxLCA0MiwgNDMsICAgNDQsIDQ1LCA0NiwgNDcsIDQ4LCA0OSwgNTAsIDUxLFxuICA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksICAgNjAsIDYxLCA2MiwgLTEsIC0xLCAtMSwgNjMsIC0xXG5dO1xuXG4vLyBSZWFkZXIgcmVhZHMgYnl0ZXMsIGNoYXJzLCBpbnRzIGZyb20gYXJyYXkuXG5mdW5jdGlvbiBSZWFkZXIoYXJyYXkpIHtcbiAgdGhpcy5hID0gYXJyYXk7IC8vIHNvdXJjZSBhcnJheVxuICB0aGlzLnBvcyA9IDA7ICAgLy8gY3VycmVudCBwb3NpdGlvbiBpbiBhcnJheVxufVxuXG5SZWFkZXIucHJvdG90eXBlLmhhdmVCeXRlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wb3MgPCB0aGlzLmEubGVuZ3RoO1xufTtcblxuUmVhZGVyLnByb3RvdHlwZS5nZXRCeXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBiID0gdGhpcy5hW3RoaXMucG9zXTtcbiAgdGhpcy5wb3MrKztcbiAgaWYgKHRoaXMucG9zID4gdGhpcy5hLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiBib3VuZHMnKTtcbiAgcmV0dXJuIGI7XG59O1xuXG5SZWFkZXIucHJvdG90eXBlLmdldENoYXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5nZXRCeXRlKCkpO1xufTtcblxuLy8gUmVhZCBiYXNlNjQtZW5jb2RlZCB1bnNpZ25lZCBpbnRlZ2VyLlxuUmVhZGVyLnByb3RvdHlwZS5nZXRJbnQgPSBmdW5jdGlvbigpe1xuICB2YXIgdiA9IDAsIGM7XG4gIHdoaWxlKHRoaXMuaGF2ZUJ5dGVzKCkgJiYgKGMgPSB6VmFsdWVbMHg3ZiAmIHRoaXMuZ2V0Qnl0ZSgpXSkgPj0gMCkge1xuICAgICB2ID0gKHY8PDYpICsgYztcbiAgfVxuICB0aGlzLnBvcy0tO1xuICByZXR1cm4gdiA+Pj4gMDtcbn07XG5cblxuLy8gV3JpdGUgd3JpdGVzIGFuIGFycmF5LlxuZnVuY3Rpb24gV3JpdGVyKCkge1xuICB0aGlzLmEgPSBbXTtcbn1cblxuV3JpdGVyLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmE7XG59O1xuXG5Xcml0ZXIucHJvdG90eXBlLnB1dEJ5dGUgPSBmdW5jdGlvbihiKSB7XG4gIHRoaXMuYS5wdXNoKGIgJiAweGZmKTtcbn07XG5cbi8vIFdyaXRlIGFuIEFTQ0lJIGNoYXJhY3RlciAocyBpcyBhIG9uZS1jaGFyIHN0cmluZykuXG5Xcml0ZXIucHJvdG90eXBlLnB1dENoYXIgPSBmdW5jdGlvbihzKSB7XG4gIHRoaXMucHV0Qnl0ZShzLmNoYXJDb2RlQXQoMCkpO1xufTtcblxuLy8gV3JpdGUgYSBiYXNlNjQgdW5zaWduZWQgaW50ZWdlci5cbldyaXRlci5wcm90b3R5cGUucHV0SW50ID0gZnVuY3Rpb24odil7XG4gIHZhciBpLCBqLCB6QnVmID0gW107XG4gIGlmICh2ID09PSAwKSB7XG4gICAgdGhpcy5wdXRDaGFyKCcwJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoaSA9IDA7IHYgPiAwOyBpKyssIHYgPj4+PSA2KVxuICAgIHpCdWYucHVzaCh6RGlnaXRzW3YmMHgzZl0pO1xuICBmb3IgKGogPSBpLTE7IGogPj0gMDsgai0tKVxuICAgIHRoaXMucHV0Qnl0ZSh6QnVmW2pdKTtcbn07XG5cbi8vIENvcHkgZnJvbSBhcnJheSBhdCBzdGFydCB0byBlbmQuXG5Xcml0ZXIucHJvdG90eXBlLnB1dEFycmF5ID0gZnVuY3Rpb24oYSwgc3RhcnQsIGVuZCkge1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykgdGhpcy5hLnB1c2goYVtpXSk7XG59O1xuXG4vLyBSZXR1cm4gdGhlIG51bWJlciBkaWdpdHMgaW4gdGhlIGJhc2U2NCByZXByZXNlbnRhdGlvbiBvZiBhIHBvc2l0aXZlIGludGVnZXIuXG5mdW5jdGlvbiBkaWdpdENvdW50KHYpe1xuICB2YXIgaSwgeDtcbiAgZm9yIChpID0gMSwgeCA9IDY0OyB2ID49IHg7IGkrKywgeCA8PD0gNil7IC8qIG5vdGhpbmcgKi8gfVxuICByZXR1cm4gaTtcbn1cblxuLy8gUmV0dXJuIGEgMzItYml0IGNoZWNrc3VtIG9mIHRoZSBhcnJheS5cbmZ1bmN0aW9uIGNoZWNrc3VtKGFycikge1xuICB2YXIgc3VtMCA9IDAsIHN1bTEgPSAwLCBzdW0yID0gMCwgc3VtMyA9IDAsXG4gICAgICB6ID0gMCwgTiA9IGFyci5sZW5ndGg7XG4gIC8vVE9ETyBtZWFzdXJlIGlmIHRoaXMgdW5yb2xsaW5nIGlzIGhlbHBmdWwuXG4gIHdoaWxlIChOID49IDE2KSB7XG4gICAgc3VtMCA9IHN1bTAgKyBhcnJbeiswXSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeisxXSB8IDA7XG4gICAgc3VtMiA9IHN1bTIgKyBhcnJbeisyXSB8IDA7XG4gICAgc3VtMyA9IHN1bTMgKyBhcnJbeiszXSB8IDA7XG5cbiAgICBzdW0wID0gc3VtMCArIGFyclt6KzRdIHwgMDtcbiAgICBzdW0xID0gc3VtMSArIGFyclt6KzVdIHwgMDtcbiAgICBzdW0yID0gc3VtMiArIGFyclt6KzZdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzddIHwgMDtcblxuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orOF0gfCAwO1xuICAgIHN1bTEgPSBzdW0xICsgYXJyW3orOV0gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orMTBdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzExXSB8IDA7XG5cbiAgICBzdW0wID0gc3VtMCArIGFyclt6KzEyXSB8IDA7XG4gICAgc3VtMSA9IHN1bTEgKyBhcnJbeisxM10gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orMTRdIHwgMDtcbiAgICBzdW0zID0gc3VtMyArIGFyclt6KzE1XSB8IDA7XG5cbiAgICB6ICs9IDE2O1xuICAgIE4gLT0gMTY7XG4gIH1cbiAgd2hpbGUgKE4gPj0gNCkge1xuICAgIHN1bTAgPSBzdW0wICsgYXJyW3orMF0gfCAwO1xuICAgIHN1bTEgPSBzdW0xICsgYXJyW3orMV0gfCAwO1xuICAgIHN1bTIgPSBzdW0yICsgYXJyW3orMl0gfCAwO1xuICAgIHN1bTMgPSBzdW0zICsgYXJyW3orM10gfCAwO1xuICAgIHogKz0gNDtcbiAgICBOIC09IDQ7XG4gIH1cbiAgc3VtMyA9ICgoKHN1bTMgKyAoc3VtMiA8PCA4KSB8IDApICsgKHN1bTEgPDwgMTYpIHwgMCkgKyAoc3VtMCA8PCAyNCkgfCAwKTtcbiAgLyoganNoaW50IC1XMDg2ICovXG4gIHN3aXRjaCAoTikge1xuICAgIGNhc2UgMzogc3VtMyA9IHN1bTMgKyAoYXJyW3orMl0gPDwgIDgpIHwgMDsgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgIGNhc2UgMjogc3VtMyA9IHN1bTMgKyAoYXJyW3orMV0gPDwgMTYpIHwgMDsgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgIGNhc2UgMTogc3VtMyA9IHN1bTMgKyAoYXJyW3orMF0gPDwgMjQpIHwgMDsgLyogZmFsbHMgdGhyb3VnaCAqL1xuICB9XG4gIHJldHVybiBzdW0zID4+PiAwO1xufVxuXG4vLyBDcmVhdGUgYSBuZXcgZGVsdGEgZnJvbSBzcmMgdG8gb3V0LlxuZm9zc2lsRGVsdGEuY3JlYXRlID0gZnVuY3Rpb24oc3JjLCBvdXQpIHtcbiAgdmFyIHpEZWx0YSA9IG5ldyBXcml0ZXIoKTtcbiAgdmFyIGxlbk91dCA9IG91dC5sZW5ndGg7XG4gIHZhciBsZW5TcmMgPSBzcmMubGVuZ3RoO1xuICB2YXIgaSwgbGFzdFJlYWQgPSAtMTtcblxuICB6RGVsdGEucHV0SW50KGxlbk91dCk7XG4gIHpEZWx0YS5wdXRDaGFyKCdcXG4nKTtcblxuICAvLyBJZiB0aGUgc291cmNlIGlzIHZlcnkgc21hbGwsIGl0IG1lYW5zIHRoYXQgd2UgaGF2ZSBub1xuICAvLyBjaGFuY2Ugb2YgZXZlciBkb2luZyBhIGNvcHkgY29tbWFuZC4gIEp1c3Qgb3V0cHV0IGEgc2luZ2xlXG4gIC8vIGxpdGVyYWwgc2VnbWVudCBmb3IgdGhlIGVudGlyZSB0YXJnZXQgYW5kIGV4aXQuXG4gIGlmIChsZW5TcmMgPD0gTkhBU0gpIHtcbiAgICB6RGVsdGEucHV0SW50KGxlbk91dCk7XG4gICAgekRlbHRhLnB1dENoYXIoJzonKTtcbiAgICB6RGVsdGEucHV0QXJyYXkob3V0LCAwLCBsZW5PdXQpO1xuICAgIHpEZWx0YS5wdXRJbnQoY2hlY2tzdW0ob3V0KSk7XG4gICAgekRlbHRhLnB1dENoYXIoJzsnKTtcbiAgICByZXR1cm4gekRlbHRhLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGhhc2ggdGFibGUgdXNlZCB0byBsb2NhdGUgbWF0Y2hpbmcgc2VjdGlvbnMgaW4gdGhlIHNvdXJjZS5cbiAgdmFyIG5IYXNoID0gTWF0aC5jZWlsKGxlblNyYyAvIE5IQVNIKTtcbiAgdmFyIGNvbGxpZGUgPSAgbmV3IEFycmF5KG5IYXNoKTtcbiAgdmFyIGxhbmRtYXJrID0gbmV3IEFycmF5KG5IYXNoKTtcbiAgZm9yIChpID0gMDsgaSA8IGNvbGxpZGUubGVuZ3RoOyBpKyspIGNvbGxpZGVbaV0gPSAtMTtcbiAgZm9yIChpID0gMDsgaSA8IGxhbmRtYXJrLmxlbmd0aDsgaSsrKSBsYW5kbWFya1tpXSA9IC0xO1xuICB2YXIgaHYsIGggPSBuZXcgUm9sbGluZ0hhc2goKTtcbiAgZm9yIChpID0gMDsgaSA8IGxlblNyYy1OSEFTSDsgaSArPSBOSEFTSCkge1xuICAgIGguaW5pdChzcmMsIGkpO1xuICAgIGh2ID0gaC52YWx1ZSgpICUgbkhhc2g7XG4gICAgY29sbGlkZVtpL05IQVNIXSA9IGxhbmRtYXJrW2h2XTtcbiAgICBsYW5kbWFya1todl0gPSBpL05IQVNIO1xuICB9XG5cbiAgdmFyIGJhc2UgPSAwO1xuICB2YXIgaVNyYywgaUJsb2NrLCBiZXN0Q250LCBiZXN0T2ZzdCwgYmVzdExpdHN6O1xuICB3aGlsZSAoYmFzZStOSEFTSDxsZW5PdXQpIHtcbiAgICBiZXN0T2ZzdD0wO1xuICAgIGJlc3RMaXRzej0wO1xuICAgIGguaW5pdChvdXQsIGJhc2UpO1xuICAgIGkgPSAwOyAvLyBUcnlpbmcgdG8gbWF0Y2ggYSBsYW5kbWFyayBhZ2FpbnN0IHpPdXRbYmFzZStpXVxuICAgIGJlc3RDbnQgPSAwO1xuICAgIHdoaWxlKDEpIHtcbiAgICAgIHZhciBsaW1pdCA9IDI1MDtcbiAgICAgIGh2ID0gaC52YWx1ZSgpICUgbkhhc2g7XG4gICAgICBpQmxvY2sgPSBsYW5kbWFya1todl07XG4gICAgICB3aGlsZSAoaUJsb2NrID49IDAgJiYgKGxpbWl0LS0pPjAgKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBoYXNoIHdpbmRvdyBoYXMgaWRlbnRpZmllZCBhIHBvdGVudGlhbCBtYXRjaCBhZ2FpbnN0XG4gICAgICAgIC8vIGxhbmRtYXJrIGJsb2NrIGlCbG9jay4gIEJ1dCB3ZSBuZWVkIHRvIGludmVzdGlnYXRlIGZ1cnRoZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIExvb2sgZm9yIGEgcmVnaW9uIGluIHpPdXQgdGhhdCBtYXRjaGVzIHpTcmMuIEFuY2hvciB0aGUgc2VhcmNoXG4gICAgICAgIC8vIGF0IHpTcmNbaVNyY10gYW5kIHpPdXRbYmFzZStpXS4gIERvIG5vdCBpbmNsdWRlIGFueXRoaW5nIHByaW9yIHRvXG4gICAgICAgIC8vIHpPdXRbYmFzZV0gb3IgYWZ0ZXIgek91dFtvdXRMZW5dIG5vciBhbnl0aGluZyBhZnRlciB6U3JjW3NyY0xlbl0uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjbnQgZXF1YWwgdG8gdGhlIGxlbmd0aCBvZiB0aGUgbWF0Y2ggYW5kIHNldCBvZnN0IHNvIHRoYXRcbiAgICAgICAgLy8gelNyY1tvZnN0XSBpcyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbWF0Y2guICBsaXRzeiBpcyB0aGUgbnVtYmVyXG4gICAgICAgIC8vIG9mIGNoYXJhY3RlcnMgYmV0d2VlbiB6T3V0W2Jhc2VdIGFuZCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBtYXRjaC5cbiAgICAgICAgLy8gc3ogd2lsbCBiZSB0aGUgb3ZlcmhlYWQgKGluIGJ5dGVzKSBuZWVkZWQgdG8gZW5jb2RlIHRoZSBjb3B5XG4gICAgICAgIC8vIGNvbW1hbmQuICBPbmx5IGdlbmVyYXRlIGNvcHkgY29tbWFuZCBpZiB0aGUgb3ZlcmhlYWQgb2YgdGhlXG4gICAgICAgIC8vIGNvcHkgY29tbWFuZCBpcyBsZXNzIHRoYW4gdGhlIGFtb3VudCBvZiBsaXRlcmFsIHRleHQgdG8gYmUgY29waWVkLlxuICAgICAgICAvL1xuICAgICAgICB2YXIgY250LCBvZnN0LCBsaXRzejtcbiAgICAgICAgdmFyIGosIGssIHgsIHk7XG4gICAgICAgIHZhciBzejtcblxuICAgICAgICAvLyBCZWdpbm5pbmcgYXQgaVNyYywgbWF0Y2ggZm9yd2FyZHMgYXMgZmFyIGFzIHdlIGNhbi5cbiAgICAgICAgLy8gaiBjb3VudHMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgbWF0Y2guXG4gICAgICAgIGlTcmMgPSBpQmxvY2sqTkhBU0g7XG4gICAgICAgIGZvciAoaiA9IDAsIHggPSBpU3JjLCB5ID0gYmFzZStpOyB4IDwgbGVuU3JjICYmIHkgPCBsZW5PdXQ7IGorKywgeCsrLCB5KyspIHtcbiAgICAgICAgICBpZiAoc3JjW3hdICE9PSBvdXRbeV0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGotLTtcblxuICAgICAgICAvLyBCZWdpbm5pbmcgYXQgaVNyYy0xLCBtYXRjaCBiYWNrd2FyZHMgYXMgZmFyIGFzIHdlIGNhbi5cbiAgICAgICAgLy8gayBjb3VudHMgdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgbWF0Y2guXG4gICAgICAgIGZvciAoayA9IDE7IGsgPCBpU3JjICYmIGsgPD0gaTsgaysrKSB7XG4gICAgICAgICAgaWYgKHNyY1tpU3JjLWtdICE9PSBvdXRbYmFzZStpLWtdKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBrLS07XG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgb2Zmc2V0IGFuZCBzaXplIG9mIHRoZSBtYXRjaGluZyByZWdpb24uXG4gICAgICAgIG9mc3QgPSBpU3JjLWs7XG4gICAgICAgIGNudCA9IGoraysxO1xuICAgICAgICBsaXRzeiA9IGktazsgIC8vIE51bWJlciBvZiBieXRlcyBvZiBsaXRlcmFsIHRleHQgYmVmb3JlIHRoZSBjb3B5XG4gICAgICAgIC8vIHN6IHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGJ5dGVzIG5lZWRlZCB0byBlbmNvZGUgdGhlIFwiaW5zZXJ0XCJcbiAgICAgICAgLy8gY29tbWFuZCBhbmQgdGhlIGNvcHkgY29tbWFuZCwgbm90IGNvdW50aW5nIHRoZSBcImluc2VydFwiIHRleHQuXG4gICAgICAgIHN6ID0gZGlnaXRDb3VudChpLWspK2RpZ2l0Q291bnQoY250KStkaWdpdENvdW50KG9mc3QpKzM7XG4gICAgICAgIGlmIChjbnQgPj0gc3ogJiYgY250ID4gYmVzdENudCkge1xuICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgbWF0Y2ggb25seSBpZiBpdCBpcyB0aGUgYmVzdCBzbyBmYXIgYW5kIGl0XG4gICAgICAgICAgLy8gZG9lcyBub3QgaW5jcmVhc2UgdGhlIGZpbGUgc2l6ZS5cbiAgICAgICAgICBiZXN0Q250ID0gY250O1xuICAgICAgICAgIGJlc3RPZnN0ID0gaVNyYy1rO1xuICAgICAgICAgIGJlc3RMaXRzeiA9IGxpdHN6O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhlIG5leHQgbWF0Y2hpbmcgYmxvY2tcbiAgICAgICAgaUJsb2NrID0gY29sbGlkZVtpQmxvY2tdO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBoYXZlIGEgY29weSBjb21tYW5kIHRoYXQgZG9lcyBub3QgY2F1c2UgdGhlIGRlbHRhIHRvIGJlIGxhcmdlclxuICAgICAgLy8gdGhhbiBhIGxpdGVyYWwgaW5zZXJ0LiAgU28gYWRkIHRoZSBjb3B5IGNvbW1hbmQgdG8gdGhlIGRlbHRhLlxuICAgICAgaWYgKGJlc3RDbnQgPiAwKSB7XG4gICAgICAgIGlmIChiZXN0TGl0c3ogPiAwKSB7XG4gICAgICAgICAgLy8gQWRkIGFuIGluc2VydCBjb21tYW5kIGJlZm9yZSB0aGUgY29weS5cbiAgICAgICAgICB6RGVsdGEucHV0SW50KGJlc3RMaXRzeik7XG4gICAgICAgICAgekRlbHRhLnB1dENoYXIoJzonKTtcbiAgICAgICAgICB6RGVsdGEucHV0QXJyYXkob3V0LCBiYXNlLCBiYXNlK2Jlc3RMaXRzeik7XG4gICAgICAgICAgYmFzZSArPSBiZXN0TGl0c3o7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZSArPSBiZXN0Q250O1xuICAgICAgICB6RGVsdGEucHV0SW50KGJlc3RDbnQpO1xuICAgICAgICB6RGVsdGEucHV0Q2hhcignQCcpO1xuICAgICAgICB6RGVsdGEucHV0SW50KGJlc3RPZnN0KTtcbiAgICAgICAgekRlbHRhLnB1dENoYXIoJywnKTtcbiAgICAgICAgaWYgKGJlc3RPZnN0ICsgYmVzdENudCAtMSA+IGxhc3RSZWFkKSB7XG4gICAgICAgICAgbGFzdFJlYWQgPSBiZXN0T2ZzdCArIGJlc3RDbnQgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGJlc3RDbnQgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgcmVhY2ggdGhpcyBwb2ludCwgaXQgbWVhbnMgbm8gbWF0Y2ggaXMgZm91bmQgc28gZmFyXG4gICAgICBpZiAoYmFzZStpK05IQVNIID49IGxlbk91dCl7XG4gICAgICAgIC8vIFdlIGhhdmUgcmVhY2hlZCB0aGUgZW5kIGFuZCBoYXZlIG5vdCBmb3VuZCBhbnlcbiAgICAgICAgLy8gbWF0Y2hlcy4gIERvIGFuIFwiaW5zZXJ0XCIgZm9yIGV2ZXJ5dGhpbmcgdGhhdCBkb2VzIG5vdCBtYXRjaFxuICAgICAgICB6RGVsdGEucHV0SW50KGxlbk91dC1iYXNlKTtcbiAgICAgICAgekRlbHRhLnB1dENoYXIoJzonKTtcbiAgICAgICAgekRlbHRhLnB1dEFycmF5KG91dCwgYmFzZSwgYmFzZStsZW5PdXQtYmFzZSk7XG4gICAgICAgIGJhc2UgPSBsZW5PdXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBBZHZhbmNlIHRoZSBoYXNoIGJ5IG9uZSBjaGFyYWN0ZXIuIEtlZXAgbG9va2luZyBmb3IgYSBtYXRjaC5cbiAgICAgIGgubmV4dChvdXRbYmFzZStpK05IQVNIXSk7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIC8vIE91dHB1dCBhIGZpbmFsIFwiaW5zZXJ0XCIgcmVjb3JkIHRvIGdldCBhbGwgdGhlIHRleHQgYXQgdGhlIGVuZCBvZlxuICAvLyB0aGUgZmlsZSB0aGF0IGRvZXMgbm90IG1hdGNoIGFueXRoaW5nIGluIHRoZSBzb3VyY2UuXG4gIGlmKGJhc2UgPCBsZW5PdXQpIHtcbiAgICB6RGVsdGEucHV0SW50KGxlbk91dC1iYXNlKTtcbiAgICB6RGVsdGEucHV0Q2hhcignOicpO1xuICAgIHpEZWx0YS5wdXRBcnJheShvdXQsIGJhc2UsIGJhc2UrbGVuT3V0LWJhc2UpO1xuICB9XG4gIC8vIE91dHB1dCB0aGUgZmluYWwgY2hlY2tzdW0gcmVjb3JkLlxuICB6RGVsdGEucHV0SW50KGNoZWNrc3VtKG91dCkpO1xuICB6RGVsdGEucHV0Q2hhcignOycpO1xuICByZXR1cm4gekRlbHRhLnRvQXJyYXkoKTtcbn07XG5cbi8vIFJldHVybiB0aGUgc2l6ZSAoaW4gYnl0ZXMpIG9mIHRoZSBvdXRwdXQgZnJvbSBhcHBseWluZyBhIGRlbHRhLlxuZm9zc2lsRGVsdGEub3V0cHV0U2l6ZSA9IGZ1bmN0aW9uKGRlbHRhKXtcbiAgdmFyIHpEZWx0YSA9IG5ldyBSZWFkZXIoZGVsdGEpO1xuICB2YXIgc2l6ZSA9IHpEZWx0YS5nZXRJbnQoKTtcbiAgaWYgKHpEZWx0YS5nZXRDaGFyKCkgIT09ICdcXG4nKVxuICAgIHRocm93IG5ldyBFcnJvcignc2l6ZSBpbnRlZ2VyIG5vdCB0ZXJtaW5hdGVkIGJ5IFxcJ1xcXFxuXFwnJyk7XG4gIHJldHVybiBzaXplO1xufTtcblxuLy8gQXBwbHkgYSBkZWx0YS5cbmZvc3NpbERlbHRhLmFwcGx5ID0gZnVuY3Rpb24oc3JjLCBkZWx0YSwgb3B0cykge1xuICB2YXIgbGltaXQsIHRvdGFsID0gMDtcbiAgdmFyIHpEZWx0YSA9IG5ldyBSZWFkZXIoZGVsdGEpO1xuICB2YXIgbGVuU3JjID0gc3JjLmxlbmd0aDtcbiAgdmFyIGxlbkRlbHRhID0gZGVsdGEubGVuZ3RoO1xuXG4gIGxpbWl0ID0gekRlbHRhLmdldEludCgpO1xuICBpZiAoekRlbHRhLmdldENoYXIoKSAhPT0gJ1xcbicpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaXplIGludGVnZXIgbm90IHRlcm1pbmF0ZWQgYnkgXFwnXFxcXG5cXCcnKTtcbiAgdmFyIHpPdXQgPSBuZXcgV3JpdGVyKCk7XG4gIHdoaWxlKHpEZWx0YS5oYXZlQnl0ZXMoKSkge1xuICAgIHZhciBjbnQsIG9mc3Q7XG4gICAgY250ID0gekRlbHRhLmdldEludCgpO1xuXG4gICAgc3dpdGNoICh6RGVsdGEuZ2V0Q2hhcigpKSB7XG4gICAgICBjYXNlICdAJzpcbiAgICAgICAgb2ZzdCA9IHpEZWx0YS5nZXRJbnQoKTtcbiAgICAgICAgaWYgKHpEZWx0YS5oYXZlQnl0ZXMoKSAmJiB6RGVsdGEuZ2V0Q2hhcigpICE9PSAnLCcpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3B5IGNvbW1hbmQgbm90IHRlcm1pbmF0ZWQgYnkgXFwnLFxcJycpO1xuICAgICAgICB0b3RhbCArPSBjbnQ7XG4gICAgICAgIGlmICh0b3RhbCA+IGxpbWl0KVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY29weSBleGNlZWRzIG91dHB1dCBmaWxlIHNpemUnKTtcbiAgICAgICAgaWYgKG9mc3QrY250ID4gbGVuU3JjKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY29weSBleHRlbmRzIHBhc3QgZW5kIG9mIGlucHV0Jyk7XG4gICAgICAgIHpPdXQucHV0QXJyYXkoc3JjLCBvZnN0LCBvZnN0K2NudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICc6JzpcbiAgICAgICAgdG90YWwgKz0gY250O1xuICAgICAgICBpZiAodG90YWwgPiBsaW1pdClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luc2VydCBjb21tYW5kIGdpdmVzIGFuIG91dHB1dCBsYXJnZXIgdGhhbiBwcmVkaWN0ZWQnKTtcbiAgICAgICAgaWYgKGNudCA+IGxlbkRlbHRhKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW5zZXJ0IGNvdW50IGV4Y2VlZHMgc2l6ZSBvZiBkZWx0YScpO1xuICAgICAgICB6T3V0LnB1dEFycmF5KHpEZWx0YS5hLCB6RGVsdGEucG9zLCB6RGVsdGEucG9zK2NudCk7XG4gICAgICAgIHpEZWx0YS5wb3MgKz0gY250O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnOyc6XG4gICAgICAgIHZhciBvdXQgPSB6T3V0LnRvQXJyYXkoKTtcbiAgICAgICAgaWYgKCghb3B0cyB8fCBvcHRzLnZlcmlmeUNoZWNrc3VtICE9PSBmYWxzZSkgJiYgY250ICE9PSBjaGVja3N1bShvdXQpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIGNoZWNrc3VtJyk7XG4gICAgICAgIGlmICh0b3RhbCAhPT0gbGltaXQpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZW5lcmF0ZWQgc2l6ZSBkb2VzIG5vdCBtYXRjaCBwcmVkaWN0ZWQgc2l6ZScpO1xuICAgICAgICByZXR1cm4gb3V0O1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gZGVsdGEgb3BlcmF0b3InKTtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgZGVsdGEnKTtcbn07XG5cbnJldHVybiBmb3NzaWxEZWx0YTtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mb3NzaWwtZGVsdGEvZm9zc2lsLWRlbHRhLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdlYnNvY2tldF8xID0gcmVxdWlyZShcIkBnYW1lc3RkaW8vd2Vic29ja2V0XCIpO1xudmFyIG1zZ3BhY2sgPSByZXF1aXJlKFwibm90ZXBhY2suaW9cIik7XG52YXIgQ29ubmVjdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29ubmVjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb25uZWN0aW9uKHVybCwgcXVlcnkpIHtcbiAgICAgICAgaWYgKHF1ZXJ5ID09PSB2b2lkIDApIHsgcXVlcnkgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB1cmwpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9lbnF1ZXVlZENhbGxzID0gW107XG4gICAgICAgIF90aGlzLmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUub25PcGVuQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vbk9wZW5DYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fZW5xdWV1ZWRDYWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2VucXVldWVkQ2FsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLl9lbnF1ZXVlZENhbGxzW2ldLCBtZXRob2QgPSBfYVswXSwgYXJncyA9IF9hWzFdO1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnNlbmQuY2FsbCh0aGlzLCBtc2dwYWNrLmVuY29kZShkYXRhKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJjb2x5c2V1cy5qczogdHJ5aW5nIHRvIHNlbmQgZGF0YSB3aGlsZSBpbiBcIiArIHRoaXMud3MucmVhZHlTdGF0ZSArIFwiIHN0YXRlXCIpO1xuICAgICAgICAgICAgLy8gV2ViU29ja2V0IG5vdCBjb25uZWN0ZWQuXG4gICAgICAgICAgICAvLyBFbnF1ZXVlIGRhdGEgdG8gYmUgc2VudCB3aGVuIHJlYWR5U3RhdGUgPT0gT1BFTlxuICAgICAgICAgICAgdGhpcy5fZW5xdWV1ZWRDYWxscy5wdXNoKFsnc2VuZCcsIFtkYXRhXV0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29ubmVjdGlvbjtcbn0od2Vic29ja2V0XzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5Db25uZWN0aW9uID0gQ29ubmVjdGlvbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0Nvbm5lY3Rpb24udHNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO3ZhciBfY3JlYXRlQ2xhc3M9ZnVuY3Rpb24oKXtmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCxwcm9wcyl7Zm9yKHZhciBpPTA7aTxwcm9wcy5sZW5ndGg7aSsrKXt2YXIgZGVzY3JpcHRvcj1wcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGU9ZGVzY3JpcHRvci5lbnVtZXJhYmxlfHxmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZT10cnVlO2lmKFwidmFsdWVcImluIGRlc2NyaXB0b3IpZGVzY3JpcHRvci53cml0YWJsZT10cnVlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsZGVzY3JpcHRvci5rZXksZGVzY3JpcHRvcik7fX1yZXR1cm4gZnVuY3Rpb24oQ29uc3RydWN0b3IscHJvdG9Qcm9wcyxzdGF0aWNQcm9wcyl7aWYocHJvdG9Qcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSxwcm90b1Byb3BzKTtpZihzdGF0aWNQcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7fTt9KCk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLENvbnN0cnVjdG9yKXtpZighKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO319dmFyIGNyZWF0ZUJhY2tvZmY9cmVxdWlyZSgnLi9iYWNrb2ZmJykuY3JlYXRlQmFja29mZjt2YXIgV2ViU29ja2V0Q2xpZW50PWZ1bmN0aW9uKCl7LyoqXG4gICAqIEBwYXJhbSB1cmwgRE9NU3RyaW5nIFRoZSBVUkwgdG8gd2hpY2ggdG8gY29ubmVjdDsgdGhpcyBzaG91bGQgYmUgdGhlIFVSTCB0byB3aGljaCB0aGUgV2ViU29ja2V0IHNlcnZlciB3aWxsIHJlc3BvbmQuXG4gICAqIEBwYXJhbSBwcm90b2NvbHMgRE9NU3RyaW5nfERPTVN0cmluZ1tdIEVpdGhlciBhIHNpbmdsZSBwcm90b2NvbCBzdHJpbmcgb3IgYW4gYXJyYXkgb2YgcHJvdG9jb2wgc3RyaW5ncy4gVGhlc2Ugc3RyaW5ncyBhcmUgdXNlZCB0byBpbmRpY2F0ZSBzdWItcHJvdG9jb2xzLCBzbyB0aGF0IGEgc2luZ2xlIHNlcnZlciBjYW4gaW1wbGVtZW50IG11bHRpcGxlIFdlYlNvY2tldCBzdWItcHJvdG9jb2xzIChmb3IgZXhhbXBsZSwgeW91IG1pZ2h0IHdhbnQgb25lIHNlcnZlciB0byBiZSBhYmxlIHRvIGhhbmRsZSBkaWZmZXJlbnQgdHlwZXMgb2YgaW50ZXJhY3Rpb25zIGRlcGVuZGluZyBvbiB0aGUgc3BlY2lmaWVkIHByb3RvY29sKS4gSWYgeW91IGRvbid0IHNwZWNpZnkgYSBwcm90b2NvbCBzdHJpbmcsIGFuIGVtcHR5IHN0cmluZyBpcyBhc3N1bWVkLlxuICAgKi9mdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsLHByb3RvY29scyl7dmFyIG9wdGlvbnM9YXJndW1lbnRzLmxlbmd0aD4yJiZhcmd1bWVudHNbMl0hPT11bmRlZmluZWQ/YXJndW1lbnRzWzJdOnt9O19jbGFzc0NhbGxDaGVjayh0aGlzLFdlYlNvY2tldENsaWVudCk7dGhpcy51cmw9dXJsO3RoaXMucHJvdG9jb2xzPXByb3RvY29sczt0aGlzLnJlY29ubmVjdEVuYWJsZWQ9dHJ1ZTt0aGlzLmxpc3RlbmVycz17fTt0aGlzLmJhY2tvZmY9Y3JlYXRlQmFja29mZihvcHRpb25zLmJhY2tvZmZ8fCdleHBvbmVudGlhbCcsb3B0aW9ucyk7dGhpcy5iYWNrb2ZmLm9uUmVhZHk9dGhpcy5vbkJhY2tvZmZSZWFkeS5iaW5kKHRoaXMpO3RoaXMub3BlbigpO31fY3JlYXRlQ2xhc3MoV2ViU29ja2V0Q2xpZW50LFt7a2V5OidvcGVuJyx2YWx1ZTpmdW5jdGlvbiBvcGVuKCl7dmFyIHJlY29ubmVjdD1hcmd1bWVudHMubGVuZ3RoPjAmJmFyZ3VtZW50c1swXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMF06ZmFsc2U7dGhpcy5pc1JlY29ubmVjdD1yZWNvbm5lY3Q7Ly8ga2VlcCBiaW5hcnlUeXBlIHVzZWQgb24gcHJldmlvdXMgV2ViU29ja2V0IGNvbm5lY3Rpb25cbnZhciBiaW5hcnlUeXBlPXRoaXMud3MmJnRoaXMud3MuYmluYXJ5VHlwZTt0aGlzLndzPW5ldyBXZWJTb2NrZXQodGhpcy51cmwsdGhpcy5wcm90b2NvbHMpO3RoaXMud3Mub25jbG9zZT10aGlzLm9uQ2xvc2VDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25lcnJvcj10aGlzLm9uRXJyb3JDYWxsYmFjay5iaW5kKHRoaXMpO3RoaXMud3Mub25tZXNzYWdlPXRoaXMub25NZXNzYWdlQ2FsbGJhY2suYmluZCh0aGlzKTt0aGlzLndzLm9ub3Blbj10aGlzLm9uT3BlbkNhbGxiYWNrLmJpbmQodGhpcyk7aWYoYmluYXJ5VHlwZSl7dGhpcy53cy5iaW5hcnlUeXBlPWJpbmFyeVR5cGU7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uQmFja29mZlJlYWR5Jyx2YWx1ZTpmdW5jdGlvbiBvbkJhY2tvZmZSZWFkeShudW1iZXIsZGVsYXkpey8vIGNvbnNvbGUubG9nKFwib25CYWNrb2ZmUmVhZHlcIiwgbnVtYmVyICsgJyAnICsgZGVsYXkgKyAnbXMnKTtcbnRoaXMub3Blbih0cnVlKTt9LyoqXG4gICAqIEBpZ25vcmVcbiAgICovfSx7a2V5OidvbkNsb3NlQ2FsbGJhY2snLHZhbHVlOmZ1bmN0aW9uIG9uQ2xvc2VDYWxsYmFjayhlKXtpZighdGhpcy5pc1JlY29ubmVjdCYmdGhpcy5saXN0ZW5lcnNbJ29uY2xvc2UnXSl7dGhpcy5saXN0ZW5lcnNbJ29uY2xvc2UnXS5hcHBseShudWxsLGFyZ3VtZW50cyk7fWlmKHRoaXMucmVjb25uZWN0RW5hYmxlZCYmZS5jb2RlPDMwMDApe3RoaXMuYmFja29mZi5iYWNrb2ZmKCk7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uRXJyb3JDYWxsYmFjaycsdmFsdWU6ZnVuY3Rpb24gb25FcnJvckNhbGxiYWNrKCl7aWYodGhpcy5saXN0ZW5lcnNbJ29uZXJyb3InXSl7dGhpcy5saXN0ZW5lcnNbJ29uZXJyb3InXS5hcHBseShudWxsLGFyZ3VtZW50cyk7fX0vKipcbiAgICogQGlnbm9yZVxuICAgKi99LHtrZXk6J29uTWVzc2FnZUNhbGxiYWNrJyx2YWx1ZTpmdW5jdGlvbiBvbk1lc3NhZ2VDYWxsYmFjaygpe2lmKHRoaXMubGlzdGVuZXJzWydvbm1lc3NhZ2UnXSl7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddLmFwcGx5KG51bGwsYXJndW1lbnRzKTt9fS8qKlxuICAgKiBAaWdub3JlXG4gICAqL30se2tleTonb25PcGVuQ2FsbGJhY2snLHZhbHVlOmZ1bmN0aW9uIG9uT3BlbkNhbGxiYWNrKCl7aWYodGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddKXt0aGlzLmxpc3RlbmVyc1snb25vcGVuJ10uYXBwbHkobnVsbCxhcmd1bWVudHMpO31pZih0aGlzLmlzUmVjb25uZWN0JiZ0aGlzLmxpc3RlbmVyc1snb25yZWNvbm5lY3QnXSl7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J10uYXBwbHkobnVsbCxhcmd1bWVudHMpO310aGlzLmlzUmVjb25uZWN0PWZhbHNlO30vKipcbiAgICogVGhlIG51bWJlciBvZiBieXRlcyBvZiBkYXRhIHRoYXQgaGF2ZSBiZWVuIHF1ZXVlZCB1c2luZyBjYWxscyB0byBzZW5kKClcbiAgICogYnV0IG5vdCB5ZXQgdHJhbnNtaXR0ZWQgdG8gdGhlIG5ldHdvcmsuIFRoaXMgdmFsdWUgZG9lcyBub3QgcmVzZXQgdG8gemVyb1xuICAgKiB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZDsgaWYgeW91IGtlZXAgY2FsbGluZyBzZW5kKCksIHRoaXMgd2lsbFxuICAgKiBjb250aW51ZSB0byBjbGltYi5cbiAgICpcbiAgICogQHR5cGUgdW5zaWduZWQgbG9uZ1xuICAgKiBAcmVhZG9ubHlcbiAgICovfSx7a2V5OidjbG9zZScsLyoqXG4gICAqIENsb3NlcyB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gb3IgY29ubmVjdGlvbiBhdHRlbXB0LCBpZiBhbnkuIElmIHRoZVxuICAgKiBjb25uZWN0aW9uIGlzIGFscmVhZHkgQ0xPU0VELCB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBjb2RlIEEgbnVtZXJpYyB2YWx1ZSBpbmRpY2F0aW5nIHRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBiZWluZyBjbG9zZWQuIElmIHRoaXMgcGFyYW1ldGVyIGlzIG5vdCBzcGVjaWZpZWQsIGEgZGVmYXVsdCB2YWx1ZSBvZiAxMDAwIChpbmRpY2F0aW5nIGEgbm9ybWFsIFwidHJhbnNhY3Rpb24gY29tcGxldGVcIiBjbG9zdXJlKSBpcyBhc3N1bWVkLiBTZWUgdGhlIGxpc3Qgb2Ygc3RhdHVzIGNvZGVzIG9uIHRoZSBDbG9zZUV2ZW50IHBhZ2UgZm9yIHBlcm1pdHRlZCB2YWx1ZXMuXG4gICAqIEBwYXJhbSByZWFzb24gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZy4gVGhpcyBzdHJpbmcgbXVzdCBiZSBubyBsb25nZXIgdGhhbiAxMjMgYnl0ZXMgb2YgVVRGLTggdGV4dCAobm90IGNoYXJhY3RlcnMpLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovdmFsdWU6ZnVuY3Rpb24gY2xvc2UoY29kZSxyZWFzb24pe2lmKHR5cGVvZiBjb2RlPT0ndW5kZWZpbmVkJyl7Y29kZT0xMDAwO310aGlzLnJlY29ubmVjdEVuYWJsZWQ9ZmFsc2U7dGhpcy53cy5jbG9zZShjb2RlLHJlYXNvbik7fS8qKlxuICAgKiBUcmFuc21pdHMgZGF0YSB0byB0aGUgc2VydmVyIG92ZXIgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uLlxuICAgKiBAcGFyYW0gZGF0YSBET01TdHJpbmd8QXJyYXlCdWZmZXJ8QmxvYlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovfSx7a2V5OidzZW5kJyx2YWx1ZTpmdW5jdGlvbiBzZW5kKGRhdGEpe3RoaXMud3Muc2VuZChkYXRhKTt9LyoqXG4gICAqIEFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbidzIHJlYWR5U3RhdGUgY2hhbmdlcyB0byBDTE9TRUQuIFRoZSBsaXN0ZW5lciByZWNlaXZlcyBhIENsb3NlRXZlbnQgbmFtZWQgXCJjbG9zZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J2J1ZmZlcmVkQW1vdW50JyxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMud3MuYnVmZmVyZWRBbW91bnQ7fS8qKlxuICAgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbjsgdGhpcyBpcyBvbmUgb2YgdGhlIFJlYWR5IHN0YXRlIGNvbnN0YW50cy5cbiAgICogQHR5cGUgdW5zaWduZWQgc2hvcnRcbiAgICogQHJlYWRvbmx5XG4gICAqL30se2tleToncmVhZHlTdGF0ZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnJlYWR5U3RhdGU7fS8qKlxuICAgKiBBIHN0cmluZyBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIGJpbmFyeSBkYXRhIGJlaW5nIHRyYW5zbWl0dGVkIGJ5IHRoZVxuICAgKiBjb25uZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBlaXRoZXIgXCJibG9iXCIgaWYgRE9NIEJsb2Igb2JqZWN0cyBhcmUgYmVpbmdcbiAgICogdXNlZCBvciBcImFycmF5YnVmZmVyXCIgaWYgQXJyYXlCdWZmZXIgb2JqZWN0cyBhcmUgYmVpbmcgdXNlZC5cbiAgICogQHR5cGUgRE9NU3RyaW5nXG4gICAqL30se2tleTonYmluYXJ5VHlwZScsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLmJpbmFyeVR5cGU7fSxzZXQ6ZnVuY3Rpb24gc2V0KGJpbmFyeVR5cGUpe3RoaXMud3MuYmluYXJ5VHlwZT1iaW5hcnlUeXBlO30vKipcbiAgICogVGhlIGV4dGVuc2lvbnMgc2VsZWN0ZWQgYnkgdGhlIHNlcnZlci4gVGhpcyBpcyBjdXJyZW50bHkgb25seSB0aGUgZW1wdHlcbiAgICogc3RyaW5nIG9yIGEgbGlzdCBvZiBleHRlbnNpb25zIGFzIG5lZ290aWF0ZWQgYnkgdGhlIGNvbm5lY3Rpb24uXG4gICAqIEB0eXBlIERPTVN0cmluZ1xuICAgKi99LHtrZXk6J2V4dGVuc2lvbnMnLGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy53cy5leHRlbnNpb25zO30sc2V0OmZ1bmN0aW9uIHNldChleHRlbnNpb25zKXt0aGlzLndzLmV4dGVuc2lvbnM9ZXh0ZW5zaW9uczt9LyoqXG4gICAqIEEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIHN1Yi1wcm90b2NvbCB0aGUgc2VydmVyIHNlbGVjdGVkO1xuICAgKiB0aGlzIHdpbGwgYmUgb25lIG9mIHRoZSBzdHJpbmdzIHNwZWNpZmllZCBpbiB0aGUgcHJvdG9jb2xzIHBhcmFtZXRlciB3aGVuXG4gICAqIGNyZWF0aW5nIHRoZSBXZWJTb2NrZXQgb2JqZWN0LlxuICAgKiBAdHlwZSBET01TdHJpbmdcbiAgICovfSx7a2V5Oidwcm90b2NvbCcsZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLndzLnByb3RvY29sO30sc2V0OmZ1bmN0aW9uIHNldChwcm90b2NvbCl7dGhpcy53cy5wcm90b2NvbD1wcm90b2NvbDt9fSx7a2V5OidvbmNsb3NlJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25jbG9zZSddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLiBUaGlzIGlzIGEgc2ltcGxlIGV2ZW50IG5hbWVkIFwiZXJyb3JcIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbmVycm9yJyxzZXQ6ZnVuY3Rpb24gc2V0KGxpc3RlbmVyKXt0aGlzLmxpc3RlbmVyc1snb25lcnJvciddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25lcnJvciddO30vKipcbiAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci4gVGhlIGxpc3RlbmVyIHJlY2VpdmVzIGEgTWVzc2FnZUV2ZW50IG5hbWVkIFwibWVzc2FnZVwiLlxuICAgKiBAcGFyYW0gbGlzdGVuZXIgRXZlbnRMaXN0ZW5lclxuICAgKi99LHtrZXk6J29ubWVzc2FnZScsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ubWVzc2FnZSddPWxpc3RlbmVyO30sZ2V0OmZ1bmN0aW9uIGdldCgpe3JldHVybiB0aGlzLmxpc3RlbmVyc1snb25tZXNzYWdlJ107fS8qKlxuICAgKiBBbiBldmVudCBsaXN0ZW5lciB0byBiZSBjYWxsZWQgd2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24ncyByZWFkeVN0YXRlIGNoYW5nZXMgdG8gT1BFTjsgdGhpcyBpbmRpY2F0ZXMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyByZWFkeSB0byBzZW5kIGFuZCByZWNlaXZlIGRhdGEuIFRoZSBldmVudCBpcyBhIHNpbXBsZSBvbmUgd2l0aCB0aGUgbmFtZSBcIm9wZW5cIi5cbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5Oidvbm9wZW4nLHNldDpmdW5jdGlvbiBzZXQobGlzdGVuZXIpe3RoaXMubGlzdGVuZXJzWydvbm9wZW4nXT1saXN0ZW5lcjt9LGdldDpmdW5jdGlvbiBnZXQoKXtyZXR1cm4gdGhpcy5saXN0ZW5lcnNbJ29ub3BlbiddO30vKipcbiAgICogQHBhcmFtIGxpc3RlbmVyIEV2ZW50TGlzdGVuZXJcbiAgICovfSx7a2V5OidvbnJlY29ubmVjdCcsc2V0OmZ1bmN0aW9uIHNldChsaXN0ZW5lcil7dGhpcy5saXN0ZW5lcnNbJ29ucmVjb25uZWN0J109bGlzdGVuZXI7fSxnZXQ6ZnVuY3Rpb24gZ2V0KCl7cmV0dXJuIHRoaXMubGlzdGVuZXJzWydvbnJlY29ubmVjdCddO319XSk7cmV0dXJuIFdlYlNvY2tldENsaWVudDt9KCk7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBub3QgeWV0IG9wZW4uXG4gKi9XZWJTb2NrZXRDbGllbnQuQ09OTkVDVElORz1XZWJTb2NrZXQuQ09OTkVDVElORzsvKipcbiAqIFRoZSBjb25uZWN0aW9uIGlzIG9wZW4gYW5kIHJlYWR5IHRvIGNvbW11bmljYXRlLlxuICovV2ViU29ja2V0Q2xpZW50Lk9QRU49V2ViU29ja2V0Lk9QRU47LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBpbiB0aGUgcHJvY2VzcyBvZiBjbG9zaW5nLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NJTkc9V2ViU29ja2V0LkNMT1NJTkc7LyoqXG4gKiBUaGUgY29ubmVjdGlvbiBpcyBjbG9zZWQgb3IgY291bGRuJ3QgYmUgb3BlbmVkLlxuICovV2ViU29ja2V0Q2xpZW50LkNMT1NFRD1XZWJTb2NrZXQuQ0xPU0VEO2V4cG9ydHMuZGVmYXVsdD1XZWJTb2NrZXRDbGllbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGdhbWVzdGRpby93ZWJzb2NrZXQvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY3JlYXRlQmFja29mZj1jcmVhdGVCYWNrb2ZmO3ZhciBiYWNrb2ZmPXtleHBvbmVudGlhbDpmdW5jdGlvbiBleHBvbmVudGlhbChhdHRlbXB0LGRlbGF5KXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKk1hdGgucG93KDIsYXR0ZW1wdCkqZGVsYXkpO30sZmlib25hY2NpOmZ1bmN0aW9uIGZpYm9uYWNjaShhdHRlbXB0LGRlbGF5KXt2YXIgY3VycmVudD0xO2lmKGF0dGVtcHQ+Y3VycmVudCl7dmFyIHByZXY9MSxjdXJyZW50PTI7Zm9yKHZhciBpbmRleD0yO2luZGV4PGF0dGVtcHQ7aW5kZXgrKyl7dmFyIG5leHQ9cHJlditjdXJyZW50O3ByZXY9Y3VycmVudDtjdXJyZW50PW5leHQ7fX1yZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmN1cnJlbnQqZGVsYXkpO319O2Z1bmN0aW9uIGNyZWF0ZUJhY2tvZmYodHlwZSxvcHRpb25zKXtyZXR1cm4gbmV3IEJhY2tvZmYoYmFja29mZlt0eXBlXSxvcHRpb25zKTt9ZnVuY3Rpb24gQmFja29mZihmdW5jLG9wdGlvbnMpe3RoaXMuZnVuYz1mdW5jO3RoaXMuYXR0ZW1wdHM9MDt0aGlzLmRlbGF5PXR5cGVvZiBvcHRpb25zLmluaXRpYWxEZWxheSE9PVwidW5kZWZpbmVkXCI/b3B0aW9ucy5pbml0aWFsRGVsYXk6MTAwO31CYWNrb2ZmLnByb3RvdHlwZS5iYWNrb2ZmPWZ1bmN0aW9uKCl7c2V0VGltZW91dCh0aGlzLm9uUmVhZHksdGhpcy5mdW5jKCsrdGhpcy5hdHRlbXB0cyx0aGlzLmRlbGF5KSk7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZ2FtZXN0ZGlvL3dlYnNvY2tldC9saWIvYmFja29mZi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==