import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    memberFundraisers: React.PropTypes.array.isRequired
  },

  renderOrganizationLink (organization, i) {
    return (
        <Link to='member_fundraiser' params={{organizationId: organization.id}}>
          <li className='list-item' key={i}>
            {organization.name}
          </li>
        </Link>
    )
  },

  render () {
    var fundraiserLinks = this.props.memberFundraisers
      .map(this.renderOrganizationLink)

    return (
      <div>
        <div className='content_box-header'>
           Your Organizations
        </div>
        <div>
          <ul>
            <li className='list-header'>Fundraiser</li>
            {fundraiserLinks}
          </ul>
        </div>
      </div>
    )
  }
})
