import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getInitialState(){
    return {
      organization: {}
    }
  },

  componentWillMount() {
    if(this.props.organization){
      this.setState({organization: this.props.organization})
    }
  },

  changeMade(){
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  saveBankData(){
    var organization = this.state.organization
    var firstName = React.findDOMNode(this.refs.firstName).value
    var lastName = React.findDOMNode(this.refs.lastName).value
    var dobMonth = React.findDOMNode(this.refs.dobMonth).value
    var dobDate = React.findDOMNode(this.refs.dobDate).value
    var dobYear = React.findDOMNode(this.refs.dobYear).value
    var accountNumber = React.findDOMNode(this.refs.accountNumber).value
    var routingNumber = React.findDOMNode(this.refs.routingNumber).value
    var tosChecked = React.findDOMNode(this.refs.tosCheck).checked ? 1 : 0
    console.log(tosChecked)
    var bankInfo = {
      firstName, 
      lastName,
      dobMonth,
      dobDate,
      dobYear,
      accountNumber,
      routingNumber,
      tosChecked
    }

    organization.bankInfo = bankInfo
    this.props.updateOrganization(organization)
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
  },

  render() {
    var firstName, lastName, dobYear, dobMonth, dobDate, accountNumber, routingNumber, tosChecked
    if(this.props.organization.bankInfo){
      firstName = this.props.organization.bankInfo.firstName
      lastName = this.props.organization.bankInfo.lastName
      dobYear = this.props.organization.bankInfo.dobYear
      dobMonth = this.props.organization.bankInfo.dobMonth
      dobDate = this.props.organization.bankInfo.dobDate
      accountNumber = this.props.organization.bankInfo.accountNumber
      routingNumber = this.props.organization.bankInfo.routingNumber
      tosChecked = this.props.organization.bankInfo.tosChecked
    }

    var yearOption = []
    var dayOption = []
    var thisYear = new Date().getFullYear()

    for (var i = thisYear; i > 1900 + 1; i--) {
      yearOption = yearOption.concat(
        <option value={i}>{i}</option>
        )
    }

    for (var i = 1; i < 32; i++) {
      dayOption = dayOption.concat(
        <option value={i}>{i}</option>
        )
    }

    return (
      <div>
        <div className="content_box-header">Bank Details</div>
        <div>
          First Name
          <input 
            type="text" 
            className="karma_input" 
            placeholder="First Name" 
            onChange={this.changeMade}
            ref="firstName" 
            defaultValue={firstName}
            disabled={this.props.editDisabled}/>
          Last Name
          <input 
            type="text" 
            onChange={this.changeMade}
            ref="lastName" 
            className="karma_input " 
            placeholder="Last Name" 
            defaultValue={lastName}
            disabled={this.props.editDisabled} />
          Date of Birth
          <div className="bank_data-dob">
            <select
              className="karma_select bank_data-dob_month"
              defaultValue={dobMonth}
              ref="dobMonth">
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select
              className="karma_select bank_data-dob_day"
              defaultValue={dobDate}
              ref="dobDate">
              {dayOption}
            </select>
            <select
              className="karma_select bank_data-dob_year"  
              defaultValue={dobYear}
              ref="dobYear">
              {yearOption}
            </select>
          </div>
          Bank Account No.
          <input 
            type="text" 
            onChange={this.changeMade}
            ref="accountNumber" 
            className="karma_input" 
            placeholder="Account No." 
            defaultValue={accountNumber}
            disabled={this.props.editDisabled} />
          Routing No.
          <input 
            type="text" 
            onChange={this.changeMade}
            ref="routingNumber" 
            className="karma_input" 
            placeholder="Routing No." 
            defaultValue={routingNumber}
            disabled={this.props.editDisabled} />

          <div className="terms_of_service">
            "I have read and agree to the terms and conditions listed here."
            <input 
              type="checkbox" 
              defaultChecked={tosChecked} 
              ref="tosCheck"/>
          </div>
          <button 
            onClick={this.saveBankData}
            ref="saveButton" 
            className="karma_button"  
            hidden={this.props.editDisabled}>
              Save
          </button>
        </div>
      </div>
    )
  }
})