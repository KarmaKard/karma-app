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
  render() {
    var user = this.props.user

    var inactiveLinks = this.props.organizations
    .filter(org => org.status === "inactive")
    .map(this.renderOrganizationLink)

    var reviewLinks = this.props.organizations
      .filter(org => org.status === "pending")
      .map(this.renderOrganizationLink)

    var activeLinks = this.props.organizations
      .filter(org => org.status === "active")
      .map(this.renderOrganizationLink)

    return(
      <div>
          <div className="content_box-header">
            Organizations By Status
          </div>

          <h2>Inactive</h2>
          <ul>
            {inactiveLinks}
          </ul>
          <h2>Review</h2>
          <ul>
            {reviewLinks}
          </ul>
          <h2>Active</h2>
          <ul>
            {activeLinks}
          </ul>
      </div>
    )
  }
})
