# ![colyseus.js](https://github.com/gamestdio/colyseus/blob/master/media/header.png?raw=true)

> Colyseus.js - Multiplayer Game Client for the Browser.

[![Join the chat at https://gitter.im/gamestdio/colyseus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gamestdio/colyseus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=N9C36SSE9ZCTS)
[![Build Status](https://secure.travis-ci.org/gamestdio/colyseus.js.png?branch=master)](http://travis-ci.org/gamestdio/colyseus.js)
[![Greenkeeper badge](https://badges.greenkeeper.io/gamestdio/colyseus.js.svg)](https://greenkeeper.io/)

JavaScript/TypeScript client for
[Colyseus](https://github.com/gamestdio/colyseus) Multiplayer Game Server.

**The version 0.6.0 is still in beta. Expect some changes before the final
release.**

## Usage

### Connecting to server:

```ts
import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client('ws://localhost:2657');
```

### Joining to a room:

```ts
var room = client.join("room_name");
room.onJoin.add(function() {
    console.log(client.id, "joined", room.name);
});
```

### Listening to room state change:

Here comes the most powerful feature of the client. You can listen to every state update in the server-side, and bind them into client-side functions.

The first parameter is the path of the variable you want to listen to. When you provide placeholders (such as `:number`, `:id`, `:string`) to the path, they will populate the function with the value found on it. See examples below.

Listening to entities being added/removed from the room:

```ts
room.listen("entities/:id", (change) => {
    console.log(`new entity ${change.path.id}`, change.value);
});
```

Listening to entity attributes being added/replaced/removed:

```ts
room.listen("entities/:id/:attribute", (change) => {
    console.log(`entity ${change.path.id} changed attribute ${change.path.attribute} to ${change.value}`);
});
```

### Other room events

Room state has been updated:

```ts
room.onUpdate.add(function(state) {
  console.log(room.name, "has new state:", state)
})
```

Data coming from server directly to this client:

```ts
room.onData.add(function(data) {
  console.log(client.id, "received on", room.name, data)
});
```

Server error occurred:

```ts
room.onError.add(function() {
  console.log(client.id, "couldn't join", room.name)
});
```

The client left the room:

```ts
room.onLeave.add(function() {
  console.log(client.id, "left", room.name)
});
```

## Useful links

- [Server documentation](https://github.com/gamestdio/colyseus/wiki)
- [Official examples](https://github.com/gamestdio/colyseus-examples)

## License

MIT
