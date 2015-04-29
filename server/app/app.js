require('babel/register')({
  stage: 0
})
require('dotenv').load()

var config = require('config')
var express = require('express')
var bodyparser = require('body-parser')
var multer = require('multer')
var routes = require('./routes')

var app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(multer())
app.use(routes)

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
