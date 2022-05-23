export default class Embed {
  constructor(data = {}) {
    this.title = data.title
    this.author = data.author
    this.description = data.description
    this.fields = data.fields || []
    this.url = data.url
    this.color = data.color
    this.thumbnail = data.thumbnail
    this.image = data.image
    this.timestamp = data.timestamp
    this.footer = data.footer
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setAuthor(name, url, icon_url) {
    this.author = {
      name,
      url,
      icon_url
    }
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  addField(name, value, inline) {
    this.fields.push({
      name,
      value,
      inline
    })
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setColor(color) {
    this.color = parseInt(color.replace("#", ""), 16)
    return this
  }

  setThumbnail(url) {
    this.thumbnail = { url }
    return this
  }

  setImage(url) {
    this.image = { url }
    return this
  }

  setFooter(text, icon_url) {
    this.footer = {
      text,
      icon_url
    }
    return this
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp || new Date().toISOString()
    return this
  }
}