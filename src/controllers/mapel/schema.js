const yup = require('yup')

const registerSchema = yup.object({
  namaMapel: yup.string().required('nama mapel harus di isi!'),
})

const schema = { registerSchema }

module.exports = schema
