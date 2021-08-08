const { Client, Intents, RichEmbed } = require("../index");
const client = new Client({
  token: "your_secret_token",
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS]
});

client.on("ready", () => {
  const embed = new RichEmbed()
    .setDescription(`Hello my name is ${client.me.username}`);
  
  client.sendMessage("your_channel_id", { embed });
});

client.connect();
