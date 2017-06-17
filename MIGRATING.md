# Migration guide for colyseus.js

## Migrating from 0.6 to 0.7

#### `room.state` has been deprecated. `Room` now has all `state` methods and properties.

OLD

```
room.state.listen(...);
console.log( room.state.data.someDataFromServer );

```

NEW

```
room.listen(...);
console.log( room.data.someDataFromServer );
```
