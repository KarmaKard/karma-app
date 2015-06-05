import errors, { serialize as serializeErrors } from 'express-validator-errors'
import { ValidationError } from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.redemption) {
    errors.addToReq(req, 'redemption', 'Root "redemption" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['redemption', 'userId'], 'userId is required').notEmpty()
  req.checkBody(['redemption', 'dealId'], 'dealId is required').notEmpty()
  req.checkBody(['redemption', 'code'], 'code is required').notEmpty()
  
  next(req.validationErrors() ? new ValidationError(req) : null)
}
