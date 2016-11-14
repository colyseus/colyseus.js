colyseus.js for the browser
===

[![Join the chat at https://gitter.im/gamestdio/colyseus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gamestdio/colyseus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/gamestdio/colyseus.js.png?branch=master)](http://travis-ci.org/gamestdio/colyseus.js)

JavaScript/TypeScript client for
[Colyseus](https://github.com/gamestdio/colyseus) - a Minimalist Multiplayer
Game Server for Node.js.

## Usage

```javascript
import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client('ws://localhost:2657');
var roomName = "room_name"
var room = client.join(roomName)

// successfully joined the room
room.onJoin.add(function() {
  console.log(client.id, "joined", roomName)
})

// patches comming from the server
room.onUpdate.add(function(patches) {
  console.log(roomName, "patches comming:", patches)
})

// patches comming from the server
room.onPatch.add(function(patches) {
  console.log(roomName, "will apply these changes:", patches)
})

// the server sent data directly for this client
room.onData.add(function(data) {
  console.log(client.id, "received on", roomName, data)
})

// oops, some error happened in the server!
room.onError.add(function() {
  console.log(client.id, "couldn't join", roomName)
})

// client left the room.
room.onLeave.add(function() {
  console.log(client.id, "left", roomName)
})

```

## License

MIT
