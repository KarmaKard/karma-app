import React from 'react'
import { flux } from '../../../main'
import SuperAdminView from '../superadmin_organizations_manager'
import NonAdminView from '../nonadmin_organizations_manager'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  logOut(){
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  render () {
    var user = this.props.user
    var isSuperAdmin = user.roles.superadmin
        ? <SuperAdminView user={this.props.user} organizations={this.props.organizations} />
        : <NonAdminView user={this.props.user} organizations={this.props.organizations} />

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">{user.firstName}</div>
          <div onClick={this.logOut} className="page_header_link">
            Log Out
          </div>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li><Link to="account">Account</Link></li>
            <li><Link to="organizations">Deals</Link></li>
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
