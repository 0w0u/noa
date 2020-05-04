let { Schema, model } = require('mongoose');
module.exports = model(
  'Guild',
  new Schema({
    id: { type: String },
    membersData: { type: Object, default: {} },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    prefix: { type: String, default: require('../../config.js').prefix },
    language: { type: String, default: 'es' },
    moderation: {
      type: Object,
      mute: {
        type: Object,
        default: {
          role: { type: String, default: undefined },
        },
      },
    },
    welcome: {
      enabled: { type: Boolean, default: false },
      channel: { type: String, default: undefined },
      message: {
        enabled: { type: Boolean, default: true },
        text: { type: String, default: '¡Bienvenido **{user:name}** a **{server}**!' },
      },
      image: {
        enabled: { type: Boolean, default: false },
        fondo: { type: String, default: 'https://media.discordapp.net/attachments/674813833063301120/706576389251268650/ezgif.com-crop_waifu2x_art_scale_tta_2.png' },
        colorTexto: { type: String, default: '#8C1489' },
        título: { type: String, default: '¡Bienvenido {user:name}!' },
        descripción: { type: String, default: 'Espero disfrutes tu estancia' },
      },
    },
    goodbye: {
      enabled: { type: Boolean, default: false },
      channel: { type: String, default: undefined },
      message: {
        enabled: { type: Boolean, default: true },
        text: { type: String, default: '¡Adiós **{user:name}**! ¡Te extrañaremos!' },
      },
      image: {
        enabled: { type: Boolean, default: false },
        fondo: { type: String, default: 'https://media.discordapp.net/attachments/674813833063301120/706576389251268650/ezgif.com-crop_waifu2x_art_scale_tta_2.png' },
        colorTexto: { type: String, default: '#8C1489' },
        título: { type: String, default: '¡Adiós {user:name}!' },
        descripción: { type: String, default: '¡Te extrañaremos!' },
      },
    },
  })
);
