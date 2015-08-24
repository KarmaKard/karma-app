import React from 'react'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    locations: React.PropTypes.array.isRequired,
    redemptions: React.PropTypes.array.isRequired,
    surveyQuestions: React.PropTypes.array.isRequired,
    surveyResponses: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    showBackLink: React.PropTypes.func.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    fundraiserMember: React.PropTypes.array.isRequired,
    payments: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  updateOrganization (organization) {
    flux.actions.organizations.updateOrganization(organization)
  },

  render () {
    var orgId = this.context.router.getCurrentParams().organizationId
    var deals = this.props.deals.filter(deals => deals.organizationId === orgId)
    var organization = this.props.organizations.filter(org => org.id === orgId)[0]
    var fundraiserMember = this.props.fundraiserMembers.filter(fundraiserMembership => fundraiserMembership.organizationId === orgId && fundraiserMembership.userId === this.props.user.id)[0]
    var locations = this.props.locations.filter(locations => locations.organizationId === orgId)
    var redemptions = this.props.redemptions.filter(redemptions => redemptions.organizationId === orgId)
    var surveyResponses = this.props.surveyResponses.filter(response => response.organizationId === orgId)
    var surveyQuestions = this.props.surveyQuestions
    var payments = this.props.payments
    return (
      <div>
        <RouteHandler
          organization={organization}
          organizations={this.props.organizations}
          user={this.props.user}
          deals={deals}
          payments={payments}
          locations={locations}
          redemptions={redemptions}
          updateOrganization={this.updateOrganization}
          surveyResponses={surveyResponses}
          surveyQuestions={surveyQuestions}
          fundraiserMember={fundraiserMember}
          fundraiserMembers={this.props.fundraiserMembers}
          showBackLink={this.props.showBackLink}
          toggleState={this.props.toggleState}
          toggleMenu={this.props.toggleMenu}/>
      </div>
    )
  }
})
