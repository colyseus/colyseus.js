export interface Serializer<State> {
    setState(data: any): void;
    getState(): State;

    patch(data: any): void;
    teardown(): void;

    handshake?(bytes: number[], it?: any): void;
}

const serializers: { [id: string]: any } = {};

export function registerSerializer (id: string, serializer: any) {
    serializers[id] = serializer;
}

export function getSerializer (id: string) {
    const serializer = serializers[id];
    if (!serializer) { throw new Error("missing serializer: " + id); }
    return serializer;
}