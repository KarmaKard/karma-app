import './main.css'

import routes from './routes'
import React from 'react'
import Router from 'react-router'

Router.run(routes, (Handler, state) => {
  return React.render(<Handler/>, document.getElementById('application'))
})
