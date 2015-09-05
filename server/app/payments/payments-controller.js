import express from 'express'
import * as usersTable from '../users/users-table'
import * as paymentsTable from './payments-table'
import * as donationsTable from '../donations/donations-table'
import * as fundraiserMembersTable from '../fundraiser_members/fundraiser_members_table'
import * as auth from '../common/middleware/authentication'
import * as stripe from '../common/services/stripe'
import { encode as encodeToken } from '../common/services/token'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next) {
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
    if (!req.body.stripeToken) {return}
    var stripeToken = req.body.stripeToken
    var user = req.body.user
    var fundraiserMemberId = req.body.fundraiserMemberId
      ? req.body.fundraiserMemberId
      : 'KARMAKARD'
    var fundraiserId = req.body.organizationId

    var charge = await stripe.chargeCustomer(user, stripeToken)
    if (charge.status !== 'succeeded') {return}
    user.roles = {customer: 'paid'}
    user.stripeCustomerId = charge.customer

    var payment = {
      createdAt: Date.now(),
      cardAmount: 1,
      amount: charge.amount,
      stripeChargeId: charge.id,
      userId: user.id,
      paymentType: 'stripe',
      fundraiserMemberId: fundraiserMemberId,
      fundraiserId: fundraiserId
    }

    payment = await paymentsTable.insert(payment)
    if (req.body.fundraiserMemberId) {
      var fundraiserMember = await fundraiserMembersTable.getById(fundraiserMemberId)
      fundraiserMember.raisedAmount = fundraiserMember.raisedAmount + payment.amount
      var returnedFundraiserMember = await fundraiserMembersTable.update(fundraiserMember)
    }
    
    var donation = {
      createdAt: Date.now(),
      activationStatus: 'active',
      userId: user.id,
      paymentId: payment.id,
      fundraiserMemberId: fundraiserMemberId,
      fundraiserId: fundraiserId
    }
    donation = await donationsTable.insert(donation)
    user = await usersTable.update(user)

    res.status(201).json({payment, token: encodeToken(user), donation})

  } catch (e) {
    next(e)
  }
}
