import React from 'react'
import Success from '../redemption_success'
import UserSideBar from '../../users/user_sidebar'
import { Link } from 'react-router'

export default React.createClass({

  render() {
    var user = this.props.user
    var organizations = this.props.organizations

    return (
      <div>
        <div className="content_box-header">Success</div>
        <Success {... this.props} />
      </div>
    )
    
  }
})
