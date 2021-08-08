class RichEmbed {
  constructor(data) {
    this.#new(data);
  }

  #new(data) {
    this.title = data?.title;
    this.author = data?.author;
    this.description = data?.description;
    this.fields = data?.fields ?? [];
    this.url = data?.url;
    this.color = data?.color;
    this.thumbnail = data?.thumbnail;
    this.image = data?.image;
    this.timestamp = data?.timestamp;
    this.footer = data?.footer;
  }

  setTitle(value) {
    return this.title = value;
  }

  setAuthor(name, icon_url, url) {
    return this.author = { name, icon_url, url };
  }

  setDescription(value) {
    return this.description = value;
  }

  addField(name, value) {
    return this.fields.push({ name, value });
  }

  setUrl(value) {
    return this.url = value;
  }

  setColor(value) {
    return this.color = value;
  }

  setThumbnail(url) {
    return this.thumbnail = { url };
  }

  setImage(url) {
    return this.image = { url };
  }

  setTimestamp(value) {
    return this.timestamp = value;
  }

  setFooter(text, icon_url) {
    return this.footer = { text, icon_url };
  }
}

module.exports = RichEmbed;