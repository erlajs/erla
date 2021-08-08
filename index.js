const Client = require("./lib/Client");
const RichEmbed = require("./lib/structures/RichEmbed");
const { INTENTS } = require("./lib/util/Constants");

module.exports = {
  Client,
  RichEmbed,
  Intents: INTENTS
};