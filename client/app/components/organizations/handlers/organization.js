import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  updateOrganization(organization) {
    flux.actions.organizations.updateOrganization(organization)
  },

  render() {
    var orgId = this.context.router.getCurrentParams().organizationId
    var organization = this.props.organizations.filter(org => org.id === orgId)[0]
    var deals = this.props.deals.filter(deals => deals.organizationId === orgId)
    var locations = this.props.locations.filter(locations => locations.organizationId === orgId)
    if (!organization) {
      return <p>Organization Not Found</p>
    }
    return (
      <div>
        <RouteHandler organization={organization} organizations={this.props.organizations} user={this.props.user} deals={deals} locations={locations} updateOrganization={this.updateOrganization} />
      </div>
    )
  }
})
