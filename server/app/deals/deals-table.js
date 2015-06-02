import r from '../database'

export async function index () {
  return r.table('deals').run()
}

export async function insert (deals) {
  var results = await r.table('deals').insert(deals, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return deal
}

export async function update (deal) {
  var results = await r.table('deals').get(deal.id).update(deal, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return deal
}

export async function del (deal) {
  var results = await r.table('deals').get(deal.id).delete({returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['old_val']
  }
  return deal
}
