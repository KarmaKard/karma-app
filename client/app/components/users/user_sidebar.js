import React from 'react'
import {flux} from '../../main'
import { Link } from 'react-router'

export default React.createClass({
  render(){
    var currentUser = this.props.user
    var organizations = this.props.organizations
    var manageLink = currentUser.roles.manager || currentUser.roles.superadmin
      ? <li><Link to="organizations">Manage</Link></li>
      : null
    
    return(
     <div className="side_bar_navigation">
        <ul className="side_bar_navigation_level1">
          <li><Link to="account">Account</Link></li>
          <li><Link to="deals">Deals</Link></li>
          {manageLink}
        </ul>
      </div>
    )
  }
})
