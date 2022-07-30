export default class Collection extends Map {
  add (id, value, patch = true) {
    if (this.has(id) && !patch) {
      return this.get(id)
    }

    return this.set(id, value)
  }

  remove (id) {
    const value = this.get(id)

    if (value) {
      this.delete(id)

      return value
    }
  }

  find (fn) {
    for (const item of this.values()) {
      if (fn(item)) {
        return item
      }
    }
  }

  filter (fn) {
    const items = []

    for (const item of this.values()) {
      if (fn(item)) {
        items.push(item)
      }
    }

    return items
  }

  map (fn) {
    const items = []

    for (const item of this.values()) {
      items.push(fn(item))
    }

    return items
  }

  every (fn) {
    for (const item of this.values()) {
      if (!fn(item)) {
        return false
      }
    }

    return true
  }

  some (fn) {
    for (const item of this.values()) {
      if (fn(item)) {
        return true
      }
    }

    return false
  }
}
