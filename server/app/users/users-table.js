import r from '../database'

export function index () {
  return r.table('users').run()
}

export function insert (user) {
  return r.table('users')
  .insert(user, {returnChanges: true})
  .run()
  .then(results => {
    if (results.changes) {
      return results.changes[0]['new_val']
    }
    return user
  })
}

export function getByEmail (email) {
  return r.table('users').getAll(email, {index: 'email'}).run()
}
