import React from 'react'
import { flux } from '../../../main'
import {RouteHandler, Link} from 'react-router'

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    locations: React.PropTypes.array.isRequired,
    redemptions: React.PropTypes.array.isRequired,
    surveyQuestions: React.PropTypes.array.isRequired,
    surveyResponses: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  updateOrganization (organization) {
    flux.actions.organizations.updateOrganization(organization)
  },

  render () {
    var orgId = this.context.router.getCurrentParams().organizationId
    var organization = this.props.organizations.filter(org => org.id === orgId)[0]
    var deals = this.props.deals.filter(deals => deals.organizationId === orgId)
    var locations = this.props.locations.filter(locations => locations.organizationId === orgId)
    var redemptions = this.props.redemptions.filter(redemptions => redemptions.organizationId === orgId)
    var surveyResponses = this.props.surveyResponses.filter(response => response.organizationId === orgId)
    var surveyQuestions = this.props.surveyQuestions
    
    return (
      <div>
        <RouteHandler
          organization={organization}
          organizations={this.props.organizations}
          user={this.props.user}
          deals={deals}
          locations={locations}
          redemptions={redemptions}
          updateOrganization={this.updateOrganization}
          surveyResponses={surveyResponses}
          surveyQuestions={surveyQuestions} />
      </div>
    )
  }
})
