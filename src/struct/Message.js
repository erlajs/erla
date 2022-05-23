import Base from "./Base.js"
import User from "./User.js"

export default class Message extends Base {
  constructor(data) {
    super(data.id)

    this.content = data.content
    this.channelId = data.channel_id
    this.author = new User(data.author)
    this.timestamp = new Date(data.timestamp)
  }
}