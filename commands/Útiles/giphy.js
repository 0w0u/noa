module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'giphy',
      description: 'Encuentra un gif al azar de tu elección. (No siempre encuentra lo que buscas)',
      usage: prefix => `\`${prefix}giphy <busqueda>\``,
      examples: prefix => `\`${prefix}giphy Leones\``,
      enabled: true,
      cooldown: 4,
      aliases: ['gif'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send('Agrega el nombre del GIF que quieres buscar x_x');
      else {
        let gif = await require('gif-search').random(args[0]),
          randomcolor = (((1 << 24) * Math.random()) | 0).toString(16);
        embed
          .setColor(client.functions.selectColor('lightcolors'))
          .setImage(gif)
          .setAuthor('🔍 ' + args.join(' ') + '', message.author.displayAvatarURL());
        message.channel.send({ embed });
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
