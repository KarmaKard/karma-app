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
