import r from '../database'

export function index() {
  return r.table('locations').run()
}

export function insert (locations){
  return Promise.resolve(locations).then(locations => {
    return r.table('locations').insert(locations).run()
  })
}