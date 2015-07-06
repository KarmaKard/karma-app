import React from 'react'
import { flux } from '../../../main'
import FundraiserProfile from '../fundraiser_profile'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {

    if(this.props.activeFundraisers.length === 0){return <p>Waiting...</p>}
    var organizationId = this.context.router.getCurrentParams().organizationId
    var fundraiser = this.props.activeFundraisers.filter(organization => organization.id === organizationId)
    if(fundraiser.length === 0){return <p>Didnt find organization</p>}
    fundraiser = fundraiser[0]

    return (<FundraiserProfile fundraiser={fundraiser} />)
  }
})