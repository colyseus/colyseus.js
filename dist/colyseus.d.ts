/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
declare namespace Colyseus {
    class Client {
        id?: string;
        onOpen: Signal;
        onMessage: Signal;
        onClose: Signal;
        onError: Signal;
        protected connection: Connection;
        protected rooms: {
            [id: string]: Room;
        };
        protected connectingRooms: {
            [id: string]: Room;
        };
        protected requestId: number;
        protected hostname: string;
        protected storage: Storage;
        protected roomsAvailableRequests: {
            [requestId: number]: (value?: RoomAvailable[]) => void;
        };
        constructor(url: string);
        join<T>(roomName: string, options?: any): void;
        getAvailableRooms(roomName: string, callback: (rooms: RoomAvailable[], err?: string) => void): void;
        close(colyseusId: string): void;
    }
}
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
declare namespace Colyseus {
    class Clock {
        running: boolean;
        deltaTime: number;
        currentTime: number;
        elapsedTime: number;
        protected now: Function;
        protected _interval: any;
        constructor(useInterval?: boolean);
        start(useInterval?: boolean): void;
        stop(): void;
        tick(newTime?: any): void;
    }
}
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
declare namespace Colyseus {
    class Connection {
        constructor(url: any, querry?: any);
        onOpenCallback(even: any): void;
        onCloseCallback(even: any): void;
        send(data: any): void;
    }
}
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
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
        PING = 100,
    }
}
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
declare namespace Colyseus {
    class Signal {
        constructor();
        add(listener: Function): Slot;
    }
}
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
declare namespace Colyseus {
    class Slot {
        protected _signal: any;
        protected _enabled: boolean;
        protected _listener: Function;
        protected _once: boolean;
        protected _priority: number;
        protected _params: any[];
        execute0(): void;
        execute1(value: any): void;
        execute(valueObjects: any[]): void;
        listener: Function;
        readonly once: boolean;
        readonly priority: number;
        toString(): string;
        enabled: boolean;
        params: any[];
        remove(): void;
        protected verifyListener(listener: Function): void;
    }
}
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
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
/**
 ** Created by Alexander Kolarov, on 6.5.2018 г.
 **/
declare namespace Colyseus {
    class Room<T = any> extends StateContainer {
        id: string;
        sessionId: string;
        name: string;
        options: any;
        clock: Clock;
        remoteClock: Clock;
        onJoin: Signal;
        onStateChange: Signal;
        onMessage: Signal;
        onError: Signal;
        onLeave: Signal;
        connection: Connection;
        constructor(name: string, options?: any);
        connect(connection: Connection): void;
        leave(): void;
        send(data: any): void;
        removeAllListeners(): void;
        protected onMessageCallback(event: any): void;
        protected setState(encodedState: any, remoteCurrentTime?: number, remoteElapsedTime?: number): void;
        protected patch(binaryPatch: any): void;
    }
    interface RoomAvailable {
        roomId: string;
        clients: number;
        maxClients: number;
        metadata?: any;
    }
}
