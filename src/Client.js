import EventEmitter from 'events'

import GatewaySocket from './gateway/GatewaySocket.js'
import RequestHandler from './http/RequestHandler.js'
import Endpoints from './http/Endpoints.js'

import User from './entities/global/User.js'
import Message from './entities/message/Message.js'

export class Client extends EventEmitter {
  user

  constructor (options = {}) {
    super()

    this.intents = options.intents || 0
  }

  login (token) {
    this.token = token

    this.rest = new RequestHandler(token)
    this.gateway = new GatewaySocket(this)

    this.gateway.connect()
  }

  createMessage (channelId, options) {
    if (typeof options === 'string') {
      options = {
        content: options
      }
    }

    return this.rest.request(
      Endpoints.CHANNEL_MESSAGES(channelId), {
        method: 'POST',
        body: options
      }
    ).then(d => new Message(d))
  }

  fetchUser (userId) {
    return this.rest.request(
      Endpoints.USER(userId)
    ).then(d => new User(d))
  }

  getGlobalCommands () {
    return this.rest.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_REGISTER(
        this.user.id
      ), {
        method: 'GET'
      }
    )
  }

  createGlobalCommand (command) {
    return this.rest.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_REGISTER(
        this.user.id
      ), {
        method: 'POST',
        body: command
      }
    )
  }

  getGlobalCommand (commandId) {
    return this.rest.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        commandId
      ), {
        method: 'GET'
      }
    )
  }

  editGlobalCommand (commandId, newCommand) {
    return this.rest.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        commandId
      ), {
        method: 'PATCH',
        body: newCommand
      }
    )
  }

  deleteGlobalCommand (commandId) {
    return this.rest.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        commandId
      ), {
        method: 'DELETE'
      }
    )
  }

  overwriteGlobalCommands (commands) {
    return this.rest.request(
      Endpoints.GLOBAL_APPLICATION_COMMAND_REGISTER(
        this.user.id
      ), {
        method: 'PUT',
        body: commands
      }
    )
  }

  getGuildCommands (guildId) {
    return this.rest.request(
      Endpoints.GUILD_APPLICATION_COMMAND_REGISTER(
        this.user.id,
        guildId
      ), {
        method: 'GET'
      }
    )
  }

  createGuildCommand (guildId, command) {
    return this.rest.request(
      Endpoints.GUILD_APPLICATION_COMMAND_REGISTER(
        this.user.id,
        guildId
      ), {
        method: 'POST',
        body: command
      }
    )
  }

  getGuildCommand (guildId, commandId) {
    return this.rest.request(
      Endpoints.GUILD_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        guildId,
        commandId
      ), {
        method: 'GET'
      }
    )
  }

  editGuildCommand (guildId, commandId, newCommand) {
    return this.rest.request(
      Endpoints.GUILD_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        guildId,
        commandId
      ), {
        method: 'PATCH',
        body: newCommand
      }
    )
  }

  deleteGuildCommand (guildId, commandId) {
    return this.rest.request(
      Endpoints.GUILD_APPLICATION_COMMAND_EDITOR(
        this.user.id,
        guildId,
        commandId
      ), {
        method: 'DELETE'
      }
    )
  }

  overwriteGuildCommands (guildId, commands) {
    return this.rest.request(
      Endpoints.GUILD_APPLICATION_COMMAND_REGISTER(
        this.user.id,
        guildId
      ), {
        method: 'PUT',
        body: commands
      }
    )
  }

  createInteractionResponse (interaction, options) {
    return this.rest.request(
      Endpoints.INTERACTION_RESPONSE(
        interaction._id,
        interaction._token
      ), {
        method: 'POST',
        body: options
      }
    )
  }
}
