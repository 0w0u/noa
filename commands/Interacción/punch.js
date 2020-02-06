module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'punch',
      description: 'Regala un pequeño pero gran golpe a tu adversario.',
      usage: prefix => `\`${prefix}punch <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['golpear'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('No te puedes pegar solo...');
      if (message.mentions.users.first() === client.user) return message.channel.send('No me golpees por favor T-T');
      if (message.mentions.users.size < 1) return message.channel.send('¡Anda! Tienes ganas de golpear a alguien, pero no sabes a quien. Menciona al afortunado!');
      embed
        .setColor('RANDOM')
        .setDescription('**' + message.author.username + '** golpeó a **' + message.mentions.users.first().username + '**')
        .setImage(client.replies.punchGifs());
      message.channel.send({ embed });
    } catch (e) {
      message.channel.send(message.error(e));
      client.err({
        type: 'command',
        name: this.help.name,
        error: e
      });
    }
  }
};
