import express from 'express'
import * as organizationsTable from './organizations-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export function list (req, res, next) {
  var queryPromise = organizationsTable.index()
  queryPromise.then(organizations => {
    res.json({organizations})
  }).catch(next)
}

router.post('/', auth.token, validateCreate, create)
export function create (req, res, next) {
  var org = req.body.organization
  org.userId = req.user.id
  var queryPromise = organizationsTable.insert(org)
  queryPromise.then(data => {
    res.json({organization: data})
  }).catch(next)
}

router.put('/:orgId', auth.token, validateUpdate, update)
export function update (req, res, next) {
  var pOrganization = organizationsTable.update(req.body.organization)
  pOrganization.then(organization => {
    res.json({organization})
  }).catch(next)
}

router.get('/manage', auth.token, auth.admin, listManagedOrganizations)
export function listManagedOrganizations (req, res, next){
  var queryPromise = organizationsTable.getOrganizationsByUserId(req.user.id)
  queryPromise.then(organizations => {
    res.json({organizations})
  }).catch(next)
}
