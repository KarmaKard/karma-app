import React from 'react'
import { flux } from '../../../main'
import {RouteHandler} from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    var storeState = this.getStoreState()
    flux.actions.organizations.getOrganizations()
    return storeState
  },

  storeChange () {
    this.setState(this.getStoreState())
  },

  getStoreState () {
    return {
      organizationsStoreState: flux.stores.organizations.getState()
    }
  },

  componentWillMount () {
    flux.stores.organizations.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.organizations.removeListener('change', this.storeChange)
  },

  compare (a, b) {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  },

  orgsByAlphabet (a, b) {
    return this.compare(a.name, b.name)
  },

  render () {
    var organizations = this.state.organizationsStoreState.organizations.sort(this.orgsByAlphabet)
    var activeFundraisers = organizations
      .filter(organization => organization.type === 'fundraiser' && organization.status === 'active')

    return (
      <RouteHandler activeFundraisers={activeFundraisers} />
      )
  }
})
