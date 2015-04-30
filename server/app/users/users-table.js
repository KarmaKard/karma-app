import r from '../database'

export function index() {
  return r.table('users').run() // returns a Promise object
}

export function insert(user) {
  return r.table('users').insert(user).run()
}
