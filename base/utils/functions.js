module.exports = {
  makeID() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  checkDays(date) {
    let days = Math.floor((new Date().getTime() - date.getTime()) / 86400000);
    return days + (days === 1 ? ' día' : ' días');
  },
  selectColor(color, lean) {
    if (!color || typeof color !== 'string') throw Error('Necesitas seleccionar un color y que sea un String.');
    let c = color.toLowerCase(),
      colors = require('./colors');
    if (!(c in colors)) throw TypeError('Especifica un color válido.');
    let a = colors[c];
    return !lean ? `#${a[Math.floor(Math.random() * a.length)]}` : `${a[Math.floor(Math.random() * a.length)]}`;
  },
  getPrefix(message, data) {
    const mentionPrefix = new RegExp(`^<@!?${message.client.config.botID}>`).exec(message.content);
    const prefixes = [`${mentionPrefix}`, message.guild ? data.guild.prefix : message.client.config.prefix];
    let prefix = undefined;
    prefixes.forEach(p => {
      if (message.content.startsWith(p)) {
        message.guild ? (prefix = p) : (prefix = message.client.config.prefix);
      }
    });
    return prefix;
  },
  reverseString(str) {
    return str
      .split('')
      .reverse()
      .join('');
  }
};
