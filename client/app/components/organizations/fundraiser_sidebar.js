import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
  
    return (
      <div className="side_bar_navigation">
        <ul className="side_bar_navigation_level1">
          <li><Link to="edit_profile" params={{organizationId: this.props.orgId}}>Profile</Link></li>
          <li><Link to="edit_fundraiser_team" params={{organizationId: this.props.orgId}}>Team</Link></li>
          <li><Link to="edit_fundraiser_bank" params={{organizationId: this.props.orgId}}>Bank</Link></li>
        </ul>
      </div>
    )
  }
})