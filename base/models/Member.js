let { Schema, model } = require('mongoose');
module.exports = model(
  'Member',
  new Schema({
    id: { type: String },
    guildID: { type: String },
  })
);
