let { Schema, model } = require('mongoose');
module.exports = model(
  'User',
  new Schema({
    id: { type: String },
    blacklist: {
      type: Object,
      default: {
        bl: false,
        blreason: 'Sin razón',
      },
    },
  })
);
