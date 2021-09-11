/* eslint-disable camelcase */
const Base = require('./Base')

module.exports = class RichEmbed extends Base {
  constructor (data = {}) {
    super(data.id)

    this.title = data.title
    this.author = data.author
    this.description = data.description
    this.fields = data.fields ?? []
    this.url = data.url
    this.color = data.color
    this.thumbnail = data.thumbnail
    this.image = data.image
    this.timestamp = data.timestamp
    this.footer = data.footer
  }

  /**
 * @name title
 * @param {String} title
 */
  setTitle (title) {
    this.title = title
    return this
  }

  /**
 * @name author
 * @param {String} name
 * @param {String} url
 * @param {String} icon_url
 */
  setAuthor (name, url, icon_url) {
    this.author = { name, url, icon_url }
    return this
  }

  /**
 * @name description
 * @param {String} description
 */
  setDescription (description) {
    this.description = description
    return this
  }

  /**
 * @name field
 * @param {String} name
 * @param {String} value
 * @param {Boolean} inline
 */
  addField (name, value, inline) {
    this.fields.push({ name, value, inline })
    return this
  }

  /**
 * @name url
 * @param {String} url
 */
  setUrl (url) {
    this.url = url
    return this
  }

  /**
 * @name color
 * @param {String} color
 */
  setColor (color) {
    this.color = parseInt(color.replace('#', ''), 16)
    return this
  }

  /**
 * @name thumbnail
 * @param {String} url
 */
  setThumbnail (url) {
    this.thumbnail = { url }
    return this
  }

  /**
 * @name image
 * @param {String} url
 */
  setImage (url) {
    this.image = { url }
    return this
  }

  /**
 * @name footer
 * @param {String} text
 * @param {String} icon_url
 */
  setFooter (text, icon_url) {
    this.footer = { text, icon_url }
    return this
  }

  setTimestamp () {
    this.timestamp = new Date().toISOString()
    return this
  }
}
