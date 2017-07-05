const assert = require('chai').assert;
const Room = require('../lib/Room').Room;

const fossilDelta = require('fossil-delta');
const msgpack = require('msgpack-lite');

describe("Room", function() {
  let room = null;

  beforeEach(function() {
    room = new Room("chat");
  });

  it("should initialize room with empty state", function() {
    assert.equal(room.name, "chat")
    assert.deepEqual(room.data, {})
  });

  it("should emit state change", function(done) {
    room.onUpdate.add(function(data) {
      assert.deepEqual(data.messages, []);
      done();
    });

    room.setState({ messages: [] }, 0, 0);
  })

  it("should patch room state", function(done) {
    let state = {
      players: {
        'one': { hp: 100, lvl: 1, position: {x: 0, y: 0} },
        'two': { hp: 95, lvl: 2, position: {x: 0, y: 0} },
      }
    };
    room.setState(state, 0, 0);

    // get previous state encoded
    let previousState = msgpack.encode(state);
    // change state and encode it
    let nextState = msgpack.encode({
      players: {
        'one': { hp: 40, lvl: 1, position: {x: 0, y: 100} },
        'two': { hp: 95, lvl: 2, position: {x: 0, y: 0} },
      }
    });
    let delta = fossilDelta.create(previousState, nextState);

    let patchCount = 0;
    room.listen("players/:id/:attribute", (change) => {
      patchCount++
      assert.equal(change.path.id, "one");
      assert.equal(change.path.attribute, "hp");
      assert.equal(change.value, 40);
    })

    room.listen("players/:id/position/:axis", (change) => {
      patchCount++
      assert.equal(change.path.id, "one");
      assert.equal(change.path.axis, "y");
      assert.equal(change.value, 100);
    })

    room.patch(delta);

    setTimeout(() => {
      if (patchCount === 2) done();
    }, 1);
  });

});
