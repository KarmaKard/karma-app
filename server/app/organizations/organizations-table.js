import r from '../database'

export function index() {
  return r.table('organizations').run() // returns a Promise object
}

export function insert(user) {
  return r.table('organizations').insert(user).run()
}
