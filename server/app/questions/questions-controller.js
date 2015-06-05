import express from 'express'
import * as questionsTable from './questions-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', auth.token, list)
export async function list (req, res, next) {
  try {
    var questions = await questionsTable.index()
    res.json({questions})
  } catch (e) {
    next(e)
  }
}

router.post('/', auth.token, validateCreate, create)
export async function create (req, res, next) {
  try {
    var questionToSave = req.body.question
    questionToSave.userId = req.user.id
    var organization = await questionsTable.insert(questionToSave)
    res.json({question: question})
  } catch (e) {
    next(e)
  }
}
