const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    namaMapel: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('mapel', schema)
