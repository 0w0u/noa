module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'slap',
      description: 'Regala una cachetada a quien te moleste >.<',
      usage: (prefix) => `\`${prefix}slap <@usuario>\``,
      examples: (prefix) => `\`${prefix}\``,
      enabled: true,
      guildOnly: true,
      aliases: ['cachetada', 'bofetada'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let help = this.help;
      if (!args[0]) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs menciona a quien golpearás', usage: this.help.usage(message.prefix), message }));
      else {
        if (!isNaN(args[0])) {
          let uuu = message.guild.members.cache.find((x) => x.id === args[0]);
          if (uuu) return await send(uuu.user);
          else return message.channel.send(client.message({ emoji: 'red', razón: 'esa ID no pertenece a nadie, al menos no en este servidor', usage: this.help.usage(message.prefix), message }));
        }
        if (message.mentions.users.size > 0) return await send(message.mentions.users.first());
        let u = message.guild.members.cache.array().filter((x) => `${x.user.tag}||${x.displayName}`.toLowerCase().includes(args[0].toLowerCase()));
        if (u.length <= 0) return message.channel.send(client.message({ emoji: 'red', razón: 'no hay usuarios que coincidan con tu búsqueda, intenta ser más específico', usage: this.help.usage(message.prefix), message }));
        if (u.length === 1) return await send(u[0].user);
        if (u.length > 10) return message.channel.send(client.message({ emoji: 'red', razón: 'muchos usuarios coinciden con tu búsqueda, intenta ser más específico', usage: this.help.usage(message.prefix), message }));
        else {
          let m = 'Selecciona un número entre 1 y ' + u.length + '```';
          for (let x = 0; x < u.length; x++) {
            m += `${x + 1} ~ ${u[x].nickname ? `${u[x].displayName} (${u[x].user.tag})` : `${u[x].user.tag}`}\n`;
          }
          let msg = await message.channel.send({ embed: { color: client.fns.selectColor('lightcolors'), description: m + '```' } }),
            i = await message.channel.awaitMessages((m) => m.author.id === message.author.id && m.content > 0 && m.content < u.length + 1, { max: 1, time: 30000 });
          i = await i.first();
          if (!i) {
            message.channel.send(client.message({ emoji: 'red', razón: 'no se recibió respuesta', usage: this.help.usage(message.prefix), message }));
            msg.delete({ timeout: 5000 });
          } else {
            await send(u[i.content - 1].user);
            msg.delete({ timeout: 5000 });
          }
        }
      }
      async function send(user) {
        message.channel.send(client.message({ emoji: ':microbe:', razón: '¡evita transmitir el **covid-19**!', message }));
        if (user === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'no te pegues, no te pegues, no te pegues', message }));
        else if (user === client.user) return message.channel.send(client.message({ emoji: 'sad', razón: 'a mí no, por favor', message }));
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setDescription('**' + message.author.username + '** le regaló una cachetada a **' + user.username + '**')
          .setImage(client.fns.gifs(help.name));
        message.channel.send({ embed });
      }
      /*
      message.channel.send(client.message({ emoji: ':microbe:', razón: '¡evita transmitir el **covid-19**!', message }));
      if (message.mentions.users.first() === message.author) return message.channel.send(client.message({ emoji: 'red', razón: 'no te pegues, no te pegues, no te pegues', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.first() == client.user) return message.channel.send(client.message({ emoji: ':sob:', razón: 'a mí no', usage: this.help.usage(message.prefix), message }));
      if (message.mentions.users.size < 1) return message.channel.send(client.message({ emoji: 'red', razón: 'noargs menciona a quien golpearás', usage: this.help.usage(message.prefix), message }));
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setDescription('**' + message.author.username + '** le regaló una cachetada a **' + message.mentions.users.first().username + '**')
        .setImage(client.fns.gifs(this.help.name));
      message.channel.send({ embed });
      */
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
