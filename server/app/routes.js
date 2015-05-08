import express from 'express'
import * as UsersController from './users/users-controller'
import * as OrganizationsController from './organizations/organizations-controller'
import * as DealsController from './deals/deals-controller'
var appRouter = express.Router()

export default appRouter

appRouter.use('/api/v1/users', UsersController.router)
appRouter.use('/api/v1/organizations', OrganizationsController.router)
appRouter.use('/api/v1/deals', DealsController.router)
