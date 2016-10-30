declare module "websocket.js" {
    class WebSocketClient {
        constructor (url: string, protocols: string[], options: any);
        ws: WebSocket;
        binaryType: string;
        send(data: any): void;
        listeners: {[id: string]: Function};
    }

    export default WebSocketClient;
}
