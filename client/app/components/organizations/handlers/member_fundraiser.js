import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { RouteHandler } from 'react-router'

export default React.createClass({
   propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    fundraiserMember: React.PropTypes.object.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    showBackLink: React.PropTypes.bool.isRequired,
    organizations: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
   },

  render() {
  injectTapEventPlugin()

    var organization = this.props.organization
    var user = this.props.user
    var fundraiserMember = this.props.fundraiserMember

    if (!organization && !user) {
      return <p>Organization Not Found</p>
    }

    return (
      <div>
          <RouteHandler
            organization={this.props.organization}
            user={user}
            fundraiserMember={fundraiserMember}
            showBackLink={this.props.showBackLink}
            toggleState={this.props.toggleState}
            toggleMenu={this.props.toggleMenu}/>
      </div>
    )
  }
})
