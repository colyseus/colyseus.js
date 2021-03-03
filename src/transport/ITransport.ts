export interface ITransportEventMap {
    onopen?: ((ev: Event) => any) | null;
    onmessage?: ((ev: Event) => any) | null;
    onclose?: ((ev: Event) => any) | null;
    onerror?: ((ev: Event) => any) | null;
}

export interface ITransportConstructor {
    new (events: ITransportEventMap): ITransport;
}

export interface ITransport {
    send(data: ArrayBuffer | Array<number>): void;
    connect(url: string): void;
    close(code?: number, reason?: string): void;
}