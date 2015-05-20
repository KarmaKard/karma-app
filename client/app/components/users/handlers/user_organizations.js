import React from 'react'
import Organizations from '../user_organizations'

export default React.createClass({
  render(){
    return (
      <div>
        <Organizations organizations={this.props.organizations}/>
      </div>
    )
  }
})
