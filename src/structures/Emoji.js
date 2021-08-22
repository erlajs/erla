const Base = require('./Base')

module.exports = class Emoji extends Base {
  constructor (data) {
    super(data.id)

    this.name = data.name
    this.animated = data.animated
    this.avaliable = data.avaliable
  }
}
