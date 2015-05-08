import express from 'express'
import * as dealsTable from './deals-table'
import validateCreate from './validators/validate-create'

export var router = express.Router()

router.get('/', list)
export function list (req, res, next){
  var queryPromise = dealsTable.index()
  queryPromise.then(deals => {
    res.json({deals})
  }).catch(next)
}

router.post('/', validateCreate, create)
export function create(req, res, next){
  var queryPromise = dealsTable.insert(req.body.deals)
  queryPromise.then(data => {
    res.json(req.body)
  }).catch(next)
}
