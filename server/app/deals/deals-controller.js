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
  var deals = req.body.deals.map(deal => {
    deal.userId = req.user.id
    return deal
  })
  var queryPromise = dealsTable.insert(deals)
  queryPromise.then(deals => {
    res.json({deals})
  }).catch(next)
}

router.put('/', auth.token, update)
export function update(req, res, next){
  var pDeals = req.body.deals.map(
    deal => dealsTable.update(deal)
  )
  Promise.all(pDeals).then(deals => { 
    res.json({deals}) 
  }, error => {
    res.status(500).json(error)
  }).catch(next)
}

router.delete('/', auth.token, dealDelete)
export function dealDelete(req, res, next){
  var pDeal = dealsTable.dealDelete(req.body.deal) 
   pDeal.then(deal => {
    res.json({deal})
  }).catch(next)
}
