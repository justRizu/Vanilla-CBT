const routes = require('../../routes/v1')
const MainMiddleware = require('../../middlewares/usermiddleware')
const validation = require('../../middlewares/validation')
const mapel = require('../../databases/models/mapel')
const schema = require('./schema')

routes.post(
  '/mapel',
  MainMiddleware.EnsureTokenOperator,
  validation(schema.registerSchema),
  async (req, res) => {
    const { namaMapel } = req.body
    const duplicateMapel = await mapel.findOne({ namaMapel })
    if (duplicateMapel) {
      return res.status(302).json({ Message: 'mata pelajaran sudah tersedia' })
    }
    const data = new mapel({
      namaMapel,
    })
    data.save((err) => {
      if (err) return console.log('Message : ' + err)
    })
    res.status(202).json({ Message: 'berhasil menambahkan mata pelajaran' })
  }
)

routes.get('/mapel', async (req, res) => {
  const data = await mapel.find()
  const total = data.length
  res.status(200).json({ Message: 'success', total, data })
})

routes.get('/mapel/:id', async (req, res) => {
  const { id } = req.params
  const data = await mapel.findById(id)
  res.status(200).json({ Message: 'succes', data })
})

routes.put(
  '/mapel/:id',
  MainMiddleware.EnsureTokenOperator,
  async (req, res) => {
    const { id } = req.params
    const findMapel = await mapel.findById(id)
    if (!findMapel) {
      return res.status(404).json({ Message: 'data not found' })
    }
    const namaMapel = req.body
    const data = await mapel.findByIdAndUpdate(id, namaMapel)
    res.json({ Message: 'data berhasil di update' })
  }
)

routes.delete(
  '/mapel/:id',
  MainMiddleware.EnsureTokenOperator,
  async (req, res) => {
    const { id } = req.params
    const findMapel = await mapel.findById(id)
    if (!findMapel) {
      return res.status(200).json({ Message: 'data not found' })
    }
    const data = await mapel.findByIdAndDelete(id)
    res.status(200).json({ Message: 'data berhasil dihapus' })
  }
)
