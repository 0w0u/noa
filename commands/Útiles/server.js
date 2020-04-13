module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'server',
      description: 'Revisa la información de tu servidor\n> **Parámetros:**\n• `--boost`: Muestra el progreso/estado de las mejoras de servidor\n• `--icon`: Muestra el ícono del servidor',
      usage: (prefix) => `\`${prefix}server [opcion]\``,
      examples: (prefix) => `\`${prefix}server --boost\``,
      enabled: true,
      guildOnly: true,
      cooldown: 4,
      aliases: ['sinfo', 'serverinfo', 'aboutserver'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let guild = message.guild;
      if (args[0]) {
        if (args[0].toLowerCase() === '--boost') {
          let features = { ANIMATED_ICON: 'Ícono animado', BANNER: 'Banner de servidor', COMMERCE: 'Canal de tienda', DISCOVERABLE: 'Servidor de Discord Discovery List', FEATURABLE: 'Apto para estar en la lista de destacados', INVITE_SPLASH: 'Fondo para invitaciones', PUBLIC: 'El servidor es público', NEWS: 'Canal de novedades', PARTNERED: 'Servidor Asociado', VANITY_URL: 'Invitación personalizada', VERIFIED: 'Servidor verificado', VIP_REGIONS: 'Región V.I.P' };
          embed
            .setColor(client.fns.selectColor('lightcolors'))
            .setAuthor('Estado de Boost en ' + guild.name, `https://i.imgur.com/4f6iLPn.gif`)
            .setThumbnail(!guild.splashURL({ size: 2048, format: 'jpg' }) ? guild.iconURL({ size: 2048, format: 'jpg' }) : guild.splashURL({ size: 2048, format: 'jpg' }))
            .addField('Nivel de Boost', `${{ 0: 'Ninguno', 1: 'Nivel 1', 2: 'Nivel 2', 3: 'Nivel 3' }[guild.premiumTier]}`, true)
            .addField('Miembros boosteando', guild.premiumSubscriptionCount === 0 ? 'Sin boosts' : `${guild.premiumSubscriptionCount} ${guild.premiumSubscriptionCount === 1 ? 'miembro' : 'miembros'}`, true)
            .addField('Ventajas del servidor', `${guild.features.length <= 0 ? 'Ninguna' : `\`${guild.features.map((x) => features[x]).join('`, `')}\``}`)
            .setImage(guild.bannerURL({ size: 2048, format: 'jpg' }));
          message.channel.send({ embed });
          return;
        } else if (args[0].toLowerCase() === '--icon') {
          if (message.guild.iconURL() === null) return message.channel.send(client.message({ emoji: 'red', razón: 'este servidor no cuenta con un ícono personalizado', message }));
          else {
            embed
              .setColor(client.fns.selectColor('lightcolors'))
              .setTitle('Ícono del servidor')
              .setURL(message.guild.iconURL({ size: 2048, dynamic: true }))
              .setImage(message.guild.iconURL({ size: 2048, dynamic: true }));
            message.channel.send({ embed });
            return;
          }
        }
      } else {
        let regions = {
          brazil: 'Brasil :flag_br: ',
          hongkong: 'Hong Kong :flag_hk:',
          japan: 'Japón :flag_jp:',
          russia: 'Rusia :flag_ru:',
          singapore: 'Singapur :flag_sg:',
          southafrica: 'Sudáfrica :flag_za:',
          sydney: 'Sydney :flag_au:',
          'us-central': 'Central US :flag_us:',
          'us-east': 'Este US :flag_us:',
          'us-south': 'Sur US :flag_us:',
          'us-west': 'Oeste US :flag_us:',
          'vip-us-east': 'VIP US Este :flag_us:',
          'eu-central': 'Europa Central :flag_eu:',
          'eu-west': 'Europa Oeste :flag_eu:',
          london: 'London :flag_gb:',
          amsterdam: 'Amsterdam :flag_nl:',
          india: 'India :flag_in:',
        };
        let verifLevels = { NONE: 'Ningúno', LOW: 'Bajo', MEDIUM: 'Medio', HIGH: '(╯°□°）╯︵  ┻━┻', VERY_HIGH: '┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻' };
        embed
          .setColor(client.fns.selectColor('lightcolors'))
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, size: 1024 }))
          .setDescription(`Creado el **${guild.createdAt.toDateString().split(' ')[2]}/${guild.createdAt.toDateString().split(' ')[1]}/${guild.createdAt.toDateString().split(' ')[3]}** (Hace ${client.fns.checkDays(guild.createdAt)})`)
          .addField('Miembros', `Usuarios: **${guild.members.cache.size}**\nHumanos: **${guild.members.cache.filter((member) => !member.user.bot).size}** - Bots: **${guild.members.cache.filter((member) => member.user.bot).size}**\n<:au_UserStatusOnline:650475659663114260> \`${guild.members.cache.filter((u) => u.presence.status === 'online').size}\`  <:au_UserStatusIdle:650475659302273045> \`${guild.members.cache.filter((u) => u.presence.status === 'idle').size}\`  <:au_UserStatusDnd:650475659704926238> \`${guild.members.cache.filter((u) => u.presence.status === 'dnd').size}\`\n<:au_UserStatusStreaming:650475659671371786> \`${guild.members.cache.filter((u) => u.presence.game && u.presence.game.streaming).size}\`  <:au_UserStatusOffline:650475659365187606> \`${guild.members.cache.filter((u) => u.presence.status === 'offline').size}\`  <:au_UserStatusOnlineMobile:650169275356676125> \`${guild.members.cache.filter((x) => x.presence.clientStatus && x.presence.clientStatus.mobile).size}\``, true)
          .addField('Canales', `Total: **${guild.channels.cache.filter((c) => c.type === 'voice').size + guild.channels.cache.filter((c) => c.type === 'text').size}**\nCategorías: **${guild.channels.cache.filter((c) => c.type === 'category').size}** - Texto: **${guild.channels.cache.filter((c) => c.type === 'text').size}** - Voz: **${guild.channels.cache.filter((c) => c.type === 'voice').size}**`, true)
          .addField('Información', `Propietario: **${guild.owner.user.tag}**\nRegión: **${regions[guild.region]}**\nNivel de verificación: **${verifLevels[guild.verificationLevel]}**\nID: **${guild.id}**`, true)
          .addField('Extras', `Canal AFK: **${guild.afkChannel ? guild.afkChannel : 'Ninguno'}**\nTiempo de espera: **${guild.afkTimeout}s**\nRoles: **${guild.roles.cache.size}**\nEmotes: **${guild.emojis.cache.size}**`, true)
          .addField('Parámetros', '• `--boost`: Muestra el progreso/estado de las mejoras de servidor\n• `--icon`: Muestra el ícono del servidor', true);
        message.channel.send({ embed });
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
