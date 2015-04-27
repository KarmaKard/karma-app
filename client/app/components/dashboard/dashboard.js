import React from 'react'
import Router, {RouteHandler} from 'react-router'
import { Link } from 'react-router'

export default React.createClass({
  render: function(){
    return(
      <div>
        <div className="navigation__stripe"> 
          <div className="navigation-stripe__section">Dashboard</div>
          <Link className="navigation__stripe__links" to="dashboard">Your Dashboard</Link>
          <Link className="navigation__stripe__links" to="profile">Your Profile</Link>
          <Link className="navigation__stripe__links" to="deals">Your Deals</Link>
        </div>
        <RouteHandler />
      </div>
    )
  }
})
