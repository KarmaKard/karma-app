import express from 'express'
import * as locationsTable from './locations-table'
import validateCreate from './validators/validate-create'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export function list (req, res, next){
  var queryPromise = locationsTable.index()
  queryPromise.then(locations => {
    res.json({locations})
  }).catch(next)
}

router.post('/', auth.token, validateCreate, create)
export function create(req, res, next){
  var locations = req.body.locations
  locations.userId = req.user.id
  var queryPromise = locationsTable.insert(locations)
  queryPromise.then(data => {
    res.json({locations: data})
  }).catch(next)
}