module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'cum',
      description: 'Corre como un caballo >.<',
      usage: prefix => `\`${prefix}cum [@usuario]\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      nsfwOnly: true,
      voteOnly: true,
      cooldown: 3,
      aliases: ['happyend'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author || !message.mentions.users.first()) {
        embed
          .setColor('RANDOM')
          .setDescription('**' + message.author.username + '** se corrió... O al menos lo intenta.')
          .setImage(client.replies.cumGifs());
        message.channel.send({ embed });
        return;
      } else if (message.mentions.users.first() === client.user) {
        return message.channel.send('En mi no por favor >.<');
      } else {
        embed
          .setColor('RANDOM')
          .setDescription('**' + message.author.username + '** se corrió en **' + message.mentions.users.first().username + '**')
          .setImage(client.replies.biteGifs());
        message.channel.send({ embed });
      }
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
