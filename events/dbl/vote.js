module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run(vote) {
    let client = this.client;
    try {
      let user = await client.users.fetch(vote.user),
        config = require('../../config.js'),
        { body } = await require('node-superfetch')
          .get('https://top.gg/api/bots/' + client.config.botID)
          .set('Authorization', client.config.dblKey),
        wknd = await require('node-superfetch').get('https://top.gg/api/weekend').set('Authorization', client.config.dblKey),
        embed = new (require('discord.js').MessageEmbed)()
          .setColor(client.fns.selectColor('lightcolors'))
          .setThumbnail(user.displayAvatarURL())
          .setTitle('💞 ~ ¡Un usuario ha votado por ' + config.bot + '!')
          .setDescription('¡Tú también vota por ' + config.bot + ' [haciendo clic aquí](https://top.gg/bot/' + config.botID + '/vote)!')
          .addField('• Usuario', `~ Tag: **${user.tag}**\n~ ID: **${user.id}**`)
          .addField('• Total de votos', `~ Este mes: **${client.dbl.vMPoints.toLocaleString()}**\n~ Desde siempre: **${client.vPoints.toLocaleString()}**`)
          .setTimestamp()
          .addField('• Multiplicador', wknd.body.is_weekend ? '¡Fin de semana, tu voto cuenta x2!' : 'Sólamente los fines de semana');
      if (vote.type === 'test') embed.setFooter('(Voto de prueba)');
      client.votes.send(embed);
      client.vMPoints = body.monthlyPoints;
      client.vPoints = body.points;
    } catch (e) {
      client.err({
        type: 'event',
        name: 'voteDBL',
        error: e,
      });
    }
  }
};
