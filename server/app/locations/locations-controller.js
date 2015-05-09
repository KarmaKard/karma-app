import express from 'express'
import * as locationsTable from './locations-table'
import validateCreate from './validators/validate-create'

export var router = express.Router()

router.get('/', list)
export function list (req, res, next){
  var queryPromise = locationsTable.index()
  queryPromise.then(locations => {
    res.json({locations})
  }).catch(next)
}

router.post('/', validateCreate, create)
export function create(req, res, next){
  var queryPromise = locationsTable.insert(req.body.locations)
  queryPromise.then(data => {
    res.json(req.body)
  }).catch(next)
}