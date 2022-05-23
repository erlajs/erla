import ApplicationCommand from "../../struct/ApplicationCommand.js"

export default function onInteractionCreate(payload, client) {
  client.ws.emit("interactionCreate", new ApplicationCommand({
    ...payload.d.data,
    token: payload.d.token,
    id: payload.d.id
  }))
}