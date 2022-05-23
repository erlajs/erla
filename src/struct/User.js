import Base from "./Base.js"
import Constants from "../util/Constants.js"

export default class User extends Base {
  constructor(data) {
    super(data.id)

    this.username = data.username
    this.discrim = data.discriminator
    this.bot = data.bot || false
    this.avatar = data.avatar
    this.banner = data.banner
  }

  get tag() {
    return `${this.username}#${this.discrim}`
  }

  get defaultAvatar() {
    return Constants.DEFAULT_AVATARS[this.discrim % 5]
  }

  avatarURL(options) {
    if (this.avatar) {
      const format = options?.format || "png"
      const size = options?.size || 1024

      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${format}?size=${size}`
    } else {
      return this.defaultAvatar
    }
  }
}