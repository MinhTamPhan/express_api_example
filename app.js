const express = require('express')
require('dotenv').config()

const app = express()

app.listen(process.env.EXPOSE_PORT, () => {
  console.log(`API running on PORT ${process.env.EXPOSE_PORT}`)
})