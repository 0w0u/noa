module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'setwelcome',
      description: 'Ajusta las bienvenidas de tu servidor\n> **Opciones:**\n~ `{user}`: Mención al usuario que entró\n~ `{user:name}`: El nombre de usuario del usuario que entró\n~ `{user:tag}`: El tag del usuario que entró\n~ `{user:id}`: La ID del usuario que entró\n~ `{server}`: El nombre del servidor\n~ `{server:count}`: El número de miembros en el servidor',
      usage: (prefix) => `\`${prefix + this.help.name} <[habilitar|enable]|[deshabilitar|disable]> [[[canal|channel] <#canal>]|[[mensaje|message] <texto>]|[[imagen|image] <fondo|color-fondo|color-texto|texto>]]\``,
      examples: (prefix) => `\`${prefix + this.help.name} enable message ¡Bienvenido {user}! Espero que disfrutes tu estancia en **{server}**\``,
      enabled: true,
      ownerOnly: true,
      cooldown: 3,
      aliases: ['setjoin', 'setw'],
      botPermissions: [],
      memberPermissions: ['MANAGE_SERVER'],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitás proporcionar una opción', usage: this.help.usage(message.prefix), message }));
      else if (args[0].toLowerCase() === 'habilitar' || args[0].toLowerCase() === 'enable') {
        if (!args[1]) {
          data.guild.welcome.enabled = true;
          data.guild.save();
          message.channel.send(client.message({ emoji: 'green', razón: 'habilitaste las bienvenidas del servidor\nPara seguir configurando, usa; `' + message.prefix + 'setwelcome enable [message|channel]`', message }));
        } else if (args[1].toLowerCase() === 'canal' || args[1].toLowerCase() === 'channel') {
          if (!args[2]) message.channel.send(client.message({ emoji: 'red', razón: 'necesitas mencionar el canal donde se mandarán las bienvenidas\nCanal de bienvenidas actual: `' + data.guild.welcome.channel === undefined ? 'Ninguno' : (message.guild.channels.cache.get(data.guild.welcome.channel) ? message.guild.channels.cache.get(data.guild.welcome.channel).name : 'Ninguno') + '`', message }));
          else {
            if (!isNaN(args[2])) {
              try {
                return await send(message.guild.channels.cache.get(args[2]));
              } catch {
                return message.channel.send(client.message({ emoji: 'red', razón: 'esa ID no pertenece a ningún canal (o no en este servidor)', usage: this.help.usage(message.prefix), message }));
              }
            }
            if (message.mentions.channels.size > 0) return await send(message.mentions.channels.first());
            let c = message.guild.channels.cache.array().filter((x) => x.type !== 'category' && `${x.name}`.toLowerCase().includes(args[2].toLowerCase()));
            if (c.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay canales coinciden con tu búsqueda, intenta ser más específico', message }));
            else if (c.length === 1) return await send(c[0]);
            else if (c.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'muchos canales coinciden con tu búsqueda, intenta ser más específico', message }));
            else {
              let m = 'Selecciona un número entre 1 y ' + c.length + '```';
              for (let x = 0; x < c.length; x++) {
                m += `${x + 1} ~ ${c[x].name}\n`;
              }
              let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
                i = await message.channel.awaitMessages((m) => m.author.id === message.author.id && m.content > 0 && m.content < c.length + 1, { max: 1, time: 30000 });
              i = await i.first();
              if (!i) {
                message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', message }));
                msg.delete({ timeout: 5000 });
              } else {
                await send(c[i.content - 1]);
                msg.delete({ timeout: 5000 });
              }
            }
            async function send(channel) {
              data.guild.welcome.channel = channel.id;
              data.guild.save();
              message.channel.send(client.message({ emoji: 'green', razón: 'ahora las bienvenidas se mandarán a `#' + channel.name + '`', message }));
            }
          }
        } else if (args[1].toLowerCase() === 'mensaje' || args[1].toLowerCase() === 'message') {
          if (!args[2]) {
            data.guild.welcome.message.enabled = true;
            data.guild.save();
            message.channel.send(client.message({ emoji: 'green', razón: 'habilitaste los mensajes de bienvenida del servidor\nMensaje de bienvenida actual: `' + data.guild.welcome.message.text + '`\nPara seguir configurando, usa; `' + message.prefix + "setwelcome enable message <'mensaje'>`", message }));
          } else {
            data.guild.welcome.message.text = args.slice(2).join(' ');
            data.guild.save();
            message.channel.send(client.message({ emoji: 'green', razón: 'ahora el mensjae de bienvenida es:\n' + args.slice(2).join(' '), message }));
          }
        } else if (args[1].toLowerCase() === 'imagen' || args[1].toLowerCase() === 'image') {
          data.guild.welcome.image.enabled = true;
          data.guild.save();
          message.channel.send(client.message({ emoji: 'green', razón: 'habilitaste las imágenes de bienvenidas, por el momento no es posible poder configurarlas, ¡estamos trabajando en eso!', message }));
        } else {
          message.channel.send(client.message({ emoji: 'red', razón: 'noargs esa no es una opción válida', usage: this.help.usage(message.prefix), message }));
        }
      } else if (args[0].toLowerCase() === 'deshabilitar' || args[0].toLowerCase() === 'disable') {
        if (!args[1]) {
          data.guild.welcome.enabled = false;
          data.guild.save();
          message.channel.send(client.message({ emoji: 'green', razón: 'deshabilitaste las bienvenida del servidor', message }));
        } else if (args[1].toLowerCase() === 'mensaje' || args[1].toLowerCase() === 'message') {
          data.guild.welcome.message.enabled = false;
          data.guild.save();
          message.channel.send(client.message({ emoji: 'green', razón: 'deshabilitaste los mensaje de bienvenida del servidor', message }));
        } else if (args[1].toLowerCase() === 'imagen' || args[1].toLowerCase() === 'image') {
          data.guild.welcome.image.enabled = false;
          data.guild.save();
          message.channel.send(client.message({ emoji: 'green', razón: 'deshabilitaste las imágenes de bienvenidas', message }));
        } else {
          message.channel.send(client.message({ emoji: 'red', razón: 'noargs esa no es una opción válida', usage: this.help.usage(message.prefix), message }));
        }
      } else message.channel.send(client.message({ emoji: 'red', razón: 'noargs esa no es una opción válida', usage: this.help.usage(message.prefix), message }));
    } catch (e) {
      client.err({
        type: 'command',
        name: this.help.name,
        error: e,
        message,
      });
    }
  }
};
