import r from '../database'

export async function index () {
  return r.table('fundraiser_members').run()
}

export async function insert (member) {
  var results = await r.table('fundraiser_members').insert(member, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return member
}

export async function update (member) {
  var results = await r.table('fundraiser_members').get(member.id).update(member, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return member
}

export async function getById (memberId) {
  return r.table('fundraiser_members').get(memberId).run()
}

export async function updateOwedAmount (memberId, newOweAmount) {
  var results = await r.table('fundraiser_members').get(memberId).update({oweAmount: newOweAmount}, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
}
