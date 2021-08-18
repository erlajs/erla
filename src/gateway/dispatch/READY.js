const Structures = require('../../structures/')

module.exports = function onReady (payload, _client) {
  _client.user = new Structures.User(payload.d.user)

  _client.emit('ready')
}
