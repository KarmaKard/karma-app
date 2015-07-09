import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  getInitialState() {
    var storeState = this.getStoreState()
    if (storeState.organizationsStoreState.organizations.length === 0){
      flux.actions.organizations.getOrganizations()
    }
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      organizationsStoreState: flux.stores.organizations.getState(),
    }
  },

  componentWillMount() {
    flux.stores.organizations.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.organizations.removeListener('change', this.storeChange)
  },


  render() {
    var organizations = this.state.organizationsStoreState.organizations
    var activeFundraisers = organizations
      .filter(organization => organization.type === "fundraiser" && organization.status === "active")

    return (
      <RouteHandler activeFundraisers={activeFundraisers} />
      )
  }
})
