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
    }
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      organizationsStoreState: flux.stores.organizations.getState(),
      usersStoreState: flux.stores.users.getState()
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
    var currentUser = this.state.usersStoreState.currentUser

    return (
      <div>
        <RouteHandler organizations={organizations} user={currentUser}/>
      </div>
    )
  }
})
