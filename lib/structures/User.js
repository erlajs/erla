const { DEFAULT_AVATARS } = require("../util/Constants");

class User {
  constructor(data) {
    this.username = data.username;
    this.discrim = data.discrim;
    this.id = data.id;
    this.verified = data.verified;
    this.email = data.email;
    this.bot = data.bot;
    this.flags = data.flags;
    this.avatar = data.avatar;
  }

  avatarURL() {
    return this.avatar ?? DEFAULT_AVATARS[this.discrim % 5];
  }
}

module.exports = User;