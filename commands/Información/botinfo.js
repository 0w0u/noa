require('moment-duration-format');
module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      description: 'Muestra estadísticas sobre el bot',
      usage: (prefix) => `\`${prefix}botinfo\``,
      examples: (prefix) => `\`${prefix}botinfo\``,
      enabled: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(client.fns.reply('generating', message)),
        jav = await client.users.fetch(client.config.owners[1]),
        mon = await client.users.fetch(client.config.owners[0]);
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setTitle(`Información de ${client.config.bot}`, client.user.avatarURL())
        .addField('<:ncStats:704042636519931994> Estadísticas', '```• Shards: ' + client.shard.count.toLocaleString() + '\n• Servidores: ' + client.guilds.cache.size.toLocaleString() + '\n• Usuarios: ' + client.userCount.toLocaleString() + '\n• Canales: ' + client.channels.cache.size.toLocaleString() + '\n• Votos: ' + client.votes.toLocaleString() + ' (' + client.monthlyVotes.toLocaleString() + ' este mes)```')
        .addField('<:ncProgramming:704043125215199339> Programación', `\`\`\`• Lenguaje: JavaScript\n• Librería: discord.js v${require('discord.js').version}\n• Comandos: ${client.commands.size}\n• Memoria en Uso: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(require('os').totalmem() / 1024 / 1024).toFixed(2)} MB\n• Uptime: ${require('moment').duration(client.uptime).format(' D [días], H [horas], m [min], s [segs]')}\`\`\``)
        .addField('Enlaces', `[Invítame <:ncHeartXV:704040272664723559>](https://noa.wwmon.xyz/invite) | [Soporte ❓](https://noa.wwmon.xyz/support) | [Donaciones <:ncHeartXXI:704040566551478282>](https://noa.wwmon.xyz/donate) | [DBL 🤖](https://noa.wwmon.xyz/dbl) | [Vota 📥](https://noa.wwmon.xyz/vote) | [Web (WIP) 🌐](https://noa.wwmon.xyz/)`)
        .setFooter('Versión: ' + require('../../package.json').version + ' | Desarrollado por: ' + jav.tag + ' y ' + mon.tag)
        .setTimestamp();
      msg.edit('** **', { embed });
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
