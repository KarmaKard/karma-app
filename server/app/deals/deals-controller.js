import express from 'express'
import * as dealsTable from './deals-table'
import validateCreate from './validators/validate-create'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next){
  try {
    var deals = await dealsTable.index()
    res.json({deals})
  } catch (e) {
    next(e)
  }
}

router.post('/', auth.token, validateCreate, create)
export async function create(req, res, next){
  try {
    var dealsToSave = req.body.deals.map(deal => {
      deal.userId = req.user.id
      return deal
    })
    var deals = await dealsTable.insert(dealsToSave)
    res.json({deals})
  } catch (e) {
    next(e)
  }
}

router.put('/', auth.token, update)
export async function update(req, res, next){
  try {
    var promises = req.body.deals.map(deal => dealsTable.update(deal))
    var deals = await Promise.all(promises)
    res.json({deals}) 
  } catch (e) {
    next(e)
  }
}

router.delete('/', auth.token, dealDelete)
export async function dealDelete(req, res, next){
  try {
    await dealsTable.del(req.body.deal) 
    res.status(204).send()
  } catch (e) {
    next(e)
  }
}
