import './main.css'

import { Flux } from 'minimal-flux'
import React from 'react'
import Router from 'react-router'
import routes from './routes'
import UserActions from './actions/users'
import UserStore from './stores/users'
import BusinessActions from './actions/business'
import BusinessStore from './stores/business'

export var flux = new Flux({
  actions: {
    users: UserActions,
    business: BusinessActions
  },
  stores: {
    users: UserStore,
    business: BusinessStore
  }
})

Router.run(routes, (Handler, state) => {
  return React.render(<Handler/>, document.getElementById('application'))
})

if (process.env.NODE_ENV !== 'production') {
  window.flux = flux
}
