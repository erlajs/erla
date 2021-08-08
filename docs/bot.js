const { Service, Intents, RichEmbed } = require("../index");
const service = new Service({
  token: "your_secret_token",
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS]
});

service.on("ready", () => {
  const embed = new RichEmbed()
  .setDescription("Hello my name is"+ service.me.username);
  
  service.sendMessage("your_channel_id", { embed });
});

service.connect();
