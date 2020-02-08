module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'depressed',
      description: 'Ponte en un estado depresido. 💔',
      usage: prefix => `\`${prefix}depressed\``,
      examples: prefix => `\`${prefix}depressed\``,
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