import Base from '../Base.js'

export default class Guild extends Base {
  constructor (d) {
    super(d.id)

    this.name = d.name
  }
}
