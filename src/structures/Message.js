const Base = require('./Base')

module.exports = class Message extends Base {
  constructor (data) {
    super(data.id)

    this.content = data.content
    this.guildId = data.guild_id
    this.channelId = data.channel_id
    this.memberId = data.author.id
  }
}
