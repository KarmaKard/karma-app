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

    if (!organization) {
      return <p>Organization Not Found</p>
    }
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">
            <Link to="organization" params={{organizationId: organization.id}}>
              {organization.name}
            </Link>
          </div>
          <div className="page_header_link">
            <Link to="account">
              {this.props.user.firstName}
            </Link>
          </div>
        </div>
        <RouteHandler organization={organization} user={this.props.user} updateOrganization={this.updateOrganization}/>
      </div>
    )
  }
})
