import express from 'express'
import * as dealsTable from './deals-table'
import validateCreate from './validators/validate-create'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export function list (req, res, next){
  var queryPromise = dealsTable.index()
  queryPromise.then(deals => {
    res.json({deals})
  }).catch(next)
}

router.post('/', auth.token, validateCreate, create)
export function create(req, res, next){
  var deal = req.body.deal
  deal.userId = req.user.id
  var queryPromise = dealsTable.insert(deal)
  queryPromise.then(data => {
    res.json({deal: data})
  }).catch(next)
}

router.put('/', auth.token, update)
export function update(req, res, next){
  var pDeals = req.body.deals.map(
    deal => dealsTable.update(deal)
  )
  Promise.all(pDeals).then(data => { 
    console.log(data)
    res.json({deals: data}) 
  }, error => {
    res.status(500).json(error)
  })
}


