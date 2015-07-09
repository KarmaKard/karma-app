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

export async function getByToken (token) {
  return r.table('password_reset').get(token).run()
}

export async function update (resetObject) {
  var results = await r.table('password').get(resetObject.id).update(resetObject).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return resetObject
}
