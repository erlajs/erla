const { EventEmitter } = require('events')

const WebSocketHandler = require('./gateway/WebSocketHandler')
const GatewayIntents = require('./gateway/GatewayIntents')
const RequestHandler = require('./rest/RequestHandler')
const Endpoints = require('./rest/Endpoints')
const Structures = require('./structures')

module.exports = class Client extends EventEmitter {
  constructor (options) {
    super()

    this.requestHandler = new RequestHandler(options.token)
    this.ws = new WebSocketHandler(this, options.token, GatewayIntents.resolve(options.intents))
    this.ready = null

    this.user = null
  }

  connect () {
    this.ws.connect()
    this.ready = Date.now()
  }

  createMessage (channelId, options) {
    return this.requestHandler.request(Endpoints.CHANNEL_MESSAGES(channelId), {
      method: 'POST',
      body: options
    }).then(message =>
      new Structures.Message(message))
  }

  fetchUser (userId) {
    return this.requestHandler.request(Endpoints.USER(userId)).then(user =>
      new Structures.User(user))
  }

  get uptime () {
    return Date.now() - this.ready
  }
}
