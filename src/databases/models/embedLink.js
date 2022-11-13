const mongoose = require('mongoose')

const schema = mongoose.Schema(
  {
    embedLink: {
      type: String,
    },
    mapel: {
      type: mongoose.Types.ObjectId,
      ref: 'mapel',
    },
    guruMapel: {
      type: mongoose.Types.ObjectId,
      ref: 'GuruMapel',
    },
    tingkatan: {
      type: mongoose.Types.ObjectId,
      ref: 'tingkatan',
    },
    jurusan: {
      type: mongoose.Types.ObjectId,
      ref: 'jurusan',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('EmbedLink', schema)
