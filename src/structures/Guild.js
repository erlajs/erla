const Base = require('./Base')

module.exports = class Guild extends Base {
  constructor (data) {
    super(data.id)

    this.name = data.name
    this.icon = data.icon
    this.description = data.description
    this.splash = data.splash
    this.ownerId = data.owner_id
    this.region = data.region
    this.roles = data.roles ?? []
    this.emojis = data.emojis ?? []
    this.features = data.features ?? []
    this.channels = data.channels ?? []
    this.members = data.members ?? []
  }

  iconURL () {
    if (!this.icon) return
    return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}${
      this.icon.startsWith('a_') ? '.gif' : '.png'
    }?size=1024`
  }
}
