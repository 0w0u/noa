module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'slap',
      description: 'Regala una cachetada a quien te moleste >.<',
      usage: prefix => `\`${prefix}slap <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['cachetada', 'bofetada'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('No pienses que ta daré una bofetada... c:');
      if (message.mentions.users.first() == client.user) return message.channel.send('Nope, no puedes hacer esto conmigo :sob:');
      if (message.mentions.users.size < 1) return message.channel.send('Te veo muy ansioso... Menciona a alguien *- Saca su mano -*');
      embed
        .setColor('RANDOM')
        .setDescription('**' + message.author.username + '** le regaló una cachetada a **' + message.mentions.users.first().username + '**')
        .setImage(client.replies.slapGifs());
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
