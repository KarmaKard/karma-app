import errors, {serialize as serializeErrors } from 'express-validator-errors'
import {ValidationError} from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.deal){
    errors.addToReq(req, 'deal', 'Root "Deal" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['deal', 'organizationId'], 'OrgID is required').notEmpty()
  req.checkBody(['deal', 'limit'], 'Limit is required').notEmpty()
  req.checkBody(['deal', 'type'], 'Deal type is required').notEmpty()
  req.checkBody(['deal', 'primaryProductName'], 'threshold is required').notEmpty()
  next(req.validationErrors() ? new ValidationError(req) : null)
}

