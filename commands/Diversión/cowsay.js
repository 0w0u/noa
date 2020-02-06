module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'cowsay',
      description: 'Una vaca repetirá el texto que desees.',
      usage: prefix => `\`${prefix}cowsay <texto>\``,
      examples: prefix => `\`${prefix}cowsay Leroy Jenkins!\``,
      enabled: true,
      aliases: ['lavacadice'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
        message.channel.send('**' + message.author.username + '**, escribe el texto que dirá la vaca');
      } else {
        message.channel.send(require('cowsay').think({ text: args.join(' '), eyes: 'Oo', T: 'u' }), { code: 'md' });
        message.delete();
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
