export default class BitField {
  #bitfield

  constructor (bitfield, flags) {
    this.#bitfield = bitfield
    this.value = flags
  }

  parse () {
    return Object.entries(this.#bitfield)
      .reduce((entries, [field, bit]) => {
        if ((this.value & bit) === bit) {
          entries.push(field)
        }

        return entries
      }, [])
  }
}
