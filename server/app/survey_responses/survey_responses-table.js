import r from '../database'

export async function index() {
  return r.table('responses').run()
}

export async function insert (surveyResponse) {
  var results = await r.table('responses').insert(surveyResponse, {returnChanges: true}).run()
  if (results.changes) {
    return results.changes[0]['new_val']
  }
  return surveyResponse
}
