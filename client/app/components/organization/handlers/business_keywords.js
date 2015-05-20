import React from 'react'
import Keywords from '../business_keywords'

export default React.createClass({

  render() {
    return <Keywords currentOrganization = {this.props.currentOrganization} updateOrganization = {this.props.updateOrganization}/>
  }
})
