import express from 'express'
import * as usersTable from '../users/users-table'
import * as paymentsTable from './payments-table'
import * as auth from '../common/middleware/authentication'
import { encode as encodeToken } from '../common/services/token'
import * as stripe from '../common/services/stripe'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next){
  try {
    var payments = await paymentsTable.index()
    res.json({payments})
  } catch (e) {
    next(e)
  }
}

router.post('/', createPayment)
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

    payment.createdAt = Date.now()
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
