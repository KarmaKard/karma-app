import './main.css'

import routes from './routes'
import Router from 'react-router'
import RouterActions from './actions/router'

Router.run(routes, (Handler, state) => {
    this.emit('match', state)
    return React.render(<Handler/>, document.getElementById('application'))
  }
})
