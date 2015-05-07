import config from 'config'
import jwt from 'jwt-simple'

export function encode (user) {
  var clone = Object.assign({}, user)
  delete clone.password
  delete clone.hash
  return jwt.encode(clone, config.token.secret, 'HS512')
}

export function decode (token) {
  try {
    return jwt.decode(token, config.token.secret)
  } catch (err) {
    return false
  }
}
