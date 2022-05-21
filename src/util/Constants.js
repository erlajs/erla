const package = require("../../package.json")

const repo = "https://github.com/erlajs/erla"

module.exports.LIB = package.name
module.exports.PROJ_VERSION = package.version
module.exports.VERSION = "9"

module.exports.OPCODES = {
  DISPATCH: 0,
  HEARTBEAT: 1,
  IDENTIFY: 2,
  STATUS_UPDATE: 3,
  VOICE_STATE_UPDATE: 4,
  VOICE_GUILD_PING: 5,
  RESUME: 6,
  RECONNECT: 7,
  REQUEST_GUILD_MEMBERS: 8,
  INVALID_SESSION: 9,
  HELLO: 10,
  HEARTBEAT_ACK: 11
}

module.exports.DEFAULT_AVATARS = [
  "https://cdn.discordapp.com/embed/avatars/0.png",
  "https://cdn.discordapp.com/embed/avatars/1.png",
  "https://cdn.discordapp.com/embed/avatars/2.png",
  "https://cdn.discordapp.com/embed/avatars/3.png",
  "https://cdn.discordapp.com/embed/avatars/4.png"
]

module.exports.DEFAULT_HEADERS = token => {
  token = token.replace(/Bot\s?/, "")

  return {
    Authorization: `Bot ${token}`,
    "User-Agent": `Erla (${repo} ${module.exports.PROJ_VERSION})`
  }
}