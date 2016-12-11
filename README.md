Colyseus.js - Multiplayer Game Client for the Browser.
===

[![Join the chat at https://gitter.im/gamestdio/colyseus](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gamestdio/colyseus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/gamestdio/colyseus.js.png?branch=master)](http://travis-ci.org/gamestdio/colyseus.js)

JavaScript/TypeScript client for
[Colyseus](https://github.com/gamestdio/colyseus) - a Minimalist Multiplayer
Game Server for Node.js.

## Usage

### Connecting to server:

```javascript
import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client('ws://localhost:2657');
```

### Joining to a room:

```
var room = client.join("room_name");
room.onJoin.add(function() {
    console.log(client.id, "joined", room.name);
});
```

### Listening to state changes:

Here comes the most powerful feature of the client. You can listen to every state update in the server-side, and bind them into client-side functions.

The first parameter is the path of the variable you want to listen to. When you provide placeholders (such as `:number`, `:id`, `:string`) to the path, they will populate the function with the value found on it. See examples below.

Listening to entities being created in the room:

```
room.state.listen("entities/:id", "add", (entityId: string, value: any) => {
    console.log(`new entity ${entity}`, value);
});
```

Listening to entity attributes being replaced:

```
room.state.listen("entities/:id/:attribute", "replace", (entityId: string, attribute: string, value: any) => {
    console.log(`entity ${entityId} changed attribute ${attribute} to ${value}`);
});
```

Listening to entities being removed:

```
room.state.listen("entities/:id", "remove", (entityId: string, value: any) => {
    console.log(`entity ${entityId} has been removed`);
});
```

### Other room events

Room state has been updated:

```
room.onUpdate.add(function(state) {
  console.log(room.name, "has new state:", state)
})
```

Data coming from server directly to this client:

```
room.onData.add(function(data) {
  console.log(client.id, "received on", room.name, data)
});
```

Server error occurred:

```
room.onError.add(function() {
  console.log(client.id, "couldn't join", room.name)
});
```

The client left the room:

```
room.onLeave.add(function() {
  console.log(client.id, "left", room.name)
});
```

## License

MIT
