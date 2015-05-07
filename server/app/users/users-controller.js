import express from 'express'
import * as usersTable from './users-table'
import validateCreate from './validators/validate-create'
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10)

export var router = express.Router()

router.get('/', list)
export function list (req, res, next){
  var queryPromise = usersTable.index()
  queryPromise.then(users => {
    res.json({users})
  }).catch(next)
}

router.post('/', validateCreate, create)
export function create (req, res, next) {
  req.body.user.password = bcrypt.hashSync(req.body.user.password, salt)
  req.body.user.created_at = Date.now()
  var queryPromise = usersTable.insert(req.body.user)
  queryPromise.then(data => {
    res.json(req.body)
  }).catch(next)
}
