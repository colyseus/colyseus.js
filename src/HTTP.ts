import { Client } from "./Client";
import { ServerError } from "./errors/ServerError";
import httpie, { Response, Options } from "httpie";

export class HTTP {
    public authToken: string;

    constructor(protected client: Client) {}

    public get<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return this.request("get", path, options);
    }

    public post<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return this.request("post", path, options);
    }

    public del<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return this.request("del", path, options);
    }

    public put<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return this.request("put", path, options);
    }

    protected request(method: "get" | "post" | "put" | "del", path: string, options: Partial<Options> = {}): Promise<Response> {
        return httpie[method](this.client['getHttpEndpoint'](path), this.getOptions(options)).catch((e: any) => {
            throw new ServerError(e.statusCode, e.data?.error || e.statusMessage || e.message);
        });
    }

    protected getOptions(options: Partial<Options>) {
        if (this.authToken) {
            if (!options.headers) {
                options.headers = {};
            }

            options.headers['Authorization'] = `Bearer ${this.authToken}`;
            options.withCredentials = true;
        }

        return options;
    }
}
