const express = require('express')
const routes = express.Router()

module.exports = routes
require('../controllers/GuruMapel/controller')
require('../controllers/operator/controller')
require('../controllers/mapel/controller')
require('../controllers/EmbedLink/controller')
require('../controllers/tingkatan/controller')
require('../controllers/jurusan/controller')
