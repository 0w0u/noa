module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'machievement',
      description: '¡Genera un logro del Minecraft!',
      usage: prefix => `\`${prefix}machievement <logro>/[título]\``,
      examples: prefix => `\`${prefix}machievement Utiliza 700 comandos/Aficionado.\``,
      enabled: true,
      cooldown: 3,
      aliases: ['mach'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let numbers = ['1', '20', '21', '13', '18', '17', '9', '31', '22', '23', '2', '11', '19', '24', '25', '14', '12', '33', '34', '32', '3', '35', '26', '6', '27', '15', '36', '37', '38', '7', '10', '39', '4', '5', '30', '8', '16', '28', '29'],
        random = numbers[Math.floor(Math.random() * numbers.length)];
      args = args
        .join('%20')
        .split('/')
        .map(arg => arg.trim());
      if (!args[0]) {
        return message.channel.send('¡Anda! Escribe el logro de tus sueños.');
      } else {
        if (args[0].length >= 25) {
          return message.channel.send('El texto contener menos de 25 caracteres.');
        } else {
          let att = new (require('discord.js')).MessageAttachment(`https://minecraftskinstealer.com/achievement/${random}/${args[1] ? (args[1].length < 25 ? args[1] : `Logro%20obtenido`) : `Logro%20obtenido`}/${args[0]}`, 'achievement.png');
          message.channel.send(att);
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
