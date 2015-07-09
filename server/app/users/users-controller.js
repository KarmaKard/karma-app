import express from 'express'
import * as usersTable from './users-table'
import * as paymentsTable from '../payments/payments-table'
import * as resetPasswordTable from './password_reset-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as auth from '../common/middleware/authentication'
import { hash as hashPassword } from '../common/services/passwords'
import { encode as encodeToken } from '../common/services/token'
import * as stripe from '../common/services/stripe'
import * as mailgun from '../common/services/mailgun'
import config from 'config'

export var router = express.Router()

router.get('/', auth.token, auth.admin, list)
export async function list (req, res, next) {
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
  }catch (e) {
    next(e)
  }
}

router.post('/payment', createPayment)
export async function createPayment (req, res, next) {
  try {
    if (!req.body.stripeToken) {return}

    var stripeToken = req.body.stripeToken
    var user = req.body.user
    var payment = {}

    var charge = await stripe.chargeCustomer(user, stripeToken)
    if (charge.status !== 'succeeded') {return}
    user.roles = {customer: 'paid'}
    user.stripeCustomerId = charge.customer

    payment.createdAt = charge.created
    payment.amount = charge.amount
    payment.stripeChargeId = charge.id
    payment.userId = user.id

    payment = await paymentsTable.insert(payment)
    user = await usersTable.update(user)

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

router.post('/reset_password', sendPasswordResetEmail)
export async function sendPasswordResetEmail (req, res, next) {
  try {
    console.log(req.body)
    var user = await usersTable.getByEmail(req.body.email)
    user = user[0]
    var now = new Date()
    var expiration = new Date()
    expiration.setHours(now.getHours() + 24)
    var passwordResetObject = {
      userId: user.id,
      email: user.email,
      expiration: expiration,
      status: 'active'
    }
    console.log(passwordResetObject)
    var passwordReset = await resetPasswordTable.insert(passwordResetObject)
    var url = config.domain.base_url + '/new_password/' + passwordReset.id
    console.log(url)
    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: passwordReset.email,
      subject: 'Change Your Password',
      text: url
    }
    console.log(data)

    var mailgunResponse = mailgun.send(data)
    console.log(mailgunResponse)

  }catch (e) {
    next(e)
  }
}
