import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {Card, CardTitle, CardText, List, ListItem, TextField, SelectField, RaisedButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  getInitialState () {
    return {
      ccTypeIcon: null,
      ccNumberMessage: null,
      ccMessageColor: null,
      cvvRequiredLength: null,
      cvcNumberMessage: null,
      cvcMessageColor: null,
      ccNumber: null,
      cvvNumber: null,
      monthValue: null,
      yearValue: null,
      buttonDisabled: true
    }
  },

  propTypes: {
    createToken: React.PropTypes.func.isRequired
  },

  componentDidUpdate () {
    if (this.state.buttonDisabled) {
      this.enableButton()
    }
  },

  checkFormFields () {
    if (this.state.ccNumber && this.state.cvvNumber && this.state.monthValue && this.state.yearValue) {
      return true
    } else {
      return false
    }
  },

  didClick (e) {
    e.preventDefault()
    this.setState({buttonDisabled: true})

    if (this.checkFormFields) {
      var info = {
      cardNumber: this.state.ccNumber,
      cvc: this.state.cvvNumber,
      expirationMonth: this.state.monthValue,
      expirationYear: this.state.yearValue
    }
    this.setState({cvvNumber: null})

      this.props.createToken(info)
    }
  },

  checkCC (e) {
    if (isNaN(e.target.value) || !/\S/.test(e.target.value)) {
      this.setState({ccNumberMessage: 'Only Numbers Allowed', ccMessageColor: 'red'})
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      return
    } else {
      this.setState({ccNumberMessage: null, ccMessageColor: null})
    }
    // visa
    var re = new RegExp("^4")
    if (e.target.value.match(re) != null) {
      if (e.target.value.length > 16) {
        e.target.value = e.target.value.substring(0, 16)
      }
      var fullMatch = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
      if (e.target.value.match(fullMatch)) {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-visa'></i>,
          ccNumberMessage: 'Perfect!', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3,
          ccNumber: e.target.value
        })
        this.enableButton()
      } else {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-visa'></i>,
          ccNumberMessage: 'Keep going. 13 or 16 digits.', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3
        })
      }
    }
    // Mastercard
    re = new RegExp("^5[1-5]")
    if (e.target.value.match(re) != null) {
      if (e.target.value.length > 16) {
        e.target.value = e.target.value.substring(0, 16)
      }
      var fullMatch = /^(?:5[1-5][0-9]{14})$/
      if (e.target.value.match(fullMatch)) {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-mastercard'></i>,
          ccNumberMessage: 'Perfect!', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3,
          ccNumber: e.target.value
        })
        this.enableButton()
      } else {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-mastercard'></i>,
          ccNumberMessage: 'Keep going. 16 digits.', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3
        })
      }
    }
    // AMEX
    re = new RegExp("^3[47]")
    if (e.target.value.match(re) != null) {
      if (e.target.value.length > 15) {
        e.target.value = e.target.value.substring(0, 15)
      }
      var fullMatch = /^(?:3[47][0-9]{13})$/
      if (e.target.value.match(fullMatch)) {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-mastercard'></i>,
          ccNumberMessage: 'Perfect!', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 4,
          ccNumber: e.target.value
        })
        this.enableButton()
      } else {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-mastercard'></i>,
          ccNumberMessage: 'Keep going. 15 digits.', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 4
        })
      }
    }
    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)")
    if (e.target.value.match(re) != null) {
      if (e.target.value.length > 16) {
        e.target.value = e.target.value.substring(0, 16)
      }

      var fullMatch = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/
      if (e.target.value.match(fullMatch)) {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-discover'></i>,
          ccNumberMessage: 'Perfect!',
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3,
          ccNumber: e.target.value
        })
        this.enableButton()
      } else {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-discover'></i>,
          ccNumberMessage: 'Keep going. 16 digits.', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3
        })
      }
    }
    // JCB
    re = new RegExp("^2131|1800|35(2[89]|[3-8][0-9])")
    if (e.target.value.match(re) != null) {
      if (e.target.value.length > 16) {
        e.target.value = e.target.value.substring(0, 16)
      }
      var fullMatch = /^(?:(?:2131|1800|35\d{3})\d{11})$/
      if (e.target.value.match(fullMatch)) {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-mastercard'></i>,
          ccNumberMessage: 'Perfect!', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3,
          ccNumber: e.target.value
        })
        this.enableButton()
      } else {
        this.setState({
          ccTypeIcon: <i style={{margin: '0 10px 0 0'}} className='fa fa-2x fa-cc-mastercard'></i>,
          ccNumberMessage: 'Keep going. 15 or 16 digits.', 
          ccMessageColor: '#4CAF50',
          cvvRequiredLength: 3
        })
      }
    }
  },

  checkCVC (e) {
    if (isNaN(e.target.value) || !/\S/.test(e.target.value)) {
      this.setState({cvcNumberMessage: 'Only Numbers Allowed', cvcMessageColor: 'red'})
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
    } else {
      this.setState({cvcNumberMessage: null, cvcMessageColor: null})
    }
    if (e.target.value.length === this.state.cvvRequiredLength) {
      this.setState({cvcNumberMessage: 'Perfect!', cvcMessageColor: '#4CAF50', cvvNumber: e.target.value})
      this.enableButton()
    } else if (e.target.value.length < this.state.cvvRequiredLength) {
      this.setState({cvcNumberMessage: this.state.cvvRequiredLength + ' digits', cvcMessageColor: '#4CAF50'})
    } else {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({cvcNumberMessage: this.state.cvvRequiredLength + ' digits', cvcMessageColor: '#4CAF50'})
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

  enableButton () {
    if (this.checkFormFields()) {
      this.setState({buttonDisabled: false})
    }
  },

  changeMonth (e) {
    this.setState({monthValue: e.target.value})
    this.enableButton()
  },

  changeYear (e) {
    this.setState({yearValue: e.target.value})
    this.enableButton()
  },

  render() {
    injectTapEventPlugin()
    var ccIcon = this.state.ccTypeIcon
      ? this.state.ccTypeIcon
      : ( <div>
            <i style={{margin: '0 10px 0 0'}} className="fa fa-2x fa-cc-mastercard"></i>
            <i style={{margin: '0 10px 0 0'}} className="fa fa-2x fa-cc-visa"></i>
            <i style={{margin: '0 10px 0 0'}} className="fa fa-2x fa-cc-discover"></i>
            <i style={{margin: '0 10px 0 0'}} className="fa fa-2x fa-cc-amex"></i>
            <i style={{margin: '0 10px 0 0'}} className="fa fa-2x fa-cc-jcb"></i>
          </div>)

    var months = [
      {id:1, name:'January'},
      {id:2, name:'February'},
      {id:3, name:'March'},
      {id:4, name:'April'},
      {id:5, name:'May'},
      {id:6, name:'June'},
      {id:7, name:'July'},
      {id:8, name:'August'},
      {id:9, name:'September'},
      {id:10, name:'October'},
      {id:11, name:'November'},
      {id:12, name:'December'}
    ]

    var years = []

    var d = new Date()
    if (this.state.monthValue-1 < d.getMonth()) {
      var year = d.getFullYear() + 1
      for (var i = 0; i < 15; i++) {
        years.push({id:(year + i), name: (year + i)})
      }
    } else {
      var year = d.getFullYear()
      for (var i = 0; i < 15; i++) {
        years.push({id:(year + i), name: (year + i)})
      }
    }

    return (
      <div className='register' >
        <div>
            <CardTitle className='cardTitle'  title='Secure Donation'/>
            <hr/>
            <CardText className='cardText' >
              Thankyou for donating! This donation is for 1 year access to full list exclusive deals. What other text should I put here? 
            </CardText>
            <List>
              <ListItem  style={{borderBottom:'#515A5F solid 1px', fontSize:'24px'}} primaryText="Order" rightIcon={<div  style={{height:'0', top:'5px', width:'inherit', color:'#515A5F'}}>Price</div>} />
              <ListItem style={{borderBottom:'#515A5F solid 1px'}} primaryText="1 Full KarmaKard Access" rightIcon={<div style={{height:'0', top:'5px', width:'inherit', color:'#515A5F'}}>$30.00</div>} />
              <ListItem style={{fontSize:'24px'}} primaryText="Total:" rightIcon={<div style={{height:'0', width:'inherit', top:'5px', color:'#515A5F'}}>$30.00</div>} />
            </List>
            <CardTitle className='cardTitle'  title='Payment Information'/>
            <hr/>
            {ccIcon}
            <TextField
              onChange={this.checkCC}
              hintText="4242424242424242"
              errorText={this.state.ccNumberMessage}
              errorStyle={{color: this.state.ccMessageColor}}
              floatingLabelText="Card Number"
              fullWidth={true} />
            <TextField
              onChange={this.checkCVC}
              hintText= {this.state.cvvRequiredLength === 3 ? "123" : "1234"}
              errorText={this.state.cvcNumberMessage}
              errorStyle={{color: this.state.cvcMessageColor}}
              floatingLabelText="CVC Code"
              fullWidth={true} />
            <SelectField
              value={this.state.monthValue}
              hintText="Hint Text"
              onChange={this.changeMonth}
              floatingLabelText="Exp. Month"
              valueMember="id"
              displayMember="name"
              fullWidth={true}
              menuItems={months} />
             <SelectField
              value={this.state.yearValue}
              hintText="Exp. Year"
              floatingLabelText="Expiration Year"
              onChange={this.changeYear}
              valueMember="id"
              displayMember="name"
              fullWidth={true}
              menuItems={years} />
              <RaisedButton className='raisedButton' primary={true} 
                disabled={this.state.buttonDisabled}
                fullWidth={true} 
                onClick={this.didClick} 
                label="Donate" 
                style={{
                  margin: '15px 0 0 0'
                }}/>
          </div>
      </div>
    )
  }
})