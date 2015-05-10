import errors, {serialize as serializeErrors } from 'express-validator-errors'
import {ValidationError} from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.locations){
    errors.addToReq(req, 'locations', 'Root "location" parameter is required')
    return next(new ValidationError(req))
  }

  if (!Array.isArray(req.body.locations)){
    errors.addtoReq(req, 'locations', 'Locations must be an array')
    return next(new ValidationError(req))
  }

  req.body.locations.forEach((location, index) => {
    req.checkBody(['locations', index, 'orgId'], 'OrgID is required').notEmpty()
    req.checkBody(['locations', index, 'street'], 'Street is required').notEmpty()
    req.checkBody(['locations', index, 'city'], 'City is required').notEmpty()
    req.checkBody(['locations', index, 'state'], 'State is required').notEmpty()
    req.checkBody(['locations', index, 'zip'], 'Zip is required').notEmpty()
    req.checkBody(['locations', index, 'latitude'], 'latitude is required').notEmpty()
    req.checkBody(['locations', index, 'longitude'], 'Longitude is required').notEmpty() 
  })
  
  next(req.validationErrors() ? new ValidationError(req) : null)
}