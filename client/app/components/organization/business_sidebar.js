import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  navClicked() {

  },
  render() {
    return (
      <div className="side_bar_navigation">
        <ul className="side_bar_navigation_level1">
          <li><Link to="organization_analytics" params={{organizationId: this.props.orgId}}>Data</Link></li>
          <li><Link to="organization_profile" params={{organizationId: this.props.orgId}}>Profile</Link></li>
          <li><Link to="organization_locations" params={{organizationId: this.props.orgId}}>Locations</Link></li>
          <li><Link to="business_keywords" params={{organizationId: this.props.orgId}}>Keywords</Link></li>
          <li><Link to="business_deals" params={{organizationId: this.props.orgId}}>Deals</Link></li>
        </ul>
      </div>
    )
  }
})
