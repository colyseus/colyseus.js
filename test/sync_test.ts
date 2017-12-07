import './util';
import { assert } from "chai";
import { Room, DataChange, EntityMap, initializeSync, sync, key, room, syncMap, syncObject, listen } from "../src";

class Entity {
    @key() id: string;
    @sync() x: number;
    @sync() y: number;
    @sync("lvl") level: number;
    @room() room: Room;
}

class Settings {
    @sync() map: string;
}

class Game {
    @syncMap(Entity)
    entities: EntityMap<Entity> = {};

    @syncObject(Settings)
    settings: Settings;
}

describe("Sync Tools", function() {
    let room: Room = null;
    let game: Game;

    // beforeEach(() => {
        room = new Room("sync");
        game = new Game();

        initializeSync(room, game);

        room.set({
            entities: {
                one: { x: 10, y: 20, lvl: 1 },
                two: { x: 30, y: 40, lvl: 5 },
            },
            settings: {
                map: "there you go!"
            }
        });
    // });

    it("#sync", () => {
        assert.equal(game.entities.one.x, 10);
        assert.equal(game.entities.one.y, 20);
        assert.equal(game.entities.one.level, 1);

        assert.equal(game.entities.two.x, 30);
        assert.equal(game.entities.two.y, 40);
        assert.equal(game.entities.two.level, 5);
    });

    it("#key", () => {
        assert.equal(game.entities.one.id, "one");
        assert.equal(game.entities.two.id, "two");
    });

    it("#syncMap", () => {
        assert.instanceOf(game.entities.one, Entity);
        assert.instanceOf(game.entities.two, Entity);
    });

    it("#syncObject", () => {
        assert.instanceOf(game.settings, Settings);
        assert.equal(game.settings.map, "there you go!");
    });

    it("#room", () => {
        assert.deepEqual(game.entities.one.room, room);
    });

    it("#listen", () => {
        let room = new Room("dummy_room");
        let list = [1,2,3,4,5];

        let index = 0;
        class Test {
            @listen("list/:number")
            onListChange (change: DataChange) {
                index++;
                assert.equal(change.value, list[ list.length - index ]);
                assert.equal(change.path.number, list.length - index);
            }
        }

        initializeSync(room, new Test());
        room.set({ list });
    });

    it("#listen for specific operation", () => {
        let room = new Room("dummy_room");

        let index = 0;
        class Test {
            @listen("player/x", "replace")
            onListChange (change: DataChange) {
                assert.equal(change.operation, "replace");
                assert.equal(change.value, 10);
            }
        }

        initializeSync(room, new Test());

        room.set({ player: { x: 0, y: 0 } });
        room.set({ player: { x: 10, y: 0 }});
    });

});
