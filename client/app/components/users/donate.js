import React from 'react'
import { flux } from '../../main'
import Registration from './register'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

    getInitialState() {
    var storeState = this.getStoreState()
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      usersStoreState: flux.stores.users.getState()
    }
  },

  componentWillMount() {
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.users.removeListener('change', this.storeChange)
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
      var stripeToken = response.id
      var { router } = this.context
      var currentUser = this.state.usersStoreState.currentUser
      if(currentUser){
        flux.actions.users.createPayment(stripeToken, currentUser)
        React.findDOMNode(this.refs.button).disabled = false
        return router.transitionTo('account')
      }

      React.findDOMNode(this.refs.button).disabled = false
    }
  },

  render() {
    Stripe.setPublishableKey("pk_test_lRFVtD3iTz0LL58rsz3LiDb9")
    var showRegistration = this.state.usersStoreState.currentUser
      ?  null
      :  <Registration />

    var formToShow = showRegistration 
      ? showRegistration
      : ( <div>
            <div className="content_box-header">Donation</div>
            <form action="" method="POST" id="payment-form">
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
          </div>)


    return (
      <div className="register" >
        {formToShow}
      </div>
    )
  }
})