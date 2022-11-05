const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  isOperator: {
    type: Boolean,
  },
})
const hashPassword = bcrypt.hashSync('operator123', 10)
const operatorModel = mongoose.model('operator', schema)

const defaultOperator = new operatorModel({
  username: 'operator',
  password: 'operator123',
  hashedPassword: hashPassword,
  isOperator: true,
})

defaultOperator.save((err) => {
  if (err) return console.log('Message: ' + err)
})

module.exports = operatorModel
