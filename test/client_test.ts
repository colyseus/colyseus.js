import './util';
import { assert } from "chai";
import { Client } from "../src";
import { Schema, type } from '@colyseus/schema';

describe("Client", function () {
    let client: Client;

    before(() => {
        client = new Client("ws://localhost:2546");
    })

    describe("constructor settings", () => {
       
            const room = { roomId: "roomId", processId: "processId", sessionId: "sessionId", };
            const roomWithPublicAddress = { publicAddress: "node-1.colyseus.cloud", roomId: "roomId", processId: "processId", sessionId: "sessionId", };

            const settingsByUrl = {
                'ws://localhost:2567': {
                    settings: { hostname: "localhost", port: 2567, secure: false, },
                    httpEndpoint: "http://localhost:2567",
                    wsEndpoint: "ws://localhost:2567/processId/roomId?",
                    wsEndpointPublicAddress: "ws://node-1.colyseus.cloud/processId/roomId?"
                },
                'wss://localhost:2567': {
                    settings: { hostname: "localhost", port: 2567, secure: true, },
                    httpEndpoint: "https://localhost:2567",
                    wsEndpoint: "wss://localhost:2567/processId/roomId?",
                    wsEndpointPublicAddress: "wss://node-1.colyseus.cloud/processId/roomId?"
                },
                'http://localhost': {
                    settings: { hostname: "localhost", port: 80, secure: false, },
                    httpEndpoint: "http://localhost",
                    wsEndpoint: "ws://localhost/processId/roomId?",
                    wsEndpointPublicAddress: "ws://node-1.colyseus.cloud/processId/roomId?"
                },
                'https://localhost/custom/path': {
                    settings: { hostname: "localhost", port: 443, secure: true, pathname: "/custom/path" },
                    httpEndpoint: "https://localhost/custom/path",
                    wsEndpoint: "wss://localhost/custom/path/processId/roomId?",
                    wsEndpointPublicAddress: "wss://node-1.colyseus.cloud/processId/roomId?"
                },
                'https://localhost/with/header': {
                    settings: { hostname: "localhost", port: 443, secure: true, pathname: "/with/header", headers: { "Authorization": "Bearer ey21xx"} },
                    httpEndpoint: "https://localhost/with/header",
                    wsEndpoint: "wss://localhost/with/header/processId/roomId?",
                    wsEndpointPublicAddress: "wss://node-1.colyseus.cloud/processId/roomId?"
                },
                'https://localhost/custom/path?query=value': {
                    settings: { hostname: "localhost", port: 443, secure: true, pathname: "/custom/path", query: new URLSearchParams({"query": "value"}) },
                    httpEndpoint: "https://localhost/custom/path",
                    wsEndpoint: "wss://localhost/custom/path/processId/roomId?query=value",
                    wsEndpointPublicAddress: "wss://node-1.colyseus.cloud/processId/roomId?query=value"
                },
            };

            for (const url in settingsByUrl) {
             it(`testing settings by url ${url}`, () => {
                const expected = settingsByUrl[url]
                const client = new Client(url);
                const settings = client['settings'];
                assert.strictEqual(expected.settings.hostname, settings.hostname);
                assert.strictEqual(expected.settings.port, settings.port);
                assert.strictEqual(expected.settings.secure, settings.secure);
                assert.strictEqual(expected.settings.query?.toString(), settings.query?.toString());
                assert.strictEqual(expected.httpEndpoint + "/matchmake/", client['getHttpEndpoint']());
                assert.strictEqual(expected.wsEndpoint, client['buildEndpoint'](room));
                assert.strictEqual(expected.wsEndpointPublicAddress, client['buildEndpoint'](roomWithPublicAddress));

                const clientWithSettings = new Client(expected.settings);
                assert.strictEqual(expected.settings.hostname, clientWithSettings['settings'].hostname);
                assert.strictEqual(expected.settings.port, clientWithSettings['settings'].port);
                assert.strictEqual(expected.settings.secure, clientWithSettings['settings'].secure);
                assert.strictEqual(expected.httpEndpoint + "/matchmake/", clientWithSettings['getHttpEndpoint']());
                assert.strictEqual(expected.wsEndpoint, clientWithSettings['buildEndpoint'](room));
                assert.strictEqual(expected.wsEndpointPublicAddress, clientWithSettings['buildEndpoint'](roomWithPublicAddress));
             });
            }
       
    });

    xit("join", function () {
        const room = client.join("chat");
        // assert.equal(room.name, "chat")
        // assert.deepEqual(room.state, {})
    });

    xit("should allow to pass a Schema constructor as third argument", async () => {
        class State extends Schema {
            @type("string") str: string;
        }

        const room = await client.joinOrCreate("chat", {}, State);
        room.state.str

    });

});
