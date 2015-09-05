import React from 'react'
import { RouteHandler } from 'react-router'

export default React.createClass({
   propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
   },

  render () {
    var organization = this.props.organization || {}
    var user = this.props.user
    var editDisabled = false

    if (organization.status === 'pending' || user.roles.superadmin) {
      editDisabled = true
    }

    return (
      <div>
          <RouteHandler
            {... this.props}
            editDisabled={editDisabled}
            organization = {organization}/>
      </div>
    )
  }
})
