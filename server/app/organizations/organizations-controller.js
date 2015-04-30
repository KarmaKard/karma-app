import express from 'express'
import * as organizationsTable from './organizations-table'
import validateCreate from './validators/validate-create'

export var router = express.Router()

router.get('/', list)
export function list (req, res, next){
  var queryPromise = organizationsTable.index()
  queryPromise.then(organizations => {
    res.json({organizations})
  }).catch(next)
}

router.post('/', validateCreate, create)
export function create (req, res, next) {
  var queryPromise = organizationsTable.insert(req.body.organization)
  queryPromise.then(data => {
    res.json(req.body)
  }).catch(next)
}
