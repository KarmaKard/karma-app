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
        <div className="content_box-header">Redemption</div>
        <Redemption {... this.props} />
      </div>
    )
    
  }
})
