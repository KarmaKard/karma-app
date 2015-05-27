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
        return results.changes[0]['new_val']
      }
      return deal
    })
}

export function update (deal) {
  return r.table('deals')
    .get(deal.id)
    .update(deal, {returnChanges: true})
    .run()
    .then(results => {
      if (results.changes) {
        return results.changes[0]['new_val']
      }
      return deal
    })
}