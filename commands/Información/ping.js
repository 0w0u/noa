module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Revisa la latencia del bot y la API',
      usage: (prefix) => `\`${prefix}ping\``,
      examples: (prefix) => `\`${prefix}ping\``,
      enabled: true,
      aliases: ['latency'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      var ping = Math.floor(client.ws.ping);
      if (ping) {
        let m = await message.channel.send(client.message({ emoji: 'gray', razón: 'analizando resultados...', message }));
        let pingo = m.createdTimestamp - message.createdTimestamp;
        if (message.author) {
          m.edit(client.message({ emoji: (ping || pingo) > 500 ? 'gray' : (ping || pingo) > 1000 ? 'red' : 'green', razón: `latencias de ${client.config.bot}\n**API**: ${ping}ms\n**Bot**: ${pingo}ms`, message }));
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
