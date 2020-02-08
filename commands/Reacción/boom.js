module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'boom',
      description: 'Explota como si fuéses una bomba. 💣',
      usage: prefix => `\`${prefix}boom\``,
      examples: prefix => `\`${prefix}boom\``,
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