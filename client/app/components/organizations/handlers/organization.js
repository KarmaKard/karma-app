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
        <div className="page_header">
          <div className="page_header_title">
            <Link to="organization_user_manages" params={{organizationId: organization.id}}>
              {organization.name}
            </Link>
          </div>
          <div className="page_header_link">
            <Link to="account">
              {this.props.user.firstName}
            </Link>
          </div>
        </div>
        <RouteHandler organization={organization} user={this.props.user} deals={deals} locations={locations} updateOrganization={this.updateOrganization} />
      </div>
    )
  }
})
