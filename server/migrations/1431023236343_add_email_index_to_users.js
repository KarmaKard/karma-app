var r = require('../app/database')

var indexName = 'email'
var tableName = 'users'

exports.up = function (next) {
  r.table(tableName).indexCreate(indexName).run().then(() => {
    next()
  })
}

exports.down = function (next) {
  r.table(tableName).indexDrop(indexName).run().then(() => {
    next()
  })
}
