import React from 'react'
import { flux } from '../../../main'
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

    if (businessLinks.length > 0) {
      businessHeader = "Business"
    }

    var fundraiserLinks = this.props.organizations
      .filter(org => org.userId === user.id && org.type === "fundraiser")
      .map(this.renderOrganizationLink)

    if (fundraiserLinks.length > 0) {
      fundraiserHeader = "Fundraiser"
    }

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{user.first_name}</div>
          <div className="page_header_link">
            <Link to="root">
              Log Out
            </Link>
          </div>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li><Link to="account">Account</Link></li>
            <li><Link to="categories">Deals</Link></li>
            <li><Link to="organizations_user_manages">Manage</Link></li>
          </ul>
        </div>
        <div className="content_box">
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
      </div>
    )
  }
})
