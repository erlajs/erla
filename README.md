# Erla
JavaScript abstractions for Discord API

# Getting Started
```js
const { Client } = require("erla");
const client = new Client();

client.on("messageCreate", (message) => {
  if(message.content === "!ping")
    await client.createMessage(message.channelId, "Hello, ErlaJS!")
})
```
