import React from 'react'
import UserAccount from '../user_account'

export default React.createClass({
  propTypes: {
    totalSaved: React.PropTypes.number.isRequired,
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired,
    donations: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  render () {
    console.log('account fundraiserMembers', this.props.fundraiserMembers)
    return <UserAccount user={this.props.user}
      donations={this.props.donations}
      organizations={this.props.organizations}
      totalSaved={this.props.totalSaved} 
      fundraiserMembers={this.props.fundraiserMembers} />
  }
})
