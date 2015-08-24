import express from 'express'
import * as UsersController from './users/users-controller'
import * as OrganizationsController from './organizations/organizations-controller'
import * as DealsController from './deals/deals-controller'
import * as LocationsController from './locations/locations-controller'
import * as RedemptionsController from './redemptions/redemptions-controller'
import * as QuestionsController from './questions/questions-controller'
import * as SurveyResponsesController from './survey_responses/survey_responses-controller'
import * as PaymentsController from './payments/payments-controller'
import * as FundraiserMembersController from './fundraiser_members/fundraiser_members_controller'
import * as DonationsController from './donations/donations-controller'
var appRouter = express.Router()

export default appRouter

appRouter.use('/api/v1/users', UsersController.router)
appRouter.use('/api/v1/organizations', OrganizationsController.router)
appRouter.use('/api/v1/deals', DealsController.router)
appRouter.use('/api/v1/locations', LocationsController.router)
appRouter.use('/api/v1/redemptions', RedemptionsController.router)
appRouter.use('/api/v1/questions', QuestionsController.router)
appRouter.use('/api/v1/survey_responses', SurveyResponsesController.router)
appRouter.use('/api/v1/payments', PaymentsController.router)
appRouter.use('/api/v1/fundraiser_members', FundraiserMembersController.router)
appRouter.use('/api/v1/donations', DonationsController.router)

