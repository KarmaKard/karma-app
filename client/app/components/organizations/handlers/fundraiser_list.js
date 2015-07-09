import React from 'react'
import { flux } from '../../../main'
import FundraiserList from '../fundraiser_list'

export default React.createClass({
  render() {

    if(this.props.activeFundraisers.length === 0){return <p>Waiting...</p>}
    var activeFundraisers = this.props.activeFundraisers

    return (<FundraiserList activeFundraisers={activeFundraisers} />)
  }
})
