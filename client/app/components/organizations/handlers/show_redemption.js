import React from 'react'
import Redemption from '../redemption'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {

    return (
      <div>
        <div className='content_box-header'>Redemption</div>
        <Redemption {...this.props} />
      </div>
    )
  }
})
