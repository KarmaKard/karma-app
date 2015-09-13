import express from 'express'
import * as surveyResponseTable from './survey_responses-table'
import * as auth from '../common/middleware/authentication'

export var router = express.Router()

router.post('/', auth.token, create)
export async function create (req, res, next) {
  try {
    var surveyResponse = await surveyResponseTable.insert(req.body.surveyResponse)
    res.json({surveyResponse: surveyResponse})
  } catch (e) {
    next(e)
  }
}

router.get('/', list)
export async function list (req, res, next) {
  try {
    var surveyResponses = await surveyResponseTable.index()
    res.json({surveyResponses})
  } catch (e) {
    next(e)
  }
}

