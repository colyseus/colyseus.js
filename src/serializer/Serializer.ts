export interface Serializer<State> {
    setState(data: any): void;
    getState(): State;

    patch(data: any): void;
    removeAllListeners?(): void;

    handshake?(bytes: number[]): void;
}

const serializers: { [id: string]: any } = {};

export function registerSerializer (id: string, serializer: any) {
    serializers[id] = serializer;
}

export function getSerializer (id: string) {
    return serializers[id];
}