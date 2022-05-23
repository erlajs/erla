import Message from "../../struct/Message.js"

export default function onMessageCreate(payload, client) {
  client.ws.emit("messageCreate", new Message(payload.d))
}