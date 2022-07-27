import Message from '../entities/message/Message.js'

export default function (shard, payload) {
  shard.emit('messageCreate', new Message(payload.d))
}
