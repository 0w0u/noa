module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'pokémon',
      description: 'Adivina el Pokémon',
      usage: (prefix) => `\`${prefix}pokemon\``,
      examples: (prefix) => `\`${prefix}pokemon\``,
      enabled: true,
      aliases: ['pokemon'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname,
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      let rand = Math.floor(Math.random() * 802),
        poke = rand > 0 ? rand : Math.floor(Math.random() * 802),
        pokem = client.pokemon[poke];
      embed
        .setColor(client.fns.selectColor('lightcolors'))
        .setTitle(client.message({ emoji: '<:ncPokeballOpened:703838742850306119>', razón: '¿cuál es este pokémon?', message }))
        .setImage(pokem.imageURL);
      let msg = await message.channel.send({ embed }),
        filter = (m) => m.author.id === message.author.id,
        attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1 });
      attempts = await attempts.first();
      if (!attempts) {
        msg.edit('** **', { embed: { color: 0xc82828, title: client.message({ emoji: '<:ncPokeballOpened:703838742850306119>', razón: '¿cuál es este pokémon?', message }), image: { url: pokem.imageURL } } });
        message.channel.send(client.message({ emoji: '<:ncPokeballOpened:703838742850306119>', razón: 'tardaste mucho en escribir, ¡al pókemon le dio tiempo a huir!', usage: this.help.usage(message.prefix), message }));
        return;
      } else if (attempts.content.toLowerCase() === pokem.name.toLowerCase()) {
        await msg.edit('** **', { embed: { color: 0x3ce3f7, title: client.message({ emoji: '<:ncPokeballClosed:703838665461334056>', razón: '¿cuál es este pokémon?', message }), image: { url: pokem.imageURL } } });
        message.channel.send(client.message({ emoji: '<:ncPokeballClosed:703838665461334056>', razón: `bien hecho, ¡**${pokem.name[0].toUpperCase()}${pokem.name.slice(1)}** ha sido atrapado!`, usage: this.help.usage(message.prefix), message }));
        return;
      } else {
        await msg.edit('** **', { embed: { color: 0xc82828, title: client.message({ emoji: '<:ncPokeballOpened:703838742850306119>', razón: '¿cuál es este pokémon?', message }), image: { url: pokem.imageURL } } });
        message.channel.send(client.message({ emoji: '<:ncPokeballOpened:703838742850306119>', razón: 'oops, te equivocaste y el pókemon escapó', usage: this.help.usage(message.prefix), message }));
        return;
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
