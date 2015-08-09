import React from 'react'
import { flux } from '../../../main'
import DealBuilder from '../../deals/deal_builder.js'

export default React.createClass({

  componentWillMount () {
    this.props.showBackLink(true)
  },

  render () {
    return (
      <DealBuilder organization={this.props.organization} user={this.props.user} deals={this.props.deals} editDisabled={this.props.editDisabled} />
    )
  }
})
