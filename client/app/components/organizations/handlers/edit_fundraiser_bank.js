import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Bank from '../fundraiser_bank'

export default React.createClass ({
  componentWillMount () {
    this.props.showBackLink(true)
  },

  render() {
  injectTapEventPlugin()
    return <Bank {... this.props} />
  }
})
