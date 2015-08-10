import React from 'react'
import { flux } from '../../../main'
import DealList from '../list_deals'

export default React.createClass({

  getInitialState () {
    var storeState = this.getStoreState()
    flux.actions.organizations.getOrganizations()
    flux.actions.deals.getDeals()
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

  getDealInformation (organizations, deals) {
    var organizationMap = new Map()
    var totalSavings = 0
    organizations.forEach(function (organization, i) {
      organizationMap.set(organization.id, organizations[i])
      organizationMap.get(organization.id).deals = []
    })

    deals.forEach(function (deal, t) {
      if (organizationMap.has(deal.organizationId)) {
        if (isNaN(deal.dollarValue)) {
          return
        } else if (deal.limit === 'unlimited') {
          totalSavings += parseFloat(deal.dollarValue)
        } else if (deal.type === 'Free') {
          totalSavings += parseFloat(deal.dollarValue) * parseInt(deal.limit, 10)
        } else {
          totalSavings += parseFloat(deal.dollarValue) * parseInt(deal.limit, 10)
        }
        organizationMap.get(deal.organizationId).deals.push(deal)
      }
    })
    var organizationArray = []
    for (var [id, organization] of organizationMap) {
      organizationArray.push(organization)
    }
    return [totalSavings, organizationArray]
  },

  goBack () {
    history.back()
  },

  render () {
    var organizations = this.state.organizationsStoreState.organizations
      .filter(org => org.type === 'business' && org.status === 'active')
    var deals = this.state.dealsStoreState.deals
    var dealInfo = this.getDealInformation(organizations, deals)
    var totalSavings = dealInfo[0]
    var dealsByOrganization = dealInfo[1]

    return (
      <div>
        <div className='page_header'>
          <div>
            <button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button>
            <div className='header_center karmatitle'>KarmaKard</div>
          </div>
        </div>
        <div className='guest_box'>
          <div className='content_box-header'>Deals By Business</div>
          <DealList dealsByOrganization={dealsByOrganization} totalSavings={totalSavings} />
        </div>
      </div>
    )
  }
})
