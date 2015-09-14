import {Route, RouteHandler, DefaultRoute} from 'react-router'
import { flux } from './main'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
import Login from './components/users/handlers/login'
import JoinOptions from './components/users/handlers/join_options'
import Register from './components/users/handlers/register'
import Donate from './components/users/handlers/donate'
import DealList from './components/deals/handlers/list_deals'
import PasswordReset from './components/users/handlers/password_reset'
import NewPassword from './components/users/handlers/new_password'
import Account from './components/users/handlers/account'
import User from './components/users/handlers/user'
import AddFundraiserMember from './components/users/handlers/add_fundraiser_member'
import ActivateDonation from './components/users/handlers/activate_donation'
import ActivateSharedCard from './components/users/handlers/activate_shared_card'

import Fundraisers from './components/organizations/handlers/fundraisers'
import FundraiserList from './components/organizations/handlers/fundraiser_list'
import FundraiserProfile from './components/organizations/handlers/fundraiser_profile'

import FundraiserJoin from './components/organizations/handlers/fundraiser_join'
import Deals from './components/deals/handlers/deals'

import RedirectToDeals from './components/organizations/handlers/redirect_to_deals'
import Organizations from './components/organizations/handlers/organizations'
import ShowCategories from './components/organizations/handlers/show_categories'
import ShowCategoricalOrganizations from './components/organizations/handlers/show_categorical_organizations'
import OrganizationsUserManages from './components/organizations/handlers/organizations_user_manages'
import MemberFundraisers from './components/organizations/handlers/member_fundraisers'
import MemberFundraiser from './components/organizations/handlers/member_fundraiser'
import MemberFundraiseDashboard from './components/organizations/handlers/member_fundraiser_dashboard'
import FundraiserMemberInPerson from './components/organizations/handlers/fundraiser_member_inperson'
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
var ThemeManager = new mui.Styles.ThemeManager()
let Colors = mui.Styles.Colors

var App = React.createClass({

    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState () {
      flux.actions.organizations.getOrganizations()
      flux.actions.deals.getRedemptions()
      flux.actions.deals.getDeals()
      flux.actions.deals.getSurveyQuestions()
      flux.actions.deals.getSurveyResponses()
      flux.actions.users.getFundraiserMembers()
      flux.actions.users.getPayments()
      flux.actions.users.getDonations()
      var storeState = this.getStoreState()
      return storeState
    },

    storeChange () {
      this.setState(this.getStoreState)
    },

    getStoreState () {
      return {
        organizations: flux.stores.organizations.getState(),
        user: flux.stores.users.getState(),
        deals: flux.stores.deals.getState(),
        showBackLink: false
      }
    },

    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext () {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      }
    },

    componentWillMount () {
      flux.stores.organizations.addListener('change', this.storeChange)
      flux.stores.users.addListener('change', this.storeChange)
      flux.stores.deals.addListener('change', this.storeChange)
      ThemeManager.setPalette({
        primary1Color: Colors.lightBlue300,
        accent1Color: '#FF7070'
      })
    },

    componentWillUnmount () {
      flux.stores.organizations.removeListener('change', this.storeChange)
      flux.stores.users.removeListener('change', this.storeChange)
      flux.stores.deals.removeListener('change', this.storeChange)
    },

    showBackLink (showBackLink) {
      this.setState({showBackLink})
    },

    goBack () {
      history.back()
    },

    compare (a, b) {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    },

    sortByName (a, b) {
      return this.compare(a.name, b.name)
    },

    sortByDate (a, b) {
      return a.createdAt - b.createdAt
    },

    render () {
      var organizations = this.state.organizations.organizations || []
      var currentUser = this.state.user.currentUser
      var payments = this.state.user.payments || []
      var fundraiserMembers = this.state.user.fundraiserMembers || []
      var deals = this.state.deals.deals || []
      var redemptions = this.state.deals.redemptions || []
      var surveyQuestions = this.state.deals.surveyQuestions || []
      var surveyResponses = this.state.deals.surveyResponses || []
      var donations = this.state.user.donations || []
      var loginErrors = this.state.user.loginErrors || {}
      var userLocation = this.state.user.userLocation || {}
      organizations = organizations.sort(this.sortByName)
      payments = payments.sort(this.sortByDate)
      donations = donations.sort(this.sortByDate)
      fundraiserMembers = fundraiserMembers.sort(this.sortByName)
      var backLink
      if (this.state.showBackLink) {
        backLink = (<button onClick={this.goBack} className='karma_button'><i style={{color: 'white'}} className="material-icons md-48 md-light">keyboard_arrow_left</i></button>)
      } else {
        backLink = (<div style={{width: 80 + 'px'}}></div>)
      }
      return (
        <AppCanvas>
          <AppBar
            showMenuIconButton={true}
            style={{boxShadow: '0 1px 6px rgba(255, 112, 112, 0.48), 0 1px 4px rgba(255, 112, 112, 0.56)'}}
            title=<div className='karmatitle'></div>
            iconElementRight={<div style={{width: 80 + 'px'}}></div>}
            iconElementLeft={backLink}/>
          <div className='spacer'></div>
          <RouteHandler
            organizations={organizations}
            user={currentUser}
            deals={deals}
            redemptions={redemptions}
            surveyQuestions={surveyQuestions}
            surveyResponses={surveyResponses}
            payments={payments}
            fundraiserMembers={fundraiserMembers}
            donations={donations}
            showBackLink={this.showBackLink}
            userLocation={userLocation}
            loginErrors={loginErrors}/>

        </AppCanvas>
      )
    }
  })

export default (
  <Route name='root' handler={App} path='/'>
    <DefaultRoute handler={RedirectToDeals} onEnter={RedirectToDeals.willTransitionTo} />
    <Route name='login' handler={Login} path='login' />
    <Route name='join_options' handler={JoinOptions} path='join_options' />
    <Route name='register' handler={Register} path='register' />
    <Route name='create_organization' handler={NewOrganization} path='new' />
    <Route name='add_fundraiser_member' handler={AddFundraiserMember} path='add_fundraiser_member/:fundraiserMemberId' />
    <Route name='activate_donation' handler={ActivateDonation} path='activate/:paymentId' />
    <Route name='activate_shared_card' handler={ActivateSharedCard} path='activate/shared/:donationId' />
    <Route name='password_reset' handler={PasswordReset} path='reset' />
    <Route name='new_password' handler={NewPassword} path='new_password/:passwordResetId' />
    <Route name='list_deals' handler={DealList} path='deals' />

    <Route name='fundraisers' handler={Fundraisers} path='fundraisers' >
      <DefaultRoute handler={FundraiserList} />
      <Route name='fundraiser_profile' handler={FundraiserProfile} path=':organizationId' />
      <Route name='donate' handler={Donate} path='donate/:organizationId' />
      <Route name='fundraiser_list_deals' handler={DealList} path='deals' />
    </Route>

    <Route name='fundraiser_join' handler={FundraiserJoin} path='join/:fundraiserName' />
    <Route name='fundraiser_member_join' handler={FundraiserJoin} path='join/:fundraiserName/:fundraiserMemberName' />

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
      <Route name='member_fundraisers' handler={MemberFundraisers} path='fundraisers' />
      <Route name='organization' handler={Organization} path=':organizationId' >
        <DefaultRoute handler={ShowOrganizationProfile} />
        <Route name='member_fundraiser' handler={MemberFundraiser} path='fundraise' >
          <DefaultRoute handler={MemberFundraiseDashboard} />
          <Route name='inperson' handler={FundraiserMemberInPerson} path='inperson' />
        </Route>
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
