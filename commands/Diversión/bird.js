module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'bird',
      description: 'Genera un lindo pájaro. 🐦',
      usage: prefix => `\`${prefix}bird\``,
      examples: prefix => `\`${prefix}bird\``,
      enabled: true,
      aliases: ['pájaro'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let img = await require('node-superfetch').get('http://random.birb.pw/tweet/'),
        msg = await message.channel.send(new (require('discord.js')).MessageEmbed().setColor(client.functions.selectColor('lightcolors')).setDescription(client.replies.generatingSomething(message)));
      embed
        .setColor(client.functions.selectColor('lightcolors'))
        .setAuthor('¡Pío Pío! |⁰⊖⁰)', 'https://i.imgur.com/E8fKH5q.png')
        .setImage(`https://random.birb.pw/img/${img.body}`);
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
