const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    jurusan: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('jurusan', schema)
