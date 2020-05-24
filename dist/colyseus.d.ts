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
        HANDSHAKE = 9,
        JOIN_ROOM = 10,
        ERROR = 11,
        LEAVE_ROOM = 12,
        ROOM_DATA = 13,
        ROOM_STATE = 14,
        ROOM_STATE_PATCH = 15,
        ROOM_DATA_SCHEMA = 16
    }
    enum ErrorCode {
        MATCHMAKE_NO_HANDLER = 4210,
        MATCHMAKE_INVALID_CRITERIA = 4211,
        MATCHMAKE_INVALID_ROOM_ID = 4212,
        MATCHMAKE_UNHANDLED = 4213,
        MATCHMAKE_EXPIRED = 4214,
        AUTH_FAILED = 4215,
        APPLICATION_ERROR = 4216
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
        onError: {
            (this: any, cb: (code: number, message?: string) => void): EventEmitter<(code: number, message?: string) => void>;
            once(cb: (code: number, message?: string) => void): void;
            remove(cb: (code: number, message?: string) => void): void;
            invoke(code: number, message?: string): void;
            invokeAsync(code: number, message?: string): Promise<any[]>;
            clear(): void;
        };
        onLeave: {
            (this: any, cb: (code: number) => void): EventEmitter<(code: number) => void>;
            once(cb: (code: number) => void): void;
            remove(cb: (code: number) => void): void;
            invoke(code: number): void;
            invokeAsync(code: number): Promise<any[]>;
            clear(): void;
        };
        connection: Connection;
        constructor(name: string);
        connect(connection: Connection): void;
        leave(): void;
        send(type: string | number, message?: any): void;
        onMessage<T = any>(type: "*", callback: (type: string | number | any, message: T) => void): any;
        onMessage<T extends (new (...args: any[]) => any)>(type: T, callback: (message: InstanceType<T>) => void): any;
        onMessage<T = any>(type: string | number, callback: (message: T) => void): any;
        removeAllListeners(): void;
    }
    interface RoomAvailable {
        roomId: string;
        clients: number;
        maxClients: number;
        metadata?: any;
    }
}
