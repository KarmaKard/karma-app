import express from 'express'
import * as locationsTable from './locations-table'
import validateCreate from './validators/validate-create'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next){
  try {
    var locations = await locationsTable.index()
    res.json({locations})
  } catch (e) {
    next(e)
  }
}

router.post('/', auth.token, validateCreate, create)
export async function create (req, res, next) {
  try {
    var locationToSave = req.body.location
    locationToSave.userId = req.user.id
    var location = await locationsTable.insert(locationToSave)
    res.json({location})
  } catch (e) {
    next(e)
  }
}
