module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'bored',
      description: 'Da a entender a los demás que estás muy aburrido y que se pongan a hacer algo bueno.',
      usage: prefix => `\`${prefix}bored\``,
      examples: prefix => `\`${prefix}bored\``,
      enabled: true,
      cooldown: 3,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      embed
        .setDescription(client.replies.reply(this.help.name, message))
        .setColor(client.functions.selectColor('lightcolors'))
        .setImage(client.replies.gifs(this.help.name));
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
