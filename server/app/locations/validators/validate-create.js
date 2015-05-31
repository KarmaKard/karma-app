import errors, {serialize as serializeErrors } from 'express-validator-errors'
import {ValidationError} from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.location){
    errors.addToReq(req, 'location', 'Root "location" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['location', 'organizationId'], 'Organization ID is required').notEmpty()
  req.checkBody(['location', 'street'], 'Street is required').notEmpty()
  req.checkBody(['location', 'zip'], 'Zip is required').notEmpty()
  next(req.validationErrors() ? new ValidationError(req) : null)
}