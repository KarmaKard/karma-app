import React from 'react'
import Locations from '../locations'

export default React.createClass({
  render() {
    return <Locations {... this.props} />
  }
})
