import React from 'react'
import AddRedemptions from '../add_redemptions'
import UserSideBar from '../../users/user_sidebar'
import Router, { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    var organization = this.props.organization
    var dealId = this.context.router.getCurrentParams().dealId

    return (
      <div>
          <Link to="organization" params={{organizationId: organization.id, dealId: dealId}}>
            <button className="back_button">Go Back</button>
          </Link>
          <div className="content_box-header">Add Redemptions</div>
            <AddRedemptions {... this.props} />
      </div>
    )
  }
})