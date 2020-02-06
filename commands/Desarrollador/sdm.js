module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'sdm',
      description: 'Envia un DM a la ID que brindes.',
      usage: prefix => `\`${prefix}sdm <id> <msg>\``,
      examples: prefix => `\`${prefix}sdm 517080439584849961 ¡Hola!\``,
      enabled: true,
      ownerOnly: true,
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
      let user = await client.users.fetch(args[0]);
      if (!user) message.channel.send('Usuario no encontrado.');
      else {
        user.send(args.slice(1).join(' '));
        message.channel.send('Mensaje enviado correctamente a ' + user.tag);
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
