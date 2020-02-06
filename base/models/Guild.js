let { Schema, model } = require('mongoose');
module.exports = model(
  'Guild',
  new Schema({
    id: { type: String },
    membersData: { type: Object, default: {} },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    prefix: { type: String, default: require('../../config.js').prefix },
    moderation: {
      type: Object,
      mute: {
        type: Object,
        default: {
          role: { type: String, default: undefined }
        }
      }
    }
  })
);
