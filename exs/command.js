module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: '',
      description: '',
      usage: (prefix) => `\`${prefix + this.help.name}\``,
      examples: (prefix) => `\`${prefix + this.help.name}\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      voteOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message,
      });
    }
  }
};
