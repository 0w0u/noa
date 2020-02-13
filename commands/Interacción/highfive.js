module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'highfive',
      description: '¡Da los cinco a alguien más. ¡Un saludo especial!',
      usage: prefix => `\`${prefix}highfive <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['chocalas'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('No te puedes dar los cinco tu solo, o ... al menos sería raro');
      if (message.mentions.users.first() === client.user) return message.channel.send('Ahora no, jiji');
      if (message.mentions.users.size < 1) return message.channel.send('¿Con quién deseas dar los cinco?');
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le dio los cinco a **' + message.mentions.users.first().username + '**')
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
