import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
})
