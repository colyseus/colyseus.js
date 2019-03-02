import './util';
import { assert } from "chai";
import { Client, FossilDeltaSerializer } from "../src";

describe("Client", function () {

    it("join", function () {
        const client = new Client("ws://localhost:2546");
        const room = client.join("chat");
        room.serializer = new FossilDeltaSerializer();
        assert.equal(room.name, "chat")
        assert.deepEqual(room.state, {})
    });

});
