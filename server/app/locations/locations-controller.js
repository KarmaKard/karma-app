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
  var location = req.body.location
  location.userId = req.user.id
  var queryPromise = locationsTable.insert(location)
  queryPromise.then(location => {
    res.json({location})
  }).catch(next)
}