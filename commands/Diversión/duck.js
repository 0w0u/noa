module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'duck',
      description: 'Genera un lindo patito. 🦆',
      usage: prefix => `\`${prefix}duck\``,
      examples: prefix => `\`${prefix}duck\``,
      enabled: true,
      aliases: ['pato', 'patito'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let img = await require('node-superfetch').get('https://random-d.uk/api/v1/random?type=gif'),
        msg = await message.channel.send(new (require('discord.js').MessageEmbed)().setColor(client.functions.selectColor('lightcolors')).setDescription(client.replies.reply('generating', message)));
      embed
        .setColor(client.functions.selectColor('lightcolors'))
        .setAuthor('¡Cuack! ( ՞ ਊ ՞ )', 'https://i.imgur.com/GUsoS5P.png')
        .setImage(img.body.url);
      msg.edit({ embed });
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
