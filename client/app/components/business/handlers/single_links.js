import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({
  render(){
    // TODO lookup business from Store
    var business = {
      id: 1,
      name: 'The Karma Kompany',
      description: 'Spreading Good Karma since 2015',
      keywords: ['fundraising', 'charity']
    }
    return(
      <div>
        <div className="navigation-stripe"> 
          <div className="navigation-stripe__section">{business.name} Dashboard</div>
          <Link className="navigation-stripe__links" to="editBusiness" params={{businessId: business.id}}>Edit Profile</Link>
          <Link className="navigation-stripe__links" to="business" params={{businessId: business.id}}>Analytics</Link>
        </div>
        <RouteHandler />
      </div>
    )
  }
})
