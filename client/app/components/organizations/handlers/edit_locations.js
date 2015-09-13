import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Locations from '../locations'

export default React.createClass({
  componentWillMount () {
    this.props.showBackLink(true)
  },

  render() {
    return <Locations {... this.props} />
  }
})
