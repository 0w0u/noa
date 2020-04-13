module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'feed',
      description: 'Comparte tu comida con alguien más',
      usage: prefix => `\`${prefix}feed <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['alimentar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      message.channel.send(client.message({ emoji: ':microbe:', razón: '¡evita transmitir el **covid-19**!', message }));
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'sad', razón: `si quieres comer usa \`${message.prefix}eat\` u.u`, usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() == client.user) return message.channel.send(client.message({ emoji: 'heart', razón: 'gracias pero, no tengo hambre', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas mencionar a alguien para alimentarlo', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le dio de comer a **' + message.mentions.users.first().username + '**')
        .setImage(client.fns.gifs(this.help.name));
      message.channel.send({ embed });
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
