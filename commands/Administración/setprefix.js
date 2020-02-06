module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'setprefix',
      description: 'Cambia el prefijo del servidor.',
      usage: prefix => `\`${prefix}setprefix <prefijo>\``,
      examples: prefix => `\`${prefix}setprefix !!\``,
      enabled: true,
      guildOnly: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: ['MANAGE_GUILD'],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
        message.channel.send(client.demo.error + ' | **' + message.author.username + '**, necesitas especificar algún prefijo.');
      } else {
        if (args[0].length >= 10) {
          message.channel.send(client.demo.error + ' | **' + message.author.username + '**, el prefijo no puede exceder los 10 caracteres.');
        } else {
          message.channel.send('**' + message.author.username + '**, el prefijo del servidor ha sido cambiado a `' + args[0] + '`');
          data.guild.prefix = args[0];
          data.guild.save();
        }
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
