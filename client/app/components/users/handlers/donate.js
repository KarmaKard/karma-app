import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import DonateForm from '../donate'
import LoginForm from '../reusable_login_form'
import Register from '../register'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, FlatButton, Card, CardHeader, CardTitle, Avatar, CardText, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()


export default React.createClass({
  getInitialState () {
    return {
      mismatchPasswords: false,
      isExistingUser: false,
      errors: null,
      buttonDisabled: false
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount () {
    this.props.showBackLink(true)
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  createToken (info) {
    Stripe.setPublishableKey('pk_test_lRFVtD3iTz0LL58rsz3LiDb9')
    Stripe.card.createToken({
      number: info.cardNumber,
      cvc: info.cvc,
      exp_month: info.expirationMonth,
      exp_year: info.expirationYear
    }, this.stripeResponseHandler)
  },

  stripeResponseHandler (status, response) {
    if (response.error) {
      this.setState({errors: response.error.message})
    } else {
      var stripeToken = response.id
      var { router } = this.context
      var user = this.props.user

      if (user) {
        var organizationId = this.context.router.getCurrentParams().organizationId
        var memberNameToken = window.localStorage.getItem('member-token')
        var fundraiserMemberId
        if (memberNameToken) {
          var fundraiserMember = this.props.fundraiserMembers.filter(
            fundraiserMember => fundraiserMember.name.toLowerCase().replace(/ /g,'') === memberNameToken 
            && fundraiserMember.organizationId === organizationId)[0]
          fundraiserMemberId = fundraiserMember.id
        } else {
          fundraiserMemberId = 'KARMAKARD'
        }
        flux.actions.users.createPayment(stripeToken, user, router, 'deals', organizationId, fundraiserMemberId)
      }
    }
  },

  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  userLogin (email, password) {
    console.log(email, password)
    flux.actions.users.login(email, password)
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  toggleForm () {
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  render() {
  injectTapEventPlugin()
    var barrierForm = this.state.isExistingUser
      ? <LoginForm toggleForm={this.toggleForm} loginErrors={this.props.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Register toggleForm={this.toggleForm} setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>

    var user = this.props.user
    console.log(this.props.user)
    var form = user
      ? <DonateForm user={user} createToken={this.createToken} toggleDisableButton={this.toggleDisableButton} buttonDisabled={this.state.buttonDisabled}/>
      : barrierForm

    var toggleButtonText
    if (!user) {
      toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'
    }

     var memberNameToken = window.localStorage.getItem('member-token')
     console.log('donate name', memberNameToken)
    return (
      <Card className= 'main_card'>
        {form}
        <span ref='errors' className='payment-errors'>{this.state.errors}</span>
      </Card>
    )
  }
})
