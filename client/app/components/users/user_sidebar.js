import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  renderOrganizationLink (organization, i) {
    return (
        <Link to='organization_user_manages' params={{organizationId: organization.id}}>
          <li key={i}>
            {organization.name}
          </li>
        </Link>
    )
  },

  render () {

    var user = this.props.user

    var organizationLinks = this.props.organizations
      .filter(org => org.userId === user.id)
      .map(this.renderOrganizationLink)

    var manageLink = user.roles.manager || user.roles.superadmin
      ? (<li><Link to='organizations'>Manage</Link>
          <ul className='side_bar_navigation_level2' onClick={this.props.toggleMenu}>
            {organizationLinks}
          </ul>
        </li>)
      : null

    var isFundraiser = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.userId === user.id)
    var fundraiserMemberLink = isFundraiser.length > 0
      ? (<li><Link to='member_fundraisers'>Fundraise</Link></li>)
      : null

    var navigationStatus = this.props.toggleState
      ? 'side_bar_navigation opened_navigation'
      : 'side_bar_navigation closed_navigation'

    return (
     <div className={navigationStatus} >
        <ul className='side_bar_navigation_level1' onClick={this.props.toggleMenu}>
          <Link to='account'><li>Account</li></Link>
          <Link to='deals'><li>Deals</li></Link>
          {fundraiserMemberLink}
          {manageLink}
        </ul>
      </div>
    )
  }
})
