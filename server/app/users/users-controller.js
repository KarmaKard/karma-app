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

router.put('/update/:userId', validateUpdate, update)
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
    var user = await usersTable.getByEmail(req.body.email)
    user = user[0]
    if (!user) {res.status(401).send({error: 'email was not found'})}
    var now = new Date()
    var expiration = new Date()
    expiration.setHours(now.getHours() + 24)
    var passwordResetObject = {
      userId: user.id,
      email: user.email,
      expiration: expiration,
      status: 'active'
    }
    var passwordReset = await resetPasswordTable.insert(passwordResetObject)
    var url = config.domain.base_url + '/new_password/' + passwordReset.id
    var data = {
      from: 'KarmaKard <password_reset@karmakard.org>',
      to: passwordReset.email,
      subject: 'Change Your Password',
      text: url
    }

    var mailgunResponse = await mailgun.send(data)

    mailgunResponse.id ? res.status(201).send() : res.status(404).send()

  }catch (e) {
    next(e)
  }
}

router.put('/reset_password', saveNewPassword)
export async function saveNewPassword (req, res, next) {
  try {
    var { id, password } = req.body.passwordResetObject
    var hash = await hashPassword(password)
    var passwordReset = await resetPasswordTable.getById(id)
    var user = await usersTable.updatePassword(passwordReset.userId, hash)
    if (user.id) {
      res.status(201).send()
    } else {
      res.status(404).send()
    }
  }catch (e) {
    next(e)
  }
}

router.post('/reset_password/check_expiration', checkPasswordResetStatus)
export async function checkPasswordResetStatus (req, res, next) {

  try {
    var passwordResetId = req.body.passwordResetId
    var passwordResetObject = await resetPasswordTable.update(passwordResetId)
    if (passwordResetObject.status === 'expired') {
      res.status(401).send()
    } else {
      res.status(201).send()
    }
  } catch (e) {
    next(e)
  }
}
