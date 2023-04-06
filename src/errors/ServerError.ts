export enum CloseCode {
    CONSENTED = 4000,
    DEVMODE_RESTART = 4010
}

export class ServerError extends Error {
  public code: number;

  constructor(code: number, message: string) {
    super(message);

    this.name = "ServerError";
    this.code = code;
  }
}
