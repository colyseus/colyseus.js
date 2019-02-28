<div align="center">
  <a href="https://github.com/colyseus/colyseus">
    <img src="https://github.com/colyseus/colyseus/blob/master/media/header.png?raw=true" />
  </a>
  <br>
  <br>
  <a href="https://npmjs.com/package/colyseus">
    <img src="https://img.shields.io/npm/dm/colyseus.svg?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAgETESWYxR33AAAAtElEQVQoz4WQMQrCQBRE38Z0QoTcwF4Qg1h4BO0sxGOk80iCtViksrIQRRBTewWxMI1mbELYjYu+4rPMDPtn12ChMT3gavb4US5Jym0tcBIta3oDHv4Gwmr7nC4QAxBrCdzM2q6XqUnm9m9r59h7Rc0n2pFv24k4ttGMUXW+sGELTJjSr7QDKuqLS6UKFChVWWuFkZw9Z2AAvAirKT+JTlppIRnd6XgaP4goefI2Shj++OnjB3tBmHYK8z9zAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAyLTAxVDE4OjE3OjM3KzAxOjAwGQQixQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMi0wMVQxODoxNzozNyswMTowMGhZmnkAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC">
  </a>
  <a href="https://patreon.com/endel" title="Donate to this project using Patreon">
    <img src="https://img.shields.io/badge/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fendel&style=for-the-badge" alt="Patreon donate button"/>
  </a>
  <a href="https://discuss.colyseus.io" title="Discuss on Forum">
    <img src="https://img.shields.io/badge/discuss-on%20forum-brightgreen.svg?style=for-the-badge&colorB=0069b8&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAgETDROxCNUzAAABB0lEQVQoz4WRvyvEARjGP193CnWRH+dHQmGwKZtFGcSmxHAL400GN95ktIpV2dzlLzDJgsGgGNRdDAzoQueS/PgY3HXHyT3T+/Y87/s89UANBKXBdoZo5J6L4K1K5ZxHfnjnlQUf3bKvkgy57a0r9hS3cXfMO1kWJMza++tj3Ac7/LY343x1NA9cNmYMwnSS/SP8JVFuSJmr44iFqvtmpjhmhBCrOOazCesq6H4P3bPBjFoIBydOk2bUA17I080Es+wSZ51B4DIA2zgjSpYcEe44Js01G0XjRcCU+y4ZMrDeLmfc9EnVd5M/o0VMeu6nJZxWJivLmhyw1WHTvrr2b4+2OFqra+ALwouTMDcqmjMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDItMDFUMTg6MTM6MTkrMDE6MDAC9f6fAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAyLTAxVDE4OjEzOjE5KzAxOjAwc6hGIwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" alt="Discussion forum" />
  </a>
  <a href="https://discord.gg/RY8rRS7">
    <img src="https://img.shields.io/discord/525739117951320081.svg?style=for-the-badge&colorB=7581dc&logo=discord&logoColor=white">
  </a>
  <h3>
     Multiplayer Game Client for JavaScript/TypeScript. <br /><a href="https://docs.colyseus.io/client-overview/">View documentation</a>
  <h3>
</div>

## Platforms

This client works on these platforms:

- Major browsers environments ([Electron](https://github.com/electron/electron), Chrome, Firefox, Safari, Opera, etc)
- [React Native](https://github.com/facebook/react-native) ([with some caveats](#react-native-compatibility))
- [Cocos Creator](http://www.cocos2d-x.org/creator)

Browser support tested with:

<a href="https://www.browserstack.com/"><img src="media/browserstack-logo.png?raw=true" width="300" /></a>

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
room.onStateChange.add(function(state) {
  console.log(room.name, "has new state:", state)
})
```

Message broadcasted from server or directly to this client:

```ts
room.onMessage.add(function(message) {
  console.log(client.id, "received on", room.name, message)
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

## React Native compatibility

This client works with React Native. You need to install some aditional
dependencies for compatibility and assign `window.localStorage` to
`AsyncStorage`.

- `npm install buffer`

```js
// App.js
import { AsyncStorage } from 'react-native';
import { Buffer } from "buffer";
window.localStorage = AsyncStorage;
global.Buffer = Buffer;
```

Another caveat is that you can only join rooms after the first connection open.

```js
var client = new Colyseus.Client('ws://localhost:2657');

client.onOpen.add(() => {
    let room = client.join("your_room");
})
```

## License

MIT
