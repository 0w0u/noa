module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'fart',
      description: 'Comando oculto #2\n\n¡Se tan sucio y tirate un pedo!',
      usage: prefix => `\`${prefix}fart\``,
      examples: prefix => `\`${prefix}fart\``,
      enabled: true,
      cooldown: 3,
      aliases: ['flatulence'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      embed
        .setDescription('**' + message.author.username + '** se tiró un pedo. ¡Qué sucio!')
        .setColor(client.functions.selectColor('lightcolors'))
        .setImage('https://thumbs.gfycat.com/ParchedSmallAmurstarfish-small.gif')
        .setFooter(client.config.bot + ' | Comandos oculto #2');
      message.channel.send({ embed });
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
