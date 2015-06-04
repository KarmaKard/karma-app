import should from 'should'
import sinon from 'sinon'
import { serialize } from 'express-validator-errors'
import validateCreate from './validate-create'
import { ValidationError } from '../../common/errors'
import stubReq from '../../../test/util/stub-request'

describe('Redemptions: Validate Create', function () {
  var req, res, next

  beforeEach((done) => {
    next = sinon.spy()
    res = sinon.spy()
    stubReq(genReq => {
      req = genReq
      done()
    })
  })

  it('fails if no redemption object in the request body', () => {
    req.body = {}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true).redemption.should.have.property('msg')
  })

  it('fails if the redemption is missing user Id', () => {
    req.body = {redemption: {dealId: '123', code: '321'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['redemption.userId'].should.have.property('msg')
  })
  
  it('fails if the redemption is missing dea Id', () => {
    req.body = {redemption: {userId: '123', code: '321'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['redemption.dealId'].should.have.property('msg')
  })

    it('fails if the redemption is missing code', () => {
    req.body = {redemption: {dealId: '123', userId: '321'}}
    validateCreate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['redemption.code'].should.have.property('msg')
  })
})