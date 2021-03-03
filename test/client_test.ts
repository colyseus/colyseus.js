import './util';
import { assert } from "chai";
import { Client } from "../src";
import { Schema, type } from '@colyseus/schema';

describe("Client", function () {
    let client: Client;

    before(() => {
        client = new Client("ws://localhost:2546");
    })

    xit("join", function () {
        const room = client.join("chat");
        // assert.equal(room.name, "chat")
        // assert.deepEqual(room.state, {})
    });

    xit("should allow to pass a Schema constructor as third argument", async () => {
        class State extends Schema {
            @type("string") str: string;
        }

        const room = await client.joinOrCreate("chat", {}, State);
        room.state.str

    });

});
