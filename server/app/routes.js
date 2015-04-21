import express from 'express'
import UsersController from './users/users-controller'
var appRouter = express.Router()

export default appRouter

appRouter.use('/', UsersController.router)

