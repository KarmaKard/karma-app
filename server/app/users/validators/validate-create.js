import errors, { serialize as serializeErrors } from 'express-validator-errors'
import { ValidationError } from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.user) {
    errors.addToReq(req, 'user', 'Root "user" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['user', 'first_name'], 'User first_name is required').notEmpty()
  req.checkBody(['user', 'last_name'], 'User last_name is required').notEmpty()
  next(req.validationErrors() ? new ValidationError(req) : null)
}
