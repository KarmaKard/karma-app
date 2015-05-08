var r = require('../app/database')

exports.up = function (next) {
  r.tableCreate('deals').run().then(() => {
    next()
  })
}

exports.down = function (next) {
  r.tableDrop('deals').run().then(() => {
    next()
  })
}
