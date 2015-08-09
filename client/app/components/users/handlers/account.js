import React from 'react'
import UserAccount from '../user_account'

export default React.createClass({
  propTypes: {
    totalSaved: React.PropTypes.number.isRequired,
    user: React.PropTypes.object.isRequired
  },

  render () {
    return <UserAccount user={this.props.user} totalSaved={this.props.totalSaved} />
  }
})
