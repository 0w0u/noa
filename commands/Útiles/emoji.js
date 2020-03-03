module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'emoji',
      description: 'Muestra la información de un emoji seleccionado\n> **Opciones de usuario:**\n• `<emoji> --info`: Muestra toda la información relacionada con el emoji\n• `--lista`: Mira la lista de emojis en el servidor\n> **Opciones de administración:**\n• `add <nombre> <imagen>`: Agrega un emoji al servidor donde lo utilizas sin necesidad de acceder a la configuración del servidor\n• `remove <emoji>`: Elimina un emoji del servidor donde se utiliza, sin necesidad de acceder a la configuración del servidor\n• `rename <emoji> <nuevoNombre>`: Cambia el nombre de un emoji del servidor donde se utiliza, sin necesidad de acceder a la configuración del servidor',
      usage: prefix => `\`${prefix}emoji <add <nombre> <img/url> | remove <nombre> | --lista | emoji [--info]>\``,
      examples: prefix => `${prefix}emoji <a:AnoaClap:674435170119712778> --info\n${prefix}emoji remove <:DBL:489519574698426369>`,
      enabled: true,
      guildOnly: true,
      cooldown: 5,
      aliases: ['emote', 'e'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      embed.setColor(client.fns.selectColor('lightcolors'));
      let emoji = /((:|<:|<a:)((\w{1,64}:\d{17,18})|(\w{1,64}))(:|>))|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.exec(args.join(' '));
      if (!args[0]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas proporcionar alguna opción', usage: this.help.usage(message.prefix), message }));
      else if (args[0].toLowerCase() === '--lista' || args[0].toLowerCase() === '--list') {
        embed.setTitle('Emotes del servidor');
        let nitro = message.guild.emojis.cache.filter(e => e.animated === true),
          classic = message.guild.emojis.cache.filter(e => e.animated === false);
        if (classic.size > 0) {
          embed.setColor(client.fns.selectColor('lightcolors')).setTitle('Emote' + (classic.size > 1 ? 's' : '') + ' clásico' + (classic.size > 1 ? 's' : '') + ' [' + classic.size + ']');
          classic = classic.array();
          for (let i = 0; i < classic.length; i += 10) {
            embed.addField(
              'Clásicos...',
              classic
                .slice(i, i + 10)
                .map(x => x.toString())
                .join(' | ')
            );
          }
          message.channel.send({ embed: embed });
        }
        if (nitro.size > 0) {
          let embedd = new (require('discord.js').MessageEmbed)();
          embedd.setColor(client.fns.selectColor('lightcolors')).setTitle('Emote' + (nitro.size > 1 ? 's' : '') + ' nitro [' + nitro.size + ']');
          nitro = nitro.array();
          for (let i = 0; i < nitro.length; i += 10) {
            embedd.addField(
              'Nitro...',
              nitro
                .slice(i, i + 10)
                .map(x => x.toString())
                .join(' | ')
            );
          }
          message.channel.send({ embed: embedd });
        }
      } else if (args[0].toLowerCase() === 'add' || args[0].toLowerCase() === 'agregar') {
        if (!client.config.owners.includes(message.author.id)) return message.channel.send(client.message({ emoji: 'red', razón: 'esta función está deshabilitada por el momento', message }));
        if (!message.member.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tienes los suficientes permisos', message }));
        else {
          if (!args[1]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas agregar un nombre', usage: this.help.usage(message.prefix), message }));
          else {
            if (args[1].length < 2) return message.channel.send(client.message({ emoji: 'red', razón: 'el nombre del emoji debe tener más de 2 carácteres', message }));
            if (args[1].length > 32) return message.channel.send(client.message({ emoji: 'red', razón: 'el nombre del emoji no puede exceder los 32 carácteres', message }));
            if ((message.attachments.first() ? message.attachments.first().url : args[2]).split(/[.]/g).pop() === 'gif') {
            }
            if (args[2]) {
              if (!args[2].endsWith('.gif') || !args[2].endsWith('.png') || !args[2].endsWith('.jpg')) return message.channel.send(client.message({ emoji: 'red', razón: 'el formato de imagen es inválido', message }));
            }
            let create;
            try {
              create = await message.guild.emojis.create(message.attachments.first() ? message.attachments.first().url : args[2] ? args[2] : 'awawa', args[1]);
            } catch (e) {
              return message.channel.send(client.message({ emoji: 'red', razón: 'parece que no pusiste bien la imagen', message }));
            }
            message.channel.send(client.message({ emoji: 'green', razón: 'el emoji ha sido creado correctamente ' + create.toString(), usage: this.help.usage(message.prefix), message }));
          }
        }
        return;
      } else if (args[0].toLowerCase() === 'remove' || args[0].toLowerCase() === 'remover') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tienes los suficientes permisos', message }));
        else if (!message.guild.me.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tengo los suficientes permisos', message }));
        else {
          if (!args[1]) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas proporcionar un emoji para borrar', usage: this.help.usage(message.prefix), message }));
          let emoji1 = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(x => x.name.includes(args[1])) || message.guild.emojis.cache.find(x => x.toString() === args[1]);
          if (!emoji1) message.channel.send(client.message({ emoji: 'red', razón: 'emoji no encontrado', usage: this.help.usage(message.prefix), message }));
          else {
            let msg = await message.channel.send(client.message({ emoji: 'gray', razón: '¿seguro que quieres borrar este emoji?\nResponde `sí` o `no`', usage: this.help.usage(message.prefix), message })),
              index = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 });
            index = index.first();
            if (!index) message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', usage: this.help.usage(message.prefix), message }));
            else {
              if (index.content.toLowerCase().startsWith('sí') || index.content.toLowerCase().startsWith('si') || index.content.toLowerCase().startsWith('yes') || index.content.toLowerCase().startsWith('confirmo')) {
                try {
                  await emoji1.delete();
                  message.channel.send(client.message({ emoji: 'green', razón: 'emoji eliminado correctamente', usage: this.help.usage(message.prefix), message }));
                } catch {
                  return message.channel.send(client.message({ emoji: 'red', razón: 'ocurrió un error mientras intentaba eliminar el emoji', usage: this.help.usage(message.prefix), message }));
                }
              } else if (index.content.toLowerCase().startsWith('no') || index.content.toLowerCase().startsWith('nope') || index.content.toLowerCase().startsWith('desconfirmo')) {
                message.channel.send(client.message({ emoji: 'green', razón: 'está bien, cancelando...', usage: this.help.usage(message.prefix), message }));
              } else {
                message.channel.send(client.message({ emoji: 'red', razón: 'respuesta incorrecta\nSolamente admito `sí` o `no`', usage: this.help.usage(message.prefix), message }));
              }
            }
          }
        }
        return;
      } else if (args[0].toLowerCase() === 'rename' || args[0].toLowerCase() === 'renombrar') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tienes los suficientes permisos', message }));
        else if (!message.guild.me.permissions.has('MANAGE_EMOJIS')) message.channel.send(client.message({ emoji: 'red', razón: 'no tengo los suficientes permisos', message }));
        else {
          if (!args[1]) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas especificar un emoji para renombrar', usage: this.help.usage(message.prefix), message }));
          let emoji1 = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(x => x.name.includes(args[1])) || message.guild.emojis.cache.find(x => x.toString() === args[1]);
          if (!emoji1) message.channel.send(client.message({ emoji: 'red', razón: 'emoji no encotrado', usage: this.help.usage(message.prefix), message }));
          else {
            if (!args[2]) message.channel.send(client.message({ emoji: 'red', razón: 'noargs necesitas elegir un nuevo nombre', usage: this.help.usage(message.prefix), message }));
            else {
              if (args[2].length < 2) return message.channel.send(client.message({ emoji: 'red', razón: 'el nombre del emoji debe tener más de 2 carácteres', message }));
              if (args[2].length > 32) return message.channel.send(client.message({ emoji: 'red', razón: 'el nombre del emoji no puede exceder los 32 carácteres', message }));
              try {
                await emoji1.edit({ name: args[2] });
                message.channel.send(client.message({ emoji: 'green', razón: 'he cambiado el nombre del emoji correctamente', usage: this.help.usage(message.prefix), message }));
              } catch {
                return message.channel.send(client.message({ emoji: 'red', razón: 'ha ocurrido un error mientras intentaba renombrar el emoji', usage: this.help.usage(message.prefix), message }));
              }
            }
          }
        }
        return;
      } else {
        if (!emoji) message.channel.send(client.message({ emoji: 'red', razón: 'noargs emoji no encontrado', usage: this.help.usage(message.prefix), message }));
        else {
          if (args.pop() === '--info') {
            let emo = emoji[3].split(':');
            let uwu = client.emojis.cache.get(emo[1]);
            if (!uwu) message.channel.send(client.message({ emoji: 'red', razón: 'emoji no encontrado', usage: this.help.usage(message.prefix), message }));
            else {
              message.channel.send(
                `• Nombre: ${uwu.name}\n• ID: ${uwu.id}\n• Vista previa: ${uwu.toString()}\n• Creado el: ${require('moment')
                  .utc(emoji.createdAt)
                  .format('DD/MM/YYYY, h:mm A')}`
              );
            }
          } else {
            if (!emoji[0].includes('<' || '>')) message.channel.send(client.message({ emoji: 'red', razón: 'el emoji seleccionado es "default", no lo puedo hacer jumbo', usage: this.help.usage(message.prefix), message }));
            else {
              let emo = emoji[3].split(':');
              message.channel.send(new (require('discord.js').MessageAttachment)(`https://cdn.discordapp.com/emojis/${emo[1]}.${emoji[2].includes('a') ? 'gif' : 'png'}`));
            }
          }
        }
        return;
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
