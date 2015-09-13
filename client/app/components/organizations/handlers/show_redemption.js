import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Redemption from '../redemption'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
  injectTapEventPlugin()

    return (
      <div>
        <Redemption {...this.props} />
      </div>
    )
  }
})
