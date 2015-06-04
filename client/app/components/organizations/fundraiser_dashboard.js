import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({
  getInitialState() {
    return {
      organization: {}
    }
  },

  componentWillMount() {
    if(this.props.organization){
      this.setState({organization: this.props.organization})
    }
  },

  submitToReview(){
    var organization = this.state.organization
    organization.status = "pending"
    this.props.updateOrganization(organization)
  },

  confirmOrganization(){
    var organization = this.state.organization
    organization.status = "active"

    this.props.updateOrganization(organization)
  },

  render() {

    var addTeamMembers, organizationDescription, organizationPurpose, submitButton
    var message = "You have some task(s) remaining before your business can be reviewed:"
    if(!this.props.organization.teamMembers || this.props.organization.teamMembers.length === 0){
      addTeamMembers = 
        <li>
          <Link to="edit_fundraiser_team" params={{organizationId: this.props.organization.id}}>
            Add team member(s)
          </Link>
        </li>
    }
    if(!this.props.organization.description){
      organizationDescription = 
        <li>
          <Link to="edit_profile" params={{organizationId: this.props.organization.id}}>
            Add profile description
          </Link>
        </li>
    }
    if(!this.props.organization.purpose){
      organizationPurpose = 
        <li>
          <Link to="edit_profile" params={{organizationId: this.props.organization.id}}>
            Add profile purpose
          </Link>
        </li>
    }

    if(!organizationDescription && !organizationPurpose && !addTeamMembers){
      message = "All required information has been completed. Please thoroughly review your information before you submit this business to be reviewed."
      submitButton = <button onClick={this.submitToReview} className="karma_button">Submit for Review</button>
    }

    if(this.props.organization.status === "pending" && this.props.user.role === "superadmin"){
      message = "Please Review this organization and Click the button to authorize their deals on our app."
      submitButton = <button onClick={this.confirmOrganization} className="karma_button">Confirm This Business</button>
    }
    else if(this.props.organization.status === "pending"){
      message = "Your Organization is now being reviewed. Do not change any of the information you have already submitted."
      submitButton = null
    }

    if(this.props.organization.status === "active"){
      message = "Your Organization is now active! Any changes you make to your information will require another review."
      submitButton = null
    }

    return (
      <div>
        <div className="content_box-header">
          Dashboard
        </div>
        <p>
          {message}
        </p>
        <ul className="toDoList">
          {addTeamMembers}
          {organizationDescription}
          {organizationPurpose}
        </ul>
        {submitButton}
      </div>
    )
  }
})