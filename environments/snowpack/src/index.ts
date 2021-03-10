import { Client } from "colyseus.js";

const client = new Client("ws://localhost:2567");
client.joinOrCreate("dummy").then((room) => {
    room.onStateChange((state) => {
        console.log("onStateChange", state);
    });
    room.onLeave((code) => console.log("onLeave:", { code }));
});
