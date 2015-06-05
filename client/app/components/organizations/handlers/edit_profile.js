import React from 'react'
import BusinessProfile from '../business_profile'
import FundraiserProfile from '../fundraiser_profile'

export default React.createClass({

  render() {

    var profileType = this.props.organization.type === "business" 
      ? <BusinessProfile 
          organization={this.props.organization} 
          updateOrganization={this.props.updateOrganization} 
          editDisabled={this.props.editDisabled} />
      : <FundraiserProfile 
          organization={this.props.organization} 
          updateOrganization={this.props.updateOrganization} 
          editDisabled={this.props.editDisabled} />

    return <div>{profileType}</div>
  
  }
})
