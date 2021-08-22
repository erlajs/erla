const Base = require('./Base')

module.exports = class GuildMember extends Base {
  constructor (data) {
    super(data.id)

    this.roles = data.roles
    this.permissions = data.permissions
    this.nickname = data.nick
  }
}
