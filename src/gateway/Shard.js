import WebSocket from "ws"
import EventEmitter from "events"

import Constants from "../util/Constants.js"
import dispatch from "./dispatch/index.js"

export default class Shard extends EventEmitter {
  constructor(token, intents) {
    super()

    this._wsUrl = "wss://gateway.discord.gg/?v=9&encoding=json"
    this._intents = intents
    this._connection = null
    this._interval = null

    this.token = token
  }

  _connect(client) {
    this._connection = new WebSocket(this._wsUrl)

    this._connection.on("open", () => this._connection.send(
      JSON.stringify({
        op: Constants.OPCODES.IDENTIFY,
        d: {
          token: this.token,
          intents: this._intents,
          properties: {
            $os: process.platform.toString(),
            $browser: Constants.LIB,
            $device: Constants.LIB
          }
        }
      })
    ))

    this._connection.on("message", payload => {
      payload = JSON.parse(payload.toString())

      switch (payload.op) {
      case Constants.OPCODES.DISPATCH:
        if (payload.t in dispatch) {
          dispatch[payload.t](payload, client)
        }

        this.emit("raw", payload)
        break

      case Constants.OPCODES.HELLO:
        this._heartbeat(payload.d.heartbeat_interval)
        break
      }
    })
  }

  _disconnect() {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }

    this._connection = null

    this.emit("disconnect")
  }

  _heartbeat(ms) {
    this._interval = setInterval(() => {
      this._connection.send(JSON.stringify({
        op: Constants.OPCODES.HEARTBEAT,
        d: null
      }))
    }, ms)
  }
}