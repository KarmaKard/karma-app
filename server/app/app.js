require('babel/register')({
  stage: 0
})
require('dotenv').load()

var config = require('config')
var express = require('express')
var requestId = require('connect-requestid')
var bodyparser = require('body-parser')
var expressValidator = require('express-validator')
var multer = require('multer')
var errorHandler = require('./common/middleware/error-handler')
var routes = require('./routes')
var logger = require('./common/middleware/attach-logger')
var app = express()

app.use(requestId)
app.use(logger.default(logger.create()))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(expressValidator())
app.use(multer())
app.use(routes)

app.use(errorHandler)

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})

module.exports = app
