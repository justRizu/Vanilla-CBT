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
  const data = await guruMapel.findOne({ _id: dbGuru.id })
  res.status(200).json({ Message: 'success', data })
})

routes.put('/guru/me', MainMiddleware.EnsureTokenPublic, async (req, res) => {
  const dbGuru = req.user
  const { nama, username, password } = req.body
  let hashedPassword
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10)
  }
  const data = await guruMapel.findByIdAndUpdate(
    { _id: dbGuru.id },
    {
      nama,
      username,
      password,
      hashedPassword,
    }
  )
  res.status(200).json({ Message: 'data berhasil di perbarui' })
})

routes.post(
  '/guru/mapel',
  MainMiddleware.EnsureTokenOperator,
  validation(schema.registerSchema),
  async (req, res) => {
    const { nama, username, password, confirmPassword } = req.body
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

routes.get('/guru/mapel', async (req, res) => {
  const data = await guruMapel.find()
  const total = data.length
  res.status(200).json({ Message: 'success', total, data })
})

routes.get('/guru/:id', async (req, res) => {
  const { id } = req.params
  const data = await guruMapel.findById(id)
  if (!data) {
    return res.status(404).json({ Message: 'data not found' })
  }
  res.status(200).json({ Message: 'success', data })
})

routes.put(
  '/guru/:id',
  MainMiddleware.EnsureTokenOperator,
  async (req, res) => {
    const { id } = req.params
    const { nama, username, password } = req.body
    let hashedPassword
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }
    const findGuru = await guruMapel.findById(id)
    if (!findGuru) {
      return res.status(404).json({ Message: 'data not found' })
    }
    const data = await guruMapel.findByIdAndUpdate(id, {
      nama,
      username,
      password,
      hashedPassword,
    })
    res.status(200).json({ Message: 'data berhasil di perbarui' })
  }
)

routes.delete('/guru/:id', async (req, res) => {
  const { id } = req.params
  const findGuru = await guruMapel.findById(id)
  if (!findGuru) {
    return res.status(404).json({ Message: 'data not found' })
  }
  const data = await guruMapel.findByIdAndDelete(id)
  res.json({ Message: 'data berhasil dihapus' })
})

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
