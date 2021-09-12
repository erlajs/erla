/* eslint-disable camelcase */
const Emoji = require('./Emoji')

const MessageButtonStyles = {
  PRIMARY: 1,
  SECUNDARY: 2,
  SUCCESS: 3,
  DANGER: 4,
  LINK: 5
}

module.exports = class MessageButton {
  constructor (data = {}) {
    this.type = 2
    this.label = data.label
    this.custom_id = data.custom_id
    this.style = data.style
    this.emoji = data.emoji
    this.url = data.url
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

  setEmoji (emoji) {
    this.emoji = new Emoji(emoji)
    return this
  }

  setLabel (label) {
    this.label = label
    return this
  }

  setStyle (style) {
    this.style = MessageButtonStyles[style]
    return this
  }

  setUrl (url) {
    this.url = url
    return this
  }
}
