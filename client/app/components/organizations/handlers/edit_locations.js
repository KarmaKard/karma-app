import React from 'react'
import Locations from '../locations'

export default React.createClass({
  componentWillMount () {
    this.props.showBackLink(true)
  },

  render() {
    return <Locations {... this.props} />
  }
})
