import express from 'express'
import premailer from 'premailer-api'
var MailComposer = require("mailcomposer").MailComposer
import * as emailTemplates from '../common/email_templates/templates'
import * as donationsTable from './donations-table'
import * as organizationsTable from '../organizations/organizations-table'
import * as paymentsTable from '../payments/payments-table'
import * as fundraiserMembersTable from '../fundraiser_members/fundraiser_members_table'
import * as usersTable from '../users/users-table'
import * as auth from '../common/middleware/authentication'
import * as mailgun from '../common/services/mailgun'
import config from 'config'
import { encode as encodeToken } from '../common/services/token'

export var router = express.Router()

router.post('/inperson', auth.token, create)
export async function create (req, res, next) {
  try {
    var donation = req.body.donation
    var fundraiserMember = req.body.fundraiserMember
    var fundraiser = await organizationsTable.getById(req.body.fundraiserMember.organizationId)
    if (!donation || !fundraiserMember || !fundraiser) {return res.status(404)}
    var createdAt = Date.now()
    var payment = {
      amount: donation.amount.donationAmount * 100,
      createdAt: createdAt,
      fundraiserId: fundraiserMember.organizationId,
      fundraiserMemberId: fundraiserMember.id,
      cardAmount: donation.amount.cardAmount,
      paymentType: donation.paymentType,
      activationStatus: 'inactive'
    }

    payment = await paymentsTable.insert(payment)

    var donations = []
    var donationObject = {
      paymentId: payment.id,
      fundraiserMemberId: fundraiserMember.id,
      fundraiserId: fundraiserMember.organizationId,
      activationStatus: 'inactive'
    }

    for (var i = 0; i < payment.cardAmount; i++) {
      donationObject.createdAt = Date.now()
      donations.push(donationObject)
    }

    var updatedDonations = await donationsTable.multiInsert(donations)
    var newValueDonations = updatedDonations.map(donation => {
      return donation.new_val
    })

    if (payment.paymentType === 'cash') {
      fundraiserMember.oweAmount = fundraiserMember.oweAmount + payment.amount
    }
    fundraiserMember.raisedAmount = fundraiserMember.raisedAmount + payment.amount
    var returnedFundraiserMember = await fundraiserMembersTable.update(fundraiserMember)
    if (payment.cardAmount === 0) {
      res.status(201).json({returnedFundraiserMember, newValueDonations, payment})
      return
    }
    var mailgunResponse
    res.status(201).json({returnedFundraiserMember, newValueDonations, payment})
    var activationLink = config.domain.base_url + '/#/activate/' + payment.id
    var emailTemplate = await emailTemplates.activateInPersonPayment(donation, fundraiser, activationLink)
    premailer.prepare({html: emailTemplate }, async function(err, email) {
      var mailcomposer = new MailComposer()
      await mailcomposer.setMessageOption({
        from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
        to: donation.email,
        subject: 'KarmaKard Donation Access',
        body: 'Hello and thank you for your donation, You may create an active your KarmaKard account through the link(s) provided below. The link(s) can only be used once. You may share any unused links as gift to friends and family. Enjoy! \n' + activationLink,
        html: email.html
      })

      mailcomposer.buildMessage(async function(mailBuildError, messageSource) {
        try {
          var dataToSend = {
              to: donation.email,
              message: messageSource
          }
          mailgunResponse = await mailgun.sendMimeMessage(dataToSend)
          return
        } catch (e) {
          next(e)
        }
      })
    })
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
      var updatedDonation = await donationsTable.update(donation)
      res.status(201).json({
        token: encodeToken(user),
        donation: updatedDonation
      })
    }
    res.json({
      token: encodeToken(user),
      message: 'This donation has already been activated.'
    })
    return
  } catch (e) {
    next(e)
  }
}

router.put('/share', auth.token, share)
export async function share (req, res, next) {
  try {
    var donation = req.body.donation
    var emailAddress = req.body.email
    var user = req.body.user
    if (!donation || !emailAddress || !user) {return res.status(404)}
    donation.activationStatus = 'inactive'
    donation.userId = null

    var updatedDonation = await donationsTable.update(donation)

    var mailgunResponse
    res.status(201).json({donation: updatedDonation})
    var activationLink = config.domain.base_url + '/#/activate/shared/' + updatedDonation.id
    var emailTemplate = await emailTemplates.activateSharedCard(user, activationLink)
    premailer.prepare({html: emailTemplate }, async function(err, email) {
      var mailcomposer = new MailComposer()
      await mailcomposer.setMessageOption({
        from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
        to: emailAddress,
        subject: 'KarmaKard Donation Access',
        body: 'Hello! ' + user.firstName + ' ' + user.lastName + ' has shared good karma with you with access to KarmaKard! You may create an activate your KarmaKard account through the link(s) provided below. Enjoy! \n' + activationLink,
        html: email.html
      })

      mailcomposer.buildMessage(async function(mailBuildError, messageSource) {
        try {
          var dataToSend = {
              to: emailAddress,
              message: messageSource
            }
          mailgunResponse = await mailgun.sendMimeMessage(dataToSend)
          return
        } catch (e) {
          next(e)
        }
      })
    })
  } catch (e) {
    next(e)
  }
}

router.get('/', list)
export async function list (req, res, next) {
  try {
    var donations = await donationsTable.index()
    res.json({donations})
  } catch (e) {
    next(e)
  }
}
