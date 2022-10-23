// colyseus.js@0.14.14
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

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
