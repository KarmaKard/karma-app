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

     var createdLinks = this.props.organizations
    .filter(org => org.status === "created")
    .map(this.renderOrganizationLink)

    var reviewLinks = this.props.organizations
      .filter(org => org.status === "review")
      .map(this.renderOrganizationLink)

    return(
      <div>
          <div className="content_box-header">
             Your Organizations
          </div>

          <h2>Created</h2>
          <ul>
            {createdLinks}
          </ul>
          <h2>In Review</h2>
          <ul>
            {reviewLinks}
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
