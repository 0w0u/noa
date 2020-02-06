module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'djs',
      description: 'Obten resultados relacionados con Discord.js-master de la documentación oficial.',
      usage: prefix => `\`${prefix}djs <doc>\``,
      examples: prefix => `\`${prefix}djs message#\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 1,
      aliases: ['docs'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send('Escribe lo que debo buscar.');
      else {
        let u = await require('node-superfetch').get(`https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(args.join(' '))}`);
        u = u.body;
        if (u && !u.error) message.channel.send({ embed: u });
        else message.channel.send('`' + args.join(' ') + '` no es una búsqueda válida.');
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
