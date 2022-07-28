import User from '../entities/global/User.js'

export default function (client, payload) {
  client.user = new User(payload.d.user)

  client.emit('ready')
}
