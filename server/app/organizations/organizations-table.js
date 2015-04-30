import r from '../database'

export function index() {
  return r.table('organizations').run() // returns a Promise object
}

export function insert(organization) {
  return r.table('organizations').insert(organization).run()
}
