require('moment-duration-format');
module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      description: 'Muestra estadísticas sobre el bot.',
      usage: prefix => `\`${prefix}botinfo\``,
      examples: prefix => `\`${prefix}botinfo\``,
      enabled: true,
      cooldown: 5,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let msg = await message.channel.send(new (require('discord.js')).MessageEmbed().setDescription(client.replies.generatingSomething(message)).setColor(client.functions.selectColor('lightcolors'))),
        jav = await client.users.fetch(client.config.owners[1]),
        mon = await client.users.fetch(client.config.owners[0]),
        bot = await client.dbl.getBot(client.user.id)
      embed
        .setColor(client.functions.selectColor('lightcolors'))
        .setAuthor(`Información de ${client.config.bot}`, client.user.avatarURL())
        .addField('Información', `• Desarrolladores: ${jav.tag} y ${mon.tag}`, true)
        .addField('📥 Estadísticas', '```• Servidores: ' + client.guilds.size.toLocaleString() + '\n• Usuarios: ' + client.userCount.toLocaleString() + '\n• Canales: ' + client.channels.size.toLocaleString() + '\n• Votos: ' + bot.points.toLocaleString() + ' (' + bot.monthlyPoints.toLocaleString() + ' este mes)```')
        .addField(
          '🛰 Programación',
          `\`\`\`• Lenguaje: JavaScript\n• Librería: discord.js v${require('discord.js').version}\n• Comandos: ${client.commands.size}\n• Memoria en Uso: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(require('os').totalmem() / 1024 / 1024).toFixed(2)} MB\n• Uptime: ${require('moment')
            .duration(client.uptime)
            .format(' D [días], H [horas], m [min], s [segs]')}\`\`\``
        )
        .addField('Enlaces', `[Invítame ❤️](https://noa.wwmon.xyz/invite) | [Soporte ❓](https://noa.wwmon.xyz/support) | [DBL 🤖](https://noa.wwmon.xyz/dbl) | [Vota 📥](https://noa.wwmon.xyz/vote) | [Web (WIP) 🌐](https://noa.wwmon.xyz/)`)
      .setFooter('Versión: ' + require('../../package.json').version)
        .setTimestamp()
      msg.edit({ embed });
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
