module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'bunny',
      description: 'Genera la imagen de un lindo conejo. 🐰',
      usage: prefix => `\`${prefix}bunny\``,
      examples: prefix => `\`${prefix}bunny\``,
      enabled: true,
      aliases: ['conejo', 'conejito'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let img = await require('node-superfetch').get('https://api.bunnies.io/v2/loop/random/?media=gif,png'),
        msg = await message.channel.send(new (require('discord.js')).MessageEmbed().setColor(client.functions.selectColor('lightcolors')).setDescription(client.replies.generatingSomething(message)));
      embed
        .setColor(client.functions.selectColor('lightcolors'))
        .setAuthor('¡Conejito! (=^_^=)', 'https://i.imgur.com/N1aywMS.png')
        .setImage(img.body.media.gif);
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
