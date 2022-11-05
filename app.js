const express = require('express')
const app = express()
const routes = require('./src/routes/v1')
const mongoose = require('mongoose')
const logger = require('morgan')
require('dotenv').config()

const { APP_PORT, MONGO_CONNECTION } = process.env

mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.use(express.json())
    app.use('/v1', routes)
    app.use(logger('dev'))
    app.listen(8000, () => {
      console.log(`app running at port ${APP_PORT} & database connected`)
    })
  })
  .catch((err) => {
    console.log('Message : ' + err)
  })
