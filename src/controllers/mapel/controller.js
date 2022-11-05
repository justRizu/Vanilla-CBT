const routes = require('../../routes/v1')
const MainMiddleware = require('../../middlewares/usermiddleware')
const validation = require('../../middlewares/validation')
const mapel = require('../../databases/models/mapel')

routes.post('/mapel', MainMiddleware.EnsureTokenOperator, async (req, res) => {
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
})
