import Message from '../entities/message/Message.js'

export default function (client, payload) {
  client.emit('messageCreate', new Message(payload.d))
}
