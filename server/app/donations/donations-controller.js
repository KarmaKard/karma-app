import express from 'express'
import * as donationsTable from './donations-table'
import * as paymentsTable from '../payments/payments-table'
import * as fundraiserMembersTable from '../fundraiser_members/fundraiser_members_table'
import * as usersTable from '../users/users-table'
import * as auth from '../common/middleware/authentication'
import * as mailgun from '../common/services/mailgun'
import config from 'config'
import { encode as encodeToken } from '../common/services/token'

export var router = express.Router()

router.post('/', auth.token, create)
export async function create (req, res, next) {
  try {
    var donation = req.body.donation
    var fundraiserMember = await fundraiserMembersTable.getById(req.body.fundraiserMember.id)
    var createdAt = Date.now()
    var payment = {
      amount: donation.amount.donationAmount * 100,
      createdAt: createdAt,
      fundraiserId: fundraiserMember.organizationId,
      fundraiserMemberId: fundraiserMember.id,
      cardAmount: donation.amount.cardAmount,
      paymentType: donation.paymentType
    }

    payment = await paymentsTable.insert(payment)
    var donations = []
    var donationObject = {
      createdAt: createdAt,
      paymentId: payment.id,
      fundraiserMemberId: fundraiserMember.id,
      fundraiserId: fundraiserMember.organizationId,
      activationStatus: 'inactive'
    }

    var activationLinks

    for (var i = 0; i < payment.cardAmount; i++) {
      var savedDonation = await donationsTable.insert(donationObject)
      donations.push(savedDonation)
      activationLinks += config.domain.base_url + '/#/activate/' + savedDonation.id + ' '
    }

    if (donation.paymentType === 'cash') {
      fundraiserMember.oweAmount = fundraiserMember.oweAmount + payment.amount
    }
    fundraiserMember.raisedAmount = fundraiserMember.raisedAmount + payment.amount
    var returnedFundraiserMember = await fundraiserMembersTable.update(fundraiserMember)
    var mailgunResponse

    if (activationLinks) {
      var data = {
        from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
        to: req.body.donation.email,
        subject: 'KarmaKard Donation Access',
        text: 'Hello and thank you for your donation, You may create an active your KarmaKard account through the link(s) provided below. The link(s) can only be used once. You may share any unused links as gift to friends and family. Enjoy!' +
          activationLinks
      }

      mailgunResponse = await mailgun.send(data)
    }

    if (mailgunResponse) {
      res.status(201).json({returnedFundraiserMember, donations, payment})
    }

  } catch (e) {
    next(e)
  }
}

router.put('/', activateDonation)
export async function activateDonation (req, res, next) {
  try {
    var user = req.body.user
    var donationId = req.body.donationId
    var donation = await donationsTable.getById(donationId)
    if (donation.activationStatus === 'inactive') {
      user.roles.customer = 'paid'
      user = await usersTable.update(user)
      donation.userId = user.id
      donation.activationStatus = 'active'
      donation = await donationsTable.update(donation)
      var payment = await paymentsTable.getById(donation.paymentId)
      payment.userId = user.id
      payment = await paymentsTable.update(payment)
      res.status(201).json({
        token: encodeToken(user)
      })
    }
    res.json({
      token: encodeToken(user),
      message: 'This donation has already been activated.'
    })
  } catch (e) {
    next(e)
  }
}

router.get('/', auth.token, list)
export async function list (req, res, next) {
  try {
    var donations = await donationsTable.index()
    res.json({donations})
  } catch (e) {
    next(e)
  }
}
