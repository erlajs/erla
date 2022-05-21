const Shard = require("./gateway/Shard")
const RequestHandler = require("./rest/RequestHandler")
const Endpoints = require("./rest/Endpoints")

const Message = require("./struct/Message")
const User = require("./struct/User")

module.exports = class Client {
  constructor(intents) {
    this.intents = intents

    this.ws = null
    this.requestHandler = null
    this.user = null
  }

  login(token) {
    const tokenExpr = /[\w-]{24}\.[\w-]{6}\.[\w-]{27}/

    if (!token || typeof token != "string" || !tokenExpr.test(token)) {
      throw new TypeError("Invalid token")
    }

    this.ws = new Shard(token, this.intents)
    this.requestHandler = new RequestHandler(token)

    this.ws._connect(this)
  }

  createMessage(channelId, options) {
    return this.requestHandler.request(
      Endpoints.CHANNEL_MESSAGES(channelId), {
        method: "POST",
        body: options
      }
    ).then(data => new Message(data))
  }

  fetchUser(userId) {
    return this.requestHandler.request(
      Endpoints.USER(userId)
    ).then(data => new User(data))
  }
}