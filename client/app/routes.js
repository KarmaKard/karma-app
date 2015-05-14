import Router, {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'
import Login from './components/users/handlers/login'
import Account from './components/users/handlers/account'
import BusinessesLinks from './components/business/handlers/multi_links'
import BusinessLinks from './components/business/handlers/single_links'
import BusinessDashboard from './components/business/handlers/dashboard'
import BusinessAnalytics from './components/business/handlers/analytics'
import NewBusiness from './components/business/handlers/new_business'
import EditBusiness from './components/business/handlers/edit_business'
import OrganizationWizard from './components/organization_wizard/handlers/organization_wizard'
import OrganizationWizardType from './components/organization_wizard/handlers/organization_type'
import OrganizationWizardName from './components/organization_wizard/handlers/organization_name'
import OrganizationWizardCategory from './components/organization_wizard/handlers/organization_category'
import OrganizationWizardLogo from './components/organization_wizard/handlers/organization_logo'
import Organization from './components/organization_dashboard/handlers/organization'
import OrganizationDashboard from './components/organization_dashboard/handlers/dashboard'
import OrganizationProfile from './components/organization_dashboard/handlers/organization_profile'
import BusinessKeywords from './components/organization_dashboard/handlers/business_keywords'
import OrganizationLocations from './components/organization_dashboard/handlers/organization_locations'
import BusinessDeals from './components/organization_dashboard/handlers/business_deals'
import OrganizationAnalytics from './components/organization_dashboard/handlers/organization_analytics'
import FundraiserTeam from './components/organization_dashboard/handlers/fundraiser_team'
import FundraiserBank from './components/organization_dashboard/handlers/fundraiser_bank'
import User from './components/users/handlers/user'
import UserAccount from './components/users/handlers/user_account'
import UserOrganizations from './components/users/handlers/user_organizations'

var App = React.createClass({
  render() {
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
})

export default (
  <Route handler={App} path="/">

    <DefaultRoute handler={Login} />
    <Route name="wizard" handler={OrganizationWizard} path="wizard" >
      <DefaultRoute handler={OrganizationWizardType} /> 
      <Route name="wizard_name" handler={OrganizationWizardName} path="name"/>
      <Route name="wizard_category" handler={OrganizationWizardCategory} path="category"/>
      <Route name="wizard_logo" handler={OrganizationWizardLogo} path="logo"/>
    </Route>

    <Route name="organization" handler={Organization} path="/organization/:organizationId" >
      <DefaultRoute handler={OrganizationDashboard} /> 
      <Route name="organization_profile" handler={OrganizationProfile} path="profile" />
      <Route name="business_keyword" handler={BusinessKeywords} path="keywords" />
      <Route name="organization_locations" handler={OrganizationLocations} path="locations" />
      <Route name="business_deals" handler={BusinessDeals} path="deals" />
      <Route name="organization_analytics" handler={OrganizationAnalytics} path="analytics" />
      <Route name="fundraiser_team" handler={FundraiserTeam} path="team" />
      <Route name="fundraiser_bank" handler={FundraiserBank} path="bank" />
    </Route>

    <Route name="user" handler={User} path="/user/:userId" >
      <DefaultRoute handler={UserAccount} />
      <Route name="user_organizations" handler={UserOrganizations} path="organizations" />
    </Route>

    <Route name="account" handler={Account} path="/account" />
    <Route name="login" handler={Login} path="/registration" />
    <Route name="businesses" handler={BusinessesLinks} path="/business">
      <DefaultRoute handler={BusinessDashboard} />
      <Route name="newBusiness" handler={NewBusiness} path="new" />
      <Route name="business" handler={BusinessLinks} path=":businessId">
        <DefaultRoute handler={BusinessAnalytics} />
        <Route name="editBusiness" handler={EditBusiness} path="edit" />
      </Route>
    </Route>
  </Route>
)
