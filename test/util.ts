import * as localStorage from "node-localstorage";

(<any>global).WebSocket = {};
(<any>global).window = { localStorage: localStorage };
