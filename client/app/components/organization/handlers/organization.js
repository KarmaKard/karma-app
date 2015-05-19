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
    return Object.assign(this.getStoreState(),{
    })
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    if(flux.stores.organizations.getState().organizations.length === 0){
      flux.actions.organizations.getOrganizations()
      return {
        organizations: [],
        user: {},
        currentOrganization: {} 
      }
    }
    return {
      organizations: flux.stores.organizations.getState(),
      user: flux.stores.users.getState(),
      currentOrganization: flux.stores.organizations.getCurrentOrganization(this.context.router.getCurrentParams().organizationId)
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
  },

  render() {
    if (this.state.organizations.length === 0){
      return <p>Wait!</p>
    }

    var sideBarType
    if(this.state.currentOrganization.type === "fundraiser"){
      sideBarType = <FundraiserSideBar orgId={this.state.currentOrganization.id} />  
    }
    else if(this.state.currentOrganization.type === "business"){
      sideBarType = <BusinessSideBar orgId={this.state.currentOrganization.id} />  
    } 
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">
            <Link to="organization_dashboard" params={{organizationId: this.state.currentOrganization.id}}>
              {this.state.currentOrganization.name}
            </Link>
          </div>
          <a href="#" className="page_header_link">{this.state.user.currentUser.first_name}</a>
        </div>

        {sideBarType}
        
        <div className="content_box">
          <RouteHandler />
        </div>
      </div>
    )
  }
})
