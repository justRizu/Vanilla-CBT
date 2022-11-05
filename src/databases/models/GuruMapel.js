const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    nama: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('GuruMapel', schema)
