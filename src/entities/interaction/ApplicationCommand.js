import ApplicationCommandData from './ApplicationCommandData.js'

export default class ApplicationCommand {
  constructor (d) {
    this.type = d.type
    this.token = d.token
    this.data = new ApplicationCommandData(d.data)
  }
}
