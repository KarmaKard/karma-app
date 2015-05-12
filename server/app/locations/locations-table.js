import r from '../database'

export function index() {
  return r.table('locations').run()
}

export function insert (locations){
  return r.table('locations')
    .insert(locations, {returnChanges: true})
    .run()
    .then(results => {
      if (results.changes) {
        return results.changes.map(c => c['new_val'])
      }
      return locations
    })
}
