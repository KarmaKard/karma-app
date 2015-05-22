import r from '../database'

export function index () {
  return r.table('deals').run()
}

export function insert (deal){
  return r.table('deals')
    .insert(deal, {returnChanges: true})
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
    get(deal.id)
    .update(deal)
    .run()
    .then(results => {
      if (results.changes) {
        return results.changes[0]['new_val']
      }
      return deal
    })
}

export function update (organization) {
  return r.table('organizations')
    .get(organization.id)
    .update(organization)
    .run()
    .then(results => {
      if (results.changes) {
        return results.changes[0]['new_val']
      }
      return organization
    })
}
