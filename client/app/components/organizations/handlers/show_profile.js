import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'
export default React.createClass({

  render() {
    var deals = this.props.deals.map(function(deal) {
      return <li className="dealButton">{deal.dealText}</li>
    })

    var locations = this.props.locations.map(function(location) {
      return <li className="dealButton">{location.street + " " + location.zip}</li>
    })

    var user = this.props.user
    var organizations = this.props.organizations


    if (!user || organizations.length === 0 ){
      return <p>Wait!</p>
    }
    var manageLink
    this.props.organizations.map(function(organization){ 
       if (organization.userId === user.id){
          return manageLink = <li><Link to="organizations_user_manages">Manage</Link></li>
       }
    })

    return (
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
