module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'bigtext',
      description: 'Enormece tu pequeño texto y hazlo lucir mucho mejor.',
      usage: prefix => `\`${prefix}bigtext <texto>\``,
      examples: prefix => `\`${prefix}bigtext Soy enorme\``,
      enabled: true,
      aliases: ['emojify'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      const mapping = { ' ': '   ', '0': ':zero:', '1': ':one:', '2': ':two:', '3': ':three:', '4': ':four:', '5': ':five:', '6': ':six:', '7': ':seven:', '8': ':eight:', '9': ':nine:', '!': ':grey_exclamation:', '?': ':grey_question:', '#': ':hash:', '*': ':asterisk:', á: ':regional_indicator_a:', é: ':regional_indicator_e:', í: ':regional_indicator_i:', ó: ':regional_indicator_o:', ú: ':regional_indicator_u:' };
      'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
        mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
      });
      if (args.length < 1) message.channel.send('Escribe el texto para convertir');
      if (args.length > 80) message.channel.send(`**${message.author.username}**, bajale un poco! Escribe un texto menor a 80 caracteres.`);
      message.channel.send(
        args
          .join(' ')
          .split('')
          .map(c => mapping[c] || c)
          .join('')
      );
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
