import './util';
import assert from "assert";
import { Client, Room } from "../src";

describe("Auth", function() {
    let client: Client;

    before(() => {
        client = new Client("ws://localhost:2546");
    });

    describe("store token", () => {
        it("should store token on localStorage", () => {
            client.auth['emitChange']({ user: {}, token: "123" });
            assert.strictEqual("123", client.auth.token);
            assert.strictEqual("123", window.localStorage.getItem(client.auth.settings.key));
        });

        it("should reject if no token is stored", async () => {
            // @ts-ignore
            client.auth.token = undefined;

            await assert.rejects(async () => {
                await client.auth.getUserData();
            }, /missing auth.token/);
        });

    });

});
