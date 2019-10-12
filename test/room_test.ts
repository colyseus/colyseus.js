import './util';
import { assert } from "chai";
import { Room } from "../src";

import * as fossilDelta from "fossil-delta";
import * as msgpack from "../src/msgpack";
import { FossilDeltaSerializer } from '../src/serializer/FossilDeltaSerializer';

describe("Room", function() {
  let room: Room = null;

  describe("fossil-delta", () => {

    beforeEach(function() {
        room = new Room("chat");
        (room as any).serializer = new FossilDeltaSerializer();
    });

    it("should initialize room with empty state", function() {
        assert.equal(room.name, "chat")
        assert.deepEqual(room.state, {})
    });

    it("should emit state change", function(done) {
        room.onStateChange((data) => {
            assert.deepEqual(data.messages, []);
            done();
        });

        (<any>room).setState(msgpack.encode({ messages: [] }), 0, 0);
    })

    it("should patch room state", function(done) {
        let state = {
            players: {
                'one': { hp: 100, lvl: 1, position: {x: 0, y: 0} },
                'two': { hp: 95, lvl: 2, position: {x: 0, y: 0} },
            }
        };
        (<any>room).setState(new Uint8Array(msgpack.encode(state)), 0, 0);

        // get previous state encoded
        let previousState = new Uint8Array(msgpack.encode(state));

        // change state and encode it
        let nextState = new Uint8Array(msgpack.encode({
            players: {
                'one': { hp: 40, lvl: 1, position: {x: 0, y: 100} },
                'two': { hp: 95, lvl: 2, position: {x: 0, y: 0} },
            }
        }));
        let delta = fossilDelta.create(previousState, nextState);

        let patchCount = 0;
        room.listen("players/:id/:attribute", (change) => {
            patchCount++
            assert.equal(change.path.id, "one");
            assert.equal(change.path.attribute, "hp");
            assert.equal(change.value, 40);
        });

        room.listen("players/:id/position/:axis", (change) => {
            patchCount++
            assert.equal(change.path.id, "one");
            assert.equal(change.path.axis, "y");
            assert.equal(change.value, 100);
        });

        (<any>room).patch(delta);

        setTimeout(() => {
            if (patchCount === 2) done();
        }, 1);
    });
  });

});
