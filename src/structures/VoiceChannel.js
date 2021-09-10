const Base = require('./Base')

module.exports = class VoiceChannel extends Base {
  constructor (data) {
    super(data.id)

    this.type = data.type
    this.name = data.name
    this.guildId = data.guild_id
    this.bitrate = data.bitrate
    this.position = data.position
    this.parentId = data.parent_id
  }
}
