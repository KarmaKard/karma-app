import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { RouteHandler } from 'react-router'

export default React.createClass({
   propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
   },

  render() {
  injectTapEventPlugin()
    var organization = this.props.organization
    var user = this.props.user
    var editDisabled = false
    // if (organization.status === 'pending' ) {
    //   editDisabled = true
    // }
    return (
      <div>
          <RouteHandler
            {... this.props}
            editDisabled={editDisabled}/>
      </div>
    )
  }
})
