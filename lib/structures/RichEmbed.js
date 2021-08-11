class RichEmbed {
  constructor (data) {
    this.#new(data)
  }

  #new (data) {
    this.title = data?.title
    this.author = data?.author
    this.description = data?.description
    this.fields = data?.fields ?? []
    this.url = data?.url
    this.color = data?.color
    this.thumbnail = data?.thumbnail
    this.image = data?.image
    this.timestamp = data?.timestamp
    this.footer = data?.footer
  }

  setTitle (value) {
    this.title = value
    return this
  }

  setAuthor (name, iconUrl, url) {
    this.author = { name, iconUrl, url }
    return this
  }

  setDescription (value) {
    this.description = value
    return this
  }

  addField (name, value) {
    this.fields.push({ name, value })
    return this
  }

  setUrl (value) {
    this.url = value
    return this
  }

  setColor (value) {
    this.color = value
    return this
  }

  setThumbnail (url) {
    this.thumbnail = { url }
    return this
  }

  setImage (url) {
    this.image = { url }
    return this
  }

  setTimestamp (value) {
    this.timestamp = value
    return this
  }

  setFooter (text, iconUrl) {
    this.footer = { text, iconUrl }
    return this
  }
}

module.exports = RichEmbed
