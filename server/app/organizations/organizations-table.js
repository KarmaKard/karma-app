import r from '../database'

export function index() {
  return r.table('organizations').run()
}

export function getOrganizationsByUserId (userId){
  return r.table('organizations')
    .filter(r.row('userId')
    .eq(userId))
    .run()
}

export function getById (id){
  return r.table('organizations')
    .get(organization.id)
    .run()
}

export function insert (organization) {
  return r.table('organizations')
    .insert(organization, {returnChanges: true})
    .run()
    .then(results => {
      if (results.changes) {
        return results.changes[0]['new_val']
      }
      return organization
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
