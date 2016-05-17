var EventEmitter = require('events').EventEmitter
  , protocol = require('./protocol')
  , jsonpatch = require('fast-json-patch')

class Room extends EventEmitter {

  constructor (client, name) {

    super()

    this.id = null
    this.client = client

    this.name = name
    this.state = {}

    this.lastPatchTime = null
    this.ping = null

    this.on('leave', () => this.removeAllListeners())

  }

  setState ( state, remoteCurrentTime, remoteElapsedTime ) {

    this.state = state

    this.emit('update', state)

  }

  patch ( patches ) {

    let patchTime = Date.now()

    if ( this.lastPatchTime ) {
      this.ping = patchTime - this.lastPatchTime
    }

    this.lastPatchTime = patchTime

    this.emit('patch', patches)

    jsonpatch.apply(this.state, patches)

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
