var r = require('../app/database')

exports.up = function (next) {
  r.tableCreate('locations').run().then(() => {
    next()
  })
}

exports.down = function (next) {
  r.tableDrop('locations').run().then(() => {
    next()
  })
}
