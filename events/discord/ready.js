module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run() {
    let client = this.client,
      prefix = client.config.prefix;
    try {
      let number = 0;
      client.guilds.cache.forEach(x => {
        number += x.memberCount;
      });
      client.userCount = number;
      let elementos = [`❤️ ~ ${client.guilds.cache.size.toLocaleString()} servidores, ${client.userCount.toLocaleString()} usuarios`, `❤️ ~ ${client.config.invite}`, `❤️ ~ ${client.config.dbl}`, `❤️ ~ ${client.config.vote}`, `❤️ ~ ${client.config.donate}`, `❓ ~ ${prefix}help`, `❓ ~ ${client.config.support}`, `❓ ~ ${client.config.github}`, '❓ ~ https://noa.wwmon.xyz', 'e'];
      setInterval(() => {
        client.user.setActivity(elementos[Math.floor(elementos.length * Math.random())]);
      }, 30000);
    } catch (e) {
      client.err({
        type: 'event',
        name: 'ready',
        error: e
      });
    }
  }
};
