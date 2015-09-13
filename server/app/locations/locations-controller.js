import express from 'express'
import * as locationsTable from './locations-table'
import * as organizationsTable from '../organizations/organizations-table'
import validateCreate from './validators/validate-create'
import * as auth from '../common/middleware/authentication'
import * as geocoder from '../common/services/geocoder'

export var router = express.Router()

router.post('/', auth.token, validateCreate, create)
export async function create (req, res, next) {
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

    res.json({location})
  } catch (e) {
    next(e)
  }
}
