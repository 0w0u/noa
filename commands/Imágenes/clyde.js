module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'clyde',
      description: 'Genera una imagen donde clyde escribe un mensaje.',
      usage: prefix => `\`${prefix}clyde <texto>\``,
      examples: prefix => `\`${prefix}clyde\``,
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
      if (!args[0] || args.join(' ').length < 3) {
        return message.channel.send('Ingresa el texto que Clyde repetirá, recuerda que debe ser mayor a 3 caracteres.');
      } else if (args.join(' ').length > 70) {
        return message.channel.send('No puedes sobrepasar los 70 caracteres.');
      } else {
        let img = await require('node-superfetch').get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(' ')}`),
          msg = await message.channel.send(client.replies.generatingSomething(message));
        msg.delete();
        message.channel.send({ files: [img.body.message] });
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
