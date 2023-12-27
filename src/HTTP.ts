import { Client } from "./Client";
import { ServerError } from "./errors/ServerError";
import * as httpie from "httpie";

export class HTTP {
    public authToken: string;

    constructor(protected client: Client) {}

    public get<T = any>(path: string, options: Partial<httpie.Options> = {}): Promise<httpie.Response<T>> {
        return this.request("get", path, options);
    }

    public post<T = any>(path: string, options: Partial<httpie.Options> = {}): Promise<httpie.Response<T>> {
        return this.request("post", path, options);
    }

    public del<T = any>(path: string, options: Partial<httpie.Options> = {}): Promise<httpie.Response<T>> {
        return this.request("del", path, options);
    }

    public put<T = any>(path: string, options: Partial<httpie.Options> = {}): Promise<httpie.Response<T>> {
        return this.request("put", path, options);
    }

    protected request(method: "get" | "post" | "put" | "del", path: string, options: Partial<httpie.Options> = {}): Promise<httpie.Response> {
        return httpie[method](this.client['getHttpEndpoint'](path), this.getOptions(options)).catch((e: any) => {
            throw new ServerError(e.statusCode || -1, e.data?.error || e.statusMessage || e.message || "offline");
        });
    }

    protected getOptions(options: Partial<httpie.Options>) {
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
