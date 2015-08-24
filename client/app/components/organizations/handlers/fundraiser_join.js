import React from 'react'
import { flux } from '../../../main'
import JoinProfile from '../join_profile'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    var fundraiserMemberId = this.context.router.getCurrentParams().fundraiserMemberId
    flux.actions.organizations.getOrganizationsAndDeals(fundraiserMemberId)
    var storeState = this.getStoreState()
    return storeState
  },

  storeChange () {
    this.setState(this.getStoreState())
  },

  getStoreState () {
    return {
      organizationsStoreState: flux.stores.organizations.getState(),
      dealsStoreState: flux.stores.deals.getState()
    }
  },

  componentWillMount () {
    flux.stores.organizations.addListener('change', this.storeChange)
    flux.stores.deals.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.organizations.removeListener('change', this.storeChange)
    flux.stores.deals.removeListener('change', this.storeChange)
  },

  render () {
    var organizations = this.state.organizationsStoreState.organizations
    var organizationId = this.state.organizationsStoreState.organizationId
    var deals = this.state.dealsStoreState.deals
    if (organizations.length === 0 || !organizationId || deals.length === 0) {
      return <div>We are picking up some data for a second.</div>
    }
    return <JoinProfile organizations={organizations} deals={deals} organizationId={organizationId} />
  }
})
