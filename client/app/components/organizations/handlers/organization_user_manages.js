import React from 'react'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'
import FundraiserSideBar from '../fundraiser_sidebar'
import BusinessSideBar from '../business_sidebar'

export default React.createClass({

  render() {
    var organization = this.props.organization
    if (organization.userId !== this.props.user.id) {
      return <p>You are not permitted to view this page</p>
    }

    var sidebar = organization.type === 'fundraiser'
      ? <FundraiserSideBar orgId={organization.id} />  
      : <BusinessSideBar orgId={organization.id} />
      
    return (
      <div>
        {sidebar}
        <div className="content_box">
          <RouteHandler organization={this.props.organization} user={this.props.user} deals={this.props.deals} initialLocations={this.props.locations} updateOrganization={this.props.updateOrganization} saveDeals={this.props.saveDeals}/>
        </div>
      </div>
    )
  }
})
