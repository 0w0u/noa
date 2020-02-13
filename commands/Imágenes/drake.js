module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'drake',
      description: 'Genera el meme de Drake "Yes / No" con tu avatar y el de otro usuario mencionado',
      usage: prefix => `\`${prefix}drake <@usuario>\``,
      examples: prefix => `\`${prefix}drake @Momo#8289\``,
      enabled: true,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let mentionedUser = message.mentions.users.first();
      if (message.mentions.users.size < 1 || !args[0]) message.channel.send(client.fns.message({ emoji: 'red', razón: 'noargs necesitas mencionar a alguien', usage: this.help.usage(message.prefix), message }));
      else if (mentionedUser == message.author) message.channel.send('Intenta con otro usuario');
      else {
        let msg = await message.channel.send(client.fns.reply('generating', message)),
          img = await client.weez.drake(message.author.displayAvatarURL({ format: 'png', size: 2048 }), mentionedUser.displayAvatarURL({ format: 'png', size: 2048 }));
        msg.delete();
        message.channel.send({ files: [img] });
      }
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message
      });
    }
  }
};
