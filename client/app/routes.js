import Router, {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'
import Login from './components/login'
import Profile from './components/profile/profile'
import DealBuilder from './components/deals/deal_builder'
import Dashboard from './components/dashboard/dashboard'


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
    <Route name="dashboard" handler={Dashboard} path="/business">
      <Route name="profile" handler={Profile} path="/profile" />
      <Route name="deal_builder" handler={DealBuilder} path="/deals" />
    </Route>
  </Route>
)


