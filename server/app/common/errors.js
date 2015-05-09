import { serialize as serializeErrors } from 'express-validator-errors'

export class BaseError extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'BaseError'
    if (message) {
      this.message = message
    }
  }
  shouldLog() {
    return true 
  }
  handle(req, res) {
    return res.status(500).json(serializeErrors(this.message))
  }
  getData() {
    return {
      message: this.message
    }
  }
}

export class ValidationError extends BaseError {
  constructor(req) {
    super('Invalid Data')
    this.name = 'ValidationError'
    this._req = req
  }
  handle(req, res) {
    var serialized = serializeErrors(this._req)
    req.log.warn(serialized, 'Validation Errors')
    res.status(400).json(serialized)
  }
  shouldLog() {
    return false
  }
}

export class UnauthorizedError extends BaseError {
  constructor() {
    super('Not Authorized')
    this.name = 'UnauthorizedError'
  }
  handle(req, res) {
    req.log.warn(req.originalUrl, 'User unauthorized to perform action')
    res.status(401).json(serializeErrors(this.message))
  }
}

export class NotFoundError extends BaseError {
  constructor(req) {
    super('Resource Not Found')
    this.name = 'NotFoundError'
  }
  handle(req, res) {
    req.log.warn(req.originalUrl, 'Resource Not Found at URL')
    res.status(404).json(serializeErrors(this.message))
  }
  shouldLog() {
    return false
  }
}
