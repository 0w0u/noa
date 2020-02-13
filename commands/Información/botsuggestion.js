module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'botsuggestion',
      description: 'Envía tu sugerencia directa al servidor de soporte para mejorar el bot.',
      usage: prefix => `\`${prefix}botsuggestion <sugerencia>\``,
      examples: prefix => `\`${prefix}botsuggestion Agregar un comando para banear a todos los usuarios de un servidor!\``,
      enabled: true,
      cooldown: 30,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) {
        return message.channel.send('Debes agregar la sugerencia que quieres enviar.\n\n> **Uso correcto:** `' + message.prefix + 'botsuggestion <sugerencia>`.');
      } else {
        message.channel.send('Estás a punto de enviar una sugerencia al servidor de soporte de ' + client.config.bot + ', __**¿estás seguro que quieres ejecutar esta acción?.**__\n\n*Responde con `si` para confirmar la acción, o responde `no` para cancelar el comando.*');
        let i = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, errors: ['cancelar'] });
        i = await i.first();
        if (i.content.toLowerCase().includes('sí') || i.content.toLowerCase().includes('si')) {
          embed
            .setColor(client.fns.selectColor('lightcolors'))
            .setAuthor(`${message.author.tag} envió una sugerencia`, message.author.displayAvatarURL())
            .setDescription(args.join(' '))
            .setFooter(`Sugerencia envíada desde ${message.guild.name}`, message.guild.iconURL());
          let msg = await client.channels.cache.get('669009316191404037').send({ embed });
          msg.react('487031865577046026');
          msg.react('487031865165873172');
          message.channel.send('Tu sugerencia ha sido enviada correctamente.');
        } else if (i.content.toLowerCase().includes('no')) {
          message.channel.send('Está bien, cancelando operación.');
        } else {
          message.channel.send('Respuesta incorrecta, cancelando operación.');
        }
      }
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message
      });
    }
  }
};
