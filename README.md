# colyseus.js for the browser [![Join the chat at https://gitter.im/gamestdio/colyseus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gamestdio/colyseus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

JavaScript client for [colyseus](https://github.com/gamestdio/colyseus) - a
Minimalistic MMO Game Server for Node.js.

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

room.on('setup', function(state) {
  console.log(roomName, "initial state:", state)
})

room.on('patch', function(patches) {
  console.log(roomName, "has these changes:", patches)
})

room.on('update', function(newState) {
  console.log(roomName, "has a new state:", newState)
})

```

## License

MIT
