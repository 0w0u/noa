module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run(vote) {
    let client = this.client;
    try {
      let user = await client.users.fetch(vote.user),
        uwu = await client.dbl.getBot(client.config.botID),
        config = require('../../config.js'),
        embed = new (require('discord.js').MessageEmbed)()
          .setColor(client.fns.selectColor('lightcolors'))
          .setThumbnail(user.displayAvatarURL())
          .setTitle('<:upvote:651571911632879626> | ¡Un usuario ha votado por ' + config.bot + '!')
          .setDescription('¡Tú también vota por ' + config.bot + ' [haciendo clic aquí](https://top.gg/bot/' + config.botID + '/vote)!')
          .addField('• Usuario', `~ Tag: **${user.tag}**\n~ ID: **${user.id}**`)
          .addField('• Total de votos', `~ Este mes: **${uwu.monthlyPoints}**\n~ Desde siempre: **${uwu.points}**`)
          .setTimestamp()
          .addField('• Multiplicador', client.dbl.isWeekend() ? '¡Fin de semana, tu voto cuenta x2!' : 'Sólamente los fines de semana');
      if (vote.type === 'test') embed.setFooter('(Voto de prueba)');
      client.votes.send(embed);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'voteDBL',
        error: e,
      });
    }
  }
};
