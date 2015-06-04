import React from 'react'
import { RouteHandler } from 'react-router'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({
  render() {
    var user = this.props.user
    var organizations = this.props.organizations

    return(
      <div>
        <div className="page_header">
          <div className="page_header_title">{user.firstName} </div>
          <div className="page_header_link">
            <Link to="root">
              Log Out
            </Link>
          </div>
        </div>
        <UserSideBar organizations={organizations} user={user} />
        <div className="content_box">
          <RouteHandler {... this.props} />
        </div>
      </div>
    )
  }
})
