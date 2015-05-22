import './main.css'

import { Flux } from 'minimal-flux'
import React from 'react'
import Router from 'react-router'
import routes from './routes'
import UserActions from './actions/users'
import UserStore from './stores/users'
import BusinessActions from './actions/business'
import BusinessStore from './stores/business'
import OrganizationActions from './actions/organizations'
import OrganizationStore from './stores/organizations'
import DealActions from './actions/deals'
import DealStore from './stores/deals'

export var flux = new Flux({
  actions: {
    users: UserActions,
    business: BusinessActions,
    organizations: OrganizationActions,
    deals: DealActions
  },
  stores: {
    users: UserStore,
    business: BusinessStore,
    organizations: OrganizationStore,
    deals: DealStore
  }
})

Router.run(routes, (Handler, state) => {
  return React.render(<Handler/>, document.getElementById('application'))
})

if (process.env.NODE_ENV !== 'production') {
  window.flux = flux
}
