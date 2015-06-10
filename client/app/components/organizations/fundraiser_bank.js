import React from 'react'
import {flux} from '../../main'

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
    var eligibleYear = new Date().getFullYear() - 18

    for (var i = eligibleYear; i > 1900 + 1; i--) {
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
        <div className="content_box-header">Bank Information</div>
        This is Bank stuff!
      </div>
    )
  }
})