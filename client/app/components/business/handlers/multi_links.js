import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({
  render(){
    return(
      <div>
        <div className="navigation-stripe"> 
          <div className="navigation-stripe__section">Dashboard</div>
          <Link className="navigation-stripe__links" to="newBusiness">Add Business</Link>
          <Link className="navigation-stripe__links" to="businesses">Your Businesses</Link>
        </div>
        <RouteHandler />
      </div>
    )
  }
})
