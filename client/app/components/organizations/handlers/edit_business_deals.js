import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import DealBuilder from '../../deals/deal_builder.js'

export default React.createClass({

  componentWillMount () {
    this.props.showBackLink(true)
  },

  render() {
  injectTapEventPlugin()
    return (
      <DealBuilder organization={this.props.organization} user={this.props.user} deals={this.props.deals} editDisabled={this.props.editDisabled} />
    )
  }
})
