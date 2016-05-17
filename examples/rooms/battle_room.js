var Room = require('colyseus').Room

class BattleRoom extends Room {

  constructor (options) {
    super(options)
    console.log("BattleRoom created!", options)
  }

  requestJoin(options) {
    return (options.invalid_param != 10)
  }

  onJoin (client) {
    if (this.clients.length == 4) {
      this.lock()
      console.log("BattleRoom is now locked!")
    }
  }

  dispose () {
    console.log("Dispose BattleRoom")
  }

}

module.exports = BattleRoom
