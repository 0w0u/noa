module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'ship',
      description: 'Shippea a dos usuarios por sus apodos en el servidor',
      usage: (prefix) => `\`${prefix}ship <@usuario1>\``,
      examples: (prefix) => `\`${prefix}ship @ @Hinata#1200\``,
      enabled: true,
      guildOnly: true,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) return message.channel.send(client.message({ emoji: 'noidea', razón: 'debes mencionar a alguien con quien shipearte', usage: this.help.usage(message.prefix), message }));
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
        let { body } = await require('node-superfetch').get(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user.displayAvatarURL({ size: 2048 })}&user2=${message.author.displayAvatarURL({ size: 2048 })}`),
          first_length = Math.round(message.author.username.length / 2),
          first_half = message.author.username.slice(0, first_length),
          second_length = Math.round(user.username.length / 2),
          second_half = user.username.slice(second_length),
          final_name = first_half + second_half;
        message.channel.send(client.message({ emoji: 'heart', razón: `tu shippeo ideal es: ${message.author === user ? `**${message.author.username}** el amor propio es el único y verdadero amor` : `**${final_name}**`}`, message }), { files: [body.message] });
      }
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
