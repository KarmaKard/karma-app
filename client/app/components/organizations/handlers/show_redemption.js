import React from 'react'
import Redemption from '../redemption'
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
        <div className="content_box-header">Redemption</div>
        <Redemption {... this.props} />
      </div>
    )
    
  }
})
