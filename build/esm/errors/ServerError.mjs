// colyseus.js@0.16.0-preview.24
var CloseCode;
(function (CloseCode) {
    CloseCode[CloseCode["CONSENTED"] = 4000] = "CONSENTED";
    CloseCode[CloseCode["DEVMODE_RESTART"] = 4010] = "DEVMODE_RESTART";
})(CloseCode || (CloseCode = {}));
class ServerError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.name = "ServerError";
        this.code = code;
    }
}

export { CloseCode, ServerError };
//# sourceMappingURL=ServerError.mjs.map
