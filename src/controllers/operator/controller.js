const routes = require('../../routes/v1')
const operator = require('../../databases/models/operator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

routes.post('/operator/login', async (req, res) => {
  const { username, password } = req.body
  const data = await operator.findOne({ username })
  if (!data) {
    return res.status(404).json({ Message: 'user tidak ditemukan' })
  }
  const verifiedPassword = await bcrypt.compare(password, data.hashedPassword)
  if (!verifiedPassword) {
    return res.status(401).json({ Message: 'password salah' })
  }
  const payload = {
    id: data._id,
    username: data.username,
    isOperator: data.isOperator,
  }
  const token = jwt.sign(payload, process.env.OPERATOR_ACCESS_TOKEN, {
    expiresIn: '1d',
  })
  res.status(200).json({ Message: 'login berhasil', token })
})
