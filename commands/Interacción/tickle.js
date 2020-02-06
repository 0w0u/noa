module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'tickle',
      description: 'Hazle cosquillas a tus amigos.',
      usage: prefix => `\`${prefix}tickle <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['cosquillas'],
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
          .setDescription(client.replies.tickleRep(message))
          .setImage(client.replies.tickleGifs());
        message.channel.send({ embed });
        return;
      }
      if (message.mentions.users.first() === client.user) return message.channel.send('Las cosquillas son mi mayor débilidad, no lo hagas por favor :sob:');
      embed
        .setColor('RANDOM')
        .setDescription('**' + message.author.username + '** le está haciendo cosquillas a **' + message.mentions.users.first().username + '**')
        .setImage(client.replies.tickleGifs());
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
