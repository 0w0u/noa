module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'kirby',
      description: 'Comando especial de: fayaarx#8479. ¡Obtén tu propio comando especial donando al bot o en el servidor de soporte!',
      usage: prefix => `\`${prefix + this.help.name}\``,
      examples: prefix => `\`${prefix + this.help.name}\``,
      enabled: true,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!['348683994474217472'].includes(message.author.id)) message.channel.send(client.message({ emoji: 'red', razón: '¡no tienes acceso a este comando!\n¡Obtén tu propio comando en el servidor de soporte!', message }));
      else {
        embed.setImage('https://cdn.discordapp.com/attachments/679040340564639751/682245181512220725/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.jpeg').setColor(client.fns.selectColor('lightcolors'));
        message.channel.send({ embed });
      }
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message
      });
    }
  }
};
