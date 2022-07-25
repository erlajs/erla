import ApplicationCommandOptions from './ApplicationCommandOptions.js';

export default class ApplicationCommandData {
  constructor(data) {
    this.type = data.type;
    this.options = data.options?.map(option => new ApplicationCommandOptions(option));
    this.name = data.name;
    this.id = data.id;
    this.guildId = data.guild_id;
  }
}