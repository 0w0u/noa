module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'afk',
      description: 'Utilizalo cuando te pongas en estado ausente para que los demás sepan que no estás disponible',
      usage: (prefix) => `\`${prefix}afk [motivo]\``,
      examples: (prefix) => `\`${prefix}afk Durmiendo 💤\``,
      enabled: true,
      cooldown: 3,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!client.afk.get(message.author.id)) {
        client.afk.set(message.author.id, { reason: args[0] ? args.join(' ') : 'AFK' });
        message.channel.send(client.message({ emoji: 'green', razón: (args.join(' ').length > 50 ? 'qué cosa tan rara te paso, pero bueno, te pusiste AFK por:' : 'te pusiste AFK por:') + (args[0] ? args.join(' ') : 'AFK'), usage: this.help.usage(message.prefix), message }));
      }
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
