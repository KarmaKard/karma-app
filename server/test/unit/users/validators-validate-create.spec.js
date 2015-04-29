import should from 'should'
import sinon from 'sinon'
import stubReq from '../../util/stub-request'
import validateCreate from '../../../app/users/validators/validate-create'
import { ValidationError } from '../../../app/common/errors'
import { serialize } from 'express-validator-errors'

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

  it('fails if the user is missing first_name', () => {
    req.body = {user: {last_name: 'johnson'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['user.first_name'].should.have.property('msg')
  })
  
  it('fails if the user is missing last_name', () => {
    req.body = {user: {first_name: 'bob'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['user.last_name'].should.have.property('msg')
  })

  it('succeeds if user object is valid', () => {
    req.body = {user: {first_name: 'bob', last_name: 'johnson'}}
    validateCreate(req, res, next)
    should.not.exist(next.getCall(0).args[0])
  })
})
