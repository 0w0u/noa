let { Client, Collection, WebhookClient, MessageEmbed } = require('discord.js');
module.exports = class client extends Client {
  constructor(options) {
    super(options);
    /* config */
    this.config = require('../config');
    /* Bot utils */
    this.pokemon = require('./utils/pokemon');
    this.fns = new (require('./utils/functions'))(this);
    this.sep = require('path').sep;
    /* Discord utils */
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.afk = new Collection();
    this.logs = new WebhookClient(this.config.logs.id, this.config.logs.token);
    this.votes = new WebhookClient(this.config.votes.id, this.config.votes.token);
    /* Mongoose Models */
    this.guildsData = require('./models/Guild');
    this.membersData = require('./models/Member');
    this.usersData = require('./models/User');
  }
  /* Cargador de comandos */
  loadCommand(commandPath, commandName) {
    try {
      let props = new (require(`.${commandPath}${require('path').sep}${commandName}`))(this);
      props.config.location = commandPath;
      if (props.init) props.init(this);
      this.commands.set(props.help.name, props);
      props.config.aliases.forEach((alias) => this.aliases.set(alias, props.help.name));
      console.log(`Comando ${props.help.name} cargado`);
    } catch (e) {
      console.error(e);
      console.log(`Error cargando comando ${commandName}`);
    }
  }
  /* Descarga un comando para 'relodearlo' */
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) command = this.commands.get(commandName);
    else if (this.aliases.has(commandName)) command = this.commands.get(this.aliases.get(commandName));
    if (command.shutdown) await command.shutdown(this);
    delete require.cache[require.resolve(`.${commandPath}${require('path').sep}${commandName}.js`)];
    return false;
  }
  /* Postea un error en un comando o evento */
  err(data) {
    let embed = new MessageEmbed().setColor(this.fns.selectColor('lightcolors')).setDescription(`\`\`\`js\n${data.error}\n\`\`\``);
    if (data.type === 'command') {
      data.message.channel.send(this.message({ emoji: 'red', razón: `ha ocurrido un error\nPor favor repórtalo en mi servidor de soporte <https://noabot.xyz/support>`, message: data.message }));
      embed.setTitle(`\`comando\`: Error en \`${data.name}\``);
    } else if (data.type === 'event') {
      embed.setTitle(`\`evento\`: Error en \`${data.name}\``);
    }
    this.logs.send(embed);
    console.error(data.error);
  }
  message(data) {
    /*
    client.message({ emoji: 'green|gray|red', razón: 'noargs|message', usage: this.help.usage(message.prefix), message })
    no args
    client.message({ emoji: 'red', razón: 'noargs', usage: this.help.usage(message.prefix), message })
    */
    let message = data.message,
      emoji = data.emoji,
      razón = data.razón,
      s = '',
      noargs = ['faltan argumentos', 'parece que te faltan palabras', 'creo que se te han perdido argumentos'];
    emoji = emoji.toLowerCase();
    if (typeof razón === 'object') razón = razón[Math.floor(Math.random() * razón.length)];
    razón = razón.split(/ +/g);
    if (emoji === 'green') s += '<:ncGreenCheck:704037885980180621>';
    else if (emoji === 'gray') s += '<:ncGrayCheck:704037907132055682>';
    else if (emoji === 'red') s += '<:ncRedCheck:704038127915761794>';
    else if (emoji === 'heart') s += ['<:ncHeartI:704035947146248242>', '<:ncHeartII:704036010765451306>', '<:ncHeartIII:704036090239123468>', '<:ncHeartIV:704039144774434970>', '<:ncHeartIX:704039552599326832>', '<:ncHeartV:704039230858592276>', '<:ncHeartVI:704039341248348250>', '<:ncHeartVII:704039389894017025>', '<:ncHeartVIII:704039443178324078>', '<:ncHeartX:704039587806314588>', '<:ncHeartXI:704039772955344967>', '<:ncHeartXII:704039923002638407>', '<:ncHeartXIII:704040055072620564>', '<:ncHeartXIV:704040231112015992>', '<:ncHeartXIX:704040473857360015>', '<:ncHeartXV:704040272664723559>', '<:ncHeartXVI:704040305183293440>', '<:ncHeartXVII:704040352847495199>', '<:ncHeartXVIII:704040383038095440>', '<:ncHeartXX:704040510074912798>', '<:ncHeartXXI:704040566551478282>'][Math.floor(Math.random() * 21)];
    else if (emoji === 'noidea') s += ['🥴', '😕', '🙄'][Math.floor(Math.random() * 3)];
    else if (emoji === 'sad') s += ['😞', '😔', '😟', '🙁', '😣', '😫', '😦', '😧', '😪'][Math.floor(Math.random() * 9)];
    else s += emoji;
    s += ' ~ **' + message.author.username + '**, ';
    if (razón[0].toLowerCase() === 'noargs') return (s += (!razón[1] ? noargs[Math.floor(Math.random() * noargs.length)] + '\n' : razón.slice(1).join(' ') + '\n') + '> **Uso:** ' + data.usage);
    else return (s += razón.join(' '));
  }
  /* Encuentra o crea un usuario en la base de datos */
  async findOrCreateUser(param, isLean) {
    let usersData = this.usersData;
    return new Promise(async function (resolve, reject) {
      let userData = isLean ? await usersData.findOne(param).lean() : await usersData.findOne(param);
      if (userData) {
        resolve(userData);
      } else {
        userData = new usersData(param);
        await userData.save();
        resolve(isLean ? userData.toJSON() : userData);
      }
    });
  }
  /* Encuentra o crea un miembro en la base de datos */
  async findOrCreateMember(param, isLean) {
    let membersData = this.membersData;
    let guildsData = this.guildsData;
    return new Promise(async function (resolve, reject) {
      let memberData = isLean ? await membersData.findOne(param).lean() : await membersData.findOne(param);
      if (memberData) {
        resolve(memberData);
      } else {
        memberData = new membersData(param);
        await memberData.save();
        let guild = await guildsData.findOne({ id: param.guildID });
        if (guild) {
          guild.members.push(memberData._id);
          await guild.save();
        }
        resolve(isLean ? memberData.toJSON() : memberData);
      }
    });
  }
  /* Encuentra o crea un servidor en la base de datos */
  async findOrCreateGuild(param, isLean) {
    let guildsData = this.guildsData;
    return new Promise(async function (resolve, reject) {
      let guildData = isLean ? await guildsData.findOne(param).populate('members').lean() : await guildsData.findOne(param).populate('members');
      if (guildData) {
        resolve(guildData);
      } else {
        guildData = new guildsData(param);
        await guildData.save();
        resolve(guildData.toJSON());
      }
    });
  }
};
