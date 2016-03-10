import WebSocketClient from 'websocket.js'
import msgpack from 'msgpack-lite'
import jsonpatch from 'fast-json-patch'

import protocol from './protocol'
import { createRoom } from './room'

class Colyseus extends WebSocketClient {

  constructor (url, protocols = null, options = {}) {
    super(url, protocols, options)
    this.binaryType = "arraybuffer"

    this.roomStates = {}
    this.rooms = {}
    this._enqueuedCalls = []
  }

  onOpenCallback (event) {
    if (this._enqueuedCalls.length > 0) {
      for (var i=0; i<this._enqueuedCalls.length; i++) {
        let [ method, args ] = this._enqueuedCalls[i]
        this[ method ].apply(this, args)
      }
    }
  }

  send (data) {
    if (this.ws.readyState == WebSocket.OPEN) {
      return super.send( msgpack.encode(data) )

    } else {
      // WebSocket not connected.
      // Enqueue data to be sent when readyState == OPEN
      this._enqueuedCalls.push(['send', [data]])
    }
  }

  join (roomName, options) {
    if (!this.rooms[ roomName ]) {
      this.rooms[ roomName ] = createRoom(this, roomName)
    }

    this.send([protocol.JOIN_ROOM, roomName, options || {}])

    return this.rooms[ roomName ]
  }

  /**
   * @override
   */
  onMessageCallback (event) {
    var message = msgpack.decode( new Uint8Array(event.data) )

    if (typeof(message[0]) === "number") {
      let roomId = message[1]

      if (message[0] == protocol.USER_ID) {
        this.id = message[1]
        if (this.listeners['onopen']) this.listeners['onopen'].apply(null)
        return true

      } else if (message[0] == protocol.JOIN_ROOM) {
        // joining room from room name:
        // when first room message is received, keep only roomId association on `rooms` object
        if (this.rooms[ message[2] ]) {
          this.rooms[ roomId ] = this.rooms[ message[2] ]
          delete this.rooms[ message[2] ]
        }
        this.rooms[ roomId ].id = roomId
        this.rooms[ roomId ].emit('join')
        return true

      } else if (message[0] == protocol.JOIN_ERROR) {
        this.rooms[ roomId ].emit('error', message[2])
        delete this.rooms[ roomId ]
        return true

      } else if (message[0] == protocol.LEAVE_ROOM) {
        this.rooms[ roomId ].emit('leave')
        return true

      } else if (message[0] == protocol.ROOM_STATE) {
        let roomState = message[2]

        this.rooms[ roomId ].state = roomState
        this.rooms[ roomId ].emit('update', roomState)

        this.roomStates[ roomId ] = roomState
        return true

      } else if (message[0] == protocol.ROOM_STATE_PATCH) {
        this.rooms[ roomId ].emit('patch', message[2])
        jsonpatch.apply(this.roomStates[ roomId ], message[2])
        this.rooms[ roomId ].emit('update', this.roomStates[ roomId ], message[2])

        return true

      } else if (message[0] == protocol.ROOM_DATA) {
        this.rooms[ roomId ].emit('data', message[2])
        message = [ message[2] ]
      }

    }

    if (this.listeners['onmessage']) this.listeners['onmessage'].apply(null, message)
  }

}

module.exports = Colyseus
