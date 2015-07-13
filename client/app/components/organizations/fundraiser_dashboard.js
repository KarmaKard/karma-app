import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    updateOrganization: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
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
    var organization = this.state.organization
    organization.status = 'active'

    this.props.updateOrganization(organization)
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
    var addTeamMembers, organizationDescription, organizationPurpose, organizationBankInfo, submitButton
    var message = 'You have some task(s) remaining before your business can be reviewed:'
    if (!organization.teamMembers || organization.teamMembers.length === 0) {
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
          <button onClick={this.confirmOrganization} className='karma_button'>Confirm This Business</button>
          <button onClick={this.rejectOrganization} className='karma_button'>Reject This Business</button>
        </div>
      )
    } else if (organization.status === 'pending') {
      message = 'Your Organization is now being reviewed. Do not change any of the information you have already submitted.'
      submitButton = null
    }

    if (organization.status === 'active') {
      message = 'Your Organization is now active! Any changes you make to your information will require another review.'
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