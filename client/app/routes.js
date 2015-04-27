import Router, {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'
import Login from './components/login'
import Profile from './components/profile/profile'
import RegistrationDealHandler from './components/deals/handlers/registration_deal_handler'
import DashboardDealHandler from './components/deals/handlers/dashboard_deal_handler'
import RegistrationProfileHandler from './components/profile/handlers/registration_profile_handler'
import DashboardProfileHandler from './components/profile/handlers/dashboard_profile_handler'
import Registration from './components/registration/registration'
import Dashboard from './components/dashboard/dashboard'
import Business from './components/business'

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
    <Route name="business" handler={Business} path="/business">
      <Route name="registration" handler={Registration} path="registration">
        <Route name="profile_builder" handler={RegistrationProfileHandler} path="profile-builder" />
        <Route name="deal_builder" handler={RegistrationDealHandler} path="deal-builder" />
      </Route>
      <Route name="dashboard" handler={Dashboard} path="/dashboard" >
        <Route name="profile" handler={DashboardProfileHandler} path="profile" />
        <Route name="deals" handler={DashboardDealHandler} path="deals" />
      </Route>
    </Route>
  </Route>
)