module.exports = class RichEmbed {
  constructor (data) {
    this.title = data?.title ?? null
    this.author = data?.author ?? null
    this.description = data?.description ?? null
    this.fields = data?.fields ?? []
    this.url = data?.url ?? null
    this.color = data?.color ?? null
    this.thumbnail = data?.thumbnail ?? null
    this.image = data?.image ?? null
    this.timestamp = data?.timestamp ?? null
    this.footer = data?.footer ?? null
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
