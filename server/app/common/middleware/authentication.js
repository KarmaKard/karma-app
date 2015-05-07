import { getByEmail } from '../../users/users-table'
import { compare } from '../services/passwords'
import { decode } from '../services/token'

export function password (req, res, next) {
  var pUser = getByEmail(req.body.email)

  var passwordIsCorrect = pUser.then(users => {
    if (users.length === 0) {
      return res.sendStatus(404)
    }
    req.user = users[0]
    req.log.trace(req.user, 'User found')
    return compare(req.body.password, req.user.hash)
  }).catch(next)

  passwordIsCorrect.then((result) => {
    req.log.trace(result, 'Password Hash')
    if (!result) {
      return res.sendStatus(401)
    }
    next()
  }).catch(next)
}

export function token (req, res, next) {
  var token = req.get('token')
  var result = decode(token)
  if (!result) {
    return res.sendStatus(401)
  }
  req.log.trace(result, 'API Token Decoded')
  req.user = result
  next()
}
