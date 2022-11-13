const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    tingkatan: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('tingkatan', schema)
