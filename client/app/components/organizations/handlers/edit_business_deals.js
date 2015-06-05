import React from 'react'
import { flux } from '../../../main'
import DealBuilder from '../../deals/deal_builder.js'

export default React.createClass({

  render() {
    return (
      <DealBuilder organization={this.props.organization} user={this.props.user} deals={this.props.deals} editDisabled={this.props.editDisabled} />
    )
  }
})
