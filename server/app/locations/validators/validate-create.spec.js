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
    req.body = {locations: [{street: "281 E. 2950 N.", city: "Provo", state: "UT", latitude: 10.33234323243, longitude: 112.343234523345343}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.organizationId'].should.have.property('msg')
  })

  it('fails if the location is missing a street', () => {
    req.body = {locations: [{organizationId: 321, city: "Provo", state: "UT", latitude: 10.33234323243, longitude: 112.343234523345343}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.street'].should.have.property('msg')
  })

  it('fails if the location is missing a city', () => {
    req.body = {locations: [{organizationId: 321, street: "281 E. 2950 N.", state: "UT", latitude: 10.33234323243, longitude: 112.343234523345343}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.city'].should.have.property('msg')
  })

  it('fails if the location is missing a state', () => {
    req.body = {locations: [{organizationId: 321, street: "281 E. 2950 N.", city: "Provo", latitude: 10.33234323243, longitude: 112.343234523345343}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.state'].should.have.property('msg')
  })

  it('fails if the location is missing a latitude', () => {
    req.body = {locations: [{organizationId: 321, street: "281 E. 2950 N.", city: "Provo", state: "UT", longitude: 112.343234523345343}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.latitude'].should.have.property('msg')
  })

  it('fails if the location is missing a longitude', () => {
    req.body = {locations: [{organizationId: 321, street: "281 E. 2950 N.", city: "Provo", state: "UT", latitude: 10.33234323243}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['locations.0.longitude'].should.have.property('msg')
  })

})
