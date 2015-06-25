import errors, { serialize as serializeErrors } from 'express-validator-errors'
import { ValidationError } from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.user) {
    errors.addToReq(req, 'user', 'Root "user" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['user', 'firstName'], 'User firstName is required').notEmpty()
  req.checkBody(['user', 'lastName'], 'User lastName is required').notEmpty()
  req.checkBody(['user', 'email'], 'User email is required').notEmpty()
  req.checkBody(['user', 'password'], 'User password is required').notEmpty()
  next(req.validationErrors() ? new ValidationError(req) : null)
}
