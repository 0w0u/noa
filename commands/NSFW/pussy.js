module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pussy',
      description: 'Mira cosas inapropiadas >.<',
      usage: (prefix) => `\`${prefix}pussy\``,
      examples: (prefix) => `\`${prefix}\``,
      enabled: true,
      nsfwOnly: true,
      voteOnly: true,
      cooldown: 3,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        img = await require('node-superfetch').get(`https://nekos.life/api/v2/img/pussy`);
      embed.setColor(client.fns.selectColor('lightcolors')).setDescription('...').setImage(img.body.url);
      msg.edit('** **', { embed });
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message,
      });
    }
  }
};
