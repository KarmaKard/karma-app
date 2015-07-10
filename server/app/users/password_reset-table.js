import r from '../database'

export async function index () {
  return r.table('password_reset').run()
}

export async function insert (resetObject) {
  var results = await r.table('password_reset').insert(resetObject, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return resetObject
}

export async function getById (token) {
  return r.table('password_reset').get(token).run()
}

export async function update (passwordResetId) {
  var results = await r.table('password_reset').get(passwordResetId).update(
    function (resetObject) {
      return r.branch(
        resetObject('expiration').toEpochTime().gt(r.now().toEpochTime()),
        {status: 'used'},
        {status: 'expired'}
      )
    }, {returnChanges: true}).run()

  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return await r.table('password_reset').get(passwordResetId)
}
