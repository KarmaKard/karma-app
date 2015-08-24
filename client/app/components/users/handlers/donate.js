import React from 'react'
import { flux } from '../../../main'
import DonateForm from '../donate'
import LoginForm from '../login_form'
import Register from '../register'

export default React.createClass({
  getInitialState () {
    return Object.assign(this.getStoreState(), {
      mismatchPasswords: false,
      isExistingUser: false,
      errors: null
    })
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getStoreState () {
    return {
      users: flux.stores.users.getState()
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
      var currentUser = this.state.users.currentUser

      if (currentUser) {
        var fundraiserMemberId = window.localStorage.getItem('affiliate-token')
        var organizationId = this.context.router.getCurrentParams().organizationId
        flux.actions.users.createPayment(stripeToken, currentUser, router, 'deals', organizationId, fundraiserMemberId)
      }
    }
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

  render () {
    var barrierForm = this.state.isExistingUser
      ? <LoginForm loginErrors={this.state.users.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Register setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>

    var user = this.state.users.currentUser
    var form = user
      ? <DonateForm currentUser={user} createToken={this.createToken} toggleDisableButton={this.toggleDisableButton} buttonDisabled={this.state.buttonDisabled}/>
      : barrierForm

    if (!user) {
      var toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'
    }

    return (
      <div>
        <div className= 'page_header'>
          <div className= 'header_left karmatitle'>KarmaKard</div>
          <button className='header_right' onClick={this.toggleForm}>{toggleButtonText}</button>
        </div>
        <div className= 'guest_box'>
          {form}
          <span ref='errors' className='payment-errors'>{this.state.errors}</span>
        </div>
      </div>
    )
  }
})
