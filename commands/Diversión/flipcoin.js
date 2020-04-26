module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'flipcoin',
      description: 'Juega a tirar la moneda para obtener cara o cruz',
      usage: (prefix) => `\`${prefix + +this.help.name}\``,
      examples: (prefix) => `\`${prefix + this.help.name}\``,
      enabled: true,
      aliases: ['coinflip', 'coin'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let value = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      let resultado;
      if (!args[0]) {
        if (value === 1) {
          resultado = 'cara';
        } else {
          resultado = 'cruz';
        }
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setTitle(client.message({ emoji: '<:noaTuturu:673966965303541761>', razón: 'aquí tu resultado:', message }))
          .setDescription('¡Ha salido **' + resultado + '**!');
        message.channel.send({ embed });
      } else if (args[0].toLowerCase() === 'cara') {
        if (value === 1) {
          embed.setColor(client.fns.selectColor('green')).setTitle(client.message({ emoji: 'green', razón: '¡salió cara, adivinaste!', message }));
          message.channel.send({ embed });
        } else if (value === 2) {
          embed.setColor(client.fns.selectColor('red')).setTitle(client.message({ emoji: 'red', razón: '¡salió cruz! Perdiste', message }));
          message.channel.send({ embed });
        }
      } else if (args[0].toLowerCase() === 'cruz') {
        if (value === 1) {
          embed.setColor(client.fns.selectColor('red')).setTitle(client.message({ emoji: 'red', razón: '¡salió cara! Perdiste', message }));
          message.channel.send({ embed });
        } else if (value === 2) {
          embed.setColor(client.fns.selectColor('green')).setTitle(client.message({ emoji: 'green', razón: '¡salió cruz, adivinaste!', message }));
          message.channel.send({ embed });
        }
      }
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message,
      });
    }
  }
};
