const yup = require('yup')

const loginSchema = yup.object({
  username: yup.string().required('username atau email harus di isi!'),
  password: yup
    .string()
    .min(8, 'password harus berisi 8 karakter')
    .required('password harus di isi!'),
})

const userSchema = { loginSchema }

module.exports = userSchema
