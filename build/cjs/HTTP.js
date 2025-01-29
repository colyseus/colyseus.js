// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ServerError = require('./errors/ServerError.js');
var httpie = require('httpie');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var httpie__namespace = /*#__PURE__*/_interopNamespace(httpie);

var HTTP = /** @class */ (function () {
    function HTTP(client) {
        this.client = client;
    }
    HTTP.prototype.get = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("get", path, options);
    };
    HTTP.prototype.post = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("post", path, options);
    };
    HTTP.prototype.del = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("del", path, options);
    };
    HTTP.prototype.put = function (path, options) {
        if (options === void 0) { options = {}; }
        return this.request("put", path, options);
    };
    HTTP.prototype.request = function (method, path, options) {
        if (options === void 0) { options = {}; }
        return httpie__namespace[method](this.client['getHttpEndpoint'](path), this.getOptions(options)).catch(function (e) {
            var _a;
            var status = e.statusCode; //  || -1
            var message = ((_a = e.data) === null || _a === void 0 ? void 0 : _a.error) || e.statusMessage || e.message; //  || "offline"
            if (!status && !message) {
                throw e;
            }
            throw new ServerError.ServerError(status, message);
        });
    };
    HTTP.prototype.getOptions = function (options) {
        if (this.authToken) {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers['Authorization'] = "Bearer ".concat(this.authToken);
        }
        if (typeof (cc) !== 'undefined' && cc.sys && cc.sys.isNative) ;
        else {
            // always include credentials
            options.withCredentials = true;
        }
        return options;
    };
    return HTTP;
}());

exports.HTTP = HTTP;
//# sourceMappingURL=HTTP.js.map
