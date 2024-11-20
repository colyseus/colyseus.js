import './util';
import { describe, beforeAll, test } from "vitest";
import assert from "assert";
import { Client } from "../src";

describe("HTTP", function() {
    let client: Client;

    beforeAll(() => {
        client = new Client("ws://localhost:4545");
    });

    describe("errors", () => {
        test("should return 'offline' error when requesting offline service", async () => {
            try {
                await client.http.post("/anything");
            } catch (e) {
                assert.strictEqual(e.code, 'ECONNREFUSED')
            }
        });
    });

});
