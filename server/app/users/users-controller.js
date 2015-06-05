import express from 'express'
import * as usersTable from './users-table'
import validateCreate from './validators/validate-create'
import validateUpdate from './validators/validate-update'
import * as auth from '../common/middleware/authentication'
import { hash as hashPassword } from '../common/services/passwords'
import { encode as encodeToken } from '../common/services/token'

export var router = express.Router()

router.get('/', auth.token, auth.admin, list)
export async function list (req, res, next){
  try {
    var users = await usersTable.index()
    res.json({users})
  } catch (e) {
    next(e)
  }
}

router.post('/', validateCreate, create)
export async function create (req, res, next) {
  try {
    var user = req.body.user
    var hash = await hashPassword(user.password)
    user.role = "customer"
    delete user.password
    user.hash = hash
    user.created_at = Date.now()
    var data = await usersTable.insert(user)
    res.status(201).json({
      token: encodeToken(data)
    })
  } catch (e) {
    next(e)
  }
}

router.put('/:userId', validateUpdate, update)
export function update (req, res, next) {
  var pUser = usersTable.update(req.body.user)
  pUser.then(user => {
    res.json({user})
  }).catch(next)
}

router.post('/login', auth.password, login)
export function login (req, res, next) {
  res.status(201).json({
    token: encodeToken(req.user)
  })
}
