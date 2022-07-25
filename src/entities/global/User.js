import Base from '../Base.js';

export default class User extends Base {
  constructor(d) {
    super(d.id);

    this.username = d.username;
    this.discrim = d.discriminator;
    this.bot = d.bot || false;
    this.avatar = d.avatar;
    this.banner = d.banner;
  }

  get tag() {
    return `${this.username}#${this.discrim}`;
  }
}