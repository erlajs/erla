const Message = require("../../struct/Message")

module.exports = function onMessageCreate(payload, client) {
  client.ws.emit("messageCreate", new Message(payload.d))
}