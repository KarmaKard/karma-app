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
      inexistantPaymentMessage: null
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
    var paymentId = this.context.router.getCurrentParams().paymentId
    var user = this.props.user
    console.log(paymentId, user)
    var payment = this.props.payments.filter(payment => payment.id === paymentId)[0]
      if (payment && payment.activationStatus === 'inactive') {
        if (user) {
          console.log('call to api')

          flux.actions.users.activatePayment(user, paymentId)
        }
        return
      } else if (payment && payment.activationStatus === 'active' && payment.userId === user.id) {
        return router ? router.transitionTo('account') : null
      } else if (!payment && !this.state.inexistantPaymentMessage) {
        this.setState({inexistantPaymentMessage: 'No payment found.'})
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
      ? <LoginForm  toggleForm={this.toggleForm} loginErrors={this.props.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Register  toggleForm={this.toggleForm} setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>

    var toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'
    var inexistantPaymentMessage = this.state.inexistantPaymentMessage ? inexistantPaymentMessage : null

    return (
      <Card className= 'main_card'>
        {inexistantPaymentMessage}
        {form}
      </Card>
    )
  }
})
