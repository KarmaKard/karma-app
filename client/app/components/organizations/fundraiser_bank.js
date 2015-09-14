import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'

import {AppBar, FlatButton, Checkbox, DatePicker, Card, CardHeader, SelectField, CardTitle, TextField, RaisedButton, Slider} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState(){
    return {
      organization: {},
      accountNumberErrorMessage: null,
      routingNumberErrorMessage: null,
      routingNumberErrorColor: 'red',
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

  componentWillMount() {
    if(this.props.organization.bankInfo){
      this.setState({
        organization: this.props.organization,
        firstName: this.props.organization.bankInfo.firstName,
        lastName: this.props.organization.bankInfo.lastName,
        birthDate: this.props.organization.bankInfo.birthDate,
        accountNumber: this.props.organization.bankInfo.accountNumber,
        routingNumber: this.props.organization.bankInfo.routingNumber,
        tosChecked: this.props.organization.bankInfo.tosChecked,
        buttonDisabled: true
      })
    }
  },

  firstNameChange(e){
    this.setState({firstName: e.target.value, buttonDisabled: false})
  },

  lastNameChange(e){
    this.setState({lastName: e.target.value, buttonDisabled: false})
  },

  dateChanged (nill, date) {
    this.setState({birthDate:date})
  },

  accountNumberChange(e){
    if (isNaN(e.target.value) || !/^(?:\d*)$/.test(e.target.value)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({accountNumberErrorMessage: 'Must be a whole number digit', routingNumberErrorColor: 'red'})
      return
    }
    this.setState({accountNumber: e.target.value, buttonDisabled: false, accountNumberErrorMessage: null})
  },

  routingNumberChange(e){
    if (isNaN(e.target.value) || !/^(?:\d*)$/.test(e.target.value) || e.target.value.length > 9) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({routingNumberErrorMessage: 'Must be 9 whole number digits'})
      return
    }
    var routingCheck = this.validateABA(e.target.value)
    if (!routingCheck.isValid) {
      this.setState({routingNumberErrorMessage: routingCheck.errorMsg})
      return
    } 
    this.setState({routingNumber: e.target.value,buttonDisabled: false, routingNumberErrorMessage: 'Perfect!', routingNumberErrorColor: 'green'})
  },

  tosCheckedChange(e){
    if(e.target.value) {
      this.setState({tosChecked: true, buttonDisabled: false})
      return
    } else {
      this.setState({tosChecked: false, buttonDisabled: false})
    }
    
  },

  validateABA(n) {
     
    n = n ? n.match(/\d/g).join('') : 0;//get just digits
    var c = 0, isValid = false;

    if (n && n.length == 9){//don't waste energy totalling if its not 9 digits
    for (var i = 0; i < n.length; i += 3) {//total the sums
     c += parseInt(n.charAt(i), 10) * 3 +  parseInt(n.charAt(i + 1), 10) * 7 +  parseInt(n.charAt(i + 2), 10);
    }
    isValid = c != 0 && c % 10 == 0;//check if multiple of 10
    }
    if (n.length < 9) {
      this.setState({routingNumberErrorColor: 'green'})
    } else {
      this.setState({routingNumberErrorColor: 'red'})
    }
    return {//return an object telling whether its valid and if not, why.
    isValid: isValid,
    errorMsg: n.length < 9 ? (9-n.length) + " Digits Lefts" : (!isValid ? 'Invalid bank routing number.' : '')//determine the error message
    };
  },

  saveBankData(){
    var organization = this.props.organization
    var firstName = this.state.firstName ? this.state.firstName : this.props.organization.bankInfo.firstName
    var lastName = this.state.lastName ? this.state.lastName : this.props.organization.bankInfo.lastName
    var birthDate = this.state.birthDate ? this.state.birthDate : this.props.organization.bankInfo.birthDate
    var accountNumber = this.state.accountNumber ? this.state.accountNumber : this.props.organization.bankInfo.accountNumber
    var routingNumber = this.state.routingNumber ? this.state.routingNumber : this.props.organization.bankInfo.routingNumber
    var tosChecked = this.state.tosChecked 
    var bankInfo = {
      firstName, 
      lastName,
      birthDate,
      accountNumber,
      routingNumber,
      tosChecked
    }
    organization.bankInfo = bankInfo
    this.props.updateOrganization(organization)
    this.setState({buttonDisabled: true})
  },

  render() {
    
  
    var firstName, lastName,birthDate, accountNumber, tosChecked, routingNumber
    if (this.props.organization.bankInfo){
      firstName = this.state.firstName ? this.state.firstName : this.props.organization.bankInfo.firstName
      lastName = this.state.lastName ? this.state.lastName : this.props.organization.bankInfo.lastName
      birthDate = this.state.birthDate ? this.state.birthDate : this.props.organization.bankInfo.birthDate
      accountNumber = this.state.accountNumber ? this.state.accountNumber : this.props.organization.bankInfo.accountNumber
      routingNumber = this.state.routingNumber ? this.state.routingNumber : this.props.organization.bankInfo.routingNumber
      tosChecked = this.state.tosChecked ? this.state.tosChecked : this.props.organization.bankInfo.tosChecked
    }

    var today = new Date()
    var maxDate = new Date(today - 568024668000) //18 years ago
    var setDate = birthDate ? new Date(birthDate) : maxDate
    return (
      <div>
        <TextField
          hintText="First Name"
          floatingLabelText="First Name"
          fullWidth={true}
          onChange={this.firstNameChange} 
          defaultValue={this.state.firstName}
          disabled={this.props.editDisabled}/>

        <TextField
          hintText="Last Name"
          floatingLabelText="Last Name"
          fullWidth={true}
          onChange={this.lastNameChange} 
          defaultValue={this.state.lastName}
          disabled={this.props.editDisabled}/>

        <DatePicker
          hintText="Ranged Date Picker"
          floatingLabelText="Birth Date"
          autoOk={this.state.autoOk}
          maxDate={maxDate}
          defaultDate={setDate}
          onChange={this.dateChanged}
          fullWidth={true}
          showYearSelector={true} />

        <TextField
          hintText="0000000000"
          floatingLabelText="Bank Account Number"
          fullWidth={true}
          onChange={this.accountNumberChange} 
          defaultValue={this.state.accountNumber}
          disabled={this.props.editDisabled}
          errorText={this.state.accountNumberErrorMessage}/>
         
        <TextField
          hintText="000000000"
          floatingLabelText="Routing Number"
          fullWidth={true}
          onChange={this.routingNumberChange} 
          defaultValue={this.state.routingNumber}
          disabled={this.props.editDisabled}
          errorText={this.state.routingNumberErrorMessage}
          errorStyle={{color:this.state.routingNumberErrorColor}}/>
          <Checkbox
            name="tosChecked"
            value={this.state.tosChecked}
            label="I have read and agree to the terms and conditions listed here."
            defaultChecked={this.state.tosChecked}
            onCheck={this.tosCheckedChange}/>

          <RaisedButton className='raisedButton' primary={true} 
                disabled={this.state.buttonDisabled}
                fullWidth={true} 
                onClick={this.saveBankData} 
                label="Save" 
                style={{
                  margin: '15px 0 0 0'
                }}/>

      </div>
    )
  }
})