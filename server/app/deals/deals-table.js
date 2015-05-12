import r from '../database'

export function index () {
  return r.table('deals').run()
}

export function insert (deals){
  return r.table('deals')
    .insert(deals, {returnChanges: true})
    .run()
    .then(results => {
      if (results.changes) {
        return results.changes.map(c => c['new_val'])
      }
      return deals
    })
}
