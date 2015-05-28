import should from 'should'
import sinon from 'sinon'
import { serialize } from 'express-validator-errors'
import validateCreate from './validate-create'
import { ValidationError } from '../../common/errors'
import stubReq from '../../../test/util/stub-request'

describe('Locations: Validate Create', function (){
  var req, res, next

  beforeEach((done) => {
    next = sinon.spy()
    res = sinon.spy()
    stubReq(genReq => {
      req = genReq
      done()
    })
  })

  it('fails if no locations object in the request body', () => {
    req.body = {}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true).locations.should.have.property('msg')
  })

  it('fails if the location is missing a organizationId', () => {
    req.body = {locations: [{street: "281 E. 2950 N.", zip: 84604}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.organizationId'].should.have.property('msg')
  })

  it('fails if the location is missing a street', () => {
    req.body = {locations: [{ organizationId: 321, zip: 84604}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.street'].should.have.property('msg')
  })

  it('fails if the location is missing a zip', () => {
    req.body = {locations: [{street: "281 E. 2950 N.", organizationId: 321}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.zip'].should.have.property('msg')
  })

})
