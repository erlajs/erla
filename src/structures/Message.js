const Base = require('./Base')
const User = require('./User')

module.exports = class Message extends Base {
  constructor (data) {
    super(data.id)

    this.content = data.content
    this.guildId = data.guild_id
    this.channelId = data.channel_id
    if (data.author) {
      this.author = new User(data.author)
    }
  }
}
