module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pout',
      description: 'Hazle una mala mirada a otro usuario -.-',
      usage: prefix => `\`${prefix}pout <@usuario>\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['vermal'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (message.mentions.users.first() === message.author) return message.channel.send('¿C-crees que puedes hacerte mala cara a ti solo?...');
      if (message.mentions.users.first() === client.user) return message.channel.send('¿Enserio quieres hacerme esto? T-T');
      if (message.mentions.users.size < 1) return message.channel.send('Menciona a la persona que le harás mala cara.');
      embed
        .setColor('RANDOM')
        .setDescription('**' + message.author.username + '** le hizo una mala cara a **' + message.mentions.users.first().username + '**')
        .setImage(client.replies.poutGifs());
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
