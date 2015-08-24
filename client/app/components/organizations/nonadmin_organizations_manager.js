import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired
  },

  renderOrganizationLink (organization, i) {
    return (
        <Link to='organization_user_manages' params={{organizationId: organization.id}}>
          <li className='list-item' key={i}>
            {organization.name}
          </li>
        </Link>
    )
  },

  render () {
    var user = this.props.user
    var fundraisers, businesses

    var businessLinks = this.props.organizations
      .filter(org => org.userId === user.id && org.type === 'business')
      .map(this.renderOrganizationLink)

    businesses = businessLinks.length > 0
      ? (<div>
          <ul>
            <li className='list-header'>Business</li>
            {businessLinks}
          </ul>
        </div>)
      : null

    var fundraiserLinks = this.props.organizations
      .filter(org => org.userId === user.id && org.type === 'fundraiser')
      .map(this.renderOrganizationLink)

    fundraisers = fundraiserLinks.length > 0
      ? (<div>
          <ul>
            <li className='list-header'>Fundraiser</li>
            {fundraiserLinks}
          </ul>
        </div>)
      : null

    return (
      <div>
        <div className='content_box-header'>
           Your Organizations
        </div>
        {businesses}
        {fundraisers}
        <div>
          <hr />
          <Link to='create_organization' className='create_organization-link'>
            <span className='karma_button'>Add New Organization</span>
          </Link>
        </div>
      </div>
    )
  }
})
