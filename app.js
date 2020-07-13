const express = require('express')
const createError = require('http-errors')
require('dotenv').config()
require('express-async-errors')

const app = express()
app.use(express.json()) // body parser


// middleware verify access token
const verifyAccessToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, SECRET_KEY_TOKEN, function (err, payload) {
      if (err) throw createError(403, err);
      // console.log(payload);
      req.payload = payload
      next()
    })
  } else {
    throw createError(401, 'require token')
  }
}

app.use('/api/translate', /*verifyAccessToken,*/ require('./routes/translate.route'))

app.use('/api/calculator', /*verifyAccessToken,*/ require('./routes/calculator.route'))

app.use('/', (req, res)=>{
  res.status(200).json({msg: "hello from api"})
})

app.use((req, res, next) => {
  throw createError(404, 'Resource not found.')
})

// global exeption handle, must be end of app.use
app.use((err, req, res, next) => {
  if (typeof err.status === 'undefined' || err.status === 500) {
    console.error(err.stack);
    res.status(500).send('View error log on console.')
  } else {
    res.status(err.status).send(err)
  }
})

app.listen(process.env.EXPOSE_PORT, () => {
  console.log(`API running on PORT ${process.env.EXPOSE_PORT}`)
})

module.exports = app