var r = require('../app/database')

var tableName = 'donations'

exports.up = function (next) {
  r.tableList().run().then(tables => {
    if (!tables.find(t => t === tableName)) {
      return r.tableCreate(tableName).run()
    }
  }).then(() => {
    next()
  })
}

exports.down = function (next) {
  r.tableList().run().then(tables => {
    if (tables.find(t => t === tableName)) {
      return r.tableDrop(tableName).run()
    }
  }).then(() => {
    next()
  })
}
