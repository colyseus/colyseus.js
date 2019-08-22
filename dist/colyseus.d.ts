/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/

declare namespace Colyseus {
    class Client {
        constructor(url: string);
        joinOrCreate<T = any>(roomName: string, options?: any, rootSchema?: any): Promise<Room<T>>;
        create<T = any>(roomName: string, options?: any, rootSchema?: any): Promise<Room<T>>;
        join<T = any>(roomName: string, options?: any, rootSchema?: any): Promise<Room<T>>;
        joinById<T = any>(roomId: string, options?: any, rootSchema?: any): Promise<Room<T>>;
        reconnect<T = any>(roomId: string, sessionId: string, rootSchema?: any): Promise<Room<T>>;
        getAvailableRooms(roomName?: string): Promise<RoomAvailable[]>;
    }
}

declare namespace Colyseus {
    class Connection {
        constructor(url: any, querry?: any);
        onOpenCallback(even: any): void;
        onCloseCallback(even: any): void;
        send(data: any): void;
    }
}

declare namespace Colyseus {
    enum Protocol {
        USER_ID = 1,
        JOIN_ROOM = 10,
        JOIN_ERROR = 11,
        LEAVE_ROOM = 12,
        ROOM_DATA = 13,
        ROOM_STATE = 14,
        ROOM_STATE_PATCH = 15,
        ROOM_LIST = 20,
        BAD_REQUEST = 50,
    }
}

declare namespace Colyseus {
    type FunctionParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
    class EventEmitter<CallbackSignature extends (...args: any[]) => any> {
        handlers: Array<CallbackSignature>;
        register(cb: CallbackSignature, once?: boolean): this;
        invoke(...args: FunctionParameters<CallbackSignature>): void;
        remove(cb: CallbackSignature): void;
        clear(): void;
    }
}

declare namespace Colyseus {
    class StateContainer<T = any> {
        state: T;
        constructor(state: T);
        set(newState: T): void;
        registerPlaceholder(placeholder: string, matcher: RegExp): void;
        listen(segments: string | Function, callback?: Function): void;
        removeListener(listener: any): void;
        removeAllListeners(): void;
    }
}

declare namespace Colyseus {
    class Room<T = any> extends StateContainer {
        id: string;
        sessionId: string;
        name: string;
        onStateChange: {
            (this: any, cb: (state: T) => void): EventEmitter<(state: T) => void>;
            once(cb: (state: T) => void): void;
            remove(cb: (state: T) => void): void;
            invoke(state: T): void;
            clear(): void;
        };
        onMessage: {
            (this: any, cb: (data: any) => void): EventEmitter<(data: any) => void>;
            once(cb: (data: any) => void): void;
            remove(cb: (data: any) => void): void;
            invoke(data: any): void;
            clear(): void;
        };
        onError: {
            (this: any, cb: (message: string) => void): EventEmitter<(message: string) => void>;
            once(cb: (message: string) => void): void;
            remove(cb: (message: string) => void): void;
            invoke(message: string): void;
            clear(): void;
        };
        onLeave: {
            (this: any, cb: (code: number) => void): EventEmitter<(code: number) => void>;
            once(cb: (code: number) => void): void;
            remove(cb: (code: number) => void): void;
            invoke(code: number): void;
            clear(): void;
        };
        connection: Connection;
        constructor(name: string);
        connect(connection: Connection): void;
        leave(): void;
        send(data: any): void;
        removeAllListeners(): void;
    }
    interface RoomAvailable {
        roomId: string;
        clients: number;
        maxClients: number;
        metadata?: any;
    }
}
