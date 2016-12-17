const path = require('path');
const colyseus = require('colyseus');
const http = require('http');
const express = require('express');

const port = process.env.PORT || 2657;
const app = express();

const ChatRoom = require('./rooms/chat_room');
const BattleRoom = require('./rooms/battle_room');

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});

gameServer.register('chat', ChatRoom);
gameServer.register('battle', BattleRoom);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "dist")));

server.listen(port);

console.log(`Listening on http://localhost:${ port }`);
