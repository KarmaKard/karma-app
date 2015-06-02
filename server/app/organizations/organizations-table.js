import r from '../database'

export async function index() {
  return r.table('organizations').run()
}

export async function getOrganizationsByUserId (userId){
  return r.table('organizations')
    .filter(r.row('userId')
    .eq(userId))
    .run()
}

export async function getById (id){
  return r.table('organizations')
    .get(organization.id)
    .run()
}

export async function insert (organization) {
  var results = await r.table('organizations').insert(organization, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return organization
}

export async function update (organization) {
  var results = await r.table('organizations').get(organization.id).update(organization).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return organization
}
