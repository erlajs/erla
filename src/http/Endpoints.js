export default {
  USER: userId => `/users/${userId}`,
  CHANNEL: channelId => `/channels/${channelId}`,
  CHANNEL_MESSAGES: channelId => `/channels/${channelId}/messages`,

  GLOBAL_APPLICATION_COMMAND_REGISTER: applicationId =>
    `/applications/${applicationId}/commands`,
  GLOBAL_APPLICATION_COMMAND_EDITOR: (applicationId, commandId) =>
    `/applications/${applicationId}/commands/${commandId}`,
  GUILD_APPLICATION_COMMAND_REGISTER: (applicationId, guildId) =>
    `/applications/${applicationId}/guilds/${guildId}/commands`,
  GUILD_APPLICATION_COMMAND_EDITOR: (applicationId, guildId, commandId) =>
    `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,

  INTERACTION_RESPONSE: (interactionId, interactionToken) =>
    `/interactions/${interactionId}/${interactionToken}/callback`
};