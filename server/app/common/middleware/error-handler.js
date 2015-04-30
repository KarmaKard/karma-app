import { serialize } from 'express-validator-errors'
import { BaseError } from '../errors'

export default function errorHandler (err, req, res, next) {
  if (err instanceof BaseError) {
    return err.handle(req, res)
  }
  req.log.error(err, 'Unhandled Error')
  res.status(500).json(serialize(err))
}
