import React from 'react'
import Type from '../organization_type'

export default React.createClass({

  render() {
    return <Type setType={this.props.setType}/>
  }
})
