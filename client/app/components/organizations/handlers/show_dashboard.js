import React from 'react'
import BusinessDashboard from '../business_dashboard'
import FundraiserDashboard from '../fundraiser_dashboard'

export default React.createClass({
  render() {
    var dashboardType = this.props.organization.type === "business"
      ? <BusinessDashboard {...this.props} />
      : <FundraiserDashboard {...this.props} />
    return dashboardType
  }
})
