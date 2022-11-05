const jwt = require('jsonwebtoken')
const guruMapel = require('../databases/models/GuruMapel')
const operator = require('../databases/models/operator')

const EnsureTokenPublic = (req, res, next) => {
  const tokenPublic = req.headers.tokenpublic
  if (tokenPublic) {
    jwt.verify(
      tokenPublic,
      process.env.GURU_ACCESS_TOKEN,
      async (err, decoded) => {
        if (err) {
          if (err.name == 'TokenExpiredError') {
            return res.status(403).json({ Message: 'token expired' })
          } else {
            return res
              .status(401)
              .json({ Meessage: 'Failed to authenticate token' })
          }
        } else {
          if (decoded) {
            const data = decoded
            const dbGuru = await guruMapel.findOne({ _id: data.id })
            if (!dbGuru) {
              return res
                .status(401)
                .json({ Message: 'illegal access, user not found' })
            }
            req.user = dbGuru
            next()
          }
        }
      }
    )
  } else {
    return res.status(401).json({ Message: 'please login or register first' })
  }
}

const EnsureTokenOperator = (req, res, next) => {
  const tokenOperator = req.headers.tokenoperator
  if (tokenOperator) {
    jwt.verify(
      tokenOperator,
      process.env.OPERATOR_ACCESS_TOKEN,
      async (err, decoded) => {
        if (err) {
          if (err.name == 'TokenExpiredError') {
            return res.status(403).json({ Message: 'token expired' })
          } else {
            return res
              .status(401)
              .json({ Meessage: 'Failed to authenticate token' })
          }
        } else {
          if (decoded) {
            const data = decoded
            const dbGuru = await operator.findOne({ _id: data.id })
            if (!dbGuru) {
              return res
                .status(401)
                .json({ Message: 'illegal access, user not found' })
            }
            if (dbGuru.isOperator === false) {
              return res
                .status(401)
                .json({ Message: `you don't have permission` })
            }
            req.user = dbGuru
            next()
          }
        }
      }
    )
  } else {
    return res.status(401).json({ Message: 'please login or register first' })
  }
}

const MainMiddleware = {
  EnsureTokenPublic,
  EnsureTokenOperator,
}

module.exports = MainMiddleware
