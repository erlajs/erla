import Shard from "./gateway/Shard.js"
import RequestHandler from "./rest/RequestHandler.js"
import Endpoints from "./rest/Endpoints.js"

import Message from "./struct/Message.js"
import User from "./struct/User.js"

export default class Client {
  constructor(intents) {
    this.intents = intents

    this.ws = null
    this.requestHandler = null
    this.user = null
  }

  login(token) {
    if (!token || typeof token != "string") {
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