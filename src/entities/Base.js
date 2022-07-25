export default class Base {
  constructor(id) {
    this.id = id;
  }

  get createdAt() {
    return Math.floor(this.id / 4194304) + 1420070400000;
  }
}