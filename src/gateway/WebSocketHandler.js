const WebSocket = require('ws')
const dispatches = require('./dispatch/')
const { Opcodes } = require('../utils/Constants')

module.exports = class WebSocketHandler {
  constructor (client, token, intents) {
    this._client = client
    this._token = token
    this._intents = intents
    this._gateway = 'wss://gateway.discord.gg/?v=9&encoding=json'
    this._lastHeartbeat = null
    this._interval = null
    this.ping = null
    this.connection = null
  }

  connect () {
    this.connection = new WebSocket(this._gateway)

    this.connection.on('open', () => this.identify())
    this.connection.on('message', payload => {
      payload = JSON.parse(payload.toString())

      switch (payload.op) {
        case Opcodes.DISPATCH:
          dispatches[payload.t]?.(payload, this._client)
          this._client.emit('raw', payload)
          break

        case Opcodes.HELLO:
          this.heartbeat(payload.d.heartbeat_interval)
          break

        case Opcodes.HEARTBEAT_ACK:
          this.ping = Date.now() - this._lastHeartbeat
          break
      }
    })
  }

  disconnect (options) {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }

    this.connection = null

    this._client.emit('disconnect')

    if (options.reconnect) {
      this.connect()
    }
  }

  heartbeat (interval) {
    this._interval = setInterval(() => {
      this.connection.send(JSON.stringify({
        op: Opcodes.HEARTBEAT,
        d: null
      }))

      this._lastHeartbeat = Date.now()
    }, interval)
  }

  identify () {
    return this.connection.send(JSON.stringify({
      op: Opcodes.IDENTIFY,
      d: {
        token: this._token,
        intents: this._intents,
        properties: {
          $os: process.platform.toString(),
          $browser: 'erla',
          $device: 'erla'
        }
      }
    }))
  }
}
