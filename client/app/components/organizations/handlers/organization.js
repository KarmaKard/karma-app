import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
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

  render() {
  injectTapEventPlugin()
    var orgId = this.context.router.getCurrentParams().organizationId
    var deals = this.props.deals.filter(deals => deals.organizationId === orgId)
    var organization = this.props.organizations.filter(org => org.id === orgId)[0]
    var fundraiserMember = this.props.fundraiserMembers.filter(fundraiserMembership => fundraiserMembership.organizationId === orgId && fundraiserMembership.userId === this.props.user.id)[0]
    var redemptions = this.props.redemptions.filter(redemptions => redemptions.organizationId === orgId)
    var surveyResponses = this.props.surveyResponses.filter(response => response.organizationId === orgId)
    var surveyQuestions = this.props.surveyQuestions
    var payments = this.props.payments
    return (
      <div>
        <RouteHandler
          {... this.props}
          organization={organization}
          deals={deals}
          payments={payments}
          redemptions={redemptions}
          updateOrganization={this.updateOrganization}
          surveyResponses={surveyResponses}
          surveyQuestions={surveyQuestions}
          fundraiserMember={fundraiserMember}/>
      </div>
    )
  }
})
