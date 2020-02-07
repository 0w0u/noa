module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'kiss',
      description: 'Dale un pequeño beso a quién tanto amas. <3',
      usage: prefix => `\`${prefix}kiss <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['besar'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('No te puedes dar un beso solo... Es solamente raro');
      if (message.mentions.users.first() == client.user) return message.channel.send('Ahora mismo no quiero que me beses!');
      if (message.mentions.users.size < 1) return message.channel.send('El amor fluye... ¡Es hora de dar un beso! Así que menciona a tu pareja');
      embed
        .setColor(client.functions.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le dio un beso a **' + message.mentions.users.first().username + '**')
        .setImage(client.replies.kissGifs());
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
