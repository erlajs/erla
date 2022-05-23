import User from "../../struct/User.js"

export default function onReady(payload, client) {
  client.user = new User(payload.d.user)

  client.ws.emit("ready")
}