import should from 'should'
import sinon from 'sinon'
import stubReq from '../../util/stub-request'
import validateCreate from '../../../app/organizations/validators/validate-create'
import { ValidationError } from '../../../app/common/errors'
import { serialize } from 'express-validator-errors'

describe('Organizations: Validate Create', function () {
  var req, res, next

  beforeEach((done) => {
    next = sinon.spy()
    res = sinon.spy()
    stubReq(genReq => {
      req = genReq
      done()
    })
  })

  it('fails if no organization object in the request body', () => {
    req.body = {}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true).organization.should.have.property('msg')
  })

  it('fails if the organization is missing name', () => {
    req.body = {organization: {type: 'business'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.name'].should.have.property('msg')
  })
  
  it('fails if the organization is missing type', () => {
    req.body = {organization: {name: 'johnson & johnson'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.type'].should.have.property('msg')
  })

  it('succeeds if organization object is valid', () => {
    req.body = {organization: {name: 'johnson & johnson', type: 'business'}}
    validateCreate(req, res, next)
    should.not.exist(next.getCall(0).args[0])
  })
})
