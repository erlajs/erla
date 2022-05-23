import Base from "./Base.js"
import ApplicationCommandOptions from "./ApplicationCommandOptions.js"

export default class ApplicationCommand extends Base {
  constructor(data) {
    super(data.id)

    this.type = data.type
    this.options = data.options.map(option => new ApplicationCommandOptions(option))
    this.name = data.name
    this._id = data.id
    this._token = data.token
  }
}