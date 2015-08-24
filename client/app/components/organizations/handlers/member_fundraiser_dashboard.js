import React from 'react'
import { flux } from '../../../main'
import {RouteHandler, Link} from 'react-router'
import Dashboard from '../fundraiser_member_dashboard'

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    fundraiserMember: React.PropTypes.object.isRequired,
    showBackLink: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  componentWillMount () {
    this.props.showBackLink(true)
  },

  render () {

    return (
      <div>
        <Dashboard
          user={this.props.user}
          fundraiserMember={this.props.fundraiserMember}
          showBackLink={this.props.showBackLink}
          organization={this.props.organization} />
      </div>
    )
  }
})
