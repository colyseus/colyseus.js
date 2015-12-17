var EventEmitter = require('events').EventEmitter
  , protocol = require('./protocol')

class Room extends EventEmitter {

  constructor (client, name) {
    super()

    this.id = null
    this.client = client
    this.name = name
    this.state = {}
  }

  leave () {
    if (this.id) {
      this.client.send([protocol.LEAVE_ROOM, this.id])
    }
  }

  send (data) {
    this.client.send([protocol.ROOM_DATA, this.id, data])
  }

}

export function createRoom (client, name) {
  return new Room(client, name)
}
