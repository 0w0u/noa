module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'credits',
      description: 'Muestra todos los usuarios honoríficos que contribuyeron por ' + require('../../config').bot + '.',
      usage: prefix => `\`${prefix}credits\``,
      examples: prefix => `\`${prefix}credits\``,
      enabled: true,
      cooldown: 2.5,
      aliases: ['acknowledgements'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let obj = {
          dino: '410737385509355530',
          kae: '431638353189011517',
          gameboy: '288032600705204225',
          devsi: '280985817097306113',
          robbi: '284422355147554817',
          notin: '456567119794929684'
        },
        mon = await client.users.fetch(client.config.owners[0]),
        javi = await client.users.fetch(client.config.owners[1]),
        dino = await client.users.fetch(obj.dino),
        kae = await client.users.fetch(obj.kae),
        devsi = await client.users.fetch(obj.devsi),
        gameboy = await client.users.fetch(obj.gameboy),
        robbi = await client.users.fetch(obj.robbi),
        notin = await client.users.fetch(obj.notin);
      embed
        .setAuthor('Contribuidores al desarrollo de ' + client.config.bot, client.user.displayAvatarURL())
        .addField('» Desarrolladores', `~ ${javi.tag}\n~ ${mon.tag}`, true)
        .addField('» Diseñadores', `~ ${dino.tag}\n~ ${devsi.tag}\n~ ${gameboy.tag}`, true)
        .addField('» Donadores', `~ ${mon.tag}\n~ ${robbi.tag}`, true)
        .addField('» Publicista', `~ ${notin.tag}`, true)
        .addField('» Bot aliado', `~ ${kae.tag}`, true)
        .setColor(client.functions.selectColor('lightcolors'));
      message.channel.send({ embed });
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
