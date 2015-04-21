import Router, {Route, RouteHandler, DefaultRoute} from 'react-router'
import React from 'react'
import Login from './components/login'

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>This is a Banner</h1>
        <RouteHandler />
      </div>
    )
  }
})

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Login} />
  </Route>
)
