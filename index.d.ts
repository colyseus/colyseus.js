declare interface WebSocketConnectionOptions {
  strategy?: "fibonacci" | "exponential",
  randomisationFactor?: number,
  initialDelay?: number,
  maxDelay?: number,
  factor?: number
}

declare interface PatchObject {
  op: "add" | "remove" | "replace" | "move" | "copy",
  path: string;
  value: any;
}

declare class Room {
  id: number;
  name: string;
  state: any;
  ping: number;

  leave (): void;
  send (data: any): void;

  on (event: "update", listener: (newState: any) => void): Room;
  on (event: "patch", listener: (patches: PatchObject[]) => void): Room;
  on (event: "leave", listener: (...args: any[]) => void): Room;
  on (event: string, listener: (...args: any[]) => void): Room;
}

declare class Colyseus {
  constructor (endpoint: string, protocols?: string[], options?: WebSocketConnectionOptions);

  send (data: any): void;
  join (roomName: string, options?: any): Room;

  onclose: Function;
  onerror: Function;
  onmessage: Function;
  onopen: Function;
  onreconnect: Function;
}

export = Colyseus;
