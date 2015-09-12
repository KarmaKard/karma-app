import express from 'express'
import * as questionsTable from './questions-table'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.get('/', list)
export async function list (req, res, next) {
  try {
    var questions = await questionsTable.index()
    res.json({questions})
  } catch (e) {
    next(e)
  }
}

