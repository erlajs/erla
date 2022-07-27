export default class BitField {
  constructor(bitfield, flags) {
    this.bitfield = bitfield;
    this.flags = flags;
  }

  parse() {
    return Object.entries(this.bitfield)
      .filter(([,bit]) => (this.flags & bit ) == bit)
      .map(([field]) => field);
  }
}