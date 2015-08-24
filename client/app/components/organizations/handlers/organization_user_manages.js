import React from 'react'
import { RouteHandler } from 'react-router'
import FundraiserSideBar from '../fundraiser_sidebar'
import BusinessSideBar from '../business_sidebar'

export default React.createClass({
   propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    locations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    updateOrganization: React.PropTypes.func.isRequired,
    saveDeals: React.PropTypes.func,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    payments: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired,
    showBackLink: React.PropTypes.bool.isRequired
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
      ? <FundraiserSideBar toggleState={this.props.toggleState} toggleMenu={this.props.toggleMenu} fundraiserMembers={this.props.fundraiserMembers} org={organization} user={user}/>
      : <BusinessSideBar toggleState={this.props.toggleState} toggleMenu={this.props.toggleMenu} fundraiserMembers={this.props.fundraiserMembers} org={organization} user={user} />

    return (
      <div>
        {sidebar}
        <div className='content_box'>
          <RouteHandler
            organization={this.props.organization}
            payments={this.props.payments}
            editDisabled={editDisabled}
            user={user} deals={deals}
            fundraiserMembers={this.props.fundraiserMembers}
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
