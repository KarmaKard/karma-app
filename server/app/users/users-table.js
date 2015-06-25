import r from '../database'

export async function index () {
  return r.table('users').run()
}

export async function insert (user) {
  var results = await r.table('users').insert(user, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return user
}

export async function getByEmail (email) {
  return r.table('users').getAll(email, {index: 'email'}).run()
}

export async function update (user) {
  var results = await r.table('users').get(user.id).update(user).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return user}
