declare module "websocket.js" {
    interface WebSocketConnectionOptions {
        strategy?: "fibonacci" | "exponential",
        randomisationFactor?: number,
        initialDelay?: number,
        maxDelay?: number,
        factor?: number
    }

    class WebSocketClient {
        constructor (url: string, protocols?: string[], options?: WebSocketConnectionOptions);
        ws: WebSocket;
        binaryType: string;
        send(data: any): void;
        listeners: {[id: string]: Function};
    }

    export default WebSocketClient;
}
