import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    org: React.PropTypes.object.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  render() {
  injectTapEventPlugin()
    var user = this.props.user
    var navigationStatus = this.props.toggleState
      ? 'side_bar_navigation opened_navigation'
      : 'side_bar_navigation closed_navigation'

    var isFundraiser = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.userId === user.id)
    var fundraiserMemberLink = isFundraiser.length > 0
      ? (<li><Link to='member_fundraisers'>Fundraise</Link></li>)
      : null

    return (
      <div className={navigationStatus}>
        <ul className='side_bar_navigation_level1' onClick={this.props.toggleMenu}>
          <li><Link to='account'>Account</Link></li>
          <li><Link to='deals'>Deals</Link></li>
          {fundraiserMemberLink}
          <li><Link to='organizations'>Manage</Link>
            <ul className='side_bar_navigation_level2' onClick={this.props.toggleMenu}>
              <li><Link to='organization_user_manages' params={{organizationId: this.props.org.id}}>{this.props.org.name}</Link></li>
              <li><Link to='edit_profile' params={{organizationId: this.props.org.id}}>Profile</Link></li>
              <li><Link to='edit_fundraiser_team' params={{organizationId: this.props.org.id}}>Team</Link></li>
              <li><Link to='edit_fundraiser_bank' params={{organizationId: this.props.org.id}}>Bank</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
})