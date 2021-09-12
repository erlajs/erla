const Base = require('./Base')

module.exports = class Webhook extends Base {
  constructor (data) {
    super(data.id)

    this.username = data.username;
    this.avatar = data.avatar;
    this.guildId = data.guild_id;
    this.channelId = data.channel_id;
    
  }
}
