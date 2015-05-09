import should from 'should'
import sinon from 'sinon'
import { serialize } from 'express-validator-errors'
import validateCreate from './validate-create'
import { ValidationError } from '../../common/errors'
import stubReq from '../../../test/util/stub-request'

describe('Deals: Validate Create', function () {
  var req, res, next

  beforeEach((done) => {
    next = sinon.spy()
    res = sinon.spy()
    stubReq(genReq => {
      req = genReq
      done()
    })
  })

  it('fails if no deals object in the request body', () => {
    req.body = {}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true).deals.should.have.property('msg')
  })

    

  it('fails if the deals is missing orgId', () => {
    req.body = {deals: [{limit: 3, type: "BOGO", discountRate: 3.50, threshold: "2", primaryProductName: "Ribs"}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['deals.0.orgId'].should.have.property('msg')
  })
  
  it('fails if the deals is missing limit', () => {
    req.body = {deals: [{orgId: 1321, type: "BOGO", discountRate: 3.50, threshold: "2", primaryProductName: "Ribs"}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['deals.0.limit'].should.have.property('msg')
  })

  it('fails if the deals is missing type', () => {
    req.body = {deals: [{orgId: 1321, limit: 3, discountRate: 3.50, threshold: "2", primaryProductName: "Ribs"}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['deals.0.type'].should.have.property('msg')
  })

  it('fails if the deals is missing a discount rate', () => {
    req.body = {deals: [{orgId: 1321, limit: 3, type: "BOGO", threshold: "2", primaryProductName: "Ribs"}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['deals.0.discountRate'].should.have.property('msg')
  })

    it('fails if the deals is missing threshold', () => {
    req.body = {deals: [{orgId: 1321, limit: 3, type: "BOGO", discountRate: 3.50, primaryProductName: "Ribs"}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['deals.0.threshold'].should.have.property('msg')
  })

  it('fails if the deals is missing a primary product name', () => {
    req.body = {deals: [{orgId: 1321, limit: 3, type: "BOGO", discountRate: 3.50, threshold: "2"}]}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['deals.0.primaryProductName'].should.have.property('msg')
  })

  it('succeeds if deals object is valid', () => {
    req.body = {deals: [{orgId: 1321, limit: 3, type: "BOGO", discountRate: 3.50, threshold: "2", primaryProductName: "Ribs"}]}
    validateCreate(req, res, next)
    should.not.exist(next.getCall(0).args[0])
  })
})