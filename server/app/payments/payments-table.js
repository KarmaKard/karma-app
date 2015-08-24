import r from '../database'

export async function index () {
  return r.table('payments').run()
}

export async function insert (payment) {
  var results = await r.table('payments').insert(payment, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return payment
}

export async function update (payment) {
  var results = await r.table('payments').get(payment.id).update(payment, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return payment
}

export async function getById (paymentId) {
  return r.table('payments').get(paymentId).run()
}
