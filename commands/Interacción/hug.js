module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'hug',
      description: 'Demuestra tu cariño, abrazando a un usuario.',
      usage: prefix => `\`${prefix}hug <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: [],
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
          .setDescription(client.replies.reply('hug', message))
          .setColor('RANDOM')
          .setImage(client.replies.hugGifs());
        message.channel.send(embed);
        return;
      }
      if (message.mentions.users.first() == client.user) return message.channel.send('Aprecio tu cariño, pero no quiero un abrazo.');
      if (message.mentions.users.size < 1) return message.channel.send('¡Vamos, se cariñoso y menciona a alguien para abrazarlo!');
      embed
        .setColor('RANDOM')
        .setDescription('**' + message.author.username + '** abrazó a **' + message.mentions.users.first().username + '**')
        .setImage(client.replies.hugGifs());
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
