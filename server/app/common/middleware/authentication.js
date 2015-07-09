import { getByEmail } from '../../users/users-table'
import { compare } from '../services/passwords'
import { decode } from '../services/token'
import { UnauthorizedError } from '../errors'

export async function password (req, res, next) {
  try {
    var users = await getByEmail(req.body.email)

    if (users.length === 0) {
      throw new UnauthorizedError()
    }

    req.user = users[0]
    req.log.trace(req.user, 'User found')

    var result = await compare(req.body.password, req.user.hash)
    if (!result) {
      req.log.warn(result, 'Password Hash Mismatch')
      throw new UnauthorizedError()
    }

    req.log.info(result, 'Password Hash Match')
    next()
  } catch (e) {
    next(e)
  }
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
  if (!req.user || !req.user.roles.superadmin) {
    return next(new UnauthorizedError())
  }
  req.log.trace({
    url: req.originalUrl,
    email: req.user.email,
  }, 'SuperAdmin User performing protected operation')
  next()
}
