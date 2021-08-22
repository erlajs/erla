const { User } = require('../../structures/')

module.exports = function onReady (payload, _client) {
  _client.user = new User(payload.d.user)

  _client.emit('ready')
}
