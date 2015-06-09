import express from 'express'
import * as organizationsTable from './organizations-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as usersTable from './../users/users-table'
import * as auth from '../common/middleware/authentication'
import * as stripe from '../common/services/stripe'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next) {
  try {
    var organizations = await organizationsTable.index()
    res.json({organizations})
  } catch (e) {
    next(e)
  }
}

router.post('/', auth.token, validateCreate, create)
export async function create (req, res, next) {
  try {
    var user = req.user
    
    if(user.role === "customer"){
      user.role = "manager"
      user = await usersTable.update(user)
    }

    var stripeAccount = stripe.createAccount()
    var organizationToSave = req.body.organization
    organizationToSave.userId = req.user.id
    var organization = await organizationsTable.insert(organizationToSave)
    res.json({organization: organization, user: user})
  } catch (e) {
    next(e)
  }
}

router.put('/:orgId', auth.token, validateUpdate, update)
export async function update (req, res, next) {
  try {
    var organization = req.body.organization
    if(organization.status === "active" && organization.type === "fundraiser" && !organization.stripeData){
      organization.stripeData = await stripe.createAccount()
    }
    var organization = await organizationsTable.update(organization)
    res.json({organization})
  } catch (e) {
    next(e)
  }
}

router.get('/:orgId', auth.token, find)
export async function find (req, res, next) {
  try {
    var organization = await organizationsTable.getById(req.params.orgId)
    res.json({organization})
  } catch (e) {
    next(e)
  }
}

router.get('/manage', auth.token, auth.admin, listManagedOrganizations)
export async function listManagedOrganizations (req, res, next){
  try {
    var organizations = await organizationsTable.getOrganizationsByUserId(req.user.id)
    res.json({organizations})
  } catch (e) {
    next(e)
  }
}
