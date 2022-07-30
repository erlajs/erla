export default class BitField {
  #bitfield

  constructor (bitfield, flags) {
    this.#bitfield = bitfield
    this.value = flags
  }

  parse () {
    return Object.entries(this.#bitfield)
      .filter(([, bit]) => (this.value & bit) === bit)
      .map(([field]) => field)
  }
}
