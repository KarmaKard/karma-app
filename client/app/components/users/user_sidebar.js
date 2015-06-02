import React from 'react'
import {flux} from '../../main'
import { Link } from 'react-router'

export default React.createClass({
  render(){
    var currentUser = this.props.user
    var organizations = this.props.organizations
    console.log(currentUser)
    var manageLink
    this.props.organizations.map(function(organization){ 
       if (organization.userId === currentUser.id || currentUser.isSuperAdmin){
          return manageLink = <li><Link to="organizations_user_manages">Manage</Link></li>
       }
    })
    return(
     <div className="side_bar_navigation">
        <ul className="side_bar_navigation_level1">
          <li><Link to="account">Account</Link></li>
          <li><Link to="categories">Deals</Link></li>
          {manageLink}
        </ul>
      </div>
    )
  }
})
