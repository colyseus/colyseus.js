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

room.onJoin.add(function() {
  console.log(client.id, "joined", roomName)
})

room.onError.add(function() {
  console.log(client.id, "couldn't join", roomName)
})

room.onLeave.add(function() {
  console.log(client.id, "left", roomName)
})

room.onData.add(function(data) {
  console.log(client.id, "received on", roomName, data)
})

room.onPatch.add(function(patches) {
  console.log(roomName, "will apply these changes:", patches)
})

room.onUpdate.add(function(newState, patches) {
  console.log(roomName, "new state:", newState, "changes applied:", patches)
})

```

## License

MIT
