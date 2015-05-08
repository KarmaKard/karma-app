import r from '../database'

export function index () {
  return r.table('deals').run()
}

export function insert (deals){
  return Promise.resolve(deals).then(deals => {
    return r.table('deals').insert(deals).run()
  })
}