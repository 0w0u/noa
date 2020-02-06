module.exports = class command extends require('../../base/models/Command.js') {
  constructor(client) {
    super(client, {
      name: 'npm',
      description: 'Realiza una búsqueda sobre los paquetes en NPM.',
      usage: prefix => `\`${prefix}npm <package>\``,
      examples: prefix => `\`${prefix}npm discord.js\``,
      enabled: true,
      ownerOnly: true,
      guildOnly: false,
      cooldown: 4,
      aliases: [],
      botPermissions: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data, embed) {
    let client = this.client;
    try {
      if (!args[0]) message.channel.send('Necesitas especificar un paquete para buscar.');
      else {
        let u = await require('node-superfetch').get('https://skimdb.npmjs.com/registry' + args[0].toLowerCase());
        if (u.status === 404) message.channel.send('Paquete no encontrado.');
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
/*
      if (args.length > 0) {
        fetch
          .get('https://skimdb.npmjs.com/registry/' + args[0].toLowerCase())
          .then(body => {
            message.channel.send({
              embed: {
                title: 'Paquete NPM',
                color: 3066993,
                thumbnail: {
                  url: 'https://luisfuentes.me/images/npm.png'
                },
                fields: [
                  { name: 'Nombre', value: body.body.name },
                  { name: 'Descripción', value: body.body.description },
                  { name: 'Autor', value: body.body.author.name },
                  { name: 'Última versión', value: body.body['dist-tags'].latest },
                  {
                    name: 'GitHub',
                    value: body.body.repository
                      ? body.body.repository.url
                          .replace('git+', '')
                          .replace('.git', '')
                          .replace('git://', 'https://')
                          .replace('git@github.com:', 'https://github.com/')
                      : 'No Repository'
                  },
                  { name: 'Mantenedores', value: body.body.maintainers.map(m => m.name).join(', ') }
                ]
              }
            });
          })
          .catch(error => {
            if (error.status === 404)
              return message.channel.send({
                embed: {
                  title: '❌ ERROR',
                  color: 0xe50000,
                  description: 'Un error ocurrió mientras se buscaba el NPM'
                }
              });
            console.error('Error al tomar el paquete de NPM.', error.message);
            message.reply('Paquete NPM **' + args[0] + '** no fue encontrado');
          });
      } else {
        message.channel.send({
          embed: {
            title: 'Comando incompleto',
            color: 0xe50000,
            description: 'Debes agregar el nombre del NPM a buscar.'
          }
        });
      }
*/
