import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import Wizard from '../wizard'

export default React.createClass({
  render(){
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          <Wizard user={this.props.user}/>
        </div>
      </div>
    )     
  }
})
