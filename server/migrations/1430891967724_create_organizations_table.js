var r = require('../app/database')

exports.up = function (next) {
  r.tableCreate('organizations').run().then(() => {
    next()
  })
}

exports.down = function (next) {
  r.tableDrop('organizations').run().then(() => {
    next()
  })
}
