module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'treasure',
      description: 'Genera una imagen con un avatar y un meme del tesoro.',
      usage: prefix => `\`${prefix}treasure [@usuario]\``,
      examples: prefix => `\`${prefix}treasure\``,
      enabled: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.replies.generatingSomething(message)),
        i = (message.mentions.users.first() || message.author).displayAvatarURL({ format: 'png', size: 2048 }),
        img = await require('node-superfetch').get(`https://eclyssia-api.tk/api/v1/treasure?url=${i}`),
        att = new (require('discord.js')).MessageAttachment(img.raw);
      msg.delete();
      message.channel.send(att);
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
