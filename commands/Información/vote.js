module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'vote',
      description: '¡Apóyame con tu voto en Discord Bot List!',
      usage: prefix => `\`${prefix}vote\``,
      examples: prefix => `\`${prefix}vote\``,
      enabled: true,
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
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setAuthor('Pasos para votar en Discord Bot List', client.user.avatarURL())
        .setDescription('¡Gracias por interesarte en ayudarme! Lo único que debes hacer es [entrar al siguiente link.](https://discordbots.org/bot/477950798949646336/vote) y presionar el botón de `Vote for this bot`. Y listo, ya me habrás brindado un voto de apoyo :3')
        .setFooter(client.config.bot + ' | Cada vez que votas por mi, me apoyas mucho', message.author.avatarURL());
      message.channel.send({ embed });
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
