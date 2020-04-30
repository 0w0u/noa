module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'reverse',
      description: '¡Revise un pequeño giro en tu texto!',
      usage: (prefix) => `\`${prefix}reverse <texto>\``,
      examples: (prefix) => `\`${prefix}reverse ¡Hola, soy nuevo!\``,
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
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe el texto para ponerlo al revés', usage: this.help.usage(message.prefix), message }));
      else {
        let r = args.join().split('').reverse().join(''),
          n = args.join(' ');
        if (args[0].toLowerCase() === r) r = `${n.replace(/`+/g, '`')}... Espera... ¡Lo rompiste!`;
        message.channel.send(client.message({ emoji: 'green', razón: `aquí está tu mensaje al revés:\n${r}`, message }));
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
