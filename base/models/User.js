let { Schema, model } = require('mongoose');
module.exports = model(
  'User',
  new Schema({
    id: { type: String },
    blacklist: {
      type: Object,
      default: {
        bl: false,
        blreason: 'Sin razón'
      }
    }
  })
);
// Acá se pone lo que quieres que un usuario contenga. Si quieres que un usuario tenga "insignias" solo agregas otra cosa en el Objeto.
