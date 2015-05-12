import errors, { serialize as serializeErrors } from 'express-validator-errors'
import { ValidationError, UnauthorizedError } from '../../common/errors'

export default function validateUpdate (req, res, next) {
  if (!req.body.organization) {
    errors.addToReq(req, 'organization', 'Root "organization" parameter is required')
    return next(new ValidationError(req))
  }

  if (!req.user.isSuperAdmin) {
    delete req.body.organization.status
    if (req.body.organization.userId !== req.user.id) {
      return next(new UnauthorizedError('User not authorized to update organization'))
    }
  }

  req.checkBody(['organization', 'id'], 'Organization ID is required').notEmpty()
  req.checkBody(['organization', 'name'], 'Organization name is required').notEmpty()
  req.checkBody(['organization', 'type'], 'Organization type is required').notEmpty()

  next(req.validationErrors() ? new ValidationError(req) : null)
}
