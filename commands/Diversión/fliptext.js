module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'fliptext',
      description: '¡Dale un giro a tu texto!',
      usage: prefix => `\`${prefix}fliptext\``,
      examples: prefix => `\`${prefix}fliptext\``,
      enabled: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~',
        OFFSET = '!'.charCodeAt(0);
      if (!args[0]) {
        return message.channel.send('**' + message.author.username + '**, anímate y escribe el texto que dará un giro 🔃');
      } else {
        message.channel.send(
          args
            .join(' ')
            .split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse()
            .join('')
        );
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
