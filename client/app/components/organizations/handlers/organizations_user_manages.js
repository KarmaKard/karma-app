import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import SuperAdminView from '../superadmin_organizations_manager'
import NonAdminView from '../nonadmin_organizations_manager'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    fundraiserMembers: React.PropTypes.array
  },

  getInitialState () {
    return {
      toggleState: false
    }
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  toggleMenu () {
    var toggleState = !this.state.toggleState
    this.setState({toggleState})
  },

  render() {
  injectTapEventPlugin()
    var user = this.props.user
    var organizations = this.props.organizations
    var isSuperAdmin = user.roles.superadmin
        ? <SuperAdminView user={this.props.user} organizations={this.props.organizations} />
        : <NonAdminView user={this.props.user} organizations={this.props.organizations} />

    return (
      <div>
        <UserSideBar toggleState={this.props.toggleState} toggleMenu={this.props.toggleMenu} fundraiserMembers={this.props.fundraiserMembers} organizations={organizations} user={user} />
        <div className='content_box'>
          {isSuperAdmin}
        </div>
      </div>
    )
  }
})
