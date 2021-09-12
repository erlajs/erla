module.exports = class GatewayIntents {
  static resolve (intents) {
    return typeof intents === 'number' ? intents : intents.reduce((a, b) => a + b)
  }
}
