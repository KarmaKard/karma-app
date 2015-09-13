import express from 'express'
import * as organizationsTable from '../organizations/organizations-table'
import * as usersTable from '../users/users-table'
import * as dealsTable from '../deals/deals-table'
import * as emailTemplates from '../common/email_templates/templates'
import * as fundraiserMembersTable from './fundraiser_members_table'
import * as auth from '../common/middleware/authentication'
import * as mailgun from '../common/services/mailgun'
import config from 'config'
import { encode as encodeToken } from '../common/services/token'

export var router = express.Router()

router.post('/', auth.token, create)
export async function create (req, res, next) {
  try {
    var organization = req.body.organization
    var member = {
      organizationId: req.body.organization.id,
      oweAmount: 0,
      raisedAmount: 0,
      status: 'inactive',
      email: req.body.newMember.email,
      name: req.body.newMember.name
    }

    var fundraiserMember = await fundraiserMembersTable.insert(member)

    if (organization.status === 'inactive') {
      return res.status(201).json({fundraiserMember})
    }

    var mailgunResponse
    var url = config.domain.base_url + '/#/add_fundraiser_member/' + fundraiserMember.id
    res.status(201).json({fundraiserMember})
    var emailTemplate = await emailTemplates.addFundraiserMember(req.body.newMember, req.body.organization, url)
    premailer.prepare({html: emailTemplate }, async function(err, email) {
      var mailcomposer = new MailComposer()
      await mailcomposer.setMessageOption({
        from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
        to: req.body.newMember.email,
        subject: req.body.organization.name + ' has added you',
        body: 'Hello ' + req.body.newMember.name + ', \n' + req.body.organization.name +
        ' has added you as a fundraiser for their team. Go ahead and join by clicking the following link and logging in or registering.' +
        url,
        html: email.html
      })

      mailcomposer.buildMessage(async function(mailBuildError, messageSource) {
        try {
          var dataToSend = {
              to: req.body.newMember.email,
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

router.put('/', tieFundraiserMembershipToUser)
export async function tieFundraiserMembershipToUser (req, res, next) {
  try {
    var fundraiserMember = await fundraiserMembersTable.getById(req.body.fundraiserMemberId)
    if (fundraiserMember.status === 'inactive') {
      fundraiserMember.status = 'active'
      fundraiserMember.userId = req.body.user.id
      fundraiserMember = await fundraiserMembersTable.update(fundraiserMember)
    }

    var user = req.body.user
    if (fundraiserMember.status === 'active') {
      user.roles.fundraiserTeamMember = 'fundraiserTeamMember'
      user = await usersTable.update(user)
      res.status(201).json({
        token: encodeToken(user), fundraiserMember: fundraiserMember
      })
    } else {
      res.status(400).send('Link has already been used')
    }
  } catch (e) {
    next(e)
  }
}

router.get('/', list)
export async function list (req, res, next) {
  try {
    var fundraiserMembers = await fundraiserMembersTable.index()
    res.json({fundraiserMembers})
  } catch (e) {
    next(e)
  }
}

router.post('/join', getOrganizationsAndDeals)
export async function getOrganizationsAndDeals (req, res, next) {
  try {
    var fundraiserMemberId = req.body.fundraiserMemberId
    var fundraiserMember = await fundraiserMembersTable.getById(fundraiserMemberId)
    var organizationId = fundraiserMember.organizationId
    var organizations = await organizationsTable.index()
    var deals = await dealsTable.index()
    res.json({organizations, deals, organizationId})
  } catch (e) {
    next(e)
  }
}

router.put('/pay', memberOwedUpdate)
export async function memberOwedUpdate (req, res, next) {
  try {

    var fundraiserPayment = req.body.fundraiserPayment
    var fundraiserMember = await fundraiserMembersTable.updateOwedAmount(fundraiserPayment.fundraiserMemberId, fundraiserPayment.newOweAmount)

    res.json({fundraiserMember})
  } catch (e) {
    next(e)
  }
}

