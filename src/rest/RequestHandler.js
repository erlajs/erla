const HTTPS = require('./HTTPS')
const Constants = require('../utils/Constants')

module.exports = function RequestHandler (token) {
  const host = 'discord.com'

  function makePath (endpoint) {
    return '/api/v9' + endpoint
  }

  this.request = function (path, options = {
    host,
    method: 'GET'
  }) {
    const _options = {
      host: options.host || host,
      path: options.path || makePath(path),
      method: options.method || 'GET',
      body: options.body || null,
      headers: {
        Authorization: 'Bot ' + token.replace(/Bot\s?/, ''),
        'User-Agent': Constants.UserAgent,
        'Content-Type': 'application/json'
      }
    }

    return HTTPS.makeRequest(_options)
  }

  return this
}
