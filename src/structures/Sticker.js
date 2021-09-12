const Base = require('./Base')

module.exports = class Sticker extends Base {
  constructor (data) {
    super(data.id)

    this.id = data.id;
    this.name = data.name;
    this.available = data.available ?? null;
    this.guildId = data.guild_id ?? null;
  }
}
