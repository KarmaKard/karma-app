var config = require('config')
var r = require('rethinkdbdash')()

var dbName = config.database.name

exports.up = function (next) {
  r.dbList().run().then(databases => {
    if (!databases.find(t => t === dbName)) {
      return r.dbCreate(dbName).run()
    }
  }).then(() => {
    next()
  })
}

exports.down = function (next) {
  r.tableList().run().then(databases => {
    if (databases.find(t => t === dbName)) {
      return r.dbDrop(dbName).run()
    }
  }).then(() => {
    next()
  })
}
