import React from 'react'
import { RouteHandler } from 'react-router'
import FundraiserSideBar from '../fundraiser_sidebar'
import BusinessSideBar from '../business_sidebar'
import { Link } from 'react-router'

export default React.createClass({
   propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    locations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    updateOrganization: React.PropTypes.func.isRequired,
    saveDeals: React.PropTypes.func,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired
   },

  render () {

    var organization = this.props.organization
    var deals = this.props.deals
    var locations = this.props.locations
    var user = this.props.user
    var editDisabled = false

    if (!organization) {
      return <p>Organization Not Found</p>
    }

    if (organization.status === 'pending' || user.roles.superadmin) {
      editDisabled = true
    }

    if (organization.userId !== user.id && !user.roles.superadmin) {
      return <p>You are not permitted to view this page</p>
    }

    var sidebar = organization.type === 'fundraiser'
      ? <FundraiserSideBar toggleState={this.props.toggleState} toggleMenu={this.props.toggleMenu} org={organization} />
      : <BusinessSideBar toggleState={this.props.toggleState} toggleMenu={this.props.toggleMenu} org={organization} />

    return (
      <div>
        {sidebar}
        <div className='content_box'>
          <RouteHandler
            organization={this.props.organization}
            editDisabled={editDisabled}
            user={user} deals={deals}
            initialLocations={locations}
            updateOrganization={this.props.updateOrganization}
            saveDeals={this.props.saveDeals}
            showBackLink={this.props.showBackLink}
            toggleState={this.props.toggleState}
            toggleMenu={this.props.toggleMenu}/>
        </div>
      </div>
    )
  }
})
