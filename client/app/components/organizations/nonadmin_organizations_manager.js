import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({
    renderOrganizationLink (organization, i) {
    return (
      <li key={i}>
        <Link to="organization_user_manages" params={{organizationId: organization.id}}>
          {organization.name}
        </Link>
      </li>
    )
  },

  render () {
    var user = this.props.user
    var fundraiserHeader, businessHeader

    var businessLinks = this.props.organizations
      .filter(org => org.userId === user.id && org.type === "business")
      .map(this.renderOrganizationLink)

    businessHeader = businessLinks.length > 0
      ? "Business"
      : null

    var fundraiserLinks = this.props.organizations
      .filter(org => org.userId === user.id && org.type === "fundraiser")
      .map(this.renderOrganizationLink)

    fundraiserHeader = fundraiserLinks.length > 0
      ? "Fundraiser"
      : null

    return (
      <div>
        <div className="content_box-header">
           Your Organizations
        </div>

        <h2>{businessHeader}</h2>
        <ul>
          {businessLinks}
        </ul>
        <h2>{fundraiserHeader}</h2>
        <ul>
          {fundraiserLinks}
        </ul>
        <div>
          <hr />
          <Link to="new_organization" className="create_organization-link">
            <span className="create_organization-link_span">Add New Organization</span>
          </Link>
        </div>
      </div>
    )
  }
})
