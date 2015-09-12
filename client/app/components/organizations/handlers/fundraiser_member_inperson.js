import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import PaymentType from '../fundraiser_member_inperson_type'
import Amount from '../fundraiser_member_inperson_amount'
import Email from '../fundraiser_member_inperson_email'
import Success from '../fundraiser_member_inperson_success'

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    fundraiserMember: React.PropTypes.object.isRequired,
    showBackLink: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      step: 0,
      paymentType: null,
      amount: {},
      email: null
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  setPaymentType (paymentType) {
    this.setState(
      {
        paymentType: paymentType,
        step: this.state.step + 1
      }
    )

  },

  setAmount (amount) {
    this.setState(
      {
        amount: amount,
        step: this.state.step + 1
      }
    )
  },

  setEmail (email) {
    console.log(email, this.state.amount, this.state.paymentType)

    if (email && this.state.amount && this.state.paymentType) {
      var donation = {
        email: email,
        amount: this.state.amount,
        paymentType: this.state.paymentType
      }
      console.log('are we here?')
      flux.actions.users.createInPersonDonation(donation, this.props.fundraiserMember)
      this.setState(
      { email: null, 
        step: this.state.step + 1,
        amount: 0,
        paymentType: null
      })
    }
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  componentWillMount () {
    this.props.showBackLink(true)
  },

  getInPersonComponent () {
    switch (this.state.step) {
      case 0:
        return (<PaymentType
                setPaymentType={this.setPaymentType}/>)
      case 1:
        return (<Amount
                setAmount={this.setAmount}/>)
      case 2:
        return (<Email
                setEmail={this.setEmail}/>)
      case 3:
        return (<Success
                organization={this.props.organization}/>)
    }
  },

  render() {
  injectTapEventPlugin()
    return (this.getInPersonComponent())
  }
})
