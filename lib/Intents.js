class Intents {
  static resolve (intents) {
    return intents.reduce((prev, curr) => prev + curr)
  }
}

module.exports = Intents
