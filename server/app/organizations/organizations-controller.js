import express from 'express'
import * as organizationsTable from './organizations-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
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
      var recipients = {}
      var recipientEmails = []
      fundraiserMembers.forEach(fundraiserMember => {
        recipientEmails.push(fundraiserMember.email)
        recipients[fundraiserMember.email] = {
          organizationName: organization.name,
          name: fundraiserMember.name,
          url: config.domain.base_url + '/#/add_fundraiser_member/' + fundraiserMember.id
        }
      })

      var data = {
        from: 'KarmaKard Fundraising <fundraising@karmakard.org>',
        to: recipientEmails,
        subject: '%recipient.organizationName% has added you',
        'recipient-variables': JSON.stringify(recipients),
        text: 'Hello %recipient.name%, %recipient.organizationName% has added you as a fundraiser for their team. Go ahead and join by clicking the following link and logging in or registering.  %recipient.url%'
      }

      var mailgunResponse = await mailgun.send(data)
      if (mailgunResponse) {
        organization = await organizationsTable.update(req.body.organization)
        return res.status(201).json({organization})
      } else {
        return res.status(400).send('Was not able to send email to this person.')
      }
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



