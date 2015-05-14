import React from 'react'
import Name from '../organization_name'

export default React.createClass({

  render() {
    return  <Name 
              setName={this.props.setName}
              organizationType={this.props.organizationType} />
  }
})
