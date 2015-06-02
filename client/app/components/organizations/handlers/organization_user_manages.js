import React from 'react'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'
import FundraiserSideBar from '../fundraiser_sidebar'
import BusinessSideBar from '../business_sidebar'
import { Link } from 'react-router'

export default React.createClass({

  render() {

    var organization = this.props.organization
    var deals = this.props.deals
    var locations = this.props.locations
    var user = this.props.user
    var editDisabled = false
    if(organization.status === "review") {
      editDisabled = true
    }
    
    if (organization.userId !== user.id) {
      return <p>You are not permitted to view this page</p>
    }

    var sidebar = organization.type === 'fundraiser'
      ? <FundraiserSideBar orgId={organization.id} />  
      : <BusinessSideBar orgId={organization.id} />


    if (!organization) {
      return <p>Organization Not Found</p>
    }
      
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">
            <Link to="organization_user_manages" params={{organizationId: organization.id}}>
              {organization.name}
            </Link>
          </div>
          <div className="page_header_link">
            <Link to="account">
              {user.firstName}
            </Link>
          </div>
        </div>
        {sidebar}
        <div className="content_box">
          <RouteHandler organization={this.props.organization} editDisabled={editDisabled} user={user} deals={this.props.deals} initialLocations={this.props.locations} updateOrganization={this.props.updateOrganization} saveDeals={this.props.saveDeals}/>
        </div>
      </div>
    )
  }
})
