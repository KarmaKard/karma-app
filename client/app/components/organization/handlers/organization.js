import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'
import FundraiserSideBar from '../fundraiser_sidebar'
import BusinessSideBar from '../business_sidebar'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    var storeState = this.getStoreState()
    if(storeState.organizations.organizations.length === 0){
      flux.actions.organizations.getOrganizations()
    }
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    var orgId = this.context.router.getCurrentParams().organizationId
    return {
      organizations: flux.stores.organizations.getState(),
      user: flux.stores.users.getState(),
      currentOrganization: flux.stores.organizations.getOrganization(orgId)
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
  },

  updateOrganization(organization) {
    flux.actions.organizations.updateOrganization(organization)
  },

  render() {
    if (this.state.organizations.organizations.length === 0){
      return <p>No Organizations</p>
    }

    var currentOrg = this.state.currentOrganization
    var sideBarType = currentOrg.type === 'fundraiser'
      ? <FundraiserSideBar orgId={currentOrg.id} />  
      : <BusinessSideBar orgId={currentOrg.id} />

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">
            <Link to="organization_dashboard" params={{organizationId: currentOrg.id}}>
              {currentOrg.name}
            </Link>
          </div>
        </div>

        {sideBarType}
        
        <div className="content_box">
          <RouteHandler currentOrganization = {this.state.currentOrganization} updateOrganization = {this.updateOrganization}/>
        </div>
      </div>
    )
  }
})
