import should from 'should'
import sinon from 'sinon'
import { serialize } from 'express-validator-errors'
import validateCreate from './validate-create'
import { ValidationError } from '../../common/errors'
import stubReq from '../../../test/util/stub-request'

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
    req.body = {organization: {type: 'business', description: 'this is a description', keywords: ['lunch','hamburger','restaurant']}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.name'].should.have.property('msg')
  })
  
  it('fails if the organization is missing type', () => {
    req.body = {organization: {name: 'johnson and johnson', description: 'this is a description', keywords: [{'1': 'lunch'},{'2': 'hamburger'},{'3': 'restaurant'}]}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.type'].should.have.property('msg')
  })

  it('fails if the organization is missing description', () => {
    req.body = {organization: {name: 'johnson and johnson', type: 'business', keywords: [{'1': 'lunch'},{'2': 'hamburger'},{'3': 'restaurant'}]}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.description'].should.have.property('msg')
  })

    it('fails if the organization is missing keywords', () => {
    req.body = {organization: {name: 'johnson and johnson', type: 'business', description: 'this is a description'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.keywords'].should.have.property('msg')
  })
  it('succeeds if organization object is valid', () => {
    req.body = {organization: {name: 'johnson and johnson', type: 'business', description: 'this is a description', keywords: [{'1': 'lunch'},{'2': 'hamburger'},{'3': 'restaurant'}]}}
    validateCreate(req, res, next)
    should.not.exist(next.getCall(0).args[0])
  })
})
