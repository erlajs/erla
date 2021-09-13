/* eslint-disable camelcase */
const Emoji = require('./Emoji')

module.exports = class SelectMenu {
  constructor (data = {}) {
    this.type = 3
    this.placeholder = data.placeholder
    this.custom_id = data.custom_id
    this.options = data.options ?? []
    this.disabled = data.disabled ?? false
  }

  setCustomId (customId) {
    this.custom_id = customId
    return this
  }

  setDisabled () {
    this.disabled = true
    return this
  }

  setPlaceholder (placeholder) {
    this.placeholder = placeholder
    return this
  }

  addOption (label, value, description, emoji) {
    if (emoji) { emoji = new Emoji(emoji) }
    this.options.push({ label, value, description, emoji })
    return this
  }
}
