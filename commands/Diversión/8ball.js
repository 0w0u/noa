module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: '8ball',
      description: 'Realiza una pregunta para ser respondida por la bola mágica.',
      usage: prefix => `\`${prefix}8ball <pregunta>\``,
      examples: prefix => `\`${prefix}8ball ¿Soy guapo?\``,
      enabled: true,
      aliases: ['bola8'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
        return message.channel.send('¡Vamos! Anímate a preguntarle algo a la bola mágica.');
      } else {
        let EightBall = Math.floor(Math.random() * 3) + 1;
        embed.setTitle(':8ball: La bola mágica').addField('Has preguntado:', args.join(' '));
        if (EightBall === 1) {
          embed
            .setColor(client.functions.selectColor('green'))
            .addField('Mi respuesta es:', client.replies.ballYes(message))
            .setImage(client.replies.ballYesG());
          message.channel.send({ embed });
        } else if (EightBall === 2) {
          embed
            .setColor(client.functions.selectColor('red'))
            .addField('Mi respuesta es:', client.replies.ballNo(message))
            .setImage(client.replies.ballNoG());
          message.channel.send({ embed });
        } else {
          embed
            .setColor(client.functions.selectColor('yellow'))
            .addField('Mi respuesta es:', client.replies.ballMaybe(message))
            .setImage(client.replies.ballMaybeG());
          message.channel.send({ embed });
        }
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
