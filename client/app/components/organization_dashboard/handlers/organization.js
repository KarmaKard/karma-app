import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'



export default React.createClass({

  render() {

    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">Business Name</div>
          <a href="#" className="page_header_link" onClick={this.toggleForm}>User Name</a>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li>Dashboard
              <ul className="side_bar_navigation_level2">
                <li>Data</li>
                <li>Profile</li>
                <li>Locations</li>
                <li>Keywords</li>
                <li>Deals</li>
              </ul>
            </li>
           
          </ul>
        </div>
        <div className="content_box">
            <RouteHandler />
        </div>
      </div>
    )
  }
})