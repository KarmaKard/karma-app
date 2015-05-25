import React from 'react'
import { flux } from '../../../main'
import DealBuilder from '../../deals/deal_builder.js'

export default React.createClass({

  getInitialState() {
    var storeState = this.getStoreState()

    // TODO lookup deals only for this org
    if (storeState.dealStoreState.deals.length === 0){
      var orgId = this.props.organization.id
      flux.actions.deals.getDeals()
    }

    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      dealStoreState: flux.stores.deals.getState(),
    }
  },

  componentWillMount() {
    flux.stores.deals.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.deals.removeListener('change', this.storeChange)
  },

  render() {
    var orgId = this.props.organization.id
    var deals = this.state.dealStoreState.deals.filter(deal => deal.organizationId === orgId)

    // TODO remove this test data
    deals = [
      {
        organizationId: orgId,
        primaryProductName: 'Widgets',
        limit: 1,
        dollarValue: 1,
        type: "Free"
      }
    ]

    return (
      <DealBuilder {... this.props} deals={deals} />
    )
  }
})
