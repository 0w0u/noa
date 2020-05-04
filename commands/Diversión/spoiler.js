module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'spoiler',
      description: 'separa cada letra de tu texto en un spoiler',
      usage: (prefix) => `\`${prefix + this.help.name}\``,
      examples: (prefix) => `\`${prefix + this.help.name}\``,
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
      let texto = args.join(' ');
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs escribe un texto para spoilear', usage: this.help.usage(message.prefix), message }));
      else {
        if (message.mentions.users.first()) message.mentions.users.array().forEach((x) => (texto = texto.replace(`<@!${x.id}>` || `<@${x.id}>`, `@${x.username}`)));
        if (message.mentions.roles.first()) message.mentions.roles.array().forEach((x) => (texto = texto.replace(`<@&${x.id}>`, `@${x.name}`)));
        if (message.mentions.channels.first()) message.mentions.channels.array().forEach((x) => (texto = texto.replace(`<#${x.id}>`, `#${x.name}`)));
        let spoiler = texto
          .split('')
          .map((x) => `||${x}||`)
          .join('');
        message.channel.send(spoiler);
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
