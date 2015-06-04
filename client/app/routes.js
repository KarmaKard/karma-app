import Router, {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'

import Login from './components/users/handlers/login'
import Account from './components/users/handlers/account'
import User from './components/users/handlers/user'

import Organizations from './components/organizations/handlers/organizations'
import ShowOrganizationList from './components/organizations/handlers/show_organization_list'
import ShowCategories from './components/organizations/handlers/show_categories'
import ShowCategoricalOrganizations from './components/organizations/handlers/show_categorical_organizations'
import OrganizationsUserManages from './components/organizations/handlers/organizations_user_manages'
import NewOrganization from './components/organizations/handlers/new_organization'
import Organization from './components/organizations/handlers/organization'
import ShowOrganizationProfile from './components/organizations/handlers/show_profile'
import OrganizationUserManages from './components/organizations/handlers/organization_user_manages'
import ShowOrganizationDashboard from './components/organizations/handlers/show_dashboard'
import EditOrganizationProfile from './components/organizations/handlers/edit_profile'
import EditOrganizationLocations from './components/organizations/handlers/edit_locations'
import EditOrganizationKeywords from './components/organizations/handlers/edit_keywords'
import EditBusinessDeals from './components/organizations/handlers/edit_business_deals'
import EditFundraiserTeam from './components/organizations/handlers/edit_fundraiser_team'
import EditFundraiserBank from './components/organizations/handlers/edit_fundraiser_bank'
import DealRedemption from './components/organizations/handlers/redeem_deal'
import RedemptionScreen from './components/organizations/handlers/show_redemption'
import RedemptionSuccess from './components/organizations/handlers/show_redemption_success'
import AddRedemptions from './components/organizations/handlers/add_redemptions'

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
  <Route name="root" handler={App} path="/">
    <DefaultRoute handler={Login} />

    <Route name="organizations" handler={Organizations} path="organizations">
      <DefaultRoute handler={ShowOrganizationList} />
      <Route name="organizations_user_manages" handler={OrganizationsUserManages} path="manage" />
      <Route name="new_organization" handler={NewOrganization} path="new" />
      <Route name="categories" handler={ShowCategories} path="categories" />
      <Route name="categorical_organizations" handler={ShowCategoricalOrganizations} path="category/:category" />
      <Route name="organization" handler={Organization} path=":organizationId" >
        <DefaultRoute handler={ShowOrganizationProfile} />
        <Route name="redeem_deal" handler={DealRedemption} path="deal/:dealId" >
          <DefaultRoute handler={RedemptionScreen} />
          <Route name="redeem_success" handler={RedemptionSuccess} path="redeemed" />
          <Route name="add_redemptions" handler={AddRedemptions} path="add" />
        </Route>

        <Route name="organization_user_manages" handler={OrganizationUserManages} path="manage">
          <DefaultRoute handler={ShowOrganizationDashboard} /> 
          <Route name="edit_profile" handler={EditOrganizationProfile} path="profile" />
          <Route name="edit_locations" handler={EditOrganizationLocations} path="locations" />
          <Route name="edit_keywords" handler={EditOrganizationKeywords} path="keywords" />
          <Route name="edit_deals" handler={EditBusinessDeals} path="deals" />
          <Route name="edit_fundraiser_team" handler={EditFundraiserTeam} path="team" />
          <Route name="edit_fundraiser_bank" handler={EditFundraiserBank} path="bank" />
        </Route>
      </Route>
    </Route>

    <Route name="account" handler={User} path="/account" >
      <DefaultRoute handler={Account} />
    </Route>
  </Route>
)
