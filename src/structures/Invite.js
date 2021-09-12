const Base = require('./Base')

module.exports = class Invite extends Base {
  constructor (data) {
    super(data.id)

    this.guildId = data.guild_id;
    this.code = data.code;
    this.maxAge = data.max_age ?? null;
    this.uses = data.uses ?? null;
    
  }
}
