import React from 'react'
import { flux } from '../../../main'

export default React.createClass({

  render() {
    var deals = this.props.deals.map(function(deal) {
      return <li className="dealButton">{deal.dealText}</li>
    })

    var locations = this.props.locations.map(function(location) {
      return <li className="dealButton">{location.street + " " + location.zip}</li>
    })
    return (
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
    )
  }
})
