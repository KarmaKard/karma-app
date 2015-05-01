
import expressValidator from 'express-validator'

var validator = expressValidator()

export default function stubForValidation (done) {
  var req
  req = {
    query: {},
    body: {},
    params: {},
    session: {},
    param(name) {
      if (!this.params.hasOwnProperty(name)) {
        return this.params[name]
      }
    }
  }
  return validator(req, {}, () => {
    return done(req)
  })
}
