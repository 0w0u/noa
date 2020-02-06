module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'support',
      description: 'Únete al servidor de soporte.',
      usage: prefix => `\`${prefix}support\``,
      examples: prefix => `\`${prefix}support\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      cooldown: 2.5,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      message.channel.send(`Aquí está la invitación a mi servidor de soporte ヽ(^◇^*)/\n\n>> Únete: ${client.config.support}`);
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
