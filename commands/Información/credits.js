module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'credits',
      description: 'Muestra todos los usuarios honoríficos que contribuyeron por ' + require('../../config').bot,
      usage: (prefix) => `\`${prefix}credits\``,
      examples: (prefix) => `\`${prefix}credits\``,
      enabled: true,
      cooldown: 2.5,
      aliases: ['acknowledgements'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let devMon = await client.users.fetch(client.config.owners[0]),
        devJavi = await client.users.fetch(client.config.owners[1]),
        devGameboy = await client.users.fetch(client.config.owners[2]),
        designDino = await client.users.fetch('410737385509355530'),
        designDevsaider = await client.users.fetch('280985817097306113'),
        donateMixedxx = await client.users.fetch('348683994474217472'),
        donateJunt = await client.users.fetch('501174560151044106'),
        publiRogue = await client.users.fetch('494150648426790913'),
        botKae = await client.users.fetch('431638353189011517');
      embed
        .setTitle(client.message({ emoji: 'heart', razón: 'contribuidores al desarrollo de ' + client.config.bot, message }))
        .addField('• Desarrolladores', `~ ${devJavi.tag}\n~ ${devMon.tag}\n~ ${devGameboy.tag}`, true)
        .addField('• Diseñadores', `~ ${designDino.tag}\n~ ${devGameboy.tag}\n~ ${designDevsaider.tag}`, true)
        .addField('• Donadores', `~ ${devMon.tag}\n~ ${donateMixedxx.tag}\n~ ${devGameboy.tag}\n~ ${donateJunt.tag}`, true)
        .addField('• Publicista', `~ ${devMon.tag}\n~ ${publiRogue.tag}`, true)
        .addField('• Bot aliado', `~ ${botKae.tag}`, true)
        .setColor(client.fns.selectColor('lightcolors'));
      message.channel.send({ embed });
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
