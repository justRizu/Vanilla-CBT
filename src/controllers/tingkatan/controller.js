const routes = require('../../routes/v1')
const major = require('../../databases/models/jurusan')
const MainMiddleware = require('../../middlewares/usermiddleware')

routes.post(
  '/jurusan',
  MainMiddleware.EnsureTokenOperator,
  async (req, res) => {
    const { jurusan } = req.body
    const allowed =
      jurusan == 'rpl' || jurusan == 'akuntansi' || jurusan == 'hotel'
    if (!allowed) {
      return res.status(403).json({
        Message: 'jurusan yang diperbolehkan hanya rpl, akuntansi dan hotel',
      })
    }
    const findOne = await major.findOne({ major })
    if (findOne)
      return res.status(403).json({ Message: 'jurusan sudah tersedia' })
    const data = new major({ jurusan })
    data.save((err) => {
      if (err) return res.status(403).json({ Message: err })
    })
    res.status(202).json({ Message: 'berhasil menambahkan jurusan' })
  }
)

routes.get('/jurusan', async (req, res) => {
  const data = await major.find()
  const total = data.length
  res.status(200).json({ Message: 'success', total, data })
})

routes.get('/jurusan/:id', async (req, res) => {
  const { id } = req.params
  const data = await major.findById(id)
  if (!data) {
    return res.status(404).json({ Message: 'data not found' })
  }
  res.status(200).json({ Message: 'success', data })
})

routes.delete('/jurusan/:id', async (req, res) => {
  const { id } = req.params
  const data = await major.findByIdAndDelete(id)
  if (!data) {
    return res.status(404).json({ Message: 'data not found' })
  }
  res.status(200).json({ Message: 'data berhasil di hapus' })
})
