import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  renderOrganizationLink (organization, i) {
    return (
      <li className="organization_list-item" key={i}>
        <Link to="organization" params={{organizationId: organization.id}}>
          {organization.name}
        </Link>
      </li>
    )
  },

  render () {
    var category = this.context.router.getCurrentParams().category
    var organizationLinks = this.props.organizations
      .filter(org => org.category === category)
      .map(this.renderOrganizationLink)

    return (
      <div>
        <h1>{category + " "} Businesses </h1>
        <div className="content_box">
        <h2>{category + " "} Businesses </h2>
          <ul>
            {organizationLinks}
          </ul>
        </div>
      </div>
    )
  }
})


