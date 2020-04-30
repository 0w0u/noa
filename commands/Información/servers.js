module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'servers',
      description: 'Conteo de servidores y usuarios que apoyan a ' + require('../../config').bot,
      usage: (prefix) => `\`${prefix}servers\``,
      examples: (prefix) => `\`${prefix}servers\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      message.channel.send(client.message({ emoji: 'heart', razón: `servidores de ${client.config.bot}\n**${client.guilds.cache.size.toLocaleString()}** servidores y **${client.userCount.toLocaleString()}** usuarios`, message }));
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
