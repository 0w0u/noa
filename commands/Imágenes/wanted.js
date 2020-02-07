module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'wanted',
      description: 'Genera un avatar con un avatar en un postér de "El más búscado".',
      usage: prefix => `\`${prefix}wanted [@usuario]\``,
      examples: prefix => `\`${prefix}wanted\``,
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
    const { sepia } = require('../../base/utils/Canvas');
    try {
      let msg = await message.channel.send(client.replies.reply('generating', message)),
        avatar = await require('canvas').loadImage((message.mentions.users.first() || message.author).displayAvatarURL({ format: 'jpg' })),
        base = await require('canvas').loadImage('https://i.imgur.com/nW3Ta8p.png'),
        canvas = require('canvas').createCanvas(base.width, base.height),
        ctx = canvas.getContext('2d');
      ctx.drawImage(base, 0, 0);
      ctx.drawImage(avatar, 150, 360, 430, 430);
      sepia(ctx, 150, 360, 430, 430);
      msg.delete();
      message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'wanted.png' }] });
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
