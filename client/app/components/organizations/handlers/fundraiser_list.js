import React from 'react'
import FundraiserList from '../fundraiser_list'

export default React.createClass({
  propTypes: {
    activeFundraisers: React.PropTypes.array.isRequired
  },

  render () {
    var activeFundraisers = this.props.activeFundraisers
    return (<FundraiserList activeFundraisers={activeFundraisers} />)
  }
})
