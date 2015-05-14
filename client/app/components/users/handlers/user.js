import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'



export default React.createClass({
  render() {
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">User Name</div>
          <a href="#" className="page_header_link" onClick={this.toggleForm}>Log Out</a>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
            <li>Account</li>
            <li>Organizations</li>
          </ul>
        </div>
        <div className="content_box">
            <RouteHandler />
        </div>
      </div>
    )
  }
})