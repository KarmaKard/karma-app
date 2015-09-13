import r from '../database'

export async function index () {
  return r.table('donations').run()
}

export async function insert (donation) {
  var results = await r.table('donations').insert(donation, {returnChanges: true}).run()
  return results.changes[0]['new_val']
}

export async function multiInsert (donations) {
  var results = await r.table('donations').insert(donations, {returnChanges: true}).run()
  return results.changes
}

export async function update (donation) {
  var results = await r.table('donations').get(donation.id).update(donation, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return donation
}

export async function getById (donationId) {
  return await r.table('donations').get(donationId).run()
}

export async function updateByPaymentActivation (paymentId, userId) {
  var results = await r.table('donations').filter({paymentId: paymentId}).update({userId: userId, activationStatus: 'active'}, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes
  }
  return paymentId
}
