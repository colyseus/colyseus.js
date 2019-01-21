export interface Serializer<State, API=any> {
    api: API;

    setState(data: any): void;
    getState(): State;

    patch(data: any): void;
    removeAllListeners?(): void;
}