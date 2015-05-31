import express from 'express'
import * as usersTable from './users-table'
import validateCreate from './validators/validate-create'
import * as auth from '../common/middleware/authentication'
import { hash as hashPassword } from '../common/services/passwords'
import { encode as encodeToken } from '../common/services/token'

export var router = express.Router()

router.get('/', auth.token, auth.admin, list)
export function list (req, res, next){
  var queryPromise = usersTable.index()
  queryPromise.then(users => {
    res.json({users})
  }).catch(next)
}

router.post('/', validateCreate, create)
export function create (req, res, next) {
  var user = req.body.user
  hashPassword(user.password).then(hash => {
    delete user.isSuperAdmin
    delete user.password
    user.hash = hash
    user.created_at = Date.now()
    return usersTable.insert(user)
  }).then(data => {
    res.status(201).json({
      token: encodeToken(data)
    })
  }).catch(next)
}

router.post('/login', auth.password, login)
export function login (req, res, next) {
  res.status(201).json({
    token: encodeToken(req.user)
  })
}
