// colyseus.js@0.16.0-preview.24
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

exports.CloseCode = void 0;
(function (CloseCode) {
    CloseCode[CloseCode["CONSENTED"] = 4000] = "CONSENTED";
    CloseCode[CloseCode["DEVMODE_RESTART"] = 4010] = "DEVMODE_RESTART";
})(exports.CloseCode || (exports.CloseCode = {}));
var ServerError = /** @class */ (function (_super) {
    tslib.__extends(ServerError, _super);
    function ServerError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ServerError";
        _this.code = code;
        return _this;
    }
    return ServerError;
}(Error));

exports.ServerError = ServerError;
//# sourceMappingURL=ServerError.js.map
