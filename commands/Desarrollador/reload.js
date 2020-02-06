module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'reload',
      description: 'Recarga todos los comandos o uno en específico.',
      usage: prefix => `\`${prefix}reload [comando]\``,
      examples: prefix => `\`${prefix}reload\n${prefix}reload blacklist\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 4,
      aliases: ['refresh', 'restart', 'r'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
        message.channel.send(`<a:yuirefresh:651513015274962984> | **${message.author.username}**, refrescando datos... Por favor espera unos segundos.`);
        setTimeout(() => process.exit(), 1500);
      } else {
        let cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) {
          return message.channel.send('Comando no encontrado.');
        } else {
          await client.unloadCommand(cmd.config.location, cmd.help.name);
          await client.loadCommand(cmd.config.location, cmd.help.name);
          return message.channel.send(':white_check_mark: **' + message.author.username + '**, ¡el comando `' + cmd.help.name + '` ha sido recargado!');
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
