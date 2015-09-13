import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import BusinessProfile from '../business_profile'
import EditFundraiserProfile from '../edit_fundraiser_profile'

export default React.createClass({
  componentWillMount () {
    this.props.showBackLink(true)
  },

  render() {

    var profileType = this.props.organization.type === "business" 
      ? <BusinessProfile 
          organization={this.props.organization} 
          updateOrganization={this.props.updateOrganization} 
          editDisabled={this.props.editDisabled} />
      : <EditFundraiserProfile 
          organization={this.props.organization} 
          updateOrganization={this.props.updateOrganization} 
          editDisabled={this.props.editDisabled} />

    return <div>{profileType}</div>
  
  }
})
