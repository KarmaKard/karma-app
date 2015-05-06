var r = require('../app/database')

exports.up = function (next) {
  r.tableCreate('users').run().then(() => {
    next()
  })
}

exports.down = function (next) {
  r.tableDrop('users').run().then(() => {
    next()
  })
}

