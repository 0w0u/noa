module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'rate',
      description: 'Púntua el texto que tu elijas',
      usage: (prefix) => `\`${prefix}rate <texto>\``,
      examples: (prefix) => `\`${prefix}rate ¿Qué tan feo soy?\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe el texto a puntuar', usage: this.help.usage(message.prefix), message }));
      else if (args.join(' ').length > 150) message.channel.send(client.message({ emoji: 'red', razón: 'no puedo calificar tal estupidez, mejor pon algo más corto', message }));
      else {
        let punt = Math.floor(Math.random() * 11),
          stars = '';
        if (punt === 0) {
          stars = '<:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 1) {
          stars = '<:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 2) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 3) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 4) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 5) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 6) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 7) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 8) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692> <:ncStarB:703841793455685692>';
        } else if (punt === 9) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarB:703841793455685692>';
        } else if (punt === 10) {
          stars = '<:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426> <:ncStarY:703841636316217426>';
        }
        message.channel.send(client.message({ emoji: '<:ncStarY:703841636316217426>', razón: `creo que \`${args.join(' ').replace(/`/g, '')}\` se merece una puntuación de ${stars} (${punt}) estrellas`, message }));
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
