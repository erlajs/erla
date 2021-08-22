const { Message } = require('../../structures/')

module.exports = function onMessageCreate (payload, _client) {
  _client.emit('messageCreate', new Message(payload.d))
}
