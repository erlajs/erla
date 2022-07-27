import ApplicationCommand from '../entities/interaction/ApplicationCommand.js'

export default function (shard, payload) {
  shard.emit('interactionCreate', new ApplicationCommand(payload.d))
}
