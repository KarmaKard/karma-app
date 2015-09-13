import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'

import {AppCanvas, AppBar, SelectField, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    setAmount: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      cardAmount: 2,
      donationAmount: 30,
      donationAmountMessage: null,
      disabledButton: false
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


  setCardAmount (e) {
    this.setState({
      cardAmount: e.target.value, donationAmount: (e.target.value - 1) * 30
    })
  },

  setDonationAmount (e) {
    if (isNaN(e.target.value) || !/^(?:\d*)$/.test(e.target.value)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({valueErrorMessage: 'Must be a whole number digit'})
      return
    }

    if (e.target.value < 30 * (this.state.cardAmount - 1)) {
      this.setState({
        donationAmount: e.target.value, 
        donationAmountMessage: 'Must be more than $' + (this.state.cardAmount - 1) * 30,
        disabledButton: true
      })
      return
    }

    this.setState({
      donationAmount: e.target.value,
      donationAmountMessage: null,
      disabledButton: false
    })
  },

  setAmount () {
    var cardAmount = this.state.cardAmount - 1
    var donationAmount = this.state.donationAmount

    var amount = {
      cardAmount: cardAmount,
      donationAmount: donationAmount
    }
    this.props.setAmount(amount)
  },


  render() {
  injectTapEventPlugin()
    
  
    var cardAmount = this.state.cardAmount ? this.state.cardAmount : 1
    var amounts = [
      {value: 1 , text: '0'},
      {value: 2 , text: '1'},
      {value: 3 , text: '2'},
      {value: 4 , text: '3'},
      {value: 5 , text: '4'},
      {value: 6 , text: '5'},
      {value: 7 , text: '6'},
      {value: 8 , text: '7'},
      {value: 9 , text: '8'},
      {value: 10, text: '9'},
      {value: 11, text: '10'},
      {value: 'unlimited', text: 'unlimited'}
    ]
    return (
      <div>
        <CardTitle title='Donation Amount' />
        <SelectField
          expandable={true}
          value={cardAmount}
          hintText="How many cards would the donor like?"
          onChange={this.setCardAmount}
          floatingLabelText="Amount of Cards"
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={amounts} />
        <TextField
          hintText="Hint Text"
          value={this.state.donationAmount}
          onChange={this.setDonationAmount}
          fullWidth={true}
          errorText={this.state.donationAmountMessage}
          floatingLabelText="Donation Amount ($)" />
          <RaisedButton 
            style={{margin: '15px 0'}} 
            label="Next" 
            fullWidth={true} 
            value='Next' 
            onClick={this.setAmount} 
            disabled={this.state.disabledButton}/>

      </div>
    )
  }
})
