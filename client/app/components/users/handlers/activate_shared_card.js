import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import LoginForm from '../reusable_login_form'
import Register from '../register'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, FlatButton, Card, CardHeader, CardTitle, Avatar, CardText, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState () {
    return  {
      mismatchPasswords: false,
      isExistingUser: true,
      inexistentDonationMessage: null
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentDidUpdate () {
    var {router} = this.context
    var donationId = this.context.router.getCurrentParams().donationId
    var user = this.props.user
    var donation = this.props.donations.filter(donation => donation.id === donationId)[0]
      if (donation && donation.activationStatus === 'inactive') {
        if (user) {
          flux.actions.users.activateDonation(user, donationId)
        }
        return
      } else if (donation && donation.activationStatus === 'active' && donation.userId === user.id) {
        return router ? router.transitionTo('account') : null
      } else if (!donation && !this.state.inexistentDonationMessage) {
        this.setState({inexistentDonationMessage: 'No Donation found.'})
      }
    return
  },

  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  userLogin (email, password) {
    flux.actions.users.login(email, password)
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  toggleForm (e) {
    e.preventDefault()
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  render() {
  injectTapEventPlugin()
    var form = this.state.isExistingUser
      ? <LoginForm toggleForm={this.toggleForm} loginErrors={this.props.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Register toggleForm={this.toggleForm} setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>

    var toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'
    var inexistentDonationMessage = this.state.inexistentDonationMessage ? inexistentDonationMessage : null

    return (
      <Card className= 'main_card'>
        {inexistentDonationMessage}
        {form}
      </Card>
    )
  }
})
