var assert = require('chai').assert;
var Room = require('../lib/Room').Room;

var fossilDelta = require('fossil-delta');
var msgpack = require('msgpack-lite');

describe("Room", function() {
  var room = null;

  beforeEach(function() {
    room = new Room(null, "chat");
  });

  it("should initialize room with empty state", function() {
    assert.equal(room.name, "chat")
    assert.deepEqual(room.state, {})
  });

  it("should emit state change", function(done) {
    room.onUpdate.add(function(data) {
      assert.deepEqual(data.messages, []);
      done();
    });

    room.setState({ messages: [] }, 0, 0);
  })

  it("should patch room state", function(done) {
    var state = {
      players: {
        'one': { hp: 100, lvl: 1, position: {x: 0, y: 0} },
        'two': { hp: 95, lvl: 2, position: {x: 0, y: 0} },
      }
    };
    room.setState(state, 0, 0);

    // get previous state encoded
    var previousState = msgpack.encode(state);
    // change state and encode it
    var nextState = msgpack.encode({
      players: {
        'one': { hp: 40, lvl: 1, position: {x: 0, y: 100} },
        'two': { hp: 95, lvl: 2, position: {x: 0, y: 0} },
      }
    });
    var delta = fossilDelta.create(previousState, nextState);

    room.onPatch.add(function(patches) {
      assert.equal(patches.length, 2)
      done();
    })

    room.patch(delta);
  });

});
