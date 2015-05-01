import errors, { serialize as serializeErrors } from 'express-validator-errors'
import { ValidationError } from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.organization) {
    errors.addToReq(req, 'organization', 'Root "organization" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['organization', 'name'], 'Organization name is required').notEmpty()
  req.checkBody(['organization', 'type'], 'Organization type is required').notEmpty()
  next(req.validationErrors() ? new ValidationError(req) : null)
}
