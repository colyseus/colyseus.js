import { ITransport, ITransportEventMap, ITransportConstructor } from "./transport/ITransport";
import { WebSocketTransport } from "./transport/WebSocketTransport";

export class Connection implements ITransport {
    transport: ITransport;
    events: ITransportEventMap = {};

    constructor(transport?:ITransportConstructor) {
        this.transport = new transport(this.events) || new WebSocketTransport(this.events);
    }

    send(data: ArrayBuffer | Array<number>): void {
        this.transport.send(data);
    }

    connect(url: string): void {
        this.transport.connect(url);
    }

    close(code?: number, reason?: string): void {
        this.transport.close(code, reason);
    }

}
