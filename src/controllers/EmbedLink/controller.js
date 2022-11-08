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
  const data = await link.find({ guruMapel: guru.id })
  const total = data.length
  res.status(200).json({ Message: 'success', total, data })
})

routes.get('/embed/link', async (req, res) => {
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

routes.get('/embed/link/:id', async (req, res) => {
  const { id } = req.params
  const data = await link.findById(id)
  if (!data) {
    return res.status(404).json({ Message: 'data not found' })
  }
  res.status(200).json({ Message: 'success', data })
})

routes.put('/embed/link/:id', async (req, res) => {
  const { id } = req.params
  const { embedLink } = req.body
  const findEmbedLink = await link.findById(id)
  if (!findEmbedLink) {
    return res.status(404).json({ Message: 'data not found' })
  }
  const data = await link.findByIdAndUpdate(id, { embedLink })
  res.status(200).json({ Message: 'data berhasil diperbarui' })
})

routes.delete('/embed/link/:id', async (req, res) => {
  const { id } = req.params
  const data = await link.findByIdAndDelete(id)
  if (!data) {
    return res.status(404).json({ Message: 'data not found' })
  }
  res.status(200).json({ Message: 'data berhasil di hapus' })
})
