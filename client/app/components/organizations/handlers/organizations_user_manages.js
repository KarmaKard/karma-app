import React from 'react'
import { flux } from '../../../main'
import SuperAdminView from '../superadmin_organizations_manager'
import NonAdminView from '../nonadmin_organizations_manager'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    var user = this.props.user
    var isSuperAdmin = user.isSuperAdmin
        ? <SuperAdminView user={this.props.user} organizations={this.props.organizations} />
        : <NonAdminView user={this.props.user} organizations={this.props.organizations} />

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{user.firstName}</div>
          <div className="page_header_link">
            <Link to="root">
              Log Out
            </Link>
          </div>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li><Link to="account">Account</Link></li>
            <li><Link to="categories">Deals</Link></li>
            <li><Link to="organizations_user_manages">Manage</Link></li>
          </ul>
        </div>
        <div className="content_box">
          {isSuperAdmin}
        </div>
      </div>
    )
  }
})
