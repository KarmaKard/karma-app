import should from 'should'
import sinon from 'sinon'
import { serialize } from 'express-validator-errors'
import validateUpdate from './validate-update'
import { ValidationError, UnauthorizedError } from '../../common/errors'
import stubReq from '../../../test/util/stub-request'

describe('Organizations: Validate Update', function () {
  var req, res, next, data

  beforeEach((done) => {
    next = sinon.spy()
    res = sinon.spy()
    stubReq(genReq => {
      req = genReq
      req.user = {id: '1'}
      done()
    })
    data = {
      organization: {
        id: 'o1',
        name: 'johnson & johnson',
        type: 'business',
        userId: '1'
      }
    }
  })

  it('fails if no organization object in the request body', () => {
    req.body = {}
    validateUpdate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true).organization.should.have.property('msg')
  })

  it('fails if the organization is missing name', () => {
    delete data.organization.name
    req.body = data
    validateUpdate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.name'].should.have.property('msg')
  })

  it('fails if the organization is missing type', () => {
    delete data.organization.type
    req.body = data
    validateUpdate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(ValidationError)
    req.validationErrors(true)['organization.type'].should.have.property('msg')
  })

  it('fails with unauthorized if req user mismatch org user', () => {
    req.body = data
    req.user = {id: '2'}
    validateUpdate(req, res, next)
    next.getCall(0).args[0].should.be.an.instanceOf(UnauthorizedError)
  })

  it('ignores status if not superAdmin', () => {
    data.organization.status = 'illegal'
    req.body = data
    req.user = {id: '1'}
    validateUpdate(req, res, next)
    req.body.organization.should.not.have.property('status')
  })

  it('accepts status if superAdmin', () => {
    data.organization.status = 'legal'
    req.body = data
    req.user = {id: '2', isSuperAdmin: true}
    validateUpdate(req, res, next)
    req.body.organization.should.have.property('status', data.organization.status)
  })

  it('succeeds if organization object is valid', () => {
    req.body = data
    validateUpdate(req, res, next)
    should.not.exist(next.getCall(0).args[0])
  })
})
