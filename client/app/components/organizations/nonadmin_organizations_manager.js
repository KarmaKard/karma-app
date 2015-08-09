import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({
    renderOrganizationLink (organization, i) {
    return (
        <Link to="organization_user_manages" params={{organizationId: organization.id}}>
          <li className='list-item' key={i}>
            {organization.name}
          </li>
        </Link>
      
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
        <div>
          <ul>
            <li className='list-header'>Business</li>
            {businessLinks}
          </ul>
        </div>
        <div>
          <ul>
            <li className='list-header'>Fundraiser</li>
            {fundraiserLinks}
          </ul>
        </div>
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