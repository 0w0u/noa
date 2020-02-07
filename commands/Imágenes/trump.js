module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'trump',
      description: 'Genera una imagen donde Donald Trump establece una ley.',
      usage: prefix => `\`${prefix}trump <texto>\``,
      examples: prefix => `\`${prefix}trump Tercera guerra mundial.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
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
      if (!args[0]) {
        return message.channel.send('Agrega el texto que trump nos dirá.');
      } else if (args.join(' ').length > 150) {
        return message.channel.send(`El texto no debe rebasar los 150 caracteres.`);
      } else {
        let msg = await message.channel.send(client.replies.reply('generating', message)),
          img = await client.weez.trump(args.join(' '));
        msg.delete();
        message.channel.send({ files: [img] });
      }
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
