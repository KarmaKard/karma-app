import r from '../database'

export function index () {
  return r.table('users').run()
}

export function insert (pUser) {
  return Promise.resolve(pUser).then(user => {
    return r.table('users').insert(user).run()
  })
}

export function getByEmail (pEmail) {
  return Promise.resolve(pEmail).then(email => {
    return r.table('users').getAll(pEmail, {index: 'email'})
  })
}
