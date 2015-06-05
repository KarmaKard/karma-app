import r from '../database'

export async function index() {
  return r.table('redemptions').run()
}

export async function getRedemptionsByUserId (userId){
  return r.table('redemptions')
    .filter(r.row('userId')
    .eq(userId))
    .run()
}

export async function getRedemptionsByOrganizationId (organizationId){
  return r.table('redemptions')
    .filter(r.row('organizationId')
    .eq(organizationId))
    .run()
}

export async function insert (redemption) {
  var results = await r.table('redemptions').insert(redemption, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return redemption
}

