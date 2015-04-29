import config from 'config'
import rethinkDash from 'rethinkdbdash'

var r = rethinkDash(config.database.params)

export default r
