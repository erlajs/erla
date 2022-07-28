import ApplicationCommand from '../entities/interaction/ApplicationCommand.js'

export default function (client, payload) {
  client.emit('interactionCreate', new ApplicationCommand(payload.d))
}
