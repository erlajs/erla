import WebSocket from 'ws'
import EventEmitter from 'events'

import { EVENTS } from '../actions/index.js'
import { IDENTIFICATION, OPCODES } from '../util/Constants.js'

export default class GatewaySocket extends EventEmitter {
  #wsUrl = 'wss://gateway.discord.gg/?v=10&encoding=json'
  #shard = null
  #connection = null
  #interval = null
  #token
  #intents

  constructor (shard) {
    super()

    this.#shard = shard
    this.#token = shard.token
    this.#intents = shard.intents
  }

  connect () {
    this.#connection = new WebSocket(this.#wsUrl)

    this.#connection.on('open', () => this.#openConnection())
    this.#connection.on('message', payload => this.#handleMessage(payload))
    this.#connection.on('close', () => this.#autoReconnect())
    this.#connection.on('error', err => this.#handleError(err))
  }

  disconnect () {
    this.#interval ||= clearInterval(this.#interval)
    this.#connection = null

    this.shard.emit('disconnect')
  }

  #openConnection () {
    this.#connection.send(
      JSON.stringify({
        op: OPCODES.IDENTIFY,
        d: {
          token: this.#token,
          intents: this.#intents,
          properties: {
            $os: process.platform.toString(),
            $browser: IDENTIFICATION,
            $device: IDENTIFICATION
          }
        }
      }))
  }

  #handleMessage (payload) {
    payload = JSON.parse(payload.toString())

    switch (payload.op) {
      case OPCODES.DISPATCH:
        if (payload.t in EVENTS) {
          const event = EVENTS[payload.t]
          event(this.#shard, payload)
        }

        this.#shard.emit('raw', payload)
        break

      case OPCODES.HELLO:
        this.#heartbeat(payload.d.heartbeat_interval)
        break
    }
  }

  #autoReconnect () {
    this.#connection.terminate()
    clearInterval(this.#interval)
    this.#connection.removeAllListeners()

    this.connect()
  }

  #handleError () {
    this.#connection.terminate()
  }

  #heartbeat (ms) {
    this.#interval = setInterval(() => {
      this.#connection.send(JSON.stringify({
        op: OPCODES.HEARTBEAT,
        d: null
      }))
    }, ms)
  }
}
