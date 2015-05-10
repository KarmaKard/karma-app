import errors, {serialize as serializeErrors } from 'express-validator-errors'
import {ValidationError} from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.deals){
    errors.addToReq(req, 'deals', 'Root "Deal" parameter is required')
    return next(new ValidationError(req))
  }

  if (!Array.isArray(req.body.deals)) {
    errors.addToReq(req, 'deals', 'Deals must be an array')
    return next(new ValidationError(req))
  }

  req.body.deals.forEach((deal, index) => {
    req.checkBody(['deals', index, 'organizationId'], 'OrgID is required').notEmpty()
    req.checkBody(['deals', index, 'limit'], 'Limit is required').notEmpty()
    req.checkBody(['deals', index, 'type'], 'Deal type is required').notEmpty()
    req.checkBody(['deals', index, 'discountRate'], 'Discount Rate type is required').notEmpty()
    req.checkBody(['deals', index, 'threshold'], 'threshold is required').notEmpty()
    req.checkBody(['deals', index, 'primaryProductName'], 'threshold is required').notEmpty()

  })

  next(req.validationErrors() ? new ValidationError(req) : null)
}

