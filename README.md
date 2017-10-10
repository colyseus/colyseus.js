<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/Pa34TYK6ySj3zGr7u124Dgnn/gamestdio/colyseus.js'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/Pa34TYK6ySj3zGr7u124Dgnn/gamestdio/colyseus.js.svg' />
</a>

<div align="center">
  <a href="https://github.com/gamestdio/colyseus">
    <img src="https://github.com/gamestdio/colyseus/blob/master/media/header.png?raw=true" />
  </a>
  <br>
  <br>
  <a href="https://npmjs.com/package/colyseus">
    <img src="https://img.shields.io/npm/dm/colyseus.svg">
  </a>
  <a href="https://github.com/gamestdio/colyseus#sponsors">
    <img src="https://opencollective.com/colyseus/sponsors/badge.svg">
  </a>
  <a href="https://github.com/gamestdio/colyseus#backers">
    <img src="https://opencollective.com/colyseus/backers/badge.svg">
  </a>
  <a href="https://gitter.im/gamestdio/colyseus">
    <img src="https://badges.gitter.im/gamestdio/colyseus.svg">
  </a>
  <h3>
     Multiplayer Game Client for the Browser.
  <h3>
</div>

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

Here comes the most powerful feature of the client. You can listen to every
state update in the server-side, and bind them into client-side functions.

The first parameter is the path of the variable you want to listen to. When you
provide placeholders (such as `:number`, `:id`, `:string`) to the path, they
will populate the function with the value found on it. See examples below.

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

## React Native compatibility

This client works with React Native. You need to install an aditional dependency
for compatibility and assign `window.localStorage` to `AsyncStorage`.

```
npm install react-native-browser-polyfill
```

```
// App.js
import 'react-native-browser-polyfill';
import { AsyncStorage } from 'react-native';
window.localStorage = AsyncStorage;
```

Another caveat is that you can only join rooms after the first connection open.

```
var client = new Colyseus.Client('ws://localhost:2657');

client.onOpen.add(() => {
    let room = client.join("your_room");
})
```

## License

MIT
