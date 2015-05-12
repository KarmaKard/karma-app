import r from '../database'

export function index() {
  return r.table('organizations').run() // returns a Promise object
}

export function insert(organization) {
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
