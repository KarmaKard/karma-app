import should from 'should'
import sinon from 'sinon'
import { serialize } from 'express-validator-errors'
import validateCreate from './validate-create'
import { ValidationError } from '../../common/errors'
import stubReq from '../../../test/util/stub-request'

describe('Users: Validate Create', function () {
  var req, res, next

  beforeEach((done) => {
    next = sinon.spy()
    res = sinon.spy()
    stubReq(genReq => {
      req = genReq
      done()
    })
  })

  it('fails if no user object in the request body', () => {
    req.body = {}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true).user.should.have.property('msg')
  })

  it('fails if the user is missing firstName', () => {
    req.body = {user: {lastName: 'johnson', email: 'mickey@mouse.com', password: 'password123'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['user.firstName'].should.have.property('msg')
  })
  
  it('fails if the user is missing lastName', () => {
    req.body = {user: {firstName: 'bob', email: 'pnemrow@gmail.com', password: 'hello123'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['user.lastName'].should.have.property('msg')
  })

  it('fails if the user is missing email', () => {
    req.body = {user: {firstName: 'peter', lastName: 'nemrow', password: 'password456'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['user.email'].should.have.property('msg')
  })

  it('fails if the user is missing a password', () => {
    req.body = {user: {firstName: 'Alex', lastName: 'Ahn', email: 'alex@rockahn.com'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['user.password'].should.have.property('msg')
  })

  it('succeeds if user object is valid', () => {
    req.body = {user: {firstName: 'bob', lastName: 'johnson', email: 'pnemrow@gmail.com', password: 'hello123'}}
    validateCreate(req, res, next)
    should.not.exist(next.getCall(0).args[0])
  })
})
