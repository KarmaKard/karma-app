import { getByEmail } from '../../users/users-table'
import { compare } from '../services/passwords'
import { decode } from '../services/token'
import { UnauthorizedError } from '../errors'

export function password (req, res, next) {
  var pUser = getByEmail(req.body.email)

  pUser.then(users => {
    if (users.length === 0) {
      return Promise.reject(new UnauthorizedError())
    }
    req.user = users[0]
    req.log.trace(req.user, 'User found')
    return compare(req.body.password, req.user.hash)
  }).then((result) => {
    req.log.trace(result, 'Password Hash')
    if (!result) {
      return next(new UnauthorizedError())
    }
    next()
  }).catch(next)
}

export function token (req, res, next) {
  var token = req.get('token')
  var result = decode(token)
  if (!result) {
    return next(new UnauthorizedError())
  }
  req.log.trace(result, 'API Token Decoded')
  req.user = result
  next()
}

export function admin (req, res, next) {
  if (!req.user || !req.user.isSuperAdmin) {
    return next(new UnauthorizedError())
  }
  req.log.trace({
    url: req.originalUrl,
    email: req.user.email,
  }, 'SuperAdmin User performing protected operation')
  next()
}
