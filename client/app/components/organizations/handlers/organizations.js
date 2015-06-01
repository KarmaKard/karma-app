import React from 'react'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    var storeState = this.getStoreState()
    if (storeState.organizationsStoreState.organizations.length === 0){
      flux.actions.organizations.getOrganizations()
      flux.actions.organizations.getLocations()
    }
    if (storeState.dealsStoreState.deals.length === 0){
      flux.actions.deals.getDeals()
    }
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      organizationsStoreState: flux.stores.organizations.getState(),
      usersStoreState: flux.stores.users.getState(),
      dealsStoreState: flux.stores.deals.getState()
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
    flux.stores.deals.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
    flux.stores.deals.removeListener('change', this.storeChange)
  },


  render() {
    var organizations = this.state.organizationsStoreState.organizations
    var currentUser = this.state.usersStoreState.currentUser
    var deals = this.state.dealsStoreState.deals
    var locations = this.state.organizationsStoreState.locations
    if(organizations.length === 0 || !currentUser || deals.length === 0 || locations.length === 0 ){
      return <span/>
    }

    return (
      <div>
        <RouteHandler organizations={organizations} user={currentUser} locations={locations} deals={deals} />
      </div>
    )
  }
})
