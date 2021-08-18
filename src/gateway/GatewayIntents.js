module.exports = class GatewayIntents {
  static resolve (intents) {
    if (typeof intents === 'number') {
      return intents
    } else {
      let intent = 0

      for (let pos = 0; pos < intents.length; pos++) {
        intent += intents[pos]
      }

      return intent
    }
  }
}
