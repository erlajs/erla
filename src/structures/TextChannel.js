const Base = require('./Base')

module.exports = class TextChannel extends Base {
  constructor (data) {
    super(data.id)

    this.type = data.type
    this.name = data.name
    this.topic = data.topic
    this.nsfw = data.nsfw
    this.guildId = data.guild_id
    this.lastMessageId = data.last_message_id
    this.position = data.position
    this.parentId = data.parent_id
  }
}
