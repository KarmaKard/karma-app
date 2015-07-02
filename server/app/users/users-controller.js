import express from 'express'
import * as usersTable from './users-table'
import * as paymentsTable from '../payments/payments-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as auth from '../common/middleware/authentication'
import { hash as hashPassword } from '../common/services/passwords'
import { encode as encodeToken } from '../common/services/token'
import * as stripe from '../common/services/stripe'

export var router = express.Router()

router.get('/', auth.token, auth.admin, list)
export async function list (req, res, next){
  try {
    var users = await usersTable.index()
    res.json({users})
  } catch (e) {
    next(e)
  }
}

router.post('/', validateCreate, create)
export async function create (req, res, next) {
  try {
    var user = req.body.user
    var hash = await hashPassword(user.password)

    delete user.password

    user.hash = hash
    user.created_at = Date.now()
    var data = await usersTable.insert(user)
    res.status(201).json({
      token: encodeToken(data)
    })
  } catch (e) {
    next(e)
  }
}

router.put('/:userId', validateUpdate, update)
export async function update (req, res, next) {
  try {
    var currentUser = req.body.user
    var user = await usersTable.update(currentUser)
    res.status(201).json({
      token: encodeToken(user)
    })
  }
  catch (e) {
    next(e)
  }
}

router.post('/payment', createPayment)
export async function createPayment (req, res, next) {
  try {
    if(!req.body.stripeToken){return}

    var stripeToken = req.body.stripeToken
    var user = req.body.user
    var payment = {}


    var charge = await stripe.chargeCustomer(user, stripeToken)
    if(charge.status !== "succeeded"){return}
    user.roles = {customer: "paid"}
    user.stripeCustomerId = charge.customer

    payment.createdAt = charge.created
    payment.amount = charge.amount
    payment.stripeChargeId = charge.id
    payment.userId = user.id

    var payment = await paymentsTable.insert(payment)
    var user = await usersTable.update(user)

    res.json({payment, user})

  } catch (e) {
    next(e)
  }
}

router.post('/login', auth.password, login)
export function login (req, res, next) {
  res.status(201).json({
    token: encodeToken(req.user)
  })
}
