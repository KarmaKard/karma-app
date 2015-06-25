import r from '../database'

export async function insert (stripeData) {
  var results = await r.table('organization_stripe').insert(stripeData, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return stripeData
}