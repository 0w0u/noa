module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run() {
    let client = this.client,
      prefix = client.config.prefix;
    try {
      let number = 0;
      client.guilds.cache.forEach((x) => {
        number += x.memberCount;
      });
      client.userCount = number;
      let elementos = [`❤️ ~ ${client.guilds.cache.size.toLocaleString()} servidores, ${client.userCount.toLocaleString()} usuarios`, `❤️ ~ ${client.config.domain}/invite`, `❤️ ~ ${client.config.domain}/dbl`, `❤️ ~ ${client.config.domain}/vote`, `❤️ ~ ${client.config.domain}/donate`, `❓ ~ ${prefix}help`, `❓ ~ ${client.config.domain}/support`, `❓ ~ ${client.config.domain}/github`, `❓ ~ ${client.config.domain}/`, `❓ ~ v${require('../../package.json').version}`, `🦠 ~ ¡Lávate las manos con frecuencia!`, `😷 ~ Protégete a ti y a los demás`, `🏠 ~ Quédate En Casa`, `🏠 ~ #QuédateEnCasa`, `👍 ~ No seas pendejo y quedate en casa para no contagiar a tu familia y tener el maldito remordimiento de haberlos infectado :D`, `😷 ~ Mon se bañó`, `❤️ ~ Te amo Javi`, `👋 ~ Saludos a la Reina Isabel`];
      setInterval(() => {
        client.user.setActivity(elementos[Math.floor(elementos.length * Math.random())]);
      }, 30000);
      let { body } = await require('node-superfetch')
        .get('https://top.gg/api/bots/' + client.config.botID)
        .set('Authorization', client.config.dblKey);
      client.vMPoints = body.monthlyPoints;
      client.vPoints = body.points;
    } catch (e) {
      client.err({
        type: 'event',
        name: 'ready',
        error: e,
      });
    }
  }
};
