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
    var userId = this.props.user.id
    var organizationLinks = this.props.organizations
      .filter(org => org.userId === userId)
      .map(this.renderOrganizationLink)

    return (
      <div>
        <h1>Organizations You Manage</h1>
        <div className="content_box">
          <ul>
            {organizationLinks}
          </ul>
        </div>
      </div>
    )
  }
})
