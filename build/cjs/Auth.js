// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var Storage = require('./Storage.js');
var nanoevents = require('./core/nanoevents.js');

var _Auth__initialized, _Auth__initializationPromise, _Auth__signInWindow, _Auth__events;
var Auth = /** @class */ (function () {
    function Auth(http) {
        var _this = this;
        this.http = http;
        this.settings = {
            path: "/auth",
            key: "colyseus-auth-token",
        };
        _Auth__initialized.set(this, false);
        _Auth__initializationPromise.set(this, void 0);
        _Auth__signInWindow.set(this, undefined);
        _Auth__events.set(this, nanoevents.createNanoEvents());
        Storage.getItem(this.settings.key, function (token) { return _this.token = token; });
    }
    Object.defineProperty(Auth.prototype, "token", {
        get: function () {
            return this.http.authToken;
        },
        set: function (token) {
            this.http.authToken = token;
        },
        enumerable: false,
        configurable: true
    });
    Auth.prototype.onChange = function (callback) {
        var _this = this;
        var unbindChange = tslib.__classPrivateFieldGet(this, _Auth__events, "f").on("change", callback);
        if (!tslib.__classPrivateFieldGet(this, _Auth__initialized, "f")) {
            tslib.__classPrivateFieldSet(this, _Auth__initializationPromise, new Promise(function (resolve, reject) {
                _this.getUserData().then(function (userData) {
                    _this.emitChange(tslib.__assign(tslib.__assign({}, userData), { token: _this.token }));
                }).catch(function (e) {
                    // user is not logged in, or service is down
                    _this.emitChange({ user: null, token: undefined });
                }).finally(function () {
                    resolve();
                });
            }), "f");
        }
        tslib.__classPrivateFieldSet(this, _Auth__initialized, true, "f");
        return unbindChange;
    };
    Auth.prototype.getUserData = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.http.get("".concat(this.settings.path, "/userdata"))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                    case 2: throw new Error("missing auth.token");
                }
            });
        });
    };
    Auth.prototype.registerWithEmailAndPassword = function (email, password, options) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post("".concat(this.settings.path, "/register"), {
                            body: { email: email, password: password, options: options, },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        this.emitChange(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Auth.prototype.signInWithEmailAndPassword = function (email, password) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post("".concat(this.settings.path, "/login"), {
                            body: { email: email, password: password, },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        this.emitChange(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Auth.prototype.signInAnonymously = function (options) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post("".concat(this.settings.path, "/anonymous"), {
                            body: { options: options, }
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        this.emitChange(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Auth.prototype.sendPasswordResetEmail = function (email) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post("".concat(this.settings.path, "/forgot-password"), {
                            body: { email: email, }
                        })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Auth.prototype.signInWithProvider = function (providerName_1) {
        return tslib.__awaiter(this, arguments, void 0, function (providerName, settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            return tslib.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var w = settings.width || 480;
                        var h = settings.height || 768;
                        // forward existing token for upgrading
                        var upgradingToken = _this.token ? "?token=".concat(_this.token) : "";
                        // Capitalize first letter of providerName
                        var title = "Login with ".concat((providerName[0].toUpperCase() + providerName.substring(1)));
                        var url = _this.http['client']['getHttpEndpoint']("".concat((settings.prefix || "".concat(_this.settings.path, "/provider")), "/").concat(providerName).concat(upgradingToken));
                        var left = (screen.width / 2) - (w / 2);
                        var top = (screen.height / 2) - (h / 2);
                        tslib.__classPrivateFieldSet(_this, _Auth__signInWindow, window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left), "f");
                        var onMessage = function (event) {
                            // TODO: it is a good idea to check if event.origin can be trusted!
                            // if (event.origin.indexOf(window.location.hostname) === -1) { return; }
                            // require 'user' and 'token' inside received data.
                            if (event.data.user === undefined && event.data.token === undefined) {
                                return;
                            }
                            clearInterval(rejectionChecker);
                            tslib.__classPrivateFieldGet(_this, _Auth__signInWindow, "f").close();
                            tslib.__classPrivateFieldSet(_this, _Auth__signInWindow, undefined, "f");
                            window.removeEventListener("message", onMessage);
                            if (event.data.error !== undefined) {
                                reject(event.data.error);
                            }
                            else {
                                resolve(event.data);
                                _this.emitChange(event.data);
                            }
                        };
                        var rejectionChecker = setInterval(function () {
                            if (!tslib.__classPrivateFieldGet(_this, _Auth__signInWindow, "f") || tslib.__classPrivateFieldGet(_this, _Auth__signInWindow, "f").closed) {
                                tslib.__classPrivateFieldSet(_this, _Auth__signInWindow, undefined, "f");
                                reject("cancelled");
                                window.removeEventListener("message", onMessage);
                            }
                        }, 200);
                        window.addEventListener("message", onMessage);
                    })];
            });
        });
    };
    Auth.prototype.signOut = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                this.emitChange({ user: null, token: null });
                return [2 /*return*/];
            });
        });
    };
    Auth.prototype.emitChange = function (authData) {
        if (authData.token !== undefined) {
            this.token = authData.token;
            if (authData.token === null) {
                Storage.removeItem(this.settings.key);
            }
            else {
                // store key in localStorage
                Storage.setItem(this.settings.key, authData.token);
            }
        }
        tslib.__classPrivateFieldGet(this, _Auth__events, "f").emit("change", authData);
    };
    return Auth;
}());
_Auth__initialized = new WeakMap(), _Auth__initializationPromise = new WeakMap(), _Auth__signInWindow = new WeakMap(), _Auth__events = new WeakMap();

exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map
