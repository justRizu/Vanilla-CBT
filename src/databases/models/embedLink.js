const mongoose = require('mongoose')

const schema = mongoose.Schema(
  {
    embedLink: {
      type: String,
    },
    GuruMapel: {
      type: mongoose.Types.ObjectId,
      ref: 'GuruMapel',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('EmbedLink', schema)
