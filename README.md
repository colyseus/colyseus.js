colyseus.js for the browser
===

[![Join the chat at https://gitter.im/gamestdio/colyseus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gamestdio/colyseus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/gamestdio/colyseus.js.png?branch=master)](http://travis-ci.org/gamestdio/colyseus.js)

JavaScript client for [colyseus](https://github.com/gamestdio/colyseus) - a
Minimalist Multiplayer Game Server for Node.js.

## Usage

```javascript
var client = new Colyseus('ws://localhost:2657');
var roomName = "room_name"
var room = client.join(roomName)

room.on('join', function() {
  console.log(client.id, "joined", roomName)
})

room.on('error', function() {
  console.log(client.id, "couldn't join", roomName)
})

room.on('leave', function() {
  console.log(client.id, "leaved", roomName)
})

room.on('data', function(data) {
  console.log(client.id, "received on", roomName, data)
})

room.on('patch', function(patches) {
  console.log(roomName, "will apply these changes:", patches)
})

room.on('update', function(newState, patches) {
  console.log(roomName, "new state:", newState, "changes applied:", patches)
})

```

## License

MIT
