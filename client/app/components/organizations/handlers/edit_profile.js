import React from 'react'
import Profile from '../profile'

export default React.createClass({

  render() {
    return <Profile 
            currentOrganization={this.props.organization} 
            updateOrganization={this.props.updateOrganization} />
  }
})
