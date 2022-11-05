const routes = require('../../routes/v1')
const link = require('../../databases/models/embedLink')
const MainMiddleware = require('../../middlewares/usermiddleware')

routes.post(
  '/embed/link',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const GuruMapel = req.user
    const { embedLink } = req.body
    const data = new link({ embedLink, GuruMapel })
    data.save((err) => {
      if (err) return res.status(500).json({ Message: err })
    })
    res.json({ Message: 'berhasil menambahkan embed link' })
  }
)

routes.get('/embed/link/me', async (req, res) => {
  const guru = MainMiddleware.EnsureTokenPublic
  const data = await link.find({ guruMapel: guru.id }).select('_id, embedLink')
  const total = data.length
  res.status(200).json({ Message: 'success', total, data })
})

routes.get('/embed/link/all', async (req, res) => {
  const data = await link
    .find()
    .populate('GuruMapel', '_id, nama')
    .then((data) => {
      const total = data.length
      if (data) {
        res.status(200).json({ Message: 'success', total, data })
      }
    })
    .catch((err) => {
      if (err) return res.status(500).json({ Message: err })
    })
})
