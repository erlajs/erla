const { Avatars } = require('../utils/Constants')
const Base = require('./Base')

module.exports = class User extends Base {
  constructor (data) {
    super(data.id)

    this.username = data.username
    this.discriminator = data.discrim
    this.bot = data.bot
    this.flags = data.flags
    this.avatar = data.avatar
  }

  avatarURL (options) {
    if (this.avatar) {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options?.format || 'png'}?size=${options?.size || '1024'}`
    } else {
      return this.defaultAvatar
    }
  }

  get mention () {
    return `<@${this.id}>`
  }

  get tag () {
    return `${this.username}#${this.discriminator}`
  }

  get defaultAvatar () {
    return Avatars[this.discrim % 5]
  }
}
