const routes = require('../../routes/v1')
const guruMapel = require('../../databases/models/GuruMapel')
const bcrypt = require('bcrypt')
const validation = require('../../middlewares/validation')
const schema = require('./schema')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const MainMiddleware = require('../../middlewares/usermiddleware')
require('dotenv').config()

routes.get('/', (req, res) => {
  res.send('deploy success')
})

routes.get('/guru/me', MainMiddleware.EnsureTokenPublic, async (req, res) => {
  const dbGuru = req.user
  const data = await guruMapel.findOne({ _id: dbGuru.id }).populate('EmbedLink')
  res.status(200).json({ Message: 'success', data })
})

routes.post(
  '/guru/mapel',
  MainMiddleware.EnsureTokenOperator,
  validation(schema.registerSchema),
  async (req, res) => {
    const { nama, username, password } = req.body
    const duplicateGuru = await guruMapel.findOne({ nama, username })
    if (duplicateGuru) {
      return res
        .status(302)
        .json({ Message: 'nama atau username sudah tersedia' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = new guruMapel({
      nama,
      username,
      password,
      hashedPassword,
    })
    data.save()
    res.status(202).json({ Message: 'berhasil menambahkan guru baru' })
  }
)

routes.post('/guru/login', validation(schema.loginSchema), async (req, res) => {
  const { username, password } = req.body
  const data = await guruMapel.findOne({ username })
  if (!data) {
    return res.status(404).json({ Message: 'user tidak ditemukan' })
  }
  const verifiedPassword = await bcrypt.compare(password, data.hashedPassword)
  if (!verifiedPassword) {
    return res.status(401).json({ Message: 'password salah' })
  }
  const payload = {
    id: data._id,
    nama: data.nama,
    username: data.username,
  }
  const token = jwt.sign(payload, process.env.GURU_ACCESS_TOKEN, {
    expiresIn: '1d',
  })
  res.status(200).json({ Message: 'login berhasil', token })
})
