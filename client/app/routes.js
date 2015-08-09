import {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'

import Login from './components/users/handlers/login'
import Logout from './components/users/handlers/logout'
import Register from './components/users/handlers/register'
import Donate from './components/users/handlers/donate'
import DealList from './components/deals/handlers/list_deals'
import PasswordReset from './components/users/handlers/password_reset'
import NewPassword from './components/users/handlers/new_password'
import Account from './components/users/handlers/account'
import User from './components/users/handlers/user'

import Fundraisers from './components/organizations/handlers/fundraisers'
import FundraiserList from './components/organizations/handlers/fundraiser_list'
import FundraiserProfile from './components/organizations/handlers/fundraiser_profile'

import Deals from './components/deals/handlers/deals'
import DealCards from './components/deals/handlers/deal_cards'
import DealCard from './components/deals/handlers/deal_card'

import RedirectToDeals from './components/organizations/handlers/redirect_to_deals'
import Organizations from './components/organizations/handlers/organizations'
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
import Survey from './components/organizations/handlers/survey'

var App = React.createClass({
  render () {
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
})

export default (
  <Route name='root' handler={App} path='/'>
    <DefaultRoute handler={RedirectToDeals} onEnter={RedirectToDeals.willTransitionTo} />
    <Route name='login' handler={Login} path='login' />
    <Route name='logout' handler={Logout} path='logout' />
    <Route name='register' handler={Register} path='register' />
    <Route name='password_reset' handler={PasswordReset} path='reset' />
    <Route name='new_password' handler={NewPassword} path='new_password/:passwordResetId' />
    <Route name='create_organization' handler={NewOrganization} path='organization' />
    <Route name='list_deals' handler={DealList} path='deals' />

    <Route name='fundraisers' handler={Fundraisers} path='fundraisers' >
      <DefaultRoute handler={FundraiserList} />
      <Route name='fundraiser_profile' handler={FundraiserProfile} path=':organizationId' />
    </Route>

    <Route name='donate' handler={Donate} path='donate/:organizationStripePubKey' />

    <Route name='deals' handler={Deals} path='dealcards' >
      <DefaultRoute handler={ShowCategories} />
      <Route name='categorical_organizations' handler={ShowCategoricalOrganizations} path='category/:category' />
      <Route name='business' handler={Organization} path=':organizationId' >
        <DefaultRoute handler={ShowOrganizationProfile} />
        <Route name='redeem_deal' handler={DealRedemption} path=':dealId' >
          <DefaultRoute handler={RedemptionScreen} />
          <Route name='survey' handler={Survey} path='question' />
          <Route name='redeem_success' handler={RedemptionSuccess} path='redeemed' />
          <Route name='add_redemptions' handler={AddRedemptions} path='add' />
        </Route>
      </Route>
    </Route>

    <Route name='organizations' handler={Organizations} path='organizations'>
      <DefaultRoute handler={OrganizationsUserManages} />
      <Route name='new_organization' handler={NewOrganization} path='new' />
      <Route name='organization' handler={Organization} path=':organizationId' >
        <DefaultRoute handler={ShowOrganizationProfile} />
        <Route name='organization_user_manages' handler={OrganizationUserManages} path='manage'>
          <DefaultRoute handler={ShowOrganizationDashboard} />
          <Route name='edit_profile' handler={EditOrganizationProfile} path='profile' />
          <Route name='edit_locations' handler={EditOrganizationLocations} path='locations' />
          <Route name='edit_keywords' handler={EditOrganizationKeywords} path='keywords' />
          <Route name='edit_deals' handler={EditBusinessDeals} path='deals' />
          <Route name='edit_fundraiser_team' handler={EditFundraiserTeam} path='team' />
          <Route name='edit_fundraiser_bank' handler={EditFundraiserBank} path='bank' />
        </Route>
      </Route>
    </Route>

    <Route name='account' handler={User} path='/account' >
      <DefaultRoute handler={Account} />
    </Route>
  </Route>
)
