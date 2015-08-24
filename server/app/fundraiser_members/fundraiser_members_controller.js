import express from 'express'
import * as organizationsTable from '../organizations/organizations-table'
import * as usersTable from '../users/users-table'
import * as dealsTable from '../deals/deals-table'
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

    var url = config.domain.base_url + '/add_fundraiser_member/' + fundraiserMember.id
    var data = {
      from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
      to: req.body.newMember.email,
      subject: req.body.organization.name + ' has added you',
      text: 'Hello ' + req.body.newMember.name + ', ' + req.body.organization.name +
        ' has added you as a fundraiser for their team. Go ahead and join by clicking the following link and logging in or registering.' +
        url
    }

    var mailgunResponse = await mailgun.send(data)
    if (mailgunResponse) {
      res.status(201).json({fundraiserMember})
    } else {
      res.status(400).send('Was not able to send email to this person.')
    }
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
        token: encodeToken(user)
      })
    } else {
      res.status(400).send('Link has already been used')
    }
  } catch (e) {
    next(e)
  }
}

router.get('/', auth.token, list)
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

    var paidMembers = req.body.paidMembers
    for (var i = 0; i < paidMembers.length; i++) {
      var returned = await fundraiserMembersTable.updateOwedAmount(paidMembers[i].fundraiserMemberId, paidMembers[i].newOweAmount)
    }

    var fundraiserMembers = await fundraiserMembersTable.index()
    res.json({fundraiserMembers})
  } catch (e) {
    next(e)
  }
}

