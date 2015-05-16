import React from 'react'
import { flux } from '../../../main'
import Router, {RouteHandler, Link} from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  navClicked(e){

  },

  render() {
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">Business Name</div>
          <a href="#" className="page_header_link" onClick={this.toggleForm}>User Name</a>
        </div>
        <div className="side_bar_navigation">
          <ul className="side_bar_navigation_level1">
                <li><a href="" ref="data" onClick={this.navClicked()}>Data</a></li>
                <li><a href="" ref="profile" onClick={this.navClicked}>Profile</a></li>
                <li><a href="" ref="locations" onClick={this.navClicked}>Locations</a></li>
                <li><a href="" ref="keywords" onClick={this.navClicked}>Keywords</a></li>
                <li><a href="" ref="deals" onClick={this.navClicked}>Deals</a></li>

           
          </ul>
        </div>
        <div className="content_box">
            <RouteHandler />
        </div>
      </div>
    )
  }
})