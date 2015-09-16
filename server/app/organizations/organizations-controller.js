import express from 'express'
import premailer from 'premailer-api'
var MailComposer = require('mailcomposer').MailComposer
import * as emailTemplates from '../common/email_templates/templates'
import * as organizationsTable from './organizations-table'
import validateCreate from './validators/validate-create'
import * as usersTable from './../users/users-table'
import * as auth from '../common/middleware/authentication'
import { encode as encodeToken } from '../common/services/token'
import * as mailgun from '../common/services/mailgun'
import config from 'config'
import * as geocoder from '../common/services/geocoder'

export var router = express.Router()

router.get('/', list)
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
    if (!user.roles.manager) {
      user.roles.manager = 'manager'
      user = await usersTable.update(user)
    }

    var organizationToSave = req.body.organization
    organizationToSave.userId = req.user.id
    var organization = await organizationsTable.insert(organizationToSave)
    res.status(201).json({organization: organization, token: encodeToken(user)})
  } catch (e) {
    next(e)
  }
}

router.put('/:orgId', auth.token, update)
export async function update (req, res, next) {
  try {
    var organization = req.body.organization
    organization = await organizationsTable.update(organization)
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
export async function listManagedOrganizations (req, res, next) {
  try {
    var organizations = await organizationsTable.getOrganizationsByUserId(req.user.id)
    res.json({organizations})
  } catch (e) {
    next(e)
  }
}

router.put('/confirm/:orgId', auth.token, confirm)
export async function confirm (req, res, next) {
  try {
    var organization = req.body.organization
    var fundraiserMembers = req.body.fundraiserMembers
    if (organization.status === 'active') {
      organization = await organizationsTable.update(organization)
      res.status(201).json({organization})
      fundraiserMembers.forEach(async function(fundraiserMember) {
        var activationLink = config.domain.base_url + '/#/add_fundraiser_member/' + fundraiserMember.id
        var emailTemplate = await emailTemplates.addFundraiserMember(fundraiserMember, organization, activationLink)
        premailer.prepare({html: emailTemplate }, async function(e, email) {
          try {
            var mailcomposer = new MailComposer()
            await mailcomposer.setMessageOption({
              from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
              to: fundraiserMember.email,
              subject: organization.name + ' Has Added You',
              body: 'Hello ' + fundraiserMember.name + ', ' + organization.name + ' has added you as a fundraiser for their team. Go ahead and join by clicking the following link and logging in or registering.  ' + activationLink,
              html: email.html
            })
            await mailcomposer.buildMessage(async function(mailBuildError, messageSource) {
              try {
                var dataToSend = {
                    to: fundraiserMember.email,
                    message: messageSource
                }
                var mailgunResponse = await mailgun.sendMimeMessage(dataToSend)
                console.log(mailgunResponse)
              } catch (e) {
                next(e)
              }
            })

          } catch (e) {
            next(e)
          }
        })
      })
    }
  } catch (e) {
    next(e)
  }
}

router.post('/location', auth.token, createLocation)
export async function createLocation (req, res, next) {
  try {
    var organization = await organizationsTable.getById(req.body.location.organizationId)
    var locationToSave = req.body.location
    var address = await geocoder.getGeocode(locationToSave.street, locationToSave.zip)
    address = address[0]
    locationToSave.formattedAddress = address.formattedAddress
    locationToSave.latitude = address.latitude
    locationToSave.longitude = address.longitude
    locationToSave.googlePlaceId = address.extra.googlePlaceId
    locationToSave.neighborhood = address.extra.neighborhood
    locationToSave.countyLong = address.administrativeLevels.level2long
    locationToSave.countyShort = address.administrativeLevels.level2short
    locationToSave.stateLong = address.administrativeLevels.level1long
    locationToSave.userId = req.user.id
    organization.locations.push(locationToSave)
    var updatedOrganization = await organizationsTable.update(organization)
    res.json({organization: updatedOrganization})
  } catch (e) {
    next(e)
  }
}



