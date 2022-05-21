const User = require("../../struct/User")

module.exports = function onReady(payload, client) {
  client.user = new User(payload.d.user)

  client.ws.emit("ready")
}