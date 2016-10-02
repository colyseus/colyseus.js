var EventEmitter = require('events').EventEmitter
  , jsonpatch = require('fast-json-patch')
  , msgpack = require('msgpack-lite')
  , fossilDelta = require('fossil-delta')
  , Clock = require('clock.js')
  , protocol = require('./protocol')

class Room extends EventEmitter {

  constructor (client, name) {

    super()

    this.id = null
    this.client = client

    this.name = name
    this.state = {}

    this.clock = new Clock()
    this.remoteClock = new Clock()

    this.lastPatchTime = null
    this.ping = null

    this.on('leave', () => this.removeAllListeners())

  }

  setState ( state, remoteCurrentTime, remoteElapsedTime ) {

    this.state = state
    this._previousState = msgpack.encode( this.state )

    // set remote clock properties
    this.remoteClock.currentTime = remoteCurrentTime
    this.remoteClock.elapsedTime = remoteElapsedTime

    this.clock.start()

    this.emit('update', state)

  }

  patch ( binaryPatch ) {

    //
    // calculate client-side ping
    //
    let patchTime = Date.now()

    if ( this.lastPatchTime ) {
      this.ping = patchTime - this.lastPatchTime
    }

    this.lastPatchTime = patchTime

    this.clock.tick()

    //
    // apply patch
    //
    this._previousState = fossilDelta.apply( this._previousState, binaryPatch )
    let newState = msgpack.decode( this._previousState )

    let patches = jsonpatch.compare( this.state, newState )
    this.emit('patch', patches)

    this.state = newState;
    this.emit('update', this.state, patches)

  }

  leave () {

    if (this.id >= 0) {

      this.client.send([ protocol.LEAVE_ROOM, this.id ])

    }

  }

  send (data) {

    this.client.send([ protocol.ROOM_DATA, this.id, data ])

  }

}

export function createRoom (client, name) {

  return new Room(client, name)

}
