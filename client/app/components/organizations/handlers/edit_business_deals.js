import React from 'react'
import { flux } from '../../../main'
import DealBuilder from '../../deals/deal_builder.js'

export default React.createClass({

  render() {
    return (
      <DealBuilder organizationId={this.props.organization.id} deals={this.props.deals} />
    )
  }
})
