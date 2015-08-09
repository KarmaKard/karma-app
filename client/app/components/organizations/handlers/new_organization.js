import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import Wizard from '../wizard'

export default React.createClass({
  componentWillMount () {
    this.props.showBackLink(true)
  },

  render(){
    return (
      <div>
        <div className="guest_box">
          <Wizard user={this.props.user} toggleMenu={this.props.toggleMenu} toggleState={this.props.toggleState} showBackLink={this.props.showBackLink} />
        </div>
      </div>
    )     
  }
})
