import Shard from "./gateway/Shard.js"
import RequestHandler from "./rest/RequestHandler.js"
import Endpoints from "./rest/Endpoints.js"

import Message from "./struct/Message.js"
import User from "./struct/User.js"
import Embed from "./struct/Embed.js"

export default class Client {
  constructor(intents) {
    this.intents = intents

    this.ws = null
    this.requestHandler = null
    this.user = null
  }

  login(token) {
    if (!token || typeof token != "string") {
      throw new TypeError("Invalid token")
    }

    this.ws = new Shard(token, this.intents)
    this.requestHandler = new RequestHandler(token)

    this.ws._connect(this)
  }

  createMessage(channelId, options) {
    if (typeof options == "string") {
      options = {
        content: options
      }
    } else if (options instanceof Embed) {
      options = {
        embeds: [options]
      }
    }

    return this.requestHandler.request(
      Endpoints.CHANNEL_MESSAGES(channelId), {
        method: "POST",
        body: options
      }
    ).then(data => new Message(data))
  }

  fetchUser(userId) {
    return this.requestHandler.request(
      Endpoints.USER(userId)
    ).then(data => new User(data))
  }

  /**
   * Interaction
   */

  /**
   * Global application commands
   */

  getGlobalCommands() {
    return this.requestHandler.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_REGISTER(
        this.user.id
      ), {
        method: "GET"
      }
    )
  }

  createGlobalCommand(command) {
    return this.requestHandler.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_REGISTER(
        this.user.id
      ), {
        method: "POST",
        body: command
      }
    )
  }

  getGlobalCommand(commandId) {
    return this.requestHandler.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        commandId
      ), {
        method: "GET"
      }
    )
  }

  editGlobalCommand(commandId, newCommand) {
    return this.requestHandler.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        commandId
      ), {
        method: "PATCH",
        body: newCommand
      }
    )
  }

  deleteGlobalCommand(commandId) {
    return this.requestHandler.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        commandId
      ), {
        method: "DELETE"
      }
    )
  }

  overwriteGlobalCommands(commands) {
    return this.requestHandler.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_REGISTER(
        this.user.id
      ), {
        method: "PUT",
        body: commands
      }
    )
  }

  /**
   * Guild application commands
   */

  getGuildCommands(guildId) {
    return this.requestHandler.request(
      Endpoints.GUILD_APPLICATION_COMMAND_REGISTER(
        this.user.id,
        guildId
      ), {
        method: "GET"
      }
    )
  }

  createGuildCommand(guildId, command) {
    return this.requestHandler.request(
      Endpoints.GUILD_APPLICATION_COMMAND_REGISTER(
        this.user.id,
        guildId
      ), {
        method: "POST",
        body: command
      }
    )
  }

  getGuildCommand(guildId, commandId) {
    return this.requestHandler.request(
      Endpoints.GUILD_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        guildId,
        commandId
      ), {
        method: "GET"
      }
    )
  }

  editGuildCommand(guildId, commandId, newCommand) {
    return this.requestHandler.request(
      Endpoints.GUILD_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        guildId,
        commandId
      ), {
        method: "PATCH",
        body: newCommand
      }
    )
  }

  deleteGuildCommand(guildId, commandId) {
    return this.requestHandler.request(
      Endpoints.GUILD_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        guildId,
        commandId
      ), {
        method: "DELETE"
      }
    )
  }

  overwriteGuildCommands(guildId, commands) {
    return this.requestHandler.request(
      Endpoints.GUILD_APPLICATION_COMMAND_REGISTER(
        this.user.id,
        guildId
      ), {
        method: "PUT",
        body: commands
      }
    )
  }
  
  // ---

  createInteractionResponse(interaction, response) {
    return this.requestHandler.request(
      Endpoints.INTERACTION_RESPONSE(
        interaction._id,
        interaction._token
      ), {
        method: "POST",
        body: response
      }
    )
  }
}