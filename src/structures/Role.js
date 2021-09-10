const Base = require('./Base')

module.exports = class Role extends Base {
  constructor (data) {
    super(data.id)

    this.name = data.name
    this.guildId = data.guild_id
    this.color = data.color
    this.hoist = data.hoist
    this.mentionable = data.mentionable
    this.position = data.position
  }
}
