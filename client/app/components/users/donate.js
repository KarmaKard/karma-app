import React from 'react'
import { flux } from '../../main'
import Registration from './register'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null
    }
  },

  setRegistrationInfo(user){
    this.setState({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password

    })
  },

  didClick(e) {
    e.preventDefault()
    React.findDOMNode(this.refs.button).disabled = true

    var cardNumber = React.findDOMNode(this.refs.cardNumber).value
    var cvc = React.findDOMNode(this.refs.cvc).value
    var expirationMonth = React.findDOMNode(this.refs.expirationMonth).value
    var expirationYear = React.findDOMNode(this.refs.expirationYear).value

    Stripe.card.createToken({
      number: cardNumber,
      cvc: cvc,
      exp_month: expirationMonth,
      exp_year: expirationYear
    }, this.stripeResponseHandler)
  },

  stripeResponseHandler(status, response) {
    if (response.error) {
      React.findDOMNode(this.refs.errors).value(response.error.message)
      React.findDOMNode(this.refs.button).disabled = false
    } 
    else {
      var token = response.id
      var { router } = this.context
      var currentUser = this.props.currentUser
      console.log(response)
      if(currentUser){
        currentUser.stripeToken = token
        flux.actions.users.update(currentUser)
        React.findDOMNode(this.refs.button).disabled = false
        return router.transitionTo('account')
      }

      var user = { 
        email : this.state.email, 
        firstName : this.state.firstName, 
        lastName : this.state.lastName, 
        password : this.state.password, 
        stripeToken : token 
      }

      console.log(user)
      flux.actions.users.create(router, user)
      React.findDOMNode(this.refs.button).disabled = false
    }
  },

  render() {
    Stripe.setPublishableKey("pk_test_lRFVtD3iTz0LL58rsz3LiDb9")

    var showRegistration = this.props.currentUser
      ?  null
      :  <Registration setRegistrationInfo={this.setRegistrationInfo} />

    return (
      <div className="register" >
        <div className="content_box-header">Donation</div>
        {showRegistration}
        <form action="" method="POST" id="payment-form">
          
          <hr/>
          <h2>Card Information</h2>
          <div className="form-row">
            <label>
              <span>Card Number</span>
              <input type="text" ref="cardNumber" className="karma_input" placeholder="Credit Card Number" />
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>CVC</span>
              <input type="text" ref="cvc" className="karma_input" placeholder="CVC" />
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Exp Month</span>
              <input type="text" ref="expirationMonth" className="karma_input" size="2" placeholder="MM" />
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Exp Year</span>
              <input type="text" ref="expirationYear" className="karma_input" size="4" placeholder="YYYY" />
            </label>
          </div>

          <span ref="errors" className="payment-errors"></span>

        
          <input type="submit" ref="button" onClick={this.didClick} className="karma_button" value="Submit"/>
        </form>
      </div>
    )
  }
})