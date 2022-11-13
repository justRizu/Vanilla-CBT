const routes = require('../../routes/v1')
const grade = require('../../databases/models/tingkatan')
const MainMiddleware = require('../../middlewares/usermiddleware')

routes.post(
  '/tingkatan',
  MainMiddleware.EnsureTokenOperator,
  async (req, res) => {
    const { tingkatan } = req.body
    const allowed = tingkatan == 'x' || tingkatan == 'xi' || tingkatan == 'xii'
    if (!allowed) {
      return res
        .status(403)
        .json({ Message: 'tingkatan yang diperbolehkan hanya x, xi, xii' })
    }
    const findOne = await grade.findOne({ tingkatan })
    if (findOne)
      return res.status(403).json({ Message: 'tingkatan sudah tersedia' })
    const data = new grade({ tingkatan })
    data.save((err) => {
      if (err) return res.status(403).json({ Message: err })
    })
    res.status(202).json({ Message: 'berhasil menambahkan tingkatan' })
  }
)

routes.get('/tingkatan', async (req, res) => {
  const data = await grade.find()
  const total = data.length
  res.status(200).json({ Message: 'success', total, data })
})

routes.get('/tingkatan/:id', async (req, res) => {
  const { id } = req.params
  const data = await grade.findById(id)
  if (!data) {
    return res.status(404).json({ Message: 'data not found' })
  }
  res.status(200).json({ Message: 'success', data })
})

routes.delete(
  '/tingkatan/:id',
  MainMiddleware.EnsureTokenOperator,
  async (req, res) => {
    const { id } = req.params
    const data = await grade.findByIdAndDelete(id)
    if (!data) {
      return res.status(404).json({ Message: 'data not found' })
    }
    res.status(200).json({ Message: 'data berhasil di hapus' })
  }
)
