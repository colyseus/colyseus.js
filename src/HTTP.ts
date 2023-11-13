import { Client } from "./Client";
import { post, get, put, del, Response, Options } from "httpie";

export class HTTP {
    public authToken: string;

    constructor(protected client: Client) {}

    public get<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return get(this.client['getHttpEndpoint'](path), this.getOptions(options));
    }

    public post<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return post(this.client['getHttpEndpoint'](path), this.getOptions(options));
    }

    public del<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return del(this.client['getHttpEndpoint'](path), this.getOptions(options));
    }

    public put<T = any>(path: string, options: Partial<Options> = {}): Promise<Response<T>> {
        return put(this.client['getHttpEndpoint'](path), this.getOptions(options));
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
