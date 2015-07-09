import React from 'react'
import UserAccount from '../user_account'

export default React.createClass({
  render(){
    return <UserAccount user={this.props.user} totalSaved={this.props.totalSaved} />
  }
})