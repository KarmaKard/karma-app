import React from 'react'
import { Link } from 'react-router'
import { flux } from './../../main'

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    updateOrganization: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    payments: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      organization: {}
    }
  },

  componentWillMount () {
    if (this.props.organization) {
      this.setState({organization: this.props.organization})
    }
  },

  submitToReview () {
    var organization = this.state.organization
    organization.status = 'pending'
    this.props.updateOrganization(organization)
  },

  rejectOrganization () {
    var organization = this.state.organization
    organization.status = 'inactive'

    this.props.updateOrganization(organization)
  },

  confirmOrganization () {
    var organization = this.props.organization
    organization.status = 'active'
    var fundraiserMembers = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.organizationId === organization.id)
    flux.actions.organizations.confirmFundraiser(organization, fundraiserMembers)
  },

  checkBankInfo () {
    if (!this.props.organization.bankInfo) {
      return (
        <li>
          <Link to='edit_fundraiser_bank' params={{organizationId: this.props.organization.id}}>
            Complete bank information
          </Link>
        </li>
      )
    }
    for (var field in this.props.organization.bankInfo) {
      if (this.props.organization.bankInfo[field] == null) {
        return (
          <li>
            <Link to='edit_fundraiser_bank' params={{organizationId: this.props.organization.id}}>
              Complete Bank Information
            </Link>
          </li>
        )
      }
    }
  },

  render () {
    var organization = this.props.organization
    var payments = this.props.payments.filter(payment => payment.fundraiserId === organization.id)
    var addTeamMembers, organizationDescription, organizationPurpose, organizationBankInfo, submitButton
    var message = 'You have some task(s) remaining before your business can be reviewed:'
    var fundraiserMembers = this.props.fundraiserMembers.find(fundraiserMember => fundraiserMember.organizationId === organization.id)

    if (!fundraiserMembers || fundraiserMembers.length === 0) {
      addTeamMembers = (
        <li>
          <Link to='edit_fundraiser_team' params={{organizationId: organization.id}}>
            Add team member(s)
          </Link>
        </li>
      )
    }
    if (!organization.description) {
      organizationDescription = (
        <li>
          <Link to='edit_profile' params={{organizationId: organization.id}}>
            Add profile description
          </Link>
        </li>
      )
    }
    if (!organization.purpose) {
      organizationPurpose = (
        <li>
          <Link to='edit_profile' params={{organizationId: organization.id}}>
            Add profile purpose
          </Link>
        </li>
      )
    }

    organizationBankInfo = this.checkBankInfo()

    if (!organizationDescription && !organizationPurpose && !addTeamMembers) {
      message = 'All required information has been completed. Please thoroughly review your information before you submit this business to be reviewed.'
      submitButton = <button onClick={this.submitToReview} className='karma_button'>Submit for Review</button>
    }

    if (organization.status === 'pending' && this.props.user.roles.superadmin) {
      message = 'Please Review this organization and Click the button to authorize their deals on our app.'
      submitButton = (
        <div>
          <button onClick={this.confirmOrganization} className='karma_button'>Confirm This Fundraiser</button>
          <button onClick={this.rejectOrganization} className='karma_button'>Reject This Fundraiser</button>
        </div>
      )
    } else if (organization.status === 'pending') {
      message = 'Your Organization is now being reviewed. Do not change any of the information you have already submitted.'
      submitButton = null
    }

    if (organization.status === 'active') {

      var cardAmount = 0
      var totalFundraised = 0
      var cashFundraised = 0
      var squareFundraised = 0
      var onlineFundraised = 0

      payments.forEach(payment => {
        cardAmount += payment.cardAmount
        totalFundraised += payment.amount
        switch (payment.paymentType) {
          case 'cash':
              cashFundraised += payment.amount
              break
          case 'square':
              squareFundraised += payment.amount
              break
          case 'stripe':
              onlineFundraised += payment.amount
              break
          default:
        }
      })

      message = (<div>
                  <h2>Status: Active</h2>
                  <h2>Cards Sold: {cardAmount}</h2>
                  <h2>Total Fundraised: {'$' + (totalFundraised / 100)}</h2>
                  <h2>Cash Fundraised: {'$' + (cashFundraised / 100)}</h2>
                  <h2>Square Fundraised: {'$' + (squareFundraised / 100)}</h2>
                  <h2>Online Fundraised: {'$' + (onlineFundraised / 100)}</h2>
                  <h2>KarmaKard Balance:</h2>
                </div>)

      submitButton = null
    }

    return (
      <div>
        <div className='content_box-header'>
          Dashboard
        </div>
        <p>
          {message}
        </p>
        <ul className='toDoList'>
          {addTeamMembers}
          {organizationDescription}
          {organizationPurpose}
          {organizationBankInfo}
        </ul>
        {submitButton}
      </div>
    )
  }
})
