import React from 'react'
import Success from '../redemption_success'

export default React.createClass({
  render () {
    return (
      <div>
        <Success {... this.props} />
      </div>
    )
  }
})
