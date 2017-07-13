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

#### `room.listen()` signature has changed.

OLD

```typescript
room.state.listen("entities/:id/:attribute", "replace", (id, attribute, value) => {
    console.log(id, attribute, value);
})
```

NEW

```typescript
room.listen("entities/:id/:attribute", (change) => {
    console.log(change.path.id, change.path.attribute, change.value);
})
```
