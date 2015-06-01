import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  render() {
    var deals = this.props.deals.map(function(deal) {
      return <li className="dealButton">{deal.dealText}</li>
    })

    var locations = this.props.locations.map(function(location) {
      return <li className="dealButton">{location.street + " " + location.zip}</li>
    })

    var currentUser = this.props.user
    var organizations = this.props.organizations


    if (!currentUser || organizations.length === 0 ){
      return <p>Wait!</p>
    }
    var manageLink
    this.props.organizations.map(function(organization){ 
       if (organization.userId === currentUser.id){
          return manageLink = <li><Link to="organizations_user_manages">Manage</Link></li>
       }
    })

    return (
      <div>
          <div className="page_header">
          <div className="page_header_title">{currentUser.firstName} </div>
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
            {manageLink}
          </ul>
        </div>
        <div className="content_box">
          <div className="organization_information" >
            <h1>{this.props.organization.name}</h1>
            <p>{this.props.organization.category}</p>
          </div>
          <div className="business_deals" >
          <h2>Deals</h2>
            <ul>
              {deals}
            </ul>
          </div>
          <div className="business_locations" >
          <h2>Locations</h2>
            <ul>
              {locations}
            </ul>
          </div>
        </div>
      </div>
    )
  }
})
