module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run() {
    let client = this.client,
      prefix = client.config.prefix;
    try {
      let number = 0;
      client.guilds.client.guilds.cache.forEach(x => {
        number += x.memberCount;
      });
      client.userCount = number;
      let elementos = [`gg-botinfo`, `¡Ahora tenemos web!`, `Mon ❤️`, `gg-fox | gg-bigtext`, `${client.guilds.cache.size} servidores con ${client.userCount.toLocaleString()} usuarios`, `${client.commands.size} comandos`, `${prefix}help | V. ${require('../../package.json').version}`, `${prefix}commands | ${prefix}commands --nodm`, `¡Nuevos alias en comandos!`, `${prefix}help <comando | alias>`, `${prefix}botsuggestion`, `@${client.user.tag}help`, `@${client.user.tag}`, client.config.support, `${prefix}invite`, `ser feliz`, `Kae ❤`, `${client.guilds.cache.size} servidores | ${prefix}help`, `${client.userCount.toLocaleString()} usuarios | ${prefix}help`];
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
