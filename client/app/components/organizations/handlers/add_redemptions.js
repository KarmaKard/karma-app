import React from 'react'
import AddRedemptions from '../add_redemptions'
import Router, { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    var organization = this.props.organization
    var dealId = this.context.router.getCurrentParams().dealId
    var paymentId = this.context.router.getCurrentParams().paymentId

    return (
      <div>
          <AddRedemptions {... this.props} />
      </div>
    )
  }
})
