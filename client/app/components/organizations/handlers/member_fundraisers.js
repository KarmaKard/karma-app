import React from 'react'
import UserSideBar from '../../users/user_sidebar'
import MemberFundraisers from '../member_fundraisers'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      toggleState: false
    }
  },

  toggleMenu () {
    var toggleState = !this.state.toggleState
    this.setState({toggleState})
  },

  render () {
    var user = this.props.user
    var organizations = this.props.organizations
    var membershipMap = new Map()
    var fundraiserMembers = this.props.fundraiserMembers
      .filter(fundraiserMembership => {
        if (fundraiserMembership.userId === user.id) {
          membershipMap.set(fundraiserMembership.organizationId, fundraiserMembership)
          return fundraiserMembership
        }
      })
    var memberFundraisers = organizations.filter(organization => {
      if (membershipMap.has(organization.id)) {
        return organization
      }
    })

    return (
      <div>
        <UserSideBar toggleState={this.props.toggleState} toggleMenu={this.props.toggleMenu} organizations={this.props.organizations} fundraiserMembers={fundraiserMembers} user={user} />
        <div className='content_box'>
          <MemberFundraisers user={user} memberFundraisers={memberFundraisers} fundraiserMembers={fundraiserMembers} />
        </div>
      </div>
    )
  }
})
