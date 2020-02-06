const { MessageEmbed, MessageAttachment } = require('discord.js'),
  { exec } = require('child_process'),
  util = require('util');
module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: 'Evalúa código.',
      usage: prefix => `\`${prefix}eval [código]\``,
      examples: prefix => `\`${prefix}eval client.ws.ping\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 0.1,
      aliases: ['ev'],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let mon = 'Pero si le ponen la canción, le da una depresión, ton-ta',
        author = message.author,
        member = message.member,
        guild = message.guild,
        channel = message.channel,
        msg = message;
      try {
        let evalued = await eval(args.join(' '));
        if (typeof evalued !== 'string') evalued = util.inspect(evalued, { depth: 0 });
        if (evalued.length > 1950) {
          message.channel.send('> El resultado es muy largo');
        } else if (evalued.includes(client.config.token || client.config.mongo || client.dbl.token)) {
          message.channel.send('> El resultado contiene un token');
        } else {
          message.channel.send('>>> ```js\n' + evalued + '\n```');
        }
      } catch (err) {
        if (err.toString().includes(client.config.token || client.config.mongo)) err = err.toString().replace(client.config.token || client.config.mongo, 'T0K3N');
        message.channel.send('>>> ```js\n' + (typeof err !== 'object' ? err.toString() : util.inspect(err, { depth: 0 })) + '\n```');
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
