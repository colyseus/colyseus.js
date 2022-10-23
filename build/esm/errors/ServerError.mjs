// colyseus.js@0.14.14
class ServerError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.name = "ServerError";
        this.code = code;
    }
}

export { ServerError };
//# sourceMappingURL=ServerError.mjs.map
