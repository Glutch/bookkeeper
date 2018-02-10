'use strict'

const express = require('express')
const proxy = require('proxy-middleware')
const { app, server, io } = require('./server')
const cfg = require('../config')

const isDeveloping = process.env.NODE_ENV !== 'production'

if (isDeveloping) {
  app.use('/app.js', proxy(`http://localhost:${cfg.webpackPort}/app.js`))
} else {
  app.enable('trust proxy')
}

app.set('view engine', 'ejs')
app.disable('x-powered-by')
app.use(express.static('../dist'))

app.get('*', (req, res) => {
  res.render('main')
})

server.listen(cfg.port, () => {
  console.log('Server started on port ' + server.address().port)
})