import express from 'express'
import * as usersTable from './users-table'
import validateCreate from './validators/validate-create'
import bcrypt from 'bcryptjs'

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
  var user = req.body.user
  bcrypt.hash(user.password, 10, function(err, hash) { 
    user.hash = hash
    delete user.password
    user.created_at = Date.now()
    var queryPromise = usersTable.insert(user)
    queryPromise.then(data => {
      res.json(req.body)
    }).catch(next)
  })  
}
