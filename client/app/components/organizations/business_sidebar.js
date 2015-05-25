import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  render() {
    return (
      <div className="side_bar_navigation">
        <ul className="side_bar_navigation_level1">
          <li><Link to="edit_profile" params={{organizationId: this.props.orgId}}>Profile</Link></li>
          <li><Link to="edit_locations" params={{organizationId: this.props.orgId}}>Locations</Link></li>
          <li><Link to="edit_keywords" params={{organizationId: this.props.orgId}}>Keywords</Link></li>
          <li><Link to="edit_deals" params={{organizationId: this.props.orgId}}>Deals</Link></li>
        </ul>
      </div>
    )
  }
})
