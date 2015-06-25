import React from 'react'
import Survey from '../survey'

export default React.createClass({

  render() {
    return <Survey {... this.props} />
  }
})
