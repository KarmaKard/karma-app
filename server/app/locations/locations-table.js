import r from '../database'

export async function index() {
  return r.table('locations').run()
}

export async function insert (location){
  var results = await r.table('locations').insert(location, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return locations
}
