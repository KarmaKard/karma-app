import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Mui from 'material-ui'
import { flux } from '../../../main'
import LoginForm from '../login_form'
import mui from 'material-ui'
import {AppBar, AppCanvas, FlatButton, Card, IconButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return this.getStoreState()
  },

  getStoreState () {
    return {
      users: flux.stores.users.getState(),
      mismatchPasswords: false,
      isExistingUser: true
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

  storeChange () {
    this.setState(this.getStoreState())
  },

  componentWillMount () {
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.users.removeListener('change', this.storeChange)
  },

  componentDidMount () {
    var currentUser = this.state.users.currentUser
    if (currentUser) {
      var router = this.context.router
      router.transitionTo('deals')
    }

    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]

      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=549948578487024'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  toggleForm (e) {
    e.preventDefault()
    var {router} = this.context
    router.transitionTo('join_options')
  },

  setFbLogin (user) {
    var {router} = this.context
    flux.actions.users.facebookLogin(user, router, 'deals')
  },

  userLogin (email, password) {
    var {router} = this.context
    flux.actions.users.login(email, password, router, 'deals')
  },

  render() {
  injectTapEventPlugin()

    var toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'

    return (
      <Card 
        className="main_card">
        <LoginForm loginErrors={this.state.users.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      </Card>
    )
  }
})
