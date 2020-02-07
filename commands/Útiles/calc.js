module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'calc',
      description: 'Realiza operaciones matemáticas.\n\n> **Opciones:**\n `+` para realizar una suma.\n`-` para realizar una resta.\n`*` para realizar multiplicaciones.\n`/` para realizar divisiones.\n`^` para elevar un número.\n`pi` equivalente a π (3.141592653589793)\n`mm - cm - mm - m - dam - hm - km` unidades de distancia.\n`to` convierte una unidad de distancia en otra.\n[Más información dando click acá](https://mathjs.org/docs/index.html)',
      usage: prefix => `\`${prefix}calc <operación>\``,
      examples: prefix => `\`${prefix}calc 360-234\n${prefix}calc 100m to cm\n${prefix}calc 65*pi-54+34/2\``,
      enabled: true,
      cooldown: 4,
      aliases: ['calculate', 'math'],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send('Ingresa una operación para calcular.');
      else {
        let msg = await message.channel.send(client.replies.reply('generating', message));
        try {
          var resp = require('mathjs').evaluate(args.join(' '));
        } catch (e) {
          return msg.delete(), message.channel.send(`Ingresa una operación válida.\nUtiliza \`${message.prefix}help calc\` para ver todas las opciones de operación posibles.`);
        }
        embed
          .setColor(client.functions.selectColor('lightcolors'))
          .setTitle(':1234: Calculadora')
          .addField('Operación', `\`\`\`\n${args.join(' ')}\n\`\`\``)
          .addField('Resultado', `\`\`\`\n${resp}\n\`\`\``);
        msg.delete();
        message.channel.send({ embed });
      }
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
