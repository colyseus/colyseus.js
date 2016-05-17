var Room = require('colyseus').Room

class ChatRoom extends Room {

  constructor (options) {
    super(options)

    // this.useTimeline()

    this.setPatchRate( 1000 )

    this.setState({ messages: [] })

    // Call game simulation at 60fps (16.6ms)
    this.setSimulationInterval( this.tick.bind(this), 1000 / 60 )

    console.log("ChatRoom created!", options)
  }

  onJoin (client) {
    this.sendState(client)
    console.log("ChatRoom:", client.id, "connected")
  }

  onLeave (client) {
    // console.log("ChatRoom:", client.id, "disconnected")
  }

  onMessage (client, data) {
    // TODO
    // - When sending messages, it would be good to flag which handler is interested in them.
    if (data.message == "kick") {
      this.clients.filter(c => c.id !== client.id).forEach(other => other.close())

    } else {
      this.state.messages.push(data.message)
      this.broadcast("This is a ROOM_DATA message.")
    }

    console.log("ChatRoom:", client.id, data)
  }

  tick () {
    //
    // This is your 'game loop'.
    // Inside function you'll have to run the simulation of your game.
    //
    // You should:
    // - move entities
    // - check for collisions
    // - update the state
    //

    // Uncomment this line to see the simulation running and clients receiving the patched state
    // In this example, the server simply adds the elapsedTime every 2 messages it receives
    if ( this.state.messages.length % 3 == 0 ) {
      this.state.messages.push(`${ this.clock.elapsedTime }: even`)
    }
  }

  dispose () {
    console.log("Dispose ChatRoom")
  }

}

module.exports = ChatRoom
