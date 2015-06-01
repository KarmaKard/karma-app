import React from 'react'
import Profile from '../profile'

export default React.createClass({

  render() {
    return <Profile 
            organization={this.props.organization} 
            updateOrganization={this.props.updateOrganization} 
            editDisabled={this.props.editDisabled} />
  }
})
