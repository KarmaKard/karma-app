import React from 'react'
import { flux } from '../../../main'
import DealList from '../list_deals'
import mui from 'material-ui'
import {AppCanvas, AppBar, IconButton, Card, CardTitle} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

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

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
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
    console.log(organizationArray)
    var sortedOrganizationArray = organizationArray.sort(this.orgsByAlphabet)
    console.log(sortedOrganizationArray)
    return [totalSavings, sortedOrganizationArray]
  },

  goBack () {
    history.back()
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
    console.log(this.compare(a.name, b.name))
    return this.compare(a.name, b.name)
  },
  render () {
    var organizations = this.state.organizationsStoreState.organizations
      .filter(org => org.type === 'business' && org.status === 'active')
    var deals = this.state.dealsStoreState.deals
    var dealInfo = this.getDealInformation(organizations, deals)
    var totalSavings = dealInfo[0]
    var dealsByOrganization = dealInfo[1]

    return (
      <AppCanvas>
        <AppBar
          title=<div className='karmatitle'></div>
          iconElementLeft={<button onFocus={this.goBack} ><i className="material-icons md-48 back_button">keyboard_arrow_left</i></button>}
          iconElementRight={<div style={{width: 72 + 'px'}}></div>} />
        <div className='spacer'></div>
        <Card className='main_card'>
          <CardTitle title='Deals by business' subtitle={'Savings Value: $' + totalSavings}/>
          <DealList dealsByOrganization={dealsByOrganization} totalSavings={totalSavings} />
        </Card>
      </AppCanvas>
    )
  }
})
