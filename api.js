const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const publisher = require('./publisher')

app.use(bodyParser.json())

app.post('/', async (req, res) => {
  await publisher.sendMsg(req.body.msg, req.body.domain)
  res.json({published: true})
})

app.listen(9000, () => {
  console.log('LISTEN 9000')
})
