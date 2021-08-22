const Base = require('./Base')

module.exports = class DMChannel extends Base {
  constructor (data) {
    super(data.id)

    this.type = data.type
  }
}
