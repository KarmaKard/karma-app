import Router, {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'
import Login from './components/login'
import Profile from './components/profile/profile'
import RegistrationDealHandler from './components/deals/handlers/registration_deal_handler'
import BusinessDashboardDealHandler from './components/deals/handlers/dashboard_deal_handler'
import RegistrationProfileHandler from './components/profile/handlers/registration_profile_handler'
import BusinessDashboardProfileHandler from './components/profile/handlers/dashboard_profile_handler'
import Registration from './components/registration/registration'
import BusinessDashboard from './components/business_dashboard/dashboard'
import Business from './components/business'
import Reports from './components/reports/reports'
import UserDashboard from './components/user_dashboard/dashboard'

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
    <Route name="user_dashboard" handler={UserDashboard} path="/dashboard" />
    <Route name="business" handler={Business} path="/business">
      <Route name="registration" handler={Registration} path="registration">
        <Route name="profile_builder" handler={RegistrationProfileHandler} path="profile-builder" />
        <Route name="deal_builder" handler={RegistrationDealHandler} path="deal-builder" />
      </Route>
      <Route name="business_dashboard" handler={BusinessDashboard} path="/dashboard" >
        <DefaultRoute handler={Reports} />
        <Route name="profile" handler={BusinessDashboardProfileHandler} path="profile" />
        <Route name="deals" handler={BusinessDashboardDealHandler} path="deals" />
      </Route>
    </Route>
  </Route>
)