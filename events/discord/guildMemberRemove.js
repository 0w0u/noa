module.exports = class event {
  constructor(client) {
    this.client = client;
  }
  async run(member) {
    let client = this.client;
    try {
      let guild = await client.findOrCreateGuild({ id: member.guild.id });
      if (guild.goodbye.enabled) {
        let goodbye = guild.goodbye,
          channel = member.guild.channels.cache.get(goodbye.channel);
        if (!channel) return;
        else {
          if (!goodbye.message.enabled);
          else {
            let text = goodbye.message.text;
            text = text.replace('{user}', member.user.toString());
            text = text.replace('{user:name}', member.user.username);
            text = text.replace('{user:tag}', member.user.tag);
            text = text.replace('{user:id}', member.user.id);
            text = text.replace('{server}', member.guild.name);
            text = text.replace('{server:count}', member.guild.memberCount);
            channel.send(text);
          }
          if (!goodbye.image.enabled);
          else {
            let image = goodbye.image,
              { get } = require('node-superfetch'),
              desc = image.descripción,
              title = image.título;

            title = title.replace('{user}', member.user.toString());
            title = title.replace('{user:name}', member.user.username);
            title = title.replace('{user:tag}', member.user.tag);
            title = title.replace('{user:id}', member.user.id);
            title = title.replace('{server}', member.guild.name);
            title = title.replace('{server:count}', member.guild.memberCount);

            desc = desc.replace('{user}', member.user.toString());
            desc = desc.replace('{user:name}', member.user.username);
            desc = desc.replace('{user:tag}', member.user.tag);
            desc = desc.replace('{user:id}', member.user.id);
            desc = desc.replace('{server}', member.guild.name);
            desc = desc.replace('{server:count}', member.guild.memberCount);
            let { body } = await get(`https://weez.pw/api/bienvenida?fondo=${image.fondo}&avatar=${member.user.displayAvatarURL()}&h1=${title}&h2=${desc}&color=${image.colorTexto.replace('#', '')}`).set('clave', client.config.weezKey);
            console.log(body.message);
          }
        }
      }
    } catch (e) {
      client.err({
        type: 'event',
        name: 'event',
        error: e,
      });
    }
  }
};
