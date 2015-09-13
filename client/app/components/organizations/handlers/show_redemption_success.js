import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Success from '../redemption_success'

export default React.createClass({
  render() {
  injectTapEventPlugin()
    return (
      <div>
        <Success {... this.props} />
      </div>
    )
  }
})
