import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import FundraiserList from '../fundraiser_list'

export default React.createClass({
  propTypes: {
    activeFundraisers: React.PropTypes.array.isRequired
  },

  render() {
  injectTapEventPlugin()
    return (<FundraiserList {... this.props} />)
  }
})
