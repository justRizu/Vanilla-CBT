const yup = require('yup')

const registerSchema = yup.object({
  embedLink: yup.string().required('embed link harus di isi!'),
  tingkatan: yup.string().required('tingkatan lengkap harus di isi!'),
  jurusan: yup.string().required('jurusan lengkap harus di isi!'),
  mapel: yup.string().required('mapel lengkap harus di isi!'),
})

const embedLinkSchema = { registerSchema }

module.exports = embedLinkSchema
