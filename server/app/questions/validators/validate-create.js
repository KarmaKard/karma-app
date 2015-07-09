import errors, { serialize as serializeErrors } from 'express-validator-errors'
import { ValidationError } from '../../common/errors'

export default function validateCreate (req, res, next) {
  if (!req.body.question) {
    errors.addToReq(req, 'question', 'Root "question" parameter is required')
    return next(new ValidationError(req))
  }
  req.checkBody(['question', 'text'], 'Question Text is required').notEmpty()
  req.checkBody(['question', 'type'], 'Question Type is required').notEmpty()
  
  next(req.validationErrors() ? new ValidationError(req) : null)
}
