import express from 'express'
import * as redemptionsTable from './redemptions-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next) {
  try {
    var redemptions = await redemptionsTable.index()
    res.json({redemptions})
  } catch (e) {
    next(e)
  }
}

router.post('/', auth.token, validateCreate, create)
export async function create (req, res, next) {
  try {
    var redemptionToSave = req.body.redemption
    redemptionToSave.userId = req.user.id
    var organization = await redemptionsTable.insert(redemptionToSave)
    res.json({redemption: redemption})
  } catch (e) {
    next(e)
  }
}
